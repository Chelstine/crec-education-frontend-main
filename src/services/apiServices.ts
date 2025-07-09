import { 
  PublicFormationService,
  PublicEventService,
  PublicUniversityService,
  PublicFablabService,
  PublicGalleryService,
  PublicLibraryService,
  AdminUserService,
  AdminFormationService,
  AdminEventService,
  AdminUniversityService,
  AdminFablabService,
  AdminGalleryService,
  AdminLibraryService,
  ContactService as ModernContactService,
  FormationService as ModernFormationService,
  EventService as ModernEventService,
  MachineService as ModernMachineService,
  GalleryService,
  LibraryService
} from './modernApiServices';

// Utilitaires pour la gestion des erreurs API
export const handleApiError = (error: any) => {
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  return 'Une erreur est survenue';
};

// Services API pour les différentes entités
// Chaque service contient les méthodes CRUD et autres opérations spécifiques

// Service pour les projets (maintenant connecté à la galerie backend)
export const ProjectService = {
  getAll: async () => {
    try {
      const projects = await GalleryService.getAll();
      return {
        data: projects.filter(item => item.category === 'project')
      };
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Fallback avec des données simulées
      return {
        data: [
          { id: '1', title: 'Projet 1', description: 'Description projet 1', imageUrl: '/img/projects/project1.jpg' },
          { id: '2', title: 'Projet 2', description: 'Description projet 2', imageUrl: '/img/projects/project2.jpg' }
        ]
      };
    }
  },
  getById: async (id: string) => {
    try {
      const project = await GalleryService.getById(id);
      return { data: project };
    } catch (error) {
      console.error('Error fetching project:', error);
      return { data: { id, title: `Projet ${id}`, description: `Description détaillée du projet ${id}`, imageUrl: '/img/projects/project1.jpg' } };
    }
  },
  getByCategory: async (category: string) => {
    try {
      const projects = await GalleryService.getAll();
      return {
        data: projects.filter(item => item.category === category)
      };
    } catch (error) {
      console.error('Error fetching projects by category:', error);
      return { data: [
        { id: '1', title: `Projet ${category} 1`, description: 'Description', imageUrl: '/img/projects/project1.jpg' },
        { id: '2', title: `Projet ${category} 2`, description: 'Description', imageUrl: '/img/projects/project2.jpg' }
      ] };
    }
  },
};

// Service pour les machines FabLab (maintenant connecté au backend)
export const MachineService = {
  getAll: async () => {
    try {
      const machines = await ModernMachineService.getAll();
      return { data: machines };
    } catch (error) {
      console.error('Error fetching machines:', error);
      // Fallback avec des données simulées
      return {
        data: [
          { id: '1', name: 'Imprimante 3D', status: 'disponible', imageUrl: '/img/machines/3d-printer.jpg' },
          { id: '2', name: 'Découpeuse Laser', status: 'maintenance', imageUrl: '/img/machines/laser-cutter.jpg' }
        ]
      };
    }
  },
  getById: async (id: string) => {
    try {
      const machine = await ModernMachineService.getById(id);
      return { data: machine };
    } catch (error) {
      console.error('Error fetching machine:', error);
      return { data: { id, name: `Machine ${id}`, status: 'disponible', imageUrl: '/img/machines/3d-printer.jpg' } };
    }
  },
  getAvailable: async () => {
    try {
      const machines = await ModernMachineService.getAvailable();
      return { data: machines };
    } catch (error) {
      console.error('Error fetching available machines:', error);
      return { data: [
        { id: '1', name: 'Imprimante 3D', status: 'disponible', imageUrl: '/img/machines/3d-printer.jpg' }
      ] };
    }
  },
};

// Service pour les formulaires de contact
export const ContactService = {
  submit: async (formData: any) => {
    try {
      const result = await ModernContactService.sendMessage(formData);
      return { data: { success: true, message: result.message } };
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },
  sendMessage: async (formData: any) => {
    return ContactService.submit(formData);
  },
};

// Service pour les formations
export const FormationService = {
  getAll: async () => {
    try {
      const formations = await ModernFormationService.getAll();
      return { data: formations };
    } catch (error) {
      console.error('Error fetching formations:', error);
      throw error;
    }
  },
  
  getOpenFormations: async () => {
    try {
      const formations = await ModernFormationService.getAll();
      return { data: formations.filter(f => f.status === 'open') };
    } catch (error) {
      console.error('Error fetching open formations:', error);
      throw error;
    }
  },
  
  getById: async (id: string) => {
    try {
      const formation = await ModernFormationService.getById(id);
      return { data: formation };
    } catch (error) {
      console.error('Error fetching formation:', error);
      throw error;
    }
  },
  
  create: async (data: any) => {
    try {
      const formation = await ModernFormationService.create(data);
      return { data: formation };
    } catch (error) {
      console.error('Error creating formation:', error);
      throw error;
    }
  },
  
  update: async (id: string, data: any) => {
    try {
      const formation = await ModernFormationService.update(id, data);
      return { data: formation };
    } catch (error) {
      console.error('Error updating formation:', error);
      throw error;
    }
  },
  
  delete: async (id: string) => {
    try {
      await ModernFormationService.delete(id);
      return { success: true };
    } catch (error) {
      console.error('Error deleting formation:', error);
      throw error;
    }
  },
  
  getUniversity: async () => {
    try {
      const programs = await ModernFormationService.getUniversity();
      return { data: programs };
    } catch (error) {
      console.error('Error fetching university programs:', error);
      throw error;
    }
  },
  
  submitInscription: async (data: any) => {
    try {
      const result = await ModernFormationService.submitInscription(data);
      return { data: result };
    } catch (error) {
      console.error('Error submitting inscription:', error);
      throw error;
    }
  },
  
  submitUniversityApplication: async (data: any) => {
    try {
      const result = await ModernFormationService.submitUniversityApplication(data);
      return { data: result };
    } catch (error) {
      console.error('Error submitting university application:', error);
      throw error;
    }
  },
};

// Service pour les événements
export const EventService = {
  getAll: async () => {
    try {
      const events = await ModernEventService.getAll();
      return { data: events };
    } catch (error) {
      console.error('Error fetching events:', error);
      return {
        data: [
          { id: '1', title: 'Conférence Tech', date: '2025-10-15', location: 'Amphi A', status: 'à venir' },
          { id: '2', title: 'Hackathon', date: '2025-11-20', location: 'Campus principal', status: 'à venir' }
        ]
      };
    }
  },
  getById: async (id: string) => {
    try {
      const event = await ModernEventService.getById(id);
      return { data: event };
    } catch (error) {
      console.error('Error fetching event:', error);
      return { data: { id, title: `Événement ${id}`, date: '2025-10-15', location: 'Amphi A', status: 'à venir' } };
    }
  },
  create: async (data: any) => {
    try {
      const event = await ModernEventService.create(data);
      return { data: event };
    } catch (error) {
      console.error('Error creating event:', error);
      return { data: { ...data, id: Date.now().toString() } };
    }
  },
  update: async (id: string, data: any) => {
    try {
      const event = await ModernEventService.update(id, data);
      return { data: event };
    } catch (error) {
      console.error('Error updating event:', error);
      return { data: { ...data, id } };
    }
  },
  delete: async (id: string) => {
    try {
      await ModernEventService.delete(id);
      return { data: { success: true } };
    } catch (error) {
      console.error('Error deleting event:', error);
      return { data: { success: true } };
    }
  },
  getUpcoming: async () => {
    try {
      const events = await ModernEventService.getUpcoming();
      return { data: events };
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      return { data: [
        { id: '1', title: 'Conférence Tech', date: '2025-10-15', location: 'Amphi A', status: 'à venir' }
      ] };
    }
  },
};



// Service pour les témoignages
export const TestimonialService = {
  getAll: async () => {
    return {
      data: [
        { id: '1', name: 'Jean Dupont', role: 'Étudiant', content: 'Excellente formation', imageUrl: '/img/testimonials/person1.jpg' },
        { id: '2', name: 'Marie Leclerc', role: 'Professionnelle', content: 'Formation très pratique', imageUrl: '/img/testimonials/person2.jpg' }
      ]
    };
  },
  getApproved: async () => {
    return { data: [
      { id: '1', name: 'Jean Dupont', role: 'Étudiant', content: 'Excellente formation', imageUrl: '/img/testimonials/person1.jpg' }
    ] };
  },
  submit: async (data: any) => {
    return { data: { ...data, id: Date.now().toString(), status: 'pending' } };
  },
};

// Service pour les réservations
export const ReservationService = {
  create: async (data: any) => {
    return { data: { ...data, id: Date.now().toString(), status: 'en attente' } };
  },
  getByUserId: async (userId: string) => {
    return {
      data: [
        { id: '1', userId, resourceId: '1', date: '2025-10-10', status: 'confirmée' },
        { id: '2', userId, resourceId: '2', date: '2025-11-05', status: 'en attente' }
      ]
    };
  },
};

// Service pour les dons
export const DonationService = {
  create: async (data: any) => {
    return { data: { ...data, id: Date.now().toString(), status: 'reçu' } };
  },
  getStats: async () => {
    return { data: { total: 10000, donors: 50 } };
  },
};

// Service d'authentification
export const AuthService = {
  login: async (credentials: { email: string; password: string }) => {
    // Simulation d'authentification - à remplacer par API réelle
    if (credentials.email === 'admin@crec.edu' && credentials.password === 'admin123') {
      const token = 'fake-jwt-token';
      localStorage.setItem('auth_token', token);
      return {
        data: {
          user: { id: '1', email: credentials.email, role: 'admin', name: 'Admin CREC' },
          token
        }
      };
    } else if (credentials.email === 'user@crec.edu' && credentials.password === 'user123') {
      const token = 'fake-user-jwt-token';
      localStorage.setItem('auth_token', token);
      return {
        data: {
          user: { id: '2', email: credentials.email, role: 'user', name: 'Utilisateur CREC' },
          token
        }
      };
    }
    throw new Error('Identifiants invalides');
  },
  logout: async () => {
    localStorage.removeItem('auth_token');
    return { data: { success: true } };
  },
  getCurrentUser: async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('Non authentifié');
    
    // Simulation - à remplacer par vérification de token réelle
    if (token === 'fake-jwt-token') {
      return {
        data: { id: '1', email: 'admin@crec.edu', role: 'admin', name: 'Admin CREC' }
      };
    } else {
      return {
        data: { id: '2', email: 'user@crec.edu', role: 'user', name: 'Utilisateur CREC' }
      };
    }
  }
};

// Services spécifiques au FabLab
export const FablabSubscriptionService = {
  getAll: async () => {
    try {
      const subscriptions = await AdminFablabService.getSubscriptions();
      return { data: subscriptions };
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      throw error;
    }
  },
  subscribe: async (data: any) => {
    try {
      // TODO: Implémenter l'endpoint de souscription
      const response = await fetch('/api/fablab/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    } catch (error) {
      console.error('Error subscribing:', error);
      throw error;
    }
  },
  getAllSubscriptions: async () => {
    try {
      const subscriptions = await AdminFablabService.getSubscriptions();
      return { data: subscriptions };
    } catch (error) {
      console.error('Error fetching all subscriptions:', error);
      throw error;
    }
  },
  createSubscription: async (data: any) => {
    try {
      // TODO: Implémenter l'endpoint de création d'abonnement
      const response = await fetch('/api/fablab/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw error;
    }
  },
  verifySubscription: async (name: string, subscriptionKey: string) => {
    try {
      const result = await PublicFablabService.verifySubscription(name, subscriptionKey);
      return result;
    } catch (error) {
      console.error('Error verifying subscription:', error);
      throw error;
    }
  },
  getUsageReport: async (subscriptionId: string) => {
    try {
      // TODO: Implémenter l'endpoint de rapport d'usage
      const response = await fetch(`/api/fablab/subscriptions/${subscriptionId}/usage`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      return response.json();
    } catch (error) {
      console.error('Error fetching usage report:', error);
      throw error;
    }
  },
  canMakeReservation: async (subscriptionId: string, requestedHours: number) => {
    try {
      // TODO: Implémenter l'endpoint de vérification de réservation
      const response = await fetch(`/api/fablab/subscriptions/${subscriptionId}/can-reserve`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify({ requestedHours })
      });
      return response.json();
    } catch (error) {
      console.error('Error checking reservation availability:', error);
      throw error;
    }
  }
};

export const FablabMachineService = {
  getAllMachines: async () => {
    try {
      const machines = await ModernMachineService.getAll();
      return { data: machines };
    } catch (error) {
      console.error('Error fetching machines:', error);
      throw error;
    }
  },
  getHourlyRates: async () => {
    try {
      const machines = await ModernMachineService.getAll();
      return { data: machines.map(m => ({ id: m.id, name: m.name, hourlyRate: m.hourlyRate })) };
    } catch (error) {
      console.error('Error fetching hourly rates:', error);
      throw error;
    }
  },
};

export const FablabReservationService = {
  createReservation: async (data: any) => {
    try {
      const reservation = await PublicFablabService.createReservation(data);
      return { data: reservation };
    } catch (error) {
      console.error('Error creating reservation:', error);
      throw error;
    }
  },
  getUserReservations: async (subscriptionId: string) => {
    try {
      // TODO: Implémenter l'endpoint de récupération des réservations utilisateur
      const response = await fetch(`/api/fablab/subscriptions/${subscriptionId}/reservations`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      return response.json();
    } catch (error) {
      console.error('Error fetching user reservations:', error);
      throw error;
    }
  },
  getAvailableSlots: async (machineId: string, date: string) => {
    try {
      // TODO: Implémenter l'endpoint de récupération des créneaux disponibles
      const response = await fetch(`/api/fablab/machines/${machineId}/available-slots?date=${date}`);
      return response.json();
    } catch (error) {
      console.error('Error fetching available slots:', error);
      throw error;
    }
  },
  cancelReservation: async (reservationId: string) => {
    try {
      // TODO: Implémenter l'endpoint d'annulation de réservation
      const response = await fetch(`/api/fablab/reservations/${reservationId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      return response.json();
    } catch (error) {
      console.error('Error canceling reservation:', error);
      throw error;
    }
  }
};

// Service spécifique pour les formations ouvertes
export const OpenFormationService = {
  getAll: async () => {
    try {
      const formations = await ModernFormationService.getAll();
      return { data: formations };
    } catch (error) {
      console.error('Error fetching open formations:', error);
      throw error;
    }
  },
  
  getById: async (id: string) => {
    try {
      const formation = await ModernFormationService.getById(id);
      return { data: formation };
    } catch (error) {
      console.error('Error fetching open formation:', error);
      throw error;
    }
  },
  
  create: async (data: any) => {
    try {
      const formation = await ModernFormationService.create(data);
      return { data: formation };
    } catch (error) {
      console.error('Error creating open formation:', error);
      throw error;
    }
  },
  
  update: async (id: string, data: any) => {
    try {
      const formation = await ModernFormationService.update(id, data);
      return { data: formation };
    } catch (error) {
      console.error('Error updating open formation:', error);
      throw error;
    }
  },
  
  delete: async (id: string) => {
    try {
      await ModernFormationService.delete(id);
      return { success: true };
    } catch (error) {
      console.error('Error deleting open formation:', error);
      throw error;
    }
  },
  
  getRegistrations: async () => {
    try {
      // TODO: Implémenter l'endpoint de récupération des inscriptions
      const response = await fetch('/api/formations/registrations');
      return response.json();
    } catch (error) {
      console.error('Error fetching registrations:', error);
      throw error;
    }
  },
  
  submitRegistration: async (data: any) => {
    try {
      const result = await ModernFormationService.submitInscription(data);
      return { data: result };
    } catch (error) {
      console.error('Error submitting registration:', error);
      throw error;
    }
  },
  
  updateRegistration: async (id: string, data: any) => {
    try {
      // TODO: Implémenter l'endpoint de mise à jour d'inscription
      const response = await fetch(`/api/formations/registrations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    } catch (error) {
      console.error('Error updating registration:', error);
      throw error;
    }
  },
  
  deleteRegistration: async (id: string) => {
    try {
      // TODO: Implémenter l'endpoint de suppression d'inscription
      const response = await fetch(`/api/formations/registrations/${id}`, {
        method: 'DELETE'
      });
      return response.json();
    } catch (error) {
      console.error('Error deleting registration:', error);
      throw error;
    }
  },
};

// Service pour les programmes universitaires
export const UniversityProgramService = {
  getAll: async () => {
    try {
      const programs = await PublicUniversityService.getPrograms();
      return { data: programs };
    } catch (error) {
      console.error('Error fetching university programs:', error);
      throw error;
    }
  },
  
  getById: async (id: string) => {
    try {
      const program = await PublicUniversityService.getProgramById(id);
      return { data: program };
    } catch (error) {
      console.error('Error fetching university program:', error);
      throw error;
    }
  },
  
  getByType: async (type: string) => {
    try {
      const programs = await PublicUniversityService.getPrograms();
      return { data: programs.filter(p => p.level === type) };
    } catch (error) {
      console.error('Error fetching university programs by type:', error);
      throw error;
    }
  },
  
  submitApplication: async (data: any) => {
    try {
      const result = await PublicUniversityService.submitApplication(data);
      return { data: result };
    } catch (error) {
      console.error('Error submitting university application:', error);
      throw error;
    }
  },
  
  uploadDocument: async (applicationId: string, documentType: string, file: File) => {
    try {
      // TODO: Implémenter l'endpoint d'upload de document
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch(`/api/university-applications/${applicationId}/documents/${documentType}`, {
        method: 'POST',
        body: formData
      });
      return response.json();
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  },
};

// Service pour les années académiques
export const AcademicYearService = {
  getActive: async () => {
    try {
      // TODO: Implémenter l'endpoint des années académiques actives
      const response = await fetch('/api/academic-years/active');
      return response.json();
    } catch (error) {
      console.error('Error fetching active academic year:', error);
      throw error;
    }
  },
  
  getAll: async () => {
    try {
      // TODO: Implémenter l'endpoint des années académiques
      const response = await fetch('/api/academic-years');
      return response.json();
    } catch (error) {
      console.error('Error fetching academic years:', error);
      throw error;
    }
  },
};

// Export des services utilisateur et bibliothèque depuis userServices.ts
export * from './userServices';
