import React from 'react';
import { motion } from 'framer-motion';
import Banner from '@/components/common/Banner';
import SectionTitle from '@/components/common/SectionTitle';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { useMultipleContent } from '@/services/contentService';
import { Leaf, Gavel, Users, ExternalLink } from 'lucide-react';


const HomePage = () => {
  const { t } = useLanguage();

  // Récupérer le contenu géré par l'admin
  const content = useMultipleContent([
    'home_hero_title',
    'home_hero_subtitle', 
    'home_hero_description',
    'home_formations_title',
    'home_formations_subtitle',
    'home_formations_description',
    'home_university_title',
    'home_university_description',
    'home_open_formations_title',
    'home_open_formations_description',
    'home_fablab_title',
    'home_fablab_description',
    'home_partners_title',
    'home_partners_subtitle',
    'home_stats_experience_number',
    'home_stats_experience_text'
  ]);

  // Données pour les formations - utilise le contenu géré
  const courses = [
    {
      id: 1,
      title: content.home_university_title,
      description: content.home_university_description,
      image: '/img/crec3.jpg',
      link: '/formations/university'
    },
    {
      id: 2,
      title: content.home_open_formations_title,
      description: content.home_open_formations_description,
      image: '/img/formation.png',
      link: '/formations/ouvertes'
    },
    {
      id: 3,
      title: content.home_fablab_title,
      description: content.home_fablab_description,
      image: '/img/fablab.png',
      link: '/formations/fablab'
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
    { 
      name: "IFRI", 
      logo: "/img/ifri-logo.png",
      link: "https://ifri-uac.bj/",
      description: "Institut de Formation et de Recherche en Informatique"
    },
    { 
      name: "PJAO", 
      logo: "/img/pjao.png",
      link: "https://pjao.org/",
      description: "Province Jésuite de l'Afrique de l'Ouest"
    },
    { 
      name: "FAO", 
      logo: "/img/fao.png",
      link: "https://www.fao.org/",
      description: "Organisation des Nations Unies pour l'alimentation et l'agriculture"
    }
  ];
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <Banner 
        title="Centre de Recherche, d'Étude et de Créativité"
        subtitle="Formation, Recherche et Accompagnement pour une éducation intégrale fondée sur des valeurs chrétiennes."
        bgImages={[
          '/img/crec1.jpg',
          '/img/crec2.png',
          '/img/crec3.jpg'
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
                src='/img/crec2.png'
                  alt="Église Jésuite" 
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="absolute bottom-6 right-6 bg-crec-gold p-4 rounded-lg shadow-lg w-40 h-40 flex items-center justify-center">
                <p className="text-white text-center font-bold">
                  <span className="block text-3xl">{content.home_stats_experience_number}</span>
                  <span className="block text-sm mt-1">{content.home_stats_experience_text}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

   {/* Formations section */}
<section className="py-8 md:py-16 bg-white" id="formations">
  <div className="max-w-[100vw] px-4 sm:px-6 lg:px-8 xl:px-16 mx-auto">
    <SectionTitle 
      title={content.home_formations_title}
      subtitle={content.home_formations_subtitle}
      align="center"
    />

    <p className="text-crec-darkgray text-base md:text-lg text-justify leading-relaxed max-w-4xl mx-auto mt-4 md:mt-6 mb-8 md:mb-12">
      {content.home_formations_description}
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
      {courses.map((course) => (
        <Link 
          to={course.link}
          key={course.id} 
          className="group flex flex-col h-full hover:no-underline"
        >
          <div className="flex-1 overflow-hidden rounded-t-xl relative">
            <img 
              src={course.image} 
              alt={course.title}
              className="w-full h-48 md:h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-70"></div>
            <h3 className="absolute bottom-0 left-0 text-white text-lg md:text-2xl font-bold p-4 md:p-6">
              {course.title}
            </h3>
          </div>
          <div className="bg-white p-4 md:p-6 border border-gray-100 rounded-b-xl shadow-sm flex-1 flex flex-col">
            <p className="text-crec-darkgray text-sm md:text-base mb-4 md:mb-6 flex-1">
              {course.description.length > 120 
                ? course.description.substring(0, 120) + '...' 
                : course.description}
            </p>
            <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-100">
              <span className="font-medium text-crec-darkblue">En savoir plus</span>
              <div className="w-10 h-10 rounded-full bg-crec-lightgold flex items-center justify-center transform group-hover:bg-crec-gold group-hover:translate-x-1 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-crec-darkblue"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </div>
            </div>
          </div>
        </Link>
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
                <Link to="/events">Suivre nos événements</Link>
              </Button>
            </div>
            <div className="order-1 md:order-2">
              <img 
                  src="/img/ecologie.png"
                alt="Écologie intégrale" 
                className="rounded-lg shadow-lg w-full h-96 object-cover"
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
                <Link to="/events">Suivre nos événements</Link>
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4 text-center text-crec-darkblue">Nos partenaires</h3>
              <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                Le CREC collabore avec des institutions de renom pour enrichir ses programmes et offrir les meilleures opportunités à ses étudiants.
              </p>
            </motion.div>
            
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {partners.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center group"
                >
                  {partner.link && partner.link !== "#" ? (
                    <a 
                      href={partner.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex flex-col items-center transition-transform duration-300 hover:scale-105"
                      title={partner.description}
                    >
                      <img 
                        src={partner.logo} 
                        alt={partner.name} 
                        className="h-12 w-auto object-contain transition-opacity duration-300 hover:opacity-80"
                      />
                      <span className="text-xs text-gray-600 mt-2 text-center font-medium">
                        {partner.name}
                      </span>
                    </a>
                  ) : (
                    <div className="flex flex-col items-center" title={partner.description}>
                      <img 
                        src={partner.logo} 
                        alt={partner.name} 
                        className="h-12 w-auto object-contain"
                      />
                      <span className="text-xs text-gray-600 mt-2 text-center font-medium">
                        {partner.name}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            
            {/* Statistiques partenariats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-12 bg-gradient-to-r from-crec-light/30 to-crec-gold/20 rounded-2xl p-8"
            >

            </motion.div>
          </div>
        </div>
      </section>

  

      {/* CTA section */}
      <Banner 
        title="Rejoignez notre communauté éducative"
        subtitle="Devenez acteur d'une éducation transformatrice fondée sur des valeurs."
        bgImages={[ "/img/com.png"]}
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