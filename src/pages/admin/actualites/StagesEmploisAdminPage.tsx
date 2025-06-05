import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, MapPin, Calendar, Clock, Briefcase, Building } from 'lucide-react';
import { offreEmploiService } from '@/services/adminService';
import { OffreEmploi } from '@/types/admin';

const StagesEmploisAdminPage: React.FC = () => {
  const [offresEmploi, setOffresEmploi] = useState<OffreEmploi[]>([]);
  const [filteredOffresEmploi, setFilteredOffresEmploi] = useState<OffreEmploi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedOffreEmploi, setSelectedOffreEmploi] = useState<OffreEmploi | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadOffresEmploi();
  }, []);

  useEffect(() => {
    filterOffresEmploi();
  }, [offresEmploi, searchTerm, typeFilter]);

  const loadOffresEmploi = async () => {
    try {
      const data = await offreEmploiService.getAll();
      setOffresEmploi(data);
    } catch (error) {
      console.error('Erreur lors du chargement des offres d\'emploi:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterOffresEmploi = () => {
    let filtered = offresEmploi;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.domaine.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(item => item.type === typeFilter);
    }

    setFilteredOffresEmploi(filtered);
  };

  const openModal = (offreEmploi: OffreEmploi | null = null) => {
    setSelectedOffreEmploi(offreEmploi);
    setIsEditing(!!offreEmploi);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOffreEmploi(null);
    setIsModalOpen(false);
    setIsEditing(false);
  };

  const handleSave = async (data: Partial<OffreEmploi>) => {
    try {
      if (isEditing && selectedOffreEmploi) {
        const updated = await offreEmploiService.update(selectedOffreEmploi.id, data);
        if (updated) {
          setOffresEmploi(offresEmploi.map(item => 
            item.id === selectedOffreEmploi.id ? updated : item
          ));
        }
      } else {
        const created = await offreEmploiService.create(data as Omit<OffreEmploi, 'id' | 'createdAt' | 'updatedAt'>);
        setOffresEmploi([...offresEmploi, created]);
      }
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) {
      try {
        await offreEmploiService.delete(id);
        setOffresEmploi(offresEmploi.filter(item => item.id !== id));
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  const getTypeColor = (type: OffreEmploi['type']) => {
    switch (type) {
      case 'stage': return 'bg-blue-100 text-blue-800';
      case 'emploi': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: OffreEmploi['type']) => {
    switch (type) {
      case 'stage': return 'Stage';
      case 'emploi': return 'Emploi';
      default: return type;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des Stages et Emplois</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Nouvelle Offre
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total</p>
              <div className="text-2xl font-bold text-gray-900">{offresEmploi.length}</div>
            </div>
            <Briefcase className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Stages</p>
              <div className="text-2xl font-bold text-gray-900">
                {offresEmploi.filter(o => o.type === 'stage').length}
              </div>
            </div>
            <Building className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Emplois</p>
              <div className="text-2xl font-bold text-gray-900">
                {offresEmploi.filter(o => o.type === 'emploi').length}
              </div>
            </div>
            <MapPin className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous les types</option>
            <option value="stage">Stage</option>
            <option value="emploi">Emploi</option>
          </select>
        </div>
      </div>

      {/* Liste des offres */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Titre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Domaine
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Durée
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date de création
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOffresEmploi.map((offre) => (
              <tr key={offre.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{offre.titre}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{offre.domaine}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(offre.type)}`}>
                    {getTypeLabel(offre.type)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{offre.duree}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(offre.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openModal(offre)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(offre.id)}
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

        {filteredOffresEmploi.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucune offre trouvée</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <OffreEmploiModal
          offre={selectedOffreEmploi}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

interface OffreEmploiModalProps {
  offre: OffreEmploi | null;
  onSave: (data: Partial<OffreEmploi>) => void;
  onClose: () => void;
}

const OffreEmploiModal: React.FC<OffreEmploiModalProps> = ({ offre, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    titre: offre?.titre || '',
    domaine: offre?.domaine || '',
    description: offre?.description || '',
    duree: offre?.duree || '',
    type: offre?.type || 'stage' as 'stage' | 'emploi'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {offre ? 'Modifier l\'offre' : 'Nouvelle offre'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre
              </label>
              <input
                type="text"
                value={formData.titre}
                onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Domaine
              </label>
              <input
                type="text"
                value={formData.domaine}
                onChange={(e) => setFormData({ ...formData, domaine: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Durée
              </label>
              <input
                type="text"
                value={formData.duree}
                onChange={(e) => setFormData({ ...formData, duree: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ex: 3 mois, 6 mois, CDI..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'stage' | 'emploi' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="stage">Stage</option>
                <option value="emploi">Emploi</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {offre ? 'Modifier' : 'Créer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StagesEmploisAdminPage;
