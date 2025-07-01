import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  PencilIcon, 
  TrashIcon, 
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Users,
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
import { Textarea } from '../../../components/ui/textarea';
import { handleApiError } from '@/services/apiServices';

// Interface pour les inscriptions FabLab
interface FablabInscription {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  profession: string;
  motivation: string;
  previousExperience: string;
  interestedMachines: string[];
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  accessKey?: string;
  documents: {
    identityCard?: string;
    photo?: string;
  };
}

// Configuration des statuts
const INSCRIPTION_STATUS = [
  { value: 'pending', label: 'En attente', color: 'bg-amber-100 text-amber-800 border-amber-300' },
  { value: 'approved', label: 'Approuvée', color: 'bg-green-100 text-green-800 border-green-300' },
  { value: 'rejected', label: 'Rejetée', color: 'bg-red-100 text-red-800 border-red-300' }
];

// Machines disponibles
const AVAILABLE_MACHINES = [
  'Imprimante 3D',
  'Découpeuse laser',
  'Fraiseuse CNC',
  'Scanner 3D',
  'Machine à coudre industrielle',
  'Poste de soudure',
  'Perceuse à colonne',
  'Scie à ruban'
];

const AdminInscriptionsFablabPage: React.FC = () => {
  
  const [inscriptions, setInscriptions] = useState<FablabInscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalInscriptions, setTotalInscriptions] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // État pour les dialogues
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [currentInscription, setCurrentInscription] = useState<FablabInscription | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  // Colonnes pour le tableau
  const columns = [
    { 
      key: 'candidat', 
      header: 'Candidat',
      renderCell: (inscription: FablabInscription) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-medium">
            {inscription.firstName.charAt(0)}{inscription.lastName.charAt(0)}
          </div>
          <div>
            <p className="font-medium">{inscription.firstName} {inscription.lastName}</p>
            <p className="text-xs text-slate-500">{inscription.email}</p>
          </div>
        </div>
      )
    },
    { 
      key: 'profession', 
      header: 'Profession',
      renderCell: (inscription: FablabInscription) => (
        <span className="text-slate-600">{inscription.profession}</span>
      )
    },
    { 
      key: 'interestedMachines', 
      header: 'Machines d\'intérêt',
      renderCell: (inscription: FablabInscription) => (
        <div className="flex flex-wrap gap-1">
          {inscription.interestedMachines.slice(0, 2).map((machine, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {machine}
            </Badge>
          ))}
          {inscription.interestedMachines.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{inscription.interestedMachines.length - 2}
            </Badge>
          )}
        </div>
      )
    },
    { 
      key: 'status', 
      header: 'Statut',
      renderCell: (inscription: FablabInscription) => {
        const statusConfig = INSCRIPTION_STATUS.find(s => s.value === inscription.status);
        return (
          <Badge variant="outline" className={statusConfig?.color || 'bg-slate-100 text-slate-800'}>
            {statusConfig?.label || inscription.status}
          </Badge>
        );
      }
    },
    { 
      key: 'submittedAt', 
      header: 'Date de soumission',
      renderCell: (inscription: FablabInscription) => (
        <span className="text-slate-600">
          {new Date(inscription.submittedAt).toLocaleDateString('fr-FR')}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      renderCell: (inscription: FablabInscription) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleViewInscription(inscription)}
            className="h-8 w-8 p-0"
          >
            <Eye className="h-4 w-4" />
          </Button>
          {inscription.status === 'pending' && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleApproveInscription(inscription)}
                className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
              >
                <CheckCircle className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRejectInscription(inscription)}
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDeleteInscription(inscription)}
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  // Chargement des données
  const loadInscriptions = async () => {
    try {
      setIsLoading(true);
      
      // Données simulées pour le développement
      setTimeout(() => {
        const mockInscriptions: FablabInscription[] = [
          {
            id: '1',
            firstName: 'Jean',
            lastName: 'Dupont',
            email: 'jean.dupont@example.com',
            phone: '+229 97 12 34 56',
            dateOfBirth: '1985-03-15',
            profession: 'Ingénieur logiciel',
            motivation: 'Je souhaite apprendre à utiliser les machines pour créer des prototypes pour mes projets personnels.',
            previousExperience: 'Aucune expérience avec les machines industrielles, mais j\'ai de l\'expérience en électronique.',
            interestedMachines: ['Imprimante 3D', 'Découpeuse laser', 'Scanner 3D'],
            status: 'pending',
            submittedAt: '2024-01-15T10:30:00Z',
            documents: {
              identityCard: 'jean_dupont_ci.pdf',
              photo: 'jean_dupont_photo.jpg'
            }
          },
          {
            id: '2',
            firstName: 'Marie',
            lastName: 'Martin',
            email: 'marie.martin@example.com',
            phone: '+229 96 78 90 12',
            dateOfBirth: '1992-07-22',
            profession: 'Designer graphique',
            motivation: 'Je veux apprendre la fabrication numérique pour mes créations artistiques.',
            previousExperience: 'J\'ai déjà utilisé une découpeuse laser dans un autre FabLab.',
            interestedMachines: ['Découpeuse laser', 'Imprimante 3D'],
            status: 'approved',
            submittedAt: '2024-01-10T14:15:00Z',
            reviewedAt: '2024-01-12T09:00:00Z',
            reviewedBy: 'Admin System',
            accessKey: 'FL2024001',
            documents: {
              identityCard: 'marie_martin_ci.pdf',
              photo: 'marie_martin_photo.jpg'
            }
          },
          {
            id: '3',
            firstName: 'Pierre',
            lastName: 'Kouassi',
            email: 'pierre.kouassi@example.com',
            phone: '+229 95 44 33 22',
            dateOfBirth: '1988-11-08',
            profession: 'Étudiant en architecture',
            motivation: 'Je veux créer des maquettes architecturales avec l\'imprimante 3D.',
            previousExperience: 'Aucune',
            interestedMachines: ['Imprimante 3D', 'Scanner 3D', 'Fraiseuse CNC'],
            status: 'rejected',
            submittedAt: '2024-01-08T16:45:00Z',
            reviewedAt: '2024-01-10T11:30:00Z',
            reviewedBy: 'Admin System',
            rejectionReason: 'Documents incomplets - photo manquante',
            documents: {
              identityCard: 'pierre_kouassi_ci.pdf'
            }
          }
        ];
        
        let filteredInscriptions = mockInscriptions;
        
        // Filtrage par statut
        if (statusFilter !== 'all') {
          filteredInscriptions = filteredInscriptions.filter(i => i.status === statusFilter);
        }
        
        // Filtrage par recherche
        if (searchQuery) {
          filteredInscriptions = filteredInscriptions.filter(i => 
            i.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            i.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            i.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            i.profession.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        
        setInscriptions(filteredInscriptions);
        setTotalInscriptions(filteredInscriptions.length);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      handleApiError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInscriptions();
  }, [currentPage, searchQuery, statusFilter]);

  // Gestionnaires d'événements
  const handleViewInscription = (inscription: FablabInscription) => {
    setCurrentInscription(inscription);
    setIsViewDialogOpen(true);
  };

  const handleApproveInscription = async (inscription: FablabInscription) => {
    try {
      const accessKey = `FL${new Date().getFullYear()}${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`;
      
      setInscriptions(inscriptions.map(i => 
        i.id === inscription.id 
          ? { 
              ...i, 
              status: 'approved' as const,
              reviewedAt: new Date().toISOString(),
              reviewedBy: 'Admin System',
              accessKey
            }
          : i
      ));
      
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleRejectInscription = (inscription: FablabInscription) => {
    setCurrentInscription(inscription);
    setIsRejectDialogOpen(true);
  };

  const confirmRejectInscription = async () => {
    if (!currentInscription) return;
    
    try {
      setInscriptions(inscriptions.map(i => 
        i.id === currentInscription.id 
          ? { 
              ...i, 
              status: 'rejected' as const,
              reviewedAt: new Date().toISOString(),
              reviewedBy: 'Admin System',
              rejectionReason
            }
          : i
      ));
      
      setIsRejectDialogOpen(false);
      setRejectionReason('');
      
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleDeleteInscription = (inscription: FablabInscription) => {
    setCurrentInscription(inscription);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteInscription = async () => {
    if (!currentInscription) return;
    
    try {
      setInscriptions(inscriptions.filter(i => i.id !== currentInscription.id));
      setTotalInscriptions(totalInscriptions - 1);
      setIsDeleteDialogOpen(false);
      
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleExportData = () => {
    // Logique d'export CSV
    const csvData = inscriptions.map(i => ({
      'Prénom': i.firstName,
      'Nom': i.lastName,
      'Email': i.email,
      'Téléphone': i.phone,
      'Profession': i.profession,
      'Statut': INSCRIPTION_STATUS.find(s => s.value === i.status)?.label || i.status,
      'Date de soumission': new Date(i.submittedAt).toLocaleDateString('fr-FR'),
      'Machines d\'intérêt': i.interestedMachines.join(', ')
    }));
    
    console.log('Export CSV:', csvData);
    
  };

  // Statistiques
  const stats = [
    {
      title: "Total inscriptions",
      value: inscriptions.length,
      icon: <Users className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-100"
    },
    {
      title: "En attente",
      value: inscriptions.filter(i => i.status === 'pending').length,
      icon: <Clock className="h-5 w-5 text-amber-600" />,
      color: "bg-amber-100"
    },
    {
      title: "Approuvées",
      value: inscriptions.filter(i => i.status === 'approved').length,
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      color: "bg-green-100"
    },
    {
      title: "Rejetées",
      value: inscriptions.filter(i => i.status === 'rejected').length,
      icon: <XCircle className="h-5 w-5 text-red-600" />,
      color: "bg-red-100"
    }
  ];

  // Affichage détaillé d'une inscription
  const renderInscriptionDetails = () => {
    if (!currentInscription) return null;

    return (
      <div className="space-y-6">
        {/* Informations personnelles */}
        <div className="space-y-4">
          <h3 className="font-medium text-slate-900">Informations personnelles</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <Label className="text-slate-500">Nom complet</Label>
              <p className="font-medium">{currentInscription.firstName} {currentInscription.lastName}</p>
            </div>
            <div>
              <Label className="text-slate-500">Email</Label>
              <p>{currentInscription.email}</p>
            </div>
            <div>
              <Label className="text-slate-500">Téléphone</Label>
              <p>{currentInscription.phone}</p>
            </div>
            <div>
              <Label className="text-slate-500">Date de naissance</Label>
              <p>{new Date(currentInscription.dateOfBirth).toLocaleDateString('fr-FR')}</p>
            </div>
            <div className="col-span-2">
              <Label className="text-slate-500">Profession</Label>
              <p>{currentInscription.profession}</p>
            </div>
          </div>
        </div>

        {/* Motivation et expérience */}
        <div className="space-y-4">
          <h3 className="font-medium text-slate-900">Motivation et expérience</h3>
          <div className="space-y-3 text-sm">
            <div>
              <Label className="text-slate-500">Motivation</Label>
              <p className="mt-1 p-3 bg-slate-50 rounded">{currentInscription.motivation}</p>
            </div>
            <div>
              <Label className="text-slate-500">Expérience précédente</Label>
              <p className="mt-1 p-3 bg-slate-50 rounded">{currentInscription.previousExperience}</p>
            </div>
          </div>
        </div>

        {/* Machines d'intérêt */}
        <div className="space-y-4">
          <h3 className="font-medium text-slate-900">Machines d'intérêt</h3>
          <div className="flex flex-wrap gap-2">
            {currentInscription.interestedMachines.map((machine, index) => (
              <Badge key={index} variant="secondary">
                {machine}
              </Badge>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className="space-y-4">
          <h3 className="font-medium text-slate-900">Documents fournis</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between p-2 bg-slate-50 rounded">
              <span>Carte d'identité</span>
              {currentInscription.documents.identityCard ? (
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Télécharger
                </Button>
              ) : (
                <span className="text-red-600">Non fourni</span>
              )}
            </div>
            <div className="flex items-center justify-between p-2 bg-slate-50 rounded">
              <span>Photo</span>
              {currentInscription.documents.photo ? (
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Télécharger
                </Button>
              ) : (
                <span className="text-red-600">Non fourni</span>
              )}
            </div>
          </div>
        </div>

        {/* Statut et révision */}
        <div className="space-y-4">
          <h3 className="font-medium text-slate-900">Statut de l'inscription</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Label className="text-slate-500">Statut:</Label>
              <Badge 
                variant="outline" 
                className={INSCRIPTION_STATUS.find(s => s.value === currentInscription.status)?.color}
              >
                {INSCRIPTION_STATUS.find(s => s.value === currentInscription.status)?.label}
              </Badge>
            </div>
            
            {currentInscription.reviewedAt && (
              <>
                <div>
                  <Label className="text-slate-500">Révisé le</Label>
                  <p>{new Date(currentInscription.reviewedAt).toLocaleDateString('fr-FR')}</p>
                </div>
                <div>
                  <Label className="text-slate-500">Révisé par</Label>
                  <p>{currentInscription.reviewedBy}</p>
                </div>
              </>
            )}
            
            {currentInscription.accessKey && (
              <div>
                <Label className="text-slate-500">Clé d'accès</Label>
                <p className="font-mono font-medium">{currentInscription.accessKey}</p>
              </div>
            )}
            
            {currentInscription.rejectionReason && (
              <div>
                <Label className="text-slate-500">Raison du rejet</Label>
                <p className="mt-1 p-3 bg-red-50 text-red-800 rounded">{currentInscription.rejectionReason}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Inscriptions FabLab</h1>
          <p className="text-slate-500">Validez les demandes d'accès au FabLab</p>
        </div>
        <Button onClick={handleExportData}>
          <Download className="h-4 w-4 mr-2" />
          Exporter
        </Button>
      </div>

      {/* Informations */}
      <InfoPanel
        title="Processus de validation"
        icon={<AlertTriangle className="h-5 w-5" />}
        variant="warning"
      >
        <p className="text-sm text-amber-800">
          Vérifiez soigneusement les documents et la motivation de chaque candidat avant d'approuver l'accès au FabLab.
          Les candidats approuvés recevront une clé d'accès unique.
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
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-slate-600">{stat.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filtres */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <CardTitle>Gestion des inscriptions</CardTitle>
              <CardDescription>
                Validez ou rejetez les demandes d'accès au FabLab
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  {INSCRIPTION_STATUS.map((status) => (
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
            columns={columns}
            data={inscriptions}
            keyField="id"
            isLoading={isLoading}
            totalItems={totalInscriptions}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onSearch={(query) => {
              setSearchQuery(query);
              setCurrentPage(1);
            }}
            searchPlaceholder="Rechercher une inscription..."
          />
        </CardContent>
      </Card>

      {/* Dialogue de visualisation */}
      <FormDialog
        isOpen={isViewDialogOpen}
        onClose={() => setIsViewDialogOpen(false)}
        title="Détails de l'inscription"
        description="Informations complètes du candidat"
        onSubmit={async () => {}}
      >
        {renderInscriptionDetails()}
      </FormDialog>

      {/* Dialogue de rejet */}
      <FormDialog
        isOpen={isRejectDialogOpen}
        onClose={() => setIsRejectDialogOpen(false)}
        onSubmit={confirmRejectInscription}
        title="Rejeter l'inscription"
        description="Indiquez la raison du rejet"
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="rejectionReason">Raison du rejet</Label>
            <Textarea
              id="rejectionReason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Expliquez pourquoi cette inscription est rejetée..."
              className="mt-1"
            />
          </div>
        </div>
      </FormDialog>

      {/* Dialogue de suppression */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDeleteInscription}
        title="Supprimer l'inscription"
        description={`Êtes-vous sûr de vouloir supprimer l'inscription de ${currentInscription?.firstName} ${currentInscription?.lastName} ? Cette action est irréversible.`}
      />
    </div>
  );
};

export default AdminInscriptionsFablabPage;
