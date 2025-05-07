import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import LanguageSelector from '../localization/LanguageSelector';
import { Button } from '../components';
import { HomeStackNavigationProp } from '../types/navigation';

const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<HomeStackNavigationProp>();

  const navigateToButtonDemo = () => {
    navigation.navigate('ButtonDemo');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.onSurface }]}>
        {t('screens.home')}
      </Text>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Button Component Demo"
          onPress={navigateToButtonDemo}
          variant="primary"
          icon="palette"
        />
      </View>
      
      <LanguageSelector />
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
    fontWeight: 'bold',
    marginBottom: 24,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 24,
  },
});

export default HomeScreen;