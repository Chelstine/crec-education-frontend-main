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
  formationId: string;
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
