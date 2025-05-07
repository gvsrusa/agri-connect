import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GoogleSignInButton from '../../components/auth/GoogleSignInButton';

const LoginScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {/* Placeholder for Google Sign-In Button */}
      <GoogleSignInButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default LoginScreen;