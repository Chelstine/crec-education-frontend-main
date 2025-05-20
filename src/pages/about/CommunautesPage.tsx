import React from 'react';
import Banner from '@/components/common/Banner';
import SectionTitle from '@/components/common/SectionTitle';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin, Users, Book, Heart } from 'lucide-react';

const CommunautesPage = () => {
  const communautes = [
    {
      id: 1,
      name: 'Communauté du CREC',
      location: 'Cotonou, Bénin',
      description: 'Centre de recherche et de formation, cœur de notre mission éducative.',
      icon: Book,
      image: '/img/communautes/crec.jpg'
    },
    {
      id: 2,
      name: 'Communauté de Parakou',
      location: 'Parakou, Bénin',
      description: 'Engagée dans le service pastoral et l\'accompagnement spirituel.',
      icon: Heart,
      image: '/img/communautes/parakou.jpg'
    },
    {
      id: 3,
      name: 'Communauté de Porto-Novo',
      location: 'Porto-Novo, Bénin',
      description: 'Centre de formation et d\'accompagnement des jeunes.',
      icon: Users,
      image: '/img/communautes/porto-novo.jpg'
    },
    {
      id: 4,
      name: 'Communauté de Lomé',
      location: 'Lomé, Togo',
      description: 'Service pastoral et engagement social dans la capitale togolaise.',
      icon: MapPin,
      image: '/img/communautes/lome.jpg'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <Banner 
        title="Nos communautés"
        subtitle="Des lieux de vie et de mission à travers l'Afrique de l'Ouest"
        bgImages={['/img/communautes-banner.jpg']}
        size="lg"
      />

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Nos maisons"
            subtitle="Des lieux de vie et de mission"
            align="center"
          />
          
          <div className="max-w-4xl mx-auto mt-8 text-crec-darkgray space-y-6">
            <p>
              Les communautés jésuites sont des lieux de vie fraternelle où les jésuites partagent leur quotidien, leur prière et leur mission. Chaque communauté a sa spécificité et son charisme propre, tout en participant à la mission commune de la Compagnie de Jésus.
            </p>
            <p>
              Ces communautés sont réparties à travers l'Afrique de l'Ouest, au service de l'Église et de la société, dans des domaines variés : éducation, formation, accompagnement spirituel, engagement social, etc.
            </p>
          </div>
        </div>
      </section>

      {/* Communautés */}
      <section className="py-16 bg-crec-offwhite">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Nos communautés"
            subtitle="Des lieux de vie et de mission"
            align="center"
          />
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {communautes.map((communaute) => (
              <Card
                key={communaute.id}
                title={communaute.name}
                subtitle={communaute.location}
                description={communaute.description}
                image={communaute.image}
                className="hover:shadow-lg transition-shadow"
              >
                <communaute.icon className="w-12 h-12 text-crec-gold mb-4" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vie communautaire */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="La vie communautaire"
            subtitle="Partager, prier, servir"
            align="center"
          />
          
          <div className="max-w-4xl mx-auto mt-8 text-crec-darkgray space-y-6">
            <p>
              La vie communautaire jésuite se caractérise par :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>La prière en commun et personnelle</li>
              <li>Le partage de la vie quotidienne</li>
              <li>Le discernement communautaire</li>
              <li>L'engagement dans la mission</li>
              <li>L'accueil et le service des autres</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-crec-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Rejoignez-nous</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Découvrez la vie communautaire jésuite et notre mission.
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
              <Link to="/about/jesuites">En savoir plus sur les Jésuites</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommunautesPage; 