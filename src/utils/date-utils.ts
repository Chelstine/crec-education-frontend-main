import { format, formatDistance, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

/**
 * Formate une date au format français standard
 * @param dateString Date à formater (string ISO ou objet Date)
 * @param formatStr Format de date personnalisé (optionnel)
 */
export const formatDate = (dateString: string | Date, formatStr: string = 'dd MMMM yyyy'): string => {
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return format(date, formatStr, { locale: fr });
  } catch (error) {
    console.error('Erreur lors du formatage de la date', error);
    return String(dateString);
  }
};

/**
 * Retourne une date relative (ex: "il y a 3 jours")
 * @param dateString Date à formater (string ISO ou objet Date)
 */
export const formatRelativeDate = (dateString: string | Date): string => {
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return formatDistance(date, new Date(), { addSuffix: true, locale: fr });
  } catch (error) {
    console.error('Erreur lors du formatage de la date relative', error);
    return String(dateString);
  }
};

/**
 * Vérifie si une date est dans le futur
 * @param dateString Date à vérifier (string ISO ou objet Date)
 */
export const isFutureDate = (dateString: string | Date): boolean => {
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return date > new Date();
  } catch (error) {
    console.error('Erreur lors de la vérification de la date future', error);
    return false;
  }
};

/**
 * Retourne la durée formatée entre deux dates (ex: "2 jours")
 * @param startDate Date de début
 * @param endDate Date de fin
 */
export const formatDateDuration = (startDate: string | Date, endDate: string | Date): string => {
  try {
    const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
    const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
    return formatDistance(start, end, { locale: fr });
  } catch (error) {
    console.error('Erreur lors du calcul de la durée entre dates', error);
    return '';
  }
};
