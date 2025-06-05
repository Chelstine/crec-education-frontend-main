import React, { useState, useEffect } from 'react';
import { Outlet, Navigate, useLocation, Link } from 'react-router-dom';
import { adminAuthService } from '@/services/adminService';
import {
  Users,
  BookOpen,
  Calendar,
  Newspaper,
  MessageSquare,
  Heart,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  GraduationCap,
  Wrench,
  Download,
  Key,
  Trash2
} from 'lucide-react';

const AdminLayout: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = adminAuthService.isAuthenticated();
      setIsAuthenticated(authStatus);
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await adminAuthService.logout();
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const menuItems = [
    {
      title: 'Tableau de bord',
      href: '/admin',
      icon: Home,
      exact: true
    },
    {
      title: 'Export & Rapports',
      href: '/admin/export',
      icon: Download
    },
    {
      title: 'Formations',
      icon: GraduationCap,
      subItems: [
        { title: 'ISTMR - Filières', href: '/admin/formations/filieres' },
        { title: 'ISTMR - Inscriptions', href: '/admin/formations/inscriptions-ist' },
        { title: 'Formations Ouvertes', href: '/admin/formations/ouvertes' },
        { title: 'Inscriptions Ouvertes', href: '/admin/formations/inscriptions-ouvertes' },
        { title: 'FabLab - Projets', href: '/admin/fablab/projets' },
        { title: 'FabLab - Équipements', href: '/admin/fablab/equipements' },
        { title: 'FabLab - Abonnements', href: '/admin/fablab/abonnements' },
        { title: 'FabLab - Réservations', href: '/admin/fablab/reservations' }
      ]
    },
    {
      title: 'Gestion FabLab',
      icon: Key,
      subItems: [
        { title: 'Validation Abonnements', href: '/admin/fablab/subscriptions' },
        { title: 'Clés d\'accès', href: '/admin/fablab/access-keys' }
      ]
    },
    {
      title: 'Événements',
      icon: Calendar,
      subItems: [
        { title: 'Calendrier', href: '/admin/evenements/calendrier' },
        { title: 'Conférences', href: '/admin/evenements/conferences' }
      ]
    },
    {
      title: 'Actualités',
      icon: Newspaper,
      subItems: [
        { title: 'Vie de Campus', href: '/admin/actualites/vie-campus' },
        { title: 'Stages & Emplois', href: '/admin/actualites/emplois' }
      ]
    },
    {
      title: 'Contacts',
      href: '/admin/contacts',
      icon: MessageSquare
    },
    {
      title: 'Dons',
      href: '/admin/donations',
      icon: Heart
    },
    {
      title: 'Gestion Fichiers',
      href: '/admin/duplicate-files',
      icon: Trash2
    }
  ];

  const isActiveLink = (href: string, exact = false) => {
    if (exact) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        
        {/* Header du sidebar */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <img src="/img/logo.png" alt="CREC" className="h-8 w-8" />
            <span className="text-xl font-bold text-gray-900">Admin CREC</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.title}>
              {item.href ? (
                <Link
                  to={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActiveLink(item.href, item.exact)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.title}
                </Link>
              ) : (
                <div>
                  <div className="flex items-center px-3 py-2 text-sm font-medium text-gray-700">
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.title}
                  </div>
                  <div className="ml-6 space-y-1">
                    {item.subItems?.map((subItem) => (
                      <Link
                        key={subItem.href}
                        to={subItem.href}
                        className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                          isActiveLink(subItem.href)
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer du sidebar */}
        <div className="border-t border-gray-200 p-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 rounded-md transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Déconnexion
          </button>
        </div>
      </div>

      {/* Overlay pour mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Zone de contenu */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
