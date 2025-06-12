import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
  Wrench,
  Users,
  Calendar,
  DollarSign,
  Star,
  MapPin,
  Clock,
  Cpu,
  Lightbulb,
  Award,
  TrendingUp,
  Zap
} from 'lucide-react';

// Types pour les formations FabLab
interface FormationFabLab {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'workshop' | 'course' | 'project' | 'bootcamp';
  duration: string;
  price: number;
  capacity: number;
  enrolled: number;
  startDate: string;
  endDate: string;
  location: string;
  instructor: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  prerequisites?: string;
  objectives: string[];
  equipment: string[];
  materials: string[];
  projects: string[];
  certification?: string;
  status: 'active' | 'inactive' | 'completed' | 'planned';
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

const FabLabFormationsManagement: React.FC = () => {
  const [formations, setFormations] = useState<FormationFabLab[]>([]);
  const [filteredFormations, setFilteredFormations] = useState<FormationFabLab[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Mock data pour les formations FabLab
  const mockFormations: FormationFabLab[] = [
    {
      id: '1',
      title: 'Initiation à l\'Impression 3D',
      description: 'Apprenez les bases de l\'impression 3D, de la modélisation à la fabrication',
      category: 'Impression 3D',
      type: 'workshop',
      duration: '2 semaines',
      price: 150000,
      capacity: 12,
      enrolled: 10,
      startDate: '2025-02-01',
      endDate: '2025-02-15',
      location: 'FabLab - Zone Impression 3D',
      instructor: 'M. Kossi AMEGBETO',
      level: 'beginner',
      prerequisites: 'Aucun prérequis',
      objectives: [
        'Comprendre les principes de l\'impression 3D',
        'Utiliser les logiciels de modélisation 3D',
        'Configurer et utiliser une imprimante 3D',
        'Résoudre les problèmes courants'
      ],
      equipment: ['Imprimante 3D Ender 3', 'Imprimante 3D Anycubic Kobra', 'Ordinateurs avec logiciels 3D'],
      materials: ['Filament PLA', 'Filament PETG', 'Support adhésif', 'Outils de finition'],
      projects: [
        'Porte-clés personnalisé',
        'Support de téléphone',
        'Objet décoratif complexe',
        'Pièce de réparation fonctionnelle'
      ],
      certification: 'Certificat FabLab - Impression 3D',
      status: 'active',
      featured: true,
      createdAt: '2024-12-01',
      updatedAt: '2024-12-20'
    },
    {
      id: '2',
      title: 'Arduino et Électronique pour Débutants',
      description: 'Découvrez l\'électronique et la programmation avec Arduino',
      category: 'Électronique',
      type: 'course',
      duration: '1 mois',
      price: 200000,
      capacity: 15,
      enrolled: 12,
      startDate: '2025-02-15',
      endDate: '2025-03-15',
      location: 'FabLab - Zone Électronique',
      instructor: 'Mme. Adjoa MENSAH',
      level: 'beginner',
      prerequisites: 'Notions de base en informatique',
      objectives: [
        'Comprendre les composants électroniques',
        'Programmer des microcontrôleurs Arduino',
        'Réaliser des montages électroniques',
        'Créer des projets IoT simples'
      ],
      equipment: ['Cartes Arduino Uno', 'Breadboards', 'Multimètres', 'Fer à souder'],
      materials: ['Résistances', 'LEDs', 'Capteurs', 'Servomoteurs', 'Écrans LCD'],
      projects: [
        'Système d\'éclairage automatique',
        'Station météo connectée',
        'Système d\'arrosage automatique',
        'Robot suiveur de ligne'
      ],
      certification: 'Certificat FabLab - Arduino & IoT',
      status: 'planned',
      featured: true,
      createdAt: '2024-11-15',
      updatedAt: '2024-12-18'
    },
    {
      id: '3',
      title: 'Fabrication Numérique Avancée',
      description: 'Maîtrisez les techniques avancées de fabrication numérique',
      category: 'Fabrication Numérique',
      type: 'bootcamp',
      duration: '6 semaines',
      price: 500000,
      capacity: 8,
      enrolled: 6,
      startDate: '2025-03-01',
      endDate: '2025-04-15',
      location: 'FabLab - Atelier Principal',
      instructor: 'M. Edem KODJO',
      level: 'advanced',
      prerequisites: 'Expérience en impression 3D et électronique',
      objectives: [
        'Maîtriser la découpe laser',
        'Intégrer plusieurs technologies',
        'Gérer un projet de A à Z',
        'Créer des prototypes professionnels'
      ],
      equipment: ['Découpeuse laser', 'Fraiseuse CNC', 'Imprimantes 3D professionnelles', 'Outils de précision'],
      materials: ['Bois contreplaqué', 'Acrylique', 'Métal fin', 'Composants électroniques avancés'],
      projects: [
        'Horloge intelligente personnalisée',
        'Drone de surveillance',
        'Station de recharge solaire',
        'Prototype de produit innovant'
      ],
      certification: 'Certificat FabLab - Expert Fabrication',
      status: 'planned',
      featured: true,
      createdAt: '2024-12-05',
      updatedAt: '2024-12-20'
    },
    {
      id: '4',
      title: 'Réparation et Maintenance d\'Équipements',
      description: 'Apprenez à diagnostiquer et réparer les équipements électroniques',
      category: 'Réparation',
      type: 'workshop',
      duration: '3 semaines',
      price: 180000,
      capacity: 10,
      enrolled: 8,
      startDate: '2025-01-20',
      endDate: '2025-02-10',
      location: 'FabLab - Atelier Réparation',
      instructor: 'M. Koffi LAWSON',
      level: 'intermediate',
      prerequisites: 'Connaissances de base en électronique',
      objectives: [
        'Diagnostiquer les pannes courantes',
        'Utiliser les outils de diagnostic',
        'Remplacer les composants défectueux',
        'Prévenir les pannes futures'
      ],
      equipment: ['Oscilloscopes', 'Analyseurs de spectre', 'Stations de dessoudage', 'Pièces de rechange'],
      materials: ['Composants électroniques', 'Soudure', 'Flux', 'Nettoyants spécialisés'],
      projects: [
        'Réparation d\'ordinateur portable',
        'Maintenance d\'imprimante 3D',
        'Réparation de smartphone',
        'Diagnostic de carte électronique'
      ],
      certification: 'Certificat FabLab - Réparation Électronique',
      status: 'active',
      featured: false,
      createdAt: '2024-10-01',
      updatedAt: '2024-12-15'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormations(mockFormations);
      setFilteredFormations(mockFormations);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filtrage
  useEffect(() => {
    let filtered = formations;

    if (searchTerm) {
      filtered = filtered.filter(formation =>
        formation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        formation.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        formation.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(formation => formation.category === filterCategory);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(formation => formation.status === filterStatus);
    }

    if (filterLevel !== 'all') {
      filtered = filtered.filter(formation => formation.level === filterLevel);
    }

    setFilteredFormations(filtered);
  }, [formations, searchTerm, filterCategory, filterStatus, filterLevel]);

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      workshop: { color: 'bg-blue-100 text-blue-800', label: 'Atelier' },
      course: { color: 'bg-green-100 text-green-800', label: 'Cours' },
      project: { color: 'bg-purple-100 text-purple-800', label: 'Projet' },
      bootcamp: { color: 'bg-orange-100 text-orange-800', label: 'Bootcamp' }
    };
    const config = typeConfig[type as keyof typeof typeConfig];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Active' },
      inactive: { color: 'bg-gray-100 text-gray-800', label: 'Inactive' },
      completed: { color: 'bg-blue-100 text-blue-800', label: 'Terminée' },
      planned: { color: 'bg-yellow-100 text-yellow-800', label: 'Planifiée' }
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getLevelBadge = (level: string) => {
    const levelConfig = {
      beginner: { color: 'bg-green-100 text-green-800', label: 'Débutant' },
      intermediate: { color: 'bg-yellow-100 text-yellow-800', label: 'Intermédiaire' },
      advanced: { color: 'bg-red-100 text-red-800', label: 'Avancé' }
    };
    const config = levelConfig[level as keyof typeof levelConfig];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  // Obtenir les catégories uniques
  const categories = [...new Set(formations.map(f => f.category))];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Wrench className="h-8 w-8 text-crec-gold" />
            FabLab - Formations Techniques
          </h1>
          <p className="text-gray-600 mt-1">Ateliers et formations en fabrication numérique</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-crec-gold hover:bg-crec-lightgold">
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle Formation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Créer une nouvelle formation FabLab</DialogTitle>
              <DialogDescription>
                Ajoutez un nouvel atelier ou formation technique
              </DialogDescription>
            </DialogHeader>
            {/* Formulaire sera ajouté ici */}
            <div className="text-center py-8 text-gray-500">
              Formulaire de création en cours de développement...
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Annuler
              </Button>
              <Button className="bg-crec-gold hover:bg-crec-lightgold">
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
              <CardTitle className="text-sm font-medium">Total Formations</CardTitle>
              <Wrench className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">{formations.length}</div>
              <p className="text-xs text-blue-600">
                Ateliers et cours
              </p>
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
              <CardTitle className="text-sm font-medium">Participants</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">
                {formations.reduce((total, f) => total + f.enrolled, 0)}
              </div>
              <p className="text-xs text-green-600">
                Sur {formations.reduce((total, f) => total + f.capacity, 0)} places
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
              <CardTitle className="text-sm font-medium">Revenus</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">
                {(formations.reduce((total, f) => total + (f.price * f.enrolled), 0) / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-purple-600">
                FCFA générés
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
              <CardTitle className="text-sm font-medium">Projets Réalisés</CardTitle>
              <Lightbulb className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-700">
                {formations.reduce((total, f) => total + f.projects.length, 0)}
              </div>
              <p className="text-xs text-orange-600">
                Projets dans le curriculum
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
        <Card className="mb-6">
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
              
              <div className="flex gap-4">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filterLevel} onValueChange={setFilterLevel}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les niveaux</SelectItem>
                    <SelectItem value="beginner">Débutant</SelectItem>
                    <SelectItem value="intermediate">Intermédiaire</SelectItem>
                    <SelectItem value="advanced">Avancé</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="planned">Planifiée</SelectItem>
                    <SelectItem value="completed">Terminée</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Liste des formations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Formations FabLab ({filteredFormations.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Formation</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Niveau</TableHead>
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
                        <div className="text-xs text-gray-500 mt-1">
                          {formation.duration}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getLevelBadge(formation.level)}
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
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {formation.price.toLocaleString()} FCFA
                        </div>
                        {formation.certification && (
                          <div className="text-xs text-gray-500 mt-1">
                            <Award className="inline w-3 h-3 mr-1" />
                            Certifiant
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            asChild
                            variant="default"
                            size="sm"
                            className="bg-crec-gold hover:bg-crec-lightgold"
                          >
                            <Link to={`/admin/formations/fablab/${formation.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              Gérer
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
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
    </div>
  );
};

export default FabLabFormationsManagement;
