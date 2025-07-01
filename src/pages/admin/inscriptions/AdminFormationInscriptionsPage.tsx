import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { FormationInscription, EmailTemplate } from '@/types';
import FormDialog from '@/components/admin/FormDialog';
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
  Calendar
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DocumentViewerProps {
  document: {
    id: string;
    fileName: string;
    fileUrl: string;
    uploadedAt: string;
    status: string;
  };
  onClose: () => void;
}

const getFileType = (fileName: string) => {
  if (fileName.match(/\.(jpg|jpeg|png|gif)$/i)) return 'image';
  if (fileName.match(/\.pdf$/i)) return 'pdf';
  return 'other';
};

const DocumentViewer: React.FC<DocumentViewerProps> = ({ document, onClose }) => {
  if (!document) return null;
  const fileType = getFileType(document.fileName);
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{document.fileName}</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <p><span className="font-medium">Type:</span> {fileType}</p>
        <p><span className="font-medium">Statut:</span> {document.status}</p>
        <p><span className="font-medium">Téléchargé le:</span> {format(new Date(document.uploadedAt), 'dd/MM/yyyy HH:mm')}</p>
      </div>
      <div className="bg-muted rounded-md mt-2">
        {fileType === 'image' ? (
          <img src={document.fileUrl} alt={document.fileName} className="max-w-full h-auto rounded-md" />
        ) : fileType === 'pdf' ? (
          <iframe 
            src={document.fileUrl} 
            className="w-full h-[500px] rounded-md"
            title={document.fileName}
          />
        ) : (
          <div className="p-4 text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-2">Aperçu non disponible</p>
            <Button className="mt-2" asChild>
              <a href={document.fileUrl} target="_blank" rel="noopener noreferrer" download>
                Télécharger
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

interface EmailProps {
  inscription: FormationInscription;
  onSend: (inscription: FormationInscription, subject: string, content: string, templateId?: string) => void;
  emailTemplates: EmailTemplate[];
}

const EmailForm: React.FC<EmailProps> = ({ inscription, onSend, emailTemplates }) => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  useEffect(() => {
    if (selectedTemplate) {
      const template = emailTemplates.find(t => t.id === selectedTemplate);
      if (template) {
        setSubject(template.subject);
        
        // Replace variables with actual values
        let processedContent = template.body;
        if (inscription.name) {
          processedContent = processedContent.replace(/\{name\}/g, inscription.name);
        } else if (inscription.applicantName) {
          processedContent = processedContent.replace(/\{name\}/g, inscription.applicantName);
        }
        
        if (inscription.formation) {
          processedContent = processedContent.replace(/\{formation\}/g, inscription.formation);
        } else if (inscription.formationTitle) {
          processedContent = processedContent.replace(/\{formation\}/g, inscription.formationTitle);
        }
        
        processedContent = processedContent.replace(/\{email\}/g, inscription.email || inscription.applicantEmail || '');
        
        setContent(processedContent);
      }
    }
  }, [selectedTemplate, emailTemplates, inscription]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend(inscription, subject, content, selectedTemplate);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="space-y-2">
        <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
          <SelectTrigger>
            <SelectValue placeholder="Choisir un modèle d'email" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {emailTemplates
                .filter(template => template.type === 'formation')
                .map(template => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))
              }
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject">Sujet</label>
        <Input
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="content">Contenu</label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          required
        />
      </div>
      
      <Button type="submit">Envoyer</Button>
    </form>
  );
};

interface RejectDialogProps {
  inscription: FormationInscription;
  onReject: (inscription: FormationInscription, reason: string, sendEmail: boolean) => void;
}

const RejectDialog: React.FC<RejectDialogProps> = ({ inscription, onReject }) => {
  const [reason, setReason] = useState('');
  const [sendEmail, setSendEmail] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onReject(inscription, reason, sendEmail);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="space-y-2">
        <label htmlFor="reason">Motif du refus</label>
        <Textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Expliquez pourquoi cette inscription est refusée..."
          rows={5}
          required
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="sendEmail" 
          checked={sendEmail} 
          onCheckedChange={(checked) => setSendEmail(checked as boolean)} 
        />
        <label htmlFor="sendEmail">
          Notifier la personne par email
        </label>
      </div>
      
      <Button type="submit" variant="destructive">Confirmer le refus</Button>
    </form>
  );
};

const AdminFormationInscriptionsPage: React.FC = () => {
  const [inscriptions, setInscriptions] = useState<FormationInscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedInscription, setSelectedInscription] = useState<FormationInscription | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [currentTab, setCurrentTab] = useState('pending');
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isDocumentDialogOpen, setIsDocumentDialogOpen] = useState(false);
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([]);

  // Dummy data for development
  const mockInscriptions: FormationInscription[] = [
    {
      id: '1',
      formationId: 'form1',
      formationTitle: 'Introduction à la Programmation Web',
      formation: 'Introduction à la Programmation Web',
      name: 'Jean Dupont',
      applicantName: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      applicantEmail: 'jean.dupont@example.com',
      phoneNumber: '+243123456789',
      level: 'débutant',
      motivation: 'Je souhaite améliorer mes compétences en programmation web pour mon travail.',
      paymentMethod: 'bank_transfer',
      paymentReference: 'REF123456',
      paymentProofUrl: 'https://example.com/proof1.pdf',
      paymentStatus: 'paid',
      status: 'pending',
      documents: [
        {
          id: 'doc1',
          documentTypeId: 'type1',
          documentTypeName: 'Preuve de paiement',
          fileName: 'Preuve de paiement.pdf',
          fileUrl: 'https://example.com/preuve-paiement.pdf',
          fileSize: 234567,
          uploadedAt: '2023-05-10T10:30:00Z',
          status: 'uploaded'
        },
        {
          id: 'doc2',
          documentTypeId: 'type2',
          documentTypeName: 'Pièce d\'identité',
          fileName: 'Pièce d\'identité.jpg',
          fileUrl: 'https://example.com/id-card.jpg',
          fileSize: 123456,
          uploadedAt: '2023-05-10T10:32:00Z',
          status: 'uploaded'
        }
      ],
      emailsSent: ['confirmation'],
      createdAt: '2023-05-10T10:00:00Z',
      updatedAt: '2023-05-10T10:35:00Z'
    },
    {
      id: '2',
      formationId: 'form2',
      formationTitle: 'Data Science Avancé',
      formation: 'Data Science Avancé',
      name: 'Marie Laforet',
      applicantName: 'Marie Laforet',
      email: 'marie.laforet@example.com',
      applicantEmail: 'marie.laforet@example.com',
      phoneNumber: '+243987654321',
      level: 'intermédiaire',
      motivation: 'Je veux approfondir mes connaissances en data science.',
      paymentMethod: 'card',
      paymentReference: 'CC123456',
      paymentStatus: 'paid',
      status: 'approved',
      documents: [
        {
          id: 'doc3',
          documentTypeId: 'type3',
          documentTypeName: 'CV',
          fileName: 'CV',
          fileUrl: 'https://example.com/cv.pdf',
          fileSize: 345678,
          uploadedAt: '2023-05-15T14:20:00Z',
          status: 'uploaded'
        }
      ],
      emailsSent: ['confirmation'],
      createdAt: '2023-05-15T14:00:00Z',
      updatedAt: '2023-05-15T14:25:00Z'
    },
    {
      id: '3',
      formationId: 'form1',
      formationTitle: 'Introduction à la Programmation Web',
      formation: 'Introduction à la Programmation Web',
      name: 'Paul Mbuyi',
      applicantName: 'Paul Mbuyi',
      email: 'paul.mbuyi@example.com',
      applicantEmail: 'paul.mbuyi@example.com',
      phoneNumber: '+243555555555',
      level: 'débutant',
      motivation: 'Je veux apprendre à créer des sites web.',
      paymentMethod: 'cash',
      paymentReference: 'CASH001',
      paymentStatus: 'paid',
      status: 'approved',
      documents: [],
      emailsSent: ['confirmation', 'approval'],
      createdAt: '2023-05-05T09:00:00Z',
      updatedAt: '2023-05-06T11:35:00Z'
    },
    {
      id: '4',
      formationId: 'form3',
      formationTitle: 'Intelligence Artificielle et Machine Learning',
      formation: 'Intelligence Artificielle et Machine Learning',
      name: 'Sophie Kabongo',
      applicantName: 'Sophie Kabongo',
      email: 'sophie.kabongo@example.com',
      applicantEmail: 'sophie.kabongo@example.com',
      phoneNumber: '+243654321987',
      level: 'avancé',
      motivation: 'Je suis passionnée par l\'IA et le machine learning.',
      paymentMethod: 'bank_transfer',
      paymentReference: 'REF654321',
      paymentStatus: 'paid',
      status: 'rejected',
      documents: [
        {
          id: 'doc4',
          documentTypeId: 'type4',
          documentTypeName: 'Diplôme universitaire',
          fileName: 'Diplôme universitaire',
          fileUrl: 'https://example.com/diplome.pdf',
          fileSize: 307200,
          uploadedAt: '2023-05-20T16:10:00Z',
          status: 'uploaded'
        },
        {
          id: 'doc5',
          documentTypeId: 'type5',
          documentTypeName: 'Lettre de motivation',
          fileName: 'Lettre de motivation',
          fileUrl: 'https://example.com/lettre-motivation.pdf',
          fileSize: 56789,
          uploadedAt: '2023-05-20T16:12:00Z',
          status: 'uploaded'
        }
      ],
      emailsSent: ['confirmation', 'rejection'],
      createdAt: '2023-05-20T16:00:00Z',
      updatedAt: '2023-05-21T10:35:00Z',
      notes: 'Niveau requis insuffisant pour cette formation avancée.'
    }
  ];

  const mockEmailTemplates: EmailTemplate[] = [
    {
      id: 'template1',
      name: 'Confirmation d\'approbation',
      subject: 'Votre inscription à la formation {formation} a été approuvée',
      body: 'Cher(e) {name},\n\nNous avons le plaisir de vous informer que votre inscription à la formation {formation} a été approuvée.\n\nVous recevrez bientôt plus d\'informations concernant le début des cours.\n\nCordialement,\nL\'équipe CREC',
      variables: ['{name}', '{formation}', '{email}'],
      type: 'formation',
      category: 'approval'
    },
    {
      id: 'template2',
      name: 'Notification de rejet',
      subject: 'Information concernant votre inscription à la formation {formation}',
      body: 'Cher(e) {name},\n\nNous regrettons de vous informer que votre inscription à la formation {formation} n\'a pas pu être acceptée.\n\nPour plus d\'informations, veuillez nous contacter.\n\nCordialement,\nL\'équipe CREC',
      variables: ['{name}', '{formation}', '{email}'],
      type: 'formation',
      category: 'rejection'
    },
    {
      id: 'template3',
      name: 'Demande de documents supplémentaires',
      subject: 'Documents supplémentaires requis pour votre inscription à {formation}',
      body: 'Cher(e) {name},\n\nAfin de traiter votre inscription à la formation {formation}, nous avons besoin de documents supplémentaires.\n\nVeuillez nous faire parvenir ces documents dans les plus brefs délais.\n\nCordialement,\nL\'équipe CREC',
      variables: ['{name}', '{formation}', '{email}'],
      type: 'formation',
      category: 'information'
    }
  ];

  // Fetch inscriptionss
  useEffect(() => {
    // Normally, this would be an API call
    // setLoading(true);
    // api.get('/inscriptions/formations')
    //   .then(response => {
    //     setInscriptions(response.data);
    //     setError(null);
    //   })
    //   .catch(err => {
    //     console.error('Error fetching inscriptions:', err);
    //     setError('Erreur lors du chargement des inscriptions.');
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
    
    // Using mock data for development
    setInscriptions(mockInscriptions);
    setEmailTemplates(mockEmailTemplates);
    setLoading(false);
  }, []);

  const filteredInscriptions = inscriptions
    .filter(inscription => {
      // Apply tab filter
      if (currentTab !== 'all') {
        if (currentTab === 'pending' && inscription.status !== 'pending') return false;
        if (currentTab === 'approved' && inscription.status !== 'approved') return false;
        if (currentTab === 'rejected' && inscription.status !== 'rejected') return false;
      }
      
      // Apply search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const name = (inscription.name || inscription.applicantName || '').toLowerCase();
        const email = (inscription.email || inscription.applicantEmail || '').toLowerCase();
        const formation = (inscription.formation || inscription.formationTitle || '').toLowerCase();
                
        if (
          !name.includes(term) && 
          !email.includes(term) && 
          !formation.includes(term) &&
          !inscription.phoneNumber?.toLowerCase().includes(term)
        ) {
          return false;
        }
      }
      
      // Apply status filter
      if (statusFilter !== 'all') {
        if (statusFilter === 'paid' && inscription.paymentStatus !== 'paid') return false;
        if (statusFilter === 'pending' && inscription.paymentStatus !== 'pending') return false;
        if (statusFilter === 'failed' && inscription.paymentStatus !== 'failed') return false;
      }
      
      return true;
    });

  const handleViewInscription = (inscription: FormationInscription) => {
    setSelectedInscription(inscription);
    setIsViewDialogOpen(true);
  };

  const handleApproveInscription = async (inscription: FormationInscription) => {
    try {
      // In a real implementation, this would be an API call
      // await api.post(`/inscriptions/formations/${inscription.id}/approve`);
      
      // Update local state
      const updatedInscriptions = inscriptions.map(item => 
        item.id === inscription.id 
          ? { ...item, status: 'approved' as const, updatedAt: new Date().toISOString() }
          : item
      );
      
      setInscriptions(updatedInscriptions);
      toast({
        title: "Inscription approuvée",
        description: `L'inscription de ${inscription.name || inscription.applicantName} a été approuvée avec succès.`,
      });
      
      // Open email dialog to send approval notification
      setSelectedInscription({...inscription, status: 'approved' as const});
      setIsEmailDialogOpen(true);
    } catch (error) {
      console.error('Error approving inscription:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'approuver l'inscription. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const handleRejectInscription = (inscription: FormationInscription) => {
    setSelectedInscription(inscription);
    setIsRejectDialogOpen(true);
  };

  const handleConfirmReject = async (inscription: FormationInscription, reason: string, sendEmail: boolean) => {
    try {
      // In a real implementation, this would be an API call
      // await api.post(`/inscriptions/formations/${inscription.id}/reject`, { reason });
      
      // Update local state
      const updatedInscriptions = inscriptions.map(item => 
        item.id === inscription.id 
          ? { 
              ...item, 
              status: 'rejected' as const, 
              notes: reason,
              updatedAt: new Date().toISOString() 
            }
          : item
      );
      
      setInscriptions(updatedInscriptions);
      setIsRejectDialogOpen(false);
            
      toast({
        title: "Inscription refusée",
        description: `L'inscription de ${inscription.name || inscription.applicantName} a été refusée.`,
      });
      
      // If sendEmail is true, open the email dialog
      if (sendEmail) {
        setSelectedInscription({...inscription, status: 'rejected' as const, notes: reason});
        setIsEmailDialogOpen(true);
      }
    } catch (error) {
      console.error('Error rejecting inscription:', error);
      toast({
        title: "Erreur",
        description: "Impossible de refuser l'inscription. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteInscription = async (inscription: FormationInscription) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'inscription de ${inscription.name || inscription.applicantName} ?`)) {
      try {
        // In a real implementation, this would be an API call
        // await api.delete(`/inscriptions/formations/${inscription.id}`);
        
        // Update local state
        setInscriptions(inscriptions.filter(item => item.id !== inscription.id));
                
        toast({
          title: "Inscription supprimée",
          description: `L'inscription de ${inscription.name || inscription.applicantName} a été supprimée.`,
        });
      } catch (error) {
        console.error('Error deleting inscription:', error);
        toast({
          title: "Erreur",
          description: "Impossible de supprimer l'inscription. Veuillez réessayer.",
          variant: "destructive",
        });
      }
    }
  };

  const handleViewDocument = (document: any) => {
    setSelectedDocument(document);
    setIsDocumentDialogOpen(true);
  };

  const handleSendEmail = async (
    inscription: FormationInscription,
    subject: string,
    content: string,
    templateId?: string
  ) => {
    try {
      // In a real implementation, this would be an API call
      // await api.post(`/emails/send`, {
      //   to: inscription.email || inscription.applicantEmail,
      //   subject,
      //   content,
      //   inscriptionId: inscription.id,
      //   inscriptionType: 'formation',
      //   templateId
      // });
      
      // For mock, we'll just update the emailsSent array
      const emailType = templateId 
        ? emailTemplates.find(t => t.id === templateId)?.category || 'information'
        : 'information';
      
      // Update local state
      const updatedInscriptions = inscriptions.map(item => 
        item.id === inscription.id 
          ? { 
              ...item, 
              emailsSent: [...item.emailsSent, emailType],
              updatedAt: new Date().toISOString() 
            }
          : item
      );
         
      setInscriptions(updatedInscriptions);
      setIsEmailDialogOpen(false);
      
      toast({
        title: "Email envoyé",
        description: `Un email a été envoyé à ${inscription.name || inscription.applicantName}.`,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer l'email. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Chargement...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline">En attente</Badge>;
      case 'approved':
        return <Badge variant="default">Approuvé</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Refusé</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline">En attente</Badge>;
      case 'paid':
        return <Badge variant="default">Payé</Badge>;
      case 'failed':
        return <Badge variant="destructive">Échoué</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Inscriptions aux Formations Ouvertes</CardTitle>
              <CardDescription>
                Gérer les inscriptions aux formations ouvertes
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, email, formation..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Statut de paiement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="paid">Payé</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="failed">Échoué</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs 
            defaultValue="pending" 
            className="w-full" 
            value={currentTab}
            onValueChange={setCurrentTab}
          >
            <TabsList className="mb-4">
              <TabsTrigger value="pending">En attente</TabsTrigger>
              <TabsTrigger value="approved">Approuvés</TabsTrigger>
              <TabsTrigger value="rejected">Refusés</TabsTrigger>
              <TabsTrigger value="all">Tous</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pending">
              <InscriptionsTable 
                inscriptions={filteredInscriptions} 
                getStatusBadge={getStatusBadge}
                getPaymentStatusBadge={getPaymentStatusBadge}
                onView={handleViewInscription}
                onApprove={handleApproveInscription}
                onReject={handleRejectInscription}
                onDelete={handleDeleteInscription}
                onEmail={(inscription) => {
                  setSelectedInscription(inscription);
                  setIsEmailDialogOpen(true);
                }}
              />
            </TabsContent>
            
            <TabsContent value="approved">
              <InscriptionsTable 
                inscriptions={filteredInscriptions} 
                getStatusBadge={getStatusBadge}
                getPaymentStatusBadge={getPaymentStatusBadge}
                onView={handleViewInscription}
                onApprove={handleApproveInscription}
                onReject={handleRejectInscription}
                onDelete={handleDeleteInscription}
                onEmail={(inscription) => {
                  setSelectedInscription(inscription);
                  setIsEmailDialogOpen(true);
                }}
              />
            </TabsContent>
            
            <TabsContent value="rejected">
              <InscriptionsTable 
                inscriptions={filteredInscriptions} 
                getStatusBadge={getStatusBadge}
                getPaymentStatusBadge={getPaymentStatusBadge}
                onView={handleViewInscription}
                onApprove={handleApproveInscription}
                onReject={handleRejectInscription}
                onDelete={handleDeleteInscription}
                onEmail={(inscription) => {
                  setSelectedInscription(inscription);
                  setIsEmailDialogOpen(true);
                }}
              />
            </TabsContent>
            
            <TabsContent value="all">
              <InscriptionsTable 
                inscriptions={filteredInscriptions} 
                getStatusBadge={getStatusBadge}
                getPaymentStatusBadge={getPaymentStatusBadge}
                onView={handleViewInscription}
                onApprove={handleApproveInscription}
                onReject={handleRejectInscription}
                onDelete={handleDeleteInscription}
                onEmail={(inscription) => {
                  setSelectedInscription(inscription);
                  setIsEmailDialogOpen(true);
                }}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* View Inscription Dialog */}
      <FormDialog
        title="Détails de l'inscription"
        isOpen={isViewDialogOpen}
        onClose={() => setIsViewDialogOpen(false)}
        onSubmit={async () => {}}
      >
        {selectedInscription && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium">Informations personnelles</h3>
                <p><span className="font-medium">Nom:</span> {selectedInscription.name || selectedInscription.applicantName}</p>
                <p><span className="font-medium">Email:</span> {selectedInscription.email || selectedInscription.applicantEmail}</p>
                <p><span className="font-medium">Téléphone:</span> {selectedInscription.phoneNumber || selectedInscription.applicantPhone}</p>
              </div>
              <div>
                <h3 className="font-medium">Informations de formation</h3>
                <p><span className="font-medium">Formation:</span> {selectedInscription.formation || selectedInscription.formationTitle}</p>
                <p><span className="font-medium">Niveau:</span> {selectedInscription.level || 'Non spécifié'}</p>
                <p><span className="font-medium">Statut:</span> {getStatusBadge(selectedInscription.status)}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium">Motivation</h3>
              <p className="border p-2 rounded-md">{selectedInscription.motivation || 'Non spécifiée'}</p>
            </div>
            
            <div>
              <h3 className="font-medium">Paiement</h3>
              <p><span className="font-medium">Méthode:</span> {selectedInscription.paymentMethod}</p>
              <p><span className="font-medium">Référence:</span> {selectedInscription.paymentReference || 'Non spécifiée'}</p>
              <p><span className="font-medium">Statut:</span> {getPaymentStatusBadge(selectedInscription.paymentStatus)}</p>
              {selectedInscription.paymentProofUrl && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="mt-2"
                  onClick={() => window.open(selectedInscription.paymentProofUrl, '_blank')}
                >
                  <FileDown className="h-4 w-4 mr-2" />
                  Télécharger la preuve de paiement
                </Button>
              )}
            </div>
            
            <div>
              <h3 className="font-medium">Documents soumis ({selectedInscription.documents?.length || 0})</h3>
              {selectedInscription.documents && selectedInscription.documents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {selectedInscription.documents.map(doc => (
                    <Button 
                      key={doc.id} 
                      variant="outline" 
                      className="text-left justify-start overflow-hidden"
                      onClick={() => handleViewDocument(doc)}
                    >
                      <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{doc.fileName}</span>
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Aucun document soumis</p>
              )}
            </div>
            
            <div>
              <h3 className="font-medium">Emails envoyés</h3>
              {selectedInscription.emailsSent && selectedInscription.emailsSent.length > 0 ? (
                <ul className="list-disc pl-5 mt-2">
                  {selectedInscription.emailsSent.map((email, idx) => (
                    <li key={idx}>{email}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">Aucun email envoyé</p>
              )}
            </div>
            
            {selectedInscription.notes && (
              <div>
                <h3 className="font-medium">Notes administratives</h3>
                <p className="border p-2 rounded-md">{selectedInscription.notes}</p>
              </div>
            )}
            
            <div>
              <h3 className="font-medium">Autres informations</h3>
              <p><span className="font-medium">Créé le:</span> {format(new Date(selectedInscription.createdAt), 'dd/MM/yyyy HH:mm')}</p>
              <p><span className="font-medium">Mise à jour le:</span> {format(new Date(selectedInscription.updatedAt), 'dd/MM/yyyy HH:mm')}</p>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                variant="outline"
                onClick={() => {
                  setIsViewDialogOpen(false);
                  setSelectedInscription(null);
                }}
              >
                Fermer
              </Button>
              
              {selectedInscription.status === 'pending' && (
                <>
                  <Button 
                    variant="destructive"
                    onClick={() => {
                      setIsViewDialogOpen(false);
                      handleRejectInscription(selectedInscription);
                    }}
                  >
                    Refuser
                  </Button>
                  <Button 
                    onClick={() => {
                      setIsViewDialogOpen(false);
                      handleApproveInscription(selectedInscription);
                    }}
                  >
                    Approuver
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </FormDialog>

      {/* Email Dialog */}
      <FormDialog
        title="Envoyer un email"
        isOpen={isEmailDialogOpen}
        onClose={() => setIsEmailDialogOpen(false)}
        onSubmit={async () => {}}
      >
        {selectedInscription && (
          <EmailForm 
            inscription={selectedInscription}
            onSend={handleSendEmail}
            emailTemplates={emailTemplates}
          />
        )}
      </FormDialog>

      {/* Reject Dialog */}
      <FormDialog
        title="Refuser l'inscription"
        isOpen={isRejectDialogOpen}
        onClose={() => setIsRejectDialogOpen(false)}
        onSubmit={async () => {}}
      >
        {selectedInscription && (
          <RejectDialog 
            inscription={selectedInscription}
            onReject={handleConfirmReject}
          />
        )}
      </FormDialog>

      {/* Document Viewer Dialog */}
      <FormDialog
        title="Visualisation du document"
        isOpen={isDocumentDialogOpen}
        onClose={() => setIsDocumentDialogOpen(false)}
        onSubmit={async () => {}}
      >
        {selectedDocument && (
          <DocumentViewer 
            document={selectedDocument}
            onClose={() => setIsDocumentDialogOpen(false)}
          />
        )}
      </FormDialog>
    </div>
  );
};

interface InscriptionsTableProps {
  inscriptions: FormationInscription[];
  getStatusBadge: (status: string) => React.ReactNode;
  getPaymentStatusBadge: (status: string) => React.ReactNode;
  onView: (inscription: FormationInscription) => void;
  onApprove: (inscription: FormationInscription) => void;
  onReject: (inscription: FormationInscription) => void;
  onDelete: (inscription: FormationInscription) => void;
  onEmail: (inscription: FormationInscription) => void;
}

const InscriptionsTable: React.FC<InscriptionsTableProps> = ({
  inscriptions,
  getStatusBadge,
  getPaymentStatusBadge,
  onView,
  onApprove,
  onReject,
  onDelete,
  onEmail
}) => {
  return (
    <div className="border rounded-md">
      <ScrollArea className="h-[600px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Formation</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Paiement</TableHead>
              <TableHead>Documents</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inscriptions.length > 0 ? (
              inscriptions.map((inscription) => (
                <TableRow key={inscription.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{format(new Date(inscription.createdAt), 'dd/MM/yyyy')}</span>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(inscription.createdAt), 'HH:mm')}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{inscription.name || inscription.applicantName}</div>
                    <div className="text-sm text-muted-foreground">{inscription.email || inscription.applicantEmail}</div>
                  </TableCell>
                  <TableCell>{inscription.formation || inscription.formationTitle}</TableCell>
                  <TableCell>{getStatusBadge(inscription.status)}</TableCell>
                  <TableCell>{getPaymentStatusBadge(inscription.paymentStatus)}</TableCell>
                  <TableCell>
                    {inscription.documents?.length || 0} document(s)
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="icon" variant="ghost" onClick={() => onView(inscription)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost"
                        onClick={() => onEmail(inscription)}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                      {inscription.status === 'pending' && (
                        <>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => onApprove(inscription)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => onReject(inscription)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <Button 
                        size="icon"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => onDelete(inscription)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
      </ScrollArea>
    </div>
  );
};
