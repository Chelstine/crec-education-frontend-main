import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';
// Import direct sans lazy loading pour éviter l'erreur
import AdminContenusFablabPage from '../pages/admin/contenus/AdminContenusFablabPage';

// Import les pages admin avec lazy loading
// Page de connexion (publique)
const AdminLoginPage = lazy(() => import('../pages/admin/AdminLoginPage'));

// Pages du tableau de bord (protégées)
const AdminDashboardPage = lazy(() => import('../pages/admin/AdminDashboardPage'));
const AdminProfilePage = lazy(() => import('../pages/admin/AdminProfilePage'));

// Pages À Propos
const AdminAboutPage = lazy(() => import('../pages/admin/a-propos/AdminAboutPage'));

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

/**
 * Routes pour l'espace administrateur
 * Toutes les routes admin sont sous le préfixe /admin
 * Les routes protégées nécessitent une authentification
 */
const adminRoutes: RouteObject[] = [
  {
    path: 'admin',
    children: [
      {
        // Route de connexion (publique)
        path: 'login',
        element: <AdminLoginPage />,
      },
      {
        // Routes protégées (nécessitent une authentification)
        path: '',
        element: (
          <AdminLayout />
        ),
        children: [
          {
            // Tableau de bord (page d'accueil admin)
            index: true,
            element: (
              <ProtectedRoute adminRequired={true}>
                <AdminDashboardPage />
              </ProtectedRoute>
            ),
          },
          {
            path: 'dashboard',
            element: (
              <ProtectedRoute adminRequired={true}>
                <AdminDashboardPage />
              </ProtectedRoute>
            ),
          },
          {
            path: 'profile',
            element: (
              <ProtectedRoute adminRequired={true}>
                <AdminProfilePage />
              </ProtectedRoute>
            ),
          },
          // Routes pour À Propos
          {
            path: 'a-propos',
            element: (
              <ProtectedRoute adminRequired={true}>
                <AdminAboutPage />
              </ProtectedRoute>
            ),
          },
          // Routes pour la gestion des inscriptions
          {
            path: 'inscriptions',
            children: [
              {
                path: 'istm',
                element: (
                  <ProtectedRoute adminRequired={true}>
                    <AdminInscriptionsISTMPage />
                  </ProtectedRoute>
                ),
              },
              {
                path: 'formations',
                element: (
                  <ProtectedRoute adminRequired={true}>
                    <AdminInscriptionsFormationsPage />
                  </ProtectedRoute>
                ),
              },
              {
                path: 'fablab',
                element: (
                  <ProtectedRoute adminRequired={true}>
                    <AdminInscriptionsFablabPage />
                  </ProtectedRoute>
                ),
              },
            ],
          },
          // Routes pour la gestion des contenus
          {
            path: 'contenus',
            children: [
              {
                path: 'istm',
                element: (
                  <ProtectedRoute adminRequired={true}>
                    <AdminContenusISTMPage />
                  </ProtectedRoute>
                ),
              },
              {
                path: 'formations',
                element: (
                  <ProtectedRoute adminRequired={true}>
                    <AdminContenusFormationsPage />
                  </ProtectedRoute>
                ),
              },
              {
                path: 'fablab',
                element: (
                  <ProtectedRoute adminRequired={true}>
                    <AdminContenusFablabPage />
                  </ProtectedRoute>
                ),
              },
            ],
          },
          // Routes pour la galerie
          {
            path: 'galerie',
            element: (
              <ProtectedRoute adminRequired={true}>
                <AdminGaleriePage />
              </ProtectedRoute>
            ),
          },
          // Routes pour les réservations
          {
            path: 'reservations',
            children: [
              {
                // Route index redirige vers les statistiques
                index: true,
                element: (
                  <ProtectedRoute adminRequired={true}>
                    <AdminReservationsStatsPage />
                  </ProtectedRoute>
                ),
              },
              {
                path: 'stats',
                element: (
                  <ProtectedRoute adminRequired={true}>
                    <AdminReservationsStatsPage />
                  </ProtectedRoute>
                ),
              }
            ],
          },
          // Routes pour la bibliothèque
          {
            path: 'bibliotheque',
            element: (
              <ProtectedRoute adminRequired={true}>
                <AdminBibliotequePage />
              </ProtectedRoute>
            ),
          },
          // Routes pour les paramètres
          {
            path: 'parametres',
            element: (
              <ProtectedRoute adminRequired={true}>
                <AdminParametresPage />
              </ProtectedRoute>
            ),
          },
          // Route pour les utilisateurs et rôles
          {
            path: 'parametres/utilisateurs-roles',
            element: (
              <ProtectedRoute adminRequired={true} requiredRoles={['super_admin']}>
                <AdminUtilisateursRolesPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
];

export default adminRoutes;
