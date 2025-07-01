import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FormationInscription, SubmittedDocument, EmailTemplate } from '@/types';
import { format } from 'date-fns';
import { 
  Eye, 
  Check, 
  X, 
  FileText, 
  Mail, 
  Trash2, 
  Search, 
  FileDown,
  Calendar,
  User,
  Phone,
  BookOpen
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { useApi } from '@/hooks/useApi';

// Composant pour afficher un document
const DocumentViewer = ({ document, onClose }: { document: SubmittedDocument, onClose: () => void }) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{document.fileName}</DialogTitle>
          <DialogDescription>
            <a 
              href={document.fileUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              <FileDown className="h-4 w-4" />
              Télécharger le document
            </a>
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[60vh]">
          {document.fileName.toLowerCase().endsWith('.pdf') ? (
            <iframe 
              src={document.fileUrl} 
              className="w-full h-[500px] border" 
              title={document.fileName}
            />
          ) : document.fileName.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/) ? (
            <img src={document.fileUrl} alt={document.fileName} className="w-full" />
          ) : (
            <div className="p-4 text-center">
              <p>Ce type de document ne peut pas être prévisualisé.</p>
              <Button asChild className="mt-2">
                <a href={document.fileUrl} target="_blank" rel="noopener noreferrer">
                  Ouvrir dans un nouvel onglet
                </a>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Composant de visualisation d'une inscription
interface InscriptionViewerProps {
  inscription: FormationInscription;
  onClose: () => void;
  onViewDocument: (document: SubmittedDocument) => void;
}

const InscriptionViewer: React.FC<InscriptionViewerProps> = ({ inscription, onClose, onViewDocument }) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Inscription de {inscription.applicantName || inscription.name}</DialogTitle>
          <DialogDescription>
            Soumise le {format(new Date(inscription.createdAt), 'dd/MM/yyyy')}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-medium">Nom complet</div>
                    <div>{inscription.applicantName || inscription.name}</div>
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <div>{inscription.applicantEmail || inscription.email}</div>
                  </div>
                  <div>
                    <div className="font-medium">Téléphone</div>
                    <div>{inscription.applicantPhone || inscription.phoneNumber}</div>
                  </div>
                  {inscription.level && (
                    <div>
                      <div className="font-medium">Niveau</div>
                      <div>{inscription.level}</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Formation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="font-medium">Intitulé de la formation</div>
                <div>{inscription.formationTitle || inscription.formation}</div>
                
                {inscription.motivation && (
                  <div className="mt-4">
                    <div className="font-medium">Motivation</div>
                    <div className="whitespace-pre-line mt-2">
                      {inscription.motivation}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Paiement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-medium">Méthode de paiement</div>
                    <div>{inscription.paymentMethod}</div>
                  </div>
                  <div>
                    <div className="font-medium">Statut du paiement</div>
                    <div>
                      <Badge 
                        variant="outline" 
                        className={
                          inscription.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                          inscription.paymentStatus === 'failed' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }
                      >
                        {inscription.paymentStatus === 'paid' ? 'Payé' : 
                         inscription.paymentStatus === 'failed' ? 'Échoué' : 'En attente'}
                      </Badge>
                    </div>
                  </div>
                  
                  {inscription.paymentReference && (
                    <div>
                      <div className="font-medium">Référence de paiement</div>
                      <div>{inscription.paymentReference}</div>
                    </div>
                  )}
                </div>
                
                {(inscription.paymentReceiptUrl || inscription.paymentProofUrl) && (
                  <div className="mt-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => onViewDocument({
                        id: `payment-${inscription.id}`,
                        documentTypeId: 'payment',
                        documentTypeName: 'Preuve de paiement',
                        fileName: 'Preuve de paiement',
                        fileUrl: inscription.paymentReceiptUrl || inscription.paymentProofUrl || '',
                        fileSize: 0,
                        uploadedAt: inscription.createdAt,
                        status: 'uploaded'
                      })}
                    >
                      <Eye className="h-4 w-4" /> 
                      Voir la preuve de paiement
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {inscription.documents && inscription.documents.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Documents soumis</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inscription.documents.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell>{doc.documentTypeName || doc.fileName}</TableCell>
                          <TableCell>{format(new Date(doc.uploadedAt), 'dd/MM/yyyy')}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={
                                doc.status === 'verified' ? 'bg-green-100 text-green-800' :
                                doc.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }
                            >
                              {doc.status === 'verified' ? 'Vérifié' : 
                               doc.status === 'rejected' ? 'Rejeté' : 
                               doc.status === 'pending' ? 'En attente' : 'Téléchargé'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => onViewDocument(doc)}
                            >
                              <Eye className="h-4 w-4 mr-1" /> Voir
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
            
            {(inscription.notes || inscription.adminNotes) && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  {inscription.notes && (
                    <div className="mb-4">
                      <div className="font-medium">Notes du candidat</div>
                      <div className="whitespace-pre-line">{inscription.notes}</div>
                    </div>
                  )}
                  {inscription.adminNotes && (
                    <div>
                      <div className="font-medium">Notes administratives</div>
                      <div className="whitespace-pre-line">{inscription.adminNotes}</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            
            {inscription.emailsSent && inscription.emailsSent.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Historique des emails</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {inscription.emailsSent.map((email, index) => (
                      <li key={index} className="text-sm">
                        {email}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>
        
        <DialogFooter>
          <Button onClick={onClose}>Fermer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Composant pour envoyer un email
interface EmailFormProps {
  inscription: FormationInscription;
  onSend: (emailData: { subject: string, content: string }) => Promise<void>;
  onCancel: () => void;
  emailType: 'approval' | 'rejection' | 'information';
}

const EmailForm: React.FC<EmailFormProps> = ({ inscription, onSend, onCancel, emailType }) => {
  const [subject, setSubject] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [templateId, setTemplateId] = useState<string>("");
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { get } = useApi();

  // Chargement des templates d'email
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const response = await get('/api/admin/email-templates?type=formation&category=' + emailType);
        setTemplates(response.data || []);
        
        // Si des templates sont disponibles, sélectionner le premier par défaut
        if (response.data && response.data.length > 0) {
          setTemplateId(response.data[0].id);
          setSubject(response.data[0].subject);
          
          // Remplacer les variables par les valeurs correspondantes
          let body = response.data[0].body;
          body = body.replace(/{{name}}/g, inscription.applicantName || inscription.name || '');
          body = body.replace(/{{email}}/g, inscription.applicantEmail || inscription.email || '');
          body = body.replace(/{{formation}}/g, inscription.formationTitle || inscription.formation || '');
          
          setContent(body);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des templates:", error);
      }
    };
    
    loadTemplates();
  }, [emailType, inscription, get]);

  // Gestion du changement de template
  const handleTemplateChange = (templateId: string) => {
    setTemplateId(templateId);
    const selectedTemplate = templates.find(t => t.id === templateId);
    
    if (selectedTemplate) {
      setSubject(selectedTemplate.subject);
      
      // Remplacer les variables par les valeurs correspondantes
      let body = selectedTemplate.body;
      body = body.replace(/{{name}}/g, inscription.applicantName || inscription.name || '');
      body = body.replace(/{{email}}/g, inscription.applicantEmail || inscription.email || '');
      body = body.replace(/{{formation}}/g, inscription.formationTitle || inscription.formation || '');
      
      setContent(body);
    }
  };

  // Envoi de l'email
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSend({ subject, content });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {emailType === 'approval' && 'Envoyer un email d\'acceptation'}
            {emailType === 'rejection' && 'Envoyer un email de refus'}
            {emailType === 'information' && 'Envoyer un email d\'information'}
          </DialogTitle>
          <DialogDescription>
            Cet email sera envoyé à {inscription.applicantEmail || inscription.email}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="template" className="text-sm font-medium">Template</label>
            <Select value={templateId} onValueChange={handleTemplateChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un template" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {templates.map(template => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">Sujet</label>
            <Input 
              id="subject"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="Sujet de l'email"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">Contenu</label>
            <Textarea 
              id="content"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Contenu de l'email"
              className="min-h-[200px]"
              required
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const AdminFormationRegistrationsPage: React.FC = () => {
  const [inscriptions, setInscriptions] = useState<FormationInscription[]>([]);
  const [filteredInscriptions, setFilteredInscriptions] = useState<FormationInscription[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [formationFilter, setFormationFilter] = useState<string>('all');
  const [formations, setFormations] = useState<{id: string, title: string}[]>([]);
  const [selectedInscription, setSelectedInscription] = useState<FormationInscription | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<SubmittedDocument | null>(null);
  const [emailInscription, setEmailInscription] = useState<FormationInscription | null>(null);
  const [emailType, setEmailType] = useState<'approval' | 'rejection' | 'information'>('information');
  const { get, put } = useApi();
  const { toast } = useToast();

  // Chargement des inscriptions et des formations
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Chargement des inscriptions
        const inscriptionsResponse = await get('/api/admin/formation-inscriptions');
        const inscriptionsData = inscriptionsResponse.data || [];
        setInscriptions(inscriptionsData);
        setFilteredInscriptions(inscriptionsData);
        
        // Chargement des formations
        const formationsResponse = await get('/api/admin/formations');
        setFormations(formationsResponse.data || []);
        
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les inscriptions aux formations",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [get, toast]);

  // Filtrage des inscriptions
  useEffect(() => {
    let filtered = [...inscriptions];
    
    // Filtre par statut
    if (statusFilter !== 'all') {
      filtered = filtered.filter(insc => insc.status === statusFilter);
    }
    
    // Filtre par formation
    if (formationFilter !== 'all') {
      filtered = filtered.filter(insc => insc.formationId === formationFilter);
    }
    
    // Filtre par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(insc => 
        (insc.applicantName || insc.name || '').toLowerCase().includes(query) ||
        (insc.applicantEmail || insc.email || '').toLowerCase().includes(query) ||
        (insc.phoneNumber || insc.applicantPhone || '').includes(query) ||
        (insc.formationTitle || insc.formation || '').toLowerCase().includes(query)
      );
    }
    
    setFilteredInscriptions(filtered);
  }, [inscriptions, statusFilter, formationFilter, searchQuery]);

  // Approuver une inscription
  const handleApprove = async (inscription: FormationInscription) => {
    try {
      // Mettre à jour l'inscription
      const updatedInscription = {
        ...inscription,
        status: 'approved'
      };
      
      await put(`/api/admin/formation-inscriptions/${inscription.id}`, updatedInscription);
      
      // Mise à jour locale des données
      setInscriptions(prev => 
        prev.map(i => i.id === inscription.id ? { ...i, status: 'approved' } : i)
      );
      
      toast({
        title: "Succès",
        description: "Inscription approuvée avec succès",
      });
      
      // Ouvrir le formulaire d'email pour notifier l'acceptation
      setEmailInscription(inscription);
      setEmailType('approval');
      
    } catch (error) {
      console.error("Erreur lors de l'approbation:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'approuver cette inscription",
        variant: "destructive",
      });
    }
  };

  // Refuser une inscription
  const handleReject = async (inscription: FormationInscription) => {
    try {
      // Mettre à jour l'inscription
      const updatedInscription = {
        ...inscription,
        status: 'rejected'
      };
      
      await put(`/api/admin/formation-inscriptions/${inscription.id}`, updatedInscription);
      
      // Mise à jour locale des données
      setInscriptions(prev => 
        prev.map(i => i.id === inscription.id ? { ...i, status: 'rejected' } : i)
      );
      
      toast({
        title: "Succès",
        description: "Inscription refusée",
      });
      
      // Ouvrir le formulaire d'email pour notifier le refus
      setEmailInscription(inscription);
      setEmailType('rejection');
      
    } catch (error) {
      console.error("Erreur lors du refus:", error);
      toast({
        title: "Erreur",
        description: "Impossible de refuser cette inscription",
        variant: "destructive",
      });
    }
  };

  // Envoyer un email
  const handleSendEmail = async (emailData: { subject: string, content: string }) => {
    if (!emailInscription) return;
    
    try {
      // Envoi de l'email via l'API
      await put(`/api/admin/formation-inscriptions/${emailInscription.id}/send-email`, {
        ...emailData,
        emailType
      });
      
      // Mise à jour de l'historique des emails envoyés
      const now = new Date().toISOString();
      const emailRecord = `${now}: ${emailType} - ${emailData.subject}`;
      
      // Mise à jour locale des données
      setInscriptions(prev => 
        prev.map(i => i.id === emailInscription.id ? {
          ...i,
          emailsSent: [...(i.emailsSent || []), emailRecord]
        } : i)
      );
      
      toast({
        title: "Succès",
        description: "Email envoyé avec succès",
      });
      
      // Fermer le formulaire d'email
      setEmailInscription(null);
      
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer l'email",
        variant: "destructive",
      });
    }
  };

  // Envoyer un email personnalisé
  const handleSendCustomEmail = (inscription: FormationInscription) => {
    setEmailInscription(inscription);
    setEmailType('information');
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Approuvée</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Refusée</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch(status) {
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

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Inscriptions aux Formations</h1>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Tous les statuts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="approved">Approuvées</SelectItem>
              <SelectItem value="rejected">Refusées</SelectItem>
            </SelectContent>
          </Select>

          <Select value={formationFilter} onValueChange={setFormationFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Toutes les formations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les formations</SelectItem>
              {formations.map(formation => (
                <SelectItem key={formation.id} value={formation.id}>
                  {formation.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des inscriptions ({filteredInscriptions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : filteredInscriptions.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              Aucune inscription trouvée
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidat</TableHead>
                    <TableHead>Formation</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Paiement</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInscriptions.map((inscription) => (
                    <TableRow key={inscription.id}>
                      <TableCell>
                        <div className="font-medium">
                          {inscription.applicantName || inscription.name}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="h-3 w-3" /> 
                          {inscription.applicantEmail || inscription.email}
                        </div>
                        {(inscription.applicantPhone || inscription.phoneNumber) && (
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Phone className="h-3 w-3" /> 
                            {inscription.applicantPhone || inscription.phoneNumber}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {inscription.formationTitle || inscription.formation}
                        </div>
                      </TableCell>
                      <TableCell>
                        {format(new Date(inscription.createdAt), 'dd/MM/yyyy')}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(inscription.status)}
                      </TableCell>
                      <TableCell>
                        {getPaymentStatusBadge(inscription.paymentStatus)}
                        <div className="text-xs text-gray-500 mt-1">
                          {inscription.paymentMethod}
                          {inscription.paymentReference && ` (${inscription.paymentReference})`}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0" 
                            onClick={() => setSelectedInscription(inscription)}
                            title="Voir les détails"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          {inscription.status === 'pending' && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-8 w-8 p-0 text-green-600" 
                                onClick={() => handleApprove(inscription)}
                                title="Approuver"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-8 w-8 p-0 text-red-600" 
                                onClick={() => handleReject(inscription)}
                                title="Refuser"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0" 
                            onClick={() => handleSendCustomEmail(inscription)}
                            title="Envoyer un email"
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                          
                          {(inscription.documents && inscription.documents.length > 0) && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 w-8 p-0" 
                              onClick={() => setSelectedDocument(inscription.documents![0])}
                              title="Voir les documents"
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedInscription && (
        <InscriptionViewer 
          inscription={selectedInscription} 
          onClose={() => setSelectedInscription(null)} 
          onViewDocument={setSelectedDocument}
        />
      )}

      {selectedDocument && (
        <DocumentViewer 
          document={selectedDocument} 
          onClose={() => setSelectedDocument(null)} 
        />
      )}

      {emailInscription && (
        <EmailForm
          inscription={emailInscription}
          onSend={handleSendEmail}
          onCancel={() => setEmailInscription(null)}
          emailType={emailType}
        />
      )}
    </div>
  );
};

export default AdminFormationRegistrationsPage;
