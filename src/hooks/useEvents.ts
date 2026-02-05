import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { eventsService } from '@/services/eventsService';
import { Event, CreateEventData, UpdateEventData } from '@/types/events';

// Hook pour récupérer tous les événements (publics)
export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: eventsService.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook pour récupérer tous les événements (admin)
export const useAdminEvents = () => {
  return useQuery({
    queryKey: ['admin-events'],
    queryFn: eventsService.getAllAdmin,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

// Hook pour récupérer un événement par ID
export const useEvent = (id: number) => {
  return useQuery({
    queryKey: ['event', id],
    queryFn: () => eventsService.getById(id),
    enabled: !!id,
  });
};

// Hook pour créer un événement
export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEventData) => eventsService.create(data),
    onSuccess: () => {
      // Invalider les caches pour recharger les données
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['admin-events'] });
    },
  });
};

// Hook pour mettre à jour un événement
export const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateEventData }) => 
      eventsService.update(id, data),
    onSuccess: (data, variables) => {
      // Invalider les caches pour recharger les données
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['admin-events'] });
      queryClient.invalidateQueries({ queryKey: ['event', variables.id] });
    },
    onError: (error: any) => {
      console.error('Erreur mutation update:', error);
    }
  });
};

// Hook pour supprimer un événement
export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => eventsService.delete(id),
    onSuccess: () => {
      // Invalider les caches pour recharger les données
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['admin-events'] });
    },
  });
};

// Hook pour filtrer les événements futurs
export const useUpcomingEvents = () => {
  const { data: events = [], ...rest } = useEvents();
  
  const upcomingEvents = events.filter(event => {
    // Extraire la date au format YYYY-MM-DD de event_date
    const dateStr = event.event_date.split('T')[0]; // "2025-08-25"
    const eventDateTime = new Date(`${dateStr} ${event.event_time}`);
    const now = new Date();
    
    return eventDateTime > now;
  });

  return {
    data: upcomingEvents,
    ...rest
  };
};

// Hook pour filtrer les événements passés
export const usePastEvents = () => {
  const { data: events = [], ...rest } = useEvents();
  
  const pastEvents = events.filter(event => {
    // Extraire la date au format YYYY-MM-DD de event_date
    const dateStr = event.event_date.split('T')[0]; // "2025-08-25"
    const eventDateTime = new Date(`${dateStr} ${event.event_time}`);
    const now = new Date();
    
    return eventDateTime <= now;
  });

  return {
    data: pastEvents,
    ...rest
  };
};
