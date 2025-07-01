import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Import d'icônes et composants
import {
  Users,
  BookOpen,
  Calendar,
  School,
  Award,
  Clock,
  TrendingUp,
  FileText
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useApi } from '@/hooks/useApi';

interface DashboardStat {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  description: string;
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
  const { user } = useAuth();
  const api = useApi();
  
  // États pour les données du dashboard
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Charger les données du dashboard
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // TODO: Appel API pour récupérer les statistiques du tableau de bord
        // const response = await api.get('/admin/dashboard');
        // setStats(response.data.stats);
        // setRecentActivity(response.data.activities);
        
        // Pour l'instant, données vides ou d'exemple
        setStats([
          { 
            title: "Inscriptions",
            value: "0",
            change: "0%",
            trend: "neutral",
            description: "Nouvelles demandes" 
          },
          { 
            title: "Utilisateurs",
            value: "0",
            change: "0%",
            trend: "neutral",
            description: "Ce mois-ci" 
          },
          { 
            title: "Événements",
            value: "0",
            change: "0%",
            trend: "neutral",
            description: "À venir" 
          },
          { 
            title: "Réservations",
            value: "0",
            change: "0%",
            trend: "neutral",
            description: "FabLab cette semaine" 
          }
        ]);
        
        setRecentActivity([]);
        
      } catch (error) {
        console.error("Erreur lors du chargement des données du dashboard", error);
        setStats([]);
        setRecentActivity([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDashboardData();
  }, []);

  // Sections à éditer
  const quickLinks = [
    {
      title: "ISTM Université",
      iconComponent: School,
      description: "Gérer les filières et inscriptions universitaires",
      link: "/admin/contenus/istm",
      color: "bg-amber-100 text-amber-700"
    },
    {
      title: "Formations",
      iconComponent: BookOpen,
      description: "Gérer les formations ouvertes",
      link: "/admin/contenus/formations",
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "FabLab",
      iconComponent: Award,
      description: "Gérer les équipements et services du FabLab",
      link: "/admin/contenus/fablab",
      color: "bg-emerald-100 text-emerald-700"
    },
    {
      title: "Inscriptions",
      iconComponent: Calendar,
      description: "Gérer les demandes d'inscription",
      link: "/admin/inscriptions/istm",
      color: "bg-purple-100 text-purple-700"
    },
    {
      title: "Réservations FabLab",
      iconComponent: Calendar,
      description: "Statistiques et gestion des machines/prix du FabLab",
      link: "/admin/reservations/stats",
      color: "bg-pink-100 text-pink-700"
    },
    {
      title: "À propos",
      iconComponent: FileText,
      description: "Modifier la page À propos du site",
      link: "/admin/a-propos",
      color: "bg-gray-100 text-gray-700"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">
          Bienvenue, {user?.firstName || 'Administrateur'}
        </h1>
        <p className="text-sm text-slate-500">
          {new Date().toLocaleDateString('fr-FR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
      
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold">{stat.value}</p>
                <div className={`flex items-center text-xs ${
                  stat.trend === 'up' 
                    ? 'text-emerald-600' 
                    : stat.trend === 'down' 
                      ? 'text-red-600' 
                      : 'text-slate-600'
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
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Accès rapides */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Gestion du contenu</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickLinks.map((link, index) => (
              <Link key={index} to={link.link}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className={`w-12 h-12 rounded-full ${link.color} flex items-center justify-center mb-2`}>
                      <link.iconComponent className="h-8 w-8" />
                    </div>
                    <CardTitle>{link.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600">
                      {link.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Activité récente */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Activité récente</h2>
          <Card>
            <CardHeader>
              <CardTitle className="text-md">Dernières actions</CardTitle>
            </CardHeader>
            <CardContent>
              {recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex gap-3">
                      <div className={`w-8 h-8 rounded-full ${
                        activity.type === 'registration' ? 'bg-blue-100 text-blue-600' :
                        activity.type === 'event' ? 'bg-purple-100 text-purple-600' :
                        activity.type === 'content' ? 'bg-amber-100 text-amber-600' :
                        'bg-green-100 text-green-600'
                      } flex items-center justify-center flex-shrink-0`}>
                        <activity.iconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>{' '}
                          {activity.action}{' '}
                          <span className="font-medium">{activity.target}</span>
                        </p>
                        <p className="text-xs text-slate-500 flex items-center mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-slate-500">
                  <Clock className="h-12 w-12 mx-auto opacity-20 mb-2" />
                  <p>Aucune activité récente</p>
                </div>
              )}
              
              <Button 
                variant="outline" 
                className="w-full mt-4 text-sm"
                asChild
              >
                <Link to="/admin/activity">
                  Voir toute l'activité
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
