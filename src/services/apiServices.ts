// Utilitaires pour la gestion des erreurs API
export const handleApiError = (error: any) => {
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  return 'Une erreur est survenue';
};

// Services API pour les différentes entités
// Chaque service contient les méthodes CRUD et autres opérations spécifiques

// Service pour les projets (données simulées pour l'instant)
export const ProjectService = {
  getAll: async () => {
    // Simulation de données pour le front-end
    return {
      data: [
        { id: '1', title: 'Projet 1', description: 'Description projet 1', imageUrl: '/img/projects/project1.jpg' },
        { id: '2', title: 'Projet 2', description: 'Description projet 2', imageUrl: '/img/projects/project2.jpg' }
      ]
    };
  },
  getById: async (id: string) => {
    return { data: { id, title: `Projet ${id}`, description: `Description détaillée du projet ${id}`, imageUrl: '/img/projects/project1.jpg' } };
  },
  getByCategory: async (category: string) => {
    return { data: [
      { id: '1', title: `Projet ${category} 1`, description: 'Description', imageUrl: '/img/projects/project1.jpg' },
      { id: '2', title: `Projet ${category} 2`, description: 'Description', imageUrl: '/img/projects/project2.jpg' }
    ] };
  },
};

// Service pour les machines FabLab
export const MachineService = {
  getAll: async () => {
    return {
      data: [
        { id: '1', name: 'Imprimante 3D', status: 'disponible', imageUrl: '/img/machines/3d-printer.jpg' },
        { id: '2', name: 'Découpeuse Laser', status: 'maintenance', imageUrl: '/img/machines/laser-cutter.jpg' }
      ]
    };
  },
  getById: async (id: string) => {
    return { data: { id, name: `Machine ${id}`, status: 'disponible', imageUrl: '/img/machines/3d-printer.jpg' } };
  },
  getAvailable: async () => {
    return { data: [
      { id: '1', name: 'Imprimante 3D', status: 'disponible', imageUrl: '/img/machines/3d-printer.jpg' }
    ] };
  },
};

// Service pour les formulaires de contact
export const ContactService = {
  submit: async (formData: any) => {
    // Simulation - à remplacer par un appel API réel
    console.log('Contact form data submitted:', formData);
    return { data: { success: true, message: 'Votre message a été envoyé avec succès' } };
  },
  sendMessage: async (formData: any) => {
    return { data: { success: true, message: 'Votre message a été envoyé avec succès' } };
  },
};

// Service pour les formations
export const FormationService = {
  getAll: async () => {
    return {
      data: [
        { id: '1', title: 'Formation Web', duration: '3 mois', price: 150000, status: 'active' },
        { id: '2', title: 'Formation Design', duration: '2 mois', price: 120000, status: 'active' }
      ]
    };
  },
  getById: async (id: string) => {
    return { data: { id, title: `Formation ${id}`, duration: '3 mois', price: 150000, status: 'active' } };
  },
  create: async (data: any) => {
    return { data: { ...data, id: Date.now().toString() } };
  },
  update: async (id: string, data: any) => {
    return { data: { ...data, id } };
  },
  delete: async (id: string) => {
    return { data: { success: true } };
  },
  getOpenFormations: async () => {
    return { data: [
      { id: '1', title: 'Formation Web', duration: '3 mois', price: 150000, status: 'active' }
    ] };
  },
  getUniversity: async () => {
    return { data: [
      { id: '1', title: 'Licence Informatique', duration: '3 ans', price: 350000, status: 'active' }
    ] };
  },
  submitInscription: async (data: any) => {
    return { data: { ...data, id: Date.now().toString(), status: 'en attente' } };
  },
  submitUniversityApplication: async (data: any) => {
    return { data: { ...data, id: Date.now().toString(), status: 'en attente' } };
  },
};

// Service pour les événements
export const EventService = {
  getAll: async () => {
    return {
      data: [
        { id: '1', title: 'Conférence Tech', date: '2025-10-15', location: 'Amphi A', status: 'à venir' },
        { id: '2', title: 'Hackathon', date: '2025-11-20', location: 'Campus principal', status: 'à venir' }
      ]
    };
  },
  getById: async (id: string) => {
    return { data: { id, title: `Événement ${id}`, date: '2025-10-15', location: 'Amphi A', status: 'à venir' } };
  },
  create: async (data: any) => {
    return { data: { ...data, id: Date.now().toString() } };
  },
  update: async (id: string, data: any) => {
    return { data: { ...data, id } };
  },
  delete: async (id: string) => {
    return { data: { success: true } };
  },
  getUpcoming: async () => {
    return { data: [
      { id: '1', title: 'Conférence Tech', date: '2025-10-15', location: 'Amphi A', status: 'à venir' }
    ] };
  },
};

// Service pour les actualités
export const NewsService = {
  getAll: async () => {
    return {
      data: [
        { id: '1', title: 'Ouverture du campus', date: '2025-09-01', content: 'Le campus ouvre ses portes', imageUrl: '/img/news/news1.jpg' },
        { id: '2', title: 'Partenariat international', date: '2025-08-15', content: 'Nouveau partenariat', imageUrl: '/img/news/news2.jpg' }
      ]
    };
  },
  getById: async (id: string) => {
    return { data: { id, title: `Article ${id}`, date: '2025-09-01', content: 'Contenu de l\'article', imageUrl: '/img/news/news1.jpg' } };
  },
  getLatest: async () => {
    return { data: [
      { id: '1', title: 'Ouverture du campus', date: '2025-09-01', content: 'Le campus ouvre ses portes', imageUrl: '/img/news/news1.jpg' }
    ] };
  },
  getByCategory: async (category: string) => {
    return { data: [
      { id: '1', title: `News ${category} 1`, date: '2025-09-01', content: 'Contenu', imageUrl: '/img/news/news1.jpg' }
    ] };
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
    return {
      data: { id: '1', email: 'admin@crec.edu', role: 'admin', name: 'Admin CREC' }
    };
  }
};

// Services spécifiques au FabLab
export const FablabSubscriptionService = {
  getAll: async () => {
    return {
      data: [
        { id: '1', name: 'Abonnement Basique', price: 50000, duration: '1 mois', features: ['Accès aux machines basiques'] },
        { id: '2', name: 'Abonnement Premium', price: 150000, duration: '3 mois', features: ['Accès à toutes les machines', 'Formation incluse'] }
      ]
    };
  },
  subscribe: async (data: any) => {
    return { data: { ...data, id: Date.now().toString(), status: 'active' } };
  },
  getAllSubscriptions: async () => {
    return { data: [
      { id: '1', name: 'Abonnement Basique', price: 50000, duration: '1 mois', features: ['Accès aux machines basiques'] }
    ] };
  },
  createSubscription: async (data: any) => {
    return { data: { ...data, subscriptionKey: 'ABC123' } };
  },
  verifySubscription: async (name: string, subscriptionKey: string) => {
    if (subscriptionKey === 'ABC123') return { data: { valid: true } };
    throw new Error('Clé invalide');
  },
  getUsageReport: async (subscriptionId: string) => {
    return { data: { used: 5, total: 10 } };
  },
};

export const FablabMachineService = {
  getAllMachines: async () => {
    return { data: [
      { id: '1', name: 'Imprimante 3D Ultimaker', status: 'disponible', needsTraining: true }
    ] };
  },
  getHourlyRates: async () => {
    return { data: [
      { id: '1', name: 'Imprimante 3D', rate: 1000 }
    ] };
  },
};

export const FablabReservationService = {
  createReservation: async (data: any) => {
    return { data: { ...data, id: Date.now().toString(), status: 'en attente' } };
  },
  getUserReservations: async (subscriptionId: string) => {
    return { data: [
      { id: '1', subscriptionId, machineId: '1', date: '2025-10-10', slot: '9h-12h', status: 'confirmée' }
    ] };
  },
  getAvailableSlots: async (machineId: string, date: string) => {
    return { data: [ '9h-12h', '14h-17h' ] };
  },
  cancelReservation: async (reservationId: string) => {
    return { data: { success: true } };
  },
};
