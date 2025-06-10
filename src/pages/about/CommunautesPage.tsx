import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Users, Book, Heart, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const CommunautesPage = () => {
  const communautes = [
    {
      id: 1,
      name: 'Communauté du CREC',
      location: 'Cotonou, Bénin',
      description: 'Centre de recherche et de formation, le CREC forme des leaders chrétiens et soutient la recherche théologique en Afrique de l’Ouest.',
      icon: Book,
      image: '/img/communautes/crec.jpg'
    },
    {
      id: 2,
      name: 'Communauté de Parakou',
      location: 'Parakou, Bénin',
      description: 'Engagée dans le service pastoral, l’accompagnement spirituel et des projets sociaux pour les communautés rurales.',
      icon: Heart,
      image: '/img/communautes/parakou.jpg'
    },
    {
      id: 3,
      name: 'Communauté de Porto-Novo',
      location: 'Porto-Novo, Bénin',
      description: 'Centre dédié à la formation des jeunes et à l’animation de retraites ignatiennes pour les laïcs et les religieux.',
      icon: Users,
      image: '/img/communautes/porto-novo.jpg'
    },
    {
      id: 4,
      name: 'Communauté de Lomé',
      location: 'Lomé, Togo',
      description: 'Active dans le service pastoral, l’éducation et l’engagement social, notamment auprès des plus démunis dans la capitale togolaise.',
      icon: MapPin,
      image: '/img/communautes/lome.jpg'
    },
    {
      id: 5,
      name: 'Communauté d’Abidjan',
      location: 'Abidjan, Côte d’Ivoire',
      description: 'Siège de l’Institut de Théologie de la Compagnie de Jésus (ITCJ), formant prêtres et laïcs pour le ministère en Afrique.',
      icon: Book,
      image: '/img/communautes/abidjan.jpg'
    }
  ];

  const missions = [
    {
      icon: Book,
      title: 'Éducation',
      description: 'Gestion d’écoles, collèges et centres de formation, comme le CREC et l’ITCJ, pour une éducation intégrale.'
    },
    {
      icon: Heart,
      title: 'Accompagnement Spirituel',
      description: 'Animation de retraites ignatiennes et guidance spirituelle pour des milliers de personnes chaque année.'
    },
    {
      icon: Leaf,
      title: 'Engagement Écologique',
      description: 'Projets de sensibilisation et de reforestation, inspirés par Laudato Si’, pour protéger l’environnement.'
    },
    {
      icon: Users,
      title: 'Justice Sociale',
      description: 'Soutien aux marginalisés via des initiatives comme le Jesuit Refugee Service et des programmes communautaires.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-[15pt]">
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
        <div
          className="min-h-[400px] flex flex-col items-center justify-center text-center relative text-white p-6"
          style={{
            backgroundImage: "url('/img/a-propos.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="max-w-3xl mx-auto bg-black/50 p-8 rounded-lg backdrop-blur-sm">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos Communautés</h1>
            <p className="text-xl md:text-2xl mb-8">
              Des lieux de vie fraternelle et de mission au cœur de l’Afrique de l’Ouest, au service de la foi et de la justice.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-white text-slate-800 px-4">
        <div className="max-w-4xl mx-auto space-y-12 text-justify">
          <motion.h2
            className="text-4xl font-bold text-center mb-4 text-amber-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Nos Maisons
          </motion.h2>
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              `Les communautés jésuites de la Province d’Afrique de l’Ouest sont des foyers de vie fraternelle où les jésuites vivent, prient et servent ensemble. Présentes dans des pays comme le Bénin, le Togo et la Côte d’Ivoire, elles incarnent la spiritualité ignatienne dans des contextes variés.`,
              `Chaque communauté a une mission unique, allant de l’éducation (CREC à Cotonou, ITCJ à Abidjan) à l’accompagnement spirituel et à l’engagement social. En 2022, ces communautés soutiennent des milliers de personnes à travers des retraites, des écoles et des projets sociaux.`,
              `Guidées par la devise <em>Ad majorem Dei gloriam</em>, elles travaillent en réseau avec la Famille ignatienne pour répondre aux défis contemporains, comme l’éducation des jeunes, la justice sociale et la sauvegarde de la création.`
            ].map((text, index) => (
              <p
                key={index}
                className="relative pl-6 before:absolute before:left-0 before:top-1 before:w-1 before:h-full before:bg-amber-500 before:rounded-full"
              >
                <span dangerouslySetInnerHTML={{ __html: text }} />
              </p>
            ))}
          </motion.div>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-8 py-3 shadow-md transition-transform transform hover:scale-105"
              asChild
            >
              <a href="https://www.jesuits.global" target="_blank" rel="noopener noreferrer">
                En savoir plus sur la Compagnie de Jésus
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Transition graphique + citation */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg className="relative block w-full h-16 text-amber-50" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path
              fill="currentColor"
              d="M0,64L48,74.7C96,85,192,107,288,117.3C384,128,480,128,576,144C672,160,768,192,864,186.7C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128V0H1392C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0H0Z"
            />
          </svg>
        </div>
        <div className="bg-amber-50 py-8 text-center relative z-10">
          <p className="text-xl italic text-amber-800">
            "Vivre en communauté, c’est prier et servir ensemble."
          </p>
        </div>
      </div>

      {/* Communautés */}
      <section className="py-20 bg-jesuit-light">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center text-jesuit-dark"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Nos Communautés
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {communautes.map((communaute) => (
              <Card
                key={communaute.id}
                className="hover:shadow-xl transition-shadow duration-300 rounded-xl bg-white"
              >
                <CardContent className="p-4 flex flex-col items-center">
                  <div className="w-full h-64 bg-white flex items-center justify-center overflow-hidden rounded-lg mb-4 shadow-sm">
                    <img
                      src={communaute.image}
                      alt={communaute.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">{communaute.name}</h3>
                  <p className="text-jesuit-darkgray text-base leading-relaxed text-center">{communaute.location}</p>
                  <p className="text-jesuit-darkgray text-base leading-relaxed text-justify">{communaute.description}</p>
                  <communaute.icon className="w-8 h-8 text-jesuit-gold mt-4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Missions */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center text-jesuit-dark"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Nos Missions
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {missions.map((mission, i) => (
              <Card key={i} className="hover:shadow-lg">
                <CardContent className="p-4 flex items-start">
                  <mission.icon className="w-12 h-12 text-jesuit-gold mr-4" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">{mission.title}</h3>
                    <p className="text-jesuit-darkgray text-base leading-relaxed">{mission.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Local */}
      <section className="py-20 bg-jesuit-light">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center text-jesuit-dark"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Impact Local
          </motion.h2>
          <motion.div
            className="space-y-8 text-jesuit-darkgray text-justify"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="bg-white/80 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300 backdrop-blur-sm">
              La communauté du CREC à Cotonou forme des centaines de leaders chrétiens chaque année, soutenant la recherche théologique et l’éducation des jeunes dans un contexte multiculturel.
            </p>
            <p className="bg-white/80 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300 backdrop-blur-sm">
              À Parakou, les jésuites travaillent avec les communautés rurales pour promouvoir l’agriculture durable et l’accès à l’éducation, en lien avec les initiatives écologiques de la Province.
            </p>
            <p className="bg-white/80 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300 backdrop-blur-sm">
              À Abidjan, l’ITCJ forme des prêtres et laïcs pour le ministère, renforçant l’Église locale à travers des programmes de discernement ignatien et de dialogue interreligieux.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-12 text-center">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold mb-4">Rejoignez Nos Communautés</h2>
          <p className="text-gray-700 mb-6">
            Découvrez la vie communautaire jésuite et participez à notre mission en Afrique de l’Ouest.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              className="bg-[#FCA311] hover:bg-[#fcb930] text-white rounded-full px-6 py-2 shadow-md"
              asChild
            >
              <Link to="/contact">Nous contacter</Link>
            </Button>
            <Button
              className="bg-white border-2 border-[#FCA311] text-[#FCA311] hover:bg-[#FCA311] hover:text-white rounded-full px-6 py-2 transition shadow-md"
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