import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, BookOpen, Users } from 'lucide-react';
import { formationOuverteService } from '@/services/adminService';
import { FormationOuverte } from '@/types/admin';

const FormationOuverteForm: React.FC<{
  formation?: FormationOuverte;
  onSubmit: (data: Omit<FormationOuverte, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  onCancel: () => void;
}> = ({ formation, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nom: formation?.nom || '',
    description: formation?.description || '',
    duree: formation?.duree || '',
    tarif: formation?.tarif || 0,
    features: formation?.features || [],
    niveau: formation?.niveau || '',
    certificat: formation?.certificat || false,
    category: formation?.category || '',
    icon: formation?.icon || '',
    image: formation?.image || ''
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
            {formation ? 'Modifier la formation' : 'Ajouter une formation'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom de la formation
            </label>
            <input
              type="text"
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Cours d'Anglais"
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
              placeholder="Description détaillée de la formation"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Durée
              </label>
              <input
                type="text"
                value={formData.duree}
                onChange={(e) => setFormData({ ...formData, duree: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: 6 mois"
                required
              />
            </div>

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
                placeholder="Ex: 25000"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Niveau
              </label>
              <select
                value={formData.niveau}
                onChange={(e) => setFormData({ ...formData, niveau: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Sélectionner un niveau</option>
                <option value="debutant">Débutant</option>
                <option value="intermediaire">Intermédiaire</option>
                <option value="avance">Avancé</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catégorie
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Langues, Informatique, Communication"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Caractéristiques
            </label>
            <textarea
              value={formData.features.join('\n')}
              onChange={(e) => setFormData({ ...formData, features: e.target.value.split('\n').filter(f => f.trim()) })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Une caractéristique par ligne&#10;Ex: Formation en présentiel&#10;Support pédagogique inclus&#10;Certificat de fin de formation"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icône (URL)
              </label>
              <input
                type="url"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/icon.svg"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.certificat}
                onChange={(e) => setFormData({ ...formData, certificat: e.target.checked })}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">
                Délivre un certificat de fin de formation
              </span>
            </label>
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
              {isSubmitting ? 'Enregistrement...' : (formation ? 'Modifier' : 'Ajouter')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const FormationsOuvertesAdminPage: React.FC = () => {
  const [formations, setFormations] = useState<FormationOuverte[]>([]);
  const [filteredFormations, setFilteredFormations] = useState<FormationOuverte[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingFormation, setEditingFormation] = useState<FormationOuverte | undefined>();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadFormations();
  }, []);

  useEffect(() => {
    const filtered = formations.filter(formation =>
      formation.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formation.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFormations(filtered);
  }, [formations, searchTerm]);

  const loadFormations = async () => {
    try {
      const data = await formationOuverteService.getAll();
      setFormations(data);
    } catch (error) {
      console.error('Erreur lors du chargement des formations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: Omit<FormationOuverte, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (editingFormation) {
        await formationOuverteService.update(editingFormation.id, data);
      } else {
        await formationOuverteService.create(data);
      }
      await loadFormations();
      setShowForm(false);
      setEditingFormation(undefined);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const handleEdit = (formation: FormationOuverte) => {
    setEditingFormation(formation);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      try {
        await formationOuverteService.delete(id);
        await loadFormations();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingFormation(undefined);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
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
            <BookOpen className="h-6 w-6 text-green-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Formations Ouvertes
              </h1>
              <p className="text-gray-600">
                Gérer les formations ouvertes au grand public
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Ajouter une formation
          </button>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une formation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Liste des formations */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {filteredFormations.length === 0 ? (
          <div className="p-6 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune formation</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Aucune formation ne correspond à votre recherche.' : 'Commencez par ajouter une formation.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Formation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durée
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarif
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
                {filteredFormations.map((formation) => (
                  <tr key={formation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {formation.nom}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {formation.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formation.duree}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="font-medium text-green-600">
                        {formatCurrency(formation.tarif)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(formation.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(formation)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="Modifier"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(formation.id)}
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

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Formations</p>
              <p className="text-2xl font-semibold text-gray-900">{formations.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Tarif Moyen</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formations.length > 0 
                  ? formatCurrency(Math.round(formations.reduce((sum, f) => sum + f.tarif, 0) / formations.length))
                  : '0 FCFA'
                }
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Formation la Plus Chère</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formations.length > 0 
                  ? formatCurrency(Math.max(...formations.map(f => f.tarif)))
                  : '0 FCFA'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Formulaire modal */}
      {showForm && (
        <FormationOuverteForm
          formation={editingFormation}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default FormationsOuvertesAdminPage;
