import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LogIn, Eye, EyeOff, AlertCircle, Shield, Clock } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth, authService } from '@/services/authService';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Vérifier si la session a expiré
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.get('session') === 'expired') {
      setSessionExpired(true);
      setError('Votre session a expiré. Veuillez vous reconnecter.');
    }
  }, [location]);

  // Rediriger si déjà connecté
  useEffect(() => {
    if (authService.isAuthenticated()) {
      const from = location.state?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    }
  }, [navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await login(formData.email, formData.password);
      
      if (!result.success) {
        setError(result.error || 'Erreur de connexion');
      }
      // La redirection est gérée dans le hook useAuth
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer l'erreur quand l'utilisateur tape
    if (error) setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full p-4 shadow-xl">
              <Shield className="w-full h-full text-blue-600" />
            </div>
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">Administration CREC</h1>
          <p className="text-blue-200">Espace sécurisé de gestion</p>
        </div>

        {/* Alerte de session expirée */}
        {sessionExpired && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Alert className="border-yellow-500 bg-yellow-50">
              <Clock className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                Votre session a expiré pour des raisons de sécurité. Reconnectez-vous pour continuer.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Formulaire de connexion */}
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center font-bold text-slate-900 flex items-center justify-center">
              <LogIn className="mr-2 h-6 w-6" />
              Connexion Sécurisée
            </CardTitle>
            <p className="text-center text-sm text-gray-600">
              Accès réservé aux administrateurs autorisés
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Affichage des erreurs */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@crec.edu"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="h-11"
                />
              </div>

              {/* Mot de passe */}
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Votre mot de passe"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="h-11 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Bouton de connexion */}
              <Button
                type="submit"
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Authentification...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <LogIn className="w-4 h-4 mr-2" />
                    Se connecter
                  </div>
                )}
              </Button>

              {/* Informations de sécurité */}
              <div className="space-y-2 text-xs text-gray-600 border-t pt-4">
                <div className="flex items-center">
                  <Shield className="w-3 h-3 mr-1 text-green-600" />
                  <span>Connexion sécurisée SSL</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1 text-blue-600" />
                  <span>Session automatique : 30 minutes d'inactivité</span>
                </div>
                <p className="text-center text-gray-500 mt-2">
                  Accès restreint aux administrateurs autorisés uniquement
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Informations de test */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-blue-900/50 rounded-lg text-center"
        >
          <h3 className="text-white font-medium mb-2">👨‍💻 Accès de test</h3>
          <div className="text-sm text-blue-200 space-y-1">
            <p><strong>Email :</strong> admin@crec.edu</p>
            <p><strong>Mot de passe :</strong> admin123</p>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-400 text-sm">
          <p>&copy; 2024 CREC - Centre de Recherche et d'Éducation Créative</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
