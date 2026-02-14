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
import { Loader2, Eye, CheckCircle, XCircle, Download, Search, Calendar, Mail, FileText, TrendingUp } from "lucide-react";
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
    <div className="space-y-10 animate-in fade-in duration-700 pb-10">
      {/* En-tête Institutionnel & Navigation */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 md:px-0">
        <div>
          <div className="flex items-center gap-2 mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-crec-gold">
            <TrendingUp className="w-3 h-3" />
            <span>Innovation & Tech / FabLab Admissions</span>
          </div>
          <h1 className="text-4xl font-bold admin-title tracking-tight text-crec-darkblue">Archives des Inscriptions FabLab</h1>
          <p className="text-slate-500 font-medium text-sm mt-2">Gouvernance des accès au laboratoire d'innovation technologique.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={loadInscriptions} className="glass-button h-11 border-crec-darkblue/10 bg-white/40">
            <Loader2 className={`h-4 w-4 mr-2 text-crec-darkblue ${loading ? 'animate-spin' : ''}`} />
            <span className="font-bold text-[10px] uppercase tracking-widest text-crec-darkblue px-2">Actualiser</span>
          </Button>
        </div>
      </div>

      {/* Statistiques Rapides Glass */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 md:px-0">
        {[
          { label: 'Examen', value: inscriptions.filter(i => i.status === 'pending').length, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Abonnés', value: inscriptions.filter(i => i.status === 'approved').length, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Refusés', value: inscriptions.filter(i => i.status === 'rejected').length, color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'Dossiers', value: pagination?.total || 0, color: 'text-crec-darkblue', bg: 'bg-blue-50' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 rounded-[1.5rem] border border-white/60 shadow-lg group hover:border-crec-gold/30 transition-all">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 truncate">{stat.label}</p>
            <div className={`text-3xl font-bold ${stat.color} tracking-tighter`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Barre de Contrôle & Filtres Glass */}
      <div className="mx-4 md:mx-0 glass-panel p-6 rounded-[2rem] border border-white/60 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Rechercher par nom, email d'aspirant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 bg-white/40 border-white/60 rounded-xl focus:ring-crec-gold/20 font-medium text-sm"
            />
          </div>

          <div className="md:col-span-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-12 bg-white/40 border-white/60 rounded-xl font-bold text-xs uppercase tracking-widest text-slate-600">
                <SelectValue placeholder="État Dossier" />
              </SelectTrigger>
              <SelectContent className="glass-panel border-white/60">
                <SelectItem value="all">Tout le Registre</SelectItem>
                <SelectItem value="pending">En Commission</SelectItem>
                <SelectItem value="approved">Validées</SelectItem>
                <SelectItem value="rejected">Refusées</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Liste des Inscriptions Prestidigieuses */}
      <div className="mx-4 md:mx-0 glass-panel rounded-[2rem] border border-white/60 shadow-2xl overflow-hidden bg-white/20">
        <div className="p-8 border-b border-white/40 flex items-center justify-between">
          <h3 className="text-xl font-bold text-crec-darkblue flex items-center gap-3 tracking-tight">
            <FileText className="w-5 h-5 text-crec-gold" />
            Registre des Adhésions <span className="text-slate-400 font-medium ml-2 text-sm italic">({pagination?.total || 0} archives)</span>
          </h3>
        </div>
        <CardContent className="p-0">
          {filteredInscriptions.length === 0 ? (
            <div className="text-center py-20 text-slate-400 font-medium italic">
              Aucune archive numérique ne correspond à votre requête.
            </div>
          ) : (
            <div className="divide-y divide-white/40">
              {filteredInscriptions.map((inscription) => (
                <div key={inscription.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-8 hover:bg-crec-gold/5 transition-all duration-300">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className={`${getStatusColor(inscription.status)} px-3 py-1 rounded-full font-black text-[9px] uppercase tracking-widest border-0 shadow-sm`}>
                        {getStatusText(inscription.status)}
                      </Badge>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                        DOSSIER ID: <span className="text-crec-darkblue font-bold">#{inscription.id}</span>
                      </span>
                    </div>
                    <div className="font-bold text-xl text-crec-darkblue tracking-tight mb-2">
                      {inscription.firstName} {inscription.lastName}
                    </div>
                    <div className="text-xs text-slate-500 font-bold flex flex-wrap items-center gap-6">
                      <span className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-crec-gold" />
                        {inscription.email}
                      </span>
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-crec-gold" />
                        {formatDate(inscription.created_at)}
                      </span>
                      <span className="flex items-center gap-2 text-crec-darkblue font-black uppercase tracking-widest text-[10px]">
                        <FileText className="h-4 w-4 text-crec-gold" />
                        {inscription.workshop}
                      </span>
                    </div>
                    {inscription.processedBy && (
                      <div className="text-[10px] font-black uppercase text-slate-400 mt-3 tracking-widest border-l-2 border-crec-gold/40 pl-3 py-1">
                        Officier de Traitement: <span className="text-crec-darkblue">{inscription.processedBy.prenom} {inscription.processedBy.nom}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-6 md:mt-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-crec-gold/10 text-crec-darkblue font-bold px-4 h-10 rounded-xl"
                      onClick={() => {
                        setSelectedInscription(inscription);
                        setShowDetailsDialog(true);
                      }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Auditer
                    </Button>
                    {inscription.status === 'pending' && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 font-bold px-4 h-10 rounded-xl"
                          onClick={() => {
                            setSelectedInscription(inscription);
                            setShowApproveDialog(true);
                          }}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Admettre
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 font-bold px-4 h-10 rounded-xl"
                          onClick={() => {
                            setSelectedInscription(inscription);
                            setShowRejectDialog(true);
                          }}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Refuser
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Institutionnelle */}
          {pagination && pagination.last_page > 1 && (
            <div className="flex flex-col md:flex-row items-center justify-between p-10 border-t border-white/40 gap-6">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Segment <span className="text-crec-darkblue text-sm mx-1">{pagination.current_page}</span> sur <span className="text-crec-darkblue text-sm mx-1">{pagination.last_page}</span>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="glass-button h-11 px-8 border-crec-darkblue/10 font-bold text-[10px] uppercase tracking-widest"
                  disabled={pagination.current_page === 1}
                  onClick={() => setCurrentPage(pagination.current_page - 1)}
                >
                  Précédent
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="glass-button h-11 px-8 border-crec-darkblue/10 font-bold text-[10px] uppercase tracking-widest"
                  disabled={pagination.current_page === pagination.last_page}
                  onClick={() => setCurrentPage(pagination.current_page + 1)}
                >
                  Suivant
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </div>

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