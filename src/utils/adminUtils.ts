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

// Fonction pour exporter des données en CSV
export const exportToCSV = (data: any[], filename: string, columns: string[]) => {
  const csvContent = [
    columns.join(','),
    ...data.map(row => 
      columns.map(col => {
        const value = row[col];
        // Échapper les guillemets et virgules
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value || '';
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// Fonction pour valider les données de formulaire
export const validateFormData = (
  data: Record<string, any>,
  rules: Record<string, {
    required?: boolean;
    type?: 'email' | 'number' | 'string';
    min?: number;
    max?: number;
    pattern?: RegExp;
  }>
): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  Object.entries(rules).forEach(([field, rule]) => {
    const value = data[field];

    if (rule.required && (!value || value.toString().trim() === '')) {
      errors[field] = 'Ce champ est requis';
      return;
    }

    if (value && rule.type) {
      switch (rule.type) {
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            errors[field] = 'Format d\'email invalide';
          }
          break;
        case 'number':
          if (isNaN(Number(value))) {
            errors[field] = 'Doit être un nombre';
          }
          break;
      }
    }

    if (value && rule.min && value.toString().length < rule.min) {
      errors[field] = `Minimum ${rule.min} caractères`;
    }

    if (value && rule.max && value.toString().length > rule.max) {
      errors[field] = `Maximum ${rule.max} caractères`;
    }

    if (value && rule.pattern && !rule.pattern.test(value)) {
      errors[field] = 'Format invalide';
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Fonction pour formater les dates avec options
export const formatDateAdvanced = (date: string | Date, format: 'short' | 'long' | 'time' = 'short'): string => {
  const d = new Date(date);
  
  switch (format) {
    case 'long':
      return d.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    case 'time':
      return d.toLocaleString('fr-FR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    default:
      return d.toLocaleDateString('fr-FR');
  }
};

// Fonction pour générer des couleurs de graphiques
export const generateChartColors = (count: number): string[] => {
  const baseColors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
    '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
  ];
  
  const colors: string[] = [];
  for (let i = 0; i < count; i++) {
    colors.push(baseColors[i % baseColors.length] as string);
  }
  
  return colors;
};

// Fonction pour calculer des statistiques
export const calculateStats = (data: any[], config: {
  total?: boolean;
  byStatus?: boolean;
  byCategory?: boolean;
  statusField?: string;
  categoryField?: string;
}) => {
  const stats: any = {};

  if (config.total) {
    stats.total = data.length;
  }

  if (config.byStatus && config.statusField) {
    stats.byStatus = data.reduce((acc, item) => {
      const status = item[config.statusField as string];
      if (status !== undefined) {
        acc[status] = (acc[status] || 0) + 1;
      }
      return acc;
    }, {});
  }

  if (config.byCategory && config.categoryField) {
    stats.byCategory = data.reduce((acc, item) => {
      const category = item[config.categoryField as string];
      if (category !== undefined) {
        acc[category] = (acc[category] || 0) + 1;
      }
      return acc;
    }, {});
  }

  return stats;
};
