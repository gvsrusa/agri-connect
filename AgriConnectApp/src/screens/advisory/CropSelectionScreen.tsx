import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper'; // Using react-native-paper's useTheme hook
import { useTranslation } from 'react-i18next'; // Assuming react-i18next is used

const CropSelectionScreen: React.FC = () => {
  const theme = useTheme(); // useTheme directly returns the theme object
  const { t } = useTranslation(); // Assuming useTranslation returns a t function

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.onBackground }]}>{t('Select Crop Type')}</Text>
      {/* Placeholder for crop selection options */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default CropSelectionScreen;