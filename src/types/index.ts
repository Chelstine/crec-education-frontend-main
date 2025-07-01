/**
 * Types partagés pour l'application
 */

/**
 * Utilisateur authentifié
 */
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  avatar?: string;
  createdAt: string;
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
  date: string;
  location: string;
  status: string;
}

export interface Article {
  id: string;
  title: string;
  date: string;
  content: string;
  imageUrl?: string;
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
export type PaymentMethod = 'mobile_money' | 'bank_transfer' | 'card' | 'cash' | 'offline';

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
export interface UniversityProgram {
  id: string;
  name: string;
  title: string;
  description: string;
  longDescription: string;
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
 * Type pour les candidatures aux programmes universitaires
 */
export interface UniversityApplication {
  id?: string;
  programId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  dateOfBirth?: string;
  nationality?: string;
  gender?: 'M' | 'F' | 'other';
  city?: string;
  address?: string;
  country?: string;
  previousInstitution?: string;
  previousDegree?: string;
  graduationYear?: string;
  documents: SubmittedDocument[];
  status: 'draft' | 'submitted' | 'pending' | 'approved' | 'rejected';
  applicationDate: string;
  inscriptionFeeStatus: 'pending' | 'paid' | 'waived';
  inscriptionFeeAmount: number;
  paymentMethod: PaymentMethod;
  paymentReference?: string;
  notes?: string;
  emailsSent: string[];
  createdAt: string;
  updatedAt: string;
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
  workshopId?: string;
  workshopTitle?: string;
  workshop?: string;
  name?: string;
  applicantName?: string;
  email?: string;
  applicantEmail?: string;
  phoneNumber?: string;
  applicantPhone?: string;
  subscriptionType?: 'workshop' | 'monthly' | 'quarterly' | 'yearly';
  experience?: 'debutant' | 'intermediaire' | 'avance';
  motivation?: string;
  paymentMethod: PaymentMethod;
  paymentReference?: string;
  paymentReceiptUrl?: string;
  paymentProofUrl?: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  status: 'pending' | 'approved' | 'rejected';
  documents?: SubmittedDocument[];
  emailsSent: string[];
  accessKey?: string; // Clé d'accès générée après validation
  accessKeyExpiry?: string; // Date d'expiration de la clé
  adminNotes?: string;
  notes?: string;
  emailSent?: boolean;
  emailContent?: string;
  startDate?: string;
  endDate?: string;
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
