import { createBrowserRouter, RouteObject } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';

// Pages principales et pages légales
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';
import LegalPage from '@/pages/LegalPage';
import PrivacyPage from '@/pages/PrivacyPage';
import ContactPage from '@/pages/ContactPage';

// Pages À propos
import AboutPage from '@/pages/about/AboutPage';
import JesuitesPage from '@/pages/about/JesuitesPage';
import HistoryPage from '@/pages/about/HistoryPage';
import IgnacePage from '@/pages/about/IgnacePage';
import SaintsPage from '@/pages/about/SaintsPage';
import FamilleIgnatiennePage from '@/pages/about/FamilleIgnatiennePage';
import EquipePage from '@/pages/about/EquipePage';
import CommunautesPage from '@/pages/about/CommunautesPage';

// Pages Formations
import FormationsPage from '@/pages/formations/FormationsPage';
import ProgramsPage from '@/pages/formations/ProgramsPage';
import UniversityPage from '@/pages/formations/UniversityPage';
import AdmissionsPage from '@/pages/formations/AdmissionsPage';

// Pages News
import NewsPage from '@/pages/news/NewsPage';
import ArticlePage from '@/pages/news/ArticlePage';
import CampusLifePage from '@/pages/news/CampusLifePage';
import TestimonialsPage from '@/pages/news/TestimonialsPage';

// Pages Événements
import EventsPage from '@/pages/events/EventsPage';
import EventDetailPage from '@/pages/events/EventDetailPage';
import CalendarPage from '@/pages/events/CalendarPage';

// Pages Dons
import DonatePage from '@/pages/donate/DonatePage';
import ScholarshipsPage from '@/pages/donate/ScholarshipsPage';
import BenefactorPage from '@/pages/donate/BenefactorPage';
import ProjectsPage from '@/pages/donate/ProjectsPage';

// Pages Admin
import AdminPage from '@/pages/admin/AdminPage';
import AdminContentPage from '@/pages/admin/AdminContentPage';
import AdminUsersPage from '@/pages/admin/AdminUsersPage';
import AdminStatisticsPage from '@/pages/admin/AdminStatisticsPage';
import AdminSettingsPage from '@/pages/admin/AdminSettingsPage';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      
      // À propos
      { path: 'about', element: <AboutPage /> },
      { path: 'about/jesuites', element: <JesuitesPage /> },
      { path: 'about/history', element: <HistoryPage /> },
      { path: 'about/ignace', element: <IgnacePage /> },
      { path: 'about/saints', element: <SaintsPage /> },
      { path: 'about/famille-ignatienne', element: <FamilleIgnatiennePage /> },
      { path: 'about/equipe', element: <EquipePage /> },
      { path: 'about/communautes', element: <CommunautesPage /> },
      
      // Formations
      { path: 'formations', element: <FormationsPage /> },
      { path: 'formations/programs', element: <ProgramsPage /> },
      { path: 'formations/university', element: <UniversityPage /> },
      { path: 'formations/admissions', element: <AdmissionsPage /> },
      
      // News
      { path: 'news', element: <NewsPage /> },
      { path: 'news/:id', element: <ArticlePage /> },
      { path: 'news/campus-life', element: <CampusLifePage /> },
      { path: 'news/testimonials', element: <TestimonialsPage /> },
      
      // Événements
      { path: 'events', element: <EventsPage /> },
      { path: 'events/:id', element: <EventDetailPage /> },
      { path: 'events/calendar', element: <CalendarPage /> },
      
      // Dons
      { path: 'donate', element: <DonatePage /> },
      { path: 'donate/scholarships', element: <ScholarshipsPage /> },
      { path: 'donate/benefactor', element: <BenefactorPage /> },
      { path: 'donate/projects', element: <ProjectsPage /> },
      
      // Contact
      { path: 'contact', element: <ContactPage /> },
      
      // Admin
      { path: 'admin', element: <AdminPage /> },
      { path: 'admin/content', element: <AdminContentPage /> },
      { path: 'admin/users', element: <AdminUsersPage /> },
      { path: 'admin/statistics', element: <AdminStatisticsPage /> },
      { path: 'admin/settings', element: <AdminSettingsPage /> },
      
      // Pages légales
      { path: 'legal', element: <LegalPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
      
      // 404
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);