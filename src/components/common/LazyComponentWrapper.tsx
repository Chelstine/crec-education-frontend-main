import React, { Suspense } from 'react';
import { ErrorBoundary } from './';

interface LazyComponentWrapperProps {
  children: React.ReactNode;
}

/**
 * Wrapper pour les composants chargés avec React.lazy() qui combine :
 * 1. Suspense - pour afficher un fallback pendant le chargement
 * 2. ErrorBoundary - pour capturer les erreurs de rendu
 */
const LazyComponentWrapper: React.FC<LazyComponentWrapperProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <Suspense 
        fallback={
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

export default LazyComponentWrapper;
