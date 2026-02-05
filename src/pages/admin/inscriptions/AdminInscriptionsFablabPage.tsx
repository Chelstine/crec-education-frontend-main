import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Eye, CheckCircle, XCircle, Download, Search, Calendar, Mail, FileText } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import inscriptionService from '@/services/inscription-service';

interface FablabInscription {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  workshop: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  processed_at?: string;
  experience?: string;
  motivation?: string;
  admin_notes?: string;
  payment_receipt_path: string;
  processedBy?: {
    prenom: string;
    nom: string;
  };
}

interface PaginationData {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

const AdminInscriptionsFablabPage: React.FC = () => {
  const [inscriptions, setInscriptions] = useState<FablabInscription[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Dialog states
  const [selectedInscription, setSelectedInscription] = useState<FablabInscription | null>(null);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  // Form states
  const [adminNotes, setAdminNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadInscriptions();
    // eslint-disable-next-line
  }, [currentPage, statusFilter]);

  const loadInscriptions = async () => {
    try {
      setLoading(true);
      const response = await inscriptionService.getInscriptionsByType('fablab', {
        page: currentPage,
        per_page: 15,
        ...(statusFilter !== 'all' && { status: statusFilter as any })
      });
      if (response.success) {
        setInscriptions(response.data.data as FablabInscription[]);
        setPagination({
          current_page: response.data.current_page,
          last_page: response.data.last_page,
          per_page: response.data.per_page,
          total: response.data.total
        });
      }
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      toast({ title: "Erreur: Impossible de charger les inscriptions." });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (inscription: FablabInscription) => {
    setActionLoading(true);
    try {
      const response = await inscriptionService.approveInscription('fablab', inscription.id, adminNotes);
      if (response.success) {
        await loadInscriptions();
        setSelectedInscription(null);
        setAdminNotes('');
        setShowApproveDialog(false);
        toast({ title: "Inscription approuvée - Un email a été envoyé à l'utilisateur." });
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast({ title: "Erreur lors de l'approbation de l'inscription." });
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (inscription: FablabInscription) => {
    setActionLoading(true);
    try {
      const response = await inscriptionService.rejectInscription('fablab', inscription.id, rejectionReason, adminNotes);
      if (response.success) {
        await loadInscriptions();
        setSelectedInscription(null);
        setAdminNotes('');
        setRejectionReason('');
        setShowRejectDialog(false);
        toast({ title: "Inscription rejetée - Un email a été envoyé à l'utilisateur." });
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast({ title: "Erreur lors du rejet de l'inscription." });
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'approved': return 'Approuvée';
      case 'rejected': return 'Rejetée';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredInscriptions = inscriptions.filter(inscription =>
    (`${inscription.firstName} ${inscription.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inscription.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading && currentPage === 1) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Inscriptions FabLab
        </h1>
        <p className="text-gray-600">
          Gérez les inscriptions aux abonnements FabLab et validez les reçus de paiement.
        </p>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>En attente</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {inscriptions.filter(i => i.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600">En attente</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Approuvées</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {inscriptions.filter(i => i.status === 'approved').length}
            </div>
            <div className="text-sm text-gray-600">Approuvées</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Rejetées</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {inscriptions.filter(i => i.status === 'rejected').length}
            </div>
            <div className="text-sm text-gray-600">Rejetées</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {pagination?.total || 0}
            </div>
            <div className="text-sm text-gray-600">Total</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Rechercher</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Nom, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="status">Statut</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="approved">Approuvées</SelectItem>
                  <SelectItem value="rejected">Rejetées</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des inscriptions */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des inscriptions</CardTitle>
          <CardDescription>
            {pagination && `${pagination.total} inscription(s) au total`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredInscriptions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Aucune inscription trouvée.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredInscriptions.map((inscription) => (
                <div key={inscription.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={getStatusColor(inscription.status)}>
                        {getStatusText(inscription.status)}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        #{inscription.id}
                      </span>
                    </div>
                    <div className="font-medium">{inscription.firstName} {inscription.lastName}</div>
                    <div className="text-sm text-gray-600 flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {inscription.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(inscription.created_at)}
                      </span>
                    </div>
                    <div className="text-sm text-blue-600 mt-1">
                      {inscription.workshop}
                    </div>
                    {inscription.processedBy && (
                      <div className="text-xs text-gray-500 mt-1">
                        Traité par: {inscription.processedBy.prenom} {inscription.processedBy.nom}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedInscription(inscription);
                        setShowDetailsDialog(true);
                      }}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Détails
                    </Button>
                    {inscription.status === 'pending' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-600 hover:text-green-700"
                          onClick={() => {
                            setSelectedInscription(inscription);
                            setShowApproveDialog(true);
                          }}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approuver
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => {
                            setSelectedInscription(inscription);
                            setShowRejectDialog(true);
                          }}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Rejeter
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.last_page > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-500">
                Page {pagination.current_page} sur {pagination.last_page}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.current_page === 1}
                  onClick={() => setCurrentPage(pagination.current_page - 1)}
                >
                  Précédent
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.current_page === pagination.last_page}
                  onClick={() => setCurrentPage(pagination.current_page + 1)}
                >
                  Suivant
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog d'approbation */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approuver l'inscription</DialogTitle>
            <DialogDescription>
              Vous êtes sur le point d'approuver l'inscription de {selectedInscription ? `${selectedInscription.firstName} ${selectedInscription.lastName}` : ''}.
              Un email avec les identifiants d'accès sera automatiquement envoyé.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="approve-notes">Notes administratives (optionnel)</Label>
              <Textarea
                id="approve-notes"
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Ajoutez des notes internes si nécessaire..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowApproveDialog(false)}
              disabled={actionLoading}
            >
              Annuler
            </Button>
            <Button
              onClick={() => selectedInscription && handleApprove(selectedInscription)}
              disabled={actionLoading}
              className="bg-green-600 hover:bg-green-700"
            >
              {actionLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Approbation...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approuver
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de rejet */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rejeter l'inscription</DialogTitle>
            <DialogDescription>
              Vous êtes sur le point de rejeter l'inscription de {selectedInscription ? `${selectedInscription.firstName} ${selectedInscription.lastName}` : ''}.
              Un email avec la raison du refus sera envoyé.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="rejection-reason">Raison du refus *</Label>
              <Textarea
                id="rejection-reason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Expliquez la raison du refus qui sera communiquée à l'utilisateur..."
                rows={3}
                required
              />
            </div>
            <div>
              <Label htmlFor="reject-notes">Notes administratives (optionnel)</Label>
              <Textarea
                id="reject-notes"
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Notes internes (non communiquées à l'utilisateur)..."
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRejectDialog(false)}
              disabled={actionLoading}
            >
              Annuler
            </Button>
            <Button
              onClick={() => selectedInscription && handleReject(selectedInscription)}
              disabled={actionLoading || !rejectionReason.trim()}
              className="bg-red-600 hover:bg-red-700"
            >
              {actionLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Rejet...
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 mr-2" />
                  Rejeter
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog des détails */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails de l'inscription</DialogTitle>
            <DialogDescription>
              Informations complètes sur l'inscription #{selectedInscription?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedInscription && (
            <div className="space-y-6">
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="info">Informations</TabsTrigger>
                  <TabsTrigger value="payment">Paiement</TabsTrigger>
                  <TabsTrigger value="admin">Administration</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Nom complet</Label>
                      <div className="font-medium">{selectedInscription.firstName} {selectedInscription.lastName}</div>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <div className="font-medium">{selectedInscription.email}</div>
                    </div>
                    <div>
                      <Label>Téléphone</Label>
                      <div className="font-medium">{selectedInscription.phone || 'Non renseigné'}</div>
                    </div>
                    <div>
                      <Label>Formule d'abonnement</Label>
                      <div className="font-medium">{selectedInscription.workshop}</div>
                    </div>
                    <div className="col-span-2">
                      <Label>Date d'inscription</Label>
                      <div className="font-medium">{formatDate(selectedInscription.created_at)}</div>
                    </div>
                  </div>
                  {selectedInscription.experience && (
                    <div>
                      <Label>Expérience</Label>
                      <div className="text-sm bg-gray-50 p-3 rounded">
                        {selectedInscription.experience}
                      </div>
                    </div>
                  )}
                  {selectedInscription.motivation && (
                    <div>
                      <Label>Motivation</Label>
                      <div className="text-sm bg-gray-50 p-3 rounded">
                        {selectedInscription.motivation}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="payment" className="space-y-4">
                  <Alert>
                    <FileText className="h-4 w-4" />
                    <AlertDescription>
                      Vérifiez le reçu de paiement avant d'approuver l'inscription.
                    </AlertDescription>
                  </Alert>
                  <div className="text-center">
                    <Button
                      onClick={() => {
                        // Ouvrir le reçu de paiement
                        const baseUrl = import.meta?.env?.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000';
                        window.open(`${baseUrl}/storage/${selectedInscription.payment_receipt_path}`, '_blank');
                      }}
                      className="w-full"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger le reçu de paiement
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="admin" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Statut</Label>
                      <Badge className={getStatusColor(selectedInscription.status)}>
                        {getStatusText(selectedInscription.status)}
                      </Badge>
                    </div>
                    <div>
                      <Label>Date de traitement</Label>
                      <div className="font-medium">
                        {selectedInscription.processed_at
                          ? formatDate(selectedInscription.processed_at)
                          : 'Non traité'
                        }
                      </div>
                    </div>
                  </div>
                  {selectedInscription.processedBy && (
                    <div>
                      <Label>Traité par</Label>
                      <div className="font-medium">
                        {selectedInscription.processedBy.prenom} {selectedInscription.processedBy.nom}
                      </div>
                    </div>
                  )}
                  {selectedInscription.admin_notes && (
                    <div>
                      <Label>Notes administratives</Label>
                      <div className="text-sm bg-gray-50 p-3 rounded">
                        {selectedInscription.admin_notes}
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setShowDetailsDialog(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminInscriptionsFablabPage;