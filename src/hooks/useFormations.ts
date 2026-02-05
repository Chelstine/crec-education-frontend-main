// src/hooks/useFormations.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { formationService } from '@/services/formationsService';
import { Formation, CreateFormationData } from '@/types/formations';
import { toast } from 'sonner';

// Hook pour les formations ouvertes (public)
export const useOpenFormations = () => {
  return useQuery({
    queryKey: ['formations', 'open'],
    queryFn: formationService.getOpenFormations,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook pour l'administration des formations
export const useAdminFormations = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['formations', 'admin'],
    queryFn: formationService.getAllFormations,
  });

  const createFormation = useMutation({
    mutationFn: formationService.createFormation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['formations'] });
      toast.success('Formation créée avec succès');
    },
    onError: (error: any) => {
      console.error('Erreur création formation:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de la création');
    },
  });

  const updateFormation = useMutation({
    mutationFn: ({ id, formationData }: { id: number; formationData: FormData }) =>
      formationService.updateFormation(id, formationData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['formations'] });
      toast.success('Formation mise à jour avec succès');
    },
    onError: (error: any) => {
      console.error('Erreur mise à jour formation:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de la mise à jour');
    },
  });

  const deleteFormation = useMutation({
    mutationFn: formationService.deleteFormation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['formations'] });
      toast.success('Formation supprimée avec succès');
    },
    onError: (error: any) => {
      console.error('Erreur suppression formation:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de la suppression');
    },
  });

  const toggleStatus = useMutation({
    mutationFn: formationService.toggleFormationStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['formations'] });
      toast.success('Statut de la formation modifié');
    },
    onError: (error: any) => {
      console.error('Erreur changement statut:', error);
      toast.error(error.response?.data?.message || 'Erreur lors du changement de statut');
    },
  });

  return {
    ...query,
    createFormation,
    updateFormation,
    deleteFormation,
    toggleStatus,
  };
};