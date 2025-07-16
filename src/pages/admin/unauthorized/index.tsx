import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

const UnauthorizedPage: React.FC = () => {
  const { isSuperAdmin } = useAuth();

  // Si l'utilisateur est super admin, il a accès à cette page
  if (isSuperAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-3xl font-bold text-crec-darkblue mb-4">Accès autorisé</h1>
        <p className="text-lg text-slate-700 mb-2">Vous êtes Super Admin, vous avez accès à cette page.</p>
      </div>
    );
  }

  // Sinon, afficher le message d'accès refusé
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Accès refusé</h1>
      <p className="text-lg text-slate-700 mb-2">Vous n'avez pas les droits nécessaires pour accéder à cette page.</p>
    </div>
  );
};

export default UnauthorizedPage;
