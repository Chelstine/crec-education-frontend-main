// src/layout/AdminLayout.tsx
import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { AdminRole } from '@/types';

// Import des icônes
import {
  ChevronLeft, ChevronRight, LayoutDashboard, BookOpen, Calendar, Settings, User,
  LogOut, Menu, X, Bell, School, Users, UserCheck, UserCog, Handshake
} from 'lucide-react';

// Import des composants UI
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface NavItem {
  path: string;
  name: string;
  iconComponent: React.ComponentType<{ className?: string }>;
  roles?: AdminRole[];
  children?: {
    path: string;
    name: string;
    roles?: AdminRole[];
  }[];
}

const AdminLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated, hasRole, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirection si l'utilisateur n'est pas authentifié
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/admin/login', {
        state: { from: location },
        replace: true
      });
    }
  }, [isAuthenticated, loading, navigate, location]);

  // Affichage du loader pendant la vérification
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-crec-gold rounded-md p-2">
            <School className="h-8 w-8 text-white animate-pulse" />
          </div>
          <p className="text-slate-600">Chargement...</p>
        </div>
      </div>
    );
  }

  // Retour null si pas authentifié (redirection en cours)
  if (!isAuthenticated || !user) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login', { replace: true });
    } catch (error) {
      // En cas d'erreur, forcer la redirection quand même
      navigate('/admin/login', { replace: true });
    }
  };

  // Navigation items avec gestion des rôles - RÉORGANISÉ
  const navItems: NavItem[] = [
    {
      path: '/admin/dashboard',
      name: 'Centre de Contrôle',
      iconComponent: LayoutDashboard
    },
    {
      path: '/admin/inscriptions',
      name: 'Admissions & Candidatures',
      iconComponent: UserCheck,
      roles: ['super_admin', 'admin_inscription'],
      children: [
        {
          path: '/admin/inscriptions/university',
          name: 'Faculté ISTM',
          roles: ['super_admin', 'admin_inscription']
        },
        {
          path: '/admin/inscriptions/formations',
          name: 'Cursus Professionnels',
          roles: ['super_admin', 'admin_inscription']
        },
        {
          path: '/admin/inscriptions/fablab',
          name: 'Laboratoire FabLab',
          roles: ['super_admin', 'admin_inscription']
        }
      ]
    },
    {
      path: '/admin/contenus',
      name: 'Patrimoine Académique',
      iconComponent: BookOpen,
      roles: ['super_admin', 'admin_contenu'],
      children: [
        {
          path: '/admin/contenus/istm',
          name: 'Programmes de la Faculté',
          roles: ['super_admin', 'admin_contenu']
        },
        {
          path: '/admin/contenus/formations',
          name: 'Offre Certificateur',
          roles: ['super_admin', 'admin_contenu']
        },
        {
          path: '/admin/contenus/fablab',
          name: 'Atelier & Ressources',
          roles: ['super_admin', 'admin_contenu']
        },
        {
          path: '/admin/contenus/evenements',
          name: 'Rayonnement & Événements',
          roles: ['super_admin', 'admin_contenu']
        },
        {
          path: '/admin/contenus/bibliotheque',
          name: 'Fonds Documentaire',
          roles: ['super_admin', 'admin_contenu']
        },
        {
          path: '/admin/contenus/galerie',
          name: 'Archives Visuelles',
          roles: ['super_admin', 'admin_contenu']
        },
        {
          path: '/admin/contenus/partenaires',
          name: 'Alliance & Partenariats',
          roles: ['super_admin', 'admin_contenu']
        },
        {
          path: '/admin/reservations',
          name: 'Flux de Réservations',
          roles: ['super_admin', 'admin_contenu']
        }
      ]
    },
    {
      path: '/admin/parametres',
      name: 'Gouvernance',
      iconComponent: Settings,
      children: [
        {
          path: '/admin/parametres/utilisateurs-roles',
          name: 'Membres du Cabinet',
          roles: ['super_admin']
        },
        {
          path: '/admin/profile',
          name: 'Mon Identité'
        }
      ]
    },
  ];

  // Filtrage des items selon les permissions
  const filteredNavItems = navItems.filter(item => {
    if (!item.roles) return true;
    return hasRole(item.roles);
  });

  const isActive = (path: string) => location.pathname.startsWith(path);

  // Détermine le titre de la page actuelle
  const getCurrentPageTitle = () => {
    const currentNavItem = filteredNavItems.find(item => location.pathname.startsWith(item.path));
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
    const firstInitial = user.prenom?.charAt(0) || 'U';
    const lastInitial = user.nom?.charAt(0) || 'A';
    return `${firstInitial}${lastInitial}`;
  };

  // Traduction des rôles pour l'affichage
  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'Super Admin';
      case 'admin_contenu':
        return 'Admin Contenu';
      case 'admin_inscription':
        return 'Admin Inscription';
      default:
        return role;
    }
  };

  // Couleur du badge selon le rôle
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'default'; // Bleu
      case 'admin_contenu':
        return 'secondary'; // Gris
      case 'admin_inscription':
        return 'outline'; // Bordure
      default:
        return 'secondary';
    }
  };

  return (
    <div className="min-h-screen admin-bg-gradient flex flex-col font-sans">
      {/* Header */}
      <header className="glass-header sticky top-0 z-30">
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
            <Link to="/admin/dashboard" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-crec-gold to-amber-600 rounded-lg p-1.5 shadow-md group-hover:shadow-lg transition-all">
                <School className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-crec-darkblue " style={{ fontFamily: 'Playfair Display' }}>
                CREC <span className="text-crec-gold">Admin</span>
              </span>
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
                  <Button variant="ghost" size="icon" className="relative hover:bg-slate-100/50">
                    <Bell className="h-5 w-5 text-slate-600" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-4 hover:bg-slate-100/50 rounded-full border border-transparent hover:border-slate-200 transition-all">
                  <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-crec-darkblue to-blue-800 text-white">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-slate-800 leading-none">{user.prenom} {user.nom}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Badge
                        variant={getRoleBadgeVariant(user.role)}
                        className="text-[10px] px-1.5 py-0 h-4"
                      >
                        {getRoleDisplayName(user.role)}
                      </Badge>
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 glass-panel">
                <DropdownMenuLabel>
                  <div>
                    <p className="font-semibold">{user.prenom} {user.nom}</p>
                    <p className="text-xs text-slate-500 font-normal">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/admin/profile')} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/admin/parametres')} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Mobile version */}
        <div
          className={`fixed inset-y-0 left-0 z-20 w-64 glass-sidebar pt-16 transform transition-transform duration-300 md:hidden ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="px-4 py-6">
            <nav className="space-y-1">
              {filteredNavItems.map((item) => (
                <div key={item.path} className="mb-2">
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-xl text-sm transition-all duration-200 ${isActive(item.path)
                      ? "bg-gradient-to-r from-crec-darkblue to-blue-800 text-white shadow-md shadow-blue-900/20 font-medium"
                      : "text-slate-600 hover:bg-white/60 hover:text-slate-900"
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.iconComponent className={`h-5 w-5 ${isActive(item.path) ? "text-crec-gold" : "text-slate-500"}`} />
                    <span className="ml-3">{item.name}</span>
                  </Link>
                  {item.children && isActive(item.path) && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-slate-200 pl-3">
                      {item.children
                        .filter(child => !child.roles || hasRole(child.roles))
                        .map(child => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={`flex items-center px-3 py-2 rounded-lg text-xs transition-colors ${location.pathname.startsWith(child.path)
                              ? "text-crec-darkblue font-bold bg-blue-50"
                              : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
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
              <Separator className="my-6 bg-slate-200/60" />
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-700 rounded-xl px-4 py-3"
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
          className={`hidden md:block glass-sidebar transition-all duration-300 ${sidebarCollapsed ? "w-20" : "w-72"
            }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex-1 py-6 px-4 overflow-y-auto">
              {/* Profile Card Mini in Sidebar */}
              {!sidebarCollapsed && (
                <div className="mb-6 p-4 glass-card rounded-2xl flex items-center gap-3 bg-gradient-to-br from-white/40 to-white/10">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <UserCog className="w-5 h-5 text-crec-darkblue" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rôle Actuel</p>
                    <p className="text-sm font-bold text-crec-darkblue truncate">{getRoleDisplayName(user.role)}</p>
                  </div>
                </div>
              )}

              <nav className="space-y-2">
                {filteredNavItems.map((item) => (
                  <div key={item.path}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            to={item.path}
                            className={`flex items-center px-3 py-3 rounded-xl text-sm transition-all duration-200 group ${isActive(item.path)
                              ? "bg-gradient-to-r from-crec-darkblue to-blue-900 text-white shadow-lg shadow-blue-900/20 font-medium transform scale-[1.02]"
                              : "text-slate-600 hover:bg-white/80 hover:text-crec-darkblue hover:shadow-sm"
                              } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
                          >
                            <span className={`flex-shrink-0 transition-colors ${isActive(item.path) ? "text-crec-gold" : "text-slate-500 group-hover:text-crec-darkblue"}`}>
                              <item.iconComponent className="h-5 w-5" />
                            </span>
                            {!sidebarCollapsed && <span className="ml-3 tracking-wide">{item.name}</span>}
                          </Link>
                        </TooltipTrigger>
                        {sidebarCollapsed && (
                          <TooltipContent side="right" className="glass-panel text-crec-darkblue font-medium ml-2">
                            <p>{item.name}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>

                    {!sidebarCollapsed && item.children && isActive(item.path) && (
                      <div className="ml-5 mt-2 space-y-1 border-l-2 border-slate-200/60 pl-3 mb-4 animate-in slide-in-from-left-2 duration-200">
                        {item.children
                          .filter(child => !child.roles || hasRole(child.roles))
                          .map(child => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className={`flex items-center px-3 py-2 rounded-lg text-xs transition-all ${location.pathname.startsWith(child.path)
                                ? "text-crec-darkblue font-bold bg-white/60 shadow-sm border border-white/50"
                                : "text-slate-500 hover:text-slate-900 hover:bg-white/40"
                                }`}
                            >
                              <div className={`w-1.5 h-1.5 rounded-full mr-2 ${location.pathname.startsWith(child.path) ? "bg-crec-gold" : "bg-slate-300"}`}></div>
                              <span>{child.name}</span>
                            </Link>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            <div className="p-4 mt-auto border-t border-white/30">
              <Button
                variant="ghost"
                size="sm"
                className="w-full flex justify-center hover:bg-white/50"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                {sidebarCollapsed ? (
                  <ChevronRight className="h-5 w-5 text-slate-500" />
                ) : (
                  <div className="flex items-center text-slate-500">
                    <ChevronLeft className="h-5 w-5 mr-2" />
                    <span className="text-xs uppercase font-bold tracking-wider">Réduire le menu</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <main className="p-4 md:p-8 max-w-7xl mx-auto pb-20">
            <div className="hidden md:flex items-center justify-between mb-8">
              <div className="animate-in slide-in-from-top-4 duration-700">
                <h1 className="text-4xl font-bold admin-title">{getCurrentPageTitle()}</h1>
                <p className="text-slate-500 text-sm mt-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-crec-gold animate-pulse"></span>
                  Centre de Commandement Institutionnel — Accès Sécurisé
                </p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="px-3 py-1 glass-panel border-slate-200 shadow-sm text-crec-darkblue font-semibold">
                  SST-OS v1.0.2
                </Badge>
              </div>
            </div>

            {/* Contenu de la page style "Glass" */}
            <div className="animate-in fade-in duration-500 slide-in-from-bottom-4">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;