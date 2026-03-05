// Types spécifiques pour les événements
export interface Event {
  id?: number;
  title: string;
  description: string;
  image?: File | string;
  image_url?: string;
  event_date: string;
  event_time: string;
  location: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateEventData {
  title: string;
  description: string;
  image?: File;
  event_date: string;
  event_time: string;
  location: string;
  is_active: boolean;
}

export interface UpdateEventData extends Partial<CreateEventData> {}

// Types pour les réponses API
export interface EventResponse {
  success: boolean;
  data: Event;
  message?: string;
}

export interface EventsResponse {
  success: boolean;
  data: Event[];
  message?: string;
}

export interface EventErrorResponse {
  success: false;
  errors: Record<string, string[]>;
  message?: string;
}

// Types pour les filtres et états
export interface EventFilters {
  search?: string;
  status?: 'upcoming' | 'past' | 'all';
  is_active?: boolean;
}

export interface EventStats {
  total: number;
  upcoming: number;
  past: number;
  active: number;
  inactive: number;
}

// Enum pour les statuts d'événements
export enum EventStatus {
  UPCOMING = 'upcoming',
  PAST = 'past',
  TODAY = 'today'
}

// Type pour l'état de chargement des événements
export interface EventLoadingState {
  isLoading: boolean;
  error: string | null;
  lastUpdated?: string;
}

// Type pour les actions CRUD
export type EventAction = 'create' | 'update' | 'delete' | 'view';

// Type pour les permissions d'événements
export interface EventPermissions {
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  canView: boolean;
}

// Type pour la pagination (si nécessaire plus tard)
export interface EventPagination {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  data: Event[];
}

// Utilitaire pour vérifier si un événement est à venir
export const isUpcomingEvent = (event: Event): boolean => {
  const eventDateTime = new Date(`${event.event_date} ${event.event_time}`);
  return eventDateTime > new Date();
};

// Utilitaire pour vérifier si un événement est passé
export const isPastEvent = (event: Event): boolean => {
  const eventDateTime = new Date(`${event.event_date} ${event.event_time}`);
  return eventDateTime <= new Date();
};

// Utilitaire pour formater la date d'un événement
export const formatEventDate = (event: Event): string => {
  return new Date(event.event_date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

// Utilitaire pour formater l'heure d'un événement
export const formatEventTime = (event: Event): string => {
  return event.event_time.slice(0, 5); // Format HH:MM
};

// Utilitaire pour obtenir le statut d'un événement
export const getEventStatus = (event: Event): EventStatus => {
  const eventDate = new Date(event.event_date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);

  if (eventDate.getTime() === today.getTime()) {
    return EventStatus.TODAY;
  } else if (eventDate > today) {
    return EventStatus.UPCOMING;
  } else {
    return EventStatus.PAST;
  }
};
