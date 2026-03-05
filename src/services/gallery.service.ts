// Service API pour la galerie - src/services/gallery.service.ts

import api from './api'; // Votre instance axios configurée
import {
  GalleryItem,
  GalleryItemCreateRequest,
  GalleryItemUpdateRequest,
  GalleryFilters,
  GalleryStats,
  PaginatedGalleryResponse,
  UploadResponse
} from '@/types/gallery.types';

class GalleryService {
  private readonly baseUrl = '/gallery';
  private readonly adminBaseUrl = '/admin/gallery';

  // GET - Récupérer tous les éléments de la galerie (public)
  async getPublicGalleryItems(params?: GalleryFilters): Promise<GalleryItem[]> {
    const queryParams = new URLSearchParams();
    
    if (params) {
      if (params.category) queryParams.append('category', params.category);
      if (params.media_type && params.media_type !== 'all') queryParams.append('media_type', params.media_type);
      if (params.search) queryParams.append('search', params.search);
      if (params.tags?.length) queryParams.append('tags', params.tags.join(','));
      if (params.date_from) queryParams.append('date_from', params.date_from);
      if (params.date_to) queryParams.append('date_to', params.date_to);
    }

    // Par défaut, ne récupérer que les éléments publiés pour le public
    queryParams.append('is_published', 'true');

    const url = queryParams.toString() ? `${this.baseUrl}?${queryParams}` : this.baseUrl;
    const response = await api.get<GalleryItem[]>(url);
    return response.data;
  }

  // GET - Récupérer tous les éléments (admin avec pagination)
  async getGalleryItems(page = 1, params?: GalleryFilters): Promise<PaginatedGalleryResponse> {
    const queryParams = new URLSearchParams();
    queryParams.append('page', page.toString());
    
    if (params) {
      if (params.category) queryParams.append('category', params.category);
      if (params.media_type && params.media_type !== 'all') queryParams.append('media_type', params.media_type);
      if (params.is_featured !== undefined) queryParams.append('is_featured', params.is_featured.toString());
      if (params.is_published !== undefined) queryParams.append('is_published', params.is_published.toString());
      if (params.search) queryParams.append('search', params.search);
      if (params.tags?.length) queryParams.append('tags', params.tags.join(','));
      if (params.date_from) queryParams.append('date_from', params.date_from);
      if (params.date_to) queryParams.append('date_to', params.date_to);
    }

    const response = await api.get<PaginatedGalleryResponse>(`${this.adminBaseUrl}/admin?${queryParams}`);
    return response.data;
  }

  // GET - Récupérer un élément par ID
  async getGalleryItem(id: number): Promise<GalleryItem> {
    const response = await api.get<GalleryItem>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  // POST - Créer un nouvel élément
  async createGalleryItem(data: GalleryItemCreateRequest): Promise<GalleryItem> {
    const formData = new FormData();
    
    formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    formData.append('media_file', data.media_file);
    formData.append('category', data.category);
    formData.append('tags', JSON.stringify(data.tags));
    if (data.location) formData.append('location', data.location);
    if (data.capture_date) formData.append('capture_date', data.capture_date);
    formData.append('is_published', data.is_published.toString());
    formData.append('is_featured', data.is_featured.toString());
    if (data.alt_text) formData.append('alt_text', data.alt_text);

    const response = await api.post<GalleryItem>(this.adminBaseUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  // PUT - Mettre à jour un élément
  async updateGalleryItem(id: number, data: GalleryItemUpdateRequest): Promise<GalleryItem> {
    const formData = new FormData();
    
    if (data.title) formData.append('title', data.title);
    if (data.description !== undefined) formData.append('description', data.description);
    if (data.media_file) formData.append('media_file', data.media_file);
    if (data.category) formData.append('category', data.category);
    if (data.tags) formData.append('tags', JSON.stringify(data.tags));
    if (data.location !== undefined) formData.append('location', data.location);
    if (data.capture_date !== undefined) formData.append('capture_date', data.capture_date);
    if (data.is_published !== undefined) formData.append('is_published', data.is_published.toString());
    if (data.is_featured !== undefined) formData.append('is_featured', data.is_featured.toString());
    if (data.alt_text !== undefined) formData.append('alt_text', data.alt_text);
    if (data.order_position !== undefined) formData.append('order_position', data.order_position.toString());

    // Méthode PATCH via POST avec _method
    formData.append('_method', 'PATCH');

    const response = await api.post<GalleryItem>(`${this.adminBaseUrl}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  // DELETE - Supprimer un élément
  async deleteGalleryItem(id: number): Promise<{ message: string }> {
    const response = await api.delete<{ message: string }>(`${this.adminBaseUrl}/${id}`);
    return response.data;
  }

  // GET - Récupérer les statistiques (admin)
  async getGalleryStats(): Promise<GalleryStats> {
    const response = await api.get<GalleryStats>(`${this.adminBaseUrl}/stats`);
    return response.data;
  }

  // POST - Réorganiser les éléments
  async reorderItems(items: { id: number; order_position: number }[]): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>(`${this.adminBaseUrl}/reorder`, { items });
    return response.data;
  }

  // POST - Upload direct de fichier (pour prévisualisation)
  async uploadMedia(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('media_file', file);

    const response = await api.post<UploadResponse>(`${this.adminBaseUrl}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  // GET - Récupérer les éléments en vedette
  async getFeaturedItems(limit = 6): Promise<GalleryItem[]> {
    const response = await api.get<GalleryItem[]>(`${this.baseUrl}/featured?limit=${limit}`);
    return response.data;
  }

  // GET - Récupérer les éléments par catégorie
  async getItemsByCategory(category: string, limit?: number): Promise<GalleryItem[]> {
    const params = new URLSearchParams();
    params.append('is_published', 'true');
    if (limit) params.append('limit', limit.toString());

    const response = await api.get<GalleryItem[]>(`${this.baseUrl}/category/${category}?${params}`);
    return response.data;
  }

  // GET - Rechercher des éléments
  async searchItems(query: string, filters?: Omit<GalleryFilters, 'search'>): Promise<GalleryItem[]> {
    const params = new URLSearchParams();
    params.append('search', query);
    params.append('is_published', 'true');
    
    if (filters) {
      if (filters.category) params.append('category', filters.category);
      if (filters.media_type && filters.media_type !== 'all') params.append('media_type', filters.media_type);
      if (filters.tags?.length) params.append('tags', filters.tags.join(','));
    }

    const response = await api.get<GalleryItem[]>(`${this.baseUrl}/search?${params}`);
    return response.data;
  }
}

export const galleryService = new GalleryService();
export default galleryService;