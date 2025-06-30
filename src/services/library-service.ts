import api from './api';

/**
 * Types pour les ressources de la bibliothèque
 */
export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage?: string;
  publicationYear?: number;
  publisher?: string;
  category: string;
  isbn?: string;
  available: boolean;
  digital: boolean;
  downloadUrl?: string;
  readOnlineUrl?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Service pour gérer la bibliothèque en ligne
 */
const libraryService = {
  /**
   * Récupère tous les livres disponibles
   */
  getAllAvailableBooks: async (): Promise<Book[]> => {
    try {
      const response = await api.get('/library?available=true');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des livres', error);
      return [];
    }
  },

  /**
   * Recherche des livres par titre, auteur ou catégorie
   * @param searchTerm Le terme de recherche
   */
  searchBooks: async (searchTerm: string): Promise<Book[]> => {
    try {
      const response = await api.get(`/library/search?term=${encodeURIComponent(searchTerm)}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la recherche de livres', error);
      return [];
    }
  },

  /**
   * Récupère les livres par catégorie
   * @param category La catégorie de livres à récupérer
   */
  getBooksByCategory: async (category: string): Promise<Book[]> => {
    try {
      const response = await api.get(`/library?category=${encodeURIComponent(category)}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des livres de la catégorie ${category}`, error);
      return [];
    }
  },

  /**
   * Récupère un livre par son ID
   * @param id L'ID du livre à récupérer
   */
  getBookById: async (id: string): Promise<Book | null> => {
    try {
      const response = await api.get(`/library/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du livre ${id}`, error);
      return null;
    }
  },

  /**
   * [ADMIN] Ajoute un nouveau livre à la bibliothèque
   * @param bookData Les données du livre à ajouter
   */
  addBook: async (bookData: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await api.post('/library', bookData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * [ADMIN] Met à jour les informations d'un livre
   * @param id L'ID du livre à mettre à jour
   * @param bookData Les données mises à jour du livre
   */
  updateBook: async (id: string, bookData: Partial<Book>) => {
    try {
      const response = await api.put(`/library/${id}`, bookData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * [ADMIN] Supprime un livre de la bibliothèque
   * @param id L'ID du livre à supprimer
   */
  deleteBook: async (id: string) => {
    try {
      await api.delete(`/library/${id}`);
      return true;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Récupère les catégories de livres disponibles
   */
  getCategories: async (): Promise<string[]> => {
    try {
      const response = await api.get('/library/categories');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories', error);
      return [];
    }
  }
};

export default libraryService;
