/**
 * Vérifie si une chaîne est un email valide
 * @param email Email à valider
 */
export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Vérifie si une chaîne est un numéro de téléphone valide (formats internationaux)
 * @param phone Numéro de téléphone à valider
 */
export const isValidPhone = (phone: string): boolean => {
  // Accepte les formats +XX XXX XXX XXX, avec ou sans espaces ou tirets
  const regex = /^(\+?\d{1,3})?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
  return regex.test(phone);
};

/**
 * Vérifie la complexité d'un mot de passe
 * @param password Mot de passe à valider
 * @returns Un objet avec différentes validations et un score global
 */
export const validatePasswordStrength = (password: string) => {
  const results = {
    hasMinLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[^A-Za-z0-9]/.test(password),
    score: 0
  };

  // Calcul du score de 0 à 4
  results.score = Object.values(results)
    .filter(value => value === true)
    .length - 1; // -1 pour exclure la propriété score elle-même

  return results;
};

/**
 * Valide un formulaire d'inscription
 * @param formData Données du formulaire
 * @returns Un objet avec les erreurs éventuelles
 */
export const validateRegistrationForm = (formData: {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
}) => {
  const errors: Record<string, string> = {};

  if (!formData.firstName?.trim()) {
    errors.firstName = 'Le prénom est requis';
  }

  if (!formData.lastName?.trim()) {
    errors.lastName = 'Le nom est requis';
  }

  if (!formData.email?.trim()) {
    errors.email = 'L\'email est requis';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Format d\'email invalide';
  }

  if (!formData.password) {
    errors.password = 'Le mot de passe est requis';
  } else if (formData.password.length < 8) {
    errors.password = 'Le mot de passe doit contenir au moins 8 caractères';
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Les mots de passe ne correspondent pas';
  }

  if (formData.phone && !isValidPhone(formData.phone)) {
    errors.phone = 'Format de téléphone invalide';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

/**
 * Valide un formulaire de contact
 * @param formData Données du formulaire
 * @returns Un objet avec les erreurs éventuelles
 */
export const validateContactForm = (formData: {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}) => {
  const errors: Record<string, string> = {};

  if (!formData.name?.trim()) {
    errors.name = 'Le nom est requis';
  }

  if (!formData.email?.trim()) {
    errors.email = 'L\'email est requis';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Format d\'email invalide';
  }

  if (!formData.subject?.trim()) {
    errors.subject = 'Le sujet est requis';
  }

  if (!formData.message?.trim()) {
    errors.message = 'Le message est requis';
  } else if (formData.message.length < 10) {
    errors.message = 'Le message doit contenir au moins 10 caractères';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
