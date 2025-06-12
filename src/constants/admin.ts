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

// Rôles d'administration
export const ADMIN_ROLES = {
  ADMIN: 'admin',
  SUPER_ADMIN: 'super-admin',
  MODERATOR: 'moderator'
} as const;

// Extensions de fichiers autorisées
export const ALLOWED_FILE_EXTENSIONS = {
  IMAGES: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
  DOCUMENTS: ['.pdf', '.doc', '.docx', '.txt'],
  SPREADSHEETS: ['.xls', '.xlsx', '.csv']
} as const;

// Taille maximale des fichiers (en bytes)
export const MAX_FILE_SIZES = {
  IMAGE: 5 * 1024 * 1024, // 5MB
  DOCUMENT: 10 * 1024 * 1024, // 10MB
  SPREADSHEET: 15 * 1024 * 1024 // 15MB
} as const;
