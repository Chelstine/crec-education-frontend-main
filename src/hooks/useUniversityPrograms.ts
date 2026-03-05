// hooks/useUniversityPrograms.ts

import { useState, useEffect } from 'react';
import { UniversityProgram, PublicUniversityProgram } from '@/types/university';
import { universityService } from '@/services/universityService';

export const useUniversityPrograms = () => {
  const [data, setData] = useState<PublicUniversityProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrograms = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const programs = await universityService.getPublicPrograms();
      setData(programs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  return { data, isLoading, error, refetch: fetchPrograms };
};

export const useAdminUniversityPrograms = () => {
  const [programs, setPrograms] = useState<UniversityProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrograms = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await universityService.getAdminPrograms();
      setPrograms(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  const createProgram = async (data: any) => {
    try {
      const newProgram = await universityService.createProgram(data);
      setPrograms(prev => [...prev, newProgram]);
      return newProgram;
    } catch (err) {
      throw err;
    }
  };

  const updateProgram = async (id: number, data: any) => {
    try {
      const updatedProgram = await universityService.updateProgram(id, data);
      setPrograms(prev => prev.map(p => p.id === id ? updatedProgram : p));
      return updatedProgram;
    } catch (err) {
      throw err;
    }
  };

  const deleteProgram = async (id: number) => {
    try {
      await universityService.deleteProgram(id);
      setPrograms(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  return {
    programs,
    isLoading,
    error,
    refetch: fetchPrograms,
    createProgram,
    updateProgram,
    deleteProgram
  };
};