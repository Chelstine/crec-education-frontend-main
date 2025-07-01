import React, { useState, useEffect } from 'react';
import { 
  DataTable,
  DeleteConfirmDialog,
  FormDialog
} from '@/components/admin';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  PencilIcon, 
  TrashIcon, 
  CheckCircle, 
  XCircle, 
  Mail, 
  FileText, 
  Download, 
  Eye,
  Clock,
  Calendar,
  User,
  Phone,
  MapPin,
  CreditCard
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { UniversityApplication, UniversityProgram } from '@/types';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Composant pour afficher un document
const DocumentViewer = ({ document, onClose }: { document: { name: string, url: string, type: string }, onClose: () => void }) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{document.name}</DialogTitle>
          <DialogDescription>
            <a 
              href={document.url} 
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
          {document.type.includes('pdf') ? (
            <iframe 
              src={document.url} 
              className="w-full h-[500px] border" 
              title={document.name}
            />
          ) : document.type.includes('image') ? (
            <img src={document.url} alt={document.name} className="w-full" />
          ) : (
            <div className="p-4 text-center">
              <p>Ce type de document ne peut pas être prévisualisé.</p>
              <Button asChild className="mt-2">
                <a href={document.url} target="_blank" rel="noopener noreferrer">
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

// Composant de formulaire pour l'envoi d'un email
interface EmailFormProps {
  application: UniversityApplication;
  onSend: (emailContent: string) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const EmailForm: React.FC<EmailFormProps> = ({ application, onSend, onCancel, isSubmitting }) => {
  const [subject, setSubject] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [templateType, setTemplateType] = useState<string>(""); 

  // Templates d'email prédéfinis
  const emailTemplates = [
    {
      id: "approval",
      name: "Approbation de candidature",
      subject: "Votre candidature au CREC a été acceptée",
      content: `Cher/Chère ${application.applicantName},

Nous sommes heureux de vous informer que votre candidature au programme ${application.programId} a été acceptée.

Voici les prochaines étapes :
1. Finaliser le paiement des frais de scolarité
2. Compléter les formalités administratives
3. Participer à la séance d'orientation le [DATE]

N'hésitez pas à nous contacter si vous avez des questions.

Cordialement,
L'équipe CREC Education`,
      type: "approved"
    },
    {
      id: "rejection",
      name: "Rejet de candidature",
      subject: "Résultat de votre candidature au CREC",
      content: `Cher/Chère ${application.applicantName},

Nous vous remercions pour l'intérêt que vous portez à notre institution. 

Après examen attentif de votre dossier, nous sommes au regret de vous informer que votre candidature n'a pas été retenue pour cette session.

Nous vous encourageons à postuler de nouveau lors d'une prochaine session d'inscription.

Cordialement,
L'équipe CREC Education`,
      type: "rejected"
    },
    {
      id: "documents",
      name: "Documents manquants",
      subject: "Documents supplémentaires requis - Candidature CREC",
      content: `Cher/Chère ${application.applicantName},

Nous examinons actuellement votre candidature au programme ${application.programId}.

Pour compléter votre dossier, nous avons besoin des documents supplémentaires suivants :
- [LISTE DES DOCUMENTS]

Veuillez nous faire parvenir ces documents dans les 7 jours ouvrables.

Cordialement,
L'équipe CREC Education`,
      type: "pending"
    }
  ];

  const handleTemplateChange = (id: string) => {
    const template = emailTemplates.find(t => t.id === id);
    if (template) {
      setTemplateType(id);
      setSubject(template.subject);
      setContent(template.content);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailData = `Sujet: ${subject}\n\nContenu:\n${content}`;
    onSend(emailData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="template">Modèle d'email</Label>
        <Select onValueChange={handleTemplateChange}>
          <SelectTrigger>
            <SelectValue placeholder="Choisir un modèle d'email" />
          </SelectTrigger>
          <SelectContent>
            {emailTemplates.map((template) => (
              <SelectItem key={template.id} value={template.id}>
                {template.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="recipient">Destinataire</Label>
        <Input id="recipient" value={application.applicantEmail} disabled />
      </div>

      <div>
        <Label htmlFor="subject">Sujet</Label>
        <Input 
          id="subject" 
          value={subject} 
          onChange={(e) => setSubject(e.target.value)} 
          placeholder="Sujet de l'email" 
          required 
        />
      </div>

      <div>
        <Label htmlFor="content">Contenu</Label>
        <Textarea 
          id="content" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="Contenu de l'email" 
          rows={10} 
          required 
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Annuler
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
        </Button>
      </div>
    </form>
  );
};

// Composant principal pour la gestion des candidatures universitaires
const AdminUniversityApplicationsPage: React.FC = () => {
  const { toast } = useToast();

  // États de l'application
  const [activeTab, setActiveTab] = useState<string>("pending");
  const [applications, setApplications] = useState<UniversityApplication[]>([]);
  const [programs, setPrograms] = useState<UniversityProgram[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<UniversityApplication | null>(null);
  const [viewDocument, setViewDocument] = useState<{ name: string, url: string, type: string } | null>(null);
  
  // États des modals
  const [showEmailModal, setShowEmailModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Données factices pour les candidatures universitaires
  const mockApplications: UniversityApplication[] = [
    {
      id: "app-1",
      programId: "prog-1",
      applicantName: "Jean Kouassi",
      applicantEmail: "jean.kouassi@example.com",
      applicantPhone: "+225 07 12 34 56",
      dateOfBirth: "1998-05-15",
      nationality: "Ivoirienne",
      gender: "M",
      city: "Abidjan",
      address: "Cocody, Rue des Jardins",
      country: "Côte d'Ivoire",
      previousInstitution: "Lycée Classique d'Abidjan",
      previousDegree: "Baccalauréat série C",
      graduationYear: "2023",
      documents: [
        {
          id: "doc-1-1",
          documentTypeId: "birth_certificate",
          documentTypeName: "Acte de naissance",
          fileName: "acte_naissance_jean_kouassi.pdf",
          fileUrl: "/documents/acte_naissance.pdf",
          fileSize: 1205000,
          uploadedAt: "2023-12-15T10:30:00Z",
          status: "uploaded"
        },
        {
          id: "doc-1-2",
          documentTypeId: "bac_certificate",
          documentTypeName: "Diplôme du Baccalauréat",
          fileName: "bac_jean_kouassi.pdf",
          fileUrl: "/documents/bac_certificate.pdf",
          fileSize: 2500000,
          uploadedAt: "2023-12-15T10:35:00Z",
          status: "uploaded"
        }
      ],
      status: "pending",
      applicationDate: "2023-12-15T10:40:00Z",
      inscriptionFeeStatus: "pending",
      inscriptionFeeAmount: 150000,
      paymentMethod: "mobile_money",
      paymentReference: "MM123456789",
      notes: "Candidature reçue avec tous les documents requis",
      emailsSent: [],
      createdAt: "2023-12-15T10:40:00Z",
      updatedAt: "2023-12-15T10:40:00Z"
    },
    {
      id: "app-2",
      programId: "prog-2",
      applicantName: "Marie Diallo",
      applicantEmail: "marie.diallo@example.com",
      applicantPhone: "+223 90 78 56 34",
      dateOfBirth: "1996-08-22",
      nationality: "Malienne",
      gender: "F",
      city: "Bamako",
      address: "Quartier du Fleuve, Rue 45",
      country: "Mali",
      previousInstitution: "Université de Bamako",
      previousDegree: "Licence en Informatique",
      graduationYear: "2022",
      documents: [
        {
          id: "doc-2-1",
          documentTypeId: "bachelor_diploma",
          documentTypeName: "Diplôme de Licence",
          fileName: "licence_marie_diallo.pdf",
          fileUrl: "/documents/licence_diploma.pdf",
          fileSize: 1850000,
          uploadedAt: "2023-11-30T09:20:00Z",
          status: "uploaded"
        }
      ],
      status: "approved",
      applicationDate: "2023-11-30T09:25:00Z",
      inscriptionFeeStatus: "paid",
      inscriptionFeeAmount: 200000,
      paymentMethod: "bank_transfer",
      paymentReference: "BT987654321",
      notes: "Candidature approuvée le 10/12/2023",
      emailsSent: ["2023-12-10T14:35:00Z"],
      createdAt: "2023-11-30T09:25:00Z",
      updatedAt: "2023-12-10T14:35:00Z"
    },
    {
      id: "app-3",
      programId: "prog-1",
      applicantName: "François Mensah",
      applicantEmail: "francois.mensah@example.com",
      applicantPhone: "+229 96 12 34 56",
      dateOfBirth: "1999-03-10",
      nationality: "Béninoise",
      gender: "M",
      city: "Cotonou",
      address: "Quartier Cadjèhoun, Rue 404",
      country: "Bénin",
      previousInstitution: "Lycée Coulibaly",
      previousDegree: "Baccalauréat série D",
      graduationYear: "2023",
      documents: [
        {
          id: "doc-3-1",
          documentTypeId: "bac_certificate",
          documentTypeName: "Diplôme du Baccalauréat",
          fileName: "bac_francois_mensah.pdf",
          fileUrl: "/documents/bac_diploma.pdf",
          fileSize: 1950000,
          uploadedAt: "2023-12-05T11:15:00Z",
          status: "uploaded"
        }
      ],
      status: "rejected",
      applicationDate: "2023-12-05T11:30:00Z",
      inscriptionFeeStatus: "pending",
      inscriptionFeeAmount: 150000,
      paymentMethod: "mobile_money",
      paymentReference: "MM567890123",
      notes: "Dossier incomplet - Documents manquants",
      emailsSent: ["2023-12-12T16:45:00Z"],
      createdAt: "2023-12-05T11:30:00Z",
      updatedAt: "2023-12-12T16:45:00Z"
    }
  ];

  // Données factices pour les programmes
  const mockPrograms: UniversityProgram[] = [
    {
      id: "prog-1",
      name: "Licence en Informatique",
      title: "Licence en Informatique",
      description: "Formation en développement logiciel et systèmes d'information",
      longDescription: "Programme complet couvrant les aspects fondamentaux et avancés de l'informatique",
      duration: "3 ans",
      degree: "Licence",
      level: "Licence",
      department: "Informatique",
      capacity: 50,
      currentApplications: 25,
      applicationDeadline: "2024-07-15",
      startDate: "2024-09-01",
      tuitionFee: 850000,
      inscriptionFee: 150000,
      currency: "FCFA",
      requirements: ["Baccalauréat série C, D ou F", "Moyenne générale ≥ 12/20"],
      objectives: ["Maîtriser les langages de programmation", "Concevoir des applications"],
      careerOutlooks: ["Développeur web", "Analyste programmeur"],
      documentTypes: [],
      isActive: true,
      isVisible: true,
      allowOnlineApplication: true,
      requiresDocuments: true,
      createdAt: "2024-01-15",
      updatedAt: "2024-05-20"
    },
    {
      id: "prog-2",
      name: "Master en Data Science",
      title: "Master en Data Science",
      description: "Formation avancée en analyse de données et intelligence artificielle",
      longDescription: "Programme spécialisé dans l'analyse de données massives et l'IA",
      duration: "2 ans",
      degree: "Master",
      level: "Master",
      department: "Informatique",
      capacity: 30,
      currentApplications: 15,
      applicationDeadline: "2024-07-20",
      startDate: "2024-09-15",
      tuitionFee: 1200000,
      inscriptionFee: 200000,
      currency: "FCFA",
      requirements: ["Licence en Informatique ou équivalent", "Moyenne générale ≥ 14/20"],
      objectives: ["Maîtriser les techniques d'analyse de données", "Développer des modèles d'IA"],
      careerOutlooks: ["Data Scientist", "Analyste de données"],
      documentTypes: [],
      isActive: true,
      isVisible: true,
      allowOnlineApplication: true,
      requiresDocuments: true,
      createdAt: "2024-01-20",
      updatedAt: "2024-05-25"
    }
  ];

  // Effet pour charger les données initiales
  useEffect(() => {
    // Dans une application réelle, ces données viendraient d'une API
    setApplications(mockApplications);
    setPrograms(mockPrograms);
  }, []);

  // Filtrer les applications selon l'onglet actif
  const filteredApplications = applications.filter(app => {
    if (activeTab === "all") return true;
    return app.status === activeTab;
  });

  // Obtenir le nom du programme pour une application donnée
  const getProgramName = (programId: string) => {
    const program = programs.find(p => p.id === programId);
    return program ? program.name : "Programme inconnu";
  };

  // Formatage de la date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Fonction pour approuver une candidature
  const approveApplication = async (application: UniversityApplication) => {
    if (!application) return;

    try {
      setIsSubmitting(true);

      // Dans une application réelle, ceci serait un appel API
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mise à jour de l'état local
      const updatedApplications = applications.map(app => 
        app.id === application.id 
          ? { ...app, status: 'approved' as const, updatedAt: new Date().toISOString() }
          : app
      );
      
      setApplications(updatedApplications);
      toast({
        title: "Candidature approuvée",
        description: `La candidature de ${application.applicantName} a été approuvée avec succès.`,
      });

      // Suggérer d'envoyer un email
      setSelectedApplication({ ...application, status: 'approved' as const });
      setShowEmailModal(true);

    } catch (error) {
      console.error("Erreur lors de l'approbation:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'approbation de la candidature.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fonction pour rejeter une candidature
  const rejectApplication = async (application: UniversityApplication) => {
    if (!application) return;

    try {
      setIsSubmitting(true);

      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mise à jour de l'état local
      const updatedApplications = applications.map(app => 
        app.id === application.id 
          ? { ...app, status: 'rejected' as const, updatedAt: new Date().toISOString() }
          : app
      );
      
      setApplications(updatedApplications);
      toast({
        title: "Candidature rejetée",
        description: `La candidature de ${application.applicantName} a été rejetée.`,
      });

      // Suggérer d'envoyer un email
      setSelectedApplication({ ...application, status: 'rejected' as const });
      setShowEmailModal(true);

    } catch (error) {
      console.error("Erreur lors du rejet:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du rejet de la candidature.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fonction pour envoyer un email
  const sendEmail = async (emailContent: string) => {
    if (!selectedApplication) return;

    try {
      setIsSubmitting(true);

      // Simulation d'un appel API pour envoyer l'email
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mise à jour de l'état local pour marquer l'email comme envoyé
      const now = new Date().toISOString();
      const updatedApplications = applications.map(app => 
        app.id === selectedApplication.id 
          ? { 
              ...app, 
              emailsSent: [...(app.emailsSent || []), now],
              updatedAt: now
            }
          : app
      );
      
      setApplications(updatedApplications);
      setShowEmailModal(false);
      
      toast({
        title: "Email envoyé",
        description: `L'email a été envoyé à ${selectedApplication.applicantEmail}.`,
      });

    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de l'email.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fonction pour supprimer une candidature
  const deleteApplication = async () => {
    if (!selectedApplication) return;

    try {
      setIsSubmitting(true);

      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mise à jour de l'état local
      const updatedApplications = applications.filter(app => app.id !== selectedApplication.id);
      setApplications(updatedApplications);
      
      toast({
        title: "Candidature supprimée",
        description: `La candidature de ${selectedApplication.applicantName} a été supprimée.`,
      });

      setShowDeleteModal(false);
      setSelectedApplication(null);

    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression de la candidature.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Configuration des colonnes pour le tableau des candidatures
  const applicationColumns = [
    {
      key: "name",
      header: "Candidat",
      renderCell: (app: UniversityApplication) => (
        <div className="flex flex-col">
          <span className="font-semibold">{app.applicantName}</span>
          <span className="text-xs text-muted-foreground">{app.applicantEmail}</span>
        </div>
      )
    },
    {
      key: "program",
      header: "Programme",
      renderCell: (app: UniversityApplication) => (
        <div className="flex items-center">
          <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>{getProgramName(app.programId)}</span>
        </div>
      )
    },
    {
      key: "date",
      header: "Date",
      renderCell: (app: UniversityApplication) => formatDate(app.applicationDate)
    },
    {
      key: "status",
      header: "Statut",
      renderCell: (app: UniversityApplication) => {
        let badgeClass = "";
        let statusText = "";
        
        switch(app.status) {
          case "pending":
            badgeClass = "bg-yellow-100 text-yellow-800";
            statusText = "En attente";
            break;
          case "approved":
            badgeClass = "bg-green-100 text-green-800";
            statusText = "Approuvée";
            break;
          case "rejected":
            badgeClass = "bg-red-100 text-red-800";
            statusText = "Rejetée";
            break;
          default:
            badgeClass = "bg-gray-100 text-gray-800";
            statusText = app.status;
        }
        
        return <Badge className={badgeClass}>{statusText}</Badge>;
      }
    },
    {
      key: "documents",
      header: "Documents",
      renderCell: (app: UniversityApplication) => (
        <div className="flex items-center">
          <span>{app.documents.length}</span>
          <Button 
            variant="ghost" 
            size="icon"
            className="ml-2"
            onClick={() => {
              setSelectedApplication(app);
              setShowDetailsModal(true);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      )
    },
    {
      key: "actions",
      header: "Actions",
      renderCell: (app: UniversityApplication) => (
        <div className="flex items-center space-x-2">
          {app.status === 'pending' && (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-green-600 hover:text-green-800 hover:bg-green-100"
                onClick={() => approveApplication(app)}
                disabled={isSubmitting}
              >
                <CheckCircle className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-red-600 hover:text-red-800 hover:bg-red-100"
                onClick={() => rejectApplication(app)}
                disabled={isSubmitting}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </>
          )}
          <Button 
            variant="ghost" 
            size="icon"
            className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
            onClick={() => {
              setSelectedApplication(app);
              setShowEmailModal(true);
            }}
            disabled={isSubmitting}
          >
            <Mail className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-red-600 hover:text-red-800 hover:bg-red-100"
            onClick={() => {
              setSelectedApplication(app);
              setShowDeleteModal(true);
            }}
            disabled={isSubmitting}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Candidatures Universitaires</h1>
          <p className="text-muted-foreground">
            Gestion des candidatures aux programmes universitaires
          </p>
        </div>
      </div>

      <Card>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <CardHeader className="pb-3">
            <TabsList>
              <TabsTrigger value="all">
                Toutes
                <Badge className="ml-2 bg-gray-100 text-gray-800">{applications.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="pending">
                En attente
                <Badge className="ml-2 bg-yellow-100 text-yellow-800">
                  {applications.filter(app => app.status === 'pending').length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="approved">
                Approuvées
                <Badge className="ml-2 bg-green-100 text-green-800">
                  {applications.filter(app => app.status === 'approved').length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejetées
                <Badge className="ml-2 bg-red-100 text-red-800">
                  {applications.filter(app => app.status === 'rejected').length}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent>
            <TabsContent value="all">
              <DataTable 
                columns={applicationColumns} 
                data={filteredApplications}
                keyField="id" 
                searchPlaceholder="Rechercher une candidature..." 
              />
            </TabsContent>
            
            <TabsContent value="pending">
              <DataTable 
                columns={applicationColumns} 
                data={filteredApplications}
                keyField="id" 
                searchPlaceholder="Rechercher une candidature en attente..." 
              />
            </TabsContent>
            
            <TabsContent value="approved">
              <DataTable 
                columns={applicationColumns} 
                data={filteredApplications}
                keyField="id" 
                searchPlaceholder="Rechercher une candidature approuvée..." 
              />
            </TabsContent>
            
            <TabsContent value="rejected">
              <DataTable 
                columns={applicationColumns} 
                data={filteredApplications}
                keyField="id" 
                searchPlaceholder="Rechercher une candidature rejetée..." 
              />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>

      {/* Modal de détails de la candidature */}
      {selectedApplication && showDetailsModal && (
        <Dialog open={showDetailsModal} onOpenChange={() => setShowDetailsModal(false)}>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Détails de la candidature</DialogTitle>
              <DialogDescription>
                Candidature soumise le {formatDate(selectedApplication.applicationDate)}
              </DialogDescription>
            </DialogHeader>
            
            <div className="overflow-y-auto max-h-[60vh]">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Informations personnelles
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="font-medium">Nom</p>
                          <p>{selectedApplication.applicantName}</p>
                        </div>
                        <div>
                          <p className="font-medium">Email</p>
                          <p>{selectedApplication.applicantEmail}</p>
                        </div>
                        <div>
                          <p className="font-medium">Téléphone</p>
                          <p className="flex items-center">
                            <Phone className="mr-1 h-3 w-3" />
                            {selectedApplication.applicantPhone}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">Date de naissance</p>
                          <p>{formatDate(selectedApplication.dateOfBirth || '')}</p>
                        </div>
                        <div>
                          <p className="font-medium">Nationalité</p>
                          <p>{selectedApplication.nationality}</p>
                        </div>
                        <div>
                          <p className="font-medium">Genre</p>
                          <p>{selectedApplication.gender === 'M' ? 'Masculin' : 'Féminin'}</p>
                        </div>
                        <div>
                          <p className="font-medium">Ville</p>
                          <p className="flex items-center">
                            <MapPin className="mr-1 h-3 w-3" />
                            {selectedApplication.city}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">Pays</p>
                          <p>{selectedApplication.country}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Informations académiques
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div>
                        <p className="font-medium">Programme</p>
                        <p>{getProgramName(selectedApplication.programId)}</p>
                      </div>
                      <div>
                        <p className="font-medium">Institution précédente</p>
                        <p>{selectedApplication.previousInstitution}</p>
                      </div>
                      <div>
                        <p className="font-medium">Diplôme précédent</p>
                        <p>{selectedApplication.previousDegree}</p>
                      </div>
                      <div>
                        <p className="font-medium">Année d'obtention</p>
                        <p className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {selectedApplication.graduationYear}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      Documents soumis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedApplication.documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-2 border rounded-md">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-blue-600" />
                            <span>{doc.documentTypeName}</span>
                          </div>
                          <Button 
                            variant="outline"
                            size="sm"
                            onClick={() => setViewDocument({
                              name: doc.documentTypeName,
                              url: doc.fileUrl,
                              type: doc.fileName.split('.').pop() || 'pdf'
                            })}
                          >
                            Voir
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Informations de paiement
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium">Montant des frais d'inscription</p>
                        <p className="text-green-600 font-medium">
                          {selectedApplication.inscriptionFeeAmount.toLocaleString()} FCFA
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Statut du paiement</p>
                        <Badge 
                          className={
                            selectedApplication.inscriptionFeeStatus === 'paid' 
                              ? 'bg-green-100 text-green-800' 
                              : selectedApplication.inscriptionFeeStatus === 'waived'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                          }
                        >
                          {selectedApplication.inscriptionFeeStatus === 'paid' 
                            ? 'Payé' 
                            : selectedApplication.inscriptionFeeStatus === 'waived'
                              ? 'Exonéré'
                              : 'En attente'
                          }
                        </Badge>
                      </div>
                      <div>
                        <p className="font-medium">Méthode de paiement</p>
                        <p>
                          {selectedApplication.paymentMethod === 'mobile_money' 
                            ? 'Mobile Money' 
                            : selectedApplication.paymentMethod === 'bank_transfer'
                              ? 'Virement bancaire'
                              : selectedApplication.paymentMethod === 'card'
                                ? 'Carte bancaire'
                                : selectedApplication.paymentMethod === 'cash'
                                  ? 'Espèces'
                                  : 'Paiement hors ligne'
                          }
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Référence du paiement</p>
                        <p>{selectedApplication.paymentReference || 'Non disponible'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      Historique
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="notes">
                        <AccordionTrigger className="text-sm">Notes</AccordionTrigger>
                        <AccordionContent>
                          <Textarea 
                            value={selectedApplication.notes || 'Aucune note disponible'}
                            className="min-h-[100px]"
                            readOnly
                          />
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="emails">
                        <AccordionTrigger className="text-sm">Emails envoyés ({selectedApplication.emailsSent.length})</AccordionTrigger>
                        <AccordionContent>
                          {selectedApplication.emailsSent.length > 0 ? (
                            <div className="space-y-2">
                              {selectedApplication.emailsSent.map((date, index) => (
                                <div key={index} className="p-2 border rounded-md">
                                  <p className="text-sm">Email envoyé le {formatDate(date)}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">Aucun email envoyé</p>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
                
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowDetailsModal(false)}
                  >
                    Fermer
                  </Button>

                  <div className="space-x-2">
                    {selectedApplication.status === 'pending' && (
                      <>
                        <Button 
                          variant="destructive" 
                          onClick={() => rejectApplication(selectedApplication)}
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Rejeter
                        </Button>
                        <Button 
                          onClick={() => approveApplication(selectedApplication)}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approuver
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Modal d'envoi d'email */}
      {selectedApplication && showEmailModal && (
        <Dialog open={showEmailModal} onOpenChange={() => setShowEmailModal(false)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Envoyer un email</DialogTitle>
              <DialogDescription>
                Envoyer un email à {selectedApplication.applicantName}
              </DialogDescription>
            </DialogHeader>
            
            <EmailForm 
              application={selectedApplication}
              onSend={sendEmail}
              onCancel={() => setShowEmailModal(false)}
              isSubmitting={isSubmitting}
            />
          </DialogContent>
        </Dialog>
      )}
      
      {/* Modal de confirmation de suppression */}
      <DeleteConfirmDialog 
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={deleteApplication}
        title="Supprimer cette candidature ?"
        description="Cette action est irréversible et supprimera définitivement cette candidature et tous les documents associés."
      />

      {/* Visualiseur de document */}
      {viewDocument && (
        <DocumentViewer 
          document={viewDocument} 
          onClose={() => setViewDocument(null)} 
        />
      )}
    </div>
  );
};

export default AdminUniversityApplicationsPage;
