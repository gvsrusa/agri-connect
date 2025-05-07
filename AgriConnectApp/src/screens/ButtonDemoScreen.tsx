import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { ButtonDemo } from '../components';

/**
 * A screen that demonstrates all the different button variants and options
 * available in the Button component.
 */
const ButtonDemoScreen: React.FC = () => {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Button Component Demo</Text>
        <Text style={styles.headerSubtitle}>
          Explore all the different button variants and options available in the AgriConnect app.
        </Text>
      </View>
      <ButtonDemo />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666666',
  },
});

export default ButtonDemoScreen;