import { AdminRole, AdminPermissions } from '@/types';

/**
 * Service de gestion des permissions administratives
 */

// Définition des permissions par rôle
export const ADMIN_PERMISSIONS: Record<AdminRole, AdminPermissions> = {
  super_admin: {
    role: 'super_admin',
    description: 'Accès complet à toutes les fonctionnalités du système',
    permissions: [
      // Gestion des utilisateurs et admins
      'users.create',
      'users.read',
      'users.update',
      'users.delete',
      'admins.create',
      'admins.read',
      'admins.update',
      'admins.delete',
      'roles.manage',
      
      // Gestion du contenu
      'content.create',
      'content.read',
      'content.update',
      'content.delete',
      'pages.manage',
      'fablab.manage',
      'formations.manage',
      'about.manage',
      'galerie.manage',
      'bibliotheque.manage',
      
      // Gestion des inscriptions
      'inscriptions.read',
      'inscriptions.update',
      'inscriptions.delete',
      'inscriptions.approve',
      'inscriptions.reject',
      'inscriptions.export',
      
      // Gestion des réservations
      'reservations.read',
      'reservations.update',
      'reservations.delete',
      'machines.manage',
      'pricing.manage',
      
      // Administration système
      'system.config',
      'system.backup',
      'system.logs',
      'analytics.view'
    ]
  },
  
  content_admin: {
    role: 'content_admin',
    description: 'Gestion du contenu des pages (sauf inscriptions)',
    permissions: [
      // Gestion du contenu uniquement
      'content.create',
      'content.read',
      'content.update',
      'content.delete',
      'pages.manage',
      'fablab.manage',
      'formations.manage',
      'about.manage',
      'galerie.manage',
      'bibliotheque.manage',
      
      // Gestion des réservations
      'reservations.read',
      'reservations.update',
      'machines.manage',
      'pricing.manage',
      
      // Lecture seule pour les utilisateurs
      'users.read',
      
      // Analytics de base
      'analytics.view'
    ]
  },
  
  inscription_admin: {
    role: 'inscription_admin',
    description: 'Gestion des inscriptions uniquement',
    permissions: [
      // Gestion des inscriptions uniquement
      'inscriptions.read',
      'inscriptions.update',
      'inscriptions.delete',
      'inscriptions.approve',
      'inscriptions.reject',
      'inscriptions.export',
      
      // Lecture seule pour les utilisateurs inscrits
      'users.read',
      
      // Analytics des inscriptions
      'inscriptions.analytics'
    ]
  }
};

/**
 * Vérifie si un utilisateur a une permission spécifique
 */
export const hasPermission = (userRoles: AdminRole[], permission: string): boolean => {
  return userRoles.some(role => {
    const rolePermissions = ADMIN_PERMISSIONS[role];
    return rolePermissions?.permissions.includes(permission);
  });
};

/**
 * Vérifie si un utilisateur a au moins un des rôles spécifiés
 */
export const hasRole = (userRoles: AdminRole[], requiredRoles: AdminRole[]): boolean => {
  console.log('Checking roles - User roles:', userRoles, 'Required roles:', requiredRoles);
  // Convertir toutes les chaînes en minuscules pour la comparaison pour éviter les problèmes de casse
  const normalizedUserRoles = userRoles.map(r => String(r).toLowerCase());
  const normalizedRequiredRoles = requiredRoles.map(r => String(r).toLowerCase());
  console.log('Normalized - User:', normalizedUserRoles, 'Required:', normalizedRequiredRoles);
  const result = normalizedRequiredRoles.some(role => normalizedUserRoles.includes(role));
  console.log('Role check result:', result);
  return result;
};

/**
 * Vérifie si un utilisateur est super admin
 */
export const isSuperAdmin = (userRoles: AdminRole[]): boolean => {
  return userRoles.includes('super_admin');
};

/**
 * Vérifie si un utilisateur peut accéder à une section spécifique
 */
export const canAccessSection = (userRoles: AdminRole[], section: string): boolean => {
  switch (section) {
    case 'users':
    case 'admins':
    case 'system':
      return isSuperAdmin(userRoles);
      
    case 'content':
    case 'pages':
    case 'fablab':
    case 'formations':
    case 'about':
    case 'galerie':
    case 'bibliotheque':
    case 'reservations':
      return hasRole(userRoles, ['super_admin', 'content_admin']);
      
    case 'inscriptions':
      return hasRole(userRoles, ['super_admin', 'inscription_admin']);
      
    default:
      return false;
  }
};

/**
 * Récupère toutes les permissions d'un utilisateur
 */
export const getUserPermissions = (userRoles: AdminRole[]): string[] => {
  const allPermissions = new Set<string>();
  
  userRoles.forEach(role => {
    const rolePermissions = ADMIN_PERMISSIONS[role];
    if (rolePermissions) {
      rolePermissions.permissions.forEach(permission => {
        allPermissions.add(permission);
      });
    }
  });
  
  return Array.from(allPermissions);
};

/**
 * Vérifie les permissions pour les routes
 */
export const checkRoutePermission = (userRoles: AdminRole[], routePath: string): boolean => {
  // Routes accessibles seulement aux super admins
  const superAdminRoutes = [
    '/admin/users',
    '/admin/admins',
    '/admin/system',
    '/admin/roles'
  ];
  
  // Routes accessibles aux content admins et super admins
  const contentAdminRoutes = [
    '/admin/contenus',
    '/admin/fablab',
    '/admin/formations',
    '/admin/about',
    '/admin/galerie',
    '/admin/bibliotheque',
    '/admin/reservations',
    '/admin/machines',
    '/admin/pricing'
  ];
  
  // Routes accessibles aux inscription admins et super admins
  const inscriptionAdminRoutes = [
    '/admin/inscriptions'
  ];
  
  // Routes communes à tous les admins
  const commonRoutes = [
    '/admin/dashboard',
    '/admin/profile'
  ];
  
  if (commonRoutes.some(route => routePath.startsWith(route))) {
    return userRoles.length > 0; // Tout admin peut accéder
  }
  
  if (superAdminRoutes.some(route => routePath.startsWith(route))) {
    return isSuperAdmin(userRoles);
  }
  
  if (contentAdminRoutes.some(route => routePath.startsWith(route))) {
    return hasRole(userRoles, ['super_admin', 'content_admin']);
  }
  
  if (inscriptionAdminRoutes.some(route => routePath.startsWith(route))) {
    return hasRole(userRoles, ['super_admin', 'inscription_admin']);
  }
  
  return false;
};
