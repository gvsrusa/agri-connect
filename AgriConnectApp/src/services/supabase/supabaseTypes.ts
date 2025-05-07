// This file will contain TypeScript types generated from your Supabase database schema.
// You can generate these types using the Supabase CLI:
// supabase gen types typescript --project-id "YOUR_PROJECT_ID" --schema public > src/services/supabase/supabaseTypes.ts
// Replace "YOUR_PROJECT_ID" with your actual Supabase project ID.

export type Database = {
  public: {
    Tables: {
      // Define your table types here, for example:
      // profiles: {
      //   Row: { // The data expected from a row
      //     id: string;
      //     updated_at: string | null;
      //     username: string | null;
      //     avatar_url: string | null;
      //     website: string | null;
      //   };
      //   Insert: { // The data types accepted for insert
      //     id: string;
      //     updated_at?: string | null;
      //     username?: string | null;
      //     avatar_url?: string | null;
      //     website?: string | null;
      //   };
      //   Update: { // The data types accepted for update
      //     id?: string;
      //     updated_at?: string | null;
      //     username?: string | null;
      //     avatar_url?: string | null;
      //     website?: string | null;
      //   };
      // };
      // Add other tables here...
      marketplace_listings: {
        Row: Listing;
        Insert: Partial<Listing>;
        Update: Partial<Listing>;
      };
      market_prices: {
        Row: any; // Placeholder
      };
    };
    Views: {
      // Define your view types here
    };
    Functions: {
      // Define your function types here
    };
    Enums: {
      // Define your enum types here
    };
  };
};

// Define a basic Listing type based on common marketplace listing properties
export interface Listing {
  id: string;
  created_at: string;
  user_id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image_url?: string | null;
}