// src/services/formationService.ts - Version robuste

import axios from 'axios';
import { Formation, CreateFormationData, UpdateFormationData, FormationResponse, SingleFormationResponse } from '@/types/formations';

// Configuration API directe et robuste
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';


// Création directe de l'instance axios dans le service
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Timeout plus permissif pour absorber les cold starts Render
  timeout: 25000,
});

// Petit helper de retry avec backoff
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
const withRetry = async <T>(fn: () => Promise<T>, retries = 2, backoffMs = 700): Promise<T> => {
  let attempt = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      return await fn();
    } catch (error) {
      if (attempt >= retries) throw error;
      attempt += 1;
      await sleep(backoffMs * attempt);
    }
  }
};

// Ajout d'intercepteurs pour le debug
apiClient.interceptors.request.use(
  (config) => {
    // console.log('📡 API Request:', config.method?.toUpperCase(), config.url);
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    // console.log('✅ API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

class FormationService {
  // Récupérer toutes les formations (publiques)
  async getOpenFormations(): Promise<Formation[]> {
    try {
      console.log('🔄 Fetching open formations...');
      const response = await withRetry(
        () => apiClient.get<FormationResponse>('/formations/public'),
        2,
        800
      );
      console.log('✅ Formations fetched:', response.data.data.length);
      return response.data.data;
    } catch (error) {
      console.error('❌ Error fetching formations:', error);
      // Message plus clair pour l’UI en cas de délai dépassé ou serveur lent
      if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
        throw new Error('Le serveur met plus de temps à répondre. Merci de réessayer dans un instant.');
      }
      throw error;
    }
  }

  // Admin - Récupérer toutes les formations
  async getAllFormations(): Promise<Formation[]> {
    try {
      const response = await apiClient.get<FormationResponse>('/admin/formations');
      return response.data.data;
    } catch (error) {
      console.error('❌ Error fetching admin formations:', error);
      throw error;
    }
  }

  // Admin - Créer une nouvelle formation
  async createFormation(formData: FormData): Promise<Formation> {
    try {
      const response = await apiClient.post<SingleFormationResponse>('/admin/formations', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    } catch (error) {
      console.error('❌ Error creating formation:', error);
      throw error;
    }
  }

  // Admin - Mettre à jour une formation
  async updateFormation(id: number, formData: FormData): Promise<Formation> {
    try {
      formData.append('_method', 'PUT');
      const response = await apiClient.post<SingleFormationResponse>(`/admin/formations/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    } catch (error) {
      console.error('❌ Error updating formation:', error);
      throw error;
    }
  }

  // Admin - Supprimer une formation
  async deleteFormation(id: number): Promise<void> {
    try {
      await apiClient.delete(`/admin/formations/${id}`);
    } catch (error) {
      console.error('❌ Error deleting formation:', error);
      throw error;
    }
  }

  // Admin - Récupérer une formation par ID
  async getFormationById(id: number): Promise<Formation> {
    try {
      const response = await apiClient.get<SingleFormationResponse>(`/admin/formations/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('❌ Error fetching formation by ID:', error);
      throw error;
    }
  }

  // Admin - Changer le statut d'une formation
  async toggleFormationStatus(id: number): Promise<Formation> {
    try {
      const response = await apiClient.patch<SingleFormationResponse>(`/admin/formations/${id}/toggle-status`);
      return response.data.data;
    } catch (error) {
      console.error('❌ Error toggling formation status:', error);
      throw error;
    }
  }
}

export const formationService = new FormationService();
export { apiClient as formationApiClient };
