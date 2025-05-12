import { UserProfile, UserProfileCreate, UserProfileUpdate } from '@/types/userProfile';

// This is a placeholder for Supabase client initialization
const supabase = {
  from: (tableName: string) => ({
    select: () => ({
      eq: async (columnName: string, value: string) => {
        // Simulate fetching a profile
        if (tableName === 'user_profiles' && columnName === 'clerk_user_id') {
          if (value === 'user_123_no_profile') {
            return { data: [], error: null };
          }
          if (value === 'user_123_existing_profile') {
            return { data: [{
              id: 'prof_123',
              clerk_user_id: value,
              name: 'Test User Existing',
              farm_location: 'Existing Farm',
              preferred_language: 'en',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }], error: null };
          }
        }
        return { data: [], error: new Error('Mock Supabase: Not found') };
      },
    }),
    insert: (dataToInsert: any) => ({
      select: async () => {
        // Simulate inserting a profile
        if (tableName === 'user_profiles' && dataToInsert && dataToInsert.length > 0) {
          const input = dataToInsert[0] as UserProfileCreate;
          return { data: [{
            id: `prof_${Date.now()}`,
            clerk_user_id: input.clerk_user_id,
            name: input.name || null,
            farm_location: input.farm_location,
            preferred_language: input.preferred_language,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }], error: null };
        }
        return { data: [], error: new Error('Mock Supabase: Insert failed') };
      }
    }),
    // Add update, delete etc. as needed
  }),
};
// End placeholder

export async function getUserProfile(clerkUserId: string): Promise<UserProfile | null> {
  console.log(`lib/userProfile.ts: getUserProfile called for ${clerkUserId}`);
  // In a real app, you'd fetch this from Supabase
  // This mock logic is to satisfy initial tests if they were calling this directly.
  // The tests currently mock fetch at a higher level.
  if (clerkUserId === 'user_123_no_profile_for_direct_call') {
    return null;
  }
  if (clerkUserId === 'user_123') { // Default mock user from tests
     // Simulate a scenario where the profile might be missing for the test user initially
    return null; 
  }
  return {
    id: 'prof_existing_direct',
    clerk_user_id: clerkUserId,
    name: 'Mocked User',
    farm_location: 'Mocked Farm',
    preferred_language: 'en',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export async function createUserProfile(profileData: UserProfileCreate): Promise<UserProfile> {
  console.log('lib/userProfile.ts: createUserProfile called with:', profileData);
  // In a real app, you'd insert this into Supabase
  const newProfile: UserProfile = {
    id: `new_prof_${Date.now()}`, // Generate a mock ID
    ...profileData,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  return newProfile;
}

export async function updateUserProfile(clerkUserId: string, profileUpdateData: UserProfileUpdate): Promise<UserProfile | null> {
  console.log(`lib/userProfile.ts: updateUserProfile called for ${clerkUserId} with:`, profileUpdateData);
  // In a real app, you'd update this in Supabase and return the updated profile
  // For now, let's assume we fetch the existing profile and merge
  const existingProfile = await getUserProfile(clerkUserId);
  if (!existingProfile) {
    return null; // Or throw an error: profile not found
  }
  const updatedProfile: UserProfile = {
    ...existingProfile,
    ...profileUpdateData,
    updated_at: new Date().toISOString(),
  };
  return updatedProfile;
}