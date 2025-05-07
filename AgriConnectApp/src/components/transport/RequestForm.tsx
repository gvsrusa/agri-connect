import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  useTheme,
  ActivityIndicator,
  HelperText,
  Divider,
  Chip,
} from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Transporter, TransportRequestFormData } from '../../types';
import { createTransportRequest } from '../../services/supabase/transportService';
import { queueTransportRequest } from '../../utils/storage/transportStorage';
import useAuth from '../../hooks/useAuth';

export interface RequestFormProps {
  transporter: Transporter | null;
  isOffline: boolean;
  onSubmit?: (data: TransportRequestFormData) => void;
}

const RequestForm: React.FC<RequestFormProps> = ({ transporter, isOffline, onSubmit }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { user } = useAuth();
  
  // Form state
  const [pickupLocation, setPickupLocation] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [scheduledDate, setScheduledDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [cargoType, setCargoType] = useState('');
  const [cargoWeight, setCargoWeight] = useState('');
  const [cargoVolume, setCargoVolume] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  
  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Common cargo types
  const commonCargoTypes = ['Grains', 'Vegetables', 'Fruits', 'Dairy', 'Livestock', 'Fertilizer', 'Seeds'];
  
  useEffect(() => {
    // Pre-fill contact information if user is logged in
    if (user) {
      setContactName(user.full_name || '');
      setContactPhone(user.phone_number || '');
    }
  }, [user]);
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!pickupLocation.trim()) {
      newErrors.pickupLocation = t('Pickup location is required');
    }
    
    if (!deliveryLocation.trim()) {
      newErrors.deliveryLocation = t('Delivery location is required');
    }
    
    if (!cargoType.trim()) {
      newErrors.cargoType = t('Cargo type is required');
    }
    
    if (!cargoWeight.trim()) {
      newErrors.cargoWeight = t('Cargo weight is required');
    } else if (isNaN(Number(cargoWeight)) || Number(cargoWeight) <= 0) {
      newErrors.cargoWeight = t('Please enter a valid weight');
    }
    
    if (cargoVolume.trim() && (isNaN(Number(cargoVolume)) || Number(cargoVolume) <= 0)) {
      newErrors.cargoVolume = t('Please enter a valid volume');
    }
    
    if (!contactName.trim()) {
      newErrors.contactName = t('Contact name is required');
    }
    
    if (!contactPhone.trim()) {
      newErrors.contactPhone = t('Contact phone is required');
    } else if (!/^\d{10}$/.test(contactPhone.replace(/\D/g, ''))) {
      newErrors.contactPhone = t('Please enter a valid 10-digit phone number');
    }
    
    // Validate date (should be in the future)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (scheduledDate < today) {
      newErrors.scheduledDate = t('Scheduled date must be in the future');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    if (!user) {
      Alert.alert(
        t('Login Required'),
        t('You need to be logged in to create a transport request.'),
        [{ text: t('OK') }]
      );
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const requestData: TransportRequestFormData = {
        pickup_location: pickupLocation,
        delivery_location: deliveryLocation,
        scheduled_date: scheduledDate.toISOString(),
        cargo_type: cargoType,
        cargo_weight: Number(cargoWeight),
        cargo_volume: cargoVolume ? Number(cargoVolume) : undefined,
        special_instructions: specialInstructions.trim() || undefined,
        contact_name: contactName,
        contact_phone: contactPhone,
        transporter_id: transporter?.id,
      };
      
      if (isOffline) {
        // Queue the request for later submission
        await queueTransportRequest(requestData, user.id);
        
        Alert.alert(
          t('Request Queued'),
          t('Your transport request has been saved and will be submitted when you reconnect.'),
          [{ text: t('OK') }]
        );
      } else {
        // Submit the request immediately
        await createTransportRequest(requestData, user.id);
      }
      
      // Call onSubmit callback if provided
      if (onSubmit) {
        onSubmit(requestData);
      }
      
      // Reset form
      setPickupLocation('');
      setDeliveryLocation('');
      setScheduledDate(new Date());
      setCargoType('');
      setCargoWeight('');
      setCargoVolume('');
      setSpecialInstructions('');
      
      // Keep contact information for convenience
    } catch (error) {
      console.error('Error submitting transport request:', error);
      Alert.alert(
        t('Error'),
        t('Failed to submit transport request. Please try again.'),
        [{ text: t('OK') }]
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setScheduledDate(selectedDate);
    }
  };
  
  const showDatepicker = () => {
    setShowDatePicker(true);
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const handleCargoTypeSelect = (type: string) => {
    setCargoType(type);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.sectionTitle}>{t('Locations')}</Text>
          
          <TextInput
            label={t('Pickup Location')}
            value={pickupLocation}
            onChangeText={setPickupLocation}
            mode="outlined"
            style={styles.input}
            error={!!errors.pickupLocation}
            disabled={isSubmitting}
            left={<TextInput.Icon icon="map-marker" />}
          />
          {errors.pickupLocation && (
            <HelperText type="error" visible={!!errors.pickupLocation}>
              {errors.pickupLocation}
            </HelperText>
          )}
          
          <TextInput
            label={t('Delivery Location')}
            value={deliveryLocation}
            onChangeText={setDeliveryLocation}
            mode="outlined"
            style={styles.input}
            error={!!errors.deliveryLocation}
            disabled={isSubmitting}
            left={<TextInput.Icon icon="map-marker-check" />}
          />
          {errors.deliveryLocation && (
            <HelperText type="error" visible={!!errors.deliveryLocation}>
              {errors.deliveryLocation}
            </HelperText>
          )}
        </View>
        
        <Divider style={styles.divider} />
        
        <View style={styles.formGroup}>
          <Text style={styles.sectionTitle}>{t('Schedule')}</Text>
          
          <TouchableOpacity
            style={[
              styles.datePickerButton,
              errors.scheduledDate ? styles.inputError : null,
            ]}
            onPress={showDatepicker}
            disabled={isSubmitting}
          >
            <MaterialIcons name="event" size={24} color="#757575" style={styles.dateIcon} />
            <Text style={styles.dateText}>{formatDate(scheduledDate)}</Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="#757575" />
          </TouchableOpacity>
          
          {errors.scheduledDate && (
            <HelperText type="error" visible={!!errors.scheduledDate}>
              {errors.scheduledDate}
            </HelperText>
          )}
          
          {showDatePicker && (
            <DateTimePicker
              value={scheduledDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}
        </View>
        
        <Divider style={styles.divider} />
        
        <View style={styles.formGroup}>
          <Text style={styles.sectionTitle}>{t('Cargo Details')}</Text>
          
          <TextInput
            label={t('Cargo Type')}
            value={cargoType}
            onChangeText={setCargoType}
            mode="outlined"
            style={styles.input}
            error={!!errors.cargoType}
            disabled={isSubmitting}
            left={<TextInput.Icon icon="package-variant" />}
          />
          {errors.cargoType && (
            <HelperText type="error" visible={!!errors.cargoType}>
              {errors.cargoType}
            </HelperText>
          )}
          
          <Text style={styles.chipLabel}>{t('Common Cargo Types')}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipContainer}
          >
            {commonCargoTypes.map((type) => (
              <Chip
                key={type}
                mode="outlined"
                selected={cargoType === type}
                style={styles.chip}
                onPress={() => handleCargoTypeSelect(type)}
                disabled={isSubmitting}
              >
                {type}
              </Chip>
            ))}
          </ScrollView>
          
          <View style={styles.rowInputs}>
            <View style={styles.halfInput}>
              <TextInput
                label={t('Weight (kg)')}
                value={cargoWeight}
                onChangeText={setCargoWeight}
                mode="outlined"
                style={styles.input}
                error={!!errors.cargoWeight}
                disabled={isSubmitting}
                keyboardType="numeric"
                left={<TextInput.Icon icon="weight" />}
              />
              {errors.cargoWeight && (
                <HelperText type="error" visible={!!errors.cargoWeight}>
                  {errors.cargoWeight}
                </HelperText>
              )}
            </View>
            
            <View style={styles.halfInput}>
              <TextInput
                label={t('Volume (m³) (optional)')}
                value={cargoVolume}
                onChangeText={setCargoVolume}
                mode="outlined"
                style={styles.input}
                error={!!errors.cargoVolume}
                disabled={isSubmitting}
                keyboardType="numeric"
                left={<TextInput.Icon icon="cube-outline" />}
              />
              {errors.cargoVolume && (
                <HelperText type="error" visible={!!errors.cargoVolume}>
                  {errors.cargoVolume}
                </HelperText>
              )}
            </View>
          </View>
          
          <TextInput
            label={t('Special Instructions (optional)')}
            value={specialInstructions}
            onChangeText={setSpecialInstructions}
            mode="outlined"
            style={styles.input}
            multiline
            numberOfLines={3}
            disabled={isSubmitting}
            left={<TextInput.Icon icon="information-outline" />}
          />
        </View>
        
        <Divider style={styles.divider} />
        
        <View style={styles.formGroup}>
          <Text style={styles.sectionTitle}>{t('Contact Information')}</Text>
          
          <TextInput
            label={t('Contact Name')}
            value={contactName}
            onChangeText={setContactName}
            mode="outlined"
            style={styles.input}
            error={!!errors.contactName}
            disabled={isSubmitting}
            left={<TextInput.Icon icon="account" />}
          />
          {errors.contactName && (
            <HelperText type="error" visible={!!errors.contactName}>
              {errors.contactName}
            </HelperText>
          )}
          
          <TextInput
            label={t('Contact Phone')}
            value={contactPhone}
            onChangeText={setContactPhone}
            mode="outlined"
            style={styles.input}
            error={!!errors.contactPhone}
            disabled={isSubmitting}
            keyboardType="phone-pad"
            left={<TextInput.Icon icon="phone" />}
          />
          {errors.contactPhone && (
            <HelperText type="error" visible={!!errors.contactPhone}>
              {errors.contactPhone}
            </HelperText>
          )}
        </View>
        
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          {isOffline ? t('Save Request for Later') : t('Submit Request')}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    elevation: 2,
  },
  formGroup: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: '#F44336',
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BBBBBB',
    borderRadius: 4,
    padding: 12,
    marginBottom: 8,
  },
  dateIcon: {
    marginRight: 8,
  },
  dateText: {
    flex: 1,
    fontSize: 16,
  },
  chipLabel: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  divider: {
    marginVertical: 16,
  },
  submitButton: {
    marginTop: 16,
    paddingVertical: 8,
  },
});

export default RequestForm;