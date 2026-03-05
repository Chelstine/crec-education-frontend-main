import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import authService from '../../services/auth-service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Shield, Eye, EyeOff, CheckCircle2, AlertTriangle, KeyRound } from 'lucide-react';

interface PasswordStrength {
  score: number;
  feedback: string[];
  color: string;
}

const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // État du formulaire
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // États de l'interface
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [tokenValid, setTokenValid] = useState(false);
  
  // Récupération du token depuis l'URL
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  // Validation du token au chargement
  useEffect(() => {
    if (!token || !email) {
      setError('Lien de réinitialisation invalide. Veuillez faire une nouvelle demande.');
      setIsVerifying(false);
      return;
    }

    verifyResetToken();
  }, [token, email]);

  const verifyResetToken = async () => {
    try {
      setIsVerifying(true);
      const response = await authService.verifyResetToken(token!, email!);
      
      if (response.valid) {
        setTokenValid(true);
        setError('');
      } else {
        setError(response.message || 'Token de réinitialisation invalide ou expiré.');
      }
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la vérification du lien.');
    } finally {
      setIsVerifying(false);
    }
  };

  // Analyse de la force du mot de passe
  const analyzePasswordStrength = (pwd: string): PasswordStrength => {
    const feedback: string[] = [];
    let score = 0;

    if (pwd.length >= 8) score += 1;
    else feedback.push('Au moins 8 caractères');

    if (/[a-z]/.test(pwd)) score += 1;
    else feedback.push('Une lettre minuscule');

    if (/[A-Z]/.test(pwd)) score += 1;
    else feedback.push('Une lettre majuscule');

    if (/\d/.test(pwd)) score += 1;
    else feedback.push('Un chiffre');

    if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) score += 1;
    else feedback.push('Un caractère spécial');

    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    
    return {
      score,
      feedback,
      color: colors[score - 1] || 'bg-gray-300'
    };
  };

  const passwordStrength = password ? analyzePasswordStrength(password) : null;
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    if (passwordStrength && passwordStrength.score < 4) {
      setError('Le mot de passe ne respecte pas les critères de sécurité.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      await authService.resetPassword({
        token: token!,
        email: email!,
        password: password,
        password_confirmation: confirmPassword
      });

      setIsSuccess(true);
      
      // Redirection après 3 secondes
      setTimeout(() => {
        navigate('/login', { 
          state: { 
            message: 'Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter.' 
          }
        });
      }, 3000);

    } catch (err: any) {
      setError(err.message || 'Erreur lors de la réinitialisation du mot de passe.');
    } finally {
      setIsLoading(false);
    }
  };

  // Page de vérification
  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Shield className="h-12 w-12 text-red-600 animate-pulse" />
                <Loader2 className="h-6 w-6 text-red-400 animate-spin absolute -bottom-1 -right-1" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">Vérification sécurisée</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Validation de votre lien de réinitialisation...
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Page de succès
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <CheckCircle2 className="h-16 w-16 text-green-600" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Mot de passe réinitialisé !
                </h3>
                <p className="text-gray-600 mt-2">
                  Votre mot de passe a été mis à jour avec succès.
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  Redirection vers la page de connexion...
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full animate-pulse w-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Page d'erreur ou formulaire
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <KeyRound className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Nouveau mot de passe
          </CardTitle>
          <CardDescription className="text-gray-600">
            {tokenValid ? 
              'Définissez un mot de passe sécurisé pour votre compte administrateur' :
              'Problème avec le lien de réinitialisation'
            }
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!tokenValid ? (
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Le lien de réinitialisation est invalide ou a expiré.
              </p>
              <Button 
                onClick={() => navigate('/forgotten-password')}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                Demander un nouveau lien
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nouveau mot de passe */}
              <div className="space-y-2">
                <Label htmlFor="password">Nouveau mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Saisissez votre nouveau mot de passe"
                    className="pr-10"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* Indicateur de force du mot de passe */}
                {password && passwordStrength && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color} password-strength-bar`}
                          data-score={passwordStrength.score}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600">
                        {passwordStrength.score}/5
                      </span>
                    </div>
                    {passwordStrength.feedback.length > 0 && (
                      <div className="text-xs text-gray-600">
                        <p className="font-medium mb-1">Critères manquants :</p>
                        <ul className="list-disc list-inside space-y-0.5">
                          {passwordStrength.feedback.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Confirmation mot de passe */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmez le mot de passe</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirmez votre nouveau mot de passe"
                    className="pr-10"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* Indicateur de correspondance */}
                {confirmPassword && (
                  <div className="flex items-center space-x-2 text-xs">
                    {passwordsMatch ? (
                      <div className="flex items-center text-green-600">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Les mots de passe correspondent
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Les mots de passe ne correspondent pas
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Informations de sécurité */}
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  <strong>Sécurité :</strong> Après la réinitialisation, toutes vos sessions actives seront fermées et vous devrez vous reconnecter.
                </AlertDescription>
              </Alert>

              {/* Bouton de soumission */}
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={isLoading || !passwordsMatch || (passwordStrength ? passwordStrength.score < 4 : true)}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Réinitialisation...
                  </>
                ) : (
                  'Réinitialiser le mot de passe'
                )}
              </Button>

              {/* Lien retour */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-sm text-red-600 hover:text-red-800 underline"
                  disabled={isLoading}
                >
                  Retour à la connexion
                </button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
