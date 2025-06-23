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
  Calendar,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  Settings,
  TrendingUp,
  Download,
  AlertTriangle,
  Wrench,
  Monitor,
  CalendarDays
} from 'lucide-react';

// Types pour les réservations
interface Reservation {
  id: string;
  reservationNumber: string;
  type: 'fablab' | 'salle' | 'equipement';
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  resourceId: string;
  resourceName: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'in-progress';
  purpose: string;
  participants?: number;
  cost: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  notes?: string;
  adminNotes?: string;
  createdAt: string;
  accessKey?: string; // Pour FabLab
}

const ReservationsUnified: React.FC = () => {
  const { toast } = useToast();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Données mock
  useEffect(() => {
    const mockData: Reservation[] = [
      {
        id: '1',
        reservationNumber: 'FAB-2024-001',
        type: 'fablab',
        userId: 'user1',
        userName: 'KOUASSI Marie',
        userEmail: 'm.kouassi@email.com',
        userPhone: '+228 90 12 34 56',
        resourceId: 'machine1',
        resourceName: 'Imprimante 3D Ultimaker S3',
        startDate: '2024-12-18',
        endDate: '2024-12-18',
        startTime: '09:00',
        endTime: '12:00',
        status: 'confirmed',
        purpose: 'Impression de prototypes de bijoux',
        cost: 15000,
        paymentStatus: 'paid',
        createdAt: '2024-12-15T10:30:00Z',
        accessKey: 'CREC-FAB-001-2024'
      },
      {
        id: '2',
        reservationNumber: 'SALLE-2024-015',
        type: 'salle',
        userId: 'user2',
        userName: 'MENSAH Paul',
        userEmail: 'p.mensah@email.com',
        userPhone: '+228 92 34 56 78',
        resourceId: 'salle1',
        resourceName: 'Salle de conférence A',
        startDate: '2024-12-20',
        endDate: '2024-12-20',
        startTime: '14:00',
        endTime: '17:00',
        status: 'pending',
        purpose: 'Présentation projet agricole',
        participants: 15,
        cost: 50000,
        paymentStatus: 'pending',
        createdAt: '2024-12-16T14:20:00Z'
      },
      {
        id: '3',
        reservationNumber: 'EQ-2024-008',
        type: 'equipement',
        userId: 'user3',
        userName: 'HOUNKPATIN Jean',
        userEmail: 'j.hounkpatin@email.com',
        userPhone: '+228 91 23 45 67',
        resourceId: 'proj1',
        resourceName: 'Projecteur HD Sony',
        startDate: '2024-12-19',
        endDate: '2024-12-21',
        startTime: '08:00',
        endTime: '18:00',
        status: 'in-progress',
        purpose: 'Formation technique',
        cost: 30000,
        paymentStatus: 'paid',
        createdAt: '2024-12-17T09:15:00Z'
      }
    ];

    setTimeout(() => {
      setReservations(mockData);
      setFilteredReservations(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filtrage
  useEffect(() => {
    let filtered = reservations.filter(reservation => {
      const matchesSearch = reservation.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           reservation.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           reservation.reservationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           reservation.resourceName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;
      const matchesType = typeFilter === 'all' || reservation.type === typeFilter;
      const matchesTab = activeTab === 'all' || reservation.type === activeTab;
      
      return matchesSearch && matchesStatus && matchesType && matchesTab;
    });

    setFilteredReservations(filtered);
  }, [searchTerm, statusFilter, typeFilter, activeTab, reservations]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'En attente', icon: Clock },
      confirmed: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Confirmé', icon: CheckCircle },
      cancelled: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Annulé', icon: XCircle },
      completed: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Terminé', icon: CheckCircle },
      'in-progress': { color: 'bg-purple-100 text-purple-800 border-purple-200', label: 'En cours', icon: Settings }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} border flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      fablab: { color: 'bg-blue-50 text-blue-700 border-blue-200', label: 'FabLab', icon: Wrench },
      salle: { color: 'bg-green-50 text-green-700 border-green-200', label: 'Salle', icon: Users },
      equipement: { color: 'bg-purple-50 text-purple-700 border-purple-200', label: 'Équipement', icon: Monitor }
    };

    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.salle;
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} border text-xs flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const handleConfirm = (id: string) => {
    const reservation = reservations.find(r => r.id === id);
    if (!reservation) return;

    setReservations(prev => prev.map(r => 
      r.id === id 
        ? { 
            ...r, 
            status: 'confirmed' as const,
            adminNotes: `Confirmé le ${new Date().toLocaleDateString('fr-FR')}`
          }
        : r
    ));
    
    toast({
      title: "Réservation confirmée",
      description: `La réservation ${reservation.reservationNumber} a été confirmée.`,
      variant: "default",
    });
  };

  const handleCancel = (id: string) => {
    const reservation = reservations.find(r => r.id === id);
    if (!reservation) return;

    setReservations(prev => prev.map(r => 
      r.id === id 
        ? { 
            ...r, 
            status: 'cancelled' as const,
            adminNotes: `Annulé le ${new Date().toLocaleDateString('fr-FR')}`
          }
        : r
    ));
    
    toast({
      title: "Réservation annulée",
      description: `La réservation ${reservation.reservationNumber} a été annulée.`,
      variant: "destructive",
    });
  };

  const stats = {
    total: reservations.length,
    pending: reservations.filter(r => r.status === 'pending').length,
    confirmed: reservations.filter(r => r.status === 'confirmed').length,
    inProgress: reservations.filter(r => r.status === 'in-progress').length,
    revenue: reservations.filter(r => r.paymentStatus === 'paid').reduce((sum, r) => sum + r.cost, 0)
  };

  const getTabStats = (type: string) => {
    if (type === 'all') return reservations.length;
    return reservations.filter(r => r.type === type).length;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">Chargement des réservations...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête avec statistiques */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <CalendarDays className="mr-3 h-7 w-7 text-blue-600" />
            Gestion des Réservations
          </h1>
          <p className="text-gray-600 mt-1">
            Suivi des réservations FabLab, salles et équipements
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exporter
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

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En attente</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confirmées</p>
                <p className="text-2xl font-bold text-gray-900">{stats.confirmed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En cours</p>
                <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
              </div>
              <Settings className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenus</p>
                <p className="text-xl font-bold text-gray-900">{stats.revenue.toLocaleString()} F</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
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
                Toutes ({getTabStats('all')})
              </TabsTrigger>
              <TabsTrigger value="fablab">
                FabLab ({getTabStats('fablab')})
              </TabsTrigger>
              <TabsTrigger value="salle">
                Salles ({getTabStats('salle')})
              </TabsTrigger>
              <TabsTrigger value="equipement">
                Équipements ({getTabStats('equipement')})
              </TabsTrigger>
            </TabsList>

            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher par nom, email, numéro de réservation..."
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
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="confirmed">Confirmé</SelectItem>
                  <SelectItem value="cancelled">Annulé</SelectItem>
                  <SelectItem value="completed">Terminé</SelectItem>
                  <SelectItem value="in-progress">En cours</SelectItem>
                </SelectContent>
              </Select>
              {activeTab === 'all' && (
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value="fablab">FabLab</SelectItem>
                    <SelectItem value="salle">Salle</SelectItem>
                    <SelectItem value="equipement">Équipement</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Table des réservations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Réservations ({filteredReservations.length})</span>
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
                  <TableHead>Réservation</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Ressource</TableHead>
                  <TableHead>Date & Heure</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filteredReservations.map((reservation) => (
                    <motion.tr
                      key={reservation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="group hover:bg-gray-50"
                    >
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium text-gray-900">{reservation.reservationNumber}</p>
                          <p className="text-sm text-gray-600">{reservation.userName}</p>
                          <p className="text-xs text-gray-400">{reservation.userEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getTypeBadge(reservation.type)}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium text-sm">{reservation.resourceName}</p>
                          {reservation.participants && (
                            <p className="text-xs text-gray-500">{reservation.participants} participants</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">
                            {new Date(reservation.startDate).toLocaleDateString('fr-FR')}
                          </p>
                          <p className="text-xs text-gray-500">
                            {reservation.startTime} - {reservation.endTime}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(reservation.status)}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{reservation.cost.toLocaleString()} F</p>
                          <Badge 
                            className={`text-xs ${
                              reservation.paymentStatus === 'paid' 
                                ? 'bg-green-100 text-green-700' 
                                : reservation.paymentStatus === 'pending'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {reservation.paymentStatus === 'paid' ? 'Payé' : 
                             reservation.paymentStatus === 'pending' ? 'En attente' : 'Remboursé'}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedReservation(reservation);
                              setShowDetailsModal(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {reservation.status === 'pending' && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleConfirm(reservation.id)}
                                className="text-green-600 hover:text-green-700"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCancel(reservation.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
          
          {filteredReservations.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune réservation trouvée</h3>
              <p className="mt-1 text-sm text-gray-500">
                Aucune réservation ne correspond à vos critères de recherche.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de détails */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Détails de la réservation
            </DialogTitle>
            <DialogDescription>
              Informations complètes sur la réservation {selectedReservation?.reservationNumber}
            </DialogDescription>
          </DialogHeader>
          
          {selectedReservation && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Informations utilisateur</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Nom:</span> {selectedReservation.userName}</p>
                    <p><span className="font-medium">Email:</span> {selectedReservation.userEmail}</p>
                    <p><span className="font-medium">Téléphone:</span> {selectedReservation.userPhone}</p>
                    {selectedReservation.accessKey && (
                      <p><span className="font-medium">Clé d'accès:</span> {selectedReservation.accessKey}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Détails de la réservation</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Type:</span> {getTypeBadge(selectedReservation.type)}</p>
                    <p><span className="font-medium">Ressource:</span> {selectedReservation.resourceName}</p>
                    <p><span className="font-medium">Date:</span> {new Date(selectedReservation.startDate).toLocaleDateString('fr-FR')}</p>
                    <p><span className="font-medium">Horaire:</span> {selectedReservation.startTime} - {selectedReservation.endTime}</p>
                    <p><span className="font-medium">Statut:</span> {getStatusBadge(selectedReservation.status)}</p>
                    {selectedReservation.participants && (
                      <p><span className="font-medium">Participants:</span> {selectedReservation.participants}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Objectif</h3>
                <p className="text-sm text-gray-600">{selectedReservation.purpose}</p>
              </div>

              {(selectedReservation.notes || selectedReservation.adminNotes) && (
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Notes</h3>
                  {selectedReservation.notes && (
                    <div>
                      <p className="text-sm font-medium text-gray-600">Notes utilisateur:</p>
                      <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{selectedReservation.notes}</p>
                    </div>
                  )}
                  {selectedReservation.adminNotes && (
                    <div>
                      <p className="text-sm font-medium text-gray-600">Notes administratives:</p>
                      <p className="text-sm text-gray-600 bg-blue-50 p-2 rounded">{selectedReservation.adminNotes}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsModal(false)}>
              Fermer
            </Button>
            {selectedReservation?.status === 'pending' && (
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  className="text-red-600 border-red-300 hover:bg-red-50"
                  onClick={() => {
                    handleCancel(selectedReservation.id);
                    setShowDetailsModal(false);
                  }}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Annuler
                </Button>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    handleConfirm(selectedReservation.id);
                    setShowDetailsModal(false);
                  }}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Confirmer
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReservationsUnified;
