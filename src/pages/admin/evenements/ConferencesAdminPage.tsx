import React, { useState, useEffect } from 'react';
import { Plus, Search, Eye, Edit, Trash2, Mic, Users } from 'lucide-react';
import { Evenement } from '@/types/admin';
import { evenementService } from '@/services/adminService';

const ConferencesAdminPage: React.FC = () => {
  const [conferences, setConferences] = useState<Evenement[]>([]);
  const [filteredConferences, setFilteredConferences] = useState<Evenement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConference, setSelectedConference] = useState<Evenement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadConferences();
  }, []);

  useEffect(() => {
    filterConferences();
  }, [conferences, searchTerm]);

  const loadConferences = async () => {
    try {
      setIsLoading(true);
      const data = await evenementService.getAll();
      // Filtrer seulement les conférences
      const conferenceData = data.filter(event => event.type === 'conference');
      setConferences(conferenceData);
    } catch (error) {
      console.error('Erreur lors du chargement des conférences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterConferences = () => {
    let filtered = [...conferences];

    if (searchTerm) {
      filtered = filtered.filter(conference =>
        conference.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conference.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredConferences(filtered);
  };

  const handleSave = async (conferenceData: Partial<Evenement>) => {
    try {
      if (isEditing && selectedConference) {
        await evenementService.update(selectedConference.id, conferenceData);
      } else {
        await evenementService.create({...conferenceData, type: 'conference'});
      }
      await loadConferences();
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette conférence ?')) {
      try {
        await evenementService.delete(id);
        await loadConferences();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  const openModal = (conference?: Evenement) => {
    setSelectedConference(conference || null);
    setIsEditing(!!conference);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedConference(null);
    setIsEditing(false);
    setIsModalOpen(false);
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
        <h1 className="text-2xl font-bold text-gray-900">Gestion des Conférences</h1>
        <button
          onClick={() => openModal()}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Nouvelle Conférence
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Mic className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{conferences.length}</div>
              <div className="text-sm text-gray-600">Total Conférences</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {conferences.filter(c => new Date(c.date) >= new Date()).length}
              </div>
              <div className="text-sm text-gray-600">À venir</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Eye className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {conferences.filter(c => new Date(c.date) < new Date()).length}
              </div>
              <div className="text-sm text-gray-600">Terminées</div>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une conférence..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table des conférences */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Conférence
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Couleur
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredConferences.map((conference) => (
              <tr key={conference.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{conference.titre}</div>
                    <div className="text-sm text-gray-500">{conference.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(conference.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-2" 
                      style={{ backgroundColor: conference.couleur }}
                    ></div>
                    <span className="text-sm text-gray-900">{conference.couleur}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => openModal(conference)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(conference.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ConferenceModal
          conference={selectedConference}
          isEditing={isEditing}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

interface ConferenceModalProps {
  conference: Evenement | null;
  isEditing: boolean;
  onSave: (data: Partial<Evenement>) => void;
  onClose: () => void;
}

const ConferenceModal: React.FC<ConferenceModalProps> = ({
  conference,
  isEditing,
  onSave,
  onClose
}) => {
  const [formData, setFormData] = useState({
    titre: conference?.titre || '',
    description: conference?.description || '',
    date: conference?.date || new Date().toISOString().split('T')[0],
    couleur: conference?.couleur || '#3B82F6'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? 'Modifier la conférence' : 'Nouvelle conférence'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titre
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={formData.titre}
              onChange={(e) => setFormData({...formData, titre: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Couleur
            </label>
            <input
              type="color"
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={formData.couleur}
              onChange={(e) => setFormData({...formData, couleur: e.target.value})}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
            >
              {isEditing ? 'Modifier' : 'Créer'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConferencesAdminPage;
