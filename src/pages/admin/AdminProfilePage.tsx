import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Shield } from 'lucide-react';

const AdminProfilePage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-500">Utilisateur non trouvé</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
          <p className="text-gray-600 mt-2">
            Informations de votre compte administrateur
          </p>
        </div>
        <button
          className="bg-crec-gold hover:bg-crec-gold/80 text-white font-semibold px-4 py-2 rounded shadow"
          onClick={() => alert('Fonction de modification à implémenter')}
        >
          Modifier le profil
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Informations personnelles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Informations personnelles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Prénom</label>
              <p className="text-lg">{user.firstname || 'Non défini'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Nom</label>
              <p className="text-lg">{user.lastname || 'Non défini'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-lg flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                {user.email}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Rôles et permissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Rôles et permissions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Rôles</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {user.roles && user.roles.length > 0 ? (
                  user.roles.map((role, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {role}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">Aucun rôle défini</span>
                )}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Statut</label>
              <p className="text-lg">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${
                  user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {user.isActive ? 'Actif' : 'Inactif'}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminProfilePage;
