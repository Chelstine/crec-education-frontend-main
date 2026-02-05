// services/partnersService.ts
import { apiClient } from '../lib/api';

export interface Partner {
  id: number;
  name: string;
  slug: string;
  description?: string;
  logo_url?: string;
  website_url?: string;
  type: 'academic' | 'institutional' | 'corporate' | 'ngo' | 'other';
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  partnership_start_date?: string;
  contact_info?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface CreatePartnerData {
  name: string;
  slug?: string;
  description?: string;
  logo?: File;
  website_url?: string;
  type: Partner['type'];
  is_featured?: boolean;
  is_active?: boolean;
  sort_order?: number;
  partnership_start_date?: string;
  contact_info?: Partner['contact_info'];
}

class PartnersService {
  // Public API calls (no auth required)
  async getPublicPartners(): Promise<Partner[]> {
    try {
      const response = await apiClient.get('/partners');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching public partners:', error);
      throw error;
    }
  }

  async getPublicPartner(id: number): Promise<Partner> {
    try {
      const response = await apiClient.get(`/partners/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching public partner:', error);
      throw error;
    }
  }

  // Admin API calls (auth required)
  async getAdminPartners(): Promise<Partner[]> {
    try {
      const response = await apiClient.get('/admin/content/partners');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching admin partners:', error);
      throw error;
    }
  }

  async getAdminPartner(id: number): Promise<Partner> {
    try {
      const response = await apiClient.get(`/admin/content/partners/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching admin partner:', error);
      throw error;
    }
  }

  async createPartner(data: CreatePartnerData): Promise<Partner> {
    try {
      const formData = new FormData();
      
      // Add all the data to form data
      formData.append('name', data.name);
      if (data.slug) formData.append('slug', data.slug);
      if (data.description) formData.append('description', data.description);
      if (data.logo) formData.append('logo', data.logo);
      if (data.website_url) formData.append('website_url', data.website_url);
      formData.append('type', data.type);
      formData.append('is_featured', data.is_featured ? '1' : '0');
      formData.append('is_active', data.is_active ? '1' : '0');
      if (data.sort_order !== undefined) formData.append('sort_order', data.sort_order.toString());
      if (data.partnership_start_date) formData.append('partnership_start_date', data.partnership_start_date);
      if (data.contact_info) {
        if (data.contact_info.email) formData.append('contact_info[email]', data.contact_info.email);
        if (data.contact_info.phone) formData.append('contact_info[phone]', data.contact_info.phone);
        if (data.contact_info.address) formData.append('contact_info[address]', data.contact_info.address);
      }

      const response = await apiClient.post('/admin/content/partners', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error creating partner:', error);
      throw error;
    }
  }

  async updatePartner(id: number, data: Partial<CreatePartnerData>): Promise<Partner> {
    try {
      const formData = new FormData();
      formData.append('_method', 'PUT');
      
      // Add all the data to form data
      if (data.name) formData.append('name', data.name);
      if (data.slug) formData.append('slug', data.slug);
      if (data.description) formData.append('description', data.description);
      if (data.logo) formData.append('logo', data.logo);
      if (data.website_url) formData.append('website_url', data.website_url);
      if (data.type) formData.append('type', data.type);
      if (data.is_featured !== undefined) formData.append('is_featured', data.is_featured ? '1' : '0');
      if (data.is_active !== undefined) formData.append('is_active', data.is_active ? '1' : '0');
      if (data.sort_order !== undefined) formData.append('sort_order', data.sort_order.toString());
      if (data.partnership_start_date) formData.append('partnership_start_date', data.partnership_start_date);
      if (data.contact_info) {
        if (data.contact_info.email) formData.append('contact_info[email]', data.contact_info.email);
        if (data.contact_info.phone) formData.append('contact_info[phone]', data.contact_info.phone);
        if (data.contact_info.address) formData.append('contact_info[address]', data.contact_info.address);
      }

      const response = await apiClient.post(`/admin/content/partners/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error updating partner:', error);
      throw error;
    }
  }

  async deletePartner(id: number): Promise<void> {
    try {
      await apiClient.delete(`/admin/content/partners/${id}`);
    } catch (error) {
      console.error('Error deleting partner:', error);
      throw error;
    }
  }
}

export const partnersService = new PartnersService();
export default partnersService;
