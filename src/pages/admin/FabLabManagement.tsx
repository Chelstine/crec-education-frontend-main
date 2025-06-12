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
  Search,
  Plus,
  Edit,
  Trash2,
  Settings,
  Cpu,
  Wrench,
  Calendar,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

// Types pour la gestion du FabLab
interface FabLabEquipment {
  id: string;
  name: string;
  type: 'imprimante-3d' | 'laser' | 'cnc' | 'electronique' | 'autre';
  model: string;
  status: 'disponible' | 'en-cours' | 'maintenance' | 'hors-service';
  location: string;
  description: string;
  specifications: Record<string, string>;
  maintenanceDate?: string;
  createdAt: string;
  updatedAt: string;
}

const FabLabManagement: React.FC = () => {
  const [equipment, setEquipment] = useState<FabLabEquipment[]>([]);
  const [filteredEquipment, setFilteredEquipment] = useState<FabLabEquipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedEquipment, setSelectedEquipment] = useState<FabLabEquipment | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock data pour les équipements FabLab
  const mockEquipment: FabLabEquipment[] = [
    {
      id: '1',
      name: 'Anycubic Kobra 2',
      type: 'imprimante-3d',
      model: 'Kobra 2',
      status: 'disponible',
      location: 'Zone Impression 3D - A1',
      description: 'Imprimante 3D FDM haute précision',
      specifications: {
        'Volume d\'impression': '220×220×250 mm',
        'Précision': '±0.1 mm',
        'Matériaux': 'PLA, ABS, PETG',
        'Connectivité': 'USB, WiFi'
      },
      createdAt: '2024-01-15',
      updatedAt: '2024-12-20'
    },
    {
      id: '2',
      name: 'Creality Ender 3 V2',
      type: 'imprimante-3d',
      model: 'Ender 3 V2',
      status: 'en-cours',
      location: 'Zone Impression 3D - A2',
      description: 'Imprimante 3D FDM pour débutants',
      specifications: {
        'Volume d\'impression': '220×220×250 mm',
        'Précision': '±0.1 mm',
        'Matériaux': 'PLA, ABS',
        'Connectivité': 'microSD'
      },
      createdAt: '2024-02-10',
      updatedAt: '2024-12-20'
    },
    {
      id: '3',
      name: 'LaserBox Pro',
      type: 'laser',
      model: 'LaserBox Pro 40W',
      status: 'maintenance',
      location: 'Zone Découpe Laser - B1',
      description: 'Découpeuse laser CO2 professionnelle',
      specifications: {
        'Puissance': '40W',
        'Zone de travail': '400×280 mm',
        'Matériaux': 'Bois, Acrylique, Cuir, Papier',
        'Épaisseur max': '10 mm'
      },
      maintenanceDate: '2024-12-22',
      createdAt: '2024-03-05',
      updatedAt: '2024-12-20'
    },
    {
      id: '4',
      name: 'CNC Router Mini',
      type: 'cnc',
      model: 'SainSmart Genmitsu 3018',
      status: 'disponible',
      location: 'Zone CNC - C1',
      description: 'Fraiseuse CNC compacte pour prototypage',
      specifications: {
        'Zone de travail': '300×180×45 mm',
        'Précision': '±0.1 mm',
        'Matériaux': 'Bois, Plastique, Aluminium',
        'Logiciel': 'Candle, UGS'
      },
      createdAt: '2024-04-12',
      updatedAt: '2024-12-18'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setEquipment(mockEquipment);
      setFilteredEquipment(mockEquipment);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filtrage
  useEffect(() => {
    let filtered = equipment;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(item => item.type === filterType);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(item => item.status === filterStatus);
    }

    setFilteredEquipment(filtered);
  }, [equipment, searchTerm, filterType, filterStatus]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'disponible': { color: 'bg-green-100 text-green-800', label: 'Disponible', icon: CheckCircle },
      'en-cours': { color: 'bg-blue-100 text-blue-800', label: 'En cours', icon: Clock },
      'maintenance': { color: 'bg-yellow-100 text-yellow-800', label: 'Maintenance', icon: Wrench },
      'hors-service': { color: 'bg-red-100 text-red-800', label: 'Hors service', icon: AlertTriangle }
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    const IconComponent = config.icon;
    return (
      <Badge className={config.color}>
        <IconComponent className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      'imprimante-3d': { color: 'bg-purple-100 text-purple-800', label: 'Impression 3D' },
      'laser': { color: 'bg-red-100 text-red-800', label: 'Laser' },
      'cnc': { color: 'bg-blue-100 text-blue-800', label: 'CNC' },
      'electronique': { color: 'bg-orange-100 text-orange-800', label: 'Électronique' },
      'autre': { color: 'bg-gray-100 text-gray-800', label: 'Autre' }
    };
    const config = typeConfig[type as keyof typeof typeConfig];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const openDetailDialog = (item: FabLabEquipment) => {
    setSelectedEquipment(item);
    setIsDetailDialogOpen(true);
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
            <Settings className="h-8 w-8 text-crec-gold" />
            Gestion FabLab
          </h1>
          <p className="text-gray-600 mt-1">Gestion des équipements et ressources</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Ajouter Équipement
          </Button>
        </div>
      </motion.div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Équipements</CardTitle>
            <Cpu className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{equipment.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              {equipment.filter(e => e.status === 'disponible').length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Maintenance</CardTitle>
            <Wrench className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-700">
              {equipment.filter(e => e.status === 'maintenance').length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Utilisation</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">
              {equipment.filter(e => e.status === 'en-cours').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
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
                  placeholder="Rechercher par nom, modèle ou description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Type d'équipement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="imprimante-3d">Impression 3D</SelectItem>
                  <SelectItem value="laser">Laser</SelectItem>
                  <SelectItem value="cnc">CNC</SelectItem>
                  <SelectItem value="electronique">Électronique</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="disponible">Disponible</SelectItem>
                  <SelectItem value="en-cours">En cours</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="hors-service">Hors service</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des équipements */}
      <Card>
        <CardHeader>
          <CardTitle>Équipements FabLab ({filteredEquipment.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Équipement</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Localisation</TableHead>
                  <TableHead>Dernière MAJ</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEquipment.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.model}</div>
                        <div className="text-xs text-gray-400">{item.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getTypeBadge(item.type)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(item.status)}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{item.location}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(item.updatedAt).toLocaleDateString('fr-FR')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDetailDialog(item)}
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
            
            {filteredEquipment.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Aucun équipement trouvé avec ces critères.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dialog de détails */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails de l'équipement</DialogTitle>
          </DialogHeader>
          
          {selectedEquipment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Nom:</strong> {selectedEquipment.name}</div>
                <div><strong>Modèle:</strong> {selectedEquipment.model}</div>
                <div><strong>Type:</strong> {selectedEquipment.type}</div>
                <div><strong>Statut:</strong> {selectedEquipment.status}</div>
                <div><strong>Localisation:</strong> {selectedEquipment.location}</div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Spécifications:</h4>
                <div className="bg-gray-50 p-3 rounded">
                  {Object.entries(selectedEquipment.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-1">
                      <span className="font-medium">{key}:</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
              Fermer
            </Button>
            <Button>Modifier</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FabLabManagement;