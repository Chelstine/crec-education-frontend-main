/**
 * JesuitesPage.tsx
 * 
 * Page complète sur l'histoire et l'héritage des Jésuites
 * Cette page intègre tout le contenu relatif aux jésuites :
 * - Histoire et fondation
 * - Saint Ignace de Loyola et autres saints jésuites
 * - Communautés jésuites et la famille ignatienne
 * - Spiritualité et mission
 * 
 * Source principale: jesuites.global
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Book,        // Éducation/publication
  Users,       // Communauté
  Heart,       // Amour/charité
  Globe,       // Rayonnement mondial
  Leaf,        // Écologie
  Star,        // Excellence
  Target,      // Objectifs
  Cross,       // Spiritualité
  MapPin,      // Localisation
  Calendar,    // Dates/histoire
  ChevronDown, // Interface - déplier
  ChevronUp,   // Interface - replier
  Home,        // Maison/communauté
  BookOpen,    // Livre ouvert/enseignement
  FileText,    // Documents/publications
  Award,       // Récompense/reconnaissance
  Feather      // Plume/écriture
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Types pour les sections extensibles
interface SectionsState {
  stats: boolean;
  publications: boolean;
  controversies: boolean;
}

// Type pour les onglets principaux
type TabType = 'histoire' | 'saints' | 'communautes' | 'spiritualite';

/**
 * Composant principal JesuitesPage
 * Page complète et détaillée sur les Jésuites fusionnant le contenu 
 * de plusieurs anciennes pages (ignace, saints, communautés)
 */
const JesuitesPage = () => {
  // Gestion des sections dépliables
  const [openSections, setOpenSections] = useState<SectionsState>({
    stats: false,
    publications: false,
    controversies: false,
  });
  
  // Onglets pour la navigation dans le contenu fusionné
  const [activeTab, setActiveTab] = useState<TabType>('histoire');

  // Fonction pour basculer l'état d'ouverture d'une section
  const toggleSection = (section: keyof SectionsState) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // SECTION HISTOIRE - Figures importantes des Jésuites
  const figures = [
    { 
      title: 'Saint Ignace de Loyola', 
      desc: 'Fondateur de la Compagnie en 1540, ancien soldat basque, maître des Exercices spirituels (1491-1556).', 
      image: '/img/saint-ignac.jpeg' 
    },
    { 
      title: 'Saint François Xavier', 
      desc: 'Missionnaire en Asie (Inde, Japon, Chine), patron des missions (1506-1552).', 
      image: '/img/francois-xavier.jpeg' 
    },
    { 
      title: 'Saint Pierre Favre', 
      desc: 'Cofondateur, théologien de la douceur, premier prêtre jésuite (1506-1546).', 
      image: '/img/pierre-favre.jpeg' 
    },
    { 
      title: 'Pape François', 
      desc: 'Premier pape jésuite (2013-présent), promoteur de la simplicité et de la justice sociale (né en 1936).', 
      image: '/img/pape-francois.jpeg' 
    },
    { 
      title: 'Pedro Arrupe', 
      desc: 'Supérieur général (1965-1983), pionnier de la justice sociale moderne et du service auprès des réfugiés (1907-1991).', 
      image: '/img/pedro-arrupe.jpeg' 
    },
  ];

  // Spiritualité et valeurs jésuites
  const values = [
    { 
      icon: Star, 
      title: 'Magis', 
      desc: 'Rechercher l'excellence pour la plus grande gloire de Dieu, en visant le "davantage" dans chaque action.' 
    },
    { 
      icon: Target, 
      title: 'Discernement', 
      desc: 'Prendre des décisions éclairées par la prière et la réflexion spirituelle pour rechercher la volonté divine.' 
    },
    { 
      icon: Heart, 
      title: 'Solidarité', 
      desc: 'Servir les pauvres et les exclus avec un amour enraciné dans la justice et la dignité humaine.' 
    },
    { 
      icon: Cross, 
      title: 'Service', 
      desc: 'Se consacrer au Christ et à l'Église universelle avec générosité et obéissance.' 
    },
  ];

  // Préférences apostoliques universelles
  const missions = [
    { 
      icon: Cross, 
      title: 'Chemin vers Dieu', 
      desc: 'Guider les âmes à travers les Exercices spirituels et le discernement ignatien.' 
    },
    { 
      icon: Heart, 
      title: 'Marcher avec les exclus', 
      desc: 'Promouvoir la réconciliation et la justice auprès des pauvres et des marginalisés.' 
    },
    { 
      icon: Users, 
      title: 'Accompagner les jeunes', 
      desc: 'Former une jeunesse porteuse d'espoir pour un avenir meilleur.' 
    },
    { 
      icon: Leaf, 
      title: 'Sauvegarde de la Création', 
      desc: 'Protéger la "Maison commune" via une écologie intégrale (Laudato Si').' 
    },
  ];

  // Chronologie historique
  const timelineEvents = [
    { 
      year: '1491', 
      desc: 'Naissance d'Ignace de Loyola au château de Loyola, dans le Pays basque espagnol.' 
    },
    { 
      year: '1521', 
      desc: 'Blessure d'Ignace à la bataille de Pampelune, début de sa conversion spirituelle pendant sa convalescence.' 
    },
    { 
      year: '1522-1523', 
      desc: 'Retraite à Manrèse où Ignace vit une expérience spirituelle profonde et commence à rédiger les Exercices Spirituels.' 
    },
    { 
      year: '1534', 
      desc: 'Vœux de Montmartre à Paris avec ses premiers compagnons (Xavier, Favre, etc.).' 
    },
    { 
      year: '1540', 
      desc: 'Fondation officielle de la Compagnie de Jésus, approuvée par la bulle Regimini militantis Ecclesiae du pape Paul III.' 
    },
    { 
      year: '1548', 
      desc: 'Publication officielle des Exercices Spirituels d'Ignace, approuvés par le pape Paul III.' 
    },
    { 
      year: '1556', 
      desc: 'Mort d'Ignace de Loyola à Rome, la Compagnie compte déjà plus de 1000 membres.' 
    },
    { 
      year: '1773', 
      desc: 'Suppression de la Compagnie de Jésus par le pape Clément XIV sous pressions politiques.' 
    },
    { 
      year: '1814', 
      desc: 'Rétablissement des Jésuites par le pape Pie VII.' 
    },
    { 
      year: '2013', 
      desc: 'Élection du pape François, premier jésuite à devenir pape.' 
    },
    { 
      year: '2021-2022', 
      desc: 'Année ignatienne célébrant les 500 ans de la conversion d'Ignace.' 
    },
  ];

  // SECTION SAINTS - Liste des saints et bienheureux jésuites importants
  const saints = [
    {
      id: 1,
      name: 'Saint Ignace de Loyola',
      title: 'Fondateur de la Compagnie de Jésus',
      description: 'Fondateur de la Compagnie en 1540, auteur des Exercices Spirituels, il guida des générations vers le discernement spirituel (1491-1556). Canonisé en 1622.',
      image: '/img/saint-ignac.jpeg'
    },
    {
      id: 2,
      name: 'Saint François Xavier',
      title: 'Apôtre des Indes',
      description: 'Missionnaire en Asie (Inde, Japon, Chine), il baptisa des milliers de personnes et établit des communautés chrétiennes. Canonisé en 1622 (1506-1552).',
      image: '/img/francois-xavier.jpeg'
    },
    {
      id: 3,
      name: 'Saint Pierre Canisius',
      title: 'Docteur de l'Église',
      description: 'Théologien et éducateur, il fortifia la foi catholique en Allemagne et en Europe centrale pendant la Contre-Réforme. Canonisé en 1925 (1521-1597).',
      image: '/img/pierre-favre.jpeg'
    },
    {
      id: 4,
      name: 'Saint Robert Bellarmin',
      title: 'Cardinal et Docteur de l'Église',
      description: 'Théologien brillant et défenseur de la foi pendant la Contre-Réforme. Il fut un soutien important de Galilée malgré leurs désaccords. Canonisé en 1930 (1542-1621).',
      image: '/img/saints/bellarmin.jpg'
    },
    {
      id: 5,
      name: 'Saint Jean de Brébeuf',
      title: 'Martyr du Canada',
      description: 'Missionnaire auprès des Hurons au Canada, il fut martyrisé en 1649. Son respect pour la culture amérindienne et son courage face au martyre sont exemplaires. Canonisé en 1930.',
      image: '/img/saints/brebeuf.jpg'
    },
    {
      id: 6,
      name: 'Saint Pierre Claver',
      title: 'Esclave des esclaves',
      description: 'Missionnaire à Carthagène (Colombie), il se consacra au service des esclaves africains débarquant dans le port. Canonisé en 1888 (1580-1654).',
      image: '/img/saints/claver.jpg'
    }
  ];

  // Héritage spirituel de Saint Ignace
  const spiritualLegacy = [
    {
      icon: Book,
      title: 'Exercices Spirituels',
      description: 'Méthode de discernement spirituel pour découvrir la volonté de Dieu dans sa vie à travers la méditation, la contemplation et la prière.'
    },
    {
      icon: Heart,
      title: 'Contemplation dans l'Action',
      description: 'Trouver Dieu dans toutes choses et toutes choses en Dieu, unissant vie active et contemplative.'
    },
    {
      icon: Globe,
      title: 'Service de la Foi et Promotion de la Justice',
      description: 'Une foi qui fait la justice, engagement concret pour transformer les structures injustes.'
    },
    {
      icon: Cross,
      title: 'Ad Majorem Dei Gloriam',
      description: '"Pour la plus grande gloire de Dieu" - devise qui inspire chaque œuvre et mission jésuite.'
    }
  ];

  // SECTION COMMUNAUTÉS - Communautés jésuites importantes
  const communautes = [
    {
      id: 1,
      name: 'Communauté du CREC',
      location: 'Cotonou, Bénin',
      description: 'Centre de recherche et de formation, le CREC forme des leaders chrétiens et soutient la recherche théologique en Afrique de l'Ouest.',
      icon: Book,
      image: '/img/crec2.png'
    },
    {
      id: 2,
      name: 'Province d'Europe Occidentale Francophone',
      location: 'France, Belgique, Luxembourg',
      description: 'Regroupant plus de 500 jésuites, cette province coordonne des œuvres éducatives, pastorales et sociales dans l'espace francophone européen.',
      icon: Globe,
      image: '/img/eglise.png'
    },
    {
      id: 3,
      name: 'Province de l'Afrique de l'Ouest',
      location: 'Afrique de l'Ouest',
      description: 'Couvrant 12 pays, cette province dynamique mène des missions éducatives, spirituelles et sociales adaptées aux réalités africaines contemporaines.',
      icon: Users,
      image: '/img/crec3.jpg'
    },
    {
      id: 4,
      name: 'Curie Généralice',
      location: 'Rome, Italie',
      description: 'Siège du gouvernement central de la Compagnie de Jésus, où réside le Supérieur Général, actuellement le Père Arturo Sosa.',
      icon: Home,
      image: '/img/crec1.jpg'
    }
  ];

  // SECTION FAMILLE IGNATIENNE - Famille spirituelle ignatienne
  const familleIgnatienne = [
    {
      id: 1,
      name: 'Communauté de Vie Chrétienne (CVX)',
      description: 'Mouvement international de laïcs ignatiens présent dans plus de 60 pays, vivant la spiritualité ignatienne au quotidien.',
      image: '/img/formation.png'
    },
    {
      id: 2,
      name: 'Mouvement Eucharistique des Jeunes (MEJ)',
      description: 'Propose aux jeunes de 7 à 18 ans un chemin de croissance humaine et spirituelle dans l'esprit ignatien.',
      image: '/img/accompagnement.png'
    },
    {
      id: 3,
      name: 'Réseau Magis',
      description: 'Réseau international pour les jeunes adultes (18-35 ans) proposant expériences pastorales et spiritualité ignatienne.',
      image: '/img/universite.png'
    },
    {
      id: 4,
      name: 'Congrégations Religieuses Ignatiennes',
      description: 'Nombreuses congrégations féminines et masculines partageant la spiritualité ignatienne comme les Religieuses du Sacré-Cœur.',
      image: '/img/formation.png'
    }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section amélioré avec fond et titre */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-crec-darkblue/90 via-crec-darkblue/70 to-black/80" />
        <div className="min-h-[450px] flex flex-col items-center justify-center text-center relative text-white p-6">
          <div className="absolute inset-0 z-[-1]">
            <img 
              src="/img/eglise.png" 
              alt="Compagnie de Jésus" 
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.7) contrast(1.1)' }}
            />
          </div>
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-black/60 to-crec-darkblue/50 p-10 rounded-xl backdrop-blur-sm border border-white/10 shadow-2xl">
            <div className="text-crec-gold text-sm uppercase tracking-widest mb-2">Ad Majorem Dei Gloriam</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-5">
              <span className="bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                La Compagnie de Jésus
              </span>
            </h1>
            <div className="w-20 h-1 bg-crec-gold mx-auto mb-6"></div>
            <p className="text-xl md:text-2xl mb-4 text-slate-100">
              Fondée en 1540, les Jésuites servent la foi, l'éducation et la justice dans 112 pays, sous la devise <em>Ad majorem Dei gloriam</em>.
            </p>
            <div className="flex justify-center mt-6">
              <Cross className="text-crec-gold h-8 w-8 opacity-75" />
            </div>
          </div>
        </div>
      </section>

      {/* Système d'onglets principal */}
      <section className="py-10 container mx-auto px-4">
        <Tabs 
          defaultValue="histoire" 
          className="w-full"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as TabType)}
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8 w-full">
            <TabsTrigger value="histoire" className="text-base">
              <Calendar className="w-5 h-5 mr-2" /> 
              Histoire
            </TabsTrigger>
            <TabsTrigger value="saints" className="text-base">
              <Award className="w-5 h-5 mr-2" />
              Saints et Figures
            </TabsTrigger>
            <TabsTrigger value="communautes" className="text-base">
              <Users className="w-5 h-5 mr-2" />
              Communautés
            </TabsTrigger>
            <TabsTrigger value="spiritualite" className="text-base">
              <Star className="w-5 h-5 mr-2" />
              Spiritualité
            </TabsTrigger>
          </TabsList>

          {/* CONTENU ONGLET 1: HISTOIRE */}
          <TabsContent value="histoire" className="space-y-12">
            {/* Origine et Mission */}
            <section className="bg-gradient-to-b from-amber-50 to-white text-slate-800 px-4 py-12 rounded-xl">
              <div className="max-w-4xl mx-auto space-y-8 text-justify">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-6 text-amber-800"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  Origine et Mission
                </motion.h2>

                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {[
                    `La Compagnie de Jésus, fondée en 1540 à Paris par saint Ignace de Loyola, un ancien soldat basque, et ses compagnons (Pierre Favre, François Xavier, Diego Lainez, Alfonso Salmeron, Nicolás Bobadilla, Simao Rodrigues), a été approuvée par le pape Paul III via la bulle *Regimini militantis Ecclesiae*. Le terme "Compagnie" reflète une camaraderie spirituelle et une discipline quasi militaire.`,
                    `Guidés par la devise *Ad majorem Dei gloriam* ("Pour la plus grande gloire de Dieu"), les Jésuites promeuvent la réconciliation des hommes avec Dieu, entre eux, et avec la création. Leur spiritualité ignatienne, basée sur les *Exercices spirituels*, met l'accent sur le discernement, le *magis* (rechercher le "davantage"), et une vision positive du monde.`,
                    `Les membres prononcent quatre vœux : pauvreté, chasteté, obéissance, et un vœu spécial d'obéissance au pape pour les missions, symbolisant leur engagement universel.`,
                  ].map((text, index) => (
                    <p
                      key={index}
                      className="relative pl-6 before:absolute before:left-0 before:top-1 before:w-1 before:h-full before:bg-amber-500 before:rounded-full"
                    >
                      <span dangerouslySetInnerHTML={{ __html: text }} />
                    </p>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* Organisation Mondiale */}
            <section className="bg-white py-12 rounded-xl shadow-md">
              <div className="max-w-5xl mx-auto px-4">
                <motion.h2 
                  className="text-3xl font-bold text-center mb-8 text-slate-800"
                  initial={fadeInUp.hidden}
                  whileInView={fadeInUp.visible}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  Organisation Mondiale
                </motion.h2>

                <motion.div 
                  className="space-y-6 text-justify text-slate-700"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <p className="bg-slate-50 rounded-xl shadow-sm p-6 hover:shadow-md transition duration-300">
                    En 2022, la Compagnie de Jésus compte <strong>14 439 membres</strong> répartis dans <strong>112 pays</strong> et <strong>80 provinces</strong> :
                    583 novices, 2 587 scolastiques, 837 frères et 10 432 prêtres. Elle est dirigée par <strong>Arturo Sosa</strong> depuis 2016, avec un siège situé à Rome, près du Vatican.
                  </p>

                  <motion.div 
                    className="bg-gradient-to-r from-white via-amber-50 to-white rounded-xl shadow-md p-6 border border-amber-100"
                    initial={fadeInUp.hidden}
                    whileInView={fadeInUp.visible}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                  >
                    <h3 className="text-2xl font-semibold mb-4 text-amber-800 border-b border-amber-300 pb-2">
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
                      La <strong>Province d'Europe occidentale francophone</strong> (France, Belgique, Luxembourg, Grèce, Océan Indien) compte environ <strong>530 membres</strong>.
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* Chronologie */}
            <section className="py-12">
              <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">Moments Clés</h2>
                <p className="text-center max-w-2xl mx-auto text-lg text-slate-600 mb-10">
                  Les grandes étapes qui ont marqué l'histoire de la Compagnie de Jésus, depuis sa fondation jusqu'à son rayonnement mondial aujourd'hui.
                </p>
                
                <div className="relative">
                  {/* Ligne verticale centrale */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-amber-500 rounded-full"></div>
                  
                  <div className="space-y-12">
                    {timelineEvents.map((event, i) => (
                      <div
                        key={i}
                        className={`relative flex flex-col md:flex-row items-center ${i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} md:gap-8`}
                      >
                        <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'} w-full`}> 
                          <Card className="bg-white border border-amber-200 shadow-md">
                            <CardContent className="p-4">
                              <h3 className="text-xl font-semibold text-amber-800 mb-2">{event.year}</h3>
                              <p className="text-base text-slate-700 leading-relaxed">{event.desc}</p>
                            </CardContent>
                          </Card>
                        </div>
                        
                        {/* Point de jonction sur la ligne */}
                        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 bg-amber-600 w-4 h-4 rounded-full border-4 border-white shadow-md"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Figures Inspirantes */}
            <section className="py-12 bg-slate-100 rounded-xl">
              <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-12 text-center text-slate-800">Figures Inspirantes</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {figures.map((figure, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="hover:shadow-xl transition-shadow duration-300 rounded-xl bg-white h-full">
                        <CardContent className="p-4 flex flex-col h-full">
                          <div className="w-full h-64 bg-white flex items-center justify-center overflow-hidden rounded-lg mb-4 shadow-sm">
                            <img 
                              src={figure.image} 
                              alt={figure.title} 
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                          <h3 className="text-xl font-bold text-center mb-2 text-slate-800">{figure.title}</h3>
                          <p className="text-slate-600 text-base leading-relaxed text-center">{figure.desc}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </TabsContent>

          {/* CONTENU ONGLET 2: SAINTS */}
          <TabsContent value="saints" className="space-y-12">
            <section className="bg-gradient-to-b from-blue-50 to-white py-10 rounded-xl">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-blue-800">
                  Saints et Bienheureux Jésuites
                </h2>
                <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
                  À travers les siècles, la Compagnie de Jésus a inspiré de nombreuses figures qui ont été reconnues pour leur sainteté et leur contribution exemplaire à l'Église et au monde.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {saints.map((saint) => (
                    <motion.div 
                      key={saint.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: saint.id * 0.1 }}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={saint.image} 
                          alt={saint.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl font-bold text-blue-800 mb-1">{saint.name}</h3>
                        <p className="text-sm font-medium text-blue-600 mb-3">{saint.title}</p>
                        <p className="text-slate-600">{saint.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Héritage spirituel de Saint Ignace */}
            <section className="py-12">
              <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">
                  L'héritage spirituel d'Ignace
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {spiritualLegacy.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-xl p-6 shadow-md border border-slate-200"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-amber-100 p-3 rounded-full">
                          <item.icon className="h-8 w-8 text-amber-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">{item.title}</h3>
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-12 text-center">
                  <Button asChild variant="default" size="lg" className="bg-amber-600 hover:bg-amber-700 text-white">
                    <a 
                      href="https://www.jesuites.com/qui-sont-les-jesuites/spiritualite-ignatienne/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center"
                    >
                      En savoir plus sur la spiritualité ignatienne
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </section>
          </TabsContent>

          {/* CONTENU ONGLET 3: COMMUNAUTÉS */}
          <TabsContent value="communautes" className="space-y-12">
            {/* Communautés jésuites */}
            <section className="bg-gradient-to-b from-slate-100 to-white py-12 rounded-xl">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-6 text-slate-800">
                  Nos Communautés
                </h2>
                <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
                  Présente dans 112 pays à travers le monde, la Compagnie de Jésus anime des communautés locales qui s'engagent dans des missions éducatives, pastorales et sociales.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {communautes.map((communaute) => (
                    <motion.div 
                      key={communaute.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: communaute.id * 0.1 }}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row h-full"
                    >
                      <div className="md:w-2/5 h-48 md:h-auto overflow-hidden">
                        <img 
                          src={communaute.image} 
                          alt={communaute.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5 md:w-3/5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="h-5 w-5 text-slate-500" />
                            <span className="text-sm text-slate-500">{communaute.location}</span>
                          </div>
                          <h3 className="text-xl font-bold text-slate-800 mb-2">{communaute.name}</h3>
                          <p className="text-slate-600">{communaute.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Famille ignatienne */}
            <section className="py-12 bg-blue-50 rounded-xl">
              <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">
                  La Famille Ignatienne
                </h2>
                <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
                  La spiritualité ignatienne s'étend bien au-delà de la Compagnie de Jésus à travers de nombreux mouvements et congrégations qui partagent l'héritage de Saint Ignace.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {familleIgnatienne.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-xl overflow-hidden shadow-md"
                    >
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl font-bold text-blue-800 mb-3">{item.name}</h3>
                        <p className="text-slate-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </TabsContent>

          {/* CONTENU ONGLET 4: SPIRITUALITÉ */}
          <TabsContent value="spiritualite" className="space-y-12">
            {/* Valeurs et principes */}
            <section className="bg-gradient-to-b from-emerald-50 to-white py-12 rounded-xl">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-6 text-emerald-800">
                  Valeurs et Principes
                </h2>
                <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
                  La spiritualité ignatienne repose sur des valeurs fondamentales qui guident l'action des Jésuites et de ceux qui s'inspirent de Saint Ignace.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {values.map((value, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 p-6"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-emerald-100 p-3 rounded-full">
                          <value.icon className="h-6 w-6 text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-bold text-emerald-800">{value.title}</h3>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{value.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Préférences apostoliques */}
            <section className="py-12 bg-white rounded-xl shadow-md">
              <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">
                  Préférences Apostoliques Universelles (2019-2029)
                </h2>
                <p className="text-center text-slate-600 max-w-2xl mx-auto mb-10">
                  Ces quatre orientations majeures guident l'action des Jésuites dans le monde entier pour les dix prochaines années.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {missions.map((mission, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-gradient-to-r from-slate-50 to-white rounded-xl p-6 shadow-md border border-slate-200"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <mission.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">{mission.title}</h3>
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        {mission.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Citation et CTA */}
            <section className="py-12 bg-gradient-to-r from-amber-100 to-amber-50 rounded-xl">
              <div className="max-w-4xl mx-auto px-4 text-center">
                <blockquote className="text-xl italic text-amber-800 mb-6">
                  "Un feu allumé en un seul cœur peut embraser le monde entier."
                </blockquote>
                <p className="text-right text-amber-700 font-medium mb-10">— Saint Ignace de Loyola</p>
                
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <Button asChild variant="default" className="bg-amber-600 hover:bg-amber-700 text-white">
                    <a 
                      href="https://www.jesuits.global" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center"
                    >
                      Site officiel des Jésuites
                      <Globe className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">
                    <Link to="/contact">
                      Nous contacter
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </section>

      {/* Footer / Legacy section */}
      <section className="bg-slate-100 py-12 text-center">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">Héritage Jésuite</h2>
          <p className="text-slate-600 mb-6">
            Les Jésuites influencent le monde par leur rigueur intellectuelle et leur engagement, inspirant des millions de personnes à travers leurs œuvres éducatives, pastorales et sociales. Leur héritage continue de se développer à travers de nombreuses institutions et mouvements dans le monde entier.
          </p>
        </div>
      </section>
    </div>
  );
};

export default JesuitesPage;
