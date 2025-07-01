import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Upload, CreditCard, Smartphone, Building, AlertCircle, Loader2 } from "lucide-react";
import { useFormationInscription } from "@/hooks/useApi";
import { InscriptionForm } from "@/types/index";
import SubscriptionConfirmation from "@/components/common/SubscriptionConfirmation";

const FablabInscriptionPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    workshop: "",
    experience: "",
    motivation: "",
    paymentReceipt: null as File | null
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const handleInscriptionSuccess = () => {
    setShowConfirmation(true);
  };
  
  const inscriptionMutation = useFormationInscription(handleInscriptionSuccess);

  const workshops = [
    { value: "impression-3d", label: "Impression 3D", price: "25,000" },
    { value: "arduino", label: "Arduino & Électronique", price: "30,000" },
    { value: "robotique", label: "Robotique", price: "40,000" },
    { value: "iot", label: "Internet des Objets (IoT)", price: "35,000" },
    { value: "menuiserie", label: "Menuiserie Numérique", price: "20,000" }
  ];

  const paymentMethods = [
    {
      type: "Mobile Money",
      accounts: [
         { name: "MTN MoMo", number: "+229 01 xx xx xx xx", account: "indisponible actuellement" }
      ]
    },
    {
      type: "Banque",
      accounts: [
        { name: "Bank of Africa (BOA)", number: "à venir ", account: "à venir " },
        { name: "UBA Bénin", number: "à venir ", account: "à venir" }
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
    if (!formData.workshop) newErrors.workshop = "Veuillez sélectionner un atelier";
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
        formation: formData.workshop,
        paymentMethod: "offline", // Since we're using offline payment
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
          workshop: "",
          experience: "",
          motivation: "",
          paymentReceipt: null
        });
      } catch (error) {
        // L'erreur est gérée par le hook
      }
    }
  };

  const selectedWorkshop = workshops.find(w => w.value === formData.workshop);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-crec-dark mb-4">Inscription FabLab</h1>
          <p className="text-gray-600">Rejoignez nos ateliers de fabrication numérique</p>
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
                  <Label htmlFor="workshop">Atelier *</Label>
                  <Select onValueChange={(value) => handleSelectChange("workshop", value)}>
                    <SelectTrigger className={errors.workshop ? "border-red-500" : ""}>
                      <SelectValue placeholder="Sélectionnez un atelier" />
                    </SelectTrigger>
                    <SelectContent>
                      {workshops.map((workshop) => (
                        <SelectItem key={workshop.value} value={workshop.value}>
                          {workshop.label} - {workshop.price} FCFA
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.workshop && <p className="text-red-500 text-sm mt-1">{errors.workshop}</p>}
                </div>

                <div>
                  <Label htmlFor="experience">Niveau d'expérience</Label>
                  <Select onValueChange={(value) => handleSelectChange("experience", value)}>
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
                    placeholder="Pourquoi souhaitez-vous rejoindre cet atelier ?"
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
                  className="w-full bg-crec-gold hover:bg-crec-gold/90"
                  disabled={inscriptionMutation.isPending}
                >
                  {inscriptionMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Inscription en cours...
                    </>
                  ) : (
                    'Soumettre l\'inscription'
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
                {selectedWorkshop && (
                  <div className="bg-crec-light p-4 rounded-lg mb-6">
                    <h3 className="font-semibold text-crec-dark mb-2">Atelier sélectionné :</h3>
                    <p className="text-lg font-bold text-crec-gold">{selectedWorkshop.label}</p>
                    <p className="text-2xl font-bold text-crec-dark">{selectedWorkshop.price} FCFA</p>
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
          </div>
        </div>
      </div>

      {/* Confirmation Dialog avec redirection */}
      <SubscriptionConfirmation
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        subscriptionType="fablab"
        planName={selectedWorkshop?.label || "FabLab"}
        userEmail={formData.email}
      />
    </div>
  );
};

export default FablabInscriptionPage;
