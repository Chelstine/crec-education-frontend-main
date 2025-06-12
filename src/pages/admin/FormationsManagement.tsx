import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
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
  Filter,
  BookOpen,
  GraduationCap,
  Users,
  Calendar,
  DollarSign,
  Star,
  MapPin,
  Clock
} from 'lucide-react';

// Types pour les formations
interface Formation {
  id: string;
  title: string;
  description: string;
  type: 'university' | 'professional' | 'short';
  category: string;
  duration: string;
  price: number;
  capacity: number;
  enrolled: number;
  startDate: string;
  endDate: string;
  location: string;
  instructor: string;
  status: 'active' | 'inactive' | 'completed' | 'planned';
  level: 'beginner' | 'intermediate' | 'advanced';
  language: 'french' | 'english';
  prerequisites?: string;
  objectives: string[];
  modules: string[];
  image?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

interface FormationFormData {
  title: string;
  description: string;
  type: 'university' | 'professional' | 'short';
  category: string;
  duration: string;
  price: number;
  capacity: number;
  startDate: string;
  endDate: string;
  location: string;
  instructor: string;
  status: 'active' | 'inactive' | 'completed' | 'planned';
  level: 'beginner' | 'intermediate' | 'advanced';
  language: 'french' | 'english';
  prerequisites: string;
  objectives: string;
  modules: string;
  featured: boolean;
}

const FormationsManagement: React.FC = () => {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [filteredFormations, setFilteredFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null);
  
  const [formData, setFormData] = useState<FormationFormData>({
    title: '',
    description: '',
    type: 'professional',
    category: '',
    duration: '',
    price: 0,
    capacity: 0,
    startDate: '',
    endDate: '',
    location: '',
    instructor: '',
    status: 'planned',
    level: 'beginner',
    language: 'french',
    prerequisites: '',
    objectives: '',
    modules: '',
    featured: false
  });

  // Données mock pour commencer
  const mockFormations: Formation[] = [
    {
      id: '1',
      title: 'Développement Web Full Stack',
      description: 'Formation complète en développement web moderne avec React, Node.js et MongoDB',
      type: 'professional',
      category: 'Informatique',
      duration: '6 mois',
      price: 850000,
      capacity: 25,
      enrolled: 18,
      startDate: '2025-02-15',
      endDate: '2025-08-15',
      location: 'CREC Campus',
      instructor: 'Dr. Kokou ADJANON',
      status: 'active',
      level: 'intermediate',
      language: 'french',
      prerequisites: 'Connaissances de base en programmation',
      objectives: [
        'Maîtriser React et les frameworks modernes',
        'Développer des APIs avec Node.js',
        'Gérer des bases de données MongoDB',
        'Déployer des applications web'
      ],
      modules: [
        'HTML/CSS avancé',
        'JavaScript ES6+',
        'React.js',
        'Node.js & Express',
        'MongoDB',
        'Déploiement et DevOps'
      ],
      featured: true,
      createdAt: '2024-12-01',
      updatedAt: '2025-01-15'
    },
    {
      id: '2',
      title: 'Data Science et Intelligence Artificielle',
      description: 'Apprenez les techniques de data science et d\'IA avec Python et TensorFlow',
      type: 'professional',
      category: 'Data Science',
      duration: '8 mois',
      price: 1200000,
      capacity: 20,
      enrolled: 15,
      startDate: '2025-03-01',
      endDate: '2025-10-30',
      location: 'CREC Campus',
      instructor: 'Dr. Amina SAGBO',
      status: 'active',
      level: 'advanced',
      language: 'french',
      prerequisites: 'Mathématiques niveau universitaire, bases en programmation',
      objectives: [
        'Maîtriser Python pour la data science',
        'Comprendre les algorithmes de machine learning',
        'Utiliser TensorFlow et Keras',
        'Analyser et visualiser des données complexes'
      ],
      modules: [
        'Python pour Data Science',
        'Statistiques et probabilités',
        'Machine Learning',
        'Deep Learning',
        'Visualisation de données',
        'Projet final'
      ],
      featured: true,
      createdAt: '2024-11-15',
      updatedAt: '2025-01-10'
    },
    {
      id: '3',
      title: 'ISTMR - Licence en Théologie',
      description: 'Formation universitaire en théologie et sciences religieuses',
      type: 'university',
      category: 'Théologie',
      duration: '3 ans',
      price: 500000,
      capacity: 50,
      enrolled: 35,
      startDate: '2025-10-01',
      endDate: '2028-07-30',
      location: 'ISTMR Campus',
      instructor: 'Équipe pédagogique ISTMR',
      status: 'planned',
      level: 'beginner',
      language: 'french',
      prerequisites: 'Baccalauréat ou équivalent',
      objectives: [
        'Acquérir une formation théologique solide',
        'Développer la pensée critique religieuse',
        'Préparer au ministère pastoral',
        'Comprendre les enjeux contemporains de la foi'
      ],
      modules: [
        'Écriture Sainte',
        'Théologie dogmatique',
        'Théologie morale',
        'Histoire de l\'Église',
        'Pastorale',
        'Langues bibliques'
      ],
      featured: false,
      createdAt: '2024-09-01',
      updatedAt: '2024-12-20'
    },
    {
      id: '4',
      title: 'Formation Arduino et IoT',
      description: 'Initiation pratique à l\'Internet des Objets avec Arduino',
      type: 'short',
      category: 'Électronique',
      duration: '2 semaines',
      price: 75000,
      capacity: 15,
      enrolled: 12,
      startDate: '2025-01-20',
      endDate: '2025-01-31',
      location: 'FabLab CREC',
      instructor: 'Ing. Pierre KODJO',
      status: 'completed',
      level: 'beginner',
      language: 'french',
      prerequisites: 'Aucun',
      objectives: [
        'Comprendre les bases de l\'électronique',
        'Programmer des microcontrôleurs Arduino',
        'Créer des objets connectés simples',
        'Intégrer des capteurs et actionneurs'
      ],
      modules: [
        'Introduction à Arduino',
        'Capteurs et composants',
        'Programmation C++',
        'Communication sans fil',
        'Projet pratique'
      ],
      featured: false,
      createdAt: '2024-12-15',
      updatedAt: '2025-01-31'
    }
  ];

  useEffect(() => {
    // Simulation du chargement des données
    const timer = setTimeout(() => {
      setFormations(mockFormations);
      setFilteredFormations(mockFormations);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filtrage et recherche
  useEffect(() => {
    let filtered = formations;

    // Filtrage par recherche
    if (searchTerm) {
      filtered = filtered.filter(formation =>
        formation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        formation.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        formation.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrage par type
    if (filterType !== 'all') {
      filtered = filtered.filter(formation => formation.type === filterType);
    }

    // Filtrage par statut
    if (filterStatus !== 'all') {
      filtered = filtered.filter(formation => formation.status === filterStatus);
    }

    setFilteredFormations(filtered);
  }, [formations, searchTerm, filterType, filterStatus]);

  const handleCreateFormation = async () => {
    try {
      const newFormation: Formation = {
        id: Date.now().toString(),
        ...formData,
        enrolled: 0,
        objectives: formData.objectives.split('\n').filter(obj => obj.trim()),
        modules: formData.modules.split('\n').filter(mod => mod.trim()),
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };

      setFormations([...formations, newFormation]);
      setIsCreateDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    }
  };

  const handleEditFormation = async () => {
    if (!selectedFormation) return;

    try {
      const updatedFormation: Formation = {
        ...selectedFormation,
        ...formData,
        objectives: formData.objectives.split('\n').filter(obj => obj.trim()),
        modules: formData.modules.split('\n').filter(mod => mod.trim()),
        updatedAt: new Date().toISOString().split('T')[0]
      };

      setFormations(formations.map(f => 
        f.id === selectedFormation.id ? updatedFormation : f
      ));
      setIsEditDialogOpen(false);
      setSelectedFormation(null);
      resetForm();
    } catch (error) {
      console.error('Erreur lors de la modification:', error);
    }
  };

  const handleDeleteFormation = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      setFormations(formations.filter(f => f.id !== id));
    }
  };

  const openEditDialog = (formation: Formation) => {
    setSelectedFormation(formation);
    setFormData({
      title: formation.title,
      description: formation.description,
      type: formation.type,
      category: formation.category,
      duration: formation.duration,
      price: formation.price,
      capacity: formation.capacity,
      startDate: formation.startDate,
      endDate: formation.endDate,
      location: formation.location,
      instructor: formation.instructor,
      status: formation.status,
      level: formation.level,
      language: formation.language,
      prerequisites: formation.prerequisites || '',
      objectives: formation.objectives.join('\n'),
      modules: formation.modules.join('\n'),
      featured: formation.featured
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'professional',
      category: '',
      duration: '',
      price: 0,
      capacity: 0,
      startDate: '',
      endDate: '',
      location: '',
      instructor: '',
      status: 'planned',
      level: 'beginner',
      language: 'french',
      prerequisites: '',
      objectives: '',
      modules: '',
      featured: false
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Actif' },
      inactive: { color: 'bg-gray-100 text-gray-800', label: 'Inactif' },
      completed: { color: 'bg-blue-100 text-blue-800', label: 'Terminé' },
      planned: { color: 'bg-yellow-100 text-yellow-800', label: 'Planifié' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      university: { color: 'bg-purple-100 text-purple-800', label: 'Universitaire', icon: GraduationCap },
      professional: { color: 'bg-blue-100 text-blue-800', label: 'Professionnelle', icon: BookOpen },
      short: { color: 'bg-orange-100 text-orange-800', label: 'Courte', icon: Clock }
    };
    
    const config = typeConfig[type as keyof typeof typeConfig];
    const IconComponent = config.icon;
    
    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <IconComponent className="w-3 h-3" />
        {config.label}
      </Badge>
    );
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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-crec-gold" />
            Gestion des Formations
          </h1>
          <p className="text-gray-600 mt-1">
            Gérez toutes les formations disponibles au CREC
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-crec-gold hover:bg-crec-lightgold text-white flex items-center gap-2 mt-4 sm:mt-0">
              <Plus className="w-4 h-4" />
              Nouvelle Formation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Créer une nouvelle formation</DialogTitle>
              <DialogDescription>
                Remplissez les informations pour créer une nouvelle formation
              </DialogDescription>
            </DialogHeader>
            
            <FormationForm 
              formData={formData} 
              setFormData={setFormData}
              isEdit={false}
            />
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleCreateFormation} className="bg-crec-gold hover:bg-crec-lightgold">
                Créer la formation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Formations</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formations.length}</div>
              <p className="text-xs text-muted-foreground">
                Toutes catégories confondues
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Formations Actives</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formations.filter(f => f.status === 'active').length}
              </div>
              <p className="text-xs text-muted-foreground">
                En cours actuellement
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Participants Total</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {formations.reduce((total, f) => total + f.enrolled, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Étudiants inscrits
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenus Estimés</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {(formations.reduce((total, f) => total + (f.price * f.enrolled), 0) / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground">
                FCFA générés
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filtres et recherche */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filtres et Recherche</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher par titre, catégorie ou instructeur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Type de formation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="university">Universitaire</SelectItem>
                  <SelectItem value="professional">Professionnelle</SelectItem>
                  <SelectItem value="short">Formation courte</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
                  <SelectItem value="completed">Terminé</SelectItem>
                  <SelectItem value="planned">Planifié</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Table des formations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Formations ({filteredFormations.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Formation</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFormations.map((formation) => (
                    <TableRow key={formation.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{formation.title}</div>
                          <div className="text-sm text-gray-500">{formation.category}</div>
                          <div className="text-xs text-gray-400">
                            <MapPin className="inline w-3 h-3 mr-1" />
                            {formation.location}
                          </div>
                          {formation.featured && (
                            <Star className="inline w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getTypeBadge(formation.type)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(formation.status)}
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <div className="font-medium">
                            {formation.enrolled}/{formation.capacity}
                          </div>
                          <div className="text-xs text-gray-500">
                            {Math.round((formation.enrolled / formation.capacity) * 100)}% rempli
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(formation.startDate).toLocaleDateString('fr-FR')}
                          </div>
                          <div className="text-xs text-gray-500">
                            → {new Date(formation.endDate).toLocaleDateString('fr-FR')}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formation.duration}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {formation.price.toLocaleString()} FCFA
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            asChild
                            variant="default"
                            size="sm"
                            className="bg-crec-gold hover:bg-crec-lightgold"
                          >
                            <Link to={`/admin/formations/${formation.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              Gérer
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(formation)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteFormation(formation.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredFormations.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Aucune formation trouvée avec ces critères.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Dialog d'édition */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier la formation</DialogTitle>
            <DialogDescription>
              Modifiez les informations de la formation
            </DialogDescription>
          </DialogHeader>
          
          <FormationForm 
            formData={formData} 
            setFormData={setFormData}
            isEdit={true}
          />
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleEditFormation} className="bg-crec-gold hover:bg-crec-lightgold">
              Sauvegarder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Composant du formulaire de formation
const FormationForm: React.FC<{
  formData: FormationFormData;
  setFormData: React.Dispatch<React.SetStateAction<FormationFormData>>;
  isEdit: boolean;
}> = ({ formData, setFormData, isEdit }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Informations de base */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Titre de la formation *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Ex: Développement Web Full Stack"
          />
        </div>

        <div>
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Description détaillée de la formation"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="type">Type *</Label>
            <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="university">Universitaire</SelectItem>
                <SelectItem value="professional">Professionnelle</SelectItem>
                <SelectItem value="short">Formation courte</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="category">Catégorie *</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Ex: Informatique"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="duration">Durée *</Label>
            <Input
              id="duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="Ex: 6 mois"
            />
          </div>

          <div>
            <Label htmlFor="price">Prix (FCFA) *</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
              placeholder="850000"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="capacity">Capacité *</Label>
            <Input
              id="capacity"
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })}
              placeholder="25"
            />
          </div>

          <div>
            <Label htmlFor="location">Lieu *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="CREC Campus"
            />
          </div>
        </div>
      </div>

      {/* Détails avancés */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate">Date de début *</Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="endDate">Date de fin *</Label>
            <Input
              id="endDate"
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="instructor">Instructeur *</Label>
          <Input
            id="instructor"
            value={formData.instructor}
            onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
            placeholder="Dr. Kokou ADJANON"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="status">Statut *</Label>
            <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planned">Planifié</SelectItem>
                <SelectItem value="active">Actif</SelectItem>
                <SelectItem value="inactive">Inactif</SelectItem>
                <SelectItem value="completed">Terminé</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="level">Niveau *</Label>
            <Select value={formData.level} onValueChange={(value: any) => setFormData({ ...formData, level: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Débutant</SelectItem>
                <SelectItem value="intermediate">Intermédiaire</SelectItem>
                <SelectItem value="advanced">Avancé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="language">Langue *</Label>
          <Select value={formData.language} onValueChange={(value: any) => setFormData({ ...formData, language: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="french">Français</SelectItem>
              <SelectItem value="english">Anglais</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="prerequisites">Prérequis</Label>
          <Textarea
            id="prerequisites"
            value={formData.prerequisites}
            onChange={(e) => setFormData({ ...formData, prerequisites: e.target.value })}
            placeholder="Connaissances requises pour suivre cette formation"
            rows={2}
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            id="featured"
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="rounded border-gray-300"
          />
          <Label htmlFor="featured">Formation en vedette</Label>
        </div>
      </div>

      {/* Objectifs et modules - pleine largeur */}
      <div className="md:col-span-2 space-y-4">
        <div>
          <Label htmlFor="objectives">Objectifs (un par ligne)</Label>
          <Textarea
            id="objectives"
            value={formData.objectives}
            onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
            placeholder="Maîtriser React et les frameworks modernes&#10;Développer des APIs avec Node.js&#10;Gérer des bases de données MongoDB"
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="modules">Modules (un par ligne)</Label>
          <Textarea
            id="modules"
            value={formData.modules}
            onChange={(e) => setFormData({ ...formData, modules: e.target.value })}
            placeholder="HTML/CSS avancé&#10;JavaScript ES6+&#10;React.js&#10;Node.js & Express"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default FormationsManagement;
