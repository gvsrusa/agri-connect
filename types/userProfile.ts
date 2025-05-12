export interface UserProfile {
  id: string; // UUID or auto-incrementing integer from Supabase
  clerk_user_id: string; // Clerk User ID
  name?: string; // Optional, display name
  farm_location?: string | null; // Text or Geographic type
  preferred_language?: string | null; // e.g., 'en', 'hi', 'ta'
  created_at: string; // Timestamp
  updated_at: string; // Timestamp
}

export interface UserProfileUpdate {
  farm_location?: string | null;
  preferred_language?: string | null;
  name?: string;
}

export interface UserProfileCreate extends UserProfileUpdate {
  clerk_user_id: string;
}