'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation'; // To potentially refresh data
import UserProfileForm from './UserProfileForm';
import { UserProfile, UserProfileUpdate } from '@/types/userProfile';
import { useLocale } from 'next-intl'; // To potentially update locale state if language changes

interface UserProfileFormWrapperProps {
  initialProfile: UserProfile | null;
}

const UserProfileFormWrapper: React.FC<UserProfileFormWrapperProps> = ({ initialProfile }) => {
  const router = useRouter();
  const currentLocale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  // useTransition can help manage pending states for Server Actions, but using fetch here
  // const [isPending, startTransition] = useTransition();

  // Store the profile state locally to update the form if submission is successful
  // Note: This might differ if using Server Actions + revalidation
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(initialProfile);

  const handleFormSubmit = async (data: UserProfileUpdate) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    console.log('UserProfileFormWrapper: Submitting data:', data);

    try {
      const response = await fetch('/api/user-profile', {
        method: 'POST', // Using POST for create/update based on API route logic
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('API Error Response:', errorData);
        throw new Error(errorData || `Failed to update profile. Status: ${response.status}`);
      }

      const updatedProfile: UserProfile = await response.json();
      console.log('UserProfileFormWrapper: Profile updated successfully:', updatedProfile);
      setCurrentProfile(updatedProfile); // Update local state
      setSuccess('Profile updated successfully!'); // Provide user feedback

      // --- Post-update actions ---

      // 1. Refresh server components data?
      // router.refresh(); // This re-fetches data for the current route (Server Components)

      // 2. If language changed, redirect to apply new locale?
      // This depends heavily on how i18n routing is set up.
      // A simple refresh might be enough if middleware handles locale based on profile.
      if (data.preferred_language && data.preferred_language !== currentLocale) {
         console.log(`Language changed from ${currentLocale} to ${data.preferred_language}. Refreshing...`);
         // Option A: Simple refresh (might work if middleware detects new pref)
         router.refresh(); 
         // Option B: Hard reload (less ideal)
         // window.location.reload(); 
         // Option C: Redirect to same page with new locale (if routing supports it)
         // const currentPathname = window.location.pathname.replace(`/${currentLocale}`, '');
         // router.push(`/${data.preferred_language}${currentPathname}`);
      } else {
         // If language didn't change, just refresh server data
         router.refresh();
      }


    } catch (err: any) {
      console.error('UserProfileFormWrapper: Submission error:', err);
      setError(err.message || 'An unexpected error occurred.');
      setSuccess(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {error && <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-400 rounded">{error}</div>}
      {success && <div className="mb-4 p-3 text-green-700 bg-green-100 border border-green-400 rounded">{success}</div>}
      <UserProfileForm
        userProfile={currentProfile} // Use state that can be updated
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default UserProfileFormWrapper;