import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from './storageKeys';

export const saveAdvisoryContent = async (content: any) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.ADVISORY, JSON.stringify(content));
  } catch (error) {
    console.error('Error saving advisory content:', error);
  }
};

export const getAdvisoryContent = async () => {
  try {
    const content = await AsyncStorage.getItem(STORAGE_KEYS.ADVISORY);
    return content ? JSON.parse(content) : null;
  } catch (error) {
    console.error('Error getting advisory content:', error);
    return null;
  }
};