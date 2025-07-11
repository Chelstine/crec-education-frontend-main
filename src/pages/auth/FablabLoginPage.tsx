import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, User, Key, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

const FablabLoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [subscriptionKey, setSubscriptionKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Utilisateur pour la connexion au FabLab - ces informations doivent être validées avec le backend
  const testUser = { 
    name: '', 
    key: '',
    plan: 'etudiant' as const,
    maxReservations: 15,
    currentReservations: 3,
    accessHours: '8h-18h',
    allowedMachines: ['imprimante-3d', 'decoupe-laser', 'cnc'],
    isActive: true
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !subscriptionKey.trim()) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    setError('');

    // Simulation d'un délai de connexion
    setTimeout(() => {
      const isValidUser = testUser.name.toLowerCase() === name.toLowerCase() && testUser.key === subscriptionKey;
      
      if (isValidUser) {
        // Stocker les informations de l'utilisateur dans localStorage
        localStorage.setItem('fablabUser', JSON.stringify({
          name: testUser.name,
          key: testUser.key,
          plan: testUser.plan,
          verified: true,
          loggedIn: true,
          accessHours: testUser.accessHours,
          allowedMachines: testUser.allowedMachines,
          maxReservations: testUser.maxReservations,
          currentReservations: testUser.currentReservations,
          isActive: testUser.isActive,
          expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          loginTime: new Date().toISOString()
        }));

        toast({
          title: "Connexion réussie !",
          description: `Bienvenue ${testUser.name}. Accès au FabLab autorisé.`,
          duration: 3000,
        });

        // Redirection vers la page de réservation
        navigate('/reservation', { 
          state: { 
            fromLogin: true, 
            message: `Bienvenue ${testUser.name} ! Vous pouvez maintenant réserver vos machines.`,
            plan: testUser.plan 
          } 
        });
      } else {
        setError('Nom ou clé d\'accès incorrect. Veuillez vérifier vos informations.');
      }
      
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* En-tête */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-4">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">FabLab CREC</h1>
          <p className="text-gray-600">Connectez-vous pour accéder aux réservations</p>
        </motion.div>

        {/* Formulaire de connexion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-xl border-0">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl text-center">Connexion</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Nom complet
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Votre nom complet"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="key" className="text-sm font-medium">
                    Clé d'accès
                  </Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="key"
                      type="password"
                      placeholder="Votre clé d'accès"
                      value={subscriptionKey}
                      onChange={(e) => setSubscriptionKey(e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Connexion...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>Se connecter</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Section pour s'abonner */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">Pas encore abonné ?</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/subscription')}
                    className="w-full h-12 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium"
                  >
                    <div className="flex items-center space-x-2">
                      <span>S'abonner au FabLab</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Button>
                  
                  <p className="text-center text-xs text-gray-500 mt-2">
                    Accédez aux machines de fabrication numérique
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center space-y-2"
        >
          <p className="text-sm text-gray-500">
            Besoin d'aide ? Contactez l'administration du FabLab
          </p>
          <p className="text-xs text-gray-400">
            Un abonnement actif est requis pour accéder aux machines de fabrication
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FablabLoginPage;
