import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Heart, Book, Globe, Leaf, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { X as Cross } from 'lucide-react'

const FamilleIgnatiennePage = () => {
  const membres = [
    {
      id: 1,
      title: 'Compagnie de Jésus',
      description: 'Fondée par saint Ignace de Loyola en 1540, les Jésuites forment le noyau de la Famille ignatienne, avec 14 439 membres en 2022, œuvrant dans l’éducation, les missions et la justice sociale.',
      icon: Users
    },
    {
      id: 2,
      title: 'Sœurs de la Sainte Famille de Nazareth',
      description: 'Fondées en 1875 par Frances Siedliska, elles adoptent la spiritualité ignatienne pour leurs missions éducatives et caritatives dans 14 pays.',
      icon: Heart
    },
    {
      id: 3,
      title: 'Communauté de Vie Chrétienne (CVX)',
      description: 'Mouvement laïc mondial présent dans 59 pays, la CVX vit les Exercices Spirituels pour guider les laïcs dans leur vie quotidienne.',
      icon: Book
    },
    {
      id: 4,
      title: 'Réseau Ignatien',
      description: 'Réseau mondial d’institutions (universités, écoles, centres sociaux) comme Fe y Alegría, qui éduque les défavorisés dans 22 pays.',
      icon: Globe
    },
    {
      id: 5,
      title: 'Mouvement Eucharistique des Jeunes (MEJ)',
      description: 'Mouvement pour les jeunes dans 80 pays, inspiré par la spiritualité ignatienne pour former des leaders chrétiens.',
      icon: Star
    }
  ];

  const missions = [
    {
      icon: Book,
      title: 'Éducation',
      description: 'Formation intégrale via des institutions comme les universités jésuites (Georgetown, Saint-Joseph) et Fe y Alegría, touchant des millions d’élèves.'
    },
    {
      icon: Heart,
      title: 'Justice Sociale',
      description: 'Engagement auprès des marginalisés, inspiré par Laudato Si’ et les préférences apostoliques jésuites (2019-2029).'
    },
    {
      icon: Leaf,
      title: 'Écologie',
      description: 'Promotion de l’écologie intégrale pour protéger la "Maison commune" à travers des initiatives mondiales.'
    },
    {
      icon: Cross,
      title: 'Accompagnement Spirituel',
      description: 'Guidance des personnes via les Exercices Spirituels et le discernement ignatien pour une vie alignée sur la foi.'
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">La Famille Ignatienne</h1>
            <p className="text-xl md:text-2xl mb-8">
              Un réseau mondial uni par la spiritualité ignatienne, au service de la foi, de la justice et de la création.
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
            Une Grande Famille
          </motion.h2>
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              `La Famille ignatienne regroupe des congrégations religieuses, des mouvements laïcs et des institutions partageant la spiritualité de saint Ignace de Loyola. Fondée sur les <em>Exercices Spirituels</em>, elle incarne une vision de foi active et de service universel.`,
              `Depuis la création de la Compagnie de Jésus en 1540, cette famille s’est élargie pour inclure des organisations comme la Communauté de Vie Chrétienne (CVX), présente dans 59 pays, et le Réseau Ignatien, qui touche des millions de personnes via l’éducation et la justice sociale.`,
              `Guidée par la devise <em>Ad majorem Dei gloriam</em>, la Famille ignatienne travaille en réseau pour répondre aux défis contemporains, de l’écologie intégrale à l’accompagnement des jeunes et des marginalisés.`
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
                En savoir plus sur la spiritualité ignatienne
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
            "En tout, aimer et servir."
          </p>
        </div>
      </div>

      {/* Membres */}
      <section className="py-20 bg-jesuit-light">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center text-jesuit-dark"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Les Membres de la Famille
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {membres.map((membre) => (
              <Card
                key={membre.id}
                className="hover:shadow-xl transition-shadow duration-300 rounded-xl bg-white"
              >
                <CardContent className="p-4 flex items-start">
                  <membre.icon className="w-12 h-12 text-jesuit-gold mr-4" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">{membre.title}</h3>
                    <p className="text-jesuit-darkgray text-base leading-relaxed">{membre.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Missions Communes */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center text-jesuit-dark"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Missions Communes
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

      {/* Collaboration */}
      <section className="py-20 bg-jesuit-light">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center text-jesuit-dark"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Travailler Ensemble
          </motion.h2>
          <motion.div
            className="space-y-8 text-jesuit-darkgray text-justify"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="bg-white/80 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300 backdrop-blur-sm">
              La Famille ignatienne excelle dans la collaboration mondiale, unissant ses membres pour maximiser leur impact. Par exemple, le Jesuit Refugee Service (JRS) travaille avec la CVX pour soutenir les réfugiés dans plus de 50 pays, offrant éducation et aide humanitaire.
            </p>
            <p className="bg-white/80 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300 backdrop-blur-sm">
              Les institutions éducatives, comme les 800 écoles et 70 universités du Réseau Ignatien, partagent ressources et bonnes pratiques pour former des leaders engagés. Les retraites ignatiennes, animées par des centres spirituels, attirent 26 000 participants annuels en Europe francophone.
            </p>
            <p className="bg-white/80 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300 backdrop-blur-sm">
              Cette collaboration se traduit par des projets communs, comme les initiatives écologiques inspirées par <em>Laudato Si’</em>, et par un dialogue interreligieux pour promouvoir la paix et la réconciliation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-12 text-center">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold mb-4">Rejoignez la Famille Ignatienne</h2>
          <p className="text-gray-700 mb-6">
            Participez à une mission mondiale pour la foi, la justice et la sauvegarde de la création.
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

export default FamilleIgnatiennePage;