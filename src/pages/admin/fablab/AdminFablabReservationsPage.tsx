import React, { useState, useEffect } from 'react';
import { 
  DataTable,
  DeleteConfirmDialog
} from '@/components/admin';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Clock, Calendar, User, CheckCircle2, PencilIcon, TrashIcon, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// Type pour les réservations FabLab
interface FablabReservation {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  equipmentId: string;
  equipmentName: string;
  startDate: string;
  endDate: string;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled' | 'completed';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

const AdminFablabReservationsPage: React.FC = () => {
  // États pour l'UI
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalReservations, setTotalReservations] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  
  // États pour les données
  const [reservations, setReservations] = useState<FablabReservation[]>([]);
  
  // États pour les boîtes de dialogue
  const [showViewDetailsDialog, setShowViewDetailsDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  // État pour l'élément sélectionné
  const [selectedReservation, setSelectedReservation] = useState<FablabReservation | null>(null);
  
  // Toast pour les notifications
  const { toast } = useToast();

  // Données mock pour les réservations
  const mockReservations: FablabReservation[] = [
    {
      id: "res-001",
      userId: "user-123",
      userName: "Jean Dupont",
      userEmail: "jean.dupont@example.com",
      userPhone: "+123456789",
      equipmentId: "eq-001",
      equipmentName: "Imprimante 3D Ultimaker S5",
      startDate: "2025-07-01T09:00:00.000Z",
      endDate: "2025-07-01T12:00:00.000Z",
      purpose: "Impression de prototype pour projet universitaire",
      status: "approved",
      notes: "L'utilisateur a besoin d'une assistance pour les premiers 30 minutes",
      createdAt: "2025-06-25T10:15:00.000Z",
      updatedAt: "2025-06-25T14:30:00.000Z"
    },
    {
      id: "res-002",
      userId: "user-456",
      userName: "Marie Leclerc",
      userEmail: "marie.leclerc@example.com",
      userPhone: "+987654321",
      equipmentId: "eq-002",
      equipmentName: "Découpeuse laser",
      startDate: "2025-07-02T13:00:00.000Z",
      endDate: "2025-07-02T16:00:00.000Z",
      purpose: "Découpe de pièces pour projet d'art",
      status: "pending",
      createdAt: "2025-06-26T08:45:00.000Z",
      updatedAt: "2025-06-26T08:45:00.000Z"
    },
    {
      id: "res-003",
      userId: "user-789",
      userName: "Paul Martin",
      userEmail: "paul.martin@example.com",
      userPhone: "+246813579",
      equipmentId: "eq-003",
      equipmentName: "Machine CNC",
      startDate: "2025-07-03T10:00:00.000Z",
      endDate: "2025-07-03T15:00:00.000Z",
      purpose: "Usinage de pièces pour projet d'ingénierie",
      status: "completed",
      notes: "Très bonne utilisation de l'équipement",
      createdAt: "2025-06-27T11:30:00.000Z",
      updatedAt: "2025-06-27T16:20:00.000Z"
    },
    {
      id: "res-004",
      userId: "user-012",
      userName: "Sophie Dubois",
      userEmail: "sophie.dubois@example.com",
      userPhone: "+135792468",
      equipmentId: "eq-001",
      equipmentName: "Imprimante 3D Ultimaker S5",
      startDate: "2025-07-04T14:00:00.000Z",
      endDate: "2025-07-04T17:00:00.000Z",
      purpose: "Impression de figurines pour démonstration",
      status: "rejected",
      notes: "Equipement en maintenance ce jour-là",
      createdAt: "2025-06-28T09:10:00.000Z",
      updatedAt: "2025-06-28T13:45:00.000Z"
    }
  ];

  // Colonnes pour le tableau des réservations
  const reservationColumns = [
    {
      key: "userName",
      header: "Utilisateur",
      renderCell: (reservation: FablabReservation) => (
        <div className="flex flex-col">
          <span className="font-medium">{reservation.userName}</span>
          <span className="text-xs text-slate-500 mt-1">{reservation.userEmail}</span>
        </div>
      )
    },
    {
      key: "equipmentName",
      header: "Équipement",
      renderCell: (reservation: FablabReservation) => (
        <div className="flex items-center">
          <span>{reservation.equipmentName}</span>
        </div>
      )
    },
    {
      key: "date",
      header: "Date et Heure",
      renderCell: (reservation: FablabReservation) => {
        const startDate = new Date(reservation.startDate);
        const endDate = new Date(reservation.endDate);
        
        return (
          <div className="flex flex-col">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1 text-slate-400" />
              <span>{format(startDate, 'dd/MM/yyyy', { locale: fr })}</span>
            </div>
            <div className="flex items-center mt-1">
              <Clock className="w-4 h-4 mr-1 text-slate-400" />
              <span>
                {format(startDate, 'HH:mm', { locale: fr })} - {format(endDate, 'HH:mm', { locale: fr })}
              </span>
            </div>
          </div>
        );
      }
    },
    {
      key: "purpose",
      header: "Raison",
      renderCell: (reservation: FablabReservation) => (
        <div className="max-w-xs truncate" title={reservation.purpose}>
          {reservation.purpose}
        </div>
      )
    },
    {
      key: "status",
      header: "Statut",
      renderCell: (reservation: FablabReservation) => {
        const status = reservation.status;
        
        const statusConfig = {
          pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'En attente' },
          approved: { bg: 'bg-green-100', text: 'text-green-800', label: 'Approuvée' },
          rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejetée' },
          cancelled: { bg: 'bg-slate-100', text: 'text-slate-800', label: 'Annulée' },
          completed: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Terminée' }
        };
        
        const { bg, text, label } = statusConfig[status];
        
        return (
          <Badge className={`${bg} ${text}`}>
            {label}
          </Badge>
        );
      }
    },
    {
      key: "actions",
      header: "Actions",
      renderCell: (reservation: FablabReservation) => (
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleViewDetails(reservation.id)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleEditReservation(reservation.id)}
          >
            <PencilIcon className="w-4 h-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleDeleteReservation(reservation.id)}
            disabled={reservation.status === 'completed'}
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  // Gestion de l'affichage des détails
  const handleViewDetails = (id: string) => {
    const reservation = reservations.find(r => r.id === id);
    if (reservation) {
      setSelectedReservation(reservation);
      setShowViewDetailsDialog(true);
    }
  };

  // Gestion de l'édition
  const handleEditReservation = (id: string) => {
    const reservation = reservations.find(r => r.id === id);
    if (reservation) {
      setSelectedReservation(reservation);
      setShowEditDialog(true);
    }
  };

  // Gestion de la suppression
  const handleDeleteReservation = (id: string) => {
    const reservation = reservations.find(r => r.id === id);
    if (reservation) {
      setSelectedReservation(reservation);
      setShowDeleteDialog(true);
    }
  };

  // Confirmation de suppression
  const handleConfirmDelete = async () => {
    try {
      if (!selectedReservation) return Promise.resolve();
      
      // Simuler la suppression - à remplacer par un appel API
      setReservations(reservations.filter(r => r.id !== selectedReservation.id));
      
      toast({
        title: "Réservation supprimée",
        description: "La réservation a été supprimée avec succès.",
      });
      
      setShowDeleteDialog(false);
      setSelectedReservation(null);
      
      return Promise.resolve();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression.",
        variant: "destructive",
      });
      return Promise.reject(error);
    }
  };

  // Chargement simulé des données
  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      let filteredReservations = [...mockReservations];
      
      // Filtrage par recherche
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredReservations = filteredReservations.filter(r =>
          r.userName.toLowerCase().includes(query) ||
          r.userEmail.toLowerCase().includes(query) ||
          r.equipmentName.toLowerCase().includes(query) ||
          r.purpose.toLowerCase().includes(query)
        );
      }
      
      // Filtrage par statut
      if (selectedStatus) {
        filteredReservations = filteredReservations.filter(r => r.status === selectedStatus);
      }
      
      setReservations(filteredReservations);
      setTotalReservations(filteredReservations.length);
      setIsLoading(false);
    }, 500);
  }, [searchQuery, selectedStatus]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Réservations FabLab</h1>
          <p className="text-muted-foreground">
            Gérez les réservations d'équipements du FabLab
          </p>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Toutes les réservations</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={reservationColumns}
            data={reservations}
            keyField="id"
            searchPlaceholder="Rechercher une réservation..."
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
      
      {/* Dialog de confirmation de suppression */}
      <DeleteConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        title="Supprimer cette réservation ?"
        description="Cette action est définitive et ne peut pas être annulée."
      />
      
      {/* Les dialogues de détails et d'édition seront ajoutés ultérieurement */}
    </div>
  );
};

export default AdminFablabReservationsPage;
