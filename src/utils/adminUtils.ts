import React from 'react';

// Utilitaires communs pour les pages d'administration

// Types pour les statistiques communes
export interface StatCard {
  title: string;
  value: number | string;
  icon: React.ComponentType<any>;
  color: string;
  description?: string;
}

// Couleurs pour les badges de statut
export const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  completed: 'bg-blue-100 text-blue-800',
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-red-100 text-red-800',
  archived: 'bg-gray-100 text-gray-800',
} as const;

// Couleurs pour les catégories
export const categoryColors = {
  langues: 'bg-blue-100 text-blue-800',
  informatique: 'bg-green-100 text-green-800',
  accompagnement: 'bg-purple-100 text-purple-800',
  entrepreneuriat: 'bg-orange-100 text-orange-800',
  university: 'bg-indigo-100 text-indigo-800',
  fablab: 'bg-teal-100 text-teal-800',
} as const;

// Couleurs pour les niveaux
export const levelColors = {
  debutant: 'bg-green-100 text-green-800',
  intermediaire: 'bg-yellow-100 text-yellow-800',
  avance: 'bg-red-100 text-red-800',
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800',
} as const;

// Fonction utilitaire pour obtenir la couleur d'un badge
export const getBadgeColor = (
  value: string,
  type: 'status' | 'category' | 'level'
): string => {
  switch (type) {
    case 'status':
      return statusColors[value as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
    case 'category':
      return categoryColors[value as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800';
    case 'level':
      return levelColors[value as keyof typeof levelColors] || 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Fonction pour formater les dates
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Fonction pour formater les dates avec l'heure
export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Fonction pour filtrer les données
export const filterData = <T extends Record<string, any>>(
  data: T[],
  searchTerm: string,
  filters: Record<string, string>,
  searchFields: (keyof T)[]
): T[] => {
  let filtered = data;

  // Filtrage par terme de recherche
  if (searchTerm) {
    filtered = filtered.filter(item =>
      searchFields.some(field =>
        String(item[field]).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }

  // Filtrage par filtres spécifiques
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== 'all' && value !== '') {
      filtered = filtered.filter(item => item[key] === value);
    }
  });

  return filtered;
};

// Hook pour la gestion des filtres et recherche
export const useAdminFilters = <T extends Record<string, any>>(
  data: T[],
  searchFields: (keyof T)[]
) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filters, setFilters] = React.useState<Record<string, string>>({});
  const [filteredData, setFilteredData] = React.useState<T[]>(data);

  React.useEffect(() => {
    const filtered = filterData(data, searchTerm, filters, searchFields);
    setFilteredData(filtered);
  }, [data, searchTerm, filters, searchFields]);

  const updateFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({});
  };

  return {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    clearFilters,
    filteredData
  };
};

// Configuration des animations communes
export const adminAnimations = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  },
  staggeredFadeIn: (index: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: index * 0.1 }
  }),
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3 }
  }
};

// Constantes pour les configurations
export const ITEMS_PER_PAGE = 10;
export const DEBOUNCE_DELAY = 300;
export const DEFAULT_SORT_ORDER = 'desc';

// Types pour les actions communes
export interface AdminAction {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  action: () => void;
  variant?: 'default' | 'destructive' | 'outline';
  disabled?: boolean;
}
