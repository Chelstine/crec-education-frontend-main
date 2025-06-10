import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
  HelpCircle,
  LogOut,
  BarChart3
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [adminName] = useState('Admin CREC'); // En production, récupérer du localStorage ou API
  const [stats, setStats] = useState({
    pendingApplications: 0,
    acceptedThisMonth: 0,
    pendingPayments: 0,
    activeFabLabSubscriptions: 0
  });

  const [urgentTasks, setUrgentTasks] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState<'today' | 'week' | 'month'>('month');

  useEffect(() => {
    // Simuler appel API
    setTimeout(() => {
      setStats({
        pendingApplications: 10,
        acceptedThisMonth: 50,
        pendingPayments: 5,
        activeFabLabSubscriptions: 20
      });

      setUrgentTasks([
        { 
          id: 1, 
          message: '3 dossiers Université à vérifier', 
          priority: 'high',
          link: '/admin/inscriptions/university'
        },
        { 
          id: 2, 
          message: '2 paiements FabLab en attente', 
          priority: 'medium',
          link: '/admin/inscriptions/fablab'
        },
        { 
          id: 3, 
          message: '5 documents à valider', 
          priority: 'low',
          link: '/admin/inscriptions/formations'
        }
      ]);

      // Données pour graphique simple (6 derniers mois)
      setMonthlyData([
        { month: 'Jan', university: 8, formations: 12, fablab: 3 },
        { month: 'Fév', university: 12, formations: 15, fablab: 5 },
        { month: 'Mar', university: 15, formations: 18, fablab: 7 },
        { month: 'Avr', university: 10, formations: 20, fablab: 6 },
        { month: 'Mai', university: 18, formations: 25, fablab: 8 },
        { month: 'Juin', university: 20, formations: 22, fablab: 10 }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  const exportReport = () => {
    // Simuler export PDF/Excel
    console.log('Export rapport...', { timeFilter, stats });
    // En production: générer et télécharger le rapport
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-crec-gold"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête avec salutation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Bonjour, {adminName} 👋
            </h1>
            <p className="text-slate-200 text-lg">
              Voici un aperçu de l'activité de votre plateforme CREC
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={exportReport}
              className="flex items-center space-x-2 bg-crec-gold text-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Télécharger rapport</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Se déconnecter</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Filtres temporels */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center space-x-4"
      >
        <span className="text-sm font-medium text-gray-700">Période :</span>
        {(['today', 'week', 'month'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setTimeFilter(filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              timeFilter === filter
                ? 'bg-crec-gold text-black'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter === 'today' && 'Aujourd\'hui'}
            {filter === 'week' && 'Semaine'}
            {filter === 'month' && 'Mois'}
          </button>
        ))}
      </motion.div>

      {/* Cartes de statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/admin/inscriptions/university">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-crec-gold hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Dossiers en attente</p>
                  <p className="text-3xl font-bold text-slate-800 mt-2">{stats.pendingApplications}</p>
                  <p className="text-sm text-gray-500 mt-1">candidatures</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link to="/admin/inscriptions">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-crec-gold hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Inscriptions acceptées</p>
                  <p className="text-3xl font-bold text-slate-800 mt-2">{stats.acceptedThisMonth}</p>
                  <p className="text-sm text-gray-500 mt-1">ce mois</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/admin/inscriptions/fablab">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-crec-gold hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Paiements à vérifier</p>
                  <p className="text-3xl font-bold text-slate-800 mt-2">{stats.pendingPayments}</p>
                  <p className="text-sm text-gray-500 mt-1">reçus</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <FileText className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/admin/inscriptions/fablab">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-crec-gold hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Abonnements FabLab actifs</p>
                  <p className="text-3xl font-bold text-slate-800 mt-2">{stats.activeFabLabSubscriptions}</p>
                  <p className="text-sm text-gray-500 mt-1">abonnés</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Section "À faire" - Alertes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-lg shadow-sm border p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">📋 À faire</h3>
          <span className="text-sm text-gray-500">Actions prioritaires</span>
        </div>
        <div className="space-y-3">
          {urgentTasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * task.id }}
            >
              <Link
                to={task.link}
                className={`flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-shadow ${getPriorityColor(task.priority)}`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-current"></div>
                  <span className="font-medium">{task.message}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium px-2 py-1 rounded bg-white bg-opacity-50">
                    {task.priority === 'high' && 'Urgent'}
                    {task.priority === 'medium' && 'Important'}
                    {task.priority === 'low' && 'Normal'}
                  </span>
                  <Eye className="h-4 w-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Graphique simple des inscriptions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-lg shadow-sm border p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Inscriptions par catégorie
            </h3>
            <p className="text-sm text-gray-600">6 derniers mois</p>
          </div>
        </div>

        {/* Graphique en barres simple */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-crec-gold rounded"></div>
              <span>Université</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Formations</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-500 rounded"></div>
              <span>FabLab</span>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-4 h-32">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex flex-col items-center space-y-1">
                <div className="flex-1 flex flex-col justify-end space-y-1 w-full">
                  <div
                    className="bg-gray-500 rounded-t"
                    style={{ height: `${(data.fablab / 30) * 100}%` }}
                  ></div>
                  <div
                    className="bg-blue-500 rounded-t"
                    style={{ height: `${(data.formations / 30) * 100}%` }}
                  ></div>
                  <div
                    className="bg-crec-gold rounded-t"
                    style={{ height: `${(data.university / 30) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600">{data.month}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Aide rapide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-blue-50 border border-blue-200 rounded-lg p-6"
      >
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <HelpCircle className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">💡 Aide rapide</h4>
            <p className="text-blue-800 text-sm mb-3">
              Cliquez sur 'Inscriptions' pour gérer les dossiers. Utilisez les cartes ci-dessus pour naviguer rapidement.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-700">
              <div>• Cartes cliquables pour navigation rapide</div>
              <div>• Section "À faire" pour les urgences</div>
              <div>• Graphique pour suivre les tendances</div>
              <div>• Bouton "?" pour aide contextuelle</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
