import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  BookOpen,
  Users,
  Calendar,
  DollarSign,
  Star,
  MapPin,
  Clock,
  Award,
  TrendingUp,
  Target,
  Globe,
  Computer,
  HeartHandshake,
  GraduationCap,
  CheckCircle,
  XCircle,
  Save,
  X
} from 'lucide-react';

// Types pour les formations ouvertes - alignés avec OpenFormationsPage
interface FormationOuverte {
  id: number;
  title: string;
  description: string;
  icon: string; // Pour stocker le nom de l'icône
  features: string[];
  duration: string;
  level: string;
  price: string;
  certificate: boolean;
  category: 'langues' | 'informatique' | 'accompagnement' | 'entrepreneuriat';
  status: 'active' | 'inactive' | 'archived';
  capacity?: number;
  enrolled?: number;
  startDate?: string;
  instructor?: string;
  location: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

const FormationsOuvertesManagement: React.FC = () => {
  const [formations, setFormations] = useState<FormationOuverte[]>([]);
  const [filteredFormations, setFilteredFormations] = useState<FormationOuverte[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState<FormationOuverte | null>(null);
  const [formData, setFormData] = useState<Partial<FormationOuverte>>({});

  // Mock data pour les formations ouvertes - aligné avec OpenFormationsPage
  const mockFormations: FormationOuverte[] = [
    {
      id: 1,
      title: "Formations en Langues",
      icon: "Globe",
      description: "Maîtrisez l'anglais et le français avec nos cours adaptés à tous les niveaux",
      features: [
        "Cours d'anglais général et professionnel",
        "Préparation aux tests TOEFL, IELTS, TCF",
        "Français pour étrangers (FLE)",
        "Conversation et prononciation"
      ],
      duration: "3-6 mois",
      level: "Débutant à Avancé",
      price: "À partir de 15,000 FCFA",
      certificate: true,
      category: "langues",
      status: "active",
      capacity: 25,
      enrolled: 18,
      startDate: "2025-02-01",
      instructor: "Prof. Marie KOUASSI",
      location: "CREC Cotonou",
      featured: true,
      createdAt: "2024-12-01",
      updatedAt: "2024-12-20"
    },
    {
      id: 2,
      title: "Informatique de Base",
      icon: "Computer",
      description: "Initiez-vous à l'informatique et aux outils numériques essentiels",
      features: [
        "Utilisation de l'ordinateur (Windows, Mac)",
        "Bureautique (Word, Excel, PowerPoint)",
        "Navigation internet et email",
        "Réseaux sociaux et sécurité numérique"
      ],
      duration: "2-4 mois",
      level: "Débutant",
      price: "À partir de 20,000 FCFA",
      certificate: true,
      category: "informatique",
      status: "active",
      capacity: 20,
      enrolled: 15,
      startDate: "2025-01-15",
      instructor: "Dr. Jean ABLODÉ",
      location: "CREC Cotonou",
      featured: true,
      createdAt: "2024-11-15",
      updatedAt: "2024-12-18"
    },
    {
      id: 3,
      title: "Accompagnement Scolaire",
      icon: "HeartHandshake",
      description: "Soutien scolaire personnalisé pour tous les niveaux",
      features: [
        "Cours de soutien toutes matières",
        "Préparation aux examens officiels",
        "Méthodologie et techniques d'étude",
        "Encadrement personnalisé"
      ],
      duration: "Toute l'année",
      level: "Primaire à Universitaire",
      price: "À partir de 10,000 FCFA",
      certificate: false,
      category: "accompagnement",
      status: "active",
      capacity: 30,
      enrolled: 22,
      startDate: "2024-09-01",
      instructor: "Équipe pédagogique CREC",
      location: "CREC Cotonou",
      featured: false,
      createdAt: "2024-08-01",
      updatedAt: "2024-12-15"
    },
    {
      id: 4,
      title: "Entrepreneuriat",
      icon: "GraduationCap",
      description: "Développez vos compétences entrepreneuriales et créez votre entreprise",
      features: [
        "Élaboration de business plan",
        "Gestion financière et comptabilité",
        "Marketing et communication",
        "Accompagnement post-formation"
      ],
      duration: "4-6 mois",
      level: "Tous niveaux",
      price: "À partir de 25,000 FCFA",
      certificate: true,
      category: "entrepreneuriat",
      status: "active",
      capacity: 15,
      enrolled: 12,
      startDate: "2025-03-01",
      instructor: "M. Paul MENSAH",
      location: "CREC Cotonou",
      featured: true,
      createdAt: "2024-10-01",
      updatedAt: "2024-12-22"
    }
  ];

  // Initialisation des données
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setFormations(mockFormations);
      setFilteredFormations(mockFormations);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtrage des formations
  useEffect(() => {
    let filtered = formations;

    if (searchTerm) {
      filtered = filtered.filter(formation =>
        formation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        formation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        formation.instructor?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(formation => formation.category === filterCategory);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(formation => formation.status === filterStatus);
    }

    setFilteredFormations(filtered);
  }, [formations, searchTerm, filterCategory, filterStatus]);

  // Icônes pour les formations
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-8 h-8 text-crec-gold" />;
      case 'Computer': return <Computer className="w-8 h-8 text-crec-gold" />;
      case 'HeartHandshake': return <HeartHandshake className="w-8 h-8 text-crec-gold" />;
      case 'GraduationCap': return <GraduationCap className="w-8 h-8 text-crec-gold" />;
      default: return <BookOpen className="w-8 h-8 text-crec-gold" />;
    }
  };

  // Fonction pour obtenir la couleur de la catégorie
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'langues': return 'bg-blue-100 text-blue-800';
      case 'informatique': return 'bg-green-100 text-green-800';
      case 'accompagnement': return 'bg-purple-100 text-purple-800';
      case 'entrepreneuriat': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Fonction pour obtenir la couleur du statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Gestionnaires d'événements
  const handleCreateFormation = () => {
    setFormData({
      title: '',
      description: '',
      icon: 'BookOpen',
      features: [''],
      duration: '',
      level: '',
      price: '',
      certificate: false,
      category: 'langues',
      status: 'active',
      location: 'CREC Cotonou',
      featured: false
    });
    setIsCreateDialogOpen(true);
  };

  const handleEditFormation = (formation: FormationOuverte) => {
    setSelectedFormation(formation);
    setFormData(formation);
    setIsEditDialogOpen(true);
  };

  const handleDeleteFormation = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      setFormations(formations.filter(f => f.id !== id));
    }
  };

  const handleSaveFormation = () => {
    if (selectedFormation) {
      // Mise à jour
      setFormations(formations.map(f => 
        f.id === selectedFormation.id 
          ? { ...formData, id: selectedFormation.id, updatedAt: new Date().toISOString() } as FormationOuverte
          : f
      ));
      setIsEditDialogOpen(false);
    } else {
      // Création
      const newFormation: FormationOuverte = {
        ...formData as FormationOuverte,
        id: Math.max(...formations.map(f => f.id)) + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setFormations([...formations, newFormation]);
      setIsCreateDialogOpen(false);
    }
    setSelectedFormation(null);
    setFormData({});
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...(prev.features || []), ''] }));
  };

  const removeFeature = (index: number) => {
    const newFeatures = (formData.features || []).filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-crec-gold"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestion des Formations Ouvertes</h1>
          <p className="text-gray-600">Gérez le catalogue des formations accessibles au grand public</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreateFormation} className="bg-crec-gold hover:bg-crec-gold/90 text-black">
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Formation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Créer une nouvelle formation</DialogTitle>
              <DialogDescription>
                Remplissez les informations de la nouvelle formation ouverte
              </DialogDescription>
            </DialogHeader>
            <div className="text-center py-8 text-gray-500">
              Formulaire de création en cours de développement...
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Annuler
              </Button>
              <Button className="bg-crec-gold hover:bg-crec-gold/90 text-black">
                Créer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Total Formations</CardTitle>
              <BookOpen className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">{formations.length}</div>
              <p className="text-xs text-blue-600">Formations disponibles</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Apprenants Inscrits</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">
                {formations.reduce((total, f) => total + (f.enrolled || 0), 0)}
              </div>
              <p className="text-xs text-green-600">
                Sur {formations.reduce((total, f) => total + (f.capacity || 0), 0)} places
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Formations Actives</CardTitle>
              <Target className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">
                {formations.filter(f => f.status === 'active').length}
              </div>
              <p className="text-xs text-purple-600">
                En cours d'inscription
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">Taux d'Occupation</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-700">
                {Math.round((formations.reduce((total, f) => total + (f.enrolled || 0), 0) / formations.reduce((total, f) => total + (f.capacity || 0), 0)) * 100)}%
              </div>
              <p className="text-xs text-orange-600">
                Moyenne d'occupation
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filtres et recherche */}
      <motion.div
        className="bg-white p-6 rounded-lg shadow-sm border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher une formation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              <SelectItem value="langues">Langues</SelectItem>
              <SelectItem value="informatique">Informatique</SelectItem>
              <SelectItem value="accompagnement">Accompagnement</SelectItem>
              <SelectItem value="entrepreneuriat">Entrepreneuriat</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="archived">Archivée</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Liste des formations en cartes */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {filteredFormations.map((formation, index) => (
          <motion.div
            key={formation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-l-crec-gold">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    {getIcon(formation.icon)}
                    <div>
                      <CardTitle className="text-xl text-crec-dark">{formation.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getCategoryColor(formation.category)}>
                          {formation.category}
                        </Badge>
                        <Badge className={getStatusColor(formation.status)}>
                          {formation.status}
                        </Badge>
                        {formation.featured && (
                          <Badge className="bg-crec-gold hover:bg-crec-gold/90 text-black">
                            <Star className="w-3 h-3 mr-1" />
                            Vedette
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditFormation(formation)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteFormation(formation.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-gray-600 mt-3">{formation.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Informations principales */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{formation.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span>{formation.enrolled || 0}/{formation.capacity || 0}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{formation.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span>{formation.price}</span>
                    </div>
                  </div>

                  {/* Programme */}
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Programme :</h4>
                    <ul className="space-y-1">
                      {formation.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                          <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                      {formation.features.length > 3 && (
                        <li className="text-xs text-gray-500 italic">
                          +{formation.features.length - 3} autres modules...
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Pied de carte */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2">
                      {formation.certificate && (
                        <Badge variant="outline" className="text-xs">
                          <Award className="w-3 h-3 mr-1" />
                          Certificat
                        </Badge>
                      )}
                      <span className="text-xs text-gray-500">
                        {formation.instructor}
                      </span>
                    </div>
                    <Link 
                      to={`/formations/ouvertes/${formation.id}`}
                      className="text-crec-gold hover:text-crec-gold/80 text-sm font-medium"
                    >
                      Voir les inscriptions →
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Message si aucune formation */}
      {filteredFormations.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune formation trouvée</h3>
          <p className="mt-1 text-sm text-gray-500">
            Essayez de modifier vos critères de recherche ou créez une nouvelle formation.
          </p>
        </motion.div>
      )}

      {/* Dialog d'édition */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier la formation</DialogTitle>
            <DialogDescription>
              Modifiez les informations de la formation sélectionnée
            </DialogDescription>
          </DialogHeader>
          <div className="text-center py-8 text-gray-500">
            Formulaire de modification en cours de développement...
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveFormation} className="bg-crec-gold hover:bg-crec-gold/90 text-black">
              Sauvegarder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormationsOuvertesManagement;
