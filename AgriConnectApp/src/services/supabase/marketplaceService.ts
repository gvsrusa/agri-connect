import { supabase, handleSupabaseError } from './supabaseClient';
import { Database } from './supabaseTypes';

type MarketplaceListing = Database['public']['Tables']['marketplace_listings']['Row'];
type InsertMarketplaceListing = Database['public']['Tables']['marketplace_listings']['Insert'];

export const getMarketplaceListings = async (): Promise<MarketplaceListing[] | null> => {
  const { data, error } = await supabase
    .from('marketplace_listings')
    .select('*');

  if (error) {
    handleSupabaseError(error, 'getMarketplaceListings');
    return null;
  }
  return data;
};

export const getMarketplaceListingsByUserId = async (userId: string): Promise<MarketplaceListing[] | null> => {
  const { data, error } = await supabase
    .from('marketplace_listings')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    handleSupabaseError(error, 'getMarketplaceListingsByUserId');
    return null;
  }
  return data;
};

export const createMarketplaceListing = async (listing: InsertMarketplaceListing): Promise<MarketplaceListing | null> => {
  const { data, error } = await supabase
    .from('marketplace_listings')
    .insert(listing)
    .select()
    .single();

  if (error) {
    handleSupabaseError(error, 'createMarketplaceListing');
    return null;
  }
  return data;
};

export const getMarketplaceListingById = async (id: string): Promise<MarketplaceListing | null> => {
  const { data, error } = await supabase
    .from('marketplace_listings')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    handleSupabaseError(error, 'getMarketplaceListingById');
    return null;
  }
  return data;
};

export const updateMarketplaceListing = async (id: string, listing: Partial<InsertMarketplaceListing>): Promise<MarketplaceListing | null> => {
  const { data, error } = await supabase
    .from('marketplace_listings')
    .update(listing)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    handleSupabaseError(error, 'updateMarketplaceListing');
    return null;
  }
  return data;
};

export const deleteMarketplaceListing = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('marketplace_listings')
    .delete()
    .eq('id', id);

  if (error) {
    handleSupabaseError(error, 'deleteMarketplaceListing');
    return false;
  }
  return true;
};

export const searchMarketplaceListings = async (query: string): Promise<MarketplaceListing[] | null> => {
  const { data, error } = await supabase
    .from('marketplace_listings')
    .select('*')
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`);

  if (error) {
    handleSupabaseError(error, 'searchMarketplaceListings');
    return null;
  }
  return data;
};

export const filterMarketplaceListings = async (filters: any): Promise<MarketplaceListing[] | null> => {
  let query = supabase
    .from('marketplace_listings')
    .select('*');

  // Example filtering logic (can be expanded based on actual filter requirements)
  if (filters.category) {
    query = query.eq('category', filters.category);
  }
  if (filters.minPrice) {
    query = query.gte('price', filters.minPrice);
  }
  if (filters.maxPrice) {
    query = query.lte('price', filters.maxPrice);
  }

  const { data, error } = await query;

  if (error) {
    handleSupabaseError(error, 'filterMarketplaceListings');
    return null;
  }
  return data;
};