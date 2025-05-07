import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface CropSelectorProps {
  onSelectCrop: (crop: string) => void;
}

const CropSelector: React.FC<CropSelectorProps> = ({ onSelectCrop }) => {
  const [selectedCrop, setSelectedCrop] = useState('');

  const handleCropChange = (itemValue: string) => {
    setSelectedCrop(itemValue);
    onSelectCrop(itemValue);
  };

  // Placeholder crop data
  const crops = ['Wheat', 'Rice', 'Corn', 'Soybeans'];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Crop:</Text>
      <Picker
        selectedValue={selectedCrop}
        style={styles.picker}
        onValueChange={handleCropChange}>
        <Picker.Item label="-- Select a Crop --" value="" />
        {crops.map((crop) => (
          <Picker.Item key={crop} label={crop} value={crop} />
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

export default CropSelector;