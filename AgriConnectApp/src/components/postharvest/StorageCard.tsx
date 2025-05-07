import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

interface StorageCardProps {
  title: string;
  description: string;
  imageUrl?: string;
}

const StorageCard: React.FC<StorageCardProps> = ({ title, description, imageUrl }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <Card style={styles.card}>
      {imageUrl && <Card.Cover source={{ uri: imageUrl }} />}
      <Card.Content>
        <Title style={{ color: colors.onSurface }}>{title}</Title>
        <Paragraph style={{ color: colors.onSurfaceVariant }}>{description}</Paragraph>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
  },
});

export default StorageCard;