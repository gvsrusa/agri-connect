import { saveData, getData, removeData } from './asyncStorage';
import { STORAGE_KEYS } from './storageKeys';

interface MarketPrice {
  id: string;
  created_at: string; // Assuming a created_at timestamp
  crop_type: string;
  market_location: string;
  price: number;
  date: string; // Assuming a date field for the price
  // Add other relevant fields from your market_prices table
}

export const saveMarketPrices = async (prices: MarketPrice[]): Promise<void> => {
  await saveData(STORAGE_KEYS.MARKET_PRICES, prices);
};

export const getMarketPrices = async (): Promise<MarketPrice[] | null> => {
  return getData<MarketPrice[]>(STORAGE_KEYS.MARKET_PRICES);
};

// Note: addMarketPrice and removeMarketPrice might not be needed for simple caching of fetched lists.
// If you need to manage individual cached items, these could be adapted or new functions added.

export const clearMarketPrices = async (): Promise<void> => {
  await removeData(STORAGE_KEYS.MARKET_PRICES);
};