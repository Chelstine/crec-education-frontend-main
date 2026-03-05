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
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Check, 
  Info, 
  Loader2, 
  BookOpen 
} from 'lucide-react';

// Interface pour le formulaire d'inscription
interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  purpose: string;
  agreeTerms: boolean;
  newsletter: boolean;
}

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // État pour gérer les données du formulaire
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    purpose: '',
    agreeTerms: false,
    newsletter: false,
  });

  // État pour gérer les erreurs de validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // État pour gérer le chargement
  const [loading, setLoading] = useState(false);

  // Options pour le champ "objectif"
  const purposeOptions = [
    { value: 'formations', label: 'Suivre des formations ouvertes' },
    { value: 'university', label: 'Études universitaires' },
    { value: 'fablab', label: 'Utiliser le FabLab' },
    { value: 'events', label: 'Participer aux événements' },
    { value: 'other', label: 'Autre' },
  ];

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

  // Gérer les changements dans les sélections
  const handleSelectChange = (name: string, value: string) => {
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
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
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

  // Valider le formulaire
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Validation des champs obligatoires
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le numéro de téléphone est requis';
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Veuillez confirmer votre mot de passe';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    if (!formData.purpose) {
      newErrors.purpose = 'Veuillez sélectionner votre objectif';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Vous devez accepter les conditions d\'utilisation';
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
      // Simulation d'appel API - à remplacer par votre appel réel
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Afficher une notification de succès
      toast({
        title: "Inscription réussie !",
        description: "Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.",
        variant: "default",
      });
      
      // Rediriger vers la page de connexion ou d'accueil
      setTimeout(() => {
        navigate('/login');
      }, 1000);
      
    } catch (error) {
      // Gestion des erreurs
      toast({
        title: "Erreur d'inscription",
        description: "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
        variant: "destructive",
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
            Créer un compte
          </h1>
          <p className="text-gray-600 mt-2">
            Rejoignez la communauté CREC Education
          </p>
        </div>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Inscription</CardTitle>
            <CardDescription>
              Créez votre compte pour accéder à toutes nos formations et services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom *</Label>
                  <div className="relative">
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="Prénom"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={errors.firstName ? "border-red-500 pr-10" : ""}
                    />
                    {errors.firstName && (
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-red-500">
                        <Info size={18} />
                      </div>
                    )}
                  </div>
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom *</Label>
                  <div className="relative">
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Nom"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={errors.lastName ? "border-red-500 pr-10" : ""}
                    />
                    {errors.lastName && (
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-red-500">
                        <Info size={18} />
                      </div>
                    )}
                  </div>
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
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
                    className={`pl-10 ${errors.email ? "border-red-500 pr-10" : ""}`}
                  />
                  {errors.email && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-red-500">
                      <Info size={18} />
                    </div>
                  )}
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone *</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <Phone size={18} />
                  </div>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+229 00 00 00 00"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`pl-10 ${errors.phone ? "border-red-500 pr-10" : ""}`}
                  />
                  {errors.phone && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-red-500">
                      <Info size={18} />
                    </div>
                  )}
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="purpose">Objectif principal *</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange('purpose', value)}
                  value={formData.purpose}
                >
                  <SelectTrigger className={errors.purpose ? "border-red-500" : ""}>
                    <SelectValue placeholder="Sélectionner votre objectif" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Je m'inscris pour</SelectLabel>
                      {purposeOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.purpose && (
                  <p className="text-red-500 text-xs mt-1">{errors.purpose}</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe *</Label>
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
                      className={`pl-10 ${errors.password ? "border-red-500 pr-10" : ""}`}
                    />
                    {errors.password && (
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-red-500">
                        <Info size={18} />
                      </div>
                    )}
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer *</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <Lock size={18} />
                    </div>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`pl-10 ${errors.confirmPassword ? "border-red-500 pr-10" : ""}`}
                    />
                    {errors.confirmPassword && (
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-red-500">
                        <Info size={18} />
                      </div>
                    )}
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-3 pt-3">
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="agreeTerms" 
                    checked={formData.agreeTerms} 
                    onCheckedChange={(checked) => handleCheckboxChange('agreeTerms', checked === true)}
                    className={errors.agreeTerms ? "border-red-500" : ""}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label 
                      htmlFor="agreeTerms" 
                      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${errors.agreeTerms ? "text-red-500" : ""}`}
                    >
                      J'accepte les <Link to="/legal" className="text-blue-600 hover:underline">conditions d'utilisation</Link> et la <Link to="/privacy" className="text-blue-600 hover:underline">politique de confidentialité</Link>
                    </Label>
                    {errors.agreeTerms && (
                      <p className="text-red-500 text-xs">{errors.agreeTerms}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="newsletter" 
                    checked={formData.newsletter}
                    onCheckedChange={(checked) => handleCheckboxChange('newsletter', checked === true)}
                  />
                  <Label htmlFor="newsletter" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Recevoir des informations sur les formations et événements
                  </Label>
                </div>
              </div>
              
              <Button type="submit" disabled={loading} className="w-full bg-crec-gold hover:bg-crec-gold/90">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Création du compte...
                  </>
                ) : (
                  <>
                    <User className="mr-2 h-4 w-4" />
                    Créer mon compte
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Vous avez déjà un compte ?{" "}
              <Link to="/login" className="text-blue-600 hover:underline font-medium">
                Connectez-vous
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationPage;
