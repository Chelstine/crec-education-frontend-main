import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useApi } from '@/hooks/useApi';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Eye, 
  Check, 
  X, 
  FileText, 
  Mail, 
  Search,
  DollarSign
} from 'lucide-react';
import { format } from 'date-fns';

interface FormationInscription {
  id: string;
  participantName: string;
  email: string;
  phone: string;
  formationTitle: string;
  formationType: string;
  level: string;
  motivation: string;
  paymentMethod: string;
  paymentReference?: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentAmount: number;
  documents: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
  }>;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  notes?: string;
}

const AdminInscriptionsFormationsPage: React.FC = () => {
  const [inscriptions, setInscriptions] = useState<FormationInscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInscription, setSelectedInscription] = useState<FormationInscription | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentTab, setCurrentTab] = useState('pending');
  
  const { toast } = useToast();
  const { get, put } = useApi();

  // Charger les inscriptions aux formations ouvertes
  useEffect(() => {
    const loadInscriptions = async () => {
      try {
        const response = await get('/api/admin/inscriptions/formations');
        setInscriptions(response.data || []);
      } catch (error) {
        console.error('Erreur lors du chargement:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les inscriptions aux formations",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadInscriptions();
  }, [get, toast]);

  // Filtrer les inscriptions
  const filteredInscriptions = inscriptions.filter(inscription => {
    // Filtre par onglet
    if (currentTab !== 'all' && inscription.status !== currentTab) {
      return false;
    }

    // Filtre par terme de recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        inscription.participantName.toLowerCase().includes(term) ||
        inscription.email.toLowerCase().includes(term) ||
        inscription.formationTitle.toLowerCase().includes(term)
      );
    }

    return true;
  });

  // Approuver une inscription
  const handleApprove = async (inscription: FormationInscription) => {
    try {
      await put(`/api/admin/inscriptions/formations/${inscription.id}/approve`, {
        status: 'approved',
        reviewedAt: new Date().toISOString(),
      });

      setInscriptions(prev => 
        prev.map(item => 
          item.id === inscription.id 
            ? { ...item, status: 'approved' as const, reviewedAt: new Date().toISOString() }
            : item
        )
      );

      toast({
        title: "Inscription approuvée",
        description: `L'inscription de ${inscription.participantName} a été approuvée avec succès.`,
      });
    } catch (error) {
      console.error('Erreur lors de l\'approbation:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'approuver cette inscription",
        variant: "destructive",
      });
    }
  };

  // Refuser une inscription
  const handleReject = async (inscription: FormationInscription, reason: string) => {
    try {
      await put(`/api/admin/inscriptions/formations/${inscription.id}/reject`, {
        status: 'rejected',
        reviewedAt: new Date().toISOString(),
        notes: reason,
      });

      setInscriptions(prev => 
        prev.map(item => 
          item.id === inscription.id 
            ? { 
                ...item, 
                status: 'rejected' as const, 
                reviewedAt: new Date().toISOString(),
                notes: reason
              }
            : item
        )
      );

      toast({
        title: "Inscription refusée",
        description: `L'inscription de ${inscription.participantName} a été refusée.`,
      });
    } catch (error) {
      console.error('Erreur lors du refus:', error);
      toast({
        title: "Erreur",
        description: "Impossible de refuser cette inscription",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Approuvé</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Refusé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      case 'paid':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Payé</Badge>;
      case 'failed':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Échoué</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Validation des Inscriptions Formations Ouvertes</CardTitle>
              <CardDescription>
                Gérer et valider les inscriptions aux formations ouvertes
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="pending">En attente ({filteredInscriptions.filter(i => i.status === 'pending').length})</TabsTrigger>
              <TabsTrigger value="approved">Approuvés ({filteredInscriptions.filter(i => i.status === 'approved').length})</TabsTrigger>
              <TabsTrigger value="rejected">Refusés ({filteredInscriptions.filter(i => i.status === 'rejected').length})</TabsTrigger>
              <TabsTrigger value="all">Tous ({filteredInscriptions.length})</TabsTrigger>
            </TabsList>

            <TabsContent value={currentTab}>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Participant</TableHead>
                      <TableHead>Formation</TableHead>
                      <TableHead>Niveau</TableHead>
                      <TableHead>Paiement</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInscriptions.length > 0 ? (
                      filteredInscriptions.map((inscription) => (
                        <TableRow key={inscription.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{inscription.participantName}</div>
                              <div className="text-sm text-gray-500">{inscription.email}</div>
                              <div className="text-sm text-gray-500">{inscription.phone}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{inscription.formationTitle}</div>
                              <div className="text-sm text-gray-500">{inscription.formationType}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{inscription.level}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {getPaymentStatusBadge(inscription.paymentStatus)}
                              <div className="flex items-center text-sm text-gray-500">
                                <DollarSign className="mr-1 h-3 w-3" />
                                ${inscription.paymentAmount}
                              </div>
                              <div className="text-xs text-gray-500">
                                {inscription.paymentMethod}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {format(new Date(inscription.submittedAt), 'dd/MM/yyyy HH:mm')}
                          </TableCell>
                          <TableCell>{getStatusBadge(inscription.status)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedInscription(inscription);
                                  setIsViewDialogOpen(true);
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedInscription(inscription);
                                  setIsEmailDialogOpen(true);
                                }}
                              >
                                <Mail className="h-4 w-4" />
                              </Button>

                              {inscription.status === 'pending' && (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-green-600 hover:text-green-700"
                                    onClick={() => handleApprove(inscription)}
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700"
                                    onClick={() => handleReject(inscription, 'Inscription refusée par l\'administrateur')}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">
                          Aucune inscription trouvée.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Dialog de visualisation */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Détails de l'inscription Formation</DialogTitle>
            <DialogDescription>
              Informations complètes sur l'inscription de {selectedInscription?.participantName}
            </DialogDescription>
          </DialogHeader>

          {selectedInscription && (
            <div className="space-y-6">
              {/* Informations personnelles */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informations personnelles</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Nom complet</label>
                    <p>{selectedInscription.participantName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p>{selectedInscription.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Téléphone</label>
                    <p>{selectedInscription.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Statut</label>
                    <p>{getStatusBadge(selectedInscription.status)}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Informations de formation */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informations de formation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Formation choisie</label>
                      <p>{selectedInscription.formationTitle}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Type de formation</label>
                      <p>{selectedInscription.formationType}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Niveau</label>
                      <p>{selectedInscription.level}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Motivation</label>
                    <p className="whitespace-pre-wrap border p-3 rounded bg-gray-50">
                      {selectedInscription.motivation}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Informations de paiement */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informations de paiement</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Montant</label>
                    <p className="flex items-center">
                      <DollarSign className="mr-1 h-4 w-4" />
                      {selectedInscription.paymentAmount}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Méthode de paiement</label>
                    <p>{selectedInscription.paymentMethod}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Référence</label>
                    <p>{selectedInscription.paymentReference || 'Non spécifiée'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Statut du paiement</label>
                    <p>{getPaymentStatusBadge(selectedInscription.paymentStatus)}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Documents soumis</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedInscription.documents.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {selectedInscription.documents.map((doc) => (
                        <Button 
                          key={doc.id} 
                          variant="outline" 
                          className="justify-start"
                          onClick={() => window.open(doc.url, '_blank')}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          {doc.name}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Aucun document soumis</p>
                  )}
                </CardContent>
              </Card>

              {/* Notes administratives */}
              {selectedInscription.notes && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Notes administratives</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap border p-3 rounded bg-gray-50">
                      {selectedInscription.notes}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Fermer
            </Button>
            {selectedInscription?.status === 'pending' && (
              <>
                <Button 
                  variant="destructive"
                  onClick={() => {
                    if (selectedInscription) {
                      handleReject(selectedInscription, 'Inscription refusée après examen');
                      setIsViewDialogOpen(false);
                    }
                  }}
                >
                  Refuser
                </Button>
                <Button
                  onClick={() => {
                    if (selectedInscription) {
                      handleApprove(selectedInscription);
                      setIsViewDialogOpen(false);
                    }
                  }}
                >
                  Approuver
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog d'envoi d'email */}
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Envoyer un email</DialogTitle>
            <DialogDescription>
              Envoyer un email à {selectedInscription?.participantName}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Sujet</label>
              <Input placeholder="Sujet de l'email" />
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <Textarea 
                placeholder="Contenu de l'email..."
                rows={6}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEmailDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={() => {
              // Logique d'envoi d'email ici
              setIsEmailDialogOpen(false);
            }}>
              Envoyer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminInscriptionsFormationsPage;
