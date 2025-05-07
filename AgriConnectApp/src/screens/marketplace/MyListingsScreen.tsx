import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { MarketplaceStackParamList } from '../../types/navigation'; // Assuming navigation types are here
import ListingCard from '../../components/marketplace/ListingCard';
import { getMarketplaceListingsByUserId } from '../../services/supabase/marketplaceService'; // Corrected service import
import { Listing } from '../../services/supabase/supabaseTypes';
import useAuth from '../../hooks/useAuth'; // Corrected useAuth import

const MyListingsScreen = () => {
  const navigation = useNavigation<NavigationProp<MarketplaceStackParamList>>();
  const { user } = useAuth(); // Get the current user
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyListings = async () => {
      if (!user) {
        setError('User not logged in.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      const data = await getMarketplaceListingsByUserId(user.id); // Use the correctly imported function
      if (data === null) {
        setError('Failed to fetch your listings.');
      } else {
        setListings(data);
      }
      setLoading(false);
    };

    fetchMyListings();
  }, [user]); // Refetch when user changes

  const handleListingPress = (listing: Listing) => {
    navigation.navigate('ListingDetails', { listingId: listing.id });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading your listings...</Text>
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
        <Text>You have no listings yet.</Text>
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

export default MyListingsScreen;