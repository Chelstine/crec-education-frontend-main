import { 
  AdminUser, 
  UniversityApplication, 
  FormationApplication, 
  FabLabApplication,
  AdminStats,
  RecentActivity,
  UrgentTask,
  MonthlyData,
  PageContent,
  AdminSettings
} from '@/types/admin';

// Service d'authentification admin
export class AdminAuthService {
  private static instance: AdminAuthService;
  
  public static getInstance(): AdminAuthService {
    if (!AdminAuthService.instance) {
      AdminAuthService.instance = new AdminAuthService();
    }
    return AdminAuthService.instance;
  }

  async login(email: string, password: string): Promise<{ success: boolean; user?: AdminUser; token?: string }> {
    // Simulation d'authentification - à remplacer par votre API
    if (email === 'admin@crec.edu' && password === 'admin123') {
      const user: AdminUser = {
        id: '1',
        email,
        name: 'Administrateur CREC',
        role: 'admin',
        lastLogin: new Date().toISOString()
      };
      
      const token = 'mock-jwt-token-' + Date.now();
      
      // Stocker en localStorage
      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminUser', JSON.stringify(user));
      
      return { success: true, user, token };
    }
    
    return { success: false };
  }

  logout(): void {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    return !!(token && user);
  }

  getCurrentUser(): AdminUser | null {
    const userStr = localStorage.getItem('adminUser');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }
}

// Service de données admin (mock data pour la démo)
export class AdminDataService {
  private static instance: AdminDataService;
  
  public static getInstance(): AdminDataService {
    if (!AdminDataService.instance) {
      AdminDataService.instance = new AdminDataService();
    }
    return AdminDataService.instance;
  }

  // Données mockées pour la démonstration
  private mockUniversityApplications: UniversityApplication[] = [
    {
      id: '1',
      applicantName: 'Marie Kouassi',
      email: 'marie.kouassi@email.com',
      phone: '+237 6XX XXX XXX',
      program: 'Licence en Informatique',
      submissionDate: '2024-01-15',
      status: 'pending',
      documents: [
        { type: 'CV', status: 'verified' },
        { type: 'Diplôme', status: 'pending' },
        { type: 'Relevé de notes', status: 'verified' }
      ],
      paymentAmount: 50000,
      paymentStatus: 'verified',
      notes: 'Candidature prometteuse'
    },
    {
      id: '2',
      applicantName: 'Jean Togo',
      email: 'jean.togo@email.com',
      phone: '+237 6XX XXX XXX',
      program: 'Master en Data Science',
      submissionDate: '2024-01-10',
      status: 'accepted',
      documents: [
        { type: 'CV', status: 'verified' },
        { type: 'Diplôme', status: 'verified' },
        { type: 'Relevé de notes', status: 'verified' }
      ],
      paymentAmount: 75000,
      paymentStatus: 'verified',
      notes: 'Excellent profil'
    }
  ];

  private mockFormationApplications: FormationApplication[] = [
    {
      id: '1',
      applicantName: 'Alice Mballa',
      email: 'alice.mballa@email.com',
      phone: '+237 6XX XXX XXX',
      formation: 'Développement Web',
      submissionDate: '2024-01-12',
      status: 'pending',
      paymentMethod: 'Mobile Money',
      paymentStatus: 'pending',
      experience: 'Débutant',
      motivation: 'Reconversion professionnelle'
    }
  ];

  private mockFabLabApplications: FabLabApplication[] = [
    {
      id: '1',
      applicantName: 'Paul Nguema',
      email: 'paul.nguema@email.com',
      phone: '+237 6XX XXX XXX',
      subscriptionType: 'Mensuel',
      submissionDate: '2024-01-14',
      status: 'pending',
      paymentAmount: 25000,
      paymentStatus: 'pending',
      accessLevel: 'Standard'
    }
  ];

  async getStats(): Promise<AdminStats> {
    // Simulation d'appel API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalApplications: 15,
          pendingApplications: 5,
          acceptedApplications: 8,
          rejectedApplications: 2,
          totalRevenue: 1250000,
          monthlyGrowth: 15.3,
          pendingPayments: 3,
          activeFabLabSubscriptions: 12
        });
      }, 500);
    });
  }

  async getUniversityApplications(): Promise<UniversityApplication[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockUniversityApplications);
      }, 300);
    });
  }

  async getFormationApplications(): Promise<FormationApplication[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockFormationApplications);
      }, 300);
    });
  }

  async getFabLabApplications(): Promise<FabLabApplication[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockFabLabApplications);
      }, 300);
    });
  }

  async updateApplicationStatus(
    type: 'university' | 'formation' | 'fablab',
    id: string,
    status: 'pending' | 'accepted' | 'rejected'
  ): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulation de mise à jour
        if (type === 'university') {
          const app = this.mockUniversityApplications.find(a => a.id === id);
          if (app) app.status = status;
        }
        // Même logique pour les autres types
        resolve(true);
      }, 500);
    });
  }

  async getRecentActivities(): Promise<RecentActivity[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            type: 'university',
            action: 'Nouvelle candidature',
            user: 'Marie Kouassi',
            program: 'Licence en Informatique',
            time: 'Il y a 2 heures',
            status: 'pending'
          },
          {
            id: '2',
            type: 'fablab',
            action: 'Abonnement validé',
            user: 'Jean Togo',
            program: 'Abonnement Mensuel',
            time: 'Il y a 4 heures',
            status: 'accepted'
          }
        ]);
      }, 300);
    });
  }

  async getUrgentTasks(): Promise<UrgentTask[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            message: '3 dossiers Université à vérifier',
            priority: 'high',
            link: '/admin/inscriptions/university',
            count: 3
          },
          {
            id: '2',
            message: '2 paiements en attente de validation',
            priority: 'medium',
            link: '/admin/inscriptions/formations',
            count: 2
          }
        ]);
      }, 300);
    });
  }

  async getMonthlyData(): Promise<MonthlyData[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { month: 'Jan', applications: 15, revenue: 750000, accepted: 12 },
          { month: 'Fév', applications: 18, revenue: 900000, accepted: 15 },
          { month: 'Mar', applications: 22, revenue: 1100000, accepted: 18 },
          { month: 'Avr', applications: 25, revenue: 1250000, accepted: 20 }
        ]);
      }, 300);
    });
  }
}

// Export des instances
export const adminAuthService = AdminAuthService.getInstance();
export const adminDataService = AdminDataService.getInstance();
