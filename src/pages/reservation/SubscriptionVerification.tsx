import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useFablabSubscriptionVerification } from '@/hooks/useApi';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { AlertCircle, Key, CheckCircle } from 'lucide-react';

const SubscriptionVerification = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [subscriptionKey, setSubscriptionKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Utilisateur de test avec clé simplifiée
  const testUser = { 
    name: 'Marie Kouassi', 
    key: 'bonjour',
    plan: 'etudiant',
    maxReservations: 15,
    currentReservations: 3,
    accessHours: '8h-18h',
    allowedMachines: ['imprimante-3d', 'decoupe-laser', 'cnc'],
    isActive: true
  };

  const handleVerify = async () => {
    if (!name.trim() || !subscriptionKey.trim()) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    setError('');

    // Vérification pour l'utilisateur test
    const isValidUser = testUser.name.toLowerCase() === name.toLowerCase() && testUser.key === subscriptionKey;
    
    if (isValidUser) {
      // Stocker les informations de l'utilisateur test dans localStorage
      localStorage.setItem('subscriberInfo', JSON.stringify({
        name: testUser.name,
        key: testUser.key,
        plan: testUser.plan,
        verified: true,
        accessHours: testUser.accessHours,
        allowedMachines: testUser.allowedMachines,
        maxReservations: testUser.maxReservations,
        currentReservations: testUser.currentReservations,
        isActive: testUser.isActive,
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
      }));

      toast({
        title: 'Vérification réussie',
        description: `Bienvenue ${testUser.name} au FabLab CREC!`,
        variant: 'default',
      });

      navigate('/reservation', { 
        state: { 
          fromSubscription: true,
          message: 'Votre abonnement test a été vérifié avec succès!',
          planName: testUser.plan === 'etudiant' ? 'étudiant' : 'professionnel'
        }
      });
      return;
    }

    // Appel API pour vérification réelle (implémentation future)
    try {
      // Simulation d'un délai API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Pour l'instant, rejetez la vérification si ce n'est pas un utilisateur test
      setError('Clé d\'abonnement ou nom non valide.');
      setLoading(false);
      
      /* Implémentation future avec API réelle:
      const verificationMutation = useFablabSubscriptionVerification();
      const result = await verificationMutation.mutateAsync({ name, subscriptionKey });
      
      if (result.success && result.data?.isValid) {
        localStorage.setItem('subscriberInfo', JSON.stringify({
          name: name,
          key: subscriptionKey,
          plan: result.data.subscription.type,
          verified: true,
          expiresAt: result.data.subscription.endDate
        }));
        
        navigate('/reservation', { 
          state: { 
            fromSubscription: true,
            message: 'Votre abonnement a été vérifié avec succès!',
            planName: result.data.subscription.type === 'monthly' ? 'mensuel' : 'annuel'
          }
        });
      } else {
        setError('Clé d\'abonnement ou nom non valide');
      }
      */
    } catch (err) {
      setError('Erreur de vérification. Veuillez réessayer.');
      console.error('Verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-md py-12">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">Vérification d'Abonnement</CardTitle>
          <CardDescription className="text-center">
            Entrez votre nom et votre clé d'abonnement pour accéder au FabLab
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                placeholder="Entrez votre nom complet"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="key">Clé d'abonnement</Label>
              <Input
                id="key"
                placeholder="Entrez votre clé d'accès"
                value={subscriptionKey}
                onChange={(e) => setSubscriptionKey(e.target.value)}
              />
            </div>
            
            {error && (
              <div className="flex items-center gap-2 p-3 text-red-600 bg-red-50 rounded-md">
                <AlertCircle size={16} />
                <span className="text-sm">{error}</span>
              </div>
            )}
            
            <div className="pt-2">
              <Button 
                className="w-full" 
                onClick={handleVerify}
                disabled={loading}
              >
                <Key className="w-4 h-4 mr-2" />
                {loading ? 'Vérification...' : 'Vérifier l\'abonnement'}
              </Button>
            </div>
            
            <div className="text-center text-sm text-gray-500 mt-2">
              <p>Pas encore abonné(e)? <a href="/subscription" className="text-blue-600 hover:underline">S'abonner maintenant</a></p>
            </div>

            <div className="mt-4 p-3 bg-gray-50 text-gray-600 rounded-md">
              <p className="text-sm">
                Un abonnement FabLab valide est requis pour accéder aux machines.
              </p>
            </div>

            {/* Section de test pour le développement */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <h4 className="text-sm font-semibold text-blue-800 mb-2">Compte de test disponible:</h4>
              <div className="space-y-2 text-xs text-blue-700">
                <div className="flex justify-between">
                  <span>{testUser.name}</span>
                  <span className="font-mono">{testUser.key}</span>
                </div>
                <div className="text-xs text-blue-600">
                  Plan: {testUser.plan} ({testUser.maxReservations} réservations max)
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionVerification;
