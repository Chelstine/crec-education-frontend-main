import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, Loader2, LogIn, BookOpen } from 'lucide-react';

// Interface pour le formulaire de connexion
interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  // État pour gérer les données du formulaire
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  // État pour gérer les erreurs de validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // État pour gérer le chargement
  const [loading, setLoading] = useState(false);

  // Gérer les changements dans les champs de texte
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Effacer l'erreur pour ce champ si elle existe
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Gérer les changements de checkbox
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      rememberMe: checked
    }));
  };

  // Valider le formulaire
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Appel à la fonction de connexion du contexte d'authentification
      await login(formData.email, formData.password);
      
      // Afficher une notification de succès
      toast({
        title: "Connexion réussie !",
        description: "Vous êtes maintenant connecté à votre compte.",
        variant: "default",
      });
      
      // Rediriger vers la page d'accueil ou le tableau de bord
      navigate('/');
      
    } catch (error) {
      // Gestion des erreurs
      toast({
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect. Veuillez réessayer.",
        variant: "destructive",
      });
      
      setErrors({
        auth: "Email ou mot de passe incorrect"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <BookOpen className="h-8 w-8 text-crec-gold" />
            Connexion
          </h1>
          <p className="text-gray-600 mt-2">
            Accédez à votre espace personnel
          </p>
        </div>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Connexion</CardTitle>
            <CardDescription>
              Entrez vos identifiants pour accéder à votre compte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.auth && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative text-sm" role="alert">
                  <span className="block sm:inline">{errors.auth}</span>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <Mail size={18} />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Link to="/forgotten-password" className="text-xs text-blue-600 hover:underline">
                    Mot de passe oublié ?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <Lock size={18} />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`pl-10 ${errors.password ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
              
              <div className="flex items-center space-x-2 mt-4">
                <Checkbox 
                  id="rememberMe" 
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => handleCheckboxChange(checked === true)}
                />
                <Label htmlFor="rememberMe" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Se souvenir de moi
                </Label>
              </div>
              
              <Button type="submit" disabled={loading} className="w-full bg-crec-gold hover:bg-crec-gold/90">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connexion en cours...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Se connecter
                  </>
                )}
              </Button>

              {/* Les identifiants de test ont été retirés */}
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <p className="text-sm text-gray-600">
              Vous n'avez pas de compte ?{" "}
              <Link to="/register" className="text-blue-600 hover:underline font-medium">
                Créer un compte
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
