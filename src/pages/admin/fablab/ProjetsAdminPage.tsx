import React, { useState, useEffect } from 'react';
import { Plus, Search, Eye, Edit, Trash2, FileVideo, FileImage } from 'lucide-react';
import { ProjetFabLab } from '@/types/admin';
import { projetFabLabService } from '@/services/adminService';

const ProjetsAdminPage: React.FC = () => {
  const [projets, setProjets] = useState<ProjetFabLab[]>([]);
  const [filteredProjets, setFilteredProjets] = useState<ProjetFabLab[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedProjet, setSelectedProjet] = useState<ProjetFabLab | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProjets();
  }, []);

  useEffect(() => {
    filterProjets();
  }, [projets, searchTerm, typeFilter]);

  const loadProjets = async () => {
    try {
      setIsLoading(true);
      const data = await projetFabLabService.getAll();
      setProjets(data);
    } catch (error) {
      console.error('Erreur lors du chargement des projets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterProjets = () => {
    let filtered = projets;

    if (searchTerm) {
      filtered = filtered.filter(projet => 
        projet.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        projet.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(projet => projet.type === typeFilter);
    }

    setFilteredProjets(filtered);
  };

  const handleSave = async (projetData: Partial<ProjetFabLab>) => {
    try {
      if (isEditing && selectedProjet) {
        await projetFabLabService.update(selectedProjet.id, projetData);
      } else {
        await projetFabLabService.create(projetData as Omit<ProjetFabLab, 'id' | 'createdAt' | 'updatedAt'>);
      }
      await loadProjets();
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      try {
        await projetFabLabService.delete(id);
        await loadProjets();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  const openModal = (projet?: ProjetFabLab) => {
    setSelectedProjet(projet || null);
    setIsEditing(!!projet);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProjet(null);
    setIsEditing(false);
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
        <h1 className="text-2xl font-bold text-gray-900">Projets FabLab</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Nouveau Projet
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
                placeholder="Rechercher par titre ou description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="w-full md:w-48">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tous les types</option>
              <option value="video">Vidéo</option>
              <option value="photo">Photo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-gray-900">{projets.length}</div>
          <div className="text-sm text-gray-600">Total projets</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-blue-600">
            {projets.filter(p => p.type === 'video').length}
          </div>
          <div className="text-sm text-gray-600">Projets vidéo</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-green-600">
            {projets.filter(p => p.type === 'photo').length}
          </div>
          <div className="text-sm text-gray-600">Projets photo</div>
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Projet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fichier
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
              {filteredProjets.map((projet) => (
                <tr key={projet.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{projet.titre}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{projet.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {projet.type === 'video' ? (
                        <FileVideo className="h-5 w-5 text-blue-500 mr-2" />
                      ) : (
                        <FileImage className="h-5 w-5 text-green-500 mr-2" />
                      )}
                      <span className="text-sm text-gray-900 capitalize">{projet.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {projet.fichierUrl ? (
                      <a 
                        href={projet.fichierUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-900 text-sm"
                      >
                        Voir le fichier
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm">Aucun fichier</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(projet.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openModal(projet)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openModal(projet)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(projet.id)}
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

        {filteredProjets.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>Aucun projet trouvé</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <ProjetModal
          projet={selectedProjet}
          isEditing={isEditing}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

interface ProjetModalProps {
  projet: ProjetFabLab | null;
  isEditing: boolean;
  onSave: (data: Partial<ProjetFabLab>) => void;
  onClose: () => void;
}

const ProjetModal: React.FC<ProjetModalProps> = ({ projet, isEditing, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    titre: projet?.titre || '',
    description: projet?.description || '',
    fichierUrl: projet?.fichierUrl || '',
    type: projet?.type || 'photo' as 'video' | 'photo',
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
            {isEditing ? 'Modifier le projet' : 'Nouveau projet'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre du projet *
              </label>
              <input
                type="text"
                required
                value={formData.titre}
                onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ex: Impression 3D d'un prototype"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Décrivez le projet..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type de fichier *
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'video' | 'photo' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="photo">Photo</option>
                  <option value="video">Vidéo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL du fichier
                </label>
                <input
                  type="url"
                  value={formData.fichierUrl}
                  onChange={(e) => setFormData({ ...formData, fichierUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://..."
                />
              </div>
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

export default ProjetsAdminPage;
