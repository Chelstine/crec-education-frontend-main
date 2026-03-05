// src/pages/formations/FablabInscriptionPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Loader2, Upload, FileText, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import inscriptionService, { FablabInscriptionData } from '@/services/inscription-service';
import { DocumentFileUpload } from '@/components/common/DocumentFileUpload';

const FablabInscriptionPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<FablabInscriptionData, 'paymentReceipt'> & { paymentReceipt?: File }>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    workshop: 'Abonnement Etudiant',
    experience: '',
    motivation: '',
    paymentReceipt: undefined
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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

    if (!formData.workshop) {
      newErrors.workshop = 'Veuillez sélectionner une formule d\'abonnement.';
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
  };

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
      const inscriptionData: FablabInscriptionData = {
        ...formData,
        paymentReceipt: formData.paymentReceipt
      };

      const response = await inscriptionService.submitFablabInscription(inscriptionData);

      if (response.data.success) {
        toast({
          title: "Inscription soumise !",
          description: "Votre inscription FabLab a été soumise avec succès. Vous recevrez un email de confirmation.",
        });

        // Rediriger vers une page de confirmation ou revenir à la page FabLab
        navigate('/formations/fablab', { 
          state: { 
            inscriptionSuccess: true,
            inscriptionId: response.data.data.id 
          } 
        });
      }
    } catch (error: any) {
      console.error('Erreur inscription FabLab:', error);
      
      const errorMessage = error.response?.data?.message || 'Erreur lors de l\'inscription. Veuillez réessayer.';
      
      // Traiter les erreurs de validation du backend
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
            Inscription FabLab
          </CardTitle>
          <CardDescription className="text-center">
            Remplissez ce formulaire pour vous inscrire au FabLab et accéder à nos équipements de fabrication numérique.
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

            {/* Formule d'abonnement */}
            <div className="space-y-2">
              <Label htmlFor="workshop">Formule d'abonnement *</Label>
              <Select
                value={formData.workshop}
                onValueChange={(value) => handleInputChange('workshop', value)}
                disabled={loading}
              >
                <SelectTrigger className={errors.workshop ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Sélectionnez une formule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Abonnement Etudiant">
                    Abonnement Étudiant
                  </SelectItem>
                  <SelectItem value="Abonnement Professionel">
                    Abonnement Professionnel
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.workshop && (
                <p className="text-sm text-red-500">{errors.workshop}</p>
              )}
            </div>

            {/* Expérience */}
            <div className="space-y-2">
              <Label htmlFor="experience">Expérience préalable (optionnel)</Label>
              <Textarea
                id="experience"
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                placeholder="Décrivez votre expérience avec les outils de fabrication numérique..."
                rows={3}
                disabled={loading}
              />
            </div>

            {/* Motivation */}
            <div className="space-y-2">
              <Label htmlFor="motivation">Motivation (optionnel)</Label>
              <Textarea
                id="motivation"
                value={formData.motivation}
                onChange={(e) => handleInputChange('motivation', e.target.value)}
                placeholder="Pourquoi souhaitez-vous rejoindre le FabLab ?"
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
                onClick={() => navigate('/formations/fablab')}
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

export default FablabInscriptionPage;