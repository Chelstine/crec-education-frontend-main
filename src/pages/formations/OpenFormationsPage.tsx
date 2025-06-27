import { Button } from "@/components/ui/button";
/* ====== COMMENTAIRES PÉDAGOGIQUES ====== */
/*
 * OBJECTIF D'APPRENTISSAGE :
 * Ce fichier illustre l'architecture React moderne avec TypeScript
 * 
 * CONCEPTS COUVERTS :
 * - Organisation et structure des imports React
 * - Typage TypeScript avec interfaces et types
 * - Hooks React (useState, useEffect, hooks personnalisés)
 * - Gestion d'état local et global
 * - Composition de composants et props
 * - Navigation avec React Router
 * - Patterns de développement modernes
 * 
 * STRUCTURE RECOMMANDÉE :
 * 1. Imports organisés par catégorie (React, Navigation, UI, etc.)
 * 2. Définition des types et interfaces TypeScript
 * 3. Composant principal avec logique métier
 * 4. Fonctions utilitaires et handlers d'événements
 * 5. Rendu JSX avec structure sémantique HTML
 */

import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Calendar, 
  FileText, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Globe, 
  Computer, 
  HeartHandshake, 
  Award,
  Clock,
  MapPin,
  CheckCircle,
  Star
} from "lucide-react";

const OpenFormationsPage = () => {
  const formations = [
    {
      id: 1,
      title: "Formations en Langues",
      icon: <Globe className="w-8 h-8 text-crec-gold" />,
      description: "Maîtrisez l'anglais et le français avec nos cours adaptés à tous les niveaux",
      features: [
        "Cours d'anglais général et professionnel",
        "Préparation aux tests TOEFL, IELTS, TCF",
        "Français pour étrangers (FLE)",
        "Conversation et prononciation"
      ],
      duration: "3-6 mois",
      level: "Débutant à Avancé",
      price: "À partir de 15,000 FCFA",
      certificate: true
    },
    {
      id: 2,
      title: "Informatique de Base",
      icon: <Computer className="w-8 h-8 text-crec-gold" />,
      description: "Initiez-vous à l'informatique et aux outils numériques essentiels",
      features: [
        "Utilisation de l'ordinateur (Windows, Mac)",
        "Bureautique (Word, Excel, PowerPoint)",
        "Navigation internet et email",
        "Réseaux sociaux et sécurité numérique"
      ],
      duration: "2-4 mois",
      level: "Débutant",
      price: "À partir de 20,000 FCFA",
      certificate: true
    },
    {
      id: 3,
      title: "Accompagnement Scolaire",
      icon: <HeartHandshake className="w-8 h-8 text-crec-gold" />,
      description: "Soutien scolaire personnalisé pour tous les niveaux",
      features: [
        "Cours de soutien toutes matières",
        "Préparation aux examens officiels",
        "Méthodologie et techniques d'étude",
        "Encadrement personnalisé"
      ],
      duration: "Toute l'année",
      level: "Primaire à Universitaire",
      price: "À partir de 10,000 FCFA",
      certificate: false
    },
    {
      id: 4,
      title: "Entrepreneuriat",
      icon: <GraduationCap className="w-8 h-8 text-crec-gold" />,
      description: "Développez vos compétences entrepreneuriales et créez votre entreprise",
      features: [
        "Élaboration de business plan",
        "Gestion financière et comptabilité",
        "Marketing et communication",
        "Accompagnement post-formation"
      ],
      duration: "4-6 mois",
      level: "Tous niveaux",
      price: "À partir de 25,000 FCFA",
      certificate: true
    }
  ];

  const testimonials = [
    {
      name: "Marie Kouassi",
      formation: "Anglais TOEFL",
      comment: "Grâce au CREC, j'ai obtenu mon score TOEFL et je peux maintenant étudier au Canada !",
      score: "Score TOEFL: 98/120"
    },
    {
      name: "Jean Baptiste",
      formation: "Informatique",
      comment: "À 55 ans, je pensais qu'il était trop tard. Maintenant je maîtrise Excel et j'aide ma famille.",
      score: "Certification obtenue"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Style harmonisé */}
      <section className="relative w-full overflow-hidden">
        {/* Background with parallax effect */}
        <div className="absolute inset-0 bg-[url('/img/formation.png')] bg-cover bg-center" />
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
                animate={{
                  scale: [1, 1.05, 1],
                  transition: { 
                    repeat: Infinity,
                    repeatType: "reverse", 
                    duration: 1.5
                  }
                }}
                className="w-2 h-2 rounded-full bg-crec-gold mr-2" 
              />
              <span className="text-sm font-medium">Formation Continue</span>
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight">
              Formations Ouvertes
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Des formations accessibles à tous pour développer vos compétences et améliorer votre vie professionnelle et personnelle
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Badge variant="secondary" className="text-sm py-1.5 px-3 bg-white/20 backdrop-blur-sm">
                <Award className="w-4 h-4 mr-2" />
                Certifications reconnues
              </Badge>
              <Badge variant="secondary" className="text-sm py-1.5 px-3 bg-white/20 backdrop-blur-sm">
                <Clock className="w-4 h-4 mr-2" />
                Horaires flexibles
              </Badge>
            </div>
          </motion.div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px]" fill="#f8fafc">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,213.35,56.44Z" />
          </svg>
        </div>
      </section>

      {/* Introduction */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-crec-blue mb-8"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Pourquoi choisir nos formations ?
          </motion.h2>
          <motion.div
            className="space-y-6 text-gray-700 text-lg leading-relaxed text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="max-w-3xl mx-auto">
              Au CREC, nous croyons que l'éducation doit être accessible à tous. Nos formations ouvertes s'adressent 
              aux personnes de tous niveaux d'études qui souhaitent acquérir de nouvelles compétences ou se perfectionner.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {[
              {
                icon: <HeartHandshake className="w-12 h-12 text-crec-gold" />,
                title: "Accessible à tous",
                description: "Peu importe votre niveau d'études, nos formations sont conçues pour vous accompagner"
              },
              {
                icon: <Star className="w-12 h-12 text-crec-gold" />,
                title: "Qualité reconnue",
                description: "Formateurs expérimentés et méthodes pédagogiques éprouvées"
              },
              {
                icon: <Award className="w-12 h-12 text-crec-gold" />,
                title: "Certifications",
                description: "Obtenez des certificats reconnus pour valoriser vos compétences"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white shadow-md hover:shadow-lg transition border-t-4 border-t-blue-500">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="flex justify-center mb-4">{item.icon}</div>
                    <h3 className="text-xl font-semibold text-crec-darkblue mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Formations disponibles */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-crec-blue mb-4">Nos Formations</h2>
            <div className="w-20 h-1 bg-crec-gold mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez notre catalogue de formations adaptées à vos besoins personnels et professionnels
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {formations.map((formation, index) => (
              <motion.div
                key={formation.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow border-0 shadow-md overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-2"></div>
                  <CardHeader className="bg-blue-50">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-full bg-white/80 shadow-sm">
                        {formation.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl text-crec-darkblue">{formation.title}</CardTitle>
                        <div className="flex items-center flex-wrap gap-2 mt-2">
                          <Badge variant="outline" className="bg-white/80">{formation.level}</Badge>
                          <Badge variant="outline" className="bg-white/80">{formation.duration}</Badge>
                          {formation.certificate && (
                            <Badge className="bg-crec-gold hover:bg-crec-gold/90 text-white">
                              <Award className="w-3 h-3 mr-1" />
                              Certificat
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{formation.description}</p>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-crec-darkblue mb-2">Programme :</h4>
                        <ul className="space-y-1">
                          {formation.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <span className="text-lg font-bold text-crec-gold">{formation.price}</span>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MapPin className="w-4 h-4" />
                          CREC Cotonou
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-crec-blue mb-4">Témoignages</h2>
            <div className="w-20 h-1 bg-crec-gold mx-auto mb-6"></div>
            <p className="text-lg text-gray-600">Découvrez les réussites de nos apprenants</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md border border-blue-100"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic text-lg">"{testimonial.comment}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-blue-100">
                  <div>
                    <p className="font-semibold text-crec-darkblue">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.formation}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 font-medium">
                    {testimonial.score}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-crec-darkblue via-crec-blue to-crec-darkblue"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-black/40 to-transparent p-10 rounded-xl backdrop-blur-sm border border-white/10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Prêt à commencer votre formation ?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Rejoignez des centaines d'apprenants qui ont déjà transformé leur avenir avec nos formations
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/formations/ouvertes/inscription" 
                className="px-8 py-3 bg-crec-gold hover:bg-amber-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                <BookOpen className="w-5 h-5" />
                S'inscrire maintenant
              </Link>
              <Link to="/contact" 
                className="px-8 py-3 border border-white/70 text-white hover:bg-white/20 rounded-full transition-all duration-300 flex items-center justify-center gap-2">
                <Users className="w-5 h-5" />
                Nous contacter
              </Link>
            </div>
            <p className="text-sm text-blue-200 mt-6">
              <Calendar className="w-4 h-4 inline mr-2" />
              Inscriptions ouvertes toute l'année
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default OpenFormationsPage;
