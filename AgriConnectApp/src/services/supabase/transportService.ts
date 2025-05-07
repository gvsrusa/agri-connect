import { supabase } from './supabaseClient';
import { Transporter, TransportRequest, TransportRequestFormData, TransportRequestStatus } from '../../types';

/**
 * Fetch all transporters
 */
export const fetchTransporters = async (): Promise<Transporter[]> => {
  try {
    const { data, error } = await supabase
      .from('transporters')
      .select('*')
      .order('rating', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching transporters:', error);
    throw error;
  }
};

/**
 * Fetch featured transporters (top rated or promoted)
 */
export const fetchFeaturedTransporters = async (): Promise<Transporter[]> => {
  try {
    const { data, error } = await supabase
      .from('transporters')
      .select('*')
      .eq('featured', true)
      .order('rating', { ascending: false })
      .limit(5);
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching featured transporters:', error);
    throw error;
  }
};

/**
 * Fetch a specific transporter by ID
 */
export const fetchTransporterById = async (transporterId: string): Promise<Transporter | null> => {
  try {
    const { data, error } = await supabase
      .from('transporters')
      .select('*')
      .eq('id', transporterId)
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching transporter with ID ${transporterId}:`, error);
    throw error;
  }
};

/**
 * Filter transporters by location
 */
export const filterTransportersByLocation = async (location: string): Promise<Transporter[]> => {
  try {
    const { data, error } = await supabase
      .from('transporters')
      .select('*')
      .ilike('location', `%${location}%`)
      .order('rating', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error filtering transporters by location:', error);
    throw error;
  }
};

/**
 * Filter transporters by vehicle type
 */
export const filterTransportersByVehicleType = async (vehicleType: string): Promise<Transporter[]> => {
  try {
    const { data, error } = await supabase
      .from('transporters')
      .select('*')
      .ilike('vehicle_type', `%${vehicleType}%`)
      .order('rating', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error filtering transporters by vehicle type:', error);
    throw error;
  }
};

/**
 * Filter transporters by capacity
 */
export const filterTransportersByCapacity = async (capacity: number): Promise<Transporter[]> => {
  try {
    const { data, error } = await supabase
      .from('transporters')
      .select('*')
      .lte('capacity', capacity)
      .order('capacity', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error filtering transporters by capacity:', error);
    throw error;
  }
};

/**
 * Fetch transport ratings for a specific transporter
 */
export const fetchTransporterRatings = async (transporterId: string): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('transport_ratings')
      .select('*')
      .eq('transporter_id', transporterId)
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error(`Error fetching ratings for transporter ${transporterId}:`, error);
    throw error;
  }
};

/**
 * Create a new transport request
 */
export const createTransportRequest = async (
  requestData: TransportRequestFormData,
  userId: string
): Promise<TransportRequest> => {
  try {
    // Calculate estimated price if not provided
    let price = undefined;
    
    if (!price && requestData.transporter_id) {
      // Fetch transporter to get price per km
      const transporter = await fetchTransporterById(requestData.transporter_id);
      
      if (transporter && transporter.price_per_km) {
        // Simple distance calculation (placeholder)
        // In a real app, this would use a mapping service API
        const distance = 10; // Placeholder distance in km
        price = transporter.price_per_km * distance;
      }
    }
    
    const newRequest = {
      user_id: userId,
      transporter_id: requestData.transporter_id,
      pickup_location: requestData.pickup_location,
      delivery_location: requestData.delivery_location,
      scheduled_date: requestData.scheduled_date,
      cargo_type: requestData.cargo_type,
      cargo_weight: requestData.cargo_weight,
      cargo_volume: requestData.cargo_volume,
      special_instructions: requestData.special_instructions,
      contact_name: requestData.contact_name,
      contact_phone: requestData.contact_phone,
      status: 'pending' as TransportRequestStatus,
      price,
      distance: 10, // Placeholder distance in km
      created_at: new Date().toISOString(),
    };
    
    const { data, error } = await supabase
      .from('transport_requests')
      .insert(newRequest)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error creating transport request:', error);
    throw error;
  }
};

/**
 * Fetch transport requests for a specific user
 */
export const fetchUserTransportRequests = async (userId: string): Promise<TransportRequest[]> => {
  try {
    const { data, error } = await supabase
      .from('transport_requests')
      .select(`
        *,
        transporters:transporter_id (
          id,
          name,
          image_url,
          contact_number,
          vehicle_type
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error(`Error fetching transport requests for user ${userId}:`, error);
    throw error;
  }
};

/**
 * Fetch transport requests for a specific transporter
 */
export const fetchTransporterRequests = async (transporterId: string): Promise<TransportRequest[]> => {
  try {
    const { data, error } = await supabase
      .from('transport_requests')
      .select('*')
      .eq('transporter_id', transporterId)
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error(`Error fetching transport requests for transporter ${transporterId}:`, error);
    throw error;
  }
};

/**
 * Fetch a specific transport request by ID
 */
export const fetchTransportRequestById = async (requestId: string): Promise<TransportRequest | null> => {
  try {
    const { data, error } = await supabase
      .from('transport_requests')
      .select(`
        *,
        transporters:transporter_id (
          id,
          name,
          image_url,
          contact_number,
          vehicle_type,
          location
        )
      `)
      .eq('id', requestId)
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching transport request with ID ${requestId}:`, error);
    throw error;
  }
};

/**
 * Update the status of a transport request
 */
export const updateTransportRequestStatus = async (
  requestId: string,
  status: TransportRequestStatus
): Promise<void> => {
  try {
    const { error } = await supabase
      .from('transport_requests')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', requestId);
    
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error(`Error updating status for transport request ${requestId}:`, error);
    throw error;
  }
};

/**
 * Rate a transporter after a completed transport
 */
export const rateTransporter = async (
  transporterId: string,
  userId: string,
  requestId: string,
  rating: number,
  comment?: string
): Promise<void> => {
  try {
    const { error } = await supabase.from('transport_ratings').insert({
      transporter_id: transporterId,
      user_id: userId,
      request_id: requestId,
      rating,
      comment,
      created_at: new Date().toISOString(),
    });
    
    if (error) {
      throw error;
    }
    
    // Update the transporter's average rating
    await updateTransporterRating(transporterId);
  } catch (error) {
    console.error(`Error rating transporter ${transporterId}:`, error);
    throw error;
  }
};

/**
 * Update a transporter's average rating
 */
const updateTransporterRating = async (transporterId: string): Promise<void> => {
  try {
    // Get all ratings for the transporter
    const { data: ratings, error: ratingsError } = await supabase
      .from('transport_ratings')
      .select('rating')
      .eq('transporter_id', transporterId);
    
    if (ratingsError) {
      throw ratingsError;
    }
    
    if (!ratings || ratings.length === 0) {
      return;
    }
    
    // Calculate average rating
    const totalRating = ratings.reduce((sum, item) => sum + item.rating, 0);
    const averageRating = totalRating / ratings.length;
    
    // Update the transporter's rating
    const { error: updateError } = await supabase
      .from('transporters')
      .update({
        rating: averageRating,
        rating_count: ratings.length,
      })
      .eq('id', transporterId);
    
    if (updateError) {
      throw updateError;
    }
  } catch (error) {
    console.error(`Error updating rating for transporter ${transporterId}:`, error);
    throw error;
  }
};