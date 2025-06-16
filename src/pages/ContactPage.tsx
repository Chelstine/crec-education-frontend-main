import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, Loader2 } from "lucide-react";
import { useContactSubmission } from "@/hooks/useApi";
import { ContactForm } from "@/types";

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const contactMutation = useContactSubmission();

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation basique
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return;
    }

    try {
      await contactMutation.mutateAsync(formData);
      // Reset form on success
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      // Error is handled by the hook
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
        <div className="min-h-[250px] md:min-h-[300px] flex flex-col items-center justify-center text-center relative text-white p-4 md:p-6 bg-contact">
          <div className="max-w-3xl mx-auto bg-black/50 p-4 md:p-8 rounded-lg backdrop-blur-sm">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">Contactez-nous</h1>
            <p className="text-lg md:text-xl lg:text-2xl">
              Nous sommes là pour répondre à toutes vos questions
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-8 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Contact Form */}
            <Card className="order-2 lg:order-1">
              <CardContent className="p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Envoyez-nous un message</h2>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm md:text-base">Nom complet</Label>
                    <Input 
                      id="name" 
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="h-12 text-base"
                      placeholder="Votre nom complet"
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm md:text-base">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="h-12 text-base"
                      placeholder="votre.email@exemple.com"
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm md:text-base">Sujet</Label>
                    <Select 
                      value={formData.subject} 
                      onValueChange={(value) => handleInputChange('subject', value)}
                      required
                    >
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue placeholder="Sélectionnez un sujet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admission">Admission</SelectItem>
                        <SelectItem value="formation">Formation</SelectItem>
                        <SelectItem value="fablab">FABLAB</SelectItem>
                        <SelectItem value="stages">Stages et emplois</SelectItem>
                        <SelectItem value="partenariat">Partenariat</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm md:text-base">Message</Label>
                    <Textarea 
                      id="message" 
                      rows={4} 
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="min-h-[100px] text-base resize-none"
                      placeholder="Décrivez votre demande en détail..."
                      required 
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-crec-gold hover:bg-crec-lightgold text-white text-base font-medium"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      'Envoyer le message'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Informations de contact</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="w-6 h-6 text-crec-gold mr-3 mt-1" />
                      <div>
                        <h3 className="font-semibold">Adresse</h3>
                        <p className="text-gray-600">
                          Maison des Pères Jésuites<br />
                          Godomey - Salamèy<br />
                          Lot n° 2, Godomey Sud,<br />
                          Tranche B.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Phone className="w-6 h-6 text-crec-gold mr-3 mt-1" />
                      <div>
                        <h3 className="font-semibold">Téléphone</h3>
                        <p className="text-gray-600">
                          Fixe: +229 01 20 22 23 03<br />
                          Mobile: +229 01 67 76 15 15<br />
                          Mobile: +229 01 91 50 88 88
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Mail className="w-6 h-6 text-crec-gold mr-3 mt-1" />
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-gray-600">
                          crecjesuitesbenin@gmail.com<br />
                          crecjscontact@gmail.com<br />
                          jesuites-benin@gmail.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Clock className="w-6 h-6 text-crec-gold mr-3 mt-1" />
                      <div>
                        <h3 className="font-semibold">Horaires d'ouverture</h3>
                        <p className="text-gray-600">
                          Lundi - Vendredi : 8h00 - 17h30<br />
                          Samedi : 9h00 - 13h00<br />
                          Dimanche : Fermé
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Notre localisation</h2>
                  <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <iframe
                     src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d53611.21654568425!2d2.269525521679684!3d6.383382500000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x102357caccf1e90d%3A0xbce64d9a20725bcc!2s98MR%2B9MC%20Centre%20J%C3%A9suite%20De%20Recherche%20D&#39;Etude%20Et%20De%20Cr%C3%A9ativit%C3%A9%2C%20Unnamed%20Road%2C%20Cotonou!3m2!1d6.383447599999999!2d2.3416475!5e1!3m2!1sfr!2sbj!4v1747747530198!5m2!1sfr!2sbj"
            width="100%"
                      height="100%"
                      className="iframe-borderless"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Carte de localisation du Centre Jésuite de Recherche d'Étude et de Créativité à Cotonou"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
