import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

// Import des icônes
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  BookOpen,
  Calendar,
  Settings,
  User,
  FileText,
  LogOut,
  Menu,
  X,
  Bell,
  School,
  Award,
  Wrench,
  Image,
  Library
} from 'lucide-react';

// Import des composants UI
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';

const AdminLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Redirection si l'utilisateur n'est pas admin
  React.useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };
  
  // Navigation items
  const navItems = [
    {
      path: '/admin/dashboard',
      name: 'Tableau de bord',
      iconComponent: LayoutDashboard
    },
    // { path: '/admin/login', name: 'Connexion', iconComponent: User }, // supprimé
    {
      path: '/admin/inscriptions',
      name: 'Inscriptions',
      iconComponent: User,
      children: [
        { path: '/admin/inscriptions/istm', name: 'ISTM Université' },
        { path: '/admin/inscriptions/formations', name: 'Formations ouvertes' },
        { path: '/admin/inscriptions/fablab', name: 'FabLab' }
      ]
    },
    {
      path: '/admin/contenus',
      name: 'Gestion du contenu',
      iconComponent: BookOpen,
      children: [
        { path: '/admin/contenus/istm', name: 'Programmes ISTM' },
        { path: '/admin/contenus/formations', name: 'Formations ouvertes' },
        { path: '/admin/contenus/fablab', name: 'Ressources FabLab' },
        { path: '/admin/contenus/bibliotheque', name: 'Bibliothèque' },
        { path: '/admin/contenus/galerie', name: 'Galerie' }
      ]
    },
    {
      path: '/admin/reservations',
      name: 'Réservations',
      iconComponent: Calendar
    },
    {
      path: '/admin/parametres',
      name: 'Paramètres',
      iconComponent: Settings,
      children: [
        { path: '/admin/profile', name: 'Profil' },
        { path: '/admin/parametres/utilisateurs-roles', name: 'Utilisateurs & Rôles' }
      ]
    },
  ];

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  // Détermine le titre de la page actuelle
  const getCurrentPageTitle = () => {
    const currentNavItem = navItems.find(item => location.pathname.startsWith(item.path));
    
    if (currentNavItem?.children) {
      const currentChild = currentNavItem.children.find(child => 
        location.pathname.startsWith(child.path)
      );
      return currentChild ? `${currentNavItem.name} - ${currentChild.name}` : currentNavItem.name;
    }
    
    return currentNavItem?.name || 'Administration';
  };
  
  // Récupère les initiales de l'utilisateur
  const getInitials = () => {
    if (!user) return 'UA';
    const firstInitial = user.firstname?.charAt(0) || 'U';
    const lastInitial = user.lastname?.charAt(0) || 'A';
    return `${firstInitial}${lastInitial}`;
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="flex items-center justify-between px-4 h-16">
          {/* Logo & Mobile menu button */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden mr-2"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            <Link to="/admin/dashboard" className="flex items-center gap-2">
              <div className="bg-crec-gold rounded-md p-1">
                <School className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold text-lg text-crec-darkblue">CREC Admin</span>
            </Link>
          </div>
          
          {/* Page title - visible on mobile */}
          <div className="md:hidden font-medium text-slate-800">
            {getCurrentPageTitle()}
          </div>
          
          {/* User menu and notifications */}
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-crec-darkblue text-white">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">{user?.firstname} {user?.lastname}</p>
                    <p className="text-xs text-slate-500">{user?.roles?.[0]}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigate('/admin/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/admin/parametres')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Sidebar - Mobile version */}
        <div
          className={`fixed inset-y-0 left-0 z-20 w-64 bg-white border-r border-slate-200 pt-16 transform transition-transform duration-300 md:hidden ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="px-3 py-4">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <div key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm ${
                      isActive(item.path)
                        ? "bg-crec-darkblue/10 text-crec-darkblue font-medium"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.iconComponent className="h-5 w-5" />
                    <span className="ml-3">{item.name}</span>
                  </Link>
                  
                  {item.children && isActive(item.path) && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.children.map(child => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={`flex items-center px-3 py-2 rounded-md text-xs ${
                            location.pathname.startsWith(child.path)
                              ? "bg-crec-gold/10 text-crec-gold font-medium"
                              : "text-slate-500 hover:bg-slate-100"
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span>{child.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <Separator className="my-4" />
              
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-3" />
                Déconnexion
              </Button>
            </nav>
          </div>
        </div>
        
        {/* Sidebar - Desktop version */}
        <div
          className={`hidden md:block bg-white border-r border-slate-200 transition-all duration-300 ${
            sidebarCollapsed ? "w-16" : "w-64"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex-1 py-4">
              <nav className="px-3 space-y-1">
                {navItems.map((item) => (
                  <div key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-3 py-2 rounded-md text-sm ${
                        isActive(item.path)
                          ? "bg-crec-darkblue/10 text-crec-darkblue font-medium"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <span className="flex-shrink-0"><item.iconComponent className="h-5 w-5" /></span>
                      {!sidebarCollapsed && <span className="ml-3">{item.name}</span>}
                    </Link>
                    
                    {!sidebarCollapsed && item.children && isActive(item.path) && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.children.map(child => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={`flex items-center px-3 py-2 rounded-md text-xs ${
                              location.pathname.startsWith(child.path)
                                ? "bg-crec-gold/10 text-crec-gold font-medium"
                                : "text-slate-500 hover:bg-slate-100"
                            }`}
                          >
                            <span>{child.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
            
            <div className="p-3 mt-auto">
              <Button
                variant="ghost"
                size="sm"
                className="w-full flex justify-center"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                {sidebarCollapsed ? (
                  <ChevronRight className="h-5 w-5" />
                ) : (
                  <div className="flex items-center">
                    <ChevronLeft className="h-5 w-5 mr-2" />
                    <span>Réduire</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      
        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <main className="p-4 md:p-6 max-w-7xl mx-auto">
            <div className="hidden md:flex items-center mb-6">
              <h1 className="text-2xl font-bold text-slate-800">{getCurrentPageTitle()}</h1>
            </div>
            
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 md:p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;