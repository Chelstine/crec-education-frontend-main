import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  Settings,
  DollarSign
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

// Types pour les machines et prix
interface FablabMachine {
  id: string;
  name: string;
  status: 'available' | 'maintenance' | 'out_of_order';
  needsTraining: boolean;
}

interface MachineHourlyRate {
  machineId: string;
  hourlyRate: number;
}

const AdminMachinesPricingPage: React.FC = () => {
  const { toast } = useToast();
  
  // États pour les machines
  const [machines, setMachines] = useState<FablabMachine[]>([]);

  // États pour les prix
  const [hourlyRates, setHourlyRates] = useState<MachineHourlyRate[]>([]);

  // États pour les modales et formulaires
  const [isMachineDialogOpen, setIsMachineDialogOpen] = useState(false);
  const [isPriceDialogOpen, setIsPriceDialogOpen] = useState(false);
  const [editingMachine, setEditingMachine] = useState<FablabMachine | null>(null);
  const [editingPrice, setEditingPrice] = useState<MachineHourlyRate | null>(null);

  // États pour les formulaires
  const [machineForm, setMachineForm] = useState<Partial<FablabMachine>>({
    name: '',
    status: 'available',
    needsTraining: false
  });

  const [priceForm, setPriceForm] = useState<Partial<MachineHourlyRate>>({
    machineId: '',
    hourlyRate: 0
  });

  // Charger les données depuis l'API
  useEffect(() => {
    const loadData = async () => {
      try {
        // TODO: Remplacer par les vrais appels API
        // const [machinesResponse, ratesResponse] = await Promise.all([
        //   fetch('/api/admin/fablab/machines'),
        //   fetch('/api/admin/fablab/hourly-rates')
        // ]);
        // const machinesData = await machinesResponse.json();
        // const ratesData = await ratesResponse.json();
        // setMachines(machinesData);
        // setHourlyRates(ratesData);
        
        // Pour l'instant, garder les listes vides
        setMachines([]);
        setHourlyRates([]);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données des machines",
          variant: "destructive"
        });
      }
    };

    loadData();
  }, [toast]);

  // Fonctions pour les machines
  const handleCreateMachine = () => {
    if (!machineForm.name?.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom de la machine est requis",
        variant: "destructive"
      });
      return;
    }

    const newMachine: FablabMachine = {
      id: `machine-${Date.now()}`,
      name: machineForm.name.trim(),
      status: machineForm.status as 'available' | 'maintenance' | 'out_of_order',
      needsTraining: machineForm.needsTraining || false
    };

    setMachines([...machines, newMachine]);
    setMachineForm({ name: '', status: 'available', needsTraining: false });
    setIsMachineDialogOpen(false);
    
    toast({
      title: "Succès",
      description: "Machine créée avec succès"
    });
  };

  const handleUpdateMachine = () => {
    if (!editingMachine || !machineForm.name?.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom de la machine est requis",
        variant: "destructive"
      });
      return;
    }

    setMachines(machines.map(machine => 
      machine.id === editingMachine.id 
        ? { 
            ...machine, 
            name: machineForm.name!.trim(),
            status: machineForm.status as 'available' | 'maintenance' | 'out_of_order',
            needsTraining: machineForm.needsTraining || false
          }
        : machine
    ));

    setEditingMachine(null);
    setMachineForm({ name: '', status: 'available', needsTraining: false });
    setIsMachineDialogOpen(false);
    
    toast({
      title: "Succès",
      description: "Machine mise à jour avec succès"
    });
  };

  const handleDeleteMachine = (machineId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette machine ?')) return;

    setMachines(machines.filter(machine => machine.id !== machineId));
    setHourlyRates(hourlyRates.filter(rate => rate.machineId !== machineId));
    
    toast({
      title: "Succès",
      description: "Machine supprimée avec succès"
    });
  };

  const openMachineDialog = (machine?: FablabMachine) => {
    if (machine) {
      setEditingMachine(machine);
      setMachineForm({
        name: machine.name,
        status: machine.status,
        needsTraining: machine.needsTraining
      });
    } else {
      setEditingMachine(null);
      setMachineForm({ name: '', status: 'available', needsTraining: false });
    }
    setIsMachineDialogOpen(true);
  };

  // Fonctions pour les prix
  const handleCreatePrice = () => {
    if (!priceForm.machineId || !priceForm.hourlyRate || priceForm.hourlyRate <= 0) {
      toast({
        title: "Erreur",
        description: "Machine et tarif horaire valide requis",
        variant: "destructive"
      });
      return;
    }

    // Vérifier si un prix existe déjà pour cette machine
    const existingPrice = hourlyRates.find(rate => rate.machineId === priceForm.machineId);
    if (existingPrice) {
      toast({
        title: "Erreur",
        description: "Un tarif existe déjà pour cette machine",
        variant: "destructive"
      });
      return;
    }

    const newPrice: MachineHourlyRate = {
      machineId: priceForm.machineId,
      hourlyRate: priceForm.hourlyRate
    };

    setHourlyRates([...hourlyRates, newPrice]);
    setPriceForm({ machineId: '', hourlyRate: 0 });
    setIsPriceDialogOpen(false);
    
    toast({
      title: "Succès",
      description: "Tarif créé avec succès"
    });
  };

  const handleUpdatePrice = () => {
    if (!editingPrice || !priceForm.hourlyRate || priceForm.hourlyRate <= 0) {
      toast({
        title: "Erreur",
        description: "Tarif horaire valide requis",
        variant: "destructive"
      });
      return;
    }

    setHourlyRates(hourlyRates.map(rate => 
      rate.machineId === editingPrice.machineId 
        ? { ...rate, hourlyRate: priceForm.hourlyRate! }
        : rate
    ));

    setEditingPrice(null);
    setPriceForm({ machineId: '', hourlyRate: 0 });
    setIsPriceDialogOpen(false);
    
    toast({
      title: "Succès",
      description: "Tarif mis à jour avec succès"
    });
  };

  const handleDeletePrice = (machineId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce tarif ?')) return;

    setHourlyRates(hourlyRates.filter(rate => rate.machineId !== machineId));
    
    toast({
      title: "Succès",
      description: "Tarif supprimé avec succès"
    });
  };

  const openPriceDialog = (price?: MachineHourlyRate) => {
    if (price) {
      setEditingPrice(price);
      setPriceForm({
        machineId: price.machineId,
        hourlyRate: price.hourlyRate
      });
    } else {
      setEditingPrice(null);
      setPriceForm({ machineId: '', hourlyRate: 0 });
    }
    setIsPriceDialogOpen(true);
  };

  // Fonctions utilitaires
  const getMachineName = (machineId: string) => {
    const machine = machines.find(m => m.id === machineId);
    return machine?.name || 'Machine inconnue';
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      available: { label: 'Disponible', color: 'bg-green-100 text-green-800' },
      maintenance: { label: 'Maintenance', color: 'bg-yellow-100 text-yellow-800' },
      out_of_order: { label: 'Hors service', color: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.available;
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Machines et Prix</h1>
        <p className="text-gray-600 mt-1">
          Gérez les machines du FabLab et leurs tarifs horaires
        </p>
      </div>

      {/* Section Machines */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Machines du FabLab
            </CardTitle>
            <Dialog open={isMachineDialogOpen} onOpenChange={setIsMachineDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => openMachineDialog()} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Ajouter une machine
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingMachine ? 'Modifier la machine' : 'Ajouter une machine'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="machineName">Nom de la machine</Label>
                    <Input
                      id="machineName"
                      value={machineForm.name || ''}
                      onChange={(e) => setMachineForm({...machineForm, name: e.target.value})}
                      placeholder="Ex: Imprimante 3D Ender 3"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="machineStatus">Statut</Label>
                    <Select 
                      value={machineForm.status} 
                      onValueChange={(value) => setMachineForm({...machineForm, status: value as 'available' | 'maintenance' | 'out_of_order'})}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Sélectionner un statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Disponible</SelectItem>
                        <SelectItem value="maintenance">En maintenance</SelectItem>
                        <SelectItem value="out_of_order">Hors service</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="needsTraining"
                      checked={machineForm.needsTraining || false}
                      onCheckedChange={(checked) => setMachineForm({...machineForm, needsTraining: checked})}
                    />
                    <Label htmlFor="needsTraining">Formation requise</Label>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsMachineDialogOpen(false)}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Annuler
                    </Button>
                    <Button 
                      onClick={editingMachine ? handleUpdateMachine : handleCreateMachine}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {editingMachine ? 'Mettre à jour' : 'Créer'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Formation requise</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {machines.map((machine) => (
                <TableRow key={machine.id}>
                  <TableCell className="font-medium">{machine.name}</TableCell>
                  <TableCell>{getStatusBadge(machine.status)}</TableCell>
                  <TableCell>
                    <Badge variant={machine.needsTraining ? "default" : "secondary"}>
                      {machine.needsTraining ? 'Oui' : 'Non'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openMachineDialog(machine)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteMachine(machine.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Section Prix */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Tarifs Horaires
            </CardTitle>
            <Dialog open={isPriceDialogOpen} onOpenChange={setIsPriceDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => openPriceDialog()} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Ajouter un tarif
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingPrice ? 'Modifier le tarif' : 'Ajouter un tarif'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="priceMachine">Machine</Label>
                    <Select 
                      value={priceForm.machineId} 
                      onValueChange={(value) => setPriceForm({...priceForm, machineId: value})}
                      disabled={!!editingPrice}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Sélectionner une machine" />
                      </SelectTrigger>
                      <SelectContent>
                        {machines
                          .filter(machine => !editingPrice && !hourlyRates.find(rate => rate.machineId === machine.id))
                          .map((machine) => (
                            <SelectItem key={machine.id} value={machine.id}>
                              {machine.name}
                            </SelectItem>
                          ))}
                        {editingPrice && (
                          <SelectItem value={editingPrice.machineId}>
                            {getMachineName(editingPrice.machineId)}
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="hourlyRate">Tarif horaire (FCFA)</Label>
                    <Input
                      id="hourlyRate"
                      type="number"
                      value={priceForm.hourlyRate || ''}
                      onChange={(e) => setPriceForm({...priceForm, hourlyRate: parseInt(e.target.value) || 0})}
                      placeholder="Ex: 2500"
                      className="mt-1"
                      min="0"
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsPriceDialogOpen(false)}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Annuler
                    </Button>
                    <Button 
                      onClick={editingPrice ? handleUpdatePrice : handleCreatePrice}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {editingPrice ? 'Mettre à jour' : 'Créer'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Machine</TableHead>
                <TableHead>Tarif horaire</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hourlyRates.map((rate) => (
                <TableRow key={rate.machineId}>
                  <TableCell className="font-medium">
                    {getMachineName(rate.machineId)}
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold">{rate.hourlyRate.toLocaleString()} FCFA</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openPriceDialog(rate)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeletePrice(rate.machineId)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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

export default AdminMachinesPricingPage;
