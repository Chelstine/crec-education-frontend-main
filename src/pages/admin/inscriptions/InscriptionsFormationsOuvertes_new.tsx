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
  BookOpen,
  Users,
  UserCheck,
  UserX,
  Calendar,
  Building,
  Award,
  FileText,
  Upload,
  CreditCard
} from 'lucide-react';

// Types pour les inscriptions Formations Ouvertes - alignés avec le formulaire
interface InscriptionFormationOuverte {
  id: string;
  candidateId: string;
  firstName: string;
  lastName: string;
  candidateName: string;
  email: string;
  phone: string;
  formation: string;
  formationLabel: string;
  price: string;
  level: 'debutant' | 'intermediaire' | 'avance';
  motivation: string;
  applicationDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  paymentReceipt: {
    uploaded: boolean;
    filename?: string;
    verified: boolean;
  };
  paymentMethod: 'mobile_money' | 'bank' | 'offline';
  feePaid: boolean;
  notes?: string;
  processedBy?: string;
  createdAt: string;
  updatedAt: string;
}

const InscriptionsFormationsOuvertes: React.FC = () => {
  const [inscriptions, setInscriptions] = useState<InscriptionFormationOuverte[]>([]);
  const [filteredInscriptions, setFilteredInscriptions] = useState<InscriptionFormationOuverte[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterFormation, setFilterFormation] = useState<string>('all');
  const [selectedInscription, setSelectedInscription] = useState<InscriptionFormationOuverte | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  // Formations disponibles - alignées avec le formulaire d'inscription
  const formations = [
    { value: "anglais", label: "Anglais", price: "15,000" },
    { value: "francais", label: "Français", price: "12,000" },
    { value: "informatique", label: "Informatique de base", price: "20,000" },
    { value: "bureautique", label: "Bureautique (Word, Excel, PowerPoint)", price: "18,000" },
    { value: "accompagnement", label: "Accompagnement scolaire", price: "10,000" },
    { value: "entrepreneuriat", label: "Entrepreneuriat", price: "25,000" }
  ];

  // Mock data pour les inscriptions - basé sur le formulaire d'inscription
  const mockInscriptions: InscriptionFormationOuverte[] = [
    {
      id: '1',
      candidateId: 'FO001',
      firstName: 'Marie',
      lastName: 'KOUASSI',
      candidateName: 'KOUASSI Marie',
      email: 'marie.kouassi@email.com',
      phone: '+228 90 12 34 56',
      formation: 'anglais',
      formationLabel: 'Anglais',
      price: '15,000',
      level: 'debutant',
      motivation: 'Je souhaite améliorer mon anglais pour mon travail et pour pouvoir communiquer avec des clients internationaux.',
      applicationDate: '2024-12-15',
      status: 'pending',
      paymentReceipt: {
        uploaded: true,
        filename: 'recu_orange_money_marie.jpg',
        verified: false
      },
      paymentMethod: 'mobile_money',
      feePaid: false,
      notes: 'Candidature complète, en attente de vérification du paiement',
      createdAt: '2024-12-15',
      updatedAt: '2024-12-20'
    },
    {
      id: '2',
      candidateId: 'FO002',
      firstName: 'Jean',
      lastName: 'ABLODÉ',
      candidateName: 'ABLODÉ Jean',
      email: 'jean.ablode@email.com',
      phone: '+228 91 23 45 67',
      formation: 'informatique',
      formationLabel: 'Informatique de base',
      price: '20,000',
      level: 'debutant',
      motivation: 'Je veux apprendre les bases de l\'informatique pour pouvoir utiliser un ordinateur au travail.',
      applicationDate: '2024-12-10',
      status: 'approved',
      paymentReceipt: {
        uploaded: true,
        filename: 'virement_boa_jean.pdf',
        verified: true
      },
      paymentMethod: 'bank',
      feePaid: true,
      notes: 'Paiement vérifié, inscription confirmée pour la session de janvier',
      processedBy: 'Admin CREC',
      createdAt: '2024-12-10',
      updatedAt: '2024-12-18'
    },
    {
      id: '3',
      candidateId: 'FO003',
      firstName: 'Akossiwa',
      lastName: 'TOGNON',
      candidateName: 'TOGNON Akossiwa',
      email: 'akossiwa.tognon@email.com',
      phone: '+228 92 34 56 78',
      formation: 'bureautique',
      formationLabel: 'Bureautique (Word, Excel, PowerPoint)',
      price: '18,000',
      level: 'intermediaire',
      motivation: 'J\'ai besoin de perfectionner mes compétences en bureautique pour mon nouveau poste de secrétaire.',
      applicationDate: '2024-12-08',
      status: 'completed',
      paymentReceipt: {
        uploaded: true,
        filename: 'mtn_momo_akossiwa.jpg',
        verified: true
      },
      paymentMethod: 'mobile_money',
      feePaid: true,
      notes: 'Formation terminée avec succès, certificat délivré',
      processedBy: 'Admin CREC',
      createdAt: '2024-12-08',
      updatedAt: '2024-12-19'
    },
    {
      id: '4',
      candidateId: 'FO004',
      firstName: 'Emmanuel',
      lastName: 'KODJO',
      candidateName: 'KODJO Emmanuel',
      email: 'emmanuel.kodjo@email.com',
      phone: '+228 93 45 67 89',
      formation: 'entrepreneuriat',
      formationLabel: 'Entrepreneuriat',
      price: '25,000',
      level: 'avance',
      motivation: 'Je veux développer mon projet d\'entreprise et apprendre les techniques modernes de gestion.',
      applicationDate: '2024-12-12',
      status: 'rejected',
      paymentReceipt: {
        uploaded: false,
        verified: false
      },
      paymentMethod: 'offline',
      feePaid: false,
      notes: 'Reçu de paiement non fourni dans les délais impartis',
      processedBy: 'Admin CREC',
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
        inscription.candidateId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inscription.formationLabel.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(inscription => inscription.status === filterStatus);
    }

    if (filterFormation !== 'all') {
      filtered = filtered.filter(inscription => inscription.formation === filterFormation);
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

  const getLevelBadge = (level: string) => {
    const levelConfig = {
      'debutant': { color: 'bg-green-100 text-green-800', label: 'Débutant' },
      'intermediaire': { color: 'bg-yellow-100 text-yellow-800', label: 'Intermédiaire' },
      'avance': { color: 'bg-red-100 text-red-800', label: 'Avancé' }
    };
    const config = levelConfig[level as keyof typeof levelConfig];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getPaymentBadge = (paymentReceipt: any, feePaid: boolean) => {
    if (feePaid) {
      return <Badge className="bg-green-100 text-green-800">✓ Payé</Badge>;
    } else if (paymentReceipt.uploaded && paymentReceipt.verified) {
      return <Badge className="bg-blue-100 text-blue-800">✓ Vérifié</Badge>;
    } else if (paymentReceipt.uploaded) {
      return <Badge className="bg-yellow-100 text-yellow-800">⏳ En vérification</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800">✗ Non fourni</Badge>;
    }
  };

  const handleStatusChange = (inscriptionId: string, newStatus: string) => {
    setInscriptions(prev => prev.map(inscription => 
      inscription.id === inscriptionId 
        ? { ...inscription, status: newStatus as any, updatedAt: new Date().toISOString() }
        : inscription
    ));
  };

  const openDetailDialog = (inscription: InscriptionFormationOuverte) => {
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
            <BookOpen className="h-8 w-8 text-crec-gold" />
            Inscriptions Formations Ouvertes
          </h1>
          <p className="text-gray-600 mt-1">Gestion des candidatures aux formations continues</p>
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
                Confirmées
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
                Certifiées
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
                    placeholder="Rechercher par nom, email ou formation..."
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
                    <SelectValue placeholder="Formation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les formations</SelectItem>
                    {formations.map((formation) => (
                      <SelectItem key={formation.value} value={formation.value}>
                        {formation.label}
                      </SelectItem>
                    ))}
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
              <span>Inscriptions Formations Ouvertes ({filteredInscriptions.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidat</TableHead>
                    <TableHead>Formation</TableHead>
                    <TableHead>Niveau</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Paiement</TableHead>
                    <TableHead>Date</TableHead>
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
                          <div className="text-sm font-medium">{inscription.formationLabel}</div>
                          <div className="text-xs text-gray-500">
                            {inscription.price} FCFA
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getLevelBadge(inscription.level)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(inscription.status)}
                      </TableCell>
                      <TableCell>
                        {getPaymentBadge(inscription.paymentReceipt, inscription.feePaid)}
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
              Informations complètes sur le candidat
            </DialogDescription>
          </DialogHeader>
          
          {selectedInscription && (
            <div className="space-y-6">
              {/* Informations personnelles */}
              <div>
                <h3 className="font-semibold mb-3">Informations personnelles</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>Prénom:</strong> {selectedInscription.firstName}</div>
                  <div><strong>Nom:</strong> {selectedInscription.lastName}</div>
                  <div><strong>Email:</strong> {selectedInscription.email}</div>
                  <div><strong>Téléphone:</strong> {selectedInscription.phone}</div>
                  <div><strong>ID Candidat:</strong> {selectedInscription.candidateId}</div>
                </div>
              </div>

              {/* Formation */}
              <div>
                <h3 className="font-semibold mb-3">Formation</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>Formation:</strong> {selectedInscription.formationLabel}</div>
                  <div><strong>Prix:</strong> {selectedInscription.price} FCFA</div>
                  <div><strong>Niveau:</strong> {selectedInscription.level}</div>
                  <div><strong>Statut:</strong> {selectedInscription.status}</div>
                </div>
              </div>

              {/* Motivation */}
              {selectedInscription.motivation && (
                <div>
                  <h3 className="font-semibold mb-3">Motivation</h3>
                  <p className="text-sm bg-gray-50 p-3 rounded">{selectedInscription.motivation}</p>
                </div>
              )}

              {/* Paiement */}
              <div>
                <h3 className="font-semibold mb-3">Informations de paiement</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>Méthode de paiement:</strong> {selectedInscription.paymentMethod}</div>
                  <div><strong>Statut du paiement:</strong> {selectedInscription.feePaid ? 'Payé' : 'Non payé'}</div>
                  <div><strong>Reçu téléchargé:</strong> {selectedInscription.paymentReceipt.uploaded ? 'Oui' : 'Non'}</div>
                  <div><strong>Reçu vérifié:</strong> {selectedInscription.paymentReceipt.verified ? 'Oui' : 'Non'}</div>
                  {selectedInscription.paymentReceipt.filename && (
                    <div className="col-span-2">
                      <strong>Fichier:</strong> {selectedInscription.paymentReceipt.filename}
                    </div>
                  )}
                </div>
              </div>

              {/* Notes administratives */}
              {selectedInscription.notes && (
                <div>
                  <h3 className="font-semibold mb-3">Notes administratives</h3>
                  <p className="text-sm bg-gray-50 p-3 rounded">{selectedInscription.notes}</p>
                  {selectedInscription.processedBy && (
                    <p className="text-xs text-gray-500 mt-2">Traité par: {selectedInscription.processedBy}</p>
                  )}
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

export default InscriptionsFormationsOuvertes;
