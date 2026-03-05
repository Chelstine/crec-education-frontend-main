// Types pour la galerie - src/types/gallery.types.ts

export interface GalleryItem {
  id: number;
  title: string;
  description?: string;
  media_url: string; // URL du fichier (image/vidéo)
  media_type: 'image' | 'video';
  thumbnail_url?: string; // Pour les vidéos
  category: string;
  tags: string[];
  location?: string;
  capture_date?: string;
  is_published: boolean;
  is_featured: boolean;
  order_position?: number;
  alt_text?: string; // Pour l'accessibilité
  file_size?: number; // En bytes
  dimensions?: string; // "1920x1080"
  duration?: number; // Pour les vidéos en secondes
  created_at: string;
  updated_at: string;
}

export interface GalleryItemCreateRequest {
  title: string;
  description?: string;
  media_file: File; // Le fichier à uploader
  category: string;
  tags: string[];
  location?: string;
  capture_date?: string;
  is_published: boolean;
  is_featured: boolean;
  alt_text?: string;
}

export interface GalleryItemUpdateRequest {
  title?: string;
  description?: string;
  media_file?: File; // Optionnel pour mise à jour
  category?: string;
  tags?: string[];
  location?: string;
  capture_date?: string;
  is_published?: boolean;
  is_featured?: boolean;
  alt_text?: string;
  order_position?: number;
}

export interface GalleryFilters {
  category?: string;
  media_type?: 'image' | 'video' | 'all';
  is_featured?: boolean;
  is_published?: boolean;
  search?: string;
  tags?: string[];
  date_from?: string;
  date_to?: string;
}

export interface GalleryStats {
  total_items: number;
  published_items: number;
  featured_items: number;
  total_images: number;
  total_videos: number;
  total_size: number; // En bytes
  categories_count: number;
}

export interface GalleryCategory {
  value: string;
  label: string;
  color: string;
  icon?: string;
  count?: number;
}

// Réponse paginée pour l'API
export interface PaginatedGalleryResponse {
  data: GalleryItem[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

// Réponse d'upload
export interface UploadResponse {
  success: boolean;
  message: string;
  data?: {
    media_url: string;
    thumbnail_url?: string;
    file_size: number;
    dimensions?: string;
    duration?: number;
  };
  errors?: string[];
}