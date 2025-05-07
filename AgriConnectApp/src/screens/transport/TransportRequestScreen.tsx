import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, useTheme, ActivityIndicator } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { TransportStackNavigationProp, TransportStackParamList } from '../../types/navigation';
import { Transporter } from '../../types';
import { fetchTransporterById } from '../../services/supabase/transportService';
import { getStoredTransporterById } from '../../utils/storage/transportStorage';
import { checkConnectivity } from '../../utils/storage/offlineSync';
import useAuth from '../../hooks/useAuth';
import RequestForm from '../../components/transport/RequestForm';

type TransportRequestRouteProp = RouteProp<TransportStackParamList, 'TransportRequest'>;

const TransportRequestScreen: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation<TransportStackNavigationProp>();
  const route = useRoute<TransportRequestRouteProp>();
  const { user } = useAuth();
  
  const { transporterId } = route.params || {};
  
  // State
  const [isLoading, setIsLoading] = useState(transporterId ? true : false);
  const [isOffline, setIsOffline] = useState(false);
  const [transporter, setTransporter] = useState<Transporter | null>(null);
  
  useEffect(() => {
    if (transporterId) {
      loadTransporter();
    }
    checkConnectivityStatus();
  }, [transporterId]);
  
  const checkConnectivityStatus = async () => {
    const online = await checkConnectivity();
    setIsOffline(!online);
  };
  
  const loadTransporter = async () => {
    setIsLoading(true);
    
    try {
      const online = await checkConnectivity();
      setIsOffline(!online);
      
      let transporterData: Transporter | null = null;
      
      if (online) {
        transporterData = await fetchTransporterById(transporterId);
      } else {
        transporterData = await getStoredTransporterById(transporterId);
      }
      
      setTransporter(transporterData);
    } catch (error) {
      console.error('Error loading transporter:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFormSuccess = () => {
    Alert.alert(
      t('Request Submitted'),
      t('Your transport request has been submitted successfully.'),
      [
        {
          text: t('View My Requests'),
          onPress: () => navigation.navigate('MyTransportRequests'),
        },
        {
          text: t('Back to Home'),
          onPress: () => navigation.navigate('TransportHome'),
          style: 'cancel',
        },
      ]
    );
  };
  
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>{t('Loading transporter details...')}</Text>
      </View>
    );
  }
  
  if (!user) {
    return (
      <View style={styles.errorContainer}>
        <MaterialIcons name="error-outline" size={64} color="#F44336" />
        <Text style={styles.errorTitle}>{t('Login Required')}</Text>
        <Text style={styles.errorMessage}>
          {t('You need to be logged in to create a transport request.')}
        </Text>
      </View>
    );
  }
  
  return (
    <ScrollView style={styles.container}>
      {isOffline && (
        <View style={styles.offlineBanner}>
          <MaterialIcons name="cloud-off" size={16} color="#FFFFFF" />
          <Text style={styles.offlineText}>
            {t('You are offline. Your request will be submitted when you reconnect.')}
          </Text>
        </View>
      )}
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('Request Transport')}</Text>
        <Text style={styles.headerSubtitle}>
          {transporter
            ? t('Request transport from {{name}}', { name: transporter.name })
            : t('Fill in the details to request transport')}
        </Text>
      </View>
      
      <RequestForm
        transporter={transporter}
        onSuccess={handleFormSuccess}
        isOffline={isOffline}
      />
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#757575',
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
});

export default TransportRequestScreen;