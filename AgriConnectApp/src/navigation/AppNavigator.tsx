import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ButtonDemoScreen from '../screens/ButtonDemoScreen';
import MarketplaceScreen from '../screens/MarketplaceScreen';
import PricesScreen from '../screens/PricesScreen';
import AdvisoryHomeScreen from '../screens/advisory/AdvisoryHomeScreen';
import AdvisoryDetailsScreen from '../screens/advisory/AdvisoryDetailsScreen';
import CropSelectionScreen from '../screens/advisory/CropSelectionScreen';
import PostHarvestHomeScreen from '../screens/postharvest/PostHarvestHomeScreen';
import PostHarvestDetailsScreen from '../screens/postharvest/PostHarvestDetailsScreen';
import CropStorageScreen from '../screens/postharvest/CropStorageScreen';
import TransportScreen from '../screens/TransportScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import ProfileScreen from '../screens/auth/ProfileScreen';
import ListingsScreen from '../screens/marketplace/ListingsScreen';
import MyListingsScreen from '../screens/marketplace/MyListingsScreen';
import CreateListingScreen from '../screens/marketplace/CreateListingScreen';
import ListingDetailsScreen from '../screens/marketplace/ListingDetailsScreen';
import PricesHomeScreen from '../screens/prices/PricesHomeScreen'; // Import the new Prices Home Screen
import PriceDetailsScreen from '../screens/prices/PriceDetailsScreen'; // Import the new Price Details Screen

// Import Transport screens
import TransportHomeScreen from '../screens/transport/TransportHomeScreen';
import TransporterListScreen from '../screens/transport/TransporterListScreen';
import TransportRequestScreen from '../screens/transport/TransportRequestScreen';
import TransportDetailsScreen from '../screens/transport/TransportDetailsScreen';

import {
  RootTabParamList,
  HomeStackParamList,
  MarketplaceStackParamList,
  PricesStackParamList,
  AdvisoryStackParamList,
  PostHarvestStackParamList,
  TransportStackParamList,
  AuthStackParamList
} from '../types/navigation';
import useAuth from '../hooks/useAuth';

const Tab = createBottomTabNavigator<RootTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const MarketplaceStack = createNativeStackNavigator<MarketplaceStackParamList>();
const PricesStack = createNativeStackNavigator<PricesStackParamList>();
const AdvisoryStack = createNativeStackNavigator<AdvisoryStackParamList>();
const PostHarvestStack = createNativeStackNavigator<PostHarvestStackParamList>();
const TransportStack = createNativeStackNavigator<TransportStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const MarketplaceNavigator = () => (
  <MarketplaceStack.Navigator>
    <MarketplaceStack.Screen name="MarketplaceHome" component={MarketplaceScreen} options={{ title: 'Marketplace' }} />
    <MarketplaceStack.Screen name="Listings" component={ListingsScreen} options={{ title: 'All Listings' }} />
    <MarketplaceStack.Screen name="MyListings" component={MyListingsScreen} options={{ title: 'My Listings' }} />
    <MarketplaceStack.Screen name="CreateListing" component={CreateListingScreen} options={{ title: 'Create Listing' }} />
    <MarketplaceStack.Screen
      name="ListingDetails"
      options={{ title: 'Listing Details' }}
    >
      {(props: any) => <ListingDetailsScreen {...props} />}
    </MarketplaceStack.Screen>
  </MarketplaceStack.Navigator>
);

const PricesNavigator = () => (
  <PricesStack.Navigator>
    <PricesStack.Screen name="PricesHome" component={PricesHomeScreen} options={{ title: 'Market Prices' }} />
    <PricesStack.Screen name="PriceDetails" component={PriceDetailsScreen} options={{ title: 'Price Details' }} />
  </PricesStack.Navigator>
);

const AdvisoryNavigator = () => (
  <AdvisoryStack.Navigator>
    <AdvisoryStack.Screen name="AdvisoryHome" component={AdvisoryHomeScreen} options={{ title: 'Crop Advisory' }} />
    <AdvisoryStack.Screen name="CropSelection" component={CropSelectionScreen} options={{ title: 'Select Crop' }} />
    <AdvisoryStack.Screen name="AdvisoryDetails" component={AdvisoryDetailsScreen} options={{ title: 'Advisory Details' }} />
  </AdvisoryStack.Navigator>
);

const PostHarvestNavigator = () => (
  <PostHarvestStack.Navigator>
    <PostHarvestStack.Screen name="PostHarvestHome" component={PostHarvestHomeScreen} options={{ title: 'Post-Harvest Guidance' }} />
    <PostHarvestStack.Screen name="PostHarvestDetails" component={PostHarvestDetailsScreen} options={{ title: 'Details' }} />
    <PostHarvestStack.Screen name="CropStorage" component={CropStorageScreen} options={{ title: 'Crop Storage' }} />
  </PostHarvestStack.Navigator>
);

const TransportNavigator = () => (
  <TransportStack.Navigator>
    <TransportStack.Screen name="TransportHome" component={TransportHomeScreen} options={{ title: 'Transport' }} />
    <TransportStack.Screen name="TransporterList" component={TransporterListScreen} options={{ title: 'Find Transporters' }} />
    <TransportStack.Screen name="TransportRequest" component={TransportRequestScreen} options={{ title: 'Request Transport' }} />
    <TransportStack.Screen name="TransportDetails" component={TransportDetailsScreen} options={{ title: 'Transport Details' }} />
  </TransportStack.Navigator>
);


const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
  </AuthStack.Navigator>
);

// Create a HomeStack navigator
const HomeNavigator = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
    <HomeStack.Screen name="ButtonDemo" component={ButtonDemoScreen} options={{ title: 'Button Demo' }} />
  </HomeStack.Navigator>
);

const AppNavigator: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    // Or a splash screen
    return null;
  }

  return (
    user ? (
      <Tab.Navigator>
        <Tab.Screen name="HomeTab" component={HomeNavigator} options={{ title: 'Home' }} />
        <Tab.Screen name="MarketplaceTab" component={MarketplaceNavigator} options={{ title: 'Marketplace' }} />
        <Tab.Screen name="PricesTab" component={PricesNavigator} options={{ title: 'Prices' }} />
        <Tab.Screen name="AdvisoryTab" component={AdvisoryNavigator} options={{ title: 'Advisory' }} />
        <Tab.Screen name="PostHarvestTab" component={PostHarvestNavigator} options={{ title: 'Post-Harvest' }} />
        <Tab.Screen name="TransportTab" component={TransportNavigator} options={{ title: 'Transport' }} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    ) : (
      <AuthNavigator />
    )
  );
};

export default AppNavigator;