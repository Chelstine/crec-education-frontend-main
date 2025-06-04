// Types pour l'application CREC Frontend
// Préparation pour future connexion backend

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
  data: T;
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
  userId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  paymentReceiptUrl?: string;
  paymentAmount: number;
  status: 'pending' | 'paid' | 'validated' | 'rejected' | 'completed';
  adminNotes?: string;
  inscriptionDate: string;
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
  adminNotes?: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

// ===== INSCRIPTIONS UNIVERSITAIRES =====
export interface UniversityProgram {
  id: string;
  name: string;
  degree: 'licence' | 'master' | 'doctorat';
  department: string;
  description: string;
  duration: string;
  requirements: string[];
  tuitionFee: number;
  currency: 'FCFA';
  capacity: number;
  currentApplications: number;
  applicationDeadline: string;
  startDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UniversityApplication {
  id: string;
  programId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  dateOfBirth: string;
  nationality: string;
  address: string;
  
  // Documents
  transcriptUrl?: string;
  diplomaUrl?: string;
  idCardUrl?: string;
  photoUrl?: string;
  
  // Scores et évaluations
  previousGPA?: number;
  languageScore?: number;
  aiRanking?: number; // Score IA pour classement automatique
  
  status: 'draft' | 'submitted' | 'under_review' | 'ranked' | 'accepted' | 'rejected' | 'waitlisted';
  applicationDate: string;
  adminNotes?: string;
  reviewedAt?: string;
  reviewedBy?: string;
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
  adminNotes?: string;
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
  adminNotes?: string;
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
  role: 'student' | 'admin' | 'instructor';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: string;
  updatedAt: string;
}

export interface AdminLoginForm {
  username: string;
  password: string;
}

export interface AdminDashboardStats {
  totalUsers: number;
  totalProjects: number;
  totalDonations: number;
  totalEvents: number;
  totalReservations: number;
  [key: string]: number;
}

export interface AdminTokenResponse {
  token: string;
  user: AdminUser;
}

export interface AdminPermission {
  module: 'formations' | 'stages' | 'university' | 'fablab' | 'testimonials' | 'users' | 'content';
  actions: ('create' | 'read' | 'update' | 'delete')[];
}

// ===== STATISTIQUES ADMIN =====
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
  subject: string;
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

// ===== ÉVÉNEMENTS =====
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
  category?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
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
