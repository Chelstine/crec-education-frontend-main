// React & Hooks
import React, { useState, useEffect } from 'react';

// Animation
import { motion } from 'framer-motion';

// UI Components
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

// Icons
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
  UserCheck,
  BookOpen,
  Save,
  X
} from 'lucide-react';

// Context
import { useFabLab, FabLabProject, FabLabMachine, FabLabService, FabLabTariff } from '@/contexts/FabLabContext';

// Services
import FileUploadService, { UploadProgress, UploadResult } from '@/services/FileUploadService';

const FabLabFormationsManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('description');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCreateMachineDialogOpen, setIsCreateMachineDialogOpen] = useState(false);
  const [isCreateServiceDialogOpen, setIsCreateServiceDialogOpen] = useState(false);
  const [isCreateTariffDialogOpen, setIsCreateTariffDialogOpen] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  // Use FabLab context
  const {
    description,
    projects,
    machines,
    services,
    tariffs,
    updateDescription,
    addProject,
    updateProject,
    deleteProject,
    addMachine,
    updateMachine,
    deleteMachine,
    addService,
    updateService,
    deleteService,
    addTariff,
    updateTariff,
    deleteTariff
  } = useFabLab();

  // États pour l'upload de fichiers
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null);
  const [imageUploadProgress, setImageUploadProgress] = useState<UploadProgress | null>(null);
  const [videoUploadProgress, setVideoUploadProgress] = useState<UploadProgress | null>(null);
  const [uploadErrors, setUploadErrors] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const fileUploadService = FileUploadService.getInstance();

  // Action handlers pour les boutons
  const handleViewProject = (project: FabLabProject) => {
    alert(`Détails du projet:\n\nTitre: ${project.title}\nCatégorie: ${project.category}\nAuteur: ${project.author}\nStatut: ${project.status}\nDescription: ${project.description}`);
  };

  const handleEditProject = (project: FabLabProject) => {
    // Ouvrir le dialog d'édition avec les données du projet
    alert(`Édition du projet: ${project.title}\n\n(Cette fonctionnalité sera implémentée dans le dialog)`);
  };

  const handleDeleteProject = async (project: FabLabProject) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le projet "${project.title}" ?\n\nCette action est irréversible.`)) {
      deleteProject(project.id);
      console.log('Projet supprimé:', project.id);
    }
  };

  const handleViewMachine = (machine: FabLabMachine) => {
    const specifications = machine.specifications?.join('\n• ') || 'Non spécifiées';
    const features = machine.features?.join('\n• ') || 'Non spécifiées';
    alert(`Détails de la machine:\n\nNom: ${machine.name}\nCode: ${machine.code}\nCatégorie: ${machine.category}\nStatut: ${machine.status}\nEmplacement: ${machine.location}\n\nCaractéristiques:\n• ${features}\n\nSpécifications:\n• ${specifications}`);
  };

  const handleEditMachine = (machine: FabLabMachine) => {
    alert(`Édition de la machine: ${machine.name}\n\n(Cette fonctionnalité sera implémentée dans le dialog)`);
  };

  const handleDeleteMachine = async (machine: FabLabMachine) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la machine "${machine.name}" ?\n\nCette action est irréversible.`)) {
      deleteMachine(machine.id);
      console.log('Machine supprimée:', machine.id);
    }
  };

  const handleViewService = (service: FabLabService) => {
    const includes = service.includes?.join('\n• ') || 'Non spécifiés';
    const requirements = service.requirements?.join('\n• ') || 'Aucun prérequis';
    alert(`Détails du service:\n\nNom: ${service.name}\nCatégorie: ${service.category}\nDurée: ${service.duration}\nPrix: ${service.price} FCFA\n\nInclus:\n• ${includes}\n\nPrérequis:\n• ${requirements}`);
  };

  const handleEditService = (service: FabLabService) => {
    alert(`Édition du service: ${service.name}\n\n(Cette fonctionnalité sera implémentée dans le dialog)`);
  };

  const handleDeleteService = async (service: FabLabService) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le service "${service.name}" ?\n\nCette action est irréversible.`)) {
      deleteService(service.id);
      console.log('Service supprimé:', service.id);
    }
  };

  const handleViewTariff = (tariff: FabLabTariff) => {
    const benefits = tariff.benefits?.join('\n• ') || 'Non spécifiés';
    const restrictions = tariff.restrictions?.join('\n• ') || 'Aucune restriction';
    alert(`Détails du tarif:\n\nNom: ${tariff.name}\nType: ${tariff.type}\nPrix: ${tariff.price} FCFA/${tariff.unit}\n\nAvantages:\n• ${benefits}\n\nRestrictions:\n• ${restrictions}`);
  };

  const handleEditTariff = (tariff: FabLabTariff) => {
    alert(`Édition du tarif: ${tariff.name}\n\n(Cette fonctionnalité sera implémentée dans le dialog)`);
  };

  const handleDeleteTariff = async (tariff: FabLabTariff) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le tarif "${tariff.name}" ?\n\nCette action est irréversible.`)) {
      deleteTariff(tariff.id);
      console.log('Tarif supprimé:', tariff.id);
    }
  };

  const handleExportData = () => {
    const currentData = getFilteredData();
    let exportData: any[] = [];
    let filename = '';

    switch (activeTab) {
      case 'projects':
        exportData = (currentData as FabLabProject[]).map(project => ({
          'ID': project.id,
          'Titre': project.title,
          'Catégorie': project.category,
          'Auteur': project.author,
          'Statut': project.status,
          'Mis en avant': project.featured ? 'Oui' : 'Non',
          'Tags': project.tags.join(', '),
          'Date création': project.createdAt,
          'Description': project.description
        }));
        filename = `fablab-projets-${new Date().toISOString().split('T')[0]}.csv`;
        break;

      case 'machines':
        exportData = (currentData as FabLabMachine[]).map(machine => ({
          'ID': machine.id,
          'Nom': machine.name,
          'Code': machine.code,
          'Catégorie': machine.category,
          'Statut': machine.status,
          'Emplacement': machine.location,
          'Prix mensuel': machine.monthlyPrice,
          'Prix annuel': machine.yearlyPrice,
          'Dernière maintenance': machine.lastMaintenance,
          'Prochaine maintenance': machine.nextMaintenance
        }));
        filename = `fablab-machines-${new Date().toISOString().split('T')[0]}.csv`;
        break;

      case 'services':
        exportData = (currentData as FabLabService[]).map(service => ({
          'ID': service.id,
          'Nom': service.name,
          'Catégorie': service.category,
          'Durée': service.duration,
          'Prix': service.price,
          'Statut': service.status,
          'Description': service.description
        }));
        filename = `fablab-services-${new Date().toISOString().split('T')[0]}.csv`;
        break;

      case 'tariffs':
        exportData = (currentData as FabLabTariff[]).map(tariff => ({
          'ID': tariff.id,
          'Nom': tariff.name,
          'Type': tariff.type,
          'Prix': tariff.price,
          'Unité': tariff.unit,
          'Durée': tariff.duration || 'N/A',
          'Statut': tariff.status,
          'Description': tariff.description
        }));
        filename = `fablab-tarifs-${new Date().toISOString().split('T')[0]}.csv`;
        break;
    }

    if (exportData.length > 0) {
      const headers = Object.keys(exportData[0]);
      const csvContent = [
        headers.join(','),
        ...exportData.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  // Fonctions pour la gestion des uploads
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);
      setUploadErrors([]);
    }
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedVideoFile(file);
      setUploadErrors([]);
    }
  };

  const uploadProjectFiles = async (projectId: string): Promise<{ imageUrl?: string; videoUrl?: string }> => {
    setIsUploading(true);
    setUploadErrors([]);
    const results: { imageUrl?: string; videoUrl?: string } = {};

    try {
      // Upload de l'image si sélectionnée
      if (selectedImageFile) {
        const imageResult = await fileUploadService.uploadProjectImage(
          selectedImageFile,
          projectId,
          (progress) => setImageUploadProgress(progress)
        );

        if (imageResult.success && imageResult.fileUrl) {
          results.imageUrl = imageResult.fileUrl;
        } else {
          setUploadErrors(prev => [...prev, `Erreur image: ${imageResult.error}`]);
        }
      }

      // Upload de la vidéo si sélectionnée
      if (selectedVideoFile) {
        const videoResult = await fileUploadService.uploadProjectVideo(
          selectedVideoFile,
          projectId,
          (progress) => setVideoUploadProgress(progress)
        );

        if (videoResult.success && videoResult.fileUrl) {
          results.videoUrl = videoResult.fileUrl;
        } else {
          setUploadErrors(prev => [...prev, `Erreur vidéo: ${videoResult.error}`]);
        }
      }

      return results;
    } catch (error) {
      setUploadErrors(prev => [...prev, 'Erreur lors de l\'upload des fichiers']);
      return {};
    } finally {
      setIsUploading(false);
    }
  };

  const resetUploadStates = () => {
    setSelectedImageFile(null);
    setSelectedVideoFile(null);
    setImageUploadProgress(null);
    setVideoUploadProgress(null);
    setUploadErrors([]);
    setIsUploading(false);
  };

  // Local state for editing description
  const [editingDescription, setEditingDescription] = useState(description);

  // Description editing handlers
  const handleSaveDescription = () => {
    updateDescription(editingDescription);
    setIsEditingDescription(false);
  };

  const handleCancelEditDescription = () => {
    setEditingDescription(description);
    setIsEditingDescription(false);
  };

  // Initialize subscriber count
  useEffect(() => {
    setSubscriberCount(147); // Nombre d'abonnés fictif
    setLoading(false);
  }, []);

  // Filtrage
  const getFilteredData = (): (FabLabProject | FabLabMachine | FabLabService | FabLabTariff)[] => {
    const getData = (): (FabLabProject | FabLabMachine | FabLabService | FabLabTariff)[] => {
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
          item.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    return filtered.filter(Boolean);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      // Statuts des projets
      published: { color: 'bg-green-100 text-green-800', label: 'Publié' },
      draft: { color: 'bg-gray-100 text-gray-800', label: 'Brouillon' },
      archived: { color: 'bg-orange-100 text-orange-800', label: 'Archivé' },
      // Statuts des machines
      active: { color: 'bg-green-100 text-green-800', label: 'Actif' },
      inactive: { color: 'bg-gray-100 text-gray-800', label: 'Inactif' },
      available: { color: 'bg-green-100 text-green-800', label: 'Disponible' },
      maintenance: { color: 'bg-yellow-100 text-yellow-800', label: 'Maintenance' },
      broken: { color: 'bg-red-100 text-red-800', label: 'En panne' },
      reserved: { color: 'bg-blue-100 text-blue-800', label: 'Réservé' }
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config?.color || 'bg-gray-100 text-gray-800'}>{config?.label || status}</Badge>;
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
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Machines</CardTitle>
              <Cpu className="h-4 w-4 text-green-600" />
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
          transition={{ delay: 0.4 }}
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
          transition={{ delay: 0.5 }}
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="description" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Description
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Projets
            </TabsTrigger>
            <TabsTrigger value="machines" className="flex items-center gap-2">
              <Cpu className="h-4 w-4" />
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

          {/* Contenu de l'onglet Description */}
          <TabsContent value="description">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Description du FabLab
                  </div>
                  <div className="flex gap-2">
                    {!isEditingDescription && (
                      <Button onClick={() => setIsEditingDescription(true)} className="flex items-center gap-2">
                        <Edit className="w-4 h-4" />
                        Modifier
                      </Button>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditingDescription ? (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Titre principal</label>
                        <Input 
                          value={editingDescription.title}
                          onChange={(e) => setEditingDescription(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="ex: FabLab CREC"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Sous-titre</label>
                        <Textarea 
                          value={editingDescription.subtitle}
                          onChange={(e) => setEditingDescription(prev => ({ ...prev, subtitle: e.target.value }))}
                          placeholder="Slogan ou description courte..."
                          className="min-h-[60px]"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Description détaillée</label>
                        <Textarea 
                          value={editingDescription.description}
                          onChange={(e) => setEditingDescription(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Description complète du FabLab, ses équipements, sa localisation..."
                          className="min-h-[120px]"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Mission et valeurs</label>
                        <Textarea 
                          value={editingDescription.mission}
                          onChange={(e) => setEditingDescription(prev => ({ ...prev, mission: e.target.value }))}
                          placeholder="Mission, valeurs, objectifs du FabLab..."
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleSaveDescription}
                        className="flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Enregistrer
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={handleCancelEditDescription}
                        className="flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Annuler
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-jesuit-dark mb-2">{description.title}</h3>
                        <p className="text-gray-600 italic">{description.subtitle}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-700 leading-relaxed">{description.description}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Mission et valeurs</h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-700 leading-relaxed">{description.mission}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-500 border-t pt-4">
                      Dernière modification : {new Date(description.lastUpdated).toLocaleDateString('fr-FR')} par {description.updatedBy}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

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
                      <DialogTitle>Ajouter un nouveau projet</DialogTitle>
                      <DialogDescription>
                        Ajoutez un projet de démonstration au showcase du FabLab
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                      {/* Informations de base */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Titre du projet *</label>
                          <Input placeholder="ex: Lampe LED avec découpe laser" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Catégorie *</label>
                          <Select>
                            <SelectTrigger aria-label="Sélectionner une catégorie de projet">
                              <SelectValue placeholder="Sélectionner une catégorie" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="iot-electronique">IoT & Électronique</SelectItem>
                              <SelectItem value="impression-3d">Impression 3D</SelectItem>
                              <SelectItem value="decoupe-laser">Découpe Laser</SelectItem>
                              <SelectItem value="robotique">Robotique</SelectItem>
                              <SelectItem value="prototypage">Prototypage</SelectItem>
                              <SelectItem value="art-numerique">Art Numérique</SelectItem>
                              <SelectItem value="autre">Autre</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Description *</label>
                        <Textarea 
                          placeholder="Description détaillée du projet, son objectif et ses caractéristiques principales..." 
                          className="min-h-[100px]" 
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Photo du projet</label>
                          <Input 
                            type="file" 
                            accept="image/*"
                            onChange={handleImageFileChange}
                            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-crec-gold file:text-white hover:file:bg-crec-lightgold"
                          />
                          <p className="text-xs text-gray-500">Formats acceptés: JPG, PNG, WebP (max 5MB)</p>
                          {selectedImageFile && (
                            <div className="text-xs text-green-600">
                              ✓ Fichier sélectionné: {selectedImageFile.name}
                            </div>
                          )}
                          {imageUploadProgress && (
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-crec-gold h-2 rounded-full transition-all duration-300 progress-bar-width" 
                                data-progress={imageUploadProgress.percentage}
                              />
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Vidéo de démonstration (optionnel)</label>
                          <Input 
                            type="file" 
                            accept="video/*"
                            onChange={handleVideoFileChange}
                            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-crec-gold file:text-white hover:file:bg-crec-lightgold"
                          />
                          <p className="text-xs text-gray-500">Formats acceptés: MP4, WebM, MOV (max 50MB)</p>
                          {selectedVideoFile && (
                            <div className="text-xs text-green-600">
                              ✓ Fichier sélectionné: {selectedVideoFile.name}
                            </div>
                          )}
                          {videoUploadProgress && (
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-crec-gold h-2 rounded-full transition-all duration-300 progress-bar-width" 
                                data-progress={videoUploadProgress.percentage}
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Affichage des erreurs d'upload */}
                      {uploadErrors.length > 0 && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-3">
                          <h4 className="text-sm font-medium text-red-800 mb-2">Erreurs d'upload:</h4>
                          <ul className="text-sm text-red-700 space-y-1">
                            {uploadErrors.map((error, index) => (
                              <li key={index}>• {error}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Tags</label>
                          <Textarea 
                            placeholder="Arduino, LED, Design, Bois" 
                            className="min-h-[60px]" 
                          />
                          <p className="text-xs text-gray-500">Mots-clés séparés par des virgules</p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Auteur</label>
                          <Input placeholder="Nom de l'auteur du projet" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Statut</label>
                          <Select>
                            <SelectTrigger aria-label="Sélectionner le statut">
                              <SelectValue placeholder="Statut de publication" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="published">Publié</SelectItem>
                              <SelectItem value="draft">Brouillon</SelectItem>
                              <SelectItem value="archived">Archivé</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2 flex items-end">
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm font-medium">Projet mis en avant</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => {
                        setIsCreateDialogOpen(false);
                        resetUploadStates();
                      }}>
                        Annuler
                      </Button>
                      <Button 
                        className="bg-crec-gold hover:bg-crec-lightgold" 
                        disabled={isUploading}
                        onClick={async () => {
                          // Ici, on simulerait la création du projet
                          const newProjectId = `project-${Date.now()}`;
                          
                          // Upload des fichiers si sélectionnés
                          if (selectedImageFile || selectedVideoFile) {
                            const uploadResults = await uploadProjectFiles(newProjectId);
                            console.log('Upload résultats:', uploadResults);
                          }
                          
                          // Reset et fermeture
                          resetUploadStates();
                          setIsCreateDialogOpen(false);
                        }}
                      >
                        {isUploading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Upload en cours...
                          </>
                        ) : (
                          'Ajouter le projet'
                        )}
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
                        <TableHead className="hidden md:table-cell">Auteur</TableHead>
                        <TableHead className="hidden lg:table-cell">Médias</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(filteredData as FabLabProject[]).map((project) => (
                        <TableRow key={project.id}>
                          <TableCell>
                            <div>
                              <div className="flex items-center gap-2">
                                <div className="font-medium text-sm sm:text-base">{project.title}</div>
                                {project.featured && (
                                  <Badge variant="default" className="text-xs bg-yellow-100 text-yellow-800">
                                    ⭐ Mis en avant
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs sm:text-sm text-gray-500 mt-1">{project.description}</div>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {project.tags && project.tags.slice(0, 3).map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {project.tags && project.tags.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{project.tags.length - 3}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-2 mt-2 sm:hidden">
                                <Badge variant="outline" className="text-xs">{project.category}</Badge>
                                {project.author && (
                                  <Badge variant="outline" className="text-xs">👤 {project.author}</Badge>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge variant="outline">{project.category}</Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <span className="text-sm">{project.author || 'Non spécifié'}</span>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex gap-2">
                              {project.image && (
                                <Badge variant="outline" className="text-xs">📷 Photo</Badge>
                              )}
                              {project.videoUrl && (
                                <Badge variant="outline" className="text-xs">🎥 Vidéo</Badge>
                              )}
                              {!project.image && !project.videoUrl && (
                                <span className="text-xs text-gray-400">Aucun média</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(project.status)}
                          </TableCell>
                          <TableCell>
                            <div className="responsive-actions">
                              <Button variant="outline" size="sm" title="Voir les détails du projet" aria-label="Voir les détails" onClick={() => handleViewProject(project)}>
                                <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                              <Button variant="outline" size="sm" title="Modifier le projet" aria-label="Modifier" onClick={() => handleEditProject(project)}>
                                <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600" title="Supprimer le projet" aria-label="Supprimer" onClick={() => handleDeleteProject(project)}>
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

          {/* Contenu des onglets Machines */}
          <TabsContent value="machines">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Machines ({machines.length})</CardTitle>
                <Dialog open={isCreateMachineDialogOpen} onOpenChange={setIsCreateMachineDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-crec-gold hover:bg-crec-lightgold">
                      <Plus className="mr-2 h-4 w-4" />
                      Nouvelle Machine
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Ajouter une nouvelle machine</DialogTitle>
                      <DialogDescription>
                        Ajoutez un nouvel équipement au FabLab
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                      {/* Informations de base */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Nom de la machine *</label>
                          <Input placeholder="ex: Creality Ender-5 S1" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Code machine *</label>
                          <Input placeholder="ex: FAB IMP 01" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Catégorie *</label>
                          <Select>
                            <SelectTrigger aria-label="Sélectionner une catégorie">
                              <SelectValue placeholder="Type d'équipement" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="impression-3d">Impression 3D</SelectItem>
                              <SelectItem value="decoupe-laser">Découpe Laser</SelectItem>
                              <SelectItem value="electronique">Électronique</SelectItem>
                              <SelectItem value="usinage">Usinage</SelectItem>
                              <SelectItem value="mesure">Instruments de mesure</SelectItem>
                              <SelectItem value="autre">Autre</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Référence</label>
                          <Input placeholder="ex: B0BQJCX9HC" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Description *</label>
                        <Textarea placeholder="Description détaillée de la machine" className="min-h-[80px]" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Prix mensuel (FCFA)</label>
                          <Input type="number" placeholder="ex: 10000" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Prix annuel (FCFA)</label>
                          <Input type="number" placeholder="ex: 100000" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Emplacement *</label>
                        <Input placeholder="ex: Zone Impression 3D - Poste 1" />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Caractéristiques principales</label>
                        <Textarea placeholder="Listez les caractéristiques séparées par des virgules" className="min-h-[80px]" />
                        <p className="text-xs text-gray-500">ex: 250mm/s Grande Vitesse, 300°C Haute Température, Détection de Filaments</p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Spécifications techniques</label>
                        <Textarea placeholder="Spécifications détaillées séparées par des virgules" className="min-h-[80px]" />
                        <p className="text-xs text-gray-500">ex: Volume d'impression: 220x220x280mm, Précision: ±0.1mm</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Statut</label>
                          <Select>
                            <SelectTrigger aria-label="Sélectionner le statut">
                              <SelectValue placeholder="Statut de la machine" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="available">Disponible</SelectItem>
                              <SelectItem value="maintenance">En maintenance</SelectItem>
                              <SelectItem value="broken">En panne</SelectItem>
                              <SelectItem value="reserved">Réservé</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Prochaine maintenance</label>
                          <Input type="date" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">URL de l'image</label>
                        <Input placeholder="/img/machines/nom-machine.jpg" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsCreateMachineDialogOpen(false)}>
                        Annuler
                      </Button>
                      <Button className="bg-crec-gold hover:bg-crec-lightgold">
                        Ajouter
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
                        <TableHead>Machine</TableHead>
                        <TableHead className="hidden sm:table-cell">Code</TableHead>
                        <TableHead className="hidden md:table-cell">Catégorie</TableHead>
                        <TableHead className="hidden lg:table-cell">Emplacement</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(filteredData as FabLabMachine[]).map((machine) => (
                        <TableRow key={machine.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium text-sm sm:text-base">{machine.name}</div>
                              <div className="text-xs sm:text-sm text-gray-500">{machine.description}</div>
                              <div className="flex flex-wrap gap-2 mt-2 sm:hidden">
                                <Badge variant="outline" className="text-xs">{machine.code}</Badge>
                                <Badge variant="outline" className="text-xs">{machine.category}</Badge>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge variant="outline">{machine.code}</Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge variant="outline">{machine.category}</Badge>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <span className="text-sm">{machine.location}</span>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(machine.status)}
                          </TableCell>
                          <TableCell>
                            <div className="responsive-actions">
                              <Button variant="outline" size="sm" title="Voir les détails de la machine" aria-label="Voir les détails" onClick={() => handleViewMachine(machine)}>
                                <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                              <Button variant="outline" size="sm" title="Modifier la machine" aria-label="Modifier" onClick={() => handleEditMachine(machine)}>
                                <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600" title="Supprimer la machine" aria-label="Supprimer" onClick={() => handleDeleteMachine(machine)}>
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
                          <Input placeholder="ex: Formation Arduino & IoT" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Catégorie *</label>
                          <Select>
                            <SelectTrigger aria-label="Sélectionner la catégorie">
                              <SelectValue placeholder="Catégorie du service" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="formation">Formation</SelectItem>
                              <SelectItem value="prototypage">Prototypage</SelectItem>
                              <SelectItem value="conseil">Conseil</SelectItem>
                              <SelectItem value="assistance">Assistance</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Description *</label>
                        <Textarea placeholder="Description détaillée du service" className="min-h-[80px]" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Durée *</label>
                          <Input placeholder="ex: 6 heures, 1-5 jours" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Prix (FCFA) *</label>
                          <Input type="number" placeholder="ex: 30000" />
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

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Éléments inclus</label>
                        <Textarea placeholder="Listez ce qui est inclus dans le service, séparé par des virgules" className="min-h-[60px]" />
                        <p className="text-xs text-gray-500">ex: Cours théorique, Travaux pratiques, Kit Arduino, Certificat</p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Prérequis</label>
                        <Textarea placeholder="Listez les prérequis nécessaires, séparés par des virgules" className="min-h-[60px]" />
                        <p className="text-xs text-gray-500">ex: Connaissances de base en électronique, Aucun prérequis</p>
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
                      {(filteredData as FabLabService[]).map((service) => (
                        <TableRow key={service.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium text-sm sm:text-base">{service.name}</div>
                              <div className="text-xs sm:text-sm text-gray-500">{service.description}</div>
                              <div className="flex flex-wrap gap-2 mt-2 sm:hidden">
                                <Badge variant="outline" className="text-xs">{service.category}</Badge>
                                <span className="text-xs font-medium">{service.price ? service.price.toLocaleString() : '0'} FCFA</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge variant="outline">{service.category}</Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {service.duration}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {service.price ? service.price.toLocaleString() : '0'} FCFA
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(service.status)}
                          </TableCell>
                          <TableCell>
                            <div className="responsive-actions">
                              <Button variant="outline" size="sm" title="Voir les détails du service" aria-label="Voir les détails" onClick={() => handleViewService(service)}>
                                <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                              <Button variant="outline" size="sm" title="Modifier le service" aria-label="Modifier" onClick={() => handleEditService(service)}>
                                <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600" title="Supprimer le service" aria-label="Supprimer" onClick={() => handleDeleteService(service)}>
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
                        Ajoutez un nouveau tarif d'abonnement ou d'utilisation
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
                        <p className="text-xs text-gray-500">ex: Accès illimité aux machines, Formations de base incluses, Support technique</p>
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
                      {(filteredData as FabLabTariff[]).map((tariff) => (
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
                          <TableCell className="hidden lg:table-cell">
                            {tariff.unit}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(tariff.status)}
                          </TableCell>
                          <TableCell>
                            <div className="responsive-actions">
                              <Button variant="outline" size="sm" title="Voir les détails du tarif" aria-label="Voir les détails" onClick={() => handleViewTariff(tariff)}>
                                <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                              <Button variant="outline" size="sm" title="Modifier le tarif" aria-label="Modifier" onClick={() => handleEditTariff(tariff)}>
                                <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600" title="Supprimer le tarif" aria-label="Supprimer" onClick={() => handleDeleteTariff(tariff)}>
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
