export interface AdminUser {
  id: string;
  username: string;
  email: string;
}

export interface Filiere {
  id: string;
  nom: string;
  description: string;
  duree: string;
  prerequis: string;
  competences: string[];
  debouches: string[];
  profilIdeal: string;
  image?: string;
  tarif: number;
  niveauAdmission: string;
  createdAt: string;
  updatedAt: string;
}

export interface InscriptionIST {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  filiere: string;
  lettreMotivation: string;
  documentsUpload: string[];
  recuPaiement: string;
  status: 'pending' | 'accepted' | 'rejected';
  dateInscription: string;
}

export interface FormationOuverte {
  id: string;
  nom: string;
  description: string;
  duree: string;
  tarif: number;
  features: string[];
  niveau: string;
  certificat: boolean;
  category: string;
  icon?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InscriptionFormationOuverte {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  formation: string;
  recuPaiement: string;
  status: 'pending' | 'validated' | 'rejected';
  dateInscription: string;
}

export interface ProjetFabLab {
  id: string;
  titre: string;
  description: string;
  fichierUrl: string;
  type: 'video' | 'photo';
  technologies: string[];
  category: 'iot' | '3d' | 'electronics' | 'automation';
  difficulte: 'facile' | 'moyen' | 'difficile';
  dureeRealisation: string;
  cout: number;
  createdAt: string;
  updatedAt: string;
}

export interface EquipementFabLab {
  id: string;
  nom: string;
  code: string;
  description: string;
  tarif: number;
  features: string[];
  reference: string;
  prixMensuel: number;
  prixAnnuel: number;
  image?: string;
  category: string;
  disponible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AbonnementFabLab {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  typeAbonnement: string;
  recuPaiement: string;
  status: 'pending' | 'validated' | 'rejected';
  cleAbonnement?: string;
  dateAbonnement: string;
}

export interface ReservationFabLab {
  id: string;
  utilisateur: string;
  cleAbonnement: string;
  machine: string;
  dateReservation: string;
  heureDebut: string;
  heureFin: string;
  status: 'active' | 'completed' | 'cancelled';
}

export interface Evenement {
  id: string;
  titre: string;
  date: string;
  heureDebut: string;
  heureFin: string;
  lieu: string;
  description: string;
  image?: string;
  organisateur: string;
  maxParticipants?: number;
  couleur: string;
  type: 'evenement' | 'conference';
  statut: 'planifie' | 'en_cours' | 'termine' | 'annule';
  createdAt: string;
  updatedAt: string;
}

export interface PublicationVieCampus {
  id: string;
  titre: string;
  description: string;
  date: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface OffreEmploi {
  id: string;
  titre: string;
  domaine: string;
  description: string;
  duree: string;
  type: 'stage' | 'emploi';
  createdAt: string;
  updatedAt: string;
}

export interface MessageContact {
  id: string;
  nom: string;
  email: string;
  message: string;
  dateEnvoi: string;
  status: 'new' | 'read' | 'replied';
}

export interface Don {
  id: string;
  nom: string;
  montant: number;
  recuPaiement: string;
  status: 'pending' | 'validated' | 'rejected';
  dateDon: string;
}

export interface EmailTemplate {
  id: string;
  type: 'acceptance' | 'rejection' | 'subscription_key' | 'contact_reply';
  subject: string;
  content: string;
}
