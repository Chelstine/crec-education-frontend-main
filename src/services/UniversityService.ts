import { 
  UniversityProgram, 
  UniversityApplication, 
  ApplicationStatus,
  PaymentStatus,
  DocumentType,
  UniversityDashboardStats,
  DocumentReview,
  EmailTemplate
} from '@/types';

// Mock data for demonstration
const mockPrograms: UniversityProgram[] = [
  {
    id: '1',
    name: 'Licence en Informatique',
    description: 'Formation complète en informatique et développement logiciel avec spécialisations en intelligence artificielle et développement web.',
    category: 'Technology',
    duration: '3 ans',
    tuitionFee: 2500000,
    inscriptionFee: 150000,
    capacity: 30,
    applicationDeadline: '2024-08-15',
    startDate: '2024-09-15',
    endDate: '2027-06-30',
    isActive: true,
    isVisible: true,
    language: 'Français',
    level: 'Licence',
    campus: 'Campus Principal',
    objectives: [
      'Maîtriser les langages de programmation modernes',
      'Développer des applications web et mobiles',
      'Comprendre les principes de l\'intelligence artificielle',
      'Acquérir des compétences en gestion de projet'
    ],
    requirements: [
      'Baccalauréat scientifique ou équivalent',
      'Niveau d\'anglais intermédiaire',
      'Motivation et passion pour l\'informatique'
    ],
    careerOutlooks: [
      'Développeur web/mobile',
      'Ingénieur logiciel',
      'Consultant en IT',
      'Chef de projet technique'
    ],
    partnerCompanies: [
      'Orange Cameroun',
      'MTN Cameroun',
      'Société Générale',
      'Total Energies'
    ],
    documentTypes: [
      {
        id: 'diploma',
        name: 'Diplôme du Baccalauréat',
        description: 'Copie certifiée conforme du diplôme',
        isRequired: true,
        allowedFormats: ['PDF', 'JPG', 'PNG'],
        maxSizeInMB: 5,
        validationRules: {
          minSize: 100,
          maxSize: 5000,
          allowedExtensions: ['.pdf', '.jpg', '.jpeg', '.png'],
          requiresVerification: true
        }
      },
      {
        id: 'transcript',
        name: 'Relevé de notes',
        description: 'Relevé de notes du baccalauréat',
        isRequired: true,
        allowedFormats: ['PDF', 'JPG', 'PNG'],
        maxSizeInMB: 5,
        validationRules: {
          minSize: 100,
          maxSize: 5000,
          allowedExtensions: ['.pdf', '.jpg', '.jpeg', '.png'],
          requiresVerification: true
        }
      },
      {
        id: 'id_card',
        name: 'Carte d\'identité',
        description: 'Copie de la carte d\'identité nationale',
        isRequired: true,
        allowedFormats: ['PDF', 'JPG', 'PNG'],
        maxSizeInMB: 2,
        validationRules: {
          minSize: 50,
          maxSize: 2000,
          allowedExtensions: ['.pdf', '.jpg', '.jpeg', '.png'],
          requiresVerification: false
        }
      },
      {
        id: 'photo',
        name: 'Photo d\'identité',
        description: 'Photo d\'identité récente format passeport',
        isRequired: true,
        allowedFormats: ['JPG', 'PNG'],
        maxSizeInMB: 1,
        validationRules: {
          minSize: 20,
          maxSize: 1000,
          allowedExtensions: ['.jpg', '.jpeg', '.png'],
          requiresVerification: false
        }
      }
    ],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-02-20T14:30:00Z'
  },
  {
    id: '2',
    name: 'Master en Gestion de Projet',
    description: 'Formation avancée en gestion de projet avec certifications PMI et PRINCE2.',
    category: 'Management',
    duration: '2 ans',
    tuitionFee: 3500000,
    inscriptionFee: 200000,
    capacity: 25,
    applicationDeadline: '2024-07-30',
    startDate: '2024-09-01',
    endDate: '2026-06-30',
    isActive: true,
    isVisible: true,
    language: 'Français/Anglais',
    level: 'Master',
    campus: 'Campus Principal',
    objectives: [
      'Maîtriser les méthodologies de gestion de projet',
      'Obtenir des certifications internationales',
      'Développer des compétences en leadership',
      'Gérer des projets complexes et multiculturels'
    ],
    requirements: [
      'Licence ou équivalent Bac+3',
      'Au moins 2 ans d\'expérience professionnelle',
      'Niveau d\'anglais avancé',
      'Entretien de motivation'
    ],
    careerOutlooks: [
      'Chef de projet senior',
      'Directeur de programme',
      'Consultant en management',
      'Entrepreneur'
    ],
    partnerCompanies: [
      'Bolloré Africa Logistics',
      'Ecobank',
      'PwC Cameroun',
      'Deloitte'
    ],
    documentTypes: [
      {
        id: 'diploma',
        name: 'Diplôme de Licence',
        description: 'Copie certifiée conforme du diplôme de licence',
        isRequired: true,
        allowedFormats: ['PDF'],
        maxSizeInMB: 5,
        validationRules: {
          minSize: 100,
          maxSize: 5000,
          allowedExtensions: ['.pdf'],
          requiresVerification: true
        }
      },
      {
        id: 'cv',
        name: 'Curriculum Vitae',
        description: 'CV détaillé avec expériences professionnelles',
        isRequired: true,
        allowedFormats: ['PDF'],
        maxSizeInMB: 3,
        validationRules: {
          minSize: 50,
          maxSize: 3000,
          allowedExtensions: ['.pdf'],
          requiresVerification: false
        }
      },
      {
        id: 'work_certificate',
        name: 'Certificat de travail',
        description: 'Attestation d\'expérience professionnelle',
        isRequired: true,
        allowedFormats: ['PDF'],
        maxSizeInMB: 5,
        validationRules: {
          minSize: 100,
          maxSize: 5000,
          allowedExtensions: ['.pdf'],
          requiresVerification: true
        }
      }
    ],
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-02-25T16:45:00Z'
  }
];

const mockApplications: UniversityApplication[] = [
  {
    id: '1',
    programId: '1',
    programName: 'Licence en Informatique',
    applicantName: 'Jean Dupont',
    applicantEmail: 'jean.dupont@email.com',
    applicantPhone: '237690123456',
    status: 'under_review',
    submittedAt: '2024-02-15T10:30:00Z',
    personalInfo: {
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@email.com',
      phone: '237690123456',
      dateOfBirth: '2000-05-15',
      placeOfBirth: 'Douala',
      nationality: 'Camerounaise',
      address: '123 Rue de la Paix, Douala',
      emergencyContact: {
        name: 'Marie Dupont',
        relationship: 'Mère',
        phone: '237690654321'
      }
    },
    academicInfo: {
      lastDiploma: 'Baccalauréat C',
      institution: 'Lycée de Bonapriso',
      graduationYear: '2023',
      grade: '14.5/20',
      previousPrograms: []
    },
    documents: [
      {
        type: 'diploma',
        fileName: 'bac_diploma.pdf',
        fileSize: 1024000,
        uploadedAt: '2024-02-15T10:15:00Z',
        status: 'pending'
      },
      {
        type: 'transcript',
        fileName: 'releve_notes.pdf',
        fileSize: 512000,
        uploadedAt: '2024-02-15T10:20:00Z',
        status: 'approved'
      }
    ],
    paymentInfo: {
      status: 'pending',
      amount: 150000,
      method: 'mobile_money',
      reference: 'PAY001234',
      dueDate: '2024-03-15'
    },
    motivationLetter: 'Je suis passionné par l\'informatique depuis mon enfance...',
    ranking: 85,
    evaluationNotes: 'Bon dossier académique, motivation claire',
    communicationHistory: []
  }
];

class UniversityService {
  private static instance: UniversityService;
  
  public static getInstance(): UniversityService {
    if (!UniversityService.instance) {
      UniversityService.instance = new UniversityService();
    }
    return UniversityService.instance;
  }

  // Programs CRUD
  async getPrograms(): Promise<UniversityProgram[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockPrograms;
  }

  async getProgramById(id: string): Promise<UniversityProgram | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockPrograms.find(p => p.id === id) || null;
  }

  async createProgram(program: Omit<UniversityProgram, 'id' | 'createdAt' | 'updatedAt'>): Promise<UniversityProgram> {
    await new Promise(resolve => setTimeout(resolve, 800));
    const newProgram: UniversityProgram = {
      ...program,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockPrograms.push(newProgram);
    return newProgram;
  }

  async updateProgram(id: string, updates: Partial<UniversityProgram>): Promise<UniversityProgram> {
    await new Promise(resolve => setTimeout(resolve, 800));
    const index = mockPrograms.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Program not found');
    }
    mockPrograms[index] = {
      ...mockPrograms[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return mockPrograms[index];
  }

  async deleteProgram(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockPrograms.findIndex(p => p.id === id);
    if (index === -1) {
      return false;
    }
    mockPrograms.splice(index, 1);
    return true;
  }

  // Applications CRUD
  async getApplications(filters?: {
    programId?: string;
    status?: ApplicationStatus;
    search?: string;
  }): Promise<UniversityApplication[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    let filtered = [...mockApplications];

    if (filters?.programId) {
      filtered = filtered.filter(app => app.programId === filters.programId);
    }

    if (filters?.status) {
      filtered = filtered.filter(app => app.status === filters.status);
    }

    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(app => 
        app.applicantName.toLowerCase().includes(search) ||
        app.applicantEmail.toLowerCase().includes(search) ||
        app.programName.toLowerCase().includes(search)
      );
    }

    return filtered;
  }

  async getApplicationById(id: string): Promise<UniversityApplication | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockApplications.find(app => app.id === id) || null;
  }

  async submitApplication(application: Omit<UniversityApplication, 'id' | 'submittedAt' | 'status'>): Promise<UniversityApplication> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newApplication: UniversityApplication = {
      ...application,
      id: Date.now().toString(),
      status: 'submitted',
      submittedAt: new Date().toISOString()
    };
    mockApplications.push(newApplication);
    return newApplication;
  }

  async updateApplicationStatus(id: string, status: ApplicationStatus, notes?: string): Promise<UniversityApplication> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockApplications.findIndex(app => app.id === id);
    if (index === -1) {
      throw new Error('Application not found');
    }
    
    mockApplications[index] = {
      ...mockApplications[index],
      status,
      evaluationNotes: notes || mockApplications[index].evaluationNotes
    };
    
    return mockApplications[index];
  }

  async reviewDocument(applicationId: string, documentType: string, review: DocumentReview): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const application = mockApplications.find(app => app.id === applicationId);
    if (!application) {
      throw new Error('Application not found');
    }

    const document = application.documents.find(doc => doc.type === documentType);
    if (!document) {
      throw new Error('Document not found');
    }

    document.status = review.status;
    document.reviewedAt = new Date().toISOString();
    document.reviewNotes = review.notes;

    return true;
  }

  // Dashboard statistics
  async getDashboardStats(): Promise<UniversityDashboardStats> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      totalPrograms: mockPrograms.length,
      activePrograms: mockPrograms.filter(p => p.isActive).length,
      totalApplications: mockApplications.length,
      pendingApplications: mockApplications.filter(app => app.status === 'submitted').length,
      acceptedApplications: mockApplications.filter(app => app.status === 'accepted').length,
      rejectedApplications: mockApplications.filter(app => app.status === 'rejected').length,
      totalRevenue: mockApplications.reduce((sum, app) => 
        app.paymentInfo.status === 'completed' ? sum + app.paymentInfo.amount : sum, 0
      ),
      averageApplicationsPerProgram: Math.round(mockApplications.length / mockPrograms.length),
      applicationTrends: [
        { month: 'Jan', applications: 12 },
        { month: 'Feb', applications: 18 },
        { month: 'Mar', applications: 8 },
        { month: 'Apr', applications: 25 },
        { month: 'May', applications: 15 }
      ]
    };
  }

  // Payment processing
  async processPayment(applicationId: string, paymentData: {
    method: string;
    amount: number;
    reference: string;
  }): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const application = mockApplications.find(app => app.id === applicationId);
    if (!application) {
      throw new Error('Application not found');
    }

    application.paymentInfo = {
      ...application.paymentInfo,
      status: 'completed',
      method: paymentData.method,
      reference: paymentData.reference,
      completedAt: new Date().toISOString()
    };

    return true;
  }

  // Email templates
  async getEmailTemplates(): Promise<EmailTemplate[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      {
        id: 'application_received',
        name: 'Candidature reçue',
        subject: 'Votre candidature a été reçue',
        htmlContent: '<p>Bonjour {{applicantName}},</p><p>Nous avons bien reçu votre candidature pour le programme {{programName}}.</p>',
        textContent: 'Bonjour {{applicantName}}, nous avons bien reçu votre candidature pour le programme {{programName}}.',
        variables: ['applicantName', 'programName'],
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
    ];
  }
}

export default UniversityService;
