import React from 'react';
import Banner from '@/components/common/Banner';
import SectionTitle from '@/components/common/SectionTitle';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const IgnacePage = () => {
  const lifeEvents = [
    {
      year: '1491',
      title: 'Naissance',
      description: 'Naissance à Loyola, dans le Pays basque espagnol.'
    },
    {
      year: '1521',
      title: 'Blessure à Pampelune',
      description: 'Blessé lors de la bataille de Pampelune, il commence sa conversion spirituelle.'
    },
    {
      year: '1522-1523',
      title: 'Retraite à Manrèse',
      description: 'Expérience spirituelle profonde qui le marque pour toujours.'
    },
    {
      year: '1534',
      title: 'Fondation de la Compagnie',
      description: 'Avec ses premiers compagnons, il fonde la Compagnie de Jésus.'
    },
    {
      year: '1540',
      title: 'Approbation papale',
      description: 'Le pape Paul III approuve officiellement la Compagnie de Jésus.'
    },
    {
      year: '1556',
      title: 'Mort à Rome',
      description: 'Décès à Rome, laissant un héritage spirituel immense.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <Banner 
        title="Saint Ignace de Loyola"
        subtitle="Fondateur de la Compagnie de Jésus et maître spirituel"
        bgImages={['/img/ignace.jpg']}
        size="lg"
      />

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Une vie de conversion"
            subtitle="Du chevalier au saint"
            align="center"
          />
          
          <div className="max-w-4xl mx-auto mt-8 text-crec-darkgray space-y-6">
            <p>
              Né en 1491 à Loyola, dans le Pays basque espagnol, Ignace de Loyola a d'abord été un chevalier au service du vice-roi de Navarre. Sa vie bascule en 1521 lorsqu'il est gravement blessé lors de la bataille de Pampelune. Pendant sa convalescence, il découvre la vie des saints et commence sa conversion spirituelle.
            </p>
            <p>
              Cette expérience le mène à une profonde transformation intérieure, qui culmine avec la fondation de la Compagnie de Jésus en 1540. Son héritage spirituel, notamment à travers les Exercices Spirituels, continue d'inspirer des millions de personnes à travers le monde.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-crec-offwhite">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Les moments clés"
            subtitle="Le parcours d'Ignace de Loyola"
            align="center"
          />
          
          <div className="max-w-4xl mx-auto mt-12">
            <div className="relative">
              {/* Ligne verticale */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-crec-gold"></div>
              
              {/* Événements */}
              {lifeEvents.map((event, index) => (
                <div key={event.year} className={`relative mb-12 ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'} w-1/2`}>
                  <div className={`p-6 bg-white rounded-lg shadow-md ${index % 2 === 0 ? 'ml-8' : 'mr-8'}`}>
                    <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-crec-gold rounded-full border-4 border-white"></div>
                    <h3 className="text-2xl font-bold text-crec-gold mb-2">{event.year}</h3>
                    <h4 className="text-xl font-semibold text-crec-darkblue mb-2">{event.title}</h4>
                    <p className="text-crec-darkgray">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Spiritualité */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Son héritage spirituel"
            subtitle="Les Exercices Spirituels et la spiritualité ignatienne"
            align="center"
          />
          
          <div className="max-w-4xl mx-auto mt-8 text-crec-darkgray space-y-6">
            <p>
              Les Exercices Spirituels, écrits par Ignace de Loyola, sont au cœur de la spiritualité jésuite. Cette méthode de prière et de discernement guide les personnes dans leur relation avec Dieu et dans leurs choix de vie.
            </p>
            <p>
              La spiritualité ignatienne se caractérise par :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>La recherche de Dieu en toutes choses</li>
              <li>Le discernement des esprits</li>
              <li>L'engagement pour la justice</li>
              <li>La formation intégrale de la personne</li>
              <li>Le service de la foi et la promotion de la justice</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-crec-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Découvrez la spiritualité ignatienne</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Les Exercices Spirituels continuent d'inspirer et de guider des millions de personnes dans leur cheminement spirituel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-crec-gold hover:bg-crec-lightgold text-white px-8 py-6 text-lg"
              asChild
            >
              <Link to="/spirituality">En savoir plus</Link>
            </Button>
            <Button 
              variant="outline"
              className="border-white text-white hover:bg-white/20 px-8 py-6 text-lg"
              asChild
            >
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IgnacePage; 