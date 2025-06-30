import React, { useState } from 'react';
import { 
  DataTable,
  DeleteConfirmDialog,
  FormDialog,
  InfoPanel,
  ImageUploader
} from '@/components/admin';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Wrench, // replaces Tool
  Calendar, 
  FileText, 
  Printer, // replaces Printer3d
  Laptop, 
  Scissors, 
  Settings, 
  Clock, 
  Users, 
  PencilIcon, 
  TrashIcon, 
  Plus,
  HelpCircle,
  CalendarRange
} from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"; // Commented out, file missing
import { Switch } from "@/components/ui/switch";

// Types pour le FabLab
interface Machine {
  id: string;
  name: string;
  type: 'printer3d' | 'cutter' | 'cnc' | 'laser' | 'electronics' | 'other';
  description: string;
  status: 'available' | 'maintenance' | 'busy';
  image?: string;
  specifications: string;
  requiresTraining: boolean;
  trainingPrice?: number;
  usagePrice: number;
  materialPrice?: number;
  availableSlots: string[];  // ["09:00-12:00", "14:00-17:00"]
}

interface FabLabProject {
  id: string;
  title: string;
  description: string;
  author: string;
  category: string;
  images: string[];
  files: string[];
  createdAt: string;
  status: 'draft' | 'published' | 'featured';
}

const AdminFablabPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('machines');
  const [showAddMachineDialog, setShowAddMachineDialog] = useState(false);
  const [showAddProjectDialog, setShowAddProjectDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // Mock data for machines
  const mockMachines = [
    {
      id: "machine-1",
      name: "Creality Ender 3 Pro",
      type: "printer3d" as const,
      description: "Imprimante 3D FDM avec un volume d'impression de 220x220x250mm",
      status: "available" as const,
      image: "/img/machines/ender3pro.jpg",
      specifications: "Volume: 220x220x250mm, Filaments: PLA, ABS, PETG, TPU",
      requiresTraining: true,
      trainingPrice: 15000,
      usagePrice: 5000,
      materialPrice: 3000,
      availableSlots: ["09:00-12:00", "14:00-17:00", "17:00-20:00"]
    },
    {
      id: "machine-2",
      name: "Epilog Laser Fusion Pro",
      type: "laser" as const,
      description: "Découpeuse et graveuse laser CO2 pour bois, acrylique, papier",
      status: "maintenance" as const,
      image: "/img/machines/epilog.jpg",
      specifications: "Puissance: 50W, Surface: 600x400mm, Matériaux: bois, acrylique, papier, cuir",
      requiresTraining: true,
      trainingPrice: 25000,
      usagePrice: 10000,
      materialPrice: null,
      availableSlots: ["09:00-12:00", "14:00-17:00"]
    },
    {
      id: "machine-3",
      name: "Oscilloscope Tektronix",
      type: "electronics" as const,
      description: "Oscilloscope numérique 4 canaux pour mesures électroniques",
      status: "available" as const,
      image: "/img/machines/oscilloscope.jpg",
      specifications: "4 canaux, 100MHz, écran couleur, interfaces USB et Ethernet",
      requiresTraining: false,
      usagePrice: 2500,
      materialPrice: null,
      availableSlots: ["09:00-12:00", "14:00-17:00", "17:00-20:00"]
    }
  ];

  // Mock data for projects
  const mockProjects = [
    {
      id: "project-1",
      title: "Boîtier Arduino Personnalisé",
      description: "Boîtier imprimé en 3D pour protéger et présenter votre carte Arduino",
      author: "Jean Dupont",
      category: "electronics",
      images: ["/img/projects/arduino-case-1.jpg", "/img/projects/arduino-case-2.jpg"],
      files: ["arduino-case.stl", "arduino-case-assembly.pdf"],
      createdAt: "2025-01-15T10:30:00.000Z",
      status: "published" as const
    },
    {
      id: "project-2",
      title: "Support pour Smartphone",
      description: "Support ajustable pour smartphone avec gravure personnalisée",
      author: "Marie Konaté",
      category: "lifestyle",
      images: ["/img/projects/phone-stand.jpg"],
      files: ["phone-stand.svg", "instructions.pdf"],
      createdAt: "2025-02-20T14:15:00.000Z",
      status: "featured" as const
    }
  ];

  // Columns for machines table
  const machineColumns = [
    {
      key: "name",
      header: "Machine",
      renderCell: (machine) => {
        const getIcon = (type) => {
          switch(type) {
            case 'printer3d': return <Printer className="w-4 h-4 mr-2 text-indigo-500" />;
            case 'laser': return <Wrench className="w-4 h-4 mr-2 text-red-500" />;
            case 'electronics': return <Settings className="w-4 h-4 mr-2 text-blue-500" />;
            case 'cutter': return <Scissors className="w-4 h-4 mr-2 text-green-500" />;
            case 'cnc': return <Wrench className="w-4 h-4 mr-2 text-orange-500" />;
            default: return <Wrench className="w-4 h-4 mr-2 text-slate-500" />;
          }
        };
        return (
          <div className="flex flex-col">
            <div className="flex items-center">
              {getIcon(machine.type)}
              <span className="font-medium">{machine.name}</span>
            </div>
            <span className="text-xs text-slate-500 mt-1 ml-6">{machine.type}</span>
          </div>
        );
      }
    },
    {
      key: "usagePrice",
      header: "Tarif",
      renderCell: (machine) => (
        <div className="flex flex-col">
          <span className="font-medium">{machine.usagePrice.toLocaleString('fr-FR')} FCFA/h</span>
          {machine.requiresTraining && (
            <span className="text-xs text-slate-500 mt-1">
              + Formation: {machine.trainingPrice?.toLocaleString('fr-FR')} FCFA
            </span>
          )}
        </div>
      )
    },
    {
      key: "status",
      header: "Statut",
      renderCell: (machine) => {
        const status = machine.status;
        return (
          <Badge className={
            status === 'available' ? 'bg-green-100 text-green-800' :
            status === 'maintenance' ? 'bg-amber-100 text-amber-800' :
            'bg-blue-100 text-blue-800'
          }>
            {status === 'available' ? 'Disponible' :
             status === 'maintenance' ? 'En maintenance' : 'Occupée'}
          </Badge>
        );
      }
    },
    {
      key: "availableSlots",
      header: "Réservation",
      renderCell: (machine) => (
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-slate-400" />
          <span>{machine.availableSlots.length} créneaux</span>
        </div>
      )
    },
    {
      key: "actions",
      header: "Actions",
      renderCell: (machine) => (
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => console.log("Edit machine", machine.id)}
          >
            <PencilIcon className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => {
              setSelectedItemId(machine.id);
              setShowDeleteDialog(true);
            }}
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  // Columns for projects table
  const projectColumns = [
    {
      key: "title",
      header: "Projet",
      renderCell: (project) => (
        <div className="flex flex-col">
          <span className="font-medium">{project.title}</span>
          <span className="text-xs text-slate-500 mt-1">Par: {project.author}</span>
        </div>
      )
    },
    {
      key: "category",
      header: "Catégorie",
      renderCell: (project) => (
        <Badge variant="outline">
          {project.category}
        </Badge>
      )
    },
    {
      key: "files",
      header: "Fichiers",
      renderCell: (project) => (
        <div className="flex items-center">
          <FileText className="w-4 h-4 mr-2 text-slate-400" />
          <span>{project.files.length} fichier(s)</span>
        </div>
      )
    },
    {
      key: "status",
      header: "Statut",
      renderCell: (project) => {
        const status = project.status;
        return (
          <Badge className={
            status === 'published' ? 'bg-green-100 text-green-800' :
            status === 'featured' ? 'bg-purple-100 text-purple-800' :
            'bg-slate-100 text-slate-800'
          }>
            {status === 'published' ? 'Publié' :
             status === 'featured' ? 'En vedette' : 'Brouillon'}
          </Badge>
        );
      }
    },
    {
      key: "actions",
      header: "Actions",
      renderCell: (project) => (
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => console.log("Edit project", project.id)}
          >
            <PencilIcon className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => {
              setSelectedItemId(project.id);
              setShowDeleteDialog(true);
            }}
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestion du FabLab</h1>
          <p className="text-muted-foreground">
            Gérez les machines, les projets et les réservations du FabLab
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {activeTab === 'machines' ? (
            <Button onClick={() => setShowAddMachineDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle Machine
            </Button>
          ) : (
            <Button onClick={() => setShowAddProjectDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nouveau Projet
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <Tabs defaultValue="machines" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="machines">
                <Wrench className="mr-2 h-4 w-4" />
                Machines
              </TabsTrigger>
              <TabsTrigger value="projects">
                <FileText className="mr-2 h-4 w-4" />
                Projets
              </TabsTrigger>
              <TabsTrigger value="reservations">
                <CalendarRange className="mr-2 h-4 w-4" />
                Réservations
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <TabsContent value="machines">
            <DataTable 
              columns={machineColumns} 
              data={mockMachines} 
              keyField="id"
              searchPlaceholder="Rechercher une machine..." 
            />
          </TabsContent>
          <TabsContent value="projects">
            <DataTable 
              columns={projectColumns} 
              data={mockProjects} 
              keyField="id"
              searchPlaceholder="Rechercher un projet..." 
            />
          </TabsContent>
          <TabsContent value="reservations">
            <div className="py-8 text-center">
              <CalendarRange className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium">Calendrier des réservations</h3>
              <p className="mt-1 text-sm text-gray-500">
                Cette fonctionnalité sera bientôt disponible.
              </p>
              <Button className="mt-4" variant="outline">
                <HelpCircle className="mr-2 h-4 w-4" />
                Voir le guide
              </Button>
            </div>
          </TabsContent>
        </CardContent>
      </Card>

      {/* Dialog de confirmation de suppression */}
      <DeleteConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={async () => {
          console.log(`Delete item ${selectedItemId}`);
          setShowDeleteDialog(false);
          setSelectedItemId(null);
        }}
        title={`Supprimer cet élément ?`}
        description="Cette action est définitive et ne peut pas être annulée."
      />

      {/* Autres dialogues (formulaires d'ajout) seraient ajoutés ici */}
    </div>
  );
};

export default AdminFablabPage;
