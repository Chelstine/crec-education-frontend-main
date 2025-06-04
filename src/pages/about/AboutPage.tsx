import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users, Book, Heart, Globe, Target, Lightbulb, Star, UserCheck, MapPin, Calendar, Mail, Phone } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Banner */}
      <section className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
        <div
          className="min-h-[300px] flex flex-col items-center justify-center text-center relative text-white p-6"
          style={{
            backgroundImage: "url('/img/about-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          role="banner"
        >
          <div className="max-w-3xl mx-auto bg-black/50 p-8 rounded-lg backdrop-blur-sm">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">À propos du CREC</h1>
            <p className="text-lg md:text-xl mb-8">
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
                  <div className="flex items-center space-x-4">
                    <valeur.icon className="w-8 h-8 text-crec-gold" />
                    <div className="flex-1">
                      <CardTitle id={`valeur-title-${index}`} className="text-xl text-crec-dark">{valeur.title}</CardTitle>
                      <p className="text-gray-600 mt-1">{valeur.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">{valeur.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gray-50 py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold mb-4">Aimez-vous notre centre ?</h2>
          <p className="text-gray-700 mb-6">
            Contactez notre équipe pour toute question concernant le CREC ou nos formations.
          </p>
          <Button
            className="bg-white border-2 border-[#FCA311] text-[#FCA311] hover:bg-[#FCA311] hover:text-white rounded-full px-6 py-2 transition duration-300"
            asChild
          >
            <Link to="/contact" aria-label="Nous contacter">Nous contacter</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;