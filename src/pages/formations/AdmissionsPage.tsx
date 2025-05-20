import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const AdmissionsPage = () => {
  const [formType, setFormType] = useState("university");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de soumission du formulaire
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
        <div 
          className="min-h-[300px] flex flex-col items-center justify-center text-center relative text-white p-6"
          style={{
            backgroundImage: "url('/img/admissions-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="max-w-3xl mx-auto bg-black/50 p-8 rounded-lg backdrop-blur-sm">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Admission</h1>
            <p className="text-xl md:text-2xl mb-8">
              Rejoignez notre communauté d'apprenants et développez vos compétences.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <Card>
            <CardContent className="p-6">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Type de formation</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    variant={formType === "university" ? "default" : "outline"}
                    className={formType === "university" ? "bg-crec-gold" : ""}
                    onClick={() => setFormType("university")}
                  >
                    Formation Universitaire
                  </Button>
                  <Button
                    variant={formType === "fablab" ? "default" : "outline"}
                    className={formType === "fablab" ? "bg-crec-gold" : ""}
                    onClick={() => setFormType("fablab")}
                  >
                    FABLAB
                  </Button>
                  <Button
                    variant={formType === "formation" ? "default" : "outline"}
                    className={formType === "formation" ? "bg-crec-gold" : ""}
                    onClick={() => setFormType("formation")}
                  >
                    Formation Continue
                  </Button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Informations personnelles */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Informations personnelles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input id="firstName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" type="tel" required />
                  </div>
                </div>

                {/* Formation spécifique */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Formation</h3>
                  <div className="space-y-2">
                    <Label htmlFor="formation">Formation souhaitée</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une formation" />
                      </SelectTrigger>
                      <SelectContent>
                        {formType === "university" && (
                          <>
                            <SelectItem value="web">Développement Web</SelectItem>
                            <SelectItem value="data">Science des Données</SelectItem>
                            <SelectItem value="mobile">Développement Mobile</SelectItem>
                          </>
                        )}
                        {formType === "fablab" && (
                          <>
                            <SelectItem value="formation">Formation Machine</SelectItem>
                            <SelectItem value="reservation">Réservation Machine</SelectItem>
                          </>
                        )}
                        {formType === "formation" && (
                          <>
                            <SelectItem value="langues">Langues</SelectItem>
                            <SelectItem value="informatique">Informatique</SelectItem>
                            <SelectItem value="tutorat">Tutorat</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Documents */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Documents requis</h3>
                  <div className="space-y-2">
                    <Label htmlFor="cv">CV</Label>
                    <Input id="cv" type="file" accept=".pdf,.doc,.docx" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="diploma">Dernier diplôme</Label>
                    <Input id="diploma" type="file" accept=".pdf" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="id">Pièce d'identité</Label>
                    <Input id="id" type="file" accept=".pdf,.jpg,.jpeg,.png" required />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Message</h3>
                  <div className="space-y-2">
                    <Label htmlFor="message">Lettre de motivation</Label>
                    <Textarea id="message" rows={4} required />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-crec-gold hover:bg-crec-lightgold text-white">
                  Soumettre ma candidature
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default AdmissionsPage;
