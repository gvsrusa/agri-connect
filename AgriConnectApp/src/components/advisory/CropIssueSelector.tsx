import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper'; // Using react-native-paper's useTheme hook
import { useTranslation } from 'react-i18next'; // Assuming react-i18next is used

const CropIssueSelector: React.FC = () => {
  const theme = useTheme(); // useTheme directly returns the theme object
  const { t } = useTranslation(); // Assuming useTranslation returns a t function

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.onBackground }]}>{t('Select Issue Type')}</Text>
      {/* Placeholder for issue type selection options */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default CropIssueSelector;