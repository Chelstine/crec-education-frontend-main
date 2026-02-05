import React from 'react';
import { BookOpen, MapPin, Clock, Phone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AdminBibliotequePage: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Bibliothèque Numérique</h1>
        <p className="text-gray-600">Gestion des ressources de la bibliothèque</p>
      </div>

      {/* Message principal */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
            <BookOpen className="h-8 w-8 text-amber-600" />
          </div>
          <CardTitle className="text-2xl">Section en cours de développement</CardTitle>
          <CardDescription className="text-lg">
            Notre bibliothèque numérique est actuellement en cours de développement
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
            <p className="text-lg text-gray-700 mb-4">
              Nous travaillons activement sur la mise en place d'une bibliothèque numérique complète 
              qui vous permettra d'accéder à une large collection de ressources académiques et techniques.
            </p>
            <p className="text-md text-gray-600">
              Merci de revenir plus tard quand cette fonctionnalité sera disponible.
            </p>
          </div>

          {/* Information sur la bibliothèque physique */}
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              En attendant, visitez notre bibliothèque physique
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-green-800">Adresse</h4>
                      <p className="text-green-700">
                        Centre Jésuite de Recherche, d'Étude et de Créativité (CREC)<br />
                        Abidjan, Côte d'Ivoire
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-blue-800">Horaires d'ouverture</h4>
                      <p className="text-blue-700">
                        Lundi - Vendredi : 8h00 - 18h00<br />
                        Samedi : 9h00 - 16h00
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-amber-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-amber-800">Contact</h4>
                      <p className="text-amber-700">
                        Pour plus d'informations sur nos ressources disponibles,<br />
                        n'hésitez pas à nous contacter directement.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Button 
                size="lg" 
                className="bg-crec-darkblue hover:bg-crec-darkblue/90"
                onClick={() => window.location.href = '/contact'}
              >
                Nous contacter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBibliotequePage;
