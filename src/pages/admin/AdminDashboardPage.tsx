import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AdminRole } from '@/types';

import {
  Users,
  BookOpen,
  Calendar,
  School,
  Award,
  TrendingUp,
  FileText,
  Settings,
  Bell,
  FileImage,
  MapPin,
  Zap,
  ChevronRight
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import api from '@/services/api';

interface DashboardStat {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  description: string;
  icon: React.ElementType;
}

interface QuickLink {
  title: string;
  icon: React.ElementType;
  description: string;
  path: string;
  color: string;
  roles: AdminRole[];
}

const AdminDashboardPage: React.FC = () => {
  const { user, hasRole } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bonjour";
    if (hour < 18) return "Bonne après-midi";
    return "Bonsoir";
  };

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/admin/content/stats');
        const data = response.data;

        const newStats: DashboardStat[] = [
          {
            title: "Université (ISTMR)",
            value: (data.istm?.total || 0).toString(),
            change: `${data.istm?.active || 0} actifs`,
            changeType: 'neutral',
            description: "Programmes académiques",
            icon: School
          },
          {
            title: "Formations Courtes",
            value: (data.formations?.total || 0).toString(),
            change: `${data.formations?.active || 0} sessions`,
            changeType: 'increase',
            description: "Offres certifiantes",
            icon: BookOpen
          },
          {
            title: "FabLab & Innovation",
            value: (data.fablab?.total || 0).toString(),
            change: `${data.fablab?.active || 0} dispo`,
            changeType: 'increase',
            description: "Machines et projets",
            icon: Zap
          },
          {
            title: "Administration",
            value: "12",
            change: "Utilisateurs",
            changeType: 'neutral',
            description: "Comptes actifs",
            icon: Users
          }
        ];

        setStats(newStats);
      } catch (error) {
        console.error("Erreur dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, [user?.role]);

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'super_admin': return 'Super Admin';
      case 'admin_contenu': return 'Admin Contenu';
      case 'admin_inscription': return 'Admin Inscription';
      default: return role;
    }
  };

  const allQuickLinks: QuickLink[] = [
    {
      title: "Utilisateurs",
      icon: Users,
      description: "Gérer les accès",
      path: "/admin/parametres/utilisateurs-roles",
      color: "text-red-600 bg-red-100",
      roles: ['super_admin']
    },
    {
      title: "Université",
      icon: School,
      description: "Programmes ISTM",
      path: "/admin/contenus/istm",
      color: "text-amber-600 bg-amber-100",
      roles: ['super_admin', 'admin_contenu']
    },
    {
      title: "Formations",
      icon: BookOpen,
      description: "Catalogue certifiant",
      path: "/admin/contenus/formations",
      color: "text-blue-600 bg-blue-100",
      roles: ['super_admin', 'admin_contenu']
    },
    {
      title: "FabLab",
      icon: Zap,
      description: "Ateliers et machines",
      path: "/admin/contenus/fablab",
      color: "text-emerald-600 bg-emerald-100",
      roles: ['super_admin', 'admin_contenu']
    },
    {
      title: "Événements",
      icon: Calendar,
      description: "Agenda",
      path: "/admin/contenus/evenements",
      color: "text-purple-600 bg-purple-100",
      roles: ['super_admin', 'admin_contenu']
    },
    {
      title: "Galerie",
      icon: FileImage,
      description: "Média & Photos",
      path: "/admin/contenus/galerie",
      color: "text-pink-600 bg-pink-100",
      roles: ['super_admin', 'admin_contenu']
    }
  ];

  const quickLinks = allQuickLinks.filter(link =>
    link.roles.some(role => hasRole([role]))
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-crec-gold"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-serif">
      {/* En-tête de bienvenue Classique - Clean */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-slate-100 text-slate-800 border border-slate-200 px-3 py-0.5 rounded text-[11px] font-bold tracking-widest uppercase">
                ESPACE ADMINISTRATION
              </span>
            </div>
            <h2 className="text-3xl font-bold text-crec-darkblue mb-2">
              {getGreeting()}, {user?.prenom}.
            </h2>
            <p className="text-slate-600 text-[15px] leading-relaxed">
              Bienvenue dans votre espace de gestion <span className="font-bold">CREC</span>.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="bg-slate-50 px-4 py-3 rounded border border-slate-200 flex items-center gap-3">
              <div className="w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-slate-600" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Rôle</p>
                <p className="text-xs font-bold text-crec-darkblue leading-none">{getRoleDisplayName(user?.role || '')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques rapides - Classique */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm hover:border-crec-gold/50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-slate-50 rounded border border-slate-100">
                <stat.icon className="h-5 w-5 text-crec-darkblue" />
              </div>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${stat.changeType === 'increase' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                  'bg-slate-100 text-slate-600 border-slate-200'
                }`}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">{stat.title}</p>
              <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{stat.value}</h3>
              <p className="text-[13px] text-slate-500 mt-1 italic">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graphique / Activité - Classique */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-crec-darkblue flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Activité Récente
              </h3>
              <p className="text-slate-500 text-[11px] mt-0.5 uppercase tracking-wider font-semibold">Aperçu du système</p>
            </div>
            <Button variant="outline" size="sm" className="h-8 text-xs border-slate-200 text-slate-600 hover:bg-slate-50">
              Historique
            </Button>
          </div>
          <div className="h-64 flex flex-col items-center justify-center bg-slate-50 rounded border border-slate-200 border-dashed">
            <div className="p-4 bg-white shadow-sm border border-slate-200 rounded-full mb-3">
              <Zap className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-slate-700 font-bold text-sm">Statistiques disponibles bientôt</p>
            <p className="text-slate-500 text-xs mt-1 max-w-sm text-center px-4">Les indicateurs détaillés seront activés lors de la prochaine mise à jour.</p>
          </div>
        </div>

        {/* Liens rapides - Classique */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-crec-darkblue flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Accès Rapide
            </h3>
            <p className="text-slate-500 text-[11px] mt-0.5 uppercase tracking-wider font-semibold">Menu principal</p>
          </div>
          <div className="space-y-3">
            {quickLinks.map((link, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start h-auto py-3 px-4 bg-white border-slate-200 hover:bg-slate-50 hover:border-crec-darkblue/30 transition-all rounded"
                onClick={() => navigate(link.path)}
              >
                <div className={`mr-4 p-2 rounded bg-slate-50 border border-slate-100 ${link.color.replace('bg-', 'bg-opacity-10 ')}`}>
                  <link.icon className="h-4 w-4 text-slate-700" />
                </div>
                <div className="text-left flex-1">
                  <span className="font-bold text-slate-800 block text-[13px]">
                    {link.title}
                  </span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wide mt-0.5 block">
                    {link.description}
                  </span>
                </div>
                <ChevronRight className="ml-1 h-4 w-4 text-slate-300" />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;