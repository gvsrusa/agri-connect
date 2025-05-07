import React, { createContext, useState, useEffect, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../services/supabase/supabaseClient';
import { getCurrentUser, getSession, signOut } from '../services/supabase/authService';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { makeRedirectUri } from 'expo-auth-session';
import { useAuthRequest } from 'expo-auth-session/providers/google';
// TODO: Replace with environment variables from .env
import Constants from 'expo-constants';
console.log('Constants.manifest:', Constants.manifest);
console.log('Constants.expoConfig:', Constants.expoConfig);
console.log('Constants:', Constants);
const androidClientId = "277991519825-bki1a9r17lg1qp1amhpajq7e9sd8d23l.apps.googleusercontent.com";
const iosClientId = "YOUR_GOOGLE_IOS_CLIENT_ID";
const clientId = "YOUR_GOOGLE_WEB_CLIENT_ID";
import { saveData, getData, removeData } from '../utils/storage/asyncStorage';
import { STORAGE_KEYS } from '../utils/storage/storageKeys';

WebBrowser.maybeCompleteAuthSession();

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Google AuthSession setup
  const [request, response, promptAsync] = useAuthRequest(
    androidClientId && iosClientId && clientId
      ? {
          clientId,
          iosClientId,
          androidClientId,
          scopes: ['openid', 'profile', 'email'],
          selectAccount: true,
        }
      : { clientId: '', iosClientId: '', androidClientId: '', scopes: [], selectAccount: false }
  );
  if (!(androidClientId && iosClientId && clientId)) {
    // Log for debugging
    console.log('Constants.manifest:', Constants.manifest);
    console.log('Constants.expoConfig:', Constants.expoConfig);
    console.log('Constants:', Constants);
    console.error('Google client IDs are not defined. Check app.config.js and .env setup.');
  }

  useEffect(() => {
    const fetchSession = async () => {
      const { session } = await getSession();
      setSession(session);
      const { user } = await getCurrentUser();
      setUser(user);
      setLoading(false);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        const { user } = await getCurrentUser();
        setUser(user);
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Handle Google AuthSession response
  useEffect(() => {
    const handleAuthResponse = async () => {
      if (response?.type === 'success' && response.authentication?.idToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: response.authentication.idToken,
        });
        if (error) {
          console.error('Supabase sign in with ID token error:', error);
        } else {
          console.log('Supabase sign in successful:', data);
        }
      }
    };
    handleAuthResponse();
  }, [response]);

  const signInWithGoogle = async () => {
    try {
      await promptAsync();
    } catch (error) {
      console.error('Google Sign-In error:', error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    await removeData(STORAGE_KEYS.AUTH_SESSION);
    setSession(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, signInWithGoogle, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};