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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import {
  Search,
  Filter,
  Eye,
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
  FileText,
  FileDown,
  BarChart2,
  AlertCircle,
} from 'lucide-react';
import { Label } from '@/components/ui/label';

// Types
interface InscriptionISTMR {
  id: string;
  candidateId: string;
  candidateName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  gender: 'M' | 'F';
  address: string;
  city: string;
  
  // Éducation précédente
  previousEducation: string;
  lastDiploma: string;
  lastSchool: string;
  graduationYear: string;
  grades: string; // mention ou notes
  
  // Formation choisie
  formationId: string;
  formationTitle: string;
  formationType: 'licence' | 'master' | 'specialisation';
  
  // Documents requis
  documents: {
    cv: { submitted: boolean; url?: string; verified: boolean; };
    transcript: { submitted: boolean; url?: string; verified: boolean; };
    motivationLetter: { submitted: boolean; url?: string; verified: boolean; };
    idCard: { submitted: boolean; url?: string; verified: boolean; };
    diploma: { submitted: boolean; url?: string; verified: boolean; };
    birthCertificate: { submitted: boolean; url?: string; verified: boolean; };
    photos: { submitted: boolean; url?: string; verified: boolean; };
    paymentReceipt: { submitted: boolean; url?: string; verified: boolean; };
    recommendationLetter?: { submitted: boolean; url?: string; verified: boolean; };
  };
  
  // Inscription
  applicationDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'waitlisted' | 'archived';
  academicYear: string;
  semester: string;
  
  // Paiement
  fraisInscription: number;
  montantPaye: number;
  statutPaiement: 'pending' | 'partial' | 'complete';
  
  // Suivi administratif
  notes?: string;
  adminNotes?: string;
  processedBy?: string;
  processedDate?: string;
  rejectionReason?: string;
  
  // Entretien (optionnel)
  interviewDate?: string;
  interviewNotes?: string;
  interviewScore?: number;
  
  // Bourse (optionnel)
  scholarship?: {
    applied: boolean;
    type?: string;
    amount?: number;
    status?: 'pending' | 'approved' | 'rejected';
  };
  
  createdAt: string;
  updatedAt: string;
}

interface Formation {
  id: string;
  title: string;
  type: 'licence' | 'master' | 'specialisation';
}

const InscriptionsISTMR: React.FC = () => {
  const [inscriptions, setInscriptions] = useState<InscriptionISTMR[]>([]);
  const [filteredInscriptions, setFilteredInscriptions] = useState<InscriptionISTMR[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterFormation, setFilterFormation] = useState<string>('all');
  const [filterYear, setFilterYear] = useState<string>('all');
  const [selectedInscription, setSelectedInscription] = useState<InscriptionISTMR | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [reviewStatus, setReviewStatus] = useState<'approved' | 'rejected' | 'waitlisted' | ''>('');
  const [reviewComment, setReviewComment] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Mock data
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
        diploma: true,
      },
      notes: 'Candidat très motivé avec un excellent dossier académique',
      academicYear: '2025-2026',
      semester: '1er semestre',
      tuitionPaid: 0,
      tuitionTotal: 500000,
      createdAt: '2024-11-15',
      updatedAt: '2024-12-20',
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
        recommendationLetter: true,
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
      updatedAt: '2024-12-18',
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
        recommendationLetter: true,
      },
      notes: 'Bon dossier mais places limitées. En attente de désistement.',
      academicYear: '2025-2026',
      semester: '2ème semestre',
      tuitionPaid: 0,
      tuitionTotal: 400000,
      createdAt: '2024-12-01',
      updatedAt: '2024-12-20',
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
        diploma: false,
      },
      notes: 'Dossier incomplet. Documents manquants non fournis dans les délais.',
      academicYear: '2025-2026',
      semester: '1er semestre',
      tuitionPaid: 0,
      tuitionTotal: 500000,
      createdAt: '2024-09-30',
      updatedAt: '2024-11-15',
    },
  ];

  // Mock formations
  const formations: Formation[] = [
    { id: '1', title: 'Licence en Théologie Fondamentale', type: 'licence' },
    { id: '2', title: 'Master en Théologie Pastorale', type: 'master' },
    { id: '3', title: 'Spécialisation en Théologie Africaine', type: 'specialisation' },
  ];

  // Academic years
  const academicYears = ['all', '2025-2026', '2024-2025', '2023-2024'];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setInscriptions(mockInscriptions);
      setFilteredInscriptions(mockInscriptions);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtering
  useEffect(() => {
    let filtered = inscriptions;

    if (searchTerm) {
      filtered = filtered.filter((inscription) =>
        inscription.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inscription.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inscription.candidateId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter((inscription) => inscription.status === filterStatus);
    }

    if (filterFormation !== 'all') {
      filtered = filtered.filter((inscription) => inscription.formationId === filterFormation);
    }

    if (filterYear !== 'all') {
      filtered = filtered.filter((inscription) => inscription.academicYear === filterYear);
    }

    if (activeTab !== 'all') {
      filtered = filtered.filter((inscription) => inscription.status === activeTab);
    }

    setFilteredInscriptions(filtered);
  }, [inscriptions, searchTerm, filterStatus, filterFormation, filterYear, activeTab]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'En attente', icon: Clock },
      approved: { color: 'bg-green-100 text-green-800', label: 'Approuvée', icon: CheckCircle },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Rejetée', icon: XCircle },
      waitlisted: { color: 'bg-blue-100 text-blue-800', label: 'Liste d\'attente', icon: Users },
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
      specialisation: { color: 'bg-orange-100 text-orange-800', label: 'Spécialisation' },
    };
    const config = typeConfig[type as keyof typeof typeConfig];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const calculateDocumentCompleteness = (documents: InscriptionISTMR['documents']) => {
    const required = ['cv', 'transcript', 'motivationLetter', 'idCard', 'diploma'];
    const completed = required.filter((doc) => documents[doc]).length;
    return Math.round((completed / required.length) * 100);
  };

  const handleReviewApplication = () => {
    if (!selectedInscription || !reviewStatus) return;

    const updatedInscription = {
      ...selectedInscription,
      status: reviewStatus,
      notes: selectedInscription.notes
        ? `${selectedInscription.notes}\nReview (${new Date().toLocaleDateString('fr-FR')}): ${reviewComment}`
        : `Review (${new Date().toLocaleDateString('fr-FR')}): ${reviewComment}`,
      updatedAt: new Date().toISOString(),
    };

    setInscriptions((prev) =>
      prev.map((inscription) => (inscription.id === selectedInscription.id ? updatedInscription : inscription))
    );
    setFilteredInscriptions((prev) =>
      prev.map((inscription) => (inscription.id === selectedInscription.id ? updatedInscription : inscription))
    );
    setIsReviewDialogOpen(false);
    setReviewStatus('');
    setReviewComment('');
    toast.success(`Candidature ${reviewStatus === 'approved' ? 'approuvée' : reviewStatus === 'rejected' ? 'rejetée' : 'mise en liste d\'attente'} avec succès`);
  };

  const handleExportCSV = () => {
    const headers = [
      'ID',
      'Nom Candidat',
      'Email',
      'Téléphone',
      'Formation',
      'Type',
      'Année Académique',
      'Statut',
      'Date Candidature',
      'Frais Payés',
      'Frais Totaux',
    ];
    const csvRows = [
      headers.join(','),
      ...filteredInscriptions.map((inscription) =>
        [
          inscription.candidateId,
          `"${inscription.candidateName}"`,
          inscription.email,
          inscription.phone,
          `"${inscription.formationTitle}"`,
          inscription.formationType,
          inscription.academicYear,
          inscription.status,
          new Date(inscription.applicationDate).toLocaleDateString('fr-FR'),
          inscription.tuitionPaid.toLocaleString(),
          inscription.tuitionTotal.toLocaleString(),
        ].join(',')
      ),
    ];
    const csv = csvRows.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inscriptions_istmr.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Exportation CSV réussie');
  };

  const getStats = () => {
    const total = inscriptions.length;
    const approved = inscriptions.filter((i) => i.status === 'approved').length;
    const acceptanceRate = total > 0 ? ((approved / total) * 100).toFixed(1) : '0.0';
    const byFormation = formations.map((formation) => ({
      title: formation.title,
      count: inscriptions.filter((i) => i.formationId === formation.id).length,
    }));
    return { total, approved, acceptanceRate, byFormation };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white p-4 font-sans text-[15pt]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto mb-8"
      >
        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-3xl">
              <Building className="w-8 h-8 text-blue-600" />
              Gestion des Inscriptions ISTMR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Administrez les candidatures pour les programmes de l’ISTMR, vérifiez les dossiers, et gérez les admissions.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Candidatures</p>
                <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <UserCheck className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Approuvées</p>
                <p className="text-2xl font-bold text-green-700">{stats.approved}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Taux d’Acceptation</p>
                <p className="text-2xl font-bold text-yellow-700">{stats.acceptanceRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <BarChart2 className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Programmes</p>
                <p className="text-2xl font-bold text-purple-700">{formations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="max-w-6xl mx-auto mb-8"
      >
        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-blue-600" />
              Filtres et Recherche
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Recherche</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Nom, email ou ID candidat"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Formation</Label>
              <Select value={filterFormation} onValueChange={setFilterFormation}>
                <SelectTrigger className="border-gray-300 focus:border-blue-500">
                  <SelectValue placeholder="Toutes les formations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les formations</SelectItem>
                  {formations.map((formation) => (
                    <SelectItem key={formation.id} value={formation.id}>
                      {formation.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Année Académique</Label>
              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger className="border-gray-300 focus:border-blue-500">
                  <SelectValue placeholder="Toutes les années" />
                </SelectTrigger>
                <SelectContent>
                  {academicYears.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Statut</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="border-gray-300 focus:border-blue-500">
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="approved">Approuvée</SelectItem>
                  <SelectItem value="waitlisted">Liste d’attente</SelectItem>
                  <SelectItem value="rejected">Rejetée</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Applications Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="max-w-6xl mx-auto"
      >
        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Candidatures ISTMR ({filteredInscriptions.length})
            </CardTitle>
            <Button onClick={handleExportCSV} className="bg-blue-600 hover:bg-blue-700">
              <Download className="mr-2 h-4 w-4" />
              Exporter CSV
            </Button>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">Toutes</TabsTrigger>
                <TabsTrigger value="pending">En attente</TabsTrigger>
                <TabsTrigger value="approved">Approuvées</TabsTrigger>
                <TabsTrigger value="waitlisted">Liste d’attente</TabsTrigger>
                <TabsTrigger value="rejected">Rejetées</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidat</TableHead>
                      <TableHead>Formation</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Date</TableHead>
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
                            <div className="text-xs text-gray-400">ID: {inscription.candidateId}</div>
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
                        <TableCell>{getStatusBadge(inscription.status)}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm font-medium">
                              {calculateDocumentCompleteness(inscription.documents)}% complet
                            </div>
                            <ProgressBar
                              percentage={calculateDocumentCompleteness(inscription.documents)}
                              barClassName="bg-blue-600"
                              className="h-2"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(inscription.applicationDate).toLocaleDateString('fr-FR')}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="font-medium">
                              {inscription.tuitionPaid.toLocaleString()}/{inscription.tuitionTotal.toLocaleString()} FCFA
                            </div>
                            {inscription.scholarship && (
                              <div className="text-xs text-green-600">
                                <Award className="inline w-3 h-3 mr-1" />
                                {inscription.scholarship}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedInscription(inscription);
                              setIsReviewDialogOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="pending">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidat</TableHead>
                      <TableHead>Formation</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Frais</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInscriptions
                      .filter((inscription) => inscription.status === 'pending')
                      .map((inscription) => (
                        <TableRow key={inscription.id}>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{inscription.candidateName}</div>
                              <div className="text-sm text-gray-500 flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {inscription.email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {getFormationTypeBadge(inscription.formationType)}
                              <div className="text-sm font-medium">{inscription.formationTitle}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm font-medium">
                                {calculateDocumentCompleteness(inscription.documents)}% complet
                              </div>
                              <ProgressBar
                                percentage={calculateDocumentCompleteness(inscription.documents)}
                                barClassName="bg-blue-600"
                                className="h-2"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(inscription.applicationDate).toLocaleDateString('fr-FR')}
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium">
                                {inscription.tuitionPaid.toLocaleString()}/{inscription.tuitionTotal.toLocaleString()} FCFA
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedInscription(inscription);
                                setIsReviewDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="approved">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidat</TableHead>
                      <TableHead>Formation</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Frais</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInscriptions
                      .filter((inscription) => inscription.status === 'approved')
                      .map((inscription) => (
                        <TableRow key={inscription.id}>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{inscription.candidateName}</div>
                              <div className="text-sm text-gray-500 flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {inscription.email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {getFormationTypeBadge(inscription.formationType)}
                              <div className="text-sm font-medium">{inscription.formationTitle}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm font-medium">
                                {calculateDocumentCompleteness(inscription.documents)}% complet
                              </div>
                              <ProgressBar
                                percentage={calculateDocumentCompleteness(inscription.documents)}
                                barClassName="bg-blue-600"
                                className="h-2"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(inscription.applicationDate).toLocaleDateString('fr-FR')}
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium">
                                {inscription.tuitionPaid.toLocaleString()}/{inscription.tuitionTotal.toLocaleString()} FCFA
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedInscription(inscription);
                                setIsReviewDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="waitlisted">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidat</TableHead>
                      <TableHead>Formation</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Frais</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInscriptions
                      .filter((inscription) => inscription.status === 'waitlisted')
                      .map((inscription) => (
                        <TableRow key={inscription.id}>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{inscription.candidateName}</div>
                              <div className="text-sm text-gray-500 flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {inscription.email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {getFormationTypeBadge(inscription.formationType)}
                              <div className="text-sm font-medium">{inscription.formationTitle}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm font-medium">
                                {calculateDocumentCompleteness(inscription.documents)}% complet
                              </div>
                              <ProgressBar
                                percentage={calculateDocumentCompleteness(inscription.documents)}
                                barClassName="bg-blue-600"
                                className="h-2"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(inscription.applicationDate).toLocaleDateString('fr-FR')}
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium">
                                {inscription.tuitionPaid.toLocaleString()}/{inscription.tuitionTotal.toLocaleString()} FCFA
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedInscription(inscription);
                                setIsReviewDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="rejected">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidat</TableHead>
                      <TableHead>Formation</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Frais</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInscriptions
                      .filter((inscription) => inscription.status === 'rejected')
                      .map((inscription) => (
                        <TableRow key={inscription.id}>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{inscription.candidateName}</div>
                              <div className="text-sm text-gray-500 flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {inscription.email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {getFormationTypeBadge(inscription.formationType)}
                              <div className="text-sm font-medium">{inscription.formationTitle}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm font-medium">
                                {calculateDocumentCompleteness(inscription.documents)}% complet
                              </div>
                              <ProgressBar
                                percentage={calculateDocumentCompleteness(inscription.documents)}
                                barClassName="bg-blue-600"
                                className="h-2"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(inscription.applicationDate).toLocaleDateString('fr-FR')}
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium">
                                {inscription.tuitionPaid.toLocaleString()}/{inscription.tuitionTotal.toLocaleString()} FCFA
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedInscription(inscription);
                                setIsReviewDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
            {filteredInscriptions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Aucune candidature trouvée avec ces critères.
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Review Dialog */}
      {selectedInscription && (
        <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Vérification de Candidature</DialogTitle>
              <DialogDescription>
                Détails de la candidature de {selectedInscription.candidateName}
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="personal">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personnelles</TabsTrigger>
                <TabsTrigger value="education">Formation</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="payment">Paiement</TabsTrigger>
              </TabsList>
              <TabsContent value="personal">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>Nom:</strong> {selectedInscription.candidateName}</div>
                  <div><strong>Email:</strong> {selectedInscription.email}</div>
                  <div><strong>Téléphone:</strong> {selectedInscription.phone}</div>
                  <div>
                    <strong>Date de naissance:</strong>{' '}
                    {new Date(selectedInscription.dateOfBirth).toLocaleDateString('fr-FR')}
                  </div>
                  <div><strong>Nationalité:</strong> {selectedInscription.nationality}</div>
                  <div><strong>ID Candidat:</strong> {selectedInscription.candidateId}</div>
                </div>
              </TabsContent>
              <TabsContent value="education">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>Formation:</strong> {selectedInscription.formationTitle}</div>
                  <div><strong>Type:</strong> {getFormationTypeBadge(selectedInscription.formationType)}</div>
                  <div><strong>Éducation antérieure:</strong> {selectedInscription.previousEducation}</div>
                  <div><strong>Année académique:</strong> {selectedInscription.academicYear}</div>
                  <div><strong>Semestre:</strong> {selectedInscription.semester}</div>
                  {selectedInscription.interviewDate && (
                    <div className="col-span-2">
                      <strong>Date d’entretien:</strong>{' '}
                      {new Date(selectedInscription.interviewDate).toLocaleDateString('fr-FR')}
                    </div>
                  )}
                  {selectedInscription.interviewNotes && (
                    <div className="col-span-2">
                      <strong>Notes d’entretien:</strong>
                      <p className="bg-gray-50 p-3 rounded">{selectedInscription.interviewNotes}</p>
                    </div>
                  )}
                  {selectedInscription.notes && (
                    <div className="col-span-2">
                      <strong>Notes:</strong>
                      <p className="bg-gray-50 p-3 rounded">{selectedInscription.notes}</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="documents">
                <div className="space-y-4">
                  {Object.entries(selectedInscription.documents).map(([doc, provided]) => (
                    <div key={doc} className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center gap-2">
                        {provided ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                        <span className="text-sm capitalize">{doc.replace(/([A-Z])/g, ' $1')}</span>
                      </div>
                      {provided && (
                        <Button variant="outline" size="sm" disabled>
                          <FileDown className="mr-2 h-4 w-4" />
                          Télécharger
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="payment">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Frais payés:</strong> {selectedInscription.tuitionPaid.toLocaleString()} FCFA
                  </div>
                  <div>
                    <strong>Frais totaux:</strong> {selectedInscription.tuitionTotal.toLocaleString()} FCFA
                  </div>
                  {selectedInscription.scholarship && (
                    <div className="col-span-2">
                      <strong>Bourse:</strong> {selectedInscription.scholarship}
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            <div className="mt-6 space-y-4">
              <div>
                <Label>Statut de la Candidature</Label>
                <Select
                  value={reviewStatus}
                  onValueChange={(value) => setReviewStatus(value as 'approved' | 'rejected' | 'waitlisted')}
                >
                  <SelectTrigger className="border-gray-300 focus:border-blue-500">
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">Approuver</SelectItem>
                    <SelectItem value="rejected">Rejeter</SelectItem>
                    <SelectItem value="waitlisted">Liste d’attente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Commentaire</Label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Ajoutez un commentaire sur la décision (optionnel)"
                  className="w-full border-gray-300 focus:border-blue-500 rounded-md p-2"
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
                Annuler
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleReviewApplication}
                disabled={!reviewStatus}
              >
                Soumettre la Décision
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Important Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="max-w-6xl mx-auto mt-8"
      >
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800 mb-2">Information importante</h3>
              <ul className="text-amber-700 text-sm space-y-1">
                <li>• Les candidatures doivent être traitées dans un délai de 5 jours ouvrables.</li>
                <li>• Assurez-vous de vérifier tous les documents avant de prendre une décision.</li>
                <li>• Les décisions sont définitives après soumission.</li>
                <li>• Contactez les candidats approuvés pour les prochaines étapes.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default InscriptionsISTMR;