import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from '@/layouts/MainLayout';
import AdminLayout from '@/layouts/AdminLayout';
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

// Pages Témoignages
const TestimonialsPage = lazy(() => import('@/pages/TestimonialsPage'));

// Pages Admin
const AdminLoginPage = lazy(() => import('@/pages/admin/AdminLoginPage'));
const AdminDashboardPage = lazy(() => import('@/pages/admin/AdminDashboardPage'));
const ContactsAdminPage = lazy(() => import('@/pages/admin/ContactsAdminPage'));
const DonsAdminPage = lazy(() => import('@/pages/admin/DonsAdminPage'));

// Nouvelles pages Admin
const AdminExportPage = lazy(() => import('@/pages/admin/AdminExportPage'));
const AdminFablabSubscriptionsPage = lazy(() => import('@/pages/admin/AdminFablabSubscriptionsPage'));
const AdminDonationsPage = lazy(() => import('@/pages/admin/AdminDonationsPage'));
const AdminDuplicateFilesPage = lazy(() => import('@/pages/admin/AdminDuplicateFilesPage'));

// Pages Admin - Formations
const FilieresAdminPage = lazy(() => import('@/pages/admin/formations/FilieresAdminPage'));
const InscriptionsISTAdminPage = lazy(() => import('@/pages/admin/formations/InscriptionsISTAdminPage'));
const FormationsOuvertesAdminPage = lazy(() => import('@/pages/admin/formations/FormationsOuvertesAdminPage'));
const InscriptionsFormationsOuvertesAdminPage = lazy(() => import('@/pages/admin/formations/InscriptionsFormationsOuvertesAdminPage'));

// Pages Admin - FabLab
const ProjetsAdminPage = lazy(() => import('@/pages/admin/fablab/ProjetsAdminPage'));
const EquipementsAdminPage = lazy(() => import('@/pages/admin/fablab/EquipementsAdminPage'));
const AbonnementsAdminPage = lazy(() => import('@/pages/admin/fablab/AbonnementsAdminPage'));
const ReservationsAdminPage = lazy(() => import('@/pages/admin/fablab/ReservationsAdminPage'));

// Pages Admin - Événements
const CalendrierAdminPage = lazy(() => import('@/pages/admin/evenements/CalendrierAdminPage'));
const ConferencesAdminPage = lazy(() => import('@/pages/admin/evenements/ConferencesAdminPage'));

// Pages Admin - Actualités
const VieCampusAdminPage = lazy(() => import('@/pages/admin/actualites/VieCampusAdminPage'));
const StagesEmploisAdminPage = lazy(() => import('@/pages/admin/actualites/StagesEmploisAdminPage'));

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
      { index: true, element: withSuspense(HomePage) },

      // À propos
      { path: 'about', element: withSuspense(AboutPage) },
      { path: 'about/jesuites', element: withSuspense(JesuitesPage) },
      { path: 'about/ignace', element: withSuspense(IgnacePage) },
      { path: 'about/saints', element: withSuspense(SaintsPage) },
      { path: 'about/famille-ignatienne', element: withSuspense(FamilleIgnatiennePage) },
      { path: 'about/equipe', element: withSuspense(EquipePage) },
      { path: 'about/communautes', element: withSuspense(CommunautesPage) },

      // Formations - Page principale (hub)
      { path: 'formations', element: withSuspense(FormationsHubPage) },
      
      // Formations Ouvertes - Page de présentation
      { path: 'formations/open', element: withSuspense(OpenFormationsPage) },
      { path: 'formations/open/inscription', element: withSuspense(OpenFormationsInscriptionPage) },
      
      // Formations Universitaires
      { path: 'formations/university', element: withSuspense(UniversityPage) },
      { path: 'formations/university/inscription', element: withSuspense(InscriptionUniversitairePage) },
      
      // Formations FABLAB
      { path: 'formations/fablab', element: withSuspense(FablabPage) },
      { path: 'formations/fablab/inscription', element: withSuspense(FablabInscriptionPage) },
      
      // Souscription et vérification
      { path: 'subscription', element: withSuspense(SubscriptionPage) },
      { path: 'subscription-verification', element: withSuspense(SubscriptionVerification) },

      // Réservation (protégée)
      {
        path: 'reservation',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <ReservationPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },

      // News
      { path: 'news', element: withSuspense(NewsPage) },
      { path: 'news/:id', element: withSuspense(ArticlePage) },
      { path: 'news/campus-life', element: withSuspense(CampusLifePage) },
      { path: 'news/stages', element: withSuspense(StagesPage) },

      // Témoignages
      { path: 'testimonials', element: withSuspense(TestimonialsPage) },

      // Événements
      { path: 'events', element: withSuspense(EventsPage) },
      { path: 'events/:id', element: withSuspense(EventDetailPage) },
      { path: 'events/calendar', element: withSuspense(CalendarPage) },

      // Dons
      { path: 'donate', element: withSuspense(DonatePage) },

      // Contact
      { path: 'contact', element: withSuspense(ContactPage) },
    ],
  },
  
  // Admin Routes
  {
    path: '/admin/login',
    element: withSuspense(AdminLoginPage),
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      // Dashboard principal
      { index: true, element: withSuspense(AdminDashboardPage) },
      
      // Export et rapports
      { path: 'export', element: withSuspense(AdminExportPage) },
      
      // Gestion des contacts
      { path: 'contacts', element: withSuspense(ContactsAdminPage) },
      
      // Gestion des dons
      { path: 'dons', element: withSuspense(DonsAdminPage) },
      { path: 'donations', element: withSuspense(AdminDonationsPage) },
      
      // Gestion des fichiers
      { path: 'duplicate-files', element: withSuspense(AdminDuplicateFilesPage) },
      
      // Gestion des formations
      { path: 'formations/filieres', element: withSuspense(FilieresAdminPage) },
      { path: 'formations/inscriptions-ist', element: withSuspense(InscriptionsISTAdminPage) },
      { path: 'formations/ouvertes', element: withSuspense(FormationsOuvertesAdminPage) },
      { path: 'formations/inscriptions-ouvertes', element: withSuspense(InscriptionsFormationsOuvertesAdminPage) },
      
      // Gestion FabLab
      { path: 'fablab/projets', element: withSuspense(ProjetsAdminPage) },
      { path: 'fablab/equipements', element: withSuspense(EquipementsAdminPage) },
      { path: 'fablab/abonnements', element: withSuspense(AbonnementsAdminPage) },
      { path: 'fablab/reservations', element: withSuspense(ReservationsAdminPage) },
      { path: 'fablab/subscriptions', element: withSuspense(AdminFablabSubscriptionsPage) },
      
      // Gestion des événements
      { path: 'evenements/calendrier', element: withSuspense(CalendrierAdminPage) },
      { path: 'evenements/conferences', element: withSuspense(ConferencesAdminPage) },
      
      // Gestion des actualités
      { path: 'actualites/vie-campus', element: withSuspense(VieCampusAdminPage) },
      { path: 'actualites/emplois', element: withSuspense(StagesEmploisAdminPage) },
    ],
  },
  
  // Standalone pages
  {
    path: '/',
    element: <MainLayout />,
    children: [
      // Légal
      { path: 'legal', element: withSuspense(LegalPage) },
      { path: 'privacy', element: withSuspense(PrivacyPage) },

      // 404
      { path: '*', element: withSuspense(NotFoundPage) },
    ],
  },
];

export const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true
  }
});