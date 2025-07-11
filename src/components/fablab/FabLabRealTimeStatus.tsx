import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Skeleton } from '../ui/skeleton';
import { Clock, AlertTriangle, CheckCircle, XCircle, Settings, Activity } from 'lucide-react';
import { useApi } from '@/hooks/useApi';
import { cn } from '@/lib/utils';

interface Machine {
  id: string;
  name: string;
  code: string;
  category: string;
  imageUrl: string;
  status: string;
  availableIn?: number;
  currentUsage?: {
    startedAt: string;
    endsAt: string;
    userName?: string;
  };
}

interface FabLabStatus {
  machines: Machine[];
  stats: {
    totalMachines: number;
    availableMachines: number;
    inUseMachines: number;
    maintenanceMachines: number;
    unavailableMachines: number;
    lastUpdated: string;
  };
}

export const FabLabRealTimeStatus: React.FC = () => {
  const [status, setStatus] = useState<FabLabStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshInterval, setRefreshInterval] = useState(60000); // 1 minute par défaut
  const { get } = useApi();

  // Fonction pour charger les données
  const loadStatus = async () => {
    try {
      setLoading(true);
      const response = await get('/api/public/fablab/status');
      if (response.data && typeof response.data === 'object' && 'machines' in response.data && 'stats' in response.data) {
        setStatus(response.data as FabLabStatus);
      } else {
        setStatus(null);
      }
      setError(null);
    } catch (err: any) {
      console.error('Erreur lors du chargement du statut FabLab:', err);
      setError('Impossible de charger le statut du FabLab');
    } finally {
      setLoading(false);
    }
  };

  // Chargement initial
  useEffect(() => {
    loadStatus();
  }, []);

  // Rafraîchissement automatique
  useEffect(() => {
    const interval = setInterval(() => {
      loadStatus();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  // Fonction pour obtenir le statut visuel d'une machine
  const getMachineStatusBadge = (status: string) => {
    switch(status) {
      case 'AVAILABLE':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Disponible</Badge>;
      case 'IN_USE':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">En utilisation</Badge>;
      case 'MAINTENANCE':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800">En maintenance</Badge>;
      case 'BROKEN':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Hors service</Badge>;
      case 'UNAVAILABLE':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Indisponible</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Fonction pour calculer le pourcentage de progression d'une réservation
  const calculateUsageProgress = (startTime: string, endTime: string) => {
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    const now = new Date().getTime();
    
    if (now < start) return 0;
    if (now > end) return 100;
    
    return Math.floor(((now - start) / (end - start)) * 100);
  };

  // Fonction pour formater le temps restant
  const formatTimeRemaining = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h${remainingMinutes > 0 ? ` ${remainingMinutes}min` : ''}`;
  };

  // Affichage du chargement
  if (loading && !status) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-8 w-64" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-80" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-24 w-full" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Affichage des erreurs
  if (error) {
    return (
      <Card className="border-red-300">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2 text-red-500" />
            Erreur
          </CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={loadStatus}>Réessayer</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <CardTitle>État Actuel du FabLab</CardTitle>
            <CardDescription>
              {status ? 
                `Dernière mise à jour: ${new Date(status.stats.lastUpdated).toLocaleTimeString()}` : 
                "Statut en temps réel des machines"
              }
            </CardDescription>
          </div>
          <div className="mt-2 sm:mt-0">
            <Button variant="outline" size="sm" onClick={loadStatus}>
              Actualiser
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Statistiques en haut */}
        {status && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-800">Disponibles</p>
                    <p className="text-2xl font-bold text-green-900">{status.stats.availableMachines}</p>
                  </div>
                  <CheckCircle className="text-green-700 h-6 w-6" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-800">En utilisation</p>
                    <p className="text-2xl font-bold text-blue-900">{status.stats.inUseMachines}</p>
                  </div>
                  <Activity className="text-blue-700 h-6 w-6" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-amber-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-amber-800">En maintenance</p>
                    <p className="text-2xl font-bold text-amber-900">{status.stats.maintenanceMachines}</p>
                  </div>
                  <Settings className="text-amber-700 h-6 w-6" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-800">Indisponibles</p>
                    <p className="text-2xl font-bold text-red-900">{status.stats.unavailableMachines}</p>
                  </div>
                  <XCircle className="text-red-700 h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Liste des machines */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {status && status.machines.map((machine) => (
            <Card 
              key={machine.id}
              className={cn(
                machine.status === 'AVAILABLE' && "border-green-200",
                machine.status === 'IN_USE' && "border-blue-200",
                machine.status === 'MAINTENANCE' && "border-amber-200",
                (machine.status === 'BROKEN' || machine.status === 'UNAVAILABLE') && "border-red-200"
              )}
            >
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{machine.name}</h3>
                    <p className="text-sm text-gray-500">{machine.code}</p>
                  </div>
                  {getMachineStatusBadge(machine.status)}
                </div>
                
                <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-md bg-gray-100">
                  {machine.imageUrl ? (
                    <img 
                      src={machine.imageUrl} 
                      alt={machine.name}
                      className="object-cover h-32 w-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-32 bg-gray-100">
                      <p className="text-gray-400">Pas d'image</p>
                    </div>
                  )}
                </div>
                
                {machine.status === 'IN_USE' && machine.currentUsage && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {formatTimeRemaining(machine.availableIn || 0)}
                      </span>
                      <span>{machine.currentUsage.userName || 'Utilisateur'}</span>
                    </div>
                    
                    <Progress 
                      value={calculateUsageProgress(
                        machine.currentUsage.startedAt, 
                        machine.currentUsage.endsAt
                      )}
                    />
                    
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Début: {new Date(machine.currentUsage.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <span>Fin: {new Date(machine.currentUsage.endsAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <Badge variant="outline">{machine.category}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FabLabRealTimeStatus;
