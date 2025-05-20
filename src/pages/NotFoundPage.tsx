
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-crec-offwhite flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-crec-gold">404</h1>
        <h2 className="text-2xl font-semibold text-crec-darkblue mt-4 mb-6">Page non trouvée</h2>
        <p className="text-crec-darkgray mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
          Veuillez vérifier l'URL ou retourner à l'accueil.
        </p>
        <Button asChild variant="default" className="bg-crec-darkblue hover:bg-crec-blue">
          <Link to="/">Retour à l'accueil</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
