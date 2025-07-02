/**
 * Service de données fictives (mock) pour le développement frontend
 * À utiliser temporairement avant l'intégration avec le backend réel
 */

import { formatDate } from '../utils';
import { Formation } from './formation-service';
import { Event } from './event-service';
import { Book } from './library-service';

/**
 * Données fictives pour les formations
 */
const mockFormations: Formation[] = [
  {
    id: '1',
    title: 'Formation Universitaire',
    subtitle: 'Institut Supérieur de Technologie Matteo Ricci',
    description: 'Une formation complète et rigoureuse dans les domaines technologiques avec une approche éthique et humaniste.',
    image: '/img/crec3.jpg',
    link: '/formations/university',
    type: 'university',
    startDate: '2025-10-01T00:00:00Z',
    endDate: '2026-06-30T00:00:00Z',
    published: true,
    createdAt: '2023-05-15T10:30:00Z',
    updatedAt: '2023-05-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Formations Ouvertes',
    subtitle: 'Programmes accessibles à tous',
    description: 'Des formations courtes et pratiques pour développer des compétences spécifiques et répondre aux besoins immédiats du marché.',
    image: '/img/formation-ouverte.png',
    link: '/formations/ouvertes',
    type: 'open',
    published: true,
    createdAt: '2023-06-10T14:20:00Z',
    updatedAt: '2023-06-10T14:20:00Z'
  },
  {
    id: '3',
    title: 'FabLab',
    subtitle: 'Centre d\'innovation et de créativité',
    description: 'Un espace équipé pour transformer vos idées en prototypes et développer des projets technologiques innovants.',
    image: '/img/fablab.jpeg',
    link: '/formations/fablab',
    type: 'fablab',
    published: true,
    createdAt: '2023-07-05T09:15:00Z',
    updatedAt: '2023-07-05T09:15:00Z'
  }
];

/**
 * Données fictives pour les événements
 */
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Conférence sur l\'Intelligence Artificielle Éthique',
    description: 'Une conférence explorant les implications éthiques de l\'IA dans notre société.',
    content: `
      <p>L'IA est en train de transformer nos sociétés à un rythme sans précédent, mais cette révolution technologique soulève d'importantes questions éthiques.</p>
      <p>Au cours de cette conférence, des experts internationaux discuteront des enjeux suivants :</p>
      <ul>
        <li>Les biais algorithmiques et leur impact sur les décisions automatisées</li>
        <li>La protection des données personnelles à l'ère de l'IA</li>
        <li>L'équilibre entre innovation technologique et respect des valeurs humaines</li>
      </ul>
      <p>Venez nombreux pour participer à ces discussions cruciales pour notre avenir commun.</p>
    `,
    image: '/img/conference.png',
    eventDate: '2025-07-15T14:00:00Z',
    endDate: '2025-07-15T17:00:00Z',
    location: 'Auditorium du CREC, Godomey',
    eventType: 'conference',
    published: true,
    featured: true,
    createdAt: '2025-05-20T10:30:00Z',
    updatedAt: '2025-05-20T10:30:00Z'
  },
  {
    id: '2',
    title: 'Atelier Développement Web',
    description: 'Apprenez les fondamentaux du développement web moderne en une journée.',
    content: `
      <p>Cet atelier pratique vous permettra d'acquérir les bases du développement web moderne.</p>
      <p>Au programme :</p>
      <ul>
        <li>HTML5 et CSS3 : structure et style</li>
        <li>JavaScript : dynamisme et interactivité</li>
        <li>Responsive design : s'adapter à tous les écrans</li>
        <li>Introduction aux frameworks modernes</li>
      </ul>
      <p>Aucune expérience préalable n'est requise, mais apportez votre ordinateur portable.</p>
    `,
    image: '/img/dev-web.png',
    eventDate: '2025-08-10T09:00:00Z',
    endDate: '2025-08-10T17:00:00Z',
    location: 'Salle informatique du CREC, Godomey',
    eventType: 'workshop',
    published: true,
    featured: false,
    createdAt: '2025-06-05T15:45:00Z',
    updatedAt: '2025-06-05T15:45:00Z'
  },
  {
    id: '3',
    title: 'Ouverture des inscriptions pour la rentrée 2025',
    description: 'Les inscriptions pour l\'année académique 2025-2026 sont désormais ouvertes.',
    content: `
      <p>Nous sommes ravis d'annoncer l'ouverture des inscriptions pour l'année académique 2025-2026.</p>
      <p>Cette année, nous proposons plusieurs filières d'excellence :</p>
      <ul>
        <li>Développement logiciel et intelligence artificielle</li>
        <li>Sciences des données et analytique</li>
        <li>Conception et innovation technologique</li>
      </ul>
      <p>Les dossiers de candidature peuvent être déposés jusqu'au 15 septembre 2025.</p>
    `,
    image: '/img/actualite.png',
    eventDate: '2025-06-01T00:00:00Z',
    location: 'CREC, Godomey',
    eventType: 'other',
    published: true,
    featured: true,
    createdAt: '2025-05-25T08:00:00Z',
    updatedAt: '2025-05-25T08:00:00Z'
  }
];

/**
 * Données fictives pour les livres de la bibliothèque
 */
const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Introduction à l\'Intelligence Artificielle',
    author: 'Jean Dupont',
    description: 'Un ouvrage complet sur les fondamentaux de l\'intelligence artificielle moderne.',
    coverImage: '/img/books/ia-intro.jpg',
    publicationYear: 2022,
    publisher: 'Éditions Scientifiques',
    category: 'Technologie',
    isbn: '978-2-1234-5678-9',
    available: true,
    digital: true,
    downloadUrl: '/library/books/ia-intro.pdf',
    readOnlineUrl: '/library/viewer?id=1',
    createdAt: '2023-01-15T10:30:00Z',
    updatedAt: '2023-01-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Éthique et Technologie',
    author: 'Marie Laurent',
    description: 'Une réflexion approfondie sur les enjeux éthiques des nouvelles technologies.',
    coverImage: '/img/books/ethique-tech.jpg',
    publicationYear: 2021,
    publisher: 'Philosophia',
    category: 'Philosophie',
    isbn: '978-2-9876-5432-1',
    available: true,
    digital: true,
    readOnlineUrl: '/library/viewer?id=2',
    createdAt: '2023-02-20T14:15:00Z',
    updatedAt: '2023-02-20T14:15:00Z'
  },
  {
    id: '3',
    title: 'Laudato Si\'',
    author: 'Pape François',
    description: 'Encyclique sur la sauvegarde de la maison commune.',
    coverImage: '/img/books/laudato-si.jpg',
    publicationYear: 2015,
    publisher: 'Libreria Editrice Vaticana',
    category: 'Spiritualité',
    isbn: '978-2-7122-1297-0',
    available: true,
    digital: true,
    downloadUrl: '/library/books/laudato-si.pdf',
    readOnlineUrl: '/library/viewer?id=3',
    createdAt: '2023-03-05T09:45:00Z',
    updatedAt: '2023-03-05T09:45:00Z'
  }
];

/**
 * Service de données fictives
 */
const mockService = {
  /**
   * Récupère toutes les formations fictives
   */
  getFormations: (): Promise<Formation[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockFormations]);
      }, 500);
    });
  },

  /**
   * Récupère toutes les formations fictives par type
   */
  getFormationsByType: (type: 'university' | 'open' | 'fablab'): Promise<Formation[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockFormations.filter(formation => formation.type === type));
      }, 500);
    });
  },

  /**
   * Récupère tous les événements fictifs
   */
  getEvents: (): Promise<Event[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockEvents]);
      }, 500);
    });
  },

  /**
   * Récupère les événements fictifs par type
   */
  getEventsByType: (type: 'conference' | 'workshop' | 'other'): Promise<Event[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockEvents.filter(event => event.eventType === type));
      }, 500);
    });
  },

  /**
   * Récupère tous les livres fictifs
   */
  getBooks: (): Promise<Book[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockBooks]);
      }, 500);
    });
  },

  /**
   * Récupère les livres fictifs par catégorie
   */
  getBooksByCategory: (category: string): Promise<Book[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockBooks.filter(book => book.category === category));
      }, 500);
    });
  }
};

export default mockService;
