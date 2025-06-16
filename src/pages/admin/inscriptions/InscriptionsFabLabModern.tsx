import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
  Filter,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Mail,
  Phone,
  Settings,
  Users,
  UserCheck,
  UserX,
  Calendar,
  Building,
  Award,
  FileText,
  Plus,
  Trash2,
  MoreHorizontal,
  TrendingUp,
  AlertTriangle,
  Wrench,
  Key
} from 'lucide-react';

interface FabLabInscription {
  id: string;
  candidateId: string;
  candidateName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  educationLevel: string;
  profession: string;
  experience: string;
  formationId: string;
  typeAbonnement: 'mensuel' | 'trimestriel' | 'annuel';
  applicationDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'expired';
  documents: {
    idCard: boolean;
    cv: boolean;
    motivationLetter: boolean;
    paymentReceipt: boolean;
  };
  paymentReceiptUrl?: string;
  projectDescription: string;
  notes: string;
  adminNotes?: string;
  fee: number;
  dateDebut?: string;
  dateFin?: string;
  accessKey?: string;
}

const InscriptionsFabLabModern: React.FC = () => {
  const [inscriptions, setInscriptions] = useState<FabLabInscription[]>([]);
  const [filteredInscriptions, setFilteredInscriptions] = useState<FabLabInscription[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInscription, setSelectedInscription] = useState<FabLabInscription | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Données mock
  useEffect(() => {
    const mockData: FabLabInscription[] = [
      {
        id: '1',
        candidateId: 'FAB001',
        candidateName: 'KOUASSI Marie',
        email: 'm.kouassi@email.com',
        phone: '+228 90 12 34 56',
        dateOfBirth: '1995-03-15',
        nationality: 'Ivoirienne',
        educationLevel: 'Master en Design',
        profession: 'Designer graphique',
        experience: 'Créatrice de bijoux artisanaux, intéressée par la fabrication numérique',
        formationId: '1',
        typeAbonnement: 'mensuel',
        applicationDate: '2024-12-15',
        status: 'approved',
        documents: {
          idCard: true,
          cv: true,
          motivationLetter: true,
          paymentReceipt: true
        },
        paymentReceiptUrl: '/uploads/receipts/fab001_receipt.jpg',
        projectDescription: 'Création de bijoux personnalisés avec impression 3D',
        notes: 'Profil très prometteur, expérience en design',
        adminNotes: 'Approuvé - Paiement vérifié. Accès accordé du 15/12 au 15/01.',
        fee: 25000,
        dateDebut: '2024-12-15',
        dateFin: '2025-01-15',
        accessKey: 'CREC-FAB-001-2024'
      },
      {
        id: '2',
        candidateId: 'FAB002',
        candidateName: 'HOUNKPATIN Jean',
        email: 'j.hounkpatin@email.com',
        phone: '+228 91 23 45 67',
        dateOfBirth: '1990-08-22',
        nationality: 'Béninoise',
        educationLevel: 'Licence en Génie Mécanique',
        profession: 'Technicien en mécanique',
        experience: 'Réparation et fabrication de pièces mécaniques',
        formationId: '2',
        typeAbonnement: 'trimestriel',
        applicationDate: '2024-11-20',
        status: 'approved',
        documents: {
          idCard: true,
          cv: true,
          motivationLetter: true,
          paymentReceipt: true
        },
        paymentReceiptUrl: '/uploads/receipts/fab002_receipt.jpg',
        projectDescription: 'Créer des prototypes de pièces mécaniques avec impression 3D',
        notes: 'Excellente candidature, profil parfait pour nos équipements',
        adminNotes: 'Approuvé - Paiement vérifié. Accès accordé.',
        fee: 65000,
        dateDebut: '2024-12-01',
        dateFin: '2025-03-01',
        accessKey: 'CREC-FAB-002-2024'
      },
      {
        id: '3',
        candidateId: 'FAB003',
        candidateName: 'MENSAH Paul',
        email: 'p.mensah@email.com',
        phone: '+228 92 34 56 78',
        dateOfBirth: '1992-11-05',
        nationality: 'Ghanéenne',
        educationLevel: 'Licence en Génie Mécanique',
        profession: 'Ingénieur junior',
        experience: 'Fabrication traditionnelle, découverte du numérique',
        formationId: '3',
        typeAbonnement: 'annuel',
        applicationDate: '2024-12-10',
        status: 'pending',
        documents: {
          idCard: true,
          cv: true,
          motivationLetter: false,
          paymentReceipt: false
        },
        projectDescription: 'Développer des outils agricoles adaptés au climat local',
        notes: 'Candidature intéressante, en attente de documents complémentaires',
        fee: 200000,
        accessKey: ''
      }
    ];

    setTimeout(() => {
      setInscriptions(mockData);
      setFilteredInscriptions(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filtrage
  useEffect(() => {
    let filtered = inscriptions.filter(inscription => {
      const matchesSearch = inscription.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           inscription.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           inscription.candidateId.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || inscription.status === statusFilter;
      const matchesType = typeFilter === 'all' || inscription.typeAbonnement === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });

    setFilteredInscriptions(filtered);
  }, [searchTerm, statusFilter, typeFilter, inscriptions]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'En attente', icon: Clock },
      approved: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Approuvé', icon: CheckCircle },
      rejected: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Rejeté', icon: XCircle },
      active: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Actif', icon: UserCheck },
      expired: { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Expiré', icon: UserX }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} border flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      mensuel: { color: 'bg-blue-50 text-blue-700 border-blue-200', label: 'Mensuel' },
      trimestriel: { color: 'bg-purple-50 text-purple-700 border-purple-200', label: 'Trimestriel' },
      annuel: { color: 'bg-orange-50 text-orange-700 border-orange-200', label: 'Annuel' }
    };

    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.mensuel;

    return (
      <Badge className={`${config.color} border text-xs`}>
        {config.label}
      </Badge>
    );
  };

  const handleApprove = (id: string) => {
    const inscription = inscriptions.find(i => i.id === id);
    if (!inscription) return;

    const accessKey = `CREC-FAB-${inscription.candidateId}-2024`;
    const now = new Date();
    let endDate = new Date(now);

    // Calculer la date de fin selon le type d'abonnement
    switch (inscription.typeAbonnement) {
      case 'mensuel':
        endDate.setMonth(endDate.getMonth() + 1);
        break;
      case 'trimestriel':
        endDate.setMonth(endDate.getMonth() + 3);
        break;
      case 'annuel':
        endDate.setFullYear(endDate.getFullYear() + 1);
        break;
    }

    setInscriptions(prev => prev.map(i => 
      i.id === id 
        ? { 
            ...i, 
            status: 'approved' as const,
            accessKey,
            dateDebut: now.toISOString().split('T')[0],
            dateFin: endDate.toISOString().split('T')[0],
            adminNotes: `Approuvé le ${now.toLocaleDateString('fr-FR')} - Clé d'accès générée`
          }
        : i
    ));
  };

  const handleReject = (id: string) => {
    setInscriptions(prev => prev.map(i => 
      i.id === id 
        ? { 
            ...i, 
            status: 'rejected' as const,
            adminNotes: `Rejeté le ${new Date().toLocaleDateString('fr-FR')}`
          }
        : i
    ));
  };

  const stats = {
    total: inscriptions.length,
    pending: inscriptions.filter(i => i.status === 'pending').length,
    approved: inscriptions.filter(i => i.status === 'approved').length,
    active: inscriptions.filter(i => i.status === 'active').length,
    revenue: inscriptions.filter(i => i.status === 'approved').reduce((sum, i) => sum + i.fee, 0)
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">Chargement des inscriptions...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête avec statistiques */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Wrench className="mr-3 h-7 w-7 text-blue-600" />
            Inscriptions FabLab
          </h1>
          <p className="text-gray-600 mt-1">
            Gestion des abonnements et accès au FabLab
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Nouvel abonnement
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En attente</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approuvés</p>
                <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Actifs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
              </div>
              <UserCheck className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenus</p>
                <p className="text-xl font-bold text-gray-900">{stats.revenue.toLocaleString()} F</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher par nom, email ou ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="approved">Approuvé</SelectItem>
                <SelectItem value="rejected">Rejeté</SelectItem>
                <SelectItem value="active">Actif</SelectItem>
                <SelectItem value="expired">Expiré</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Type d'abonnement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="mensuel">Mensuel</SelectItem>
                <SelectItem value="trimestriel">Trimestriel</SelectItem>
                <SelectItem value="annuel">Annuel</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table des inscriptions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Liste des inscriptions ({filteredInscriptions.length})</span>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filtres avancés
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidat</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Date début</TableHead>
                  <TableHead>Date fin</TableHead>
                  <TableHead>Clé d'accès</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filteredInscriptions.map((inscription) => (
                    <motion.tr
                      key={inscription.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="group hover:bg-gray-50"
                    >
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium text-sm">
                              {inscription.candidateName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{inscription.candidateName}</p>
                            <p className="text-sm text-gray-500">{inscription.email}</p>
                            <p className="text-xs text-gray-400">{inscription.candidateId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getTypeBadge(inscription.typeAbonnement)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(inscription.status)}
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{inscription.fee.toLocaleString()} F</span>
                      </TableCell>
                      <TableCell>
                        {inscription.dateDebut ? (
                          <span className="text-sm">{new Date(inscription.dateDebut).toLocaleDateString('fr-FR')}</span>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {inscription.dateFin ? (
                          <span className="text-sm">{new Date(inscription.dateFin).toLocaleDateString('fr-FR')}</span>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {inscription.accessKey ? (
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-green-50 text-green-700 border-green-200 font-mono text-xs">
                              <Key className="w-3 h-3 mr-1" />
                              {inscription.accessKey}
                            </Badge>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedInscription(inscription);
                              setShowDetailsModal(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {inscription.status === 'pending' && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleApprove(inscription.id)}
                                className="text-green-600 hover:text-green-700"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleReject(inscription.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
          
          {filteredInscriptions.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune inscription trouvée</h3>
              <p className="mt-1 text-sm text-gray-500">
                Aucune inscription ne correspond à vos critères de recherche.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de détails */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <UserCheck className="mr-2 h-5 w-5" />
              Détails de l'inscription
            </DialogTitle>
            <DialogDescription>
              Informations complètes sur l'inscription de {selectedInscription?.candidateName}
            </DialogDescription>
          </DialogHeader>
          
          {selectedInscription && (
            <div className="space-y-6">
              {/* Informations personnelles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Building className="mr-2 h-5 w-5" />
                      Informations personnelles
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Nom complet</label>
                      <p className="text-sm">{selectedInscription.candidateName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p className="text-sm">{selectedInscription.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Téléphone</label>
                      <p className="text-sm">{selectedInscription.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Date de naissance</label>
                      <p className="text-sm">{new Date(selectedInscription.dateOfBirth).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Nationalité</label>
                      <p className="text-sm">{selectedInscription.nationality}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Award className="mr-2 h-5 w-5" />
                      Formation et expérience
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Niveau d'études</label>
                      <p className="text-sm">{selectedInscription.educationLevel}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Profession</label>
                      <p className="text-sm">{selectedInscription.profession}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Expérience</label>
                      <p className="text-sm">{selectedInscription.experience}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Abonnement et statut */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Settings className="mr-2 h-5 w-5" />
                    Abonnement et statut
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Type d'abonnement</label>
                      <div className="mt-1">
                        {getTypeBadge(selectedInscription.typeAbonnement)}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Statut</label>
                      <div className="mt-1">
                        {getStatusBadge(selectedInscription.status)}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Montant</label>
                      <p className="text-lg font-semibold">{selectedInscription.fee.toLocaleString()} F</p>
                    </div>
                  </div>
                  
                  {selectedInscription.accessKey && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <label className="text-sm font-medium text-green-800">Clé d'accès FabLab</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className="bg-green-100 text-green-800 border-green-300 font-mono">
                          <Key className="w-3 h-3 mr-1" />
                          {selectedInscription.accessKey}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Copier
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Description du projet */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Description du projet
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{selectedInscription.projectDescription}</p>
                </CardContent>
              </Card>

              {/* Notes et commentaires */}
              {(selectedInscription.notes || selectedInscription.adminNotes) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Notes et commentaires</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedInscription.notes && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Notes du candidat</label>
                        <p className="text-sm bg-gray-50 p-3 rounded-lg">{selectedInscription.notes}</p>
                      </div>
                    )}
                    {selectedInscription.adminNotes && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Notes administratives</label>
                        <p className="text-sm bg-blue-50 p-3 rounded-lg">{selectedInscription.adminNotes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsModal(false)}>
              Fermer
            </Button>
            {selectedInscription?.status === 'pending' && (
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  className="text-red-600 border-red-300 hover:bg-red-50"
                  onClick={() => {
                    handleReject(selectedInscription.id);
                    setShowDetailsModal(false);
                  }}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Rejeter
                </Button>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    handleApprove(selectedInscription.id);
                    setShowDetailsModal(false);
                  }}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approuver
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InscriptionsFabLabModern;
