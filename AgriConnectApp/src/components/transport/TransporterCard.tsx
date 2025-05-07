import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, Card, Avatar, useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Transporter } from '../../types';

export interface TransporterCardProps {
  transporter: Transporter;
  onPress: () => void;
  expanded?: boolean;
  containerStyle?: object;
  style?: object;
}

const TransporterCard: React.FC<TransporterCardProps> = ({
  transporter,
  onPress,
  expanded = false,
  containerStyle,
  style,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <MaterialIcons key={`star-${i}`} name="star" size={14} color="#FFC107" />
        );
      } else if (i === fullStars && halfStar) {
        stars.push(
          <MaterialIcons key={`star-${i}`} name="star-half" size={14} color="#FFC107" />
        );
      } else {
        stars.push(
          <MaterialIcons key={`star-${i}`} name="star-outline" size={14} color="#FFC107" />
        );
      }
    }
    
    return (
      <View style={styles.ratingContainer}>
        {stars}
        <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
        {transporter.rating_count && (
          <Text style={styles.ratingCount}>({transporter.rating_count})</Text>
        )}
      </View>
    );
  };
  
  return (
    <Card style={[styles.card, containerStyle, style]} onPress={onPress}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.transporterHeader}>
          {transporter.image_url ? (
            <Avatar.Image
              source={{ uri: transporter.image_url }}
              size={expanded ? 60 : 50}
              style={styles.transporterImage}
            />
          ) : (
            <Avatar.Icon
              icon="truck"
              size={expanded ? 60 : 50}
              style={styles.transporterImage}
              color="#FFFFFF"
            />
          )}
          
          <View style={styles.transporterInfo}>
            <Text style={styles.transporterName}>{transporter.name}</Text>
            
            <View style={styles.locationRow}>
              <MaterialIcons name="location-on" size={14} color="#757575" />
              <Text style={styles.locationText}>{transporter.location}</Text>
            </View>
            
            {transporter.rating && renderRatingStars(transporter.rating)}
          </View>
        </View>
        
        {expanded && (
          <View style={styles.expandedContent}>
            <View style={styles.detailsRow}>
              {transporter.vehicle_type && (
                <View style={styles.detailItem}>
                  <MaterialIcons name="local-shipping" size={16} color={theme.colors.primary} />
                  <Text style={styles.detailText}>{transporter.vehicle_type}</Text>
                </View>
              )}
              
              {transporter.capacity && (
                <View style={styles.detailItem}>
                  <MaterialIcons name="fitness-center" size={16} color={theme.colors.primary} />
                  <Text style={styles.detailText}>{transporter.capacity}</Text>
                </View>
              )}
              
              {transporter.price_per_km && (
                <View style={styles.detailItem}>
                  <MaterialIcons name="attach-money" size={16} color={theme.colors.primary} />
                  <Text style={styles.detailText}>₹{transporter.price_per_km}/km</Text>
                </View>
              )}
            </View>
            
            {transporter.description && (
              <Text style={styles.description} numberOfLines={2}>
                {transporter.description}
              </Text>
            )}
            
            <View style={styles.availabilityContainer}>
              <View
                style={[
                  styles.availabilityIndicator,
                  { backgroundColor: transporter.available ? '#4CAF50' : '#F44336' },
                ]}
              />
              <Text style={styles.availabilityText}>
                {transporter.available ? t('Available') : t('Unavailable')}
              </Text>
            </View>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 4,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  cardContent: {
    padding: 8,
  },
  transporterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transporterImage: {
    backgroundColor: '#4CAF50',
    marginRight: 12,
  },
  transporterInfo: {
    flex: 1,
  },
  transporterName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#757575',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  ratingCount: {
    fontSize: 12,
    color: '#757575',
    marginLeft: 2,
  },
  expandedContent: {
    marginTop: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    fontSize: 12,
    marginLeft: 4,
  },
  description: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 8,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  availabilityText: {
    fontSize: 12,
    color: '#757575',
  },
});

export default TransporterCard;