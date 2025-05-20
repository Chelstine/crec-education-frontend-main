import React from 'react';
import Banner from '@/components/common/Banner';
import SectionTitle from '@/components/common/SectionTitle';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Users, Heart, Book, Globe } from 'lucide-react';

const FamilleIgnatiennePage = () => {
  const membres = [
    {
      id: 1,
      title: 'Compagnie de Jésus',
      description: 'Les Jésuites, fondés par saint Ignace de Loyola en 1540, sont au cœur de la Famille ignatienne.',
      icon: Users
    },
    {
      id: 2,
      title: 'Sœurs de la Sainte Famille de Nazareth',
      description: 'Fondées en 1875, elles partagent la spiritualité ignatienne dans leur mission éducative.',
      icon: Heart
    },
    {
      id: 3,
      title: 'Communauté de Vie Chrétienne',
      description: 'Un mouvement laïc international qui vit la spiritualité ignatienne dans le monde.',
      icon: Book
    },
    {
      id: 4,
      title: 'Réseau Ignatien',
      description: 'Un réseau mondial d\'institutions éducatives et sociales inspirées par la spiritualité ignatienne.',
      icon: Globe
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <Banner 
        title="La Famille ignatienne"
        subtitle="Un réseau mondial au service de la mission"
        bgImages={['/img/famille-ignatienne.jpg']}
        size="lg"
      />

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Une grande famille"
            subtitle="Unis par la spiritualité ignatienne"
            align="center"
          />
          
          <div className="max-w-4xl mx-auto mt-8 text-crec-darkgray space-y-6">
            <p>
              La Famille ignatienne rassemble toutes les personnes et communautés qui partagent la spiritualité de saint Ignace de Loyola. Cette grande famille comprend des religieux, des religieuses, des laïcs et des institutions qui, ensemble, cherchent à servir la mission de l'Église dans le monde.
            </p>
            <p>
              Unis par les Exercices Spirituels et la spiritualité ignatienne, les membres de cette famille travaillent dans divers domaines : éducation, justice sociale, accompagnement spirituel, recherche, et bien d'autres.
            </p>
          </div>
        </div>
      </section>

      {/* Membres */}
      <section className="py-16 bg-crec-offwhite">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Les membres de la famille"
            subtitle="Une diversité de vocations et de missions"
            align="center"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {membres.map((membre) => (
              <Card
                key={membre.id}
                title={membre.title}
                description={membre.description}
                className="hover:shadow-lg transition-shadow"
              >
                <membre.icon className="w-12 h-12 text-crec-gold mb-4" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission commune */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Une mission commune"
            subtitle="Servir la foi et promouvoir la justice"
            align="center"
          />
          
          <div className="max-w-4xl mx-auto mt-8 text-crec-darkgray space-y-6">
            <p>
              Malgré la diversité de leurs vocations et de leurs missions, les membres de la Famille ignatienne partagent une vision commune :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Servir la foi et promouvoir la justice</li>
              <li>Accompagner les personnes dans leur cheminement spirituel</li>
              <li>Former des hommes et des femmes pour les autres</li>
              <li>Répondre aux défis contemporains avec créativité</li>
              <li>Travailler en réseau pour un plus grand impact</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Collaboration */}
      <section className="py-16 bg-crec-offwhite">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Travailler ensemble"
            subtitle="La force du réseau ignatien"
            align="center"
          />
          
          <div className="max-w-4xl mx-auto mt-8 text-crec-darkgray space-y-6">
            <p>
              La Famille ignatienne se caractérise par une forte culture de collaboration. Les différentes institutions et communautés travaillent ensemble pour :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Partager les ressources et les compétences</li>
              <li>Développer des projets communs</li>
              <li>Renforcer l'impact de leurs actions</li>
              <li>Apprendre les uns des autres</li>
              <li>Témoigner de l'unité dans la diversité</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-crec-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Rejoignez la Famille ignatienne</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Découvrez comment vous pouvez participer à cette grande mission.
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
              <Link to="/spirituality">Découvrir la spiritualité</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FamilleIgnatiennePage; 