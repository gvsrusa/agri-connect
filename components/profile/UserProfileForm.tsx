'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { UserProfile, UserProfileUpdate } from '@/types/userProfile';
import { useTranslations } from 'next-intl'; // For labels etc.

interface UserProfileFormProps {
  userProfile: UserProfile | null; // Pass null for setup, existing profile for update
  onSubmit: (data: UserProfileUpdate) => Promise<void>; // Function to handle API call
  isSubmitting: boolean; // To disable button during submission
}

// Define the shape of our form data
type FormData = {
  preferred_language: string;
  farm_location: string;
  name?: string; // Optional name field
};

const UserProfileForm: React.FC<UserProfileFormProps> = ({
  userProfile,
  onSubmit,
  isSubmitting,
}) => {
  const t = useTranslations('profile'); // Assuming 'profile' namespace in messages/xx.json

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      preferred_language: userProfile?.preferred_language || '', // Default to empty string for validation
      farm_location: userProfile?.farm_location || '',
      name: userProfile?.name || '',
    },
  });

  const handleFormSubmit: SubmitHandler<FormData> = async (data) => {
    // Map form data to the update type expected by the API/onSubmit handler
    const updateData: UserProfileUpdate = {
      preferred_language: data.preferred_language,
      farm_location: data.farm_location.trim() || null, // Send null if empty string
      name: data.name?.trim() || undefined, // Send undefined if empty to potentially not update it
    };
    await onSubmit(updateData);
    // Optionally reset form if needed after successful submission
    // reset(data); // Resets to the newly submitted values
  };

  // TODO: Get supported languages dynamically if possible
  const supportedLanguages = [
    { code: 'en', name: t('languages.en') },
    { code: 'es', name: t('languages.es') },
    { code: 'hi', name: t('languages.hi') },
    { code: 'ta', name: t('languages.ta') },
  ];

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          {t('form.nameLabel')}
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder={t('form.namePlaceholder')}
        />
        {/* No specific validation for name for now */}
      </div>

      <div>
        <label htmlFor="preferred_language" className="block text-sm font-medium text-gray-700">
          {t('form.languageLabel')} <span className="text-red-600">*</span>
        </label>
        <select
          id="preferred_language"
          {...register('preferred_language', { required: t('form.languageRequired') })}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            errors.preferred_language ? 'border-red-500' : ''
          }`}
        >
          {/* Add a disabled placeholder option */}
          <option value="" disabled>
            {t('form.languagePlaceholder')}
          </option>
          {supportedLanguages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        {errors.preferred_language && (
          <p className="mt-1 text-sm text-red-600">{errors.preferred_language.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="farm_location" className="block text-sm font-medium text-gray-700">
          {t('form.locationLabel')} <span className="text-red-600">*</span>
        </label>
        <input
          id="farm_location"
          type="text"
          {...register('farm_location', { required: t('form.locationRequired') })}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            errors.farm_location ? 'border-red-500' : ''
          }`}
          placeholder={t('form.locationPlaceholder')}
        />
         {errors.farm_location && (
          <p className="mt-1 text-sm text-red-600">{errors.farm_location.message}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? t('form.submittingButton') : t('form.saveButton')}
        </button>
      </div>
    </form>
  );
};

export default UserProfileForm;