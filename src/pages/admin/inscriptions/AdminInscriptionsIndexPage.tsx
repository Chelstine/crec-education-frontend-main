// src/pages/admin/inscriptions/AdminInscriptionsIndexPage.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  GraduationCap, 
  Wrench, 
  Building, 
  Clock, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  Eye
} from "lucide-react";
import inscriptionService, { RecentInscription } from '@/services/inscription-service';
import StatCard from '@/components/admin/StatCard';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const AdminInscriptionsIndexPage: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);
  const [recentInscriptions, setRecentInscriptions] = useState<RecentInscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const response = await inscriptionService.getDashboardData();
      setStats(response.data.stats);
      setRecentInscriptions(response.data.recent_inscriptions);
    } catch (error) {
      console.error('Erreur chargement données:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données des inscriptions.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'approved': return 'Approuvée';
      case 'rejected': return 'Rejetée';
      default: return status;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'fablab': return 'bg-blue-100 text-blue-800';
      case 'formations': return 'bg-purple-100 text-purple-800';
      case 'university': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'fablab': return 'FabLab';
      case 'formations': return 'Formation';
      case 'university': return 'Université';
      default: return type;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Gestion des Inscriptions
        </h1>
        <p className="text-gray-600">
          Vue d'ensemble et gestion des inscriptions pour tous les services du centre.
        </p>
      </div>

      {/* Guide d'utilisation */}
      <Card className="mb-8 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Users className="h-5 w-5" />
            Guide de gestion des inscriptions
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-800">
          <div className="space-y-3">
            <p className="font-medium">En tant qu'administrateur des inscriptions, vous pouvez :</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Consulter</strong> toutes les inscriptions par catégorie (FabLab, Formations, Université)</li>
              <li><strong>Approuver</strong> les inscriptions en vérifiant les informations et reçus de paiement</li>
              <li><strong>Rejeter</strong> les inscriptions avec une raison détaillée</li>
              <li><strong>Envoyer automatiquement</strong> des emails de confirmation ou de refus</li>
              <li><strong>Suivre</strong> les statistiques et l'évolution des inscriptions</li>
            </ul>
            <div className="mt-4 p-3 bg-blue-100 rounded-lg">
              <p className="text-sm">
                <strong>Important :</strong> Une fois qu'une inscription est approuvée, un email automatique est envoyé 
                avec les informations nécessaires (identifiants pour le FabLab, dates de début pour les formations, etc.).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques globales */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total FabLab"
            value={stats.fablab.total}
            icon={Wrench}
            color="blue"
          />
          <StatCard
            title="Total Formations"
            value={stats.formations.total}
            icon={GraduationCap}
            color="purple"
          />
          <StatCard
            title="Total Université"
            value={stats.university.total}
            icon={Building}
            color="orange"
          />
          <StatCard
            title="En attente global"
            value={stats.fablab.pending + stats.formations.pending + stats.university.pending}
            icon={Clock}
            color="yellow"
          />
        </div>
      )}

      {/* Statistiques détaillées par catégorie */}
      {stats && (
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="fablab">FabLab</TabsTrigger>
            <TabsTrigger value="formations">Formations</TabsTrigger>
            <TabsTrigger value="university">Université</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Inscriptions approuvées</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {stats.fablab.approved + stats.formations.approved + stats.university.approved}
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>FabLab: {stats.fablab.approved}</div>
                    <div>Formations: {stats.formations.approved}</div>
                    <div>Université: {stats.university.approved}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">En attente de traitement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-600 mb-2">
                    {stats.fablab.pending + stats.formations.pending + stats.university.pending}
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>FabLab: {stats.fablab.pending}</div>
                    <div>Formations: {stats.formations.pending}</div>
                    <div>Université: {stats.university.pending}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Inscriptions rejetées</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    {stats.fablab.rejected + stats.formations.rejected + stats.university.rejected}
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>FabLab: {stats.fablab.rejected}</div>
                    <div>Formations: {stats.formations.rejected}</div>
                    <div>Université: {stats.university.rejected}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="fablab">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  Statistiques FabLab
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{stats.fablab.total}</div>
                    <div className="text-sm text-gray-600">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{stats.fablab.pending}</div>
                    <div className="text-sm text-gray-600">En attente</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{stats.fablab.approved}</div>
                    <div className="text-sm text-gray-600">Approuvées</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{stats.fablab.rejected}</div>
                    <div className="text-sm text-gray-600">Rejetées</div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button onClick={() => navigate('/admin/inscriptions/fablab')}>
                    <Eye className="w-4 h-4 mr-2" />
                    Gérer les inscriptions FabLab
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="formations">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Statistiques Formations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{stats.formations.total}</div>
                    <div className="text-sm text-gray-600">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{stats.formations.pending}</div>
                    <div className="text-sm text-gray-600">En attente</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{stats.formations.approved}</div>
                    <div className="text-sm text-gray-600">Approuvées</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{stats.formations.rejected}</div>
                    <div className="text-sm text-gray-600">Rejetées</div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button onClick={() => navigate('/admin/inscriptions/formations')}>
                    <Eye className="w-4 h-4 mr-2" />
                    Gérer les inscriptions Formations
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="university">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Statistiques Université University
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{stats.university.total}</div>
                    <div className="text-sm text-gray-600">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{stats.university.pending}</div>
                    <div className="text-sm text-gray-600">En attente</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{stats.university.approved}</div>
                    <div className="text-sm text-gray-600">Approuvées</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{stats.university.rejected}</div>
                    <div className="text-sm text-gray-600">Rejetées</div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button onClick={() => navigate('/admin/inscriptions/university')}>
                    <Eye className="w-4 h-4 mr-2" />
                    Gérer les inscriptions University
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Inscriptions récentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Inscriptions récentes
          </CardTitle>
          <CardDescription>
            Les 20 dernières inscriptions soumises, toutes catégories confondues.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentInscriptions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Aucune inscription récente à afficher.
            </div>
          ) : (
            <div className="space-y-4">
              {recentInscriptions.map((inscription) => (
                <div key={`${inscription.type}-${inscription.id}`} 
                     className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={getTypeColor(inscription.type)}>
                        {getTypeLabel(inscription.type)}
                      </Badge>
                      <Badge className={getStatusColor(inscription.status)}>
                        {getStatusText(inscription.status)}
                      </Badge>
                    </div>
                    <div className="font-medium">{inscription.name}</div>
                    <div className="text-sm text-gray-600">{inscription.email}</div>
                    <div className="text-sm text-gray-500">{inscription.details}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">
                      {formatDate(inscription.created_at)}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => navigate(`/admin/inscriptions/${inscription.type}`)}
                    >
                      Voir détails
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions rapides */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate('/admin/inscriptions/fablab')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Wrench className="h-5 w-5" />
              Inscriptions FabLab
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Gérer les inscriptions aux abonnements FabLab et générer les identifiants d'accès.
            </p>
            <Button className="w-full">Accéder</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate('/admin/inscriptions/formations')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <GraduationCap className="h-5 w-5" />
              Inscriptions Formations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Traiter les inscriptions aux formations ouvertes et envoyer les confirmations.
            </p>
            <Button className="w-full">Accéder</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate('/admin/inscriptions/university')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <Building className="h-5 w-5" />
              Inscriptions University
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Examiner les candidatures universitaires et valider les dossiers académiques.
            </p>
            <Button className="w-full">Accéder</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminInscriptionsIndexPage;