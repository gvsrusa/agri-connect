import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_API_KEY } from '@env';
import { Database } from './supabaseTypes';

// Ensure environment variables are loaded
if (!SUPABASE_URL || !SUPABASE_API_KEY) {
  console.error('Supabase environment variables not loaded!');
  // Depending on the app's needs, you might want to throw an error or handle this differently
}

const supabaseUrl = SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = SUPABASE_API_KEY || 'YOUR_SUPABASE_API_KEY';

// Create Supabase client with minimal configuration to avoid WebSocket dependencies
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: undefined, // Use default storage or implement custom storage for React Native
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Disable real-time subscriptions by overriding the channel method
// @ts-ignore - Intentionally modifying the client to prevent WebSocket usage
if (supabase.realtime && typeof supabase.channel === 'function') {
  // @ts-ignore
  supabase.channel = () => {
    console.warn('Real-time subscriptions are disabled');
    return {
      on: () => ({ subscribe: () => ({ unsubscribe: () => {} }) }),
      subscribe: () => ({ unsubscribe: () => {} }),
    };
  };
}

// Basic error handling example for client creation (can be expanded)
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    console.log('User signed in:', session?.user.id);
  } else if (event === 'SIGNED_OUT') {
    console.log('User signed out');
  } else if (event === 'TOKEN_REFRESHED') {
    console.log('Auth token refreshed');
  } else if (event === 'USER_UPDATED') {
    console.log('User updated');
  } else if (event === 'PASSWORD_RECOVERY') {
    console.log('Password recovery initiated');
  }
});

// Example of a generic error handler for Supabase calls (can be integrated into service modules)
export const handleSupabaseError = (error: any, operation: string) => {
  console.error(`Supabase Error during ${operation}:`, error);
  // Implement more sophisticated error handling, e.g., showing user-friendly messages
  throw new Error(`Operation failed: ${operation}`);
};