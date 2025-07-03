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
import { ErrorBoundary } from "@/components/common";
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
import { OpenFormation } from "@/types";
import { useOpenFormations } from "@/hooks/useApi";

// Fonction pour déterminer l'icône en fonction du titre
const getFormationIcon = (title: string) => {
  if (title.toLowerCase().includes('langue')) return Globe;
  if (title.toLowerCase().includes('informatique')) return Computer;
  if (title.toLowerCase().includes('accompagnement')) return HeartHandshake;
  if (title.toLowerCase().includes('entrepreneuriat')) return GraduationCap;
  return BookOpen;
};

const OpenFormationsPage = () => {
  const { data: formations = [], isLoading, error } = useOpenFormations();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-crec-gold mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des formations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erreur lors du chargement des formations</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-crec-gold text-white rounded hover:bg-crec-gold/90"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
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

      {/* Introduction avec texte descriptif */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-crec-darkblue mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Les Formations Ouvertes du CREC
          </motion.h2>
          
          <motion.div
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p>
              Le Centre de Recherche, d'Étude et de Créativité (CREC) propose des formations ouvertes 
              accessibles à tous, conçues pour répondre aux besoins de développement de compétences 
              professionnelles et personnelles. Ces programmes structurés s'adressent à un large public 
              sans condition préalable de diplôme.
            </p>
            
            <p>
              Contrairement aux formations individualisées, nos cours se déroulent en groupe avec un 
              calendrier et un programme définis, permettant une expérience d'apprentissage collective 
              enrichissante. Chaque formation est dispensée par des formateurs qualifiés qui 
              accompagnent l'ensemble du groupe vers l'acquisition des compétences visées.
            </p>
            
            <p>
              Notre approche pédagogique est fondée sur l'équilibre entre théorie et pratique, avec une 
              attention particulière portée à l'application concrète des connaissances. Les participants 
              suivent un parcours commun, avec des évaluations régulières pour garantir l'assimilation 
              des contenus.
            </p>
            
            <div className="flex flex-wrap gap-4 items-center justify-center mt-8 text-sm">
              <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-md text-crec-darkblue">
                <Award className="w-4 h-4 text-crec-darkblue" />
                <span>Certificats délivrés</span>
              </div>
              <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-md text-crec-darkblue">
                <Clock className="w-4 h-4 text-crec-darkblue" />
                <span>Sessions en groupe</span>
              </div>
              <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-md text-crec-darkblue">
                <Calendar className="w-4 h-4 text-crec-darkblue" />
                <span>Calendrier défini</span>
              </div>
            </div>
          </motion.div>
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
            {formations.map((formation, index) => {
              const IconComponent = getFormationIcon(formation.title);
              return (
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
                          <IconComponent className="w-8 h-8 text-crec-gold" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-crec-darkblue">{formation.title}</CardTitle>
                          <div className="flex items-center flex-wrap gap-2 mt-2">
                            <Badge variant="outline" className="bg-white/80">{formation.duration}</Badge>
                            <Badge variant="outline" className="bg-white/80">{formation.maxParticipants} places</Badge>
                            <Badge className="bg-crec-gold hover:bg-crec-gold/90 text-white">
                              <Award className="w-3 h-3 mr-1" />
                              Certificat
                            </Badge>
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
                            {formation.syllabus.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {formation.prerequisites && (
                          <div className="text-sm text-gray-600">
                            <strong>Prérequis :</strong> {formation.prerequisites}
                          </div>
                        )}
                        <div className="flex items-center justify-between pt-4 border-t">
                          <span className="text-lg font-bold text-crec-gold">{formation.price.toLocaleString()} FCFA</span>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 text-sm text-gray-500 mr-2">
                              <MapPin className="w-4 h-4" />
                              CREC Cotonou
                            </div>
                            <Link 
                              to="/formations/ouvertes/inscription"
                              className="px-3 py-1.5 text-xs font-medium text-white bg-crec-darkblue rounded-md hover:bg-crec-gold transition-colors flex items-center"
                            >
                              <FileText className="w-3 h-3 mr-1" />
                              S'inscrire
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section d'information sur la première promotion */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-crec-darkblue mb-3">Première promotion 2025-2026</h2>
            <div className="w-16 h-0.5 bg-crec-gold mx-auto mb-4"></div>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-xl shadow-sm border border-blue-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-700 mb-4 leading-relaxed">
              Nos formations ouvertes accueilleront leur première promotion pour l'année académique 2025-2026. 
              En rejoignant cette première cohorte, vous bénéficierez d'une attention particulière et 
              ferez partie des pionniers de ce nouveau programme éducatif au CREC.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 mt-6 text-sm">
              <div className="flex items-start gap-2">
                <Calendar className="w-5 h-5 text-crec-gold mt-0.5" />
                <div>
                  <p className="font-medium text-crec-darkblue">Début des cours</p>
                  <p className="text-gray-600">Octobre 2025</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Users className="w-5 h-5 text-crec-gold mt-0.5" />
                <div>
                  <p className="font-medium text-crec-darkblue">Taille des groupes</p>
                  <p className="text-gray-600">15 à 20 participants</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Award className="w-5 h-5 text-crec-gold mt-0.5" />
                <div>
                  <p className="font-medium text-crec-darkblue">Certification</p>
                  <p className="text-gray-600">En fin de formation</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      </div>
    </ErrorBoundary>
  );
};

export default OpenFormationsPage;
