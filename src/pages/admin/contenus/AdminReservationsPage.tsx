import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Edit, Trash, Plus, User } from 'lucide-react';
import { useFablabMachines, useUserReservations, useCreateFablabReservation, useCancelReservation, useApi } from '@/hooks/useApi';
import { FablabMachine, FablabReservation } from '@/types';

const AdminReservationsPage: React.FC = () => {
  const { toast } = useToast();
  const { data: machinesResponse, isLoading: machinesLoading } = useFablabMachines();
  const { data: reservationsResponse, isLoading: reservationsLoading } = useUserReservations(''); // all reservations
  const createReservationMutation = useCreateFablabReservation();
  const cancelReservationMutation = useCancelReservation();
  const api = useApi();

  const [editMachineId, setEditMachineId] = useState<string | null>(null);
  const [editMachineName, setEditMachineName] = useState<string>('');
  const [editMachineStatus, setEditMachineStatus] = useState<string>('available');
  const [editMachineNeedsTraining, setEditMachineNeedsTraining] = useState<boolean>(false);

  let machines: FablabMachine[] = [];
  if (machinesResponse && typeof machinesResponse === 'object') {
    machines = Array.isArray(machinesResponse) ? machinesResponse : 
              'data' in machinesResponse ? (machinesResponse.data as FablabMachine[]) || [] : [];
  }

  let reservations: FablabReservation[] = [];
  if (reservationsResponse) {
    reservations = Array.isArray(reservationsResponse) ? reservationsResponse : [];
  }

  // CRUD actions for machines
  const handleEditMachine = (machine: FablabMachine) => {
    setEditMachineId(machine.id);
    setEditMachineName(machine.name);
    setEditMachineStatus(machine.status);
    setEditMachineNeedsTraining(!!machine.needsTraining);
  };

  const handleSaveMachine = async () => {
    if (!editMachineId) return;
    try {
      await api.put(`/machines/${editMachineId}`, {
        id: editMachineId,
        name: editMachineName,
        status: editMachineStatus,
        needsTraining: editMachineNeedsTraining
      });
      toast({ title: 'Machine mise à jour', description: 'La machine a été modifiée avec succès.' });
      setEditMachineId(null);
    } catch (error) {
      toast({ title: 'Erreur', description: 'Impossible de modifier la machine.', variant: 'destructive' });
    }
  };

  const handleDeleteMachine = async (machineId: string) => {
    if (!window.confirm('Supprimer cette machine ?')) return;
    try {
      await api.delete(`/machines/${machineId}`);
      toast({ title: 'Machine supprimée', description: 'La machine a été supprimée.' });
    } catch (error) {
      toast({ title: 'Erreur', description: 'Impossible de supprimer la machine.', variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Historique des réservations FabLab</CardTitle>
            </CardHeader>
            <CardContent>
              {reservationsLoading ? (
                <div>Chargement...</div>
              ) : (
                <div className="space-y-4">
                  {reservations.length === 0 ? (
                    <div className="text-gray-500">Aucune réservation trouvée.</div>
                  ) : (
                    reservations.map(res => (
                      <div key={res.id} className="border-b py-2 flex justify-between items-center">
                        <div>
                          <Badge>{res.machineId}</Badge> <span className="text-sm">{res.startTime} - {res.endTime}</span>
                          <span className="ml-2 text-xs text-gray-500">{res.status}</span>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteMachine(res.machineId)}>
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
          <Card>
            <CardHeader>
              <CardTitle>Machines à réserver </CardTitle>
            </CardHeader>
            <CardContent>
              {machinesLoading ? (
                <div>Chargement...</div>
              ) : (
                <div className="space-y-4">
                  {machines.length === 0 ? (
                    <div className="text-gray-500">Aucune machine trouvée.</div>
                  ) : (
                    machines.map(machine => (
                      <div key={machine.id} className="border-b py-2 flex justify-between items-center">
                        {editMachineId === machine.id ? (
                          <div className="flex gap-2 items-center">
                            <Input value={editMachineName} onChange={e => setEditMachineName(e.target.value)} className="w-32" />
                            <select value={editMachineStatus} onChange={e => setEditMachineStatus(e.target.value)} className="border rounded px-2 py-1">
                              <option value="available">Disponible</option>
                              <option value="maintenance">Maintenance</option>
                              <option value="unavailable">Indisponible</option>
                            </select>
                            <label className="flex items-center gap-1 text-xs">
                              <input type="checkbox" checked={editMachineNeedsTraining} onChange={e => setEditMachineNeedsTraining(e.target.checked)} /> Formation requise
                            </label>
                            <Button size="sm" onClick={handleSaveMachine}>
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setEditMachineId(null)}>
                              Annuler
                            </Button>
                          </div>
                        ) : (
                          <div className="flex gap-2 items-center">
                            <Badge>{machine.name}</Badge>
                            <span className="text-xs">{machine.status}</span>
                            <span className="text-xs">{machine.needsTraining ? 'Formation requise' : 'Libre'}</span>
                            <Button size="sm" variant="outline" onClick={() => handleEditMachine(machine)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleDeleteMachine(machine.id)}>
                              <Trash className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminReservationsPage;
