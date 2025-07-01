import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CalendarDays,
  Clock,
  Users,
  TrendingUp,
  Filter,
  Search,
  Download,
  Settings,
  Plus,
  Edit2,
  Trash2,
  DollarSign,
  Wrench,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useApi } from '@/hooks/useApi';

// Types pour les statistiques de réservation
interface ReservationStat {
  id: string;
  userName: string;
  userEmail: string;
  machineName: string;
  reservationDate: string;
  startTime: string;
  endTime: string;
  duration: number; // en heures
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  totalCost: number;
  createdAt: string;
}

// Types pour les machines
interface Machine {
  id: string;
  name: string;
  description: string;
  category: string;
  pricePerHour: number;
  availability: boolean;
  specifications: string;
  maintenanceDate?: string;
  totalHoursUsed: number;
  imageUrl?: string;
}

const AdminReservationsStatsPage: React.FC = () => {
  const { toast } = useToast();
  const api = useApi();

  // États pour les statistiques
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [reservations, setReservations] = useState<ReservationStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // États pour la gestion des machines
  const [machines, setMachines] = useState<Machine[]>([]);
  const [machineForm, setMachineForm] = useState<Partial<Machine>>({});
  const [editingMachine, setEditingMachine] = useState<Machine | null>(null);
  const [showMachineDialog, setShowMachineDialog] = useState(false);

  // Charger les données depuis l'API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // TODO: Implémenter les appels API réels
        // const reservationsResponse = await api.get('/api/admin/reservations');
        // setReservations(reservationsResponse.data || []);
        
        // const machinesResponse = await api.get('/api/admin/machines');
        // setMachines(machinesResponse.data || []);
        
        // Pour l'instant, tableaux vides
        setReservations([]);
        setMachines([]);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        toast({
          title: "Erreur de chargement",
          description: "Impossible de charger les données. Veuillez réessayer plus tard.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Fonctions pour la gestion des machines
  const handleMachineSubmit = async () => {
    try {
      if (editingMachine) {
        // TODO: API call for update
        // await api.put(`/api/admin/machines/${editingMachine.id}`, machineForm);
        
        setMachines(machines.map(m => 
          m.id === editingMachine.id 
            ? { ...m, ...machineForm }
            : m
        ));
        
        toast({
          title: "Machine mise à jour",
          description: "La machine a été mise à jour avec succès."
        });
      } else {
        // TODO: API call for creation
        // const response = await api.post('/api/admin/machines', machineForm);
        // const newMachine = response.data;
        
        const newMachine: Machine = {
          id: `mac-${Date.now()}`,
          name: machineForm.name || '',
          description: machineForm.description || '',
          category: machineForm.category || '',
          pricePerHour: machineForm.pricePerHour || 0,
          availability: machineForm.availability ?? true,
          specifications: machineForm.specifications || '',
          totalHoursUsed: 0,
          ...machineForm
        };
        
        setMachines([...machines, newMachine]);
        
        toast({
          title: "Machine ajoutée",
          description: "La nouvelle machine a été ajoutée avec succès."
        });
      }
      
      setMachineForm({});
      setEditingMachine(null);
      setShowMachineDialog(false);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde.",
        variant: "destructive"
      });
    }
  };

  const handleEditMachine = (machine: Machine) => {
    setEditingMachine(machine);
    setMachineForm(machine);
    setShowMachineDialog(true);
  };

  const handleDeleteMachine = async (machineId: string) => {
    try {
      // TODO: API call for deletion
      // await api.delete(`/api/admin/machines/${machineId}`);
      
      setMachines(machines.filter(m => m.id !== machineId));
      
      toast({
        title: "Machine supprimée",
        description: "La machine a été supprimée avec succès."
      });
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression.",
        variant: "destructive"
      });
    }
  };

  const resetMachineForm = () => {
    setMachineForm({});
    setEditingMachine(null);
    setShowMachineDialog(false);
  };

  // Filtrer les réservations
  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = searchTerm 
      ? reservation.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.machineName.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    
    const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;
    
    // Logique de filtre par date
    const matchesDate = dateFilter === 'all' || (() => {
      const reservationDate = new Date(reservation.reservationDate);
      const today = new Date();
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
      
      switch (dateFilter) {
        case 'today':
          return reservationDate.toDateString() === today.toDateString();
        case 'week':
          return reservationDate >= weekAgo;
        case 'month':
          return reservationDate >= monthAgo;
        default:
          return true;
      }
    })();
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Générer le badge pour les statuts
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: { label: 'Confirmée', color: 'bg-blue-100 text-blue-800' },
      pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
      cancelled: { label: 'Annulée', color: 'bg-red-100 text-red-800' },
      completed: { label: 'Terminée', color: 'bg-green-100 text-green-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  // Export des données en CSV
  const exportToCSV = () => {
    const headers = ['Utilisateur', 'Email', 'Machine', 'Date', 'Début', 'Fin', 'Durée (h)', 'Statut', 'Coût (FCFA)'];
    const csvData = filteredReservations.map(r => [
      r.userName,
      r.userEmail,
      r.machineName,
      r.reservationDate,
      r.startTime,
      r.endTime,
      r.duration.toString(),
      r.status,
      r.totalCost.toString()
    ]);
    
    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `reservations_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  // Calculs des statistiques
  const totalReservations = reservations.length;
  const confirmedReservations = reservations.filter(r => r.status === 'confirmed').length;
  const totalRevenue = reservations
    .filter(r => r.status === 'completed')
    .reduce((sum, r) => sum + r.totalCost, 0);
  const totalHoursBooked = reservations.reduce((sum, r) => sum + r.duration, 0);
  const uniqueUsers = new Set(reservations.map(r => r.userEmail)).size;

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Réservations</h1>
          <p className="text-gray-600 mt-1">
            Statistiques et configuration du système de réservation
          </p>
        </div>
      </div>

      {/* Onglets */}
      <Tabs defaultValue="statistics" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="statistics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Statistiques
          </TabsTrigger>
          <TabsTrigger value="machines" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Gestion des machines
          </TabsTrigger>
        </TabsList>

        {/* Onglet Statistiques */}
        <TabsContent value="statistics" className="space-y-6">
          {/* En-tête avec export */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Statistiques des Réservations</h2>
              <p className="text-gray-600 mt-1">
                Visualisez les réservations et analysez l'utilisation du FabLab
              </p>
            </div>
            <Button onClick={exportToCSV} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exporter CSV
            </Button>
          </div>

          {/* Cartes de statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Réservations</CardTitle>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalReservations}</div>
                <p className="text-xs text-muted-foreground">
                  +{confirmedReservations} confirmées
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Heures Réservées</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalHoursBooked}h</div>
                <p className="text-xs text-muted-foreground">
                  Temps total d'utilisation
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Utilisateurs Uniques</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{uniqueUsers}</div>
                <p className="text-xs text-muted-foreground">
                  Utilisateurs différents
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenus</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalRevenue.toLocaleString()} FCFA</div>
                <p className="text-xs text-muted-foreground">
                  Réservations terminées
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filtres */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtres
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher par utilisateur, email ou machine..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrer par statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="confirmed">Confirmées</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="completed">Terminées</SelectItem>
                    <SelectItem value="cancelled">Annulées</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrer par période" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les périodes</SelectItem>
                    <SelectItem value="today">Aujourd'hui</SelectItem>
                    <SelectItem value="week">Cette semaine</SelectItem>
                    <SelectItem value="month">Ce mois</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tableau des réservations */}
          <Card>
            <CardHeader>
              <CardTitle>Liste des Réservations</CardTitle>
              <p className="text-sm text-gray-600">
                {filteredReservations.length} réservation(s) trouvée(s)
              </p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Machine</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Horaires</TableHead>
                    <TableHead>Durée</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Coût</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReservations.length > 0 ? (
                    filteredReservations.map((reservation) => (
                      <TableRow key={reservation.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{reservation.userName}</div>
                            <div className="text-sm text-gray-500">{reservation.userEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {reservation.machineName}
                        </TableCell>
                        <TableCell>
                          {new Date(reservation.reservationDate).toLocaleDateString('fr-FR')}
                        </TableCell>
                        <TableCell>
                          {reservation.startTime} - {reservation.endTime}
                        </TableCell>
                        <TableCell>
                          {reservation.duration}h
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(reservation.status)}
                        </TableCell>
                        <TableCell className="font-medium">
                          {reservation.totalCost.toLocaleString()} FCFA
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                        Aucune réservation trouvée
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Gestion des machines */}
        <TabsContent value="machines" className="space-y-6">
          {/* En-tête de section machines */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Machines et Tarifs</h2>
              <p className="text-gray-600 mt-1">
                Gérez les machines disponibles et leurs tarifs horaires
              </p>
            </div>
            <Dialog open={showMachineDialog} onOpenChange={setShowMachineDialog}>
              <DialogTrigger asChild>
                <Button onClick={() => resetMachineForm()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une machine
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingMachine ? 'Modifier la machine' : 'Ajouter une nouvelle machine'}
                  </DialogTitle>
                  <DialogDescription>
                    Remplissez les informations de la machine et définissez son tarif horaire.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom de la machine</Label>
                    <Input
                      id="name"
                      value={machineForm.name || ''}
                      onChange={(e) => setMachineForm({...machineForm, name: e.target.value})}
                      placeholder="Ex: Imprimante 3D Ender 3"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie</Label>
                    <Select 
                      value={machineForm.category || ''} 
                      onValueChange={(value) => setMachineForm({...machineForm, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="impression-3d">Impression 3D</SelectItem>
                        <SelectItem value="laser">Découpe/Gravure Laser</SelectItem>
                        <SelectItem value="electronique">Électronique</SelectItem>
                        <SelectItem value="usinage">Usinage</SelectItem>
                        <SelectItem value="autres">Autres</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pricePerHour">Prix par heure (FCFA)</Label>
                    <Input
                      id="pricePerHour"
                      type="number"
                      value={machineForm.pricePerHour || ''}
                      onChange={(e) => setMachineForm({...machineForm, pricePerHour: Number(e.target.value)})}
                      placeholder="2500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="availability">Disponibilité</Label>
                    <Select 
                      value={machineForm.availability ? 'true' : 'false'} 
                      onValueChange={(value) => setMachineForm({...machineForm, availability: value === 'true'})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Disponible</SelectItem>
                        <SelectItem value="false">Indisponible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={machineForm.description || ''}
                      onChange={(e) => setMachineForm({...machineForm, description: e.target.value})}
                      placeholder="Description détaillée de la machine..."
                      rows={3}
                    />
                  </div>
                  
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="specifications">Spécifications techniques</Label>
                    <Textarea
                      id="specifications"
                      value={machineForm.specifications || ''}
                      onChange={(e) => setMachineForm({...machineForm, specifications: e.target.value})}
                      placeholder="Volume d'impression, précision, puissance, etc."
                      rows={2}
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={resetMachineForm}>
                    Annuler
                  </Button>
                  <Button onClick={handleMachineSubmit}>
                    {editingMachine ? 'Mettre à jour' : 'Ajouter'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Liste des machines */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {machines.map((machine) => (
              <Card key={machine.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{machine.name}</CardTitle>
                      <Badge variant={machine.availability ? "default" : "secondary"} className="mt-2">
                        {machine.availability ? 'Disponible' : 'Indisponible'}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEditMachine(machine)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteMachine(machine.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">{machine.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        Tarif/heure:
                      </span>
                      <span className="font-bold text-crec-gold">
                        {machine.pricePerHour.toLocaleString()} FCFA
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Heures d'usage:
                      </span>
                      <span className="text-sm">{machine.totalHoursUsed}h</span>
                    </div>
                  </div>
                  
                  {machine.specifications && (
                    <div className="pt-2 border-t">
                      <span className="text-xs font-medium text-gray-500">Spécifications:</span>
                      <p className="text-xs text-gray-600 mt-1">{machine.specifications}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {machines.length === 0 && (
            <Card className="p-8 text-center">
              <Wrench className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune machine configurée</h3>
              <p className="text-gray-600 mb-4">
                Commencez par ajouter des machines pour permettre les réservations.
              </p>
              <Button onClick={() => setShowMachineDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter votre première machine
              </Button>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminReservationsStatsPage;