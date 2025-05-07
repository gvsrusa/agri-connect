import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Listing } from '../../services/supabase/supabaseTypes'; // Assuming Listing type is defined here

interface ListingCardProps {
  listing: Listing;
  onPress: () => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{listing.title}</Text>
      <Text style={styles.price}>${listing.price.toFixed(2)}</Text>
      <Text style={styles.description} numberOfLines={2}>{listing.description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: 'green',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});

export default ListingCard;