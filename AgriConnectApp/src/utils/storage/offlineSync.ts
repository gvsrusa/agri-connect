import { getData, saveData, removeData } from './asyncStorage';
import { STORAGE_KEYS } from './storageKeys';
import NetInfo from '@react-native-community/netinfo'; // Assuming this package is installed
import { OfflineQueueItem } from '../../types';

interface OfflineAction {
  type: string;
  payload: any;
}

export const queueAction = async (action: OfflineAction): Promise<void> => {
  try {
    const queue = await getData<OfflineAction[]>(STORAGE_KEYS.OFFLINE_ACTIONS_QUEUE) || [];
    queue.push(action);
    await saveData(STORAGE_KEYS.OFFLINE_ACTIONS_QUEUE, queue);
  } catch (e) {
    console.error('Error queuing offline action', e);
  }
};

export const processQueue = async (): Promise<void> => {
  const isOnline = await checkConnectivity();
  if (!isOnline) {
    console.log('Device is offline, cannot process queue.');
    return;
  }

  try {
    const queue = await getData<OfflineAction[]>(STORAGE_KEYS.OFFLINE_ACTIONS_QUEUE) || [];
    if (queue.length === 0) {
      console.log('Offline action queue is empty.');
      return;
    }

    console.log(`Processing ${queue.length} offline actions.`);

    for (const action of queue) {
      console.log('Processing action:', action);
      // TODO: Implement actual action processing based on action.type and action.payload
      // Example: if (action.type === 'ADD_LISTING') { await addListing(action.payload); }
    }

    // Clear the queue after processing
    await removeData(STORAGE_KEYS.OFFLINE_ACTIONS_QUEUE);
    console.log('Offline action queue processed and cleared.');

  } catch (e) {
    console.error('Error processing offline action queue', e);
  }
};

export const checkConnectivity = async (): Promise<boolean> => {
  try {
    const state = await NetInfo.fetch();
    return state.isConnected || false;
  } catch (e) {
    console.error('Error checking connectivity', e);
    return false;
  }
};

/**
 * Adds an item to the offline sync queue
 * @param item The offline queue item to add
 */
export const addToOfflineQueue = async (item: OfflineQueueItem): Promise<void> => {
  try {
    // Get existing queue or initialize empty array
    const queue = await getData<OfflineQueueItem[]>(STORAGE_KEYS.OFFLINE_QUEUE) || [];
    
    // Add new item to the queue
    queue.push(item);
    
    // Save updated queue back to storage
    await saveData(STORAGE_KEYS.OFFLINE_QUEUE, queue);
    
    console.log(`Added item to offline queue: ${item.entity} - ${item.action}`);
  } catch (error) {
    console.error('Error adding item to offline queue:', error);
    throw error;
  }
};

/**
 * Processes the offline sync queue when the device is online
 * @returns Number of successfully processed items
 */
export const processOfflineQueue = async (): Promise<number> => {
  const isOnline = await checkConnectivity();
  if (!isOnline) {
    console.log('Device is offline, cannot process offline queue.');
    return 0;
  }
  
  try {
    // Get the queue
    const queue = await getData<OfflineQueueItem[]>(STORAGE_KEYS.OFFLINE_QUEUE) || [];
    
    if (queue.length === 0) {
      console.log('Offline queue is empty.');
      return 0;
    }
    
    console.log(`Processing ${queue.length} items in offline queue.`);
    
    let successCount = 0;
    const remainingItems: OfflineQueueItem[] = [];
    
    // Process each item in the queue
    for (const item of queue) {
      try {
        // Process based on entity and action
        switch (item.entity) {
          case 'listing':
            // Handle marketplace listings
            // if (item.action === 'create') await createListing(item.data);
            // else if (item.action === 'update') await updateListing(item.data.id, item.data);
            // else if (item.action === 'delete') await deleteListing(item.data.id);
            break;
            
          case 'transport':
            // Handle transport requests
            // if (item.action === 'create') await createTransportRequest(item.data);
            // else if (item.action === 'update') await updateTransportRequest(item.data.id, item.data);
            // else if (item.action === 'delete') await deleteTransportRequest(item.data.id);
            break;
            
          case 'review':
            // Handle reviews
            // if (item.action === 'create') await createReview(item.data);
            // else if (item.action === 'update') await updateReview(item.data.id, item.data);
            // else if (item.action === 'delete') await deleteReview(item.data.id);
            break;
            
          default:
            console.warn(`Unknown entity type: ${item.entity}`);
            break;
        }
        
        // If we get here, the item was processed successfully
        successCount++;
      } catch (error) {
        console.error(`Error processing offline item (${item.entity} - ${item.action}):`, error);
        
        // Increment retry count and keep in queue if under max retries
        const maxRetries = 3;
        if (item.retryCount < maxRetries) {
          remainingItems.push({
            ...item,
            retryCount: item.retryCount + 1
          });
        } else {
          console.warn(`Dropping offline item after ${maxRetries} failed attempts:`, item);
        }
      }
    }
    
    // Save remaining items back to queue
    if (remainingItems.length > 0) {
      await saveData(STORAGE_KEYS.OFFLINE_QUEUE, remainingItems);
      console.log(`${remainingItems.length} items remain in offline queue.`);
    } else {
      // Clear the queue if all items were processed
      await removeData(STORAGE_KEYS.OFFLINE_QUEUE);
      console.log('Offline queue processed and cleared.');
    }
    
    return successCount;
  } catch (error) {
    console.error('Error processing offline queue:', error);
    return 0;
  }
};