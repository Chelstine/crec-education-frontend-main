// Custom hooks for API calls with React Query
// Provides loading states, error handling, and caching

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import {
  ProjectService,
  MachineService,
  ContactService,
  FormationService,
  EventService,
  TestimonialService,
  ReservationService,
  DonationService,
  AuthService,
  handleApiError,
  FablabSubscriptionService,
  FablabMachineService,
  FablabReservationService,
  UserService,
  LibraryService
} from '@/services/apiServices';
import {
  Project,
  ContactForm,
  InscriptionForm,
  ReservationForm,
  DonationForm,
  Event,
  Article,
  Testimonial
} from '@/types';

// ===== PROJECTS HOOKS =====
export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: ProjectService.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProjectsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['projects', 'category', category],
    queryFn: () => ProjectService.getByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: () => ProjectService.getById(id),
    enabled: !!id,
  });
};

// ===== MACHINES HOOKS =====
export const useMachines = () => {
  return useQuery({
    queryKey: ['machines'],
    queryFn: MachineService.getAll,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useAvailableMachines = () => {
  return useQuery({
    queryKey: ['machines', 'available'],
    queryFn: MachineService.getAvailable,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// ===== CONTACT HOOKS =====
export const useContactSubmission = () => {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: (data: ContactForm) => ContactService.sendMessage(data),
    onSuccess: () => {
      toast({
        title: "Message envoyé",
        description: "Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: handleApiError(error),
        variant: "destructive",
      });
    },
  });
};

// ===== FORMATIONS HOOKS =====
export const useFormations = () => {
  return useQuery({
    queryKey: ['formations'],
    queryFn: FormationService.getAll,
    staleTime: 10 * 60 * 1000,
  });
};

export const useOpenFormations = () => {
  return useQuery({
    queryKey: ['formations', 'open'],
    queryFn: FormationService.getOpenFormations,
    staleTime: 10 * 60 * 1000,
  });
};

export const useUniversityPrograms = () => {
  return useQuery({
    queryKey: ['formations', 'university'],
    queryFn: FormationService.getUniversity,
    staleTime: 10 * 60 * 1000,
  });
};

export const useFormationInscription = (onSuccessCallback?: () => void) => {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: (data: InscriptionForm) => FormationService.submitInscription(data),
    onSuccess: () => {
      toast({
        title: "Inscription envoyée",
        description: "Votre inscription a été soumise avec succès. Nous traiterons votre demande dans les plus brefs délais.",
      });
      // Appeler le callback de succès si fourni (pour redirection)
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error: any) => {
      toast({
        title: "Erreur d'inscription",
        description: handleApiError(error),
        variant: "destructive",
      });
    },
  });
};

export const useUniversityApplication = () => {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: (data: any) => FormationService.submitUniversityApplication(data),
    onSuccess: () => {
      toast({
        title: "Candidature envoyée",
        description: "Votre candidature universitaire a été soumise avec succès.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erreur de candidature",
        description: handleApiError(error),
        variant: "destructive",
      });
    },
  });
};

// ===== EVENTS HOOKS =====
export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: EventService.getAll,
    staleTime: 15 * 60 * 1000,
  });
};

export const useUpcomingEvents = () => {
  return useQuery({
    queryKey: ['events', 'upcoming'],
    queryFn: EventService.getUpcoming,
    staleTime: 5 * 60 * 1000,
  });
};

export const useEvent = (id: string) => {
  return useQuery({
    queryKey: ['events', id],
    queryFn: () => EventService.getById(id),
    enabled: !!id,
  });
};

// ===== TESTIMONIALS HOOKS =====
export const useTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: TestimonialService.getApproved,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useTestimonialSubmission = () => {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: (data: any) => TestimonialService.submit(data),
    onSuccess: () => {
      toast({
        title: "Témoignage envoyé",
        description: "Votre témoignage a été envoyé et sera examiné par notre équipe.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: handleApiError(error),
        variant: "destructive",
      });
    },
  });
};

// ===== RESERVATIONS HOOKS =====
export const useReservationSubmission = () => {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: (data: ReservationForm) => ReservationService.create(data),
    onSuccess: () => {
      toast({
        title: "Réservation créée",
        description: "Votre réservation a été créée avec succès. Nous traiterons votre demande.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erreur de réservation",
        description: handleApiError(error),
        variant: "destructive",
      });
    },
  });
};

// ===== DONATIONS HOOKS =====
export const useDonationSubmission = () => {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: (data: DonationForm) => DonationService.create(data),
    onSuccess: () => {
      toast({
        title: "Don enregistré",
        description: "Votre don a été enregistré avec succès. Merci pour votre soutien!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erreur de don",
        description: handleApiError(error),
        variant: "destructive",
      });
    },
  });
};

export const useDonationStats = () => {
  return useQuery({
    queryKey: ['donations', 'stats'],
    queryFn: DonationService.getStats,
    staleTime: 30 * 60 * 1000,
  });
};

// ===== FABLAB SUBSCRIPTION HOOKS =====
export const useFablabSubscriptions = () => {
  return useQuery({
    queryKey: ['fablab-subscriptions'],
    queryFn: () => FablabSubscriptionService.getAllSubscriptions?.() || Promise.resolve({ success: true, data: [] }),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useCreateFablabSubscription = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: FablabSubscriptionService.createSubscription,
    onSuccess: (data) => {
      toast({
        title: "Abonnement créé !",
        description: `Votre clé d'abonnement : ${data.data.subscriptionKey}`,
      });
      queryClient.invalidateQueries({ queryKey: ['fablab-subscriptions'] });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: handleApiError(error),
        variant: "destructive",
      });
    },
  });
};

export const useVerifySubscription = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ name, subscriptionKey }: { name: string; subscriptionKey: string }) => 
      FablabSubscriptionService.verifySubscription(name, subscriptionKey),
    onError: (error) => {
      toast({
        title: "Erreur de vérification",
        description: handleApiError(error),
        variant: "destructive",
      });
    },
  });
};

export const useFablabSubscriptionVerification = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ name, subscriptionKey }: { name: string; subscriptionKey: string }) => 
      FablabSubscriptionService.verifySubscription(name, subscriptionKey),
    onError: (error) => {
      toast({
        title: "Erreur de vérification",
        description: handleApiError(error),
        variant: "destructive",
      });
    },
  });
};

export const useSubscriptionUsage = (subscriptionId: string) => {
  return useQuery({
    queryKey: ['subscription-usage', subscriptionId],
    queryFn: () => FablabSubscriptionService.getUsageReport(subscriptionId),
    enabled: !!subscriptionId,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

// ===== FABLAB RESERVATIONS HOOKS =====
export const useFablabMachines = () => {
  return useQuery({
    queryKey: ['fablab-machines'],
    queryFn: FablabMachineService.getAllMachines,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useMachineHourlyRates = () => {
  return useQuery({
    queryKey: ['machine-hourly-rates'],
    queryFn: FablabMachineService.getHourlyRates,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useCreateFablabReservation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: FablabReservationService.createReservation,
    onSuccess: () => {
      toast({
        title: "Réservation créée !",
        description: "Votre créneau a été réservé avec succès.",
      });
      queryClient.invalidateQueries({ queryKey: ['fablab-reservations'] });
      queryClient.invalidateQueries({ queryKey: ['subscription-usage'] });
    },
    onError: (error) => {
      toast({
        title: "Erreur de réservation",
        description: handleApiError(error),
        variant: "destructive",
      });
    },
  });
};

export const useUserReservations = (subscriptionId: string) => {
  return useQuery({
    queryKey: ['fablab-reservations', subscriptionId],
    queryFn: () => FablabReservationService.getUserReservations(subscriptionId),
    enabled: !!subscriptionId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useAvailableSlots = (machineId: string, date: string) => {
  return useQuery({
    queryKey: ['available-slots', machineId, date],
    queryFn: () => FablabReservationService.getAvailableSlots(machineId, date),
    enabled: !!machineId && !!date,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

export const useCancelReservation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: FablabReservationService.cancelReservation,
    onSuccess: () => {
      toast({
        title: "Réservation annulée",
        description: "Votre réservation a été annulée avec succès.",
      });
      queryClient.invalidateQueries({ queryKey: ['fablab-reservations'] });
      queryClient.invalidateQueries({ queryKey: ['subscription-usage'] });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: handleApiError(error),
        variant: "destructive",
      });
    },
  });
};

// ===== USER PROFILE HOOKS =====
export const useUserProfile = () => {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: UserService.getProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: UserService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
      toast({
        title: "Profil mis à jour",
        description: "Vos informations personnelles ont été mises à jour avec succès.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: handleApiError(error),
        variant: "destructive",
      });
    }
  });
};

export const useChangePassword = () => {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: UserService.changePassword,
    onSuccess: () => {
      toast({
        title: "Mot de passe modifié",
        description: "Votre mot de passe a été changé avec succès.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: handleApiError(error),
        variant: "destructive",
      });
    }
  });
};

export const useUserCourses = () => {
  return useQuery({
    queryKey: ['user', 'courses'],
    queryFn: UserService.getUserCourses,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUserCertificates = () => {
  return useQuery({
    queryKey: ['user', 'certificates'],
    queryFn: UserService.getUserCertificates,
    staleTime: 5 * 60 * 1000,
  });
};

// ===== LIBRARY HOOKS =====
export const useLibraryResources = () => {
  return useQuery({
    queryKey: ['library', 'resources'],
    queryFn: LibraryService.getAllResources,
    staleTime: 5 * 60 * 1000,
  });
};

export const useLibrarySearch = (query: string) => {
  return useQuery({
    queryKey: ['library', 'search', query],
    queryFn: () => LibraryService.searchResources(query),
    enabled: !!query && query.length > 2,
    staleTime: 2 * 60 * 1000,
  });
};

export const useLibraryByCategory = (category: string) => {
  return useQuery({
    queryKey: ['library', 'category', category],
    queryFn: () => LibraryService.getByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
};

// ===== LOADING AND ERROR HELPERS =====
export const useApiStatus = () => {
  const isOnline = navigator.onLine;
  
  return {
    isOnline,
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    isConfigured: !!import.meta.env.VITE_API_BASE_URL,
  };
};

/**
 * Hook API général pour conserver la compatibilité avec le code existant
 * Fournit des méthodes de base pour les requêtes HTTP
 */
export const useApi = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const get = async (url: string, params?: Record<string, any>) => {
    try {
      // Construction de l'URL avec paramètres si nécessaire
      const queryParams = params 
        ? '?' + new URLSearchParams(params as Record<string, string>).toString() 
        : '';
      
      const response = await fetch(`${url}${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      toast({
        title: "Erreur",
        description: handleApiError(error as Error),
        variant: "destructive",
      });
      throw error;
    }
  };

  const post = async (url: string, data: any) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      toast({
        title: "Erreur",
        description: handleApiError(error as Error),
        variant: "destructive",
      });
      throw error;
    }
  };

  const put = async (url: string, data: any) => {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      toast({
        title: "Erreur",
        description: handleApiError(error as Error),
        variant: "destructive",
      });
      throw error;
    }
  };

  const del = async (url: string) => {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      toast({
        title: "Erreur",
        description: handleApiError(error as Error),
        variant: "destructive",
      });
      throw error;
    }
  };

  const invalidateQueries = (queryKey: string | string[]) => {
    queryClient.invalidateQueries({ queryKey: Array.isArray(queryKey) ? queryKey : [queryKey] });
  };

  return {
    get,
    post,
    put,
    delete: del, // 'delete' est un mot réservé en JS
    invalidateQueries,
  };
};
