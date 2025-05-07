import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PriceChartProps {
  data: { date: string; price: number }[];
}

const PriceChart: React.FC<PriceChartProps> = ({ data }) => {
  // Placeholder for a simple chart visualization
  // This could be replaced with a charting library like react-native-chart-kit
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Price Trend (Placeholder)</Text>
      {data.map((item, index) => (
        <Text key={index}>{`${item.date}: $${item.price.toFixed(2)}`}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default PriceChart;