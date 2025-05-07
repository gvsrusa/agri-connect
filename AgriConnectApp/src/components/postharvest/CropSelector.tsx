import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

interface CropSelectorProps {
  onSelectCrop: (crop: string) => void;
}

const CropSelector: React.FC<CropSelectorProps> = ({ onSelectCrop }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  // Placeholder crop data
  const crops = ['Maize', 'Rice', 'Wheat', 'Sorghum'];

  return (
    <View style={styles.container}>
      <Text style={{ color: colors.onSurface }}>{t('postHarvest.cropSelector.label')}</Text>
      {/* Placeholder for crop selection input */}
      {/* This will be replaced with a proper selector component */}
      <Text style={{ color: colors.onSurfaceVariant }}>{crops.join(', ')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
});

export default CropSelector;