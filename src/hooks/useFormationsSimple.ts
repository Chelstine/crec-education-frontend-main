// Hook simple et robuste pour les formations
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Formation } from '@/types/formations';

// Configuration API simple
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

console.log('🔧 Hook API config:', { API_URL });

// Fonction simple pour récupérer les formations
const fetchOpenFormations = async (): Promise<Formation[]> => {
  console.log('🔄 Fetching formations from:', `${API_URL}/formations/public`);

  try {
    const response = await axios.get(`${API_URL}/formations/public`, {
      headers: { 'Accept': 'application/json' },
      timeout: 10000
    });

    console.log('✅ Formations response:', response.data);
    return response.data.data || [];
  } catch (error) {
    console.error('❌ Error fetching formations:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    throw new Error(`Erreur API: ${errorMessage}`);
  }
};

// Hook simple pour les formations ouvertes
export const useOpenFormationsSimple = () => {
  return useQuery({
    queryKey: ['formations', 'open'],
    queryFn: fetchOpenFormations,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: 1000
  });
};
