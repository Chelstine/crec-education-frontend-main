import React, { useState, useEffect } from 'react';
import { Plus, Search, Eye, Edit, Trash2, Calendar, User } from 'lucide-react';
import { AbonnementFabLab } from '@/types/admin';
import { abonnementFabLabService } from '@/services/adminService';

const AbonnementsAdminPage: React.FC = () => {
  const [abonnements, setAbonnements] = useState<AbonnementFabLab[]>([]);
  const [filteredAbonnements, setFilteredAbonnements] = useState<AbonnementFabLab[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedAbonnement, setSelectedAbonnement] = useState<AbonnementFabLab | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadAbonnements();
  }, []);

  useEffect(() => {
    filterAbonnements();
  }, [abonnements, searchTerm, statusFilter]);

  const loadAbonnements = async () => {
    try {
      setIsLoading(true);
      const data = await abonnementFabLabService.getAll();
      setAbonnements(data);
    } catch (error) {
      console.error('Erreur lors du chargement des abonnements:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAbonnements = () => {
    let filtered = [...abonnements];

    if (searchTerm) {
      filtered = filtered.filter(abonnement =>
        abonnement.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        abonnement.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        abonnement.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(abonnement => abonnement.status === statusFilter);
    }

    setFilteredAbonnements(filtered);
  };

  const handleStatusUpdate = async (id: string, status: 'validated' | 'rejected') => {
    try {
      await abonnementFabLabService.updateStatus(id, status);
      await loadAbonnements();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
    }
  };

  const handleSendKey = async (id: string) => {
    try {
      await abonnementFabLabService.sendSubscriptionKey(id);
      alert('Clé d\'abonnement envoyée avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la clé:', error);
    }
  };

  const openModal = (abonnement?: AbonnementFabLab) => {
    setSelectedAbonnement(abonnement || null);
    setIsEditing(!!abonnement);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedAbonnement(null);
    setIsEditing(false);
    setIsModalOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'validated': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'validated': return 'Validé';
      case 'pending': return 'En attente';
      case 'rejected': return 'Rejeté';
      default: return status;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des Abonnements FabLab</h1>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <User className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {abonnements.filter(a => a.status === 'validated').length}
              </div>
              <div className="text-sm text-gray-600">Validés</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {abonnements.filter(a => a.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600">En attente</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Trash2 className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {abonnements.filter(a => a.status === 'rejected').length}
              </div>
              <div className="text-sm text-gray-600">Rejetés</div>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un abonnement..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="validated">Validé</option>
            <option value="rejected">Rejeté</option>
          </select>
        </div>
      </div>

      {/* Table des abonnements */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Utilisateur
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type & Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Clé d'abonnement
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAbonnements.map((abonnement) => (
              <tr key={abonnement.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {abonnement.nom} {abonnement.prenom}
                    </div>
                    <div className="text-sm text-gray-500">{abonnement.email}</div>
                    <div className="text-sm text-gray-500">{abonnement.telephone}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm text-gray-900">Type: {abonnement.typeAbonnement}</div>
                    <div className="text-sm text-gray-500">
                      Date: {new Date(abonnement.dateAbonnement).toLocaleDateString()}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {abonnement.cleAbonnement || 'Non attribué'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(abonnement.status)}`}>
                    {getStatusText(abonnement.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  {abonnement.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(abonnement.id, 'validated')}
                        className="text-green-600 hover:text-green-900"
                        title="Valider"
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(abonnement.id, 'rejected')}
                        className="text-red-600 hover:text-red-900"
                        title="Rejeter"
                      >
                        ✗
                      </button>
                    </>
                  )}
                  {abonnement.status === 'validated' && abonnement.cleAbonnement && (
                    <button
                      onClick={() => handleSendKey(abonnement.id)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Renvoyer la clé"
                    >
                      📧
                    </button>
                  )}
                  <button
                    onClick={() => openModal(abonnement)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de détails */}
      {isModalOpen && selectedAbonnement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Détails de l'abonnement</h2>
            
            <div className="space-y-3">
              <div>
                <strong>Nom complet:</strong> {selectedAbonnement.nom} {selectedAbonnement.prenom}
              </div>
              <div>
                <strong>Email:</strong> {selectedAbonnement.email}
              </div>
              <div>
                <strong>Téléphone:</strong> {selectedAbonnement.telephone}
              </div>
              <div>
                <strong>Type d'abonnement:</strong> {selectedAbonnement.typeAbonnement}
              </div>
              <div>
                <strong>Date d'abonnement:</strong> {new Date(selectedAbonnement.dateAbonnement).toLocaleDateString()}
              </div>
              <div>
                <strong>Statut:</strong> 
                <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedAbonnement.status)}`}>
                  {getStatusText(selectedAbonnement.status)}
                </span>
              </div>
              {selectedAbonnement.cleAbonnement && (
                <div>
                  <strong>Clé d'abonnement:</strong> {selectedAbonnement.cleAbonnement}
                </div>
              )}
              {selectedAbonnement.recuPaiement && (
                <div>
                  <strong>Reçu de paiement:</strong> 
                  <a href={selectedAbonnement.recuPaiement} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-2">
                    Voir le reçu
                  </a>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-4">
              <button
                onClick={closeModal}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AbonnementsAdminPage;
