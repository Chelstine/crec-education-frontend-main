import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from '@/layouts/MainLayout';
import ReservationLayout from '@/layouts/ReservationLayout';
import ProtectedRoute from '@/components/common/ProtectedRoute';

// Loading component for lazy routes
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

// Lazy load pages to reduce bundle size
// Pages principales
const HomePage = lazy(() => import('@/pages/HomePage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const LegalPage = lazy(() => import('@/pages/LegalPage'));
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));

// Pages À propos - Structures modernisées et optimisées (seulement 3 pages conservées)
const AboutPage = lazy(() => import('@/pages/about/AboutPage')); // Qui sommes-nous
const JesuitesPage = lazy(() => import('@/pages/about/JesuitesPage')); // Histoire Jésuite complète
const EquipePage = lazy(() => import('@/pages/about/EquipePage')); // Notre équipe

// Pages Formations
const FormationsHubPage = lazy(() => import('@/pages/formations/FormationsHubPage'));
const OpenFormationsPage = lazy(() => import('@/pages/formations/OpenFormationsPage'));
const UniversityPage = lazy(() => import('@/pages/formations/UniversityPage'));
const FablabPage = lazy(() => import('@/pages/formations/FablabPage'));
const FablabInscriptionPage = lazy(() => import('@/pages/formations/FablabInscriptionPage'));
const OpenFormationsInscriptionPage = lazy(() => import('@/pages/formations/OpenFormationsInscriptionPage'));
const InscriptionUniversitairePage = lazy(() => import('@/pages/formations/InscriptionUniversitairePage'));

// Pages Réservation
const ReservationPage = lazy(() => import('@/pages/reservation/ReservationPage'));
const SubscriptionPage = lazy(() => import('@/pages/reservation/SubscriptionPage'));
const SubscriptionVerification = lazy(() => import('@/pages/reservation/SubscriptionVerification'));

// Pages News
const NewsPage = lazy(() => import('@/pages/news/NewsPage'));
const ArticlePage = lazy(() => import('@/pages/news/ArticlePage'));
const CampusLifePage = lazy(() => import('@/pages/news/CampusLifePage'));
const StagesPage = lazy(() => import('@/pages/news/StagesPage'));

// Pages Événements
const EventsPage = lazy(() => import('@/pages/events/EventsPage'));
const EventDetailPage = lazy(() => import('@/pages/events/EventDetailPage'));
const CalendarPage = lazy(() => import('@/pages/events/CalendarPage'));

// Pages Dons
const DonatePage = lazy(() => import('@/pages/DonatePage'));

// Pages Admin - Imports centralisés
const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('@/layouts/AdminLayout'));
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const AdminSettings = lazy(() => import('@/pages/admin/AdminSettings'));

// Gestion des formations
const ISTMRManagement = lazy(() => import('@/pages/admin/formations/ISTMRManagement'));
const FabLabFormationsManagement = lazy(() => import('@/pages/admin/formations/FabLabFormationsManagement'));
const FormationsOuvertesManagement = lazy(() => import('@/pages/admin/formations/FormationsOuvertesManagement'));

// Gestion des inscriptions
const InscriptionsISTMR = lazy(() => import('@/pages/admin/inscriptions/InscriptionsISTMR'));
const InscriptionsFabLab = lazy(() => import('@/pages/admin/inscriptions/InscriptionsFabLab'));
const InscriptionsFormationsOuvertes = lazy(() => import('@/pages/admin/inscriptions/InscriptionsFormationsOuvertes'));

// Gestion des événements
const EvenementsManagement = lazy(() => import('@/pages/admin/events/EvenementsManagement'));
const ConferencesManagement = lazy(() => import('@/pages/admin/events/ConferencesManagement'));
const AteliersManagement = lazy(() => import('@/pages/admin/events/AteliersManagement'));

// Gestion des réservations
const ReservationsFabLabManagement = lazy(() => import('@/pages/admin/reservations/ReservationsFabLabManagement'));

// Helper function to wrap lazy components with Suspense
const withSuspense = (Component: React.LazyExoticComponent<React.ComponentType<any>>) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
);

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: withSuspense(HomePage),
      },
      // Pages principales
      {
        path: 'contact',
        element: withSuspense(ContactPage),
      },
      {
        path: 'legal',
        element: withSuspense(LegalPage),
      },
      {
        path: 'privacy',
        element: withSuspense(PrivacyPage),
      },
      {
        path: 'donate',
        element: withSuspense(DonatePage),
      },

      // Pages À propos - Optimisées et modernisées
      {
        path: 'about',
        element: withSuspense(AboutPage),
      },
      {
        path: 'about/jesuites',
        element: withSuspense(JesuitesPage),
      },
      {
        path: 'about/equipe',
        element: withSuspense(EquipePage),
      },

      // Pages Formations
      {
        path: 'formations',
        element: withSuspense(FormationsHubPage),
      },
      {
        path: 'formations/ouvertes',
        element: withSuspense(OpenFormationsPage),
      },
      {
        path: 'formations/ouvertes/inscription',
        element: withSuspense(OpenFormationsInscriptionPage),
      },
      {
        path: 'formations/university',
        element: withSuspense(UniversityPage),
      },
      {
        path: 'formations/university/inscription',
        element: withSuspense(InscriptionUniversitairePage),
      },
      {
        path: 'formations/fablab',
        element: withSuspense(FablabPage),
      },
      {
        path: 'formations/fablab/inscription',
        element: withSuspense(FablabInscriptionPage),
      },

      // Pages Abonnement (sans header)
      {
        path: 'subscription',
        element: withSuspense(SubscriptionPage),
      },
      {
        path: 'subscription-verification',
        element: withSuspense(SubscriptionVerification),
      },

      // Pages News
      {
        path: 'news',
        element: withSuspense(NewsPage),
      },
      {
        path: 'news/campus',
        element: withSuspense(CampusLifePage),
      },
      {
        path: 'news/stages',
        element: withSuspense(StagesPage),
      },
      {
        path: 'news/:id',
        element: withSuspense(ArticlePage),
      },

      // Pages Événements
      {
        path: 'events',
        element: withSuspense(EventsPage),
      },
      {
        path: 'events/:id',
        element: withSuspense(EventDetailPage),
      },
      {
        path: 'calendar',
        element: withSuspense(CalendarPage),
      },

      // 404 - doit être en dernier
      {
        path: '*',
        element: withSuspense(NotFoundPage),
      },
    ],
  },
  // Layout spécial pour les réservations (sans header)
  {
    path: '/reservation',
    element: <ReservationLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute requireAuth={true}>
            {withSuspense(ReservationPage)}
          </ProtectedRoute>
        ),
      },
    ],
  },
  // Routes Admin
  {
    path: '/admin/login',
    element: withSuspense(AdminLogin),
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute adminRequired={true}>
        {withSuspense(AdminLayout)}
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: withSuspense(AdminDashboard),
      },
      // Routes formations spécialisées
      {
        path: 'formations/istmr',
        element: (
          <ProtectedRoute adminRequired={true} permissions={['manage_formations']}>
            {withSuspense(ISTMRManagement)}
          </ProtectedRoute>
        ),
      },
      {
        path: 'formations/fablab',
        element: (
          <ProtectedRoute adminRequired={true} permissions={['manage_formations']}>
            {withSuspense(FabLabFormationsManagement)}
          </ProtectedRoute>
        ),
      },
      {
        path: 'formations/ouvertes',
        element: (
          <ProtectedRoute adminRequired={true} permissions={['manage_formations']}>
            {withSuspense(FormationsOuvertesManagement)}
          </ProtectedRoute>
        ),
      },

      // Routes inscriptions spécialisées
      {
        path: 'inscriptions/istmr',
        element: (
          <ProtectedRoute adminRequired={true} permissions={['manage_inscriptions']}>
            {withSuspense(InscriptionsISTMR)}
          </ProtectedRoute>
        ),
      },
      {
        path: 'inscriptions/fablab',
        element: (
          <ProtectedRoute adminRequired={true} permissions={['manage_inscriptions']}>
            {withSuspense(InscriptionsFabLab)}
          </ProtectedRoute>
        ),
      },
      {
        path: 'inscriptions/ouvertes',
        element: (
          <ProtectedRoute adminRequired={true} permissions={['manage_inscriptions']}>
            {withSuspense(InscriptionsFormationsOuvertes)}
          </ProtectedRoute>
        ),
      },

      // Routes événements
      {
        path: 'events',
        element: (
          <ProtectedRoute adminRequired={true} permissions={['manage_events']}>
            {withSuspense(EvenementsManagement)}
          </ProtectedRoute>
        ),
      },
      {
        path: 'events/conferences',
        element: (
          <ProtectedRoute adminRequired={true} permissions={['manage_events']}>
            {withSuspense(ConferencesManagement)}
          </ProtectedRoute>
        ),
      },
      {
        path: 'events/ateliers',
        element: (
          <ProtectedRoute adminRequired={true} permissions={['manage_events']}>
            {withSuspense(AteliersManagement)}
          </ProtectedRoute>
        ),
      },

      // Routes réservations
      {
        path: 'reservations/fablab',
        element: (
          <ProtectedRoute adminRequired={true} permissions={['manage_reservations']}>
            {withSuspense(ReservationsFabLabManagement)}
          </ProtectedRoute>
        ),
      },

      // Paramètres
      {
        path: 'settings',
        element: (
          <ProtectedRoute adminRequired={true} permissions={['manage_settings']}>
            {withSuspense(AdminSettings)}
          </ProtectedRoute>
        ),
      },

      // Page notifications
      {
        path: 'notifications',
        element: (
          <ProtectedRoute adminRequired={true}>
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-4">Toutes les notifications</h1>
              <p className="text-gray-600">Page en développement - Toutes les notifications seront affichées ici</p>
            </div>
          </ProtectedRoute>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
