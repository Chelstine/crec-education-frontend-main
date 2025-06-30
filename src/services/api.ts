import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Création de l'instance Axios avec la configuration de base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteurs pour gérer les tokens JWT d'authentification
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Gestion des erreurs d'authentification (401)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // On pourrait ajouter ici une logique de rafraîchissement de token
        // const refreshToken = localStorage.getItem('refresh_token');
        // const response = await api.post('/auth/refresh-token', { refreshToken });
        // localStorage.setItem('auth_token', response.data.accessToken);
        // return api(originalRequest);
      } catch (refreshError) {
        // En cas d'échec du rafraîchissement, déconnecter l'utilisateur
        localStorage.removeItem('auth_token');
        // Redirection vers la page de connexion (à implémenter)
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
