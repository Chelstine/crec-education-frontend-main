// Page d'administration unifiée pour la gestion des événements (ateliers, conférences, événements institutionnels)
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
  Search,
  Filter,
  Eye,
  Edit,
  Calendar,
  Users,
  Clock,
  MapPin,
  Plus,
  Download,
  BookOpen,
  Mic,
  Star,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';

// Définition du type d'objet Event pour typer les données d'événements
interface Event {
  id: string; // Identifiant unique
  title: string; // Titre de l'événement
  description: string; // Description détaillée
  type: 'atelier' | 'conference' | 'evenement'; // Type d'événement
  organizer: string; // Organisateur
  speaker?: string; // Intervenant (pour conférences)
  instructor?: string; // Formateur (pour ateliers)
  category: string; // Catégorie
  startDate: string; // Date de début
  endDate: string; // Date de fin
  startTime: string; // Heure de début
  endTime: string; // Heure de fin
  location: string; // Lieu
  capacity: number; // Capacité maximale
  registered: number; // Nombre d'inscrits
  price: number; // Prix d'inscription
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'; // Statut de l'événement
  difficulty?: 'beginner' | 'intermediate' | 'advanced'; // Niveau (pour ateliers)
  duration: number; // Durée en heures
  materials?: string[]; // Matériel fourni (ateliers)
  prerequisites?: string[]; // Prérequis (ateliers)
  objectives?: string[]; // Objectifs pédagogiques (ateliers)
  tags: string[]; // Tags pour recherche/filtrage
  imageUrl?: string; // Image d'illustration
  createdAt: string; // Date de création
  updatedAt: string; // Date de dernière modification
}

// Composant principal de la page d'administration des événements
const EventsUnified: React.FC = () => {
  // Hook pour afficher des notifications toast
  const { toast } = useToast();
  // États pour gérer les données et l'UI
  const [events, setEvents] = useState<Event[]>([]); // Liste complète des événements
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]); // Liste filtrée selon recherche/onglets
  const [activeTab, setActiveTab] = useState('all'); // Onglet actif (tous, atelier, conférence, événement)
  const [searchTerm, setSearchTerm] = useState(''); // Terme de recherche
  const [statusFilter, setStatusFilter] = useState('all'); // Filtre par statut
  const [categoryFilter, setCategoryFilter] = useState('all'); // Filtre par catégorie
  const [isLoading, setIsLoading] = useState(true); // Indicateur de chargement
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); // Événement sélectionné pour détails/modif
  const [showDetailsModal, setShowDetailsModal] = useState(false); // Affichage du modal de détails
  const [showFormModal, setShowFormModal] = useState(false); // Affichage du modal de création/modification

  // Chargement des données mock au montage du composant (simulation d'appel API)
  useEffect(() => {
    // Données d'exemple pour ateliers, conférences, événements
    const mockData: Event[] = [
      {
        id: '1',
        title: 'Atelier Impression 3D Avancée',
        description: 'Apprenez les techniques avancées d\'impression 3D et la post-production',
        type: 'atelier',
        organizer: 'CREC FabLab',
        instructor: 'Jean HOUNKPATIN',
        category: 'Fabrication Numérique',
        startDate: '2024-12-20',
        endDate: '2024-12-20',
        startTime: '09:00',
        endTime: '17:00',
        location: 'FabLab CREC',
        capacity: 12,
        registered: 8,
        price: 50000,
        status: 'upcoming',
        difficulty: 'advanced',
        duration: 8,
        materials: ['Filament PLA', 'Outils de finition', 'Supports de modélisation'],
        prerequisites: ['Connaissance base impression 3D', 'Utilisation logiciels 3D'],
        objectives: ['Maîtriser techniques avancées', 'Optimiser qualité impressions', 'Post-traitement professionnel'],
        tags: ['3D', 'Fabrication', 'Technique'],
        createdAt: '2024-12-15T10:00:00Z',
        updatedAt: '2024-12-16T14:30:00Z'
      },
      {
        id: '2',
        title: 'Conférence: IA et Éducation en Afrique',
        description: 'L\'impact de l\'intelligence artificielle sur l\'éducation en Afrique de l\'Ouest',
        type: 'conference',
        organizer: 'CREC Education',
        speaker: 'Dr. Marie KOUASSI',
        category: 'Technologie Éducative',
        startDate: '2024-12-22',
        endDate: '2024-12-22',
        startTime: '14:00',
        endTime: '16:00',
        location: 'Amphithéâtre CREC',
        capacity: 100,
        registered: 65,
        price: 0,
        status: 'upcoming',
        duration: 2,
        tags: ['IA', 'Éducation', 'Afrique', 'Innovation'],
        createdAt: '2024-12-10T09:00:00Z',
        updatedAt: '2024-12-17T11:20:00Z'
      },
      {
        id: '3',
        title: 'Journée Portes Ouvertes CREC',
        description: 'Découvrez nos formations et rencontrez nos équipes',
        type: 'evenement',
        organizer: 'CREC Administration',
        category: 'Institutionnel',
        startDate: '2024-12-28',
        endDate: '2024-12-28',
        startTime: '08:00',
        endTime: '17:00',
        location: 'Campus CREC',
        capacity: 200,
        registered: 124,
        price: 0,
        status: 'upcoming',
        duration: 9,
        tags: ['Portes Ouvertes', 'Orientation', 'Formations'],
        createdAt: '2024-12-05T08:00:00Z',
        updatedAt: '2024-12-15T16:45:00Z'
      }
    ];
    setTimeout(() => {
      setEvents(mockData); // On charge les événements simulés
      setFilteredEvents(mockData); // On initialise la liste filtrée
      setIsLoading(false); // Fin du chargement
    }, 1000);
  }, []);

  // Filtrage dynamique selon recherche, statut, catégorie, onglet
  useEffect(() => {
    let filtered = events.filter(event => {
      // Vérifie si l'événement correspond à la recherche (titre, description, organisateur, intervenant, formateur)
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (event.speaker && event.speaker.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (event.instructor && event.instructor.toLowerCase().includes(searchTerm.toLowerCase()));
      // Vérifie les autres filtres
      const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
      const matchesTab = activeTab === 'all' || event.type === activeTab;
      return matchesSearch && matchesStatus && matchesCategory && matchesTab;
    });
    setFilteredEvents(filtered); // Met à jour la liste filtrée
  }, [searchTerm, statusFilter, categoryFilter, activeTab, events]);

  // Génère un badge de statut pour chaque événement
  const getStatusBadge = (status: string) => {
    // Retourne un badge stylisé selon le statut (à venir, en cours, terminé, annulé)
    const statusConfig = {
      upcoming: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'À venir', icon: Clock },
      ongoing: { color: 'bg-green-100 text-green-800 border-green-200', label: 'En cours', icon: CheckCircle },
      completed: { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Terminé', icon: CheckCircle },
      cancelled: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Annulé', icon: XCircle }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.upcoming;
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} border flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  // Génère un badge de type (atelier, conférence, événement)
  const getTypeBadge = (type: string) => {
    // Retourne un badge stylisé selon le type
    const typeConfig = {
      atelier: { color: 'bg-purple-50 text-purple-700 border-purple-200', label: 'Atelier', icon: BookOpen },
      conference: { color: 'bg-blue-50 text-blue-700 border-blue-200', label: 'Conférence', icon: Mic },
      evenement: { color: 'bg-green-50 text-green-700 border-green-200', label: 'Événement', icon: Star }
    };

    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.evenement;
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} border text-xs flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  // Génère un badge de difficulté pour les ateliers
  const getDifficultyBadge = (difficulty?: string) => {
    // Retourne un badge stylisé ou rien selon la difficulté
    if (!difficulty) return null;
    
    const difficultyConfig = {
      beginner: { color: 'bg-green-100 text-green-700', label: 'Débutant' },
      intermediate: { color: 'bg-yellow-100 text-yellow-700', label: 'Intermédiaire' },
      advanced: { color: 'bg-red-100 text-red-700', label: 'Avancé' }
    };

    const config = difficultyConfig[difficulty as keyof typeof difficultyConfig];

    return (
      <Badge className={`${config.color} text-xs`}>
        {config.label}
      </Badge>
    );
  };

  // Annule un événement (change son statut et affiche un toast)
  const handleCancel = (id: string) => {
    // Recherche l'événement à annuler et met à jour son statut
    const event = events.find(e => e.id === id);
    if (!event) return;

    setEvents(prev => prev.map(e => 
      e.id === id 
        ? { ...e, status: 'cancelled' as const }
        : e
    ));
    
    toast({
      title: "Événement annulé",
      description: `L'événement "${event.title}" a été annulé.`,
      variant: "destructive",
    });
  };

  // Statistiques globales pour l'affichage en haut de page
  const stats = {
    total: events.length,
    upcoming: events.filter(e => e.status === 'upcoming').length,
    ongoing: events.filter(e => e.status === 'ongoing').length,
    completed: events.filter(e => e.status === 'completed').length,
    totalParticipants: events.reduce((sum, e) => sum + e.registered, 0)
  };

  // Nombre d'événements par type pour les onglets
  const getTabStats = (type: string) => {
    if (type === 'all') return events.length;
    return events.filter(e => e.type === type).length;
  };

  // Affichage d'un loader pendant le chargement
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">Chargement des événements...</span>
        </div>
      </div>
    );
  }

  // Rendu principal de la page :
  // - En-tête avec statistiques
  // - Filtres et onglets
  // - Table des événements
  // - Modaux de détails et de formulaire
  return (
    <div className="space-y-6">
      {/* En-tête avec statistiques */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Calendar className="mr-3 h-7 w-7 text-blue-600" />
            Gestion des Événements
          </h1>
          <p className="text-gray-600 mt-1">
            Ateliers, conférences et événements institutionnels
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setShowFormModal(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Nouvel événement
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">À venir</p>
                <p className="text-2xl font-bold text-gray-900">{stats.upcoming}</p>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En cours</p>
                <p className="text-2xl font-bold text-gray-900">{stats.ongoing}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-gray-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Terminés</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Participants</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalParticipants}</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et onglets */}
      <Card>
        <CardContent className="p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">
                Tous ({getTabStats('all')})
              </TabsTrigger>
              <TabsTrigger value="atelier">
                Ateliers ({getTabStats('atelier')})
              </TabsTrigger>
              <TabsTrigger value="conference">
                Conférences ({getTabStats('conference')})
              </TabsTrigger>
              <TabsTrigger value="evenement">
                Événements ({getTabStats('evenement')})
              </TabsTrigger>
            </TabsList>

            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher par titre, description, organisateur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="upcoming">À venir</SelectItem>
                  <SelectItem value="ongoing">En cours</SelectItem>
                  <SelectItem value="completed">Terminé</SelectItem>
                  <SelectItem value="cancelled">Annulé</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  <SelectItem value="Fabrication Numérique">Fabrication Numérique</SelectItem>
                  <SelectItem value="Technologie Éducative">Technologie Éducative</SelectItem>
                  <SelectItem value="Institutionnel">Institutionnel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Table des événements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Événements ({filteredEvents.length})</span>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filtres avancés
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Événement</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date & Heure</TableHead>
                  <TableHead>Lieu</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filteredEvents.map((event) => (
                    <motion.tr
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="group hover:bg-gray-50"
                    >
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium text-gray-900">{event.title}</p>
                          <p className="text-sm text-gray-600">{event.organizer}</p>
                          {event.speaker && (
                            <p className="text-xs text-blue-600">Intervenant: {event.speaker}</p>
                          )}
                          {event.instructor && (
                            <p className="text-xs text-purple-600">Formateur: {event.instructor}</p>
                          )}
                          {event.difficulty && getDifficultyBadge(event.difficulty)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getTypeBadge(event.type)}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">
                            {new Date(event.startDate).toLocaleDateString('fr-FR')}
                          </p>
                          <p className="text-xs text-gray-500">
                            {event.startTime} - {event.endTime}
                          </p>
                          <p className="text-xs text-gray-400">
                            {event.duration}h
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span className="text-sm">{event.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">
                            {event.registered}/{event.capacity}
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                event.registered / event.capacity > 0.8 
                                  ? 'bg-red-500' 
                                  : event.registered / event.capacity > 0.6 
                                  ? 'bg-yellow-500' 
                                  : 'bg-green-500'
                              }`}
                              style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(event.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedEvent(event);
                              setShowDetailsModal(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedEvent(event);
                              setShowFormModal(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          {event.status === 'upcoming' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCancel(event.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
          
          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun événement trouvé</h3>
              <p className="mt-1 text-sm text-gray-500">
                Aucun événement ne correspond à vos critères de recherche.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de détails */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Détails de l'événement
            </DialogTitle>
            <DialogDescription>
              Informations complètes sur "{selectedEvent?.title}"
            </DialogDescription>
          </DialogHeader>
          
          {selectedEvent && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Informations générales</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Type:</span> {getTypeBadge(selectedEvent.type)}</p>
                    <p><span className="font-medium">Organisateur:</span> {selectedEvent.organizer}</p>
                    {selectedEvent.speaker && (
                      <p><span className="font-medium">Intervenant:</span> {selectedEvent.speaker}</p>
                    )}
                    {selectedEvent.instructor && (
                      <p><span className="font-medium">Formateur:</span> {selectedEvent.instructor}</p>
                    )}
                    <p><span className="font-medium">Catégorie:</span> {selectedEvent.category}</p>
                    <p><span className="font-medium">Statut:</span> {getStatusBadge(selectedEvent.status)}</p>
                    {selectedEvent.difficulty && (
                      <p><span className="font-medium">Difficulté:</span> {getDifficultyBadge(selectedEvent.difficulty)}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Logistique</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Date:</span> {new Date(selectedEvent.startDate).toLocaleDateString('fr-FR')}</p>
                    <p><span className="font-medium">Horaire:</span> {selectedEvent.startTime} - {selectedEvent.endTime}</p>
                    <p><span className="font-medium">Durée:</span> {selectedEvent.duration} heures</p>
                    <p><span className="font-medium">Lieu:</span> {selectedEvent.location}</p>
                    <p><span className="font-medium">Capacité:</span> {selectedEvent.capacity} places</p>
                    <p><span className="font-medium">Inscrits:</span> {selectedEvent.registered} personnes</p>
                    <p><span className="font-medium">Prix:</span> {selectedEvent.price === 0 ? 'Gratuit' : `${selectedEvent.price.toLocaleString()} F`}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Description</h3>
                <p className="text-sm text-gray-600">{selectedEvent.description}</p>
              </div>

              {selectedEvent.objectives && selectedEvent.objectives.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Objectifs</h3>
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    {selectedEvent.objectives.map((obj, index) => (
                      <li key={index}>{obj}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedEvent.prerequisites && selectedEvent.prerequisites.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Prérequis</h3>
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    {selectedEvent.prerequisites.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedEvent.materials && selectedEvent.materials.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Matériel fourni</h3>
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    {selectedEvent.materials.map((material, index) => (
                      <li key={index}>{material}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsModal(false)}>
              Fermer
            </Button>
            <Button 
              onClick={() => {
                setShowDetailsModal(false);
                setShowFormModal(true);
              }}
            >
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de formulaire (placeholder) */}
      <Dialog open={showFormModal} onOpenChange={setShowFormModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedEvent ? 'Modifier l\'événement' : 'Nouvel événement'}
            </DialogTitle>
            <DialogDescription>
              {selectedEvent ? 'Modifiez les informations de l\'événement' : 'Créez un nouvel événement'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-8 text-center text-gray-500">
            Formulaire de création/modification d'événement à implémenter
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFormModal(false)}>
              Annuler
            </Button>
            <Button onClick={() => setShowFormModal(false)}>
              {selectedEvent ? 'Modifier' : 'Créer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventsUnified; // Export du composant pour utilisation dans l'admin
