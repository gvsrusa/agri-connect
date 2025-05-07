import AsyncStorage from '@react-native-async-storage/async-storage';
import { Transporter, TransportRequest, TransportRequestFormData } from '../../types';
import { STORAGE_KEYS } from './storageKeys';

/**
 * Store transporters data locally
 */
export const storeTransporters = async (transporters: Transporter[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.TRANSPORTERS,
      JSON.stringify(transporters)
    );
  } catch (error) {
    console.error('Error storing transporters data:', error);
    throw error;
  }
};

/**
 * Get stored transporters data
 */
export const getStoredTransporters = async (): Promise<Transporter[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.TRANSPORTERS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error retrieving stored transporters data:', error);
    return [];
  }
};

/**
 * Store a specific transporter data locally
 */
export const storeTransporter = async (transporter: Transporter): Promise<void> => {
  try {
    const transporters = await getStoredTransporters();
    const existingIndex = transporters.findIndex(t => t.id === transporter.id);
    
    if (existingIndex >= 0) {
      transporters[existingIndex] = transporter;
    } else {
      transporters.push(transporter);
    }
    
    await storeTransporters(transporters);
  } catch (error) {
    console.error(`Error storing transporter data for ${transporter.id}:`, error);
    throw error;
  }
};

/**
 * Get a specific stored transporter by ID
 */
export const getStoredTransporterById = async (transporterId: string): Promise<Transporter | null> => {
  try {
    const transporters = await getStoredTransporters();
    return transporters.find(t => t.id === transporterId) || null;
  } catch (error) {
    console.error(`Error retrieving stored transporter data for ${transporterId}:`, error);
    return null;
  }
};

/**
 * Store transport requests data locally
 */
export const storeTransportRequests = async (requests: TransportRequest[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.TRANSPORT_REQUESTS,
      JSON.stringify(requests)
    );
  } catch (error) {
    console.error('Error storing transport requests data:', error);
    throw error;
  }
};

/**
 * Get stored transport requests data
 */
export const getStoredTransportRequests = async (): Promise<TransportRequest[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.TRANSPORT_REQUESTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error retrieving stored transport requests data:', error);
    return [];
  }
};

/**
 * Store a specific transport request data locally
 */
export const storeTransportRequest = async (request: TransportRequest): Promise<void> => {
  try {
    const requests = await getStoredTransportRequests();
    const existingIndex = requests.findIndex(r => r.id === request.id);
    
    if (existingIndex >= 0) {
      requests[existingIndex] = request;
    } else {
      requests.push(request);
    }
    
    await storeTransportRequests(requests);
  } catch (error) {
    console.error(`Error storing transport request data for ${request.id}:`, error);
    throw error;
  }
};

/**
 * Get stored transport requests for a specific user
 */
export const getStoredTransportRequestsByUserId = async (userId: string): Promise<TransportRequest[]> => {
  try {
    const requests = await getStoredTransportRequests();
    return requests.filter(r => r.user_id === userId);
  } catch (error) {
    console.error(`Error retrieving stored transport requests for user ${userId}:`, error);
    return [];
  }
};

/**
 * Get a specific stored transport request by ID
 */
export const getStoredTransportRequestById = async (requestId: string): Promise<TransportRequest | null> => {
  try {
    const requests = await getStoredTransportRequests();
    return requests.find(r => r.id === requestId) || null;
  } catch (error) {
    console.error(`Error retrieving stored transport request data for ${requestId}:`, error);
    return null;
  }
};

/**
 * Queue a transport request for later submission when online
 */
export const queueTransportRequest = async (
  requestData: TransportRequestFormData,
  userId: string
): Promise<void> => {
  try {
    // Get existing queued requests
    const queuedRequestsData = await AsyncStorage.getItem(STORAGE_KEYS.TRANSPORT_REQUEST_QUEUE);
    const queuedRequests = queuedRequestsData ? JSON.parse(queuedRequestsData) : [];
    
    // Add the new request to the queue
    queuedRequests.push({
      data: requestData,
      userId,
      timestamp: new Date().toISOString(),
    });
    
    // Save the updated queue
    await AsyncStorage.setItem(
      STORAGE_KEYS.TRANSPORT_REQUEST_QUEUE,
      JSON.stringify(queuedRequests)
    );
  } catch (error) {
    console.error('Error queueing transport request:', error);
    throw error;
  }
};

/**
 * Get all queued transport requests
 */
export const getQueuedTransportRequests = async (): Promise<
  Array<{ data: TransportRequestFormData; userId: string; timestamp: string }>
> => {
  try {
    const queuedRequestsData = await AsyncStorage.getItem(STORAGE_KEYS.TRANSPORT_REQUEST_QUEUE);
    return queuedRequestsData ? JSON.parse(queuedRequestsData) : [];
  } catch (error) {
    console.error('Error retrieving queued transport requests:', error);
    return [];
  }
};

/**
 * Remove a queued transport request after it has been successfully submitted
 */
export const removeQueuedTransportRequest = async (index: number): Promise<void> => {
  try {
    const queuedRequests = await getQueuedTransportRequests();
    
    if (index >= 0 && index < queuedRequests.length) {
      queuedRequests.splice(index, 1);
      
      await AsyncStorage.setItem(
        STORAGE_KEYS.TRANSPORT_REQUEST_QUEUE,
        JSON.stringify(queuedRequests)
      );
    }
  } catch (error) {
    console.error(`Error removing queued transport request at index ${index}:`, error);
    throw error;
  }
};

/**
 * Clear all transport-related data from storage
 */
export const clearTransportStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.TRANSPORTERS,
      STORAGE_KEYS.TRANSPORT_REQUESTS,
      STORAGE_KEYS.TRANSPORT_REQUEST_QUEUE,
    ]);
  } catch (error) {
    console.error('Error clearing transport storage:', error);
    throw error;
  }
};