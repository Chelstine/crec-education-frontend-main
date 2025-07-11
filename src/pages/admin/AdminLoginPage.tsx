import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

// Import d'icônes et composants
import { Lock, Mail, AlertCircle, School, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setLoginError('Veuillez remplir tous les champs');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setLoginError(null);
      
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (error: any) {
      setLoginError(error.response?.data?.message || 'Identifiants incorrects');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-crec-gold rounded-md p-2">
            <School className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          Administration CREC
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Connectez-vous pour accéder à l'espace administrateur
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10">
          {loginError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{loginError}</AlertDescription>
            </Alert>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email
              </Label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@crec.bj"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Mot de passe
              </Label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <Input
                  id="password"
                  type="password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <Button 
                type="submit" 
                className="w-full bg-crec-gold hover:bg-crec-gold/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connexion en cours...
                  </>
                ) : 'Se connecter'}
              </Button>
              
            
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
