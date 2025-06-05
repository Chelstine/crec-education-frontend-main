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
  createdAt: string;
  updatedAt: string;
}

export interface EquipementFabLab {
  id: string;
  nom: string;
  description: string;
  tarif: number;
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
  description: string;
  couleur: string;
  type: 'evenement' | 'conference';
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
