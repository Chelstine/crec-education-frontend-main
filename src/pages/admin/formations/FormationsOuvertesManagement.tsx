import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Users, Clock, Calendar } from 'lucide-react';
import { AdminForm } from '../../../components/admin/AdminForm';

interface FormationOuverte {
  id: string;
  name: string;
  instructor: string;
  description: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  currentParticipants: number;
  price: number;
  status: 'active' | 'completed' | 'cancelled';
  level: 'beginner' | 'intermediate' | 'advanced';
}

const FormationsOuvertesManagement: React.FC = () => {
  const [formations, setFormations] = useState<FormationOuverte[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFormations, setFilteredFormations] = useState<FormationOuverte[]>([]);
  const [selectedFormation, setSelectedFormation] = useState<FormationOuverte | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data for demo
  useEffect(() => {
    setTimeout(() => {
      const mockFormations: FormationOuverte[] = [
        {
          id: '1',
          name: 'Formation React Avancée',
          instructor: 'Marie Dupont',
          description: 'Formation approfondie sur React et ses écosystèmes',
          startDate: '2024-03-15',
          endDate: '2024-03-30',
          maxParticipants: 20,
          currentParticipants: 15,
          price: 450,
          status: 'active',
          level: 'advanced'
        },
        {
          id: '2',
          name: 'JavaScript pour Débutants',
          instructor: 'Pierre Martin',
          description: 'Introduction au JavaScript et programmation web',
          startDate: '2024-03-20',
          endDate: '2024-04-05',
          maxParticipants: 25,
          currentParticipants: 18,
          price: 350,
          status: 'active',
          level: 'beginner'
        },
        {
          id: '3',
          name: 'Design UX/UI',
          instructor: 'Sophie Bernard',
          description: 'Conception d\'interfaces utilisateur modernes',
          startDate: '2024-04-01',
          endDate: '2024-04-15',
          maxParticipants: 15,
          currentParticipants: 12,
          price: 500,
          status: 'active',
          level: 'intermediate'
        }
      ];
      setFormations(mockFormations);
      setFilteredFormations(mockFormations);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter formations based on search term
  useEffect(() => {
    const filtered = formations.filter(formation =>
      formation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formation.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFormations(filtered);
  }, [searchTerm, formations]);

  const handleAddFormation = () => {
    setSelectedFormation(null);
    setShowForm(true);
  };

  const handleEditFormation = (formation: FormationOuverte) => {
    setSelectedFormation(formation);
    setShowForm(true);
  };

  const handleDeleteFormation = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      setFormations(formations.filter(f => f.id !== id));
    }
  };

  const handleSubmitForm = (formData: any) => {
    if (selectedFormation) {
      // Update existing formation
      setFormations(formations.map(f => 
        f.id === selectedFormation.id 
          ? { ...f, ...formData }
          : f
      ));
    } else {
      // Add new formation
      const newFormation: FormationOuverte = {
        id: Date.now().toString(),
        ...formData
      };
      setFormations([...formations, newFormation]);
    }
    setShowForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'completed':
        return 'text-blue-600 bg-blue-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'text-green-600 bg-green-100';
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-100';
      case 'advanced':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const formFields = [
    {
      name: 'name',
      label: 'Nom de la formation',
      type: 'text' as const,
      required: true,
      value: selectedFormation?.name || ''
    },
    {
      name: 'instructor',
      label: 'Instructeur',
      type: 'text' as const,
      required: true,
      value: selectedFormation?.instructor || ''
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      required: true,
      value: selectedFormation?.description || ''
    },
    {
      name: 'startDate',
      label: 'Date de début',
      type: 'date' as const,
      required: true,
      value: selectedFormation?.startDate || ''
    },
    {
      name: 'endDate',
      label: 'Date de fin',
      type: 'date' as const,
      required: true,
      value: selectedFormation?.endDate || ''
    },
    {
      name: 'maxParticipants',
      label: 'Nombre maximum de participants',
      type: 'number' as const,
      required: true,
      value: selectedFormation?.maxParticipants || 0
    },
    {
      name: 'price',
      label: 'Prix (€)',
      type: 'number' as const,
      required: true,
      value: selectedFormation?.price || 0
    },
    {
      name: 'level',
      label: 'Niveau',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'beginner', label: 'Débutant' },
        { value: 'intermediate', label: 'Intermédiaire' },
        { value: 'advanced', label: 'Avancé' }
      ],
      value: selectedFormation?.level || 'beginner'
    },
    {
      name: 'status',
      label: 'Statut',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'active', label: 'Actif' },
        { value: 'completed', label: 'Terminé' },
        { value: 'cancelled', label: 'Annulé' }
      ],
      value: selectedFormation?.status || 'active'
    }
  ];

  if (loading) {
    return (
      <div className="responsive-container">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="responsive-container">
      <div className="responsive-header">
        <h1 className="responsive-title">Gestion des Formations Ouvertes</h1>
        
        {/* Search and Add Button */}
        <div className="responsive-controls">
          <div className="responsive-search-container">
            <Search className="responsive-search-icon" />
            <input
              type="text"
              placeholder="Rechercher par nom de formation ou instructeur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="responsive-search-input"
            />
          </div>
          <button
            onClick={handleAddFormation}
            className="responsive-primary-button"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Ajouter Formation</span>
          </button>
        </div>
      </div>

      {/* Formations List */}
      <div className="responsive-grid">
        {filteredFormations.length === 0 ? (
          <div className="responsive-empty-state">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {searchTerm ? 'Aucune formation trouvée pour cette recherche' : 'Aucune formation disponible'}
            </p>
          </div>
        ) : (
          filteredFormations.map((formation) => (
            <div key={formation.id} className="responsive-card">
              <div className="responsive-card-header">
                <h3 className="responsive-card-title">{formation.name}</h3>
                <div className="responsive-card-actions">
                  <button
                    onClick={() => handleEditFormation(formation)}
                    className="responsive-icon-button"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteFormation(formation.id)}
                    className="responsive-icon-button text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="responsive-card-content">
                <p className="text-gray-600 mb-3">{formation.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Instructeur: {formation.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">
                      {formatDate(formation.startDate)} - {formatDate(formation.endDate)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">
                      Participants: {formation.currentParticipants}/{formation.maxParticipants}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`responsive-badge ${getStatusColor(formation.status)}`}>
                    {formation.status === 'active' ? 'Actif' : 
                     formation.status === 'completed' ? 'Terminé' : 'Annulé'}
                  </span>
                  <span className={`responsive-badge ${getLevelColor(formation.level)}`}>
                    {formation.level === 'beginner' ? 'Débutant' :
                     formation.level === 'intermediate' ? 'Intermédiaire' : 'Avancé'}
                  </span>
                </div>

                <div className="responsive-card-footer">
                  <span className="font-semibold text-lg text-blue-600">
                    {formation.price}€
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(formation.currentParticipants / formation.maxParticipants) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Formation Form Modal */}
      <AdminForm
        title={selectedFormation ? 'Modifier la Formation' : 'Nouvelle Formation'}
        fields={formFields}
        data={selectedFormation || {}}
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmitForm}
      />
    </div>
  );
};

export default FormationsOuvertesManagement;