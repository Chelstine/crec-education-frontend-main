// types/fablab.ts

export interface Machine {
  id: number;
  name: string;
  code: string;
  type: string;
  description?: string;
  features: string[];
  image_url?: string;
  hourly_rate: number;
  status: 'available' | 'maintenance' | 'unavailable';
  requires_training: boolean;
  max_booking_hours: number;
  location?: string;
  brand?: string;
  model?: string;
  specifications: string[];
  safety_instructions: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  title: string;
  description?: string;
  category: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  duration?: string;
  instructions?: string;
  materials_needed: string[];
  tools_required: string[];
  image_url?: string;
  estimated_cost?: number;
  skill_level: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  is_published: boolean;
  featured: boolean;
  downloads: number;
  views: number;
  created_by?: number;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: number;
  name: string;
  slug: string;
  description?: string;
  price: number;
  duration_months: number;
  features: string[];
  type: 'STUDENT' | 'PROFESSIONAL' | 'ENTERPRISE' | 'BASIC' | 'PREMIUM';
  max_hours_per_month?: number;
  machine_access: string[];
  training_included: boolean;
  priority_booking: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Training {
  id: number;
  name: string;
  slug: string;
  description?: string;
  price: number;
  duration_hours: number;
  max_participants: number;
  requirements: string[];
  what_you_learn: string[];
  materials_included: string[];
  is_active: boolean;
  sort_order: number;
  instructor?: string;
  difficulty_level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  category: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: number;
  name: string;
  slug: string;
  description?: string;
  price: number;
  service_type: 'prototypage' | 'consultation' | 'maintenance' | 'formation_privee' | 'autre';
  duration_estimated?: string;
  requirements: string[];
  deliverables: string[];
  is_active: boolean;
  sort_order: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface FablabStats {
  total_machines: number;
  available_machines: number;
  total_projects: number;
  published_projects: number;
  total_subscriptions: number;
  active_subscriptions: number;
  total_trainings: number;
  total_services: number;
}

// Types pour les formulaires
export interface CreateMachineData {
  name: string;
  code: string;
  type: string;
  description?: string;
  features: string[];
  image?: File;
  hourly_rate: number;
  status: 'available' | 'maintenance' | 'unavailable';
  requires_training: boolean;
  max_booking_hours: number;
  location?: string;
  brand?: string;
  model?: string;
  specifications: string[];
  safety_instructions: string[];
  is_active: boolean;
}

export interface CreateProjectData {
  title: string;
  description?: string;
  category: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  duration?: string;
  instructions?: string;
  materials_needed: string[];
  tools_required: string[];
  image?: File;
  estimated_cost?: number;
  skill_level: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  is_published: boolean;
  featured: boolean;
}

export interface CreateSubscriptionData {
  name: string;
  slug: string;
  description?: string;
  price: number;
  duration_months: number;
  features: string[];
  type: 'STUDENT' | 'PROFESSIONAL' | 'ENTERPRISE' | 'BASIC' | 'PREMIUM';
  max_hours_per_month?: number;
  machine_access: string[];
  training_included: boolean;
  priority_booking: boolean;
  is_active: boolean;
  sort_order: number;
}

export interface CreateTrainingData {
  name: string;
  slug: string;
  description?: string;
  price: number;
  duration_hours: number;
  max_participants: number;
  requirements: string[];
  what_you_learn: string[];
  materials_included: string[];
  is_active: boolean;
  sort_order: number;
  instructor?: string;
  difficulty_level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  category: string;
  image?: File;
}

export interface CreateServiceData {
  name: string;
  slug: string;
  description?: string;
  price: number;
  service_type: 'prototypage' | 'consultation' | 'maintenance' | 'formation_privee' | 'autre';
  duration_estimated?: string;
  requirements: string[];
  deliverables: string[];
  is_active: boolean;
  sort_order: number;
  image?: File;
}