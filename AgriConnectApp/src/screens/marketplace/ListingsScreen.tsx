import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { MarketplaceStackParamList } from '../../types/navigation'; // Corrected navigation types import
import ListingCard from '../../components/marketplace/ListingCard';
import { getMarketplaceListings } from '../../services/supabase/marketplaceService'; // Corrected service import
import { Listing } from '../../services/supabase/supabaseTypes';

const ListingsScreen = () => {
  const navigation = useNavigation<NavigationProp<MarketplaceStackParamList>>(); // Use MarketplaceStackParamList
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setError(null);
      const data = await getMarketplaceListings(); // Use the correctly imported function
      if (data === null) {
        // Assuming getMarketplaceListings returns null on error and logs internally
        setError('Failed to fetch listings.');
      } else {
        setListings(data);
      }
      setLoading(false);
    };

    fetchListings();
  }, []);

  const handleListingPress = (listing: Listing) => {
    navigation.navigate('ListingDetails', { listingId: listing.id });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading listings...</Text>
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

  return (
    <View style={styles.container}>
      {listings.length === 0 ? (
        <Text>No listings found.</Text>
      ) : (
        <FlatList
          data={listings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListingCard listing={item} onPress={() => handleListingPress(item)} />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
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
  listContent: {
    paddingBottom: 10, // Add some padding at the bottom
  },
});

export default ListingsScreen;