import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Création de l'instance Axios avec la configuration de base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur requête : ajoute automatiquement le token JWT à chaque requête protégée
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      // S'assure que headers existe bien
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur réponse : gestion globale des erreurs (notamment 401)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Gestion des erreurs 401 (non autorisé)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // ➔ Ici, tu pourrais gérer un refresh_token si tu en implémentes un plus tard
      // const refreshToken = localStorage.getItem('refresh_token');
      // const response = await api.post('/auth/refresh-token', { refreshToken });
      // localStorage.setItem('auth_token', response.data.access_token);
      // return api(originalRequest);

      // Si pas de refresh, déconnecte l'utilisateur et efface le token
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_info');
      // ➔ Tu peux déclencher une redirection ici, exemple :
      // window.location.href = '/admin/login';
    }

    return Promise.reject(error);
  }
);

export default api;
