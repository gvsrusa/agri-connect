import { supabase, handleSupabaseError } from './supabaseClient';
import { Database } from './supabaseTypes';

type MarketPrice = Database['public']['Tables']['market_prices']['Row'];

export const getMarketPrices = async (
  cropType?: string,
  marketLocation?: string
): Promise<MarketPrice[] | null> => {
  let query = supabase
    .from('market_prices')
    .select('*');

  if (cropType) {
    query = query.eq('crop_type', cropType);
  }

  if (marketLocation) {
    query = query.eq('market_location', marketLocation);
  }

  const { data, error } = await query;

  if (error) {
    handleSupabaseError(error, 'getMarketPrices');
    return null;
  }
  return data;
};

export const getHistoricalPrices = async (
  cropType: string,
  marketLocation: string,
  startDate?: string,
  endDate?: string
): Promise<MarketPrice[] | null> => {
  let query = supabase
    .from('market_prices')
    .select('*')
    .eq('crop_type', cropType)
    .eq('market_location', marketLocation)
    .order('date', { ascending: true });

  if (startDate) {
    query = query.gte('date', startDate);
  }

  if (endDate) {
    query = query.lte('date', endDate);
  }

  const { data, error } = await query;

  if (error) {
    handleSupabaseError(error, 'getHistoricalPrices');
    return null;
  }
  return data;
};