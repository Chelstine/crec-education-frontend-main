import api from './api';

/**
 * Types pour les formations
 */
export interface Formation {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  link: string;
  type: 'university' | 'open' | 'fablab';
  startDate?: string;
  endDate?: string;
  price?: number;
  capacity?: number;
  location?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Service pour gérer les formations
 */
const formationService = {
  /**
   * Récupère toutes les formations publiées
   */
  getAllPublishedFormations: async (): Promise<Formation[]> => {
    try {
      const response = await api.get('/formations?published=true');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des formations', error);
      return [];
    }
  },

  /**
   * Récupère les formations par type (universitaire, ouverte, fablab)
   * @param type Le type de formation à récupérer
   */
  getFormationsByType: async (type: 'university' | 'open' | 'fablab'): Promise<Formation[]> => {
    try {
      const response = await api.get(`/formations?type=${type}&published=true`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des formations de type ${type}`, error);
      return [];
    }
  },

  /**
   * Récupère une formation par son ID
   * @param id L'ID de la formation à récupérer
   */
  getFormationById: async (id: string): Promise<Formation | null> => {
    try {
      const response = await api.get(`/formations/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la formation ${id}`, error);
      return null;
    }
  },

  /**
   * [ADMIN] Crée une nouvelle formation
   * @param formationData Les données de la formation à créer
   */
  createFormation: async (formationData: Omit<Formation, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await api.post('/formations', formationData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * [ADMIN] Met à jour une formation existante
   * @param id L'ID de la formation à mettre à jour
   * @param formationData Les données mises à jour de la formation
   */
  updateFormation: async (id: string, formationData: Partial<Formation>) => {
    try {
      const response = await api.put(`/formations/${id}`, formationData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * [ADMIN] Supprime une formation
   * @param id L'ID de la formation à supprimer
   */
  deleteFormation: async (id: string) => {
    try {
      await api.delete(`/formations/${id}`);
      return true;
    } catch (error) {
      throw error;
    }
  },

  /**
   * [ADMIN] Récupère toutes les formations (publiées et non publiées)
   */
  getAllFormations: async (): Promise<Formation[]> => {
    try {
      const response = await api.get('/formations/admin');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de toutes les formations', error);
      return [];
    }
  }
};

export default formationService;
