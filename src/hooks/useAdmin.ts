// Hooks personnalisés pour l'administration
import { useState, useEffect, useCallback } from 'react';
import { filterData } from '@/utils/adminUtils';

// Hook pour la gestion de l'état de chargement
export const useLoading = (initialState = false) => {
  const [loading, setLoading] = useState(initialState);

  const startLoading = useCallback(() => setLoading(true), []);
  const stopLoading = useCallback(() => setLoading(false), []);

  return { loading, startLoading, stopLoading, setLoading };
};

// Hook pour la gestion des données avec filtrage
export const useFilteredData = <T extends Record<string, any>>(
  initialData: T[],
  searchFields: (keyof T)[]
) => {
  const [data, setData] = useState<T[]>(initialData);
  const [filteredData, setFilteredData] = useState<T[]>(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});

  // Mise à jour des données filtrées
  useEffect(() => {
    const filtered = filterData(data, searchTerm, filters, searchFields);
    setFilteredData(filtered);
  }, [data, searchTerm, filters, searchFields]);

  // Fonction pour mettre à jour un filtre
  const updateFilter = useCallback((key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  // Fonction pour effacer tous les filtres
  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setFilters({});
  }, []);

  // Fonction pour mettre à jour les données
  const updateData = useCallback((newData: T[]) => {
    setData(newData);
  }, []);

  return {
    data,
    filteredData,
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    clearFilters,
    updateData
  };
};

// Hook pour la gestion des modales
export const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const toggleModal = useCallback(() => setIsOpen(prev => !prev), []);

  return { isOpen, openModal, closeModal, toggleModal, setIsOpen };
};

// Hook pour la gestion des éléments sélectionnés
export const useSelection = <T>() => {
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const selectItem = useCallback((item: T) => {
    setSelectedItem(item);
  }, []);

  const selectMultiple = useCallback((items: T[]) => {
    setSelectedItems(items);
  }, []);

  const addToSelection = useCallback((item: T) => {
    setSelectedItems(prev => [...prev, item]);
  }, []);

  const removeFromSelection = useCallback((item: T) => {
    setSelectedItems(prev => prev.filter(i => i !== item));
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedItems([]);
    setSelectedItem(null);
  }, []);

  const isSelected = useCallback((item: T) => {
    return selectedItems.includes(item);
  }, [selectedItems]);

  return {
    selectedItems,
    selectedItem,
    selectItem,
    selectMultiple,
    addToSelection,
    removeFromSelection,
    clearSelection,
    isSelected
  };
};

// Hook pour la gestion des notifications (toast)
export const useNotification = () => {
  const showSuccess = useCallback((message: string) => {
    // Implémenter avec votre système de notification
    console.log('Success:', message);
  }, []);

  const showError = useCallback((message: string) => {
    // Implémenter avec votre système de notification
    console.error('Error:', message);
  }, []);

  const showWarning = useCallback((message: string) => {
    // Implémenter avec votre système de notification
    console.warn('Warning:', message);
  }, []);

  const showInfo = useCallback((message: string) => {
    // Implémenter avec votre système de notification
    console.info('Info:', message);
  }, []);

  return { showSuccess, showError, showWarning, showInfo };
};

// Hook pour la gestion des formulaires
export const useForm = <T extends Record<string, any>>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const setValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    // Effacer l'erreur quand l'utilisateur modifie le champ
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const setError = useCallback((field: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [field]: error }));
  }, []);

  const setFieldTouched = useCallback((field: keyof T, isTouched = true) => {
    setTouched(prev => ({ ...prev, [field]: isTouched }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    touched,
    setValue,
    setError,
    setTouched: setFieldTouched,
    reset,
    isValid
  };
};

// Hook pour la pagination
export const usePagination = <T>(data: T[], itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  const reset = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    currentPage,
    totalPages,
    currentData,
    goToPage,
    nextPage,
    prevPage,
    reset,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1
  };
};
