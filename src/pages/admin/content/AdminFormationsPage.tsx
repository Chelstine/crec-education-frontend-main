import React, { useState, useEffect } from 'react';
import { 
  DataTable,
  DeleteConfirmDialog
} from '@/components/admin';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Globe, Clock, Calendar, Users, BookOpen, PencilIcon, TrashIcon, Plus, LayoutGrid, Award } from 'lucide-react';

// Types pour les formations ouvertes
interface Formation {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  price: number;
  instructor: string;
  maxParticipants: number;
  schedule: string;
  location: string;
  format: 'Présentiel' | 'En ligne' | 'Hybride';
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  status: 'active' | 'draft' | 'inactive';
  image?: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

interface Certificate {
  id: string;
  title: string;
  description: string;
  formations: string[]; // IDs of formations
  price: number;
  duration: string;
  status: 'active' | 'draft' | 'inactive';
  image?: string;
  createdAt: string;
  updatedAt: string;
}

const AdminFormationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('formations');
  const [showAddFormationDialog, setShowAddFormationDialog] = useState(false);
  const [showAddCertificateDialog, setShowAddCertificateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [formations, setFormations] = useState<Formation[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalFormations, setTotalFormations] = useState(0);

  // Harmonisation des données mock (clé 'level' au lieu de 'niveau', format en majuscule)
  const mockFormations: Formation[] = [
    {
      id: "form-1",
      title: "Anglais Professionnel",
      description: "Formation intensive en anglais des affaires et communication professionnelle.",
      category: "langues",
      duration: "60 heures",
      price: 150000,
      instructor: "Mme. Sarah Johnson",
      maxParticipants: 15,
      schedule: "Mardi et Jeudi, 18h-20h",
      location: "CREC Campus Principal, Salle 204",
      format: "Présentiel",
      level: "Intermédiaire",
      status: "active",
      image: "/img/formation-ouverte.png",
      startDate: "2025-02-15T00:00:00.000Z",
      endDate: "2025-04-30T00:00:00.000Z",
      createdAt: "2025-01-10T09:00:00.000Z",
      updatedAt: "2025-01-15T14:30:00.000Z"
    },
    {
      id: "form-2",
      title: "Introduction au Développement Web",
      description: "Apprenez les bases du développement web: HTML, CSS et JavaScript pour débutants.",
      category: "informatique",
      duration: "45 heures",
      price: 125000,
      instructor: "M. Kofi Mensah",
      maxParticipants: 20,
      schedule: "Samedi, 9h-12h",
      location: "CREC Campus Numérique",
      format: "Hybride",
      level: "Débutant",
      status: "active",
      image: "/img/dev-web.png",
      startDate: "2025-03-01T00:00:00.000Z",
      endDate: "2025-05-15T00:00:00.000Z",
      createdAt: "2025-01-20T10:15:00.000Z",
      updatedAt: "2025-01-25T16:45:00.000Z"
    },
    {
      id: "form-3",
      title: "Communication et Prise de Parole",
      description: "Techniques et méthodes pour améliorer votre communication orale et prise de parole en public.",
      category: "communication",
      duration: "30 heures",
      price: 100000,
      instructor: "Dr. Aminata Touré",
      maxParticipants: 12,
      schedule: "Lundi et Mercredi, 17h-19h",
      location: "CREC Campus Principal, Salle de conférence",
      format: "Présentiel",
      level: "Débutant",
      status: "draft",
      image: "/img/com.png",
      startDate: "2025-04-05T00:00:00.000Z",
      endDate: "2025-05-30T00:00:00.000Z",
      createdAt: "2025-02-01T11:30:00.000Z",
      updatedAt: "2025-02-05T13:20:00.000Z"
    }
  ];

  const mockCertificates: Certificate[] = [
    {
      id: "cert-1",
      title: "Certification en Compétences Linguistiques",
      description: "Programme certifiant regroupant plusieurs formations en langues étrangères.",
      formations: ["form-1"],
      price: 250000,
      duration: "6 mois",
      status: "active",
      image: "/img/certificat-langues.jpg",
      createdAt: "2025-01-05T08:30:00.000Z",
      updatedAt: "2025-01-10T11:45:00.000Z"
    },
    {
      id: "cert-2",
      title: "Certification en Développement Web Full-Stack",
      description: "Programme complet pour devenir développeur web full-stack avec certifications reconnues.",
      formations: ["form-2"],
      price: 350000,
      duration: "9 mois",
      status: "active",
      image: "/img/certificat-dev-web.jpg",
      createdAt: "2025-01-15T09:20:00.000Z",
      updatedAt: "2025-01-20T14:10:00.000Z"
    }
  ];

  // Columns for formations table
  const formationColumns = [
    {
      key: "title",
      header: "Formation",
      renderCell: (formation: Formation) => (
        <div className="flex flex-col">
          <span className="font-medium">{formation.title}</span>
          <span className="text-xs text-slate-500 mt-1">{formation.category}</span>
        </div>
      )
    },
    {
      key: "instructor",
      header: "Formateur",
      renderCell: (formation: Formation) => (
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-2 text-slate-400" />
          <span>{formation.instructor}</span>
        </div>
      )
    },
    {
      key: "price",
      header: "Prix",
      renderCell: (formation: Formation) => (
        <span className="font-medium">{formation.price.toLocaleString('fr-FR')} FCFA</span>
      )
    },
    {
      key: "duration",
      header: "Durée",
      renderCell: (formation: Formation) => (
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2 text-slate-400" />
          <span>{formation.duration}</span>
        </div>
      )
    },
    {
      key: "format",
      header: "Format",
      renderCell: (formation: Formation) => (
        <Badge className={
          formation.format === 'Présentiel' ? 'bg-blue-100 text-blue-800' :
          formation.format === 'Hybride' ? 'bg-purple-100 text-purple-800' :
          'bg-indigo-100 text-indigo-800'
        }>
          {formation.format}
        </Badge>
      )
    },
    {
      key: "status",
      header: "Statut",
      renderCell: (formation: Formation) => {
        const status = formation.status;
        return (
          <Badge className={
            status === 'active' ? 'bg-green-100 text-green-800' :
            status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
            'bg-slate-100 text-slate-800'
          }>
            {status === 'active' ? 'Actif' :
             status === 'draft' ? 'Brouillon' : 'Inactif'}
          </Badge>
        );
      }
    },
    {
      key: "actions",
      header: "Actions",
      renderCell: (formation: Formation) => (
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => console.log("Edit formation", formation.id)}
          >
            <PencilIcon className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => {
              setSelectedItemId(formation.id);
              setShowDeleteDialog(true);
            }}
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  // Columns for certificates table
  const certificateColumns = [
    {
      key: "title",
      header: "Certification",
      renderCell: (certificate: Certificate) => (
        <div className="flex flex-col">
          <span className="font-medium">{certificate.title}</span>
          <span className="text-xs text-slate-500 mt-1">{certificate.formations.length} formation(s)</span>
        </div>
      )
    },
    {
      key: "price",
      header: "Prix",
      renderCell: (certificate: Certificate) => (
        <span className="font-medium">{certificate.price.toLocaleString('fr-FR')} FCFA</span>
      )
    },
    {
      key: "duration",
      header: "Durée",
      renderCell: (certificate: Certificate) => (
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2 text-slate-400" />
          <span>{certificate.duration}</span>
        </div>
      )
    },
    {
      key: "status",
      header: "Statut",
      renderCell: (certificate: Certificate) => {
        const status = certificate.status;
        return (
          <Badge className={
            status === 'active' ? 'bg-green-100 text-green-800' :
            status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
            'bg-slate-100 text-slate-800'
          }>
            {status === 'active' ? 'Actif' :
             status === 'draft' ? 'Brouillon' : 'Inactif'}
          </Badge>
        );
      }
    },
    {
      key: "actions",
      header: "Actions",
      renderCell: (certificate: Certificate) => (
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => console.log("Edit certificate", certificate.id)}
          >
            <PencilIcon className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => {
              setSelectedItemId(certificate.id);
              setShowDeleteDialog(true);
            }}
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  // Chargement simulé des données (remplace loadFormations)
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      // Filtrage par recherche
      let filteredFormations = [...mockFormations];
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredFormations = filteredFormations.filter(f =>
          f.title.toLowerCase().includes(query) ||
          f.description.toLowerCase().includes(query)
        );
      }
      setFormations(filteredFormations);
      setCertificates(mockCertificates);
      setTotalFormations(filteredFormations.length);
      setIsLoading(false);
    }, 500);
  }, [searchQuery]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestion des Formations Ouvertes</h1>
          <p className="text-muted-foreground">
            Gérez les formations continues, les certifications et les ateliers ouverts au public
          </p>
        </div>
        <div className="flex items-center gap-2">
          {activeTab === 'formations' ? (
            <Button onClick={() => setShowAddFormationDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle Formation
            </Button>
          ) : (
            <Button onClick={() => setShowAddCertificateDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle Certification
            </Button>
          )}
        </div>
      </div>
      <Card>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <CardHeader className="pb-3">
            <TabsList>
              <TabsTrigger value="formations">
                <BookOpen className="mr-2 h-4 w-4" />
                Formations
              </TabsTrigger>
              <TabsTrigger value="certifications">
                <Award className="mr-2 h-4 w-4" />
                Certifications
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          <TabsContent value="formations">
            <CardContent>
              <DataTable
                columns={formationColumns}
                data={formations}
                keyField="id"
                searchPlaceholder="Rechercher une formation..."
                isLoading={isLoading}
              />
            </CardContent>
          </TabsContent>
          <TabsContent value="certifications">
            <CardContent>
              <DataTable
                columns={certificateColumns}
                data={certificates}
                keyField="id"
                searchPlaceholder="Rechercher une certification..."
                isLoading={isLoading}
              />
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
      <DeleteConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={async () => {
          setShowDeleteDialog(false);
          setSelectedItemId(null);
        }}
        title={`Supprimer cet élément ?`}
        description="Cette action est définitive et ne peut pas être annulée."
      />
      {/* Les dialogues d'ajout sont à implémenter ultérieurement */}
    </div>
  );
};

export default AdminFormationsPage;
