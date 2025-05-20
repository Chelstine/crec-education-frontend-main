import React from 'react';
import Banner from '@/components/common/Banner';
import SectionTitle from '@/components/common/SectionTitle';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HistoryPage = () => {
  const timeline = [
    {
      year: '2012',
      title: 'Fondation du CREC',
      description: 'Création du Centre de Recherche d\'Étude et de Créativité par la Compagnie de Jésus au Bénin.'
    },
    {
      year: '2014',
      title: 'Premiers programmes',
      description: 'Lancement des premiers programmes de formation et de recherche.'
    },
    {
      year: '2016',
      title: 'Expansion',
      description: 'Développement des partenariats internationaux et élargissement des activités.'
    },
    {
      year: '2018',
      title: 'Innovation',
      description: 'Création du FABLAB et lancement des programmes d\'innovation technologique.'
    },
    {
      year: '2020',
      title: 'Adaptation',
      description: 'Mise en place des programmes en ligne et adaptation aux défis de la pandémie.'
    },
    {
      year: '2022',
      title: 'Dixième anniversaire',
      description: 'Célébration des 10 ans d\'excellence et de service.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <Banner 
        title="Notre Histoire"
        subtitle="Une décennie d'excellence et d'engagement au service de la formation et de la recherche"
        bgImages={['/img/history.jpg']}
        size="lg"
      />

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Une histoire riche"
            subtitle="De la fondation à aujourd'hui"
            align="center"
          />
          
          <div className="max-w-4xl mx-auto mt-8 text-crec-darkgray space-y-6">
            <p>
              Le CREC a été fondé en 2012 par la Compagnie de Jésus au Bénin, dans la continuité de la tradition éducative jésuite. Depuis sa création, le centre s'est engagé dans la formation intégrale de la personne, la recherche innovante et le service à la société.
            </p>
            <p>
              Au fil des années, le CREC a développé une expertise reconnue dans plusieurs domaines, notamment l'éducation, la recherche, l'innovation technologique et le développement durable.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-crec-offwhite">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Notre parcours"
            subtitle="Les moments clés de notre histoire"
            align="center"
          />
          
          <div className="max-w-4xl mx-auto mt-12">
            <div className="relative">
              {/* Ligne verticale */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-crec-gold"></div>
              
              {/* Événements */}
              {timeline.map((event, index) => (
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

      {/* Vision future */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Notre vision pour l'avenir"
            subtitle="Continuer à servir et innover"
            align="center"
          />
          
          <div className="max-w-4xl mx-auto mt-8 text-crec-darkgray space-y-6">
            <p>
              Fort de notre expérience et de notre engagement, nous continuons à développer de nouveaux programmes et initiatives pour répondre aux défis contemporains. Notre objectif est de former des leaders compétents et engagés, capables de contribuer au développement de la société.
            </p>
            <p>
              Nous nous engageons à maintenir notre excellence académique tout en renforçant notre impact social et notre contribution au développement durable.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-crec-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Rejoignez notre histoire</h2>
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

export default HistoryPage; 