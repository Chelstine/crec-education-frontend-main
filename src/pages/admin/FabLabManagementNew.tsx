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
  Clock,
  Upload,
  Video,
  Image as ImageIcon,
  Play,
  Download,
  FileText
} from 'lucide-react';

// Types améliorés pour le FabLab
interface Project {
  id: string;
  title: string;
  description: string;
  category: 'electronics' | 'mechanical' | 'software' | 'mixed' | 'iot' | '3d' | 'automation';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  materials: string[];
  tools: string[];
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  instructions: string;
  author: string;
  featured: boolean;
  status: 'active' | 'inactive' | 'draft';
  likes: number;
  views: number;
  technologies: string[];
  cost?: number;
  createdAt: string;
  updatedAt: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  category: 'formation' | 'consultation' | 'production' | 'maintenance';
  price: number;
  duration: string;
  includes: string[];
  requirements: string[];
  available: boolean;
  maxParticipants?: number;
  type: 'formation' | 'service';
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
  unit?: string;
  createdAt: string;
  updatedAt: string;
}

const FabLabManagementNew: React.FC = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // États pour chaque section
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [pricings, setPricings] = useState<Pricing[]>([]);

  // Dialogues
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isCreateServiceOpen, setIsCreateServiceOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Formulaire de projet
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    category: 'electronics' as Project['category'],
    difficulty: 'beginner' as Project['difficulty'],
    duration: '',
    materials: [] as string[],
    tools: [] as string[],
    technologies: [] as string[],
    instructions: '',
    cost: 0,
    mediaFile: null as File | null,
    mediaType: 'image' as 'image' | 'video'
  });

  // Données mock étendues
  const mockProjects: Project[] = [
    {
      id: '1',
      title: 'Système d\'arrosage automatique Arduino',
      description: 'Créez un système intelligent pour arroser vos plantes automatiquement avec des capteurs d\'humidité et une pompe contrôlée par Arduino.',
      category: 'iot',
      difficulty: 'intermediate',
      duration: '2-3 heures',
      materials: ['Arduino Uno', 'Capteur d\'humidité', 'Pompe à eau', 'Relais', 'Tuyaux'],
      tools: ['Imprimante 3D', 'Fer à souder', 'Multimètre'],
      technologies: ['Arduino', 'C++', 'Capteurs', 'Impression 3D'],
      mediaUrl: '/img/projects/arduino-watering.jpg',
      mediaType: 'image',
      instructions: 'Guide complet étape par étape pour créer votre système d\'arrosage automatique...',
      author: 'Ing. Pierre KODJO',
      featured: true,
      status: 'active',
      likes: 45,
      views: 320,
      cost: 15000,
      createdAt: '2024-01-20',
      updatedAt: '2024-12-01'
    },
    {
      id: '2',
      title: 'Robot éducatif programmable',
      description: 'Construisez un robot mobile programmable pour l\'apprentissage de la robotique avec détection d\'obstacles et contrôle à distance.',
      category: 'electronics',
      difficulty: 'advanced',
      duration: '1-2 jours',
      materials: ['Arduino Mega', 'Moteurs pas-à-pas', 'Capteurs ultrason', 'Châssis imprimé'],
      tools: ['Imprimante 3D', 'Découpeuse laser', 'Kit électronique'],
      technologies: ['Arduino', 'Robotique', 'Bluetooth', 'Programmation'],
      mediaUrl: '/videos/robot-demo.mp4',
      mediaType: 'video',
      instructions: 'Tutoriel complet pour assembler et programmer votre robot éducatif...',
      author: 'Dr. Amina SAGBO',
      featured: true,
      status: 'active',
      likes: 62,
      views: 480,
      cost: 25000,
      createdAt: '2024-02-15',
      updatedAt: '2024-12-01'
    },
    {
      id: '3',
      title: 'Station météo IoT ESP32',
      description: 'Station météorologique connectée mesurant température, humidité et pression avec affichage web en temps réel.',
      category: 'iot',
      difficulty: 'intermediate',
      duration: '4-5 heures',
      materials: ['ESP32', 'DHT22', 'BMP280', 'OLED Display', 'Boîtier imprimé'],
      tools: ['Imprimante 3D', 'Fer à souder', 'Ordinateur'],
      technologies: ['ESP32', 'WiFi', 'Capteurs', 'Web Server', 'Arduino IDE'],
      mediaUrl: '/img/projects/weather-station.jpg',
      mediaType: 'image',
      instructions: 'Créez votre propre station météo connectée...',
      author: 'Ing. Marie ASSAN',
      featured: false,
      status: 'active',
      likes: 28,
      views: 180,
      cost: 12000,
      createdAt: '2024-03-10',
      updatedAt: '2024-12-01'
    }
  ];

  const mockServices: Service[] = [
    // Formations
    {
      id: '1',
      name: 'Formation Impression 3D',
      description: 'Apprenez les bases de l\'impression 3D et la conception pour la fabrication additive',
      category: 'formation',
      type: 'formation',
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
      name: 'Formation Arduino & IoT',
      description: 'Découvrez l\'électronique et programmez vos premiers objets connectés',
      category: 'formation',
      type: 'formation',
      price: 30000,
      duration: '6 heures',
      includes: [
        'Bases de l\'électronique',
        'Programmation Arduino',
        'Capteurs et actionneurs',
        'Projets IoT pratiques'
      ],
      requirements: ['Notions de programmation', 'Ordinateur portable'],
      available: true,
      maxParticipants: 6,
      createdAt: '2024-01-01',
      updatedAt: '2024-12-01'
    },
    // Services
    {
      id: '3',
      name: 'Consultation Projet',
      description: 'Conseil personnalisé pour votre projet de fabrication numérique',
      category: 'consultation',
      type: 'service',
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
    },
    {
      id: '4',
      name: 'Prototypage Rapide',
      description: 'Service complet de prototypage pour vos projets innovants',
      category: 'production',
      type: 'service',
      price: 0, // Sur devis
      duration: '1-5 jours',
      includes: [
        'Analyse du cahier des charges',
        'Conception 3D',
        'Impression/Usinage',
        'Tests et validation'
      ],
      requirements: ['Cahier des charges détaillé'],
      available: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-12-01'
    },
    {
      id: '5',
      name: 'Utilisation Supervisée',
      description: 'Accès aux machines avec supervision pour les non-abonnés',
      category: 'production',
      type: 'service',
      price: 5000,
      duration: '1 heure',
      includes: [
        'Supervision technique',
        'Assistance utilisation',
        'Maintenance de base'
      ],
      requirements: ['Formation sécurité validée'],
      available: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-12-01'
    }
  ];

  const mockPricings: Pricing[] = [
    // Abonnements
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
      name: 'Abonnement Professionnel',
      type: 'membership',
      price: 25000,
      duration: '1 mois',
      description: 'Accès prioritaire pour les professionnels',
      includes: [
        'Tout de l\'abonnement Étudiant',
        'Accès prioritaire aux machines',
        'Formations avancées incluses',
        'Projets commerciaux autorisés',
        'Support technique prioritaire'
      ],
      popular: false,
      active: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-12-01'
    },
    // Matériaux
    {
      id: '3',
      name: 'Filament PLA',
      type: 'material',
      price: 500,
      unit: 'gramme',
      description: 'Filament PLA de qualité pour impression 3D',
      includes: ['Filament PLA premium', 'Qualité garantie'],
      popular: false,
      active: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-12-01'
    },
    {
      id: '4',
      name: 'Filament ABS',
      type: 'material',
      price: 600,
      unit: 'gramme',
      description: 'Filament ABS résistant pour pièces mécaniques',
      includes: ['Filament ABS premium', 'Résistance mécanique'],
      popular: false,
      active: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-12-01'
    },
    {
      id: '5',
      name: 'Plaque Acrylique',
      type: 'material',
      price: 2000,
      unit: 'dm²',
      description: 'Plaque acrylique transparente pour découpe laser',
      includes: ['Acrylique haute qualité', 'Finition parfaite'],
      popular: false,
      active: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-12-01'
    },
    {
      id: '6',
      name: 'Contreplaqué',
      type: 'material',
      price: 1500,
      unit: 'dm²',
      description: 'Contreplaqué pour découpe et gravure laser',
      includes: ['Contreplaqué premium', 'Épaisseur 3mm'],
      popular: false,
      active: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-12-01'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setProjects(mockProjects);
      setServices(mockServices);
      setPricings(mockPricings);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Gestion des formulaires
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulation upload de média
    let mediaUrl = '';
    if (projectForm.mediaFile) {
      // Dans un vrai système, ici on uploadarait le fichier
      mediaUrl = URL.createObjectURL(projectForm.mediaFile);
    }

    const newProject: Project = {
      id: Date.now().toString(),
      ...projectForm,
      mediaUrl,
      materials: projectForm.materials,
      tools: projectForm.tools,
      technologies: projectForm.technologies,
      author: 'Admin CREC',
      featured: false,
      status: 'active',
      likes: 0,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setProjects([...projects, newProject]);
    setIsCreateProjectOpen(false);
    
    // Reset form
    setProjectForm({
      title: '',
      description: '',
      category: 'electronics',
      difficulty: 'beginner',
      duration: '',
      materials: [],
      tools: [],
      technologies: [],
      instructions: '',
      cost: 0,
      mediaFile: null,
      mediaType: 'image'
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type.startsWith('video/') ? 'video' : 'image';
      setProjectForm({
        ...projectForm,
        mediaFile: file,
        mediaType: fileType
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Actif' },
      inactive: { color: 'bg-red-100 text-red-800', label: 'Inactif' },
      draft: { color: 'bg-gray-100 text-gray-800', label: 'Brouillon' }
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config?.color}>{config?.label}</Badge>;
  };

  const getDifficultyBadge = (difficulty: string) => {
    const difficultyConfig = {
      beginner: { color: 'bg-green-100 text-green-800', label: 'Débutant' },
      intermediate: { color: 'bg-yellow-100 text-yellow-800', label: 'Intermédiaire' },
      advanced: { color: 'bg-red-100 text-red-800', label: 'Avancé' }
    };
    const config = difficultyConfig[difficulty as keyof typeof difficultyConfig];
    return <Badge className={config?.color}>{config?.label}</Badge>;
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
            Gestion FabLab Unifiée
          </h1>
          <p className="text-gray-600 mt-1">
            Gérez projets, services, formations et tarifs en un seul endroit
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
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Services & Formations</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{services.length}</div>
              <p className="text-xs text-muted-foreground">
                {services.filter(s => s.type === 'formation').length} formations
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
              <CardTitle className="text-sm font-medium">Abonnements</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {pricings.filter(p => p.type === 'membership').length}
              </div>
              <p className="text-xs text-muted-foreground">
                formules actives
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
              <CardTitle className="text-sm font-medium">Matériaux</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {pricings.filter(p => p.type === 'material').length}
              </div>
              <p className="text-xs text-muted-foreground">
                références disponibles
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Onglets unifiés */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="projects">Projets</TabsTrigger>
            <TabsTrigger value="services">Services & Formations</TabsTrigger>
            <TabsTrigger value="pricing">Abonnements & Tarifs</TabsTrigger>
          </TabsList>

          {/* Projets avec média */}
          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Projets du FabLab</CardTitle>
                  <Dialog open={isCreateProjectOpen} onOpenChange={setIsCreateProjectOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-crec-gold hover:bg-crec-lightgold">
                        <Plus className="w-4 h-4 mr-2" />
                        Nouveau Projet
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Créer un Nouveau Projet</DialogTitle>
                        <DialogDescription>
                          Ajoutez un nouveau projet avec support photo ou vidéo
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleProjectSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="title">Titre du projet *</Label>
                            <Input
                              id="title"
                              value={projectForm.title}
                              onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="duration">Durée estimée</Label>
                            <Input
                              id="duration"
                              placeholder="ex: 2-3 heures"
                              value={projectForm.duration}
                              onChange={(e) => setProjectForm({...projectForm, duration: e.target.value})}
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            rows={3}
                            value={projectForm.description}
                            onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="category">Catégorie</Label>
                            <Select
                              value={projectForm.category}
                              onValueChange={(value: Project['category']) => 
                                setProjectForm({...projectForm, category: value})
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="iot">IoT</SelectItem>
                                <SelectItem value="3d">Impression 3D</SelectItem>
                                <SelectItem value="electronics">Électronique</SelectItem>
                                <SelectItem value="automation">Automatisation</SelectItem>
                                <SelectItem value="mechanical">Mécanique</SelectItem>
                                <SelectItem value="software">Logiciel</SelectItem>
                                <SelectItem value="mixed">Mixte</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="difficulty">Difficulté</Label>
                            <Select
                              value={projectForm.difficulty}
                              onValueChange={(value: Project['difficulty']) => 
                                setProjectForm({...projectForm, difficulty: value})
                              }
                            >
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
                          <div>
                            <Label htmlFor="cost">Coût (FCFA)</Label>
                            <Input
                              id="cost"
                              type="number"
                              value={projectForm.cost}
                              onChange={(e) => setProjectForm({...projectForm, cost: parseInt(e.target.value) || 0})}
                            />
                          </div>
                        </div>

                        {/* Upload de média */}
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                          <Label htmlFor="media">Photo ou Vidéo du projet</Label>
                          <div className="mt-2">
                            <Input
                              id="media"
                              type="file"
                              accept="image/*,video/*"
                              onChange={handleFileUpload}
                              className="cursor-pointer"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                              Formats acceptés: JPG, PNG, MP4, WebM (max 50Mo)
                            </p>
                            {projectForm.mediaFile && (
                              <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
                                {projectForm.mediaType === 'video' ? <Video className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
                                {projectForm.mediaFile.name}
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="instructions">Instructions détaillées</Label>
                          <Textarea
                            id="instructions"
                            rows={4}
                            placeholder="Décrivez les étapes de réalisation du projet..."
                            value={projectForm.instructions}
                            onChange={(e) => setProjectForm({...projectForm, instructions: e.target.value})}
                          />
                        </div>

                        <DialogFooter>
                          <Button type="submit" className="bg-crec-gold hover:bg-crec-lightgold">
                            Créer le Projet
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-all">
                      {project.mediaUrl && (
                        <div className="aspect-video overflow-hidden relative">
                          {project.mediaType === 'video' ? (
                            <div className="relative">
                              <video
                                src={project.mediaUrl}
                                className="w-full h-full object-cover"
                                poster="/img/video-placeholder.jpg"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                <Play className="w-12 h-12 text-white" />
                              </div>
                            </div>
                          ) : (
                            <img
                              src={project.mediaUrl}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      )}
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-lg line-clamp-1">{project.title}</h3>
                          {project.featured && (
                            <Star className="w-5 h-5 text-yellow-500 fill-current flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex items-center gap-2 mb-3">
                          {getStatusBadge(project.status)}
                          {getDifficultyBadge(project.difficulty)}
                          <Badge variant="outline" className="text-xs">
                            {project.category}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{project.technologies.length - 3}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                          <span>👁 {project.views}</span>
                          <span>❤️ {project.likes}</span>
                          <span>⏱ {project.duration}</span>
                          {project.cost && (
                            <span className="font-medium text-crec-gold">
                              {project.cost.toLocaleString()} F
                            </span>
                          )}
                        </div>
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

          {/* Services et Formations unifiés */}
          <TabsContent value="services">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Services et Formations</CardTitle>
                  <Button className="bg-crec-gold hover:bg-crec-lightgold">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau Service
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filtres par type */}
                <div className="flex gap-2 mb-6">
                  <Button variant="outline" size="sm">Tout</Button>
                  <Button variant="outline" size="sm">Formations</Button>
                  <Button variant="outline" size="sm">Services</Button>
                </div>

                <div className="space-y-4">
                  {services.map((service) => (
                    <Card key={service.id} className="hover:shadow-md transition-all">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">{service.name}</h3>
                              <Badge className={service.type === 'formation' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}>
                                {service.type === 'formation' ? 'Formation' : 'Service'}
                              </Badge>
                              <Badge className={service.available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                {service.available ? 'Disponible' : 'Indisponible'}
                              </Badge>
                              <Badge variant="outline">
                                {service.category}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-3">{service.description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                              <div>
                                <span className="font-medium">Prix:</span>{' '}
                                {service.price > 0 ? `${service.price.toLocaleString()} FCFA` : 'Sur devis'}
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
                            <div>
                              <span className="font-medium text-sm">Inclut:</span>
                              <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm text-gray-600 mt-1">
                                {service.includes.map((item, index) => (
                                  <li key={index} className="flex items-center gap-2">
                                    <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                                    {item}
                                  </li>
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

          {/* Abonnements et Tarifs unifiés */}
          <TabsContent value="pricing">
            <div className="space-y-6">
              {/* Abonnements */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Abonnements FabLab</CardTitle>
                    <Button className="bg-crec-gold hover:bg-crec-lightgold">
                      <Plus className="w-4 h-4 mr-2" />
                      Nouvel Abonnement
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pricings.filter(p => p.type === 'membership').map((pricing) => (
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

              {/* Tarifs des matériaux */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Tarifs des Matériaux</CardTitle>
                    <Button className="bg-crec-gold hover:bg-crec-lightgold">
                      <Plus className="w-4 h-4 mr-2" />
                      Nouveau Matériau
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {pricings.filter(p => p.type === 'material').map((material) => (
                      <Card key={material.id} className="hover:shadow-md transition-all">
                        <CardContent className="p-4 text-center">
                          <h4 className="font-semibold text-gray-800 mb-2">{material.name}</h4>
                          <div className="text-xl font-bold text-crec-gold mb-1">
                            {material.price.toLocaleString()} FCFA
                          </div>
                          <p className="text-sm text-gray-500 mb-3">
                            par {material.unit}
                          </p>
                          <p className="text-xs text-gray-600 mb-3">
                            {material.description}
                          </p>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default FabLabManagementNew;
