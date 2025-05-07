import { saveData, getData, removeData } from './asyncStorage';
import { STORAGE_KEYS } from './storageKeys';
import { createMarketplaceListing } from '../../services/supabase/marketplaceService';

interface MarketplaceListing {
  id: string;
  name: string;
  price: number;
  // Add other relevant fields
}

export const saveMarketplaceListings = async (listings: MarketplaceListing[]): Promise<void> => {
  await saveData(STORAGE_KEYS.MARKETPLACE_LISTINGS, listings);
};

export const getMarketplaceListings = async (): Promise<MarketplaceListing[] | null> => {
  return getData<MarketplaceListing[]>(STORAGE_KEYS.MARKETPLACE_LISTINGS);
};

export const addMarketplaceListing = async (listing: MarketplaceListing): Promise<void> => {
  const currentListings = await getMarketplaceListings() || [];
  currentListings.push(listing);
  await saveMarketplaceListings(currentListings);
};

export const removeMarketplaceListing = async (listingId: string): Promise<void> => {
  const currentListings = await getMarketplaceListings() || [];
  const updatedListings = currentListings.filter(listing => listing.id !== listingId);
  await saveMarketplaceListings(updatedListings);
};

export const clearMarketplaceListings = async (): Promise<void> => {
  await removeData(STORAGE_KEYS.MARKETPLACE_LISTINGS);
};

export const saveOfflineMarketplaceListing = async (listing: MarketplaceListing): Promise<void> => {
  const offlineListings = await getOfflineMarketplaceListings() || [];
  offlineListings.push(listing);
  await saveData(STORAGE_KEYS.OFFLINE_MARKETPLACE_LISTINGS, offlineListings);
};

export const getOfflineMarketplaceListings = async (): Promise<MarketplaceListing[] | null> => {
  return getData<MarketplaceListing[]>(STORAGE_KEYS.OFFLINE_MARKETPLACE_LISTINGS);
};

export const clearOfflineMarketplaceListings = async (): Promise<void> => {
  await removeData(STORAGE_KEYS.OFFLINE_MARKETPLACE_LISTINGS);
};

// This function would be called when the app comes online
export const syncOfflineMarketplaceListings = async (): Promise<void> => {
  const offlineListings = await getOfflineMarketplaceListings();
  if (offlineListings) {
    for (const listing of offlineListings) {
      // Assuming createMarketplaceListing handles potential duplicates or uses a unique ID
      // In a real app, you might need more sophisticated conflict resolution
      await createMarketplaceListing(listing);
    }
    await clearOfflineMarketplaceListings();
  }
};