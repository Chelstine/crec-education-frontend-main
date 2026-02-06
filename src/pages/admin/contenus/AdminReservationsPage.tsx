import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import {
  CheckCircle,
  AlertTriangle,
  Edit,
  Trash,
  Plus,
  User,
  Clock,
  Settings,
  Monitor,
  AlertCircle,
} from 'lucide-react';
import {
  useFablabMachines,
} from '@/hooks/useFablab';
import {
  Machine, // Changed from FablabMachine
} from '@/types/fablab'; // Changed import path and type name
import api from '@/services/api';

// Définition locale de l'interface de réservation pour machine
export interface FablabReservation {
  id: string;
  machineId: number; // Changed to number for consistency with Machine.id
  machineName: string;
  userId: string;
  userName: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'in_progress' | 'completed';
  notes?: string;
  totalCost: number;
}

// Mocks temporaires pour les hooks manquants afin de permettre le build
const useUserReservations = (_id: string) => ({ data: [] as FablabReservation[], isLoading: false });
const useCreateFablabReservation = () => ({ mutateAsync: async () => { } });
const useCancelReservation = () => ({ mutateAsync: async () => { } });
const useApi = () => api;

const AdminReservationsPage: React.FC = () => {
  const { toast } = useToast();
  const { data: machinesRes, isLoading: machinesLoading } = useFablabMachines();
  const { data: reservations, isLoading: reservationsLoading } = useUserReservations('');
  // Adaptation pour le type de retour des hooks réels ou mocks
  const machines: Machine[] = Array.isArray(machinesRes) ? machinesRes : [];

  const createReservationMutation = useCreateFablabReservation();
  const cancelReservationMutation = useCancelReservation();
  const apiInstance = useApi();

  const [editMachineId, setEditMachineId] = useState<number | null>(null); // Changed to number
  const [editMachineName, setEditMachineName] = useState<string>('');
  const [editMachineStatus, setEditMachineStatus] = useState<string>('available');
  const [editMachineNeedsTraining, setEditMachineNeedsTraining] = useState<boolean>(false);



  const handleEditMachine = (machine: Machine) => { // Changed type to Machine
    setEditMachineId(machine.id);
    setEditMachineName(machine.name);
    setEditMachineStatus(machine.status);
    setEditMachineNeedsTraining(!!machine.requires_training); // Changed to requires_training
  };

  const handleSaveMachine = async () => {
    if (!editMachineId) return;
    try {
      await apiInstance.put(`/machines/${editMachineId}`, {
        id: editMachineId,
        name: editMachineName,
        status: editMachineStatus,
        requires_training: editMachineNeedsTraining, // Changed to requires_training
      });
      toast({
        title: 'Machine mise à jour',
        description: 'La machine a été modifiée avec succès.',
      });
      setEditMachineId(null);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de modifier la machine.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteMachine = async (machineId: number) => {
    if (!window.confirm('Supprimer cette machine ?')) return;
    try {
      await apiInstance.delete(`/machines/${machineId}`);
      toast({
        title: 'Machine supprimée',
        description: 'La machine a été supprimée.',
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer la machine.',
        variant: 'destructive',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'unavailable':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'confirmed': // Changed from 'confirmée'
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in_progress': // Changed from 'en cours'
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'completed': // Changed from 'terminée'
        return 'bg-gray-100 text-gray-600 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="w-4 h-4" />;
      case 'maintenance':
        return <Settings className="w-4 h-4" />;
      case 'unavailable':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Settings className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Administration FabLab
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Gestion des machines et réservations
                </p>
              </div>
            </div>
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-200"
              onClick={() => {/* Add new machine logic */ }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle machine
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-medium text-gray-900">
              Historique des réservations
            </h2>
          </div>
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-0">
              {reservationsLoading ? (
                <div className="p-6 text-center text-gray-500">
                  Chargement des réservations...
                </div>
              ) : reservations.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  Aucune réservation trouvée.
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {reservations.map((reservation) => (
                    <div
                      key={reservation.id}
                      className="p-6 hover:bg-gray-50 transition-colors duration-150 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Monitor className="w-5 h-5 text-gray-600" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <span className="font-medium text-gray-900">
                                {reservation.machineName} {/* Changed to machineName */}
                              </span>
                              <Badge
                                className={`${getStatusColor(
                                  reservation.status
                                )} border text-xs font-normal`}
                              >
                                {getStatusIcon(reservation.status)}
                                <span className="ml-1.5">{reservation.status}</span>
                              </Badge>
                            </div>
                            <div className="flex items-center gap-6 text-sm text-gray-600">
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                <span>
                                  {reservation.startTime} - {reservation.endTime}
                                </span>
                              </div>
                              {reservation.userName && (
                                <div className="flex items-center gap-1.5">
                                  <User className="w-4 h-4" />
                                  <span>{reservation.userName}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50 hover:text-red-600"
                          onClick={() => handleDeleteMachine(reservation.machineId)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-medium text-gray-900">
              Machines disponibles
            </h2>
          </div>
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-0">
              {machinesLoading ? (
                <div className="p-6 text-center text-gray-500">
                  Chargement des machines...
                </div>
              ) : machines.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  Aucune machine trouvée.
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {machines.map((machine) => (
                    <div
                      key={machine.id}
                      className="p-6 hover:bg-gray-50 transition-colors duration-150 group"
                    >
                      {editMachineId === machine.id ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nom de la machine
                              </label>
                              <Input
                                value={editMachineName}
                                onChange={(e) => setEditMachineName(e.target.value)}
                                className="bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Statut
                              </label>
                              <select
                                value={editMachineStatus}
                                onChange={(e) => setEditMachineStatus(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:border-indigo-500 focus:ring-indigo-500/20 focus:outline-none transition-colors duration-200"
                              >
                                <option value="available">Disponible</option>
                                <option value="maintenance">Maintenance</option>
                                <option value="unavailable">Indisponible</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch // Changed from input checkbox
                              id={`training-${machine.id}`}
                              checked={editMachineNeedsTraining}
                              onCheckedChange={(checked) => setEditMachineNeedsTraining(!!checked)}
                            />
                            <label
                              htmlFor={`training-${machine.id}`}
                              className="text-sm text-gray-700"
                            >
                              Formation requise
                            </label>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={handleSaveMachine}
                              className="bg-indigo-600 hover:bg-indigo-700 text-white"
                            >
                              <CheckCircle className="w-4 h-4 mr-1.5" />
                              Sauvegarder
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditMachineId(null)}
                              className="border-gray-300 hover:bg-gray-50"
                            >
                              Annuler
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Monitor className="w-5 h-5 text-gray-600" />
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-3">
                                <span className="font-medium text-gray-900">
                                  {machine.name}
                                </span>
                                <Badge
                                  className={`${getStatusColor(machine.status)} border text-xs font-normal`}
                                >
                                  {getStatusIcon(machine.status)}
                                  <span className="ml-1.5 capitalize">
                                    {machine.status === 'available'
                                      ? 'Disponible'
                                      : machine.status === 'maintenance'
                                        ? 'Maintenance'
                                        : 'Indisponible'}
                                  </span>
                                </Badge>
                              </div>
                              {machine.requires_training && ( // Changed to requires_training
                                <div className="flex items-center gap-1.5">
                                  <AlertTriangle className="w-3.5 h-3.5 text-yellow-600" />
                                  <span className="text-xs text-yellow-700">
                                    Formation requise
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditMachine(machine)}
                              className="hover:bg-indigo-50 hover:text-indigo-600"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteMachine(machine.id)}
                              className="hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default AdminReservationsPage;