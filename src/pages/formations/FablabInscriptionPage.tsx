import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Upload, CreditCard, Smartphone, Building, AlertCircle } from "lucide-react";

const InscriptionPage = () => {
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

  const formations = [
    { value: "langues", label: "Formations en Langues", price: "50,000" },
    { value: "informatique", label: "Formations Informatiques", price: "75,000" },
    { value: "tutorat", label: "Accompagnement Scolaire", price: "40,000" }
  ];

  const paymentMethods = [
    {
      type: "Mobile Money",
      accounts: [
        { name: "Orange Money", number: "+237 6XX XXX XXX", account: "CREC-OM-002" },
        { name: "MTN MoMo", number: "+237 6XX XXX XXX", account: "CREC-MTN-002" }
      ]
    },
    {
      type: "Banque",
      accounts: [
        { name: "Afriland First Bank", number: "40001 00000 12345678901 23", account: "CREC EDUCATION" },
        { name: "UBA Cameroun", number: "10033 00000 12345678901 45", account: "CREC EDUCATION" }
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Traitement du formulaire
      alert("Inscription soumise avec succès ! Nous vous contacterons sous peu.");
      // Reset du formulaire
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
    }
  };

  const selectedFormation = formations.find(f => f.value === formData.formation);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
        <div
          className="min-h-[300px] flex flex-col items-center justify-center text-center relative text-white p-6"
          style={{
            backgroundImage: "url('/img/formations-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          role="banner"
        >
          <div className="max-w-3xl mx-auto bg-black/50 p-8 rounded-lg backdrop-blur-sm">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Inscription à nos formations</h1>
            <p className="text-lg md:text-xl mb-8">
              Remplissez le formulaire ci-dessous et payez directement via Orange Money ou MTN Mobile Money pour finaliser votre inscription.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-crec-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center text-crec-dark">Tarifs des formations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-crec-dark">Langues</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-crec-gold mb-4">500,000 XAF / an</p>
                <p className="text-gray-600 mb-4">Cours d'anglais et autres langues pour tous niveaux.</p>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Paiement sécurisé via Orange Money ou MTN Mobile Money</li>
                  <li>Accès à des ressources en ligne</li>
                  <li>Certificat à la fin</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-crec-dark">Informatique</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-crec-gold mb-4">750,000 XAF / an</p>
                <p className="text-gray-600 mb-4">Formations en développement web, bureautique et plus.</p>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Paiement sécurisé via Orange Money ou MTN Mobile Money</li>
                  <li>Projets pratiques inclus</li>
                  <li>Certificat à la fin</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-crec-dark">Tutorat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-crec-gold mb-4">400,000 XAF / an</p>
                <p className="text-gray-600 mb-4">Accompagnement scolaire personnalisé.</p>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Paiement sécurisé via Orange Money ou MTN Mobile Money</li>
                  <li>Suivi individuel</li>
                  <li>Certificat à la fin</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <p className="text-center text-gray-600 mt-8">
            <strong>Politique de remboursement :</strong> Remboursement intégral possible dans les 14 jours suivant l'inscription si aucune session n'a été suivie. Contactez-nous pour plus de détails.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center text-crec-dark">Formulaire d'inscription et paiement</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-crec-dark">Nom complet</Label>
              <Input
                id="name"
                type="text"
                placeholder="Votre nom"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full border-gray-300 rounded-md focus:ring-[#FCA311] focus:border-[#FCA311]"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-crec-dark">Adresse e-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre.email@exemple.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full border-gray-300 rounded-md focus:ring-[#FCA311] focus:border-[#FCA311]"
              />
            </div>
            <div>
              <Label htmlFor="formation" className="text-crec-dark">Formation choisie</Label>
              <Select
                value={formData.formation}
                onValueChange={handleSelectChange("formation")}
                required
              >
                <SelectTrigger className="w-full border-gray-300 rounded-md focus:ring-[#FCA311] focus:border-[#FCA311]">
                  <SelectValue placeholder="Sélectionnez une formation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="langues">Langues (500,000 XAF)</SelectItem>
                  <SelectItem value="informatique">Informatique (750,000 XAF)</SelectItem>
                  <SelectItem value="tutorat">Tutorat (400,000 XAF)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Payment Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold mb-4 text-crec-dark">Informations de paiement</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="paymentMethod" className="text-crec-dark">Mode de paiement</Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={handleSelectChange("paymentMethod")}
                    required
                  >
                    <SelectTrigger className="w-full border-gray-300 rounded-md focus:ring-[#FCA311] focus:border-[#FCA311]">
                      <SelectValue placeholder="Sélectionnez un mode de paiement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="orange-money">Orange Money</SelectItem>
                      <SelectItem value="mtn-mobile-money">MTN Mobile Money</SelectItem>
                      <SelectItem value="Celtiis Cash">Celtiis Cash</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="phoneNumber" className="text-crec-dark">Numéro de téléphone</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="+229 01 XX XXX XXX"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full border-gray-300 rounded-md focus:ring-[#FCA311] focus:border-[#FCA311]"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Vous recevrez une demande de confirmation de paiement sur ce numéro.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Button
                type="submit"
                className="bg-[#FCA311] hover:bg-[#fcb930] text-white rounded-full px-6 py-2 transition duration-300"
              >
                Payer {formData.formation ? getFormationPrice(formData.formation) + " XAF" : "et s'inscrire"}
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold mb-4">Besoin d'aide ?</h2>
          <p className="text-gray-700 mb-6">
            Contactez notre équipe pour toute question concernant nos formations ou le processus de paiement.
          </p>
          <Button
            className="bg-white border-2 border-[#FCA311] text-[#FCA311] hover:bg-[#FCA311] hover:text-white rounded-full px-6 py-2 transition duration-300"
            asChild
          >
            <Link to="/contact" aria-label="Nous contacter">Nous contacter</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default InscriptionPage;