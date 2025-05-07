import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator, Alert } from 'react-native';
import { Database, Listing } from '../../services/supabase/supabaseTypes'; // Import Listing type

type ListingFormData = {
  title: string;
  description: string;
  price: string; // Keep as string for input
  category: string;
};

type ListingFormErrors = {
  title: string;
  description: string;
  price: string;
  category: string;
};

interface ListingFormProps {
  initialData?: Listing; // Use Listing type for initial data
  onSubmit: (data: Omit<Listing, 'id' | 'created_at' | 'user_id'>) => Promise<void>; // Omit generated fields
  loading: boolean;
  error: string | null;
}

const ListingForm: React.FC<ListingFormProps> = ({ initialData, onSubmit, loading, error }) => {
  const [formData, setFormData] = useState<ListingFormData>(
    initialData ? {
      title: initialData.title,
      description: initialData.description,
      price: initialData.price.toString(), // Convert number to string for input
      category: initialData.category,
    } : { title: '', description: '', price: '', category: '' }
  );
  const [errors, setErrors] = useState<ListingFormErrors>({ title: '', description: '', price: '', category: '' });

  const handleInputChange = (field: keyof ListingFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for the field when user starts typing
    setErrors({ ...errors, [field]: '' });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors: ListingFormErrors = { title: '', description: '', price: '', category: '' };

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
      valid = false;
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      valid = false;
    }
    const price = parseFloat(formData.price);
    if (!formData.price.trim() || isNaN(price) || price <= 0) {
      newErrors.price = 'Valid price is required';
      valid = false;
    }
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    // Prepare data for submission, converting price to number
    const dataToSubmit = {
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
    };
    await onSubmit(dataToSubmit);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={formData.title}
        onChangeText={(text) => handleInputChange('title', text)}
      />
      {errors.title ? <Text style={styles.errorText}>{errors.title}</Text> : null}

      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Description"
        value={formData.description}
        onChangeText={(text) => handleInputChange('description', text)}
        multiline
      />
      {errors.description ? <Text style={styles.errorText}>{errors.description}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Price"
        value={formData.price}
        onChangeText={(text) => handleInputChange('price', text)}
        keyboardType="numeric"
      />
      {errors.price ? <Text style={styles.errorText}>{errors.price}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Category"
        value={formData.category}
        onChangeText={(text) => handleInputChange('category', text)}
      />
      {errors.category ? <Text style={styles.errorText}>{errors.category}</Text> : null}

      {/* Add image picker/upload functionality here later */}

      {loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <Button title="Submit Listing" onPress={handleSubmit} />
      )}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ListingForm;