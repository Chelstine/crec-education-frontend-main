import React from 'react';
import Banner from '@/components/common/Banner';
import SectionTitle from '@/components/common/SectionTitle';
import { Card } from '@/components/common/Card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Book, Users, Heart, Globe } from 'lucide-react';

const AboutPage = () => {
  const aboutSections = [
    {
      title: 'Les Jésuites',
      description: 'Découvrez la Compagnie de Jésus et sa mission.',
      image: '/img/jesuites.jpg',
      link: '/about/jesuites',
      icon: Users
    },
    {
      title: 'Notre Histoire',
      description: 'L\'histoire du CREC et son développement.',
      image: '/img/history.jpg',
      link: '/about/history',
      icon: Book
    },
    {
      title: 'Saint Ignace',
      description: 'Le fondateur de la Compagnie de Jésus.',
      image: '/img/ignace.jpg',
      link: '/about/ignace',
      icon: Heart
    },
    {
      title: 'Saints et Bienheureux',
      description: 'Les figures emblématiques de la Compagnie.',
      image: '/img/saints.jpg',
      link: '/about/saints',
      icon: Globe
    },
    {
      title: 'La Famille ignatienne',
      description: 'Un réseau mondial au service de la mission.',
      image: '/img/famille-ignatienne.jpg',
      link: '/about/famille-ignatienne',
      icon: Users
    },
    {
      title: 'Notre Équipe',
      description: 'Le Provincial et son équipe.',
      image: '/img/equipe.jpg',
      link: '/about/equipe',
      icon: Users
    },
    {
      title: 'Nos Communautés',
      description: 'Les lieux de vie et de mission.',
      image: '/img/communautes.jpg',
      link: '/about/communautes',
      icon: Heart
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <Banner 
        title="À propos du CREC"
        subtitle="Centre de Recherche, d'Étude et de Créativité - Une institution d'excellence au service de l'éducation"
        bgImages={['/img/about-banner.jpg']}
        size="lg"
      />

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Notre Mission" 
            subtitle="Une éducation intégrale au service de la société"
            align="center"
          />
          
          <div className="max-w-4xl mx-auto mt-8 text-crec-darkgray space-y-6">
            <p>
              Le Centre de Recherche, d'Étude et de Créativité (CREC) est une œuvre éducative jésuite basée à Godomey, 
              engagée dans la formation d'hommes et de femmes compétents, responsables et ouverts à l'innovation.
            </p>
            <p>
              Inspiré par la spiritualité ignatienne et les valeurs chrétiennes, le CREC s'engage dans la formation 
              intégrale de la personne, la recherche innovante et le service à la société.
            </p>
          </div>
        </div>
      </section>

      {/* Sections d'exploration */}
      <section className="py-16 bg-crec-offwhite">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Explorez le CREC" 
            subtitle="Découvrez en détail les différentes facettes de notre institution"
            align="center"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {aboutSections.map((section, index) => (
              <Card
                key={index}
                title={section.title}
                description={section.description}
                image={section.image}
                className="hover:shadow-lg transition-shadow"
              >
                <section.icon className="w-12 h-12 text-crec-gold mb-4" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-crec-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Rejoignez notre communauté</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Découvrez nos programmes et devenez partie intégrante de notre mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-crec-gold hover:bg-crec-lightgold text-white px-8 py-6 text-lg"
              asChild
            >
              <Link to="/formations">Découvrir nos formations</Link>
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

export default AboutPage;
