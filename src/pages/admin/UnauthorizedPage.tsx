import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Shield, Home, ArrowLeft } from 'lucide-react';

const UnauthorizedPage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <div className="mx-auto h-24 w-24 bg-red-100 rounded-full flex items-center justify-center">
            <Shield className="h-12 w-12 text-red-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Accès non autorisé
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </p>
        </div>

        {user && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Utilisateur connecté
            </h3>
            <p className="text-sm text-gray-600 mb-1">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-gray-500 mb-3">
              {user.email}
            </p>
            <div className="flex flex-wrap gap-1">
              {user.roles.map((role, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {role.replace('_', ' ').toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="outline">
              <Link to="/admin/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour au tableau de bord
              </Link>
            </Button>
            <Button asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Accueil du site
              </Link>
            </Button>
          </div>
          
          <Button
            variant="ghost"
            onClick={logout}
            className="text-red-600 hover:text-red-800"
          >
            Se déconnecter
          </Button>
        </div>

        <div className="text-xs text-gray-500">
          <p>
            Si vous pensez qu'il s'agit d'une erreur, contactez l'administrateur système.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
