import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Upload, CreditCard, Smartphone, Building, AlertCircle, BookOpen, CheckCircle, Loader2 } from "lucide-react";
import { useFormationInscription } from "@/hooks/useApi";
import { InscriptionForm } from "@/types";

const OpenFormationsInscriptionPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    formation: "",
    level: "",
    motivation: "",
    paymentReceipt: null as File | null
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleInscriptionSuccess = () => {
    setShowSuccess(true);
  };
  
  const inscriptionMutation = useFormationInscription(handleInscriptionSuccess);

  const formations = [
    { value: "anglais", label: "Anglais", price: "15,000" },
    { value: "francais", label: "Français", price: "12,000" },
    { value: "informatique", label: "Informatique de base", price: "20,000" },
    { value: "bureautique", label: "Bureautique (Word, Excel, PowerPoint)", price: "18,000" },
    { value: "accompagnement", label: "Accompagnement scolaire", price: "10,000" },
    { value: "entrepreneuriat", label: "Entrepreneuriat", price: "25,000" }
  ];

  const paymentMethods = [
    {
      type: "Mobile Money",
      accounts: [
        { name: "Orange Money", number: "62 05 05 05", account: "CREC BENIN" },
        { name: "MTN MoMo", number: "96 00 00 00", account: "CREC BENIN" }
      ]
    },
    {
      type: "Banque",
      accounts: [
        { name: "Bank of Africa (BOA)", number: "10000 00001 123456789 15", account: "CENTRE DE RECHERCHE D'ETUDE ET DE CREATIVITE" },
        { name: "Ecobank Bénin", number: "05290000123456", account: "CENTRE DE RECHERCHE D'ETUDE ET DE CREATIVITE" }
      ]
    }
  ];

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, paymentReceipt: file }));
      if (errors.paymentReceipt) {
        setErrors(prev => ({ ...prev, paymentReceipt: "" }));
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "Le prénom est requis";
    if (!formData.lastName.trim()) newErrors.lastName = "Le nom est requis";
    if (!formData.email.trim()) newErrors.email = "L'email est requis";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Format d'email invalide";
    if (!formData.phone.trim()) newErrors.phone = "Le téléphone est requis";
    if (!formData.formation) newErrors.formation = "Veuillez sélectionner une formation";
    if (!formData.paymentReceipt) newErrors.paymentReceipt = "Le reçu de paiement est requis";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const inscriptionData: InscriptionForm = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        formation: formData.formation,
        paymentMethod: "offline", // Paiement hors ligne avec reçu
        phoneNumber: formData.phone
      };

      try {
        await inscriptionMutation.mutateAsync(inscriptionData);
        // Reset du formulaire en cas de succès
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          formation: "",
          level: "",
          motivation: "",
          paymentReceipt: null
        });
      } catch (error) {
        // L'erreur est gérée par le hook
      }
    }
  };

  const selectedFormation = formations.find(f => f.value === formData.formation);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-crec-dark mb-4 flex items-center justify-center gap-3">
            <BookOpen className="w-8 h-8 text-crec-gold" />
            Inscription Formations Ouvertes
          </h1>
          <p className="text-gray-600">Développez vos compétences avec nos formations continues</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire d'inscription */}
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <Label htmlFor="formation">Formation *</Label>
                  <Select onValueChange={(value) => handleSelectChange("formation", value)}>
                    <SelectTrigger className={errors.formation ? "border-red-500" : ""}>
                      <SelectValue placeholder="Sélectionnez une formation" />
                    </SelectTrigger>
                    <SelectContent>
                      {formations.map((formation) => (
                        <SelectItem key={formation.value} value={formation.value}>
                          {formation.label} - {formation.price} FCFA
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.formation && <p className="text-red-500 text-sm mt-1">{errors.formation}</p>}
                </div>

                <div>
                  <Label htmlFor="level">Niveau actuel</Label>
                  <Select onValueChange={(value) => handleSelectChange("level", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="debutant">Débutant</SelectItem>
                      <SelectItem value="intermediaire">Intermédiaire</SelectItem>
                      <SelectItem value="avance">Avancé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="motivation">Motivation (optionnel)</Label>
                  <Textarea
                    id="motivation"
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    placeholder="Pourquoi souhaitez-vous suivre cette formation ?"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="paymentReceipt">Reçu de paiement *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-crec-gold transition-colors">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <input
                      type="file"
                      id="paymentReceipt"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="paymentReceipt" className="cursor-pointer">
                      <span className="text-crec-gold font-semibold">Cliquez pour télécharger</span>
                      <p className="text-gray-500 text-sm mt-1">
                        {formData.paymentReceipt ? formData.paymentReceipt.name : "PNG, JPG ou PDF (max. 10MB)"}
                      </p>
                    </label>
                  </div>
                  {errors.paymentReceipt && <p className="text-red-500 text-sm mt-1">{errors.paymentReceipt}</p>}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-crec-gold hover:bg-crec-gold/90 text-black"
                  disabled={inscriptionMutation.isPending}
                >
                  {inscriptionMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Inscription en cours...
                    </>
                  ) : (
                    "Soumettre l'inscription"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Informations de paiement */}
          <div className="space-y-6">
            {/* Message de service indisponible */}
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-amber-800 mb-2">Service de paiement en ligne temporairement indisponible</h3>
                    <p className="text-amber-700 text-sm mb-3">
                      Nous travaillons actuellement sur l'amélioration de notre système de paiement en ligne. 
                      En attendant, vous pouvez effectuer votre paiement via nos comptes bancaires ou Mobile Money.
                    </p>
                    <p className="text-amber-700 text-sm font-medium">
                      Veuillez utiliser les informations de paiement ci-dessous :
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Informations de paiement CREC
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedFormation && (
                  <div className="bg-crec-light p-4 rounded-lg mb-6">
                    <h3 className="font-semibold text-crec-dark mb-2">Formation sélectionnée :</h3>
                    <p className="text-lg font-bold text-crec-gold">{selectedFormation.label}</p>
                    <p className="text-2xl font-bold text-crec-dark">{selectedFormation.price} FCFA</p>
                  </div>
                )}

                <div className="space-y-4">
                  {paymentMethods.map((method, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        {method.type === "Mobile Money" ? (
                          <Smartphone className="w-4 h-4" />
                        ) : (
                          <Building className="w-4 h-4" />
                        )}
                        {method.type}
                      </h3>
                      <div className="space-y-2">
                        {method.accounts.map((account, idx) => (
                          <div key={idx} className="bg-gray-50 p-3 rounded text-sm">
                            <p className="font-medium">{account.name}</p>
                            <p className="text-gray-600">Numéro : {account.number}</p>
                            <p className="text-gray-600">Nom : {account.account}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-800 mb-2">Instructions de paiement :</h4>
                      <ol className="text-sm text-amber-700 space-y-1">
                        <li>1. Effectuez le paiement via l'un des comptes ci-dessus</li>
                        <li>2. Prenez une capture d'écran du reçu de paiement</li>
                        <li>3. Téléchargez le reçu dans le formulaire</li>
                        <li>4. Soumettez votre inscription</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informations sur les formations */}
            <Card>
              <CardHeader>
                <CardTitle>À propos des formations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-crec-gold rounded-full"></div>
                    <p>Formations en présentiel et en ligne</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-crec-gold rounded-full"></div>
                    <p>Certificat de fin de formation</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-crec-gold rounded-full"></div>
                    <p>Suivi personnalisé</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-crec-gold rounded-full"></div>
                    <p>Sessions de rattrapage possibles</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Modal de confirmation de succès */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Inscription soumise avec succès !</h3>
              <p className="text-gray-600 mb-6">
                Votre inscription a été envoyée à notre équipe. Nous examinerons votre dossier et vous contacterons sous 48h pour confirmer le début de votre formation.
              </p>
              <Button 
                onClick={() => setShowSuccess(false)}
                className="w-full bg-crec-gold hover:bg-crec-gold/90 text-black"
              >
                Continuer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenFormationsInscriptionPage;
