import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, TextInput, RefreshControl } from 'react-native';
import { Text, useTheme, ActivityIndicator, Chip, Divider, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { TransportStackNavigationProp } from '../../types/navigation';
import { Transporter } from '../../types';
import {
  fetchTransporters,
  filterTransportersByLocation,
  filterTransportersByVehicleType,
  filterTransportersByCapacity,
} from '../../services/supabase/transportService';
import { getStoredTransporters } from '../../utils/storage/transportStorage';
import { checkConnectivity } from '../../utils/storage/offlineSync';
import TransporterCard from '../../components/transport/TransporterCard';

const TransporterListScreen: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation<TransportStackNavigationProp>();
  
  // State
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [transporters, setTransporters] = useState<Transporter[]>([]);
  const [filteredTransporters, setFilteredTransporters] = useState<Transporter[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  
  // Filter options
  const vehicleTypes = ['Truck', 'Pickup', 'Van', 'Tractor', 'Mini Truck'];
  const capacityRanges = [
    { label: '< 500 kg', value: 500 },
    { label: '< 1000 kg', value: 1000 },
    { label: '< 2000 kg', value: 2000 },
    { label: '< 5000 kg', value: 5000 },
    { label: '5000+ kg', value: 5000, isAbove: true },
  ];
  
  useEffect(() => {
    loadTransporters();
  }, []);
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTransporters(transporters);
    } else {
      const filtered = transporters.filter(
        (transporter) =>
          transporter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          transporter.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (transporter.vehicle_type &&
            transporter.vehicle_type.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredTransporters(filtered);
    }
  }, [searchQuery, transporters]);
  
  const loadTransporters = async () => {
    if (!isRefreshing) {
      setIsLoading(true);
    }
    
    try {
      const online = await checkConnectivity();
      setIsOffline(!online);
      
      let data: Transporter[] = [];
      
      if (online) {
        data = await fetchTransporters();
        // Store transporters for offline use
        await getStoredTransporters();
      } else {
        data = await getStoredTransporters();
      }
      
      setTransporters(data);
      setFilteredTransporters(data);
      setActiveFilter(null);
    } catch (error) {
      console.error('Error loading transporters:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };
  
  const onRefresh = () => {
    setIsRefreshing(true);
    loadTransporters();
  };
  
  const handleTransporterPress = (transporterId: string) => {
    navigation.navigate('TransportDetails', { transporterId });
  };
  
  const handleFilterByLocation = async (location: string) => {
    setIsLoading(true);
    
    try {
      const online = await checkConnectivity();
      
      let filtered: Transporter[] = [];
      
      if (online) {
        filtered = await filterTransportersByLocation(location);
      } else {
        // Filter locally when offline
        const allTransporters = await getStoredTransporters();
        filtered = allTransporters.filter((t) =>
          t.location.toLowerCase().includes(location.toLowerCase())
        );
      }
      
      setTransporters(filtered);
      setFilteredTransporters(filtered);
      setActiveFilter('location');
    } catch (error) {
      console.error('Error filtering transporters by location:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFilterByVehicleType = async (vehicleType: string) => {
    setIsLoading(true);
    
    try {
      const online = await checkConnectivity();
      
      let filtered: Transporter[] = [];
      
      if (online) {
        filtered = await filterTransportersByVehicleType(vehicleType);
      } else {
        // Filter locally when offline
        const allTransporters = await getStoredTransporters();
        filtered = allTransporters.filter(
          (t) => t.vehicle_type && t.vehicle_type.toLowerCase().includes(vehicleType.toLowerCase())
        );
      }
      
      setTransporters(filtered);
      setFilteredTransporters(filtered);
      setActiveFilter('vehicle');
    } catch (error) {
      console.error('Error filtering transporters by vehicle type:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFilterByCapacity = async (capacity: number, isAbove = false) => {
    setIsLoading(true);
    
    try {
      const online = await checkConnectivity();
      
      let filtered: Transporter[] = [];
      
      if (online && !isAbove) {
        filtered = await filterTransportersByCapacity(capacity);
      } else {
        // Filter locally when offline or for "above" filter
        const allTransporters = await getStoredTransporters();
        filtered = allTransporters.filter((t) => {
          if (!t.capacity) return false;
          const transporterCapacity = parseInt(t.capacity, 10);
          return isAbove ? transporterCapacity >= capacity : transporterCapacity <= capacity;
        });
      }
      
      setTransporters(filtered);
      setFilteredTransporters(filtered);
      setActiveFilter('capacity');
    } catch (error) {
      console.error('Error filtering transporters by capacity:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleClearFilters = async () => {
    setIsLoading(true);
    
    try {
      const online = await checkConnectivity();
      
      let data: Transporter[] = [];
      
      if (online) {
        data = await fetchTransporters();
      } else {
        data = await getStoredTransporters();
      }
      
      setTransporters(data);
      setFilteredTransporters(data);
      setActiveFilter(null);
      setSearchQuery('');
    } catch (error) {
      console.error('Error clearing filters:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderFilterOptions = () => {
    return (
      <View style={styles.filterOptionsContainer}>
        <Text style={styles.filterSectionTitle}>{t('Vehicle Type')}</Text>
        <View style={styles.chipContainer}>
          {vehicleTypes.map((type) => (
            <Chip
              key={type}
              mode="outlined"
              selected={activeFilter === 'vehicle'}
              style={styles.filterChip}
              onPress={() => handleFilterByVehicleType(type)}
            >
              {type}
            </Chip>
          ))}
        </View>
        
        <Divider style={styles.divider} />
        
        <Text style={styles.filterSectionTitle}>{t('Capacity')}</Text>
        <View style={styles.chipContainer}>
          {capacityRanges.map((range) => (
            <Chip
              key={range.label}
              mode="outlined"
              selected={activeFilter === 'capacity'}
              style={styles.filterChip}
              onPress={() => handleFilterByCapacity(range.value, range.isAbove)}
            >
              {range.label}
            </Chip>
          ))}
        </View>
        
        <Divider style={styles.divider} />
        
        <Button
          mode="contained"
          onPress={handleClearFilters}
          style={styles.clearButton}
        >
          {t('Clear Filters')}
        </Button>
      </View>
    );
  };
  
  const renderEmptyList = () => {
    return (
      <View style={styles.emptyContainer}>
        <MaterialIcons name="search-off" size={64} color="#BBBBBB" />
        <Text style={styles.emptyText}>
          {activeFilter
            ? t('No transporters match your filters')
            : t('No transporters available')}
        </Text>
        {activeFilter && (
          <Button
            mode="contained"
            onPress={handleClearFilters}
            style={styles.emptyButton}
          >
            {t('Clear Filters')}
          </Button>
        )}
      </View>
    );
  };
  
  if (isLoading && !isRefreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>{t('Loading transporters...')}</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      {isOffline && (
        <View style={styles.offlineBanner}>
          <MaterialIcons name="cloud-off" size={16} color="#FFFFFF" />
          <Text style={styles.offlineText}>
            {t('You are offline. Some features may be limited.')}
          </Text>
        </View>
      )}
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <MaterialIcons name="search" size={24} color="#757575" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={t('Search transporters...')}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#757575"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialIcons name="close" size={24} color="#757575" />
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity
          style={[
            styles.filterButton,
            showFilterOptions && { backgroundColor: theme.colors.primary + '20' },
          ]}
          onPress={() => setShowFilterOptions(!showFilterOptions)}
        >
          <MaterialIcons
            name="filter-list"
            size={24}
            color={activeFilter ? theme.colors.primary : '#757575'}
          />
        </TouchableOpacity>
      </View>
      
      {showFilterOptions && renderFilterOptions()}
      
      <FlatList
        data={filteredTransporters}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransporterCard
            transporter={item}
            onPress={() => handleTransporterPress(item.id)}
            style={styles.transporterCard}
            expanded
          />
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={renderEmptyList}
      />
    </View>
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
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },
  filterButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    borderRadius: 8,
  },
  filterOptionsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterChip: {
    margin: 4,
  },
  divider: {
    marginVertical: 16,
  },
  clearButton: {
    marginTop: 8,
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  transporterCard: {
    marginBottom: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginTop: 32,
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
});

export default TransporterListScreen;