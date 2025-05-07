import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native'; // Import useNavigation
import { MarketplaceStackParamList } from '../../types/navigation'; // Import navigation types
import ListingForm from '../../components/marketplace/ListingForm';
import { createMarketplaceListing } from '../../services/supabase/marketplaceService';
import { Database, Listing } from '../../services/supabase/supabaseTypes'; // Import Listing type
import useAuth from '../../hooks/useAuth'; // Import useAuth hook

type InsertMarketplaceListing = Database['public']['Tables']['marketplace_listings']['Insert'];

const CreateListingScreen = () => {
  const navigation = useNavigation<NavigationProp<MarketplaceStackParamList>>(); // Get navigation object
  const { user } = useAuth(); // Get the current user
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: Omit<Listing, 'id' | 'created_at' | 'user_id'>) => { // Updated formData type
    if (!user) {
      setError('User not logged in. Cannot create listing.');
      return;
    }

    setLoading(true);
    setError(null);

    const newListing: InsertMarketplaceListing = {
      title: formData.title,
      description: formData.description,
      price: formData.price, // Price is already a number from ListingForm
      category: formData.category, // Include category
      user_id: user.id, // Use actual user ID
      // created_at and updated_at are typically handled by Supabase
    };

    const result = await createMarketplaceListing(newListing);

    if (result) {
      Alert.alert('Success', 'Listing created successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }, // Navigate back on OK
      ]);
    } else {
      setError('Failed to create listing. Please try again.');
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Listing</Text>
      <ListingForm onSubmit={handleSubmit} loading={loading} error={error} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default CreateListingScreen;