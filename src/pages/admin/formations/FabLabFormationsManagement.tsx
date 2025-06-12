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
  Monitor,
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

interface Machine {
  id: string;
  name: string;
  type: string;
  brand: string;
  model: string;
  description: string;
  specifications: string[];
  location: string;
  status: 'available' | 'maintenance' | 'broken' | 'reserved';
  lastMaintenance: string;
  nextMaintenance: string;
  price: number;
  image?: string;
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
  const [machines, setMachines] = useState<Machine[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

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

  const mockMachines: Machine[] = [
    {
      id: '1',
      name: 'Imprimante 3D Ender 3 Pro',
      type: 'Impression 3D',
      brand: 'Creality',
      model: 'Ender 3 Pro',
      description: 'Imprimante 3D FDM populaire et fiable',
      specifications: ['Volume: 220x220x250mm', 'Résolution: 0.1mm', 'Filament: PLA, ABS, PETG'],
      location: 'Zone Impression 3D',
      status: 'available',
      lastMaintenance: '2024-12-01',
      nextMaintenance: '2025-01-01',
      price: 25000,
      createdAt: '2024-01-01',
      updatedAt: '2024-12-20'
    },
    {
      id: '2',
      name: 'Découpeuse Laser CO2',
      type: 'Découpe Laser',
      brand: 'LaserCut',
      model: 'LC-1290',
      description: 'Découpeuse laser CO2 pour matériaux divers',
      specifications: ['Surface: 1200x900mm', 'Puissance: 80W', 'Matériaux: Bois, Acrylique, Cuir'],
      location: 'Zone Découpe',
      status: 'maintenance',
      lastMaintenance: '2024-12-15',
      nextMaintenance: '2024-12-25',
      price: 50000,
      createdAt: '2024-02-01',
      updatedAt: '2024-12-15'
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
      setMachines(mockMachines);
      setServices(mockServices);
      setTariffs(mockTariffs);
      setSubscriberCount(147); // Nombre d'abonnés fictif
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filtrage
  const getFilteredData = (): (Project | Machine | Service | Tariff)[] => {
    const getData = (): (Project | Machine | Service | Tariff)[] => {
      switch (activeTab) {
        case 'projects': return projects.filter(Boolean);
        case 'machines': return machines.filter(Boolean);
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
    <div className="container mx-auto px-4 py-8">
      {/* En-tête avec compteur d'abonnés */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Wrench className="h-8 w-8 text-crec-gold" />
            Gestion FabLab
          </h1>
          <p className="text-gray-600 mt-1">Administration des équipements et services</p>
        </div>
        
        {/* Compteur d'abonnés */}
        <Card className="bg-gradient-to-br from-crec-gold to-crec-lightgold text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Abonnés FabLab</CardTitle>
            <UserCheck className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscriberCount}</div>
            <p className="text-xs opacity-80">
              Membres actifs
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Statistiques générales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Machines</CardTitle>
              <Monitor className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">{machines.length}</div>
              <p className="text-xs text-green-600">
                Équipements disponibles
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Projets
            </TabsTrigger>
            <TabsTrigger value="machines" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              Machines
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
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Créer un nouveau projet</DialogTitle>
                      <DialogDescription>
                        Ajoutez un nouveau guide de projet au FabLab
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right">Titre</label>
                        <Input className="col-span-3" placeholder="Nom du projet" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right">Catégorie</label>
                        <Select>
                          <SelectTrigger className="col-span-3" aria-label="Sélectionner une catégorie de projet">
                            <SelectValue placeholder="Sélectionner une catégorie" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="iot">IoT</SelectItem>
                            <SelectItem value="3d">Impression 3D</SelectItem>
                            <SelectItem value="laser">Découpe Laser</SelectItem>
                            <SelectItem value="electronics">Électronique</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right">Description</label>
                        <Textarea className="col-span-3" placeholder="Description du projet" />
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
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Projet</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Difficulté</TableHead>
                      <TableHead>Durée</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((project: Project) => (
                      <TableRow key={project.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{project.title}</div>
                            <div className="text-sm text-gray-500">{project.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{project.category}</Badge>
                        </TableCell>
                        <TableCell>
                          {getDifficultyBadge(project.difficulty)}
                        </TableCell>
                        <TableCell>{project.duration}</TableCell>
                        <TableCell>
                          {getStatusBadge(project.status)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" title="Voir les détails du projet" aria-label="Voir les détails">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" title="Modifier le projet" aria-label="Modifier">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600" title="Supprimer le projet" aria-label="Supprimer">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contenu des onglets Machines */}
          <TabsContent value="machines">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Machines ({machines.length})</CardTitle>
                <Button className="bg-crec-gold hover:bg-crec-lightgold">
                  <Plus className="mr-2 h-4 w-4" />
                  Nouvelle Machine
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Machine</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Localisation</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Prix/h</TableHead>
                      <TableHead>Maintenance</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((machine: Machine) => (
                      <TableRow key={machine.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{machine.name}</div>
                            <div className="text-sm text-gray-500">{machine.brand} {machine.model}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{machine.type}</Badge>
                        </TableCell>
                        <TableCell>{machine.location}</TableCell>
                        <TableCell>
                          {getStatusBadge(machine.status)}
                        </TableCell>
                        <TableCell>
                          {machine.price ? machine.price.toLocaleString() : '0'} FCFA
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>Dernier: {machine.lastMaintenance ? new Date(machine.lastMaintenance).toLocaleDateString('fr-FR') : 'N/A'}</div>
                            <div className="text-gray-500">Prochain: {machine.nextMaintenance ? new Date(machine.nextMaintenance).toLocaleDateString('fr-FR') : 'N/A'}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" title="Voir les détails de la machine" aria-label="Voir les détails">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" title="Modifier la machine" aria-label="Modifier">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600" title="Supprimer la machine" aria-label="Supprimer">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contenu des onglets Services */}
          <TabsContent value="services">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Services ({services.length})</CardTitle>
                <Button className="bg-crec-gold hover:bg-crec-lightgold">
                  <Plus className="mr-2 h-4 w-4" />
                  Nouveau Service
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Durée</TableHead>
                      <TableHead>Prix</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((service: Service) => (
                      <TableRow key={service.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{service.name}</div>
                            <div className="text-sm text-gray-500">{service.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{service.category}</Badge>
                        </TableCell>
                        <TableCell>{service.duration}</TableCell>
                        <TableCell>
                          {service.price ? service.price.toLocaleString() : '0'} FCFA
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(service.status)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" title="Voir les détails du service" aria-label="Voir les détails">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" title="Modifier le service" aria-label="Modifier">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600" title="Supprimer le service" aria-label="Supprimer">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contenu des onglets Tarifs */}
          <TabsContent value="tariffs">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Tarifs ({tariffs.length})</CardTitle>
                <Button className="bg-crec-gold hover:bg-crec-lightgold">
                  <Plus className="mr-2 h-4 w-4" />
                  Nouveau Tarif
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tarif</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Prix</TableHead>
                      <TableHead>Unité</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((tariff: Tariff) => (
                      <TableRow key={tariff.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{tariff.name}</div>
                            <div className="text-sm text-gray-500">{tariff.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{tariff.type}</Badge>
                        </TableCell>
                        <TableCell>
                          {tariff.price ? tariff.price.toLocaleString() : '0'} FCFA
                        </TableCell>
                        <TableCell>{tariff.unit}</TableCell>
                        <TableCell>
                          {getStatusBadge(tariff.status)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" title="Voir les détails du tarif" aria-label="Voir les détails">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" title="Modifier le tarif" aria-label="Modifier">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600" title="Supprimer le tarif" aria-label="Supprimer">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default FabLabFormationsManagement;
