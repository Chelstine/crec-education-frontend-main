import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Loader2, 
  Send, 
  CheckCircle2,
  AlertCircle,
  Globe,
  ExternalLink 
} from "lucide-react";
import { useContactSubmission } from "@/hooks/useApi";
import { useToast } from "@/hooks/use-toast";
import { ContactForm } from "@/types";

const ContactPage = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const contactMutation = useContactSubmission();

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation basique
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs du formulaire",
        variant: "destructive"
      });
      return;
    }

    try {
      await contactMutation.mutateAsync(formData);
      // Reset form on success
      setFormData({
        name: "",
        email: "",
        message: ""
      });
      setFormStatus('success');
      toast({
        title: "Message envoyé",
        description: "Nous vous répondrons dans les plus brefs délais",
        variant: "default"
      });
      
      // Reset success status after 3 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
      
    } catch (error) {
      setFormStatus('error');
      // Reset error status after 3 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    visible: { 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: { 
      repeat: Infinity,
      repeatType: "reverse" as const, 
      duration: 1.5
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section - Modern and Elegant */}
      <section className="relative w-full overflow-hidden">
        {/* Background with parallax effect */}
        <div className="absolute inset-0 bg-[url('/img/crec1.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-crec-darkblue/80 via-crec-darkblue/60 to-crec-darkblue/90 backdrop-blur-[2px]" />
        
        {/* Accent elements */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1.5 }}
          className="absolute top-20 right-20 w-64 h-64 rounded-full bg-crec-gold blur-3xl"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-blue-500 blur-3xl"
        />
        
        {/* Content */}
        <div className="min-h-[350px] md:min-h-[400px] flex flex-col items-center justify-center text-center relative z-10 text-white p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-4 inline-flex px-4 py-2 rounded-full items-center bg-white/10 backdrop-blur-md border border-white/20"
            >
              <motion.div 
                animate={pulseAnimation}
                className="w-2 h-2 rounded-full bg-crec-gold mr-2" 
              />
              <span className="text-sm font-medium">Centre Jésuite de Recherche, d'Étude et de Créativité</span>
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight">
              Contactez-nous
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Besoin d'information sur nos programmes, d'une collaboration ou juste envie d'échanger ? 
              Notre équipe est à votre écoute et vous répondra dans les meilleurs délais.
            </p>
          </motion.div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px]" fill="#ffffff">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,213.35,56.44Z" />
          </svg>
        </div>
      </section>

      {/* Main Contact Section - Form and Map */}
      <section className="py-16 bg-gradient-to-b from-slate-50/50 to-white relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-[0.02]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-1 rounded-2xl shadow-xl shadow-slate-200/50"
            >
              <div className="bg-gradient-to-b from-white to-slate-50 p-6 md:p-8 rounded-xl">
                <div className="mb-6">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-crec-gold/10 text-crec-gold text-sm font-medium mb-2">
                    <Send className="w-3.5 h-3.5 mr-2" />
                    <span>Formulaire de contact</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Envoyez-nous un message</h2>
                  <p className="text-slate-600 mt-2">Nous vous répondrons dans les meilleurs délais</p>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  {/* Success message */}
                  {formStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-emerald-800 flex items-start"
                    >
                      <CheckCircle2 className="w-5 h-5 mr-3 mt-0.5 text-emerald-600" />
                      <div>
                        <h3 className="font-medium">Message envoyé avec succès!</h3>
                        <p className="text-sm text-emerald-700 mt-1">Merci de nous avoir contacté, nous vous répondrons dans les plus brefs délais.</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Error message */}
                  {formStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 flex items-start"
                    >
                      <AlertCircle className="w-5 h-5 mr-3 mt-0.5 text-red-600" />
                      <div>
                        <h3 className="font-medium">Erreur lors de l'envoi</h3>
                        <p className="text-sm text-red-700 mt-1">Un problème est survenu lors de l'envoi de votre message. Veuillez réessayer ou nous contacter directement par téléphone.</p>
                      </div>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-sm font-medium text-slate-700">Nom complet</Label>
                      <Input 
                        id="name" 
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="h-12 border-slate-300 focus:border-crec-gold/50 focus:ring focus:ring-crec-gold/20"
                        placeholder="Votre nom et prénom"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="h-12 border-slate-300 focus:border-crec-gold/50 focus:ring focus:ring-crec-gold/20"
                        placeholder="exemple@email.com"
                      />
                    </div>
                  </div>



                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-sm font-medium text-slate-700">Message</Label>
                    <Textarea 
                      id="message" 
                      rows={5} 
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="border-slate-300 focus:border-crec-gold/50 focus:ring focus:ring-crec-gold/20 resize-none"
                      placeholder="Comment pouvons-nous vous aider aujourd'hui?"
                    />
                  </div>

                  <div>
                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-gradient-to-r from-crec-darkblue to-crec-darkblue/80 hover:to-crec-darkblue text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Envoyer le message
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-slate-500 mt-3 text-center">
                      En soumettant ce formulaire, vous acceptez notre politique de confidentialité
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-1 rounded-2xl shadow-xl shadow-slate-200/50"
            >
              <div className="bg-gradient-to-b from-white to-slate-50 rounded-xl overflow-hidden flex flex-col h-full">
                {/* Map header */}
                <div className="p-6 md:p-8">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-sm font-medium mb-2">
                    <Globe className="w-3.5 h-3.5 mr-2" />
                    <span>Notre localisation</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">Comment nous trouver</h2>
                  <p className="text-slate-600">Centre Jésuite de Recherche, d'Étude et de Créativité</p>
                </div>
                
                {/* Map view */}
                <div className="relative flex-1 min-h-[400px] p-1 border-t border-slate-100">
                  <div className="absolute inset-0 bg-slate-100 rounded-b-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d53611.21654568425!2d2.269525521679684!3d6.383382500000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x102357caccf1e90d%3A0xbce64d9a20725bcc!2s98MR%2B9MC%20Centre%20J%C3%A9suite%20De%20Recherche%20D&#39;Etude%20Et%20De%20Cr%C3%A9ativit%C3%A9%2C%20Unnamed%20Road%2C%20Cotonou!3m2!1d6.383447599999999!2d2.3416475!5e1!3m2!1sfr!2sbj!4v1747747530198!5m2!1sfr!2sbj"
                      width="100%"
                      height="100%"
                      className="border-0"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Carte de localisation du Centre Jésuite de Recherche d'Étude et de Créativité à Cotonou"
                    />
                  </div>
                </div>
                
                {/* Map footer with directions */}
                <div className="p-6 border-t border-slate-100">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-slate-600">
                      <MapPin className="w-4 h-4 inline-block mr-1 text-blue-600" />
                      <span>Godomey - Salamèy, Lot n° 2, Godomey Sud</span>
                    </div>
                    <a 
                      href="https://goo.gl/maps/fHjHuU8kv6wPGThP8" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Itinéraire
                      <ExternalLink className="w-3.5 h-3.5 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Cards in Scrollable Horizontal Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute -left-20 bottom-40 w-80 h-80 rounded-full border-[30px] border-slate-300"
          viewport={{ once: true }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -right-40 top-20 w-96 h-96 rounded-full border-[40px] border-slate-300"
          viewport={{ once: true }}
        />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-crec-darkblue via-slate-800 to-crec-darkblue bg-clip-text text-transparent">
              Comment pouvons-nous vous aider ?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Choisissez la méthode de contact qui vous convient le mieux et notre équipe vous répondra rapidement
            </p>
          </motion.div>

          {/* Contact methods grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Contact card 1 - Visit Us */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="p-1">
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl">
                  <div className="w-14 h-14 bg-crec-darkblue/10 rounded-xl flex items-center justify-center mb-5">
                    <MapPin className="w-7 h-7 text-crec-darkblue" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Venez nous voir</h3>
                  <address className="not-italic text-slate-600 mb-5 leading-relaxed">
                    Maison des Pères Jésuites<br />
                    Godomey - Salamèy<br />
                    Lot n° 2, Godomey Sud,<br />
                    Tranche B
                  </address>
                  
                  <div className="pt-3 border-t border-slate-200">
                    <div className="flex items-center text-sm text-slate-600">
                      <Clock className="w-4 h-4 mr-2 text-crec-gold" />
                      <span>Lun - Ven : 8h00 - 17h30</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600 mt-1">
                      <Clock className="w-4 h-4 mr-2 text-crec-gold" />
                      <span>Sam : 9h00 - 13h00</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact card 2 - Call Us */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="p-1">
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl">
                  <div className="w-14 h-14 bg-crec-darkblue/10 rounded-xl flex items-center justify-center mb-5">
                    <Phone className="w-7 h-7 text-crec-darkblue" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Appelez-nous</h3>
                  <div className="text-slate-600 mb-5 space-y-2">
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-500">Bureau principal</span>
                      <a href="tel:+22901202223" className="hover:text-crec-gold transition-colors">
                        +229 01 20 22 23 03
                      </a>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-500">Administration</span>
                      <a href="tel:+22901677615" className="hover:text-crec-gold transition-colors">
                        +229 01 67 76 15 15
                      </a>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-500">FabLab</span>
                      <a href="tel:+22901915088" className="hover:text-crec-gold transition-colors">
                        +229 01 91 50 88 88
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact card 3 - Email Us */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="p-1">
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl">
                  <div className="w-14 h-14 bg-crec-darkblue/10 rounded-xl flex items-center justify-center mb-5">
                    <Mail className="w-7 h-7 text-crec-darkblue" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Écrivez-nous</h3>
                  <div className="text-slate-600 mb-5 space-y-2">
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-500">Principal</span>
                      <a href="mailto:crecjesuitesbenin@gmail.com" className="hover:text-crec-gold transition-colors break-all">
                        crecjesuitesbenin@gmail.com
                      </a>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-500">Contact</span>
                      <a href="mailto:crecjscontact@gmail.com" className="hover:text-crec-gold transition-colors break-all">
                        crecjscontact@gmail.com
                      </a>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-500">Jésuites Bénin</span>
                      <a href="mailto:jesuites-benin@gmail.com" className="hover:text-crec-gold transition-colors break-all">
                        jesuitesbenin@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
