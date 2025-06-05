import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { 
  FileText, Upload, User, BookOpen, GraduationCap, Heart, Users, 
  CreditCard, Smartphone, Building, AlertCircle, CheckCircle, 
  DollarSign, Calendar, Clock, Info, ArrowLeft, ArrowRight,
  MapPin, Phone, Mail, IdCard, Award, Target, Briefcase
} from "lucide-react";
import { useState, useEffect } from "react";
import { UniversityProgram, UniversityApplication, PaymentMethod, DocumentType } from "@/types";

interface PaymentMethodOption {
  id: string;
  name: string;
  type: PaymentMethod;
  accountNumber: string;
  accountName: string;
  isActive: boolean;
}

const InscriptionUniversitairePage = () => {
  const [selectedFiles, setSelectedFiles] = useState<Record<string, File>>({});
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProgram, setSelectedProgram] = useState<UniversityProgram | null>(null);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    dob: "",
    nationality: "",
    gender: "",
    program: "",
    highSchool: "",
    bacMention: "",
    graduationYear: "",
    parentNames: "",
    parentPhone: "",
    motivation: "",
    paymentReference: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock university programs data - in real app, this would come from API
  const programs: UniversityProgram[] = [
    {
      id: "prog-1",
      name: "Licence en Développement Logiciel",
      title: "Licence en Développement Logiciel",
      description: "Formation complète en développement d'applications et systèmes informatiques modernes",
      longDescription: "Formation complète en développement d'applications et systèmes informatiques modernes avec une approche pratique et professionnelle",
      duration: "3 ans",
      degree: "licence",
      level: "licence",
      department: "Informatique",
      capacity: 50,
      currentApplications: 0,
      applicationDeadline: "2024-07-15",
      startDate: "2024-09-01",
      tuitionFee: 850000,
      inscriptionFee: 150000,
      currency: "FCFA",
      requirements: ["Baccalauréat série C, D ou F", "Moyenne générale ≥ 12/20"],
      objectives: [
        "Maîtriser les langages de programmation modernes",
        "Développer des applications web et mobiles",
        "Comprendre les architectures logicielles",
        "Gérer des projets de développement"
      ],
      careerOutlooks: [
        "Développeur Full-Stack",
        "Ingénieur logiciel",
        "Chef de projet IT",
        "Architecte logiciel"
      ],
      documentTypes: [
        {
          id: "doc-1",
          name: "birth_certificate",
          description: "Acte de naissance",
          isRequired: true,
          maxSizeBytes: 5242880,
          maxSizeInMB: 5,
          acceptedFormats: ["pdf", "jpg", "png"],
          allowedFormats: ["pdf", "jpg", "png"]
        },
        {
          id: "doc-2",
          name: "bac_certificate",
          description: "Diplôme du Baccalauréat",
          isRequired: true,
          maxSizeBytes: 5242880,
          maxSizeInMB: 5,
          acceptedFormats: ["pdf", "jpg", "png"],
          allowedFormats: ["pdf", "jpg", "png"]
        },
        {
          id: "doc-3",
          name: "transcripts",
          description: "Relevés de notes du Bac",
          isRequired: true,
          maxSizeBytes: 5242880,
          maxSizeInMB: 5,
          acceptedFormats: ["pdf", "jpg", "png"],
          allowedFormats: ["pdf", "jpg", "png"]
        },
        {
          id: "doc-4",
          name: "id_photo",
          description: "Photo de la pièce d'identité",
          isRequired: true,
          maxSizeBytes: 2097152,
          maxSizeInMB: 2,
          acceptedFormats: ["jpg", "png"],
          allowedFormats: ["jpg", "png"]
        },
        {
          id: "doc-5",
          name: "passport_photos",
          description: "Photos d'identité (2 exemplaires)",
          isRequired: true,
          maxSizeBytes: 2097152,
          maxSizeInMB: 2,
          acceptedFormats: ["jpg", "png"],
          allowedFormats: ["jpg", "png"]
        }
      ],
      isActive: true,
      isVisible: true,
      allowOnlineApplication: true,
      requiresDocuments: true,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-15"
    },
    {
      id: "prog-2",
      name: "Master en Data Science",
      title: "Master en Data Science",
      description: "Formation avancée en analyse de données et intelligence artificielle",
      longDescription: "Formation avancée en analyse de données et intelligence artificielle avec une approche pratique et professionnelle",
      duration: "2 ans",
      degree: "master",
      level: "master",
      department: "Informatique",
      capacity: 30,
      currentApplications: 0,
      applicationDeadline: "2024-07-20",
      startDate: "2024-09-15",
      tuitionFee: 1200000,
      inscriptionFee: 200000,
      currency: "FCFA",
      requirements: ["Licence en Informatique ou équivalent", "Moyenne générale ≥ 14/20"],
      objectives: [
        "Maîtriser les techniques d'analyse de données",
        "Développer des modèles d'IA et de machine learning",
        "Utiliser les outils de Big Data",
        "Interpréter et visualiser les données"
      ],
      careerOutlooks: [
        "Data Scientist",
        "Analyste de données",
        "Consultant BI",
        "Ingénieur Machine Learning"
      ],
      documentTypes: [
        {
          id: "doc-1",
          name: "birth_certificate",
          description: "Acte de naissance",
          isRequired: true,
          maxSizeBytes: 5242880,
          maxSizeInMB: 5,
          acceptedFormats: ["pdf", "jpg", "png"],
          allowedFormats: ["pdf", "jpg", "png"]
        },
        {
          id: "doc-6",
          name: "bachelor_diploma",
          description: "Diplôme de Licence",
          isRequired: true,
          maxSizeBytes: 5242880,
          maxSizeInMB: 5,
          acceptedFormats: ["pdf", "jpg", "png"],
          allowedFormats: ["pdf", "jpg", "png"]
        },
        {
          id: "doc-7",
          name: "university_transcripts",
          description: "Relevés de notes universitaires",
          isRequired: true,
          maxSizeBytes: 5242880,
          maxSizeInMB: 5,
          acceptedFormats: ["pdf", "jpg", "png"],
          allowedFormats: ["pdf", "jpg", "png"]
        }
      ],
      isActive: true,
      isVisible: true,
      allowOnlineApplication: true,
      requiresDocuments: true,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-15"
    },
    {
      id: "prog-3",
      name: "Licence en Théologie",
      title: "Licence en Théologie",
      description: "Formation théologique ignatienne complète",
      longDescription: "Formation théologique ignatienne complète avec une approche spirituelle et académique",
      duration: "3 ans",
      degree: "licence",
      level: "licence",
      department: "Théologie",
      capacity: 40,
      currentApplications: 0,
      applicationDeadline: "2024-08-01",
      startDate: "2024-09-01",
      tuitionFee: 600000,
      inscriptionFee: 100000,
      currency: "FCFA",
      requirements: ["Baccalauréat toutes séries", "Motivation pour la théologie"],
      objectives: [
        "Approfondir la connaissance de l'Écriture Sainte",
        "Étudier la tradition théologique",
        "Développer une spiritualité ignatienne",
        "Former à l'accompagnement pastoral"
      ],
      careerOutlooks: [
        "Enseignant en théologie",
        "Accompagnateur spirituel",
        "Responsable pastoral",
        "Formateur en spiritualité"
      ],
      documentTypes: [
        {
          id: "doc-1",
          name: "birth_certificate",
          description: "Acte de naissance",
          isRequired: true,
          maxSizeBytes: 5242880,
          maxSizeInMB: 5,
          acceptedFormats: ["pdf", "jpg", "png"],
          allowedFormats: ["pdf", "jpg", "png"]
        },
        {
          id: "doc-2",
          name: "bac_certificate",
          description: "Diplôme du Baccalauréat",
          isRequired: true,
          maxSizeBytes: 5242880,
          maxSizeInMB: 5,
          acceptedFormats: ["pdf", "jpg", "png"],
          allowedFormats: ["pdf", "jpg", "png"]
        },
        {
          id: "doc-8",
          name: "recommendation_letter",
          description: "Lettre de recommandation pastorale",
          isRequired: true,
          maxSizeBytes: 5242880,
          maxSizeInMB: 5,
          acceptedFormats: ["pdf", "doc", "docx"],
          allowedFormats: ["pdf", "doc", "docx"]
        }
      ],
      isActive: true,
      isVisible: true,
      allowOnlineApplication: true,
      requiresDocuments: true,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-15"
    }
  ];

  const paymentMethods: PaymentMethodOption[] = [
    {
      id: "om",
      name: "Orange Money",
      type: "mobile_money",
      accountNumber: "+229 91 00 00 00",
      accountName: "CREC-OM-001",
      isActive: true
    },
    {
      id: "mtn",
      name: "MTN MoMo",
      type: "mobile_money", 
      accountNumber: "+229 96 00 00 00",
      accountName: "CREC-MTN-001",
      isActive: true
    },
    {
      id: "afb",
      name: "Afriland First Bank",
      type: "bank_transfer",
      accountNumber: "40001 00000 12345678901 23",
      accountName: "CREC EDUCATION",
      isActive: true
    },
    {
      id: "uba",
      name: "UBA Cameroun",
      type: "bank_transfer",
      accountNumber: "10033 00000 12345678901 45", 
      accountName: "CREC EDUCATION",
      isActive: true
    }
  ];

  useEffect(() => {
    if (formData.program) {
      const program = programs.find(p => p.id === formData.program);
      setSelectedProgram(program || null);
    }
  }, [formData.program]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const documentType = selectedProgram?.documentTypes.find(doc => doc.name === name);
      
      // Validate file size
      if (documentType && file.size > documentType.maxSizeInMB * 1024 * 1024) {
        setErrors(prev => ({ 
          ...prev, 
          [name]: `Le fichier ne doit pas dépasser ${documentType.maxSizeInMB}MB` 
        }));
        return;
      }
      
      // Validate file format
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (documentType && !documentType.allowedFormats.includes(fileExtension || '')) {
        setErrors(prev => ({ 
          ...prev, 
          [name]: `Format non autorisé. Formats acceptés: ${documentType.allowedFormats.join(', ')}` 
        }));
        return;
      }
      
      setSelectedFiles(prev => ({ ...prev, [name]: file }));
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      // Personal information validation
      if (!formData.firstName) newErrors.firstName = "Le prénom est requis.";
      if (!formData.lastName) newErrors.lastName = "Le nom est requis.";
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = "Une adresse email valide est requise.";
      if (!formData.phone) newErrors.phone = "Le numéro de téléphone est requis.";
      if (!formData.city) newErrors.city = "La ville est requise.";
      if (!formData.dob) newErrors.dob = "La date de naissance est requise.";
      if (!formData.nationality) newErrors.nationality = "La nationalité est requise.";
      if (!formData.gender) newErrors.gender = "Le genre est requis.";
    }
    
    if (step === 2) {
      // Academic information validation
      if (!formData.program) newErrors.program = "Le programme d'études est requis.";
      if (!formData.highSchool) newErrors.highSchool = "L'établissement du Bac est requis.";
      if (!formData.bacMention) newErrors.bacMention = "La mention est requise.";
      if (!formData.graduationYear) newErrors.graduationYear = "L'année d'obtention est requise.";
      if (!formData.parentNames) newErrors.parentNames = "Le nom du parent ou tuteur est requis.";
      if (!formData.parentPhone) newErrors.parentPhone = "Le numéro de téléphone du tuteur est requis.";
    }
    
    if (step === 3) {
      // Documents validation
      if (selectedProgram) {
        selectedProgram.documentTypes.forEach(doc => {
          if (doc.isRequired && !selectedFiles[doc.name]) {
            newErrors[doc.name] = `${doc.description} est requis.`;
          }
        });
      }
      if (!formData.motivation) newErrors.motivation = "La lettre de motivation est requise.";
    }
    
    if (step === 4) {
      // Payment validation
      if (!paymentMethod) newErrors.paymentMethod = "Veuillez sélectionner une méthode de paiement.";
      if (!formData.paymentReference) newErrors.paymentReference = "La référence de paiement est requise.";
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = "Vous devez accepter les conditions générales.";
      }
    }
    
    return newErrors;
  };

  const nextStep = () => {
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      toast.error("Veuillez corriger les erreurs avant de continuer");
      return;
    }
    setErrors({});
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateStep(4);
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error("Veuillez corriger les erreurs dans le formulaire");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create application object
      const applicationData: Partial<UniversityApplication> = {
        programId: formData.program,
        applicantName: `${formData.firstName} ${formData.lastName}`,
        applicantEmail: formData.email,
        applicantPhone: formData.phone,
        dateOfBirth: formData.dob,
        nationality: formData.nationality,
        gender: formData.gender as "M" | "F",
        city: formData.city,
        address: formData.city,
        country: "Cameroun",
        previousInstitution: formData.highSchool,
        previousDegree: formData.bacMention,
        graduationYear: formData.graduationYear,
        documents: Object.entries(selectedFiles).map(([name, file]) => ({
          id: `doc-${Date.now()}-${Math.random()}`,
          documentTypeId: name,
          documentTypeName: selectedProgram?.documentTypes.find(doc => doc.name === name)?.description || name,
          fileName: file.name,
          fileUrl: URL.createObjectURL(file), // Temporary URL for demo
          fileSize: file.size,
          uploadedAt: new Date().toISOString(),
          status: "uploaded" as const
        })),
        status: "submitted",
        applicationDate: new Date().toISOString(),
        inscriptionFeeStatus: "pending",
        inscriptionFeeAmount: selectedProgram?.inscriptionFee || 0,
        paymentMethod: paymentMethod as PaymentMethod,
        paymentReference: formData.paymentReference,
        notes: formData.motivation,
        emailsSent: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // In a real application, this would be an API call
      console.log("Application submitted:", applicationData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Votre candidature a été soumise avec succès!");
      toast.info("Vous recevrez un email de confirmation dans quelques minutes.");
      
      // Reset form or redirect to confirmation page
      // window.location.href = "/inscription/confirmation";
      
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Une erreur est survenue lors de la soumission. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount);
  };

  const steps = [
    { id: 1, title: "Informations personnelles", icon: User },
    { id: 2, title: "Informations académiques", icon: GraduationCap },
    { id: 3, title: "Documents et motivation", icon: FileText },
    { id: 4, title: "Paiement et confirmation", icon: CreditCard }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-[15pt] bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        <div
          className="min-h-[400px] flex flex-col items-center justify-center text-center relative text-white p-6"
          style={{
            backgroundImage: "url('/img/crec-campus-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <motion.div
            className="max-w-3xl mx-auto bg-black/60 p-10 rounded-2xl backdrop-blur-md shadow-2xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Inscription Universitaire CREC</h1>
            <p className="text-xl md:text-2xl mb-6 leading-relaxed">
              Rejoignez une communauté académique ignatienne dédiée à l'excellence, la foi et le service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 px-4 bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    Étape {step.id}
                  </p>
                  <p className={`text-xs ${
                    currentStep >= step.id ? 'text-blue-800' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`mx-4 h-0.5 w-16 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={(currentStep / 4) * 100} className="h-2" />
        </div>
      </section>

      {/* Form Content */}
      <section className="py-16 px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <Card className="bg-white/90 backdrop-blur-sm shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <User className="w-6 h-6 text-blue-600" />
                    Informations personnelles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="flex items-center gap-2">
                        <IdCard className="w-4 h-4" />
                        Prénom *
                      </Label>
                      <Input
                        name="firstName"
                        type="text"
                        required
                        placeholder="Ex. Koffi"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="border-gray-300 focus:border-blue-500"
                      />
                      {errors.firstName && (
                        <p className="text-sm text-red-600">{errors.firstName}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="flex items-center gap-2">
                        <IdCard className="w-4 h-4" />
                        Nom *
                      </Label>
                      <Input
                        name="lastName"
                        type="text"
                        required
                        placeholder="Ex. Zinsou"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="border-gray-300 focus:border-blue-500"
                      />
                      {errors.lastName && (
                        <p className="text-sm text-red-600">{errors.lastName}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Adresse Email *
                      </Label>
                      <Input
                        name="email"
                        type="email"
                        required
                        placeholder="Ex. monmail@exemple.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="border-gray-300 focus:border-blue-500"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Téléphone *
                      </Label>
                      <Input
                        name="phone"
                        type="tel"
                        required
                        placeholder="Ex. +229 90 00 00 00"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="border-gray-300 focus:border-blue-500"
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-600">{errors.phone}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city" className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Ville de résidence *
                      </Label>
                      <Input
                        name="city"
                        type="text"
                        required
                        placeholder="Ex. Cotonou"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="border-gray-300 focus:border-blue-500"
                      />
                      {errors.city && (
                        <p className="text-sm text-red-600">{errors.city}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dob" className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date de naissance *
                      </Label>
                      <Input
                        name="dob"
                        type="date"
                        required
                        value={formData.dob}
                        onChange={handleInputChange}
                        className="border-gray-300 focus:border-blue-500"
                      />
                      {errors.dob && (
                        <p className="text-sm text-red-600">{errors.dob}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nationality">Nationalité *</Label>
                      <Input
                        name="nationality"
                        type="text"
                        required
                        placeholder="Ex. Béninoise"
                        value={formData.nationality}
                        onChange={handleInputChange}
                        className="border-gray-300 focus:border-blue-500"
                      />
                      {errors.nationality && (
                        <p className="text-sm text-red-600">{errors.nationality}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Genre *</Label>
                      <Select
                        name="gender"
                        onValueChange={(value) => handleSelectChange("gender", value)}
                        required
                      >
                        <SelectTrigger className="border-gray-300 focus:border-blue-500">
                          <SelectValue placeholder="Sélectionnez votre genre" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Masculin</SelectItem>
                          <SelectItem value="female">Féminin</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.gender && (
                        <p className="text-sm text-red-600">{errors.gender}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Academic Information */}
            {currentStep === 2 && (
              <Card className="bg-white/90 backdrop-blur-sm shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <GraduationCap className="w-6 h-6 text-blue-600" />
                    Informations académiques
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="program" className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Programme d'études *
                    </Label>
                    <Select
                      name="program"
                      onValueChange={(value) => handleSelectChange("program", value)}
                      required
                    >
                      <SelectTrigger className="border-gray-300 focus:border-blue-500">
                        <SelectValue placeholder="Sélectionnez un programme" />
                      </SelectTrigger>
                      <SelectContent>
                        {programs.map((program) => (
                          <SelectItem key={program.id} value={program.id}>
                            {program.name} - {program.degree.toUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.program && (
                      <p className="text-sm text-red-600">{errors.program}</p>
                    )}
                  </div>

                  {selectedProgram && (
                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-blue-900 mb-2">{selectedProgram.name}</h3>
                        <p className="text-sm text-blue-800 mb-3">{selectedProgram.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span>Durée: {selectedProgram.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span>Inscription: {formatPrice(selectedProgram.inscriptionFee)} FCFA</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-purple-600" />
                            <span>Places: {selectedProgram.capacity}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-orange-600" />
                            <span>Date limite: {new Date(selectedProgram.applicationDeadline).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>

                        <Tabs defaultValue="objectives" className="mt-4">
                          <TabsList>
                            <TabsTrigger value="objectives">Objectifs</TabsTrigger>
                            <TabsTrigger value="careers">Débouchés</TabsTrigger>
                            <TabsTrigger value="requirements">Prérequis</TabsTrigger>
                          </TabsList>
                          <TabsContent value="objectives" className="mt-3">
                            <ul className="space-y-1 text-sm">
                              {selectedProgram.objectives.map((obj, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <Target className="w-3 h-3 text-blue-600 mt-1 flex-shrink-0" />
                                  {obj}
                                </li>
                              ))}
                            </ul>
                          </TabsContent>
                          <TabsContent value="careers" className="mt-3">
                            <ul className="space-y-1 text-sm">
                              {selectedProgram.careerOutlooks.map((career, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <Briefcase className="w-3 h-3 text-green-600 mt-1 flex-shrink-0" />
                                  {career}
                                </li>
                              ))}
                            </ul>
                          </TabsContent>
                          <TabsContent value="requirements" className="mt-3">
                            <ul className="space-y-1 text-sm">
                              {selectedProgram.requirements.map((req, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <CheckCircle className="w-3 h-3 text-red-600 mt-1 flex-shrink-0" />
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                    </Card>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="highSchool">Établissement du Bac *</Label>
                      <Input
                        name="highSchool"
                        required
                        placeholder="Nom du lycée ou collège"
                        value={formData.highSchool}
                        onChange={handleInputChange}
                        className="border-gray-300 focus:border-blue-500"
                      />
                      {errors.highSchool && (
                        <p className="text-sm text-red-600">{errors.highSchool}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bacMention" className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Mention au Bac *
                      </Label>
                      <Select
                        name="bacMention"
                        onValueChange={(value) => handleSelectChange("bacMention", value)}
                        required
                      >
                        <SelectTrigger className="border-gray-300 focus:border-blue-500">
                          <SelectValue placeholder="Sélectionnez votre mention" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="passable">Passable</SelectItem>
                          <SelectItem value="assez-bien">Assez bien</SelectItem>
                          <SelectItem value="bien">Bien</SelectItem>
                          <SelectItem value="tres-bien">Très bien</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.bacMention && (
                        <p className="text-sm text-red-600">{errors.bacMention}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="graduationYear">Année d'obtention du Bac *</Label>
                      <Input
                        name="graduationYear"
                        type="number"
                        min="2020"
                        max="2024"
                        required
                        placeholder="Ex. 2024"
                        value={formData.graduationYear}
                        onChange={handleInputChange}
                        className="border-gray-300 focus:border-blue-500"
                      />
                      {errors.graduationYear && (
                        <p className="text-sm text-red-600">{errors.graduationYear}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="parentNames">Nom(s) du/des parent(s) ou tuteur(s) *</Label>
                      <Input
                        name="parentNames"
                        required
                        placeholder="Ex. Mme Gbaguidi Rosine"
                        value={formData.parentNames}
                        onChange={handleInputChange}
                        className="border-gray-300 focus:border-blue-500"
                      />
                      {errors.parentNames && (
                        <p className="text-sm text-red-600">{errors.parentNames}</p>
                      )}
                    </div>

                    <div className="space-y-2 md:col-span-1">
                      <Label htmlFor="parentPhone" className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Téléphone du parent ou tuteur *
                      </Label>
                      <Input
                        name="parentPhone"
                        type="tel"
                        required
                        placeholder="Ex. +229 91 11 11 11"
                        value={formData.parentPhone}
                        onChange={handleInputChange}
                        className="border-gray-300 focus:border-blue-500"
                      />
                      {errors.parentPhone && (
                        <p className="text-sm text-red-600">{errors.parentPhone}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Documents and Motivation */}
            {currentStep === 3 && selectedProgram && (
              <Card className="bg-white/90 backdrop-blur-sm shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <FileText className="w-6 h-6 text-blue-600" />
                    Documents et motivation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-blue-800 mb-2">Documents requis pour ce programme</h3>
                        <p className="text-blue-700 text-sm">
                          Assurez-vous que vos documents sont dans les formats acceptés et ne dépassent pas la taille maximale.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedProgram.documentTypes.map(doc => (
                      <div key={doc.name} className="space-y-2">
                        <Label htmlFor={doc.name} className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          {doc.description} {doc.isRequired && <span className="text-red-500">*</span>}
                        </Label>
                        <div className="relative">
                          <Input
                            id={doc.name}
                            name={doc.name}
                            type="file"
                            required={doc.isRequired}
                            onChange={handleFileChange}
                            accept={doc.allowedFormats.map(format => `.${format}`).join(',')}
                            className="hidden"
                          />
                          <label
                            htmlFor={doc.name}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition w-full"
                          >
                            <Upload className="w-5 h-5 text-blue-600" />
                            <span className="text-gray-700 text-sm">
                              {selectedFiles[doc.name] ? selectedFiles[doc.name].name : "Choisir un fichier"}
                            </span>
                          </label>
                        </div>
                        <div className="text-xs text-gray-500">
                          Formats: {doc.allowedFormats.join(', ')} | Taille max: {doc.maxSizeInMB}MB
                        </div>
                        {selectedFiles[doc.name] && (
                          <div className="flex items-center gap-2 text-sm text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            Fichier sélectionné: {selectedFiles[doc.name].name}
                          </div>
                        )}
                        {errors[doc.name] && (
                          <p className="text-sm text-red-600">{errors[doc.name]}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motivation" className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Lettre de motivation *
                    </Label>
                    <Textarea
                      name="motivation"
                      rows={8}
                      required
                      placeholder="Partagez vos aspirations, vos motivations et ce que vous attendez de votre parcours au CREC. Expliquez pourquoi vous souhaitez rejoindre ce programme et comment il s'inscrit dans votre projet professionnel..."
                      value={formData.motivation}
                      onChange={handleInputChange}
                      className="border-gray-300 focus:border-blue-500"
                    />
                    <div className="text-xs text-gray-500">
                      Minimum recommandé: 300 mots
                    </div>
                    {errors.motivation && (
                      <p className="text-sm text-red-600">{errors.motivation}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Payment and Confirmation */}
            {currentStep === 4 && selectedProgram && (
              <Card className="bg-white/90 backdrop-blur-sm shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                    Paiement et confirmation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Program Summary */}
                  <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-blue-900 mb-2">Résumé de votre inscription</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Programme:</span>
                          <span className="font-medium">{selectedProgram.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Niveau:</span>
                          <Badge variant="secondary">{selectedProgram.degree.toUpperCase()}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Frais d'inscription:</span>
                          <span className="font-bold text-green-600">
                            {formatPrice(selectedProgram.inscriptionFee)} FCFA
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Frais de scolarité annuels:</span>
                          <span>{formatPrice(selectedProgram.tuitionFee)} FCFA</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Payment Methods */}
                  <div className="space-y-4">
                    <Label className="text-lg font-medium">Méthode de paiement *</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      {paymentMethods.map((method) => (
                        <div key={method.id} className="flex items-start space-x-3">
                          <RadioGroupItem value={method.id} id={method.id} className="mt-1" />
                          <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                            <Card className="p-4 hover:bg-gray-50 transition">
                              <div className="flex items-center gap-3 mb-2">
                                {method.type === "mobile_money" ? (
                                  <Smartphone className="w-6 h-6 text-green-600" />
                                ) : (
                                  <Building className="w-6 h-6 text-blue-600" />
                                )}
                                <span className="font-medium">{method.name}</span>
                                <Badge variant={method.type === "mobile_money" ? "default" : "secondary"}>
                                  {method.type === "mobile_money" ? "Mobile Money" : "Virement bancaire"}
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-600">
                                <div>Numéro: {method.accountNumber}</div>
                                <div>Nom du compte: {method.accountName}</div>
                              </div>
                            </Card>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors.paymentMethod && (
                      <p className="text-sm text-red-600">{errors.paymentMethod}</p>
                    )}
                  </div>

                  {/* Payment Reference */}
                  <div className="space-y-2">
                    <Label htmlFor="paymentReference" className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Référence de paiement *
                    </Label>
                    <Input
                      name="paymentReference"
                      required
                      placeholder="Ex. TXN123456789 ou numéro de transaction"
                      value={formData.paymentReference}
                      onChange={handleInputChange}
                      className="border-gray-300 focus:border-blue-500"
                    />
                    <div className="text-xs text-gray-500">
                      Saisissez le numéro de transaction ou la référence du paiement effectué
                    </div>
                    {errors.paymentReference && (
                      <p className="text-sm text-red-600">{errors.paymentReference}</p>
                    )}
                  </div>

                  {/* Terms and Conditions */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
                        }
                      />
                      <Label htmlFor="agreeToTerms" className="text-sm cursor-pointer">
                        J'accepte les{" "}
                        <a href="#" className="text-blue-600 underline">
                          conditions générales d'inscription
                        </a>{" "}
                        et la{" "}
                        <a href="#" className="text-blue-600 underline">
                          politique de confidentialité
                        </a>{" "}
                        du CREC. Je confirme que toutes les informations fournies sont exactes.
                      </Label>
                    </div>
                    {errors.agreeToTerms && (
                      <p className="text-sm text-red-600">{errors.agreeToTerms}</p>
                    )}
                  </div>

                  {/* Important Notice */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-amber-800 mb-2">Information importante</h3>
                        <ul className="text-amber-700 text-sm space-y-1">
                          <li>• Votre candidature sera examinée dans un délai de 5 jours ouvrables</li>
                          <li>• Vous recevrez un email de confirmation après soumission</li>
                          <li>• Les frais d'inscription ne sont pas remboursables</li>
                          <li>• Un accusé de réception vous sera envoyé par email</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Précédent
              </Button>

              {currentStep < 4 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  Suivant
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Soumission en cours...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Soumettre ma candidature
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </motion.div>
      </section>

      {/* Why Choose CREC */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <motion.h2
            className="text-3xl font-bold text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Pourquoi choisir le CREC ?
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              {
                icon: BookOpen,
                title: "Excellence académique",
                description: "Programmes rigoureux et modernes préparant des leaders pour l'Afrique et le monde."
              },
              {
                icon: Heart,
                title: "Formation intégrale",
                description: "Accompagnement spirituel et personnel dans un cadre ignatien d'excellence."
              },
              {
                icon: Users,
                title: "Communauté dynamique",
                description: "Une communauté diverse, unie par la foi et le service, au cœur de Cotonou."
              },
            ].map((item, i) => (
              <Card key={i} className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <item.icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default InscriptionUniversitairePage;
