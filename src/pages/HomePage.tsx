import React from 'react';
import Banner from '@/components/common/Banner';
import SectionTitle from '@/components/common/SectionTitle';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Leaf, Gavel, Users } from 'lucide-react';


const HomePage = () => {
  const { t } = useLanguage();

  // Données pour les formations
  const courses = [
    {
      id: 1,
      title: 'Université ISTMR',
      description: 'Nous formons une nouvelle génération de professionnels du numérique, compétents et responsables. À travers l\'ISTMR, nous proposons des formations universitaires de haut niveau en développement de logiciels, en création d\'applications web et mobiles, et en science des données — pour accompagner les mutations technologiques de notre continent.',
      image: '/img/universite.png',
      link: '/formations/University'
    },
    {
      id: 2,
      title: 'Formations ouvertes',
      description: 'Nous croyons que l\'éducation ne doit exclure personne. C\'est pourquoi nous proposons des formations ouvertes à tous : cours d\'anglais, initiation à l\'informatique, et accompagnement scolaire. Que vous soyez en reconversion, sans diplôme ou simplement en quête de savoir, nous vous accompagnons avec des outils concrets et certifiants, adaptés à votre rythme et à vos besoins.',
      image: '/img/formation.png',
      link: '/formations/Formations'
    },
    {
      id: 3,
      title: 'Fablab',
      description: 'Nous mettons à votre disposition des espaces d\'expérimentation concrets pour inventer, construire et apprendre autrement. Nos ateliers Fablab sont ouverts aux étudiants, passionnés et professionnels désireux de prototyper des idées, de manipuler des technologies, et d\'innover au service de leur communauté.Nos épiquements sont à votre disposition pour réaliser des projets incroyables.',
      image: '/img/fablab.png',
      link: '/formations/Programs'
    }
  ];

  // Données pour les actualités et événements
  const events = [
    {
      id: 1,
      title: 'Colloque International: Éducation et Spiritualité',
      date: '10-12 juin 2024',
      image: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23',
      link: '/events/1'
    },
    {
      id: 2,
      title: 'Séminaire: Écologie et Responsabilité Chrétienne',
      date: '24 mai 2024',
      image: 'https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151',
      link: '/events/2'
    }
  ];

  // Données pour les partenaires
  const partners = [
    { name: "Institut de Recherche et de Formation en Informatique (IFRI)", logo: "https://ifri-uac.bj/=Logo+1" },
    { name: "Fondation Éducative", logo: "https://via.placeholder.com/150x80?text=Logo+2" },
    { name: "Association Écologique", logo: "https://via.placeholder.com/150x80?text=Logo+3" },
    { name: "Institut de Recherche", logo: "https://via.placeholder.com/150x80?text=Logo+4" }
  ];
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <Banner 
        title="Centre de Recherche, d'Étude et de Créativité"
        subtitle="Formation, Recherche et Accompagnement pour une éducation intégrale fondée sur des valeurs chrétiennes."
        bgImages={[
          'https://images.unsplash.com/photo-1551038247-3d9af20df552',
          'https://images.unsplash.com/photo-1551218808-94e220e084d2',
          'https://images.unsplash.com/photo-1551183053-bf91a1d81141'
        ]}
        ctaText="Découvrir nos formations"
        ctaLink="#formations"
        size="lg"
      />

      {/* À propos section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle 
                title="Bienvenue au CREC"
                subtitle="Une institution engagée dans la formation intégrale de la personne."
              />
              <p className="mb-6 text-crec-darkgray">
              ✝️ Les Jésuites et le CREC<br/>
Depuis sa fondation , la Compagnie de Jésus s'est engagée dans l'éducation à travers le
 monde avec une pédagogie rigoureuse et humaniste. Cet engagement a donné 
 naissance à de nombreuses institutions académiques d'excellence.

C'est dans cette 
tradition que le CREC (Centre de Recherche d'Étude et de Créativité) a été fondé
 au Bénin en 2012. Il incarne la mission éducative, sociale et spirituelle des Jésuites à travers des actions concrètes :<br/>

-🔎 Recherche & Innovation<br/>

-🎓 Formation  universitaire  et ouverte,& Accompagnement<br/>

-🌍 Gouvernance éthique & écologie intégrale<br/>

 </p>
              <Button asChild variant="outline" className="border-crec-gold text-crec-darkblue hover:bg-crec-gold hover:text-white">
                <Link to="/about">En savoir plus sur nous</Link>
              </Button>
            </div>
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                src='/img/eglise.png'
                  alt="Église Jésuite" 
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="absolute bottom-6 right-6 bg-crec-gold p-4 rounded-lg shadow-lg w-40 h-40 flex items-center justify-center">
                <p className="text-white text-center font-bold">
                  <span className="block text-3xl">25</span>
                  <span className="block text-sm mt-1">ans d'excellence</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

   {/* Formations section */}
<section className="py-16 bg-white">
  <div className="max-w-[100vw] px-4 sm:px-8 lg:px-16 xl:px-24 mx-auto">
    <SectionTitle 
      title=" 🎓 Nos formations"
      subtitle='Une communauté qui pense à la culture intellectuelle humaine'
      align="center"
    />

    <p className="text-crec-darkgray text-lg text-justify leading-relaxed max-w-7xl mx-auto mt-6 mb-12">
      Le Centre de Recherche, d'Étude et de Créativité (CREC) est une œuvre éducative jésuite basée à Godomey, engagée dans la formation d'hommes et de femmes compétents, responsables et ouverts à l'innovation.
      Le CREC propose plusieurs types de formations accessibles à différents profils, allant des programmes universitaires à des ateliers pratiques et inclusifs.
    </p>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course) => (
        <Card
          key={course.id}
          title={course.title}
          description={course.description}
          image={course.image}
          link={course.link}
        />
      ))}
    </div>
  </div>
</section>


      {/* Écologie section */}
      <section className="py-16 bg-crec-offwhite">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-crec-lightgold p-3 rounded-full">
              <Leaf className="h-6 w-6 text-crec-darkblue" />
            </div>
          </div>
          <SectionTitle 
            title="Écologie"
            subtitle="S'engager pour la sauvegarde de notre maison commune"
            align="center"
          />
          
          <div className="grid md:grid-cols-2 gap-12 items-center mt-10">
            <div className="order-2 md:order-1">
              <h3 className="text-xl font-bold mb-4 text-crec-darkblue">Une conscience écologique</h3>
              <p className="mb-4 text-crec-darkgray">
                Le CREC s'engage dans la réflexion et l'action pour la protection de notre environnement.
                Nous développons des programmes qui intègrent les principes de l'écologie intégrale,
                inspirés par l'encyclique Laudato Si', pour former des citoyens conscients et responsables.
              </p>
              <p className="mb-6 text-crec-darkgray">
                À travers des formations, des ateliers et des projets collaboratifs,
                nous encourageons chacun à devenir acteur du changement pour un monde plus durable et solidaire.
              </p>
              <Button asChild variant="outline" className="border-crec-gold text-crec-darkblue hover:bg-crec-gold hover:text-white">
                <Link to="/formations/ecology">Découvrir nos initiatives</Link>
              </Button>
            </div>
            <div className="order-1 md:order-2">
              <img 
                  src="/img/ecologie.png"
                alt="Écologie intégrale" 
                className="rounded-lg shadow-lg w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gouvernance section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-crec-lightgold p-3 rounded-full">
              <Gavel className="h-6 w-6 text-crec-darkblue" />
            </div>
          </div>
          <SectionTitle 
            title="Gouvernance"
            subtitle="Une éthique responsable dans la gestion des organisations"
            align="center"
          />
          
          <div className="grid md:grid-cols-2 gap-12 items-center mt-10">
            <div>
              <img 
                src="/img/gouvernement.png" 
                alt="Gouvernance éthique" 
                className="rounded-lg shadow-lg w-full h-80 object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-crec-darkblue">Éthique et leadership</h3>
              <p className="mb-4 text-crec-darkgray">
                Le CREC développe des programmes de formation sur la gouvernance éthique des organisations
                et la participation citoyenne, essentiels pour construire une société juste et inclusive.
              </p>
              <p className="mb-6 text-crec-darkgray">
                Nous formons des leaders capables d'allier performance et responsabilité, 
                en intégrant les dimensions économiques, sociales, environnementales et spirituelles 
                dans leur prise de décision.
              </p>
              <Button asChild variant="outline" className="border-crec-gold text-crec-darkblue hover:bg-crec-gold hover:text-white">
                <Link to="/formations/governance">En savoir plus</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Actualités & Événements section combinée */}
      <section className="py-16 bg-crec-offwhite">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Actualités & Événements"
            subtitle="Restez informés des dernières nouvelles et des événements à venir au CREC."
            align="center"
          />
          
          <div className="grid md:grid-cols-2 gap-8">
            {events.map((event) => (
              <Card
                key={event.id}
                title={event.title}
                description={event.date}
                image={event.image}
                link={event.link}
                linkText="Plus de détails"
              />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild variant="outline" className="border-crec-gold text-crec-darkblue hover:bg-crec-gold hover:text-white">
              <Link to="/events">Tous les événements</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Dons & Partenaires section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Dons & Partenaires"
            subtitle="Soutenez notre mission et découvrez ceux qui nous accompagnent"
            align="center"
          />
          
          <div className="flex flex-col items-center justify-center mb-12">
            <p className="mb-6 text-center max-w-2xl text-crec-darkgray">
              Votre soutien nous permet de développer des projets éducatifs de qualité 
              et de rendre nos formations accessibles au plus grand nombre.
            </p>
            <Button asChild variant="default" className="bg-crec-gold hover:bg-crec-lightgold text-white px-8 py-3 text-lg">
              <Link to="/donate">Faire un don</Link>
            </Button>
          </div>
          
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6 text-center text-crec-darkblue">Nos partenaires</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center">
              {partners.map((partner, index) => (
                <div key={index} className="p-4 grayscale hover:grayscale-0 transition-all">
                  <img src={partner.logo} alt={partner.name} className="h-20 object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

  

      {/* CTA section */}
      <Banner 
        title="Rejoignez notre communauté éducative"
        subtitle="Devenez acteur d'une éducation transformatrice fondée sur des valeurs."
        bgImages={[ "/img/com.png"]}
        ctaText="Postuler"
        ctaLink="/formations/admission"
        size="md"
      >
        <div className="flex gap-4 justify-center mt-4">
          <Button asChild variant="secondary" className="bg-white text-crec-darkblue hover:bg-crec-gray">
            <Link to="/contact">Nous contacter</Link>
          </Button>
        </div>
      </Banner>
    </div>
  );
};

export default HomePage;