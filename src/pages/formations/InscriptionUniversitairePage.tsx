// src/pages/formations/InscriptionUniversitairePage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Loader2, Upload, AlertCircle, Calendar } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import inscriptionService, { UniversityInscriptionData } from '@/services/inscription-service';
import { DocumentFileUpload } from '@/components/common/DocumentFileUpload';
import { useUniversityPrograms } from '@/hooks/useUniversityPrograms';
import { PublicUniversityProgram } from '@/types/university';

const genderOptions = {
  'male': 'Masculin',
  'female': 'Féminin',
  'other': 'Autre'
};

const bacMentionOptions = {
  'passable': 'Passable',
  'assez-bien': 'Assez bien',
  'bien': 'Bien',
  'tres-bien': 'Très bien'
};

const InscriptionUniversitairePage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { data: programs, isLoading: programsLoading, error: programsError } = useUniversityPrograms();
  const [formData, setFormData] = useState<Omit<UniversityInscriptionData, 'documents'> & { documents?: File }>({
    // Infos personnelles
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    dob: '',
    nationality: '',
    gender: 'male',
    
    // Infos académiques
    program: '', // Sera mis à jour quand les programmes seront chargés
    parentNames: '',
    parentPhone: '',
    
    // Spécifique Licence
    highSchool: '',
    bacMention: 'passable',
    graduationYear: new Date().getFullYear(),
    
    // Spécifique Master
    licenseYear: undefined,
    licenseUniversity: '',
    
    // Documents
    documents: undefined,
    agreeToTerms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Définir le premier programme comme sélection par défaut
  useEffect(() => {
    if (programs && programs.length > 0 && !formData.program) {
      setFormData(prev => ({
        ...prev,
        program: programs[0].slug || programs[0].id?.toString() || ''
      }));
    }
  }, [programs, formData.program]);

  const isMasterProgram = formData.program && programs?.find(p => 
    (p.slug === formData.program || p.id?.toString() === formData.program) && 
    p.level === 'MASTER'
  );

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validation infos personnelles
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

    if (!formData.city.trim()) {
      newErrors.city = 'La ville est requise.';
    }

    if (!formData.dob) {
      newErrors.dob = 'La date de naissance est requise.';
    } else {
      const dobDate = new Date(formData.dob);
      const today = new Date();
      if (dobDate >= today) {
        newErrors.dob = 'La date de naissance doit être antérieure à aujourd\'hui.';
      }
    }

    if (!formData.nationality.trim()) {
      newErrors.nationality = 'La nationalité est requise.';
    }

    if (!formData.program) {
      newErrors.program = 'Le programme d\'études est requis.';
    }

    if (!formData.parentNames.trim()) {
      newErrors.parentNames = 'Le nom du parent ou tuteur est requis.';
    }

    if (!formData.parentPhone.trim()) {
      newErrors.parentPhone = 'Le téléphone du parent ou tuteur est requis.';
    }

    // Validation conditionnelle selon le programme
    if (isMasterProgram) {
      // Master - Validation licence
      if (!formData.licenseYear) {
        newErrors.licenseYear = 'L\'année d\'obtention de la licence est requise.';
      } else if (formData.licenseYear < 2010 || formData.licenseYear > new Date().getFullYear()) {
        newErrors.licenseYear = 'L\'année d\'obtention doit être entre 2010 et ' + new Date().getFullYear() + '.';
      }

      if (!formData.licenseUniversity?.trim()) {
        newErrors.licenseUniversity = 'L\'université de la licence est requise.';
      }
    } else {
      // Licence - Validation Bac
      if (!formData.highSchool?.trim()) {
        newErrors.highSchool = 'L\'établissement du Bac est requis.';
      }

      if (!formData.graduationYear) {
        newErrors.graduationYear = 'L\'année d\'obtention du Bac est requise.';
      } else if (formData.graduationYear < 2020 || formData.graduationYear > new Date().getFullYear()) {
        newErrors.graduationYear = 'L\'année d\'obtention doit être entre 2020 et ' + new Date().getFullYear() + '.';
      }
    }

    if (!formData.documents) {
      newErrors.documents = 'Le document PDF est requis.';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'Vous devez accepter la politique de confidentialité.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileChange = (file: File | null) => {
    if (file) {
      setFormData(prev => ({ ...prev, documents: file }));
      if (errors.documents) {
        setErrors(prev => ({ ...prev, documents: '' }));
      }
    } else {
      setFormData(prev => ({ ...prev, documents: undefined }));
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

    if (!formData.documents) {
      toast({
        title: "Erreur",
        description: "Le document PDF est requis.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const inscriptionData: UniversityInscriptionData = {
        ...formData,
        documents: formData.documents
      };

      const response = await inscriptionService.submitUniversityInscription(inscriptionData);

      if (response.data.success) {
        toast({
          title: "Inscription soumise !",
          description: "Votre inscription universitaire a été soumise avec succès. Vous recevrez un email de confirmation.",
        });

        navigate('/formations/university', { 
          state: { 
            inscriptionSuccess: true,
            inscriptionId: response.data.data.id,
            program: response.data.data.program
          } 
        });
      }
    } catch (error: any) {
      console.error('Erreur inscription Université:', error);
      
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

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2010 + 1 }, (_, i) => currentYear - i);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Inscription Université ISTM
          </CardTitle>
          <CardDescription className="text-center">
            Remplissez ce formulaire pour vous inscrire à l'un de nos programmes universitaires.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {programsError && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">
                Erreur lors du chargement des programmes. Veuillez rafraîchir la page.
              </AlertDescription>
            </Alert>
          )}

          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Assurez-vous d'avoir préparé tous les documents nécessaires avant de soumettre votre inscription. 
              Un document PDF combiné est requis.
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informations personnelles */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Informations personnelles</h3>
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

                <div className="space-y-2">
                  <Label htmlFor="city">Ville *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Votre ville"
                    className={errors.city ? 'border-red-500' : ''}
                    disabled={loading}
                  />
                  {errors.city && (
                    <p className="text-sm text-red-500">{errors.city}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob">Date de naissance *</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleInputChange('dob', e.target.value)}
                    className={errors.dob ? 'border-red-500' : ''}
                    disabled={loading}
                  />
                  {errors.dob && (
                    <p className="text-sm text-red-500">{errors.dob}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationalité *</Label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                    placeholder="Votre nationalité"
                    className={errors.nationality ? 'border-red-500' : ''}
                    disabled={loading}
                  />
                  {errors.nationality && (
                    <p className="text-sm text-red-500">{errors.nationality}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Genre *</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleInputChange('gender', value)}
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre genre" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(genderOptions).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Informations académiques */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Informations académiques</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="program">Programme d'études *</Label>
                  <Select
                    value={formData.program}
                    onValueChange={(value) => handleInputChange('program', value)}
                    disabled={loading}
                  >
                    <SelectTrigger className={errors.program ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Sélectionnez un programme" />
                    </SelectTrigger>
                    <SelectContent>
                      {programsLoading ? (
                        <div className="p-2 text-center text-sm text-gray-500 flex items-center justify-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Chargement...
                        </div>
                      ) : programs && programs.length > 0 ? (
                        programs.map((program) => (
                          <SelectItem 
                            key={program.id} 
                            value={program.slug || program.id?.toString() || `program-${program.id}`}
                          >
                            {program.name} - {program.level}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-2 text-center text-sm text-gray-500">
                          Aucun programme disponible
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                  {errors.program && (
                    <p className="text-sm text-red-500">{errors.program}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentNames">Nom du parent/tuteur *</Label>
                  <Input
                    id="parentNames"
                    value={formData.parentNames}
                    onChange={(e) => handleInputChange('parentNames', e.target.value)}
                    placeholder="Nom complet du parent ou tuteur"
                    className={errors.parentNames ? 'border-red-500' : ''}
                    disabled={loading}
                  />
                  {errors.parentNames && (
                    <p className="text-sm text-red-500">{errors.parentNames}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentPhone">Téléphone du parent/tuteur *</Label>
                  <Input
                    id="parentPhone"
                    value={formData.parentPhone}
                    onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                    placeholder="+229 XX XX XX XX"
                    className={errors.parentPhone ? 'border-red-500' : ''}
                    disabled={loading}
                  />
                  {errors.parentPhone && (
                    <p className="text-sm text-red-500">{errors.parentPhone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Informations spécifiques selon le programme */}
            {isMasterProgram ? (
              <div>
                <h3 className="text-lg font-semibold mb-4">Informations sur la Licence</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="licenseYear">Année d'obtention de la licence *</Label>
                    <Select
                      value={formData.licenseYear?.toString()}
                      onValueChange={(value) => handleInputChange('licenseYear', parseInt(value))}
                      disabled={loading}
                    >
                      <SelectTrigger className={errors.licenseYear ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Sélectionnez l'année" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.licenseYear && (
                      <p className="text-sm text-red-500">{errors.licenseYear}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="licenseUniversity">Université de la licence *</Label>
                    <Input
                      id="licenseUniversity"
                      value={formData.licenseUniversity}
                      onChange={(e) => handleInputChange('licenseUniversity', e.target.value)}
                      placeholder="Nom de l'université"
                      className={errors.licenseUniversity ? 'border-red-500' : ''}
                      disabled={loading}
                    />
                    {errors.licenseUniversity && (
                      <p className="text-sm text-red-500">{errors.licenseUniversity}</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold mb-4">Informations sur le Baccalauréat</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="highSchool">Établissement du Bac *</Label>
                    <Input
                      id="highSchool"
                      value={formData.highSchool}
                      onChange={(e) => handleInputChange('highSchool', e.target.value)}
                      placeholder="Nom de l'établissement"
                      className={errors.highSchool ? 'border-red-500' : ''}
                      disabled={loading}
                    />
                    {errors.highSchool && (
                      <p className="text-sm text-red-500">{errors.highSchool}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bacMention">Mention du Bac *</Label>
                    <Select
                      value={formData.bacMention}
                      onValueChange={(value) => handleInputChange('bacMention', value)}
                      disabled={loading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez la mention" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(bacMentionOptions).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="graduationYear">Année d'obtention *</Label>
                    <Select
                      value={formData.graduationYear?.toString()}
                      onValueChange={(value) => handleInputChange('graduationYear', parseInt(value))}
                      disabled={loading}
                    >
                      <SelectTrigger className={errors.graduationYear ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Sélectionnez l'année" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: currentYear - 2020 + 1 }, (_, i) => currentYear - i).map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.graduationYear && (
                      <p className="text-sm text-red-500">{errors.graduationYear}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Documents */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Documents</h3>
              <div className="space-y-2">
                <Label>Document PDF requis *</Label>
                <DocumentFileUpload
                  onFileChange={handleFileChange}
                  accept={{
                    'application/pdf': ['.pdf']
                  }}
                  maxSize={10 * 1024 * 1024} // 10MB
                  description="Téléchargez un document PDF combiné avec tous vos documents (max 10MB)"
                  disabled={loading}
                />
                {errors.documents && (
                  <p className="text-sm text-red-500">{errors.documents}</p>
                )}
              </div>
            </div>

            {/* Consentement */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
                  disabled={loading}
                />
                <Label htmlFor="agreeToTerms" className="text-sm">
                  J'accepte la politique de confidentialité et les termes d'utilisation *
                </Label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-sm text-red-500">{errors.agreeToTerms}</p>
              )}
            </div>

            {/* Boutons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/formations/university')}
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

export default InscriptionUniversitairePage;