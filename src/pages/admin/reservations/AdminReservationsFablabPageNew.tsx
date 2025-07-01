import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Settings, 
  ArrowRight,
  CalendarDays,
  DollarSign
} from 'lucide-react';

const AdminReservationsFablabPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Réservations FabLab</h1>
        <p className="text-gray-600 mt-1">
          Gérez les réservations, machines et tarifs du FabLab
        </p>
      </div>

      {/* Cartes de navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Statistiques des réservations */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Statistiques des Réservations</h3>
                <p className="text-sm text-gray-600 font-normal">
                  Visualisez qui a réservé, quand et les statistiques d'utilisation
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-gray-500" />
                  <span>Suivi des réservations</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-gray-500" />
                  <span>Analyse d'utilisation</span>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Button 
                  onClick={() => navigate('/admin/reservations/stats')}
                  className="w-full flex items-center justify-center gap-2"
                >
                  Voir les statistiques
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gestion des machines et prix */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <Settings className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Machines et Tarifs</h3>
                <p className="text-sm text-gray-600 font-normal">
                  Gérez les machines du FabLab et configurez leurs tarifs horaires
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4 text-gray-500" />
                  <span>CRUD machines</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <span>Gestion des prix</span>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Button 
                  onClick={() => navigate('/admin/reservations/machines')}
                  className="w-full flex items-center justify-center gap-2"
                  variant="outline"
                >
                  Gérer machines et prix
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informations complémentaires */}
      <Card>
        <CardHeader>
          <CardTitle>À propos de la gestion des réservations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-600">
              Cette section vous permet de gérer tous les aspects des réservations du FabLab CREC :
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mt-3">
              <li><strong>Statistiques :</strong> Suivez l'utilisation des machines, analysez les réservations par utilisateur et générez des rapports</li>
              <li><strong>Machines :</strong> Ajoutez, modifiez ou supprimez les machines disponibles pour la réservation</li>
              <li><strong>Tarification :</strong> Définissez les tarifs horaires pour chaque machine selon vos besoins</li>
              <li><strong>Statuts :</strong> Gérez les statuts des machines (disponible, maintenance, hors service)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminReservationsFablabPage;
