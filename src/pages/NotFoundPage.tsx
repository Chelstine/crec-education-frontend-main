
/* ====== IMPORTS REACT ET HOOKS ====== */
import React from 'react'; // Import de React pour créer des composants JSX

/* ====== IMPORTS NAVIGATION ====== */
import { Link } from 'react-router-dom'; // Composant Link pour la navigation interne sans rechargement de page

/* ====== IMPORTS COMPOSANTS UI ====== */
import { Button } from '@/components/ui/button'; // Composant Button stylisé réutilisable

/* ====== COMPOSANT PRINCIPAL ====== */
// Composant fonctionnel pour la page d'erreur 404 (page non trouvée)
// Ce composant gère l'affichage d'une page d'erreur élégante lorsqu'un utilisateur
// tente d'accéder à une route qui n'existe pas dans l'application
const NotFoundPage = () => {
  return (
    // Structure principale de la page 404 avec centrage vertical et horizontal
    <div className="min-h-screen bg-crec-offwhite flex items-center justify-center p-4">
      {/* Conteneur centré avec largeur maximale pour le contenu */}
      <div className="text-center max-w-md">
        {/* Titre principal : grand nombre "404" en police dorée */}
        <h1 className="text-9xl font-bold text-crec-gold">404</h1>
        
        {/* Sous-titre explicatif en bleu foncé */}
        <h2 className="text-2xl font-semibold text-crec-darkblue mt-4 mb-6">Page non trouvée</h2>
        
        {/* Message d'explication détaillé en gris foncé */}
        <p className="text-crec-darkgray mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
          Veuillez vérifier l'URL ou retourner à l'accueil.
        </p>
        
        {/* Bouton de retour à l'accueil utilisant le composant Button avec Link */}
        {/* asChild permet au Button de rendre un Link au lieu d'un button HTML */}
        <Button asChild variant="default" className="bg-crec-darkblue hover:bg-crec-blue">
          <Link to="/">Retour à l'accueil</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
