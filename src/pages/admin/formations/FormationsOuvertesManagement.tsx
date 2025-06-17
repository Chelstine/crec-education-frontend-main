import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Users,
  Clock,
  Calendar,
  Download,
  GraduationCap,
  BookOpen,
  Star,
  DollarSign,
  Save,
  AlertTriangle,
  UserCheck,
  TrendingUp
} from 'lucide-react';

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
  dateCreation: string;
  category: string;
}

const FormationsOuvertesManagement: React.FC = () => {
  const [formations, setFormations] = useState<FormationOuverte[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFormations, setFilteredFormations] = useState<FormationOuverte[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingFormation, setEditingFormation] = useState<FormationOuverte | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [newFormation, setNewFormation] = useState<Partial<FormationOuverte>>({
    name: '',
    instructor: '',
    description: '',
    startDate: '',
    endDate: '',
    maxParticipants: 20,
    currentParticipants: 0,
    price: 0,
    status: 'active',
    level: 'beginner',
    category: 'Informatique'
  });

  // Mock data for demo
  useEffect(() => {
    setTimeout(() => {
      const mockFormations: FormationOuverte[] = [
        {
          id: '1',
          name: 'Formation React Avancée',
          instructor: 'Marie Dupont',
          description: 'Formation approfondie sur React et ses écosystèmes, incluant Redux, Next.js et les dernières bonnes pratiques.',
          startDate: '2024-03-15',
          endDate: '2024-03-30',
          maxParticipants: 20,
          currentParticipants: 15,
          price: 450,
          status: 'active',
          level: 'advanced',
          dateCreation: '2024-01-15',
          category: 'Développement Web'
        },
        {
          id: '2',
          name: 'JavaScript pour Débutants',
          instructor: 'Pierre Martin',
          description: 'Introduction au JavaScript et programmation web moderne avec des projets pratiques.',
          startDate: '2024-03-20',
          endDate: '2024-04-05',
          maxParticipants: 25,
          currentParticipants: 18,
          price: 350,
          status: 'active',
          level: 'beginner',
          dateCreation: '2024-01-20',
          category: 'Programmation'
        },
        {
          id: '3',
          name: 'Design UX/UI',
          instructor: 'Sophie Bernard',
          description: 'Conception d\'interfaces utilisateur modernes et accessibles avec Figma et Adobe XD.',
          startDate: '2024-04-01',
          endDate: '2024-04-15',
          maxParticipants: 15,
          currentParticipants: 12,
          price: 500,
          status: 'active',
          level: 'intermediate',
          dateCreation: '2024-02-01',
          category: 'Design'
        },
        {
          id: '4',
          name: 'Python Data Science',
          instructor: 'Ahmed Kone',
          description: 'Analyse de données avec Python, Pandas, NumPy et visualisation avec Matplotlib.',
          startDate: '2024-02-15',
          endDate: '2024-02-28',
          maxParticipants: 18,
          currentParticipants: 18,
          price: 600,
          status: 'completed',
          level: 'intermediate',
          dateCreation: '2024-01-10',
          category: 'Data Science'
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
      formation.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formation.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFormations(filtered);
  }, [searchTerm, formations]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const handleAddFormation = () => {
    setNewFormation({
      name: '',
      instructor: '',
      description: '',
      startDate: '',
      endDate: '',
      maxParticipants: 20,
      currentParticipants: 0,
      price: 0,
      status: 'active',
      level: 'beginner',
      category: 'Informatique'
    });
    setShowAddModal(true);
  };

  const handleEditFormation = (formation: FormationOuverte) => {
    setEditingFormation(formation);
    setNewFormation({
      name: formation.name,
      instructor: formation.instructor,
      description: formation.description,
      startDate: formation.startDate,
      endDate: formation.endDate,
      maxParticipants: formation.maxParticipants,
      currentParticipants: formation.currentParticipants,
      price: formation.price,
      status: formation.status,
      level: formation.level,
      category: formation.category
    });
    setShowEditModal(true);
  };

  const handleDeleteFormation = (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDeleteFormation = () => {
    if (deleteConfirmId) {
      setFormations(formations.filter(f => f.id !== deleteConfirmId));
      setDeleteConfirmId(null);
    }
  };

  const cancelDeleteFormation = () => {
    setDeleteConfirmId(null);
  };

  const handleSaveNewFormation = () => {
    if (!newFormation.name || !newFormation.instructor || !newFormation.description || !newFormation.startDate || !newFormation.endDate) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const id = `F${String(formations.length + 1).padStart(3, '0')}`;
    const formationToAdd: FormationOuverte = {
      id,
      name: newFormation.name!,
      instructor: newFormation.instructor!,
      description: newFormation.description!,
      startDate: newFormation.startDate!,
      endDate: newFormation.endDate!,
      maxParticipants: newFormation.maxParticipants || 20,
      currentParticipants: newFormation.currentParticipants || 0,
      price: newFormation.price || 0,
      status: (newFormation.status as 'active' | 'completed' | 'cancelled') || 'active',
      level: (newFormation.level as 'beginner' | 'intermediate' | 'advanced') || 'beginner',
      dateCreation: new Date().toISOString().split('T')[0],
      category: newFormation.category || 'Informatique'
    };

    setFormations([...formations, formationToAdd]);
    setShowAddModal(false);
  };

  const handleSaveEditFormation = () => {
    if (!editingFormation || !newFormation.name || !newFormation.instructor || !newFormation.description) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const updatedFormation: FormationOuverte = {
      ...editingFormation,
      name: newFormation.name!,
      instructor: newFormation.instructor!,
      description: newFormation.description!,
      startDate: newFormation.startDate!,
      endDate: newFormation.endDate!,
      maxParticipants: newFormation.maxParticipants || 20,
      currentParticipants: newFormation.currentParticipants || 0,
      price: newFormation.price || 0,
      status: (newFormation.status as 'active' | 'completed' | 'cancelled') || 'active',
      level: (newFormation.level as 'beginner' | 'intermediate' | 'advanced') || 'beginner',
      category: newFormation.category || 'Informatique'
    };

    setFormations(formations.map(f => f.id === editingFormation.id ? updatedFormation : f));
    setShowEditModal(false);
    setEditingFormation(null);
  };

  const handleCancelAdd = () => {
    setShowAddModal(false);
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingFormation(null);
  };

  const stats = {
    totalFormations: formations.length,
    activeFormations: formations.filter(f => f.status === 'active').length,
    completedFormations: formations.filter(f => f.status === 'completed').length,
    totalParticipants: formations.reduce((sum, f) => sum + f.currentParticipants, 0),
    averageCompletion: formations.length > 0 ? Math.round(formations.reduce((sum, f) => sum + (f.currentParticipants / f.maxParticipants), 0) / formations.length * 100) : 0
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Formations Ouvertes</h1>
          <p className="text-gray-600 mt-1">Gérez les formations publiques et leurs inscriptions</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold">{stats.totalFormations}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Actives</p>
                <p className="text-2xl font-bold text-green-600">{stats.activeFormations}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Participants</p>
                <p className="text-2xl font-bold text-orange-600">{stats.totalParticipants}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher par nom, instructeur ou catégorie..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button className="flex items-center gap-2" onClick={handleAddFormation}>
              <Plus className="w-4 h-4" />
              Nouvelle formation
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Liste des formations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Formations Ouvertes ({filteredFormations.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredFormations.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  {searchTerm ? 'Aucune formation trouvée pour cette recherche' : 'Aucune formation disponible'}
                </p>
              </div>
            ) : (
              filteredFormations.map((formation) => (
                <div key={formation.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{formation.name}</h3>
                        <Badge className={getStatusColor(formation.status)}>
                          {formation.status === 'active' ? 'Actif' : 
                           formation.status === 'completed' ? 'Terminé' : 'Annulé'}
                        </Badge>
                        <Badge className={getLevelColor(formation.level)}>
                          {formation.level === 'beginner' ? 'Débutant' :
                           formation.level === 'intermediate' ? 'Intermédiaire' : 'Avancé'}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4" />
                          <span>Instructeur: {formation.instructor}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(formation.startDate)} - {formatDate(formation.endDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>Participants: {formation.currentParticipants}/{formation.maxParticipants}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          <span>{formation.price}€</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-3">{formation.description}</p>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-800">Progression:</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300 progress-bar-width"
                            data-progress={(formation.currentParticipants / formation.maxParticipants) * 100}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">
                          {Math.round((formation.currentParticipants / formation.maxParticipants) * 100)}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-2"
                        onClick={() => handleEditFormation(formation)}
                        aria-label="Edit formation"
                        title="Edit formation"
                      >
                        <Edit className="w-4 h-4" />
                        Modifier
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        className="flex items-center gap-2"
                        onClick={() => handleDeleteFormation(formation.id)}
                        aria-label="Delete formation"
                        title="Delete formation"
                      >
                        <Trash2 className="w-4 h-4" />
                        Supprimer
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal d'ajout de formation */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Nouvelle Formation</h2>
              <Button variant="outline" onClick={handleCancelAdd}>✕</Button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom de la formation <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={newFormation.name || ''}
                    onChange={(e) => setNewFormation({...newFormation, name: e.target.value})}
                    placeholder="Ex: Formation React Avancée"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Instructeur <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={newFormation.instructor || ''}
                    onChange={(e) => setNewFormation({...newFormation, instructor: e.target.value})}
                    placeholder="Ex: Marie Dupont"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date de début <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    value={newFormation.startDate || ''}
                    onChange={(e) => setNewFormation({...newFormation, startDate: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date de fin <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    value={newFormation.endDate || ''}
                    onChange={(e) => setNewFormation({...newFormation, endDate: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre maximum de participants
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={newFormation.maxParticipants || ''}
                    onChange={(e) => setNewFormation({...newFormation, maxParticipants: parseInt(e.target.value) || 0})}
                    placeholder="20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prix (€)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={newFormation.price || ''}
                    onChange={(e) => setNewFormation({...newFormation, price: parseInt(e.target.value) || 0})}
                    placeholder="450"
                  />
                </div>

                <div>
                  <label htmlFor="niveau-select" className="block text-sm font-medium text-gray-700 mb-1">
                    Niveau
                  </label>
                  <select
                    id="niveau-select"
                    aria-label="Niveau"
                    value={newFormation.level}
                    onChange={(e) => setNewFormation({...newFormation, level: e.target.value as 'beginner' | 'intermediate' | 'advanced'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="beginner">Débutant</option>
                    <option value="intermediate">Intermédiaire</option>
                    <option value="advanced">Avancé</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Catégorie
                  </label>
                  <Input
                    value={newFormation.category || ''}
                    onChange={(e) => setNewFormation({...newFormation, category: e.target.value})}
                    placeholder="Ex: Développement Web"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <Textarea
                  value={newFormation.description || ''}
                  onChange={(e) => setNewFormation({...newFormation, description: e.target.value})}
                  rows={4}
                  placeholder="Description détaillée de la formation..."
                />
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button onClick={handleSaveNewFormation} className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Enregistrer
                </Button>
                <Button variant="outline" onClick={handleCancelAdd}>
                  Annuler
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal d'édition de formation */}
      {showEditModal && editingFormation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Modifier la Formation</h2>
              <Button variant="outline" onClick={handleCancelEdit}>✕</Button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom de la formation <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={newFormation.name || ''}
                    onChange={(e) => setNewFormation({...newFormation, name: e.target.value})}
                    placeholder="Ex: Formation React Avancée"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Instructeur <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={newFormation.instructor || ''}
                    onChange={(e) => setNewFormation({...newFormation, instructor: e.target.value})}
                    placeholder="Ex: Marie Dupont"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date de début <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    value={newFormation.startDate || ''}
                    onChange={(e) => setNewFormation({...newFormation, startDate: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date de fin <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    value={newFormation.endDate || ''}
                    onChange={(e) => setNewFormation({...newFormation, endDate: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Participants actuels
                  </label>
                  <Input
                    type="number"
                    min="0"
                    max={newFormation.maxParticipants || 0}
                    value={newFormation.currentParticipants || ''}
                    onChange={(e) => setNewFormation({...newFormation, currentParticipants: parseInt(e.target.value) || 0})}
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre maximum de participants
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={newFormation.maxParticipants || ''}
                    onChange={(e) => setNewFormation({...newFormation, maxParticipants: parseInt(e.target.value) || 0})}
                    placeholder="20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prix (€)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    value={newFormation.price || ''}
                    onChange={(e) => setNewFormation({...newFormation, price: parseInt(e.target.value) || 0})}
                    placeholder="450"
                  />
                </div>

                <div>
                  <label htmlFor="niveau-select" className="block text-sm font-medium text-gray-700 mb-1">
                    Niveau
                  </label>
                  <select
                    id="niveau-select"
                    aria-label="Niveau"
                    value={newFormation.level}
                    onChange={(e) => setNewFormation({...newFormation, level: e.target.value as 'beginner' | 'intermediate' | 'advanced'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="beginner">Débutant</option>
                    <option value="intermediate">Intermédiaire</option>
                    <option value="advanced">Avancé</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="statut-select" className="block text-sm font-medium text-gray-700 mb-1">
                    Statut
                  </label>
                  <select
                    id="statut-select"
                    aria-label="Statut"
                    value={newFormation.status}
                    onChange={(e) => setNewFormation({...newFormation, status: e.target.value as 'active' | 'completed' | 'cancelled'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="active">Actif</option>
                    <option value="completed">Terminé</option>
                    <option value="cancelled">Annulé</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Catégorie
                  </label>
                  <Input
                    value={newFormation.category || ''}
                    onChange={(e) => setNewFormation({...newFormation, category: e.target.value})}
                    placeholder="Ex: Développement Web"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <Textarea
                  value={newFormation.description || ''}
                  onChange={(e) => setNewFormation({...newFormation, description: e.target.value})}
                  rows={4}
                  placeholder="Description détaillée de la formation..."
                />
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button onClick={handleSaveEditFormation} className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Enregistrer les modifications
                </Button>
                <Button variant="outline" onClick={handleCancelEdit}>
                  Annuler
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dialogue de confirmation de suppression */}
      <AlertDialog open={deleteConfirmId !== null} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Confirmer la suppression
            </AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cette formation ? Cette action est irréversible et supprimera toutes les données associées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDeleteFormation}>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteFormation} className="bg-red-600 hover:bg-red-700">
              Supprimer définitivement
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FormationsOuvertesManagement;