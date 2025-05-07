import { NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  MarketplaceTab: NavigatorScreenParams<MarketplaceStackParamList>;
  PricesTab: NavigatorScreenParams<PricesStackParamList>;
  AdvisoryTab: NavigatorScreenParams<AdvisoryStackParamList>;
  PostHarvestTab: NavigatorScreenParams<PostHarvestStackParamList>;
  TransportTab: NavigatorScreenParams<TransportStackParamList>;
  Profile: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  ButtonDemo: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
};

export type MarketplaceStackParamList = {
  MarketplaceHome: undefined;
  Listings: undefined;
  MyListings: undefined;
  CreateListing: undefined;
  ListingDetails: { listingId: string };
};

export type PricesStackParamList = {
  PricesHome: undefined;
  PriceDetails: { priceId: string }; // Assuming priceId is needed for details
};

export type AdvisoryStackParamList = {
  AdvisoryHome: undefined;
  CropSelection: { categoryId: string; categoryName: string; };
  AdvisoryDetails: { advisoryId: string }; // Assuming advisoryId is needed for details
};

export type PostHarvestStackParamList = {
  PostHarvestHome: undefined;
  PostHarvestDetails: { contentId: string }; // Assuming contentId is needed for details
  CropStorage: undefined;
};

export type TransportStackParamList = {
  TransportHome: undefined;
  TransporterList: undefined;
  TransportRequest: { transporterId?: string };
  TransportDetails: { 
    transporterId?: string; 
    requestId?: string; 
    isRequest?: boolean;
  };
  MyTransportRequests: undefined;
};

// Navigation prop types
export type HomeStackNavigationProp = StackNavigationProp<HomeStackParamList>;
export type MarketplaceStackNavigationProp = StackNavigationProp<MarketplaceStackParamList>;
export type PricesStackNavigationProp = StackNavigationProp<PricesStackParamList>;
export type AdvisoryStackNavigationProp = StackNavigationProp<AdvisoryStackParamList>;
export type PostHarvestStackNavigationProp = StackNavigationProp<PostHarvestStackParamList>;
export type TransportStackNavigationProp = StackNavigationProp<TransportStackParamList>;