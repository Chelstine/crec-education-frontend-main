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
import { Users, Heart, Book, Globe, Leaf, Cross } from 'lucide-react';
import { motion } from 'framer-motion';

const EquipePage = () => {
  const equipe = [
    {
      id: 1,
      name: 'Père Jean Dupont',
      role: 'Provincial',
      description: 'Dirige la Province jésuite d'Afrique de l'Ouest, supervisant 1 712 membres dans 12 pays, avec un accent sur l'éducation et la justice sociale.',
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
      name: 'Père Antoine Leconte',
      role: 'Délégué pour l'Éducation',
      description: 'Supervise les institutions éducatives jésuites, dont 12 écoles et 3 universités, touchant plus de 25 000 étudiants.',
      image: '/img/team/education.jpg'
    },
    {
      id: 5,
      name: 'Père Thomas Dubois',
      role: 'Délégué pour la Formation',
      description: 'Responsable de la formation des futurs jésuites, du noviciat jusqu'à l'ordination, avec un parcours de 10 à 12 ans.',
      image: '/img/team/formation.jpg'
    },
    {
      id: 6,
      name: 'Frère Michel Leclerc',
      role: 'Coordinateur des Œuvres Sociales',
      description: 'Coordonne les projets sociaux et humanitaires, notamment le Service Jésuite des Réfugiés en zones de conflit.',
      image: '/img/team/social.jpg'
    }
  ];
  
  const missions = [
    {
      icon: Book,
      title: 'Éducation',
      description: 'Gestion de l'Institut Supérieur de Théologie d'Abidjan et de 12 écoles pour plus de 25 000 étudiants.'
    },
    {
      icon: Heart,
      title: 'Justice Sociale',
      description: 'Soutien aux marginalisés via des initiatives comme le Jesuit Refugee Service, actif dans les camps de réfugiés en Afrique de l'Ouest.'
    },
    {
      icon: Leaf,
      title: 'Écologie',
      description: 'Promotion de l'écologie intégrale, inspirée par Laudato Si', pour protéger l'environnement en Afrique.'
    },
    {
      icon: Globe,
      title: 'Dialogue Interreligieux',
      description: 'Encouragement du dialogue avec les communautés musulmanes et traditionnelles pour la paix et la réconciliation.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-[15pt]">
      {/* Hero Section amélioré */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-crec-darkblue/80 to-black/70" />
        <div className="min-h-[450px] flex flex-col items-center justify-center text-center relative text-white p-6">
          <div className="absolute inset-0 z-[-1]">
            <img 
              src="/img/crec1.jpg" 
              alt="Équipe CREC" 
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.75) contrast(1.1)' }}
            />
          </div>
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-black/60 to-crec-darkblue/50 p-10 rounded-xl backdrop-blur-sm border border-white/10 shadow-2xl">
            <div className="text-crec-gold text-sm uppercase tracking-widest mb-2">Équipe de Direction</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-5">
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Le Provincial et son Équipe
              </span>
            </h1>
            <div className="w-20 h-1 bg-crec-gold mx-auto mb-6"></div>
            <p className="text-xl md:text-2xl mb-4 text-slate-100">
              Dirigeant la Province jésuite d'Afrique de l'Ouest, une équipe dévouée guide la mission ignatienne dans 12 pays.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <Users className="text-blue-300 h-6 w-6 opacity-75" />
              <Book className="text-blue-300 h-6 w-6 opacity-75" />
              <Heart className="text-blue-300 h-6 w-6 opacity-75" />
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-14 bg-gradient-to-b from-amber-50 to-white text-slate-800 px-4">
        <div className="max-w-4xl mx-auto space-y-8 text-justify">
          <motion.h2
            className="text-3xl font-bold text-center mb-4 text-amber-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Notre Équipe de Direction
          </motion.h2>
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              `La Province jésuite d'Afrique de l'Ouest, couvrant 12 pays (dont le Nigeria, le Ghana, et la Côte d'Ivoire), est dirigée par une équipe de leaders jésuites sous la conduite du Père Provincial. En 2022, la Province compte 1 712 membres, dont 583 novices et 2 587 scolastiques.`,
              `Cette équipe coordonne des œuvres variées, de l'éducation (comme l'Institut de Théologie d'Abidjan) à l'accompagnement spirituel, en passant par des projets de justice sociale via le Jesuit Refugee Service (JRS), qui soutient les réfugiés dans des zones de conflit.`,
              `Guidée par la spiritualité ignatienne et les préférences apostoliques (2019-2029), l'équipe promeut la foi, la justice, et l'écologie intégrale, tout en renforçant les liens avec l'Église locale et les communautés interreligieuses.`
            ].map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Membres de l'Équipe */}
      <section className="py-14 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
            L'Équipe Provinciale
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipe.map((membre, index) => (
              <motion.div
                key={membre.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-200">
                  <div className="h-64 bg-slate-200 overflow-hidden">
                    <div className="h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300">
                      <Users className="h-24 w-24 text-slate-500" />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-1">{membre.name}</h3>
                    <p className="text-amber-600 font-medium mb-4">{membre.role}</p>
                    <p className="text-slate-600 text-sm leading-relaxed">{membre.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Missions Section */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
            Nos Missions Principales
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {missions.map((mission, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6 border border-slate-200"
              >
                <div className="flex mb-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <mission.icon className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">{mission.title}</h3>
                <p className="text-slate-600 leading-relaxed">{mission.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Citation Finale */}
      <section className="py-16 bg-crec-darkblue text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <Cross className="h-12 w-12 text-crec-gold mx-auto opacity-75" />
          </div>
          <blockquote className="text-2xl md:text-3xl font-light italic mb-6">
            "La Compagnie de Jésus cherche à servir l'humanité par la foi qui fait justice, en dialogue avec les cultures et les religions."
          </blockquote>
          <p className="text-lg text-slate-300">— Arturo Sosa, SJ, Supérieur Général de la Compagnie de Jésus</p>
        </div>
      </section>

      {/* Appel à l'action */}
      <section className="py-10 bg-gradient-to-b from-slate-100 to-white px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-6 text-slate-800">
            Découvrez les Œuvres Jésuites en Afrique de l'Ouest
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-crec-gold text-white hover:bg-amber-600">
              <Link to="/formations/university">Nos Formations</Link>
            </Button>
            <Button asChild variant="outline" className="border-crec-blue text-crec-blue hover:bg-crec-blue/10">
              <Link to="/contact">Nous Contacter</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EquipePage;
