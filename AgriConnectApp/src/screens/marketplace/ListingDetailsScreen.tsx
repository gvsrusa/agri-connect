import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { MarketplaceStackParamList } from '../../types/navigation';
import { getMarketplaceListingById } from '../../services/supabase/marketplaceService';
import { Database, Listing } from '../../services/supabase/supabaseTypes'; // Import Listing type

type ListingDetailsScreenRouteProp = RouteProp<MarketplaceStackParamList, 'ListingDetails'>;
// Use the exported Listing type
// type MarketplaceListing = Database['public']['Tables']['marketplace_listings']['Row'];

interface ListingDetailsScreenProps {
  route: ListingDetailsScreenRouteProp;
}

const ListingDetailsScreen: React.FC<ListingDetailsScreenProps> = ({ route }) => {
  const { listingId } = route.params;
  const [listing, setListing] = useState<Listing | null>(null); // Use Listing type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListingDetails = async () => {
      setLoading(true);
      setError(null);
      const result = await getMarketplaceListingById(listingId);
      if (result) {
        setListing(result);
      } else {
        setError('Failed to fetch listing details.');
      }
      setLoading(false);
    };

    fetchListingDetails();
  }, [listingId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading listing details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!listing) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Listing not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{listing.title}</Text>
      {/* Display image if available, otherwise use a placeholder */}
      <Image
        source={{ uri: listing.image_url || 'https://via.placeholder.com/150' }} // Use actual image URI or placeholder
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.description}>{listing.description}</Text>
      <Text style={styles.price}>Price: ${listing.price.toFixed(2)}</Text>
      <Text style={styles.category}>Category: {listing.category}</Text>
      {/* Display other listing details here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  category: { // Added style for category
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
});

export default ListingDetailsScreen;