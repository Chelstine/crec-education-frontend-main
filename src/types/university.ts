// types/university.ts

// Interface pour les données publiques (UniversityPage)
export interface PublicUniversityProgram {
  id: number;
  name: string; // API publique utilise 'name'
  slug?: string;
  description: string;
  level: 'CERTIFICATE' | 'DIPLOMA' | 'BACHELOR' | 'MASTER' | 'DOCTORATE';
  duration: string;
  capacity: number;
  tuition_fee: number; // API publique utilise 'tuition_fee'
  currency?: string;
  image?: string;
  requirements?: string[]; // API publique utilise 'requirements'
  admission_requirements?: string[];
  career_opportunities?: string[];
  program_details?: string[];
  curriculum?: string[];
  is_active: boolean;
  is_featured: boolean;
  registration_deadline?: string;
  start_date?: string;
  created_at?: string;
  updated_at?: string;
}

// Interface pour l'admin (AdminContenusISTMPage)
export interface UniversityProgram {
  id: number;
  title: string;
  slug?: string;
  description: string;
  level: 'LICENCE' | 'MASTER' | 'DOCTORAT';
  duration: string;
  capacity: number;
  annual_fee: number;
  image?: string;
  prerequisites?: string[];
  admission_requirements?: string[];
  career_opportunities?: string[];
  program_details?: string[];
  curriculum?: string[];
  is_active: boolean;
  is_featured: boolean;
  registration_deadline?: string;
  start_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateUniversityProgramRequest {
  title: string;
  slug?: string;
  description: string;
  level: 'LICENCE' | 'MASTER' | 'DOCTORAT';
  duration: string;
  capacity: number;
  annual_fee: number;
  prerequisites?: string[];
  admission_requirements?: string[];
  career_opportunities?: string[];
  program_details?: string[];
  curriculum?: string[];
  is_active: boolean;
  is_featured: boolean;
  registration_deadline?: string;
  start_date?: string;
  image?: File;
}

export interface UpdateUniversityProgramRequest {
  title?: string;
  slug?: string;
  description?: string;
  level?: 'LICENCE' | 'MASTER' | 'DOCTORAT';
  duration?: string;
  capacity?: number;
  annual_fee?: number;
  prerequisites?: string[];
  admission_requirements?: string[];
  career_opportunities?: string[];
  program_details?: string[];
  curriculum?: string[];
  is_active?: boolean;
  is_featured?: boolean;
  registration_deadline?: string;
  start_date?: string;
  image?: File;
}

export interface UniversityProgramResponse {
  data: UniversityProgram;
  message: string;
}

export interface UniversityProgramsResponse {
  data: UniversityProgram[];
  message: string;
  pagination?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface PublicUniversityProgramsResponse {
  success: boolean;
  data: PublicUniversityProgram[];
}