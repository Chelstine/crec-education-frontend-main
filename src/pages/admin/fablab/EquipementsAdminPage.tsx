import React, { useState, useEffect } from 'react';
import { Plus, Search, Eye, Edit, Trash2 } from 'lucide-react';
import { EquipementFabLab } from '@/types/admin';
import { equipementFabLabService } from '@/services/adminService';

const EquipementsAdminPage: React.FC = () => {
  const [equipements, setEquipements] = useState<EquipementFabLab[]>([]);
  const [filteredEquipements, setFilteredEquipements] = useState<EquipementFabLab[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [disponibiliteFilter, setDisponibiliteFilter] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedEquipement, setSelectedEquipement] = useState<EquipementFabLab | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadEquipements();
  }, []);

  useEffect(() => {
    filterEquipements();
  }, [equipements, searchTerm, disponibiliteFilter]);

  const loadEquipements = async () => {
    try {
      setIsLoading(true);
      const data = await equipementFabLabService.getAll();
      setEquipements(data);
    } catch (error) {
      console.error('Erreur lors du chargement des équipements:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterEquipements = () => {
    let filtered = equipements;

    if (searchTerm) {
      filtered = filtered.filter(equipement => 
        equipement.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipement.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipement.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipement.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (disponibiliteFilter !== 'all') {
      const isDisponible = disponibiliteFilter === 'disponible';
      filtered = filtered.filter(equipement => equipement.disponible === isDisponible);
    }

    setFilteredEquipements(filtered);
  };

  const handleSave = async (equipementData: Partial<EquipementFabLab>) => {
    try {
      if (isEditing && selectedEquipement) {
        await equipementFabLabService.update(selectedEquipement.id, equipementData);
      } else {
        // Ensure required fields are present for creation
        const createData = {
          nom: equipementData.nom!,
          code: equipementData.code!,
          description: equipementData.description!,
          tarif: equipementData.tarif ?? 0,
          features: equipementData.features ?? [],
          reference: equipementData.reference ?? '',
          prixMensuel: equipementData.prixMensuel ?? 0,
          prixAnnuel: equipementData.prixAnnuel ?? 0,
          image: equipementData.image ?? '',
          category: equipementData.category!,
          disponible: equipementData.disponible ?? true,
        };
        await equipementFabLabService.create(createData);
      }
      await loadEquipements();
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet équipement ?')) {
      try {
        await equipementFabLabService.delete(id);
        await loadEquipements();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  const openModal = (equipement?: EquipementFabLab) => {
    setSelectedEquipement(equipement || null);
    setIsEditing(!!equipement);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEquipement(null);
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
        <h1 className="text-2xl font-bold text-gray-900">Équipements FabLab</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Nouvel Équipement
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
                placeholder="Rechercher par nom, description, code ou catégorie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="w-full md:w-48">
            <select
              value={disponibiliteFilter}
              onChange={(e) => setDisponibiliteFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Toutes disponibilités</option>
              <option value="disponible">Disponible</option>
              <option value="indisponible">Indisponible</option>
            </select>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-gray-900">{equipements.length}</div>
          <div className="text-sm text-gray-600">Total équipements</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-green-600">
            {equipements.filter(e => e.disponible).length}
          </div>
          <div className="text-sm text-gray-600">Disponibles</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-red-600">
            {equipements.filter(e => !e.disponible).length}
          </div>
          <div className="text-sm text-gray-600">Indisponibles</div>
        </div>
      </div>

      {/* Equipment List */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Équipement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Code/Référence
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarifs
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Disponibilité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEquipements.map((equipement) => (
                <tr key={equipement.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{equipement.nom}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{equipement.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{equipement.code}</div>
                    {equipement.reference && (
                      <div className="text-xs text-gray-500">Réf: {equipement.reference}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 capitalize">{equipement.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{equipement.tarif} €/h</div>
                    {equipement.prixMensuel > 0 && (
                      <div className="text-xs text-gray-500">{equipement.prixMensuel} €/mois</div>
                    )}
                    {equipement.prixAnnuel > 0 && (
                      <div className="text-xs text-gray-500">{equipement.prixAnnuel} €/an</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      equipement.disponible 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {equipement.disponible ? 'Disponible' : 'Indisponible'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openModal(equipement)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openModal(equipement)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(equipement.id)}
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
        <EquipementModal
          equipement={selectedEquipement}
          isEditing={isEditing}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

interface EquipementModalProps {
  equipement: EquipementFabLab | null;
  isEditing: boolean;
  onSave: (data: Partial<EquipementFabLab>) => void;
  onClose: () => void;
}

const EquipementModal: React.FC<EquipementModalProps> = ({ equipement, isEditing, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    nom: equipement?.nom || '',
    code: equipement?.code || '',
    description: equipement?.description || '',
    tarif: equipement?.tarif || 0,
    features: equipement?.features?.join('\n') || '',
    reference: equipement?.reference || '',
    prixMensuel: equipement?.prixMensuel || 0,
    prixAnnuel: equipement?.prixAnnuel || 0,
    image: equipement?.image || '',
    category: equipement?.category || '',
    disponible: equipement?.disponible ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      features: formData.features.split('\n').filter(f => f.trim()),
    };
    onSave(submitData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            {isEditing ? 'Modifier l\'équipement' : 'Nouvel équipement'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de l'équipement *
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
                  Code équipement *
                </label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
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
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Référence
                </label>
                <input
                  type="text"
                  value={formData.reference}
                  onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Choisir une catégorie</option>
                  <option value="impression-3d">Impression 3D</option>
                  <option value="electronique">Électronique</option>
                  <option value="usinage">Usinage</option>
                  <option value="prototypage">Prototypage</option>
                  <option value="assemblage">Assemblage</option>
                  <option value="mesure">Mesure</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fonctionnalités/Caractéristiques
              </label>
              <textarea
                rows={4}
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder="Une fonctionnalité par ligne..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tarif horaire (€) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.tarif}
                  onChange={(e) => setFormData({ ...formData, tarif: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prix mensuel (€)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.prixMensuel}
                  onChange={(e) => setFormData({ ...formData, prixMensuel: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prix annuel (€)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.prixAnnuel}
                  onChange={(e) => setFormData({ ...formData, prixAnnuel: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL de l'image
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Disponibilité *
                </label>
                <select
                  required
                  value={formData.disponible.toString()}
                  onChange={(e) => setFormData({ ...formData, disponible: e.target.value === 'true' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="true">Disponible</option>
                  <option value="false">Indisponible</option>
                </select>
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

export default EquipementsAdminPage;
