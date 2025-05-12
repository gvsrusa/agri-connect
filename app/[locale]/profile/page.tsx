import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { getUserProfile } from '@/lib/userProfile'; // Direct lib call might be better server-side
import UserProfileFormWrapper from '@/components/profile/UserProfileFormWrapper'; // Need to create this
import { getTranslations } from 'next-intl/server'; // Server component i18n

// Revalidate data when profile is updated? Or rely on client-side refresh?
// export const revalidate = 0; // Example: Disable caching

interface ProfilePageProps {
  params: {
    locale: string;
  };
}

export default async function ProfilePage({ params: { locale } }: ProfilePageProps) {
  const { userId } = await auth();
  const t = await getTranslations({ locale, namespace: 'profile' }); // Load translations

  if (!userId) {
    // This should ideally be handled by middleware, but as a fallback:
    // redirect('/sign-in'); // Or show an unauthorized message
    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold mb-4">{t('unauthorizedTitle')}</h1>
            <p>{t('unauthorizedMessage')}</p>
            {/* Optionally add a link to sign in */}
        </main>
    );
  }

  // Fetch profile data directly using the library function server-side
  // This avoids an extra API call from the server to itself.
  let userProfile = null;
  try {
    userProfile = await getUserProfile(userId);
    console.log(`ProfilePage: Fetched profile for ${userId}:`, userProfile);
  } catch (error) {
    console.error(`ProfilePage: Error fetching profile for ${userId}:`, error);
    // Handle error display if necessary
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">
        {userProfile ? t('editTitle') : t('setupTitle')}
      </h1>
      <p className="mb-6 text-gray-600">
        {userProfile ? t('editDescription') : t('setupDescription')}
      </p>

      {/*
        The UserProfileForm requires client-side hooks (useState, react-hook-form).
        We need a Client Component wrapper to handle the form state and submission.
      */}
      <UserProfileFormWrapper initialProfile={userProfile} />

    </main>
  );
}