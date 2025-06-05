// Development utility to test API connectivity
// This file helps verify that the frontend can communicate with the backend

import { apiClient, API_ENDPOINTS, handleApiError } from '@/services/api';

export class ApiTestService {
  static async testConnection() {
    try {
      console.log('🔄 Testing API connection...');
      console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);
      
      const response = await apiClient.get('/health');
      console.log('✅ API connection successful:', response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('❌ API connection failed:', handleApiError(error));
      return { success: false, error: handleApiError(error) };
    }
  }
  

  static async testEndpoints() {
    const endpoints = [
      { name: 'Projects', url: API_ENDPOINTS.projects.getAll },
      { name: 'Events', url: API_ENDPOINTS.events.getAll },
      { name: 'News', url: API_ENDPOINTS.news.getAll },
      { name: 'Formations', url: API_ENDPOINTS.formations.getAll },
    ];

    console.log('🔄 Testing API endpoints...');
    
    for (const endpoint of endpoints) {
      try {
        console.log(`Testing ${endpoint.name}...`);
        const response = await apiClient.get(endpoint.url);
        console.log(`✅ ${endpoint.name}: OK`);
      } catch (error) {
        console.error(`❌ ${endpoint.name}: ${handleApiError(error)}`);
      }
    }
  }

  static getEnvironmentInfo() {
    return {
      apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
      appEnv: import.meta.env.VITE_APP_ENV,
      mode: import.meta.env.MODE,
      dev: import.meta.env.DEV,
      prod: import.meta.env.PROD,
    };
  }
}

// Global function for console testing
if (typeof window !== 'undefined') {
  (window as any).testApi = ApiTestService;
}
