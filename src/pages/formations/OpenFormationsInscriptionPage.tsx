// src/pages/formations/OpenFormationsInscriptionPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Loader2, Upload, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import inscriptionService, { FormationInscriptionData } from '@/services/inscription-service';
import formationService, { Formation } from '@/services/formation-service';
import { DocumentFileUpload } from '@/components/common/DocumentFileUpload';



const levelOptions = {
  'debutant': 'Débutant',
  'intermediaire': 'Intermédiaire',
  'avance': 'Avancé'
};

const OpenFormationsInscriptionPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedFormation = location.state?.selectedFormation;


  const [loading, setLoading] = useState(false);
  const [formationsLoading, setFormationsLoading] = useState(true);
  const [formations, setFormations] = useState<{slug: string, name: string}[]>([]);
  const [formData, setFormData] = useState<Omit<FormationInscriptionData, 'paymentReceipt' | 'formation'> & { formation_slug: string; paymentReceipt?: File }>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    formation_slug: selectedFormation || '',
    level: 'debutant',
    motivation: '',
    paymentReceipt: undefined
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Charger les formations ouvertes disponibles
  useEffect(() => {
    const loadFormations = async () => {
      try {
        setFormationsLoading(true);
        const formationsData = await formationService.getFormationsByType('open');
        const formationOptions = formationsData.map(f => ({
          slug: f.slug,
          name: f.title || f.slug
        }));
        setFormations(formationOptions);
        
        // Si aucune formation sélectionnée et qu'il y en a, prendre la première
        if (!selectedFormation && formationOptions.length > 0) {
          setFormData(prev => ({ ...prev, formation_slug: formationOptions[0].slug }));
        }
      } catch (error) {
        console.error('Erreur lors du chargement des formations:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les formations disponibles.",
          variant: "destructive",
        });
        // Fallback: liste statique en cas d'erreur avec les slugs corrects du backend
        const fallbackFormations = [
          { slug: 'anglais', name: 'Anglais' },
          { slug: 'francais', name: 'Français' },
          { slug: 'informatique', name: 'Informatique de base' },
          { slug: 'bureautique', name: 'Bureautique (Word, Excel, PowerPoint)' },
          { slug: 'accompagnement', name: 'Accompagnement scolaire' },
          { slug: 'entrepreneuriat', name: 'Entrepreneuriat' }
        ];
        setFormations(fallbackFormations);
        setFormData(prev => ({ ...prev, formation_slug: fallbackFormations[0].slug }));
      } finally {
        setFormationsLoading(false);
      }
    };

    loadFormations();
  }, [selectedFormation]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis.';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Le format de l\'email est invalide.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis.';
    }

    if (!formData.formation_slug) {
      newErrors.formation_slug = 'Veuillez sélectionner une formation.';
    }

    if (!formData.paymentReceipt) {
      newErrors.paymentReceipt = 'Le reçu de paiement est requis.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }

  const handleFileChange = (file: File | null) => {
    if (file) {
      setFormData(prev => ({ ...prev, paymentReceipt: file }));
      if (errors.paymentReceipt) {
        setErrors(prev => ({ ...prev, paymentReceipt: '' }));
      }
    } else {
      setFormData(prev => ({ ...prev, paymentReceipt: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez corriger les erreurs dans le formulaire.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.paymentReceipt) {
      toast({
        title: "Erreur",
        description: "Le reçu de paiement est requis.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const inscriptionData: FormationInscriptionData = {
        ...formData,
        paymentReceipt: formData.paymentReceipt
      };

      const response = await inscriptionService.submitFormationInscription(inscriptionData);

      if (response.data.success) {
        toast({
          title: "Inscription soumise !",
          description: "Votre inscription a été soumise avec succès. Vous recevrez un email de confirmation.",
        });

        navigate('/formations/open-formations', { 
          state: { 
            inscriptionSuccess: true,
            inscriptionId: response.data.data.id,
            formation: response.data.data.formation
          } 
        });
      }
    } catch (error: any) {
      console.error('Erreur inscription Formation:', error);
      
      const errorMessage = error.response?.data?.message || 'Erreur lors de l\'inscription. Veuillez réessayer.';
      
      if (error.response?.status === 422 && error.response?.data?.errors) {
        const backendErrors = error.response.data.errors;
        setErrors(backendErrors);
      }

      toast({
        title: "Erreur d'inscription",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Inscription Formation
          </CardTitle>
          <CardDescription className="text-center">
            Inscrivez-vous à nos formations pour développer vos compétences.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Assurez-vous d'avoir effectué le paiement avant de soumettre votre inscription. 
              Le reçu de paiement est obligatoire pour valider votre inscription.
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations personnelles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Votre prénom"
                  className={errors.firstName ? 'border-red-500' : ''}
                  disabled={loading}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Nom *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Votre nom"
                  className={errors.lastName ? 'border-red-500' : ''}
                  disabled={loading}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="votre.email@exemple.com"
                  className={errors.email ? 'border-red-500' : ''}
                  disabled={loading}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+229 XX XX XX XX"
                  className={errors.phone ? 'border-red-500' : ''}
                  disabled={loading}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Formation et niveau */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="formation_slug">Formation *</Label>
                <Select
                  value={formData.formation_slug}
                  onValueChange={(value) => handleInputChange('formation_slug', value)}
                  disabled={loading || formationsLoading || formations.length === 0}
                >
                  <SelectTrigger className={errors.formation_slug ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Sélectionnez une formation" />
                  </SelectTrigger>
                  <SelectContent>
                    {formations.map((formation) => (
                      <SelectItem key={formation.slug} value={formation.slug}>
                        {formation.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.formation_slug && (
                  <p className="text-sm text-red-500">{errors.formation_slug}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Niveau (optionnel)</Label>
                <Select
                  value={formData.level}
                  onValueChange={(value) => handleInputChange('level', value)}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(levelOptions).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Motivation */}
            <div className="space-y-2">
              <Label htmlFor="motivation">Motivation (optionnel)</Label>
              <Textarea
                id="motivation"
                value={formData.motivation}
                onChange={(e) => handleInputChange('motivation', e.target.value)}
                placeholder="Pourquoi souhaitez-vous suivre cette formation ?"
                rows={3}
                disabled={loading}
              />
            </div>

            {/* Reçu de paiement */}
            <div className="space-y-2">
              <Label>Reçu de paiement *</Label>
              <DocumentFileUpload
                onFileChange={handleFileChange}
                accept={{
                  'image/*': ['.jpg', '.jpeg', '.png'],
                  'application/pdf': ['.pdf']
                }}
                maxSize={10 * 1024 * 1024} // 10MB
                description="Téléchargez votre reçu de paiement (JPG, PNG ou PDF, max 10MB)"
                disabled={loading}
              />
              {errors.paymentReceipt && (
                <p className="text-sm text-red-500">{errors.paymentReceipt}</p>
              )}
            </div>

            {/* Boutons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/formations/open-formations')}
                disabled={loading}
                className="flex-1"
              >
                Annuler
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Soumission en cours...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Soumettre l'inscription
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OpenFormationsInscriptionPage;