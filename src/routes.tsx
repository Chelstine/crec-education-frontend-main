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

// Pages À propos
const AboutPage = lazy(() => import('@/pages/about/AboutPage'));
const JesuitesPage = lazy(() => import('@/pages/about/JesuitesPage'));
const IgnacePage = lazy(() => import('@/pages/about/IgnacePage'));
const SaintsPage = lazy(() => import('@/pages/about/SaintsPage'));
const FamilleIgnatiennePage = lazy(() => import('@/pages/about/FamilleIgnatiennePage'));
const EquipePage = lazy(() => import('@/pages/about/EquipePage'));
const CommunautesPage = lazy(() => import('@/pages/about/CommunautesPage'));

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

// Pages Admin
const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('@/layouts/AdminLayout'));
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const FormationsManagement = lazy(() => import('@/pages/admin/FormationsManagement'));
const FormationDetail = lazy(() => import('@/pages/admin/FormationDetail'));
const SectionsManagement = lazy(() => import('@/pages/admin/SectionsManagement'));
const FabLabManagement = lazy(() => import('@/pages/admin/FabLabManagement'));
const InscriptionsManagement = lazy(() => import('@/pages/admin/InscriptionsManagement'));
const PageManagement = lazy(() => import('@/pages/admin/PageManagement'));
const AdminSettings = lazy(() => import('@/pages/admin/AdminSettings'));

// Pages Admin - Formations spécialisées
const ISTMRManagement = lazy(() => import('@/pages/admin/formations/ISTMRManagement'));
const FabLabFormationsManagement = lazy(() => import('@/pages/admin/formations/FabLabFormationsManagement'));
const FormationsOuvertesManagement = lazy(() => import('@/pages/admin/formations/FormationsOuvertesManagement'));

// Pages Admin - Inscriptions spécialisées
const InscriptionsISTMR = lazy(() => import('@/pages/admin/inscriptions/InscriptionsISTMR'));
const InscriptionsFabLab = lazy(() => import('@/pages/admin/inscriptions/InscriptionsFabLab'));
const InscriptionsFormationsOuvertes = lazy(() => import('@/pages/admin/inscriptions/InscriptionsFormationsOuvertes'));

// Pages Admin - Gestion des contenus
const EvenementsManagement = lazy(() => import('@/pages/admin/EvenementsManagement'));
const ActualitesManagement = lazy(() => import('@/pages/admin/ActualitesManagement'));

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

      // Pages À propos
      {
        path: 'about',
        element: withSuspense(AboutPage),
      },
      {
        path: 'about/jesuites',
        element: withSuspense(JesuitesPage),
      },
      {
        path: 'about/ignace',
        element: withSuspense(IgnacePage),
      },
      {
        path: 'about/saints',
        element: withSuspense(SaintsPage),
      },
      {
        path: 'about/famille-ignatienne',
        element: withSuspense(FamilleIgnatiennePage),
      },
      {
        path: 'about/equipe',
        element: withSuspense(EquipePage),
      },
      {
        path: 'about/communautes',
        element: withSuspense(CommunautesPage),
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
          <ProtectedRoute>
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
    element: withSuspense(AdminLayout),
    children: [
      {
        index: true,
        element: withSuspense(AdminDashboard),
      },
      // Routes principales
      {
        path: 'formations',
        element: withSuspense(FormationsManagement),
      },
      {
        path: 'formations/:id',
        element: withSuspense(FormationDetail),
      },
      {
        path: 'evenements',
        element: withSuspense(EvenementsManagement),
      },
      {
        path: 'actualites',
        element: withSuspense(ActualitesManagement),
      },
      // Routes formations spécialisées
      {
        path: 'formations/istmr',
        element: withSuspense(ISTMRManagement),
      },
      {
        path: 'formations/fablab',
        element: withSuspense(FabLabFormationsManagement),
      },
      {
        path: 'formations/ouvertes',
        element: withSuspense(FormationsOuvertesManagement),
      },
      // Routes inscriptions spécialisées
      {
        path: 'inscriptions/istmr',
        element: withSuspense(InscriptionsISTMR),
      },
      {
        path: 'inscriptions/fablab',
        element: withSuspense(InscriptionsFabLab),
      },
      {
        path: 'inscriptions/ouvertes',
        element: withSuspense(InscriptionsFormationsOuvertes),
      },
      // Routes anciennes (à maintenir pour compatibilité)
      {
        path: 'sections',
        element: withSuspense(SectionsManagement),
      },
      {
        path: 'fablab',
        element: withSuspense(FabLabManagement),
      },
      {
        path: 'inscriptions',
        element: withSuspense(InscriptionsManagement),
      },
      {
        path: 'pages',
        element: withSuspense(PageManagement),
      },
      {
        path: 'settings',
        element: withSuspense(AdminSettings),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
