/**
 * Tronque un texte à la longueur spécifiée et ajoute des points de suspension
 * @param text Texte à tronquer
 * @param maxLength Longueur maximale souhaitée
 */
export const truncateText = (text: string, maxLength: number = 100): string => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Convertit les retours à la ligne en éléments HTML <br>
 * @param text Texte à formater
 */
export const nlToBr = (text: string): string => {
  if (!text) return '';
  return text.replace(/\n/g, '<br>');
};

/**
 * Génère un slug SEO-friendly à partir d'un texte
 * @param text Texte à transformer en slug
 */
export const slugify = (text: string): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[àáâäæãåā]/g, 'a')
    .replace(/[èéêëēėę]/g, 'e')
    .replace(/[îïíīįì]/g, 'i')
    .replace(/[ôöòóœøōõ]/g, 'o')
    .replace(/[ûüùúū]/g, 'u')
    .replace(/[ç]/g, 'c')
    .replace(/[ñ]/g, 'n')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Met en majuscule la première lettre d'une chaîne
 * @param text Texte à capitaliser
 */
export const capitalizeFirstLetter = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Extrait l'extension d'un nom de fichier
 * @param filename Nom du fichier
 */
export const getFileExtension = (filename: string): string => {
  if (!filename) return '';
  return filename.split('.').pop() || '';
};

/**
 * Formate un nombre en prix avec devise
 * @param amount Montant à formater
 * @param currency Devise (par défaut EUR)
 */
export const formatPrice = (amount: number, currency: string = 'EUR'): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency
  }).format(amount);
};
