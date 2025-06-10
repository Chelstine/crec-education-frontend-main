// Types for admin system

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'super-admin' | 'moderator';
  lastLogin: string;
}

export interface DocumentStatus {
  type: string;
  status: 'pending' | 'verified' | 'rejected';
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface PaymentInfo {
  reference?: string;
  method?: string;
  date?: string;
}

export interface UniversityApplication {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  program: string;
  submissionDate: string;
  status: 'pending' | 'accepted' | 'rejected';
  documents: DocumentStatus[];
  paymentAmount: number;
  paymentStatus: 'pending' | 'verified' | 'failed';
  notes?: string;
  personalInfo?: PersonalInfo;
  paymentInfo?: PaymentInfo;
}

export interface FormationApplication {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  formation: string;
  submissionDate: string;
  status: 'pending' | 'accepted' | 'rejected';
  paymentMethod: string;
  paymentStatus: 'pending' | 'verified' | 'failed';
  experience: string;
  motivation: string;
}

export interface FabLabApplication {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  subscriptionType: string;
  submissionDate: string;
  status: 'pending' | 'accepted' | 'rejected';
  paymentAmount: number;
  paymentStatus: 'pending' | 'verified' | 'failed';
  accessLevel: string;
}

export interface AdminStats {
  totalApplications: number;
  pendingApplications: number;
  acceptedApplications: number;
  rejectedApplications: number;
  totalRevenue: number;
  monthlyGrowth: number;
  pendingPayments: number;
  activeFabLabSubscriptions: number;
}

export interface RecentActivity {
  id: string;
  type: 'university' | 'formation' | 'fablab';
  action: string;
  user: string;
  program: string;
  time: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface UrgentTask {
  id: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  link: string;
  count: number;
}

export interface MonthlyData {
  month: string;
  applications: number;
  revenue: number;
  accepted: number;
}

export interface PageContent {
  id: string;
  title: string;
  content: string;
  lastModified: string;
  modifiedBy: string;
}

export interface AdminSettings {
  id: string;
  emailNotifications: boolean;
  autoApproval: boolean;
  maintenanceMode: boolean;
  backupSchedule: string;
}

// Email service related types
export interface EmailConfiguration {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPassword: string;
  fromName: string;
  fromEmail: string;
}

export interface NotificationSettings {
  enableApplicationConfirmation: boolean;
  enableStatusUpdates: boolean;
  enablePaymentConfirmation: boolean;
  enablePaymentNotifications?: boolean;
  enableReminderEmails?: boolean;
  enableBulkEmails?: boolean;
  emailFrequencyLimit?: number;
  emailCooldownHours?: number;
  staffNotificationEmail?: string;
  ccEmails?: string[];
  bccEmails?: string[];
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  category: string;
  isActive?: boolean;
}