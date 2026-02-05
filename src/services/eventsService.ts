import axios from 'axios';
import { Event, CreateEventData, UpdateEventData, EventResponse, EventsResponse } from '@/types/events';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Service pour la gestion des événements
export const eventsService = {
  // Récupérer tous les événements (publics)
  getAll: async (): Promise<Event[]> => {
    const response = await axios.get(`${API_BASE_URL}/events`);
    return response.data.data || response.data;
  },

  // Récupérer tous les événements (admin)
  getAllAdmin: async (): Promise<Event[]> => {
    const response = await axios.get(`${API_BASE_URL}/admin/content/events`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        'Accept': 'application/json'
      }
    });
    return response.data.data || response.data;
  },

  // Créer un nouvel événement
  create: async (data: CreateEventData): Promise<Event> => {
    const formData = new FormData();
    
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('event_date', data.event_date);
    formData.append('event_time', data.event_time);
    formData.append('location', data.location);
    formData.append('is_active', data.is_active ? '1' : '0');
    
    if (data.image) {
      formData.append('image', data.image);
    }

    const response = await axios.post(`${API_BASE_URL}/admin/content/events`, formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data.data;
  },

  // Mettre à jour un événement
  update: async (id: number, data: Partial<UpdateEventData>): Promise<Event> => {
    const formData = new FormData();
    
    // Ajouter la méthode PUT pour Laravel
    formData.append('_method', 'PUT');
    
    // Ajouter seulement les champs qui sont définis
    if (data.title !== undefined) formData.append('title', data.title);
    if (data.description !== undefined) formData.append('description', data.description);
    if (data.event_date !== undefined) formData.append('event_date', data.event_date);
    if (data.event_time !== undefined) formData.append('event_time', data.event_time);
    if (data.location !== undefined) formData.append('location', data.location);
    if (data.is_active !== undefined) formData.append('is_active', data.is_active ? '1' : '0');
    
    if (data.image) {
      formData.append('image', data.image);
    }

    try {
      // Utiliser POST avec _method=PUT pour FormData (comme dans notre test réussi)
      const response = await axios.post(`${API_BASE_URL}/admin/content/events/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data.data;
    } catch (error: any) {
      console.error('Erreur update event:', error.response?.data);
      throw error;
    }
  },

  // Supprimer un événement
  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/admin/content/events/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      }
    });
  },

  // Basculer le statut d'un événement
  toggleStatus: async (id: number): Promise<Event> => {
    const response = await axios.patch(`${API_BASE_URL}/admin/content/events/${id}/toggle-status`, {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      }
    });
    
    return response.data.data;
  },

  // Récupérer les statistiques des événements
  getStats: async () => {
    const response = await axios.get(`${API_BASE_URL}/admin/content/events/stats`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        'Accept': 'application/json'
      }
    });
    return response.data;
  },

  // Récupérer un événement par ID
  getById: async (id: number): Promise<Event> => {
    const response = await axios.get(`${API_BASE_URL}/admin/content/events/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        'Accept': 'application/json'
      }
    });
    return response.data.data;
  }
};
