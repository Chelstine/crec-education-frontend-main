import React from 'react';
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

import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Heart, Book, Globe, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const EquipePage = () => {
  const equipe = [
    {
      id: 1,
      name: 'Père Jean Dupont',
      role: 'Provincial',
      description: 'Dirige la Province jésuite d’Afrique de l’Ouest, supervisant 1 712 membres dans 12 pays, avec un accent sur l’éducation et la justice sociale.',
      image: '/img/team/provincial.jpg'
    },
    {
      id: 2,
      name: 'Père Pierre Martin',
      role: 'Vicaire Provincial',
      description: 'Soutient le Provincial dans la coordination des missions et des communautés jésuites dans la région.',
      image: '/img/team/vicaire.jpg'
    },
    {
      id: 3,
      name: 'Père Marie Laurent',
      role: 'Économe Provincial',
      description: 'Gère les finances et les ressources pour soutenir les œuvres éducatives, sociales et spirituelles de la Province.',
      image: '/img/team/econome.jpg'
    },
    {
      id: 4,
      name: 'Père Thomas Bernard',
      role: 'Responsable de la Formation',
      description: 'Supervise la formation des 583 novices et 2 587 scolastiques, préparant la prochaine génération de jésuites.',
      image: '/img/team/formation.jpg'
    }
  ];

  const missions = [
    {
      icon: Book,
      title: 'Éducation',
      description: 'Supervision d’écoles et d’universités comme l’Institut de Théologie de la Compagnie de Jésus à Abidjan, formant des leaders africains.'
    },
    {
      icon: Heart,
      title: 'Justice Sociale',
      description: 'Soutien aux marginalisés via des initiatives comme le Jesuit Refugee Service, actif dans les camps de réfugiés en Afrique de l’Ouest.'
    },
    {
      icon: Leaf,
      title: 'Écologie',
      description: 'Promotion de l’écologie intégrale, inspirée par Laudato Si’, pour protéger l’environnement en Afrique.'
    },
    {
      icon: Globe,
      title: 'Dialogue Interreligieux',
      description: 'Encouragement du dialogue avec les communautés musulmanes et traditionnelles pour la paix et la réconciliation.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-[15pt]">
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
        <div className="min-h-[400px] flex flex-col items-center justify-center text-center relative text-white p-6 bg-a-propos">
          <div className="max-w-3xl mx-auto bg-black/50 p-8 rounded-lg backdrop-blur-sm">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Le Provincial et son Équipe</h1>
            <p className="text-xl md:text-2xl mb-8">
              Dirigeant la Province jésuite d’Afrique de l’Ouest, une équipe dévouée guide la mission ignatienne dans 12 pays.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-white text-slate-800 px-4">
        <div className="max-w-4xl mx-auto space-y-12 text-justify">
          <motion.h2
            className="text-4xl font-bold text-center mb-4 text-amber-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Notre Équipe de Direction
          </motion.h2>
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              `La Province jésuite d’Afrique de l’Ouest, couvrant 12 pays (dont le Nigeria, le Ghana, et la Côte d’Ivoire), est dirigée par une équipe de leaders jésuites sous la conduite du Père Provincial. En 2022, la Province compte 1 712 membres, dont 583 novices et 2 587 scolastiques.`,
              `Cette équipe coordonne des œuvres variées, de l’éducation (comme l’Institut de Théologie d’Abidjan) à l’accompagnement spirituel, en passant par des projets de justice sociale via le Jesuit Refugee Service (JRS), qui soutient les réfugiés dans des zones de conflit.`,
              `Guidée par la spiritualité ignatienne et les préférences apostoliques (2019-2029), l’équipe promeut la foi, la justice, et l’écologie intégrale, tout en renforçant les liens avec l’Église locale et les communautés interreligieuses.`
            ].map((text, index) => (
              <p
                key={index}
                className="relative pl-6 before:absolute before:left-0 before:top-1 before:w-1 before:h-full before:bg-amber-500 before:rounded-full"
              >
                <span dangerouslySetInnerHTML={{ __html: text }} />
              </p>
            ))}
          </motion.div>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-8 py-3 shadow-md transition-transform transform hover:scale-105"
              asChild
            >
              <a href="https://www.jesuits.global" target="_blank" rel="noopener noreferrer">
                En savoir plus sur la Compagnie de Jésus
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Transition graphique + citation */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg className="relative block w-full h-16 text-amber-50" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path
              fill="currentColor"
              d="M0,64L48,74.7C96,85,192,107,288,117.3C384,128,480,128,576,144C672,160,768,192,864,186.7C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128V0H1392C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0H0Z"
            />
          </svg>
        </div>
        <div className="bg-amber-50 py-8 text-center relative z-10">
          <p className="text-xl italic text-amber-800">
            "Servir avec humilité pour la gloire de Dieu."
          </p>
        </div>
      </div>

      {/* Équipe */}
      <section className="py-20 bg-jesuit-light">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center text-jesuit-dark"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Les Membres de l’Équipe
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {equipe.map((membre) => (
              <Card
                key={membre.id}
                className="hover:shadow-xl transition-shadow duration-300 rounded-xl bg-white"
              >
                <CardContent className="p-4 flex flex-col items-center">
                  <div className="w-full h-64 bg-white flex items-center justify-center overflow-hidden rounded-lg mb-4 shadow-sm">
                    <img
                      src={membre.image}
                      alt={membre.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">{membre.name}</h3>
                  <p className="text-jesuit-darkgray text-base leading-relaxed text-center">{membre.role}</p>
                  <p className="text-jesuit-darkgray text-base leading-relaxed text-justify">{membre.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Missions */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center text-jesuit-dark"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Nos Missions
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {missions.map((mission, i) => (
              <Card key={i} className="hover:shadow-lg">
                <CardContent className="p-4 flex items-start">
                  <mission.icon className="w-12 h-12 text-jesuit-gold mr-4" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">{mission.title}</h3>
                    <p className="text-jesuit-darkgray text-base leading-relaxed">{mission.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Régional */}
      <section className="py-20 bg-jesuit-light">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center text-jesuit-dark"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Impact en Afrique de l’Ouest
          </motion.h2>
          <motion.div
            className="space-y-8 text-jesuit-darkgray text-justify"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="bg-white/80 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300 backdrop-blur-sm">
              La Province gère des institutions éducatives, comme l’Institut de Théologie de la Compagnie de Jésus (ITCJ) à Abidjan, qui forme des prêtres et laïcs pour le ministère et le leadership en Afrique.
            </p>
            <p className="bg-white/80 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300 backdrop-blur-sm">
              À travers le Jesuit Refugee Service, la Province soutient les réfugiés et déplacés dans des pays comme le Nigeria et le Ghana, offrant éducation, aide alimentaire et accompagnement psychologique.
            </p>
            <p className="bg-white/80 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300 backdrop-blur-sm">
              Les initiatives écologiques, inspirées par <em>Laudato Si’</em>, incluent des projets de reforestation et de sensibilisation environnementale, notamment dans les zones rurales du Sénégal et du Togo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-12 text-center">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold mb-4">Contactez Notre Équipe</h2>
          <p className="text-gray-700 mb-6">
            Notre équipe provinciale est à votre disposition pour répondre à vos questions et vous accompagner dans la mission ignatienne.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              className="bg-[#FCA311] hover:bg-[#fcb930] text-white rounded-full px-6 py-2 shadow-md"
              asChild
            >
              <Link to="/contact">Nous contacter</Link>
            </Button>
            <Button
              className="bg-white border-2 border-[#FCA311] text-[#FCA311] hover:bg-[#FCA311] hover:text-white rounded-full px-6 py-2 transition shadow-md"
              asChild
            >
              <Link to="/about/communautes">Découvrir nos communautés</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EquipePage;