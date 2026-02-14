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
            title: "Patrimoine ISTM",
            value: (data.istm?.total || 0).toString(),
            change: `${data.istm?.active || 0} programmes actifs`,
            changeType: 'neutral',
            description: "Cursus et diplômes de la Faculté",
            icon: School
          },
          {
            title: "Offres Professionnelles",
            value: (data.formations?.total || 0).toString(),
            change: `${data.formations?.active || 0} sessions ouvertes`,
            changeType: 'increase',
            description: "Rayonnement du catalogue certificateur",
            icon: BookOpen
          },
          {
            title: "Ressources Laboratoire",
            value: (data.fablab?.total || 0).toString(),
            change: `${data.fablab?.active || 0} machines prêtes`,
            changeType: 'increase',
            description: "Inventaire et projets du FabLab",
            icon: Zap
          },
          {
            title: "Gouvernance",
            value: "12",
            change: "Membres du Cabinet",
            changeType: 'neutral',
            description: "Administrateurs et gestionnaires actifs",
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
      case 'super_admin': return 'Super Administrateur';
      case 'admin_contenu': return 'Admin Contenu';
      case 'admin_inscription': return 'Admin Inscription';
      default: return role;
    }
  };

  const allQuickLinks: QuickLink[] = [
    {
      title: "Gestion des Membres",
      icon: Users,
      description: "Administrer la gouvernance",
      path: "/admin/parametres/utilisateurs-roles",
      color: "text-red-600 bg-red-100",
      roles: ['super_admin']
    },
    {
      title: "Programmes ISTM",
      icon: School,
      description: "Éditer le catalogue académique",
      path: "/admin/contenus/istm",
      color: "text-amber-600 bg-amber-100",
      roles: ['super_admin', 'admin_contenu']
    },
    {
      title: "OFFRES CERTIFIANTES",
      icon: BookOpen,
      description: "Gérer le rayonnement professionnel",
      path: "/admin/contenus/formations",
      color: "text-blue-600 bg-blue-100",
      roles: ['super_admin', 'admin_contenu']
    },
    {
      title: "ATELIER FABLAB",
      icon: Zap,
      description: "Inventaire des ressources technologiques",
      path: "/admin/contenus/fablab",
      color: "text-emerald-600 bg-emerald-100",
      roles: ['super_admin', 'admin_contenu']
    },
    {
      title: "Rayonnement Événementiel",
      icon: Calendar,
      description: "Agenda de l'institution",
      path: "/admin/contenus/evenements",
      color: "text-purple-600 bg-purple-100",
      roles: ['super_admin', 'admin_contenu']
    },
    {
      title: "Archives Visuelles",
      icon: FileImage,
      description: "Gestion de la photothèque",
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
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* En-tête de bienvenue Glassmorphism Refiné - Compact */}
      <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group border border-white/60 shadow-lg">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-crec-gold/20 to-transparent rounded-full blur-[80px] transform translate-x-1/4 -translate-y-1/4"></div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-crec-gold/10 text-crec-gold border-crec-gold/20 hover:bg-crec-gold/20 px-3 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase">
                  Tableau de Bord Institutionnel
                </Badge>
              </div>
              <h2 className="text-3xl font-bold admin-title mb-2">
                {getGreeting()}, {user?.prenom}.
              </h2>
              <p className="text-slate-600 text-base font-medium leading-relaxed">
                Votre centre de contrôle est prêt. Le patrimoine académique du <span className="text-crec-darkblue font-bold">CREC</span> est sous votre supervision.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-3 bg-white/40 border-white/80">
                <div className="w-8 h-8 bg-crec-gold/10 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-crec-gold" />
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold text-slate-400 tracking-tighter">Accès Autorisé</p>
                  <p className="text-xs font-bold text-crec-darkblue leading-none">{getRoleDisplayName(user?.role || '')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques rapides raffinées - Compact */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="glass-card rounded-xl p-4 border border-white/60 hover:border-crec-gold/40">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-white/60 rounded-lg shadow-inner border border-white/40">
                <stat.icon className="h-5 w-5 text-crec-darkblue animate-pulse" />
              </div>
              <Badge variant="secondary" className="bg-crec-darkblue/5 text-crec-darkblue border-crec-darkblue/10 font-bold text-[10px] px-2 py-0.5">
                {stat.change}
              </Badge>
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-500 mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-slate-800 tracking-tighter">{stat.value}</h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graphique / Activité - Compact */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 shadow-lg border border-white/60">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold admin-title flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-crec-gold" />
                Vaisseau de Bord & Activité
              </h3>
              <p className="text-slate-400 text-[10px] mt-0.5 uppercase tracking-widest font-bold">Flux de données en temps réel</p>
            </div>
            <Button variant="ghost" size="sm" className="glass-button rounded-full px-4 h-8 text-xs">
              Archives
            </Button>
          </div>
          <div className="h-64 flex flex-col items-center justify-center bg-white/30 rounded-xl border border-white/40 shadow-inner group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-crec-darkblue/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="p-4 bg-white shadow-lg rounded-full mb-4 group-hover:scale-110 transition-transform duration-500">
              <Zap className="w-8 h-8 text-crec-gold" />
            </div>
            <p className="text-crec-darkblue font-bold text-base">Système d'Analyse en Préparation</p>
            <p className="text-slate-500 text-xs mt-1 max-w-sm text-center px-4">Les indicateurs de performance et les flux d'activité seront déployés lors de la prochaine mise à jour de la gouvernance.</p>
          </div>
        </div>

        {/* Liens rapides - Compact */}
        <div className="glass-panel rounded-2xl p-6 shadow-lg border border-white/60">
          <div className="mb-6">
            <h3 className="text-xl font-bold admin-title flex items-center gap-2">
              <Zap className="w-5 h-5 text-crec-gold" />
              Accès Privilégiés
            </h3>
            <p className="text-slate-400 text-[10px] mt-0.5 uppercase tracking-widest font-bold">Raccourcis de gestion</p>
          </div>
          <div className="space-y-3">
            {quickLinks.map((link, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start h-auto py-3 px-4 glass-card border-white/60 group relative overflow-hidden"
                onClick={() => navigate(link.path)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-crec-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className={`mr-4 p-2 rounded-xl bg-white shadow-sm group-hover:shadow-md transition-all border border-slate-100 ${link.color}`}>
                  <link.icon className="h-5 w-5" />
                </div>
                <div className="text-left relative z-10 flex-1">
                  <span className="font-bold text-slate-800 group-hover:text-crec-darkblue block text-sm tracking-tight">
                    {link.title}
                  </span>
                  <span className="text-[9px] text-slate-400 group-hover:text-slate-600 font-bold uppercase tracking-widest mt-0.5 block">
                    {link.description}
                  </span>
                </div>
                <ChevronRight className="ml-1 h-4 w-4 text-slate-300 group-hover:text-crec-gold transition-colors transform group-hover:translate-x-1 duration-300" />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;