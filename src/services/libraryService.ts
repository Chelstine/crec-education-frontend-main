import { LibraryResource, ResourceType } from '@/types';

/**
 * Service pour la gestion des ressources de bibliothèque
 * TODO: Connecter aux vrais endpoints API quand le backend sera prêt
 */
class LibraryService {
  private readonly baseUrl = '/api/library';

  /**
   * Récupère toutes les ressources de bibliothèque
   */
  async getLibraryResources(): Promise<{ data: LibraryResource[] }> {
    // TODO: Remplacer par l'appel API réel
    // return apiClient.get(`${this.baseUrl}/resources`);
    
    throw new Error('LibraryService.getLibraryResources: Endpoint non implémenté - En attente du backend');
  }

  /**
   * Récupère une ressource par ID
   */
  async getLibraryResource(id: string): Promise<{ data: LibraryResource }> {
    // TODO: Remplacer par l'appel API réel
    // return apiClient.get(`${this.baseUrl}/resources/${id}`);
    
    throw new Error('LibraryService.getLibraryResource: Endpoint non implémenté - En attente du backend');
  }

  /**
   * Recherche des ressources par critères
   */
  async searchLibraryResources(params: {
    query?: string;
    type?: ResourceType;
    category?: string;
    author?: string;
  }): Promise<{ data: LibraryResource[] }> {
    // TODO: Remplacer par l'appel API réel
    // const searchParams = new URLSearchParams(params);
    // return apiClient.get(`${this.baseUrl}/resources/search?${searchParams}`);
    
    throw new Error('LibraryService.searchLibraryResources: Endpoint non implémenté - En attente du backend');
  }

  /**
   * Crée une nouvelle ressource (admin)
   */
  async createLibraryResource(resource: Omit<LibraryResource, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ data: LibraryResource }> {
    // TODO: Remplacer par l'appel API réel
    // return apiClient.post(`${this.baseUrl}/resources`, resource);
    
    throw new Error('LibraryService.createLibraryResource: Endpoint non implémenté - En attente du backend');
  }

  /**
   * Met à jour une ressource (admin)
   */
  async updateLibraryResource(id: string, updates: Partial<LibraryResource>): Promise<{ data: LibraryResource }> {
    // TODO: Remplacer par l'appel API réel
    // return apiClient.put(`${this.baseUrl}/resources/${id}`, updates);
    
    throw new Error('LibraryService.updateLibraryResource: Endpoint non implémenté - En attente du backend');
  }

  /**
   * Supprime une ressource (admin)
   */
  async deleteLibraryResource(id: string): Promise<void> {
    // TODO: Remplacer par l'appel API réel
    // return apiClient.delete(`${this.baseUrl}/resources/${id}`);
    
    throw new Error('LibraryService.deleteLibraryResource: Endpoint non implémenté - En attente du backend');
  }
}

export const libraryService = new LibraryService();
export default libraryService;
