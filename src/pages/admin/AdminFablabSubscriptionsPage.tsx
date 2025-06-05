import React, { useState, useEffect } from 'react';
import { Check, X, Eye, Key, Mail, Users, Clock, AlertCircle, Search, Filter } from 'lucide-react';
import { FablabSubscription, FablabAccessKey } from '@/types';
import { FablabSubscriptionService } from '@/services/api';

const AdminFablabSubscriptionsPage: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<FablabSubscription[]>([]);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<FablabSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubscription, setSelectedSubscription] = useState<FablabSubscription | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [processing, setProcessing] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [generatedKey, setGeneratedKey] = useState<FablabAccessKey | null>(null);

  useEffect(() => {
    loadSubscriptions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [subscriptions, searchTerm, statusFilter]);

  const loadSubscriptions = async () => {
    try {
      setLoading(true);
      const data = await FablabSubscriptionService.getSubscriptions();
      setSubscriptions(data);
    } catch (error) {
      console.error('Erreur lors du chargement des abonnements:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...subscriptions];

    // Filtre par terme de recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(sub => 
        sub.userName.toLowerCase().includes(term) ||
        sub.email.toLowerCase().includes(term) ||
        sub.phone?.toLowerCase().includes(term)
      );
    }

    // Filtre par statut
    if (statusFilter !== 'all') {
      filtered = filtered.filter(sub => sub.status === statusFilter);
    }

    setFilteredSubscriptions(filtered);
  };

  const validateSubscription = async (subscriptionId: string) => {
    try {
      setProcessing(subscriptionId);
      await FablabSubscriptionService.validateSubscription(subscriptionId);
      
      // Générer une clé d'accès
      const accessKey = await generateAccessKey(subscriptionId);
      setGeneratedKey(accessKey);
      setShowKeyModal(true);
      
      // Recharger les données
      await loadSubscriptions();
    } catch (error) {
      console.error('Erreur lors de la validation:', error);
      alert('Erreur lors de la validation de l\'abonnement');
    } finally {
      setProcessing(null);
    }
  };

  const rejectSubscription = async (subscriptionId: string, reason?: string) => {
    try {
      setProcessing(subscriptionId);
      await FablabSubscriptionService.rejectSubscription(subscriptionId, reason);
      await loadSubscriptions();
    } catch (error) {
      console.error('Erreur lors du rejet:', error);
      alert('Erreur lors du rejet de l\'abonnement');
    } finally {
      setProcessing(null);
    }
  };

  const generateAccessKey = async (subscriptionId: string): Promise<FablabAccessKey> => {
    const subscription = subscriptions.find(s => s.id === subscriptionId);
    if (!subscription) throw new Error('Abonnement introuvable');
    
    // Simuler la génération d'une clé d'accès
    const key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const accessKey: FablabAccessKey = {
      id: Date.now().toString(),
      subscriptionId,
      userId: subscription.userId,
      userName: subscription.userName,
      userEmail: subscription.email,
      keyCode: key.toUpperCase(),
      status: 'active',
      validFrom: new Date().toISOString(),
      validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 an
      usageCount: 0,
      isEmailSent: false,
      createdAt: new Date().toISOString()
    };
    
    // Dans une vraie application, cela ferait un appel API
    await FablabSubscriptionService.generateAccessKey(subscriptionId, accessKey);
    return accessKey;
  };

  const sendAccessKeyByEmail = async (subscription: FablabSubscription, accessKey: FablabAccessKey) => {
    try {
      await FablabSubscriptionService.sendAccessKey(subscription.id, accessKey.keyCode);
      alert('Clé d\'accès envoyée par email avec succès');
      setShowKeyModal(false);
      setGeneratedKey(null);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      alert('Erreur lors de l\'envoi de l\'email');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'validated': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'validated': return 'Validé';
      case 'rejected': return 'Rejeté';
      case 'expired': return 'Expiré';
      default: return status;
    }
  };

  const formatSubscriptionType = (type: string) => {
    switch (type) {
      case 'monthly': return 'Mensuel';
      case 'quarterly': return 'Trimestriel';
      case 'annual': return 'Annuel';
      case 'student': return 'Étudiant';
      default: return type;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des Abonnements FabLab</h1>
            <p className="text-gray-600 mt-1">
              Validez les abonnements et générez les clés d'accès
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-1" />
              {filteredSubscriptions.length} abonnement(s)
            </div>
            <div className="flex items-center text-sm text-yellow-600">
              <Clock className="h-4 w-4 mr-1" />
              {filteredSubscriptions.filter(s => s.status === 'pending').length} en attente
            </div>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Filtres</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, email ou téléphone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filtre par statut */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="validated">Validé</option>
              <option value="rejected">Rejeté</option>
              <option value="expired">Expiré</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des abonnements */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Abonnements</h2>
        </div>
        
        {filteredSubscriptions.length === 0 ? (
          <div className="flex items-center justify-center py-12 text-gray-500">
            <AlertCircle className="h-5 w-5 mr-2" />
            Aucun abonnement trouvé
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Abonné
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type d'abonnement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date de demande
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubscriptions.map((subscription) => (
                  <tr key={subscription.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {subscription.userName}
                        </div>
                        <div className="text-sm text-gray-500">{subscription.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatSubscriptionType(subscription.type)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(subscription.status)}`}>
                        {getStatusText(subscription.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(subscription.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedSubscription(subscription);
                            setShowDetailsModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                          title="Voir les détails"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        
                        {subscription.status === 'pending' && (
                          <>
                            <button
                              onClick={() => validateSubscription(subscription.id)}
                              disabled={processing === subscription.id}
                              className="text-green-600 hover:text-green-900 disabled:opacity-50"
                              title="Valider"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => {
                                const reason = prompt('Raison du rejet (optionnel):');
                                if (reason !== null) {
                                  rejectSubscription(subscription.id, reason);
                                }
                              }}
                              disabled={processing === subscription.id}
                              className="text-red-600 hover:text-red-900 disabled:opacity-50"
                              title="Rejeter"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal des détails */}
      {showDetailsModal && selectedSubscription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full m-4 max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Détails de l'abonnement
              </h3>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom complet</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedSubscription.userName}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedSubscription.email}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedSubscription.phone || 'Non renseigné'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type d'abonnement</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {formatSubscriptionType(selectedSubscription.type)}
                  </p>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Date de création</label>
                  <p className="mt-1 text-sm text-gray-900">{new Date(selectedSubscription.createdAt).toLocaleDateString('fr-FR')}</p>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Période</label>
                  <p className="mt-1 text-sm text-gray-900">
                    Du {new Date(selectedSubscription.startDate).toLocaleDateString('fr-FR')} au {new Date(selectedSubscription.endDate).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de la clé d'accès */}
      {showKeyModal && generatedKey && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full m-4">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <Key className="h-6 w-6 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Clé d'accès générée
                </h3>
              </div>
            </div>
            
            <div className="p-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="text-center">
                  <div className="text-sm text-green-600 mb-2">Clé d'accès FabLab</div>
                  <div className="text-2xl font-mono font-bold text-green-800 mb-2">
                    {generatedKey.keyCode}
                  </div>
                  <div className="text-xs text-green-600">
                    Expire le {new Date(generatedKey.validUntil).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Cette clé d'accès a été générée avec succès. Vous pouvez maintenant l'envoyer par email
                au client ou la copier pour l'envoyer manuellement.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedKey.keyCode);
                    alert('Clé copiée dans le presse-papiers');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Copier
                </button>
                <button
                  onClick={() => {
                    if (selectedSubscription) {
                      sendAccessKeyByEmail(selectedSubscription, generatedKey);
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Envoyer par email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFablabSubscriptionsPage;
