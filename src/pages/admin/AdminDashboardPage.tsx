import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AdminRole } from '@/types';

import {
  Users,
  BookOpen,
  Calendar,
  School,
  Award,
  Clock,
  TrendingUp,
  FileText,
  Settings,
  UserCheck,
  Bell,
  BarChart3,
  FileImage,
  MapPin
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { useApi } from '@/hooks/useApi';

interface DashboardStat {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  description: string;
  icon: React.ElementType;
  link?: string;
}

interface QuickLink {
  title: string;
  iconComponent: React.ElementType;
  description: string;
  link: string;
  color: string;
  roles: AdminRole[];
}

interface Activity {
  id: number;
  type: 'registration' | 'event' | 'content' | 'user';
  user: string;
  action: string;
  target: string;
  time: string;
  iconComponent: React.ElementType;
}

const AdminDashboardPage: React.FC = () => {
  const { user, hasRole } = useAuth();
  
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);

        // Suppression des données mockées - Récupération depuis API
        const dashboardStats = [];
        setStats(dashboardStats);
        
        // Activités récentes (optionnel pour l'instant)
        setRecentActivity([]);
        
      } catch (error) {
        console.error("Erreur dashboard:", error);
        setStats([]);
        setRecentActivity([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, [user?.role]);

  const getDashboardStats = async (): Promise<DashboardStat[]> => {
    // TODO: Remplacer par des appels API réels
    // Pour l'instant, retourne un tableau vide en attendant les vraies APIs
    return [];
  };

  const getQuickLinks = (): QuickLink[] => {
    const allLinks: QuickLink[] = [
      // Section Paramètres - Super Admin uniquement  
      {
        title: "Gestion des Admins",
        iconComponent: Users,
        description: "Créer et gérer les comptes administrateurs",
        link: "/admin/parametres/utilisateurs-roles",
        color: "bg-red-100 text-red-700",
        roles: ['super_admin']
      },
      {
        title: "Paramètres Système",
        iconComponent: Settings,
        description: "Configuration globale du système",
        link: "/admin/parametres",
        color: "bg-gray-100 text-gray-700",
        roles: ['super_admin']
      },

      // Section Contenus - Admin Contenu
      {
        title: "ISTM Université",
        iconComponent: School,
        description: "Gérer les filières et programmes universitaires",
        link: "/admin/contenus/istm",
        color: "bg-amber-100 text-amber-700",
        roles: ['super_admin', 'admin_contenu']
      },
      {
        title: "Formations Ouvertes",
        iconComponent: BookOpen,
        description: "Gérer le catalogue des formations",
        link: "/admin/contenus/formations",
        color: "bg-blue-100 text-blue-700",
        roles: ['super_admin', 'admin_contenu']
      },
      {
        title: "FabLab",
        iconComponent: Award,
        description: "Gérer les équipements et services",
        link: "/admin/contenus/fablab",
        color: "bg-emerald-100 text-emerald-700",
        roles: ['super_admin', 'admin_contenu']
      },
      {
        title: "Événements",
        iconComponent: Calendar,
        description: "Gérer les événements et actualités",
        link: "/admin/contenus/evenements",
        color: "bg-purple-100 text-purple-700",
        roles: ['super_admin', 'admin_contenu']
      },
      {
        title: "Galerie Photos",
        iconComponent: FileImage,
        description: "Gérer les images du site",
        link: "/admin/galerie",
        color: "bg-pink-100 text-pink-700",
        roles: ['super_admin', 'admin_contenu']
      },
      {
        title: "Bibliothèque",
        iconComponent: FileText,
        description: "Gérer les livres et documents",
        link: "/admin/bibliotheque",
        color: "bg-indigo-100 text-indigo-700",
        roles: ['super_admin', 'admin_contenu']
      },
      {
        title: "Réservations",
        iconComponent: MapPin,
        description: "Gérer les prix et réservations d'équipements",
        link: "/admin/reservations",
        color: "bg-teal-100 text-teal-700",
        roles: ['super_admin', 'admin_contenu']
      },

      // Section Inscriptions - Admin Inscription
      {
        title: "Inscriptions ISTM",
        iconComponent: School,
        description: "Valider les demandes universitaires",
        link: "/admin/inscriptions/istm",
        color: "bg-amber-100 text-amber-700",
        roles: ['super_admin', 'admin_inscription']
      },
      {
        title: "Inscriptions FabLab",
        iconComponent: Award,
        description: "Valider les inscriptions FabLab",
        link: "/admin/inscriptions/fablab",
        color: "bg-emerald-100 text-emerald-700",
        roles: ['super_admin', 'admin_inscription']
      },
      {
        title: "Inscriptions Formations",
        iconComponent: BookOpen,
        description: "Valider les candidatures formations",
        link: "/admin/inscriptions/formations",
        color: "bg-blue-100 text-blue-700",
        roles: ['super_admin', 'admin_inscription']
      }
    ];

    // Filtrer selon les rôles de l'utilisateur
    return allLinks.filter(link => 
      link.roles.some(role => hasRole([role]))
    );
  };

  const getRoleDisplayName = (role: AdminRole): string => {
    const roleNames = {
      'super_admin': 'Super Administrateur',
      'admin_contenu': 'Administrateur Contenus',
      'admin_inscription': 'Administrateur Inscriptions'
    };
    return roleNames[role] || role;
  };

  const getRoleBadgeVariant = (role: AdminRole): "default" | "destructive" | "secondary" => {
    const variants: Record<AdminRole, "default" | "destructive" | "secondary"> = {
      'super_admin': 'destructive',
      'admin_contenu': 'default',
      'admin_inscription': 'secondary'
    };
    return variants[role] || 'default';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-crec-gold"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header avec informations utilisateur */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Bienvenue, {user?.prenom} {user?.nom}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={getRoleBadgeVariant(user?.role as AdminRole)}>
              {getRoleDisplayName(user?.role as AdminRole)}
            </Badge>
            {user?.must_change_password && (
              <Badge variant="outline" className="text-orange-600 border-orange-200">
                Changement de mot de passe requis
              </Badge>
            )}
          </div>
        </div>
        <p className="text-sm text-slate-500">
          {new Date().toLocaleDateString('fr-FR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Statistiques - Section vide pour l'instant */}
      {stats.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="w-4 h-4 text-slate-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className={`flex items-center text-xs ${
                    stat.trend === 'up' ? 'text-emerald-600' : 
                    stat.trend === 'down' ? 'text-red-600' : 
                    'text-slate-600'
                  }`}>
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : stat.trend === 'down' ? (
                      <TrendingUp className="w-3 h-3 mr-1 transform rotate-180" />
                    ) : null}
                    {stat.change}
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-1">{stat.description}</p>
                {stat.link && (
                  <Button variant="ghost" size="sm" className="mt-2 h-6 px-2 text-xs" asChild>
                    <Link to={stat.link}>Voir plus</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Accès rapides */}
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Accès rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getQuickLinks().map((link, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer group">
              <Link to={link.link}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${link.color} group-hover:scale-105 transition-transform`}>
                      <link.iconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-900 group-hover:text-crec-gold transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        {link.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* Message de bienvenue personnalisé */}
      <Card className="bg-gradient-to-r from-crec-gold/10 to-crec-gold/5 border-crec-gold/20">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-crec-gold/20 rounded-lg">
              <School className="w-6 h-6 text-crec-gold" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                {hasRole(['super_admin']) && "Tableau de bord Super Administrateur"}
                {hasRole(['admin_contenu']) && "Tableau de bord Gestion des Contenus"}
                {hasRole(['admin_inscription']) && "Tableau de bord Gestion des Inscriptions"}
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                {hasRole(['super_admin']) && "Vous avez accès à toutes les fonctionnalités d'administration du système."}
                {hasRole(['admin_contenu']) && "Gérez le contenu du site web : formations, programmes, équipements et médias."}
                {hasRole(['admin_inscription']) && "Validez les inscriptions et gérez les communications avec les candidats."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardPage;