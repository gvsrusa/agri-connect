import React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';

import { useAuthContext } from '../../context/AuthContext';

const GoogleSignInButton: React.FC = () => {
  const { signInWithGoogle, loading } = useAuthContext();

  const handleSignIn = () => {
    signInWithGoogle();
  };

  return (
    <Button
      icon="google"
      mode="contained"
      onPress={handleSignIn}
      style={styles.button}
      loading={loading}
      disabled={loading}
    >
      Sign in with Google
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
  },
});

export default GoogleSignInButton;