import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, BookOpen } from 'lucide-react';
import { filiereService } from '@/services/adminService';
import { Filiere } from '@/types/admin';

const FiliereForm: React.FC<{
  filiere?: Filiere;
  onSubmit: (data: Omit<Filiere, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  onCancel: () => void;
}> = ({ filiere, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nom: filiere?.nom || '',
    description: filiere?.description || '',
    duree: filiere?.duree || '',
    prerequis: filiere?.prerequis || '',
    competences: filiere?.competences || [],
    debouches: filiere?.debouches || [],
    profilIdeal: filiere?.profilIdeal || '',
    image: filiere?.image || '',
    tarif: filiere?.tarif || 0,
    niveauAdmission: filiere?.niveauAdmission || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {filiere ? 'Modifier la filière' : 'Ajouter une filière'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom de la filière
            </label>
            <input
              type="text"
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Informatique et Réseaux"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Description détaillée de la filière"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Durée
            </label>
            <input
              type="text"
              value={formData.duree}
              onChange={(e) => setFormData({ ...formData, duree: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: 3 ans"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prérequis
            </label>
            <textarea
              value={formData.prerequis}
              onChange={(e) => setFormData({ ...formData, prerequis: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Prérequis nécessaires pour cette filière"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tarif (FCFA)
              </label>
              <input
                type="number"
                min="0"
                value={formData.tarif}
                onChange={(e) => setFormData({ ...formData, tarif: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: 350000"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Niveau d'admission
              </label>
              <input
                type="text"
                value={formData.niveauAdmission}
                onChange={(e) => setFormData({ ...formData, niveauAdmission: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Baccalauréat scientifique"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compétences acquises
            </label>
            <textarea
              value={formData.competences.join('\n')}
              onChange={(e) => setFormData({ ...formData, competences: e.target.value.split('\n').filter(c => c.trim()) })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Une compétence par ligne&#10;Ex: Programmation orientée objet&#10;Gestion de bases de données&#10;Administration réseau"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Débouchés professionnels
            </label>
            <textarea
              value={formData.debouches.join('\n')}
              onChange={(e) => setFormData({ ...formData, debouches: e.target.value.split('\n').filter(d => d.trim()) })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Un débouché par ligne&#10;Ex: Ingénieur logiciel&#10;Administrateur système&#10;Chef de projet IT"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profil idéal du candidat
            </label>
            <textarea
              value={formData.profilIdeal}
              onChange={(e) => setFormData({ ...formData, profilIdeal: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Décrivez le profil idéal pour cette filière"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image (URL)
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Enregistrement...' : (filiere ? 'Modifier' : 'Ajouter')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const FilieresAdminPage: React.FC = () => {
  const [filieres, setFilieres] = useState<Filiere[]>([]);
  const [filteredFilieres, setFilteredFilieres] = useState<Filiere[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingFiliere, setEditingFiliere] = useState<Filiere | undefined>();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadFilieres();
  }, []);

  useEffect(() => {
    const filtered = filieres.filter(filiere =>
      filiere.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      filiere.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFilieres(filtered);
  }, [filieres, searchTerm]);

  const loadFilieres = async () => {
    try {
      const data = await filiereService.getAll();
      // Validation des données pour éviter les erreurs
      const validatedData = data.map(filiere => ({
        ...filiere,
        tarif: filiere.tarif || 0,
        nom: filiere.nom || 'Nom non défini',
        description: filiere.description || 'Description non disponible',
        duree: filiere.duree || 'Non défini',
        niveauAdmission: filiere.niveauAdmission || 'Non défini'
      }));
      setFilieres(validatedData);
    } catch (error) {
      console.error('Erreur lors du chargement des filières:', error);
      setFilieres([]); // Set empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: Omit<Filiere, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (editingFiliere) {
        await filiereService.update(editingFiliere.id, data);
      } else {
        await filiereService.create(data);
      }
      await loadFilieres();
      setShowForm(false);
      setEditingFiliere(undefined);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const handleEdit = (filiere: Filiere) => {
    setEditingFiliere(filiere);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette filière ?')) {
      try {
        await filiereService.delete(id);
        await loadFilieres();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingFiliere(undefined);
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
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Gestion des Filières ISTMR
              </h1>
              <p className="text-gray-600">
                Gérer les filières universitaires disponibles
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Ajouter une filière
          </button>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une filière..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Liste des filières */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {filteredFilieres.length === 0 ? (
          <div className="p-6 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune filière</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Aucune filière ne correspond à votre recherche.' : 'Commencez par ajouter une filière.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Filière
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durée
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarif
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Niveau d'admission
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date de création
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFilieres.map((filiere) => (
                  <tr key={filiere.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {filiere.nom || 'Nom non défini'}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {filiere.description || 'Description non disponible'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {filiere.duree || 'Non défini'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {(filiere.tarif || 0).toLocaleString()} FCFA
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {filiere.niveauAdmission || 'Non défini'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {filiere.createdAt ? new Date(filiere.createdAt).toLocaleDateString('fr-FR') : 'Date inconnue'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(filiere)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="Modifier"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(filiere.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Supprimer"
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
        )}
      </div>

      {/* Formulaire modal */}
      {showForm && (
        <FiliereForm
          filiere={editingFiliere}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default FilieresAdminPage;
