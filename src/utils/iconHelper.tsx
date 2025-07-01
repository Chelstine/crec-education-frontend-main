import React from 'react';

/**
 * Utilitaire pour rendre des icônes en toute sécurité
 * Évite le problème "Cannot convert object to primitive value"
 * 
 * @param IconComponent - Le composant d'icône à rendre
 * @param props - Les props à passer à l'icône (className, size, etc.)
 * @returns Element JSX ou null si pas d'icône
 */
export const renderIcon = (IconComponent: React.ComponentType<any> | undefined | null, props = {}) => {
  if (!IconComponent) return null;
  return React.createElement(IconComponent, props);
};
