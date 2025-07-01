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
  Filter
} from 'lucide-react';
import { format } from 'date-fns';

interface ISTMInscription {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  program: string;
  academicYear: string;
  previousEducation: string;
  motivation: string;
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

// Liste des documents attendus
const REQUIRED_DOCUMENTS = [
  { key: 'birthCertificate', label: "Acte de naissance" },
  { key: 'photo1', label: "Photo 1" },
  { key: 'photo2', label: "Photo 2" },
  { key: 'cipCard', label: "Carte d'identité CIP" },
  { key: 'bacTranscript', label: "Relevé du bac" },
  { key: 'bacDiploma', label: "Diplôme du bac" },
  { key: 'payment', label: "Justificatif de paiement" }
];

const AdminInscriptionsISTMPage: React.FC = () => {
  const [inscriptions, setInscriptions] = useState<ISTMInscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInscription, setSelectedInscription] = useState<ISTMInscription | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentTab, setCurrentTab] = useState('pending');
  
  const { toast } = useToast();
  const { get, put } = useApi();

  // Charger les inscriptions ISTM
  useEffect(() => {
    let didError = false;
    const loadInscriptions = async () => {
      try {
        const response = await get('/api/admin/inscriptions/istm');
        setInscriptions(response.data || []);
      } catch (error) {
        if (!didError) {
          didError = true;
          toast({
            title: "Erreur",
            description: "Impossible de charger les inscriptions ISTM",
            variant: "destructive",
          });
        }
        setInscriptions([]);
      } finally {
        setLoading(false);
      }
    };
    loadInscriptions();
    // eslint-disable-next-line
  }, [get]);

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
        inscription.studentName.toLowerCase().includes(term) ||
        inscription.email.toLowerCase().includes(term) ||
        inscription.program.toLowerCase().includes(term)
      );
    }

    return true;
  });

  // Approuver une inscription
  const handleApprove = async (inscription: ISTMInscription) => {
    try {
      await put(`/api/admin/inscriptions/istm/${inscription.id}/approve`, {
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
        description: `L'inscription de ${inscription.studentName} a été approuvée avec succès.`,
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
  const handleReject = async (inscription: ISTMInscription, reason: string) => {
    try {
      await put(`/api/admin/inscriptions/istm/${inscription.id}/reject`, {
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
        description: `L'inscription de ${inscription.studentName} a été refusée.`,
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

  // Envoyer un email
  const handleSendEmail = async (inscription: ISTMInscription, subject: string, content: string) => {
    try {
      await put(`/api/admin/inscriptions/istm/${inscription.id}/send-email`, {
        to: inscription.email,
        subject,
        content,
      });

      toast({
        title: "Email envoyé",
        description: `Un email a été envoyé à ${inscription.studentName}.`,
      });

      setIsEmailDialogOpen(false);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer l'email",
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
              <CardTitle>Validation des Inscriptions ISTM</CardTitle>
              <CardDescription>
                Gérer et valider les inscriptions aux programmes universitaires ISTM
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
                      <TableHead>Étudiant</TableHead>
                      <TableHead>Programme</TableHead>
                      <TableHead>Année académique</TableHead>
                      <TableHead>Date de soumission</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInscriptions.length > 0 ? (
                      filteredInscriptions.map((inscription) => (
                        <TableRow key={inscription.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{inscription.studentName}</div>
                              <div className="text-sm text-gray-500">{inscription.email}</div>
                              <div className="text-sm text-gray-500">{inscription.phone}</div>
                            </div>
                          </TableCell>
                          <TableCell>{inscription.program}</TableCell>
                          <TableCell>{inscription.academicYear}</TableCell>
                          <TableCell>
                            {format(new Date(inscription.submittedAt), 'dd/MM/yyyy HH:mm')}
                          </TableCell>
                          <TableCell>{getStatusBadge(inscription.status)}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              <FileText className="mr-1 h-3 w-3" />
                              {inscription.documents.length} doc(s)
                            </Badge>
                          </TableCell>
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
            <DialogTitle>Détails de l'inscription ISTM</DialogTitle>
            <DialogDescription>
              Informations complètes sur l'inscription de {selectedInscription?.studentName}
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
                    <p>{selectedInscription.studentName}</p>
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

              {/* Informations académiques */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informations académiques</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Programme choisi</label>
                    <p>{selectedInscription.program}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Année académique</label>
                    <p>{selectedInscription.academicYear}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Formation précédente</label>
                    <p>{selectedInscription.previousEducation}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Motivation</label>
                    <p className="whitespace-pre-wrap border p-3 rounded bg-gray-50">
                      {selectedInscription.motivation}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Documents soumis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {REQUIRED_DOCUMENTS.map(doc => {
                      const found = selectedInscription?.documents.find(d => d.type === doc.key);
                      return (
                        <div key={doc.key} className="flex items-center gap-2">
                          <span className="font-medium w-48">{doc.label}</span>
                          {found ? (
                            <Button variant="outline" size="sm" onClick={() => window.open(found.url, '_blank')}>
                              <FileText className="mr-2 h-4 w-4" /> Voir
                            </Button>
                          ) : (
                            <span className="text-red-500 text-xs">Manquant</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
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
              Envoyer un email à {selectedInscription?.studentName}
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

export default AdminInscriptionsISTMPage;
