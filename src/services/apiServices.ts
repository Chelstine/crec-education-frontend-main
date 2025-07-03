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
    // TODO: Remplacer par l'endpoint réel une fois le backend prêt
    // return makeRequest('GET', '/formations');
    throw new Error('Backend not connected yet - use openFormations endpoints');
  },
  
  getOpenFormations: async () => {
    // TODO: Remplacer par l'endpoint réel une fois le backend prêt
    // return makeRequest('GET', '/formations/open');
    throw new Error('Backend not connected yet - TODO: connect to /api/formations/open');
  },
  
  getById: async (id: string) => {
    // TODO: Remplacer par l'endpoint réel une fois le backend prêt
    // return makeRequest('GET', `/formations/open/${id}`);
    throw new Error('Backend not connected yet - TODO: connect to /api/formations/open/${id}');
  },
  
  create: async (data: any) => {
    // TODO: Remplacer par l'endpoint réel une fois le backend prêt
    // return makeRequest('POST', '/formations/open', data);
    throw new Error('Backend not connected yet - TODO: connect to /api/formations/open');
  },
  
  update: async (id: string, data: any) => {
    // TODO: Remplacer par l'endpoint réel une fois le backend prêt
    // return makeRequest('PUT', `/formations/open/${id}`, data);
    throw new Error('Backend not connected yet - TODO: connect to /api/formations/open/${id}');
  },
  
  delete: async (id: string) => {
    // TODO: Remplacer par l'endpoint réel une fois le backend prêt
    // return makeRequest('DELETE', `/formations/open/${id}`);
    throw new Error('Backend not connected yet - TODO: connect to /api/formations/open/${id}');
  },
  
  getUniversity: async () => {
    // TODO: Remplacer par l'endpoint réel une fois le backend prêt
    // return makeRequest('GET', '/programs/university');
    throw new Error('Backend not connected yet - TODO: connect to /api/programs/university');
  },
  
  submitInscription: async (data: any) => {
    // TODO: Remplacer par l'endpoint réel une fois le backend prêt
    // return makeRequest('POST', '/formations/registrations', data);
    throw new Error('Backend not connected yet - TODO: connect to /api/formations/registrations');
  },
  
  submitUniversityApplication: async (data: any) => {
    // TODO: Remplacer par l'endpoint réel une fois le backend prêt
    // return makeRequest('POST', '/programs/university/applications', data);
    throw new Error('Backend not connected yet - TODO: connect to /api/programs/university/applications');
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
    // TODO: Remplacer par l'appel API réel au backend
    const response = await fetch('/api/fablab/subscription-plans');
    return response.json();
  },
  subscribe: async (data: any) => {
    // TODO: Remplacer par l'appel API réel au backend
    const response = await fetch('/api/fablab/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },
  getAllSubscriptions: async () => {
    // TODO: Remplacer par l'appel API réel au backend
    const response = await fetch('/api/fablab/subscriptions', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    return response.json();
  },
  createSubscription: async (data: any) => {
    // TODO: Remplacer par l'appel API réel au backend
    const response = await fetch('/api/fablab/subscriptions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },
  verifySubscription: async (name: string, subscriptionKey: string) => {
    // TODO: Remplacer par l'appel API réel au backend
    const response = await fetch('/api/fablab/verify-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, subscriptionKey })
    });
    if (!response.ok) throw new Error('Clé invalide');
    return response.json();
  },
  getUsageReport: async (subscriptionId: string) => {
    // TODO: Remplacer par l'appel API réel au backend
    const response = await fetch(`/api/fablab/subscriptions/${subscriptionId}/usage`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    return response.json();
  },
  canMakeReservation: async (subscriptionId: string, requestedHours: number) => {
    // TODO: Remplacer par l'appel API réel au backend
    const response = await fetch(`/api/fablab/subscriptions/${subscriptionId}/can-reserve`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` 
      },
      body: JSON.stringify({ requestedHours })
    });
    return response.json();
  }
};

export const FablabMachineService = {
  getAllMachines: async () => {
    // TODO: Remplacer par l'appel API réel au backend
    const response = await fetch('/api/fablab/machines');
    return response.json();
  },
  getHourlyRates: async () => {
    // TODO: Remplacer par l'appel API réel au backend
    const response = await fetch('/api/fablab/machines/rates');
    return response.json();
  },
};

export const FablabReservationService = {
  createReservation: async (data: any) => {
    // TODO: Remplacer par l'appel API réel au backend
    const response = await fetch('/api/fablab/reservations', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` 
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },
  getUserReservations: async (subscriptionId: string) => {
    // TODO: Remplacer par l'appel API réel au backend
    const response = await fetch(`/api/fablab/subscriptions/${subscriptionId}/reservations`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    return response.json();
  },
  getAvailableSlots: async (machineId: string, date: string) => {
    // TODO: Remplacer par l'appel API réel au backend
    const response = await fetch(`/api/fablab/machines/${machineId}/available-slots?date=${date}`);
    return response.json();
  },
  cancelReservation: async (reservationId: string) => {
    // TODO: Remplacer par l'appel API réel au backend
    const response = await fetch(`/api/fablab/reservations/${reservationId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    return response.json();
  }
};

// Service spécifique pour les formations ouvertes
export const OpenFormationService = {
  getAll: async () => {
    // TODO: Remplacer par l'endpoint réel une fois le backend prêt
    // return makeRequest('GET', '/api/formations/open');
    throw new Error('Backend not connected yet - TODO: connect to /api/formations/open');
  },
  
  getById: async (id: string) => {
    // TODO: Remplacer par l'endpoint réel une fois le backend prêt
    // return makeRequest('GET', `/api/formations/open/${id}`);
    throw new Error('Backend not connected yet - TODO: connect to /api/formations/open/${id}');
  },
  
  create: async (data: any) => {
    // TODO: Remplacer par l'endpoint réel une fois le backend prêt
    // return makeRequest('POST', '/api/formations/open', data);
    throw new Error('Backend not connected yet - TODO: connect to /api/formations/open');
  },
  
  update: async (id: string, data: any) => {
    // TODO: Remplacer par l'endpoint réel une fois le backend prêt
    // return makeRequest('PUT', `/api/formations/open/${id}`, data);
    throw new Error('Backend not connected yet - TODO: connect to /api/formations/open/${id}');
  },
  
  delete: async (id: string) => {
    // TODO: Remplacer par l'endpoint réel une fois le backend prêt
    // return makeRequest('DELETE', `/api/formations/open/${id}`);
    throw new Error('Backend not connected yet - TODO: connect to /api/formations/open/${id}');
  },
  
  getRegistrations: async () => {
    // TODO: Remplacer par l'endpoint réel une fois le backend prêt
    // return makeRequest('GET', '/api/formations/registrations');
    throw new Error('Backend not connected yet - TODO: connect to /api/formations/registrations');
  },
  
  submitRegistration: async (data: any) => {
    // TODO: Remplacer par l'endpoint réel une fois le backend prêt
    // return makeRequest('POST', '/api/formations/registrations', data);
    throw new Error('Backend not connected yet - TODO: connect to /api/formations/registrations');
  },
  
  updateRegistration: async (id: string, data: any) => {
    // TODO: Remplacer par l'endpoint réel une fois le backend prêt
    // return makeRequest('PUT', `/api/formations/registrations/${id}`, data);
    throw new Error('Backend not connected yet - TODO: connect to /api/formations/registrations/${id}');
  },
  
  deleteRegistration: async (id: string) => {
    // TODO: Remplacer par l'endpoint réel une fois le backend prêt
    // return makeRequest('DELETE', `/api/formations/registrations/${id}`);
    throw new Error('Backend not connected yet - TODO: connect to /api/formations/registrations/${id}');
  },
};

// Service pour les programmes universitaires
export const UniversityProgramService = {
  getAll: async () => {
    // TODO: Remplacer par l'endpoint réel une fois le backend prêt
    // return makeRequest('GET', '/university-programs');
    throw new Error('Backend not connected yet - TODO: connect to /api/university-programs');
  },
  
  getById: async (id: string) => {
    // TODO: Remplacer par l'endpoint réel une fois le backend prêt
    // return makeRequest('GET', `/university-programs/${id}`);
    throw new Error('Backend not connected yet - TODO: connect to /api/university-programs/${id}');
  },
  
  getByType: async (type: string) => {
    // TODO: Remplacer par l'endpoint réel une fois le backend prêt
    // return makeRequest('GET', `/university-programs?type=${type}`);
    throw new Error('Backend not connected yet - TODO: connect to /api/university-programs?type=${type}');
  },
  
  submitApplication: async (data: any) => {
    // TODO: Remplacer par l'endpoint réel une fois le backend prêt
    // return makeRequest('POST', '/university-applications', data);
    throw new Error('Backend not connected yet - TODO: connect to /api/university-applications');
  },
  
  uploadDocument: async (applicationId: string, documentType: string, file: File) => {
    // TODO: Remplacer par l'endpoint réel une fois le backend prêt
    // const formData = new FormData();
    // formData.append('file', file);
    // return makeRequest('POST', `/university-applications/${applicationId}/documents/${documentType}`, formData);
    throw new Error('Backend not connected yet - TODO: connect to /api/university-applications/${applicationId}/documents/${documentType}');
  },
};

// Service pour les années académiques
export const AcademicYearService = {
  getActive: async () => {
    // TODO: Remplacer par l'endpoint réel une fois le backend prêt
    // return makeRequest('GET', '/academic-years/active');
    throw new Error('Backend not connected yet - TODO: connect to /api/academic-years/active');
  },
  
  getAll: async () => {
    // TODO: Remplacer par l'endpoint réel une fois le backend prêt
    // return makeRequest('GET', '/academic-years');
    throw new Error('Backend not connected yet - TODO: connect to /api/academic-years');
  },
};

// Export des services utilisateur et bibliothèque depuis userServices.ts
export * from './userServices';
