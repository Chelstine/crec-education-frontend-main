import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { FileText, Upload, User, BookOpen, GraduationCap, Heart, Users } from "lucide-react";
import { useState } from "react";

const InscriptionUniversitairePage = () => {
  const [selectedFiles, setSelectedFiles] = useState<Record<string, string>>({});
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
    parentNames: "",
    parentPhone: "",
    motivation: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setSelectedFiles(prev => ({ ...prev, [name]: files[0].name }));
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName) newErrors.firstName = "Le prénom est requis.";
    if (!formData.lastName) newErrors.lastName = "Le nom est requis.";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Une adresse email valide est requise.";
    if (!formData.phone) newErrors.phone = "Le numéro de téléphone est requis.";
    if (!formData.city) newErrors.city = "La ville est requise.";
    if (!formData.dob) newErrors.dob = "La date de naissance est requise.";
    if (!formData.nationality) newErrors.nationality = "La nationalité est requise.";
    if (!formData.gender) newErrors.gender = "Le genre est requis.";
    if (!formData.program) newErrors.program = "Le programme d’études est requis.";
    if (!formData.highSchool) newErrors.highSchool = "L’établissement du Bac est requis.";
    if (!formData.bacMention) newErrors.bacMention = "La mention est requise.";
    if (!formData.parentNames) newErrors.parentNames = "Le nom du parent ou tuteur est requis.";
    if (!formData.parentPhone) newErrors.parentPhone = "Le numéro de téléphone du tuteur est requis.";
    if (!formData.motivation) newErrors.motivation = "La lettre de motivation est requise.";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    // TODO: Logique de traitement ou d'envoi vers un backend
    console.log("Formulaire soumis :", { ...formData, files: selectedFiles });
  };

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Inscription au CREC</h1>
            <p className="text-xl md:text-2xl mb-6 leading-relaxed">
              Rejoignez une communauté académique ignatienne dédiée à l’excellence, la foi et le service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl font-semibold text-amber-800">Votre avenir commence ici</h2>
          <p className="text-jesuit-darkgray text-lg leading-relaxed">
            Le CREC, ancré dans la spiritualité ignatienne, forme des leaders pour un monde plus juste. Remplissez ce formulaire pour rejoindre nos programmes à Cotonou, Bénin, et contribuer à une société meilleure.
          </p>
        </motion.div>
      </section>

      {/* Formulaire */}
      <section className="py-16 px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl border border-amber-100">
            <CardContent className="p-8 md:p-12 space-y-12">
              <form onSubmit={handleSubmit} className="space-y-12">
                {/* Infos personnelles */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-jesuit-dark flex items-center gap-2">
                    <User className="w-6 h-6 text-jesuit-gold" /> Informations personnelles
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { name: "firstName", label: "Prénom", placeholder: "Ex. Koffi", type: "text" },
                      { name: "lastName", label: "Nom", placeholder: "Ex. Zinsou", type: "text" },
                      { name: "email", label: "Adresse Email", placeholder: "Ex. monmail@exemple.com", type: "email" },
                      { name: "phone", label: "Téléphone", placeholder: "Ex. +229 90 00 00 00", type: "tel" },
                      { name: "city", label: "Ville de résidence", placeholder: "Ex. Cotonou", type: "text" },
                      { name: "dob", label: "Date de naissance", placeholder: "Ex. JJ/MM/AAAA", type: "date" },
                      { name: "nationality", label: "Nationalité", placeholder: "Ex. Béninoise", type: "text" },
                    ].map(field => (
                      <div key={field.name} className="space-y-2">
                        <Label htmlFor={field.name} className="text-jesuit-dark font-medium">
                          {field.label}
                        </Label>
                        <Input
                          name={field.name}
                          type={field.type}
                          required
                          placeholder={field.placeholder}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleInputChange}
                          className="rounded-lg border-amber-200 focus:border-jesuit-gold focus:ring-jesuit-gold transition-all"
                        />
                        {errors[field.name] && (
                          <p className="text-sm text-red-600">{errors[field.name]}</p>
                        )}
                      </div>
                    ))}
                    <div className="space-y-2">
                      <Label htmlFor="gender" className="text-jesuit-dark font-medium">
                        Genre
                      </Label>
                      <Select
                        name="gender"
                        onValueChange={(value) => handleSelectChange("gender", value)}
                        required
                      >
                        <SelectTrigger className="rounded-lg border-amber-200 focus:border-jesuit-gold focus:ring-jesuit-gold">
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
                </div>

                {/* Infos académiques */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-jesuit-dark flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-jesuit-gold" /> Informations académiques
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { name: "highSchool", label: "Établissement du Bac", placeholder: "Nom du lycée ou collège" },
                      { name: "bacMention", label: "Mention au Bac", placeholder: "Assez bien, Bien, Très bien..." },
                      { name: "parentNames", label: "Nom(s) du/des parent(s) ou tuteur(s)", placeholder: "Ex. Mme Gbaguidi Rosine" },
                      { name: "parentPhone", label: "Téléphone du parent ou tuteur", placeholder: "Ex. +229 91 11 11 11" },
                    ].map(field => (
                      <div key={field.name} className="space-y-2">
                        <Label htmlFor={field.name} className="text-jesuit-dark font-medium">
                          {field.label}
                        </Label>
                        <Input
                          name={field.name}
                          required
                          placeholder={field.placeholder}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleInputChange}
                          className="rounded-lg border-amber-200 focus:border-jesuit-gold focus:ring-jesuit-gold transition-all"
                        />
                        {errors[field.name] && (
                          <p className="text-sm text-red-600">{errors[field.name]}</p>
                        )}
                      </div>
                    ))}
                    <div className="space-y-2">
                      <Label htmlFor="program" className="text-jesuit-dark font-medium">
                        Programme d’études
                      </Label>
                      <Select
                        name="program"
                        onValueChange={(value) => handleSelectChange("program", value)}
                        required
                      >
                        <SelectTrigger className="rounded-lg border-amber-200 focus:border-jesuit-gold focus:ring-jesuit-gold">
                          <SelectValue placeholder="Sélectionnez un programme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="theology">Théologie</SelectItem>
                          <SelectItem value="philosophy">Philosophie</SelectItem>
                          <SelectItem value="social-sciences">Sciences sociales</SelectItem>
                          <SelectItem value="education">Éducation</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.program && (
                        <p className="text-sm text-red-600">{[errors.program]}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Documents requis */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-jesuit-dark flex items-center gap-2">
                    <FileText className="w-6 h-6 text-jesuit-gold" /> Pièces à fournir
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { name: "birthCertificate", label: "Acte de naissance" },
                      { name: "bacCertificate", label: "Attestation du Baccalauréat" },
                      { name: "transcripts", label: "Relevés de notes du Bac" },
                      { name: "idPhoto", label: "Photo de la pièce d'identité" },
                      { name: "photo1", label: "Photo d'identité 1 (format passeport)" },
                      { name: "photo2", label: "Photo d'identité 2 (format passeport)" },
                      { name: "paymentReceipt", label: "Reçu de paiement des frais d’inscription" },
                    ].map(file => (
                      <div key={file.name} className="space-y-2">
                        <Label htmlFor={file.name} className="text-jesuit-dark font-medium">
                          {file.label}
                        </Label>
                        <div className="relative">
                          <Input
                            name={file.name}
                            type="file"
                            required
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <label
                            htmlFor={file.name}
                            className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg cursor-pointer hover:bg-amber-100 transition"
                          >
                            <Upload className="w-5 h-5 text-jesuit-gold" />
                            <span className="text-jesuit-darkgray">
                              {selectedFiles[file.name] || "Choisir un fichier"}
                            </span>
                          </label>
                        </div>
                        {selectedFiles[file.name] && (
                          <p className="text-sm text-jesuit-darkgray">Fichier sélectionné : {selectedFiles[file.name]}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lettre de motivation */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-jesuit-dark flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-jesuit-gold" /> Lettre de motivation
                  </h2>
                  <div className="space-y-2">
                    <Label htmlFor="motivation" className="text-jesuit-dark font-medium">
                      Pourquoi souhaitez-vous rejoindre le CREC ?
                    </Label>
                    <Textarea
                      name="motivation"
                      rows={6}
                      required
                      placeholder="Partagez vos aspirations, vos motivations et ce que vous attendez de votre parcours au CREC..."
                      value={formData.motivation}
                      onChange={handleInputChange}
                      className="rounded-lg border-amber-200 focus:border-jesuit-gold focus:ring-jesuit-gold transition-all"
                    />
                    {errors.motivation && (
                      <p className="text-sm text-red-600">{[errors.motivation]}</p>
                    )}
                  </div>
                </div>

                {/* Bouton de soumission */}
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button
                    type="submit"
                    className="w-full md:w-auto px-8 py-3 bg-[#e69500] hover:bg-[#f7b733] text-white rounded-full shadow-md hover:shadow-lg transition-all text-lg font-semibold"
                  >
                    Soumettre ma candidature
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Pourquoi le CREC */}
      <section className="py-16 bg-jesuit-light">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <motion.h2
            className="text-3xl font-bold text-jesuit-dark"
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
                description: "Programmes rigoureux en théologie, philosophie et sciences sociales, préparant des leaders pour l’Afrique."
              },
              {
                icon: Heart,
                title: "Formation intégrale",
                description: "Accompagnement spirituel et personnel pour développer talents et vocation dans un cadre ignatien."
              },
              {
                icon: Users,
                title: "Communauté dynamique",
                description: "Une communauté diverse, unie par la foi et le service, au cœur de Cotonou."
              },
            ].map((item, i) => (
              <Card key={i} className="bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <item.icon className="w-12 h-12 text-jesuit-gold mb-4" />
                  <h3 className="text-xl font-semibold text-jesuit-dark mb-2">{item.title}</h3>
                  <p className="text-jesuit-darkgray">{item.description}</p>
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