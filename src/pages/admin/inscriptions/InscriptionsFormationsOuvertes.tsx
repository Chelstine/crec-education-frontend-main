import React, { useState, useEffect } from 'react';
import { AdminPageLayout, AdminTable, AdminForm, AdminFilters } from '../../../components/admin';
import { useFilteredData } from '../../../hooks/useAdmin';
import { 
  getBadgeColor, 
  exportToCSV, 
  formatDate,
  formatDateTime 
} from '../../../utils/adminUtils';
import { 
  UserCheck,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  BookOpen
} from 'lucide-react';

// Types pour les inscriptions formations ouvertes
interface InscriptionFormationOuverte {
  id: string;
  
  // Informations de l'apprenant
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'M' | 'F';
  nationality: string;
  address: string;
  city: string;
  
  // Formation
  formationId: string;
  formationTitle: string;
  formationPrice: number;
  
  // Professionnel
  currentJob?: string;
  company?: string;
  workExperience: number; // en années
  motivation: string;
  expectations: string;
  
  // Éducation
  educationLevel: 'bac' | 'bac+2' | 'bac+3' | 'bac+5' | 'plus';
  previousTrainings: string[];
  
  // Inscription
  registrationDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  paymentStatus: 'pending' | 'partial' | 'completed' | 'refunded';
  amountPaid: number;
  
  // Suivi administratif
  processedBy?: string;
  processedDate?: string;
  rejectionReason?: string;
  notes?: string;
  
  // Documents
  documents: {
    id: string;
    name: string;
    type: 'cv' | 'diploma' | 'motivation_letter' | 'id_card' | 'photo' | 'other';
    url: string;
    uploadDate: string;
    verified: boolean;
  }[];
  
  createdAt: string;
  updatedAt: string;
}

const InscriptionsFormationsOuvertes: React.FC = () => {
  const [inscriptions, setInscriptions] = useState<InscriptionFormationOuverte[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedInscription, setSelectedInscription] = useState<InscriptionFormationOuverte | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    clearFilters,
    filteredData
  } = useFilteredData(
    inscriptions.filter(inscription => 
      activeTab === 'all' || inscription.status === activeTab
    ), 
    ['firstName', 'lastName', 'email', 'formationTitle']
  );

  // Mock data pour les inscriptions
  const mockInscriptions: InscriptionFormationOuverte[] = [
    {
      id: '1',
      firstName: 'Adjoa',
      lastName: 'MENSAH',
      email: 'adjoa.mensah@gmail.com',
      phone: '+228 90 12 34 56',
      dateOfBirth: '1995-06-15',
      gender: 'F',
      nationality: 'Togolaise',
      address: '123 Rue de la Paix, Tokoin',
      city: 'Lomé',
      
      formationId: '1',
      formationTitle: 'Formation en Intelligence Artificielle et Machine Learning',
      formationPrice: 250000,
      
      currentJob: 'Développeuse Web',
      company: 'TechCorp Togo',
      workExperience: 3,
      motivation: 'Souhait de me spécialiser dans l\'IA pour évoluer dans ma carrière',
      expectations: 'Acquérir des compétences pratiques en ML et développer des projets concrets',
      
      educationLevel: 'bac+3',
      previousTrainings: ['JavaScript Avancé', 'Python pour débutants'],
      
      registrationDate: '2024-12-15',
      status: 'approved',
      paymentStatus: 'completed',
      amountPaid: 250000,
      
      processedBy: 'Admin CREC',
      processedDate: '2024-12-18',
      
      documents: [
        {
          id: '1',
          name: 'CV_Adjoa_MENSAH.pdf',
          type: 'cv',
          url: '/documents/cv_adjoa.pdf',
          uploadDate: '2024-12-15',
          verified: true
        },
        {
          id: '2',
          name: 'Diplome_Licence_Informatique.pdf',
          type: 'diploma',
          url: '/documents/diplome_adjoa.pdf',
          uploadDate: '2024-12-15',
          verified: true
        }
      ],
      
      createdAt: '2024-12-15',
      updatedAt: '2024-12-18'
    },
    {
      id: '2',
      firstName: 'Kossi',
      lastName: 'ADJA',
      email: 'kossi.adja@outlook.com',
      phone: '+228 91 23 45 67',
      dateOfBirth: '1988-03-22',
      gender: 'M',
      nationality: 'Togolaise',
      address: '456 Boulevard du 13 Janvier, Bè',
      city: 'Lomé',
      
      formationId: '2',
      formationTitle: 'Développement Web Full-Stack (React & Node.js)',
      formationPrice: 300000,
      
      currentJob: 'Chef de projet IT',
      company: 'Digital Solutions SARL',
      workExperience: 8,
      motivation: 'Besoin de mise à jour technique pour mieux encadrer mon équipe',
      expectations: 'Comprendre les technologies modernes de développement web',
      
      educationLevel: 'bac+5',
      previousTrainings: ['Gestion de projet Agile', 'HTML/CSS'],
      
      registrationDate: '2024-12-10',
      status: 'pending',
      paymentStatus: 'partial',
      amountPaid: 150000,
      
      documents: [
        {
          id: '3',
          name: 'CV_Kossi_ADJA.pdf',
          type: 'cv',
          url: '/documents/cv_kossi.pdf',
          uploadDate: '2024-12-10',
          verified: false
        }
      ],
      
      createdAt: '2024-12-10',
      updatedAt: '2024-12-10'
    },
    {
      id: '3',
      firstName: 'Marie',
      lastName: 'ABLODE',
      email: 'marie.ablode@yahoo.fr',
      phone: '+228 92 34 56 78',
      dateOfBirth: '1992-11-08',
      gender: 'F',
      nationality: 'Togolaise',
      address: '789 Rue des Palmiers, Adidogomé',
      city: 'Lomé',
      
      formationId: '3',
      formationTitle: 'Leadership et Management Éthique',
      formationPrice: 180000,
      
      currentJob: 'Responsable RH',
      company: 'Ministère de la Santé',
      workExperience: 6,
      motivation: 'Développer mes compétences en leadership pour améliorer la gestion de mon équipe',
      expectations: 'Apprendre les techniques de management éthique basées sur les valeurs',
      
      educationLevel: 'bac+5',
      previousTrainings: ['Formation en GRH', 'Communication interpersonnelle'],
      
      registrationDate: '2024-12-05',
      status: 'approved',
      paymentStatus: 'completed',
      amountPaid: 180000,
      
      processedBy: 'P. Pierre ADOM, SJ',
      processedDate: '2024-12-08',
      
      documents: [
        {
          id: '4',
          name: 'CV_Marie_ABLODE.pdf',
          type: 'cv',
          url: '/documents/cv_marie.pdf',
          uploadDate: '2024-12-05',
          verified: true
        },
        {
          id: '5',
          name: 'Master_GRH.pdf',
          type: 'diploma',
          url: '/documents/master_marie.pdf',
          uploadDate: '2024-12-05',
          verified: true
        }
      ],
      
      createdAt: '2024-12-05',
      updatedAt: '2024-12-08'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setInscriptions(mockInscriptions);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Configuration des statistiques
  const stats = [
    {
      title: 'Total Inscriptions',
      value: inscriptions.length,
      icon: UserCheck,
      color: 'text-blue-600',
      description: '+8 ce mois'
    },
    {
      title: 'En Attente',
      value: inscriptions.filter(i => i.status === 'pending').length,
      icon: Clock,
      color: 'text-orange-600',
      description: 'À traiter'
    },
    {
      title: 'Approuvées',
      value: inscriptions.filter(i => i.status === 'approved').length,
      icon: CheckCircle,
      color: 'text-green-600',
      description: 'Validées'
    },
    {
      title: 'Chiffre d\'Affaires',
      value: inscriptions.filter(i => i.paymentStatus === 'completed').reduce((sum, i) => sum + i.amountPaid, 0),
      icon: Users,
      color: 'text-purple-600',
      description: 'FCFA ce mois',
      format: 'currency'
    }
  ];

  // Configuration des filtres
  const filterConfigs = [
    {
      key: 'formationTitle',
      label: 'Formation',
      placeholder: 'Filtrer par formation',
      options: [
        { value: 'Formation en Intelligence Artificielle et Machine Learning', label: 'IA & ML' },
        { value: 'Développement Web Full-Stack (React & Node.js)', label: 'Dev Web Full-Stack' },
        { value: 'Leadership et Management Éthique', label: 'Leadership Éthique' },
        { value: 'Data Science et Analyse de Données', label: 'Data Science' }
      ]
    },
    {
      key: 'educationLevel',
      label: 'Niveau d\'études',
      placeholder: 'Filtrer par niveau',
      options: [
        { value: 'bac', label: 'Baccalauréat' },
        { value: 'bac+2', label: 'Bac+2' },
        { value: 'bac+3', label: 'Bac+3' },
        { value: 'bac+5', label: 'Bac+5' },
        { value: 'plus', label: 'Bac+5 et plus' }
      ]
    },
    {
      key: 'paymentStatus',
      label: 'Paiement',
      placeholder: 'Filtrer par paiement',
      options: [
        { value: 'pending', label: 'En attente' },
        { value: 'partial', label: 'Partiel' },
        { value: 'completed', label: 'Complet' },
        { value: 'refunded', label: 'Remboursé' }
      ]
    },
    {
      key: 'city',
      label: 'Ville',
      placeholder: 'Filtrer par ville',
      options: [
        { value: 'Lomé', label: 'Lomé' },
        { value: 'Kara', label: 'Kara' },
        { value: 'Sokodé', label: 'Sokodé' },
        { value: 'Kpalimé', label: 'Kpalimé' }
      ]
    }
  ];

  // Configuration des colonnes
  const columns = [
    { 
      key: 'name', 
      label: 'Nom Complet',
      render: (value: any, item: InscriptionFormationOuverte) => `${item.firstName} ${item.lastName}`
    },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Téléphone' },
    { key: 'formationTitle', label: 'Formation' },
    { key: 'educationLevel', label: 'Niveau', type: 'badge' as const, badgeType: 'level' as const },
    { 
      key: 'workExperience', 
      label: 'Expérience', 
      render: (value: number) => `${value} an${value > 1 ? 's' : ''}`
    },
    { 
      key: 'paymentStatus', 
      label: 'Paiement', 
      type: 'badge' as const, 
      badgeType: 'status' as const,
      render: (value: string, item: InscriptionFormationOuverte) => (
        <div>
          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeColor(value, 'status')}`}>
            {value === 'pending' ? 'En attente' : 
             value === 'partial' ? 'Partiel' : 
             value === 'completed' ? 'Complet' : 'Remboursé'}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {item.amountPaid.toLocaleString()} / {item.formationPrice.toLocaleString()} FCFA
          </div>
        </div>
      )
    },
    { key: 'status', label: 'Statut', type: 'badge' as const, badgeType: 'status' as const },
    { key: 'actions', label: 'Actions', type: 'actions' as const }
  ];

  // Actions personnalisées
  const customActions = [
    {
      label: 'Approuver',
      onClick: (inscription: InscriptionFormationOuverte) => {
        setInscriptions(prev => 
          prev.map(i => i.id === inscription.id ? { 
            ...i, 
            status: 'approved', 
            processedDate: new Date().toISOString(),
            processedBy: 'Admin CREC'
          } : i)
        );
      },
      variant: 'default' as const,
      icon: CheckCircle
    },
    {
      label: 'Rejeter',
      onClick: (inscription: InscriptionFormationOuverte) => {
        const reason = prompt('Raison du rejet:');
        if (reason) {
          setInscriptions(prev => 
            prev.map(i => i.id === inscription.id ? { 
              ...i, 
              status: 'rejected',
              rejectionReason: reason,
              processedDate: new Date().toISOString(),
              processedBy: 'Admin CREC'
            } : i)
          );
        }
      },
      variant: 'destructive' as const,
      icon: XCircle
    }
  ];

  // Configuration du formulaire (vue détaillée)
  const formFields = [
    { name: 'firstName', label: 'Prénom', type: 'text' as const, required: true },
    { name: 'lastName', label: 'Nom', type: 'text' as const, required: true },
    { name: 'email', label: 'Email', type: 'email' as const, required: true },
    { name: 'phone', label: 'Téléphone', type: 'text' as const, required: true },
    { name: 'dateOfBirth', label: 'Date de naissance', type: 'date' as const, required: true },
    { 
      name: 'gender', 
      label: 'Genre', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: 'M', label: 'Masculin' },
        { value: 'F', label: 'Féminin' }
      ]
    },
    { name: 'nationality', label: 'Nationalité', type: 'text' as const, required: true },
    { name: 'address', label: 'Adresse', type: 'textarea' as const, required: true },
    { name: 'city', label: 'Ville', type: 'text' as const, required: true },
    { name: 'currentJob', label: 'Poste actuel', type: 'text' as const },
    { name: 'company', label: 'Entreprise', type: 'text' as const },
    { name: 'workExperience', label: 'Années d\'expérience', type: 'number' as const },
    { 
      name: 'educationLevel', 
      label: 'Niveau d\'études', 
      type: 'select' as const, 
      required: true,
      options: filterConfigs[1].options
    }
  ];

  // Gestionnaires d'événements
  const handleAdd = () => {
    setSelectedInscription(null);
    setIsFormOpen(true);
  };

  const handleEdit = (inscription: InscriptionFormationOuverte) => {
    setSelectedInscription(inscription);
    setIsFormOpen(true);
  };

  const handleDelete = (inscription: InscriptionFormationOuverte) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette inscription ?')) {
      setInscriptions(prev => prev.filter(i => i.id !== inscription.id));
    }
  };

  const handleView = (inscription: InscriptionFormationOuverte) => {
    setSelectedInscription(inscription);
    setIsFormOpen(true);
  };

  const handleSubmit = (data: Record<string, any>) => {
    if (selectedInscription) {
      setInscriptions(prev => 
        prev.map(i => i.id === selectedInscription.id ? { ...i, ...data } : i)
      );
    } else {
      const newInscription: InscriptionFormationOuverte = {
        id: Date.now().toString(),
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        phone: data.phone || '',
        dateOfBirth: data.dateOfBirth || '',
        gender: data.gender || 'M',
        nationality: data.nationality || '',
        address: data.address || '',
        city: data.city || '',
        formationId: '1',
        formationTitle: 'Formation à définir',
        formationPrice: 0,
        currentJob: data.currentJob || '',
        company: data.company || '',
        workExperience: Number(data.workExperience) || 0,
        motivation: '',
        expectations: '',
        educationLevel: data.educationLevel || 'bac',
        previousTrainings: [],
        registrationDate: new Date().toISOString(),
        status: 'pending',
        paymentStatus: 'pending',
        amountPaid: 0,
        documents: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setInscriptions(prev => [...prev, newInscription]);
    }
    setIsFormOpen(false);
  };

  const handleExport = () => {
    const exportData = filteredData.map(inscription => ({
      Prénom: inscription.firstName,
      Nom: inscription.lastName,
      Email: inscription.email,
      Téléphone: inscription.phone,
      Formation: inscription.formationTitle,
      'Niveau études': inscription.educationLevel,
      'Expérience (ans)': inscription.workExperience,
      'Date inscription': formatDate(inscription.registrationDate),
      'Montant payé': inscription.amountPaid,
      'Prix formation': inscription.formationPrice,
      'Statut paiement': inscription.paymentStatus,
      Statut: inscription.status
    }));
    
    exportToCSV(
      exportData, 
      'inscriptions-formations-ouvertes-' + new Date().toISOString().split('T')[0], 
      Object.keys(exportData[0] || {})
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <AdminPageLayout
      title="Inscriptions Formations Ouvertes"
      description="Gérez les inscriptions aux formations ouvertes au grand public"
      stats={stats}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      onAdd={handleAdd}
      onExport={handleExport}
      filters={
        <AdminFilters
          filters={filterConfigs}
          activeFilters={filters}
          onFilterChange={updateFilter}
          onClearFilters={clearFilters}
        />
      }
      tabs={[
        { id: 'all', label: 'Toutes', count: inscriptions.length },
        { id: 'pending', label: 'En attente', count: inscriptions.filter(i => i.status === 'pending').length },
        { id: 'approved', label: 'Approuvées', count: inscriptions.filter(i => i.status === 'approved').length },
        { id: 'rejected', label: 'Rejetées', count: inscriptions.filter(i => i.status === 'rejected').length }
      ]}
      activeTab={activeTab}
      onTabChange={(tab) => setActiveTab(tab as 'all' | 'pending' | 'approved' | 'rejected')}
    >
      <AdminTable
        columns={columns}
        data={filteredData}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        customActions={customActions}
      />

      {selectedInscription && (
        <AdminForm
          title="Détails de l'inscription"
          description="Consultez et modifiez les informations de l'inscription"
          fields={formFields}
          data={selectedInscription}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleSubmit}
          isLoading={loading}
          customContent={
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Motivation</h4>
                <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded">
                  {selectedInscription.motivation}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Attentes</h4>
                <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded">
                  {selectedInscription.expectations}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Documents soumis</h4>
                <div className="space-y-2">
                  {selectedInscription.documents.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">{doc.name}</span>
                      <span className={`text-xs px-2 py-1 rounded ${doc.verified ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                        {doc.verified ? 'Vérifié' : 'À vérifier'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          }
        />
      )}
    </AdminPageLayout>
  );
};

export default InscriptionsFormationsOuvertes;
