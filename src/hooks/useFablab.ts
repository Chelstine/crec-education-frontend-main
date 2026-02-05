// hooks/useFablab.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fablabService } from '@/services/fablabService';
import { 
  Machine, 
  Project, 
  Subscription, 
  Training, 
  Service,
  CreateMachineData,
  CreateProjectData,
  CreateSubscriptionData,
  CreateTrainingData,
  CreateServiceData
} from '@/types/fablab';

// Machines Hooks
export const useFablabMachines = () => {
  return useQuery({
    queryKey: ['fablab', 'machines'],
    queryFn: () => fablabService.getMachines(),
  });
};

export const useFablabMachine = (id: number) => {
  return useQuery({
    queryKey: ['fablab', 'machines', id],
    queryFn: () => fablabService.getMachine(id),
    enabled: !!id,
  });
};

export const useCreateMachine = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateMachineData) => fablabService.createMachine(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fablab', 'machines'] });
      queryClient.invalidateQueries({ queryKey: ['fablab', 'stats'] });
    },
  });
};

export const useUpdateMachine = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreateMachineData> }) => 
      fablabService.updateMachine(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fablab', 'machines'] });
      queryClient.invalidateQueries({ queryKey: ['fablab', 'stats'] });
    },
  });
};

export const useDeleteMachine = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => fablabService.deleteMachine(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fablab', 'machines'] });
      queryClient.invalidateQueries({ queryKey: ['fablab', 'stats'] });
    },
  });
};

// Projects Hooks
export const useFablabProjects = () => {
  return useQuery({
    queryKey: ['fablab', 'projects'],
    queryFn: () => fablabService.getProjects(),
  });
};

export const useFablabPublishedProjects = () => {
  return useQuery({
    queryKey: ['fablab', 'projects', 'published'],
    queryFn: () => fablabService.getPublishedProjects(),
  });
};

export const useFablabProject = (id: number) => {
  return useQuery({
    queryKey: ['fablab', 'projects', id],
    queryFn: () => fablabService.getProject(id),
    enabled: !!id,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateProjectData) => fablabService.createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fablab', 'projects'] });
      queryClient.invalidateQueries({ queryKey: ['fablab', 'stats'] });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreateProjectData> }) => 
      fablabService.updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fablab', 'projects'] });
      queryClient.invalidateQueries({ queryKey: ['fablab', 'stats'] });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => fablabService.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fablab', 'projects'] });
      queryClient.invalidateQueries({ queryKey: ['fablab', 'stats'] });
    },
  });
};

// Subscriptions Hooks
export const useFablabSubscriptions = () => {
  return useQuery({
    queryKey: ['fablab', 'subscriptions'],
    queryFn: () => fablabService.getSubscriptions(),
  });
};

export const useFablabActiveSubscriptions = () => {
  return useQuery({
    queryKey: ['fablab', 'subscriptions', 'active'],
    queryFn: () => fablabService.getActiveSubscriptions(),
  });
};

export const useCreateSubscription = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateSubscriptionData) => fablabService.createSubscription(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fablab', 'subscriptions'] });
      queryClient.invalidateQueries({ queryKey: ['fablab', 'stats'] });
    },
  });
};

export const useUpdateSubscription = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreateSubscriptionData> }) => 
      fablabService.updateSubscription(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fablab', 'subscriptions'] });
      queryClient.invalidateQueries({ queryKey: ['fablab', 'stats'] });
    },
  });
};

export const useDeleteSubscription = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => fablabService.deleteSubscription(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fablab', 'subscriptions'] });
      queryClient.invalidateQueries({ queryKey: ['fablab', 'stats'] });
    },
  });
};

// Trainings Hooks
export const useFablabTrainings = () => {
  return useQuery({
    queryKey: ['fablab', 'trainings'],
    queryFn: () => fablabService.getTrainings(),
  });
};

export const useFablabActiveTrainings = () => {
  return useQuery({
    queryKey: ['fablab', 'trainings', 'active'],
    queryFn: () => fablabService.getActiveTrainings(),
  });
};

export const useCreateTraining = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateTrainingData) => fablabService.createTraining(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fablab', 'trainings'] });
      queryClient.invalidateQueries({ queryKey: ['fablab', 'stats'] });
    },
  });
};

export const useUpdateTraining = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreateTrainingData> }) => 
      fablabService.updateTraining(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fablab', 'trainings'] });
      queryClient.invalidateQueries({ queryKey: ['fablab', 'stats'] });
    },
  });
};

export const useDeleteTraining = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => fablabService.deleteTraining(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fablab', 'trainings'] });
      queryClient.invalidateQueries({ queryKey: ['fablab', 'stats'] });
    },
  });
};

// Services Hooks
export const useFablabServices = () => {
  return useQuery({
    queryKey: ['fablab', 'services'],
    queryFn: () => fablabService.getServices(),
  });
};

export const useFablabActiveServices = () => {
  return useQuery({
    queryKey: ['fablab', 'services', 'active'],
    queryFn: () => fablabService.getActiveServices(),
  });
};

export const useCreateService = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateServiceData) => fablabService.createService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fablab', 'services'] });
      queryClient.invalidateQueries({ queryKey: ['fablab', 'stats'] });
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreateServiceData> }) => 
      fablabService.updateService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fablab', 'services'] });
      queryClient.invalidateQueries({ queryKey: ['fablab', 'stats'] });
    },
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => fablabService.deleteService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fablab', 'services'] });
      queryClient.invalidateQueries({ queryKey: ['fablab', 'stats'] });
    },
  });
};

// Stats Hook
export const useFablabStats = () => {
  return useQuery({
    queryKey: ['fablab', 'stats'],
    queryFn: () => fablabService.getStats(),
  });
};