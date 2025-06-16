import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
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
  DollarSign
} from 'lucide-react';

// Types pour les abonnements FabLab
interface AbonnementFabLab {
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
  typeAbonnement: 'mensuel' | 'trimestriel' | 'annuel';
  applicationDate: string;
  status: 'pending' | 'approved' | 'rejected';
  documents: {
    idCard: boolean;
    cv: boolean;
    motivationLetter: boolean;
    paymentReceipt: boolean;
  };
  paymentReceiptUrl?: string;
  projectDescription?: string;
  notes?: string;
  adminNotes?: string;
  fee: number;
  dateDebut?: string;
  dateFin?: string;
  accessKey?: string;
  createdAt: string;
  updatedAt: string;
}

const AbonnementsFabLab: React.FC = () => {
  const [abonnements, setAbonnements] = useState<AbonnementFabLab[]>([]);
  const [filteredAbonnements, setFilteredAbonnements] = useState<AbonnementFabLab[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedAbonnement, setSelectedAbonnement] = useState<AbonnementFabLab | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isReceiptViewerOpen, setIsReceiptViewerOpen] = useState(false);
  const [tarifAbonnements, setTarifAbonnements] = useState({
    mensuel: 25000,
    trimestriel: 65000,
    annuel: 200000
  });

  // Mock data pour les abonnements FabLab
  const mockAbonnements: AbonnementFabLab[] = [
    {
      id: '1',
      candidateId: 'FAB001',
      candidateName: 'KODJO Emmanuel',
      email: 'e.kodjo@email.com',
      phone: '+228 90 12 34 56',
      dateOfBirth: '1995-08-15',
      nationality: 'Togolaise',
      educationLevel: 'Licence en informatique',
      profession: 'Développeur junior',
      experience: 'Débutant en fabrication numérique',
      typeAbonnement: 'mensuel',
      applicationDate: '2024-12-10',
      status: 'pending',
      documents: {
        idCard: true,
        cv: true,
        motivationLetter: true,
        paymentReceipt: true
      },
      paymentReceiptUrl: '/uploads/receipts/fab001_receipt.pdf',
      projectDescription: 'Développer des prototypes pour des projets IoT personnels',
      notes: 'Très motivé, souhaite apprendre l\'impression 3D et l\'électronique',
      fee: 25000,
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
      projectDescription: 'Créer des prototypes de produits design avec découpe laser',
      notes: 'Excellente candidature, profil parfait pour nos équipements',
      adminNotes: 'Approuvé - Paiement vérifié. Accès accordé.',
      fee: 65000,
      dateDebut: '2024-12-01',
      dateFin: '2025-03-01',
      accessKey: 'CREC-FAB-002-2024',
      createdAt: '2024-11-20',
      updatedAt: '2024-12-18'
    },
    {
      id: '3',
      candidateId: 'FAB003',
      candidateName: 'MENSAH Paul',
      email: 'p.mensah@email.com',
      phone: '+228 92 34 56 78',
      dateOfBirth: '1992-07-10',
      nationality: 'Ghanéenne',
      educationLevel: 'Licence en Génie Mécanique',
      profession: 'Ingénieur junior',
      experience: 'Fabrication traditionnelle, découverte du numérique',
      typeAbonnement: 'annuel',
      applicationDate: '2024-12-05',
      status: 'rejected',
      documents: {
        idCard: false,
        cv: true,
        motivationLetter: true,
        paymentReceipt: false
      },
      projectDescription: 'Prototyper des pièces pour machines agricoles locales',
      notes: 'Projet très intéressant mais documents incomplets',
      adminNotes: 'Rejeté - Pièce d\'identité et reçu de paiement manquants.',
      fee: 200000,
      createdAt: '2024-12-05',
      updatedAt: '2024-12-16'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAbonnements(mockAbonnements);
      setFilteredAbonnements(mockAbonnements);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filtrage des abonnements
  useEffect(() => {
    let filtered = abonnements;

    if (searchTerm) {
      filtered = filtered.filter(abonnement =>
        abonnement.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        abonnement.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        abonnement.candidateId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(abonnement => abonnement.status === filterStatus);
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(abonnement => abonnement.typeAbonnement === filterType);
    }

    setFilteredAbonnements(filtered);
  }, [searchTerm, filterStatus, filterType, abonnements]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="flex items-center gap-1"><Clock className="h-3 w-3" />En attente</Badge>;
      case 'approved':
        return <Badge variant="default" className="flex items-center gap-1 bg-green-600"><CheckCircle className="h-3 w-3" />Approuvé</Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="flex items-center gap-1"><XCircle className="h-3 w-3" />Rejeté</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      mensuel: 'bg-blue-100 text-blue-800',
      trimestriel: 'bg-purple-100 text-purple-800',
      annuel: 'bg-orange-100 text-orange-800'
    };
    return <Badge className={colors[type as keyof typeof colors]}>{type.charAt(0).toUpperCase() + type.slice(1)}</Badge>;
  };

  const handleApprove = async (id: string) => {
    const abonnement = abonnements.find(a => a.id === id);
    if (!abonnement) return;

    // Générer clé d'accès
    const accessKey = `CREC-FAB-${abonnement.candidateId}-${new Date().getFullYear()}`;
    
    // Calculer dates de début et fin
    const dateDebut = new Date().toISOString().split('T')[0];
    let dateFin = new Date();
    
    switch (abonnement.typeAbonnement) {
      case 'mensuel':
        dateFin.setMonth(dateFin.getMonth() + 1);
        break;
      case 'trimestriel':
        dateFin.setMonth(dateFin.getMonth() + 3);
        break;
      case 'annuel':
        dateFin.setFullYear(dateFin.getFullYear() + 1);
        break;
    }

    const updatedAbonnements = abonnements.map(a =>
      a.id === id ? {
        ...a,
        status: 'approved' as const,
        dateDebut,
        dateFin: dateFin.toISOString().split('T')[0],
        accessKey,
        adminNotes: 'Approuvé - Accès FabLab accordé',
        updatedAt: new Date().toISOString()
      } : a
    );

    setAbonnements(updatedAbonnements);
    
    // Simuler envoi d'email de bienvenue avec clé d'accès
    alert(`Email de bienvenue envoyé à ${abonnement.email} avec la clé d'accès: ${accessKey}`);
  };

  const handleReject = async (id: string, reason: string) => {
    const abonnement = abonnements.find(a => a.id === id);
    if (!abonnement) return;

    const updatedAbonnements = abonnements.map(a =>
      a.id === id ? {
        ...a,
        status: 'rejected' as const,
        adminNotes: `Rejeté - ${reason}`,
        updatedAt: new Date().toISOString()
      } : a
    );

    setAbonnements(updatedAbonnements);
    
    // Simuler envoi d'email de refus
    alert(`Email de refus envoyé à ${abonnement.email} avec la raison: ${reason}`);
  };

  const handleViewReceipt = (abonnement: AbonnementFabLab) => {
    setSelectedAbonnement(abonnement);
    setIsReceiptViewerOpen(true);
  };

  const stats = [
    {
      title: 'Total Demandes',
      value: abonnements.length,
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'En Attente',
      value: abonnements.filter(a => a.status === 'pending').length,
      icon: Clock,
      color: 'text-orange-600'
    },
    {
      title: 'Approuvés',
      value: abonnements.filter(a => a.status === 'approved').length,
      icon: UserCheck,
      color: 'text-green-600'
    },
    {
      title: 'Rejetés',
      value: abonnements.filter(a => a.status === 'rejected').length,
      icon: UserX,
      color: 'text-red-600'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Abonnements FabLab</h1>
          <p className="text-gray-600">Gérez les demandes d'abonnement au FabLab</p>
        </div>
        <Button onClick={() => {/* Configuration des tarifs */}}>
          <Settings className="h-4 w-4 mr-2" />
          Configurer Tarifs
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
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
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="approved">Approuvés</SelectItem>
                <SelectItem value="rejected">Rejetés</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Type abonnement" />
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

      {/* Tableau des abonnements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Demandes d'Abonnement ({filteredAbonnements.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidat</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAbonnements.map((abonnement) => (
                <TableRow key={abonnement.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{abonnement.candidateName}</div>
                      <div className="text-sm text-gray-500">{abonnement.email}</div>
                      <div className="text-sm text-gray-500">{abonnement.candidateId}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(abonnement.typeAbonnement)}</TableCell>
                  <TableCell>{abonnement.fee.toLocaleString()} FCFA</TableCell>
                  <TableCell>{new Date(abonnement.applicationDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {abonnement.documents.idCard && <Badge variant="outline" className="text-xs">ID</Badge>}
                      {abonnement.documents.cv && <Badge variant="outline" className="text-xs">CV</Badge>}
                      {abonnement.documents.motivationLetter && <Badge variant="outline" className="text-xs">LM</Badge>}
                      {abonnement.documents.paymentReceipt && <Badge variant="outline" className="text-xs">Reçu</Badge>}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(abonnement.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedAbonnement(abonnement);
                          setIsDetailDialogOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {abonnement.documents.paymentReceipt && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewReceipt(abonnement)}
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                      )}
                      {abonnement.status === 'pending' && (
                        <>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleApprove(abonnement.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              const reason = prompt('Raison du refus:');
                              if (reason) handleReject(abonnement.id, reason);
                            }}
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
        </CardContent>
      </Card>

      {/* Dialog de détails */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Détails de la demande d'abonnement</DialogTitle>
            <DialogDescription>
              Informations complètes du candidat {selectedAbonnement?.candidateName}
            </DialogDescription>
          </DialogHeader>
          
          {selectedAbonnement && (
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Informations personnelles</h3>
                <div className="space-y-2">
                  <p><strong>Nom:</strong> {selectedAbonnement.candidateName}</p>
                  <p><strong>Email:</strong> {selectedAbonnement.email}</p>
                  <p><strong>Téléphone:</strong> {selectedAbonnement.phone}</p>
                  <p><strong>Date de naissance:</strong> {selectedAbonnement.dateOfBirth}</p>
                  <p><strong>Nationalité:</strong> {selectedAbonnement.nationality}</p>
                  <p><strong>Niveau d'études:</strong> {selectedAbonnement.educationLevel}</p>
                  <p><strong>Profession:</strong> {selectedAbonnement.profession}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">Détails de l'abonnement</h3>
                <div className="space-y-2">
                  <p><strong>Type:</strong> {getTypeBadge(selectedAbonnement.typeAbonnement)}</p>
                  <p><strong>Montant:</strong> {selectedAbonnement.fee.toLocaleString()} FCFA</p>
                  <p><strong>Statut:</strong> {getStatusBadge(selectedAbonnement.status)}</p>
                  <p><strong>Date de demande:</strong> {new Date(selectedAbonnement.applicationDate).toLocaleDateString()}</p>
                  {selectedAbonnement.dateDebut && (
                    <p><strong>Période:</strong> {selectedAbonnement.dateDebut} → {selectedAbonnement.dateFin}</p>
                  )}
                  {selectedAbonnement.accessKey && (
                    <p><strong>Clé d'accès:</strong> <code className="bg-gray-100 px-2 py-1 rounded">{selectedAbonnement.accessKey}</code></p>
                  )}
                </div>
              </div>
              
              <div className="col-span-2 space-y-4">
                <h3 className="font-semibold">Expérience et projet</h3>
                <p><strong>Expérience:</strong> {selectedAbonnement.experience}</p>
                {selectedAbonnement.projectDescription && (
                  <div>
                    <strong>Description du projet:</strong>
                    <p className="mt-1 text-sm">{selectedAbonnement.projectDescription}</p>
                  </div>
                )}
                
                <h3 className="font-semibold">Notes</h3>
                {selectedAbonnement.notes && (
                  <div>
                    <strong>Notes du candidat:</strong>
                    <p className="mt-1 text-sm">{selectedAbonnement.notes}</p>
                  </div>
                )}
                {selectedAbonnement.adminNotes && (
                  <div>
                    <strong>Notes admin:</strong>
                    <p className="mt-1 text-sm">{selectedAbonnement.adminNotes}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog visualiseur de reçu */}
      <Dialog open={isReceiptViewerOpen} onOpenChange={setIsReceiptViewerOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Reçu de paiement</DialogTitle>
            <DialogDescription>
              Reçu soumis par {selectedAbonnement?.candidateName}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-center items-center h-96 bg-gray-100 rounded-lg">
            {selectedAbonnement?.paymentReceiptUrl ? (
              <div className="text-center">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Reçu de paiement: {selectedAbonnement.paymentReceiptUrl}
                </p>
                <Button className="mt-2" onClick={() => window.open(selectedAbonnement.paymentReceiptUrl, '_blank')}>
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>
              </div>
            ) : (
              <p className="text-gray-500">Aucun reçu disponible</p>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReceiptViewerOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AbonnementsFabLab;
