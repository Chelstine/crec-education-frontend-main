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
  BookOpen,
  Users,
  Calendar,
  DollarSign,
  Star,
  MapPin,
  Clock,
  Award,
  TrendingUp,
  Target
} from 'lucide-react';

// Types pour les formations ouvertes
interface FormationOuverte {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'professional' | 'short' | 'certification';
  duration: string;
  price: number;
  capacity: number;
  enrolled: number;
  startDate: string;
  endDate: string;
  location: string;
  instructor: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  language: 'french' | 'english' | 'bilingual';
  prerequisites?: string;
  objectives: string[];
  modules: string[];
  certification?: string;
  status: 'active' | 'inactive' | 'completed' | 'planned';
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
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Mock data pour les formations ouvertes
  const mockFormations: FormationOuverte[] = [
    {
      id: '1',
      title: 'Développement Web Full Stack',
      description: 'Formation complète en développement web moderne avec React, Node.js et MongoDB',
      category: 'Informatique',
      type: 'professional',
      duration: '6 mois',
      price: 850000,
      capacity: 25,
      enrolled: 18,
      startDate: '2025-02-15',
      endDate: '2025-08-15',
      location: 'CREC Campus - Salle Informatique A1',
      instructor: 'Dr. Kokou ADJANON',
      level: 'intermediate',
      language: 'french',
      prerequisites: 'Connaissances de base en programmation',
      objectives: [
        'Maîtriser React.js et ses concepts avancés',
        'Développer des API REST avec Node.js',
        'Gérer des bases de données avec MongoDB',
        'Déployer des applications web complètes'
      ],
      modules: [
        'HTML5, CSS3 et JavaScript ES6+',
        'React.js - Composants et Hooks',
        'Node.js et Express.js',
        'Bases de données MongoDB',
        'Authentification et sécurité',
        'Déploiement et DevOps'
      ],
      certification: 'Certificat CREC en Développement Web',
      status: 'active',
      featured: true,
      createdAt: '2024-12-01',
      updatedAt: '2024-12-20'
    },
    {
      id: '2',
      title: 'Data Science et Intelligence Artificielle',
      description: 'Apprenez l\'analyse de données et le machine learning avec Python et TensorFlow',
      category: 'Data Science',
      type: 'professional',
      duration: '8 mois',
      price: 1200000,
      capacity: 20,
      enrolled: 15,
      startDate: '2025-03-01',
      endDate: '2025-10-30',
      location: 'CREC Campus - Laboratoire Data',
      instructor: 'Dr. Marie ABLODÉ',
      level: 'advanced',
      language: 'bilingual',
      prerequisites: 'Connaissances en mathématiques et programmation Python',
      objectives: [
        'Maîtriser les techniques de data science',
        'Implémenter des modèles de machine learning',
        'Analyser des données complexes',
        'Créer des solutions IA pratiques'
      ],
      modules: [
        'Python pour la Data Science',
        'Statistiques et Probabilités',
        'Machine Learning Supervisé',
        'Machine Learning Non-Supervisé',
        'Deep Learning avec TensorFlow',
        'Traitement du Langage Naturel',
        'Computer Vision',
        'Projet Final'
      ],
      certification: 'Certificat CREC en Data Science & IA',
      status: 'planned',
      featured: true,
      createdAt: '2024-11-15',
      updatedAt: '2024-12-18'
    },
    {
      id: '3',
      title: 'Marketing Digital et E-commerce',
      description: 'Formation pratique en marketing digital et gestion de boutiques en ligne',
      category: 'Marketing',
      type: 'short',
      duration: '3 mois',
      price: 450000,
      capacity: 30,
      enrolled: 22,
      startDate: '2025-01-20',
      endDate: '2025-04-20',
      location: 'CREC Campus - Salle Multimédia',
      instructor: 'M. Jean-Claude TOGNON',
      level: 'beginner',
      language: 'french',
      prerequisites: 'Aucun prérequis technique',
      objectives: [
        'Comprendre le marketing digital',
        'Créer des campagnes publicitaires',
        'Gérer une boutique e-commerce',
        'Analyser les performances marketing'
      ],
      modules: [
        'Introduction au Marketing Digital',
        'Réseaux Sociaux et Community Management',
        'Google Ads et Facebook Ads',
        'SEO et Référencement',
        'E-commerce avec Shopify/WooCommerce',
        'Analytics et Mesure de Performance'
      ],
      certification: 'Certificat CREC en Marketing Digital',
      status: 'active',
      featured: false,
      createdAt: '2024-10-01',
      updatedAt: '2024-12-15'
    },
    {
      id: '4',
      title: 'Gestion de Projet Agile',
      description: 'Maîtrisez les méthodologies agiles pour gérer efficacement vos projets',
      category: 'Management',
      type: 'certification',
      duration: '2 mois',
      price: 300000,
      capacity: 25,
      enrolled: 8,
      startDate: '2025-02-01',
      endDate: '2025-03-30',
      location: 'CREC Campus - Salle de Formation B2',
      instructor: 'Mme. Akossiwa KOFFI, PMP',
      level: 'intermediate',
      language: 'french',
      prerequisites: 'Expérience professionnelle en gestion de projet',
      objectives: [
        'Maîtriser les principes Agile et Scrum',
        'Gérer des équipes agiles',
        'Utiliser les outils de gestion agile',
        'Préparer la certification Scrum Master'
      ],
      modules: [
        'Introduction à l\'Agilité',
        'Framework Scrum',
        'Planification Agile',
        'Outils Agiles (Jira, Trello)',
        'Leadership d\'équipe agile',
        'Préparation certification'
      ],
      certification: 'Certificat CREC Scrum Master',
      status: 'planned',
      featured: false,
      createdAt: '2024-12-05',
      updatedAt: '2024-12-20'
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
      professional: { color: 'bg-blue-100 text-blue-800', label: 'Professionnelle' },
      short: { color: 'bg-green-100 text-green-800', label: 'Formation Courte' },
      certification: { color: 'bg-purple-100 text-purple-800', label: 'Certification' }
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
            <BookOpen className="h-8 w-8 text-crec-gold" />
            Formations Ouvertes
          </h1>
          <p className="text-gray-600 mt-1">Formations professionnelles et certifications</p>
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
              <DialogTitle>Créer une nouvelle formation ouverte</DialogTitle>
              <DialogDescription>
                Ajoutez une nouvelle formation professionnelle ou certification
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
              <BookOpen className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">{formations.length}</div>
              <p className="text-xs text-blue-600">
                Programmes disponibles
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
              <CardTitle className="text-sm font-medium">Taux de Remplissage</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-700">
                {Math.round((formations.reduce((total, f) => total + f.enrolled, 0) / formations.reduce((total, f) => total + f.capacity, 0)) * 100)}%
              </div>
              <p className="text-xs text-orange-600">
                Moyenne des inscriptions
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
              <span>Formations Ouvertes ({filteredFormations.length})</span>
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
                            <Link to={`/admin/formations/ouvertes/${formation.id}`}>
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

export default FormationsOuvertesManagement;
