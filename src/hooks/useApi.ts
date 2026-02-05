import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { ContactForm, ContactSubmissionResponse } from '@/types';

// Types pour les inscriptions seulement
interface FablabSubscription {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface Formation {
  id: string;
  name: string;
  slug: string;
  active: boolean;
}

interface University {
  id: string;
  name: string;
}

// =====================
// HOOKS POUR INSCRIPTIONS SEULEMENT
// =====================

// Options pour les formulaires d'inscription
export const useFablabSubscriptions = () => {
  return useQuery({
    queryKey: ['fablab-subscriptions'],
    queryFn: async () => {
      const response = await api.get('/inscription-options/fablab-subscriptions');
      return response.data.data;
    },
  });
};

export const useFormations = () => {
  return useQuery({
    queryKey: ['formations'],
    queryFn: async () => {
      const response = await api.get('/inscription-options/formations');
      return response.data.data;
    },
  });
};

export const useUniversities = () => {
  return useQuery({
    queryKey: ['universities'],
    queryFn: async () => {
      const response = await api.get('/inscription-options/universities');
      return response.data.data;
    },
  });
};

// Hook pour récupérer les partenaires (pour affichage public)
export const usePartners = () => {
  return useQuery({
    queryKey: ['partners'],
    queryFn: async () => {
      const response = await api.get('/content/partners');
      return response.data.data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Mutations pour soumettre les inscriptions
export const useFablabInscriptionMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post('/inscriptions/fablab', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      // Invalider les données si nécessaire
      queryClient.invalidateQueries({ queryKey: ['fablab-inscriptions'] });
    },
  });
};

export const useFormationInscriptionMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post('/inscriptions/formations', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['formation-inscriptions'] });
    },
  });
};

export const useUniversityInscriptionMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post('/inscriptions/university', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['university-inscriptions'] });
    },
  });
};

// =====================
// HOOKS FABLAB PUBLICS
// =====================

export const useFablabMachines = () => {
  return useQuery({
    queryKey: ['fablab-machines'],
    queryFn: async () => {
      const response = await api.get('/fablab/machines');
      return response.data.data;
    },
  });
};

export const useFablabProjects = () => {
  return useQuery({
    queryKey: ['fablab-projects'],
    queryFn: async () => {
      const response = await api.get('/fablab/projects');
      return response.data.data;
    },
  });
};

export const useFablabPublishedProjects = () => {
  return useQuery({
    queryKey: ['fablab-projects-published'],
    queryFn: async () => {
      const response = await api.get('/fablab/projects/published');
      return response.data.data;
    },
  });
};

export const useFablabActiveSubscriptions = () => {
  return useQuery({
    queryKey: ['fablab-subscriptions-active'],
    queryFn: async () => {
      const response = await api.get('/fablab/subscriptions/active');
      return response.data.data;
    },
  });
};

export const useFablabActiveTrainings = () => {
  return useQuery({
    queryKey: ['fablab-trainings-active'],
    queryFn: async () => {
      const response = await api.get('/fablab/trainings/active');
      return response.data.data;
    },
  });
};

export const useFablabActiveServices = () => {
  return useQuery({
    queryKey: ['fablab-services-active'],
    queryFn: async () => {
      const response = await api.get('/fablab/services/active');
      return response.data.data;
    },
  });
};

// =====================
// HOOK CONTACT
// =====================

export const useContactSubmission = () => {
  return useMutation({
    mutationFn: async (data: ContactForm): Promise<ContactSubmissionResponse> => {
      const response = await api.post('/contact', data);
      return response.data;
    },
  });
};
