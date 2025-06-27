/* ====== IMPORTS REACT ET HOOKS ====== */
import React, { useState } from 'react'; 
// - React : bibliothèque principale pour créer des composants
// - useState : hook pour gérer l'état local (ex: onglet actif, contenu affiché)

/* ====== IMPORTS COMPOSANTS UI ====== */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// Composants Card pour structurer le contenu en cartes visuelles

/* ====== IMPORTS NAVIGATION ====== */
import { Link } from 'react-router-dom'; // Composant Link pour la navigation interne

/* ====== IMPORTS COMPOSANTS UI ====== */
import { Button } from '@/components/ui/button'; // Composant Button stylisé réutilisable

/* ====== IMPORTS ICÔNES ====== */
import { 
  Users,     // Icône groupe pour l'équipe
  Book,      // Icône livre pour l'éducation
  Heart,     // Icône cœur pour la solidarité
  Globe,     // Icône globe pour l'international
  Target,    // Icône cible pour les objectifs
  Lightbulb, // Icône ampoule pour l'innovation
  Star,      // Icône étoile pour l'excellence
  UserCheck, // Icône utilisateur validé pour le soin personnalisé
  MapPin,    // Icône marqueur pour la localisation
  Calendar,  // Icône calendrier pour les dates
  Mail,      // Icône email pour les contacts
  Phone      // Icône téléphone pour les contacts
} from 'lucide-react';

import { motion } from "framer-motion";

const AboutPage = () => {
  const valeurs = [
    {
      title: 'Cura Personalis',
      description: 'Un soin authentique porté à chaque personne',
      detail: "Une attention individualisée pour permettre à chaque étudiant de se développer dans toutes ses dimensions – intellectuelle, spirituelle, sociale et affective.",
      icon: UserCheck
    },
    {
      title: 'Magis',
      description: 'Toujours donner le meilleur de soi',
      detail: "Le désir profond d'aller plus loin, de viser l'excellence pour le plus grand bien commun.",
      icon: Star
    },
    {
      title: 'Tantum Quantum',
      description: 'Discernement et choix éclairés',
      detail: "Un principe de discernement visant à privilégier ce qui aide réellement à atteindre nos objectifs spirituels et humains.",
      icon: Target
    },
    {
      title: 'Solidarité',
      description: 'Engagement envers les plus vulnérables',
      detail: "Un esprit de fraternité et de compassion tourné vers le service des plus fragiles.",
      icon: Heart
    }
  ];

  const history = [
    {
      year: '2012',
      title: 'Fondation du CREC',
      description: "Création du Centre de Recherche, d'Étude et de Créativité par la Compagnie de Jésus au Bénin."
    },
    {
      year: '2014',
      title: 'Premiers programmes',
      description: "Lancement des premiers programmes de formation et de recherche."
    },
    {
      year: '2016',
      title: 'Expansion',
      description: "Développement des partenariats internationaux et élargissement des activités."
    },
    {
      year: '2018',
      title: 'Innovation',
      description: "Création du FABLAB et lancement des programmes d'innovation technologique."
    },
    {
      year: '2020',
      title: 'Adaptation',
      description: "Mise en place des programmes en ligne et adaptation aux défis de la pandémie."
    },
    {
      year: '2022',
      title: 'Dixième anniversaire',
      description: "Célébration des 10 ans d'excellence et de service."
    }
  ];

  // Animation variants
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
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Hero Section - Harmonisé avec ContactPage */}
      <section className="relative w-full overflow-hidden">
        {/* Background with parallax effect */}
        <div className="absolute inset-0 bg-[url('/img/crec3.jpg')] bg-cover bg-center" />
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
              À Propos du CREC
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Un centre d'excellence fondé sur des valeurs fortes, combinant tradition jésuite et innovation pour répondre aux défis d'aujourd'hui.
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

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center text-crec-dark">Notre Mission</h2>
          <div className="max-w-4xl mx-auto text-crec-dark space-y-6">
            <p>Le Centre de Recherche, d'Étude et de Créativité (CREC), fondé par la Compagnie de Jésus, se veut un lieu où se conjuguent excellence académique, innovation technologique et service du bien commun.</p>
            <p>Son projet-phare, l’Institut des Sciences et Technologies Matteo Ricci (ISTMR), rend hommage à un jésuite pionnier du dialogue entre les cultures par les sciences et l’amitié. Il propose des formations exigeantes et humaines, ancrées dans la tradition éducative ignatienne.</p>
          </div>
        </div>
      </section>

      {/* Histoire */}
      <section className="py-16 bg-crec-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center text-crec-dark">Notre Histoire</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-crec-gold"></div>
            {history.map((item, idx) => (
              <div key={item.year} className={`relative mb-12 ${idx % 2 === 0 ? 'ml-auto' : 'mr-auto'} w-full md:w-1/2`}>
                <Card className={`hover:shadow-lg transition-shadow duration-300 ${idx % 2 === 0 ? 'ml-0 md:ml-8' : 'mr-0 md:mr-8'}`}>
                  <CardContent className="p-6">
                    <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-crec-gold rounded-full border-4 border-white"></div>
                    <h3 className="text-2xl font-bold text-crec-gold mb-2">{item.year}</h3>
                    <h4 className="text-xl font-semibold text-crec-dark mb-2">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valeurs pédagogiques */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center text-crec-dark">Valeurs pédagogiques ignatiennes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {valeurs.map((valeur, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow duration-300" role="region" aria-labelledby={`valeur-title-${index}`}>
                      <CardHeader>
                        <div className="flex items-center mb-2">
                          <valeur.icon className="w-8 h-8 text-crec-gold mr-3" aria-hidden="true" />
                          <CardTitle id={`valeur-title-${index}`} className="text-xl font-bold text-crec-dark">
                            {valeur.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-crec-dark font-medium mb-1">{valeur.description}</p>
                        <p className="text-gray-600">{valeur.detail}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
