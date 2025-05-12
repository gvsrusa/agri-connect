import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server'; // Import Clerk server auth
import { getUserProfile } from './lib/userProfile'; // Import profile fetching function

// Keep the original next-intl middleware setup
const nextIntlMiddleware = createMiddleware({
  locales: locales,
  defaultLocale: defaultLocale,
  // Keep default localeDetection true, we inject preference via cookie header
  localeDetection: true,
});

// Define the new async middleware wrapper
export default async function middleware(request: NextRequest) {
  console.log('Middleware: Running custom logic...');
  const { userId } = await auth(); // Await the result of auth()

  if (userId) {
    console.log(`Middleware: User logged in: ${userId}`);
    try {
      const userProfile = await getUserProfile(userId);
      if (userProfile?.preferred_language && locales.includes(userProfile.preferred_language)) {
        const preferredLocale = userProfile.preferred_language;
        console.log(`Middleware: User preference found: ${preferredLocale}. Modifying request header.`);

        // Clone request headers and add/update the NEXT_LOCALE cookie
        const requestHeaders = new Headers(request.headers);
        const existingCookies = request.headers.get('cookie') || '';
        // Remove existing NEXT_LOCALE if present, then prepend the new one
        const otherCookies = existingCookies.split('; ').filter(c => !c.trim().startsWith('NEXT_LOCALE=')).join('; ');
        const newCookieHeader = `NEXT_LOCALE=${preferredLocale}${otherCookies ? '; ' + otherCookies : ''}`;
        requestHeaders.set('cookie', newCookieHeader);

        // Create a new request with updated headers
        // Use request.url instead of request.nextUrl.clone() for simplicity if clone causes issues
        const newRequest = new NextRequest(request.url, {
          headers: requestHeaders,
          // Ensure other relevant properties like method, body are implicitly handled or copied if needed
        });

        console.log(`Middleware: Passing modified request to next-intl middleware with cookie: ${newCookieHeader}`);
        return nextIntlMiddleware(newRequest); // Pass modified request
      } else {
         console.log(`Middleware: User profile found but no valid preference (${userProfile?.preferred_language}). Proceeding without modification.`);
      }
    } catch (error) {
      console.error('Middleware: Error fetching user profile:', error);
      // Proceed without modification if profile fetch fails
    }
  } else {
     console.log('Middleware: User not logged in. Proceeding without modification.');
  }

  // If no user, no profile, no preference, or error, run next-intl middleware with original request
  console.log('Middleware: Passing original request to next-intl middleware.');
  return nextIntlMiddleware(request);
}

// Keep the original config export
export const config = {
  matcher: [
    // Match the root path
    '/',
    // Match all paths starting with a locale prefix
    `/(${locales.join('|')})/:path*`,
    // Add Clerk middleware matcher exclusions - IMPORTANT!
    // Skip Clerk routes, static files and Next.js internals
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
    // Ensure Clerk auth routes are not processed by this middleware if they shouldn't be
    // '/sign-in(.*)', '/sign-up(.*)'
  ],
};