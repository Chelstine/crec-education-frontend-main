import api from './api';
import { 
  BackendUser, BackendEvent, BackendFormation, BackendUniversityProgram,
  BackendFablabMachine, BackendFablabSubscription, BackendGalleryItem, 
  BackendLibraryResource, LoginResponse, SubscriptionVerificationResponse,
  convertBackendUserToFrontend, convertBackendEventToFrontend, 
  convertBackendMachineToFrontend, convertBackendGalleryToFrontend
} from '../types';

// =================== AUTHENTICATION SERVICES ===================

export const AuthService = {
  login: async (email: string, password: string) => {
    const response = await api.post<LoginResponse>('/auth/login', { email, password });
    return {
      token: response.data.access_token,
      user: convertBackendUserToFrontend(response.data.user)
    };
  },

  getCurrentUser: async () => {
    const response = await api.get<BackendUser>('/auth/me');
    return convertBackendUserToFrontend(response.data);
  },

  logout: async () => {
    // Supprimer le token côté client
    localStorage.removeItem('auth_token');
    return { success: true };
  }
};

// =================== PUBLIC SERVICES ===================

export const PublicFormationService = {
  getAll: async () => {
    const response = await api.get<BackendFormation[]>('/public/formations');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<BackendFormation>(`/public/formations/${id}`);
    return response.data;
  }
};

export const PublicEventService = {
  getAll: async () => {
    const response = await api.get<BackendEvent[]>('/public/events');
    return response.data.map(convertBackendEventToFrontend);
  },

  getById: async (id: string) => {
    const response = await api.get<BackendEvent>(`/public/events/${id}`);
    return convertBackendEventToFrontend(response.data);
  },

  getUpcoming: async () => {
    const response = await api.get<BackendEvent[]>('/public/events?upcoming=true');
    return response.data.map(convertBackendEventToFrontend);
  }
};

export const PublicUniversityService = {
  getPrograms: async () => {
    const response = await api.get<BackendUniversityProgram[]>('/public/university/programs');
    return response.data;
  },

  getProgramById: async (id: string) => {
    const response = await api.get<BackendUniversityProgram>(`/public/university/programs/${id}`);
    return response.data;
  },

  submitApplication: async (applicationData: any) => {
    const response = await api.post('/public/university/applications', applicationData);
    return response.data;
  }
};

export const PublicFablabService = {
  getMachines: async () => {
    const response = await api.get<BackendFablabMachine[]>('/public/fablab/machines');
    return response.data.map(convertBackendMachineToFrontend);
  },

  getMachineById: async (id: string) => {
    const response = await api.get<BackendFablabMachine>(`/public/fablab/machines/${id}`);
    return convertBackendMachineToFrontend(response.data);
  },

  verifySubscription: async (name: string, subscriptionKey: string) => {
    const response = await api.post<SubscriptionVerificationResponse>('/fablab/verify', {
      name,
      subscription_key: subscriptionKey
    });
    return response.data;
  },

  createReservation: async (reservationData: any) => {
    const response = await api.post('/fablab/reservations', reservationData);
    return response.data;
  }
};

export const PublicGalleryService = {
  getItems: async () => {
    const response = await api.get<BackendGalleryItem[]>('/public/gallery');
    return response.data.map(convertBackendGalleryToFrontend);
  },

  getItemById: async (id: string) => {
    const response = await api.get<BackendGalleryItem>(`/public/gallery/${id}`);
    return convertBackendGalleryToFrontend(response.data);
  }
};

export const PublicLibraryService = {
  getResources: async () => {
    const response = await api.get<BackendLibraryResource[]>('/public/library');
    return response.data;
  },

  getResourceById: async (id: string) => {
    const response = await api.get<BackendLibraryResource>(`/public/library/${id}`);
    return response.data;
  }
};

// =================== ADMIN SERVICES ===================

export const AdminUserService = {
  getAll: async () => {
    const response = await api.get<BackendUser[]>('/admin/users');
    return response.data.map(convertBackendUserToFrontend);
  },

  create: async (userData: any) => {
    const response = await api.post<BackendUser>('/admin/users', userData);
    return convertBackendUserToFrontend(response.data);
  },

  update: async (id: string, userData: any) => {
    const response = await api.put<BackendUser>(`/admin/users/${id}`, userData);
    return convertBackendUserToFrontend(response.data);
  },

  delete: async (id: string) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  }
};

export const AdminFormationService = {
  getAll: async () => {
    const response = await api.get<BackendFormation[]>('/admin/formations');
    return response.data;
  },

  create: async (formationData: any) => {
    const response = await api.post<BackendFormation>('/admin/formations', formationData);
    return response.data;
  },

  update: async (id: string, formationData: any) => {
    const response = await api.put<BackendFormation>(`/admin/formations/${id}`, formationData);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/admin/formations/${id}`);
    return response.data;
  }
};

export const AdminEventService = {
  getAll: async () => {
    const response = await api.get<BackendEvent[]>('/admin/events');
    return response.data.map(convertBackendEventToFrontend);
  },

  create: async (eventData: any) => {
    const response = await api.post<BackendEvent>('/admin/events', eventData);
    return convertBackendEventToFrontend(response.data);
  },

  update: async (id: string, eventData: any) => {
    const response = await api.put<BackendEvent>(`/admin/events/${id}`, eventData);
    return convertBackendEventToFrontend(response.data);
  },

  delete: async (id: string) => {
    const response = await api.delete(`/admin/events/${id}`);
    return response.data;
  }
};

export const AdminUniversityService = {
  getPrograms: async () => {
    const response = await api.get<BackendUniversityProgram[]>('/admin/university/programs');
    return response.data;
  },

  createProgram: async (programData: any) => {
    const response = await api.post<BackendUniversityProgram>('/admin/university/programs', programData);
    return response.data;
  },

  updateProgram: async (id: string, programData: any) => {
    const response = await api.put<BackendUniversityProgram>(`/admin/university/programs/${id}`, programData);
    return response.data;
  },

  deleteProgram: async (id: string) => {
    const response = await api.delete(`/admin/university/programs/${id}`);
    return response.data;
  }
};

export const AdminFablabService = {
  getMachines: async () => {
    const response = await api.get<BackendFablabMachine[]>('/admin/fablab/machines');
    return response.data.map(convertBackendMachineToFrontend);
  },

  createMachine: async (machineData: any) => {
    const response = await api.post<BackendFablabMachine>('/admin/fablab/machines', machineData);
    return convertBackendMachineToFrontend(response.data);
  },

  deleteMachine: async (id: string) => {
    const response = await api.delete(`/admin/fablab/machines/${id}`);
    return response.data;
  },

  getSubscriptions: async () => {
    const response = await api.get<BackendFablabSubscription[]>('/admin/fablab/subscriptions');
    return response.data;
  },

  updateSubscriptionStatus: async (id: string, status: string) => {
    const response = await api.put(`/admin/fablab/subscriptions/${id}/status?status=${status}`);
    return response.data;
  }
};

export const AdminGalleryService = {
  getItems: async () => {
    const response = await api.get<BackendGalleryItem[]>('/admin/gallery');
    return response.data.map(convertBackendGalleryToFrontend);
  },

  create: async (itemData: any) => {
    const response = await api.post<BackendGalleryItem>('/admin/gallery', itemData);
    return convertBackendGalleryToFrontend(response.data);
  },

  delete: async (id: string) => {
    const response = await api.delete(`/admin/gallery/${id}`);
    return response.data;
  }
};

export const AdminLibraryService = {
  getResources: async () => {
    const response = await api.get<BackendLibraryResource[]>('/admin/library');
    return response.data;
  },

  create: async (resourceData: any) => {
    const response = await api.post<BackendLibraryResource>('/admin/library', resourceData);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/admin/library/${id}`);
    return response.data;
  }
};

// =================== CONTACT SERVICE ===================

export const ContactService = {
  sendMessage: async (formData: { name: string; email: string; subject: string; message: string }) => {
    // TODO: Implémenter l'endpoint contact côté backend
    console.log('Contact form data:', formData);
    return { success: true, message: 'Votre message a été envoyé avec succès' };
  }
};

// =================== LEGACY COMPATIBILITY ===================
// Services pour maintenir la compatibilité avec l'ancien code

export const FormationService = {
  getAll: () => PublicFormationService.getAll(),
  getOpenFormations: () => PublicFormationService.getAll(),
  getById: (id: string) => PublicFormationService.getById(id),
  getUniversity: () => PublicUniversityService.getPrograms(),
  submitInscription: async (data: any) => {
    // TODO: Implémenter l'endpoint d'inscription
    console.log('Formation inscription:', data);
    return { success: true };
  },
  submitUniversityApplication: (data: any) => PublicUniversityService.submitApplication(data),
  
  // Admin methods (need authentication)
  create: (data: any) => AdminFormationService.create(data),
  update: (id: string, data: any) => AdminFormationService.update(id, data),
  delete: (id: string) => AdminFormationService.delete(id)
};

export const EventService = {
  getAll: () => PublicEventService.getAll(),
  getById: (id: string) => PublicEventService.getById(id),
  getUpcoming: () => PublicEventService.getUpcoming(),
  
  // Admin methods (need authentication)
  create: (data: any) => AdminEventService.create(data),
  update: (id: string, data: any) => AdminEventService.update(id, data),
  delete: (id: string) => AdminEventService.delete(id)
};

export const MachineService = {
  getAll: () => PublicFablabService.getMachines(),
  getById: (id: string) => PublicFablabService.getMachineById(id),
  getAvailable: async () => {
    const machines = await PublicFablabService.getMachines();
    return machines.filter(machine => machine.status === 'available');
  }
};

export const GalleryService = {
  getAll: () => PublicGalleryService.getItems(),
  getById: (id: string) => PublicGalleryService.getItemById(id)
};

export const LibraryService = {
  getAll: () => PublicLibraryService.getResources(),
  getById: (id: string) => PublicLibraryService.getResourceById(id)
};

// Utilitaires pour la gestion des erreurs API
export const handleApiError = (error: any) => {
  if (error?.response?.data?.detail) return error.response.data.detail;
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  return 'Une erreur est survenue';
};
