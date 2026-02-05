// services/universityService.ts

import { 
  UniversityProgram, 
  PublicUniversityProgram,
  CreateUniversityProgramRequest, 
  UpdateUniversityProgramRequest,
  UniversityProgramResponse,
  UniversityProgramsResponse,
  PublicUniversityProgramsResponse 
} from '@/types/university';

class UniversityService {
  private baseURL = import.meta.env.VITE_API_URL || '/api';
  
  private getAuthHeaders() {
    const token = localStorage.getItem('auth_token');
    return {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
    }
    return response.json();
  }

  private parseDuration(duration: string): [number, string] {
    switch (duration) {
      case '3_MONTHS': return [3, 'MONTHS'];
      case '6_MONTHS': return [6, 'MONTHS'];
      case '1_YEAR': return [1, 'YEARS'];
      case '2_YEARS': return [2, 'YEARS'];
      case '3_YEARS': return [3, 'YEARS'];
      case '4_YEARS': return [4, 'YEARS'];
      case '5_YEARS': return [5, 'YEARS'];
      default: return [3, 'YEARS']; // valeur par défaut
    }
  }

  // Méthodes publiques (pour UniversityPage)
  async getPublicPrograms(): Promise<PublicUniversityProgram[]> {
    const response = await fetch(`${this.baseURL}/university-programs`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    const result = await this.handleResponse<PublicUniversityProgramsResponse>(response);
    return result.data;
  }

  // Méthodes admin (pour AdminContenusISTMPage)
  async getAdminPrograms(): Promise<UniversityProgram[]> {
    const response = await fetch(`${this.baseURL}/admin/content/university-programs`, {
      headers: this.getAuthHeaders()
    });
    
    const result = await this.handleResponse<UniversityProgramsResponse>(response);
    return result.data;
  }

  async createProgram(data: CreateUniversityProgramRequest): Promise<UniversityProgram> {
    const formData = new FormData();
    
    // Champs requis - utiliser les noms exacts du backend
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('level', data.level);
    formData.append('duration', data.duration);
    formData.append('capacity', data.capacity.toString());
    formData.append('annual_fee', data.annual_fee.toString());
    
    // Champs optionnels
    if (data.slug) {
      formData.append('slug', data.slug);
    }
    if (data.registration_deadline) {
      formData.append('registration_deadline', data.registration_deadline);
    }
    if (data.start_date) {
      formData.append('start_date', data.start_date);
    }
    
    // Arrays - utiliser les noms exacts du backend
    formData.append('prerequisites', JSON.stringify(data.prerequisites || []));
    formData.append('admission_requirements', JSON.stringify(data.admission_requirements || []));
    formData.append('career_opportunities', JSON.stringify(data.career_opportunities || []));
    formData.append('program_details', JSON.stringify(data.program_details || []));
    formData.append('curriculum', JSON.stringify(data.curriculum || []));
    
    // Booléens
    formData.append('is_active', data.is_active ? '1' : '0');
    formData.append('is_featured', data.is_featured ? '1' : '0');
    
    // Image
    if (data.image) {
      formData.append('image', data.image);
    }

    const response = await fetch(`${this.baseURL}/admin/content/university-programs`, {
      method: 'POST',
      body: formData,
      headers: this.getAuthHeaders()
    });

    const result = await this.handleResponse<UniversityProgramResponse>(response);
    return result.data;
  }

  async updateProgram(id: number, data: UpdateUniversityProgramRequest): Promise<UniversityProgram> {
    const formData = new FormData();
    
    // Méthode Laravel pour PUT via POST
    formData.append('_method', 'PUT');
    
    // Champs optionnels - utiliser les noms du backend directement
    if (data.title) {
      formData.append('title', data.title);
    }
    if (data.slug) {
      formData.append('slug', data.slug);
    }
    if (data.description) {
      formData.append('description', data.description);
    }
    if (data.level) {
      formData.append('level', data.level);
    }
    if (data.duration) {
      formData.append('duration', data.duration);
    }
    if (data.capacity !== undefined) {
      formData.append('capacity', data.capacity.toString());
    }
    if (data.annual_fee !== undefined) {
      formData.append('annual_fee', data.annual_fee.toString());
    }
    
    // Champs optionnels
    if (data.registration_deadline) {
      formData.append('registration_deadline', data.registration_deadline);
    }
    if (data.start_date) {
      formData.append('start_date', data.start_date);
    }
    
    // Arrays JSON - utiliser les noms du backend
    if (data.prerequisites !== undefined) {
      formData.append('prerequisites', JSON.stringify(data.prerequisites));
    }
    if (data.admission_requirements !== undefined) {
      formData.append('admission_requirements', JSON.stringify(data.admission_requirements));
    }
    if (data.career_opportunities !== undefined) {
      formData.append('career_opportunities', JSON.stringify(data.career_opportunities));
    }
    if (data.program_details !== undefined) {
      formData.append('program_details', JSON.stringify(data.program_details));
    }
    if (data.curriculum !== undefined) {
      formData.append('curriculum', JSON.stringify(data.curriculum));
    }
    
    // Booléens
    if (data.is_active !== undefined) {
      formData.append('is_active', data.is_active ? '1' : '0');
    }
    if (data.is_featured !== undefined) {
      formData.append('is_featured', data.is_featured ? '1' : '0');
    }
    
    // Image (seulement si nouvelle image)
    if (data.image) {
      formData.append('image', data.image);
    }

    const response = await fetch(`${this.baseURL}/admin/content/university-programs/${id}`, {
      method: 'POST',
      body: formData,
      headers: this.getAuthHeaders()
    });

    const result = await this.handleResponse<UniversityProgramResponse>(response);
    return result.data;
  }

  async deleteProgram(id: number): Promise<void> {
    const response = await fetch(`${this.baseURL}/admin/content/university-programs/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });

    await this.handleResponse<{ message: string }>(response);
  }

  async getProgram(id: number): Promise<UniversityProgram> {
    const response = await fetch(`${this.baseURL}/admin/content/university-programs/${id}`, {
      headers: this.getAuthHeaders()
    });

    const result = await this.handleResponse<UniversityProgramResponse>(response);
    return result.data;
  }
}

export const universityService = new UniversityService();