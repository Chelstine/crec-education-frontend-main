import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';
// Import direct sans lazy loading pour éviter l'erreur
import AdminContenusFablabPage from '../pages/admin/contenus/AdminContenusFablabPage';

// Loading component for lazy admin routes
const AdminLoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

// Import les pages admin avec lazy loading
// Page de connexion (publique)
const AdminLoginPage = lazy(() => import('../pages/admin/AdminLoginPage'));

// Pages du tableau de bord (protégées)
const AdminDashboardPage = lazy(() => import('../pages/admin/AdminDashboardPage'));
const AdminProfilePage = lazy(() => import('../pages/admin/AdminProfilePage'));

// Pages À Propos
const AdminAboutPage = lazy(() => import('../pages/admin/a-propos/AdminAboutPage'));

// Pages d'index pour les sections
const AdminInscriptionsIndexPage = lazy(() => import('../pages/admin/inscriptions/AdminInscriptionsIndexPage'));
const AdminContenusIndexPage = lazy(() => import('../pages/admin/contenus/AdminContenusIndexPage'));

// Pages de gestion des inscriptions
const AdminInscriptionsISTMPage = lazy(() => import('../pages/admin/inscriptions/AdminInscriptionsISTMPage'));
const AdminInscriptionsFormationsPage = lazy(() => import('../pages/admin/inscriptions/AdminInscriptionsFormationsPage'));
const AdminInscriptionsFablabPage = lazy(() => import('../pages/admin/inscriptions/AdminInscriptionsFablabPage'));

// Pages de gestion du contenu
const AdminContenusISTMPage = lazy(() => import('../pages/admin/contenus/AdminContenusISTMPage'));
const AdminContenusFormationsPage = lazy(() => import('../pages/admin/contenus/AdminContenusFormationsPage'));
// AdminContenusFablabPage est importé directement en haut du fichier

// Pages de galerie
const AdminGaleriePage = lazy(() => import('../pages/admin/galerie/AdminGaleriePage'));

// Pages de réservations
const AdminReservationsStatsPage = lazy(() => import('../pages/admin/reservations/AdminReservationsStatsPage'));

// Pages de bibliothèque
const AdminBibliotequePage = lazy(() => import('../pages/admin/bibliotheque/AdminBibliotequePage'));

// Pages de paramètres
const AdminParametresPage = lazy(() => import('../pages/admin/parametres/AdminParametresPage'));
const AdminUtilisateursRolesPage = lazy(() => import('../pages/admin/parametres/AdminUtilisateursRolesPage'));

// Helper function to wrap admin components with Suspense and Protection
const withAdminProtection = (Component: React.LazyExoticComponent<React.ComponentType<any>>, requiredRoles?: string[]) => (
  <ProtectedRoute adminRequired={true} requiredRoles={requiredRoles as any} fallbackPath="/admin/login">
    <Suspense fallback={<AdminLoadingSpinner />}>
      <Component />
    </Suspense>
  </ProtectedRoute>
);

// Helper function for components that require only authentication (no role checking)
const withSimpleAdminProtection = (Component: React.LazyExoticComponent<React.ComponentType<any>>) => (
  <ProtectedRoute simpleAdminAuth={true} fallbackPath="/admin/login">
    <Suspense fallback={<AdminLoadingSpinner />}>
      <Component />
    </Suspense>
  </ProtectedRoute>
);

// Helper function for direct imported components with simple auth
const withDirectSimpleAdminProtection = (Component: React.ComponentType<any>) => (
  <ProtectedRoute simpleAdminAuth={true} fallbackPath="/admin/login">
    <Component />
  </ProtectedRoute>
);

// Helper function for direct imported components
const withDirectAdminProtection = (Component: React.ComponentType<any>, requiredRoles?: string[]) => (
  <ProtectedRoute adminRequired={true} requiredRoles={requiredRoles as any} fallbackPath="/admin/login">
    <Component />
  </ProtectedRoute>
);

/**
 * Routes pour l'espace administrateur
 * Toutes les routes admin sont sous le préfixe /admin
 * SÉCURISÉ : Toutes les routes admin nécessitent une authentification obligatoire
 */
const adminRoutes: RouteObject[] = [
  {
    path: 'admin',
    children: [
      {
        // Route de connexion (publique) - seule route admin accessible sans auth
        path: 'login',
        element: (
          <Suspense fallback={<AdminLoadingSpinner />}>
            <AdminLoginPage />
          </Suspense>
        ),
      },
     
      {
        // TOUTES les autres routes admin sont protégées et nécessitent une authentification
        path: '',
        element: (
          <ProtectedRoute simpleAdminAuth={true} fallbackPath="/admin/login">
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            // Tableau de bord (page d'accueil admin)
            index: true,
            element: withSimpleAdminProtection(AdminDashboardPage),
          },
          {
            path: 'dashboard',
            element: withSimpleAdminProtection(AdminDashboardPage),
          },
          {
            path: 'profile',
            element: withSimpleAdminProtection(AdminProfilePage),
          },
          // Routes pour À Propos (authentification simple, pas de vérification de rôle)
          {
            path: 'a-propos',
            element: withSimpleAdminProtection(AdminAboutPage),
          },
          // Routes pour la gestion des inscriptions
          {
            path: 'inscriptions',
            children: [
              {
                // Page d'index des inscriptions
                index: true,
                element: withSimpleAdminProtection(AdminInscriptionsIndexPage),
              },
              {
                path: 'istm',
                element: withSimpleAdminProtection(AdminInscriptionsISTMPage),
              },
              {
                path: 'formations',
                element: withSimpleAdminProtection(AdminInscriptionsFormationsPage),
              },
              {
                path: 'fablab',
                element: withSimpleAdminProtection(AdminInscriptionsFablabPage),
              },
            ],
          },
          // Routes pour la gestion des contenus
          {
            path: 'contenus',
            children: [
              {
                // Page d'index des contenus
                index: true,
                element: withSimpleAdminProtection(AdminContenusIndexPage),
              },
              {
                path: 'istm',
                element: withSimpleAdminProtection(AdminContenusISTMPage),
              },
              {
                path: 'formations',
                element: withSimpleAdminProtection(AdminContenusFormationsPage),
              },
              {
                path: 'fablab',
                element: withDirectSimpleAdminProtection(AdminContenusFablabPage),
              },
            ],
          },
          // Routes pour la galerie
          {
            path: 'galerie',
            element: withSimpleAdminProtection(AdminGaleriePage),
          },
          // Routes pour les réservations
          {
            path: 'reservations',
            children: [
              {
                // Route index redirige vers les statistiques
                index: true,
                element: withSimpleAdminProtection(AdminReservationsStatsPage),
              },
              {
                path: 'stats',
                element: withSimpleAdminProtection(AdminReservationsStatsPage),
              }
            ],
          },
          // Routes pour la bibliothèque
          {
            path: 'bibliotheque',
            element: withSimpleAdminProtection(AdminBibliotequePage),
          },
          // Routes pour les paramètres (authentification simple, pas de vérification de rôle)
          {
            path: 'parametres',
            element: withSimpleAdminProtection(AdminParametresPage),
          },
          // Route pour les utilisateurs et rôles (Super admin uniquement)
          {
            path: 'parametres/utilisateurs-roles',
            element: withAdminProtection(AdminUtilisateursRolesPage, ['super_admin']),
          },
        ],
      },
    ],
  },
];

export default adminRoutes;
