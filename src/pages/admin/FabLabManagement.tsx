import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Wrench,
  Cpu,
  Lightbulb,
  DollarSign,
  Users,
  Calendar,
  Settings,
  Star,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

// Types pour le FabLab
interface Machine {
  id: string;
  name: string;
  type: 'printer3d' | 'laser' | 'cnc' | 'electronics' | 'tools';
  brand: string;
  model: string;
  description: string;
  specifications: string;
  status: 'available' | 'maintenance' | 'reserved' | 'broken';
  hourlyRate: number;
  imageUrl?: string;
  materials: string[];
  maxDimensions: string;
  precision: string;
  createdAt: string;
  updatedAt: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  category: 'electronics' | 'mechanical' | 'software' | 'mixed';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  materials: string[];
  tools: string[];
  steps: string[];
  imageUrl?: string;
  author: string;
  featured: boolean;
  status: 'active' | 'completed' | 'archived';
  likes: number;
  views: number;
  createdAt: string;
  updatedAt: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  category: 'consultation' | 'training' | 'production' | 'maintenance';
  price: number;
  duration: string;
  includes: string[];
  requirements: string[];
  available: boolean;
  maxParticipants?: number;
  createdAt: string;
  updatedAt: string;
}

interface Pricing {
  id: string;
  name: string;
  type: 'membership' | 'hourly' | 'project' | 'material';
  price: number;
  duration?: string;
  description: string;
  includes: string[];
  restrictions?: string[];
  popular: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

const FabLabManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('machines');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // États pour chaque section
  const [machines, setMachines] = useState<Machine[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [pricings, setPricings] = useState<Pricing[]>([]);

  // Dialogues
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Données mock
  const mockMachines: Machine[] = [
    {
      id: '1',
      name: 'Imprimante 3D Ender 5 S1',
      type: 'printer3d',
      brand: 'Creality',
      model: 'Ender 5 S1',
      description: 'Imprimante 3D FDM haute précision avec lit chauffant automatique',
      specifications: 'Volume: 220×220×300mm, Précision: ±0.1mm, Filaments: PLA, ABS, PETG',
      status: 'available',
      hourlyRate: 2500,
      materials: ['PLA', 'ABS', 'PETG', 'TPU'],
      maxDimensions: '220×220×300mm',
      precision: '±0.1mm',
      imageUrl: '/img/machines/creality-ender5-s1.jpg',
      createdAt: '2024-01-15',
      updatedAt: '2024-12-01'
    },
    {
      id: '2',
      name: 'Découpeuse Laser F50',
      type: 'laser',
      brand: 'Latilool',
      model: 'F50',
      description: 'Découpeuse et graveuse laser CO2 pour matériaux variés',
      specifications: 'Puissance: 50W, Surface: 500×300mm, Matériaux: Bois, Acrylique, Cuir',
      status: 'available',
      hourlyRate: 5000,
      materials: ['Bois', 'Acrylique', 'Cuir', 'Carton', 'Textile'],
      maxDimensions: '500×300×20mm',
      precision: '±0.05mm',
      imageUrl: '/img/machines/latilool-f50.jpg',
      createdAt: '2024-02-01',
      updatedAt: '2024-12-01'
    }
  ];

  const mockProjects: Project[] = [
    {
      id: '1',
      title: 'Système d\'arrosage automatique Arduino',
      description: 'Créez un système intelligent pour arroser vos plantes automatiquement',
      category: 'electronics',
      difficulty: 'intermediate',
      duration: '2-3 heures',
      materials: ['Arduino Uno', 'Capteur d\'humidité', 'Pompe à eau', 'Relais', 'Tuyaux'],
      tools: ['Imprimante 3D', 'Fer à souder', 'Multimètre'],
      steps: [
        'Assembler le circuit électronique',
        'Programmer l\'Arduino',
        'Imprimer le boîtier en 3D',
        'Installer le système d\'arrosage',
        'Calibrer les capteurs'
      ],
      imageUrl: '/img/projects/arduino-watering.jpg',
      author: 'Ing. Pierre KODJO',
      featured: true,
      status: 'active',
      likes: 45,
      views: 320,
      createdAt: '2024-01-20',
      updatedAt: '2024-12-01'
    },
    {
      id: '2',
      title: 'Robot éducatif programmable',
      description: 'Construisez un robot mobile pour apprendre la programmation',
      category: 'mixed',
      difficulty: 'advanced',
      duration: '1-2 jours',
      materials: ['Arduino Mega', 'Moteurs pas-à-pas', 'Capteurs ultrason', 'Châssis imprimé'],
      tools: ['Imprimante 3D', 'Découpeuse laser', 'Kit électronique'],
      steps: [
        'Découper le châssis',
        'Imprimer les pièces mobiles',
        'Assembler la mécanique',
        'Câbler l\'électronique',
        'Programmer les mouvements'
      ],
      imageUrl: '/img/projects/educational-robot.jpg',
      author: 'Dr. Amina SAGBO',
      featured: true,
      status: 'active',
      likes: 62,
      views: 480,
      createdAt: '2024-02-15',
      updatedAt: '2024-12-01'
    }
  ];

  const mockServices: Service[] = [
    {
      id: '1',
      name: 'Formation Impression 3D',
      description: 'Apprenez les bases de l\'impression 3D et la conception pour la fabrication additive',
      category: 'training',
      price: 25000,
      duration: '4 heures',
      includes: [
        'Introduction aux technologies 3D',
        'Utilisation des logiciels de CAO',
        'Préparation et lancement d\'impression',
        'Post-traitement des pièces'
      ],
      requirements: ['Ordinateur portable', 'Motivation d\'apprendre'],
      available: true,
      maxParticipants: 8,
      createdAt: '2024-01-01',
      updatedAt: '2024-12-01'
    },
    {
      id: '2',
      name: 'Consultation Projet',
      description: 'Conseil personnalisé pour votre projet de fabrication numérique',
      category: 'consultation',
      price: 15000,
      duration: '1 heure',
      includes: [
        'Analyse de faisabilité',
        'Choix des technologies',
        'Estimation des coûts',
        'Planning de réalisation'
      ],
      requirements: ['Description détaillée du projet'],
      available: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-12-01'
    }
  ];

  const mockPricings: Pricing[] = [
    {
      id: '1',
      name: 'Abonnement Étudiant',
      type: 'membership',
      price: 15000,
      duration: '1 mois',
      description: 'Accès complet au FabLab pour les étudiants',
      includes: [
        'Accès illimité aux machines',
        'Formations de base incluses',
        'Stockage de projets',
        'Support technique'
      ],
      restrictions: ['Carte étudiante requise', 'Horaires d\'ouverture uniquement'],
      popular: true,
      active: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-12-01'
    },
    {
      id: '2',
      name: 'Impression 3D - PLA',
      type: 'material',
      price: 500,
      description: 'Prix par gramme de filament PLA',
      includes: ['Filament PLA de qualité', 'Post-traitement de base'],
      popular: false,
      active: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-12-01'
    }
  ];

  useEffect(() => {
    // Simulation du chargement des données
    const timer = setTimeout(() => {
      setMachines(mockMachines);
      setProjects(mockProjects);
      setServices(mockServices);
      setPricings(mockPricings);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getStatusBadge = (status: string, type: 'machine' | 'project' | 'service' | 'pricing') => {
    if (type === 'machine') {
      const statusConfig = {
        available: { color: 'bg-green-100 text-green-800', label: 'Disponible' },
        maintenance: { color: 'bg-yellow-100 text-yellow-800', label: 'Maintenance' },
        reserved: { color: 'bg-blue-100 text-blue-800', label: 'Réservé' },
        broken: { color: 'bg-red-100 text-red-800', label: 'En panne' }
      };
      const config = statusConfig[status as keyof typeof statusConfig];
      return <Badge className={config.color}>{config.label}</Badge>;
    }
    
    if (type === 'project') {
      const statusConfig = {
        active: { color: 'bg-green-100 text-green-800', label: 'Actif' },
        completed: { color: 'bg-blue-100 text-blue-800', label: 'Terminé' },
        archived: { color: 'bg-gray-100 text-gray-800', label: 'Archivé' }
      };
      const config = statusConfig[status as keyof typeof statusConfig];
      return <Badge className={config.color}>{config.label}</Badge>;
    }

    return null;
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      printer3d: Cpu,
      laser: Lightbulb,
      cnc: Settings,
      electronics: Wrench,
      tools: Wrench
    };
    return icons[type as keyof typeof icons] || Wrench;
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
            <Wrench className="w-8 h-8 text-crec-gold" />
            Gestion du FabLab
          </h1>
          <p className="text-gray-600 mt-1">
            Gérez les machines, projets, services et tarifs du FabLab
          </p>
        </div>
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
              <CardTitle className="text-sm font-medium">Machines</CardTitle>
              <Cpu className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{machines.length}</div>
              <p className="text-xs text-muted-foreground">
                {machines.filter(m => m.status === 'available').length} disponibles
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
              <CardTitle className="text-sm font-medium">Projets</CardTitle>
              <Lightbulb className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{projects.length}</div>
              <p className="text-xs text-muted-foreground">
                {projects.filter(p => p.featured).length} en vedette
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
              <CardTitle className="text-sm font-medium">Services</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{services.length}</div>
              <p className="text-xs text-muted-foreground">
                {services.filter(s => s.available).length} disponibles
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
              <CardTitle className="text-sm font-medium">Tarifs</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{pricings.length}</div>
              <p className="text-xs text-muted-foreground">
                {pricings.filter(p => p.active).length} actifs
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Onglets de gestion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="machines">Machines</TabsTrigger>
            <TabsTrigger value="projects">Projets</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="pricing">Tarifs</TabsTrigger>
          </TabsList>

          {/* Machines */}
          <TabsContent value="machines">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Machines du FabLab</CardTitle>
                  <Button className="bg-crec-gold hover:bg-crec-lightgold">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvelle Machine
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Machine</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Tarif/h</TableHead>
                        <TableHead>Matériaux</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {machines.map((machine) => {
                        const IconComponent = getTypeIcon(machine.type);
                        return (
                          <TableRow key={machine.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                {machine.imageUrl && (
                                  <img
                                    src={machine.imageUrl}
                                    alt={machine.name}
                                    className="w-12 h-12 rounded-lg object-cover"
                                  />
                                )}
                                <div>
                                  <div className="font-medium">{machine.name}</div>
                                  <div className="text-sm text-gray-500">
                                    {machine.brand} {machine.model}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <IconComponent className="w-4 h-4 text-crec-gold" />
                                <span className="capitalize">{machine.type}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(machine.status, 'machine')}
                            </TableCell>
                            <TableCell>
                              <span className="font-medium">
                                {machine.hourlyRate.toLocaleString()} FCFA
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {machine.materials.slice(0, 2).map((material) => (
                                  <Badge key={material} variant="outline" className="text-xs">
                                    {material}
                                  </Badge>
                                ))}
                                {machine.materials.length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{machine.materials.length - 2}
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  title="Modifier la machine"
                                  aria-label="Modifier cette machine"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 hover:text-red-700"
                                  title="Supprimer la machine"
                                  aria-label="Supprimer cette machine"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projets */}
          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Projets du FabLab</CardTitle>
                  <Button className="bg-crec-gold hover:bg-crec-lightgold">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau Projet
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <Card key={project.id} className="overflow-hidden">
                      {project.imageUrl && (
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-lg">{project.title}</h3>
                          {project.featured && (
                            <Star className="w-5 h-5 text-yellow-500 fill-current" />
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex items-center gap-2 mb-3">
                          {getStatusBadge(project.status, 'project')}
                          <Badge variant="outline" className="text-xs">
                            {project.difficulty}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                          <span>👁 {project.views}</span>
                          <span>❤️ {project.likes}</span>
                          <span>⏱ {project.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            title="Modifier le projet"
                            aria-label="Modifier ce projet"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Modifier
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            title="Supprimer le projet"
                            aria-label="Supprimer ce projet"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services */}
          <TabsContent value="services">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Services du FabLab</CardTitle>
                  <Button className="bg-crec-gold hover:bg-crec-lightgold">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau Service
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service) => (
                    <Card key={service.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">{service.name}</h3>
                              <Badge className={service.available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                {service.available ? 'Disponible' : 'Indisponible'}
                              </Badge>
                              <Badge variant="outline">
                                {service.category}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-3">{service.description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="font-medium">Prix:</span> {service.price.toLocaleString()} FCFA
                              </div>
                              <div>
                                <span className="font-medium">Durée:</span> {service.duration}
                              </div>
                              {service.maxParticipants && (
                                <div>
                                  <span className="font-medium">Max participants:</span> {service.maxParticipants}
                                </div>
                              )}
                            </div>
                            <div className="mt-3">
                              <span className="font-medium text-sm">Inclut:</span>
                              <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                                {service.includes.map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <Button variant="outline" size="sm">
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
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tarifs */}
          <TabsContent value="pricing">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Tarifs du FabLab</CardTitle>
                  <Button className="bg-crec-gold hover:bg-crec-lightgold">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau Tarif
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pricings.map((pricing) => (
                    <Card key={pricing.id} className={`relative ${pricing.popular ? 'ring-2 ring-crec-gold' : ''}`}>
                      {pricing.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-crec-gold text-white">Populaire</Badge>
                        </div>
                      )}
                      <CardContent className="p-6">
                        <div className="text-center mb-4">
                          <h3 className="text-lg font-semibold">{pricing.name}</h3>
                          <div className="text-3xl font-bold text-crec-gold mt-2">
                            {pricing.price.toLocaleString()}
                            <span className="text-sm text-gray-500 ml-1">FCFA</span>
                          </div>
                          {pricing.duration && (
                            <p className="text-sm text-gray-500">/ {pricing.duration}</p>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{pricing.description}</p>
                        <div className="space-y-2 mb-4">
                          {pricing.includes.map((item, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                        {pricing.restrictions && (
                          <div className="space-y-2 mb-4">
                            {pricing.restrictions.map((restriction, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm text-gray-500">
                                <XCircle className="w-4 h-4 text-gray-400" />
                                <span>{restriction}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="h-4 w-4 mr-1" />
                            Modifier
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default FabLabManagement;
