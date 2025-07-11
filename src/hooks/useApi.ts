import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Event, GalleryItem, LibraryResource, OpenFormation, FablabMachine, FablabProject, FormationRegistration, UniversityApplication } from '../types';

// Mock data pour les machines FabLab
const mockFablabMachines: FablabMachine[] = [
  {
    id: '1',
    name: 'Imprimante 3D Ultimaker',
    code: 'FAB-IMP01',
    type: 'Imprimante 3D',
    description: 'Imprimante 3D haute précision pour prototypage et création',
    features: ['Précision 0.1mm', 'Volume 200x200x200mm', 'Compatible PLA/ABS'],
    imageUrl: '/img/machines/imprimante-3d.jpg',
    image: '/img/machines/imprimante-3d.jpg',
    hourlyRate: 2500,
    status: 'available',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2', 
    name: 'Découpeuse Laser',
    code: 'FAB-LAS01',
    type: 'Découpeuse laser',
    description: 'Découpeuse laser pour matériaux variés',
    features: ['Puissance 40W', 'Surface 300x200mm', 'Bois, acrylique, carton'],
    imageUrl: '/img/machines/laser.jpg',
    image: '/img/machines/laser.jpg',
    hourlyRate: 3000,
    status: 'available',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

// Mock data pour les projets FabLab
const mockFablabProjects: FablabProject[] = [
  {
    id: '1',
    title: 'Prototype de drone agricole',
    description: 'Développement d\'un drone pour l\'agriculture de précision',
    category: 'Prototypage',
    difficulty: 'Avancé',
    duration: '2 semaines',
    instructions: 'Guide complet pour créer un drone agricole',
    materialsNeeded: ['Châssis carbone', 'Moteurs brushless', 'Contrôleur de vol'],
    imageUrl: '/img/projects/drone.jpg',
    isPublished: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Lampe LED personnalisée',
    description: 'Création d\'une lampe LED avec impression 3D',
    category: 'Art numérique',
    difficulty: 'Intermédiaire',
    duration: '1 journée',
    instructions: 'Tutoriel pour créer une lampe LED design',
    materialsNeeded: ['Filament PLA', 'LEDs', 'Contrôleur Arduino'],
    imageUrl: '/img/projects/lamp.jpg',
    isPublished: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

// Mock data pour les formations ouvertes
const mockOpenFormations: OpenFormation[] = [
  {
    id: '1',
    title: 'Formations en Langues',
    description: 'Maîtrisez l\'anglais et le français avec nos cours adaptés à tous les niveaux',
    longDescription: 'Programme complet de formations linguistiques incluant l\'anglais général et professionnel, la préparation aux tests internationaux, et le français pour étrangers.',
    image: '/img/anglais.png',
    duration: '3-6 mois',
    price: 15000,
    maxParticipants: 20,
    startDate: '2025-10-01T08:00:00Z',
    endDate: '2026-03-31T17:00:00Z',
    schedule: 'Lundi-Vendredi 8h-12h ou 14h-18h',
    prerequisites: 'Aucun prérequis',
    syllabus: [
      'Cours d\'anglais général et professionnel',
      'Préparation aux tests TOEFL, IELTS, TCF',
      'Français pour étrangers (FLE)',
      'Conversation et prononciation'
    ],
    instructor: 'Équipe pédagogique CREC',
    status: 'ACTIVE',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Informatique de Base',
    description: 'Initiez-vous à l\'informatique et aux outils numériques essentiels',
    longDescription: 'Formation complète en informatique de base couvrant l\'utilisation des ordinateurs, la bureautique, et les outils numériques modernes.',
    image: '/img/informatique.png',
    duration: '2-4 mois',
    price: 20000,
    maxParticipants: 15,
    startDate: '2025-10-01T08:00:00Z',
    endDate: '2026-01-31T17:00:00Z',
    schedule: 'Mardi-Jeudi 9h-13h',
    prerequisites: 'Aucun prérequis',
    syllabus: [
      'Utilisation de l\'ordinateur (Windows, Mac)',
      'Bureautique (Word, Excel, PowerPoint)',
      'Navigation internet et email',
      'Réseaux sociaux et sécurité numérique'
    ],
    instructor: 'Équipe technique CREC',
    status: 'ACTIVE',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    title: 'Accompagnement Scolaire',
    description: 'Soutien scolaire personnalisé pour tous les niveaux',
    longDescription: 'Programme d\'accompagnement scolaire avec cours de soutien, préparation aux examens, et méthodologie d\'étude.',
    image: '/img/accompagnement.png',
    duration: 'Toute l\'année',
    price: 10000,
    maxParticipants: 25,
    startDate: '2025-09-01T08:00:00Z',
    endDate: '2026-06-30T17:00:00Z',
    schedule: 'Flexible selon les besoins',
    prerequisites: 'Selon le niveau demandé',
    syllabus: [
      'Cours de soutien toutes matières',
      'Préparation aux examens officiels',
      'Méthodologie et techniques d\'étude',
      'Encadrement personnalisé'
    ],
    instructor: 'Équipe pédagogique CREC',
    status: 'ACTIVE',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    title: 'Entrepreneuriat',
    description: 'Développez vos compétences entrepreneuriales et créez votre entreprise',
    longDescription: 'Formation complète en entrepreneuriat incluant l\'élaboration de business plan, la gestion d\'entreprise, et l\'accompagnement post-formation.',
    image: '/img/formation.png',
    duration: '4-6 mois',
    price: 25000,
    maxParticipants: 18,
    startDate: '2025-11-01T08:00:00Z',
    endDate: '2026-04-30T17:00:00Z',
    schedule: 'Samedi 8h-17h',
    prerequisites: 'Projet d\'entreprise ou idée de business',
    syllabus: [
      'Élaboration de business plan',
      'Gestion financière et comptabilité',
      'Marketing et communication',
      'Accompagnement post-formation'
    ],
    instructor: 'Experts en entrepreneuriat',
    status: 'ACTIVE',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

// Mock data pour les événements
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Conférence sur l\'IA',
    description: 'Une conférence sur l\'intelligence artificielle',
    longDescription: 'Conférence approfondie sur les dernières avancées en IA',
    eventType: 'CONFERENCE',
    startDate: '2024-03-15T10:00:00Z',
    endDate: '2024-03-15T17:00:00Z',
    location: 'Auditorium CREC',
    address: 'Yaoundé, Cameroun',
    image: '/img/conference.png',
    maxParticipants: 100,
    currentParticipants: 25,
    registrationRequired: true,
    registrationDeadline: '2024-03-10T23:59:59Z',
    isPublished: true,
    isFeatured: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Workshop Développement Web',
    description: 'Atelier pratique sur le développement web moderne',
    longDescription: 'Workshop intensif sur React, Node.js et les technologies modernes',
    eventType: 'WORKSHOP',
    startDate: '2024-03-20T14:00:00Z',
    endDate: '2024-03-20T18:00:00Z',
    location: 'Salle FabLab',
    address: 'Yaoundé, Cameroun',
    image: '/img/dev-web.png',
    maxParticipants: 30,
    currentParticipants: 15,
    registrationRequired: true,
    registrationDeadline: '2024-03-18T23:59:59Z',
    isPublished: true,
    isFeatured: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

// Mock data pour la galerie
const mockGalleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'Cérémonie de graduation 2024',
    description: 'Photos de la cérémonie de remise des diplômes',
    imageUrl: '/img/graduation.jpg',
    category: 'GRADUATION',
    tags: ['graduation', 'diplômes', '2024'],
    photographer: 'CREC Media',
    location: 'Auditorium CREC',
    captureDate: '2024-06-15T10:00:00Z',
    isPublished: true,
    isFeatured: true,
    order: 1,
    createdAt: '2024-06-15T10:00:00Z',
    updatedAt: '2024-06-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Atelier FabLab',
    description: 'Étudiants travaillant sur des projets au FabLab',
    imageUrl: '/img/fablab.jpg',
    category: 'FABLAB',
    tags: ['fablab', 'étudiants', 'projets'],
    photographer: 'CREC Media',
    location: 'FabLab CREC',
    captureDate: '2024-05-20T14:00:00Z',
    isPublished: true,
    isFeatured: false,
    order: 2,
    createdAt: '2024-05-20T14:00:00Z',
    updatedAt: '2024-05-20T14:00:00Z'
  }
];

// Mock data pour les ressources de bibliothèque
const mockLibraryResources: LibraryResource[] = [
  {
    id: '1',
    title: 'Introduction à l\'Intelligence Artificielle',
    description: 'Livre complet sur les fondements de l\'IA',
    type: 'BOOK',
    category: 'INFORMATIQUE',
    author: 'Dr. Jean Dupont',
    publisher: 'Éditions Tech',
    publicationYear: 2023,
    coverImage: '/resources/ai-intro-cover.jpg',
    pdfUrl: '/resources/ai-intro.pdf',
    downloadUrl: '/resources/ai-intro.pdf',
    readOnlineUrl: '/resources/ai-intro.pdf',
    isAvailable: true,
    isDigital: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Développement Web avec React',
    description: 'Guide pratique pour apprendre React',
    type: 'BOOK',
    category: 'DEVELOPPEMENT',
    author: 'Marie Martin',
    publisher: 'Dev Books',
    publicationYear: 2023,
    coverImage: '/resources/react-guide-cover.jpg',
    pdfUrl: '/resources/react-guide.pdf',
    downloadUrl: '/resources/react-guide.pdf',
    readOnlineUrl: '/resources/react-guide.pdf',
    isAvailable: true,
    isDigital: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

/**
 * Hook pour récupérer tous les événements
 */
export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: async (): Promise<Event[]> => {
      // TODO: Remplacer par un appel API réel
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockEvents), 500);
      });
    }
  });
};

/**
 * Hook pour récupérer les événements à venir
 */
export const useUpcomingEvents = () => {
  return useQuery({
    queryKey: ['upcomingEvents'],
    queryFn: async (): Promise<Event[]> => {
      // TODO: Remplacer par un appel API réel
      const now = new Date();
      const upcomingEvents = mockEvents.filter(event => 
        new Date(event.startDate) > now && event.isPublished
      );
      return new Promise((resolve) => {
        setTimeout(() => resolve(upcomingEvents), 500);
      });
    }
  });
};

/**
 * Hook pour récupérer les éléments de galerie
 */
export const useGallery = () => {
  return useQuery({
    queryKey: ['gallery'],
    queryFn: async (): Promise<GalleryItem[]> => {
      // TODO: Remplacer par un appel API réel
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockGalleryItems), 500);
      });
    }
  });
};

/**
 * Hook pour récupérer les ressources de bibliothèque
 */
export const useLibraryResources = () => {
  return useQuery({
    queryKey: ['libraryResources'],
    queryFn: async (): Promise<LibraryResource[]> => {
      // TODO: Remplacer par un appel API réel
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockLibraryResources), 500);
      });
    }
  });
};

/**
 * Hook pour récupérer les machines FabLab
 */
export const useFablabMachines = () => {
  return useQuery({
    queryKey: ['fablabMachines'],
    queryFn: async () => {
      // TODO: Remplacer par un appel API réel
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockFablabMachines), 500);
      });
    }
  });
};

/**
 * Hook pour récupérer les réservations FabLab
 */
export const useFablabReservations = () => {
  return useQuery({
    queryKey: ['fablabReservations'],
    queryFn: async () => {
      // TODO: Remplacer par un appel API réel
      return new Promise((resolve) => {
        setTimeout(() => resolve([]), 500);
      });
    }
  });
};

/**
 * Hook pour récupérer toutes les formations ouvertes
 */
export const useOpenFormations = () => {
  return useQuery({
    queryKey: ['openFormations'],
    queryFn: async (): Promise<OpenFormation[]> => {
      // TODO: Remplacer par un appel API réel
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockOpenFormations), 500);
      });
    }
  });
};

/**
 * Hook pour récupérer tous les projets FabLab
 */
export const useFablabProjects = () => {
  return useQuery({
    queryKey: ['fablabProjects'],
    queryFn: async (): Promise<FablabProject[]> => {
      // TODO: Remplacer par un appel API réel
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockFablabProjects), 500);
      });
    }
  });
};

/**
 * Hook pour récupérer toutes les inscriptions aux formations
 */
export const useFormationRegistrations = () => {
  return useQuery({
    queryKey: ['formationRegistrations'],
    queryFn: async (): Promise<FormationRegistration[]> => {
      // TODO: Remplacer par un appel API réel
      const mockRegistrations: FormationRegistration[] = [
        {
          id: '1',
          firstName: 'Marie',
          lastName: 'Kouassi',
          email: 'marie.kouassi@email.com',
          phone: '+229 90 12 34 56',
          profession: 'Étudiante',
          experience: '2 ans en marketing',
          motivation: 'Je souhaite améliorer mes compétences en anglais pour mes études à l\'étranger.',
          paymentMethod: 'mobile_money',
          paymentReference: 'OM123456789',
          status: 'PENDING',
          submittedAt: '2024-03-01T10:00:00Z',
          formationId: '1'
        },
        {
          id: '2',
          firstName: 'Jean',
          lastName: 'Baptiste',
          email: 'jean.baptiste@email.com',
          phone: '+229 91 23 45 67',
          profession: 'Retraité',
          motivation: 'Je veux apprendre l\'informatique pour rester connecté avec ma famille.',
          paymentMethod: 'bank_transfer',
          paymentReference: 'VIR987654321',
          status: 'APPROVED',
          submittedAt: '2024-02-28T14:30:00Z',
          reviewedAt: '2024-03-01T09:00:00Z',
          formationId: '2'
        }
      ];
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockRegistrations), 500);
      });
    }
  });
};

/**
 * Hook pour récupérer toutes les candidatures universitaires
 */
export const useUniversityApplications = () => {
  return useQuery({
    queryKey: ['universityApplications'],
    queryFn: async (): Promise<UniversityApplication[]> => {
      // TODO: Remplacer par un appel API réel
      const mockApplications: UniversityApplication[] = [
        {
          id: '1',
          programId: 'prog-1',
          academicYearId: 'year-1',
          firstName: 'Koffi',
          lastName: 'Zinsou',
          email: 'koffi.zinsou@email.com',
          phone: '+229 92 34 56 78',
          dateOfBirth: '2000-05-15',
          placeOfBirth: 'Cotonou',
          nationality: 'Béninoise',
          address: 'Cotonou, Bénin',
          lastDiploma: 'Baccalauréat série C',
          lastSchool: 'Lycée Mathieu Bouké',
          graduationYear: 2023,
          parentName: 'Mme Zinsou Rosine',
          parentPhone: '+229 91 11 22 33',
          motivation: 'Je souhaite devenir développeur logiciel pour contribuer au développement technologique de l\'Afrique.',
          status: 'PENDING',
          submittedAt: '2024-03-05T16:20:00Z'
        }
      ];
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockApplications), 500);
      });
    }
  });
};

/**
 * Hook pour les inscriptions de formations
 */
export const useFormationInscription = () => {
  return useQuery({
    queryKey: ['formationInscription'],
    queryFn: async () => {
      // Simulation des données d'inscription
      return {
        data: {
          success: true,
          message: 'Inscription envoyée avec succès'
        }
      };
    }
  });
};

/**
 * Hook pour les soumissions de contact
 */
export const useContactSubmission = () => {
  return useQuery({
    queryKey: ['contactSubmission'],
    queryFn: async () => {
      return {
        data: {
          success: true,
          message: 'Message envoyé avec succès'
        }
      };
    }
  });
};

/**
 * Hook pour la vérification d'abonnement FabLab
 */
export const useFablabSubscriptionVerification = () => {
  return useQuery({
    queryKey: ['fablabSubscriptionVerification'],
    queryFn: async () => {
      return {
        data: {
          verified: true,
          subscription: {
            id: 'sub-1',
            type: 'monthly',
            status: 'active'
          }
        }
      };
    }
  });
};

/**
 * Hook pour les tarifs horaires des machines
 */
export const useMachineHourlyRates = () => {
  return useQuery({
    queryKey: ['machineHourlyRates'],
    queryFn: async () => {
      const mockRates = [
        { machineId: '1', hourlyRate: 2500, currency: 'FCFA' },
        { machineId: '2', hourlyRate: 1500, currency: 'FCFA' },
        { machineId: '3', hourlyRate: 3000, currency: 'FCFA' }
      ];
      return { data: mockRates };
    }
  });
};

/**
 * Hook pour les abonnements FabLab
 */
export const useFablabSubscriptions = () => {
  return useQuery({
    queryKey: ['fablabSubscriptions'],
    queryFn: async () => {
      const mockSubscriptions = [
        { 
          id: 'sub-1', 
          type: 'student',
          subscriptionType: 'STUDENT',
          firstName: 'Marie',
          lastName: 'Kouassi',
          userName: 'Marie Kouassi',
          email: 'marie.kouassi@crec.com',
          phone: '+229 67 89 12 34',
          price: 15000, 
          maxHoursPerMonth: 15,
          duration: 1,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'APPROVED',
          isActive: true,
          paymentMethod: 'mobile_money',
          subscriptionKey: 'bonjour',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        { 
          id: 'sub-2', 
          type: 'professional',
          subscriptionType: 'YEARLY',
          firstName: 'Jean',
          lastName: 'Dupont',
          userName: 'Jean Dupont',
          email: 'jean.dupont@crec.com',
          phone: '+229 65 43 21 09',
          price: 150000, 
          maxHoursPerMonth: 20,
          duration: 12,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'APPROVED',
          isActive: true,
          paymentMethod: 'bank_transfer',
          subscriptionKey: 'professionnel123',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      return { data: mockSubscriptions };
    }
  });
};

/**
 * Hook pour les réservations utilisateur
 */
export const useUserReservations = (subscriptionId?: string) => {
  return useQuery({
    queryKey: ['userReservations', subscriptionId],
    queryFn: async () => {
      const mockReservations = [
        {
          id: 'res-1',
          machineId: '1',
          machineName: 'Imprimante 3D',
          date: '2024-07-10',
          startTime: '14:00',
          endTime: '16:00',
          status: 'confirmed'
        }
      ];
      return mockReservations;
    },
    enabled: !!subscriptionId
  });
};

/**
 * Hook pour l'usage d'abonnement
 */
export const useSubscriptionUsage = (subscriptionId?: string) => {
  return useQuery({
    queryKey: ['subscriptionUsage', subscriptionId],
    queryFn: async () => {
      const mockUsage = {
        subscriptionId: subscriptionId || 'sub-1',
        currentMonth: { 
          totalHours: 10, 
          sessionsCount: 8,
          lastSession: '2024-07-05T10:00:00Z'
        },
        previousMonth: {
          totalHours: 13,
          sessionsCount: 10
        },
        yearToDate: {
          totalHours: 85,
          sessionsCount: 45
        },
        maxHoursPerMonth: 15,
        hoursLeft: 5,
        used: 10 // Pour compatibilité avec ancienne API
      };
      return mockUsage;
    },
    enabled: !!subscriptionId
  });
};

/**
 * Hook pour les créneaux disponibles
 */
export const useAvailableSlots = (machineId?: string, date?: string) => {
  return useQuery({
    queryKey: ['availableSlots', machineId, date],
    queryFn: async () => {
      const mockSlots = [
        { time: '09:00', available: true },
        { time: '10:00', available: false },
        { time: '11:00', available: true },
        { time: '14:00', available: true },
        { time: '15:00', available: true },
        { time: '16:00', available: false }
      ];
      return mockSlots;
    },
    enabled: !!machineId && !!date
  });
};

/**
 * Hook pour créer une réservation FabLab
 */
export const useCreateFablabReservation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (reservationData: {
      machineId: string;
      date: string;
      startTime: string;
      endTime: string;
      purpose?: string;
    }) => {
      // Simulation d'un délai de création
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        reservationId: 'res-' + Date.now(),
        message: 'Réservation créée avec succès'
      };
    },
    onSuccess: () => {
      // Invalider les queries liées aux réservations
      queryClient.invalidateQueries({ queryKey: ['userReservations'] });
      queryClient.invalidateQueries({ queryKey: ['availableSlots'] });
    }
  });
};

/**
 * Hook pour annuler une réservation
 */
export const useCancelReservation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (reservationId: string) => {
      // Simulation d'un délai d'annulation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        success: true,
        message: 'Réservation annulée avec succès'
      };
    },
    onSuccess: () => {
      // Invalider les queries liées aux réservations
      queryClient.invalidateQueries({ queryKey: ['userReservations'] });
      queryClient.invalidateQueries({ queryKey: ['availableSlots'] });
    }
  });
};

/**
 * Hook générique pour les opérations CRUD API
 */
export const useApi = () => {
  const get = async (endpoint: string) => {
    // Simulation d'une requête GET
    console.log(`GET ${endpoint}`);
    return { data: [] };
  };

  const post = async (endpoint: string, data: any) => {
    // Simulation d'une requête POST
    console.log(`POST ${endpoint}`, data);
    return { data: { id: Date.now().toString(), ...data } };
  };

  const put = async (endpoint: string, data: any) => {
    // Simulation d'une requête PUT
    console.log(`PUT ${endpoint}`, data);
    return { data: { ...data } };
  };

  const del = async (endpoint: string) => {
    // Simulation d'une requête DELETE
    console.log(`DELETE ${endpoint}`);
    return { data: { success: true } };
  };

  return { get, post, put, delete: del };
};