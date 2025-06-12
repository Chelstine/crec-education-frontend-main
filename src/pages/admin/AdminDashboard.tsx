import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  ArrowDown
} from 'lucide-react';

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
    satisfaction: 94.2
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
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      id: 3,
      type: 'project',
      title: 'Projet IoT terminé',
      user: 'Équipe Arduino',
      time: 'Il y a 1h',
      icon: Wrench,
      color: 'bg-purple-500'
    },
    {
      id: 4,
      type: 'formation',
      title: 'Nouvelle session Python',
      user: 'Dr. Sagbo',
      time: 'Il y a 2h',
      icon: BookOpen,
      color: 'bg-orange-500'
    }
  ]);

  const quickStats = [
    {
      title: 'Étudiants Actifs',
      value: stats.totalStudents,
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Total des étudiants inscrits'
    },
    {
      title: 'Candidatures',
      value: stats.pendingApplications,
      change: '+5',
      trend: 'up',
      icon: FileText,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      description: 'En attente de validation'
    },
    {
      title: 'Revenus Mensuels',
      value: `${(stats.monthlyRevenue / 1000000).toFixed(1)}M`,
      change: '+8.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      description: 'FCFA ce mois'
    },
    {
      title: 'Satisfaction',
      value: `${stats.satisfaction}%`,
      change: '+2.1%',
      trend: 'up',
      icon: Award,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Note moyenne étudiants'
    }
  ];

  const urgentTasks = [
    {
      id: 1,
      title: '5 documents à valider',
      description: 'Candidatures ISTMR',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      priority: 'high'
    },
    {
      id: 2,
      title: '3 paiements en attente',
      description: 'À vérifier',
      icon: UserCheck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Session démo FabLab',
      description: 'Prévue demain 14h',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      priority: 'low'
    }
  ];

  useEffect(() => {
    // Simulation du chargement des données
    const timer = setTimeout(() => {
      setStats({
        totalStudents: 248,
        pendingApplications: 17,
        activeFormations: 12,
        monthlyRevenue: 4250000,
        fabLabMembers: 68,
        completedProjects: 156,
        satisfaction: 94.2
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!isMainDashboard) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header avec salutation et actions */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-crec-gold to-yellow-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Tableau de Bord CREC
                </h1>
                <p className="text-gray-600">
                  Bienvenue ! Vue d'ensemble de votre institution éducative
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-4 lg:mt-0">
            <Button variant="outline" className="flex items-center gap-2 hover:bg-gray-50">
              <Download className="w-4 h-4" />
              Télécharger Rapport
            </Button>
            <Button 
              className="bg-gradient-to-r from-crec-gold to-yellow-600 hover:from-yellow-600 hover:to-crec-gold text-white flex items-center gap-2 shadow-lg"
              asChild
            >
              <Link to="/" target="_blank">
                <Eye className="w-4 h-4" />
                Voir le Site
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Cartes de statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`} />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`flex items-center gap-1 text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.trend === 'up' ? (
                        <ArrowUp className="w-4 h-4" />
                      ) : (
                        <ArrowDown className="w-4 h-4" />
                      )}
                      {stat.change}
                    </span>
                    <span className="text-gray-500 text-sm">vs mois dernier</span>
                  </div>
                  <p className="text-xs text-gray-600">{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Section principale avec 2 colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Colonne de gauche - Activités récentes */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-lg">Activité en Temps Réel</span>
                    <p className="text-sm text-gray-600 font-normal">Dernières actions sur la plateforme</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer border border-transparent hover:border-gray-200"
                    >
                      <div className={`p-3 rounded-full ${activity.color} shadow-lg`}>
                        <activity.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.user}</p>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{activity.time}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/admin/activities">
                      Voir toutes les activités
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Colonne de droite - Actions rapides et tâches */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Actions rapides */}
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-crec-gold to-yellow-600 rounded-lg">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg">Actions Rapides</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-4">
                <Link to="/admin/formations">
                  <Button variant="ghost" className="w-full justify-start h-12 hover:bg-blue-50 hover:text-blue-700">
                    <GraduationCap className="w-5 h-5 mr-3" />
                    Gérer les formations
                  </Button>
                </Link>
                <Link to="/admin/inscriptions/istmr">
                  <Button variant="ghost" className="w-full justify-start h-12 hover:bg-green-50 hover:text-green-700">
                    <FileText className="w-5 h-5 mr-3" />
                    Candidatures ISTMR
                  </Button>
                </Link>
                <Link to="/admin/inscriptions/fablab">
                  <Button variant="ghost" className="w-full justify-start h-12 hover:bg-purple-50 hover:text-purple-700">
                    <Wrench className="w-5 h-5 mr-3" />
                    FabLab & Projets
                  </Button>
                </Link>
                <Link to="/admin/pages">
                  <Button variant="ghost" className="w-full justify-start h-12 hover:bg-orange-50 hover:text-orange-700">
                    <Settings className="w-5 h-5 mr-3" />
                    Modifier le contenu
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Tâches urgentes */}
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg">Tâches Urgentes</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {urgentTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className={`flex items-center gap-3 p-3 ${task.bgColor} rounded-lg hover:shadow-sm transition-shadow cursor-pointer`}
                    >
                      <task.icon className={`w-5 h-5 ${task.color}`} />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">{task.title}</p>
                        <p className="text-xs text-gray-600">{task.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Section du bas - Vue d'ensemble des programmes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-xl">Vue d'Ensemble des Programmes</span>
                  <p className="text-sm text-gray-600 font-normal">Statistiques par domaine</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* ISTMR */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-blue-800 mb-1">ISTMR</h3>
                  <p className="text-sm text-blue-600 mb-4">Formation Universitaire</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Étudiants:</span>
                      <span className="font-bold text-lg text-blue-800">125</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Candidatures:</span>
                      <span className="font-bold text-lg text-orange-600">12</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-blue-500 hover:bg-blue-600" 
                    size="sm"
                    asChild
                  >
                    <Link to="/admin/formations/istmr">
                      Gérer ISTMR
                    </Link>
                  </Button>
                </motion.div>

                {/* Formations Ouvertes */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-green-800 mb-1">Formations</h3>
                  <p className="text-sm text-green-600 mb-4">Programmes Ouverts</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Participants:</span>
                      <span className="font-bold text-lg text-green-800">89</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Sessions actives:</span>
                      <span className="font-bold text-lg text-green-600">8</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-green-500 hover:bg-green-600" 
                    size="sm"
                    asChild
                  >
                    <Link to="/admin/formations/ouvertes">
                      Gérer Formations
                    </Link>
                  </Button>
                </motion.div>

                {/* FabLab */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-100 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Wrench className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-purple-800 mb-1">FabLab</h3>
                  <p className="text-sm text-purple-600 mb-4">Innovation & Créativité</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Membres:</span>
                      <span className="font-bold text-lg text-purple-800">68</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Projets actifs:</span>
                      <span className="font-bold text-lg text-purple-600">23</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-purple-500 hover:bg-purple-600" 
                    size="sm"
                    asChild
                  >
                    <Link to="/admin/formations/fablab">
                      Gérer FabLab
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
