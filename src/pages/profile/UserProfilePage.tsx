import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useApi } from '@/hooks/useApi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Check, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const UserProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { get, put } = useApi();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstname || '',
        lastName: user.lastname || '',
        email: user.email || '',
        phone: (user as any).phone || '', // Conversion de type temporaire pour éviter l'erreur
        organization: (user as any).organization || '', // Conversion de type temporaire pour éviter l'erreur
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await put('/api/users/profile', formData);
      if (response) {
        // Note: The user profile will be updated in the next auth check
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de la mise à jour du profil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Mon profil</h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Informations personnelles</TabsTrigger>
            <TabsTrigger value="reservations">Mes réservations</TabsTrigger>
            <TabsTrigger value="subscriptions">Mes abonnements</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>Mettez à jour vos informations personnelles ici.</CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Erreur</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
                    <Check className="h-4 w-4" />
                    <AlertTitle>Succès</AlertTitle>
                    <AlertDescription>Vos informations ont été mises à jour avec succès.</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input 
                        id="firstName" 
                        name="firstName" 
                        value={formData.firstName} 
                        onChange={handleChange} 
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input 
                        id="lastName" 
                        name="lastName" 
                        value={formData.lastName} 
                        onChange={handleChange} 
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleChange}
                      disabled={true}
                      className="bg-gray-100"
                    />
                    <p className="text-sm text-gray-500">L'email ne peut pas être modifié</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organization">Organisation</Label>
                    <Input 
                      id="organization" 
                      name="organization" 
                      value={formData.organization} 
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Mise à jour...
                      </>
                    ) : 'Mettre à jour'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reservations">
            <Card>
              <CardHeader>
                <CardTitle>Mes réservations</CardTitle>
                <CardDescription>Historique de vos réservations au FabLab.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Cette fonctionnalité sera disponible prochainement.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscriptions">
            <Card>
              <CardHeader>
                <CardTitle>Mes abonnements</CardTitle>
                <CardDescription>Gérez vos abonnements aux formations et au FabLab.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Cette fonctionnalité sera disponible prochainement.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfilePage;
