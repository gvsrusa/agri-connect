import { supabase } from './supabaseClient';
import { PostHarvestContent } from '../../types/postHarvest';

export const fetchPostHarvestContent = async (): Promise<PostHarvestContent[]> => {
  // Placeholder data
  const placeholderData: PostHarvestContent[] = [
    {
      id: '1',
      category: 'Storage',
      title: 'Maize Storage Best Practices',
      description: 'Guidance on storing maize to prevent spoilage.',
      crop_type: 'Maize',
      storage_method: 'Silo',
      content: 'Detailed steps for silo storage...',
      image_url: 'https://via.placeholder.com/150',
    },
    {
      id: '2',
      category: 'Storage',
      title: 'Rice Storage Tips',
      description: 'Tips for keeping rice fresh in storage.',
      crop_type: 'Rice',
      storage_method: 'Warehouse',
      content: 'Warehouse storage considerations...',
      image_url: 'https://via.placeholder.com/150',
    },
    {
      id: '3',
      category: 'Handling',
      title: 'Proper Tomato Handling',
      description: 'How to handle tomatoes to minimize damage.',
      crop_type: 'Tomato',
      storage_method: null,
      content: 'Gentle handling techniques...',
      image_url: 'https://via.placeholder.com/150',
    },
  ];

  // In a real implementation, fetch from Supabase:
  // const { data, error } = await supabase.from('post_harvest_content').select('*');
  // if (error) {
  //   console.error('Error fetching post-harvest content:', error);
  //   return [];
  // }
  // return data;

  return new Promise((resolve) => {
    setTimeout(() => resolve(placeholderData), 500); // Simulate network delay
  });
};

export const fetchPostHarvestContentByCrop = async (cropType: string): Promise<PostHarvestContent[]> => {
  // Placeholder data filtering
  const allContent = await fetchPostHarvestContent();
  return allContent.filter(item => item.crop_type === cropType);

  // In a real implementation, fetch from Supabase:
  // const { data, error } = await supabase.from('post_harvest_content').select('*').eq('crop_type', cropType);
  // if (error) {
  //   console.error(`Error fetching post-harvest content for ${cropType}:`, error);
  //   return [];
  // }
  // return data;
};

export const fetchPostHarvestContentByStorageMethod = async (storageMethod: string): Promise<PostHarvestContent[]> => {
  // Placeholder data filtering
  const allContent = await fetchPostHarvestContent();
  return allContent.filter(item => item.storage_method === storageMethod);

  // In a real implementation, fetch from Supabase:
  // const { data, error } = await supabase.from('post_harvest_content').select('*').eq('storage_method', storageMethod);
  // if (error) {
  //   console.error(`Error fetching post-harvest content for ${storageMethod}:`, error);
  //   return [];
  // }
  // return data;
};
