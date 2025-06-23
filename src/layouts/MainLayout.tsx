/* ====== IMPORTS NAVIGATION ====== */
import { Outlet } from 'react-router-dom'; // Composant pour rendre les routes enfants

/* ====== IMPORTS COMPOSANTS LAYOUT ====== */
import Header from '@/components/layout/Header'; // En-tête du site avec navigation
import Footer from '@/components/layout/Footer'; // Pied de page du site

/* ====== IMPORTS COMPOSANTS COMMUNS ====== */
import ScrollToTopOnNavigate from '@/components/common/ScrollToTopOnNavigate'; // Scroll automatique en haut lors navigation
import ScrollToTopButton from '@/components/common/ScrollToTopButton'; // Bouton pour remonter en haut de page

/* ====== COMPOSANT PRINCIPAL ====== */
// Layout principal du site public CREC
// Ce composant encapsule toutes les pages publiques avec header, footer et navigation
const MainLayout = () => {
  return (
    // Structure flex column pour étendre sur toute la hauteur de l'écran
    <div className="flex flex-col min-h-screen">
      {/* En-tête avec navigation principale */}
      <Header />
      
      {/* Composant qui gère le scroll automatique lors des changements de page */}
      <ScrollToTopOnNavigate />
      
      {/* Zone de contenu principal qui grandit pour occuper l'espace disponible */}
      <div className="flex-grow">
        {/* Outlet : point de rendu des composants de route enfants */}
        {/* C'est ici que s'affichent HomePage, ContactPage, etc. */}
        <Outlet />
      </div>
      
      {/* Pied de page fixe en bas */}
      <Footer />
      
      {/* Bouton flottant pour remonter en haut de page */}
      <ScrollToTopButton />
    </div>
  );
};

export default MainLayout;
