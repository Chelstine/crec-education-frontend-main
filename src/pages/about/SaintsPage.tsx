import React from 'react';
import Banner from '@/components/common/Banner';
import SectionTitle from '@/components/common/SectionTitle';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SaintsPage = () => {
  const saints = [
    {
      id: 1,
      name: 'Saint Ignace de Loyola',
      title: 'Fondateur de la Compagnie de Jésus',
      description: 'Fondateur de la Compagnie de Jésus et auteur des Exercices Spirituels. Canonisé en 1622.',
      image: '/img/saints/ignace.jpg'
    },
    {
      id: 2,
      name: 'Saint François Xavier',
      title: 'Apôtre des Indes',
      description: 'Missionnaire en Asie, il a évangélisé l\'Inde, le Japon et d\'autres pays d\'Asie. Canonisé en 1622.',
      image: '/img/saints/francois-xavier.jpg'
    },
    {
      id: 3,
      name: 'Saint Pierre Canisius',
      title: 'Docteur de l\'Église',
      description: 'Théologien et éducateur, il a joué un rôle majeur dans la Contre-Réforme. Canonisé en 1925.',
      image: '/img/saints/pierre-canisius.jpg'
    },
    {
      id: 4,
      name: 'Saint Jean de Brébeuf',
      title: 'Martyr du Canada',
      description: 'Missionnaire au Canada, il a été martyrisé par les Iroquois en 1649. Canonisé en 1930.',
      image: '/img/saints/jean-brebeuf.jpg'
    }
  ];

  const bienheureux = [
    {
      id: 1,
      name: 'Bienheureux Pierre Favre',
      title: 'Premier compagnon d\'Ignace',
      description: 'Premier prêtre de la Compagnie de Jésus, il a joué un rôle important dans la formation des premiers jésuites.',
      image: '/img/saints/pierre-favre.jpg'
    },
    {
      id: 2,
      name: 'Bienheureux Rupert Mayer',
      title: 'Apôtre de Munich',
      description: 'Prêtre et résistant au nazisme, il a défendu les droits des pauvres et des opprimés.',
      image: '/img/saints/rupert-mayer.jpg'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <Banner 
        title="Saints et Bienheureux"
        subtitle="Les figures emblématiques de la Compagnie de Jésus"
        bgImages={['/img/saints-banner.jpg']}
        size="lg"
      />

      {/* Saints */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Les Saints de la Compagnie"
            subtitle="Des modèles de foi et de service"
            align="center"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {saints.map((saint) => (
              <Card
                key={saint.id}
                title={saint.name}
                subtitle={saint.title}
                description={saint.description}
                image={saint.image}
                className="hover:shadow-lg transition-shadow"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bienheureux */}
      <section className="py-16 bg-crec-offwhite">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Les Bienheureux"
            subtitle="Des témoins de la foi en attente de canonisation"
            align="center"
          />
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {bienheureux.map((bienheureux) => (
              <Card
                key={bienheureux.id}
                title={bienheureux.name}
                subtitle={bienheureux.title}
                description={bienheureux.description}
                image={bienheureux.image}
                className="hover:shadow-lg transition-shadow"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Message */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Un héritage vivant"
            subtitle="L'inspiration des saints pour aujourd'hui"
            align="center"
          />
          
          <div className="max-w-4xl mx-auto mt-8 text-crec-darkgray space-y-6">
            <p>
              Les saints et bienheureux de la Compagnie de Jésus nous montrent comment vivre pleinement notre foi dans le monde d'aujourd'hui. Leur exemple nous inspire à :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Servir Dieu et les autres avec générosité</li>
              <li>Chercher la justice et la vérité</li>
              <li>Accompagner les personnes dans leur cheminement spirituel</li>
              <li>Répondre aux défis de notre temps avec courage et créativité</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-crec-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Découvrez notre spiritualité</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            La spiritualité ignatienne continue d'inspirer des millions de personnes à travers le monde.
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

export default SaintsPage; 