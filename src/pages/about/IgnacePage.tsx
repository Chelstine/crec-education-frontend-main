import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Book, Cross, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const IgnacePage = () => {
  const lifeEvents = [
    {
      year: '1491',
      title: 'Naissance',
      description: 'Né à Loyola, dans le Pays basque espagnol, dans une famille noble.'
    },
    {
      year: '1521',
      title: 'Blessure à Pampelune',
      description: 'Gravement blessé lors de la bataille de Pampelune, marquant le début de sa conversion spirituelle.'
    },
    {
      year: '1522-1523',
      title: 'Retraite à Manrèse',
      description: 'Vécut une expérience spirituelle profonde à Manrèse, posant les bases des Exercices Spirituels.'
    },
    {
      year: '1524-1535',
      title: 'Études et pèlerinages',
      description: 'Étudia à Barcelone, Alcalá, Salamanque, et Paris, où il rencontra ses premiers compagnons.'
    },
    {
      year: '1534',
      title: 'Fondation de la Compagnie',
      description: 'Avec Pierre Favre, François Xavier et d’autres, il fonda la Compagnie de Jésus à Paris.'
    },
    {
      year: '1540',
      title: 'Approbation papale',
      description: 'Le pape Paul III approuva officiellement la Compagnie de Jésus via la bulle Regimini militantis Ecclesiae.'
    },
    {
      year: '1556',
      title: 'Mort à Rome',
      description: 'Décéda à Rome, laissant un héritage spirituel durable à travers la Compagnie et les Exercices.'
    }
  ];

  const spiritualLegacy = [
    {
      icon: Book,
      title: 'Ex Exercices Spirituels',
      description: 'Une méthode de prière et de discernement pour trouver Dieu en toutes choses et guider les décisions.'
    },
    {
      icon: Cross,
      title: 'Discernement ignatien',
      description: 'Une approche pour reconnaître les mouvements intérieurs et aligner ses choix sur la volonté divine.'
    },
    {
      icon: Cross,
      title: 'Magis',
      description: 'Rechercher le "davantage" pour la gloire de Dieu dans chaque action et mission.'
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
            backgroundImage: "url('/img/ignace-bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="max-w-3xl mx-auto bg-black/50 p-8 rounded-lg backdrop-blur-sm">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Saint Ignace de Loyola</h1>
            <p className="text-xl md:text-2xl mb-8">
              Fondateur de la Compagnie de Jésus, maître des Exercices Spirituels, et guide spirituel (1491-1556).
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
            Une Vie de Conversion
          </motion.h2>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              `Né en 1491 à Loyola, dans le Pays basque espagnol, Íñigo López de Loyola, futur saint Ignace, grandit dans une famille noble. D'abord chevalier au service du vice-roi de Navarre, il mena une vie mondaine, marquée par l'ambition et le courage militaire.`,
              `En 1521, une blessure grave lors de la bataille de Pampelune changea sa vie. Pendant sa convalescence, il lut des récits sur le Christ et les saints, déclenchant une profonde conversion spirituelle. Cette expérience le conduisit à abandonner sa carrière militaire pour une vie dédiée à Dieu.`,
              `Son séjour à Manrèse (1522-1523) fut décisif : il y développa les <em>Exercices Spirituels</em>, une méthode de prière et de discernement qui devint le cœur de la spiritualité jésuite. Plus tard, ses études à Paris et sa rencontre avec Pierre Favre et François Xavier posèrent les bases de la Compagnie de Jésus, fondée en 1534 et approuvée en 1540.`
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
                Découvrir la Compagnie de Jésus
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
            "Trouve Dieu en toutes choses, et tout deviendra prière."
          </p>
        </div>
      </div>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center text-jesuit-blue mb-4"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Moments Clés
          </motion.h2>
          <motion.p
            className="text-center max-w-2xl mx-auto text-lg text-jesuit-darkgray mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Découvrez les étapes marquantes de la vie d’Ignace de Loyola, de sa conversion à la fondation de la Compagnie de Jésus.
          </motion.p>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-black"></div>
            <div className="space-y-12">
              {lifeEvents.map((event, i) => (
                <div
                  key={i}
                  className={`relative flex flex-col md:flex-row items-center ${i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} md:gap-8`}
                >
                  <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} w-full`}>
                    <Card className="bg-white border border-amber-200 shadow-md">
                      <CardContent className="p-4 flex items-start">
                        <Calendar className="w-8 h-8 text-jesuit-gold mr-4" />
                        <div>
                          <h3 className="text-xl font-semibold text-jesuit-dark mb-2">{event.year}</h3>
                          <p className="text-base text-jesuit-darkgray leading-relaxed">{event.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 bg-jesuit-gold w-4 h-4 rounded-full border-4 border-white"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Spiritualité */}
      <section className="py-20 bg-jesuit-light">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center text-jesuit-dark"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Héritage Spirituel
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {spiritualLegacy.map((item, i) => (
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
          <h2 className="text-2xl font-bold mb-4">L’Héritage d’Ignace</h2>
          <p className="text-gray-700 mb-6">
            La spiritualité ignatienne, à travers les Exercices Spirituels et la Compagnie de Jésus, continue d’inspirer des millions de personnes dans leur quête de sens et de justice.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              className="bg-[#FCA311] hover:bg-[#fcb930] text-white rounded-full px-6 py-2 shadow-md"
              asChild
            >
              <a href="https://www.jesuits.global" target="_blank" rel="noopener noreferrer">
                En savoir plus sur la spiritualité ignatienne
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

export default IgnacePage;