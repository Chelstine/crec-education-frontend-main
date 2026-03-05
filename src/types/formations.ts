// src/types/formation.ts

export interface Formation {
  id?: number;
  name: string;
  slug?: string;
  description?: string;
  long_description?: string;
  duration?: string;
  schedule?: string;
  prerequisites?: string;
  instructor?: string;
  start_date?: string;
  end_date?: string;
  category_id?: number;
  requirements?: string[];
  levels?: string[];
  syllabus?: string[];
  price?: number;
  duration_hours?: number;
  max_participants?: number;
  is_active?: boolean;
  requires_payment?: boolean;
  sort_order?: number;
  image?: string;
  instructor_name?: string;
  created_at?: string;
  updated_at?: string;
  
  // Champs pour l'upload
  imageFile?: File;
  previewUrl?: string;
}

export interface CreateFormationData {
  name: string;
  description?: string;
  long_description?: string;
  duration?: string;
  schedule?: string;
  prerequisites?: string;
  instructor?: string;
  start_date?: string;
  end_date?: string;
  category_id?: number;
  requirements?: string;
  levels?: string;
  syllabus?: string;
  price?: number;
  duration_hours?: number;
  max_participants?: number;
  is_active?: boolean;
  requires_payment?: boolean;
  sort_order?: number;
  image?: string;
  instructor_name?: string;
  
  // Champs pour l'upload
  imageFile?: File;
}

export interface UpdateFormationData extends CreateFormationData {
  id: number;
}

export interface FormationResponse {
  data: Formation[];
  message?: string;
  status: boolean;
}

export interface SingleFormationResponse {
  data: Formation;
  message?: string;
  status: boolean;
}