import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import { 
  Users, 
  FileText, 
  Calendar, 
  DollarSign,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  Download,
  TrendingUp,
  GraduationCap,
  Wrench,
  BookOpen,
  Award,
  Target,
  Activity,
  UserCheck,
  Zap,
  BarChart3,
  Settings,
  Plus,
  ArrowUp,
  ArrowDown,
  Bell,
  Star
} from 'lucide-react';
import { 
  getBadgeColor, 
  exportToCSV, 
  calculateStats,
  formatDate,
  formatDateTime 
} from '../../utils/adminUtils';

const AdminDashboard: React.FC = () => {
  const location = useLocation();
  const isMainDashboard = location.pathname === '/admin' || location.pathname === '/admin/';

  const [stats, setStats] = useState({
    totalStudents: 248,
    pendingApplications: 17,
    activeFormations: 12,
    monthlyRevenue: 4250000,
    fabLabMembers: 68,
    completedProjects: 156,
    satisfaction: 94.2,
    totalEvents: 8,
    publishedArticles: 24,
    weeklyGrowth: 12.5
  });

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      type: 'application',
      title: 'Nouvelle candidature ISTMR',
      user: 'Marie Koffi',
      time: 'Il y a 5 min',
      icon: GraduationCap,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Paiement validé FabLab',
      user: 'Jean Hounkpatin',
      time: 'Il y a 12 min',
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      id: 3,
      type: 'event',
      title: 'Nouvel événement créé',
      user: 'Admin',
      time: 'Il y a 1 heure',
      icon: Calendar,
      color: 'bg-purple-500'
    },
    {
      id: 4,
      type: 'article',
      title: 'Article publié',
      user: 'Dr. Ablodé',
      time: 'Il y a 2 heures',
      icon: FileText,
      color: 'bg-orange-500'
    },
    {
      id: 5,
      type: 'formation',
      title: 'Formation mise à jour',
      user: 'P. Kouakou',
      time: 'Il y a 3 heures',
      icon: BookOpen,
      color: 'bg-indigo-500'
    }
  ]);

  const [quickActions] = useState([
    {
      title: 'Gérer Événements',
      description: 'Créer et gérer les événements',
      icon: Calendar,
      color: 'bg-blue-500',
      link: '/admin/events'
    },
    {
      title: 'Formations Ouvertes',
      description: 'Gérer les formations ouvertes',
      icon: BookOpen,
      color: 'bg-green-500',
      link: '/admin/formations/ouvertes'
    },
    {
      title: 'Formation ISTMR',
      description: 'Gérer les candidatures ISTMR',
      icon: GraduationCap,
      color: 'bg-purple-500',
      link: '/admin/formations/istmr'
    },
    {
      title: 'Réservations FabLab',
      description: 'Gérer les réservations FabLab',
      icon: Wrench,
      color: 'bg-orange-500',
      link: '/admin/reservations/fablab'
    }
  ]);

  const [pendingTasks] = useState([
    {
      id: 1,
      title: 'Valider 17 candidatures ISTMR',
      priority: 'high',
      dueDate: '2024-12-25',
      type: 'validation'
    },
    {
      id: 2,
      title: 'Réviser 5 articles en attente',
      priority: 'medium',
      dueDate: '2024-12-27',
      type: 'review'
    },
    {
      id: 3,
      title: 'Programmer 3 événements janvier',
      priority: 'low',
      dueDate: '2024-12-30',
      type: 'planning'
    },
    {
      id: 4,
      title: 'Mettre à jour formations 2025',
      priority: 'medium',
      dueDate: '2024-12-28',
      type: 'update'
    }
  ]);

  useEffect(() => {
    // Simulation de récupération des données
    const timer = setTimeout(() => {
      // Ici on pourrait faire des appels API réels
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getGrowthIcon = (value: number) => {
    return value > 0 ? (
      <ArrowUp className="h-4 w-4 text-green-600" />
    ) : (
      <ArrowDown className="h-4 w-4 text-red-600" />
    );
  };

  if (!isMainDashboard) {
    return <Outlet />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Tableau de Bord Administrateur
          </h1>
          <p className="text-gray-600 mt-1">
            Vue d'ensemble de l'activité du CREC - {formatDate(new Date().toISOString())}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" aria-label="Download report" title="Download report">
            <Download className="mr-2 h-4 w-4" />
            Rapport
          </Button>
          <Button variant="outline" size="sm" aria-label="Open settings" title="Open settings">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Étudiants Total</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">{stats.totalStudents}</div>
              <div className="flex items-center text-xs text-blue-600">
                {getGrowthIcon(stats.weeklyGrowth)}
                <span className="ml-1">+{stats.weeklyGrowth}% cette semaine</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Formations Actives</CardTitle>
              <BookOpen className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">{stats.activeFormations}</div>
              <p className="text-xs text-green-600">
                {stats.totalStudents} étudiants inscrits
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Événements</CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">{stats.totalEvents}</div>
              <p className="text-xs text-purple-600">
                Ce mois-ci
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenus Mensuels</CardTitle>
              <DollarSign className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-700">
                {(stats.monthlyRevenue / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-orange-600">
                FCFA ce mois
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Statistiques secondaires */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Bell className="mr-2 h-5 w-5 text-red-500" />
                Candidatures en Attente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600 mb-2">
                {stats.pendingApplications}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>ISTMR</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>FabLab</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Formations ouvertes</span>
                  <span className="font-medium">2</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Activity className="mr-2 h-5 w-5 text-blue-500" />
                FabLab & Projets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Membres FabLab</span>
                    <span className="text-xl font-bold">{stats.fabLabMembers}</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Projets Complétés</span>
                    <span className="text-xl font-bold">{stats.completedProjects}</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Star className="mr-2 h-5 w-5 text-yellow-500" />
                Satisfaction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-600 mb-2">
                  {stats.satisfaction}%
                </div>
                <div className="text-sm text-gray-500 mb-4">
                  Satisfaction globale
                </div>
                <Progress value={stats.satisfaction} className="h-3" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Actions rapides et activités récentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Actions rapides */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="mr-2 h-5 w-5 text-blue-500" />
                Actions Rapides
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Link key={index} to={action.link}>
                    <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
                        <action.icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="font-medium text-sm">{action.title}</h3>
                      <p className="text-xs text-gray-500">{action.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Activités récentes */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5 text-green-500" />
                Activités Récentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full ${activity.color} flex items-center justify-center`}>
                      <activity.icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {activity.user} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tâches en attente */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-orange-500" />
              Tâches en Attente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 border-l-4 rounded-r-lg ${getPriorityColor(task.priority)}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm">{task.title}</h3>
                    <span className="text-xs text-gray-500">
                      Échéance: {formatDate(task.dueDate)}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority === 'high' ? 'Priorité haute' :
                       task.priority === 'medium' ? 'Priorité moyenne' : 'Priorité basse'}
                    </span>
                    <Button size="sm" variant="outline">
                      Traiter
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
