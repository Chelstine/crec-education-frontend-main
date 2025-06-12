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
} from '@/types';

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
    niveau: 'licence',
    fraisInscription: 25000,
    capacite: 30,
    active: true,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20'
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
    niveau: 'licence',
    fraisInscription: 20000,
    capacite: 25,
    active: true,
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
    niveau: 'licence',
    statut: 'en_attente',
    documents: ['diplome.pdf', 'releves_notes.pdf'],
    lettreMotivation: 'Je souhaite poursuivre mes études en informatique...',
    documentsUpload: ['diplome.pdf', 'releves_notes.pdf'],
    recuPaiement: 'recu_001.jpg',
    status: 'pending',
    montantPaye: 150000,
    dateInscription: '2024-06-01'
  },
  {
    id: '2',
    nom: 'Smith',
    prenom: 'Jane',
    email: 'jane.smith@email.com',
    telephone: '+229 87654321',
    filiere: 'Développement Web',
    niveau: 'licence',
    statut: 'acceptee',
    documents: ['diplome.pdf', 'cv.pdf'],
    lettreMotivation: 'Passionnée par le développement web...',
    documentsUpload: ['diplome.pdf', 'cv.pdf'],
    recuPaiement: 'recu_002.jpg',
    status: 'accepted',
    montantPaye: 120000,
    dateInscription: '2024-06-02'
  }
];

export const mockFormationsOuvertes: FormationOuverte[] = [
  {
    id: '1',
    nom: 'Cours d\'Anglais',
    titre: 'Cours d\'Anglais',
    description: 'Formation en anglais pour tous niveaux',
    categorie: 'langues',
    category: 'langues',
    niveau: 'debutant',
    duree: '6 mois',
    prix: 25000,
    tarif: 25000,
    features: ['Cours interactifs', 'Supports numériques', 'Certification TOEIC', 'Suivi personnalisé'],
    certificat: true,
    icon: '/img/anglais.png',
    image: '/img/anglais.png',
    instructeur: 'Prof. Marie ASSAN',
    capacite: 30,
    inscrits: 15,
    dateDebut: '2024-07-01',
    dateFin: '2024-12-31',
    active: true,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10'
  },
  {
    id: '2',
    nom: 'Initiation à l\'Informatique',
    titre: 'Initiation à l\'Informatique',
    description: 'Formation de base en informatique',
    categorie: 'informatique',
    category: 'informatique',
    niveau: 'debutant',
    duree: '3 mois',
    prix: 15000,
    tarif: 15000,
    features: ['Bases de l\'informatique', 'Bureautique', 'Internet et email', 'Sécurité numérique'],
    certificat: false,
    icon: '/img/informatique.png',
    image: '/img/informatique.png',
    instructeur: 'Ing. Paul KODJO',
    capacite: 25,
    inscrits: 8,
    dateDebut: '2024-06-15',
    dateFin: '2024-09-15',
    active: true,
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
    formationId: '1',
    formation: 'Cours d\'Anglais',
    recuPaiement: 'recu_fo_001.jpg',
    statut: 'en_attente',
    status: 'pending',
    montantPaye: 25000,
    dateInscription: '2024-06-03'
  }
];

export const mockProjetsFabLab: ProjetFabLab[] = [
  {
    id: '1',
    titre: 'Système d\'arrosage automatique Arduino',
    description: 'Projet utilisant Arduino pour automatiser l\'arrosage des plantes avec capteurs d\'humidité et pompe contrôlée',
    fichierUrl: '/img/projects/arduino-watering.jpg',
    mediaUrl: '/img/projects/arduino-watering.jpg',
    type: 'photo',
    mediaType: 'image',
    technologies: ['Arduino', 'Capteurs d\'humidité', 'Pompe à eau', 'Relais', 'Impression 3D'],
    category: 'iot',
    difficulte: 'moyen',
    dureeRealisation: '2-3 heures',
    cout: 15000,
    auteur: 'Ing. Pierre KODJO',
    author: 'Ing. Pierre KODJO',
    instructions: 'Guide complet pour créer un système d\'arrosage automatique intelligent...',
    materiaux: ['Arduino Uno', 'Capteur d\'humidité', 'Pompe à eau', 'Relais', 'Tuyaux'],
    outils: ['Imprimante 3D', 'Fer à souder', 'Multimètre'],
    featured: true,
    likes: 45,
    views: 320,
    createdAt: '2024-02-01',
    updatedAt: '2024-02-01'
  },
  {
    id: '2',
    titre: 'Station météo IoT ESP32',
    description: 'Station météorologique connectée avec ESP32 mesurant température, humidité et pression',
    fichierUrl: '/videos/weather-station-demo.mp4',
    mediaUrl: '/videos/weather-station-demo.mp4',
    type: 'video',
    mediaType: 'video',
    technologies: ['ESP32', 'DHT22', 'BMP280', 'WiFi', 'Web Server'],
    category: 'iot',
    difficulte: 'moyen',
    dureeRealisation: '4-5 heures',
    cout: 12000,
    auteur: 'Ing. Marie ASSAN',
    author: 'Ing. Marie ASSAN',
    instructions: 'Créez votre propre station météo connectée avec affichage web en temps réel...',
    materiaux: ['ESP32', 'DHT22', 'BMP280', 'OLED Display', 'Boîtier imprimé'],
    outils: ['Imprimante 3D', 'Fer à souder', 'Ordinateur'],
    featured: false,
    likes: 28,
    views: 180,
    createdAt: '2024-02-05',
    updatedAt: '2024-02-05'
  },
  {
    id: '3',
    titre: 'Robot éducatif programmable',
    description: 'Robot mobile programmable pour l\'apprentissage de la robotique avec détection d\'obstacles',
    fichierUrl: '/videos/robot-demo.mp4',
    mediaUrl: '/videos/robot-demo.mp4',
    type: 'video',
    mediaType: 'video',
    technologies: ['Arduino Mega', 'Moteurs', 'Capteurs ultrason', 'Bluetooth', 'Programmation'],
    category: 'electronics',
    difficulte: 'difficile',
    dureeRealisation: '1-2 jours',
    cout: 25000,
    auteur: 'Dr. Amina SAGBO',
    author: 'Dr. Amina SAGBO',
    instructions: 'Tutoriel complet pour assembler et programmer votre robot éducatif...',
    materiaux: ['Arduino Mega', 'Moteurs pas-à-pas', 'Capteurs ultrason', 'Châssis imprimé'],
    outils: ['Imprimante 3D', 'Découpeuse laser', 'Kit électronique'],
    featured: true,
    likes: 62,
    views: 480,
    createdAt: '2024-02-10',
    updatedAt: '2024-02-10'
  },
  {
    id: '4',
    titre: 'Prothèse de main imprimée 3D',
    description: 'Prothèse de main fonctionnelle imprimée en 3D avec mécanisme de préhension assistée',
    fichierUrl: '/img/projects/prosthetic-hand.jpg',
    mediaUrl: '/img/projects/prosthetic-hand.jpg',
    type: 'photo',
    mediaType: 'image',
    technologies: ['Impression 3D', 'Servomoteurs', 'Arduino', 'Capteurs de pression'],
    category: '3d',
    difficulte: 'difficile',
    dureeRealisation: '1 semaine',
    cout: 30000,
    auteur: 'Dr. Jean MENSAH',
    author: 'Dr. Jean MENSAH',
    instructions: 'Projet humanitaire pour créer des prothèses fonctionnelles et abordables...',
    materiaux: ['Filament PLA', 'Servomoteurs', 'Capteurs', 'Vis et boulons'],
    outils: ['Imprimante 3D', 'Tournevis', 'Fer à souder'],
    featured: true,
    likes: 89,
    views: 650,
    createdAt: '2024-02-15',
    updatedAt: '2024-02-15'
  },
  {
    id: '5',
    titre: 'Lampe IoT intelligente',
    description: 'Lampe connectée contrôlable via smartphone avec ajustement automatique selon l\'heure',
    fichierUrl: '/img/projects/iot-lamp.jpg',
    mediaUrl: '/img/projects/iot-lamp.jpg',
    type: 'photo',
    mediaType: 'image',
    technologies: ['ESP32', 'LED RGB', 'Photorésistance', 'Application mobile'],
    category: 'iot',
    difficulte: 'facile',
    dureeRealisation: '3-4 heures',
    cout: 8000,
    auteur: 'Ing. Paul ASSAN',
    author: 'Ing. Paul ASSAN',
    instructions: 'Créez une lampe intelligente qui s\'adapte à votre environnement...',
    materiaux: ['ESP32', 'LED RGB', 'Photorésistance', 'Boîtier', 'Alimentation'],
    outils: ['Fer à souder', 'Imprimante 3D'],
    featured: false,
    likes: 34,
    views: 220,
    createdAt: '2024-02-20',
    updatedAt: '2024-02-20'
  },
  {
    id: '6',
    titre: 'Système de sécurité Raspberry Pi',
    description: 'Système de surveillance avec détection de mouvement et capture vidéo',
    fichierUrl: '/videos/security-system-demo.mp4',
    mediaUrl: '/videos/security-system-demo.mp4',
    type: 'video',
    mediaType: 'video',
    technologies: ['Raspberry Pi', 'Caméra', 'PIR', 'Python', 'Notifications'],
    category: 'electronics',
    difficulte: 'moyen',
    dureeRealisation: '6-8 heures',
    cout: 20000,
    auteur: 'Ing. Sarah KONE',
    author: 'Ing. Sarah KONE',
    instructions: 'Montez votre propre système de sécurité avec Raspberry Pi...',
    materiaux: ['Raspberry Pi', 'Caméra Pi', 'Capteur PIR', 'Boîtier'],
    outils: ['Ordinateur', 'Carte SD'],
    featured: false,
    likes: 56,
    views: 340,
    createdAt: '2024-02-25',
    updatedAt: '2024-02-25'
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
    duree: 'mensuel',
    statut: 'actif',
    recuPaiement: 'recu_fab_001.jpg',
    status: 'validated',
    cleAbonnement: 'FAB-2024-001',
    dateAbonnement: '2024-06-01',
    dateDebut: '2024-06-01',
    dateFin: '2024-07-01',
    montant: 15000,
    cleAcces: 'FAB-2024-001',
    heuresUtilisees: 5,
    limiteHeures: 40,
    createdAt: '2024-06-01',
    updatedAt: '2024-06-01'
  }
];

export const mockReservationsFabLab: ReservationFabLab[] = [
  {
    id: '1',
    utilisateurId: '1',
    utilisateur: 'Paul Koffi',
    cleAbonnement: 'FAB-2024-001',
    machine: 'Imprimante 3D Creality Ender 3',
    equipementId: '1',
    dateReservation: '2024-06-10',
    dateDebut: '2024-06-10',
    dateFin: '2024-06-10',
    heureDebut: '09:00',
    heureFin: '11:00',
    duree: 2,
    coutTotal: 4000,
    statut: 'confirmee',
    status: 'active',
    createdAt: '2024-06-09',
    updatedAt: '2024-06-09'
  }
];

export const mockEvenements: Evenement[] = [
  {
    id: '1',
    titre: 'Conférence sur l\'Écologie',
    description: 'Conférence sur les enjeux environnementaux actuels',
    date: '2024-06-15',
    heureDebut: '09:00',
    heureFin: '12:00',
    lieu: 'Amphithéâtre CREC',
    organisateur: 'CREC Education',
    capacite: 200,
    maxParticipants: 200,
    participants: 85,
    couleur: '#10B981',
    statut: 'planifie',
    type: 'conference',
    active: true,
    image: '/img/ecologie.png',
    createdAt: '2024-05-01',
    updatedAt: '2024-05-01'
  },
  {
    id: '2',
    titre: 'Journée Portes Ouvertes',
    description: 'Découverte du campus et des formations',
    date: '2024-06-20',
    heureDebut: '08:00',
    heureFin: '17:00',
    lieu: 'Campus CREC',
    organisateur: 'CREC Education',
    capacite: 500,
    maxParticipants: 500,
    participants: 320,
    couleur: '#3B82F6',
    statut: 'planifie',
    type: 'evenement',
    active: true,
    image: '/img/formation.png',
    createdAt: '2024-05-10',
    updatedAt: '2024-05-10'
  }
];

export const mockPublicationsVieCampus: PublicationVieCampus[] = [
  {
    id: '1',
    titre: 'Tournoi de Football Inter-Promo',
    contenu: 'Organisation d\'un tournoi de football entre les différentes promotions du CREC. Une journée sportive pour renforcer les liens entre étudiants.',
    description: 'Organisation d\'un tournoi de football entre les différentes promotions',
    auteur: 'Association des Étudiants CREC',
    date: '2024-06-05',
    datePublication: '2024-06-01',
    images: ['/img/placeholder-project.jpg'],
    type: 'evenement',
    visible: true,
    image: '/img/placeholder-project.jpg',
    createdAt: '2024-06-01',
    updatedAt: '2024-06-01'
  }
];

export const mockOffresEmploi: OffreEmploi[] = [
  {
    id: '1',
    titre: 'Stage Développeur Web',
    entreprise: 'TechCorp Bénin',
    domaine: 'Informatique',
    description: 'Stage de 3 mois en développement web front-end',
    duree: '3 mois',
    localisation: 'Cotonou, Bénin',
    type: 'stage',
    salaire: '100,000 FCFA/mois',
    datePublication: '2024-05-15',
    dateExpiration: '2024-07-15',
    active: true,
    createdAt: '2024-05-15',
    updatedAt: '2024-05-15'
  }
];

export const mockMessagesContact: MessageContact[] = [
  {
    id: '1',
    nom: 'Martin Dubois',
    email: 'martin.dubois@email.com',
    sujet: 'Demande d\'informations',
    message: 'Bonjour, je souhaiterais avoir plus d\'informations sur vos formations.',
    dateEnvoi: '2024-06-04',
    dateMessage: '2024-06-04',
    statut: 'nouveau'
  }
];

export const mockDons: Don[] = [
  {
    id: '1',
    nom: 'Anonyme',
    donateur: 'Anonyme',
    email: 'anonymous@crec.bj',
    montant: 50000,
    type: 'unique',
    statut: 'en_attente',
    recuPaiement: 'don_001.jpg',
    status: 'pending',
    dateDon: '2024-06-03'
  }
];

export const mockEmailTemplates: EmailTemplate[] = [
  {
    id: '1',
    type: 'accepted',
    name: 'Acceptation candidature',
    subject: 'Félicitations - Admission confirmée',
    htmlContent: `<p>Bonjour {nom},</p><p>Nous avons le plaisir de vous informer que votre candidature a été acceptée pour la filière {filiere}.</p><p>Date de rentrée: {date}<br>Documents à apporter: {documents}</p><p>Cordialement,<br>L'équipe CREC</p>`,
    textContent: `Bonjour {nom},\n\nNous avons le plaisir de vous informer que votre candidature a été acceptée pour la filière {filiere}.\n\nDate de rentrée: {date}\nDocuments à apporter: {documents}\n\nCordialement,\nL'équipe CREC`,
    content: `Bonjour {nom},

Nous avons le plaisir de vous informer que votre candidature a été acceptée pour la filière {filiere}.

Date de rentrée: {date}
Documents à apporter: {documents}

Cordialement,
L'équipe CREC`,
    variables: [],
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '2',
    type: 'rejected',
    name: 'Refus candidature',
    subject: 'Suite à votre candidature',
    htmlContent: `<p>Bonjour {nom},</p><p>Nous vous remercions pour votre candidature. Malheureusement, nous ne pouvons pas donner suite à votre demande pour cette session.</p><p>Nous vous encourageons à renouveler votre candidature lors des prochaines sessions.</p><p>Cordialement,<br>L'équipe CREC</p>`,
    textContent: `Bonjour {nom},\n\nNous vous remercions pour votre candidature. Malheureusement, nous ne pouvons pas donner suite à votre demande pour cette session.\n\nNous vous encourageons à renouveler votre candidature lors des prochaines sessions.\n\nCordialement,\nL'équipe CREC`,
    content: `Bonjour {nom},

Nous vous remercions pour votre candidature. Malheureusement, nous ne pouvons pas donner suite à votre demande pour cette session.

Nous vous encourageons à renouveler votre candidature lors des prochaines sessions.

Cordialement,
L'équipe CREC`,
    variables: [],
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '3',
    type: 'enrollment_reminder',
    name: 'Clé abonnement FabLab',
    subject: 'Votre clé d\'abonnement FabLab',
    htmlContent: `<p>Bonjour {nom},</p><p>Votre abonnement au FabLab a été validé.</p><p>Votre clé d'abonnement: <strong>{cle}</strong></p><p>Vous pouvez maintenant réserver nos équipements.</p><p>Cordialement,<br>L'équipe FabLab CREC</p>`,
    textContent: `Bonjour {nom},\n\nVotre abonnement au FabLab a été validé.\n\nVotre clé d'abonnement: {cle}\n\nVous pouvez maintenant réserver nos équipements.\n\nCordialement,\nL'équipe FabLab CREC`,
    content: `Bonjour {nom},

Votre abonnement au FabLab a été validé.

Votre clé d'abonnement: {cle}

Vous pouvez maintenant réserver nos équipements.

Cordialement,
L'équipe FabLab CREC`,
    variables: [],
    isActive: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
];
