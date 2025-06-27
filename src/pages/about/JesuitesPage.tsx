/**
 * JesuitesPage.tsx - Version redesignée et optimisée
 * 
 * Cette page présente l'histoire et l'héritage de la Compagnie de Jésus (les Jésuites)
 * Structure de la page :
 * - Introduction visuelle et spirituelle à la Compagnie de Jésus
 * - Onglets thématiques pour une navigation claire :
 *   1. Histoire et mission (chronologie, fondation, évolution)
 *   2. Figures emblématiques (fondateurs, saints, leaders importants)
 *   3. Communautés et œuvres (présence mondiale et au Bénin)
 *   4. Spiritualité ignatienne (valeurs, pratiques, exercices spirituels)
 * 
 * Sources : jesuites.global, jesuites.com, ignatianspirituality.com
 * 
 * @version 2.0
 * @lastUpdate 2025-06-27
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
  Flame,       // Flamme spirituelle
  ExternalLink,// Lien externe
  Info         // Information
} from 'lucide-react';
import { motion } from 'framer-motion';

// Type pour les onglets principaux
type TabType = 'histoire' | 'figures' | 'communautes' | 'spiritualite';

/**
 * Composant principal JesuitesPage
 * Version refactorisée sans doublons et avec une structure plus claire
 */
const JesuitesPage = () => {
  // État pour la navigation par onglets
  const [activeTab, setActiveTab] = useState<TabType>('histoire');
  
  // Animation variants pour les effets visuels
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  // Animation pour les éléments de liste
  const listAnimation = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.1, duration: 0.5 }
    })
  };

  // Figures emblématiques des Jésuites 
  // (fusion des anciennes sections figures, saints et autres mentions)
  const jesuitValues = [
    { 
      icon: Star, 
      title: "Magis", 
      description: "Rechercher l'excellence pour la plus grande gloire de Dieu, en visant le 'davantage' dans chaque action." 
    },
    { 
      icon: Target, 
      title: "Discernement", 
      description: "Prendre des décisions éclairées par la prière et la réflexion spirituelle pour rechercher la volonté divine." 
    },
    { 
      icon: Heart, 
      title: "Solidarité", 
      description: "Servir les pauvres et les exclus avec un amour enraciné dans la justice et la dignité humaine." 
    },
    { 
      icon: Cross, 
      title: "Service", 
      description: "Se consacrer au Christ et à l'Église universelle avec générosité et obéissance." 
    },
  ];

  // Préférences apostoliques universelles - missions actuelles des Jésuites
  const apostolicPreferences = [
    { 
      icon: Cross, 
      title: "Chemin vers Dieu", 
      description: "Guider les âmes à travers les Exercices spirituels et le discernement ignatien." 
    },
    { 
      icon: Heart, 
      title: "Marcher avec les exclus", 
      description: "Promouvoir la réconciliation et la justice auprès des pauvres et des marginalisés." 
    },
    { 
      icon: Users, 
      title: "Accompagner les jeunes", 
      description: "Former une jeunesse porteuse d'espoir pour un avenir meilleur." 
    },
    { 
      icon: Leaf, 
      title: "Sauvegarde de la Création", 
      description: "Protéger notre 'Maison commune' via une écologie intégrale (Laudato Si)." 
    },
  ];

  // Chronologie historique
  const timelineEvents = [
    { 
      year: "1491", 
      desc: "Naissance d'Ignace de Loyola au château de Loyola, dans le Pays basque espagnol." 
    },
    { 
      year: "1521", 
      desc: "Blessure d'Ignace à la bataille de Pampelune, début de sa conversion spirituelle pendant sa convalescence." 
    },
    { 
      year: "1522-1523", 
      desc: "Retraite à Manrèse où Ignace vit une expérience spirituelle profonde et commence à rédiger les Exercices Spirituels." 
    },
    { 
      year: "1534", 
      desc: "Vœux de Montmartre à Paris avec ses premiers compagnons (Xavier, Favre, etc.)." 
    },
    { 
      year: "1540", 
      desc: "Fondation officielle de la Compagnie de Jésus, approuvée par la bulle Regimini militantis Ecclesiae du pape Paul III." 
    },
    { 
      year: "1548", 
      desc: "Publication officielle des Exercices Spirituels d'Ignace, approuvés par le pape Paul III." 
    },
    { 
      year: "1556", 
      desc: "Mort d'Ignace de Loyola à Rome, la Compagnie compte déjà plus de 1000 membres." 
    },
    { 
      year: "1773", 
      desc: "Suppression de la Compagnie de Jésus par le pape Clément XIV sous pressions politiques." 
    },
    { 
      year: "1814", 
      desc: "Rétablissement des Jésuites par le pape Pie VII." 
    },
    { 
      year: "2013", 
      desc: "Élection du pape François, premier jésuite à devenir pape." 
    },
    { 
      year: "2021-2022", 
      desc: "Année ignatienne célébrant les 500 ans de la conversion d'Ignace." 
    },
  ];

  // Figures emblématiques - fusion sans doublons des figures historiques et saints
  const keyFigures = [
    { 
      id: 1,
      name: "Saint Ignace de Loyola", 
      title: "Fondateur de la Compagnie",
      dates: "1491-1556",
      description: "Ancien soldat basque converti après une blessure au combat, il est l'auteur des Exercices Spirituels et le fondateur de la Compagnie de Jésus en 1540. Sa méthode de discernement spirituel a transformé d'innombrables vies.",
      image: "/img/saint-ignac.jpeg",
      canonisation: "Canonisé en 1622" 
    },
    { 
      id: 2,
      name: "Saint François Xavier", 
      title: "Apôtre des Indes",
      dates: "1506-1552",
      description: "Missionnaire pionnier en Asie (Inde, Japon, Chine), il a baptisé des milliers de personnes et établi de nombreuses communautés chrétiennes. Patron des missions, il incarne le zèle apostolique jésuite.",
      image: "/img/francois-xavier.jpeg",
      canonisation: "Canonisé en 1622" 
    },
    { 
      id: 3,
      name: "Saint Pierre Favre", 
      title: "Premier prêtre jésuite",
      dates: "1506-1546",
      description: "Premier compagnon d'Ignace ordonné prêtre, il était connu pour sa douceur et son talent de guide spirituel. Son journal spirituel reste une référence de la spiritualité ignatienne.",
      image: "/img/pierre-favre.jpeg",
      canonisation: "Canonisé en 2013" 
    },
    {
      id: 4,
      name: 'Saint Robert Bellarmin',
      title: "Cardinal et Docteur de l'Église",
      dates: "1542-1621",
      description: 'Théologien brillant et défenseur de la foi pendant la Contre-Réforme. Il fut un soutien important de Galilée malgré leurs désaccords.',
      image: '/img/saints/bellarmin.jpg',
      canonisation: "Canonisé en 1930"
    },
    {
      id: 5,
      name: 'Saint Jean de Brébeuf',
      title: 'Martyr du Canada',
      dates: "1593-1649",
      description: 'Missionnaire auprès des Hurons au Canada, il fut martyrisé en 1649. Son respect pour la culture amérindienne et son courage face au martyre sont exemplaires.',
      image: '/img/saints/brebeuf.jpg',
      canonisation: "Canonisé en 1930"
    },
    { 
      id: 6,
      name: "Pape François", 
      title: "Premier pape jésuite",
      dates: "né en 1936",
      description: "Jorge Mario Bergoglio est le premier jésuite à devenir pape (2013). Il promeut une Église en sortie, proche des pauvres, et défend une écologie intégrale dans la tradition jésuite.",
      image: "/img/pape-francois.jpeg"
    },
    { 
      id: 7,
      name: "Pedro Arrupe", 
      title: "Supérieur général visionnaire",
      dates: "1907-1991",
      description: "Figure marquante du renouveau jésuite après Vatican II (1965-1983), il a réorienté la mission jésuite vers le service de la foi et la promotion de la justice sociale.",
      image: "/img/pedro-arrupe.jpeg"
    },
  ];

  // Héritage spirituel de Saint Ignace
  const spiritualLegacy = [
    {
      icon: Book,
      title: "Exercices Spirituels",
      description: "Méthode de discernement spirituel pour découvrir la volonté de Dieu dans sa vie à travers la méditation, la contemplation et la prière."
    },
    {
      icon: Heart,
      title: "Contemplation dans l'Action",
      description: "Trouver Dieu dans toutes choses et toutes choses en Dieu, unissant vie active et contemplative."
    },
    {
      icon: Globe,
      title: "Service de la Foi et Promotion de la Justice",
      description: "Une foi qui fait la justice, engagement concret pour transformer les structures injustes."
    },
    {
      icon: Cross,
      title: "Ad Majorem Dei Gloriam",
      description: "Pour la plus grande gloire de Dieu - devise qui inspire chaque œuvre et mission jésuite."
    }
  ];

  // SECTION COMMUNAUTÉS - Communautés jésuites importantes
  const communautes = [
    {
      id: 1,
      name: 'Communauté du CREC',
      location: 'Cotonou, Bénin',
      description: 'Centre de recherche et de formation, le CREC forme des leaders chrétiens et soutient la recherche théologique en Afrique de l\'Ouest.',
      icon: Book,
      image: '/img/crec2.png'
    },
    {
      id: 2,
      name: "Province d'Europe Occidentale Francophone",
      location: "France, Belgique, Luxembourg",
      description: "Regroupant plus de 500 jésuites, cette province coordonne des œuvres éducatives, pastorales et sociales dans l'espace francophone européen.",
      icon: Globe,
      image: "/img/eglise.png"
    },
    {
      id: 3,
      name: 'Province de l\'Afrique de l\'Ouest',
      location: 'Afrique de l\'Ouest',
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
      description: 'Propose aux jeunes de 7 à 18 ans un chemin de croissance humaine et spirituelle dans l\'esprit ignatien.',
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
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen">
      {/* Hero Section modernisé avec parallax et animation */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-crec-darkblue/90 via-crec-darkblue/80 to-black/90" />
        <div className="min-h-[550px] flex flex-col items-center justify-center text-center relative text-white p-6">
          <div className="absolute inset-0 z-[-1] bg-[url('/img/eglise.png')] bg-cover bg-center bg-fixed opacity-70" />
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto bg-gradient-to-br from-black/60 to-crec-darkblue/50 p-10 rounded-xl backdrop-blur-sm border border-white/10 shadow-2xl"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-crec-gold text-sm uppercase tracking-widest mb-2 flex items-center justify-center"
            >
              <span className="w-12 h-[1px] bg-crec-gold mr-3"></span>
              Ad Majorem Dei Gloriam
              <span className="w-12 h-[1px] bg-crec-gold ml-3"></span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-5xl md:text-6xl font-bold mb-5"
            >
              <span className="bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                La Compagnie de Jésus
              </span>
            </motion.h1>
            
            <div className="w-24 h-1 bg-crec-gold mx-auto mb-6"></div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl mb-6 text-slate-100 leading-relaxed"
            >
              Fondée en 1540 par Saint Ignace de Loyola, les Jésuites servent la foi, promeuvent la justice et dialoguent avec les cultures dans <strong>112 pays</strong>, sous la devise <em>Pour la plus grande gloire de Dieu</em>.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex justify-center mt-8"
            >
              <Cross className="text-crec-gold h-10 w-10 opacity-85" />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Divider décoratif */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px]" fill="#f8fafc">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,213.35,56.44Z" />
          </svg>
        </div>
      </section>

      {/* Introduction courte */}
      <section className="py-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center mb-4"
          >
            <span className="px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-sm font-medium">
              Une tradition séculaire, une mission moderne
            </span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-lg text-slate-700 leading-relaxed"
          >
            La Compagnie de Jésus représente le plus grand ordre religieux catholique masculin. Aujourd'hui, plus de <strong>14 000 jésuites</strong> œuvrent dans les domaines de l'éducation, la recherche, l'accompagnement spirituel et l'action sociale à travers le monde, dont au Bénin.
          </motion.p>
        </div>
      </section>

      {/* Système d'onglets principal - modernisé */}
      <section className="pb-16 container mx-auto px-4">
        <Tabs 
          defaultValue="histoire" 
          className="w-full"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as TabType)}
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8 w-full rounded-xl bg-slate-100 p-1.5">
            <TabsTrigger value="histoire" className="text-base rounded-lg">
              <Calendar className="w-5 h-5 mr-2" /> 
              Histoire
            </TabsTrigger>
            <TabsTrigger value="figures" className="text-base rounded-lg">
              <Award className="w-5 h-5 mr-2" />
              Figures
            </TabsTrigger>
            <TabsTrigger value="communautes" className="text-base rounded-lg">
              <Users className="w-5 h-5 mr-2" />
              Communautés
            </TabsTrigger>
            <TabsTrigger value="spiritualite" className="text-base rounded-lg">
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
