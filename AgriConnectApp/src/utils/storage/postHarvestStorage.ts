import AsyncStorage from '@react-native-async-storage/async-storage';
import { PostHarvestContent } from '../../types/postHarvest'; // Assuming the type is defined here

const POST_HARVEST_STORAGE_KEY = 'postHarvestContent';

export const savePostHarvestContent = async (content: PostHarvestContent[]): Promise<void> => {
  try {
    const jsonContent = JSON.stringify(content);
    await AsyncStorage.setItem(POST_HARVEST_STORAGE_KEY, jsonContent);
  } catch (error) {
    console.error('Error saving post-harvest content to storage:', error);
  }
};

export const getPostHarvestContent = async (): Promise<PostHarvestContent[] | null> => {
  try {
    const jsonContent = await AsyncStorage.getItem(POST_HARVEST_STORAGE_KEY);
    if (jsonContent !== null) {
      return JSON.parse(jsonContent);
    }
    return null;
  } catch (error) {
    console.error('Error getting post-harvest content from storage:', error);
    return null;
  }
};

export const clearPostHarvestContent = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(POST_HARVEST_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing post-harvest content from storage:', error);
  }
};