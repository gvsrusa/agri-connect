import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { Text, Card, Button, useTheme, ActivityIndicator, Divider, Avatar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { TransportStackNavigationProp, TransportStackParamList } from '../../types/navigation';
import { Transporter, TransportRequest, TransportRating, TransportRequestStatus } from '../../types';
import {
  fetchTransporterById,
  fetchTransportRequestById,
  updateTransportRequestStatus,
  fetchTransporterRatings,
} from '../../services/supabase/transportService';
import { getStoredTransporterById, getStoredTransportRequestById } from '../../utils/storage/transportStorage';
import { checkConnectivity } from '../../utils/storage/offlineSync';
import useAuth from '../../hooks/useAuth';

type TransportDetailsRouteProp = RouteProp<TransportStackParamList, 'TransportDetails'>;

const TransportDetailsScreen: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation<TransportStackNavigationProp>();
  const route = useRoute<TransportDetailsRouteProp>();
  const { user } = useAuth();
  
  const { transporterId, requestId, isRequest = false } = route.params;
  
  // State
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);
  const [transporter, setTransporter] = useState<Transporter | null>(null);
  const [transportRequest, setTransportRequest] = useState<TransportRequest | null>(null);
  const [ratings, setRatings] = useState<TransportRating[]>([]);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  
  useEffect(() => {
    loadData();
  }, [transporterId, requestId, isRequest]);
  
  const loadData = async () => {
    setIsLoading(true);
    
    try {
      const online = await checkConnectivity();
      setIsOffline(!online);
      
      if (isRequest && requestId) {
        // Load transport request details
        let request: TransportRequest | null = null;
        
        if (online) {
          request = await fetchTransportRequestById(requestId);
        } else {
          request = await getStoredTransportRequestById(requestId);
        }
        
        setTransportRequest(request);
        
        // If request has a transporter, load transporter details
        if (request && request.transporter_id) {
          let transporterData: Transporter | null = null;
          
          if (online) {
            transporterData = await fetchTransporterById(request.transporter_id);
          } else {
            transporterData = await getStoredTransporterById(request.transporter_id);
          }
          
          setTransporter(transporterData);
        }
      } else if (transporterId) {
        // Load transporter details
        let transporterData: Transporter | null = null;
        
        if (online) {
          transporterData = await fetchTransporterById(transporterId);
          
          // Load transporter ratings
          if (transporterData) {
            const ratingsData = await fetchTransporterRatings(transporterId);
            setRatings(ratingsData);
          }
        } else {
          transporterData = await getStoredTransporterById(transporterId);
        }
        
        setTransporter(transporterData);
      }
    } catch (error) {
      console.error('Error loading transport details:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCallTransporter = () => {
    if (transporter && transporter.contact_number) {
      Linking.openURL(`tel:${transporter.contact_number}`);
    }
  };
  
  const handleCreateRequest = () => {
    if (transporter) {
      navigation.navigate('TransportRequest', { transporterId: transporter.id });
    }
  };
  
  const handleUpdateStatus = async (newStatus: TransportRequestStatus) => {
    if (!transportRequest || !user) return;
    
    if (isOffline) {
      Alert.alert(
        t('Offline Mode'),
        t('You cannot update request status while offline. Please try again when you have an internet connection.'),
        [{ text: t('OK') }]
      );
      return;
    }
    
    setIsUpdatingStatus(true);
    
    try {
      await updateTransportRequestStatus(transportRequest.id, newStatus);
      
      // Reload data to get updated request
      await loadData();
      
      Alert.alert(
        t('Status Updated'),
        t(`Request status has been updated to ${newStatus.replace('_', ' ')}.`),
        [{ text: t('OK') }]
      );
    } catch (error) {
      console.error('Error updating transport request status:', error);
      Alert.alert(
        t('Error'),
        t('Failed to update request status. Please try again.'),
        [{ text: t('OK') }]
      );
    } finally {
      setIsUpdatingStatus(false);
    }
  };
  
  const renderStatusBadge = (status: string) => {
    let backgroundColor = '#E0E0E0';
    let textColor = '#757575';
    
    switch (status) {
      case 'pending':
        backgroundColor = '#FFF9C4';
        textColor = '#F57F17';
        break;
      case 'accepted':
        backgroundColor = '#E8F5E9';
        textColor = '#2E7D32';
        break;
      case 'in_transit':
        backgroundColor = '#E3F2FD';
        textColor = '#1565C0';
        break;
      case 'completed':
        backgroundColor = '#E8F5E9';
        textColor = '#2E7D32';
        break;
      case 'cancelled':
        backgroundColor = '#FFEBEE';
        textColor = '#C62828';
        break;
    }
    
    return (
      <View style={[styles.statusBadge, { backgroundColor }]}>
        <Text style={[styles.statusText, { color: textColor }]}>
          {t(status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' '))}
        </Text>
      </View>
    );
  };
  
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <MaterialIcons key={`star-${i}`} name="star" size={16} color="#FFC107" />
        );
      } else if (i === fullStars && halfStar) {
        stars.push(
          <MaterialIcons key={`star-${i}`} name="star-half" size={16} color="#FFC107" />
        );
      } else {
        stars.push(
          <MaterialIcons key={`star-${i}`} name="star-outline" size={16} color="#FFC107" />
        );
      }
    }
    
    return (
      <View style={styles.ratingContainer}>
        {stars}
        <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
      </View>
    );
  };
  
  const renderTransporterDetails = () => {
    if (!transporter) return null;
    
    return (
      <View style={styles.section}>
        <View style={styles.transporterHeader}>
          {transporter.image_url ? (
            <Avatar.Image
              source={{ uri: transporter.image_url }}
              size={80}
              style={styles.transporterImage}
            />
          ) : (
            <Avatar.Icon
              icon="truck"
              size={80}
              style={styles.transporterImage}
              color="#FFFFFF"
            />
          )}
          
          <View style={styles.transporterInfo}>
            <Text style={styles.transporterName}>{transporter.name}</Text>
            <View style={styles.locationRow}>
              <MaterialIcons name="location-on" size={16} color="#757575" />
              <Text style={styles.locationText}>{transporter.location}</Text>
            </View>
            {transporter.rating && (
              renderRatingStars(transporter.rating)
            )}
          </View>
        </View>
        
        <Divider style={styles.divider} />
        
        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <MaterialIcons name="local-shipping" size={24} color={theme.colors.primary} />
            <Text style={styles.detailLabel}>{t('Vehicle Type')}</Text>
            <Text style={styles.detailValue}>{transporter.vehicle_type || t('Not specified')}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <MaterialIcons name="fitness-center" size={24} color={theme.colors.primary} />
            <Text style={styles.detailLabel}>{t('Capacity')}</Text>
            <Text style={styles.detailValue}>{transporter.capacity || t('Not specified')}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <MaterialIcons name="attach-money" size={24} color={theme.colors.primary} />
            <Text style={styles.detailLabel}>{t('Price/km')}</Text>
            <Text style={styles.detailValue}>
              {transporter.price_per_km ? `₹${transporter.price_per_km}` : t('Not specified')}
            </Text>
          </View>
        </View>
        
        {transporter.description && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>{t('About')}</Text>
            <Text style={styles.descriptionText}>{transporter.description}</Text>
          </View>
        )}
        
        <View style={styles.actionButtons}>
          <Button
            mode="contained"
            icon="phone"
            onPress={handleCallTransporter}
            style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
            labelStyle={styles.actionButtonLabel}
          >
            {t('Call')}
          </Button>
          
          <Button
            mode="contained"
            icon="truck"
            onPress={handleCreateRequest}
            style={styles.actionButton}
            labelStyle={styles.actionButtonLabel}
            disabled={isOffline}
          >
            {t('Request Transport')}
          </Button>
        </View>
        
        {ratings.length > 0 && (
          <View style={styles.ratingsContainer}>
            <Text style={styles.ratingsTitle}>{t('Reviews')}</Text>
            
            {ratings.map((rating) => (
              <Card key={rating.id} style={styles.ratingCard}>
                <Card.Content>
                  <View style={styles.ratingHeader}>
                    <View style={styles.ratingStars}>
                      {renderRatingStars(rating.rating)}
                    </View>
                    <Text style={styles.ratingDate}>
                      {new Date(rating.created_at).toLocaleDateString()}
                    </Text>
                  </View>
                  
                  {rating.comment && (
                    <Text style={styles.ratingComment}>{rating.comment}</Text>
                  )}
                </Card.Content>
              </Card>
            ))}
          </View>
        )}
      </View>
    );
  };
  
  const renderRequestDetails = () => {
    if (!transportRequest) return null;
    
    const isUserRequest = user && transportRequest.user_id === user.id;
    
    return (
      <View style={styles.section}>
        <View style={styles.requestHeader}>
          <Text style={styles.requestTitle}>{t('Transport Request')}</Text>
          {renderStatusBadge(transportRequest.status)}
        </View>
        
        <Card style={styles.routeCard}>
          <Card.Content>
            <View style={styles.routeContainer}>
              <View style={styles.locationPoint}>
                <MaterialIcons name="trip-origin" size={24} color={theme.colors.primary} />
                <View style={styles.locationDetails}>
                  <Text style={styles.locationLabel}>{t('Pickup Location')}</Text>
                  <Text style={styles.locationName}>{transportRequest.pickup_location}</Text>
                </View>
              </View>
              
              <View style={styles.routeConnector} />
              
              <View style={styles.locationPoint}>
                <MaterialIcons name="place" size={24} color="#4CAF50" />
                <View style={styles.locationDetails}>
                  <Text style={styles.locationLabel}>{t('Delivery Location')}</Text>
                  <Text style={styles.locationName}>{transportRequest.delivery_location}</Text>
                </View>
              </View>
            </View>
            
            {transportRequest.distance && (
              <View style={styles.distanceContainer}>
                <MaterialIcons name="straight" size={16} color="#757575" />
                <Text style={styles.distanceText}>
                  {transportRequest.distance} {t('km')}
                </Text>
              </View>
            )}
          </Card.Content>
        </Card>
        
        <View style={styles.requestDetailsContainer}>
          <View style={styles.requestDetailRow}>
            <Text style={styles.requestDetailLabel}>{t('Scheduled Date')}</Text>
            <Text style={styles.requestDetailValue}>
              {new Date(transportRequest.scheduled_date).toLocaleDateString()}
            </Text>
          </View>
          
          <View style={styles.requestDetailRow}>
            <Text style={styles.requestDetailLabel}>{t('Cargo Type')}</Text>
            <Text style={styles.requestDetailValue}>{transportRequest.cargo_type}</Text>
          </View>
          
          <View style={styles.requestDetailRow}>
            <Text style={styles.requestDetailLabel}>{t('Cargo Weight')}</Text>
            <Text style={styles.requestDetailValue}>{transportRequest.cargo_weight} {t('kg')}</Text>
          </View>
          
          {transportRequest.cargo_volume && (
            <View style={styles.requestDetailRow}>
              <Text style={styles.requestDetailLabel}>{t('Cargo Volume')}</Text>
              <Text style={styles.requestDetailValue}>{transportRequest.cargo_volume} {t('m³')}</Text>
            </View>
          )}
          
          {transportRequest.price && (
            <View style={styles.requestDetailRow}>
              <Text style={styles.requestDetailLabel}>{t('Price')}</Text>
              <Text style={styles.requestDetailValue}>₹{transportRequest.price}</Text>
            </View>
          )}
          
          <View style={styles.requestDetailRow}>
            <Text style={styles.requestDetailLabel}>{t('Contact Name')}</Text>
            <Text style={styles.requestDetailValue}>{transportRequest.contact_name}</Text>
          </View>
          
          <View style={styles.requestDetailRow}>
            <Text style={styles.requestDetailLabel}>{t('Contact Phone')}</Text>
            <Text style={styles.requestDetailValue}>{transportRequest.contact_phone}</Text>
          </View>
          
          {transportRequest.special_instructions && (
            <View style={styles.specialInstructionsContainer}>
              <Text style={styles.specialInstructionsLabel}>{t('Special Instructions')}</Text>
              <Text style={styles.specialInstructionsText}>
                {transportRequest.special_instructions}
              </Text>
            </View>
          )}
        </View>
        
        {isUserRequest && transportRequest.status === 'pending' && (
          <View style={styles.statusUpdateContainer}>
            <Text style={styles.statusUpdateTitle}>{t('Update Status')}</Text>
            
            <View style={styles.statusButtons}>
              <Button
                mode="contained"
                onPress={() => handleUpdateStatus('cancelled')}
                style={[styles.statusButton, { backgroundColor: '#F44336' }]}
                loading={isUpdatingStatus}
                disabled={isUpdatingStatus || isOffline}
              >
                {t('Cancel Request')}
              </Button>
            </View>
          </View>
        )}
        
        {isUserRequest && transportRequest.status === 'accepted' && (
          <View style={styles.statusUpdateContainer}>
            <Text style={styles.statusUpdateTitle}>{t('Update Status')}</Text>
            
            <View style={styles.statusButtons}>
              <Button
                mode="contained"
                onPress={() => handleUpdateStatus('in_transit')}
                style={[styles.statusButton, { backgroundColor: '#2196F3' }]}
                loading={isUpdatingStatus}
                disabled={isUpdatingStatus || isOffline}
              >
                {t('Mark as In Transit')}
              </Button>
              
              <Button
                mode="outlined"
                onPress={() => handleUpdateStatus('cancelled')}
                style={styles.statusButton}
                loading={isUpdatingStatus}
                disabled={isUpdatingStatus || isOffline}
              >
                {t('Cancel Request')}
              </Button>
            </View>
          </View>
        )}
        
        {isUserRequest && transportRequest.status === 'in_transit' && (
          <View style={styles.statusUpdateContainer}>
            <Text style={styles.statusUpdateTitle}>{t('Update Status')}</Text>
            
            <View style={styles.statusButtons}>
              <Button
                mode="contained"
                onPress={() => handleUpdateStatus('completed')}
                style={[styles.statusButton, { backgroundColor: '#4CAF50' }]}
                loading={isUpdatingStatus}
                disabled={isUpdatingStatus || isOffline}
              >
                {t('Mark as Completed')}
              </Button>
            </View>
          </View>
        )}
        
        {transporter && (
          <View style={styles.transporterPreview}>
            <Text style={styles.transporterPreviewTitle}>{t('Transporter')}</Text>
            
            <TouchableOpacity
              style={styles.transporterPreviewCard}
              onPress={() => navigation.navigate('TransportDetails', { transporterId: transporter.id })}
            >
              <View style={styles.transporterPreviewHeader}>
                {transporter.image_url ? (
                  <Avatar.Image
                    source={{ uri: transporter.image_url }}
                    size={48}
                    style={styles.transporterPreviewImage}
                  />
                ) : (
                  <Avatar.Icon
                    icon="truck"
                    size={48}
                    style={styles.transporterPreviewImage}
                    color="#FFFFFF"
                  />
                )}
                
                <View style={styles.transporterPreviewInfo}>
                  <Text style={styles.transporterPreviewName}>{transporter.name}</Text>
                  <View style={styles.locationRow}>
                    <MaterialIcons name="location-on" size={14} color="#757575" />
                    <Text style={styles.locationText}>{transporter.location}</Text>
                  </View>
                </View>
                
                <MaterialIcons name="chevron-right" size={24} color="#757575" />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>{t('Loading details...')}</Text>
      </View>
    );
  }
  
  return (
    <ScrollView style={styles.container}>
      {isOffline && (
        <View style={styles.offlineBanner}>
          <MaterialIcons name="cloud-off" size={16} color="#FFFFFF" />
          <Text style={styles.offlineText}>
            {t('You are offline. Some features may be limited.')}
          </Text>
        </View>
      )}
      
      {isRequest ? renderRequestDetails() : renderTransporterDetails()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  offlineBanner: {
    backgroundColor: '#FF9800',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  offlineText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontSize: 14,
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    elevation: 2,
  },
  transporterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  transporterImage: {
    backgroundColor: '#4CAF50',
    marginRight: 16,
  },
  transporterInfo: {
    flex: 1,
  },
  transporterName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#757575',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 16,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginBottom: 16,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  actionButtonLabel: {
    fontSize: 14,
  },
  ratingsContainer: {
    marginTop: 24,
  },
  ratingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  ratingCard: {
    marginBottom: 12,
  },
  ratingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingStars: {
    flexDirection: 'row',
  },
  ratingDate: {
    fontSize: 12,
    color: '#757575',
  },
  ratingComment: {
    fontSize: 14,
    lineHeight: 20,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  requestTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  routeCard: {
    marginBottom: 16,
  },
  routeContainer: {
    padding: 8,
  },
  locationPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  locationDetails: {
    marginLeft: 16,
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: '#757575',
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  routeConnector: {
    width: 2,
    height: 24,
    backgroundColor: '#BBBBBB',
    marginLeft: 12,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  distanceText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#757575',
  },
  requestDetailsContainer: {
    marginBottom: 16,
  },
  requestDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  requestDetailLabel: {
    fontSize: 14,
    color: '#757575',
  },
  requestDetailValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  specialInstructionsContainer: {
    marginTop: 16,
  },
  specialInstructionsLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  specialInstructionsText: {
    fontSize: 14,
    lineHeight: 20,
  },
  statusUpdateContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  statusUpdateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  statusButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  transporterPreview: {
    marginTop: 24,
  },
  transporterPreviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  transporterPreviewCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
  },
  transporterPreviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transporterPreviewImage: {
    backgroundColor: '#4CAF50',
    marginRight: 12,
  },
  transporterPreviewInfo: {
    flex: 1,
  },
  transporterPreviewName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
});

export default TransportDetailsScreen;