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
import { FablabSubscription, SubmittedDocument, EmailTemplate } from '@/types';
import { useApi } from '@/hooks/useApi';
import { format } from 'date-fns';
import { 
  Eye, 
  Check, 
  X, 
  FileText, 
  Mail, 
  Key,
  Trash2, 
  Search, 
  FileDown,
  Calendar,
  User,
  Phone
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

// Fonction pour générer une clé d'accès aléatoire
const generateAccessKey = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const keyLength = 8;
  let result = '';
  
  for (let i = 0; i < keyLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return result;
};

// Calculer la date d'expiration en fonction du type d'abonnement
const calculateExpiryDate = (subscriptionType: string): string => {
  const now = new Date();
  
  switch(subscriptionType) {
    case 'monthly':
      now.setMonth(now.getMonth() + 1);
      break;
    case 'quarterly':
      now.setMonth(now.getMonth() + 3);
      break;
    case 'yearly':
      now.setFullYear(now.getFullYear() + 1);
      break;
    default: // workshop ou autres
      now.setDate(now.getDate() + 7); // Une semaine d'accès pour les ateliers
  }
  
  return now.toISOString();
};

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

// Composant pour envoyer un email
interface EmailFormProps {
  subscription: FablabSubscription;
  onSend: (emailData: { subject: string, content: string }) => Promise<void>;
  onCancel: () => void;
  emailType: 'approval' | 'rejection' | 'accessKey';
}

const EmailForm: React.FC<EmailFormProps> = ({ subscription, onSend, onCancel, emailType }) => {
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
        const response = await get('/api/admin/email-templates?type=fablab&category=' + emailType);
        setTemplates(response.data || []);
        
        // Si des templates sont disponibles, sélectionner le premier par défaut
        if (response.data && response.data.length > 0) {
          setTemplateId(response.data[0].id);
          setSubject(response.data[0].subject);
          
          // Remplacer les variables par les valeurs correspondantes
          let body = response.data[0].body;
          body = body.replace(/{{name}}/g, subscription.applicantName || subscription.name || '');
          body = body.replace(/{{email}}/g, subscription.applicantEmail || subscription.email || '');
          
          if (emailType === 'accessKey' && subscription.accessKey) {
            body = body.replace(/{{accessKey}}/g, subscription.accessKey);
            body = body.replace(/{{expiryDate}}/g, subscription.accessKeyExpiry ? 
              format(new Date(subscription.accessKeyExpiry), 'dd/MM/yyyy') : 'Non définie');
          }
          
          setContent(body);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des templates:", error);
      }
    };
    
    loadTemplates();
  }, [emailType, subscription, get]);

  // Gestion du changement de template
  const handleTemplateChange = (templateId: string) => {
    setTemplateId(templateId);
    const selectedTemplate = templates.find(t => t.id === templateId);
    
    if (selectedTemplate) {
      setSubject(selectedTemplate.subject);
      
      // Remplacer les variables par les valeurs correspondantes
      let body = selectedTemplate.body;
      body = body.replace(/{{name}}/g, subscription.applicantName || subscription.name || '');
      body = body.replace(/{{email}}/g, subscription.applicantEmail || subscription.email || '');
      
      if (emailType === 'accessKey' && subscription.accessKey) {
        body = body.replace(/{{accessKey}}/g, subscription.accessKey);
        body = body.replace(/{{expiryDate}}/g, subscription.accessKeyExpiry ? 
          format(new Date(subscription.accessKeyExpiry), 'dd/MM/yyyy') : 'Non définie');
      }
      
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
            {emailType === 'accessKey' && 'Envoyer la clé d\'accès'}
          </DialogTitle>
          <DialogDescription>
            Cet email sera envoyé à {subscription.applicantEmail || subscription.email}
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

const AdminFablabRegistrationsPage: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<FablabSubscription[]>([]);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<FablabSubscription[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentTab, setCurrentTab] = useState<string>('all');
  const [selectedDocument, setSelectedDocument] = useState<SubmittedDocument | null>(null);
  const [emailSubscription, setEmailSubscription] = useState<FablabSubscription | null>(null);
  const [emailType, setEmailType] = useState<'approval' | 'rejection' | 'accessKey'>('approval');
  const { get, put } = useApi();
  const { toast } = useToast();

  // Chargement des inscriptions
  useEffect(() => {
    const loadSubscriptions = async () => {
      setIsLoading(true);
      try {
        const response = await get('/api/admin/fablab-subscriptions');
        setSubscriptions(response.data || []);
        setFilteredSubscriptions(response.data || []);
      } catch (error) {
        console.error("Erreur lors du chargement des inscriptions:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les inscriptions FabLab",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSubscriptions();
  }, [get, toast]);

  // Filtrage des inscriptions
  useEffect(() => {
    let filtered = [...subscriptions];
    
    // Filtre par statut
    if (statusFilter !== 'all') {
      filtered = filtered.filter(sub => sub.status === statusFilter);
    }
    
    // Filtre par onglet
    if (currentTab !== 'all') {
      filtered = filtered.filter(sub => sub.subscriptionType === currentTab);
    }
    
    // Filtre par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(sub => 
        (sub.applicantName || sub.name || '').toLowerCase().includes(query) ||
        (sub.applicantEmail || sub.email || '').toLowerCase().includes(query) ||
        (sub.phoneNumber || sub.applicantPhone || '').includes(query)
      );
    }
    
    setFilteredSubscriptions(filtered);
  }, [subscriptions, statusFilter, currentTab, searchQuery]);

  // Valider une inscription
  const handleApprove = async (subscription: FablabSubscription) => {
    try {
      // Générer une clé d'accès
      const accessKey = generateAccessKey();
      const accessKeyExpiry = calculateExpiryDate(subscription.subscriptionType || 'workshop');
      
      // Mettre à jour l'inscription
      const updatedSubscription = {
        ...subscription,
        status: 'approved',
        accessKey,
        accessKeyExpiry
      };
      
      await put(`/api/admin/fablab-subscriptions/${subscription.id}`, updatedSubscription);
      
      // Mise à jour locale des données
      setSubscriptions(prev => 
        prev.map(s => s.id === subscription.id ? 
          { ...s, status: 'approved', accessKey, accessKeyExpiry } : s
        )
      );
      
      toast({
        title: "Succès",
        description: "Inscription approuvée avec succès",
      });
      
      // Ouvrir le formulaire d'email pour envoyer la clé d'accès
      setEmailSubscription({ ...subscription, accessKey, accessKeyExpiry });
      setEmailType('accessKey');
      
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
  const handleReject = async (subscription: FablabSubscription) => {
    try {
      // Mettre à jour l'inscription
      const updatedSubscription = {
        ...subscription,
        status: 'rejected'
      };
      
      await put(`/api/admin/fablab-subscriptions/${subscription.id}`, updatedSubscription);
      
      // Mise à jour locale des données
      setSubscriptions(prev => 
        prev.map(s => s.id === subscription.id ? { ...s, status: 'rejected' } : s)
      );
      
      toast({
        title: "Succès",
        description: "Inscription refusée",
      });
      
      // Ouvrir le formulaire d'email pour notifier le refus
      setEmailSubscription(subscription);
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
    if (!emailSubscription) return;
    
    try {
      // Envoi de l'email via l'API
      await put(`/api/admin/fablab-subscriptions/${emailSubscription.id}/send-email`, {
        ...emailData,
        emailType
      });
      
      // Mise à jour de l'historique des emails envoyés
      const now = new Date().toISOString();
      const emailRecord = `${now}: ${emailType} - ${emailData.subject}`;
      
      // Mise à jour locale des données
      setSubscriptions(prev => 
        prev.map(s => s.id === emailSubscription.id ? {
          ...s,
          emailsSent: [...(s.emailsSent || []), emailRecord]
        } : s)
      );
      
      toast({
        title: "Succès",
        description: "Email envoyé avec succès",
      });
      
      // Fermer le formulaire d'email
      setEmailSubscription(null);
      
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
  const handleSendCustomEmail = (subscription: FablabSubscription) => {
    setEmailSubscription(subscription);
    setEmailType('approval'); // Type par défaut qui sera ignoré pour un email personnalisé
  };

  // Renvoyer la clé d'accès
  const handleResendAccessKey = (subscription: FablabSubscription) => {
    if (!subscription.accessKey) {
      toast({
        title: "Erreur",
        description: "Cette inscription n'a pas de clé d'accès",
        variant: "destructive",
      });
      return;
    }
    
    setEmailSubscription(subscription);
    setEmailType('accessKey');
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
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

  const getSubscriptionTypeBadge = (type?: string) => {
    switch(type) {
      case 'workshop':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Atelier</Badge>;
      case 'monthly':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800">Mensuel</Badge>;
      case 'quarterly':
        return <Badge variant="outline" className="bg-indigo-100 text-indigo-800">Trimestriel</Badge>;
      case 'yearly':
        return <Badge variant="outline" className="bg-pink-100 text-pink-800">Annuel</Badge>;
      default:
        return <Badge variant="outline">Non spécifié</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Abonnements FabLab</h1>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Tous les statuts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="approved">Approuvés</SelectItem>
              <SelectItem value="rejected">Refusés</SelectItem>
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

      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="workshop">Ateliers</TabsTrigger>
          <TabsTrigger value="monthly">Abonnements mensuels</TabsTrigger>
          <TabsTrigger value="quarterly">Abonnements trimestriels</TabsTrigger>
          <TabsTrigger value="yearly">Abonnements annuels</TabsTrigger>
        </TabsList>

        <Card>
          <CardHeader>
            <CardTitle>Liste des abonnements ({filteredSubscriptions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : filteredSubscriptions.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                Aucun abonnement trouvé
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidat</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Atelier/Programme</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Paiement</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubscriptions.map((subscription) => (
                      <TableRow key={subscription.id}>
                        <TableCell>
                          <div className="font-medium">
                            {subscription.applicantName || subscription.name}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Mail className="h-3 w-3" /> 
                            {subscription.applicantEmail || subscription.email}
                          </div>
                          {(subscription.applicantPhone || subscription.phoneNumber) && (
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Phone className="h-3 w-3" /> 
                              {subscription.applicantPhone || subscription.phoneNumber}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {getSubscriptionTypeBadge(subscription.subscriptionType)}
                        </TableCell>
                        <TableCell>
                          {subscription.workshopTitle || subscription.workshop || '-'}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {subscription.createdAt ? format(new Date(subscription.createdAt), 'dd/MM/yyyy') : '-'}
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(subscription.status)}
                        </TableCell>
                        <TableCell>
                          {getPaymentStatusBadge(subscription.paymentStatus)}
                          <div className="text-xs text-gray-500 mt-1">
                            {subscription.paymentMethod}
                            {subscription.paymentReference && ` (${subscription.paymentReference})`}
                          </div>
                          {(subscription.paymentReceiptUrl || subscription.paymentProofUrl) && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs flex items-center mt-1 p-0 h-auto"
                              onClick={() => setSelectedDocument({
                                id: `payment-${subscription.id}`,
                                documentTypeId: 'payment',
                                documentTypeName: 'Preuve de paiement',
                                fileName: 'Preuve de paiement',
                                fileUrl: subscription.paymentReceiptUrl || subscription.paymentProofUrl || '',
                                fileSize: 0,
                                uploadedAt: subscription.createdAt,
                                status: 'uploaded'
                              })}
                            >
                              <Eye className="h-3 w-3 mr-1" /> 
                              Voir preuve
                            </Button>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {subscription.status === 'pending' && (
                              <>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="h-8 w-8 p-0 text-green-600" 
                                  onClick={() => handleApprove(subscription)}
                                  title="Approuver"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="h-8 w-8 p-0 text-red-600" 
                                  onClick={() => handleReject(subscription)}
                                  title="Refuser"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            )}

                            {subscription.status === 'approved' && subscription.accessKey && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-8 w-8 p-0 text-blue-600" 
                                onClick={() => handleResendAccessKey(subscription)}
                                title="Renvoyer la clé d'accès"
                              >
                                <Key className="h-4 w-4" />
                              </Button>
                            )}

                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 w-8 p-0" 
                              onClick={() => handleSendCustomEmail(subscription)}
                              title="Envoyer un email"
                            >
                              <Mail className="h-4 w-4" />
                            </Button>

                            {subscription.documents && subscription.documents.length > 0 && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-8 w-8 p-0" 
                                onClick={() => setSelectedDocument(subscription.documents![0])}
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
      </Tabs>

      {selectedDocument && (
        <DocumentViewer 
          document={selectedDocument} 
          onClose={() => setSelectedDocument(null)} 
        />
      )}

      {emailSubscription && (
        <EmailForm
          subscription={emailSubscription}
          onSend={handleSendEmail}
          onCancel={() => setEmailSubscription(null)}
          emailType={emailType}
        />
      )}
    </div>
  );
};

export default AdminFablabRegistrationsPage;

// Remplacer tous les usages de useApi par les hooks spécifiques ou une implémentation locale d'API si besoin
// Par exemple :
// const { get, put } = useFablabSubscriptionApi();
