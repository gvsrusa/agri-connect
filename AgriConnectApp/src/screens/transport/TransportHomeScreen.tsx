import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Text, Card, Button, useTheme, ActivityIndicator } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { TransportStackNavigationProp } from '../../types/navigation';
import { Transporter } from '../../types';
import { fetchFeaturedTransporters } from '../../services/supabase/transportService';
import { getStoredTransporters } from '../../utils/storage/transportStorage';
import { checkConnectivity } from '../../utils/storage/offlineSync';
import TransporterCard from '../../components/transport/TransporterCard';

const TransportHomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation<TransportStackNavigationProp>();
  
  // State
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);
  const [featuredTransporters, setFeaturedTransporters] = useState<Transporter[]>([]);
  
  useEffect(() => {
    loadFeaturedTransporters();
  }, []);
  
  const loadFeaturedTransporters = async () => {
    setIsLoading(true);
    
    try {
      const online = await checkConnectivity();
      setIsOffline(!online);
      
      let transporters: Transporter[] = [];
      
      if (online) {
        transporters = await fetchFeaturedTransporters();
      } else {
        // Get stored transporters and take the first few as featured
        const storedTransporters = await getStoredTransporters();
        transporters = storedTransporters.slice(0, 3);
      }
      
      setFeaturedTransporters(transporters);
    } catch (error) {
      console.error('Error loading featured transporters:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleTransporterPress = (transporterId: string) => {
    navigation.navigate('TransportDetails', { transporterId });
  };
  
  const navigateToTransporterList = () => {
    navigation.navigate('TransporterList');
  };
  
  const navigateToTransportRequest = () => {
    navigation.navigate('TransportRequest', {});
  };
  
  const navigateToMyRequests = () => {
    navigation.navigate('MyTransportRequests');
  };
  
  const renderFeatureCard = (
    title: string,
    description: string,
    icon: React.ComponentProps<typeof MaterialIcons>['name'],
    onPress: () => void
  ) => {
    return (
      <Card style={styles.featureCard} onPress={onPress}>
        <Card.Content style={styles.featureCardContent}>
          <MaterialIcons name={icon} size={40} color={theme.colors.primary} />
          <Text style={styles.featureTitle}>{title}</Text>
          <Text style={styles.featureDescription}>{description}</Text>
        </Card.Content>
      </Card>
    );
  };
  
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>{t('Loading transport options...')}</Text>
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
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('Transport')}</Text>
        <Text style={styles.headerSubtitle}>
          {t('Find reliable transport for your agricultural products')}
        </Text>
      </View>
      
      <View style={styles.featuresContainer}>
        {renderFeatureCard(
          t('Find Transporters'),
          t('Browse available transporters in your area'),
          'local-shipping',
          navigateToTransporterList
        )}
        
        {renderFeatureCard(
          t('Request Transport'),
          t('Create a new transport request'),
          'add-box',
          navigateToTransportRequest
        )}
        
        {renderFeatureCard(
          t('My Requests'),
          t('View and manage your transport requests'),
          'receipt',
          navigateToMyRequests
        )}
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('Featured Transporters')}</Text>
          <TouchableOpacity onPress={navigateToTransporterList}>
            <Text style={styles.seeAllText}>{t('See All')}</Text>
          </TouchableOpacity>
        </View>
        
        {featuredTransporters.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.transportersContainer}
          >
            {featuredTransporters.map((transporter) => (
              <View key={transporter.id} style={styles.transporterCardContainer}>
                <TransporterCard
                  transporter={transporter}
                  onPress={() => handleTransporterPress(transporter.id)}
                  containerStyle={styles.transporterCard}
                />
              </View>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="local-shipping" size={48} color="#BBBBBB" />
            <Text style={styles.emptyText}>
              {isOffline
                ? t('Transporters not available offline')
                : t('No featured transporters available')}
            </Text>
            <Button
              mode="contained"
              onPress={navigateToTransporterList}
              style={styles.emptyButton}
            >
              {t('Browse All Transporters')}
            </Button>
          </View>
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('How It Works')}</Text>
        
        <View style={styles.stepContainer}>
          <View style={styles.stepIconContainer}>
            <MaterialIcons name="search" size={32} color="#FFFFFF" />
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>{t('Find a Transporter')}</Text>
            <Text style={styles.stepDescription}>
              {t('Browse through our list of verified transporters and find the right match for your needs.')}
            </Text>
          </View>
        </View>
        
        <View style={styles.stepDivider} />
        
        <View style={styles.stepContainer}>
          <View style={[styles.stepIconContainer, { backgroundColor: '#FF9800' }]}>
            <MaterialIcons name="description" size={32} color="#FFFFFF" />
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>{t('Create a Request')}</Text>
            <Text style={styles.stepDescription}>
              {t('Submit your transport request with details about your cargo, pickup and delivery locations.')}
            </Text>
          </View>
        </View>
        
        <View style={styles.stepDivider} />
        
        <View style={styles.stepContainer}>
          <View style={[styles.stepIconContainer, { backgroundColor: '#4CAF50' }]}>
            <MaterialIcons name="local-shipping" size={32} color="#FFFFFF" />
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>{t('Track Your Shipment')}</Text>
            <Text style={styles.stepDescription}>
              {t('Stay updated on the status of your transport request and track your shipment.')}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.ctaContainer}>
        <Text style={styles.ctaTitle}>{t('Ready to Get Started?')}</Text>
        <Button
          mode="contained"
          onPress={navigateToTransporterList}
          style={styles.ctaButton}
          labelStyle={styles.ctaButtonLabel}
        >
          {t('Find Transporters Now')}
        </Button>
      </View>
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
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666666',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  featureCard: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
  },
  featureCardContent: {
    alignItems: 'center',
    padding: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    color: '#757575',
    textAlign: 'center',
  },
  section: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  transportersContainer: {
    paddingRight: 16,
  },
  transporterCardContainer: {
    width: 250,
    marginRight: 12,
  },
  transporterCard: {
    width: '100%',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyButton: {
    marginTop: 8,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stepIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
  },
  stepDivider: {
    width: 2,
    height: 24,
    backgroundColor: '#E0E0E0',
    marginLeft: 28,
    marginBottom: 16,
  },
  ctaContainer: {
    padding: 24,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    marginBottom: 24,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  ctaButton: {
    width: '100%',
    paddingVertical: 8,
  },
  ctaButtonLabel: {
    fontSize: 16,
  },
});

export default TransportHomeScreen;