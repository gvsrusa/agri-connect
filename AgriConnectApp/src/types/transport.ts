export interface Transporter {
  id: string;
  name: string;
  location: string;
  vehicle_type?: string;
  capacity: string;
  rating?: number;
  available: boolean;
  contact_number?: string;
  price_per_km?: number;
  image_url?: string;
  description?: string;
}

export interface TransportRequest {
  id: string;
  user_id: string;
  transporter_id?: string;
  pickup_location: string;
  delivery_location: string;
  cargo_type: string;
  cargo_weight: string;
  requested_date: string;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  notes?: string;
  estimated_cost?: number;
  distance_km?: number;
  completion_date?: string;
  rating?: number;
  review?: string;
}

export interface TransportRequestFormData {
  pickup_location: string;
  delivery_location: string;
  cargo_type: string;
  cargo_weight: string;
  requested_date: string;
  notes?: string;
  status?: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
}

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface DistanceCalculationResult {
  distance_km: number;
  duration_minutes: number;
  route_polyline?: string;
}