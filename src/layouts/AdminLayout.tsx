import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Users, 
  FileText, 
  Calendar, 
  Settings, 
  LogOut, 
  Menu,
  Bell,
  User,
  GraduationCap,
  BookOpen,
  Wrench
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import '../styles/admin.css';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Vérifier l'authentification admin
  const adminToken = localStorage.getItem('adminToken');
  
  if (!adminToken) {
    return <Navigate to="/admin/login" replace />;
  }

  // Vérifier si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);  const menuItems = [
    { 
      name: 'Formations', 
      icon: BookOpen, 
      path: '/admin/formations',
      description: 'Gérer les formations',
      badge: null,
      submenu: [
        { name: 'ISTMR', icon: GraduationCap, path: '/admin/formations/istmr', badge: null },
        { name: 'FabLab', icon: Wrench, path: '/admin/formations/fablab', badge: null },
        { name: 'Formations Ouvertes', icon: BookOpen, path: '/admin/formations/ouvertes', badge: null },
        { name: 'Gestion Inscriptions ISTMR', icon: Users, path: '/admin/inscriptions/istmr', badge: 8 },
        { name: 'Gestion Inscriptions FabLab', icon: Users, path: '/admin/inscriptions/fablab', badge: 12 },
        { name: 'Gestion Inscriptions Ouvertes', icon: Users, path: '/admin/inscriptions/ouvertes', badge: 5 }
      ]
    },
    { 
      name: 'Événements', 
      icon: Calendar, 
      path: '/admin/evenements',
      description: 'Gérer les événements',
      badge: null
    },
    { 
      name: 'Actualités', 
      icon: FileText, 
      path: '/admin/actualites',
      description: 'Articles et news',
      badge: null
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.location.href = '/admin/login';
  };

  const getCurrentPageTitle = () => {
    const currentPath = location.pathname;
    if (currentPath === '/admin') return 'Tableau de bord';
    if (currentPath.includes('/formations')) return 'Gestion des Formations';
    if (currentPath.includes('/sections')) return 'Gestion des Sections';
    if (currentPath.includes('/fablab')) return 'Gestion du FabLab';
    if (currentPath.includes('/inscriptions/university')) return 'Inscriptions Université';
    if (currentPath.includes('/inscriptions/formations')) return 'Formations Ouvertes';
    if (currentPath.includes('/inscriptions/fablab')) return 'Abonnements FabLab';
    if (currentPath.includes('/inscriptions')) return 'Gestion des Inscriptions';
    if (currentPath.includes('/pages')) return 'Gestion des Pages';
    if (currentPath.includes('/settings')) return 'Paramètres';
    return 'Administration';
  };

  return (
    <div className="admin-layout min-h-screen flex bg-gray-50">
      {/* Overlay pour mobile */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || !isMobile) && (
          <motion.aside
            initial={{ x: isMobile ? -300 : 0 }}
            animate={{ x: 0 }}
            exit={{ x: isMobile ? -300 : 0 }}
            transition={{ duration: 0.3 }}
            className={`admin-sidebar bg-gradient-to-b from-slate-900 to-slate-800 text-white ${
              isSidebarOpen ? 'w-64' : 'w-16'
            } fixed h-screen z-50 shadow-xl overflow-y-auto flex flex-col transition-all duration-300`}
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-700 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className={`flex items-center transition-all duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                  <img 
                    src="/img/logo.png" 
                    alt="CREC" 
                    className="h-8 w-8 mr-3 flex-shrink-0"
                  />
                  <div className={`${isSidebarOpen ? 'block' : 'hidden'}`}>
                    <h2 className="text-lg font-bold text-crec-gold whitespace-nowrap">CREC Admin</h2>
                    <p className="text-xs text-gray-300 whitespace-nowrap">Centre d'administration</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="text-white hover:bg-slate-700 flex-shrink-0"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="mt-4 px-2 flex-1 overflow-y-auto">
              {menuItems.map((item) => (
                <div key={item.name} className="mb-2">
                  <Link
                    to={item.path}
                    className={`admin-menu-item flex items-center p-3 rounded-lg transition-all duration-200 group relative ${
                      location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                        ? 'bg-crec-gold text-black shadow-lg active'
                        : 'hover:bg-slate-700 text-gray-300 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <div className={`ml-3 flex-1 transition-all duration-300 overflow-hidden ${
                      isSidebarOpen ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium whitespace-nowrap">{item.name}</span>
                          <p className="text-xs opacity-75 whitespace-nowrap">{item.description}</p>
                        </div>
                        {item.badge && (
                          <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-2">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </div>
                    {!isSidebarOpen && item.badge && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                  
                  {/* Sous-menu pour Inscriptions */}
                  {item.submenu && isSidebarOpen && location.pathname.startsWith(item.path) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.2 }}
                      className="ml-6 mt-2 space-y-1 overflow-hidden"
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={`flex items-center justify-between p-2 rounded-md text-sm transition-all duration-200 ${
                            location.pathname === subItem.path
                              ? 'bg-crec-gold/20 text-crec-gold border-l-2 border-crec-gold'
                              : 'hover:bg-slate-600 text-gray-400 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center">
                            <subItem.icon className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="whitespace-nowrap">{subItem.name}</span>
                          </div>
                          {subItem.badge && (
                            <span className="bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center ml-2">
                              {subItem.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </nav>

            {/* User Info & Logout */}
            <div className="p-4 border-t border-slate-700 mt-auto">
              <div className={`${isSidebarOpen ? 'block' : 'hidden'} mb-3`}>
                <div className="flex items-center p-3 bg-slate-700/50 rounded-lg">
                  <div className="w-8 h-8 bg-crec-gold rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <User className="w-4 h-4 text-black" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">Admin CREC</p>
                    <p className="text-xs text-gray-400 truncate">admin@crec.edu</p>
                  </div>
                </div>
              </div>
              
              <Button
                onClick={handleLogout}
                size="sm"
                className={`${isSidebarOpen ? 'w-full justify-start' : 'w-12 h-12 justify-center'} flex items-center bg-red-600 hover:bg-red-700 text-white transition-all duration-300`}
              >
                <LogOut className="w-4 h-4 flex-shrink-0" />
                <span className={`transition-all duration-300 overflow-hidden ${
                  isSidebarOpen ? 'ml-2 opacity-100 max-w-full' : 'ml-0 opacity-0 max-w-0'
                }`}>
                  Se déconnecter
                </span>
              </Button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={`admin-main-content flex-1 transition-all duration-300 ${
        isMobile ? 'ml-0' : isSidebarOpen ? 'ml-64' : 'ml-16'
      }`}>
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 p-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSidebarOpen(true)}
                  className="mr-4 lg:hidden"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              )}
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-900">{getCurrentPageTitle()}</h1>
                <p className="text-xs md:text-sm text-gray-600">
                  {new Date().toLocaleDateString('fr-FR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 md:p-6 min-h-[calc(100vh-80px)] overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
