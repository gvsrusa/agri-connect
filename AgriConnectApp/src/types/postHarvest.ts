export interface PostHarvestContent {
  id: string;
  category: string;
  title: string;
  description: string;
  crop_type: string | null;
  storage_method: string | null;
  content: string;
  image_url: string | null;
}