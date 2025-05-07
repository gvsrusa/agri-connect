import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Button from './index';

/**
 * A component that demonstrates all the different button variants and options
 * available in the Button component.
 */
const ButtonDemo: React.FC = () => {
  const theme = useTheme();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Button Variants</Text>
      <View style={styles.section}>
        <Button title="Primary Button" onPress={() => console.log('Primary pressed')} variant="primary" />
        <Button title="Secondary Button" onPress={() => console.log('Secondary pressed')} variant="secondary" />
        <Button title="Success Button" onPress={() => console.log('Success pressed')} variant="success" />
        <Button title="Warning Button" onPress={() => console.log('Warning pressed')} variant="warning" />
        <Button title="Info Button" onPress={() => console.log('Info pressed')} variant="info" />
        <Button title="Error Button" onPress={() => console.log('Error pressed')} variant="error" />
      </View>

      <Text style={styles.sectionTitle}>Button Modes</Text>
      <View style={styles.section}>
        <Button title="Contained Button" onPress={() => console.log('Contained pressed')} mode="contained" />
        <Button title="Outlined Button" onPress={() => console.log('Outlined pressed')} mode="outlined" />
        <Button title="Text Button" onPress={() => console.log('Text pressed')} mode="text" />
        <Button title="Elevated Button" onPress={() => console.log('Elevated pressed')} mode="elevated" />
        <Button title="Contained Tonal Button" onPress={() => console.log('Tonal pressed')} mode="contained-tonal" />
      </View>

      <Text style={styles.sectionTitle}>Button Sizes</Text>
      <View style={styles.section}>
        <Button title="Small Button" onPress={() => console.log('Small pressed')} size="small" />
        <Button title="Medium Button" onPress={() => console.log('Medium pressed')} size="medium" />
        <Button title="Large Button" onPress={() => console.log('Large pressed')} size="large" />
      </View>

      <Text style={styles.sectionTitle}>Button with Icon</Text>
      <View style={styles.section}>
        <Button 
          title="Add Item" 
          onPress={() => console.log('Add pressed')} 
          icon="plus" 
        />
        <Button 
          title="Save" 
          onPress={() => console.log('Save pressed')} 
          icon="content-save" 
          variant="success" 
        />
        <Button 
          title="Delete" 
          onPress={() => console.log('Delete pressed')} 
          icon="delete" 
          variant="error" 
        />
      </View>

      <Text style={styles.sectionTitle}>Full Width Button</Text>
      <View style={styles.section}>
        <Button 
          title="Full Width Button" 
          onPress={() => console.log('Full width pressed')} 
          fullWidth 
        />
      </View>

      <Text style={styles.sectionTitle}>Loading Button</Text>
      <View style={styles.section}>
        <Button 
          title="Loading Button" 
          onPress={() => console.log('Loading pressed')} 
          loading 
        />
      </View>

      <Text style={styles.sectionTitle}>Disabled Button</Text>
      <View style={styles.section}>
        <Button 
          title="Disabled Button" 
          onPress={() => console.log('Disabled pressed')} 
          disabled 
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
});

export default ButtonDemo;