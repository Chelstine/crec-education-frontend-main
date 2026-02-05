// hooks/usePartners.ts
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { partnersService, Partner, CreatePartnerData } from '@/services/partnersService';

export const usePartners = () => {
  const [data, setData] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const partners = await partnersService.getPublicPartners();
        setData(partners);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        console.error('Error in usePartners:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartners();
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch: () => {
      const fetchPartners = async () => {
        try {
          setIsLoading(true);
          setError(null);
          const partners = await partnersService.getPublicPartners();
          setData(partners);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        } finally {
          setIsLoading(false);
        }
      };
      fetchPartners();
    }
  };
};

export const useFeaturedPartners = () => {
  const { data, isLoading, error, refetch } = usePartners();
  
  const featuredPartners = data.filter(partner => partner.is_featured && partner.is_active);
  
  return {
    data: featuredPartners,
    isLoading,
    error,
    refetch
  };
};

export const usePartnersByType = (type: Partner['type']) => {
  const { data, isLoading, error, refetch } = usePartners();
  
  const filteredPartners = data.filter(partner => 
    partner.type === type && partner.is_active
  );
  
  return {
    data: filteredPartners,
    isLoading,
    error,
    refetch
  };
};

// Admin hooks
export const useAdminPartners = () => {
  return useQuery({
    queryKey: ['admin-partners'],
    queryFn: async () => {
      try {
        return await partnersService.getAdminPartners();
      } catch (err) {
        console.error('Error in useAdminPartners:', err);
        throw err;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Mutation hooks pour l'administration
export const useCreatePartner = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreatePartnerData) => partnersService.createPartner(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-partners'] });
      queryClient.invalidateQueries({ queryKey: ['partners'] });
    },
  });
};

export const useUpdatePartner = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreatePartnerData> }) => 
      partnersService.updatePartner(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-partners'] });
      queryClient.invalidateQueries({ queryKey: ['partners'] });
    },
  });
};

export const useDeletePartner = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => partnersService.deletePartner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-partners'] });
      queryClient.invalidateQueries({ queryKey: ['partners'] });
    },
  });
};
