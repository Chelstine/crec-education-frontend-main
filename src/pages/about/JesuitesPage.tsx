import React from 'react';
import Banner from '@/components/common/Banner';
import SectionTitle from '@/components/common/SectionTitle';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Book, Users, Heart, Globe } from 'lucide-react';

const JesuitesPage = () => {
  const caracteristiques = [
    {
      id: 1,
      title: 'Formation intellectuelle',
      description: 'Un engagement profond dans l\'éducation et la recherche.',
      icon: Book
    },
    {
      id: 2,
      title: 'Vie communautaire',
      description: 'Une vie fraternelle basée sur le partage et la prière.',
      icon: Users
    },
    {
      id: 3,
      title: 'Service des autres',
      description: 'Un engagement au service de la foi et de la justice.',
      icon: Heart
    },
    {
      id: 4,
      title: 'Mission universelle',
      description: 'Une présence dans le monde entier au service de l\'Église.',
      icon: Globe
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <Banner 
        title="Les Jésuites"
        subtitle="La Compagnie de Jésus au service de l'Église et du monde"
        bgImages={['/img/jesuites-banner.jpg']}
        size="lg"
      />

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Qui sont les Jésuites ?"
            subtitle="Une mission de service et d'engagement"
            align="center"
          />
          
          <div className="max-w-4xl mx-auto mt-8 text-crec-darkgray space-y-6">
            <p>
              La Compagnie de Jésus, fondée par saint Ignace de Loyola en 1540, est un ordre religieux catholique masculin. Les Jésuites sont connus pour leur engagement dans l'éducation, la recherche, la justice sociale et l'accompagnement spirituel.
            </p>
            <p>
              Présents dans plus de 100 pays, les Jésuites travaillent à la formation intégrale de la personne, au service de la foi et à la promotion de la justice.
            </p>
          </div>
        </div>
      </section>

      {/* Caractéristiques */}
      <section className="py-16 bg-crec-offwhite">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Nos caractéristiques"
            subtitle="Ce qui nous définit"
            align="center"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {caracteristiques.map((caracteristique) => (
              <Card
                key={caracteristique.id}
                title={caracteristique.title}
                description={caracteristique.description}
                className="hover:shadow-lg transition-shadow"
              >
                <caracteristique.icon className="w-12 h-12 text-crec-gold mb-4" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Notre mission"
            subtitle="Servir la foi et promouvoir la justice"
            align="center"
          />
          
          <div className="max-w-4xl mx-auto mt-8 text-crec-darkgray space-y-6">
            <p>
              La mission des Jésuites se décline en plusieurs dimensions :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>L'éducation et la formation intégrale</li>
              <li>La recherche et l'innovation</li>
              <li>L'accompagnement spirituel</li>
              <li>L'engagement pour la justice sociale</li>
              <li>Le dialogue interreligieux et interculturel</li>
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
              <Link to="/about/ignace">En savoir plus sur Ignace</Link>
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

export default JesuitesPage; 