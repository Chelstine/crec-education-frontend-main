import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  Heart,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Wrench
} from 'lucide-react';
import {
  inscriptionISTService,
  inscriptionFormationOuverteService,
  abonnementFabLabService,
  reservationFabLabService,
  evenementService,
  messageContactService,
  donService
} from '@/services/adminService';

interface DashboardStats {
  inscriptionsIST: number;
  inscriptionsFormations: number;
  abonnementsFabLab: number;
  reservationsActives: number;
  evenementsProchains: number;
  messagesNonLus: number;
  donsPendants: number;
}

const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    inscriptionsIST: 0,
    inscriptionsFormations: 0,
    abonnementsFabLab: 0,
    reservationsActives: 0,
    evenementsProchains: 0,
    messagesNonLus: 0,
    donsPendants: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [
          inscriptionsIST,
          inscriptionsFormations,
          abonnements,
          reservations,
          evenements,
          messages,
          dons
        ] = await Promise.all([
          inscriptionISTService.getAll(),
          inscriptionFormationOuverteService.getAll(),
          abonnementFabLabService.getAll(),
          reservationFabLabService.getAll(),
          evenementService.getAll(),
          messageContactService.getAll(),
          donService.getAll()
        ]);

        const today = new Date();
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

        setStats({
          inscriptionsIST: inscriptionsIST.filter(i => i.status === 'pending').length,
          inscriptionsFormations: inscriptionsFormations.filter(i => i.status === 'pending').length,
          abonnementsFabLab: abonnements.filter(a => a.status === 'pending').length,
          reservationsActives: reservations.filter(r => r.status === 'active').length,
          evenementsProchains: evenements.filter(e => {
            const eventDate = new Date(e.date);
            return eventDate >= today && eventDate <= nextWeek;
          }).length,
          messagesNonLus: messages.filter(m => m.status === 'new').length,
          donsPendants: dons.filter(d => d.status === 'pending').length
        });
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  const dashboardCards = [
    {
      title: 'Inscriptions ISTMR',
      value: stats.inscriptionsIST,
      icon: Users,
      color: 'bg-blue-500',
      description: 'En attente de validation',
      link: '/admin/formations/inscriptions-ist'
    },
    {
      title: 'Formations Ouvertes',
      value: stats.inscriptionsFormations,
      icon: BookOpen,
      color: 'bg-green-500',
      description: 'Inscriptions en attente',
      link: '/admin/formations/inscriptions-ouvertes'
    },
    {
      title: 'Abonnements FabLab',
      value: stats.abonnementsFabLab,
      icon: Wrench,
      color: 'bg-purple-500',
      description: 'À valider',
      link: '/admin/fablab/abonnements'
    },
    {
      title: 'Réservations Actives',
      value: stats.reservationsActives,
      icon: Clock,
      color: 'bg-yellow-500',
      description: 'En cours',
      link: '/admin/fablab/reservations'
    },
    {
      title: 'Événements Prochains',
      value: stats.evenementsProchains,
      icon: Calendar,
      color: 'bg-indigo-500',
      description: 'Cette semaine',
      link: '/admin/evenements/calendrier'
    },
    {
      title: 'Messages Non Lus',
      value: stats.messagesNonLus,
      icon: MessageSquare,
      color: 'bg-red-500',
      description: 'Nouveaux messages',
      link: '/admin/contacts'
    },
    {
      title: 'Dons en Attente',
      value: stats.donsPendants,
      icon: Heart,
      color: 'bg-pink-500',
      description: 'À valider',
      link: '/admin/dons'
    }
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'inscription',
      message: 'Nouvelle inscription ISTMR reçue',
      time: 'Il y a 2 heures',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      id: '2',
      type: 'message',
      message: 'Nouveau message de contact',
      time: 'Il y a 4 heures',
      icon: MessageSquare,
      color: 'text-green-600'
    },
    {
      id: '3',
      type: 'reservation',
      message: 'Nouvelle réservation FabLab',
      time: 'Il y a 6 heures',
      icon: Calendar,
      color: 'text-purple-600'
    },
    {
      id: '4',
      type: 'don',
      message: 'Nouveau don reçu',
      time: 'Hier',
      icon: Heart,
      color: 'text-pink-600'
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Tableau de Bord
        </h1>
        <p className="text-gray-600">
          Vue d'ensemble de l'activité du Centre Jésus de Godomé
        </p>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dashboardCards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => window.location.href = card.link}
          >
            <div className="flex items-center">
              <div className={`${card.color} rounded-lg p-3`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-sm font-medium text-gray-500 truncate">
                  {card.title}
                </h3>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">
                    {card.value}
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {card.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section avec activités récentes et aperçu */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activités récentes */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Activités Récentes
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <activity.icon className={`h-5 w-5 ${activity.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 truncate">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <CheckCircle className="mr-2 h-5 w-5" />
              Actions Rapides
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-3">
              <button 
                onClick={() => window.location.href = '/admin/formations/inscriptions-ist'}
                className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <span className="text-sm font-medium text-blue-900">
                  Valider les inscriptions ISTMR
                </span>
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  {stats.inscriptionsIST}
                </span>
              </button>
              
              <button 
                onClick={() => window.location.href = '/admin/contacts'}
                className="flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <span className="text-sm font-medium text-green-900">
                  Répondre aux messages
                </span>
                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                  {stats.messagesNonLus}
                </span>
              </button>
              
              <button 
                onClick={() => window.location.href = '/admin/fablab/abonnements'}
                className="flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <span className="text-sm font-medium text-purple-900">
                  Valider les abonnements FabLab
                </span>
                <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                  {stats.abonnementsFabLab}
                </span>
              </button>
              
              <button 
                onClick={() => window.location.href = '/admin/dons'}
                className="flex items-center justify-between p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
              >
                <span className="text-sm font-medium text-pink-900">
                  Valider les dons
                </span>
                <span className="bg-pink-600 text-white text-xs px-2 py-1 rounded-full">
                  {stats.donsPendants}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Alertes et notifications */}
      {(stats.inscriptionsIST > 0 || stats.messagesNonLus > 0 || stats.donsPendants > 0) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
            <h3 className="text-sm font-medium text-yellow-800">
              Actions requises
            </h3>
          </div>
          <div className="mt-2 text-sm text-yellow-700">
            <ul className="list-disc list-inside space-y-1">
              {stats.inscriptionsIST > 0 && (
                <li>{stats.inscriptionsIST} inscription(s) ISTMR en attente de validation</li>
              )}
              {stats.messagesNonLus > 0 && (
                <li>{stats.messagesNonLus} message(s) de contact non lu(s)</li>
              )}
              {stats.donsPendants > 0 && (
                <li>{stats.donsPendants} don(s) en attente de validation</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
