import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { 
  FileText, Upload, User, BookOpen, GraduationCap, 
  AlertCircle, CheckCircle, Calendar, MapPin, Phone, Mail, IdCard, Award,
  ArrowLeft, ArrowRight, CreditCard, School
} from "lucide-react";
import { useState } from "react";

// Define TypeScript interfaces for type safety
interface UniversityProgram {
  id: string;
  name: string;
}

interface UniversityApplication {
  programId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  placeOfBirth: string;
  nationality: string;
  address: string;
  lastDiploma?: string; // Optional for Master's applicants
  lastSchool?: string; // Optional for Master's applicants
  graduationYear?: number; // Optional for Master's applicants
  parentName: string;
  parentPhone: string;
  status: string;
  submittedAt: string;
  paymentReceiptUrl?: string;
  academicYearId: string;
  licenseYear?: number; // Optional for Master's applicants
  licenseUniversity?: string; // Optional for Master's applicants
}

const InscriptionUniversitairePage = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedFiles, setSelectedFiles] = useState<Record<string, File>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
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
    agreeToTerms: false,
    licenseYear: "",
    licenseUniversity: "",
  });

  // Données mockées pour l'année académique
  const activeAcademicYear = {
    id: "year-1",
    name: "2024-2025",
    startDate: "2024-09-01",
    endDate: "2025-07-31",
    applicationStartDate: "2024-06-01",
    applicationEndDate: "2024-08-31",
    isActive: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15"
  };

  // Liste des documents à uploader (un seul champ pour un PDF combiné)
  const documentFields = [
    {
      key: "combined_documents",
      label: "Document PDF combiné",
      required: true,
      accept: ".pdf",
      formats: "pdf",
      maxSize: 10 * 1024 * 1024
    }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const docField = documentFields.find(d => d.key === name);
      if (docField) {
        if (file.size > docField.maxSize) {
          setErrors(prev => ({ ...prev, [name]: `Le fichier ne doit pas dépasser 10MB` }));
          return;
        }
        const allowedFormats = docField.formats.split(',').map(f => f.trim());
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        if (!allowedFormats.includes(fileExtension || "")) {
          setErrors(prev => ({ ...prev, [name]: `Format non autorisé. Format accepté: PDF` }));
          return;
        }
      }
      setSelectedFiles(prev => ({ ...prev, [name]: file }));
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      if (!formData.program) newErrors.program = "Le programme d'études est requis.";
      if (!formData.parentNames) newErrors.parentNames = "Le nom du parent ou tuteur est requis.";
      if (!formData.parentPhone) newErrors.parentPhone = "Le numéro de téléphone du tuteur est requis.";
      if (formData.program === "prog-2") { // Master's program
        if (!formData.licenseYear) newErrors.licenseYear = "L'année d'obtention de la licence est requise.";
        if (!formData.licenseUniversity) newErrors.licenseUniversity = "L'université de la licence est requise.";
      } else { // Non-Master's programs
        if (!formData.highSchool) newErrors.highSchool = "L'établissement du Bac est requis.";
        if (!formData.bacMention) newErrors.bacMention = "La mention est requise.";
        if (!formData.graduationYear) newErrors.graduationYear = "L'année d'obtention du Bac est requise.";
      }
    }
    
    if (step === 3) {
      documentFields.forEach(doc => {
        if (doc.required && !selectedFiles[doc.key]) {
          newErrors[doc.key] = `Le document PDF combiné est requis.`;
        }
      });
      if (!formData.agreeToTerms) newErrors.agreeToTerms = "Vous devez accepter la politique de confidentialité.";
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
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateStep(3);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error("Veuillez corriger les erreurs dans le formulaire");
      return;
    }

    setIsSubmitting(true);
    try {
      // Créer un FormData pour envoyer les fichiers + données
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          formDataToSend.append(key, value.toString());
        }
      });
      if (selectedFiles['combined_documents']) {
        formDataToSend.append('documents', selectedFiles['combined_documents']);
      }
      // Envoi à Laravel (new_backend)
      const response = await fetch('http://localhost:8000/api/applications', {
        method: 'POST',
        body: formDataToSend,
        // Pas besoin de headers 'Content-Type' pour FormData !
      });
      if (!response.ok) {
        let errorMsg = 'Erreur serveur';
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        } catch {}
        throw new Error(errorMsg);
      }
      const data = await response.json();
      toast.success("Inscription envoyée avec succès !");
      toast.info("Vous recevrez un email de confirmation sous peu.");
      // Reset du formulaire si besoin
      setFormData({
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
        agreeToTerms: false,
        licenseYear: "",
        licenseUniversity: "",
      });
      setSelectedFiles({});
      setCurrentStep(1);
    } catch (error) {
      console.error("Erreur:", error);
      if (error instanceof Error) {
        toast.error(error.message || "Échec de l'envoi. Veuillez réessayer.");
      } else {
        toast.error("Échec de l'envoi. Veuillez réessayer.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { id: 1, title: "Informations personnelles", icon: User },
    { id: 2, title: "Informations académiques", icon: GraduationCap },
    { id: 3, title: "Documents", icon: FileText }
  ];

  const isMasterProgram = formData.program === "prog-2"; // Check if Master's program is selected

  return (
    <div className="min-h-screen flex flex-col font-sans text-base bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-blue-700 to-blue-500">
        <div className="min-h-[200px] flex items-center justify-center text-center text-white px-4 py-8">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">Inscription CREC</h1>
            <p className="text-base md:text-lg text-blue-100">Rejoignez notre communauté académique pour l'excellence et le service.</p>
          </motion.div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 px-4 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center w-full sm:w-auto">
                <motion.div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id 
                      ? 'bg-blue-500 text-white border-blue-500' 
                      : 'bg-gray-100 text-gray-500 border-gray-200'
                  } transition-all duration-300`}
                  whileHover={{ scale: 1.05 }}
                >
                  <step.icon className="w-5 h-5" />
                </motion.div>
                <div className="ml-3 flex-1">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    Étape {step.id}
                  </p>
                  <p className={`text-xs ${
                    currentStep >= step.id ? 'text-blue-700' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block mx-4 h-0.5 w-16 ${
                    currentStep > step.id ? 'bg-blue-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <Progress 
            value={(currentStep / 3) * 100} 
            className="h-1.5 bg-gray-200 rounded-full [&>div]:bg-blue-500" 
          />
        </div>
      </section>

      {/* Form Content */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <Card className="bg-white shadow-md rounded-xl border border-gray-100">
                <CardHeader className="bg-blue-50/50 rounded-t-xl p-5">
                  <CardTitle className="flex items-center gap-2 text-xl font-semibold text-blue-700">
                    <User className="w-5 h-5 text-blue-500" />
                    Informations personnelles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                      { name: "firstName", label: "Prénom *", icon: IdCard, placeholder: "Ex. Koffi" },
                      { name: "lastName", label: "Nom *", icon: IdCard, placeholder: "Ex. Zinsou" },
                      { name: "email", label: "Adresse Email *", icon: Mail, placeholder: "Ex. monmail@exemple.com", type: "email" },
                      { name: "phone", label: "Téléphone *", icon: Phone, placeholder: "Ex. +229 90 00 00 00", type: "tel" },
                      { name: "city", label: "Ville de résidence *", icon: MapPin, placeholder: "Ex. Cotonou" },
                      { name: "dob", label: "Date de naissance *", icon: Calendar, type: "date" },
                      { name: "nationality", label: "Nationalité *", icon: MapPin, placeholder: "Ex. Béninoise" }
                    ].map(field => (
                      <motion.div
                        key={field.name}
                        className="space-y-1.5"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Label htmlFor={field.name} className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
                          <field.icon className="w-4 h-4 text-blue-500" />
                          {field.label}
                        </Label>
                        <Input
                          id={field.name}
                          name={field.name}
                          type={field.type || "text"}
                          required
                          placeholder={field.placeholder}
                          value={formData[field.name as keyof typeof formData] as string}
                          onChange={handleInputChange}
                          className="border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 rounded-md h-10"
                        />
                        {errors[field.name] && (
                          <p className="text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors[field.name]}
                          </p>
                        )}
                      </motion.div>
                    ))}
                    <motion.div
                      className="space-y-1.5"
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Label htmlFor="gender" className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
                        <User className="w-4 h-4 text-blue-500" />
                        Genre *
                      </Label>
                      <Select
                        name="gender"
                        onValueChange={(value) => handleSelectChange("gender", value)}
                        required
                      >
                        <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 rounded-md h-10">
                          <SelectValue placeholder="Sélectionnez votre genre" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Masculin</SelectItem>
                          <SelectItem value="female">Féminin</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.gender && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.gender}
                        </p>
                      )}
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Academic Information */}
            {currentStep === 2 && (
              <Card className="bg-white shadow-md rounded-xl border border-gray-100">
                <CardHeader className="bg-blue-50/50 rounded-t-xl p-5">
                  <CardTitle className="flex items-center gap-2 text-xl font-semibold text-blue-700">
                    <GraduationCap className="w-5 h-5 text-blue-500" />
                    Informations académiques
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <motion.div
                    className="space-y-1.5"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Label htmlFor="program" className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
                      <BookOpen className="w-4 h-4 text-blue-500" />
                      Programme d'études *
                    </Label>
                    <Select
                      name="program"
                      onValueChange={(value) => handleSelectChange("program", value)}
                      required
                    >
                      <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 rounded-md h-10">
                        <SelectValue placeholder="Sélectionnez un programme" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          { id: "prog-1", name: "Licence en Développement Logiciel" },
                          { id: "prog-2", name: "Master en Data Science" },
                          { id: "prog-3", name: "Licence en Théologie" }
                        ].map((program) => (
                          <SelectItem key={program.id} value={program.id}>
                            {program.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.program && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.program}
                      </p>
                    )}
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[ 
                      { name: "parentNames", label: "Nom(s) du/des parent(s) ou tuteur(s) *", placeholder: "Ex. Mme Gbaguidi Rosine" },
                      { name: "parentPhone", label: "Téléphone du parent ou tuteur *", placeholder: "Ex. +229 91 11 11 11", type: "tel" }
                    ].map(field => (
                      <motion.div
                        key={field.name}
                        className="space-y-1.5"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Label htmlFor={field.name} className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
                          {field.label}
                        </Label>
                        <Input
                          id={field.name}
                          name={field.name}
                          type={field.type || "text"}
                          required
                          placeholder={field.placeholder}
                          value={formData[field.name as keyof typeof formData] as string}
                          onChange={handleInputChange}
                          className="border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 rounded-md h-10"
                        />
                        {errors[field.name] && (
                          <p className="text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors[field.name]}
                          </p>
                        )}
                      </motion.div>
                    ))}
                    {!isMasterProgram && [
                      { name: "highSchool", label: "Établissement du Bac *", placeholder: "Nom du lycée ou collège" },
                      { name: "graduationYear", label: "Année d'obtention du Bac *", placeholder: "Ex. 2024", type: "number", min: "2020", max: "2024" },
                    ].map(field => (
                      <motion.div
                        key={field.name}
                        className="space-y-1.5"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Label htmlFor={field.name} className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
                          {field.label}
                        </Label>
                        <Input
                          id={field.name}
                          name={field.name}
                          type={field.type || "text"}
                          required
                          placeholder={field.placeholder}
                          value={formData[field.name as keyof typeof formData] as string}
                          onChange={handleInputChange}
                          min={field.min}
                          max={field.max}
                          className="border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 rounded-md h-10"
                        />
                        {errors[field.name] && (
                          <p className="text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors[field.name]}
                          </p>
                        )}
                      </motion.div>
                    ))}
                    {!isMasterProgram && (
                      <motion.div
                        className="space-y-1.5"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Label htmlFor="bacMention" className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
                          <Award className="w-4 h-4 text-blue-500" />
                          Mention au Bac *
                        </Label>
                        <Select
                          name="bacMention"
                          onValueChange={(value) => handleSelectChange("bacMention", value)}
                          required
                        >
                          <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 rounded-md h-10">
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
                          <p className="text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.bacMention}
                          </p>
                        )}
                      </motion.div>
                    )}
                    {isMasterProgram && [
                      { name: "licenseYear", label: "Année d'obtention de la Licence *", placeholder: "Ex. 2023", type: "number", min: "2010", max: "2024" },
                      { name: "licenseUniversity", label: "Université de la Licence *", placeholder: "Ex. Université d'Abomey-Calavi" }
                    ].map(field => (
                      <motion.div
                        key={field.name}
                        className="space-y-1.5"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Label htmlFor={field.name} className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
                          {field.label}
                        </Label>
                        <Input
                          id={field.name}
                          name={field.name}
                          type={field.type || "text"}
                          required
                          placeholder={field.placeholder}
                          value={formData[field.name as keyof typeof formData] as string}
                          onChange={handleInputChange}
                          min={field.min}
                          max={field.max}
                          className="border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 rounded-md h-10"
                        />
                        {errors[field.name] && (
                          <p className="text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors[field.name]}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Documents */}
            {currentStep === 3 && (
              <Card className="bg-white shadow-md rounded-xl border border-gray-100">
                <CardHeader className="bg-blue-50/50 rounded-t-xl p-5">
                  <CardTitle className="flex items-center gap-2 text-xl font-semibold text-blue-700">
                    <FileText className="w-5 h-5 text-blue-500" />
                    Documents de Candidature
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column: Document Upload */}
                    <motion.div
                      className="space-y-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      {documentFields.map(doc => (
                        <div key={doc.key} className="space-y-2">
                          <Label htmlFor={doc.key} className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
                            <Upload className="w-4 h-4 text-blue-500" />
                            {doc.label} {doc.required && <span className="text-red-500">*</span>}
                          </Label>
                          <div className="relative group">
                            <Input
                              id={doc.key}
                              name={doc.key}
                              type="file"
                              required={doc.required}
                              onChange={handleFileChange}
                              accept={doc.accept}
                              className="hidden"
                            />
                            <label
                              htmlFor={doc.key}
                              className="flex items-center gap-3 px-4 py-2.5 bg-white border border-gray-200 rounded-md cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition-all"
                            >
                              <Upload className="w-5 h-5 text-blue-500" />
                              <span className="text-sm text-gray-600">
                                {selectedFiles[doc.key] ? selectedFiles[doc.key].name : "Choisir un fichier PDF (max 10MB)"}
                              </span>
                            </label>
                          </div>
                          {selectedFiles[doc.key] && (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center gap-1.5 text-xs text-green-600 bg-green-50/50 px-3 py-1.5 rounded-md"
                            >
                              <CheckCircle className="w-3 h-3" />
                              Fichier sélectionné: {selectedFiles[doc.key].name}
                            </motion.div>
                          )}
                          {errors[doc.key] && (
                            <p className="text-xs text-red-500 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors[doc.key]}
                            </p>
                          )}
                        </div>
                      ))}
                    </motion.div>

                    {/* Right Column: Payment Information and Required Documents */}
                    <motion.div
                      className="space-y-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      {/* Section Informations de paiement */}
                      <div className="bg-gray-50 p-5 rounded-md border border-gray-100">
                        <h3 className="font-medium text-base text-gray-700 mb-3 flex items-center gap-1.5">
                          <CreditCard className="w-4 h-4 text-blue-500" />
                          Informations de paiement
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-600">
                          <div>
                            <p className="font-medium text-gray-700">Compte bancaire :</p>
                            <p>Banque: BOA/UBA</p>
                            <p>IBAN: BJXX-XXXX-XXXX-XXXX-XXXX</p>
                            <p>BIC: XXXXBJXX</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Numéro MoMo MTN :</p>
                            <p>+229 01 XX XXX XXX</p>
                          </div>
                        </div>
                      </div>

                      {/* Section Documents requis */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="bg-blue-50/50 p-5 rounded-md border border-blue-100">
                          <h3 className="font-medium text-base text-blue-700 mb-3 flex items-center gap-1.5">
                            <School className="w-4 h-4 text-blue-500" />
                            Documents requis pour la Licence
                          </h3>
                          <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1">
                            <li>Lettre de motivation</li>
                            <li>Relevé de notes du Bac</li>
                            <li>Diplôme du Bac ou attestation</li>
                            <li>Pièce d'identité (CIP, Passeport, etc.)</li>
                            <li>Deux photos d'identité format passeport</li>
                          </ul>
                        </div>
                        <div className="bg-green-50/50 p-5 rounded-md border border-green-100">
                          <h3 className="font-medium text-base text-green-700 mb-3 flex items-center gap-1.5">
                            <GraduationCap className="w-4 h-4 text-green-500" />
                            Documents requis pour le Master
                          </h3>
                          <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1">
                            <li>Lettre de motivation</li>
                            <li>Pièce d'identité (CIP, Passeport, etc.)</li>
                            <li>Deux photos d'identité format passeport</li>
                            <li>Diplôme de Licence</li>
                            <li>Relevés de notes de Licence</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Section Instructions */}
                  <motion.div
                    className="bg-blue-50/50 p-5 rounded-md border border-blue-100 mt-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-base text-gray-700 mb-3">Informations importantes</h3>
                        <ul className="text-xs text-gray-600 space-y-1.5">
                          <li className="flex items-center gap-1.5">
                            <CheckCircle className="w-3 h-3 text-blue-500" />
                            Votre candidature sera examinée dans un délai de 5 jours ouvrables
                          </li>
                          <li className="flex items-center gap-1.5">
                            <CheckCircle className="w-3 h-3 text-blue-500" />
                            Vous recevrez un email de confirmation après soumission
                          </li>
                          <li className="flex items-center gap-1.5">
                            <CheckCircle className="w-3 h-3 text-blue-500" />
                            Les frais d'inscription ne sont pas remboursables
                          </li>
                          <li className="flex items-center gap-1.5">
                            <CheckCircle className="w-3 h-3 text-blue-500" />
                            Un accusé de réception vous sera envoyé par email
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>

                  {/* Section Consentement */}
                  <motion.div
                    className="space-y-3 mt-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
                        }
                        className="border-gray-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 w-4 h-4 mt-0.5"
                      />
                      <Label htmlFor="agreeToTerms" className="text-xs text-gray-600">
                        J'accepte la{" "}
                        <a href="https://crec.edu/privacy-policy" className="text-blue-500 hover:underline font-medium">
                          politique de confidentialité
                        </a>{" "}
                        du CREC. Je confirme que toutes les informations fournies sont exactes.
                      </Label>
                    </div>
                    {errors.agreeToTerms && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.agreeToTerms}
                      </p>
                    )}
                  </motion.div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <motion.div
              className="flex justify-between items-center mt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-1.5 border-blue-500 text-blue-500 hover:bg-blue-50 text-sm font-medium py-2 px-5 rounded-md"
              >
                <ArrowLeft className="w-4 h-4" />
                Précédent
              </Button>

              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-5 rounded-md"
                >
                  Suivant
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-5 rounded-md"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Soumission...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Soumettre
                    </>
                  )}
                </Button>
              )}
            </motion.div>
          </form>
        </motion.div>
      </section>
    </div>
  );
};

export default InscriptionUniversitairePage;