// ===========================
//    TYPES INSCRIPTIONS - SECTION MISE À JOUR
// ===========================

// Types pour les statuts d'inscription
export type InscriptionStatus = 'pending' | 'approved' | 'rejected'; // Mis à jour pour correspondre au backend Laravel
export type PaymentStatus = 'not_uploaded' | 'receipt_uploaded' | 'verified' | 'rejected';

// ===========================
//         ROLES (UPDATED)
// ===========================
export type AdminRole = 'super_admin' | 'admin_contenu' | 'admin_inscription';

// Interface de base pour toutes les inscriptions - MISE À JOUR
export interface BaseInscription {
  id: number;
  firstName: string; // Changé pour correspondre au backend Laravel
  lastName: string;  // Changé pour correspondre au backend Laravel
  email: string;
  phone: string;
  status: InscriptionStatus;
  admin_notes?: string;
  processed_at?: string;
  processed_by?: number;
  created_at: string;
  updated_at: string;
  // Relations
  processedBy?: {
    id: number;
    nom: string;
    prenom: string;
    nom_complet: string;
    email: string;
    role: AdminRole;
  };
}

// FabLab Inscription Data (pour l'envoi) - MISE À JOUR
export interface FablabInscriptionData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  workshop: 'Abonnement Etudiant' | 'Abonnement Professionel';
  experience?: string;
  motivation?: string;
  paymentReceipt: File;
}

// FabLab Inscription (réponse backend) - MISE À JOUR
export interface FablabInscription extends BaseInscription {
  workshop: 'Abonnement Etudiant' | 'Abonnement Professionel';
  experience?: string;
  motivation?: string;
  payment_receipt_path: string;
}

// Formation Inscription Data (pour l'envoi) - MISE À JOUR
export interface FormationInscriptionData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  formation: string;
  experience?: string;
  motivation?: string;
  paymentReceipt: File;
}

// Formation Inscription (réponse backend) - MISE À JOUR
export interface FormationInscription extends BaseInscription {
  formation: string;
  experience?: string;
  motivation?: string;
  payment_receipt_path: string;
}

// University Inscription (réponse backend) - MISE À JOUR
export interface UniversityInscription extends BaseInscription {
  program: string;
  last_diploma: string;
  high_school: string;
  dob: string;
  nationality: string;
  gender: 'male' | 'female' | 'other';
  parentNames: string;
  parentPhone: string;
  // Spécifique Licence
  highSchool?: string;
  bacMention?: 'passable' | 'assez-bien' | 'bien' | 'tres-bien';
  graduationYear?: number;
  // Spécifique Master
  licenseYear?: number;
  licenseUniversity?: string;
  documents_path: string;
  agreeToTerms: boolean;
}

// NOUVEAUX TYPES pour les réponses API Admin
export interface DashboardStats {
  fablab: {
    pending: number;
    approved: number;
    rejected: number;
    total: number;
  };
  formations: {
    pending: number;
    approved: number;
    rejected: number;
    total: number;
  };
  university: {
    pending: number;
    approved: number;
    rejected: number;
    total: number;
  };
}

export interface RecentInscription {
  id: number;
  type: 'fablab' | 'formations' | 'university';
  name: string;
  email: string;
  status: InscriptionStatus;
  created_at: string;
  details: string;
}

export interface InscriptionFilters {
  status?: InscriptionStatus;
  admin_notes?: string;
}

// ===========================
//      TYPES FRONTEND PUBLICS
// ===========================

// Les types d'événements sont maintenant définis dans ./events.ts
export * from './events';

// Types pour les formations ouvertes
export interface OpenFormation {
  id: string;
  name?: string; // Backend field name
  title: string; // Frontend display name (alias for name)
  description: string;
  longDescription?: string;
  image?: string;
  duration: string;
  price: number;
  maxParticipants: number;
  startDate: string;
  endDate: string;
  schedule: string;
  prerequisites?: string;
  syllabus: string[];
  instructor: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// Types pour les éléments de galerie - SYNCHRONISÉ AVEC BACKEND GalleryImage
export interface GalleryItem {
  id?: string | number;
  title: string;
  filename?: string;
  original_name?: string;
  path?: string;
  type?: string;
  mime_type?: string;
  size?: number;
  dimensions?: { width?: number; height?: number };
  category?: string;
  related_id?: number;
  related_type?: string;
  description?: string;
  is_featured?: boolean;
  is_published?: boolean;
  photographer?: string;
  location?: string;
  capture_date?: string;
  created_by?: number;
  sort_order?: number;
  tags?: string[];
  // Champs de compatibilité frontend (alias)
  imageUrl?: string; // alias pour path/full_url
  captureDate?: string; // alias pour capture_date  
  isPublished?: boolean; // alias pour is_published
  isFeatured?: boolean; // alias pour is_featured
  order?: number; // alias pour sort_order
  createdAt?: string;
  updatedAt?: string;
}

// Types pour les ressources de bibliothèque - SYNCHRONISÉ AVEC BACKEND LibraryResource
export interface LibraryResource {
  id?: string | number;
  title: string;
  slug?: string;
  author?: string;
  description?: string;
  category?: string;
  type: string;
  publisher?: string;
  publication_year?: number;
  isbn?: string;
  cover_image?: string;
  pdf_url?: string;
  download_url?: string;
  read_online_url?: string;
  is_available: boolean;
  is_digital: boolean;
  download_count?: number;
  file_size?: string;
  language?: string;
  tags?: string[];
  // Champs de compatibilité frontend (alias)
  publicationYear?: number; // alias pour publication_year
  coverImage?: string; // alias pour cover_image  
  pdfUrl?: string; // alias pour pdf_url
  downloadUrl?: string; // alias pour download_url
  readOnlineUrl?: string; // alias pour read_online_url
  isAvailable?: boolean; // alias pour is_available
  isDigital?: boolean; // alias pour is_digital
  createdAt?: string;
  updatedAt?: string;
}

// Types pour les machines FabLab
export interface FablabMachine {
  id: string;
  name: string;
  code?: string;
  type?: string;
  description?: string;
  features?: string[];
  imageUrl?: string;
  image?: string;
  hourlyRate: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// Types pour les projets FabLab
export interface FablabProject {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: string;
  instructions?: string;
  materialsNeeded?: string[];
  imageUrl?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// Types pour les inscriptions aux formations
export interface FormationRegistration {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profession?: string;
  experience?: string;
  motivation?: string;
  paymentMethod: string;
  paymentReference?: string;
  status: string;
  submittedAt: string;
  reviewedAt?: string;
  formationId: string;
}

// Types pour les candidatures universitaires
export interface UniversityApplication {
  id: string;
  programId: string;
  academicYearId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  placeOfBirth: string;
  nationality: string;
  address: string;
  lastDiploma: string;
  lastSchool: string;
  graduationYear: number;
  parentName: string;
  parentPhone: string;
  motivation: string;
  status: string;
  submittedAt: string;
}

// ===========================
//    CONTEXT TYPES (NEW)
// ===========================
export interface AuthContextType {
  user: BackendUser | null;
  setUser: (user: BackendUser | null) => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  mustChangePassword: boolean;
  login: (email: string, password: string) => Promise<{ requiresPasswordChange: boolean }>;
  logout: () => void;
  getCurrentUser: () => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string, confirmPassword: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  hasRole: (roles: AdminRole[]) => boolean;
  clearError: () => void;
  updateProfile: (profileData: { nom: string; prenom: string; email: string }) => Promise<BackendUser>;
}

// ===========================
//      FRONTEND TYPES (UPDATED)
// ===========================
export interface User {
  id: string | number;
  firstname: string;
  lastname: string;
  nom_complet: string; // Nouveau champ du backend
  email: string;
  roles: AdminRole[];
  role: AdminRole; // Role principal
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
  permissions?: string[];
  phone?: string;
  organization?: string;
  // Nouveaux champs pour le changement de mot de passe
  must_change_password?: boolean;
  password_changed_at?: string;
}

// Utilisé côté frontend après conversion
export interface AuthResponse {
  token: string;
  user: User;
}

// ===========================
//      BACKEND TYPES (UPDATED)
// ===========================
export interface BackendUser {
  id: string | number;
  nom: string; // Nouveau: nom de famille
  prenom: string; // Nouveau: prénom
  nom_complet: string; // Nouveau: nom complet calculé
  email: string;
  role: AdminRole; // Nouveau: role direct au lieu de role_id
  avatar?: string;
  is_active?: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
  phone?: string;
  permissions?: string[];
  organization?: string;
  // Nouveaux champs pour le changement de mot de passe
  must_change_password: boolean;
  password_changed?: boolean;
  password_changed_at?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  admin: BackendUser;
}

// ============ Métiers backend pur ==============



export interface BackendFormation {
  id: string | number;
  title: string;
  description?: string;
  long_description?: string;
  image?: string;
  duration?: string;
  price: number;
  max_participants?: number;
  start_date?: string;
  end_date?: string;
  schedule?: string;
  prerequisites?: string;
  syllabus?: string[];
  instructor?: string;
  status: string;
  is_published?: boolean;
  is_featured?: boolean;
  created_at: string;
  updated_at: string;
}

export interface BackendUniversityProgram {
  id: string | number;
  name: string;
  title: string;
  description?: string;
  long_description?: string;
  duration?: string;
  degree?: string;
  level?: string;
  department?: string;
  capacity: number;
  current_applications: number;
  application_deadline?: string;
  start_date?: string;
  tuition_fee: number;
  inscription_fee: number;
  currency: string;
  is_active: boolean;
  is_visible: boolean;
  allow_online_application: boolean;
  requires_documents: boolean;
  created_at: string;
  updated_at: string;
}

export interface BackendFablabMachine {
  id: string | number;
  name: string;
  code?: string;
  type?: string;
  description?: string;
  features?: string[];
  image_url?: string;
  hourly_rate: number;
  status: string;
  requires_training: boolean;
  max_booking_hours: number;
  location?: string;
  created_at: string;
  updated_at: string;
}

export interface BackendFablabSubscription {
  id: string | number;
  public_user_id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  profession?: string;
  subscription_type: string;
  duration: number;
  price: number;
  max_hours_per_month: number;
  start_date?: string;
  end_date?: string;
  payment_method?: string;
  payment_reference?: string;
  subscription_key?: string;
  status: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// BACKEND TYPE - GalleryImage exacte du modèle Laravel
export interface BackendGalleryItem {
  id: string | number;
  title: string;
  filename?: string;
  original_name?: string;
  path: string;
  type?: string;
  mime_type?: string;
  size?: number;
  dimensions?: { width?: number; height?: number };
  category?: string;
  related_id?: number;
  related_type?: string;
  description?: string;
  is_featured: boolean;
  is_published: boolean;
  photographer?: string;
  location?: string;
  capture_date?: string;
  created_by?: number;
  sort_order?: number;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

// BACKEND TYPE - LibraryResource exacte du modèle Laravel
export interface BackendLibraryResource {
  id: string | number;
  title: string;
  slug?: string;
  author?: string;
  description?: string;
  category?: string;
  type: string;
  publisher?: string;
  publication_year?: number;
  isbn?: string;
  cover_image?: string;
  pdf_url?: string;
  download_url?: string;
  read_online_url?: string;
  is_available: boolean;
  is_digital: boolean;
  download_count?: number;
  file_size?: string;
  language?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

// ===========================
//   CONVERSION FONCTIONS (UPDATED)
// ===========================

export function convertBackendUserToFrontend(user: BackendUser): User {
  // Convertir le rôle string en tableau pour compatibilité
  const roles: AdminRole[] = [user.role];

  return {
    id: user.id,
    firstname: user.prenom,
    lastname: user.nom,
    nom_complet: user.nom_complet,
    email: user.email,
    roles,
    role: user.role,
    avatar: user.avatar,
    createdAt: user.created_at,
    lastLogin: user.last_login,
    isActive: user.is_active ?? true,
    permissions: user.permissions || [],
    phone: user.phone,
    organization: user.organization,
    must_change_password: user.must_change_password,
    password_changed_at: user.password_changed_at,
  };
}



export function convertBackendFormationToFrontend(f: BackendFormation): OpenFormation {
  return {
    id: f.id.toString(),
    title: f.title,
    description: f.description || '',
    longDescription: f.long_description,
    image: f.image,
    duration: f.duration || '',
    price: f.price,
    maxParticipants: f.max_participants || 0,
    startDate: f.start_date || '',
    endDate: f.end_date || '',
    schedule: f.schedule || '',
    prerequisites: f.prerequisites,
    syllabus: f.syllabus || [],
    instructor: f.instructor || '',
    status: f.status,
    createdAt: f.created_at,
    updatedAt: f.updated_at,
  };
}

export function convertBackendMachineToFrontend(m: BackendFablabMachine): FablabMachine {
  return {
    id: m.id.toString(),
    name: m.name,
    code: m.code,
    type: m.type,
    description: m.description,
    features: m.features,
    imageUrl: m.image_url,
    image: m.image_url,
    hourlyRate: m.hourly_rate,
    status: m.status,
    createdAt: m.created_at,
    updatedAt: m.updated_at,
  };
}

export function convertBackendGalleryToFrontend(g: BackendGalleryItem): GalleryItem {
  return {
    id: g.id,
    title: g.title,
    filename: g.filename,
    original_name: g.original_name,
    path: g.path,
    type: g.type,
    mime_type: g.mime_type,
    size: g.size,
    dimensions: g.dimensions,
    category: g.category,
    related_id: g.related_id,
    related_type: g.related_type,
    description: g.description,
    is_featured: g.is_featured,
    is_published: g.is_published,
    photographer: g.photographer,
    location: g.location,
    capture_date: g.capture_date,
    created_by: g.created_by,
    sort_order: g.sort_order,
    tags: g.tags || [],
    // Compatibilité frontend (alias)
    imageUrl: g.path ? `/storage/${g.path}` : undefined,
    captureDate: g.capture_date,
    isPublished: g.is_published,
    isFeatured: g.is_featured,
    order: g.sort_order || 0,
    createdAt: g.created_at,
    updatedAt: g.updated_at,
  };
}

export function convertBackendLibraryToFrontend(r: BackendLibraryResource): LibraryResource {
  return {
    id: r.id,
    title: r.title,
    slug: r.slug,
    author: r.author,
    description: r.description,
    category: r.category,
    type: r.type,
    publisher: r.publisher,
    publication_year: r.publication_year,
    isbn: r.isbn,
    cover_image: r.cover_image,
    pdf_url: r.pdf_url,
    download_url: r.download_url,
    read_online_url: r.read_online_url,
    is_available: r.is_available,
    is_digital: r.is_digital,
    download_count: r.download_count,
    file_size: r.file_size,
    language: r.language,
    tags: r.tags || [],
    // Compatibilité frontend (alias)
    publicationYear: r.publication_year,
    coverImage: r.cover_image,
    pdfUrl: r.pdf_url,
    downloadUrl: r.download_url,
    readOnlineUrl: r.read_online_url,
    isAvailable: r.is_available,
    isDigital: r.is_digital,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

// ===========================
//      NOUVEAUX TYPES ADMIN
// ===========================

// Type pour la création d'un admin
export interface CreateAdminRequest {
  nom: string;
  prenom: string;
  email: string;
  role: 'admin_contenu' | 'admin_inscription';
}

// Type pour la mise à jour d'un admin
export interface UpdateAdminRequest {
  nom?: string;
  prenom?: string;
  email?: string;
  role?: 'admin_contenu' | 'admin_inscription';
}

// Type pour le changement de mot de passe
export interface ChangePasswordRequest {
  current_password?: string;
  new_password: string;
  new_password_confirmation: string;
  first_time?: boolean;
}

// Type pour la liste des admins
export interface AdminListItem {
  id: string | number;
  nom: string;
  prenom: string;
  nom_complet: string;
  email: string;
  role: AdminRole;
  password_changed: boolean;
  password_changed_at?: string;
  created_at: string;
}

// ===========================
//         DIVERS TYPES (INCHANGÉS)
// ===========================
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  success?: boolean;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type ContentStatus = 'DRAFT' | 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SubscriptionVerificationResponse {
  success: boolean;
  data?: any;
  message: string;
}

export interface AdminPermissions {
  role: string;
  description: string;
  permissions: string[];
}

// Contact Form Interface
export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  type?: 'general' | 'inscription' | 'partnership' | 'support';
}

export interface ContactSubmissionData extends ContactForm {
  // Données additionnelles si nécessaire
}

export interface ContactSubmissionResponse {
  success: boolean;
  message: string;
  data?: any;
}
