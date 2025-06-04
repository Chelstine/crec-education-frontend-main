import { createBrowserRouter, RouteObject } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import { AdminAuthProvider } from '@/context/AdminAuthContext';
import ProtectedAdminRoute from '@/components/common/ProtectedAdminRoute';

// Pages principales
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';
import LegalPage from '@/pages/LegalPage';
import PrivacyPage from '@/pages/PrivacyPage';
import ContactPage from '@/pages/ContactPage';

// Pages À propos
import AboutPage from '@/pages/about/AboutPage';
import JesuitesPage from '@/pages/about/JesuitesPage';
import IgnacePage from '@/pages/about/IgnacePage';
import SaintsPage from '@/pages/about/SaintsPage';
import FamilleIgnatiennePage from '@/pages/about/FamilleIgnatiennePage';
import EquipePage from '@/pages/about/EquipePage';
import CommunautesPage from '@/pages/about/CommunautesPage';

// Pages Formations
import OpenFormations from '@/pages/formations/OpenFormations';
import UniversityPage from '@/pages/formations/UniversityPage';
import FablabPage from '@/pages/formations/FablabPage';
import InscriptionPage from '@/pages/formations/InscriptionPage';
import InscriptionUniversitairePage from '@/pages/formations/InscriptionUniversitairePage';

// Pages Réservation
import ReservationPage from '@/pages/reservation/ReservationPage';
import SubscriptionPage from '@/pages/reservation/SubscriptionPage';

// Pages News
import NewsPage from '@/pages/news/NewsPage';
import ArticlePage from '@/pages/news/ArticlePage';
import CampusLifePage from '@/pages/news/CampusLifePage';
import StagesPage from '@/pages/news/StagesPage';

// Pages Événements
import EventsPage from '@/pages/events/EventsPage';
import EventDetailPage from '@/pages/events/EventDetailPage';
import CalendarPage from '@/pages/events/CalendarPage';

// Pages Dons
import DonatePage from '@/pages/DonatePage';

// Pages Admin
import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
// import AdminUsersPage from '@/pages/admin/AdminUsersPage';
import AdminPagesPage from '@/pages/admin/AdminPagesPage';
import AdminFormationsPage from '@/pages/admin/AdminFormationsPage';
import AdminOpenFormationsPage from '@/pages/admin/AdminOpenFormationsPage';
import AdminUniversityProgramsPage from '@/pages/admin/AdminUniversityProgramsPage';
import AdminUniversityApplicationsPage from '@/pages/admin/AdminUniversityApplicationsPage';

// Pages Témoignages
import TestimonialsPage from '@/pages/TestimonialsPage';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },

      // À propos
      { path: 'about', element: <AboutPage /> },
      { path: 'about/jesuites', element: <JesuitesPage /> },
      { path: 'about/ignace', element: <IgnacePage /> },
      { path: 'about/saints', element: <SaintsPage /> },
      { path: 'about/famille-ignatienne', element: <FamilleIgnatiennePage /> },
      { path: 'about/equipe', element: <EquipePage /> },
      { path: 'about/communautes', element: <CommunautesPage /> },

      // Formations - Page principale
      { path: 'formations', element: <OpenFormations /> },
      
      // Formations Universitaires
      { path: 'formations/university', element: <UniversityPage /> },
      { path: 'formations/university/inscription', element: <InscriptionUniversitairePage /> },
      
      // Formations FABLAB (FablabPage pour FabLab)
      { path: 'formations/fablab', element: <FablabPage /> },
      
      // Formations ouvertes (InscriptionPage pour formations ouvertes)
      { path: 'formations/open', element: <InscriptionPage /> },
      
      // Souscription
      { path: 'souscription', element: <SubscriptionPage /> },

      // Réservation (protégée)
      {
        path: 'reservation',
        element: (
          <ProtectedRoute>
            <ReservationPage />
          </ProtectedRoute>
        ),
      },

      // News
      { path: 'news', element: <NewsPage /> },
      { path: 'news/:id', element: <ArticlePage /> },
      { path: 'news/campus-life', element: <CampusLifePage /> },
      { path: 'news/stages', element: <StagesPage /> },

      // Témoignages
      { path: 'testimonials', element: <TestimonialsPage /> },

      // Événements
      { path: 'events', element: <EventsPage /> },
      { path: 'events/:id', element: <EventDetailPage /> },
      { path: 'events/calendar', element: <CalendarPage /> },

      // Dons
      { path: 'donate', element: <DonatePage /> },

      // Contact
      { path: 'contact', element: <ContactPage /> },

      // Admin sécurisé
      { path: 'admin/login', element: <AdminLoginPage /> },
      {
        path: 'admin',
        element: <ProtectedAdminRoute />,
        children: [
          { path: 'dashboard', element: <AdminDashboardPage /> },
          // { path: 'users', element: <AdminUsersPage /> },
          { path: 'pages', element: <AdminPagesPage /> },
          { path: 'formations', element: <AdminFormationsPage /> },
          { path: 'open-formations', element: <AdminOpenFormationsPage /> },
          { path: 'university-programs', element: <AdminUniversityProgramsPage /> },
          { path: 'university-applications', element: <AdminUniversityApplicationsPage /> },
        ],
      },

      // Légal
      { path: 'legal', element: <LegalPage /> },
      { path: 'privacy', element: <PrivacyPage /> },

      // 404
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true
  }
});