import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LogIn, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulation d'une authentification (à remplacer par votre logique API)
      if (formData.email === 'admin@crec.edu' && formData.password === 'admin123') {
        // Stocker le token d'authentification
        localStorage.setItem('adminToken', 'mock-jwt-token');
        localStorage.setItem('adminUser', JSON.stringify({
          email: formData.email,
          name: 'Administrateur CREC',
          role: 'admin'
        }));
        
        // Rediriger vers le dashboard
        navigate('/admin');
      } else {
        setError('Email ou mot de passe incorrect. Vérifiez vos informations.');
      }
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            src="/img/logo.png"
            alt="CREC"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-white mb-2">Administration CREC</h1>
          <p className="text-gray-300">Connectez-vous pour gérer votre plateforme</p>
        </div>

        {/* Formulaire de connexion */}
        <Card className="shadow-2xl border-0">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center font-bold text-slate-900">
              Connexion
            </CardTitle>
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
                className="w-full h-11 bg-crec-gold hover:bg-yellow-600 text-black font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                    Connexion...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <LogIn className="w-4 h-4 mr-2" />
                    Se connecter
                  </div>
                )}
              </Button>

              {/* Mot de passe oublié */}
              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  className="text-sm text-gray-600 hover:text-gray-900"
                  onClick={() => {
                    // TODO: Implémenter la logique de récupération de mot de passe
                    alert('Fonctionnalité à venir. Contactez le support technique.');
                  }}
                >
                  Mot de passe oublié ?
                </Button>
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
