// src/pages/admin/inscriptions/AdminInscriptionsFormationsPage.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Eye, 
  CheckCircle, 
  XCircle, 
  Download, 
  Filter,
  Search,
  Calendar,
  User,
  Mail,
  Phone,
  BookOpen,
  TrendingUp
} from "lucide-react";
import { toast } from "sonner";
import inscriptionService, { FormationInscription } from "@/services/inscription-service";

const AdminInscriptionsFormationsPage: React.FC = () => {
  const [inscriptions, setInscriptions] = useState<FormationInscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInscription, setSelectedInscription] = useState<FormationInscription | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [processing, setProcessing] = useState(false);
  
  // Filtres
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [formationFilter, setFormationFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const formationNames = {
    'anglais': 'Anglais',
    'francais': 'Français',
    'informatique': 'Informatique de base',
    'bureautique': 'Bureautique (Word, Excel, PowerPoint)',
    'accompagnement': 'Accompagnement scolaire',
    'entrepreneuriat': 'Entrepreneuriat'
  };

  const levelNames = {
    'debutant': 'Débutant',
    'intermediaire': 'Intermédiaire',
    'avance': 'Avancé'
  };

  useEffect(() => {
    fetchInscriptions();
  }, [currentPage, statusFilter, formationFilter]);

  const fetchInscriptions = async () => {
    try {
      setLoading(true);
      const params: any = {
        page: currentPage,
        per_page: 15,
        ...(statusFilter !== 'all' && { status: statusFilter as any }),
        ...(formationFilter !== 'all' && { formation: formationFilter })
      };
      const response = await inscriptionService.getInscriptionsByType('formations', params);
      if (response.success) {
        setInscriptions(response.data.data as FormationInscription[]);
        setTotalPages(response.data.last_page);
      } else {
        setInscriptions([]);
        setTotalPages(1);
        toast.error('Erreur lors du chargement des inscriptions');
      }
    } catch (error) {
      console.error('Erreur lors du chargement des inscriptions:', error);
      toast.error('Erreur lors du chargement des inscriptions');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (inscription: FormationInscription) => {
    setSelectedInscription(inscription);
    setShowDetailsModal(true);
  };

  const handleApprove = (inscription: FormationInscription) => {
    setSelectedInscription(inscription);
    setAdminNotes('');
    setShowApproveModal(true);
  };

  const handleReject = (inscription: FormationInscription) => {
    setSelectedInscription(inscription);
    setAdminNotes('');
    setRejectionReason('');
    setShowRejectModal(true);
  };

  const handleDownloadReceipt = (inscription: FormationInscription) => {
    const baseUrl = import.meta.env?.VITE_API_URL || 'http://localhost:8000/api';
    // Extraire le type et le nom du fichier depuis le chemin
    const pathParts = inscription.payment_receipt_path.split('/');
    const filename = pathParts[pathParts.length - 1];
    const type = pathParts.includes('fablab') ? 'fablab' : 'formations';
    
    window.open(`${baseUrl}/download/receipt/${type}/${filename}`, '_blank');
  };

  const confirmApproval = async () => {
    if (!selectedInscription) return;
    try {
      setProcessing(true);
      const response = await inscriptionService.approveInscription('formations', selectedInscription.id, adminNotes);
      if (response.success) {
        toast.success('Inscription approuvée avec succès !');
        setShowApproveModal(false);
        fetchInscriptions();
      } else {
        toast.error(response.message || 'Erreur lors de l\'approbation');
      }
    } catch (error) {
      console.error('Erreur lors de l\'approbation:', error);
      toast.error('Erreur lors de l\'approbation');
    } finally {
      setProcessing(false);
    }
  };

  const confirmRejection = async () => {
    if (!selectedInscription || !rejectionReason.trim()) {
      toast.error('Veuillez spécifier une raison de rejet');
      return;
    }
    try {
      setProcessing(true);
      const response = await inscriptionService.rejectInscription('formations', selectedInscription.id, rejectionReason, adminNotes);
      if (response.success) {
        toast.success('Inscription rejetée avec succès !');
        setShowRejectModal(false);
        fetchInscriptions();
      } else {
        toast.error(response.message || 'Erreur lors du rejet');
      }
    } catch (error) {
      console.error('Erreur lors du rejet:', error);
      toast.error('Erreur lors du rejet');
    } finally {
      setProcessing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approuvée</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejetée</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>;
    }
  };

  const filteredInscriptions = inscriptions.filter(inscription => {
    const matchesSearch = searchTerm === '' || 
      inscription.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inscription.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inscription.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inscription.phone.includes(searchTerm);
    
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Inscriptions - Formations</h1>
          <p className="text-gray-600">Gérez les demandes d'inscription aux formations ouvertes</p>
        </div>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="approved">Approuvées</SelectItem>
                <SelectItem value="rejected">Rejetées</SelectItem>
              </SelectContent>
            </Select>

            <Select value={formationFilter} onValueChange={setFormationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par formation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les formations</SelectItem>
                <SelectItem value="anglais">Anglais</SelectItem>
                <SelectItem value="francais">Français</SelectItem>
                <SelectItem value="informatique">Informatique</SelectItem>
                <SelectItem value="bureautique">Bureautique</SelectItem>
                <SelectItem value="accompagnement">Accompagnement scolaire</SelectItem>
                <SelectItem value="entrepreneuriat">Entrepreneuriat</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={fetchInscriptions}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Actualiser
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tableau des inscriptions */}
      <Card>
        <CardHeader>
          <CardTitle>Inscriptions aux Formations ({filteredInscriptions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidat</TableHead>
                  <TableHead>Formation</TableHead>
                  <TableHead>Niveau</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInscriptions.map((inscription) => (
                  <TableRow key={inscription.id}>
                    <TableCell>
                      <div className="font-medium">
                        {inscription.firstName} {inscription.lastName}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-blue-500" />
                        {formationNames[inscription.formation as keyof typeof formationNames] || inscription.formation}
                      </div>
                    </TableCell>
                    <TableCell>
                      {inscription.level ? (
                        <Badge variant="outline">
                          {levelNames[inscription.level as keyof typeof levelNames] || inscription.level}
                        </Badge>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {inscription.email}
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Phone className="h-3 w-3" />
                          {inscription.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3" />
                        {new Date(inscription.created_at).toLocaleDateString('fr-FR')}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(inscription.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(inscription)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownloadReceipt(inscription)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        {inscription.status === 'pending' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleApprove(inscription)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleReject(inscription)}
                              className="text-red-600 hover:text-red-700"
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
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Précédent
              </Button>
              <span className="flex items-center px-4">
                Page {currentPage} sur {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Suivant
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal Détails */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails de l'inscription</DialogTitle>
            <DialogDescription>
              Informations complètes sur la demande d'inscription
            </DialogDescription>
          </DialogHeader>
          
          {selectedInscription && (
            <div className="space-y-6">
              {/* Informations personnelles */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Informations personnelles
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <span className="font-medium">Nom complet:</span>
                    <p>{selectedInscription.firstName} {selectedInscription.lastName}</p>
                  </div>
                  <div>
                    <span className="font-medium">Email:</span>
                    <p>{selectedInscription.email}</p>
                  </div>
                  <div>
                    <span className="font-medium">Téléphone:</span>
                    <p>{selectedInscription.phone}</p>
                  </div>
                  <div>
                    <span className="font-medium">Date d'inscription:</span>
                    <p>{new Date(selectedInscription.created_at).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
              </div>

              {/* Informations formation */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Formation demandée
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium">Formation:</span>
                      <p>{formationNames[selectedInscription.formation as keyof typeof formationNames] || selectedInscription.formation}</p>
                    </div>
                    <div>
                      <span className="font-medium">Niveau:</span>
                      <p>{selectedInscription.level ? levelNames[selectedInscription.level as keyof typeof levelNames] : 'Non spécifié'}</p>
                    </div>
                  </div>
                  
                  {selectedInscription.motivation && (
                    <div className="mt-4">
                      <span className="font-medium">Motivation:</span>
                      <p className="mt-1 text-gray-700">{selectedInscription.motivation}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Statut et traitement */}
              <div>
                <h3 className="font-semibold mb-3">Statut et traitement</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">Statut:</span>
                    {getStatusBadge(selectedInscription.status)}
                  </div>
                  
                  {selectedInscription.processed_at && (
                    <div>
                      <span className="font-medium">Traité le:</span>
                      <p>{new Date(selectedInscription.processed_at).toLocaleDateString('fr-FR')}</p>
                    </div>
                  )}
                  
                  {selectedInscription.processedBy && (
                    <div>
                      <span className="font-medium">Traité par:</span>
                      <p>{selectedInscription.processedBy.prenom} {selectedInscription.processedBy.nom}</p>
                    </div>
                  )}
                  
                  {selectedInscription.admin_notes && (
                    <div className="mt-2">
                      <span className="font-medium">Notes admin:</span>
                      <p className="text-gray-700">{selectedInscription.admin_notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsModal(false)}>
              Fermer
            </Button>
            {selectedInscription && (
              <Button onClick={() => handleDownloadReceipt(selectedInscription)}>
                <Download className="h-4 w-4 mr-2" />
                Télécharger le reçu
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Approbation */}
      <Dialog open={showApproveModal} onOpenChange={setShowApproveModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approuver l'inscription</DialogTitle>
            <DialogDescription>
              Voulez-vous approuver cette inscription en formation ?
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Notes administratives (optionnel)
              </label>
              <Textarea
                placeholder="Ajoutez des notes internes si nécessaire..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowApproveModal(false)}
              disabled={processing}
            >
              Annuler
            </Button>
            <Button 
              onClick={confirmApproval}
              disabled={processing}
              className="bg-green-600 hover:bg-green-700"
            >
              {processing ? 'Traitement...' : 'Approuver'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Rejet */}
      <Dialog open={showRejectModal} onOpenChange={setShowRejectModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rejeter l'inscription</DialogTitle>
            <DialogDescription>
              Veuillez spécifier la raison du rejet de cette inscription.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Raison du rejet *
              </label>
              <Textarea
                placeholder="Expliquez pourquoi cette inscription est rejetée..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Notes administratives internes (optionnel)
              </label>
              <Textarea
                placeholder="Notes internes non visibles par le candidat..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows={2}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowRejectModal(false)}
              disabled={processing}
            >
              Annuler
            </Button>
            <Button 
              onClick={confirmRejection}
              disabled={processing || !rejectionReason.trim()}
              variant="destructive"
            >
              {processing ? 'Traitement...' : 'Rejeter'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminInscriptionsFormationsPage;