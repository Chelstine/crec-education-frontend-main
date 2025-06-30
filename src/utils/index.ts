import * as dateUtils from './date-utils';
import * as stringUtils from './string-utils';
import * as validationUtils from './validation-utils';

export {
  dateUtils,
  stringUtils,
  validationUtils
};

// Export des fonctions individuelles pour un import plus simple
export const { 
  formatDate, 
  formatRelativeDate, 
  isFutureDate, 
  formatDateDuration 
} = dateUtils;

export const { 
  truncateText, 
  nlToBr, 
  slugify, 
  capitalizeFirstLetter,
  getFileExtension,
  formatPrice
} = stringUtils;

export const { 
  isValidEmail, 
  isValidPhone, 
  validatePasswordStrength,
  validateRegistrationForm,
  validateContactForm
} = validationUtils;

/**
 * Génère un ID unique
 */
export const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

/**
 * Retarde l'exécution d'une fonction (utile pour les débounces)
 * @param ms Délai en millisecondes
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Sécurise un texte pour l'afficher en HTML (prévient les attaques XSS)
 * @param html Texte à sécuriser
 */
export const sanitizeHtml = (html: string): string => {
  if (!html) return '';
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};
