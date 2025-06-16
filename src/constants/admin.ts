// Constantes pour l'administration

// Statuts des inscriptions
export const INSCRIPTION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed'
} as const;

// Statuts des formations
export const FORMATION_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ARCHIVED: 'archived'
} as const;

// Types de formations
export const FORMATION_TYPES = {
  UNIVERSITY: 'university',
  OPEN: 'open',
  FABLAB: 'fablab'
} as const;

// Niveaux de formation
export const FORMATION_LEVELS = {
  DEBUTANT: 'debutant',
  INTERMEDIAIRE: 'intermediaire',
  AVANCE: 'avance',
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced'
} as const;

// Méthodes de paiement
export const PAYMENT_METHODS = {
  MOBILE_MONEY: 'mobile_money',
  BANK: 'bank',
  OFFLINE: 'offline'
} as const;

// Statuts de paiement
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  FAILED: 'failed',
  PAID: 'paid',
  OVERDUE: 'overdue'
} as const;

// Formations ouvertes disponibles
export const FORMATIONS_OUVERTES = [
  { value: "anglais", label: "Anglais", price: "15,000" },
  { value: "francais", label: "Français", price: "12,000" },
  { value: "informatique", label: "Informatique de base", price: "20,000" },
  { value: "bureautique", label: "Bureautique (Word, Excel, PowerPoint)", price: "18,000" },
  { value: "accompagnement", label: "Accompagnement scolaire", price: "10,000" },
  { value: "entrepreneuriat", label: "Entrepreneuriat", price: "25,000" }
] as const;

// Filières ISTMR
export const FILIERES_ISTMR = [
  { value: "informatique", label: "Informatique" },
  { value: "mathematiques", label: "Mathématiques" },
  { value: "recherche", label: "Recherche" }
] as const;

// Types d'adhésion FabLab
export const FABLAB_MEMBERSHIP_TYPES = {
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  YEARLY: 'yearly'
} as const;

// Niveaux d'accès FabLab
export const FABLAB_ACCESS_LEVELS = {
  BASIC: 'basic',
  PREMIUM: 'premium',
  EXPERT: 'expert'
} as const;

// Configuration de pagination
export const PAGINATION = {
  ITEMS_PER_PAGE: 10,
  MAX_VISIBLE_PAGES: 5
} as const;

// Configuration des animations
export const ANIMATION_DELAYS = {
  CARD: 0.1,
  LIST_ITEM: 0.05,
  MODAL: 0.2
} as const;

// Messages d'erreur communs
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'Ce champ est requis',
  INVALID_EMAIL: 'Format d\'email invalide',
  INVALID_PHONE: 'Format de téléphone invalide',
  FILE_TOO_LARGE: 'Fichier trop volumineux',
  INVALID_FILE_TYPE: 'Type de fichier non supporté',
  NETWORK_ERROR: 'Erreur de connexion',
  PERMISSION_DENIED: 'Permissions insuffisantes'
} as const;

// Messages de succès
export const SUCCESS_MESSAGES = {
  SAVE_SUCCESS: 'Enregistré avec succès',
  DELETE_SUCCESS: 'Supprimé avec succès',
  UPDATE_SUCCESS: 'Mis à jour avec succès',
  EMAIL_SENT: 'Email envoyé avec succès'
} as const;

// Types de notifications
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
} as const;

// Statuts des événements
export const EVENEMENT_STATUS = {
  UPCOMING: 'upcoming',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
} as const;

// Types d'événements
export const EVENEMENT_TYPES = {
  CONFERENCE: 'conference',
  WORKSHOP: 'workshop',
  SEMINAR: 'seminar',
  CEREMONY: 'ceremony',
  CULTURAL: 'cultural',
  RELIGIOUS: 'religious'
} as const;

// Types de machines FabLab
export const MACHINE_TYPES = {
  IMPRIMANTE_3D: 'imprimante-3d',
  LASER: 'laser',
  CNC: 'cnc',
  ELECTRONIQUE: 'electronique',
  AUTRE: 'autre'
} as const;

// Statuts des machines
export const MACHINE_STATUS = {
  AVAILABLE: 'available',
  MAINTENANCE: 'maintenance',
  BROKEN: 'broken',
  RESERVED: 'reserved'
} as const;

// Statuts des actualités
export const ACTUALITE_STATUS = {
  PUBLISHED: 'published',
  DRAFT: 'draft',
  ARCHIVED: 'archived'
} as const;

// Types d'actualités
export const ACTUALITE_TYPES = {
  NEWS: 'news',
  ANNOUNCEMENT: 'announcement',
  EVENT: 'event',
  ACADEMIC: 'academic'
} as const;

// Types d'utilisateurs
export const USER_TYPES = {
  ADMIN: 'admin',
  STUDENT: 'student',
  TEACHER: 'teacher',
  STAFF: 'staff',
  MEMBER: 'member'
} as const;

// Rôles d'administration
export const ADMIN_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  EDITOR: 'editor'
} as const;

// Priorités
export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent'
} as const;

// Langues supportées
export const SUPPORTED_LANGUAGES = {
  FR: 'fr',
  EN: 'en'
} as const;
