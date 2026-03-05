import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from '@/layouts/MainLayout';
import ReservationLayout from '@/layouts/ReservationLayout';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import adminRoutes from './routes/adminRoutes';

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
const GalleryPage = lazy(() => import('@/pages/GalleryPage')); // Nouvelle page Galerie

// Pages À propos - Structures modernisées et optimisées (seulement 3 pages conservées)
const AboutPage = lazy(() => import('@/pages/about/AboutPage')); // Qui sommes-nous
const JesuitesPage = lazy(() => import('@/pages/about/JesuitesPage')); // Histoire Jésuite complète
const EquipePage = lazy(() => import('@/pages/about/EquipePage')); // Notre équipe

// Pages Formations
const OpenFormationsPage = lazy(() => import('@/pages/formations/OpenFormationsPage'));
const UniversityPage = lazy(() => import('@/pages/formations/UniversityPage'));
const FablabPage = lazy(() => import('@/pages/formations/FablabPage'));
const FablabInscriptionPage = lazy(() => import('@/pages/formations/FablabInscriptionPage'));
const OpenFormationsInscriptionPage = lazy(() => import('@/pages/formations/OpenFormationsInscriptionPage'));
const InscriptionUniversitairePage = lazy(() => import('@/pages/formations/InscriptionUniversitairePage'));

// Pages Réservation
const ReservationPage = lazy(() => import('@/pages/reservation/ReservationPage'));
const SubscriptionVerification = lazy(() => import('@/pages/reservation/SubscriptionVerification'));
const FablabLoginPage = lazy(() => import('@/pages/auth/FablabLoginPage'));
const FabLabVisualizationPage = lazy(() => import('@/pages/reservation/FabLabVisualizationPage'));

// Pages Événements
const EventsPage = lazy(() => import('@/pages/events/EventsPage'));

// Pages Dons et Bibliothèque
const DonatePage = lazy(() => import('@/pages/DonatePage'));
const OnlineLibraryPage = lazy(() => import('@/pages/library/OnlineLibraryPage'));

// Pages d'authentification et profil utilisateur
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('@/pages/auth/ResetPasswordPage'));
const RegistrationPage = lazy(() => import('@/pages/auth/RegistrationPage'));
const UserProfilePage = lazy(() => import('./pages/profile/UserProfilePage'));

// Helper function to wrap lazy components with Suspense
const withSuspense = (Component: React.LazyExoticComponent<React.ComponentType<any>>) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
);

const routes: RouteObject[] = [
  // Routes pour l'espace admin
  ...adminRoutes,
  
  // Routes principales du site
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
        path: 'gallery',
        element: withSuspense(GalleryPage),
      },
      {
        path: 'library',
        element: withSuspense(OnlineLibraryPage),
      },
      {
        path: 'library/online',
        element: withSuspense(OnlineLibraryPage),
      },
      {
        path: 'donate',
        element: withSuspense(DonatePage),
      },
      
      // Pages d'authentification
      {
        path: 'login',
        element: withSuspense(LoginPage),
      },
      {
        path: 'forgotten-password',
        element: withSuspense(ForgotPasswordPage),
      },
      {
        path: 'reset-password',
        element: withSuspense(ResetPasswordPage),
      },
      {
        path: 'register',
        element: withSuspense(RegistrationPage),
      },
      {
        path: 'fablab/login',
        element: withSuspense(FablabLoginPage),
      },
      
      // Routes admin spécifiques
      {
        path: 'admin/forgot-password',
        element: withSuspense(ForgotPasswordPage),
      },
      {
        path: 'admin/reset-password',
        element: withSuspense(ResetPasswordPage),
      },
      
      // Pages utilisateur protégées
      {
        path: 'profile',
        element: <ProtectedRoute><Suspense fallback={<LoadingSpinner />}><UserProfilePage /></Suspense></ProtectedRoute>,
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

      // Pages Formations spécifiques
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
        element: withSuspense(FablabInscriptionPage),
      },
      {
        path: 'subscription-verification',
        element: withSuspense(SubscriptionVerification),
      },

      // Pages Événements
      {
        path: 'events',
        element: withSuspense(EventsPage),
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
      {
        path: 'fablab',
        element: withSuspense(FabLabVisualizationPage),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
