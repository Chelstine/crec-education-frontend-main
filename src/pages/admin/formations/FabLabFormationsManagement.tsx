import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
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
  Settings,
  Cpu,
  Lightbulb,
  TrendingUp,
  Zap,
  Wifi,
  UserCheck
} from 'lucide-react';

// Types pour le FabLab
interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  materials: string[];
  tools: string[];
  image?: string;
  instructions: string;
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  updatedAt: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  duration: string;
  price: number;
  includes: string[];
  requirements: string[];
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

interface Tariff {
  id: string;
  name: string;
  type: 'membership' | 'hourly' | 'project' | 'material';
  description: string;
  price: number;
  unit: string;
  duration?: string;
  benefits: string[];
  restrictions: string[];
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

const FabLabFormationsManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCreateServiceDialogOpen, setIsCreateServiceDialogOpen] = useState(false);
  const [isCreateTariffDialogOpen, setIsCreateTariffDialogOpen] = useState(false);

  // Mock data pour le FabLab
  const mockProjects: Project[] = [
    {
      id: '1',
      title: 'Système d\'arrosage automatique',
      description: 'Un système IoT pour l\'arrosage automatique des plantes',
      category: 'IoT',
      difficulty: 'intermediate',
      duration: '3-4 heures',
      materials: ['Arduino Uno', 'Capteur d\'humidité', 'Pompe à eau', 'Relais'],
      tools: ['Fer à souder', 'Breadboard', 'Multimètre'],
      instructions: 'Instructions détaillées pour créer un système d\'arrosage automatique...',
      status: 'active',
      createdAt: '2024-12-01',
      updatedAt: '2024-12-20'
    },
    {
      id: '2',
      title: 'Porte-clés personnalisé',
      description: 'Design et impression 3D d\'un porte-clés unique',
      category: 'Impression 3D',
      difficulty: 'beginner',
      duration: '1-2 heures',
      materials: ['Filament PLA', 'Support adhésif'],
      tools: ['Imprimante 3D', 'Logiciel CAO'],
      instructions: 'Guide complet pour créer un porte-clés personnalisé...',
      status: 'active',
      createdAt: '2024-11-15',
      updatedAt: '2024-12-18'
    }
  ];

  const mockServices: Service[] = [
    {
      id: '1',
      name: 'Formation Arduino',
      description: 'Formation complète sur l\'utilisation d\'Arduino',
      category: 'Formation',
      duration: '2 jours',
      price: 75000,
      includes: ['Cours théorique', 'Travaux pratiques', 'Kit Arduino', 'Certificat'],
      requirements: ['Connaissances de base en électronique'],
      status: 'active',
      createdAt: '2024-01-01',
      updatedAt: '2024-12-01'
    },
    {
      id: '2',
      name: 'Prototypage Rapide',
      description: 'Service de prototypage pour vos projets',
      category: 'Prototypage',
      duration: '1-5 jours',
      price: 100000,
      includes: ['Consultation', 'Design', 'Impression 3D', 'Tests'],
      requirements: ['Cahier des charges détaillé'],
      status: 'active',
      createdAt: '2024-02-01',
      updatedAt: '2024-12-10'
    }
  ];

  const mockTariffs: Tariff[] = [
    {
      id: '1',
      name: 'Abonnement Mensuel Étudiant',
      type: 'membership',
      description: 'Accès illimité aux équipements pour étudiants',
      price: 25000,
      unit: 'mois',
      duration: '1 mois',
      benefits: ['Accès 24h/24', 'Formation incluse', 'Support technique'],
      restrictions: ['Justificatif étudiant requis', 'Supervision obligatoire'],
      status: 'active',
      createdAt: '2024-01-01',
      updatedAt: '2024-12-01'
    },
    {
      id: '2',
      name: 'Utilisation Imprimante 3D',
      type: 'hourly',
      description: 'Tarif horaire pour l\'utilisation des imprimantes 3D',
      price: 2500,
      unit: 'heure',
      benefits: ['Assistance technique', 'Maintenance incluse'],
      restrictions: ['Filament non inclus', 'Réservation obligatoire'],
      status: 'active',
      createdAt: '2024-01-01',
      updatedAt: '2024-11-15'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setProjects(mockProjects);
      setServices(mockServices);
      setTariffs(mockTariffs);
      setSubscriberCount(147); // Nombre d'abonnés fictif
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filtrage
  const getFilteredData = (): (Project | Service | Tariff)[] => {
    const getData = (): (Project | Service | Tariff)[] => {
      switch (activeTab) {
        case 'projects': return projects.filter(Boolean);
        case 'services': return services.filter(Boolean);
        case 'tariffs': return tariffs.filter(Boolean);
        default: return [];
      }
    };

    let filtered = getData();
    if (searchTerm) {
      filtered = filtered.filter((item: any) =>
        item && (
          item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    return filtered.filter(Boolean);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Actif' },
      inactive: { color: 'bg-gray-100 text-gray-800', label: 'Inactif' },
      available: { color: 'bg-green-100 text-green-800', label: 'Disponible' },
      maintenance: { color: 'bg-yellow-100 text-yellow-800', label: 'Maintenance' },
      broken: { color: 'bg-red-100 text-red-800', label: 'En panne' },
      reserved: { color: 'bg-blue-100 text-blue-800', label: 'Réservé' },
      draft: { color: 'bg-gray-100 text-gray-800', label: 'Brouillon' }
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config?.color || 'bg-gray-100 text-gray-800'}>{config?.label || status}</Badge>;
  };

  const getDifficultyBadge = (difficulty: string) => {
    const difficultyConfig = {
      beginner: { color: 'bg-green-100 text-green-800', label: 'Débutant' },
      intermediate: { color: 'bg-yellow-100 text-yellow-800', label: 'Intermédiaire' },
      advanced: { color: 'bg-red-100 text-red-800', label: 'Avancé' }
    };
    const config = difficultyConfig[difficulty as keyof typeof difficultyConfig];
    return <Badge className={config?.color || 'bg-gray-100 text-gray-800'}>{config?.label || difficulty}</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const filteredData = getFilteredData();

  return (
    <div className="responsive-container">
      {/* En-tête avec compteur d'abonnés */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Wrench className="h-6 w-6 sm:h-8 sm:w-8 text-crec-gold" />
            Gestion FabLab
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Administration des équipements et services</p>
        </div>
        
        {/* Compteur d'abonnés */}
        <Card className="bg-gradient-to-br from-crec-gold to-crec-lightgold text-white w-full sm:w-auto">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Abonnés FabLab</CardTitle>
            <UserCheck className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{subscriberCount}</div>
            <p className="text-xs opacity-80">
              Membres actifs
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Statistiques générales */}
      <div className="responsive-stats-grid mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projets</CardTitle>
              <Lightbulb className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">{projects.length}</div>
              <p className="text-xs text-blue-600">
                Guides disponibles
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
              <CardTitle className="text-sm font-medium">Services</CardTitle>
              <Settings className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">{services.length}</div>
              <p className="text-xs text-purple-600">
                Services proposés
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
              <CardTitle className="text-sm font-medium">Tarifs</CardTitle>
              <DollarSign className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-700">{tariffs.length}</div>
              <p className="text-xs text-orange-600">
                Grilles tarifaires
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Barre de recherche */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Recherche</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Onglets CRUD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Projets
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Services
            </TabsTrigger>
            <TabsTrigger value="tariffs" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Tarifs
            </TabsTrigger>
          </TabsList>

          {/* Contenu des onglets Projets */}
          <TabsContent value="projects">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Projets ({projects.length})</CardTitle>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-crec-gold hover:bg-crec-lightgold">
                      <Plus className="mr-2 h-4 w-4" />
                      Nouveau Projet
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Créer un nouveau projet</DialogTitle>
                      <DialogDescription>
                        Ajoutez un nouveau guide de projet au FabLab
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                      {/* Informations de base */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Titre *</label>
                          <Input placeholder="Nom du projet" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Catégorie *</label>
                          <Select>
                            <SelectTrigger aria-label="Sélectionner une catégorie de projet">
                              <SelectValue placeholder="Sélectionner une catégorie" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="iot">IoT</SelectItem>
                              <SelectItem value="3d">Impression 3D</SelectItem>
                              <SelectItem value="laser">Découpe Laser</SelectItem>
                              <SelectItem value="electronics">Électronique</SelectItem>
                              <SelectItem value="programmation">Programmation</SelectItem>
                              <SelectItem value="robotique">Robotique</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Difficulté *</label>
                          <Select>
                            <SelectTrigger aria-label="Sélectionner le niveau de difficulté">
                              <SelectValue placeholder="Niveau de difficulté" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="beginner">Débutant</SelectItem>
                              <SelectItem value="intermediate">Intermédiaire</SelectItem>
                              <SelectItem value="advanced">Avancé</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Durée estimée *</label>
                          <Input placeholder="ex: 2-3 heures, 1 jour" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Description *</label>
                        <Textarea placeholder="Description détaillée du projet" className="min-h-[100px]" />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Instructions complètes</label>
                        <Textarea placeholder="Guide étape par étape pour réaliser le projet" className="min-h-[120px]" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Matériaux nécessaires</label>
                          <Textarea placeholder="Listez les matériaux séparés par des virgules" className="min-h-[80px]" />
                          <p className="text-xs text-gray-500">ex: Arduino Uno, LED, Résistances 220Ω</p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Outils requis</label>
                          <Textarea placeholder="Listez les outils séparés par des virgules" className="min-h-[80px]" />
                          <p className="text-xs text-gray-500">ex: Fer à souder, Multimètre, Tournevis</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Statut</label>
                        <Select>
                          <SelectTrigger aria-label="Sélectionner le statut">
                            <SelectValue placeholder="Statut du projet" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Actif</SelectItem>
                            <SelectItem value="draft">Brouillon</SelectItem>
                            <SelectItem value="inactive">Inactif</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
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
              </CardHeader>
              <CardContent>
                <div className="responsive-table-wrapper">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Projet</TableHead>
                        <TableHead className="hidden sm:table-cell">Catégorie</TableHead>
                        <TableHead className="hidden md:table-cell">Difficulté</TableHead>
                        <TableHead className="hidden lg:table-cell">Durée</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>                    <TableBody>
                      {(filteredData as Project[]).map((project) => (
                        <TableRow key={project.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium text-sm sm:text-base">{project.title}</div>
                              <div className="text-xs sm:text-sm text-gray-500">{project.description}</div>
                              <div className="flex flex-wrap gap-2 mt-2 sm:hidden">
                                <Badge variant="outline" className="text-xs">{project.category}</Badge>
                                {getDifficultyBadge(project.difficulty)}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge variant="outline">{project.category}</Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {getDifficultyBadge(project.difficulty)}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">{project.duration}</TableCell>
                          <TableCell>
                            {getStatusBadge(project.status)}
                          </TableCell>
                          <TableCell>
                            <div className="responsive-actions">
                              <Button variant="outline" size="sm" title="Voir les détails du projet" aria-label="Voir les détails">
                                <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                              <Button variant="outline" size="sm" title="Modifier le projet" aria-label="Modifier">
                                <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600" title="Supprimer le projet" aria-label="Supprimer">
                                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contenu des onglets Services */}
          <TabsContent value="services">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Services ({services.length})</CardTitle>
                <Dialog open={isCreateServiceDialogOpen} onOpenChange={setIsCreateServiceDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-crec-gold hover:bg-crec-lightgold">
                      <Plus className="mr-2 h-4 w-4" />
                      Nouveau Service
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Créer un nouveau service</DialogTitle>
                      <DialogDescription>
                        Ajoutez un nouveau service du FabLab
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Nom du service *</label>
                          <Input placeholder="ex: Formation Arduino" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Catégorie *</label>
                          <Select>
                            <SelectTrigger aria-label="Sélectionner une catégorie">
                              <SelectValue placeholder="Type de service" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="formation">Formation</SelectItem>
                              <SelectItem value="prototypage">Prototypage</SelectItem>
                              <SelectItem value="conseil">Conseil</SelectItem>
                              <SelectItem value="maintenance">Maintenance</SelectItem>
                              <SelectItem value="assistance">Assistance technique</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Description *</label>
                        <Textarea placeholder="Description détaillée du service" className="min-h-[80px]" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Durée *</label>
                          <Input placeholder="ex: 2 jours, 1-5 jours" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Prix (FCFA) *</label>
                          <Input type="number" placeholder="ex: 75000" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Inclus dans le service</label>
                        <Textarea placeholder="Listez les éléments inclus séparés par des virgules" className="min-h-[60px]" />
                        <p className="text-xs text-gray-500">ex: Cours théorique, Travaux pratiques, Kit Arduino, Certificat</p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Prérequis</label>
                        <Textarea placeholder="Prérequis nécessaires séparés par des virgules" className="min-h-[60px]" />
                        <p className="text-xs text-gray-500">ex: Connaissances de base en électronique</p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Statut</label>
                        <Select>
                          <SelectTrigger aria-label="Sélectionner le statut">
                            <SelectValue placeholder="Statut du service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Actif</SelectItem>
                            <SelectItem value="inactive">Inactif</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsCreateServiceDialogOpen(false)}>
                        Annuler
                      </Button>
                      <Button className="bg-crec-gold hover:bg-crec-lightgold">
                        Créer
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="responsive-table-wrapper">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead className="hidden sm:table-cell">Catégorie</TableHead>
                        <TableHead className="hidden md:table-cell">Durée</TableHead>
                        <TableHead className="hidden lg:table-cell">Prix</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(filteredData as Service[]).map((service) => (
                        <TableRow key={service.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium text-sm sm:text-base">{service.name}</div>
                              <div className="text-xs sm:text-sm text-gray-500">{service.description}</div>
                              <div className="flex flex-wrap gap-2 mt-2 sm:hidden">
                                <Badge variant="outline" className="text-xs">{service.category}</Badge>
                                <span className="text-xs text-gray-600">{service.duration}</span>
                                <span className="text-xs font-medium">{service.price ? service.price.toLocaleString() : '0'} FCFA</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge variant="outline">{service.category}</Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{service.duration}</TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {service.price ? service.price.toLocaleString() : '0'} FCFA
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(service.status)}
                          </TableCell>
                          <TableCell>
                            <div className="responsive-actions">
                              <Button variant="outline" size="sm" title="Voir les détails du service" aria-label="Voir les détails">
                                <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                              <Button variant="outline" size="sm" title="Modifier le service" aria-label="Modifier">
                                <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600" title="Supprimer le service" aria-label="Supprimer">
                                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contenu des onglets Tarifs */}
          <TabsContent value="tariffs">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Tarifs ({tariffs.length})</CardTitle>
                <Dialog open={isCreateTariffDialogOpen} onOpenChange={setIsCreateTariffDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-crec-gold hover:bg-crec-lightgold">
                      <Plus className="mr-2 h-4 w-4" />
                      Nouveau Tarif
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Créer un nouveau tarif</DialogTitle>
                      <DialogDescription>
                        Ajoutez une nouvelle grille tarifaire
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Nom du tarif *</label>
                          <Input placeholder="ex: Abonnement Mensuel Étudiant" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Type *</label>
                          <Select>
                            <SelectTrigger aria-label="Sélectionner le type de tarif">
                              <SelectValue placeholder="Type de tarif" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="membership">Abonnement</SelectItem>
                              <SelectItem value="hourly">Tarif horaire</SelectItem>
                              <SelectItem value="project">Tarif projet</SelectItem>
                              <SelectItem value="material">Matériau</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Description *</label>
                        <Textarea placeholder="Description détaillée du tarif" className="min-h-[80px]" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Prix (FCFA) *</label>
                          <Input type="number" placeholder="ex: 25000" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Unité *</label>
                          <Input placeholder="ex: mois, heure, projet" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Durée</label>
                          <Input placeholder="ex: 1 mois" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Avantages inclus</label>
                        <Textarea placeholder="Listez les avantages séparés par des virgules" className="min-h-[60px]" />
                        <p className="text-xs text-gray-500">ex: Accès 24h/24, Formation incluse, Support technique</p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Restrictions</label>
                        <Textarea placeholder="Listez les restrictions séparées par des virgules" className="min-h-[60px]" />
                        <p className="text-xs text-gray-500">ex: Justificatif étudiant requis, Supervision obligatoire</p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Statut</label>
                        <Select>
                          <SelectTrigger aria-label="Sélectionner le statut">
                            <SelectValue placeholder="Statut du tarif" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Actif</SelectItem>
                            <SelectItem value="inactive">Inactif</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsCreateTariffDialogOpen(false)}>
                        Annuler
                      </Button>
                      <Button className="bg-crec-gold hover:bg-crec-lightgold">
                        Créer
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="responsive-table-wrapper">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tarif</TableHead>
                        <TableHead className="hidden sm:table-cell">Type</TableHead>
                        <TableHead className="hidden md:table-cell">Prix</TableHead>
                        <TableHead className="hidden lg:table-cell">Unité</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(filteredData as Tariff[]).map((tariff) => (
                        <TableRow key={tariff.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium text-sm sm:text-base">{tariff.name}</div>
                              <div className="text-xs sm:text-sm text-gray-500">{tariff.description}</div>
                              <div className="flex flex-wrap gap-2 mt-2 sm:hidden">
                                <Badge variant="outline" className="text-xs">{tariff.type}</Badge>
                                <span className="text-xs font-medium">{tariff.price ? tariff.price.toLocaleString() : '0'} FCFA</span>
                                <span className="text-xs text-gray-600">/{tariff.unit}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge variant="outline">{tariff.type}</Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {tariff.price ? tariff.price.toLocaleString() : '0'} FCFA
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">{tariff.unit}</TableCell>
                          <TableCell>
                            {getStatusBadge(tariff.status)}
                          </TableCell>
                          <TableCell>
                            <div className="responsive-actions">
                              <Button variant="outline" size="sm" title="Voir les détails du tarif" aria-label="Voir les détails">
                                <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                              <Button variant="outline" size="sm" title="Modifier le tarif" aria-label="Modifier">
                                <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600" title="Supprimer le tarif" aria-label="Supprimer">
                                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default FabLabFormationsManagement;
