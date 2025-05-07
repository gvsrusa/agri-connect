import { supabase, handleSupabaseError } from './supabaseClient';
import { AuthError, Session, User } from '@supabase/supabase-js';

export const signIn = async (email: string, password: string): Promise<{ user: User | null; session: Session | null; error: AuthError | null }> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    handleSupabaseError(error, 'signIn');
  }
  const { user, session } = data;
  return { user, session, error };
};

export const signInWithGoogle = async (): Promise<{ error: AuthError | null }> => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'exp://192.168.1.100:19000', // Replace with your Expo redirect URL
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });
  if (error) {
    handleSupabaseError(error, 'signInWithGoogle');
  }
  // The user and session will be available via the auth state change listener after redirect
  return { error };
};

export const signOut = async (): Promise<{ error: AuthError | null }> => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    handleSupabaseError(error, 'signOut');
  }
  return { error };
};

export const signUp = async (email: string, password: string): Promise<{ user: User | null; session: Session | null; error: AuthError | null }> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    handleSupabaseError(error, 'signUp');
  }
  const { user, session } = data;
  return { user, session, error };
};

export const getCurrentUser = async (): Promise<{ user: User | null }> => {
  const { data: { user } } = await supabase.auth.getUser();
  return { user };
};

export const getSession = async (): Promise<{ session: Session | null }> => {
  const { data: { session } } = await supabase.auth.getSession();
  return { session };
};