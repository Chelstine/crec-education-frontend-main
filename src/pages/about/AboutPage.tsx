import React, { useState } from 'react';
import Banner from '@/components/common/Banner';
import SectionTitle from '@/components/common/SectionTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Users, Book, Heart, Globe, Target, Lightbulb, Star, UserCheck, MapPin, Calendar, Mail, Phone
} from 'lucide-react';

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

  return (
    <div className="min-h-screen">
      {/* Hero Banner - Updated style */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20 mb-12">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">À propos du CREC</h1>
            <p className="text-xl mb-8 opacity-90">
              Centre de Recherche, d'Étude et de Créativité - Une institution d'excellence au service de l'éducation
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <MapPin className="w-4 h-4" />
              <span>Godomey-Salamey, Bénin</span>
              <span className="mx-2">•</span>
              <Calendar className="w-4 h-4" />
              <span>Fondé en 2012</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Notre Mission" 
            subtitle="Une éducation intégrale au service de la société"
            align="center"
          />
          <div className="max-w-4xl mx-auto mt-8 text-crec-darkgray space-y-6">
            <p>Le Centre de Recherche, d'Étude et de Créativité (CREC), fondé par la Compagnie de Jésus, se veut un lieu où se conjuguent excellence académique, innovation technologique et service du bien commun.</p>
            <p>Son projet-phare, l’Institut des Sciences et Technologies Matteo Ricci (ISTMR), rend hommage à un jésuite pionnier du dialogue entre les cultures par les sciences et l’amitié. Il propose des formations exigeantes et humaines, ancrées dans la tradition éducative ignatienne.</p>
          </div>
        </div>
      </section>

      {/* Histoire */}
      <section className="py-16 bg-crec-offwhite">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Notre Histoire"
            subtitle="De la fondation à aujourd'hui"
            align="center"
          />
          <div className="max-w-6xl mx-auto mt-12">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-crec-gold"></div>
              {history.map((item, idx) => (
                <div key={item.year} className={`relative mb-12 ${idx % 2 === 0 ? 'ml-auto' : 'mr-auto'} w-1/2`}>
                  <div className={`p-6 bg-white rounded-lg shadow-md ${idx % 2 === 0 ? 'ml-8' : 'mr-8'}`}>
                    <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-crec-gold rounded-full border-4 border-white"></div>
                    <h3 className="text-2xl font-bold text-crec-gold mb-2">{item.year}</h3>
                    <h4 className="text-xl font-semibold text-crec-darkblue mb-2">{item.title}</h4>
                    <p className="text-crec-darkgray">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs pédagogiques */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Valeurs pédagogiques ignatiennes" 
            subtitle="Éduquer la personne dans toutes ses dimensions"
            align="center"
          />
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {valeurs.map((valeur, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <valeur.icon className="w-8 h-8 text-blue-600" />
                    <div className="flex-1">
                      <CardTitle className="text-xl">{valeur.title}</CardTitle>
                      <p className="text-gray-600 mt-1">{valeur.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 italic">{valeur.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
n

      {/* CTA Final */}
      <section className="py-20 bg-crec-darkblue text-white">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4">Aimez vous notre centre?</h2>
          <p className="text-lg md:text-xl mb-8">
            Contactez nous si vous avez la moindre question, et nous y répondrons dans les délais les plus brefs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button className="border-white text-white hover:text-crec-darkblue hover:bg-white px-6 py-3 text-lg rounded-full w-full sm:w-64" asChild>
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
