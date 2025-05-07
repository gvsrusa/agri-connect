import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface MarketSelectorProps {
  onSelectMarket: (market: string) => void;
}

const MarketSelector: React.FC<MarketSelectorProps> = ({ onSelectMarket }) => {
  const [selectedMarket, setSelectedMarket] = useState('');

  const handleMarketChange = (itemValue: string) => {
    setSelectedMarket(itemValue);
    onSelectMarket(itemValue);
  };

  // Placeholder market data
  const markets = ['Local Market A', 'Regional Market B', 'City Market C'];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Market:</Text>
      <Picker
        selectedValue={selectedMarket}
        style={styles.picker}
        onValueChange={handleMarketChange}>
        <Picker.Item label="-- Select a Market --" value="" />
        {markets.map((market) => (
          <Picker.Item key={market} label={market} value={market} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: 200,
  },
});

export default MarketSelector;