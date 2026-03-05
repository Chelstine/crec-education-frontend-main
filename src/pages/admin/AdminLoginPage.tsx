import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

// Import d'icônes et composants
import { Lock, Mail, AlertCircle, School, Loader2, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const { 
    login, 
    isAuthenticated, 
    error: authError,
    user,
    mustChangePassword,
    changePassword,
    clearError
  } = useAuth();
  
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/admin/dashboard';

  useEffect(() => {
    if (isAuthenticated && !mustChangePassword) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, mustChangePassword, from, navigate]);

  // Nettoyer les erreurs quand on change les champs
  useEffect(() => {
    if (localError || authError) {
      const timer = setTimeout(() => {
        setLocalError(null);
        clearError();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [email, password, newPassword, confirmPassword]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setLocalError('Veuillez remplir tous les champs');
      return;
    }

    try {
      setIsSubmitting(true);
      setLocalError(null);
      
      const result = await login(email, password);
      
      if (result.requiresPasswordChange) {
        setShowPasswordChange(true);
      }
      // Sinon la redirection se fait via useEffect
      
    } catch (error: any) {
      setLocalError(
        error?.response?.data?.message ||
        error?.message ||
        'Identifiants incorrects'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setLocalError('Veuillez remplir tous les champs');
      return;
    }

    if (newPassword !== confirmPassword) {
      setLocalError('Les mots de passe ne correspondent pas');
      return;
    }


    // Validation des critères de sécurité
    const criteria = [
      { regex: /.{8,}/, message: 'Le mot de passe doit contenir au moins 8 caractères' },
      { regex: /[A-Z]/, message: 'Le mot de passe doit contenir au moins une majuscule' },
      { regex: /[a-z]/, message: 'Le mot de passe doit contenir au moins une minuscule' },
      { regex: /[0-9]/, message: 'Le mot de passe doit contenir au moins un chiffre' },
      { regex: /[^A-Za-z0-9]/, message: 'Le mot de passe doit contenir au moins un caractère spécial' },
    ];
    for (const rule of criteria) {
      if (!rule.regex.test(newPassword)) {
        setLocalError(rule.message);
        return;
      }
    }

    try {
      setIsSubmitting(true);
      setLocalError(null);
      
      await changePassword(
        password,
        newPassword,
        confirmPassword
      );
      
      // La redirection se fait automatiquement via useEffect
      
    } catch (error: any) {
      setLocalError(
        error?.response?.data?.message ||
        error?.message ||
        'Erreur lors du changement de mot de passe'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Si l'utilisateur doit changer son mot de passe
  if (showPasswordChange || mustChangePassword) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="bg-crec-gold rounded-md p-2">
              <KeyRound className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
            Changement de mot de passe requis
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Bienvenue {user?.prenom} {user?.nom}. Veuillez définir votre nouveau mot de passe.
          </p>
          <ul className="mt-4 text-xs text-slate-600 bg-slate-50 rounded p-3 border border-slate-200">
            <li>• Au moins 8 caractères</li>
            <li>• Une majuscule</li>
            <li>• Une minuscule</li>
            <li>• Un chiffre</li>
            <li>• Un caractère spécial</li>
          </ul>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10">
            {(localError || authError) && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{localError || authError}</AlertDescription>
              </Alert>
            )}

            <form className="space-y-6" onSubmit={handlePasswordChange}>
              <div>
                <Label htmlFor="newPassword" className="block text-sm font-medium text-slate-700">
                  Nouveau mot de passe
                </Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Au moins 8 caractères"
                    className="pl-10"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">
                  Confirmez le mot de passe
                </Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Répétez le mot de passe"
                    className="pl-10"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                      Changement en cours...
                    </>
                  ) : 'Changer le mot de passe'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Page de connexion normale
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
          {(localError || authError) && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{localError || authError}</AlertDescription>
            </Alert>
          )}
          
          <form className="space-y-6" onSubmit={handleLogin}>
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
                  placeholder="Entrez votre mail"
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
                  placeholder="Entrez votre mot de passe"
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