/**
 * Types partagés pour l'application
 */

/**
 * Types pour le FabLab
 */
export interface FablabMachine {
  id: string;
  name: string;
  status: string;
  needsTraining?: boolean;
  code?: string;
  category?: string;
  features?: string[];
  reference?: string;
  monthlyPrice?: number;
  yearlyPrice?: number;
  imageUrl?: string;
  image?: string;
  description?: string;
  specifications?: string[];
  location?: string;
  type?: string;
  hourlyRate?: number;
  requiresTraining?: boolean;
  maxBookingHours?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface FablabProject {
  id: string;
  title: string;
  description: string;
  category: string; // "Prototypage", "Art numérique", etc.
  difficulty: string; // "Débutant", "Intermédiaire", "Avancé"
  duration: string; // "2 heures", "1 journée", etc.
  instructions: string;
  materialsNeeded: string[];
  imageUrl?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FablabReservation {
  id: string;
  subscriptionId?: string;
  machineId: string;
  userId?: string;
  startTime?: string;
  endTime?: string;
  plannedDuration?: number;
  hourlyRate?: number;
  totalCost?: number;
  status: string;
  notes?: string;
  createdAt?: string;
  date?: string;
  slot?: string;
  machineName?: string;
  userName?: string;
}

export interface MachineHourlyRate {
  machineId?: string;
  hourlyRate?: number;
  id?: string;
  name?: string;
  rate?: number;
  currency?: string;
  category?: string;
}

export interface SubscriptionUsageReport {
  subscriptionId?: string;
  currentMonth?: { 
    totalHours: number; 
    sessionsCount: number; 
    lastSession: string 
  };
  previousMonth?: { 
    totalHours: number; 
    sessionsCount: number 
  };
  yearToDate?: { 
    totalHours: number; 
    sessionsCount: number 
  };
  // Nouvelles propriétés pour les limites
  maxHoursPerMonth: number; // Limite selon l'abonnement
  hoursLeft: number; // Heures restantes ce mois
  // Compatibilité ancienne API
  used?: number;
  total?: number;
}

export interface TimeSlot {
  start: string;
  end: string;
}

/**
 * Utilisateur authentifié
 */
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: AdminRole[];
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
  permissions?: string[];
}

/**
 * Types de rôles d'administration
 */
export type AdminRole = 'super_admin' | 'content_admin' | 'inscription_admin';

/**
 * Permissions par rôle
 */
export interface AdminPermissions {
  role: AdminRole;
  permissions: string[];
  description: string;
}

/**
 * Profil utilisateur complet
 */
export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: AdminRole[];
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
  bio?: string;
  phone?: string;
  address?: string;
  preferences?: {
    theme: 'light' | 'dark';
    language: 'fr' | 'en';
    notifications: boolean;
  };
}

/**
 * Réponse d'authentification
 */
export interface AuthResponse {
  token: string;
  user: User;
}

/**
 * Données de formulaire de connexion
 */
export interface LoginFormData {
  email: string;
  password: string;
}

/**
 * Données de formulaire d'inscription
 */
export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
}

/**
 * Données de formulaire de contact
 */
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Pagination pour les requêtes API
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

/**
 * Réponse paginée
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Options de tri
 */
export interface SortOptions {
  field: string;
  order: 'asc' | 'desc';
}

/**
 * Navigation principale
 */
export interface NavItem {
  label: string;
  path: string;
  icon?: string;
  children?: NavItem[];
}

/**
 * Type de notification
 */
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

/**
 * Notification
 */
export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  title?: string;
  autoClose?: boolean;
  duration?: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface InscriptionForm {
  name: string;
  email: string;
  formation: string;
  formationId?: string; // Pour la compatibilité avec l'ancien code
  paymentMethod?: string; // Optionnel car non utilisé partout
  phoneNumber?: string; // Optionnel car non utilisé partout
}

export interface ReservationForm {
  userId: string;
  machineId: string;
  date: string;
  slot: string;
}

export interface DonationForm {
  name: string;
  email: string;
  amount: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  eventType: 'CONFERENCE' | 'WORKSHOP' | 'SEMINAR' | 'OPEN_DAY' | 'GRADUATION' | 'OTHER';
  
  // Dates et lieu
  startDate: string; // DateTime
  endDate?: string; // DateTime
  location: string;
  address?: string;
  
  // Contenu
  image?: string;
  gallery?: string[]; // URLs des images de galerie
  
  // Participants
  maxParticipants?: number;
  currentParticipants: number;
  registrationRequired: boolean;
  registrationDeadline?: string; // DateTime
  
  // Organisateurs/Intervenants  
  speakers?: any[]; // Array d'objets {name, role, image, bio}
  schedule?: any[]; // Array d'objets {time, title, description}
  
  // Publication
  isPublished: boolean;
  isFeatured: boolean;
  
  // Métadonnées
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  creator?: User;
}

export interface Article {
  id: string;
  title: string;
  date: string;
  content: string;
  imageUrl?: string;
}

/**
 * Type pour les éléments de galerie - conforme au schéma Prisma
 */
export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category: string;
  tags: string[];
  photographer?: string;
  location?: string;
  captureDate?: string;
  isPublished: boolean;
  isFeatured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  imageUrl?: string;
}

/**
 * Type pour les méthodes de paiement
 */
// Types d'énumération pour les paiements (unifié)
export type PaymentMethod = 'CASH' | 'TRANSFER' | 'MOBILE_MONEY' | 'CARD' | 'mobile_money' | 'bank_transfer' | 'card' | 'cash' | 'offline';

/**
 * Type pour les documents requis dans les formations et programmes
 */
export interface DocumentType {
  id: string;
  name: string;
  description: string;
  isRequired: boolean;
  maxSizeBytes: number;
  maxSizeInMB: number;
  acceptedFormats: string[];
  allowedFormats: string[];
}

/**
 * Type pour les programmes universitaires
 */
/**
 * Type pour les programmes universitaires - conforme au schéma Prisma
 */
export interface UniversityProgram {
  id: string;
  name: string;
  title: string;
  description: string;
  longDescription?: string;
  duration: string;
  degree: string;
  level: string;
  department: string;
  capacity: number;
  currentApplications: number;
  applicationDeadline: string;
  startDate: string;
  tuitionFee: number;
  inscriptionFee: number;
  currency: string;
  requirements: string[];
  objectives: string[];
  careerOutlooks: string[];
  documentTypes: DocumentType[];
  isActive: boolean;
  isVisible: boolean;
  allowOnlineApplication: boolean;
  requiresDocuments: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Type pour les documents soumis dans une candidature 
 */
export interface SubmittedDocument {
  id: string;
  documentTypeId: string;
  documentTypeName: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  uploadedAt: string;
  status: 'pending' | 'uploaded' | 'verified' | 'rejected';
}

/**
 * Type pour les candidatures aux programmes universitaires - conforme au schéma Prisma
 */
export interface UniversityApplication {
  id?: string;
  
  // Informations personnelles
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  placeOfBirth: string;
  nationality: string;
  address: string;
  
  // Informations académiques
  lastDiploma: string;
  lastSchool: string;
  graduationYear: number;
  averageGrade?: number;
  
  // Informations parents/tuteurs
  parentName?: string;
  parentPhone?: string;
  parentEmail?: string;
  
  // Documents (URLs des fichiers uploadés)
  photoUrl?: string;
  cvUrl?: string;
  diplomaUrl?: string;
  transcriptUrl?: string;
  birthCertificateUrl?: string;
  paymentReceiptUrl?: string;
  
  // Motivation et divers
  motivation: string;
  
  // Statut et métadonnées
  status: ApplicationStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  
  // Relations
  programId: string;
  academicYearId: string;
}

/**
 * Type pour les inscriptions aux formations ouvertes
 */
export interface FormationInscription {
  id: string;
  formationId: string;
  formationTitle?: string;
  formation?: string;
  name?: string;
  applicantName?: string;
  email?: string;
  applicantEmail?: string;
  phoneNumber?: string;
  applicantPhone?: string;
  level?: string;
  motivation?: string;
  paymentMethod: PaymentMethod;
  paymentReference?: string;
  paymentReceiptUrl?: string;
  paymentProofUrl?: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  status: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
  notes?: string;
  documents?: SubmittedDocument[];
  emailSent?: boolean;
  emailContent?: string;
  emailsSent: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Type pour les abonnements au FabLab
 */
export interface FablabSubscription {
  id: string;
  userId?: string;
  user?: User;
  
  // Informations personnelles
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profession?: string;
  
  // Type d'abonnement avec limites
  subscriptionType: 'MONTHLY' | 'QUARTERLY' | 'YEARLY' | 'STUDENT';
  duration: number; // Durée en mois
  price: number; // Prix en FCFA
  maxHoursPerMonth: number; // Limite d'heures par mois selon le plan
  
  // Dates
  startDate: string;
  endDate: string;
  
  // Paiement
  paymentMethod: string;
  paymentReference?: string;
  subscriptionKey: string; // Clé d'accès générée
  
  // Statut
  status: 'PENDING' | 'APPROVED' | 'ACTIVE' | 'EXPIRED' | 'CANCELLED' | 'SUSPENDED';
  isActive: boolean;
  
  // Métadonnées
  createdAt: string;
  updatedAt: string;
  
  // Données héritage (pour compatibilité)
  workshopId?: string;
  workshopTitle?: string;
  workshop?: string;
  name?: string;
  applicantName?: string;
  applicantEmail?: string;
  phoneNumber?: string;
  applicantPhone?: string;
  experience?: 'debutant' | 'intermediaire' | 'avance';
  motivation?: string;
  paymentReceiptUrl?: string;
  paymentProofUrl?: string;
  paymentStatus?: 'pending' | 'paid' | 'failed';
  documents?: SubmittedDocument[];
  emailsSent?: string[];
  accessKey?: string; // Clé d'accès générée après validation
  accessKeyExpiry?: string; // Date d'expiration de la clé
  adminNotes?: string;
  notes?: string;
  emailSent?: boolean;
  emailContent?: string;
}

// Nouveau type pour le rapport d'usage mensuel
export interface FablabUsageReport {
  id: string;
  subscriptionId: string;
  year: number;
  month: number;
  hoursUsed: number;
  sessionsCount: number;
  lastReservation?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Type pour les modèles d'emails
 */
export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  variables: string[];
  type: 'university' | 'formation' | 'fablab';
  category: 'approval' | 'rejection' | 'information' | 'reminder' | 'accessKey';
}

/**
 * Type pour les configuration d'emails transactionnels
 */
export interface EmailConfig {
  senderName: string;
  senderEmail: string;
  replyTo: string;
  footerText: string;
  logo?: string;
}

/**
 * Types d'énumération pour les statuts
 */
export type ContentStatus = 'DRAFT' | 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';

export type ApplicationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';

export type SubscriptionStatus = 'PENDING' | 'ACTIVE' | 'EXPIRED' | 'CANCELLED';

export type SubscriptionType = 'BASIC' | 'PREMIUM' | 'ENTERPRISE';

export type ProgramType = 'LICENCE' | 'MASTER' | 'DOCTORAT';

/**
 * Types pour les formations ouvertes
 */
export interface OpenFormation {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  duration: string; // "3 mois", "6 semaines", etc.
  price: number; // En FCFA
  maxParticipants: number;
  startDate?: string;
  endDate?: string;
  schedule?: string; // "Lundi-Vendredi 9h-12h"
  prerequisites?: string;
  syllabus: string[]; // Contenu du programme
  instructor?: string;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
  registrations?: FormationRegistration[];
}

export interface FormationRegistration {
  id: string;
  // Informations personnelles
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profession?: string;
  experience?: string;
  motivation: string;
  // Paiement
  paymentMethod?: string;
  paymentReference?: string;
  paymentReceiptUrl?: string;
  // Statut et métadonnées
  status: ApplicationStatus;
  submittedAt: string;
  reviewedAt?: string;
  // Relations
  formationId: string;
  formation?: OpenFormation;
}

/**
 * Type pour les années académiques - conforme au schéma Prisma
 */
export interface AcademicYear {
  id: string;
  year: string; // ex: "2024-2025"
  inscriptionStartDate: string;
  inscriptionEndDate: string;
  academicStartDate: string;
  academicEndDate: string;
  isActive: boolean;
  maxPlacesPerProgram: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Enum pour les types de ressources de bibliothèque
 */
export type ResourceType = 'BOOK' | 'ARTICLE' | 'VIDEO' | 'AUDIO' | 'DOCUMENT' | 'RESEARCH';

/**
 * Type pour les ressources de bibliothèque
 */
export interface LibraryResource {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string; // "Philosophie", "Sciences", "Histoire", etc.
  type: ResourceType;
  
  // Publication
  publisher?: string;
  publicationYear?: number;
  isbn?: string;
  
  // Fichiers
  coverImage?: string;
  pdfUrl?: string;
  downloadUrl?: string;
  readOnlineUrl?: string;
  
  // Disponibilité
  isAvailable: boolean;
  isDigital: boolean;
  
  // Métadonnées
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
}

/**
 * Types pour les abonnements FabLab avec limites de réservations
 */
export type SubscriptionPlan = 'etudiant' | 'pro';

export interface SubscriptionLimits {
  etudiant: {
    maxReservations: 15;
    name: 'Étudiant';
  };
  pro: {
    maxReservations: 20;
    name: 'Professionnel';
  };
}

export interface UserSubscription {
  id: string;
  name: string;
  key: string;
  plan: SubscriptionPlan;
  verified: boolean;
  accessHours: string;
  allowedMachines: string[];
  maxReservations: number;
  currentReservations: number;
  isActive: boolean;
  expiresAt: string;
}
