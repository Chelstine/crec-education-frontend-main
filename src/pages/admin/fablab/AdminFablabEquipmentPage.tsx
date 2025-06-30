import React, { useState, useEffect } from 'react';
import { 
  DataTable,
  DeleteConfirmDialog,
  FormDialog
} from '@/components/admin';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, PencilIcon, TrashIcon, Plus, Info, Clock, Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ImageUploader } from '@/components/admin';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Type pour les équipements FabLab
interface FablabEquipment {
  id: string;
  name: string;
  description: string;
  type: string;
  status: 'available' | 'maintenance' | 'in-use' | 'out-of-order';
  needsTraining: boolean;
  trainingDuration?: string;
  maxReservationHours: number;
  maintenanceSchedule?: string;
  maintenanceNotes?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

// Types d'équipement
const EQUIPMENT_TYPES = [
  { value: "3d-printer", label: "Imprimante 3D" },
  { value: "laser-cutter", label: "Découpeuse Laser" },
  { value: "cnc-machine", label: "Machine CNC" },
  { value: "electronics", label: "Équipement électronique" },
  { value: "woodworking", label: "Outillage pour bois" },
  { value: "metalworking", label: "Outillage pour métal" },
  { value: "robotics", label: "Robotique" },
  { value: "vr-ar", label: "Réalité virtuelle/augmentée" },
  { value: "computing", label: "Matériel informatique" },
  { value: "other", label: "Autre" }
];

// Statuts d'équipement
const EQUIPMENT_STATUS = [
  { value: "available", label: "Disponible" },
  { value: "maintenance", label: "En maintenance" },
  { value: "in-use", label: "En utilisation" },
  { value: "out-of-order", label: "Hors service" }
];

// Composant de formulaire pour équipements FabLab
interface EquipmentFormProps {
  formData: any;
  handleChange: (e: any) => void;
  isSubmitting: boolean;
}

const EquipmentForm: React.FC<EquipmentFormProps> = ({ 
  formData, 
  handleChange,
  isSubmitting 
}) => {
  const [activeTab, setActiveTab] = useState('general');

  // Fonction pour gérer les valeurs des select
  const handleSelectChange = (name: string, value: string) => {
    handleChange({ 
      target: { 
        name, 
        value,
        type: 'select'
      } 
    });
  };

  // Fonction pour gérer les valeurs des checkbox
  const handleCheckboxChange = (name: string, checked: boolean) => {
    handleChange({
      target: {
        name,
        type: 'checkbox',
        checked
      }
    });
  };

  // Fonction pour gérer l'upload d'images
  const handleImageUpload = async (file: File): Promise<string> => {
    // Simuler un upload d'image (à remplacer par un vrai upload)
    return new Promise((resolve) => {
      setTimeout(() => {
        const fakeUrl = URL.createObjectURL(file);
        handleChange({
          target: {
            name: 'image',
            value: fakeUrl,
            type: 'image'
          }
        });
        resolve(fakeUrl);
      }, 1000);
    });
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="general">Informations générales</TabsTrigger>
        <TabsTrigger value="details">Détails techniques</TabsTrigger>
        <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
      </TabsList>
      
      <TabsContent value="general" className="space-y-4">
        <div>
          <Label htmlFor="name">Nom de l'équipement*</Label>
          <Input
            id="name"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            placeholder="Nom de l'équipement"
            disabled={isSubmitting}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="description">Description*</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            placeholder="Description détaillée de l'équipement"
            className="min-h-[100px]"
            disabled={isSubmitting}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="type">Type d'équipement*</Label>
            <Select
              name="type"
              value={formData.type || ''}
              onValueChange={(value) => handleSelectChange('type', value)}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                {EQUIPMENT_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="status">Statut*</Label>
            <Select
              name="status"
              value={formData.status || 'available'}
              onValueChange={(value) => handleSelectChange('status', value)}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                {EQUIPMENT_STATUS.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            id="needsTraining"
            name="needsTraining"
            type="checkbox"
            className="h-4 w-4"
            checked={formData.needsTraining || false}
            onChange={(e) => handleCheckboxChange('needsTraining', e.target.checked)}
            disabled={isSubmitting}
          />
          <Label htmlFor="needsTraining" className="cursor-pointer">Formation requise pour utilisation</Label>
        </div>
        
        {formData.needsTraining && (
          <div>
            <Label htmlFor="trainingDuration">Durée de formation</Label>
            <Input
              id="trainingDuration"
              name="trainingDuration"
              value={formData.trainingDuration || ''}
              onChange={handleChange}
              placeholder="Ex: 2 heures"
              disabled={isSubmitting}
            />
          </div>
        )}
        
        <div>
          <ImageUploader
            onImageUpload={handleImageUpload}
            currentImageUrl={formData.image || ''}
            label="Image de l'équipement"
            aspectRatio="4:3"
            width="100%"
            height="200px"
          />
        </div>
      </TabsContent>
      
      <TabsContent value="details" className="space-y-4">
        <div>
          <Label htmlFor="maxReservationHours">Durée maximum de réservation (heures)*</Label>
          <Input
            id="maxReservationHours"
            name="maxReservationHours"
            type="number"
            min={1}
            max={24}
            value={formData.maxReservationHours || 2}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          />
        </div>
        
        {/* Autres détails techniques spécifiques au type d'équipement */}
        
      </TabsContent>
      
      <TabsContent value="maintenance" className="space-y-4">
        <div>
          <Label htmlFor="maintenanceSchedule">Calendrier de maintenance</Label>
          <Input
            id="maintenanceSchedule"
            name="maintenanceSchedule"
            value={formData.maintenanceSchedule || ''}
            onChange={handleChange}
            placeholder="Ex: Tous les premiers lundis du mois"
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <Label htmlFor="maintenanceNotes">Notes de maintenance</Label>
          <Textarea
            id="maintenanceNotes"
            name="maintenanceNotes"
            value={formData.maintenanceNotes || ''}
            onChange={handleChange}
            placeholder="Notes importantes pour la maintenance"
            className="min-h-[100px]"
            disabled={isSubmitting}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

const AdminFablabEquipmentPage: React.FC = () => {
  // États pour l'UI
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEquipments, setTotalEquipments] = useState(0);
  
  // États pour les données
  const [equipments, setEquipments] = useState<FablabEquipment[]>([]);
  
  // États pour les boîtes de dialogue
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  // État pour l'élément sélectionné
  const [selectedEquipment, setSelectedEquipment] = useState<FablabEquipment | null>(null);
  
  // Toast pour les notifications
  const { toast } = useToast();

  // Données mock pour les équipements
  const mockEquipments: FablabEquipment[] = [
    {
      id: "eq-001",
      name: "Imprimante 3D Ultimaker S5",
      description: "Imprimante 3D professionnelle double extrusion pour prototypage et fabrication.",
      type: "3d-printer",
      status: "available",
      needsTraining: true,
      trainingDuration: "1 heure",
      maxReservationHours: 6,
      maintenanceSchedule: "Premier lundi du mois",
      image: "/img/machines/ultimaker-s5.jpg",
      createdAt: "2024-01-15T09:00:00.000Z",
      updatedAt: "2025-06-01T14:30:00.000Z"
    },
    {
      id: "eq-002",
      name: "Découpeuse laser Glowforge Plus",
      description: "Découpeuse et graveuse laser pour matériaux variés comme le bois, acrylique, cuir et plus.",
      type: "laser-cutter",
      status: "available",
      needsTraining: true,
      trainingDuration: "2 heures",
      maxReservationHours: 4,
      maintenanceSchedule: "Tous les 15 jours",
      maintenanceNotes: "Nettoyage des miroirs et lentilles obligatoire",
      image: "/img/machines/glowforge-plus.jpg",
      createdAt: "2024-02-10T10:15:00.000Z",
      updatedAt: "2025-06-15T16:45:00.000Z"
    },
    {
      id: "eq-003",
      name: "Machine CNC Stepcraft D.840",
      description: "Fraiseuse CNC 3 axes pour la fabrication de précision dans divers matériaux.",
      type: "cnc-machine",
      status: "maintenance",
      needsTraining: true,
      trainingDuration: "3 heures",
      maxReservationHours: 8,
      maintenanceSchedule: "Premier mercredi du mois",
      maintenanceNotes: "En maintenance pour remplacement de la broche",
      image: "/img/machines/stepcraft-cnc.jpg",
      createdAt: "2024-03-05T11:30:00.000Z",
      updatedAt: "2025-06-20T13:20:00.000Z"
    },
    {
      id: "eq-004",
      name: "Kit Arduino Starter",
      description: "Kit complet avec Arduino Uno et composants pour projets électroniques.",
      type: "electronics",
      status: "available",
      needsTraining: false,
      maxReservationHours: 24,
      image: "/img/machines/arduino-kit.jpg",
      createdAt: "2024-04-12T14:25:00.000Z",
      updatedAt: "2025-05-30T09:10:00.000Z"
    }
  ];

  // Colonnes pour le tableau des équipements
  const equipmentColumns = [
    {
      key: "name",
      header: "Équipement",
      renderCell: (equipment: FablabEquipment) => (
        <div className="flex flex-col">
          <div className="flex items-center">
            {equipment.image && (
              <div className="w-10 h-10 rounded overflow-hidden mr-3">
                <img 
                  src={equipment.image} 
                  alt={equipment.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <span className="font-medium">{equipment.name}</span>
          </div>
          <span className="text-xs text-slate-500 mt-1">
            {EQUIPMENT_TYPES.find(t => t.value === equipment.type)?.label || equipment.type}
          </span>
        </div>
      )
    },
    {
      key: "status",
      header: "Statut",
      renderCell: (equipment: FablabEquipment) => {
        const status = equipment.status;
        
        const statusConfig = {
          'available': { bg: 'bg-green-100', text: 'text-green-800', label: 'Disponible' },
          'maintenance': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'En maintenance' },
          'in-use': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'En utilisation' },
          'out-of-order': { bg: 'bg-red-100', text: 'text-red-800', label: 'Hors service' }
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
      key: "needsTraining",
      header: "Formation",
      renderCell: (equipment: FablabEquipment) => (
        <span>
          {equipment.needsTraining 
            ? `Requise (${equipment.trainingDuration || 'durée non spécifiée'})` 
            : 'Non requise'}
        </span>
      )
    },
    {
      key: "maxReservationHours",
      header: "Temps max",
      renderCell: (equipment: FablabEquipment) => (
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2 text-slate-400" />
          <span>{equipment.maxReservationHours} heure(s)</span>
        </div>
      )
    },
    {
      key: "actions",
      header: "Actions",
      renderCell: (equipment: FablabEquipment) => (
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleEditEquipment(equipment.id)}
          >
            <PencilIcon className="w-4 h-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleDeleteEquipment(equipment.id)}
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  // Gestion des événements d'équipement
  const handleAddEquipment = async (data: Partial<FablabEquipment>) => {
    try {
      // Simuler l'ajout - à remplacer par un appel API
      const newEquipment: FablabEquipment = {
        ...data as any,
        id: `eq-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setEquipments([newEquipment, ...equipments]);
      
      toast({
        title: "Équipement ajouté",
        description: "L'équipement a été ajouté avec succès.",
      });
      
      return Promise.resolve();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'équipement:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout de l'équipement.",
        variant: "destructive",
      });
      return Promise.reject(error);
    }
  };
  
  const handleUpdateEquipment = async (data: Partial<FablabEquipment>) => {
    try {
      // Simuler la mise à jour - à remplacer par un appel API
      const updatedEquipments = equipments.map(equipment => 
        equipment.id === selectedEquipment?.id 
          ? { ...equipment, ...data, updatedAt: new Date().toISOString() } 
          : equipment
      );
      
      setEquipments(updatedEquipments);
      
      toast({
        title: "Équipement modifié",
        description: "L'équipement a été modifié avec succès.",
      });
      
      return Promise.resolve();
    } catch (error) {
      console.error('Erreur lors de la modification de l\'équipement:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la modification de l'équipement.",
        variant: "destructive",
      });
      return Promise.reject(error);
    }
  };
  
  const handleEditEquipment = (id: string) => {
    const equipment = equipments.find(e => e.id === id);
    if (equipment) {
      setSelectedEquipment(equipment);
      setShowEditDialog(true);
    }
  };
  
  const handleDeleteEquipment = (id: string) => {
    const equipment = equipments.find(e => e.id === id);
    if (equipment) {
      setSelectedEquipment(equipment);
      setShowDeleteDialog(true);
    }
  };
  
  const handleConfirmDelete = async () => {
    try {
      if (!selectedEquipment) return Promise.resolve();
      
      // Simuler la suppression - à remplacer par un appel API
      setEquipments(equipments.filter(e => e.id !== selectedEquipment.id));
      
      toast({
        title: "Équipement supprimé",
        description: "L'équipement a été supprimé avec succès.",
      });
      
      setShowDeleteDialog(false);
      setSelectedEquipment(null);
      
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
      let filteredEquipments = [...mockEquipments];
      
      // Filtrage par recherche
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredEquipments = filteredEquipments.filter(e =>
          e.name.toLowerCase().includes(query) ||
          e.description.toLowerCase().includes(query) ||
          e.type.toLowerCase().includes(query)
        );
      }
      
      setEquipments(filteredEquipments);
      setTotalEquipments(filteredEquipments.length);
      setIsLoading(false);
    }, 500);
  }, [searchQuery]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Équipements FabLab</h1>
          <p className="text-muted-foreground">
            Gérez les équipements disponibles pour réservation
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvel équipement
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Tous les équipements</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={equipmentColumns}
            data={equipments}
            keyField="id"
            searchPlaceholder="Rechercher un équipement..."
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
      
      {/* Dialog de confirmation de suppression */}
      <DeleteConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        title="Supprimer cet équipement ?"
        description="Cette action est définitive et ne peut pas être annulée. Les réservations existantes pour cet équipement seront affectées."
      />
      
      {/* Dialog d'ajout d'équipement */}
      <FormDialog
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        title="Ajouter un équipement"
        description="Créer un nouvel équipement pour le FabLab"
        onSubmit={handleAddEquipment}
        submitLabel="Ajouter"
      >
        <EquipmentForm 
          formData={{}}
          handleChange={() => {}}
          isSubmitting={false}
        />
      </FormDialog>
      
      {/* Dialog d'édition d'équipement */}
      <FormDialog
        isOpen={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        title="Modifier l'équipement"
        description="Modifier les détails de l'équipement"
        onSubmit={handleUpdateEquipment}
        submitLabel="Enregistrer"
        initialData={selectedEquipment}
        isEdit={true}
      >
        <EquipmentForm 
          formData={selectedEquipment}
          handleChange={() => {}}
          isSubmitting={false}
        />
      </FormDialog>
    </div>
  );
};

export default AdminFablabEquipmentPage;
