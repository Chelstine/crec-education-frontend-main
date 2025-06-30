import api from './api';

/**
 * Types pour les événements
 */
export interface Event {
  id: string;
  title: string;
  description: string;
  content: string;
  image?: string;
  eventDate: string;
  endDate?: string;
  location: string;
  eventType: 'conference' | 'workshop' | 'news' | 'other';
  published: boolean;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Service pour gérer les événements et actualités
 */
const eventService = {
  /**
   * Récupère tous les événements publiés
   */
  getAllPublishedEvents: async (): Promise<Event[]> => {
    try {
      const response = await api.get('/events?published=true');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des événements', error);
      return [];
    }
  },

  /**
   * Récupère les événements à venir
   */
  getUpcomingEvents: async (): Promise<Event[]> => {
    try {
      const today = new Date().toISOString();
      const response = await api.get(`/events?published=true&eventDate_gt=${today}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des événements à venir', error);
      return [];
    }
  },
  
  /**
   * Récupère les événements par type
   * @param eventType Le type d'événement à récupérer
   */
  getEventsByType: async (eventType: 'conference' | 'workshop' | 'news' | 'other'): Promise<Event[]> => {
    try {
      const response = await api.get(`/events?eventType=${eventType}&published=true`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des événements de type ${eventType}`, error);
      return [];
    }
  },

  /**
   * Récupère un événement par son ID
   * @param id L'ID de l'événement à récupérer
   */
  getEventById: async (id: string): Promise<Event | null> => {
    try {
      const response = await api.get(`/events/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'événement ${id}`, error);
      return null;
    }
  },

  /**
   * [ADMIN] Crée un nouvel événement
   * @param eventData Les données de l'événement à créer
   */
  createEvent: async (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await api.post('/events', eventData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * [ADMIN] Met à jour un événement existant
   * @param id L'ID de l'événement à mettre à jour
   * @param eventData Les données mises à jour de l'événement
   */
  updateEvent: async (id: string, eventData: Partial<Event>) => {
    try {
      const response = await api.put(`/events/${id}`, eventData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * [ADMIN] Supprime un événement
   * @param id L'ID de l'événement à supprimer
   */
  deleteEvent: async (id: string) => {
    try {
      await api.delete(`/events/${id}`);
      return true;
    } catch (error) {
      throw error;
    }
  },

  /**
   * [ADMIN] Récupère tous les événements (publiés et non publiés)
   */
  getAllEvents: async (): Promise<Event[]> => {
    try {
      const response = await api.get('/events/admin');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de tous les événements', error);
      return [];
    }
  }
};

export default eventService;
