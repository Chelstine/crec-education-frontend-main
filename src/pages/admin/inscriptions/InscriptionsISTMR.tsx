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
  GraduationCap,
  Users,
  UserCheck,
  UserX,
  Calendar,
  Building,
  Award,
  FileText
} from 'lucide-react';

// Types pour les inscriptions ISTMR
interface InscriptionISTMR {
  id: string;
  candidateId: string;
  candidateName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  previousEducation: string;
  formationId: string;
  formationTitle: string;
  formationType: 'licence' | 'master' | 'specialisation';
  applicationDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'waitlisted';
  documents: {
    cv: boolean;
    transcript: boolean;
    motivationLetter: boolean;
    idCard: boolean;
    diploma: boolean;
    recommendationLetter?: boolean;
  };
  notes?: string;
  interviewDate?: string;
  interviewNotes?: string;
  academicYear: string;
  semester: string;
  tuitionPaid: number;
  tuitionTotal: number;
  scholarship?: string;
  createdAt: string;
  updatedAt: string;
}

const InscriptionsISTMR: React.FC = () => {
  const [inscriptions, setInscriptions] = useState<InscriptionISTMR[]>([]);
  const [filteredInscriptions, setFilteredInscriptions] = useState<InscriptionISTMR[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterFormation, setFilterFormation] = useState<string>('all');
  const [selectedInscription, setSelectedInscription] = useState<InscriptionISTMR | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  // Mock data pour les inscriptions ISTMR
  const mockInscriptions: InscriptionISTMR[] = [
    {
      id: '1',
      candidateId: 'CAND001',
      candidateName: 'KOUAKOU Jean-Baptiste',
      email: 'jb.kouakou@email.com',
      phone: '+228 90 12 34 56',
      dateOfBirth: '1995-03-15',
      nationality: 'Togolaise',
      previousEducation: 'Baccalauréat Série D',
      formationId: '1',
      formationTitle: 'Licence en Théologie Fondamentale',
      formationType: 'licence',
      applicationDate: '2024-11-15',
      status: 'pending',
      documents: {
        cv: true,
        transcript: true,
        motivationLetter: true,
        idCard: true,
        diploma: true
      },
      notes: 'Candidat très motivé avec un excellent dossier académique',
      academicYear: '2025-2026',
      semester: '1er semestre',
      tuitionPaid: 0,
      tuitionTotal: 500000,
      createdAt: '2024-11-15',
      updatedAt: '2024-12-20'
    },
    {
      id: '2',
      candidateId: 'CAND002',
      candidateName: 'ABLODÉ Marie-Claire',
      email: 'marie.ablode@email.com',
      phone: '+228 91 23 45 67',
      dateOfBirth: '1992-08-22',
      nationality: 'Togolaise',
      previousEducation: 'Licence en Philosophie',
      formationId: '2',
      formationTitle: 'Master en Théologie Pastorale',
      formationType: 'master',
      applicationDate: '2024-10-20',
      status: 'approved',
      documents: {
        cv: true,
        transcript: true,
        motivationLetter: true,
        idCard: true,
        diploma: true,
        recommendationLetter: true
      },
      notes: 'Candidature exceptionnelle. Expérience pastorale antérieure.',
      interviewDate: '2024-11-05',
      interviewNotes: 'Excellent entretien. Vocation claire et projet pastoral bien défini.',
      academicYear: '2025-2026',
      semester: '1er semestre',
      tuitionPaid: 750000,
      tuitionTotal: 750000,
      scholarship: 'Bourse d\'excellence ignatienne',
      createdAt: '2024-10-20',
      updatedAt: '2024-12-18'
    },
    {
      id: '3',
      candidateId: 'CAND003',
      candidateName: 'AGBO Pierre-Emmanuel',
      email: 'pe.agbo@email.com',
      phone: '+228 92 34 56 78',
      dateOfBirth: '1988-12-10',
      nationality: 'Béninoise',
      previousEducation: 'Master en Théologie',
      formationId: '3',
      formationTitle: 'Spécialisation en Théologie Africaine',
      formationType: 'specialisation',
      applicationDate: '2024-12-01',
      status: 'waitlisted',
      documents: {
        cv: true,
        transcript: true,
        motivationLetter: true,
        idCard: true,
        diploma: true,
        recommendationLetter: true
      },
      notes: 'Bon dossier mais places limitées. En attente de désistement.',
      academicYear: '2025-2026',
      semester: '2ème semestre',
      tuitionPaid: 0,
      tuitionTotal: 400000,
      createdAt: '2024-12-01',
      updatedAt: '2024-12-20'
    },
    {
      id: '4',
      candidateId: 'CAND004',
      candidateName: 'TOGNON Akossiwa',
      email: 'akossiwa.tognon@email.com',
      phone: '+228 93 45 67 89',
      dateOfBirth: '1990-05-18',
      nationality: 'Togolaise',
      previousEducation: 'Baccalauréat Série A',
      formationId: '1',
      formationTitle: 'Licence en Théologie Fondamentale',
      formationType: 'licence',
      applicationDate: '2024-09-30',
      status: 'rejected',
      documents: {
        cv: false,
        transcript: true,
        motivationLetter: true,
        idCard: true,
        diploma: false
      },
      notes: 'Dossier incomplet. Documents manquants non fournis dans les délais.',
      academicYear: '2025-2026',
      semester: '1er semestre',
      tuitionPaid: 0,
      tuitionTotal: 500000,
      createdAt: '2024-09-30',
      updatedAt: '2024-11-15'
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
      waitlisted: { color: 'bg-blue-100 text-blue-800', label: 'Liste d\'attente', icon: Users }
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
      licence: { color: 'bg-blue-100 text-blue-800', label: 'Licence' },
      master: { color: 'bg-purple-100 text-purple-800', label: 'Master' },
      specialisation: { color: 'bg-orange-100 text-orange-800', label: 'Spécialisation' }
    };
    const config = typeConfig[type as keyof typeof typeConfig];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const calculateDocumentCompleteness = (documents: any) => {
    const required = ['cv', 'transcript', 'motivationLetter', 'idCard', 'diploma'];
    const completed = required.filter(doc => documents[doc]).length;
    return Math.round((completed / required.length) * 100);
  };

  const handleStatusChange = (inscriptionId: string, newStatus: string) => {
    setInscriptions(prev => prev.map(inscription => 
      inscription.id === inscriptionId 
        ? { ...inscription, status: newStatus as any, updatedAt: new Date().toISOString() }
        : inscription
    ));
  };

  const openDetailDialog = (inscription: InscriptionISTMR) => {
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
            <Building className="h-8 w-8 text-crec-gold" />
            Inscriptions ISTMR
          </h1>
          <p className="text-gray-600 mt-1">Gestion des candidatures universitaires</p>
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
              <CardTitle className="text-sm font-medium">Total Candidatures</CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">{inscriptions.length}</div>
              <p className="text-xs text-blue-600">
                Cette année académique
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
                Étudiants acceptés
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
          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejetées</CardTitle>
              <UserX className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-700">
                {inscriptions.filter(i => i.status === 'rejected').length}
              </div>
              <p className="text-xs text-red-600">
                Non retenues
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
                    <SelectItem value="waitlisted">Liste d'attente</SelectItem>
                    <SelectItem value="rejected">Rejetées</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterFormation} onValueChange={setFilterFormation}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Type de formation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les formations</SelectItem>
                    <SelectItem value="licence">Licence</SelectItem>
                    <SelectItem value="master">Master</SelectItem>
                    <SelectItem value="specialisation">Spécialisation</SelectItem>
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
              <span>Candidatures ISTMR ({filteredInscriptions.length})</span>
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
                    <TableHead>Date Candidature</TableHead>
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
                            {inscription.academicYear} - {inscription.semester}
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
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(inscription.applicationDate).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">
                            {inscription.tuitionPaid.toLocaleString()}/{inscription.tuitionTotal.toLocaleString()} FCFA
                          </div>
                          <div className="text-xs text-gray-500">
                            {inscription.scholarship && (
                              <span className="text-green-600">
                                <Award className="inline w-3 h-3 mr-1" />
                                Bourse
                              </span>
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
                  Aucune candidature trouvée avec ces critères.
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
            <DialogTitle>Détails de la candidature</DialogTitle>
            <DialogDescription>
              Informations complètes sur le candidat
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
                  <div><strong>Formation antérieure:</strong> {selectedInscription.previousEducation}</div>
                </div>
              </div>

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

              {/* Entretien */}
              {selectedInscription.interviewDate && (
                <div>
                  <h3 className="font-semibold mb-3">Entretien</h3>
                  <div className="text-sm space-y-2">
                    <div><strong>Date:</strong> {new Date(selectedInscription.interviewDate).toLocaleDateString('fr-FR')}</div>
                    {selectedInscription.interviewNotes && (
                      <div className="bg-gray-50 p-3 rounded">
                        <strong>Notes d'entretien:</strong><br />
                        {selectedInscription.interviewNotes}
                      </div>
                    )}
                  </div>
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

export default InscriptionsISTMR;
