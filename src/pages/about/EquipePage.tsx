import React from 'react';
import Banner from '@/components/common/Banner';
import SectionTitle from '@/components/common/SectionTitle';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const EquipePage = () => {
  const equipe = [
    {
      id: 1,
      name: 'Père Jean Dupont',
      role: 'Provincial',
      description: 'Responsable de la Province jésuite d\'Afrique de l\'Ouest.',
      image: '/img/team/provincial.jpg'
    },
    {
      id: 2,
      name: 'Père Pierre Martin',
      role: 'Vicaire Provincial',
      description: 'Assiste le Provincial dans la gestion de la Province.',
      image: '/img/team/vicaire.jpg'
    },
    {
      id: 3,
      name: 'Père Marie Laurent',
      role: 'Économe Provincial',
      description: 'Gère les ressources financières de la Province.',
      image: '/img/team/econome.jpg'
    },
    {
      id: 4,
      name: 'Père Thomas Bernard',
      role: 'Responsable de la Formation',
      description: 'Coordonne la formation des jeunes jésuites.',
      image: '/img/team/formation.jpg'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <Banner 
        title="Le Provincial et son équipe"
        subtitle="La gouvernance de la Province jésuite d'Afrique de l'Ouest"
        bgImages={['/img/equipe-banner.jpg']}
        size="lg"
      />

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Notre équipe de direction"
            subtitle="Au service de la mission jésuite"
            align="center"
          />
          
          <div className="max-w-4xl mx-auto mt-8 text-crec-darkgray space-y-6">
            <p>
              La Province jésuite d'Afrique de l'Ouest est dirigée par une équipe de jésuites dédiés à la mission de la Compagnie de Jésus. Sous la direction du Père Provincial, cette équipe travaille à coordonner et soutenir les différentes œuvres et communautés de la Province.
            </p>
            <p>
              Chaque membre de l'équipe provinciale apporte son expertise et son expérience pour servir la mission de la Compagnie de Jésus dans la région.
            </p>
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="py-16 bg-crec-offwhite">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Les membres de l'équipe"
            subtitle="Des leaders au service de la mission"
            align="center"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {equipe.map((membre) => (
              <Card
                key={membre.id}
                title={membre.name}
                subtitle={membre.role}
                description={membre.description}
                image={membre.image}
                className="hover:shadow-lg transition-shadow"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Notre mission"
            subtitle="Servir et coordonner"
            align="center"
          />
          
          <div className="max-w-4xl mx-auto mt-8 text-crec-darkgray space-y-6">
            <p>
              L'équipe provinciale a pour mission de :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Coordonner les activités de la Province</li>
              <li>Supporter les communautés et les œuvres jésuites</li>
              <li>Assurer la formation des jeunes jésuites</li>
              <li>Gérer les ressources de la Province</li>
              <li>Maintenir les relations avec les autres provinces et l'Église locale</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-crec-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Contactez-nous</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour répondre à vos questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-crec-gold hover:bg-crec-lightgold text-white px-8 py-6 text-lg"
              asChild
            >
              <Link to="/contact">Nous contacter</Link>
            </Button>
            <Button 
              variant="outline"
              className="border-white text-white hover:bg-white/20 px-8 py-6 text-lg"
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