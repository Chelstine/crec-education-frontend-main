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
import { UniversityApplication, UniversityProgram, SubmittedDocument, EmailTemplate } from '@/types';
import { format } from 'date-fns';
import { 
  Eye, 
  Check, 
  X, 
  FileText, 
  Mail, 
  Download,
  Trash2, 
  Search, 
  Calendar,
  User,
  Phone,
  School,
  GraduationCap
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
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
              <Download className="h-4 w-4" />
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

// Composant de visualisation d'une candidature
interface ApplicationViewerProps {
  application: UniversityApplication;
  program?: UniversityProgram;
  onClose: () => void;
  onViewDocument: (document: SubmittedDocument) => void;
}

const ApplicationViewer: React.FC<ApplicationViewerProps> = ({ application, program, onClose, onViewDocument }) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Candidature de {application.applicantName}</DialogTitle>
          <DialogDescription>
            Soumise le {format(new Date(application.applicationDate), 'dd/MM/yyyy')}
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
                    <div>{application.applicantName}</div>
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <div>{application.applicantEmail}</div>
                  </div>
                  <div>
                    <div className="font-medium">Téléphone</div>
                    <div>{application.applicantPhone}</div>
                  </div>
                  <div>
                    <div className="font-medium">Date de naissance</div>
                    <div>{application.dateOfBirth ? format(new Date(application.dateOfBirth), 'dd/MM/yyyy') : 'Non spécifiée'}</div>
                  </div>
                  <div>
                    <div className="font-medium">Genre</div>
                    <div>
                      {application.gender === 'M' ? 'Masculin' : 
                       application.gender === 'F' ? 'Féminin' : 
                       application.gender || 'Non spécifié'}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Nationalité</div>
                    <div>{application.nationality || 'Non spécifiée'}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Adresse</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-medium">Pays</div>
                    <div>{application.country || 'Non spécifié'}</div>
                  </div>
                  <div>
                    <div className="font-medium">Ville</div>
                    <div>{application.city || 'Non spécifiée'}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="font-medium">Adresse</div>
                    <div>{application.address || 'Non spécifiée'}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Formation antérieure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-medium">Institution précédente</div>
                    <div>{application.previousInstitution || 'Non spécifiée'}</div>
                  </div>
                  <div>
                    <div className="font-medium">Diplôme précédent</div>
                    <div>{application.previousDegree || 'Non spécifié'}</div>
                  </div>
                  <div>
                    <div className="font-medium">Année d'obtention</div>
                    <div>{application.graduationYear || 'Non spécifiée'}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {program && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Programme demandé</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="font-medium">Nom du programme</div>
                      <div>{program.name}</div>
                    </div>
                    <div>
                      <div className="font-medium">Département</div>
                      <div>{program.department}</div>
                    </div>
                    <div>
                      <div className="font-medium">Niveau</div>
                      <div>{program.level}</div>
                    </div>
                    <div>
                      <div className="font-medium">Diplôme</div>
                      <div>{program.degree}</div>
                    </div>
                    <div>
                      <div className="font-medium">Durée</div>
                      <div>{program.duration}</div>
                    </div>
                    <div>
                      <div className="font-medium">Date de début</div>
                      <div>{format(new Date(program.startDate), 'dd/MM/yyyy')}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Documents soumis</CardTitle>
              </CardHeader>
              <CardContent>
                {application.documents && application.documents.length > 0 ? (
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
                      {application.documents.map((doc) => (
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
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    Aucun document soumis
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
                    <div className="font-medium">Montant des frais d'inscription</div>
                    <div>{application.inscriptionFeeAmount} {program?.currency || 'FCFA'}</div>
                  </div>
                  <div>
                    <div className="font-medium">Statut du paiement</div>
                    <div>
                      <Badge 
                        variant="outline" 
                        className={
                          application.inscriptionFeeStatus === 'paid' ? 'bg-green-100 text-green-800' :
                          application.inscriptionFeeStatus === 'waived' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }
                      >
                        {application.inscriptionFeeStatus === 'paid' ? 'Payé' : 
                         application.inscriptionFeeStatus === 'waived' ? 'Exonéré' : 'En attente'}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Méthode de paiement</div>
                    <div>{application.paymentMethod}</div>
                  </div>
                  {application.paymentReference && (
                    <div>
                      <div className="font-medium">Référence de paiement</div>
                      <div>{application.paymentReference}</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {application.notes && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-line">{application.notes}</div>
                </CardContent>
              </Card>
            )}
            
            {application.emailsSent && application.emailsSent.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Historique des emails</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {application.emailsSent.map((email, index) => (
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
  application: UniversityApplication;
  onSend: (emailData: { subject: string, content: string }) => Promise<void>;
  onCancel: () => void;
  emailType: 'approval' | 'rejection' | 'information';
}

const EmailForm: React.FC<EmailFormProps> = ({ application, onSend, onCancel, emailType }) => {
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
        const response = await get('/api/admin/email-templates?type=university&category=' + emailType);
        setTemplates(response.data || []);
        
        // Si des templates sont disponibles, sélectionner le premier par défaut
        if (response.data && response.data.length > 0) {
          setTemplateId(response.data[0].id);
          setSubject(response.data[0].subject);
          
          // Remplacer les variables par les valeurs correspondantes
          let body = response.data[0].body;
          body = body.replace(/{{name}}/g, application.applicantName);
          body = body.replace(/{{email}}/g, application.applicantEmail);
          
          setContent(body);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des templates:", error);
      }
    };
    
    loadTemplates();
  }, [emailType, application, get]);

  // Gestion du changement de template
  const handleTemplateChange = (templateId: string) => {
    setTemplateId(templateId);
    const selectedTemplate = templates.find(t => t.id === templateId);
    
    if (selectedTemplate) {
      setSubject(selectedTemplate.subject);
      
      // Remplacer les variables par les valeurs correspondantes
      let body = selectedTemplate.body;
      body = body.replace(/{{name}}/g, application.applicantName);
      body = body.replace(/{{email}}/g, application.applicantEmail);
      
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
            Cet email sera envoyé à {application.applicantEmail}
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

const AdminUniversityRegistrationsPage: React.FC = () => {
  const [applications, setApplications] = useState<UniversityApplication[]>([]);
  const [programs, setPrograms] = useState<Record<string, UniversityProgram>>({});
  const [filteredApplications, setFilteredApplications] = useState<UniversityApplication[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [programFilter, setProgramFilter] = useState<string>('all');
  const [selectedApplication, setSelectedApplication] = useState<UniversityApplication | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<SubmittedDocument | null>(null);
  const [emailApplication, setEmailApplication] = useState<UniversityApplication | null>(null);
  const [emailType, setEmailType] = useState<'approval' | 'rejection' | 'information'>('information');
  const { get, put } = useApi();
  const { toast } = useToast();

  // Chargement des candidatures et des programmes
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Chargement des candidatures
        const applicationsResponse = await get('/api/admin/university-applications');
        const applicationsData = applicationsResponse.data || [];
        setApplications(applicationsData);
        setFilteredApplications(applicationsData);
        
        // Chargement des programmes
        const programsResponse = await get('/api/admin/university-programs');
        const programsData = programsResponse.data || [];
        
        // Création d'un dictionnaire pour un accès facile par ID
        const programsDict: Record<string, UniversityProgram> = {};
        programsData.forEach((program: UniversityProgram) => {
          programsDict[program.id] = program;
        });
        
        setPrograms(programsDict);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les candidatures universitaires",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [get, toast]);

  // Filtrage des candidatures
  useEffect(() => {
    let filtered = [...applications];
    
    // Filtre par statut
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }
    
    // Filtre par programme
    if (programFilter !== 'all') {
      filtered = filtered.filter(app => app.programId === programFilter);
    }
    
    // Filtre par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(app => 
        app.applicantName.toLowerCase().includes(query) ||
        app.applicantEmail.toLowerCase().includes(query) ||
        app.applicantPhone.includes(query)
      );
    }
    
    setFilteredApplications(filtered);
  }, [applications, statusFilter, programFilter, searchQuery]);

  // Approuver une candidature
  const handleApprove = async (application: UniversityApplication) => {
    try {
      // Mettre à jour la candidature
      const updatedApplication = {
        ...application,
        status: 'approved'
      };
      
      await put(`/api/admin/university-applications/${application.id}`, updatedApplication);
      
      // Mise à jour locale des données
      setApplications(prev => 
        prev.map(a => a.id === application.id ? { ...a, status: 'approved' } : a)
      );
      
      toast({
        title: "Succès",
        description: "Candidature approuvée avec succès",
      });
      
      // Ouvrir le formulaire d'email pour notifier l'acceptation
      setEmailApplication(application);
      setEmailType('approval');
      
    } catch (error) {
      console.error("Erreur lors de l'approbation:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'approuver cette candidature",
        variant: "destructive",
      });
    }
  };

  // Refuser une candidature
  const handleReject = async (application: UniversityApplication) => {
    try {
      // Mettre à jour la candidature
      const updatedApplication = {
        ...application,
        status: 'rejected'
      };
      
      await put(`/api/admin/university-applications/${application.id}`, updatedApplication);
      
      // Mise à jour locale des données
      setApplications(prev => 
        prev.map(a => a.id === application.id ? { ...a, status: 'rejected' } : a)
      );
      
      toast({
        title: "Succès",
        description: "Candidature refusée",
      });
      
      // Ouvrir le formulaire d'email pour notifier le refus
      setEmailApplication(application);
      setEmailType('rejection');
      
    } catch (error) {
      console.error("Erreur lors du refus:", error);
      toast({
        title: "Erreur",
        description: "Impossible de refuser cette candidature",
        variant: "destructive",
      });
    }
  };

  // Envoyer un email
  const handleSendEmail = async (emailData: { subject: string, content: string }) => {
    if (!emailApplication) return;
    
    try {
      // Envoi de l'email via l'API
      await put(`/api/admin/university-applications/${emailApplication.id}/send-email`, {
        ...emailData,
        emailType
      });
      
      // Mise à jour de l'historique des emails envoyés
      const now = new Date().toISOString();
      const emailRecord = `${now}: ${emailType} - ${emailData.subject}`;
      
      // Mise à jour locale des données
      setApplications(prev => 
        prev.map(a => a.id === emailApplication.id ? {
          ...a,
          emailsSent: [...(a.emailsSent || []), emailRecord]
        } : a)
      );
      
      toast({
        title: "Succès",
        description: "Email envoyé avec succès",
      });
      
      // Fermer le formulaire d'email
      setEmailApplication(null);
      
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
  const handleSendCustomEmail = (application: UniversityApplication) => {
    setEmailApplication(application);
    setEmailType('information');
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'draft':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Brouillon</Badge>;
      case 'submitted':
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
      case 'waived':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Exonéré</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Candidatures Universitaires</h1>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Tous les statuts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="draft">Brouillons</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="submitted">Soumises</SelectItem>
              <SelectItem value="approved">Approuvées</SelectItem>
              <SelectItem value="rejected">Refusées</SelectItem>
            </SelectContent>
          </Select>

          <Select value={programFilter} onValueChange={setProgramFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Tous les programmes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les programmes</SelectItem>
              {Object.values(programs).map(program => (
                <SelectItem key={program.id} value={program.id}>
                  {program.name}
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
          <CardTitle>Liste des candidatures ({filteredApplications.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              Aucune candidature trouvée
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidat</TableHead>
                    <TableHead>Programme</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Paiement</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell>
                        <div className="font-medium">
                          {application.applicantName}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="h-3 w-3" /> 
                          {application.applicantEmail}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Phone className="h-3 w-3" /> 
                          {application.applicantPhone}
                        </div>
                      </TableCell>
                      <TableCell>
                        {programs[application.programId]?.name || application.programId}
                      </TableCell>
                      <TableCell>
                        {format(new Date(application.applicationDate), 'dd/MM/yyyy')}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(application.status)}
                      </TableCell>
                      <TableCell>
                        {getPaymentStatusBadge(application.inscriptionFeeStatus)}
                        <div className="text-xs text-gray-500 mt-1">
                          {application.paymentMethod}
                          {application.paymentReference && ` (${application.paymentReference})`}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-gray-100">
                          {application.documents?.length || 0} documents
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0" 
                            onClick={() => setSelectedApplication(application)}
                            title="Voir les détails"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          {(application.status === 'pending' || application.status === 'submitted') && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-8 w-8 p-0 text-green-600" 
                                onClick={() => handleApprove(application)}
                                title="Approuver"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-8 w-8 p-0 text-red-600" 
                                onClick={() => handleReject(application)}
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
                            onClick={() => handleSendCustomEmail(application)}
                            title="Envoyer un email"
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
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

      {selectedApplication && (
        <ApplicationViewer 
          application={selectedApplication} 
          program={programs[selectedApplication.programId]} 
          onClose={() => setSelectedApplication(null)} 
          onViewDocument={setSelectedDocument}
        />
      )}

      {selectedDocument && (
        <DocumentViewer 
          document={selectedDocument} 
          onClose={() => setSelectedDocument(null)} 
        />
      )}

      {emailApplication && (
        <EmailForm
          application={emailApplication}
          onSend={handleSendEmail}
          onCancel={() => setEmailApplication(null)}
          emailType={emailType}
        />
      )}
    </div>
  );
};

export default AdminUniversityRegistrationsPage;
