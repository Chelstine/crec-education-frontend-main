import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  Calendar,
  Users,
  MapPin,
  Clock,
  Star,
  TrendingUp,
  Target,
  Award
} from 'lucide-react';

// Types pour les événements
interface Evenement {
  id: string;
  title: string;
  description: string;
  type: 'conference' | 'workshop' | 'seminar' | 'ceremony' | 'cultural' | 'religious';
  category: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: string;
  capacity: number;
  registered: number;
  price: number;
  organizer: string;
  speakers: string[];
  featured: boolean;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  registrationOpen: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

const EvenementsManagement: React.FC = () => {
  const [evenements, setEvenements] = useState<Evenement[]>([]);
  const [filteredEvenements, setFilteredEvenements] = useState<Evenement[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Mock data pour les événements
  const mockEvenements: Evenement[] = [
    {
      id: '1',
      title: 'Conférence Internationale sur la Théologie Africaine',
      description: 'Grande conférence réunissant des théologiens africains et internationaux pour explorer les défis contemporains de la théologie en Afrique.',
      type: 'conference',
      category: 'Académique',
      startDate: '2025-03-15',
      endDate: '2025-03-17',
      startTime: '09:00',
      endTime: '17:00',
      location: 'Auditorium CREC',
      capacity: 200,
      registered: 145,
      price: 50000,
      organizer: 'P. Jean-Baptiste KOUAKOU, SJ',
      speakers: [
        'P. Mathias AGBOTON, SJ',
        'Dr. Marie ABLODÉ',
        'P. Elias OPONGO, SJ (Kenya)',
        'Dr. Paulin POUCOUTA (Cameroun)'
      ],
      featured: true,
      status: 'upcoming',
      registrationOpen: true,
      image: '/images/events/conference-theologie.jpg',
      createdAt: '2024-12-01',
      updatedAt: '2024-12-20'
    },
    {
      id: '2',
      title: 'Atelier de Formation : Innovation Pédagogique',
      description: 'Formation pratique sur les nouvelles méthodes pédagogiques et l\'intégration du numérique dans l\'enseignement.',
      type: 'workshop',
      category: 'Formation',
      startDate: '2025-02-20',
      endDate: '2025-02-21',
      startTime: '08:30',
      endTime: '16:30',
      location: 'Salle de Formation B1',
      capacity: 30,
      registered: 28,
      price: 75000,
      organizer: 'Dr. Kokou ADJANON',
      speakers: [
        'Prof. Elisabeth JOHNSON',
        'Dr. Kossi AMEGBETO',
        'Mme. Adjoa MENSAH'
      ],
      featured: false,
      status: 'upcoming',
      registrationOpen: true,
      createdAt: '2024-11-15',
      updatedAt: '2024-12-18'
    },
    {
      id: '3',
      title: 'Journée Culturelle Ignatienne',
      description: 'Célébration de la richesse culturelle de la famille ignatienne avec spectacles, expositions et conférences.',
      type: 'cultural',
      category: 'Culturel',
      startDate: '2025-01-31',
      endDate: '2025-01-31',
      startTime: '10:00',
      endTime: '18:00',
      location: 'Campus CREC - Espaces extérieurs',
      capacity: 500,
      registered: 320,
      price: 0,
      organizer: 'Équipe Pastorale CREC',
      speakers: [
        'Groupe Musical Loyola',
        'Troupe Théâtrale Saint-Ignace',
        'Choracle Matteo Ricci'
      ],
      featured: true,
      status: 'upcoming',
      registrationOpen: true,
      image: '/images/events/journee-culturelle.jpg',
      createdAt: '2024-10-20',
      updatedAt: '2024-12-15'
    },
    {
      id: '4',
      title: 'Séminaire : Leadership et Éthique',
      description: 'Réflexion sur le leadership éthique dans le contexte africain, basée sur les valeurs ignatiennes.',
      type: 'seminar',
      category: 'Formation',
      startDate: '2024-12-15',
      endDate: '2024-12-15',
      startTime: '14:00',
      endTime: '17:00',
      location: 'Salle de Conférence A',
      capacity: 80,
      registered: 80,
      price: 25000,
      organizer: 'P. Pierre ADOM, SJ',
      speakers: [
        'P. Pierre ADOM, SJ',
        'Dr. Akossiwa KOFFI',
        'M. Jean-Claude TOGNON'
      ],
      featured: false,
      status: 'completed',
      registrationOpen: false,
      createdAt: '2024-11-01',
      updatedAt: '2024-12-16'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setEvenements(mockEvenements);
      setFilteredEvenements(mockEvenements);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filtrage
  useEffect(() => {
    let filtered = evenements;

    if (searchTerm) {
      filtered = filtered.filter(evenement =>
        evenement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evenement.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evenement.organizer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(evenement => evenement.type === filterType);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(evenement => evenement.status === filterStatus);
    }

    setFilteredEvenements(filtered);
  }, [evenements, searchTerm, filterType, filterStatus]);

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      conference: { color: 'bg-blue-100 text-blue-800', label: 'Conférence' },
      workshop: { color: 'bg-green-100 text-green-800', label: 'Atelier' },
      seminar: { color: 'bg-purple-100 text-purple-800', label: 'Séminaire' },
      ceremony: { color: 'bg-yellow-100 text-yellow-800', label: 'Cérémonie' },
      cultural: { color: 'bg-pink-100 text-pink-800', label: 'Culturel' },
      religious: { color: 'bg-orange-100 text-orange-800', label: 'Religieux' }
    };
    const config = typeConfig[type as keyof typeof typeConfig];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      upcoming: { color: 'bg-blue-100 text-blue-800', label: 'À venir' },
      ongoing: { color: 'bg-green-100 text-green-800', label: 'En cours' },
      completed: { color: 'bg-gray-100 text-gray-800', label: 'Terminé' },
      cancelled: { color: 'bg-red-100 text-red-800', label: 'Annulé' }
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

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
            <Calendar className="h-8 w-8 text-crec-gold" />
            Gestion des Événements
          </h1>
          <p className="text-gray-600 mt-1">Planifiez et gérez tous vos événements</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-crec-gold hover:bg-crec-lightgold">
              <Plus className="mr-2 h-4 w-4" />
              Nouvel Événement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Créer un nouvel événement</DialogTitle>
              <DialogDescription>
                Planifiez un nouveau conférence, atelier ou événement
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
              <CardTitle className="text-sm font-medium">Total Événements</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">{evenements.length}</div>
              <p className="text-xs text-blue-600">
                Cette année
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
                {evenements.reduce((total, e) => total + e.registered, 0)}
              </div>
              <p className="text-xs text-green-600">
                Inscrits au total
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
              <CardTitle className="text-sm font-medium">À Venir</CardTitle>
              <Target className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">
                {evenements.filter(e => e.status === 'upcoming').length}
              </div>
              <p className="text-xs text-purple-600">
                Événements prochains
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
              <CardTitle className="text-sm font-medium">Taux Participation</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-700">
                {Math.round((evenements.reduce((total, e) => total + e.registered, 0) / evenements.reduce((total, e) => total + e.capacity, 0)) * 100)}%
              </div>
              <p className="text-xs text-orange-600">
                Moyenne de remplissage
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
                    placeholder="Rechercher par titre, catégorie ou organisateur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-4">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Type d'événement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value="conference">Conférence</SelectItem>
                    <SelectItem value="workshop">Atelier</SelectItem>
                    <SelectItem value="seminar">Séminaire</SelectItem>
                    <SelectItem value="ceremony">Cérémonie</SelectItem>
                    <SelectItem value="cultural">Culturel</SelectItem>
                    <SelectItem value="religious">Religieux</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
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
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Liste des événements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Événements ({filteredEvenements.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Événement</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvenements.map((evenement) => (
                    <TableRow key={evenement.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{evenement.title}</div>
                          <div className="text-sm text-gray-500">{evenement.category}</div>
                          <div className="text-xs text-gray-400">
                            <MapPin className="inline w-3 h-3 mr-1" />
                            {evenement.location}
                          </div>
                          {evenement.featured && (
                            <Star className="inline w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getTypeBadge(evenement.type)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(evenement.status)}
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <div className="font-medium">
                            {evenement.registered}/{evenement.capacity}
                          </div>
                          <div className="text-xs text-gray-500">
                            {Math.round((evenement.registered / evenement.capacity) * 100)}% rempli
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(evenement.startDate).toLocaleDateString('fr-FR')}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {evenement.startTime}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {evenement.price === 0 ? 'Gratuit' : `${evenement.price.toLocaleString()} FCFA`}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                          >
                            <Eye className="h-4 w-4" />
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
              
              {filteredEvenements.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Aucun événement trouvé avec ces critères.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default EvenementsManagement;
