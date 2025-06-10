import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Book, Heart, Cross, Star, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const SaintsPage = () => {
  const saints = [
    {
      id: 1,
      name: 'Saint Ignace de Loyola',
      title: 'Fondateur de la Compagnie de Jésus',
      description: 'Fondateur de la Compagnie en 1540, auteur des Exercices Spirituels, il guida des générations vers le discernement spirituel (1491-1556). Canonisé en 1622.',
      image: '/img/saints/ignace.jpg'
    },
    {
      id: 2,
      name: 'Saint François Xavier',
      title: 'Apôtre des Indes',
      description: 'Missionnaire en Asie (Inde, Japon, Chine), il baptisa des milliers de personnes et établit des communautés chrétiennes. Canonisé en 1622 (1506-1552).',
      image: '/img/saints/francois-xavier.jpg'
    },
    {
      id: 3,
      name: 'Saint Pierre Canisius',
      title: 'Docteur de l’Église',
      description: 'Théologien et éducateur, il fortifia la foi catholique en Allemagne et en Europe centrale pendant la Contre-Réforme. Canonisé en 1925 (1521-1597).',
      image: '/img/saints/pierre-canisius.jpg'
    },
    {
      id: 4,
      name: 'Saint Jean de Brébeuf',
      title: 'Martyr du Canada',
      description: 'Missionnaire auprès des Hurons, il fut martyrisé en 1649 après avoir traduit la Bible en huron. Canonisé en 1930 (1593-1649).',
      image: '/img/saints/jean-brebeuf.jpg'
    },
    {
      id: 5,
      name: 'Saint Robert Bellarmin',
      title: 'Docteur de l’Église',
      description: 'Théologien et cardinal, il défendit la foi catholique avec rigueur intellectuelle pendant la Réforme. Canonisé en 1930 (1542-1621).',
      image: '/img/saints/robert-bellarmin.jpg'
    }
  ];

  const bienheureux = [
    {
      id: 1,
      name: 'Bienheureux Pierre Favre',
      title: 'Premier compagnon d’Ignace',
      description: 'Cofondateur de la Compagnie, il fut un maître du dialogue spirituel et de la douceur. Béatifié en 1872 (1506-1546).',
      image: '/img/saints/pierre-favre.jpg'
    },
    {
      id: 2,
      name: 'Bienheureux Rupert Mayer',
      title: 'Apôtre de Munich',
      description: 'Prêtre résistant au nazisme, il défendit les pauvres et s’opposa à l’injustice. Béatifié en 1987 (1876-1945).',
      image: '/img/saints/rupert-mayer.jpg'
    },
    {
      id: 3,
      name: 'Bienheureux Miguel Pro',
      title: 'Martyr du Mexique',
      description: 'Prêtre exécuté en 1927 pour sa foi sous la persécution anticatholique au Mexique. Béatifié en 1988 (1891-1927).',
      image: '/img/saints/miguel-pro.jpg'
    }
  ];

  const contributions = [
    {
      icon: Book,
      title: 'Éducation',
      description: 'Les saints jésuites, comme Pierre Canisius, ont fondé des collèges et universités, formant des générations de leaders.'
    },
    {
      icon: Globe,
      title: 'Missions',
      description: 'François Xavier et Jean de Brébeuf ont évangélisé des continents, s’adaptant aux cultures locales avec respect.'
    },
    {
      icon: Heart,
      title: 'Justice',
      description: 'Rupert Mayer et Miguel Pro ont défendu les opprimés face à l’injustice politique et sociale.'
    },
    {
      icon: Star,
      title: 'Spiritualité',
      description: 'Ignace et Pierre Favre ont développé une spiritualité ignatienne axée sur le discernement et le service.'
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Saints et Bienheureux Jésuites</h1>
            <p className="text-xl md:text-2xl mb-8">
              Figures emblématiques de la Compagnie de Jésus, ils ont incarné la foi, le service et la justice à travers le monde.
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
            Héros de la Foi
          </motion.h2>
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              `Les saints et bienheureux de la Compagnie de Jésus ont marqué l’histoire par leur engagement spirituel, intellectuel et missionnaire. Fondée en 1540, la Compagnie s’est appuyée sur des figures comme Ignace de Loyola, qui a posé les bases d’une spiritualité ignatienne centrée sur le discernement et le <em>magis</em>.`,
              `Ces hommes ont évangélisé des continents (François Xavier en Asie, Jean de Brébeuf en Amérique), fondé des institutions éducatives (Pierre Canisius en Europe), et défendu la justice face à l’oppression (Rupert Mayer sous le nazisme, Miguel Pro au Mexique).`,
              `Leur héritage continue d’inspirer des millions de personnes à travers la spiritualité jésuite, les Exercices Spirituels, et des mouvements comme la Communauté de Vie Chrétienne.`
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
            "Tout pour la plus grande gloire de Dieu."
          </p>
        </div>
      </div>

      {/* Saints */}
      <section className="py-20 bg-jesuit-light">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center text-jesuit-dark"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Les Saints de la Compagnie
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {saints.map((saint) => (
              <Card
                key={saint.id}
                className="hover:shadow-xl transition-shadow duration-300 rounded-xl bg-white"
              >
                <CardContent className="p-4 flex flex-col items-center">
                  <div className="w-full h-64 bg-white flex items-center justify-center overflow-hidden rounded-lg mb-4 shadow-sm">
                    <img
                      src={saint.image}
                      alt={saint.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">{saint.name}</h3>
                  <p className="text-jesuit-darkgray text-base leading-relaxed text-justify">{saint.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bienheureux */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center text-jesuit-dark"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Les Bienheureux
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bienheureux.map((bienheureux) => (
              <Card
                key={bienheureux.id}
                className="hover:shadow-xl transition-shadow duration-300 rounded-xl bg-white"
              >
                <CardContent className="p-4 flex flex-col items-center">
                  <div className="w-full h-64 bg-white flex items-center justify-center overflow-hidden rounded-lg mb-4 shadow-sm">
                    <img
                      src={bienheureux.image}
                      alt={bienheureux.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">{bienheureux.name}</h3>
                  <p className="text-jesuit-darkgray text-base leading-relaxed text-justify">{bienheureux.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contributions */}
      <section className="py-20 bg-jesuit-light">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center text-jesuit-dark"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Contributions des Saints et Bienheureux
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contributions.map((item, i) => (
              <Card key={i} className="hover:shadow-lg">
                <CardContent className="p-4 flex items-start">
                  <item.icon className="w-12 h-12 text-jesuit-gold mr-4" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-jesuit-darkgray text-base leading-relaxed">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-12 text-center">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold mb-4">Un Héritage Vivant</h2>
          <p className="text-gray-700 mb-6">
            Les saints et bienheureux jésuites continuent d’inspirer par leur courage, leur foi et leur engagement pour un monde plus juste.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              className="bg-[#FCA311] hover:bg-[#fcb930] text-white rounded-full px-6 py-2 shadow-md"
              asChild
            >
              <a href="https://www.jesuits.global" target="_blank" rel="noopener noreferrer">
                Découvrir la spiritualité ignatienne
              </a>
            </Button>
            <Button
              className="bg-white border-2 border-[#FCA311] text-[#FCA311] hover:bg-[#FCA311] hover:text-white rounded-full px-6 py-2 transition shadow-md"
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