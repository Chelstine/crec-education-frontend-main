import React, { Suspense } from 'react';
import { ErrorBoundary } from '../components/common';

/**
 * Utilitaire pour créer un composant lazy-loaded avec ErrorBoundary et Suspense
 * @param importFunction - Fonction d'import dynamique (ex: () => import('./MonComposant'))
 * @returns Composant React wrapped avec ErrorBoundary et Suspense
 */
export function createLazyComponent(importFunction: () => Promise<any>) {
  const LazyComponent = React.lazy(importFunction);
  
  return (props: any) => (
    <ErrorBoundary>
      <Suspense 
        fallback={
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }
      >
        <LazyComponent {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}
