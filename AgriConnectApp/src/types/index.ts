// User types
export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  phone_number?: string;
  created_at: string;
  updated_at: string;
  location?: string;
  preferred_language?: string;
}

// Marketplace types
export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  category: string;
  location: string;
  images?: string[];
  user_id: string;
  created_at: string;
  updated_at: string;
  status: 'active' | 'sold' | 'expired';
  seller_name?: string;
  seller_contact?: string;
}

export interface ListingFormData {
  title: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  category: string;
  location: string;
  images?: string[];
}

// Prices types
export interface PriceData {
  id: string;
  crop_name: string;
  market_name: string;
  price: number;
  unit: string;
  date: string;
  trend: 'up' | 'down' | 'stable';
  percent_change?: number;
  source?: string;
}

export interface Market {
  id: string;
  name: string;
  location: string;
  state: string;
  type: 'wholesale' | 'retail';
}

export interface Crop {
  id: string;
  name: string;
  category: string;
  image_url?: string;
}

// Advisory types
export interface Advisory {
  id: string;
  title: string;
  description: string;
  crop_id: string;
  crop_name?: string;
  issue_type: 'disease' | 'pest' | 'weather' | 'general';
  severity: 'low' | 'medium' | 'high';
  images?: string[];
  solutions: string[];
  created_at: string;
  updated_at: string;
  source?: string;
}

export interface CropIssue {
  id: string;
  name: string;
  type: 'disease' | 'pest' | 'deficiency' | 'other';
  crop_id: string;
  description: string;
  symptoms: string[];
  images?: string[];
}

// Post Harvest types
export interface StorageMethod {
  id: string;
  name: string;
  description: string;
  suitable_crops: string[];
  temperature_range: string;
  humidity_range: string;
  estimated_shelf_life: string;
  cost_level: 'low' | 'medium' | 'high';
  implementation_difficulty: 'easy' | 'medium' | 'difficult';
  advantages: string[];
  disadvantages: string[];
  images?: string[];
}

// Transport types
export interface Transporter {
  id: string;
  name: string;
  location: string;
  vehicle_type?: string;
  capacity?: string;
  rating?: number;
  rating_count?: number;
  available: boolean;
  contact_number: string;
  price_per_km?: number;
  description?: string;
  image_url?: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}

export type TransportRequestStatus = 'pending' | 'accepted' | 'in_transit' | 'completed' | 'cancelled';

export interface TransportRequest {
  id: string;
  user_id: string;
  transporter_id?: string;
  pickup_location: string;
  pickup_latitude?: number;
  pickup_longitude?: number;
  delivery_location: string;
  delivery_latitude?: number;
  delivery_longitude?: number;
  scheduled_date: string;
  cargo_type: string;
  cargo_weight: number;
  cargo_volume?: number;
  special_instructions?: string;
  status: TransportRequestStatus;
  price?: number;
  distance?: number;
  created_at: string;
  updated_at?: string;
  contact_name: string;
  contact_phone: string;
}

export interface TransportRequestFormData {
  pickup_location: string;
  pickup_latitude?: number;
  pickup_longitude?: number;
  delivery_location: string;
  delivery_latitude?: number;
  delivery_longitude?: number;
  scheduled_date: string;
  cargo_type: string;
  cargo_weight: number;
  cargo_volume?: number;
  special_instructions?: string;
  contact_name: string;
  contact_phone: string;
  transporter_id?: string;
}

export interface TransportRating {
  id: string;
  transport_request_id: string;
  user_id: string;
  transporter_id: string;
  rating: number;
  comment?: string;
  created_at: string;
}

// Common types
export interface Location {
  id: string;
  name: string;
  state: string;
  latitude: number;
  longitude: number;
  type: 'city' | 'village' | 'district';
}

export interface AppError {
  code: string;
  message: string;
  details?: any;
}

export interface SyncQueueItem {
  id: string;
  action: 'create' | 'update' | 'delete';
  entity_type: 'listing' | 'advisory' | 'transport_request';
  entity_id?: string;
  data: any;
  timestamp: number;
  attempts: number;
  last_attempt?: number;
  error?: string;
}

export interface NotificationSettings {
  price_alerts: boolean;
  new_advisories: boolean;
  marketplace_messages: boolean;
  transport_updates: boolean;
}

export interface AppSettings {
  language: string;
  theme: 'light' | 'dark' | 'system';
  notifications: NotificationSettings;
  offline_mode: boolean;
  data_saver: boolean;
}