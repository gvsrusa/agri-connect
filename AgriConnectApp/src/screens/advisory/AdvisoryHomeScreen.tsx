import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AdvisoryStackParamList } from '../../types/navigation';
import { useTheme } from 'react-native-paper'; // Using react-native-paper's useTheme hook
import { useTranslation } from 'react-i18next'; // Assuming react-i18next is used

type AdvisoryHomeScreenNavigationProp = StackNavigationProp<AdvisoryStackParamList, 'AdvisoryHome'>;

interface AdvisoryHomeScreenProps {
  navigation: AdvisoryHomeScreenNavigationProp;
}

const advisoryCategories = [
  { id: '1', name: 'Pest Management' },
  { id: '2', name: 'Disease Management' },
  { id: '3', name: 'Nutrient Management' },
  { id: '4', name: 'Weed Management' },
];

const AdvisoryHomeScreen: React.FC<AdvisoryHomeScreenProps> = ({ navigation }) => {
  const theme = useTheme(); // useTheme directly returns the theme object
  const { t } = useTranslation(); // Assuming useTranslation returns a t function

  const renderCategoryItem = ({ item }: { item: { id: string; name: string } }) => (
    <TouchableOpacity
      style={[styles.categoryCard, { backgroundColor: theme.colors.surface }]}
      onPress={() => navigation.navigate('CropSelection', { categoryId: item.id, categoryName: item.name })}
    >
      <Text style={[styles.categoryText, { color: theme.colors.primary }]}>{t(item.name)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.onBackground }]}>{t('Crop Advisory Categories')}</Text>
      <FlatList
        data={advisoryCategories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
      />
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
    marginBottom: 20,
    textAlign: 'center',
  },
  categoryCard: {
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AdvisoryHomeScreen;