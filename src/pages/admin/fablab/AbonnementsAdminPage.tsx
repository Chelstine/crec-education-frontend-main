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
  const [showModal, setShowModal] = useState(false);
  const [selectedAbonnement, setSelectedAbonnement] = useState<AbonnementFabLab | null>(null);
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
    let filtered = abonnements;

    if (searchTerm) {
      filtered = filtered.filter(abonnement => 
        abonnement.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        abonnement.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        abonnement.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        abonnement.typeAbonnement.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(abonnement => abonnement.status === statusFilter);
    }

    setFilteredAbonnements(filtered);
  };

  const handleSave = async (abonnementData: Partial<AbonnementFabLab>) => {
    try {
      if (isEditing && selectedAbonnement && abonnementData.status) {
        // Mise à jour du statut seulement
        if (abonnementData.status === 'validated' || abonnementData.status === 'rejected') {
          await abonnementFabLabService.updateStatus(selectedAbonnement.id, abonnementData.status);
        }
      }
      // Note: Create functionality is not available in the service
      await loadAbonnements();
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet abonnement ?')) {
      try {
        // Note: Delete functionality is not available in the service
        console.warn('Delete operation not implemented in abonnementFabLabService');
        alert('La suppression n\'est pas encore implémentée');
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  const openModal = (abonnement?: AbonnementFabLab) => {
    setSelectedAbonnement(abonnement || null);
    setIsEditing(!!abonnement);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAbonnement(null);
    setIsEditing(false);
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'mensuel': return 'bg-blue-100 text-blue-800';
      case 'trimestriel': return 'bg-purple-100 text-purple-800';
      case 'annuel': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Abonnements FabLab</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Nouvel Abonnement
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher par nom, email ou type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="w-full md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="validated">Validé</option>
              <option value="rejected">Rejeté</option>
            </select>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-gray-900">{abonnements.length}</div>
          <div className="text-sm text-gray-600">Total abonnements</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-green-600">
            {abonnements.filter(a => a.status === 'validated').length}
          </div>
          <div className="text-sm text-gray-600">Actifs</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-red-600">
            {abonnements.filter(a => a.status === 'rejected').length}
          </div>
          <div className="text-sm text-gray-600">Expirés</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-yellow-600">
            {abonnements.filter(a => a.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-600">Suspendus</div>
        </div>
      </div>

      {/* Subscriptions List */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Abonné
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date d'abonnement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clé d'abonnement
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
                      <div className="text-sm font-medium text-gray-900">{abonnement.prenom} {abonnement.nom}</div>
                      <div className="text-sm text-gray-500">{abonnement.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(abonnement.typeAbonnement)}`}>
                      {abonnement.typeAbonnement}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(abonnement.status)}`}>
                      {getStatusText(abonnement.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>Date: {new Date(abonnement.dateAbonnement).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {abonnement.cleAbonnement || 'Non attribué'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openModal(abonnement)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openModal(abonnement)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(abonnement.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <AbonnementModal
          abonnement={selectedAbonnement}
          isEditing={isEditing}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

interface AbonnementModalProps {
  abonnement: AbonnementFabLab | null;
  isEditing: boolean;
  onSave: (data: Partial<AbonnementFabLab>) => void;
  onClose: () => void;
}

const AbonnementModal: React.FC<AbonnementModalProps> = ({ abonnement, isEditing, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    nom: abonnement?.nom || '',
    prenom: abonnement?.prenom || '',
    email: abonnement?.email || '',
    telephone: abonnement?.telephone || '',
    typeAbonnement: abonnement?.typeAbonnement || 'mensuel',
    status: abonnement?.status || 'pending',
    dateAbonnement: abonnement?.dateAbonnement || new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            {isEditing ? 'Modifier l\'abonnement' : 'Nouvel abonnement'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom *
                </label>
                <input
                  type="text"
                  required
                  value={formData.prenom}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.telephone}
                  onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type d'abonnement *
                </label>
                <select
                  required
                  value={formData.typeAbonnement}
                  onChange={(e) => setFormData({ ...formData, typeAbonnement: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="mensuel">Mensuel</option>
                  <option value="trimestriel">Trimestriel</option>
                  <option value="annuel">Annuel</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Statut *
                </label>
                <select
                  required
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'pending' | 'validated' | 'rejected' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="pending">En attente</option>
                  <option value="validated">Validé</option>
                  <option value="rejected">Rejeté</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date d'abonnement *
              </label>
              <input
                type="date"
                required
                value={formData.dateAbonnement}
                onChange={(e) => setFormData({ ...formData, dateAbonnement: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {isEditing ? 'Modifier' : 'Créer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AbonnementsAdminPage;
