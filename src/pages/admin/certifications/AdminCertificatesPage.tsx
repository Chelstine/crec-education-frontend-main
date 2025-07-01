import React, { useState, useEffect } from 'react';
import { DataTable, DeleteConfirmDialog } from '@/components/admin';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PencilIcon, TrashIcon, Plus, Award, Download, Users, User, Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// Types pour les badges et certificats
interface Certificate {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  criteria: string;
  type: 'badge' | 'certificate';
  status: 'active' | 'draft' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

interface CertificateIssuance {
  id: string;
  certificateId: string;
  certificateName: string;
  certificateType: 'badge' | 'certificate';
  userId: string;
  userName: string;
  userEmail: string;
  issuedAt: string;
  expiresAt?: string;
  status: 'valid' | 'expired' | 'revoked';
}

const AdminCertificatesPage: React.FC = () => {
  // États pour les onglets
  const [activeTab, setActiveTab] = useState<'certificates' | 'issuances'>('certificates');
  
  // États pour l'UI
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  // États pour les données
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [issuances, setIssuances] = useState<CertificateIssuance[]>([]);
  const [totalCertificates, setTotalCertificates] = useState(0);
  const [totalIssuances, setTotalIssuances] = useState(0);
  
  // États pour les boîtes de dialogue
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showIssueDialog, setShowIssueDialog] = useState(false);
  
  // États pour les éléments sélectionnés
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [selectedIssuance, setSelectedIssuance] = useState<CertificateIssuance | null>(null);
  
  // État pour le formulaire
  const [formData, setFormData] = useState<Partial<Certificate>>({
    name: '',
    description: '',
    imageUrl: '',
    criteria: '',
    type: 'certificate',
    status: 'draft'
  });
  
  // État pour le formulaire d'émission
  const [issueFormData, setIssueFormData] = useState({
    certificateId: '',
    userId: '',
    userName: '',
    userEmail: '',
    expiresAt: ''
  });
  
  // Toast pour les notifications
  const { toast } = useToast();

  // Mock data
  const mockCertificates: Certificate[] = [
    {
      id: "cert-001",
      name: "Certificat en Anglais des Affaires",
      description: "Certification attestant de la maîtrise de l'anglais dans un contexte professionnel",
      imageUrl: "/img/certificates/business-english.png",
      criteria: "Compléter au moins 60 heures de formation et réussir l'examen final avec un score minimum de 70%",
      type: "certificate",
      status: "active",
      createdAt: "2023-01-15T08:30:00.000Z",
      updatedAt: "2023-01-15T08:30:00.000Z"
    },
    {
      id: "cert-002",
      name: "Badge d'Excellence en Programmation Python",
      description: "Badge décerné aux étudiants ayant démontré une excellente maîtrise de Python",
      imageUrl: "/img/certificates/python-excellence.png",
      criteria: "Développer un projet complet en Python et obtenir un score minimum de 85% à l'évaluation finale",
      type: "badge",
      status: "active",
      createdAt: "2023-02-20T10:45:00.000Z",
      updatedAt: "2023-02-20T10:45:00.000Z"
    },
    {
      id: "cert-003",
      name: "Certificat de Spiritualité Ignatienne",
      description: "Certificat attestant de l'étude approfondie de la spiritualité ignatienne",
      imageUrl: "/img/certificates/ignatian-spirituality.png",
      criteria: "Compléter le cours complet et rédiger un essai de réflexion de 2000 mots",
      type: "certificate",
      status: "draft",
      createdAt: "2023-04-10T14:15:00.000Z",
      updatedAt: "2023-04-10T14:15:00.000Z"
    },
    {
      id: "cert-004",
      name: "Badge de Leadership",
      description: "Badge reconnaissant les compétences en leadership et gestion d'équipe",
      imageUrl: "/img/certificates/leadership.png",
      criteria: "Compléter 40 heures de formation en leadership et mener un projet d'équipe réussi",
      type: "badge",
      status: "active",
      createdAt: "2023-03-05T09:20:00.000Z",
      updatedAt: "2023-05-12T11:30:00.000Z"
    }
  ];

  const mockIssuances: CertificateIssuance[] = [
    {
      id: "iss-001",
      certificateId: "cert-001",
      certificateName: "Certificat en Anglais des Affaires",
      certificateType: "certificate",
      userId: "user-123",
      userName: "Jean Dupont",
      userEmail: "jean.dupont@example.com",
      issuedAt: "2023-06-10T15:30:00.000Z",
      expiresAt: "2025-06-10T15:30:00.000Z",
      status: "valid"
    },
    {
      id: "iss-002",
      certificateId: "cert-002",
      certificateName: "Badge d'Excellence en Programmation Python",
      certificateType: "badge",
      userId: "user-456",
      userName: "Marie Martin",
      userEmail: "marie.martin@example.com",
      issuedAt: "2023-05-22T11:15:00.000Z",
      status: "valid"
    },
    {
      id: "iss-003",
      certificateId: "cert-004",
      certificateName: "Badge de Leadership",
      certificateType: "badge",
      userId: "user-789",
      userName: "Paul Leclerc",
      userEmail: "paul.leclerc@example.com",
      issuedAt: "2023-04-18T09:45:00.000Z",
      expiresAt: "2024-04-18T09:45:00.000Z",
      status: "valid"
    },
    {
      id: "iss-004",
      certificateId: "cert-001",
      certificateName: "Certificat en Anglais des Affaires",
      certificateType: "certificate",
      userId: "user-012",
      userName: "Sophie Dubois",
      userEmail: "sophie.dubois@example.com",
      issuedAt: "2022-11-30T14:20:00.000Z",
      expiresAt: "2023-11-30T14:20:00.000Z",
      status: "expired"
    }
  ];

  // Colonnes pour la table des certificats
  const certificateColumns = [
    {
      key: "name",
      header: "Nom du certificat",
      renderCell: (certificate: Certificate) => (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            {certificate.type === 'certificate' ? (
              <Award className="h-4 w-4 text-amber-500" />
            ) : (
              <Badge className="h-4 w-4 text-indigo-500" />
            )}
            <span className="font-medium">{certificate.name}</span>
          </div>
          <span className="text-xs text-slate-500 mt-1 line-clamp-2">{certificate.description}</span>
        </div>
      )
    },
    {
      key: "type",
      header: "Type",
      renderCell: (certificate: Certificate) => (
        <Badge className={certificate.type === 'certificate' ? 'bg-amber-100 text-amber-800' : 'bg-indigo-100 text-indigo-800'}>
          {certificate.type === 'certificate' ? 'Certificat' : 'Badge'}
        </Badge>
      )
    },
    {
      key: "status",
      header: "Statut",
      renderCell: (certificate: Certificate) => {
        const statusConfig = {
          active: { color: 'bg-green-100 text-green-800', label: 'Actif' },
          draft: { color: 'bg-amber-100 text-amber-800', label: 'Brouillon' },
          inactive: { color: 'bg-slate-100 text-slate-800', label: 'Inactif' },
        };

        const { color, label } = statusConfig[certificate.status];

        return (
          <Badge className={color}>{label}</Badge>
        );
      }
    },
    {
      key: "actions",
      header: "Actions",
      renderCell: (certificate: Certificate) => (
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => handleEditCertificate(certificate)}
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => handleIssueCertificate(certificate)}
          >
            <Users className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => handleDeleteCertificate(certificate)}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  // Colonnes pour la table des émissions de certificat
  const issuanceColumns = [
    {
      key: "user",
      header: "Bénéficiaire",
      renderCell: (issuance: CertificateIssuance) => (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-slate-400" />
            <span className="font-medium">{issuance.userName}</span>
          </div>
          <span className="text-xs text-slate-500 mt-1">{issuance.userEmail}</span>
        </div>
      )
    },
    {
      key: "certificate",
      header: "Certificat",
      renderCell: (issuance: CertificateIssuance) => (
        <div className="flex items-center gap-2">
          {issuance.certificateType === 'certificate' ? (
            <Award className="h-4 w-4 text-amber-500" />
          ) : (
            <Badge className="h-4 w-4 text-indigo-500" />
          )}
          <span>{issuance.certificateName}</span>
        </div>
      )
    },
    {
      key: "dates",
      header: "Dates",
      renderCell: (issuance: CertificateIssuance) => {
        const issuedDate = new Date(issuance.issuedAt);
        const expiresDate = issuance.expiresAt ? new Date(issuance.expiresAt) : null;
        
        return (
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-xs text-slate-500">Émis le:</span>
              <span>{format(issuedDate, 'dd/MM/yyyy', { locale: fr })}</span>
            </div>
            {expiresDate && (
              <div className="flex items-center gap-1">
                <span className="text-xs text-slate-500">Expire le:</span>
                <span>{format(expiresDate, 'dd/MM/yyyy', { locale: fr })}</span>
              </div>
            )}
          </div>
        );
      }
    },
    {
      key: "status",
      header: "Statut",
      renderCell: (issuance: CertificateIssuance) => {
        const statusConfig = {
          valid: { color: 'bg-green-100 text-green-800', label: 'Valide' },
          expired: { color: 'bg-amber-100 text-amber-800', label: 'Expiré' },
          revoked: { color: 'bg-red-100 text-red-800', label: 'Révoqué' },
        };

        const { color, label } = statusConfig[issuance.status];

        return (
          <Badge className={color}>{label}</Badge>
        );
      }
    },
    {
      key: "actions",
      header: "Actions",
      renderCell: (issuance: CertificateIssuance) => (
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => handleDownloadCertificate(issuance)}
          >
            <Download className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => handleDeleteIssuance(issuance)}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  // Gestion des certificats
  const handleEditCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setFormData({ ...certificate });
    setShowEditDialog(true);
  };

  const handleIssueCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIssueFormData({
      certificateId: certificate.id,
      userId: '',
      userName: '',
      userEmail: '',
      expiresAt: ''
    });
    setShowIssueDialog(true);
  };

  const handleDeleteCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setShowDeleteDialog(true);
  };

  // Gestion des émissions
  const handleDownloadCertificate = (issuance: CertificateIssuance) => {
    // Logic to download or view certificate
    toast({
      title: "Téléchargement du certificat",
      description: `Le certificat de ${issuance.userName} est en cours de téléchargement.`,
    });
  };

  const handleDeleteIssuance = (issuance: CertificateIssuance) => {
    setSelectedIssuance(issuance);
    setShowDeleteDialog(true);
  };

  // Soumission du formulaire d'ajout/modification de certificat
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (showAddDialog) {
      // Logique d'ajout
      const newCertificate: Certificate = {
        id: `cert-${Date.now().toString().slice(-6)}`,
        name: formData.name || "",
        description: formData.description || "",
        imageUrl: formData.imageUrl || "/img/certificates/default.png",
        criteria: formData.criteria || "",
        type: formData.type as 'badge' | 'certificate',
        status: formData.status as 'active' | 'draft' | 'inactive',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setCertificates([...certificates, newCertificate]);
      toast({
        title: "Certificat créé",
        description: "Le nouveau certificat a été créé avec succès.",
      });
    } else {
      // Logique de modification
      if (selectedCertificate) {
        const updatedCertificates = certificates.map(cert => {
          if (cert.id === selectedCertificate.id) {
            return {
              ...cert,
              name: formData.name || cert.name,
              description: formData.description || cert.description,
              imageUrl: formData.imageUrl || cert.imageUrl,
              criteria: formData.criteria || cert.criteria,
              type: formData.type as 'badge' | 'certificate',
              status: formData.status as 'active' | 'draft' | 'inactive',
              updatedAt: new Date().toISOString()
            };
          }
          return cert;
        });
        
        setCertificates(updatedCertificates);
        toast({
          title: "Certificat mis à jour",
          description: "Le certificat a été mis à jour avec succès.",
        });
      }
    }
    
    // Réinitialisation des états
    setShowAddDialog(false);
    setShowEditDialog(false);
    setSelectedCertificate(null);
    setFormData({
      name: '',
      description: '',
      imageUrl: '',
      criteria: '',
      type: 'certificate',
      status: 'draft'
    });
  };

  // Soumission du formulaire d'émission de certificat
  const handleIssueFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedCertificate) {
      const newIssuance: CertificateIssuance = {
        id: `iss-${Date.now().toString().slice(-6)}`,
        certificateId: selectedCertificate.id,
        certificateName: selectedCertificate.name,
        certificateType: selectedCertificate.type,
        userId: issueFormData.userId || `user-${Date.now().toString().slice(-6)}`,
        userName: issueFormData.userName,
        userEmail: issueFormData.userEmail,
        issuedAt: new Date().toISOString(),
        expiresAt: issueFormData.expiresAt ? new Date(issueFormData.expiresAt).toISOString() : undefined,
        status: 'valid'
      };
      
      setIssuances([...issuances, newIssuance]);
      toast({
        title: "Certificat émis",
        description: `Le certificat a été émis à ${newIssuance.userName} avec succès.`,
      });
      
      // Réinitialisation des états
      setShowIssueDialog(false);
      setSelectedCertificate(null);
      setIssueFormData({
        certificateId: '',
        userId: '',
        userName: '',
        userEmail: '',
        expiresAt: ''
      });
    }
  };

  // Confirmation de suppression
  const handleConfirmDelete = async () => {
    try {
      if (activeTab === 'certificates' && selectedCertificate) {
        setCertificates(certificates.filter(cert => cert.id !== selectedCertificate.id));
        toast({
          title: "Certificat supprimé",
          description: "Le certificat a été supprimé avec succès.",
        });
      } else if (activeTab === 'issuances' && selectedIssuance) {
        setIssuances(issuances.filter(iss => iss.id !== selectedIssuance.id));
        toast({
          title: "Émission supprimée",
          description: "L'émission du certificat a été supprimée avec succès.",
        });
      }
      
      setShowDeleteDialog(false);
      setSelectedCertificate(null);
      setSelectedIssuance(null);
      
      return Promise.resolve();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression.",
        variant: "destructive",
      });
      return Promise.reject(error);
    }
  };

  // Chargement des données
  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      if (activeTab === 'certificates') {
        let filteredCertificates = [...mockCertificates];
        
        // Filtrage par recherche
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filteredCertificates = filteredCertificates.filter(cert =>
            cert.name.toLowerCase().includes(query) ||
            cert.description.toLowerCase().includes(query)
          );
        }
        
        setCertificates(filteredCertificates);
        setTotalCertificates(filteredCertificates.length);
      } else {
        let filteredIssuances = [...mockIssuances];
        
        // Filtrage par recherche
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filteredIssuances = filteredIssuances.filter(iss =>
            iss.userName.toLowerCase().includes(query) ||
            iss.userEmail.toLowerCase().includes(query) ||
            iss.certificateName.toLowerCase().includes(query)
          );
        }
        
        setIssuances(filteredIssuances);
        setTotalIssuances(filteredIssuances.length);
      }
      
      setIsLoading(false);
    }, 500);
  }, [activeTab, searchQuery]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Badges et Certificats</h1>
        <p className="text-muted-foreground">
          Gérez les badges et certificats du CREC et leur attribution
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
        <div className="flex items-center space-x-4">
          <Button
            variant={activeTab === 'certificates' ? "default" : "outline"}
            onClick={() => setActiveTab('certificates')}
            className="flex items-center gap-2"
          >
            <Award className="h-4 w-4" />
            Certificats et Badges
          </Button>
          <Button
            variant={activeTab === 'issuances' ? "default" : "outline"}
            onClick={() => setActiveTab('issuances')}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Émissions
          </Button>
        </div>
        
        {activeTab === 'certificates' && (
          <Button onClick={() => setShowAddDialog(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nouveau Certificat
          </Button>
        )}
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>
            {activeTab === 'certificates' ? `Certificats et Badges (${totalCertificates})` : `Émissions (${totalIssuances})`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeTab === 'certificates' ? (
            <DataTable
              columns={certificateColumns}
              data={certificates}
              keyField="id"
              searchPlaceholder="Rechercher un certificat ou badge..."
              isLoading={isLoading}
            />
          ) : (
            <DataTable
              columns={issuanceColumns}
              data={issuances}
              keyField="id"
              searchPlaceholder="Rechercher une émission de certificat..."
              isLoading={isLoading}
            />
          )}
        </CardContent>
      </Card>
      
      {/* Dialog de confirmation de suppression */}
      <DeleteConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        title={
          activeTab === 'certificates' 
            ? "Supprimer ce certificat ?" 
            : "Supprimer cette émission ?"
        }
        description={
          activeTab === 'certificates' && selectedCertificate
            ? `Êtes-vous sûr de vouloir supprimer "${selectedCertificate.name}" ? Cette action est définitive.`
            : selectedIssuance 
            ? `Êtes-vous sûr de vouloir supprimer ce certificat émis à "${selectedIssuance.userName}" ? Cette action est définitive.`
            : "Cette action est définitive et ne peut pas être annulée."
        }
      />
      
      {/* Dialog d'ajout/modification de certificat */}
      <Dialog open={showAddDialog || showEditDialog} onOpenChange={(open) => {
        if (!open) {
          setShowAddDialog(false);
          setShowEditDialog(false);
        }
      }}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {showAddDialog ? "Créer un nouveau certificat" : "Modifier le certificat"}
            </DialogTitle>
            <DialogDescription>
              {showAddDialog 
                ? "Remplissez ce formulaire pour créer un nouveau certificat ou badge." 
                : "Modifiez les détails du certificat ou badge existant."}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nom du certificat</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Certificat d'Excellence en Python"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Décrivez ce que ce certificat représente"
                rows={3}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Type</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => setFormData({ ...formData, type: value as 'badge' | 'certificate' })}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Sélectionnez le type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="certificate">Certificat</SelectItem>
                    <SelectItem value="badge">Badge</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="status">Statut</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => setFormData({ ...formData, status: value as 'active' | 'draft' | 'inactive' })}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Sélectionnez le statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="draft">Brouillon</SelectItem>
                    <SelectItem value="inactive">Inactif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="imageUrl">URL de l'image</Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="URL de l'image du certificat ou badge"
              />
            </div>
            
            <div>
              <Label htmlFor="criteria">Critères d'obtention</Label>
              <Textarea
                id="criteria"
                value={formData.criteria}
                onChange={(e) => setFormData({ ...formData, criteria: e.target.value })}
                placeholder="Détaillez les critères nécessaires pour obtenir ce certificat"
                rows={3}
              />
            </div>
            
            <DialogFooter>
              <Button type="submit">
                {showAddDialog ? "Créer" : "Enregistrer les modifications"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Dialog d'émission de certificat */}
      <Dialog open={showIssueDialog} onOpenChange={(open) => {
        if (!open) setShowIssueDialog(false);
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              Émettre un certificat
            </DialogTitle>
            <DialogDescription>
              {selectedCertificate && (
                <>Émettez le certificat "{selectedCertificate.name}" à un utilisateur.</>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleIssueFormSubmit} className="space-y-4">
            <div>
              <Label htmlFor="userName">Nom complet</Label>
              <Input
                id="userName"
                value={issueFormData.userName}
                onChange={(e) => setIssueFormData({ ...issueFormData, userName: e.target.value })}
                placeholder="Ex: Jean Dupont"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="userEmail">Email</Label>
              <Input
                id="userEmail"
                type="email"
                value={issueFormData.userEmail}
                onChange={(e) => setIssueFormData({ ...issueFormData, userEmail: e.target.value })}
                placeholder="Ex: jean.dupont@example.com"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="expiresAt">Date d'expiration (optionnel)</Label>
              <Input
                id="expiresAt"
                type="date"
                value={issueFormData.expiresAt}
                onChange={(e) => setIssueFormData({ ...issueFormData, expiresAt: e.target.value })}
              />
            </div>
            
            <DialogFooter>
              <Button type="submit">
                Émettre le certificat
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCertificatesPage;
