import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import ProgressBar from '@/components/ui/progress-bar';
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
  FileText
} from 'lucide-react';

// Types pour les inscriptions FabLab
interface InscriptionFabLab {
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
  formationTitle: string;
  formationType: 'formation-courte' | 'atelier' | 'projet-personnel';
  applicationDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  documents: {
    idCard: boolean;
    cv: boolean;
    motivationLetter: boolean;
    portfolio?: boolean;
  };
  projectDescription?: string;
  notes?: string;
  sessionDate?: string;
  duration: number; // en heures
  fee: number;
  feePaid: boolean;
  createdAt: string;
  updatedAt: string;
}

const InscriptionsFabLab: React.FC = () => {
  const [inscriptions, setInscriptions] = useState<InscriptionFabLab[]>([]);
  const [filteredInscriptions, setFilteredInscriptions] = useState<InscriptionFabLab[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterFormation, setFilterFormation] = useState<string>('all');
  const [selectedInscription, setSelectedInscription] = useState<InscriptionFabLab | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  // Mock data pour les inscriptions FabLab
  const mockInscriptions: InscriptionFabLab[] = [
    {
      id: '1',
      candidateId: 'FAB001',
      candidateName: 'KODJO Emmanuel',
      email: 'e.kodjo@email.com',
      phone: '+228 90 12 34 56',
      dateOfBirth: '1995-08-15',
      nationality: 'Togolaise',
      educationLevel: 'Baccalauréat',
      profession: 'Étudiant en informatique',
      experience: 'Débutant en fabrication numérique',
      formationId: '1',
      formationTitle: 'Initiation à l\'impression 3D',
      formationType: 'formation-courte',
      applicationDate: '2024-12-10',
      status: 'pending',
      documents: {
        idCard: true,
        cv: true,
        motivationLetter: true
      },
      projectDescription: 'Créer des pièces pour un projet de robotique éducative',
      notes: 'Très motivé, projet intéressant pour l\'éducation',
      sessionDate: '2024-12-25',
      duration: 8,
      fee: 25000,
      feePaid: false,
      createdAt: '2024-12-10',
      updatedAt: '2024-12-20'
    },
    {
      id: '2',
      candidateId: 'FAB002',
      candidateName: 'AYIVI Marie',
      email: 'marie.ayivi@email.com',
      phone: '+228 91 23 45 67',
      dateOfBirth: '1988-03-22',
      nationality: 'Togolaise',
      educationLevel: 'Master en Design',
      profession: 'Designer graphique',
      experience: 'Expérience avec les logiciels CAO',
      formationId: '2',
      formationTitle: 'Découpe laser avancée',
      formationType: 'atelier',
      applicationDate: '2024-11-20',
      status: 'approved',
      documents: {
        idCard: true,
        cv: true,
        motivationLetter: true,
        portfolio: true
      },
      projectDescription: 'Développer des produits artisanaux locaux avec découpe laser',
      notes: 'Excellente candidature. Portfolio très impressionnant.',
      sessionDate: '2024-12-22',
      duration: 4,
      fee: 15000,
      feePaid: true,
      createdAt: '2024-11-20',
      updatedAt: '2024-12-18'
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
      formationTitle: 'Prototypage rapide CNC',
      formationType: 'projet-personnel',
      applicationDate: '2024-12-05',
      status: 'completed',
      documents: {
        idCard: true,
        cv: true,
        motivationLetter: true
      },
      projectDescription: 'Prototyper des pièces pour machines agricoles locales',
      notes: 'Projet très pertinent pour le développement local',
      sessionDate: '2024-12-15',
      duration: 12,
      fee: 40000,
      feePaid: true,
      createdAt: '2024-12-05',
      updatedAt: '2024-12-16'
    },
    {
      id: '4',
      candidateId: 'FAB004',
      candidateName: 'JOHNSON Sandra',
      email: 'sandra.johnson@email.com',
      phone: '+228 93 45 67 89',
      dateOfBirth: '1985-07-18',
      nationality: 'Libérienne',
      educationLevel: 'BTS Électronique',
      profession: 'Technicienne en électronique',
      experience: 'Réparation électronique, intérêt pour l\'IoT',
      formationId: '4',
      formationTitle: 'Arduino et Raspberry Pi',
      formationType: 'formation-courte',
      applicationDate: '2024-12-12',
      status: 'rejected',
      documents: {
        idCard: false,
        cv: true,
        motivationLetter: true
      },
      projectDescription: 'Système de monitoring environnemental',
      notes: 'Documents incomplets. Candidature à revoir après complément.',
      duration: 6,
      fee: 20000,
      feePaid: false,
      createdAt: '2024-12-12',
      updatedAt: '2024-12-18'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setInscriptions(mockInscriptions);
      setFilteredInscriptions(mockInscriptions);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filtrage
  useEffect(() => {
    let filtered = inscriptions;

    if (searchTerm) {
      filtered = filtered.filter(inscription =>
        inscription.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inscription.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inscription.candidateId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(inscription => inscription.status === filterStatus);
    }

    if (filterFormation !== 'all') {
      filtered = filtered.filter(inscription => inscription.formationType === filterFormation);
    }

    setFilteredInscriptions(filtered);
  }, [inscriptions, searchTerm, filterStatus, filterFormation]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'En attente', icon: Clock },
      approved: { color: 'bg-green-100 text-green-800', label: 'Approuvée', icon: CheckCircle },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Rejetée', icon: XCircle },
      completed: { color: 'bg-blue-100 text-blue-800', label: 'Terminée', icon: Award }
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

  const getFormationTypeBadge = (type: string) => {
    const typeConfig = {
      'formation-courte': { color: 'bg-blue-100 text-blue-800', label: 'Formation courte' },
      'atelier': { color: 'bg-purple-100 text-purple-800', label: 'Atelier' },
      'projet-personnel': { color: 'bg-orange-100 text-orange-800', label: 'Projet personnel' }
    };
    const config = typeConfig[type as keyof typeof typeConfig];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const calculateDocumentCompleteness = (documents: any) => {
    const required = ['idCard', 'cv', 'motivationLetter'];
    const completed = required.filter(doc => documents[doc]).length;
    const optional = documents.portfolio ? 1 : 0;
    return Math.round(((completed + optional * 0.5) / (required.length + 0.5)) * 100);
  };

  const handleStatusChange = (inscriptionId: string, newStatus: string) => {
    setInscriptions(prev => prev.map(inscription => 
      inscription.id === inscriptionId 
        ? { ...inscription, status: newStatus as any, updatedAt: new Date().toISOString() }
        : inscription
    ));
  };

  const openDetailDialog = (inscription: InscriptionFabLab) => {
    setSelectedInscription(inscription);
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
            Inscriptions FabLab
          </h1>
          <p className="text-gray-600 mt-1">Gestion des inscriptions aux formations FabLab</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </motion.div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Inscriptions</CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">{inscriptions.length}</div>
              <p className="text-xs text-blue-600">
                Ce mois
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approuvées</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">
                {inscriptions.filter(i => i.status === 'approved').length}
              </div>
              <p className="text-xs text-green-600">
                Participants confirmés
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Attente</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-700">
                {inscriptions.filter(i => i.status === 'pending').length}
              </div>
              <p className="text-xs text-yellow-600">
                À traiter
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Terminées</CardTitle>
              <Award className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">
                {inscriptions.filter(i => i.status === 'completed').length}
              </div>
              <p className="text-xs text-purple-600">
                Formations achevées
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filtres et recherche */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
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
                    placeholder="Rechercher par nom, email ou ID candidat..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-4">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="approved">Approuvées</SelectItem>
                    <SelectItem value="completed">Terminées</SelectItem>
                    <SelectItem value="rejected">Rejetées</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterFormation} onValueChange={setFilterFormation}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Type de formation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value="formation-courte">Formation courte</SelectItem>
                    <SelectItem value="atelier">Atelier</SelectItem>
                    <SelectItem value="projet-personnel">Projet personnel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Liste des inscriptions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Inscriptions FabLab ({filteredInscriptions.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidat</TableHead>
                    <TableHead>Formation</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Session</TableHead>
                    <TableHead>Frais</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInscriptions.map((inscription) => (
                    <TableRow key={inscription.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{inscription.candidateName}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {inscription.email}
                          </div>
                          <div className="text-xs text-gray-400 flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {inscription.phone}
                          </div>
                          <div className="text-xs text-gray-400">
                            ID: {inscription.candidateId}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {getFormationTypeBadge(inscription.formationType)}
                          <div className="text-sm font-medium">{inscription.formationTitle}</div>
                          <div className="text-xs text-gray-500">
                            Durée: {inscription.duration}h
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(inscription.status)}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">
                            {calculateDocumentCompleteness(inscription.documents)}% complet
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <ProgressBar 
                              percentage={calculateDocumentCompleteness(inscription.documents)} 
                              barClassName="bg-blue-600"
                              className="h-2"
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {inscription.sessionDate ? (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(inscription.sessionDate).toLocaleDateString('fr-FR')}
                            </div>
                          ) : (
                            <span className="text-gray-400">Non planifiée</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">
                            {inscription.fee.toLocaleString()} FCFA
                          </div>
                          <div className="text-xs">
                            {inscription.feePaid ? (
                              <span className="text-green-600">✓ Payé</span>
                            ) : (
                              <span className="text-red-600">✗ Non payé</span>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openDetailDialog(inscription)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          {inscription.status === 'pending' && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-green-600 hover:text-green-700"
                                onClick={() => handleStatusChange(inscription.id, 'approved')}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => handleStatusChange(inscription.id, 'rejected')}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredInscriptions.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Aucune inscription trouvée avec ces critères.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Dialog de détails */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Détails de l'inscription</DialogTitle>
            <DialogDescription>
              Informations complètes sur le candidat FabLab
            </DialogDescription>
          </DialogHeader>
          
          {selectedInscription && (
            <div className="space-y-6">
              {/* Informations personnelles */}
              <div>
                <h3 className="font-semibold mb-3">Informations personnelles</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>Nom:</strong> {selectedInscription.candidateName}</div>
                  <div><strong>Email:</strong> {selectedInscription.email}</div>
                  <div><strong>Téléphone:</strong> {selectedInscription.phone}</div>
                  <div><strong>Date de naissance:</strong> {new Date(selectedInscription.dateOfBirth).toLocaleDateString('fr-FR')}</div>
                  <div><strong>Nationalité:</strong> {selectedInscription.nationality}</div>
                  <div><strong>Niveau d'études:</strong> {selectedInscription.educationLevel}</div>
                  <div><strong>Profession:</strong> {selectedInscription.profession}</div>
                  <div><strong>Expérience:</strong> {selectedInscription.experience}</div>
                </div>
              </div>

              {/* Projet */}
              {selectedInscription.projectDescription && (
                <div>
                  <h3 className="font-semibold mb-3">Description du projet</h3>
                  <p className="text-sm bg-gray-50 p-3 rounded">{selectedInscription.projectDescription}</p>
                </div>
              )}

              {/* Documents */}
              <div>
                <h3 className="font-semibold mb-3">Documents fournis</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(selectedInscription.documents).map(([doc, provided]) => (
                    <div key={doc} className="flex items-center gap-2">
                      {provided ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span className="text-sm capitalize">{doc.replace(/([A-Z])/g, ' $1')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {selectedInscription.notes && (
                <div>
                  <h3 className="font-semibold mb-3">Notes</h3>
                  <p className="text-sm bg-gray-50 p-3 rounded">{selectedInscription.notes}</p>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InscriptionsFabLab;