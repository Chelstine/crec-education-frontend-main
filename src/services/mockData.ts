import { 
  Filiere, 
  InscriptionIST, 
  FormationOuverte, 
  InscriptionFormationOuverte,
  ProjetFabLab,
  EquipementFabLab,
  AbonnementFabLab,
  ReservationFabLab,
  Evenement,
  PublicationVieCampus,
  OffreEmploi,
  MessageContact,
  Don,
  EmailTemplate
} from '@/types/admin';

// Mock data pour simuler le backend
export const mockFilieres: Filiere[] = [
  {
    id: '1',
    nom: 'Informatique et Réseaux',
    description: 'Formation complète en informatique et gestion des réseaux',
    duree: '3 ans',
    prerequis: 'Baccalauréat série C ou D',
    competences: ['Programmation', 'Administration réseau', 'Sécurité informatique', 'Base de données'],
    debouches: ['Développeur', 'Administrateur réseau', 'Consultant IT', 'Chef de projet'],
    profilIdeal: 'Étudiants passionnés par les technologies et ayant un bon niveau en mathématiques',
    image: '/img/informatique.png',
    tarif: 150000,
    niveauAdmission: 'Baccalauréat série C ou D',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    nom: 'Développement Web',
    description: 'Formation spécialisée en développement web et applications',
    duree: '2 ans',
    prerequis: 'Baccalauréat toutes séries',
    competences: ['HTML/CSS', 'JavaScript', 'React/Vue.js', 'Node.js', 'Bases de données'],
    debouches: ['Développeur Front-end', 'Développeur Full-stack', 'Intégrateur web', 'Chef de projet web'],
    profilIdeal: 'Étudiants créatifs avec une bonne logique et un intérêt pour le design',
    image: '/img/dev-web.png',
    tarif: 120000,
    niveauAdmission: 'Baccalauréat toutes séries',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20'
  }
];

export const mockInscriptionsIST: InscriptionIST[] = [
  {
    id: '1',
    nom: 'Doe',
    prenom: 'John',
    email: 'john.doe@email.com',
    telephone: '+229 12345678',
    filiere: 'Informatique et Réseaux',
    lettreMotivation: 'Je souhaite poursuivre mes études en informatique...',
    documentsUpload: ['diplome.pdf', 'releves_notes.pdf'],
    recuPaiement: 'recu_001.jpg',
    status: 'pending',
    dateInscription: '2024-06-01'
  },
  {
    id: '2',
    nom: 'Smith',
    prenom: 'Jane',
    email: 'jane.smith@email.com',
    telephone: '+229 87654321',
    filiere: 'Développement Web',
    lettreMotivation: 'Passionnée par le développement web...',
    documentsUpload: ['diplome.pdf', 'cv.pdf'],
    recuPaiement: 'recu_002.jpg',
    status: 'accepted',
    dateInscription: '2024-06-02'
  }
];

export const mockFormationsOuvertes: FormationOuverte[] = [
  {
    id: '1',
    nom: 'Cours d\'Anglais',
    description: 'Formation en anglais pour tous niveaux',
    duree: '6 mois',
    tarif: 25000,
    features: ['Cours interactifs', 'Supports numériques', 'Certification TOEIC', 'Suivi personnalisé'],
    niveau: 'debutant',
    certificat: true,
    category: 'langues',
    icon: '/img/anglais.png',
    image: '/img/anglais.png',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10'
  },
  {
    id: '2',
    nom: 'Initiation à l\'Informatique',
    description: 'Formation de base en informatique',
    duree: '3 mois',
    tarif: 15000,
    features: ['Bases de l\'informatique', 'Bureautique', 'Internet et email', 'Sécurité numérique'],
    niveau: 'debutant',
    certificat: false,
    category: 'informatique',
    icon: '/img/informatique.png',
    image: '/img/informatique.png',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12'
  }
];

export const mockInscriptionsFormationsOuvertes: InscriptionFormationOuverte[] = [
  {
    id: '1',
    nom: 'Ahoua',
    prenom: 'Marie',
    email: 'marie.ahoua@email.com',
    telephone: '+229 11223344',
    formation: 'Cours d\'Anglais',
    recuPaiement: 'recu_fo_001.jpg',
    status: 'pending',
    dateInscription: '2024-06-03'
  }
];

export const mockProjetsFabLab: ProjetFabLab[] = [
  {
    id: '1',
    titre: 'Système d\'arrosage automatique',
    description: 'Projet utilisant Arduino pour automatiser l\'arrosage',
    fichierUrl: '/img/projects/arduino-watering.jpg',
    type: 'photo',
    technologies: ['Arduino', 'Capteurs d\'humidité', 'Pompe à eau', 'Relais'],
    category: 'iot',
    difficulte: 'moyen',
    dureeRealisation: '2 semaines',
    cout: 15000,
    createdAt: '2024-02-01',
    updatedAt: '2024-02-01'
  },
  {
    id: '2',
    titre: 'Maison intelligente',
    description: 'Prototype de maison connectée avec ESP32',
    fichierUrl: '/img/projects/smart-home.jpg',
    type: 'photo',
    technologies: ['ESP32', 'Capteurs', 'LED', 'Moteurs servo'],
    category: 'iot',
    difficulte: 'difficile',
    dureeRealisation: '1 mois',
    cout: 25000,
    createdAt: '2024-02-05',
    updatedAt: '2024-02-05'
  }
];

export const mockEquipementsFabLab: EquipementFabLab[] = [
  {
    id: '1',
    nom: 'Imprimante 3D Creality Ender 3',
    code: 'IMP3D-001',
    description: 'Imprimante 3D pour prototypage rapide',
    tarif: 2000,
    features: ['Volume d\'impression 220x220x250mm', 'Écran LCD', 'Lit chauffant', 'Support PLA/ABS'],
    reference: 'ENDER3-V2',
    prixMensuel: 15000,
    prixAnnuel: 150000,
    image: '/img/machines/creality-ender3.jpg',
    category: 'impression-3d',
    disponible: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '2',
    nom: 'Découpe Laser CO2',
    code: 'LASER-001',
    description: 'Machine de découpe laser pour matériaux variés',
    tarif: 5000,
    features: ['Puissance 60W', 'Surface de travail 400x600mm', 'Compatible bois/acrylique', 'Système de ventilation'],
    reference: 'CO2-LASER-60W',
    prixMensuel: 35000,
    prixAnnuel: 350000,
    image: '/img/machines/latilool-f50.jpg',
    category: 'usinage',
    disponible: true,
    createdAt: '2024-01-02',
    updatedAt: '2024-01-02'
  }
];

export const mockAbonnementsFabLab: AbonnementFabLab[] = [
  {
    id: '1',
    nom: 'Koffi',
    prenom: 'Paul',
    email: 'paul.koffi@email.com',
    telephone: '+229 99887766',
    typeAbonnement: 'Mensuel',
    recuPaiement: 'recu_fab_001.jpg',
    status: 'validated',
    cleAbonnement: 'FAB-2024-001',
    dateAbonnement: '2024-06-01'
  }
];

export const mockReservationsFabLab: ReservationFabLab[] = [
  {
    id: '1',
    utilisateur: 'Paul Koffi',
    cleAbonnement: 'FAB-2024-001',
    machine: 'Imprimante 3D Creality Ender 3',
    dateReservation: '2024-06-10',
    heureDebut: '09:00',
    heureFin: '11:00',
    status: 'active'
  }
];

export const mockEvenements: Evenement[] = [
  {
    id: '1',
    titre: 'Conférence sur l\'Écologie',
    date: '2024-06-15',
    heureDebut: '09:00',
    heureFin: '12:00',
    lieu: 'Amphithéâtre CREC',
    description: 'Conférence sur les enjeux environnementaux actuels',
    image: '/img/ecologie.png',
    organisateur: 'CREC Education',
    maxParticipants: 200,
    couleur: '#10B981',
    type: 'conference',
    statut: 'planifie',
    createdAt: '2024-05-01',
    updatedAt: '2024-05-01'
  },
  {
    id: '2',
    titre: 'Journée Portes Ouvertes',
    date: '2024-06-20',
    heureDebut: '08:00',
    heureFin: '17:00',
    lieu: 'Campus CREC',
    description: 'Découverte du campus et des formations',
    image: '/img/formation.png',
    organisateur: 'CREC Education',
    maxParticipants: 500,
    couleur: '#3B82F6',
    type: 'evenement',
    statut: 'planifie',
    createdAt: '2024-05-10',
    updatedAt: '2024-05-10'
  }
];

export const mockPublicationsVieCampus: PublicationVieCampus[] = [
  {
    id: '1',
    titre: 'Tournoi de Football Inter-Promo',
    description: 'Organisation d\'un tournoi de football entre les différentes promotions',
    date: '2024-06-05',
    images: ['/img/placeholder-project.jpg'],
    createdAt: '2024-06-01',
    updatedAt: '2024-06-01'
  }
];

export const mockOffresEmploi: OffreEmploi[] = [
  {
    id: '1',
    titre: 'Stage Développeur Web',
    domaine: 'Informatique',
    description: 'Stage de 3 mois en développement web front-end',
    duree: '3 mois',
    type: 'stage',
    createdAt: '2024-05-15',
    updatedAt: '2024-05-15'
  }
];

export const mockMessagesContact: MessageContact[] = [
  {
    id: '1',
    nom: 'Martin Dubois',
    email: 'martin.dubois@email.com',
    message: 'Bonjour, je souhaiterais avoir plus d\'informations sur vos formations.',
    dateEnvoi: '2024-06-04',
    status: 'new'
  }
];

export const mockDons: Don[] = [
  {
    id: '1',
    nom: 'Anonyme',
    montant: 50000,
    recuPaiement: 'don_001.jpg',
    status: 'pending',
    dateDon: '2024-06-03'
  }
];

export const mockEmailTemplates: EmailTemplate[] = [
  {
    id: '1',
    type: 'acceptance',
    subject: 'Félicitations - Admission confirmée',
    content: `Bonjour {nom},

Nous avons le plaisir de vous informer que votre candidature a été acceptée pour la filière {filiere}.

Date de rentrée: {date}
Documents à apporter: {documents}

Cordialement,
L'équipe CREC`
  },
  {
    id: '2',
    type: 'rejection',
    subject: 'Suite à votre candidature',
    content: `Bonjour {nom},

Nous vous remercions pour votre candidature. Malheureusement, nous ne pouvons pas donner suite à votre demande pour cette session.

Nous vous encourageons à renouveler votre candidature lors des prochaines sessions.

Cordialement,
L'équipe CREC`
  },
  {
    id: '3',
    type: 'subscription_key',
    subject: 'Votre clé d\'abonnement FabLab',
    content: `Bonjour {nom},

Votre abonnement au FabLab a été validé.

Votre clé d'abonnement: {cle}

Vous pouvez maintenant réserver nos équipements.

Cordialement,
L'équipe FabLab CREC`
  }
];
