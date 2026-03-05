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
    <div className="min-h-screen bg-[#FDFBF7] py-20 px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C5A55A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1B2A4A]/3 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 animate-[fadeInDown_1s_ease-out]">
          <div className="inline-flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-[#C5A55A]"></span>
            <span className="text-[#1B2A4A] font-bold uppercase tracking-[0.3em] text-[11px]">Candidature</span>
            <span className="h-px w-12 bg-[#C5A55A]"></span>
          </div>
          <h1 className="text-5xl md:text-7xl text-[#0F172A] font-medium tracking-tighter mb-6">
            Inscription <span className="text-[#B8860B]">ISTMR</span>
          </h1>
          <p className="text-[#1B2A4A]/50 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Commencez votre parcours vers l'excellence. Remplissez consciencieusement ce formulaire pour rejoindre notre communauté universitaire jésuite.
          </p>
        </div>

        <div className="bg-white border border-[#C5A55A]/10 shadow-[0_20px_50px_rgba(27,42,74,0.05)] overflow-hidden animate-[fadeInUp_1s_ease-out_0.3s_both]">
          <div className="bg-[#0F172A] px-8 py-6 flex items-center justify-between border-b border-[#B8860B]/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#B8860B]/10 rounded-lg border border-[#B8860B]/20">
                <GraduationCap className="w-6 h-6 text-[#B8860B]" />
              </div>
              <h2 className="text-xl text-white font-medium tracking-tight">Formulaire d'Admission</h2>
            </div>
            <div className="hidden sm:block">
              <p className="text-[10px] text-[#A38A4D] font-bold uppercase tracking-[0.2em]">Année Académique {currentYear}</p>
            </div>
          </div>

          <div className="p-8 md:p-12">
            {programsError && (
              <Alert className="mb-10 border-red-100 bg-red-50 text-red-800 rounded-none shadow-none">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <AlertDescription className="text-sm">
                  Nous rencontrons des difficultés pour charger les programmes. Veuillez rafraîchir la page ou contacter le support.
                </AlertDescription>
              </Alert>
            )}

            <div className="mb-12 p-6 bg-[#F9F7F2] border-l-4 border-[#B8860B] flex gap-4">
              <div className="shrink-0 mt-1">
                <AlertCircle className="h-5 w-5 text-[#B8860B]" />
              </div>
              <p className="text-sm text-[#1B2A4A]/70 leading-relaxed font-light">
                <strong>Important :</strong> Préparez un document PDF unique contenant l'ensemble de vos pièces justificatives (Diplômes, Relevés de notes, CNI/Passeport). La taille maximale autorisée est de 10 MB.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Informations personnelles */}
              <div className="space-y-8">
                <div className="flex items-center gap-4 pb-2 border-b border-[#C5A55A]/10">
                  <span className="text-[14px] text-[#B8860B] font-bold uppercase tracking-[0.2em]">01</span>
                  <h3 className="text-lg text-[#0F172A] font-medium uppercase tracking-widest">Informations Personnelles</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  <div className="space-y-3">
                    <Label htmlFor="firstName" className="text-[11px] font-bold uppercase tracking-widest text-[#1B2A4A]/50">Prénom *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Jean-Pierre"
                      className={`h-12 bg-[#FDFBF7] border-[#C5A55A]/20 focus:border-[#B8860B] focus:ring-0 rounded-none transition-all placeholder:text-[#1B2A4A]/20 ${errors.firstName ? 'border-red-500' : ''}`}
                      disabled={loading}
                    />
                    {errors.firstName && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.firstName}</p>}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="lastName" className="text-[11px] font-bold uppercase tracking-widest text-[#1B2A4A]/50">Nom *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="DOUKPO"
                      className={`h-12 bg-[#FDFBF7] border-[#C5A55A]/20 focus:border-[#B8860B] focus:ring-0 rounded-none transition-all placeholder:text-[#1B2A4A]/20 ${errors.lastName ? 'border-red-500' : ''}`}
                      disabled={loading}
                    />
                    {errors.lastName && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.lastName}</p>}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-[11px] font-bold uppercase tracking-widest text-[#1B2A4A]/50">Email Universitaire/Privé *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="exemple@email.com"
                      className={`h-12 bg-[#FDFBF7] border-[#C5A55A]/20 focus:border-[#B8860B] focus:ring-0 rounded-none transition-all placeholder:text-[#1B2A4A]/20 ${errors.email ? 'border-red-500' : ''}`}
                      disabled={loading}
                    />
                    {errors.email && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.email}</p>}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-[11px] font-bold uppercase tracking-widest text-[#1B2A4A]/50">Téléphone *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+229 XX XX XX XX"
                      className={`h-12 bg-[#FDFBF7] border-[#C5A55A]/20 focus:border-[#B8860B] focus:ring-0 rounded-none transition-all placeholder:text-[#1B2A4A]/20 ${errors.phone ? 'border-red-500' : ''}`}
                      disabled={loading}
                    />
                    {errors.phone && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.phone}</p>}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="city" className="text-[11px] font-bold uppercase tracking-widest text-[#1B2A4A]/50">Ville de Résidence *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Cotonou"
                      className={`h-12 bg-[#FDFBF7] border-[#C5A55A]/20 focus:border-[#B8860B] focus:ring-0 rounded-none transition-all placeholder:text-[#1B2A4A]/20 ${errors.city ? 'border-red-500' : ''}`}
                      disabled={loading}
                    />
                    {errors.city && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.city}</p>}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="dob" className="text-[11px] font-bold uppercase tracking-widest text-[#1B2A4A]/50">Date de Naissance *</Label>
                    <div className="relative">
                      <Input
                        id="dob"
                        type="date"
                        value={formData.dob}
                        onChange={(e) => handleInputChange('dob', e.target.value)}
                        className={`h-12 bg-[#FDFBF7] border-[#C5A55A]/20 focus:border-[#B8860B] focus:ring-0 rounded-none transition-all ${errors.dob ? 'border-red-500' : ''}`}
                        disabled={loading}
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A55A]/40 pointer-events-none" />
                    </div>
                    {errors.dob && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.dob}</p>}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="nationality" className="text-[11px] font-bold uppercase tracking-widest text-[#1B2A4A]/50">Nationalité *</Label>
                    <Input
                      id="nationality"
                      value={formData.nationality}
                      onChange={(e) => handleInputChange('nationality', e.target.value)}
                      placeholder="Béninoise"
                      className={`h-12 bg-[#FDFBF7] border-[#C5A55A]/20 focus:border-[#B8860B] focus:ring-0 rounded-none transition-all placeholder:text-[#1B2A4A]/20 ${errors.nationality ? 'border-red-500' : ''}`}
                      disabled={loading}
                    />
                    {errors.nationality && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.nationality}</p>}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="gender" className="text-[11px] font-bold uppercase tracking-widest text-[#1B2A4A]/50">Genre *</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => handleInputChange('gender', value)}
                      disabled={loading}
                    >
                      <SelectTrigger className="h-12 bg-[#FDFBF7] border-[#C5A55A]/20 focus:border-[#B8860B] focus:ring-0 rounded-none">
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none border-[#C5A55A]/20">
                        {Object.entries(genderOptions).map(([value, label]) => (
                          <SelectItem key={value} value={value} className="focus:bg-[#1B2A4A] focus:text-white rounded-none">
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Informations académiques */}
              <div className="space-y-8">
                <div className="flex items-center gap-4 pb-2 border-b border-[#C5A55A]/10">
                  <span className="text-[14px] text-[#B8860B] font-bold uppercase tracking-[0.2em]">02</span>
                  <h3 className="text-lg text-[#0F172A] font-medium uppercase tracking-widest">Choix Académique</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  <div className="space-y-3 md:col-span-2">
                    <Label htmlFor="program" className="text-[11px] font-bold uppercase tracking-widest text-[#1B2A4A]/50">Programme Souhaité *</Label>
                    <Select
                      value={formData.program}
                      onValueChange={(value) => handleInputChange('program', value)}
                      disabled={loading}
                    >
                      <SelectTrigger className={`h-14 bg-[#FDFBF7] border-[#C5A55A]/20 focus:border-[#B8860B] focus:ring-0 rounded-none text-base ${errors.program ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Sélectionnez votre future filière" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none border-[#C5A55A]/20">
                        {programsLoading ? (
                          <div className="p-4 text-center text-sm text-[#1B2A4A]/40 flex items-center justify-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin text-[#B8860B]" />
                            Chargement des filières...
                          </div>
                        ) : programs && programs.length > 0 ? (
                          programs.map((program) => (
                            <SelectItem
                              key={program.id}
                              value={program.slug || program.id?.toString() || `program-${program.id}`}
                              className="focus:bg-[#1B2A4A] focus:text-white py-3 rounded-none"
                            >
                              <div className="flex flex-col">
                                <span className="font-medium">{program.name}</span>
                                <span className="text-[10px] uppercase tracking-widest opacity-60">{program.level} — {getDurationLabel(program.duration)}</span>
                              </div>
                            </SelectItem>
                          ))
                        ) : (
                          <div className="p-4 text-center text-sm text-[#1B2A4A]/40">Aucun programme disponible pour le moment</div>
                        )}
                      </SelectContent>
                    </Select>
                    {errors.program && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.program}</p>}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="parentNames" className="text-[11px] font-bold uppercase tracking-widest text-[#1B2A4A]/50">Nom du Parent / Tuteur *</Label>
                    <Input
                      id="parentNames"
                      value={formData.parentNames}
                      onChange={(e) => handleInputChange('parentNames', e.target.value)}
                      placeholder="Nom complet"
                      className={`h-12 bg-[#FDFBF7] border-[#C5A55A]/20 focus:border-[#B8860B] focus:ring-0 rounded-none transition-all placeholder:text-[#1B2A4A]/20 ${errors.parentNames ? 'border-red-500' : ''}`}
                      disabled={loading}
                    />
                    {errors.parentNames && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.parentNames}</p>}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="parentPhone" className="text-[11px] font-bold uppercase tracking-widest text-[#1B2A4A]/50">Téléphone du Parent / Tuteur *</Label>
                    <Input
                      id="parentPhone"
                      value={formData.parentPhone}
                      onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                      placeholder="+229 XX XX XX XX"
                      className={`h-12 bg-[#FDFBF7] border-[#C5A55A]/20 focus:border-[#B8860B] focus:ring-0 rounded-none transition-all placeholder:text-[#1B2A4A]/20 ${errors.parentPhone ? 'border-red-500' : ''}`}
                      disabled={loading}
                    />
                    {errors.parentPhone && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.parentPhone}</p>}
                  </div>
                </div>
              </div>

              {/* Informations spécifiques selon le programme */}
              <div className="space-y-8 p-10 bg-[#FDFBF7] border border-[#C5A55A]/10">
                {isMasterProgram ? (
                  <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
                    <div className="flex items-center gap-4 pb-2 border-b border-[#C5A55A]/10">
                      <span className="text-[14px] text-[#B8860B] font-bold uppercase tracking-[0.2em]">03</span>
                      <h3 className="text-lg text-[#0F172A] font-medium uppercase tracking-widest">Parcours Licence</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                      <div className="space-y-3">
                        <Label htmlFor="licenseUniversity" className="text-[11px] font-bold uppercase tracking-widest text-[#1B2A4A]/50">Université Provenance *</Label>
                        <Input
                          id="licenseUniversity"
                          value={formData.licenseUniversity}
                          onChange={(e) => handleInputChange('licenseUniversity', e.target.value)}
                          placeholder="Nom de l'institution"
                          className="h-12 bg-white border-[#C5A55A]/20 focus:border-[#B8860B] focus:ring-0 rounded-none"
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="licenseYear" className="text-[11px] font-bold uppercase tracking-widest text-[#1B2A4A]/50">Année Graduation *</Label>
                        <Select
                          value={formData.licenseYear?.toString()}
                          onValueChange={(value) => handleInputChange('licenseYear', parseInt(value))}
                          disabled={loading}
                        >
                          <SelectTrigger className="h-12 bg-white border-[#C5A55A]/20 focus:border-[#B8860B] focus:ring-0 rounded-none">
                            <SelectValue placeholder="Sélectionnez" />
                          </SelectTrigger>
                          <SelectContent className="rounded-none">
                            {years.map(y => <SelectItem key={y} value={y.toString()} className="rounded-none">{y}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
                    <div className="flex items-center gap-4 pb-2 border-b border-[#C5A55A]/10">
                      <span className="text-[14px] text-[#B8860B] font-bold uppercase tracking-[0.2em]">03</span>
                      <h3 className="text-lg text-[#0F172A] font-medium uppercase tracking-widest">Parcours Secondaire (BAC)</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="highSchool" className="text-[11px] font-bold uppercase tracking-widest text-[#1B2A4A]/50">Établissement *</Label>
                        <Input
                          id="highSchool"
                          value={formData.highSchool}
                          onChange={(e) => handleInputChange('highSchool', e.target.value)}
                          placeholder="Lycée d'origine"
                          className="h-12 bg-white border-[#C5A55A]/20 focus:border-[#B8860B] focus:ring-0 rounded-none"
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="bacMention" className="text-[11px] font-bold uppercase tracking-widest text-[#1B2A4A]/50">Mention *</Label>
                        <Select
                          value={formData.bacMention}
                          onValueChange={(value) => handleInputChange('bacMention', value)}
                          disabled={loading}
                        >
                          <SelectTrigger className="h-12 bg-white border-[#C5A55A]/20 focus:border-[#B8860B] focus:ring-0 rounded-none">
                            <SelectValue placeholder="Mention" />
                          </SelectTrigger>
                          <SelectContent className="rounded-none">
                            {Object.entries(bacMentionOptions).map(([v, l]) => <SelectItem key={v} value={v} className="rounded-none">{l}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="graduationYear" className="text-[11px] font-bold uppercase tracking-widest text-[#1B2A4A]/50">Session BAC *</Label>
                        <Select
                          value={formData.graduationYear?.toString()}
                          onValueChange={(value) => handleInputChange('graduationYear', parseInt(value))}
                          disabled={loading}
                        >
                          <SelectTrigger className="h-12 bg-white border-[#C5A55A]/20 focus:border-[#B8860B] focus:ring-0 rounded-none">
                            <SelectValue placeholder="Année" />
                          </SelectTrigger>
                          <SelectContent className="rounded-none">
                            {Array.from({ length: currentYear - 2020 + 1 }, (_, i) => currentYear - i).map(y => <SelectItem key={y} value={y.toString()} className="rounded-none">{y}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Documents */}
              <div className="space-y-8">
                <div className="flex items-center gap-4 pb-2 border-b border-[#C5A55A]/10">
                  <span className="text-[14px] text-[#B8860B] font-bold uppercase tracking-[0.2em]">04</span>
                  <h3 className="text-lg text-[#0F172A] font-medium uppercase tracking-widest">Dossier de Candidature</h3>
                </div>
                <div className="p-8 border-2 border-dashed border-[#C5A55A]/20 hover:border-[#B8860B]/50 transition-all bg-[#F9F7F2]/50 group">
                  <DocumentFileUpload
                    onFileChange={handleFileChange}
                    accept={{ 'application/pdf': ['.pdf'] }}
                    maxSize={10 * 1024 * 1024}
                    description="Cliquez ou glissez votre dossier PDF combiné ici"
                    disabled={loading}
                  />
                  {errors.documents && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider mt-4">{errors.documents}</p>}
                </div>
              </div>

              {/* Consentement */}
              <div className="p-8 bg-[#1B2A4A]/5 space-y-4">
                <div className="flex items-start space-x-4">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
                    disabled={loading}
                    className="mt-1 border-[#C5A55A]/40 data-[state=checked]:bg-[#B8860B] data-[state=checked]:border-[#B8860B]"
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm text-[#1B2A4A]/70 leading-relaxed font-light cursor-pointer select-none">
                    Je certifie sur l'honneur l'exactitude des informations fournies et j'accepte que mes données soient traitées par l'ISTMR dans le cadre de ma candidature, conformément à la politique de confidentialité.
                  </Label>
                </div>
                {errors.agreeToTerms && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-8">{errors.agreeToTerms}</p>}
              </div>

              {/* Boutons */}
              <div className="flex flex-col sm:flex-row gap-6 pt-10">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/istmr/programmes')}
                  disabled={loading}
                  className="h-16 flex-1 rounded-none border-[#1B2A4A]/10 text-[#1B2A4A]/40 uppercase tracking-[0.2em] text-[12px] font-bold hover:bg-[#F9F7F2] hover:text-[#1B2A4A] transition-all"
                >
                  Annuler
                </Button>

                <Button
                  type="submit"
                  disabled={loading}
                  className="h-16 flex-1 rounded-none bg-[#1B2A4A] text-white uppercase tracking-[0.2em] text-[12px] font-bold hover:bg-[#B8860B] transition-all shadow-xl shadow-slate-200"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Transmission...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Upload className="w-5 h-5" />
                      Soumettre mon dossier
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Support info */}
        <div className="mt-12 text-center text-[#1B2A4A]/40 text-[11px] uppercase tracking-[0.15em] font-light">
          Besoin d'aide ? Contactez le service des admissions :
          <a href="mailto:istmr-admissions@crec.bj" className="ml-2 text-[#C5A55A] font-bold hover:underline">istmr-admissions@crec.bj</a>
        </div>
      </div>
    </div>
  );
};


export default InscriptionUniversitairePage;