import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PriceCardProps {
  cropName: string;
  marketName: string;
  price: number;
  date: string;
}

const PriceCard: React.FC<PriceCardProps> = ({ cropName, marketName, price, date }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cropName}>{cropName}</Text>
      <Text style={styles.marketName}>{marketName}</Text>
      <Text style={styles.price}>${price.toFixed(2)}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 1.5,
  },
  cropName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  marketName: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
});

export default PriceCard;