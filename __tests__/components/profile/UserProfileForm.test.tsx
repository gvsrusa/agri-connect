/** @jest-environment jsdom */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserProfileForm from '@/components/profile/UserProfileForm';
import { UserProfile } from '@/types/userProfile';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: (namespace: string) => (key: string) => {
    // Provide simple mock translations for labels/errors
    const translations: { [key: string]: string } = {
      'profile.form.nameLabel': 'Display Name',
      'profile.form.namePlaceholder': 'Enter your display name',
      'profile.form.languageLabel': 'Preferred Language',
      'profile.form.languagePlaceholder': '-- Select Language --', // Added placeholder text
      'profile.form.languageRequired': 'Language is required',
      'profile.form.locationLabel': 'Farm Location',
      'profile.form.locationPlaceholder': 'e.g., City, Country',
      'profile.form.locationRequired': 'Location is required',
      'profile.form.saveButton': 'Save Profile',
      'profile.form.submittingButton': 'Saving...',
      'profile.languages.en': 'English',
      'profile.languages.es': 'Spanish',
      'profile.languages.hi': 'Hindi',
      'profile.languages.ta': 'Tamil',
    };
    return translations[`${namespace}.${key}`] || `${namespace}.${key}`;
  },
  // Mock other exports if needed by the component
}));

const mockProfile: UserProfile = {
  id: 'prof_1',
  clerk_user_id: 'user_1',
  name: 'Test Farmer',
  farm_location: 'Test Farm, USA',
  preferred_language: 'en',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

describe('UserProfileForm Component', () => {
  let mockOnSubmit: jest.Mock;

  beforeEach(() => {
    mockOnSubmit = jest.fn().mockResolvedValue(undefined); // Mock the submit handler
  });

  test('renders correctly with initial profile data', () => {
    render(
      <UserProfileForm
        userProfile={mockProfile}
        onSubmit={mockOnSubmit}
        isSubmitting={false}
      />
    );

    // Check if fields are rendered with correct initial values
    expect(screen.getByLabelText('Display Name')).toHaveValue(mockProfile.name);
    expect(screen.getByLabelText(/Preferred Language/)).toHaveValue(mockProfile.preferred_language);
    expect(screen.getByLabelText(/Farm Location/)).toHaveValue(mockProfile.farm_location);
    expect(screen.getByRole('button', { name: 'Save Profile' })).toBeInTheDocument();
  });

  test('renders correctly for initial setup (null profile)', () => {
    render(
      <UserProfileForm
        userProfile={null}
        onSubmit={mockOnSubmit}
        isSubmitting={false}
      />
    );

    // Check default values
    expect(screen.getByLabelText('Display Name')).toHaveValue('');
    expect(screen.getByLabelText(/Preferred Language/)).toHaveValue(''); // Changed expected default to empty string
    expect(screen.getByLabelText(/Farm Location/)).toHaveValue('');
  });

  test('calls onSubmit with correct data when form is submitted', async () => {
    render(
      <UserProfileForm
        userProfile={null} // Start with setup
        onSubmit={mockOnSubmit}
        isSubmitting={false}
      />
    );

    const nameInput = screen.getByLabelText('Display Name');
    const languageSelect = screen.getByLabelText(/Preferred Language/);
    const locationInput = screen.getByLabelText(/Farm Location/);
    const submitButton = screen.getByRole('button', { name: 'Save Profile' });

    // Fill the form
    fireEvent.change(nameInput, { target: { value: 'New Farmer' } });
    fireEvent.change(languageSelect, { target: { value: 'es' } });
    fireEvent.change(locationInput, { target: { value: 'New Farm, Spain' } });

    // Submit the form
    fireEvent.click(submitButton);

    // Wait for onSubmit to be called
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    // Check the data passed to onSubmit
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'New Farmer',
      preferred_language: 'es',
      farm_location: 'New Farm, Spain',
    });
  });

   test('trims whitespace and sends null for empty location', async () => {
    render(
      <UserProfileForm
        userProfile={null}
        onSubmit={mockOnSubmit}
        isSubmitting={false}
      />
    );

    const languageSelect = screen.getByLabelText(/Preferred Language/);
    const locationInput = screen.getByLabelText(/Farm Location/);
    const submitButton = screen.getByRole('button', { name: 'Save Profile' });

    // Fill the form with whitespace
    fireEvent.change(languageSelect, { target: { value: 'hi' } });
    fireEvent.change(locationInput, { target: { value: '   ' } }); // Only whitespace

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({
      preferred_language: 'hi',
      farm_location: null, // Should be null after trimming
    }));
  });


  test('displays validation errors for required fields', async () => {
    render(
      <UserProfileForm
        userProfile={null}
        onSubmit={mockOnSubmit}
        isSubmitting={false}
      />
    );

    const submitButton = screen.getByRole('button', { name: 'Save Profile' });

    // Submit without filling required fields
    fireEvent.click(submitButton);

    // Check for error messages
    expect(await screen.findByText('Language is required')).toBeInTheDocument();
    expect(await screen.findByText('Location is required')).toBeInTheDocument();

    // Ensure onSubmit was NOT called
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('disables submit button when isSubmitting is true', () => {
    render(
      <UserProfileForm
        userProfile={mockProfile}
        onSubmit={mockOnSubmit}
        isSubmitting={true} // Set submitting state
      />
    );

    const submitButton = screen.getByRole('button', { name: 'Saving...' });
    expect(submitButton).toBeDisabled();
  });
});