import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  CalendarDays, 
  Clock, 
  Users, 
  TrendingUp, 
  Filter,
  Search,
  Download
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

const AdminReservationsStatsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');

  // Données mockées pour les statistiques
  const reservationsStats: ReservationStat[] = [
    {
      id: 'res-001',
      userName: 'Marie Kouassi',
      userEmail: 'marie.kouassi@crec.com',
      machineName: 'Imprimante 3D Ender 3',
      reservationDate: '2025-07-15',
      startTime: '09:00',
      endTime: '12:00',
      duration: 3,
      status: 'confirmed',
      totalCost: 7500,
      createdAt: '2025-07-10T10:30:00Z'
    },
    {
      id: 'res-002',
      userName: 'Jean Baptiste',
      userEmail: 'jean.baptiste@gmail.com',
      machineName: 'Graveur Laser F50',
      reservationDate: '2025-07-20',
      startTime: '14:00',
      endTime: '16:00',
      duration: 2,
      status: 'pending',
      totalCost: 10000,
      createdAt: '2025-07-12T15:45:00Z'
    },
    {
      id: 'res-003',
      userName: 'Fatima Alou',
      userEmail: 'fatima.alou@edu.bj',
      machineName: 'Imprimante 3D Ender-5 S1',
      reservationDate: '2025-07-12',
      startTime: '10:00',
      endTime: '13:00',
      duration: 3,
      status: 'completed',
      totalCost: 10500,
      createdAt: '2025-07-08T08:20:00Z'
    },
    {
      id: 'res-004',
      userName: 'Pierre Dossou',
      userEmail: 'pierre.dossou@startup.bj',
      machineName: 'Kit Arduino et composants',
      reservationDate: '2025-07-18',
      startTime: '16:00',
      endTime: '18:00',
      duration: 2,
      status: 'cancelled',
      totalCost: 3000,
      createdAt: '2025-07-15T12:10:00Z'
    }
  ];

  // Calculs des statistiques globales
  const totalReservations = reservationsStats.length;
  const confirmedReservations = reservationsStats.filter(r => r.status === 'confirmed').length;
  const totalRevenue = reservationsStats
    .filter(r => r.status === 'completed')
    .reduce((sum, r) => sum + r.totalCost, 0);
  const totalHoursBooked = reservationsStats.reduce((sum, r) => sum + r.duration, 0);

  // Filtrage des données
  const filteredReservations = reservationsStats.filter(reservation => {
    const matchesSearch = reservation.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.machineName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;
    
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

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Statistiques des Réservations</h1>
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
            <div className="text-2xl font-bold">
              {new Set(reservationsStats.map(r => r.userEmail)).size}
            </div>
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
              {filteredReservations.map((reservation) => (
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminReservationsStatsPage;
