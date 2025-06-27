// Types pour l'application CREC Frontend
// Préparation pour future connexion backend

// ===== TYPES DE BASE =====
export type ApplicationStatus = 'pending' | 'reviewing' | 'accepted' | 'rejected' | 'shortlisted' | 'waitlisted';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type PaymentMethod = 'bank_transfer' | 'mobile_money' | 'cash' | 'card';

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'arduino' | 'esp32' | 'raspberry' | 'iot' | 'impression3d' | 'gravure' | 'art' | 'education';
  date: string;
  technologies: string[];
  machine?: string; // Machine utilisée pour le projet
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  status: 'completed' | 'in-progress' | 'planned';
}

export interface Machine {
  id: string;
  name: string;
  code: string;
  features: string[];
  reference: string;
  imageUrl?: string;
  isAvailable: boolean;
  category: 'printer' | 'laser' | 'electronics' | 'tools';
}

export interface PricingConfig {
  id: string;
  isVisible: boolean;
  services: ServicePricing[];
  machines: MachinePricing[];
  lastUpdated: string;
}

export interface ServicePricing {
  id: string;
  name: string;
  description: string;
  pricePerHour: number;
  currency: 'FCFA';
  includes: string[];
}

export interface MachinePricing {
  machineId: string;
  monthlyPrice: number;
  yearlyPrice: number;
  currency: 'FCFA';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ProjectFilter {
  category?: Project['category'];
  difficulty?: Project['difficulty'];
  status?: Project['status'];
  search?: string;
}

// ===== FORMATIONS OUVERTES =====
export interface OpenFormation {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'langues' | 'informatique' | 'tutorat' | 'professionnelle' | 'technique' | 'art';
  level: 'débutant' | 'intermédiaire' | 'avancé';
  duration: string; // ex: "3 mois", "20h"
  price: number;
  currency: 'FCFA';
  maxStudents: number;
  currentStudents: number;
  instructor: string;
  instructorBio: string;
  imageUrl: string;
  schedule: FormationSchedule[];
  startDate: string;
  endDate: string;
  requirements: string[];
  objectives: string[];
  isActive: boolean;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FormationSchedule {
  day: 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche';
  startTime: string; // "09:00"
  endTime: string;   // "12:00"
}

export interface FormationInscription {
  id: string;
  formationId: string;
  userId?: string;
  studentName?: string;
  participantName?: string;
  studentEmail?: string;
  participantEmail?: string;
  studentPhone?: string;
  participantPhone?: string;
  paymentReceiptUrl?: string;
  paymentAmount?: number;
  amount?: number;
  status: 'pending' | 'paid' | 'validated' | 'rejected' | 'completed' | 'confirmed' | 'cancelled';
  paymentStatus?: 'paid' | 'pending' | 'failed';
  notes?: string;
  inscriptionDate?: string;
  registrationDate?: string;
  validatedAt?: string;
  validatedBy?: string;
}

// ===== STAGES =====
export interface Internship {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  location: string;
  duration: string;
  compensation?: string;
  type: 'stage' | 'emploi' | 'alternance';
  domain: 'informatique' | 'ingénierie' | 'gestion' | 'marketing' | 'autre';
  level: 'licence' | 'master' | 'doctorat' | 'tous';
  applicationDeadline: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  contactEmail: string;
  contactPhone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InternshipApplication {
  id: string;
  internshipId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  currentLevel: string;
  university: string;
  major: string;
  cvUrl: string;
  motivationLetterUrl: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected' | 'shortlisted';
  applicationDate: string;
  notes?: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

// ===== INSCRIPTIONS UNIVERSITAIRES =====
export interface UniversityProgram {
  id: string;
  name: string;
  title?: string; // Alias pour name
  degree: 'licence' | 'master' | 'doctorat';
  level?: string; // Alias pour degree
  department: string;
  description: string;
  longDescription?: string;
  objectives: string[];
  duration: string; // ex: "3 ans", "2 ans"
  requirements: string[];
  tuitionFee: number;
  inscriptionFee: number; // Frais d'inscription séparés
  currency: 'FCFA';
  capacity: number;
  currentApplications: number;
  applicationDeadline: string;
  startDate: string;
  endDate?: string;
  
  // Propriétés pour compatibilité
  value?: string; // ID pour les sélecteurs
  label?: string; // Nom pour affichage
  price?: number; // Alias pour tuitionFee
  documentsRequired?: DocumentType[]; // Alias pour documentTypes
  
  // Détails académiques
  schedule?: ProgramSchedule[];
  courses?: Course[];
  
  // Débouchés et perspectives
  careerOutlooks: string[];
  partnerCompanies?: string[];
  
  // Configuration
  isActive: boolean;
  isVisible: boolean;
  allowOnlineApplication: boolean;
  requiresDocuments: boolean;
  documentTypes: DocumentType[];
  
  // Métadonnées
  imageUrl?: string;
  brochureUrl?: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface ProgramSchedule {
  year: number; // 1ère année, 2ème année, etc.
  semester: number; // 1er semestre, 2ème semestre
  courses: string[];
}

export interface Course {
  id: string;
  code: string;
  name: string;
  isCore: boolean; // Cours obligatoire ou optionnel
  year: number;
  semester: number;
}

export interface DocumentType {
  id: string;
  name: string;
  description: string;
  isRequired: boolean;
  acceptedFormats: string[]; // ['pdf', 'jpg', 'png']
  allowedFormats: string[]; // Alias pour acceptedFormats
  maxSizeBytes: number;
  maxSizeInMB: number; // Taille en MB pour affichage
  validationRules?: DocumentValidationRule;
}

export interface UniversityApplication {
  id: string;
  programId: string;
  programName?: string; // Dénormalisé pour affichage
  program?: UniversityProgram; // Référence complète au programme
  
  // Informations personnelles
  applicantName: string;
  name?: string; // Alias pour applicantName
  applicantEmail: string;
  email?: string; // Alias pour applicantEmail
  applicantPhone: string;
  phone?: string; // Alias pour applicantPhone
  dateOfBirth: string;
  nationality: string;
  address: string;
  city: string;
  country: string;
  gender?: 'M' | 'F';
  
  // Informations académiques
  previousInstitution: string;
  previousDegree: string;
  previousGPA?: number;
  graduationYear: string;
  languageScore?: number;
  
  // Documents soumis
  documents: ApplicationDocument[];
  
  // Paiement frais d'inscription
  inscriptionFeeStatus: 'pending' | 'paid' | 'failed' | 'waived';
  inscriptionFeeAmount?: number;
  paymentReceiptUrl?: string;
  paymentDate?: string;
  paymentMethod?: 'bank_transfer' | 'mobile_money' | 'cash' | 'card';
  paymentReference?: string;
  
  // Évaluation et classement
  aiRanking?: number; // Score IA pour classement automatique
  manualRanking?: number; // Classement manuel
  evaluationNotes?: EvaluationNote[];
  
  // Statut et suivi
  status: 'draft' | 'submitted' | 'documents_pending' | 'payment_pending' | 'under_review' | 'ranked' | 'accepted' | 'rejected' | 'waitlisted' | 'enrolled';
  applicationDate: string;
  submittedAt?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  decisionDate?: string;
  
  // Notes internes
  notes?: string;
  rejectionReason?: string;
  
  // Communication
  emailsSent: EmailLog[];
  lastContactDate?: string;
  
  // Métadonnées
  createdAt: string;
  updatedAt: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface ApplicationDocument {
  id: string;
  documentTypeId: string;
  documentTypeName: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  uploadedAt: string;
  status: 'uploaded' | 'verified' | 'rejected';
  rejectionReason?: string;
  verifiedBy?: string;
  verifiedAt?: string;
}

export interface EvaluationNote {
  criteria: string;
  score: number; // Note sur 20 ou 100
  maxScore: number;
  comment?: string;
  evaluatedBy: string;
  evaluatedAt: string;
}

export interface EmailLog {
  id: string;
  type: 'application_received' | 'documents_incomplete' | 'payment_reminder' | 'under_review' | 'accepted' | 'rejected' | 'waitlisted' | 'enrollment_reminder' | 'acceptance' | 'rejection' | 'subscription_key';
  subject: string;
  sentAt: string;
  sentBy?: string;
  status: 'sent' | 'failed' | 'bounced';
  errorMessage?: string;
}

// ===== FABLAB RÉSERVATIONS =====
export interface Reservation {
  id: string;
  machineId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  projectTitle: string;
  projectDescription: string;
  startDateTime: string;
  endDateTime: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show';
  totalCost: number;
  currency: 'FCFA';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentReceiptUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FabLabSubscription {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  plan: 'monthly' | 'yearly';
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'cancelled' | 'pending';
  paymentReceiptUrl?: string;
  totalAmount: number;
  currency: 'FCFA';
  createdAt: string;
  updatedAt: string;
}

// ===== SYSTÈME D'ABONNEMENT FABLAB =====
export interface FablabMachine {
  id: string;
  name: string;
  description: string;
  category: 'impression' | 'gravure' | 'decoupe' | 'electronique';
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  status: 'available' | 'maintenance' | 'occupied';
  features: string[];
  specifications?: Record<string, string>;
  imageUrl?: string;
  createdAt: string;
  lastUpdated?: string;
}

export interface FablabSubscription {
  id: string;
  userId: string;
  userName: string;
  email: string;
  phone: string;
  type: 'monthly' | 'yearly';
  status: 'active' | 'expired' | 'suspended' | 'pending';
  startDate: string;
  endDate: string;
  createdAt: string;
  subscriptionKey: string; // Clé unique pour vérification
  totalHoursUsed: number; // Total des heures utilisées ce mois
  monthlyHourLimit: number; // Limite d'heures par mois (exemple: 20h/mois pour mensuel, 40h/mois pour annuel)
  currentMonthHours: number; // Heures utilisées ce mois-ci
  isBlocked: boolean; // Bloqué si dépassement
}

export interface MachineHourlyRate {
  machineId: string;
  machineName: string;
  pricePerHour: number; // Prix en FCFA par heure
  currency: 'FCFA';
  category: 'impression3d' | 'gravure_laser' | 'decoupe_laser' | 'electronique' | 'outils';
}

export interface FablabReservation {
  id: string;
  subscriptionId: string;
  machineId: string;
  machineName: string;
  userId: string;
  userName: string;
  startTime: string; // ISO date string
  endTime: string;   // ISO date string
  plannedDuration: number; // En heures
  actualDuration?: number; // En heures (après utilisation)
  hourlyRate: number; // Prix par heure de la machine
  totalCost: number; // Coût total en FCFA
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
  lastUpdated?: string;
}

export interface MachineUsageSession {
  id: string;
  reservationId: string;
  machineId: string;
  userId: string;
  startTime: string;
  endTime?: string;
  duration?: number; // En heures
  cost: number; // Coût en FCFA
  status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface SubscriptionUsageReport {
  subscriptionId: string;
  currentMonth: {
    year: number;
    month: number; // 1-12
    totalHours: number;
    totalCost: number;
    sessionsCount: number;
    machinesUsed: string[];
  };
  monthlyLimit: number;
  remainingHours: number;
  isOverLimit: boolean;
  sessions: MachineUsageSession[];
}

export interface TimeSlot {
  hour: number;
  available: boolean;
  cost?: number;
  isOccupied?: boolean;
  reservationId?: string;
}

// ===== TÉMOIGNAGES =====
export interface Testimonial {
  id: string;
  authorName: string;
  authorEmail: string;
  authorPhoto?: string;
  currentPosition: string;
  graduationYear: string;
  program: string;
  content: string;
  rating: number; // 1-5
  status: 'pending' | 'approved' | 'rejected';
  isVisible: boolean;
  notes?: string;
  approvedAt?: string;
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
}

// ===== UTILISATEURS =====
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'student' | 'instructor';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ===== STATISTIQUES =====
export interface DashboardStats {
  formations: {
    total: number;
    active: number;
    pendingInscriptions: number;
  };
  university: {
    totalApplications: number;
    pendingReview: number;
    acceptedThisYear: number;
  };
  internships: {
    totalOffers: number;
    totalApplications: number;
    pendingApplications: number;
  };
  fablab: {
    totalReservations: number;
    activeSubscriptions: number;
    monthlyRevenue: number;
  };
  testimonials: {
    total: number;
    pending: number;
    approved: number;
  };
}

// ===== FILTRES ET RECHERCHE =====
export interface FormationFilter {
  category?: OpenFormation['category'];
  level?: OpenFormation['level'];
  priceRange?: [number, number];
  search?: string;
  isActive?: boolean;
}

export interface InternshipFilter {
  type?: Internship['type'];
  domain?: Internship['domain'];
  level?: Internship['level'];
  location?: string;
  search?: string;
}

export interface ReservationFilter {
  machineId?: string;
  status?: Reservation['status'];
  dateRange?: [string, string];
  userId?: string;
}

// ===== CONFIGURATION SYSTÈME =====
export interface SystemConfig {
  id: string;
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  theme: 'light' | 'dark' | 'auto';
  language: 'fr' | 'en';
  currency: 'FCFA';
  isMaintenanceMode: boolean;
  updatedAt: string;
}

// ===== TRADUCTION =====
export interface Translation {
  id: string;
  key: string;
  french: string;
  english: string;
  module: string;
  updatedAt: string;
}

export interface Language {
  code: 'fr' | 'en';
  name: string;
  nativeName: string;
  flag: string;
}

// ===== FORMULAIRES DE CONTACT =====
export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

// ===== FORMULAIRES D'INSCRIPTION =====
export interface InscriptionForm {
  name: string;
  email: string;
  formation: string;
  paymentMethod: string;
  phoneNumber: string;
}

// ===== FORMULAIRES DE RÉSERVATION =====
export interface ReservationForm {
  userName: string;
  userEmail: string;
  userPhone: string;
  machineId: string;
  projectTitle: string;
  projectDescription: string;
  startDateTime: string;
  endDateTime: string;
}

// ===== FORMULAIRES DE DONATION =====
export interface DonationForm {
  donorName: string;
  donorEmail: string;
  amount: number;
  frequency: 'unique' | 'mensuel' | 'annuel';
  message?: string;
}

// ===== DONS (ENTITÉ COMPLÈTE) =====
export interface Donation {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  amount: number;
  donationType: 'unique' | 'monthly' | 'yearly';
  isAnonymous: boolean;
  message?: string;
  createdAt: string;
  updatedAt?: string;
}

// ===== ÉVÉNEMENTS =====
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime?: string;
  endTime?: string;
  location: string;
  capacity?: number;
  registeredCount?: number;
  imageUrl?: string;
  image?: string;
  category?: 'information' | 'conference' | 'workshop' | 'ceremony' | string;
  status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ===== ARTICLES =====
export interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  imageUrl?: string;
  category?: string;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

// Pour la gestion des contenus éditables (pages About, etc.)
export interface EditablePage {
  id: string;
  slug: string;
  title: string;
  content: string;
  lastModified: string;
  updatedBy: string;
}

// ===== SYSTÈME DE CLÉS D'ACCÈS FABLAB =====
export interface FormationType {
  id: string;
  title: string;
  description: string;
  category: 'languages' | 'technology' | 'business' | 'arts';
  duration: string;
  level: string;
  price: number;
  capacity: number;
  enrolledCount: number;
  status: 'active' | 'upcoming' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
}

// ===== SYSTÈME DE CLÉS D'ACCÈS FABLAB =====
export interface FablabAccessKey {
  id: string;
  subscriptionId: string;
  userId: string;
  userName: string;
  userEmail: string;
  keyCode: string; // Clé unique générée automatiquement
  status: 'active' | 'revoked' | 'expired';
  validFrom: string;
  validUntil: string;
  lastUsed?: string;
  usageCount: number;
  isEmailSent: boolean;
  sentAt?: string;
  createdAt: string;
  notes?: string;
}

export interface FablabKeyRequest {
  id: string;
  subscriptionId: string;
  userId: string;
  userName: string;
  userEmail: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  validatedBy?: string;
  validatedAt?: string;
  notes?: string;
  keyGenerated?: boolean;
  keyId?: string;
}

// ===== API RESPONSE TYPES =====

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ===== HOOKS ET UTILITAIRES =====
export interface TableColumn<T> {
  key: keyof T;
  header: string;
  render?: (value: any, item: T) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  searchable?: boolean;
  pagination?: boolean;
  itemsPerPage?: number;
  onRowClick?: (item: T) => void;
  className?: string;
}

// ===== SYSTÈME D'EMAIL ET NOTIFICATIONS =====
export interface EmailTemplate {
  id: string;
  type: 'application_received' | 'documents_incomplete' | 'payment_reminder' | 'under_review' | 'accepted' | 'rejected' | 'waitlisted' | 'enrollment_reminder' | 'acceptance' | 'rejection' | 'subscription_key';
  name: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  content?: string;
  variables: EmailVariable[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface EmailVariable {
  name: string;
  description: string;
  type: 'string' | 'number' | 'date' | 'boolean';
  required: boolean;
  defaultValue?: string;
}

export interface EmailConfiguration {
  id: string;
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPassword: string;
  senderEmail: string;
  senderName: string;
  isActive: boolean;
  testMode: boolean; // Pour envoyer uniquement aux emails de test
  testEmails: string[];
  createdAt: string;
  updatedAt: string;
}

export interface NotificationSettings {
  id: string;
  programId?: string; // Null pour paramètres globaux
  
  // Notifications automatiques activées
  autoNotifyOnApplication: boolean;
  autoNotifyOnDocumentUpload: boolean;
  autoNotifyOnPayment: boolean;
  autoNotifyOnStatusChange: boolean;
  
  // Délais pour les rappels
  paymentReminderDays: number[]; // [7, 3, 1] jours avant la deadline
  documentReminderDays: number[];
  
  // Notifications aux responsables
  notifyStaffOnNewApplication: boolean;
  notifyStaffOnPayment: boolean;
  staffNotificationEmails: string[];
  
  // Configuration
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BulkEmailOperation {
  id: string;
  name: string;
  templateId: string;
  recipientFilter: {
    programIds?: string[];
    statuses?: UniversityApplication['status'][];
    dateRange?: {
      start: string;
      end: string;
    };
  };
  recipientCount: number;
  sentCount: number;
  failedCount: number;
  status: 'draft' | 'scheduled' | 'sending' | 'completed' | 'failed';
  scheduledAt?: string;
  startedAt?: string;
  completedAt?: string;
  createdBy: string;
  createdAt: string;
}

// ===== GESTION DOCUMENTAIRE =====
export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  category: 'academic' | 'identity' | 'financial' | 'medical' | 'other';
  acceptedFormats: string[];
  maxSizeBytes: number;
  isRequired: boolean;
  validationRules?: DocumentValidationRule[];
  createdAt: string;
  updatedAt: string;
}

export interface DocumentValidationRule {
  type: 'file_size' | 'file_format' | 'image_quality' | 'text_recognition';
  parameters: Record<string, any>;
  errorMessage: string;
  minSize?: number;
  maxSize?: number;
  allowedExtensions: string[];
  requiresVerification?: boolean;
}

export interface DocumentReview {
  id: string;
  documentId: string;
  reviewedBy: string;
  status: 'approved' | 'rejected' | 'needs_revision';
  comments?: string;
  rejectionReason?: string;
  reviewedAt: string;
}

// ===== RAPPORTS ET STATISTIQUES =====
export interface UniversityDashboardStats {
  totalPrograms: number;
  activePrograms: number;
  totalApplications: number;
  pendingApplications: number;
  acceptedApplications: number;
  rejectedApplications: number;
  totalRevenue: number;
  pendingPayments: number;
  
  // Statistiques par période
  applicationsThisMonth: number;
  applicationsLastMonth: number;
  paymentsThisMonth: number;
  paymentsLastMonth: number;
  
  // Top programmes
  popularPrograms: {
    programId: string;
    programName: string;
    applicationCount: number;
  }[];
  
  // Données pour graphiques
  applicationsByMonth: {
    month: string;
    count: number;
  }[];
  
  applicationsByStatus: {
    status: string;
    count: number;
  }[];
}

// ===== FABLAB PROJETS =====
export interface ProjetFabLab {
  id: string;
  titre: string;
  description: string;
  category: 'iot' | '3d' | 'electronics' | 'automation' | 'art' | 'education';
  difficulte: 'facile' | 'moyen' | 'difficile';
  dureeRealisation: string;
  
  // Média support (nouvelle amélioration)
  fichierUrl?: string; // URL de l'image ou vidéo
  mediaUrl?: string; // Alias pour fichierUrl
  type: 'photo' | 'video';
  mediaType?: 'image' | 'video'; // Alias pour type
  
  // Détails techniques
  technologies: string[];
  materiaux: string[];
  outils: string[];
  instructions: string;
  cout?: number; // Coût en FCFA
  
  // Métadonnées
  auteur: string;
  author?: string; // Alias pour auteur
  featured: boolean;
  likes: number;
  views: number;
  
  // Dates
  createdAt: string;
  updatedAt: string;
}

// ===== EQUIPEMENTS FABLAB =====
export interface EquipementFabLab {
  id: string;
  nom: string;
  code: string;
  description: string;
  tarif: number; // Prix par heure en FCFA
  features: string[];
  reference: string;
  prixMensuel: number;
  prixAnnuel: number;
  image: string;
  category: 'impression-3d' | 'usinage' | 'electronique' | 'outils';
  disponible: boolean;
  createdAt: string;
  updatedAt: string;
}

// ===== ABONNEMENTS FABLAB =====
export interface AbonnementFabLab {
  id: string;
  nom: string;
  prenom?: string;
  email: string;
  telephone: string;
  typeAbonnement: 'etudiant' | 'professionnel' | 'entreprise' | 'Mensuel' | 'Annuel';
  duree: 'mensuel' | 'annuel';
  statut: 'actif' | 'expire' | 'suspendu';
  status?: 'validated' | 'pending' | 'rejected';
  cleAbonnement?: string;
  dateAbonnement?: string;
  dateDebut: string;
  dateFin: string;
  montant: number;
  recuPaiement?: string;
  cleAcces: string;
  heuresUtilisees: number;
  limiteHeures: number;
  createdAt: string;
  updatedAt: string;
}

// ===== RESERVATIONS FABLAB =====
export interface ReservationFabLab {
  id: string;
  utilisateurId: string;
  utilisateur?: string;
  cleAbonnement?: string;
  machine?: string;
  dateReservation?: string;
  heureDebut?: string;
  heureFin?: string;
  status?: 'active' | 'completed' | 'cancelled' | 'pending';
  equipementId: string;
  dateDebut: string;
  dateFin: string;
  duree: number; // en heures
  coutTotal: number;
  statut: 'planifiee' | 'confirmee' | 'en_cours' | 'terminee' | 'annulee';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ===== AUTRES INTERFACES =====
export interface Filiere {
  id: string;
  nom: string;
  description: string;
  niveau: 'licence' | 'master' | 'doctorat';
  duree: string;
  fraisInscription: number;
  capacite: number;
  active: boolean;
  prerequis?: string;
  competences?: string[];
  debouches?: string[];
  profilIdeal?: string;
  image?: string;
  tarif?: number;
  niveauAdmission?: string;
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
  niveau: string;
  statut: 'en_attente' | 'acceptee' | 'refusee';
  status?: 'pending' | 'accepted' | 'rejected';
  documents: string[];
  documentsUpload?: string[];
  recuPaiement?: string;
  montantPaye: number;
  dateInscription: string;
  lettreMotivation?: string;
}

export interface FormationOuverte {
  id: string;
  nom?: string;
  titre: string;
  description: string;
  categorie: string;
  category?: string;
  niveau: string;
  duree: string;
  prix: number;
  tarif?: number;
  features?: string[];
  certificat?: boolean;
  icon?: string;
  image?: string;
  instructeur: string;
  capacite: number;
  inscrits: number;
  dateDebut: string;
  dateFin: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface InscriptionFormationOuverte {
  id: string;
  formationId: string;
  formation?: string;
  nom: string;
  prenom?: string;
  email: string;
  telephone: string;
  recuPaiement?: string;
  statut: 'en_attente' | 'confirmee' | 'annulee';
  status?: 'pending' | 'confirmed' | 'cancelled';
  montantPaye: number;
  dateInscription: string;
}

export interface Evenement {
  id: string;
  titre: string;
  description: string;
  date: string;
  heureDebut?: string;
  heureFin?: string;
  lieu: string;
  organisateur?: string;
  capacite: number;
  maxParticipants?: number;
  participants: number;
  couleur?: string;
  statut?: 'planifie' | 'en_cours' | 'termine' | 'annule';
  type: 'conference' | 'workshop' | 'ceremonie' | 'information' | 'evenement';
  active: boolean;
  image?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PublicationVieCampus {
  id: string;
  titre: string;
  contenu: string;
  description?: string;
  auteur: string;
  date?: string;
  datePublication: string;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
  type: 'actualite' | 'annonce' | 'evenement';
  visible: boolean;
  image?: string;
}

export interface OffreEmploi {
  id: string;
  titre: string;
  entreprise: string;
  description: string;
  domaine?: string;
  duree?: string;
  localisation: string;
  type: 'cdi' | 'cdd' | 'stage' | 'freelance';
  salaire?: string;
  datePublication: string;
  dateExpiration: string;
  createdAt?: string;
  updatedAt?: string;
  active: boolean;
}

export interface MessageContact {
  id: string;
  nom: string;
  email: string;
  sujet: string;
  message: string;
  dateEnvoi?: string;
  status?: 'new' | 'read' | 'replied' | 'archived';
  statut: 'nouveau' | 'lu' | 'repondu' | 'archive';
  dateMessage: string;
}

export interface Don {
  id: string;
  nom?: string;
  donateur: string;
  email: string;
  montant: number;
  type: 'unique' | 'mensuel' | 'annuel';
  statut: 'en_attente' | 'confirme' | 'rembourse';
  status?: 'pending' | 'confirmed' | 'refunded';
  recuPaiement?: string;
  message?: string;
  dateDon: string;
}
