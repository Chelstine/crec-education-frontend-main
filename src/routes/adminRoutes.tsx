import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import AdminProtectedRoute from '../components/admin/AdminProtectedRoute';

// Import les pages admin avec lazy loading
// Page de connexion (publique)
const AdminLoginPage = lazy(() => import('../pages/admin/AdminLoginPage'));

// Pages du tableau de bord (protégées)
const AdminDashboardPage = lazy(() => import('../pages/admin/AdminDashboardPage'));

// Pages À Propos
const AdminAboutPage = lazy(() => import('../pages/admin/a-propos/AdminAboutPage'));

// Pages de gestion des inscriptions
const AdminInscriptionsISTMPage = lazy(() => import('../pages/admin/inscriptions/AdminInscriptionsISTMPage'));
const AdminInscriptionsFormationsPage = lazy(() => import('../pages/admin/inscriptions/AdminInscriptionsFormationsPage'));
const AdminInscriptionsFablabPage = lazy(() => import('../pages/admin/inscriptions/AdminInscriptionsFablabPage'));

// Pages de gestion du contenu
const AdminContenusISTMPage = lazy(() => import('../pages/admin/contenus/AdminContenusISTMPage'));
const AdminContenusFormationsPage = lazy(() => import('../pages/admin/contenus/AdminContenusFormationsPage'));
const AdminContenusFablabPage = lazy(() => import('../pages/admin/contenus/AdminContenusFablabPage'));

// Pages de galerie
const AdminGaleriePage = lazy(() => import('../pages/admin/galerie/AdminGaleriePage'));

// Pages de réservations
const AdminReservationsFablabPage = lazy(() => import('../pages/admin/reservations/AdminReservationsFablabPage'));
const AdminMachinesPrixPage = lazy(() => import('../pages/admin/reservations/AdminMachinesPrixPage'));

// Pages de bibliothèque
const AdminBibliotequePage = lazy(() => import('../pages/admin/bibliotheque/AdminBibliotequePage'));

// Pages de paramètres
const AdminParametresPage = lazy(() => import('../pages/admin/parametres/AdminParametresPage'));
const AdminPrixDatesPage = lazy(() => import('../pages/admin/parametres/AdminPrixDatesPage'));
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
              <AdminProtectedRoute>
                <AdminDashboardPage />
              </AdminProtectedRoute>
            ),
          },
          {
            path: 'dashboard',
            element: (
              <AdminProtectedRoute>
                <AdminDashboardPage />
              </AdminProtectedRoute>
            ),
          },
          // Routes pour À Propos
          {
            path: 'a-propos',
            element: (
              <AdminProtectedRoute>
                <AdminAboutPage />
              </AdminProtectedRoute>
            ),
          },
          // Routes pour la gestion des inscriptions
          {
            path: 'inscriptions',
            children: [
              {
                path: 'istm',
                element: (
                  <AdminProtectedRoute>
                    <AdminInscriptionsISTMPage />
                  </AdminProtectedRoute>
                ),
              },
              {
                path: 'formations',
                element: (
                  <AdminProtectedRoute>
                    <AdminInscriptionsFormationsPage />
                  </AdminProtectedRoute>
                ),
              },
              {
                path: 'fablab',
                element: (
                  <AdminProtectedRoute>
                    <AdminInscriptionsFablabPage />
                  </AdminProtectedRoute>
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
                  <AdminProtectedRoute>
                    <AdminContenusISTMPage />
                  </AdminProtectedRoute>
                ),
              },
              {
                path: 'formations',
                element: (
                  <AdminProtectedRoute>
                    <AdminContenusFormationsPage />
                  </AdminProtectedRoute>
                ),
              },
              {
                path: 'fablab',
                element: (
                  <AdminProtectedRoute>
                    <AdminContenusFablabPage />
                  </AdminProtectedRoute>
                ),
              },
            ],
          },
          // Routes pour la galerie
          {
            path: 'galerie',
            element: (
              <AdminProtectedRoute>
                <AdminGaleriePage />
              </AdminProtectedRoute>
            ),
          },
          // Routes pour les réservations
          {
            path: 'reservations',
            children: [
              {
                path: 'fablab',
                element: (
                  <AdminProtectedRoute>
                    <AdminReservationsFablabPage />
                  </AdminProtectedRoute>
                ),
              },
              {
                path: 'machines-prix',
                element: (
                  <AdminProtectedRoute>
                    <AdminMachinesPrixPage />
                  </AdminProtectedRoute>
                ),
              },
            ],
          },
          // Routes pour la bibliothèque
          {
            path: 'bibliotheque',
            element: (
              <AdminProtectedRoute>
                <AdminBibliotequePage />
              </AdminProtectedRoute>
            ),
          },
          // Routes pour les paramètres
          {
            path: 'parametres',
            children: [
              {
                index: true,
                element: (
                  <AdminProtectedRoute>
                    <AdminParametresPage />
                  </AdminProtectedRoute>
                ),
              },
              {
                path: 'prix-dates',
                element: (
                  <AdminProtectedRoute>
                    <AdminPrixDatesPage />
                  </AdminProtectedRoute>
                ),
              },
              {
                path: 'utilisateurs-roles',
                element: (
                  <AdminProtectedRoute>
                    <AdminUtilisateursRolesPage />
                  </AdminProtectedRoute>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
];

export default adminRoutes;
