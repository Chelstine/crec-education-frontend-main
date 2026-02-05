// Hook React Query pour la galerie - src/hooks/useGallery.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import galleryService from '../services/gallery.service';
import {
  GalleryItem,
  GalleryItemCreateRequest,
  GalleryItemUpdateRequest,
  GalleryFilters,
  GalleryStats,
  PaginatedGalleryResponse
} from '@/types/gallery.types';

// Clés de cache
export const galleryKeys = {
  all: ['gallery'] as const,
  public: () => [...galleryKeys.all, 'public'] as const,
  admin: () => [...galleryKeys.all, 'admin'] as const,
  stats: () => [...galleryKeys.all, 'stats'] as const,
  featured: () => [...galleryKeys.all, 'featured'] as const,
  item: (id: number) => [...galleryKeys.all, 'item', id] as const,
  category: (category: string) => [...galleryKeys.all, 'category', category] as const,
  search: (query: string) => [...galleryKeys.all, 'search', query] as const,
};

// Hook pour récupérer la galerie publique
export const usePublicGallery = (filters?: GalleryFilters) => {
  return useQuery({
    queryKey: [...galleryKeys.public(), filters],
    queryFn: () => galleryService.getPublicGalleryItems(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

// Hook pour récupérer la galerie admin (avec pagination)
export const useAdminGallery = (page = 1, filters?: GalleryFilters) => {
  return useQuery({
    queryKey: [...galleryKeys.admin(), page, filters],
    queryFn: () => galleryService.getGalleryItems(page, filters),
    placeholderData: (previousData) => previousData,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Hook pour récupérer un élément spécifique
export const useGalleryItem = (id: number) => {
  return useQuery({
    queryKey: galleryKeys.item(id),
    queryFn: () => galleryService.getGalleryItem(id),
    enabled: !!id,
  });
};

// Hook pour récupérer les statistiques
export const useGalleryStats = () => {
  return useQuery({
    queryKey: galleryKeys.stats(),
    queryFn: () => galleryService.getGalleryStats(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook pour récupérer les éléments en vedette
export const useFeaturedGallery = (limit = 6) => {
  return useQuery({
    queryKey: [...galleryKeys.featured(), limit],
    queryFn: () => galleryService.getFeaturedItems(limit),
    staleTime: 5 * 60 * 1000,
  });
};

// Hook pour récupérer les éléments par catégorie
export const useGalleryByCategory = (category: string, limit?: number) => {
  return useQuery({
    queryKey: [...galleryKeys.category(category), limit],
    queryFn: () => galleryService.getItemsByCategory(category, limit),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook pour rechercher des éléments
export const useGallerySearch = (query: string, filters?: Omit<GalleryFilters, 'search'>) => {
  return useQuery({
    queryKey: [...galleryKeys.search(query), filters],
    queryFn: () => galleryService.searchItems(query, filters),
    enabled: query.length >= 2, // Recherche seulement si au moins 2 caractères
    staleTime: 2 * 60 * 1000,
  });
};

// Mutations pour les opérations CRUD

// Hook pour créer un élément
export const useCreateGalleryItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: GalleryItemCreateRequest) => galleryService.createGalleryItem(data),
    onSuccess: (newItem) => {
      // Invalider et refetch les caches pertinents
      queryClient.invalidateQueries({ queryKey: galleryKeys.all });
      
      toast({
        title: "Succès",
        description: "L'élément a été ajouté à la galerie.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error?.response?.data?.message || "Impossible d'ajouter l'élément.",
        variant: "destructive",
      });
    },
  });
};

// Hook pour mettre à jour un élément
export const useUpdateGalleryItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: GalleryItemUpdateRequest }) =>
      galleryService.updateGalleryItem(id, data),
    onSuccess: (updatedItem: GalleryItem) => {
      // Mettre à jour le cache de l'élément spécifique
      queryClient.setQueryData(galleryKeys.item(updatedItem.id), updatedItem);
      
      // Invalider les autres caches
      queryClient.invalidateQueries({ queryKey: galleryKeys.public() });
      queryClient.invalidateQueries({ queryKey: galleryKeys.admin() });
      queryClient.invalidateQueries({ queryKey: galleryKeys.stats() });
      queryClient.invalidateQueries({ queryKey: galleryKeys.featured() });

      toast({
        title: "Succès",
        description: "L'élément a été mis à jour.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error?.response?.data?.message || "Impossible de mettre à jour l'élément.",
        variant: "destructive",
      });
    },
  });
};

// Hook pour supprimer un élément
export const useDeleteGalleryItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => galleryService.deleteGalleryItem(id),
    onSuccess: (_, deletedId) => {
      // Supprimer du cache spécifique
      queryClient.removeQueries({ queryKey: galleryKeys.item(deletedId) });
      
      // Invalider les autres caches
      queryClient.invalidateQueries({ queryKey: galleryKeys.all });

      toast({
        title: "Succès",
        description: "L'élément a été supprimé de la galerie.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error?.response?.data?.message || "Impossible de supprimer l'élément.",
        variant: "destructive",
      });
    },
  });
};

// Hook pour réorganiser les éléments
export const useReorderGalleryItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (items: { id: number; order_position: number }[]) =>
      galleryService.reorderItems(items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: galleryKeys.all });
      
      toast({
        title: "Succès",
        description: "L'ordre des éléments a été mis à jour.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error?.response?.data?.message || "Impossible de réorganiser les éléments.",
        variant: "destructive",
      });
    },
  });
};

// Hook pour upload de média
export const useUploadMedia = () => {
  return useMutation({
    mutationFn: (file: File) => galleryService.uploadMedia(file),
    onError: (error: any) => {
      toast({
        title: "Erreur d'upload",
        description: error?.response?.data?.message || "Impossible d'uploader le fichier.",
        variant: "destructive",
      });
    },
  });
};

// Hook combiné pour la gestion complète de la galerie (admin)
export const useGalleryManagement = (page = 1, filters?: GalleryFilters) => {
  const galleryQuery = useAdminGallery(page, filters);
  const statsQuery = useGalleryStats();
  const createMutation = useCreateGalleryItem();
  const updateMutation = useUpdateGalleryItem();
  const deleteMutation = useDeleteGalleryItem();
  const reorderMutation = useReorderGalleryItems();

  return {
    // Données
    items: galleryQuery.data?.data || [],
    pagination: galleryQuery.data ? {
      current_page: galleryQuery.data.current_page,
      last_page: galleryQuery.data.last_page,
      per_page: galleryQuery.data.per_page,
      total: galleryQuery.data.total,
      from: galleryQuery.data.from,
      to: galleryQuery.data.to,
    } : null,
    stats: statsQuery.data,
    
    // États de chargement
    isLoading: galleryQuery.isLoading,
    isLoadingStats: statsQuery.isLoading,
    
    // Erreurs
    error: galleryQuery.error,
    statsError: statsQuery.error,
    
    // Mutations
    createItem: createMutation.mutateAsync,
    updateItem: updateMutation.mutateAsync,
    deleteItem: deleteMutation.mutateAsync,
    reorderItems: reorderMutation.mutateAsync,
    
    // États des mutations
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isReordering: reorderMutation.isPending,
  };
};

// Export principal pour compatibilité
export const useGallery = usePublicGallery;