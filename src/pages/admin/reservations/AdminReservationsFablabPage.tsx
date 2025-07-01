import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  PencilIcon, 
  TrashIcon, 
  Download,
  Eye,
  Calendar,
  Clock,
  Settings,
  Euro,
  Users,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { 
  DataTable,
  DeleteConfirmDialog,
  FormDialog,
  InfoPanel
} from '../../../components/admin';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Textarea } from '../../../components/ui/textarea';
import { useApi } from '../../../hooks/useApi';
import { useToast } from '../../../hooks/use-toast';
import { handleApiError } from '@/services/apiServices';

// Interface pour les réservations
interface FablabReservation {
  id: string;
  userName: string;
  userEmail: string;
  machineId: string;
  machineName: string;
  startTime: string;
  endTime: string;
  duration: number; // en heures
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  purpose: string;
  totalCost: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  accessKey?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Interface pour les machines
interface FablabMachine {
  id: string;
  name: string;
  type: string;
  description: string;
  hourlyRate: number;
  status: 'available' | 'maintenance' | 'out_of_order';
  location: string;
  maxBookingHours: number;
  requiresTraining: boolean;
  image?: string;
  specifications: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

// Interface pour les tarifs
interface PricingRule {
  id: string;
  name: string;
  description: string;
  machineTypes: string[];
  userTypes: string[];
  discountPercentage: number;
  minimumHours?: number;
  maximumHours?: number;
  timeSlots?: string[];
  active: boolean;
  createdAt: string;
}

// Configuration des statuts
const RESERVATION_STATUS = [
  { value: 'pending', label: 'En attente', color: 'bg-amber-100 text-amber-800 border-amber-300' },
  { value: 'confirmed', label: 'Confirmée', color: 'bg-blue-100 text-blue-800 border-blue-300' },
  { value: 'in_progress', label: 'En cours', color: 'bg-green-100 text-green-800 border-green-300' },
  { value: 'completed', label: 'Terminée', color: 'bg-slate-100 text-slate-800 border-slate-300' },
  { value: 'cancelled', label: 'Annulée', color: 'bg-red-100 text-red-800 border-red-300' },
  { value: 'no_show', label: 'Absent', color: 'bg-orange-100 text-orange-800 border-orange-300' }
];

const PAYMENT_STATUS = [
  { value: 'pending', label: 'En attente', color: 'bg-amber-100 text-amber-800' },
  { value: 'paid', label: 'Payé', color: 'bg-green-100 text-green-800' },
  { value: 'refunded', label: 'Remboursé', color: 'bg-blue-100 text-blue-800' }
];

const MACHINE_STATUS = [
  { value: 'available', label: 'Disponible', color: 'bg-green-100 text-green-800' },
  { value: 'maintenance', label: 'Maintenance', color: 'bg-amber-100 text-amber-800' },
  { value: 'out_of_order', label: 'Hors service', color: 'bg-red-100 text-red-800' }
];

const AdminReservationsFablabPage: React.FC = () => {
  const { toast } = useToast();
  
  // État pour les réservations
  const [reservations, setReservations] = useState<FablabReservation[]>([]);
  const [isLoadingReservations, setIsLoadingReservations] = useState(true);
  
  // État pour les machines
  const [machines, setMachines] = useState<FablabMachine[]>([]);
  const [isLoadingMachines, setIsLoadingMachines] = useState(true);
  
  // État pour les tarifs
  const [pricingRules, setPricingRules] = useState<PricingRule[]>([]);
  const [isLoadingPricing, setIsLoadingPricing] = useState(true);
  
  // État pour les dialogues
  const [isReservationDialogOpen, setIsReservationDialogOpen] = useState(false);
  const [isMachineDialogOpen, setIsMachineDialogOpen] = useState(false);
  const [isPricingDialogOpen, setIsPricingDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  
  const [currentReservation, setCurrentReservation] = useState<FablabReservation | null>(null);
  const [currentMachine, setCurrentMachine] = useState<FablabMachine | null>(null);
  const [currentPricing, setCurrentPricing] = useState<PricingRule | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<'reservation' | 'machine' | 'pricing'>('reservation');
  
  const [activeTab, setActiveTab] = useState('reservations');
  const [statusFilter, setStatusFilter] = useState('all');

  // Colonnes pour les réservations
  const reservationColumns = [
    { 
      key: 'user', 
      header: 'Utilisateur',
      renderCell: (reservation: FablabReservation) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-medium">
            {reservation.userName.split(' ').map(n => n.charAt(0)).join('')}
          </div>
          <div>
            <p className="font-medium">{reservation.userName}</p>
            <p className="text-xs text-slate-500">{reservation.userEmail}</p>
          </div>
        </div>
      )
    },
    { 
      key: 'machine', 
      header: 'Machine',
      renderCell: (reservation: FablabReservation) => (
        <div className="flex items-center gap-2">
          <span className="material-icons-outlined text-slate-500" style={{ fontSize: '1.25rem' }}>
            build
          </span>
          <span>{reservation.machineName}</span>
        </div>
      )
    },
    { 
      key: 'schedule', 
      header: 'Horaires',
      renderCell: (reservation: FablabReservation) => (
        <div className="text-sm">
          <p className="font-medium">
            {new Date(reservation.startTime).toLocaleDateString('fr-FR')}
          </p>
          <p className="text-slate-500">
            {new Date(reservation.startTime).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} - 
            {new Date(reservation.endTime).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
          </p>
          <p className="text-xs text-slate-400">{reservation.duration}h</p>
        </div>
      )
    },
    { 
      key: 'status', 
      header: 'Statut',
      renderCell: (reservation: FablabReservation) => {
        const statusConfig = RESERVATION_STATUS.find(s => s.value === reservation.status);
        const paymentConfig = PAYMENT_STATUS.find(p => p.value === reservation.paymentStatus);
        return (
          <div className="space-y-1">
            <Badge variant="outline" className={statusConfig?.color}>
              {statusConfig?.label}
            </Badge>
            <Badge variant="outline" className={paymentConfig?.color + ' text-xs'}>
              {paymentConfig?.label}
            </Badge>
          </div>
        );
      }
    },
    { 
      key: 'cost', 
      header: 'Coût',
      renderCell: (reservation: FablabReservation) => (
        <span className="font-medium">
          {reservation.totalCost.toLocaleString()} FCFA
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      renderCell: (reservation: FablabReservation) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleViewReservation(reservation)}
            className="h-8 w-8 p-0"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEditReservation(reservation)}
            className="h-8 w-8 p-0"
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDeleteReservation(reservation)}
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  // Colonnes pour les machines
  const machineColumns = [
    { 
      key: 'name', 
      header: 'Machine',
      renderCell: (machine: FablabMachine) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
            <span className="material-icons-outlined" style={{ fontSize: '1.25rem' }}>
              build
            </span>
          </div>
          <div>
            <p className="font-medium">{machine.name}</p>
            <p className="text-xs text-slate-500">{machine.type}</p>
          </div>
        </div>
      )
    },
    { 
      key: 'hourlyRate', 
      header: 'Tarif/heure',
      renderCell: (machine: FablabMachine) => (
        <span className="font-medium">
          {machine.hourlyRate.toLocaleString()} FCFA
        </span>
      )
    },
    { 
      key: 'status', 
      header: 'Statut',
      renderCell: (machine: FablabMachine) => {
        const statusConfig = MACHINE_STATUS.find(s => s.value === machine.status);
        return (
          <Badge variant="outline" className={statusConfig?.color}>
            {statusConfig?.label}
          </Badge>
        );
      }
    },
    { 
      key: 'location', 
      header: 'Emplacement',
      renderCell: (machine: FablabMachine) => (
        <span className="text-slate-600">{machine.location}</span>
      )
    },
    { 
      key: 'maxBookingHours', 
      header: 'Max heures',
      renderCell: (machine: FablabMachine) => (
        <span className="text-slate-600">{machine.maxBookingHours}h</span>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      renderCell: (machine: FablabMachine) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEditMachine(machine)}
            className="h-8 w-8 p-0"
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDeleteMachine(machine)}
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  // Colonnes pour les tarifs
  const pricingColumns = [
    { 
      key: 'name', 
      header: 'Règle de tarification',
      renderCell: (rule: PricingRule) => (
        <div>
          <p className="font-medium">{rule.name}</p>
          <p className="text-xs text-slate-500">{rule.description}</p>
        </div>
      )
    },
    { 
      key: 'discountPercentage', 
      header: 'Remise',
      renderCell: (rule: PricingRule) => (
        <span className="font-medium text-green-600">
          -{rule.discountPercentage}%
        </span>
      )
    },
    { 
      key: 'machineTypes', 
      header: 'Types de machines',
      renderCell: (rule: PricingRule) => (
        <div className="flex flex-wrap gap-1">
          {rule.machineTypes.slice(0, 2).map((type, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {type}
            </Badge>
          ))}
          {rule.machineTypes.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{rule.machineTypes.length - 2}
            </Badge>
          )}
        </div>
      )
    },
    { 
      key: 'active', 
      header: 'Statut',
      renderCell: (rule: PricingRule) => (
        <Badge variant={rule.active ? "default" : "secondary"}>
          {rule.active ? 'Actif' : 'Inactif'}
        </Badge>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      renderCell: (rule: PricingRule) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEditPricing(rule)}
            className="h-8 w-8 p-0"
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDeletePricing(rule)}
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  // Chargement des données
  const loadReservations = async () => {
    try {
      setIsLoadingReservations(true);
      
      // Données simulées
      setTimeout(() => {
        const mockReservations: FablabReservation[] = [
          {
            id: '1',
            userName: 'Jean Dupont',
            userEmail: 'jean.dupont@example.com',
            machineId: '1',
            machineName: 'Imprimante 3D Prusa',
            startTime: '2024-01-20T09:00:00Z',
            endTime: '2024-01-20T12:00:00Z',
            duration: 3,
            status: 'confirmed',
            purpose: 'Impression de prototypes pour projet personnel',
            totalCost: 15000,
            paymentStatus: 'paid',
            accessKey: 'FL2024001',
            createdAt: '2024-01-15T10:30:00Z',
            updatedAt: '2024-01-16T09:00:00Z'
          },
          {
            id: '2',
            userName: 'Marie Martin',
            userEmail: 'marie.martin@example.com',
            machineId: '2',
            machineName: 'Découpeuse laser CO2',
            startTime: '2024-01-22T14:00:00Z',
            endTime: '2024-01-22T16:00:00Z',
            duration: 2,
            status: 'pending',
            purpose: 'Découpe de matériaux pour projet artistique',
            totalCost: 20000,
            paymentStatus: 'pending',
            createdAt: '2024-01-18T15:45:00Z',
            updatedAt: '2024-01-18T15:45:00Z'
          },
          {
            id: '3',
            userName: 'Pierre Kouassi',
            userEmail: 'pierre.kouassi@example.com',
            machineId: '3',
            machineName: 'Fraiseuse CNC',
            startTime: '2024-01-19T10:00:00Z',
            endTime: '2024-01-19T15:00:00Z',
            duration: 5,
            status: 'completed',
            purpose: 'Usinage de pièces métalliques',
            totalCost: 75000,
            paymentStatus: 'paid',
            accessKey: 'FL2024003',
            notes: 'Session terminée avec succès',
            createdAt: '2024-01-12T08:20:00Z',
            updatedAt: '2024-01-19T15:30:00Z'
          }
        ];
        
        let filteredReservations = mockReservations;
        if (statusFilter !== 'all') {
          filteredReservations = filteredReservations.filter(r => r.status === statusFilter);
        }
        
        setReservations(filteredReservations);
        setIsLoadingReservations(false);
      }, 800);
    } catch (error) {
      handleApiError(error);
      setIsLoadingReservations(false);
    }
  };

  const loadMachines = async () => {
    try {
      setIsLoadingMachines(true);
      
      // Données simulées
      setTimeout(() => {
        const mockMachines: FablabMachine[] = [
          {
            id: '1',
            name: 'Imprimante 3D Prusa i3 MK3S+',
            type: 'Imprimante 3D',
            description: 'Imprimante 3D FDM haute précision pour prototypage rapide',
            hourlyRate: 5000,
            status: 'available',
            location: 'Zone A - Poste 1',
            maxBookingHours: 8,
            requiresTraining: true,
            specifications: {
              'Volume d\'impression': '250×210×200 mm',
              'Précision': '±0.1 mm',
              'Matériaux': 'PLA, PETG, ABS, ASA'
            },
            createdAt: '2023-06-01T00:00:00Z',
            updatedAt: '2024-01-10T00:00:00Z'
          },
          {
            id: '2',
            name: 'Découpeuse laser CO2',
            type: 'Découpeuse laser',
            description: 'Découpeuse laser CO2 pour matériaux non-métalliques',
            hourlyRate: 10000,
            status: 'available',
            location: 'Zone B - Poste 1',
            maxBookingHours: 4,
            requiresTraining: true,
            specifications: {
              'Puissance': '60W',
              'Surface de travail': '600×400 mm',
              'Matériaux': 'Bois, acrylique, carton, cuir'
            },
            createdAt: '2023-06-01T00:00:00Z',
            updatedAt: '2024-01-05T00:00:00Z'
          },
          {
            id: '3',
            name: 'Fraiseuse CNC',
            type: 'Fraiseuse CNC',
            description: 'Fraiseuse CNC 3 axes pour usinage précis',
            hourlyRate: 15000,
            status: 'maintenance',
            location: 'Zone C - Poste 1',
            maxBookingHours: 6,
            requiresTraining: true,
            specifications: {
              'Axes': '3 axes (X, Y, Z)',
              'Course': '300×200×100 mm',
              'Précision': '±0.05 mm',
              'Matériaux': 'Aluminium, bois, plastique'
            },
            createdAt: '2023-08-15T00:00:00Z',
            updatedAt: '2024-01-18T00:00:00Z'
          }
        ];
        
        setMachines(mockMachines);
        setIsLoadingMachines(false);
      }, 600);
    } catch (error) {
      handleApiError(error);
      setIsLoadingMachines(false);
    }
  };

  const loadPricingRules = async () => {
    try {
      setIsLoadingPricing(true);
      
      // Données simulées
      setTimeout(() => {
        const mockPricingRules: PricingRule[] = [
          {
            id: '1',
            name: 'Remise étudiants',
            description: 'Remise pour les étudiants avec carte valide',
            machineTypes: ['Imprimante 3D', 'Découpeuse laser'],
            userTypes: ['student'],
            discountPercentage: 30,
            active: true,
            createdAt: '2023-09-01T00:00:00Z'
          },
          {
            id: '2',
            name: 'Tarif de groupe',
            description: 'Remise pour les réservations de plus de 4 heures',
            machineTypes: ['Fraiseuse CNC', 'Découpeuse laser'],
            userTypes: ['member', 'student', 'external'],
            discountPercentage: 15,
            minimumHours: 4,
            active: true,
            createdAt: '2023-09-15T00:00:00Z'
          },
          {
            id: '3',
            name: 'Heures creuses',
            description: 'Tarif réduit en heures creuses (18h-8h)',
            machineTypes: ['Imprimante 3D'],
            userTypes: ['member', 'external'],
            discountPercentage: 20,
            timeSlots: ['18:00-08:00'],
            active: false,
            createdAt: '2023-10-01T00:00:00Z'
          }
        ];
        
        setPricingRules(mockPricingRules);
        setIsLoadingPricing(false);
      }, 400);
    } catch (error) {
      handleApiError(error);
      setIsLoadingPricing(false);
    }
  };

  useEffect(() => {
    loadReservations();
    loadMachines();
    loadPricingRules();
  }, [statusFilter]);

  // Gestionnaires d'événements
  const handleViewReservation = (reservation: FablabReservation) => {
    setCurrentReservation(reservation);
    setIsViewDialogOpen(true);
  };

  const handleEditReservation = (reservation: FablabReservation) => {
    setCurrentReservation(reservation);
    setIsReservationDialogOpen(true);
  };

  const handleDeleteReservation = (reservation: FablabReservation) => {
    setCurrentReservation(reservation);
    setDeleteTarget('reservation');
    setIsDeleteDialogOpen(true);
  };

  const handleEditMachine = (machine: FablabMachine) => {
    setCurrentMachine(machine);
    setIsMachineDialogOpen(true);
  };

  const handleDeleteMachine = (machine: FablabMachine) => {
    setCurrentMachine(machine);
    setDeleteTarget('machine');
    setIsDeleteDialogOpen(true);
  };

  const handleEditPricing = (pricing: PricingRule) => {
    setCurrentPricing(pricing);
    setIsPricingDialogOpen(true);
  };

  const handleDeletePricing = (pricing: PricingRule) => {
    setCurrentPricing(pricing);
    setDeleteTarget('pricing');
    setIsDeleteDialogOpen(true);
  };

  // Statistiques
  const stats = [
    {
      title: "Réservations actives",
      value: reservations.filter(r => ['confirmed', 'in_progress'].includes(r.status)).length,
      icon: <Calendar className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-100"
    },
    {
      title: "Machines disponibles",
      value: machines.filter(m => m.status === 'available').length,
      icon: <span className="material-icons-outlined h-5 w-5 text-green-600">build</span>,
      color: "bg-green-100"
    },
    {
      title: "Revenus du mois",
      value: reservations.filter(r => r.paymentStatus === 'paid').reduce((sum, r) => sum + r.totalCost, 0).toLocaleString() + ' FCFA',
      icon: <Euro className="h-5 w-5 text-purple-600" />,
      color: "bg-purple-100"
    },
    {
      title: "Taux d'occupation",
      value: "78%",
      icon: <Users className="h-5 w-5 text-amber-600" />,
      color: "bg-amber-100"
    }
  ];

  // Affichage détaillé d'une réservation
  const renderReservationDetails = () => {
    if (!currentReservation) return null;

    return (
      <div className="space-y-6">
        {/* Informations utilisateur */}
        <div className="space-y-4">
          <h3 className="font-medium text-slate-900">Informations utilisateur</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <Label className="text-slate-500">Nom</Label>
              <p className="font-medium">{currentReservation.userName}</p>
            </div>
            <div>
              <Label className="text-slate-500">Email</Label>
              <p>{currentReservation.userEmail}</p>
            </div>
          </div>
        </div>

        {/* Détails de la réservation */}
        <div className="space-y-4">
          <h3 className="font-medium text-slate-900">Détails de la réservation</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <Label className="text-slate-500">Machine</Label>
              <p className="font-medium">{currentReservation.machineName}</p>
            </div>
            <div>
              <Label className="text-slate-500">Durée</Label>
              <p>{currentReservation.duration} heure{currentReservation.duration > 1 ? 's' : ''}</p>
            </div>
            <div>
              <Label className="text-slate-500">Date et heure de début</Label>
              <p>{new Date(currentReservation.startTime).toLocaleString('fr-FR')}</p>
            </div>
            <div>
              <Label className="text-slate-500">Date et heure de fin</Label>
              <p>{new Date(currentReservation.endTime).toLocaleString('fr-FR')}</p>
            </div>
            <div className="col-span-2">
              <Label className="text-slate-500">Objectif</Label>
              <p className="mt-1 p-3 bg-slate-50 rounded">{currentReservation.purpose}</p>
            </div>
          </div>
        </div>

        {/* Informations financières */}
        <div className="space-y-4">
          <h3 className="font-medium text-slate-900">Informations financières</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <Label className="text-slate-500">Coût total</Label>
              <p className="font-medium text-lg">{currentReservation.totalCost.toLocaleString()} FCFA</p>
            </div>
            <div>
              <Label className="text-slate-500">Statut de paiement</Label>
              <div className="mt-1">
                <Badge className={PAYMENT_STATUS.find(p => p.value === currentReservation.paymentStatus)?.color}>
                  {PAYMENT_STATUS.find(p => p.value === currentReservation.paymentStatus)?.label}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Statut et accès */}
        <div className="space-y-4">
          <h3 className="font-medium text-slate-900">Statut et accès</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <Label className="text-slate-500">Statut de la réservation</Label>
              <div className="mt-1">
                <Badge className={RESERVATION_STATUS.find(s => s.value === currentReservation.status)?.color}>
                  {RESERVATION_STATUS.find(s => s.value === currentReservation.status)?.label}
                </Badge>
              </div>
            </div>
            {currentReservation.accessKey && (
              <div>
                <Label className="text-slate-500">Clé d'accès</Label>
                <p className="font-mono font-medium">{currentReservation.accessKey}</p>
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        {currentReservation.notes && (
          <div className="space-y-4">
            <h3 className="font-medium text-slate-900">Notes</h3>
            <p className="text-sm p-3 bg-slate-50 rounded">{currentReservation.notes}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Réservations FabLab</h1>
          <p className="text-slate-500">Gérez les réservations de machines et les tarifs</p>
        </div>
        <Button onClick={async () => {}}>
          <Download className="h-4 w-4 mr-2" />
          Exporter
        </Button>
      </div>

      {/* Information */}
      <InfoPanel
        title="Gestion des réservations FabLab"
        icon={<AlertTriangle className="h-5 w-5" />}
        variant="info"
      >
        <p className="text-sm text-blue-800">
          Surveillez les réservations en temps réel, gérez les machines et configurez les tarifs.
          Les utilisateurs reçoivent automatiquement leur clé d'accès après confirmation.
        </p>
      </InfoPanel>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-lg font-bold">{typeof stat.value === 'string' ? stat.value : stat.value}</p>
                  <p className="text-sm text-slate-600">{stat.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Onglets */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reservations" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Réservations
          </TabsTrigger>
          <TabsTrigger value="machines" className="flex items-center gap-2">
            <span className="material-icons-outlined h-4 w-4">
              build
            </span>
            Machines
          </TabsTrigger>
          <TabsTrigger value="pricing" className="flex items-center gap-2">
            <Euro className="h-4 w-4" />
            Tarification
          </TabsTrigger>
        </TabsList>

        {/* Onglet Réservations */}
        <TabsContent value="reservations" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <CardTitle>Gestion des réservations</CardTitle>
                  <CardDescription>
                    Suivez et gérez toutes les réservations de machines
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filtrer par statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      {RESERVATION_STATUS.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={reservationColumns}
                data={reservations}
                keyField="id"
                isLoading={isLoadingReservations}
                searchPlaceholder="Rechercher une réservation..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Machines */}
        <TabsContent value="machines" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Gestion des machines</CardTitle>
                  <CardDescription>
                    Configurez les machines et leurs caractéristiques
                  </CardDescription>
                </div>
                <Button onClick={() => setIsMachineDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvelle machine
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={machineColumns}
                data={machines}
                keyField="id"
                isLoading={isLoadingMachines}
                searchPlaceholder="Rechercher une machine..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Tarification */}
        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Règles de tarification</CardTitle>
                  <CardDescription>
                    Configurez les remises et tarifs spéciaux
                  </CardDescription>
                </div>
                <Button onClick={() => setIsPricingDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvelle règle
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={pricingColumns}
                data={pricingRules}
                keyField="id"
                isLoading={isLoadingPricing}
                searchPlaceholder="Rechercher une règle..."
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogue de visualisation */}
      <FormDialog
        isOpen={isViewDialogOpen}
        onClose={() => setIsViewDialogOpen(false)}
        title="Détails de la réservation"
        description="Informations complètes de la réservation"
        onSubmit={async () => { setIsViewDialogOpen(false); }}
      >
        {renderReservationDetails()}
      </FormDialog>

      {/* Dialogue de suppression */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={async () => {}}
        title={`Supprimer ${deleteTarget === 'reservation' ? 'la réservation' : deleteTarget === 'machine' ? 'la machine' : 'la règle'}`}
        description="Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible."
      />
    </div>
  );
};

export default AdminReservationsFablabPage;
