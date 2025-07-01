import React from 'react';
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

const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();
  
  // Stats fictives pour le dashboard
  const stats = [
    { 
      title: "Inscriptions",
      value: "24",
      change: "+12%",
      trend: "up",
      description: "Nouvelles demandes" 
    },
    { 
      title: "Utilisateurs",
      value: "563",
      change: "+5%",
      trend: "up",
      description: "Ce mois-ci" 
    },
    { 
      title: "Événements",
      value: "8",
      change: "0%",
      trend: "neutral",
      description: "À venir" 
    },
    { 
      title: "Réservations",
      value: "47",
      change: "-3%",
      trend: "down",
      description: "FabLab cette semaine" 
    }
  ];
  
  // Liste des tâches récentes
  const recentActivity = [
    { 
      id: 1,
      type: "registration",
      user: "Jean Dupont",
      action: "a fait une demande d'inscription",
      target: "Formation Web",
      time: "Il y a 2 heures",
      icon: <BookOpen className="h-5 w-5" />
    },
    { 
      id: 2,
      type: "event",
      user: "Marie Laurent",
      action: "a modifié l'événement",
      target: "Conférence IA Éthique",
      time: "Il y a 5 heures",
      icon: <Calendar className="h-5 w-5" />
    },
    { 
      id: 3,
      type: "content",
      user: "Admin",
      action: "a mis à jour la page",
      target: "À propos",
      time: "Hier",
      icon: <FileText className="h-5 w-5" />
    },
    { 
      id: 4,
      type: "user",
      user: "Patrick Kouamé",
      action: "s'est inscrit comme",
      target: "Administrateur",
      time: "Il y a 2 jours",
      icon: <Users className="h-5 w-5" />
    }
  ];

  // Sections à éditer
  const quickLinks = [
    {
      title: "ISTM Université",
      icon: <School className="h-8 w-8 text-amber-600" />,
      description: "Gérer les filières et inscriptions universitaires",
      link: "/admin/contenus/istm",
      color: "bg-amber-100 text-amber-700"
    },
    {
      title: "Formations",
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      description: "Gérer les formations ouvertes",
      link: "/admin/contenus/formations",
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "FabLab",
      icon: <Award className="h-8 w-8 text-emerald-600" />,
      description: "Gérer les équipements et services du FabLab",
      link: "/admin/contenus/fablab",
      color: "bg-emerald-100 text-emerald-700"
    },
    {
      title: "Inscriptions",
      icon: <Calendar className="h-8 w-8 text-purple-600" />,
      description: "Gérer les demandes d'inscription",
      link: "/admin/inscriptions/istm",
      color: "bg-purple-100 text-purple-700"
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
                      {link.icon}
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
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex gap-3">
                    <div className={`w-8 h-8 rounded-full ${
                      activity.type === 'registration' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'event' ? 'bg-purple-100 text-purple-600' :
                      activity.type === 'content' ? 'bg-amber-100 text-amber-600' :
                      'bg-green-100 text-green-600'
                    } flex items-center justify-center flex-shrink-0`}>
                      {activity.icon}
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
