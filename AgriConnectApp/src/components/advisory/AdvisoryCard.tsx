import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper'; // Using react-native-paper's useTheme hook

interface AdvisoryCardProps {
  title: string;
  description: string;
}

const AdvisoryCard: React.FC<AdvisoryCardProps> = ({ title, description }) => {
  const theme = useTheme(); // useTheme directly returns the theme object

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Text style={[styles.title, { color: theme.colors.onSurface }]}>{title}</Text>
      <Text style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
  },
});

export default AdvisoryCard;