// src/services/inscription-service.ts - VERSION CORRIGÉE
import api from './api';

// Types d'interfaces
export interface FablabInscription {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  workshop: string;
  experience?: string;
  motivation?: string;
  payment_receipt_path: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes?: string;
  processed_at?: string;
  processed_by?: number;
  created_at: string;
  processedBy?: {
    nom: string;
    prenom: string;
  };
}

export interface FormationInscription {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  formation: string;
  level?: string;
  motivation?: string;
  payment_receipt_path: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes?: string;
  processed_at?: string;
  processed_by?: number;
  created_at: string;
  processedBy?: {
    nom: string;
    prenom: string;
  };
}

export interface UniversityInscription {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  dob: string;
  nationality: string;
  gender: 'male' | 'female' | 'other';
  program: string;
  parentNames: string;
  parentPhone: string;
  highSchool?: string;
  bacMention?: string;
  graduationYear?: number;
  licenseYear?: number;
  licenseUniversity?: string;
  documents_path: string;
  agreeToTerms: boolean;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes?: string;
  processed_at?: string;
  processed_by?: number;
  created_at: string;
  processedBy?: {
    nom: string;
    prenom: string;
  };
}

// Types pour les données de formulaire
export interface FablabInscriptionData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  workshop: string;
  experience?: string;
  motivation?: string;
  paymentReceipt: File;
}

export interface FormationInscriptionData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  formation_slug: string;
  level?: string;
  motivation?: string;
  paymentReceipt: File;
}

export interface UniversityInscriptionData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  dob: string;
  nationality: string;
  gender: 'male' | 'female' | 'other';
  program: string;
  parentNames: string;
  parentPhone: string;
  highSchool?: string;
  bacMention?: string;
  graduationYear?: number;
  licenseYear?: number;
  licenseUniversity?: string;
  documents: File;
  agreeToTerms: boolean;
}

// Types pour les statistiques
export interface InscriptionStats {
  fablab: {
    pending: number;
    approved: number;
    rejected: number;
    total: number;
  };
  formations: {
    pending: number;
    approved: number;
    rejected: number;
    total: number;
  };
  university: {
    pending: number;
    approved: number;
    rejected: number;
    total: number;
  };
}

export interface RecentInscription {
  id: number;
  type: 'fablab' | 'formations' | 'university';
  name: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  details: string;
}

// Service d'inscription corrigé
class InscriptionService {

  // 📋 DASHBOARD ET STATISTIQUES
  async getDashboardData() {
    try {
      // ✅ CORRECTION: Utiliser la bonne route du backend
      const response = await api.get('/admin/inscriptions');
      return {
        success: true,
        data: response.data.data
      };
    } catch (error: any) {
      console.error('Erreur lors du chargement des statistiques:', error);
      throw error;
    }
  }

  // 📋 RÉCUPÉRER LES INSCRIPTIONS PAR TYPE
  async getInscriptionsByType(
    type: 'fablab' | 'formations' | 'university',
    params: {
      page?: number;
      per_page?: number;
      status?: string;
      [key: string]: any;
    } = {}
  ) {
    try {
      // ✅ CORRECTION: Utiliser les bonnes routes du backend
      const response = await api.get(`/admin/inscriptions/${type}`, { params });
      return {
        success: true,
        data: response.data.data
      };
    } catch (error: any) {
      console.error(`Erreur lors du chargement des inscriptions ${type}:`, error);
      throw error;
    }
  }

  // ✅ INSCRIPTION FABLAB
  async submitFablabInscription(data: FablabInscriptionData) {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      const response = await api.post('/inscriptions/fablab', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      return response.data;
    } catch (error: any) {
      console.error('Erreur inscription FabLab:', error);
      throw error;
    }
  }

  // ✅ INSCRIPTION FORMATIONS
  async submitFormationInscription(data: FormationInscriptionData) {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      const response = await api.post('/inscriptions/formations', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      return response.data;
    } catch (error: any) {
      console.error('Erreur inscription Formation:', error);
      throw error;
    }
  }

  // ✅ INSCRIPTION UNIVERSITÉ
  async submitUniversityInscription(data: UniversityInscriptionData) {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      const response = await api.post('/inscriptions/university', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      return response.data;
    } catch (error: any) {
      console.error('Erreur inscription Université:', error);
      throw error;
    }
  }

  // 📋 APPROUVER UNE INSCRIPTION
  async approveInscription(
    type: 'fablab' | 'formations' | 'university',
    id: number,
    adminNotes?: string
  ) {
    try {
      // ✅ CORRECTION: Utiliser les bonnes routes du backend
      const response = await api.post(`/admin/inscriptions/${type}/${id}/approve`, {
        admin_notes: adminNotes
      });
      return response.data;
    } catch (error: any) {
      console.error('Erreur approbation:', error);
      throw error;
    }
  }

  // 📋 REJETER UNE INSCRIPTION
  async rejectInscription(
    type: 'fablab' | 'formations' | 'university',
    id: number,
    adminNotes: string,
    rejectionReason: string
  ) {
    try {
      // ✅ CORRECTION: Utiliser les bonnes routes du backend
      const response = await api.post(`/admin/inscriptions/${type}/${id}/reject`, {
        admin_notes: adminNotes,
        rejection_reason: rejectionReason
      });
      return response.data;
    } catch (error: any) {
      console.error('Erreur rejet:', error);
      throw error;
    }
  }

  // 📋 TÉLÉCHARGER UN REÇU
  downloadPaymentReceipt(inscription: FablabInscription | FormationInscription | UniversityInscription) {
    const baseUrl = import.meta.env.VITE_STORAGE_URL || import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000';
    let filePath = '';

    if ('payment_receipt_path' in inscription) {
      filePath = inscription.payment_receipt_path;
    } else if ('documents_path' in inscription) {
      filePath = inscription.documents_path;
    }

    if (filePath) {
      const fileUrl = `${baseUrl}/${filePath.startsWith('storage/') ? '' : 'storage/'}${filePath}`;
      window.open(fileUrl, '_blank');
    }
  }
}

// Export du service
const inscriptionService = new InscriptionService();
export default inscriptionService;