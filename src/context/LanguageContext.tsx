
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Types pour les langues supportées
type Language = 'fr' | 'en';

// Types pour le contexte
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Créer le contexte
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Dictionnaires de traduction simplifiés
const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.formations': 'Formations',
    'nav.events': 'Événements',
    'nav.news': 'Actualités',
    'nav.student': 'Étudiants',
    'nav.teacher': 'Enseignants',
    'nav.donate': 'Faire un don',
    'nav.contact': 'Contact',
    'nav.resources': 'Ressources',
    
    // Common
    'common.readMore': 'Lire plus',
    'common.learnMore': 'En savoir plus',
    'common.apply': 'Candidater',
    'common.submit': 'Envoyer',
    'common.cancel': 'Annuler',
    'common.search': 'Rechercher',
    'common.login': 'Se connecter',
    'common.register': 'S\'inscrire',
    'common.download': 'Télécharger',
    'common.contactUs': 'Nous contacter',
    'common.emailAddress': 'Adresse e-mail',
    'common.password': 'Mot de passe',
    
    // Footer
    'footer.rights': 'Tous droits réservés',
    'footer.legal': 'Mentions légales',
    'footer.privacy': 'Politique de confidentialité',
    
    // TODO: Ajouter plus de traductions au fur et à mesure
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.formations': 'Programs',
    'nav.events': 'Events',
    'nav.news': 'News',
    'nav.student': 'Students',
    'nav.teacher': 'Teachers',
    'nav.donate': 'Donate',
    'nav.contact': 'Contact',
    'nav.resources': 'Resources',
    
    // Common
    'common.readMore': 'Read more',
    'common.learnMore': 'Learn more',
    'common.apply': 'Apply',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.search': 'Search',
    'common.login': 'Log in',
    'common.register': 'Register',
    'common.download': 'Download',
    'common.contactUs': 'Contact us',
    'common.emailAddress': 'Email address',
    'common.password': 'Password',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.legal': 'Legal notice',
    'footer.privacy': 'Privacy policy',
    
    // TODO: Ajouter plus de traductions au fur et à mesure
  }
};

// Provider Component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // État pour stocker la langue actuelle
  const [language, setLanguage] = useState<Language>('fr');

  // Fonction de traduction
  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook pour utiliser le contexte de langue
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
