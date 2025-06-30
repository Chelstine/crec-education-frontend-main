import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import AdminProtectedRoute from '../components/admin/AdminProtectedRoute';

// Import les pages admin avec lazy loading
// Page de connexion (publique)
const AdminLoginPage = lazy(() => import('@/pages/admin/AdminLoginPage'));

// Pages du tableau de bord (protégées)
const AdminDashboardPage = lazy(() => import('@/pages/admin/AdminDashboardPage'));
const AdminUsersPage = lazy(() => import('@/pages/admin/users/AdminUsersPage'));

// Pages de gestion du contenu
const AdminContentHubPage = lazy(() => import('@/pages/admin/content/AdminContentHubPage'));
const AdminAboutPage = lazy(() => import('@/pages/admin/content/AdminAboutPage'));
const AdminUniversityPage = lazy(() => import('@/pages/admin/content/AdminUniversityPage'));
const AdminFormationsPage = lazy(() => import('@/pages/admin/content/AdminFormationsPage'));
const AdminFablabPage = lazy(() => import('@/pages/admin/content/AdminFablabPage'));
const AdminEventsPage = lazy(() => import('@/pages/admin/content/AdminEventsPage'));

// Pages de gestion des inscriptions
const AdminRegistrationsPage = lazy(() => import('@/pages/admin/registrations/AdminRegistrationsPage'));
const AdminUniversityRegistrationsPage = lazy(() => import('@/pages/admin/registrations/AdminUniversityRegistrationsPage'));
const AdminFormationRegistrationsPage = lazy(() => import('@/pages/admin/registrations/AdminFormationRegistrationsPage'));
const AdminFablabRegistrationsPage = lazy(() => import('@/pages/admin/registrations/AdminFablabRegistrationsPage'));

// Pages de paramètres
const AdminSettingsPage = lazy(() => import('@/pages/admin/settings/AdminSettingsPage'));
const AdminPricingSettingsPage = lazy(() => import('@/pages/admin/settings/AdminPricingSettingsPage'));
const AdminDatesSettingsPage = lazy(() => import('@/pages/admin/settings/AdminDatesSettingsPage'));
const AdminGeneralSettingsPage = lazy(() => import('@/pages/admin/settings/AdminGeneralSettingsPage'));

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
          // Routes pour la gestion des utilisateurs (super admin uniquement)
          {
            path: 'users',
            element: (
              <AdminProtectedRoute requiredRole="super_admin">
                <AdminUsersPage />
              </AdminProtectedRoute>
            ),
          },
          // Routes pour la gestion du contenu
          {
            path: 'content',
            children: [
              {
                index: true,
                element: (
                  <AdminProtectedRoute>
                    <AdminContentHubPage />
                  </AdminProtectedRoute>
                ),
              },
              {
                path: 'about',
                element: (
                  <AdminProtectedRoute>
                    <AdminAboutPage />
                  </AdminProtectedRoute>
                ),
              },
              {
                path: 'university',
                element: (
                  <AdminProtectedRoute>
                    <AdminUniversityPage />
                  </AdminProtectedRoute>
                ),
              },
              {
                path: 'formations',
                element: (
                  <AdminProtectedRoute>
                    <AdminFormationsPage />
                  </AdminProtectedRoute>
                ),
              },
              {
                path: 'fablab',
                element: (
                  <AdminProtectedRoute>
                    <AdminFablabPage />
                  </AdminProtectedRoute>
                ),
              },
              {
                path: 'events',
                element: (
                  <AdminProtectedRoute>
                    <AdminEventsPage />
                  </AdminProtectedRoute>
                ),
              },
            ],
          },
          // Routes pour la gestion des inscriptions
          {
            path: 'registrations',
            children: [
              {
                index: true,
                element: (
                  <AdminProtectedRoute>
                    <AdminRegistrationsPage />
                  </AdminProtectedRoute>
                ),
              },
              {
                path: 'university',
                element: (
                  <AdminProtectedRoute>
                    <AdminUniversityRegistrationsPage />
                  </AdminProtectedRoute>
                ),
              },
              {
                path: 'formations',
                element: (
                  <AdminProtectedRoute>
                    <AdminFormationRegistrationsPage />
                  </AdminProtectedRoute>
                ),
              },
              {
                path: 'fablab',
                element: (
                  <AdminProtectedRoute>
                    <AdminFablabRegistrationsPage />
                  </AdminProtectedRoute>
                ),
              },
            ],
          },
          // Routes pour les paramètres
          {
            path: 'settings',
            children: [
              {
                index: true,
                element: (
                  <AdminProtectedRoute>
                    <AdminSettingsPage />
                  </AdminProtectedRoute>
                ),
              },
              {
                path: 'pricing',
                element: (
                  <AdminProtectedRoute>
                    <AdminPricingSettingsPage />
                  </AdminProtectedRoute>
                ),
              },
              {
                path: 'dates',
                element: (
                  <AdminProtectedRoute>
                    <AdminDatesSettingsPage />
                  </AdminProtectedRoute>
                ),
              },
              {
                path: 'general',
                element: (
                  <AdminProtectedRoute>
                    <AdminGeneralSettingsPage />
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
