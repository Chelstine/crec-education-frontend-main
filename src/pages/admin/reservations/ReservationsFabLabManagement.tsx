import React, { useState, useEffect } from 'react';
import { AdminPageLayout, AdminTable, AdminForm, AdminFilters } from '../../../components/admin';
import { useFilteredData } from '../../../hooks/useAdmin';
import { 
  getBadgeColor, 
  exportToCSV, 
  formatDate,
  formatDateTime 
} from '../../../utils/adminUtils';
import { 
  Calendar,
  Clock,
  Users,
  CheckCircle,
  Settings,
  TrendingUp,
  DollarSign
} from 'lucide-react';

// Types pour les machines FabLab
interface MachineFabLab {
  id: string;
  name: string;
  type: 'imprimante-3d' | 'laser' | 'cnc' | 'electronique' | 'autre';
  model: string;
  brand: string;
  status: 'available' | 'maintenance' | 'broken' | 'reserved';
  hourlyRate: number;
  description: string;
  location: string;
  reservationsCount: number;
  totalHoursUsed: number;
  lastMaintenance: string;
  nextMaintenance: string;
  createdAt: string;
  updatedAt: string;
}

// Types pour les réservations FabLab
interface ReservationFabLab {
  id: string;
  reservationNumber: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  accessKey: string; // Clé d'accès de l'abonné
  machineId: string;
  machineName: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  duration: number; // en heures
  purpose: string;
  projectDescription?: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  totalCost: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  confirmedBy?: string;
  notes?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

const ReservationsFabLabManagement: React.FC = () => {
  const [machines, setMachines] = useState<MachineFabLab[]>([]);
  const [reservations, setReservations] = useState<ReservationFabLab[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<ReservationFabLab | null>(null);
  const [activeTab, setActiveTab] = useState<'reservations' | 'machines' | 'analytics'>('reservations');
  const [dateFilter, setDateFilter] = useState<'today' | 'week' | 'month' | 'all'>('all');

  const {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    clearFilters,
    filteredData: filteredReservations
  } = useFilteredData(reservations, ['userName', 'userEmail', 'machineName', 'purpose']);

  const {
    searchTerm: machineSearchTerm,
    setSearchTerm: setMachineSearchTerm,
    filteredData: filteredMachines
  } = useFilteredData(machines, ['name', 'type', 'brand', 'location']);

  // Mock data pour les machines
  const mockMachines: MachineFabLab[] = [
    {
      id: '1',
      name: 'Imprimante 3D Ender 3 Pro',
      type: 'imprimante-3d',
      model: 'Ender 3 Pro',
      brand: 'Creality',
      status: 'available',
      hourlyRate: 2000,
      description: 'Imprimante 3D FDM haute précision',
      location: 'Zone Impression 3D - Poste A1',
      reservationsCount: 45,
      totalHoursUsed: 234,
      lastMaintenance: '2024-12-01',
      nextMaintenance: '2025-01-01',
      createdAt: '2024-01-15',
      updatedAt: '2024-12-20'
    },
    {
      id: '2',
      name: 'Découpeuse Laser CO2',
      type: 'laser',
      model: 'K40',
      brand: 'Generic',
      status: 'maintenance',
      hourlyRate: 5000,
      description: 'Découpeuse et graveuse laser CO2',
      location: 'Zone Laser - Cabine sécurisée',
      reservationsCount: 28,
      totalHoursUsed: 156,
      lastMaintenance: '2024-12-20',
      nextMaintenance: '2025-01-20',
      createdAt: '2024-03-10',
      updatedAt: '2024-12-20'
    },
    {
      id: '3',
      name: 'Fraiseuse CNC Mini',
      type: 'cnc',
      model: 'CNC 3018',
      brand: 'SainSmart',
      status: 'available',
      hourlyRate: 3500,
      description: 'Fraiseuse CNC compacte',
      location: 'Zone Usinage - Poste B2',
      reservationsCount: 32,
      totalHoursUsed: 187,
      lastMaintenance: '2024-11-15',
      nextMaintenance: '2024-12-15',
      createdAt: '2024-02-20',
      updatedAt: '2024-12-18'
    }
  ];

  // Mock data pour les réservations
  const mockReservations: ReservationFabLab[] = [
    {
      id: '1',
      reservationNumber: 'FAB-RES-001',
      userId: 'FAB002',
      userName: 'AYIVI Marie',
      userEmail: 'marie.ayivi@email.com',
      userPhone: '+228 91 23 45 67',
      accessKey: 'CREC-FAB-002-2024',
      machineId: '2',
      machineName: 'Découpeuse Laser CO2',
      startDate: '2024-12-23',
      endDate: '2024-12-23',
      startTime: '09:00',
      endTime: '12:00',
      duration: 3,
      purpose: 'Découpe de prototypes pour projet design',
      projectDescription: 'Création de maquettes architecturales en contreplaqué',
      status: 'confirmed',
      totalCost: 15000,
      paymentStatus: 'paid',
      confirmedBy: 'Admin FabLab',
      notes: 'Matériaux fournis par le client',
      createdAt: '2024-12-20',
      updatedAt: '2024-12-22'
    },
    {
      id: '2',
      reservationNumber: 'FAB-RES-002',
      userId: 'FAB001',
      userName: 'KODJO Emmanuel',
      userEmail: 'e.kodjo@email.com',
      userPhone: '+228 90 12 34 56',
      accessKey: 'CREC-FAB-001-2024',
      machineId: '1',
      machineName: 'Imprimante 3D Ender 3 Pro',
      startDate: '2024-12-24',
      endDate: '2024-12-24',
      startTime: '14:00',
      endTime: '18:00',
      duration: 4,
      purpose: 'Impression de pièces pour projet IoT',
      projectDescription: 'Boîtiers pour capteurs environnementaux',
      status: 'pending',
      totalCost: 8000,
      paymentStatus: 'pending',
      notes: 'Première utilisation - besoin d\'assistance',
      createdAt: '2024-12-21',
      updatedAt: '2024-12-21'
    },
    {
      id: '3',
      reservationNumber: 'FAB-RES-003',
      userId: 'FAB002',
      userName: 'AYIVI Marie',
      userEmail: 'marie.ayivi@email.com',
      userPhone: '+228 91 23 45 67',
      accessKey: 'CREC-FAB-002-2024',
      machineId: '3',
      machineName: 'Fraiseuse CNC Mini',
      startDate: '2024-12-19',
      endDate: '2024-12-19',
      startTime: '10:00',
      endTime: '13:00',
      duration: 3,
      purpose: 'Usinage de pièces mécaniques',
      projectDescription: 'Engrenages pour maquette mobile',
      status: 'completed',
      totalCost: 10500,
      paymentStatus: 'paid',
      confirmedBy: 'Admin FabLab',
      adminNotes: 'Travail de qualité, utilisatrice expérimentée',
      createdAt: '2024-12-15',
      updatedAt: '2024-12-19'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setMachines(mockMachines);
      setReservations(mockReservations);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Statistiques des réservations
  const reservationStats = [
    {
      title: 'Total Réservations',
      value: reservations.length,
      icon: Calendar,
      color: 'text-blue-600',
      description: 'Ce mois'
    },
    {
      title: 'En Attente',
      value: reservations.filter(r => r.status === 'pending').length,
      icon: Clock,
      color: 'text-orange-600',
      description: 'À confirmer'
    },
    {
      title: 'Confirmées Aujourd\'hui',
      value: reservations.filter(r => 
        r.status === 'confirmed' && 
        new Date(r.startDate).toDateString() === new Date().toDateString()
      ).length,
      icon: CheckCircle,
      color: 'text-green-600',
      description: 'Aujourd\'hui'
    },
    {
      title: 'Revenus Générés',
      value: reservations
        .filter(r => r.paymentStatus === 'paid')
        .reduce((sum, r) => sum + r.totalCost, 0),
      icon: DollarSign,
      color: 'text-purple-600',
      description: 'FCFA ce mois',
      format: 'currency'
    }
  ];

  // Statistiques des machines
  const machineStats = [
    {
      title: 'Total Machines',
      value: machines.length,
      icon: Settings,
      color: 'text-blue-600',
      description: 'Équipements'
    },
    {
      title: 'Disponibles',
      value: machines.filter(m => m.status === 'available').length,
      icon: CheckCircle,
      color: 'text-green-600',
      description: 'Prêtes à utiliser'
    },
    {
      title: 'Total Heures Utilisées',
      value: machines.reduce((sum, m) => sum + m.totalHoursUsed, 0),
      icon: Clock,
      color: 'text-orange-600',
      description: 'Ce mois'
    },
    {
      title: 'Taux d\'Utilisation',
      value: Math.round((machines.reduce((sum, m) => sum + m.reservationsCount, 0) / machines.length) * 100) / 100,
      icon: TrendingUp,
      color: 'text-purple-600',
      description: 'Réservations/machine'
    }
  ];

  // Configuration des filtres pour réservations
  const reservationFilterConfigs = [
    {
      key: 'status',
      label: 'Statut',
      placeholder: 'Filtrer par statut',
      options: [
        { value: 'pending', label: 'En attente' },
        { value: 'confirmed', label: 'Confirmée' },
        { value: 'in-progress', label: 'En cours' },
        { value: 'completed', label: 'Terminée' },
        { value: 'cancelled', label: 'Annulée' },
        { value: 'no-show', label: 'Absence' }
      ]
    },
    {
      key: 'machineName',
      label: 'Machine',
      placeholder: 'Filtrer par machine',
      options: machines.map(m => ({ value: m.name, label: m.name }))
    },
    {
      key: 'paymentStatus',
      label: 'Paiement',
      placeholder: 'Filtrer par paiement',
      options: [
        { value: 'pending', label: 'En attente' },
        { value: 'paid', label: 'Payé' },
        { value: 'refunded', label: 'Remboursé' }
      ]
    }
  ];

  // Configuration des colonnes pour réservations
  const reservationColumns = [
    { 
      key: 'reservationNumber', 
      label: 'N° Réservation',
      render: (value: string, item: ReservationFabLab) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{item.accessKey}</div>
        </div>
      )
    },
    {
      key: 'userName',
      label: 'Utilisateur',
      render: (value: string, item: ReservationFabLab) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{item.userEmail}</div>
        </div>
      )
    },
    { key: 'machineName', label: 'Machine' },
    {
      key: 'startDate',
      label: 'Date & Heure',
      render: (value: string, item: ReservationFabLab) => (
        <div>
          <div className="font-medium">{formatDate(value)}</div>
          <div className="text-sm text-muted-foreground">
            {item.startTime} - {item.endTime} ({item.duration}h)
          </div>
        </div>
      )
    },
    {
      key: 'totalCost',
      label: 'Coût',
      render: (value: number) => `${value.toLocaleString()} FCFA`
    },
    { key: 'paymentStatus', label: 'Paiement', type: 'badge' as const, badgeType: 'status' as const },
    { key: 'status', label: 'Statut', type: 'badge' as const, badgeType: 'status' as const },
    { key: 'actions', label: 'Actions', type: 'actions' as const }
  ];

  // Configuration des colonnes pour machines
  const machineColumns = [
    { key: 'name', label: 'Nom' },
    { key: 'type', label: 'Type', type: 'badge' as const, badgeType: 'category' as const },
    { 
      key: 'hourlyRate', 
      label: 'Tarif/h', 
      render: (value: number) => `${value.toLocaleString()} FCFA`
    },
    { key: 'location', label: 'Emplacement' },
    { 
      key: 'reservationsCount', 
      label: 'Réservations', 
      render: (value: number) => `${value} fois`
    },
    { 
      key: 'totalHoursUsed', 
      label: 'Heures utilisées', 
      render: (value: number) => `${value}h`
    },
    { key: 'status', label: 'Statut', type: 'badge' as const, badgeType: 'status' as const },
    { key: 'actions', label: 'Actions', type: 'actions' as const }
  ];

  // Actions personnalisées pour réservations
  const reservationCustomActions = [
    {
      label: 'Confirmer',
      onClick: (reservation: ReservationFabLab) => {
        setReservations(prev => 
          prev.map(r => r.id === reservation.id ? { 
            ...r, 
            status: 'confirmed', 
            confirmedBy: 'Admin FabLab',
            updatedAt: new Date().toISOString()
          } : r)
        );
      },
      variant: 'default' as const,
      icon: CheckCircle,
      condition: (item: ReservationFabLab) => item.status === 'pending'
    },
    {
      label: 'Marquer Terminé',
      onClick: (reservation: ReservationFabLab) => {
        setReservations(prev => 
          prev.map(r => r.id === reservation.id ? { 
            ...r, 
            status: 'completed',
            updatedAt: new Date().toISOString()
          } : r)
        );
      },
      variant: 'outline' as const,
      icon: CheckCircle,
      condition: (item: ReservationFabLab) => item.status === 'confirmed' || item.status === 'in-progress'
    }
  ];

  // Gestionnaires d'événements
  const handleAddReservation = () => {
    setSelectedReservation(null);
    setIsFormOpen(true);
  };

  const handleEditReservation = (reservation: ReservationFabLab) => {
    setSelectedReservation(reservation);
    setIsFormOpen(true);
  };

  const handleDeleteReservation = (reservation: ReservationFabLab) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
      setReservations(prev => prev.filter(r => r.id !== reservation.id));
    }
  };

  const handleViewReservation = (reservation: ReservationFabLab) => {
    console.log('Voir réservation:', reservation);
  };

  const handleExportReservations = () => {
    const exportData = filteredReservations.map(reservation => ({
      'N° Réservation': reservation.reservationNumber,
      'Utilisateur': reservation.userName,
      'Email': reservation.userEmail,
      'Téléphone': reservation.userPhone,
      'Machine': reservation.machineName,
      'Date': formatDate(reservation.startDate),
      'Heure début': reservation.startTime,
      'Heure fin': reservation.endTime,
      'Durée (h)': reservation.duration,
      'Objectif': reservation.purpose,
      'Coût (FCFA)': reservation.totalCost,
      'Statut Paiement': reservation.paymentStatus,
      'Statut': reservation.status
    }));
    
    exportToCSV(
      exportData, 
      'reservations-fablab-' + new Date().toISOString().split('T')[0], 
      Object.keys(exportData[0] || {})
    );
  };

  const handleExportMachines = () => {
    const exportData = filteredMachines.map(machine => ({
      'Nom': machine.name,
      'Type': machine.type,
      'Marque': machine.brand,
      'Modèle': machine.model,
      'Tarif/h (FCFA)': machine.hourlyRate,
      'Emplacement': machine.location,
      'Réservations': machine.reservationsCount,
      'Heures utilisées': machine.totalHoursUsed,
      'Statut': machine.status,
      'Dernière maintenance': formatDate(machine.lastMaintenance)
    }));
    
    exportToCSV(
      exportData, 
      'machines-fablab-' + new Date().toISOString().split('T')[0], 
      Object.keys(exportData[0] || {})
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const currentStats = activeTab === 'reservations' ? reservationStats : machineStats;
  const currentSearchTerm = activeTab === 'reservations' ? searchTerm : machineSearchTerm;
  const currentSetSearchTerm = activeTab === 'reservations' ? setSearchTerm : setMachineSearchTerm;
  const currentData = activeTab === 'reservations' ? filteredReservations : filteredMachines;
  const currentColumns = activeTab === 'reservations' ? reservationColumns : machineColumns;
  const currentExport = activeTab === 'reservations' ? handleExportReservations : handleExportMachines;

  return (
    <div className="px-1 sm:px-2 md:px-4 lg:px-8 w-full">
      <AdminPageLayout
        title="Gestion Réservations FabLab"
        description="Gérez les réservations de machines et l'utilisation du FabLab"
        stats={currentStats}
        searchTerm={currentSearchTerm}
        onSearchChange={currentSetSearchTerm}
        onAdd={activeTab === 'reservations' ? handleAddReservation : undefined}
        onExport={currentExport}
        filters={
          activeTab === 'reservations' ? (
            <div className="w-full md:w-auto px-2 md:px-0">
              <AdminFilters
                filters={reservationFilterConfigs}
                activeFilters={filters}
                onFilterChange={updateFilter}
                onClearFilters={clearFilters}
              />
            </div>
          ) : undefined
        }
        tabs={[
          { id: 'reservations', label: 'Réservations', count: reservations.length },
          { id: 'machines', label: 'Machines', count: machines.length },
          { id: 'analytics', label: 'Analytics', count: 0 }
        ]}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as 'reservations' | 'machines' | 'analytics')}
      >
        {activeTab === 'analytics' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {/* Graphiques et analytics ici */}
              <div className="col-span-full text-center py-8 md:py-12">
                <TrendingUp className="h-10 w-10 md:h-12 md:w-12 text-gray-400 mx-auto mb-3 md:mb-4" />
                <h3 className="text-base md:text-lg font-medium text-gray-900 mb-1 md:mb-2">Analytics à venir</h3>
                <p className="text-xs md:text-sm text-gray-500">Les graphiques et analyses détaillées seront disponibles prochainement.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full overflow-x-auto rounded-md bg-white dark:bg-gray-900 shadow-sm">
            <div className="min-w-[600px] text-xs md:text-sm">
              <AdminTable
                columns={currentColumns}
                data={currentData}
                onEdit={activeTab === 'reservations' ? handleEditReservation : undefined}
                onDelete={activeTab === 'reservations' ? handleDeleteReservation : undefined}
                onView={activeTab === 'reservations' ? handleViewReservation : undefined}
                customActions={activeTab === 'reservations' ? reservationCustomActions : undefined}
              />
            </div>
          </div>
        )}

        {/* Formulaire pour réservations (si nécessaire) */}
        {isFormOpen && selectedReservation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2 md:px-0">
            <div className="w-full max-w-md text-xs md:text-sm">
              <AdminForm
                title="Détails de la réservation"
                description="Consultez et modifiez les détails de la réservation"
                fields={[]}
                data={selectedReservation}
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={() => setIsFormOpen(false)}
                isLoading={loading}
              />
            </div>
          </div>
        )}
      </AdminPageLayout>
    </div>
  );
};

export default ReservationsFabLabManagement;
