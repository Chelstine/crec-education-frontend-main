import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

// Icons
import { 
  Heart, 
  Users, 
  GraduationCap, 
  Leaf, 
  Building2, 
  BookOpen, 
  CheckCircle2,
  ArrowRight,
  Calendar,
  Sparkles,
  Lightbulb
} from 'lucide-react';

// Common Components
import Banner from '@/components/common/Banner';
import SectionTitle from '@/components/common/SectionTitle';

const DonatePage = () => {
  const [donationAmount, setDonationAmount] = useState("50");
  const [customAmount, setCustomAmount] = useState(false);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Payment options
  const donationOptions = [
    {
      id: 1,
      title: 'Don ponctuel',
      description: 'Un soutien immédiat pour nos projets en cours',
      icon: Heart,
      color: 'bg-rose-50 text-rose-500',
      borderColor: 'border-rose-200'
    },
    {
      id: 2,
      title: 'Don mensuel',
      description: 'Un impact durable et une visibilité pour nos actions',
      icon: Calendar,
      color: 'bg-blue-50 text-blue-500',
      borderColor: 'border-blue-200'
    },
    {
      id: 3,
      title: 'Don d\'entreprise',
      description: 'Engagez votre organisation dans notre mission',
      icon: Building2,
      color: 'bg-amber-50 text-amber-500',
      borderColor: 'border-amber-200'
    },
  ];

  // Impact areas with improved visuals
  const impactAreas = [
    {
      id: 1,
      title: 'Éducation',
      description: 'Financement de bourses et de programmes académiques',
      icon: GraduationCap,
      image: '/img/formation.png',
      examples: ['20€ = Matériel pédagogique', '100€ = Atelier de formation', '500€ = Bourse d\'études partielle']
    },
    {
      id: 2,
      title: 'Innovation',
      description: 'Équipement et maintenance du FabLab et espaces créatifs',
      icon: Sparkles,
      image: '/img/fablab.jpeg',
      examples: ['50€ = Outils technologiques', '200€ = Équipement spécialisé', '1000€ = Nouvelle machine']
    },
    {
      id: 3,
      title: 'Développement durable',
      description: 'Projets d\'écologie et d\'impact social communautaire',
      icon: Leaf,
      image: '/img/ecologie.png',
      examples: ['30€ = Plantation d\'arbres', '150€ = Projet communautaire', '800€ = Initiative écologique']
    }
  ];

  // Testimonials
  const testimonials = [
    {
      id: 1,
      quote: "Grâce aux donateurs du CREC, j'ai pu suivre une formation complète en informatique et obtenir un emploi stable.",
      author: "Jean Mutombo",
      role: "Diplômé 2023",
      image: "/img/crec1.jpg"
    },
    {
      id: 2,
      quote: "Notre entreprise soutient le CREC car leurs diplômés sont parfaitement adaptés aux besoins du marché actuel.",
      author: "Marie Nkunda",
      role: "Directrice RH, Tech Congo",
      image: "/img/crec2.png"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner - Modernisé */}
      <section className="relative w-full overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-[url('/img/crec3.jpg')] bg-cover bg-center bg-no-repeat" />
        <div className="absolute inset-0 bg-gradient-to-r from-crec-darkblue/90 to-crec-darkblue/80" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
                <Heart className="w-4 h-4 text-rose-400 mr-2" />
                <span className="text-sm font-medium text-white">Soutenez notre mission</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Investissez dans l'avenir <br />
                <span className="text-crec-gold">de la RD Congo</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-xl text-blue-50 mb-8">
                Votre générosité permet de former des leaders compétents et engagés 
                pour le développement durable du pays.
              </motion.p>
              
              <motion.div variants={fadeInUp}>
                <Button size="lg" asChild className="bg-crec-gold hover:bg-crec-gold/90 text-crec-darkblue">
                  <a href="#faire-un-don">Faire un don maintenant</a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12" fill="white">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,213.35,56.44Z" />
          </svg>
        </div>
      </section>

      {/* Impact Visuel Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge variant="outline" className="px-3.5 py-1.5 mb-4 border-crec-darkblue/30 bg-crec-darkblue/5 text-crec-darkblue">
              Notre Impact
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-crec-darkblue">
              Votre don transforme des vies
            </h2>
            <p className="text-lg text-slate-600">
              Découvrez comment votre contribution s'inscrit dans notre mission 
              d'excellence éducative et de développement intégral.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {impactAreas.map((area) => (
              <motion.div
                key={area.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
              >
                <Card className="border border-slate-200 shadow-lg overflow-hidden h-full">
                  <div className="h-48 w-full relative overflow-hidden">
                    <img 
                      src={area.image} 
                      alt={area.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <h3 className="text-xl font-bold flex items-center">
                        <area.icon className="mr-2 h-5 w-5" />
                        {area.title}
                      </h3>
                    </div>
                  </div>
                  <CardContent className="pt-6">
                    <p className="text-slate-600 mb-4">{area.description}</p>
                    <div className="space-y-2 mt-4">
                      {area.examples.map((example, idx) => (
                        <div key={idx} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-crec-gold mr-2 flex-shrink-0" />
                          <span className="text-sm text-slate-700">{example}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Don Section - Interactive */}
      <section id="faire-un-don" className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="px-3.5 py-1.5 mb-4 border-crec-gold/40 bg-crec-gold/5 text-crec-gold">
                Faire un don
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-crec-darkblue">
                Choisissez votre façon de soutenir
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Chaque contribution compte, quelle que soit sa taille. Sélectionnez l'option qui convient le mieux à votre situation.
              </p>
            </div>
            
            <Tabs defaultValue="ponctuel" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="ponctuel">Don ponctuel</TabsTrigger>
                <TabsTrigger value="mensuel">Don mensuel</TabsTrigger>
                <TabsTrigger value="entreprise">Entreprise</TabsTrigger>
              </TabsList>
              
              <TabsContent value="ponctuel" className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                <h3 className="text-xl font-bold mb-6 text-crec-darkblue">Choisissez un montant</h3>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {["20", "50", "100"].map((amount) => (
                    <Button
                      key={amount}
                      onClick={() => {setDonationAmount(amount); setCustomAmount(false)}}
                      variant={donationAmount === amount && !customAmount ? "default" : "outline"}
                      className={`${donationAmount === amount && !customAmount ? "bg-crec-gold hover:bg-crec-gold/90 text-white" : "border-crec-gold/20 text-crec-darkblue hover:bg-crec-gold/5"}`}
                    >
                      {amount}€
                    </Button>
                  ))}
                </div>
                
                <div className="mb-6">
                  <Button
                    onClick={() => setCustomAmount(true)}
                    variant={customAmount ? "default" : "outline"}
                    className={`${customAmount ? "bg-crec-gold hover:bg-crec-gold/90 text-white" : "border-crec-gold/20 text-crec-darkblue hover:bg-crec-gold/5"} w-full mb-4`}
                  >
                    Autre montant
                  </Button>
                  
                  {customAmount && (
                    <div className="flex items-center">
                      <Input
                        type="number"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        className="flex-1"
                      />
                      <span className="ml-2 text-lg font-medium">€</span>
                    </div>
                  )}
                </div>
                
                <Button className="w-full bg-crec-darkblue hover:bg-crec-darkblue/90 text-white py-6">
                  Continuer <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </TabsContent>
              
              <TabsContent value="mensuel" className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                <div className="flex items-center justify-center space-x-2 mb-6 text-blue-600">
                  <Calendar className="h-5 w-5" />
                  <p className="font-medium">Soutien régulier pour un impact durable</p>
                </div>
                
                <h3 className="text-xl font-bold mb-6 text-crec-darkblue text-center">Choisissez un montant mensuel</h3>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {["10", "20", "50"].map((amount) => (
                    <Button
                      key={amount}
                      onClick={() => {setDonationAmount(amount); setCustomAmount(false)}}
                      variant={donationAmount === amount && !customAmount ? "default" : "outline"}
                      className={`${donationAmount === amount && !customAmount ? "bg-crec-gold hover:bg-crec-gold/90 text-white" : "border-crec-gold/20 text-crec-darkblue hover:bg-crec-gold/5"}`}
                    >
                      {amount}€/mois
                    </Button>
                  ))}
                </div>
                
                <Button className="w-full bg-crec-darkblue hover:bg-crec-darkblue/90 text-white py-6">
                  Devenir donateur mensuel <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </TabsContent>
              
              <TabsContent value="entreprise" className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                <div className="text-center mb-8">
                  <Building2 className="w-12 h-12 text-crec-gold mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-crec-darkblue">Dons d'entreprise</h3>
                  <p className="text-slate-600">
                    Devenez partenaire du CREC et soutenez notre mission éducative tout en renforçant votre impact social.
                  </p>
                </div>
                
                <div className="bg-slate-50 p-6 rounded-lg mb-8">
                  <h4 className="font-bold text-crec-darkblue mb-4">Avantages partenaires</h4>
                  <ul className="space-y-3">
                    <li className="flex">
                      <CheckCircle2 className="h-5 w-5 text-crec-gold mr-3 mt-0.5" />
                      <span>Visibilité de votre entreprise sur notre campus</span>
                    </li>
                    <li className="flex">
                      <CheckCircle2 className="h-5 w-5 text-crec-gold mr-3 mt-0.5" />
                      <span>Accès prioritaire à nos étudiants pour vos recrutements</span>
                    </li>
                    <li className="flex">
                      <CheckCircle2 className="h-5 w-5 text-crec-gold mr-3 mt-0.5" />
                      <span>Déduction fiscale selon la législation en vigueur</span>
                    </li>
                  </ul>
                </div>
                
                <Button className="w-full bg-crec-darkblue hover:bg-crec-darkblue/90 text-white py-6">
                  Contacter notre équipe <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge variant="outline" className="px-3.5 py-1.5 mb-4 border-crec-darkblue/30 bg-crec-darkblue/5 text-crec-darkblue">
              Témoignages
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-crec-darkblue">
              Ils ont bénéficié de votre générosité
            </h2>
            <p className="text-lg text-slate-600">
              Découvrez l'impact concret de vos dons à travers les témoignages de nos bénéficiaires.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((item) => (
              <motion.div
                key={item.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Card className="border border-slate-200 shadow-lg overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start mb-6">
                      <div className="text-4xl text-crec-gold font-serif">"</div>
                      <p className="text-slate-700 italic ml-2">{item.quote}</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img 
                          src={item.image} 
                          alt={item.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-crec-darkblue">{item.author}</p>
                        <p className="text-sm text-slate-500">{item.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Fiscalité & Transparence */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
              >
                <Lightbulb className="w-12 h-12 text-crec-gold mb-6" />
                <h3 className="text-2xl font-bold mb-4 text-crec-darkblue">Transparence et impact</h3>
                <p className="text-slate-600 mb-6">
                  Au CREC, nous nous engageons à utiliser vos dons de manière responsable et transparente. 
                  Chaque année, nous publions un rapport complet sur l'utilisation des fonds et leur impact.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-crec-gold">85%</div>
                    <p className="text-sm text-slate-500">Projets éducatifs</p>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-crec-gold">10%</div>
                    <p className="text-sm text-slate-500">Administration</p>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-crec-gold">5%</div>
                    <p className="text-sm text-slate-500">Communication</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
              >
                <BookOpen className="w-12 h-12 text-crec-gold mb-6" />
                <h3 className="text-2xl font-bold mb-4 text-crec-darkblue">Déductions fiscales</h3>
                <p className="text-slate-600 mb-6">
                  Les dons effectués au profit du Centre d'Excellence CREC peuvent être éligibles à des avantages fiscaux 
                  selon la législation en vigueur dans votre pays de résidence.
                </p>
                <Button asChild variant="outline" className="border-crec-darkblue/30 hover:bg-crec-darkblue/5 text-crec-darkblue">
                  <Link to="/fiscalite-dons">En savoir plus</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background avec motif */}
        <div className="absolute inset-0 bg-crec-darkblue">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25px 25px, white 2%, transparent 0%)', backgroundSize: '50px 50px' }}></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="bg-white/20 hover:bg-white/30 text-white mb-6">
                Rejoignez notre communauté de donateurs
              </Badge>
            </motion.div>
            
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold text-white mb-6"
            >
              Ensemble, construisons l'avenir de<br /> l'éducation en RD Congo
            </motion.h2>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-blue-100 mb-10"
            >
              Votre soutien contribue à former les leaders de demain et à créer un impact durable.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="bg-crec-gold hover:bg-crec-gold/90 text-crec-darkblue px-8 py-6 text-lg">
                <a href="#faire-un-don">Faire un don maintenant</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20 px-8 py-6 text-lg">
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DonatePage;