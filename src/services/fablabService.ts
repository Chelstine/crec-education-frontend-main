// services/fablabService.ts
import { apiClient } from '../lib/api';
import { 
  Machine, 
  Project, 
  Subscription, 
  Training, 
  Service, 
  FablabStats,
  CreateMachineData,
  CreateProjectData,
  CreateSubscriptionData,
  CreateTrainingData,
  CreateServiceData
} from '../types/fablab';

class FablabService {
  // Helper function to properly serialize arrays for Laravel
  private appendFormData(formData: FormData, key: string, value: any) {
    if (key === 'image' && value instanceof File) {
      formData.append('image', value);
    } else if (Array.isArray(value)) {
      // Use Laravel array notation instead of JSON.stringify
      value.forEach((item, index) => {
        formData.append(`${key}[${index}]`, item.toString());
      });
    } else if (typeof value === 'boolean') {
      formData.append(key, value ? '1' : '0');
    } else if (value !== undefined && value !== null) {
      formData.append(key, value.toString());
    }
  }

  // Machines
  async getMachines(): Promise<Machine[]> {
    try {
      const response = await apiClient.get('/fablab/machines');
      const machines = response.data?.data || response.data || [];
      
      // Ensure array fields are always arrays
      return machines.map((machine: any) => ({
        ...machine,
        features: Array.isArray(machine.features) ? machine.features : [],
        specifications: Array.isArray(machine.specifications) ? machine.specifications : [],
        safety_instructions: Array.isArray(machine.safety_instructions) ? machine.safety_instructions : []
      }));
    } catch (error) {
      console.error('Error fetching machines:', error);
      return [];
    }
  }

  async getMachine(id: number): Promise<Machine> {
    const response = await apiClient.get(`/fablab/machines/${id}`);
    return response.data?.data || response.data;
  }

  async createMachine(data: CreateMachineData): Promise<Machine> {
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
      this.appendFormData(formData, key, value);
    });

    const response = await apiClient.post('/admin/fablab/machines', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data?.data || response.data;
  }

  async updateMachine(id: number, data: Partial<CreateMachineData>): Promise<Machine> {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    
    Object.entries(data).forEach(([key, value]) => {
      this.appendFormData(formData, key, value);
    });

    const response = await apiClient.post(`/admin/fablab/machines/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data?.data || response.data;
  }

  async deleteMachine(id: number): Promise<void> {
    await apiClient.delete(`/admin/fablab/machines/${id}`);
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    try {
      const response = await apiClient.get('/fablab/projects');
      const projects = response.data?.data || response.data || [];
      
      // Ensure array fields are always arrays
      return projects.map((project: any) => ({
        ...project,
        tags: Array.isArray(project.tags) ? project.tags : [],
        materials_needed: Array.isArray(project.materials_needed) ? project.materials_needed : [],
        tools_required: Array.isArray(project.tools_required) ? project.tools_required : []
      }));
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  }

  async getProject(id: number): Promise<Project> {
    const response = await apiClient.get(`/fablab/projects/${id}`);
    return response.data?.data || response.data;
  }

  async getPublishedProjects(): Promise<Project[]> {
    try {
      const response = await apiClient.get('/fablab/projects/published');
      const projects = response.data?.data || response.data || [];
      
      // Ensure array fields are always arrays
      return projects.map((project: any) => ({
        ...project,
        tags: Array.isArray(project.tags) ? project.tags : [],
        materials_needed: Array.isArray(project.materials_needed) ? project.materials_needed : [],
        tools_required: Array.isArray(project.tools_required) ? project.tools_required : []
      }));
    } catch (error) {
      console.error('Error fetching published projects:', error);
      return [];
    }
  }

  async createProject(data: CreateProjectData): Promise<Project> {
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
      this.appendFormData(formData, key, value);
    });

    const response = await apiClient.post('/admin/fablab/projects', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data?.data || response.data;
  }

  async updateProject(id: number, data: Partial<CreateProjectData>): Promise<Project> {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    
    Object.entries(data).forEach(([key, value]) => {
      this.appendFormData(formData, key, value);
    });

    const response = await apiClient.post(`/admin/fablab/projects/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data?.data || response.data;
  }

  async deleteProject(id: number): Promise<void> {
    await apiClient.delete(`/admin/fablab/projects/${id}`);
  }

  // Subscriptions
  async getSubscriptions(): Promise<Subscription[]> {
    try {
      const response = await apiClient.get('/fablab/subscriptions');
      return response.data?.data || response.data || [];
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      return [];
    }
  }

  async getActiveSubscriptions(): Promise<Subscription[]> {
    try {
      const response = await apiClient.get('/fablab/subscriptions/active');
      const subscriptions = response.data?.data || response.data || [];
      
      // Ensure array fields are always arrays
      return subscriptions.map((subscription: any) => ({
        ...subscription,
        features: Array.isArray(subscription.features) ? subscription.features : [],
        machine_access: Array.isArray(subscription.machine_access) ? subscription.machine_access : []
      }));
    } catch (error) {
      console.error('Error fetching active subscriptions:', error);
      return [];
    }
  }

  async createSubscription(data: CreateSubscriptionData): Promise<Subscription> {
    const response = await apiClient.post('/admin/fablab/subscriptions', data);
    return response.data?.data || response.data;
  }

  async updateSubscription(id: number, data: Partial<CreateSubscriptionData>): Promise<Subscription> {
    const response = await apiClient.put(`/admin/fablab/subscriptions/${id}`, data);
    return response.data?.data || response.data;
  }

  async deleteSubscription(id: number): Promise<void> {
    await apiClient.delete(`/admin/fablab/subscriptions/${id}`);
  }

  // Trainings
  async getTrainings(): Promise<Training[]> {
    try {
      const response = await apiClient.get('/fablab/trainings');
      return response.data?.data || response.data || [];
    } catch (error) {
      console.error('Error fetching trainings:', error);
      return [];
    }
  }

  async getActiveTrainings(): Promise<Training[]> {
    try {
      const response = await apiClient.get('/fablab/trainings/active');
      return response.data?.data || response.data || [];
    } catch (error) {
      console.error('Error fetching active trainings:', error);
      return [];
    }
  }

  async createTraining(data: CreateTrainingData): Promise<Training> {
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
      this.appendFormData(formData, key, value);
    });

    const response = await apiClient.post('/admin/fablab/trainings', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data?.data || response.data;
  }

  async updateTraining(id: number, data: Partial<CreateTrainingData>): Promise<Training> {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    
    Object.entries(data).forEach(([key, value]) => {
      this.appendFormData(formData, key, value);
    });

    const response = await apiClient.post(`/admin/fablab/trainings/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data?.data || response.data;
  }

  async deleteTraining(id: number): Promise<void> {
    await apiClient.delete(`/admin/fablab/trainings/${id}`);
  }

  // Services
  async getServices(): Promise<Service[]> {
    try {
      const response = await apiClient.get('/fablab/services');
      return response.data?.data || response.data || [];
    } catch (error) {
      console.error('Error fetching services:', error);
      return [];
    }
  }

  async getActiveServices(): Promise<Service[]> {
    try {
      const response = await apiClient.get('/fablab/services/active');
      return response.data?.data || response.data || [];
    } catch (error) {
      console.error('Error fetching active services:', error);
      return [];
    }
  }

  async createService(data: CreateServiceData): Promise<Service> {
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
      this.appendFormData(formData, key, value);
    });

    const response = await apiClient.post('/admin/fablab/services', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data?.data || response.data;
  }

  async updateService(id: number, data: Partial<CreateServiceData>): Promise<Service> {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    
    Object.entries(data).forEach(([key, value]) => {
      this.appendFormData(formData, key, value);
    });

    const response = await apiClient.post(`/admin/fablab/services/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data?.data || response.data;
  }

  async deleteService(id: number): Promise<void> {
    await apiClient.delete(`/admin/fablab/services/${id}`);
  }

  // Stats
  async getStats(): Promise<FablabStats> {
    try {
      const response = await apiClient.get('/fablab/stats');
      return response.data?.data || response.data || {};
    } catch (error) {
      console.error('Error fetching stats:', error);
      return {} as FablabStats;
    }
  }
}

export const fablabService = new FablabService();