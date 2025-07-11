import React from 'react';
import FabLabRealTimeStatus from '@/components/fablab/FabLabRealTimeStatus';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle } from 'lucide-react';

const FabLabVisualizationPage = () => {
  return (
    <>

      <div className="container mx-auto py-6 px-4 md:px-6">
        <div className="space-y-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">FabLab CREC</h1>
            <p className="text-gray-600">Visualisation et réservation des équipements</p>
          </div>

          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="text-amber-700 h-5 w-5 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-800">
                    Pour accéder aux fonctionnalités de réservation, vous devez d'abord vous authentifier avec votre clé d'abonnement.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="status" className="space-y-4">
            <TabsList>
              <TabsTrigger value="status">Statut des Machines</TabsTrigger>
              <TabsTrigger value="schedule">Calendrier du Jour</TabsTrigger>
              <TabsTrigger value="reservation">Réservations</TabsTrigger>
            </TabsList>

            <TabsContent value="status">
              <FabLabRealTimeStatus />
            </TabsContent>

            <TabsContent value="schedule">
              <Card>
                <CardHeader>
                  <CardTitle>Calendrier d'Occupation</CardTitle>
                  <CardDescription>
                    Visualisez les plages horaires réservées aujourd'hui
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-8 text-gray-500">
                    Authentifiez-vous avec votre clé d'abonnement pour voir le calendrier complet
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reservation">
              <Card>
                <CardHeader>
                  <CardTitle>Mes Réservations</CardTitle>
                  <CardDescription>
                    Gérez vos réservations de machines
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <p className="text-center text-gray-500">
                      Vous devez vous authentifier avec votre clé d'abonnement pour accéder à vos réservations
                    </p>
                    <a 
                      href="/reservation/fablab/login" 
                      className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      Se connecter
                    </a>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default FabLabVisualizationPage;
