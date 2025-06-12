import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Book, Users, Heart, Globe, Leaf, Star, Target, Cross, MapPin, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Define interface for openSections state
interface SectionsState {
  stats: boolean;
  publications: boolean;
  controversies: boolean;
}

const JesuitsPage = () => {
  // Initialize state with typed default values
  const [openSections, setOpenSections] = useState<SectionsState>({
    stats: false,
    publications: false,
    controversies: false,
  });

  const toggleSection = (section: keyof SectionsState) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Data for sections
  const figures = [
    { title: 'Saint Ignace de Loyola', desc: 'Fondateur de la Compagnie en 1540, ancien soldat basque, maître des Exercices spirituels (1491-1556).', image: '/img/saint-ignac.jpeg' },
    { title: 'Saint François Xavier', desc: 'Missionnaire en Asie (Inde, Japon, Chine), patron des missions (1506-1552).', image: '/img/francois-xavier.jpeg' },
    { title: 'Saint Pierre Favre', desc: 'Cofondateur, théologien de la douceur, premier prêtre jésuite (1506-1546).', image: '/img/pierre-favre.jpeg' },
    { title: 'Pape François', desc: 'Premier pape jésuite (2013-2025), promoteur de la simplicité et de la justice (né en 1936).', image: '/img/pape-francois.jpeg' },
    { title: 'Pedro Arrupe', desc: 'Supérieur général (1965-1983), pionnier de la justice sociale (1907-1991).', image: '/img/pedro-arrupe.jpeg' },
  ];

  const values = [
    { icon: Star, title: 'Magis', desc: 'Rechercher l’excellence pour la gloire de Dieu, en visant le "davantage" dans chaque action.' },
    { icon: Target, title: 'Discernement', desc: 'Prendre des décisions éclairées par la prière et la réflexion spirituelle.' },
    { icon: Heart, title: 'Solidarité', desc: 'Servir les pauvres et les exclus avec un amour enraciné dans la justice.' },
    { icon: Cross, title: 'Service', desc: 'Se consacrer au Christ et à l’Église avec générosité et obéissance.' },
  ];

  const missions = [
    { icon: Cross, title: 'Chemin vers Dieu', desc: 'Guider les âmes à travers les Exercices spirituels et le discernement ignatien.' },
    { icon: Heart, title: 'Marcher avec les exclus', desc: 'Promouvoir la réconciliation et la justice auprès des pauvres et des marginalisés.' },
    { icon: Users, title: 'Accompagner les jeunes', desc: 'Former une jeunesse porteuse d’espoir pour un avenir meilleur.' },
    { icon: Leaf, title: 'Sauvegarde de la Création', desc: 'Protéger la "Maison commune" via une écologie intégrale (Laudato Si’).' },
  ];

  const timelineEvents = [
    { year: '1540', desc: 'Fondation de la Compagnie de Jésus par Ignace de Loyola à Paris, approuvée par la bulle Regimini militantis Ecclesiae.' },
    { year: '1773', desc: 'Dissolution de l’ordre par Clément XIV sous pressions politiques.' },
    { year: '1814', desc: 'Rétablissement des Jésuites par Pie VII.' },
    { year: '2013', desc: 'Élection du pape François, premier jésuite à devenir pape.' },
    { year: '2021-2022', desc: 'Année ignatienne célébrant les 500 ans de la conversion d’Ignace.' },
    { year: '2025', desc: 'Élection du pape Léon XIV, Arturo Sosa réaffirme l’engagement jésuite.' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-[15pt]">
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
        <div className="min-h-[400px] flex flex-col items-center justify-center text-center relative text-white p-6 bg-a-propos">
          <div className="max-w-3xl mx-auto bg-black/50 p-8 rounded-lg backdrop-blur-sm">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">La Compagnie de Jésus</h1>
            <p className="text-xl md:text-2xl mb-8">
              Fondée en 1540, les Jésuites servent la foi, l’éducation et la justice dans 112 pays, sous la devise <em>Ad majorem Dei gloriam</em>.
            </p>
          </div>
        </div>
      </section>

 {/* Origine et Mission */}
<section className="py-20 bg-gradient-to-b from-amber-50 to-white text-slate-800 px-4">
  <div className="max-w-4xl mx-auto space-y-12 text-justify">
    <motion.h2 
      className="text-4xl font-bold text-center mb-4 text-amber-800"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      Origine et Mission
    </motion.h2>

    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {[
        `La Compagnie de Jésus, fondée en 1540 à Paris par saint Ignace de Loyola, un ancien soldat basque, et ses compagnons (Pierre Favre, François Xavier, Diego Lainez, Alfonso Salmeron, Nicolás Bobadilla, Simao Rodrigues), a été approuvée par le pape Paul III via la bulle *Regimini militantis Ecclesiae*. Le terme "Compagnie" reflète une camaraderie spirituelle et une discipline quasi militaire.`,
        `Guidés par la devise *Ad majorem Dei gloriam* ("Pour la plus grande gloire de Dieu"), les Jésuites promeuvent la réconciliation des hommes avec Dieu, entre eux, et avec la création. Leur spiritualité ignatienne, basée sur les *Exercices spirituels*, met l’accent sur le discernement, le *magis* (rechercher le "davantage"), et une vision positive du monde.`,
        `Les membres prononcent quatre vœux : pauvreté, chasteté, obéissance, et un vœu spécial d’obéissance au pape pour les missions, symbolisant leur engagement universel.`,
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
      <path fill="currentColor" d="M0,64L48,74.7C96,85,192,107,288,117.3C384,128,480,128,576,144C672,160,768,192,864,186.7C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128V0H1392C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0H0Z" />
    </svg>
  </div>
  <div className="bg-amber-50 py-8 text-center relative z-10">
    <p className="text-xl italic text-amber-800">"Un feu allumé en un seul cœur peut embraser le monde entier."</p>
  </div>
</div>

{/* Organisation Mondiale */}
<section className="py-20 bg-gradient-to-b from-jesuit-light to-white">
  <div className="max-w-5xl mx-auto px-4">
    <motion.h2 
      className="text-3xl md:text-4xl font-bold text-center mb-12 text-jesuit-dark"
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      Organisation Mondiale
    </motion.h2>

    <motion.div 
      className="space-y-10 text-justify text-jesuit-darkgray"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <p className="bg-white/80 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300 backdrop-blur-sm">
        En 2022, la Compagnie de Jésus compte <strong>14 439 membres</strong> répartis dans <strong>112 pays</strong> et <strong>80 provinces</strong> :
        583 novices, 2 587 scolastiques, 837 frères et 10 432 prêtres. Elle est dirigée par <strong>Arturo Sosa</strong> depuis 2016, avec un siège situé à Rome, près du Vatican.
      </p>

      <motion.div 
        className="bg-gradient-to-r from-white via-amber-50 to-white rounded-xl shadow-lg p-6 border border-amber-100"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <h3 className="text-2xl font-semibold mb-4 text-jesuit-darkblue border-b border-amber-300 pb-2">
          Répartition géographique
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-base leading-relaxed">
          <li><strong>Asie du Sud</strong> : 3 955 membres</li>
          <li><strong>Europe</strong> : 3 386 membres</li>
          <li><strong>Amérique du Nord</strong> : 2 046 membres</li>
          <li><strong>Amérique latine</strong> : 1 859 membres</li>
          <li><strong>Afrique</strong> : 1 712 membres</li>
          <li><strong>Asie-Pacifique</strong> : 1 481 membres</li>
        </ul>
        <p className="mt-4 italic text-sm text-slate-600">
          La <strong>Province d’Europe occidentale francophone</strong> (France, Belgique, Luxembourg, Grèce, Océan Indien) compte environ <strong>530 membres</strong>.
        </p>
      </motion.div>
    </motion.div>
  </div>
</section>


      {/* Historical Role */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-jesuit-dark">Rôle Historique</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="min-w-[300px] hover:shadow-lg">
              <CardContent className="p-4">
                <Book className="w-12 h-12 text-jesuit-gold mb-4" />
                <h3 className="text-xl font-bold mb-4">Contre-Réforme</h3>
                <p className="text-jesuit-darkgray text-base leading-relaxed text-justify">
                  Au XVIe siècle, les Jésuites ont joué un rôle clé dans la réforme catholique, luttant contre le protestantisme via l’éducation et les missions.
                </p>
              </CardContent>
            </Card>
            <Card className="min-w-[300px] hover:shadow-lg">
              <CardContent className="p-4">
                <Globe className="w-12 h-12 text-jesuit-gold mb-4" />
                <h3 className="text-xl font-bold mb-4">Missions Internationales</h3>
                <p className="text-jesuit-darkgray text-base leading-relaxed text-justify">
                  Dès le XVIe siècle, les Jésuites ont évangélisé en Asie (Chine, Japon), Afrique et Amériques, s’adaptant aux cultures locales.
                </p>
              </CardContent>
            </Card>
            <Card className="min-w-[300px] hover:shadow-lg">
              <CardContent className="p-4">
                <MapPin className="w-12 h-12 text-jesuit-gold mb-4" />
                <h3 className="text-xl font-bold mb-4">Éducation Pionnière</h3>
                <p className="text-jesuit-darkgray text-base leading-relaxed text-justify">
                  Fondateurs de collèges (Lycée Louis-le-Grand, Paris) et universités (Córdoba, Argentine), formant des générations de leaders.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
{/* Figures Inspirantes */}
<section className="py-20 bg-jesuit-light">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-bold mb-12 text-center text-jesuit-dark">Figures Inspirantes</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {figures.map((figure, i) => (
        <Card 
          key={i} 
          className="hover:shadow-xl transition-shadow duration-300 rounded-xl bg-white"
        >
          <CardContent className="p-4 flex flex-col items-center">
            <div className="w-full h-64 bg-white flex items-center justify-center overflow-hidden rounded-lg mb-4 shadow-sm">
              <img 
                src={figure.image} 
                alt={figure.title} 
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-center mb-2">{figure.title}</h3>
            <p className="text-jesuit-darkgray text-base leading-relaxed text-justify">{figure.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>


      {/* Missions */}
      <section className="py-16 bg-jesuit-light">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-jesuit-dark">Préférences Apostoliques (2019-2029)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {missions.map((mission, i) => (
              <Card key={i} className="hover:shadow-lg">
                <CardContent className="p-4 flex items-start">
                  <mission.icon className="w-12 h-12 text-jesuit-gold mr-4" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">{mission.title}</h3>
                    <p className="text-jesuit-darkgray text-base leading-relaxed">{mission.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Current Activities */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-jesuit-dark">Impact Actuel</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="min-w-[300px] hover:shadow-lg">
              <CardContent className="p-4">
                <Book className="w-12 h-12 text-jesuit-gold mb-4" />
                <h3 className="text-xl font-bold mb-4">Éducation</h3>
                <p className="text-jesuit-darkgray text-base leading-relaxed text-justify">
                  Gestion d’universités (ex. : Saint-Joseph, Beyrouth) et d’initiatives comme <em>Fe y Alegría</em> pour l’éducation des défavorisés en Amérique latine. En Europe francophone, 22 établissements scolaires et 5 centres spirituels accueillent 26 000 retraitants par an.
                </p>
              </CardContent>
            </Card>
            <Card className="min-w-[300px] hover:shadow-lg">
              <CardContent className="p-4">
                <Heart className="w-12 h-12 text-jesuit-gold mb-4" />
                <h3 className="text-xl font-bold mb-4">Justice Sociale</h3>
                <p className="text-jesuit-darkgray text-base leading-relaxed text-justify">
                  Engagement auprès des marginalisés, comme les femmes Mapuches au Chili, pour promouvoir la dignité et la réconciliation.
                </p>
              </CardContent>
            </Card>
            <Card className="min-w-[300px] hover:shadow-lg">
              <CardContent className="p-4">
                <Leaf className="w-12 h-12 text-jesuit-gold mb-4" />
                <h3 className="text-xl font-bold mb-4">Écologie</h3>
                <p className="text-jesuit-darkgray text-base leading-relaxed text-justify">
                  Mise en œuvre de l’écologie intégrale, inspirée par <em>Laudato Si’</em>, pour protéger la création.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

           {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-jesuit-blue mb-4">Moments Clés</h2>
          <p className="text-center max-w-2xl mx-auto text-lg text-jesuit-darkgray mb-12">
            Découvrez les grandes étapes qui ont marqué l’histoire de la Compagnie de Jésus, depuis sa fondation jusqu’à son rayonnement mondial aujourd’hui.
          </p>
          <div className="relative">
            {/* Ligne verticale centrale visible */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-black"></div>
            <div className="space-y-12">
              {timelineEvents.map((event, i) => (
                <div
                  key={i}
                  className={`relative flex flex-col md:flex-row items-center ${i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} md:gap-8`}
                >
                  <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} w-full`}> 
                    <Card className="bg-white border border-orange-200 shadow-md">
                      <CardContent className="p-4 flex items-start">
                        <Calendar className="w-8 h-8 text-jesuit-gold mr-4" />
                        <div>
                          <h3 className="text-xl font-semibold text-jesuit-dark mb-2">{event.year}</h3>
                          <p className="text-base text-jesuit-darkgray leading-relaxed">{event.desc}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  {/* Point de jonction sur la ligne */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 bg-jesuit-gold w-4 h-4 rounded-full border-4 border-white"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Legacy and CTA */}
      <section className="bg-gray-50 py-12 text-center">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold mb-4">Héritage Jésuite</h2>
          <p className="text-gray-700 mb-6">
            Les Jésuites influencent le monde par leur rigueur intellectuelle et leur engagement, inspirant des mouvements comme la Communauté de Vie Chrétienne (59 pays) et le Mouvement Eucharistique des Jeunes (80 pays). Découvrez plus à propos de la compagnie.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button className="bg-[#FCA311] hover:bg-[#fcb930] text-white rounded-full px-6 py-2 shadow-md" asChild>
              <a href="https://www.jesuits.global" target="_blank" rel="noopener noreferrer">Site officiel de la compagnie Jesuite</a>
            </Button>
            <Button className="bg-white border-2 border-[#FCA311] text-[#FCA311] hover:bg-[#FCA311] hover:text-white rounded-full px-6 py-2 transition shadow-md" asChild>
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JesuitsPage;