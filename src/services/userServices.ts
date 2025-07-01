// Services pour la gestion des utilisateurs
import { User, RegistrationFormData } from '@/types';

// Service utilisateur avec méthodes pour gérer l'inscription, la connexion, etc.
export const UserService = {
  // Récupérer le profil utilisateur
  getProfile: async () => {
    return {
      data: {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        roles: ['user'],
        createdAt: '2023-01-01T00:00:00Z',
        phone: '+229 00000000',
        address: 'Cotonou, Benin',
        bio: 'Utilisateur du CREC Education'
      }
    };
  },
  
  // Mettre à jour le profil utilisateur
  updateProfile: async (userData: Partial<User>) => {
    return {
      data: {
        ...userData,
        id: '1',
        roles: ['user'],
        updatedAt: new Date().toISOString()
      }
    };
  },
  
  // Changer le mot de passe
  changePassword: async (data: { oldPassword: string; newPassword: string }) => {
    // Simuler une validation du mot de passe
    if (data.oldPassword === 'wrongpassword') {
      throw new Error('Mot de passe actuel incorrect');
    }
    return { data: { success: true } };
  },
  
  // Inscription d'un nouvel utilisateur
  register: async (data: RegistrationFormData) => {
    return {
      data: {
        id: Math.random().toString(36).substring(2, 9),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        roles: ['user'],
        createdAt: new Date().toISOString()
      }
    };
  },
  
  // Récupérer les formations de l'utilisateur
  getUserCourses: async () => {
    return {
      data: [
        { id: '1', title: 'Bureautique avancée', status: 'En cours', progress: 60, startDate: '15/03/2024', endDate: '15/06/2024' },
        { id: '2', title: 'Anglais - Niveau intermédiaire', status: 'Terminé', progress: 100, startDate: '10/01/2024', endDate: '10/03/2024' },
      ]
    };
  },
  
  // Récupérer les certificats de l'utilisateur
  getUserCertificates: async () => {
    return {
      data: [
        { id: '1', title: 'Certificat en anglais professionnel', issueDate: '15/03/2024', expiry: null, downloadUrl: '#' },
        { id: '2', title: 'Attestation Formation Bureautique', issueDate: '10/01/2024', expiry: null, downloadUrl: '#' },
      ]
    };
  }
};

// Service pour les ressources de la bibliothèque
export const LibraryService = {
  // Récupérer toutes les ressources
  getAllResources: async () => {
    return {
      data: [
        {
          id: '1',
          title: "Intelligence artificielle et éthique",
          author: "Prof. Marie Dupont",
          type: 'book',
          categories: ['informatique', 'éthique'],
          description: "Une exploration des défis éthiques posés par le développement de l'intelligence artificielle.",
          coverUrl: "/img/books/ai-ethics.jpg",
          downloadUrl: "#",
          dateAdded: "2024-03-15",
          language: "Français",
          format: "PDF",
          pages: 248,
          featured: true
        },
        {
          id: '2',
          title: "Éducation et technologies numériques",
          author: "Dr. Jean Kouassi",
          type: 'book',
          categories: ['éducation', 'technologie'],
          description: "Comment les technologies numériques transforment l'enseignement et l'apprentissage en Afrique.",
          coverUrl: "/img/books/education-tech.jpg",
          downloadUrl: "#",
          dateAdded: "2024-02-20",
          language: "Français",
          format: "PDF",
          pages: 186
        }
      ]
    };
  },
  
  // Rechercher des ressources
  searchResources: async (query: string) => {
    return {
      data: [
        {
          id: '1',
          title: "Intelligence artificielle et éthique",
          author: "Prof. Marie Dupont",
          type: 'book',
          categories: ['informatique', 'éthique'],
          description: "Une exploration des défis éthiques posés par le développement de l'intelligence artificielle.",
          coverUrl: "/img/books/ai-ethics.jpg",
          downloadUrl: "#",
          dateAdded: "2024-03-15",
          language: "Français",
          format: "PDF",
          pages: 248
        }
      ]
    };
  },
  
  // Filtrer par catégorie
  getByCategory: async (category: string) => {
    return {
      data: [
        {
          id: '3',
          title: "Introduction à la programmation Python",
          author: "Alice Koffi",
          type: 'book',
          categories: ['informatique', 'programmation'],
          description: "Un guide pour débutants pour apprendre à programmer en Python, avec des exemples pratiques.",
          coverUrl: "/img/books/python-intro.jpg",
          downloadUrl: "#",
          dateAdded: "2024-01-10",
          language: "Français",
          format: "PDF",
          pages: 320
        }
      ]
    };
  },
  
  // Télécharger une ressource
  downloadResource: async (id: string) => {
    return {
      data: {
        success: true,
        downloadUrl: "/dummy-file.pdf"
      }
    };
  }
};
