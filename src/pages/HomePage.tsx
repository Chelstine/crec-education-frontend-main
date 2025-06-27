import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Banner from '@/components/common/Banner';
import SectionTitle from '@/components/common/SectionTitle';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { useMultipleContent } from '@/services/contentService';
import { Leaf, Gavel, Users, BookOpen, GraduationCap, Library, ChevronRight, Globe, Award, Mail } from 'lucide-react';


const HomePage = () => {
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const [activeTab, setActiveTab] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate images every 5 seconds
  const heroImages = [
    '/img/crec1.jpg',
    '/img/crec2.png',
    '/img/crec3.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % heroImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

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
  const formations = [
    {
      id: 1,
      title: "Formation Universitaire",
      subtitle: "Institut Supérieur de Technologie Matteo Ricci",
      description: "Une formation complète et rigoureuse dans les domaines technologiques avec une approche éthique et humaniste. Première promotion 2025-2026.",
      image: '/img/crec3.jpg',
      link: '/formations/university',
      icon: <GraduationCap className="h-12 w-12 text-amber-600" />,
      color: "from-amber-500/20 to-amber-600/30"
    },
    {
      id: 2,
      title: "Formations Ouvertes",
      subtitle: "Programmes accessibles à tous",
      description: "Des formations courtes et pratiques pour développer des compétences spécifiques et répondre aux besoins immédiats du marché.",
      image: '/img/formation.png',
      link: '/formations/ouvertes',
      icon: <Users className="h-12 w-12 text-blue-600" />,
      color: "from-blue-500/20 to-blue-600/30"
    },
    {
      id: 3,
      title: "FabLab",
      subtitle: "Centre d'innovation et de créativité",
      description: "Un espace équipé pour transformer vos idées en prototypes et développer des projets technologiques innovants.",
      image: '/img/fablab.png',
      link: '/formations/fablab',
      icon: <Award className="h-12 w-12 text-emerald-600" />,
      color: "from-emerald-500/20 to-emerald-600/30"
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

  // Sections pour la navigation par onglets
  const tabSections = [
    { icon: <BookOpen className="w-5 h-5" />, label: "Mission" },
    { icon: <GraduationCap className="w-5 h-5" />, label: "Éducation" },
    { icon: <Globe className="w-5 h-5" />, label: "Innovation" }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Hero totalement repensé, design smooth, soft et élégant */}
      <div className="relative min-h-[75vh] max-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-slate-50">
        {/* Diaporama d'images avec transition fluide (crossfade sans blanc) */}
        <div className="absolute inset-0 w-full h-full">
          {heroImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: i === currentImageIndex ? 1 : 0 }}
              animate={{ opacity: i === currentImageIndex ? 1 : 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url('${img}')`, zIndex: i === currentImageIndex ? 2 : 1 }}
            />
          ))}
          {/* Overlay léger pour préserver la visibilité des images */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
        </div>
        {/* Contenu central */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 py-16">
          {/* Badge localité moderne */}
          <span className="inline-flex items-center px-4 py-1.5 mb-5 rounded-full bg-white/90 shadow-lg backdrop-blur-sm text-slate-800 font-medium text-base tracking-wide border border-white/50">
            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
            GODOMEY, BÉNIN
          </span>
          {/* Titre principal élégant */}
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg tracking-tight text-center">
            Centre de Recherche, d'Étude<br className="hidden md:block" />
            <span className="block text-2xl md:text-4xl font-light text-blue-100 mt-2">et de Créativité</span>
          </h1>
          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 py-4 bg-emerald-500/90 hover:bg-emerald-600 text-white font-semibold shadow-xl border border-emerald-400/30 transition-all duration-300 text-lg backdrop-blur-sm"
            >
              <Link to="#formations">
                Découvrir nos formations
              </Link>
            </Button>
          </div>
        
          {/* Indicateurs interactifs du diaporama */}
          <div className="flex space-x-3 mt-8">
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImageIndex(i)}
                aria-label={`Voir image ${i + 1}`}
                title={`Image ${i + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === currentImageIndex 
                    ? 'bg-white shadow-lg scale-125' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Section À propos avec design modernisé */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50/70 relative overflow-hidden">
        {/* Motif décoratif en arrière-plan */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="diagonalLines" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="40" stroke="#334155" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diagonalLines)" />
          </svg>
        </div>
        
        {/* Accent circulaire */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute left-0 bottom-0 w-[500px] h-[500px] rounded-full bg-blue-400/10 blur-3xl"
        />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-16 items-center"
            >
              <motion.div variants={fadeInUp}>
                <motion.div 
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-medium text-sm mb-6 shadow-sm border border-blue-100"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                  <span>Notre mission</span>
                </motion.div>

                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-bold leading-tight mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
                >
                  Bienvenue au CREC
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-lg text-slate-600 mb-8 leading-relaxed"
                >
                  <span className="text-crec-darkblue font-semibold">Fondée sur des valeurs jésuites</span>, notre institution s'engage à offrir une formation intégrale de la personne, alliant excellence académique et développement humain pour servir la société congolaise et africaine.
                </motion.p>

                {/* Navigation par onglets */}
                <div className="mb-8">
                  <div className="flex space-x-2 md:space-x-4 mb-6 border-b border-slate-200">
                    {tabSections.map((tab, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTab(idx)}
                        className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors duration-200 border-b-2 ${
                          activeTab === idx 
                            ? 'text-crec-gold border-crec-gold' 
                            : 'text-slate-500 border-transparent hover:text-slate-700'
                        }`}
                      >
                        {tab.icon} {tab.label}
                      </button>
                    ))}
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {activeTab === 0 && (
                        <p className="text-slate-600">
                          Le CREC incarne la mission éducative, sociale et spirituelle des Jésuites, 
                          en formant des personnes compétentes, responsables et engagées au service 
                          du bien commun dans un monde en constante évolution.
                        </p>
                      )}
                      {activeTab === 1 && (
                        <p className="text-slate-600">
                          Nos programmes éducatifs, inspirés par la tradition pédagogique ignatienne, 
                          favorisent l'excellence académique et le développement de la personne 
                          dans toutes ses dimensions : intellectuelle, spirituelle et sociale.
                        </p>
                      )}
                      {activeTab === 2 && (
                        <p className="text-slate-600">
                          À travers notre approche innovante de l'enseignement et de la recherche, 
                          nous encourageons la créativité et l'esprit critique pour répondre aux défis 
                          contemporains de notre société avec discernement et audace.
                        </p>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <Button asChild variant="outline" className="border-crec-gold text-crec-darkblue hover:bg-crec-gold hover:text-white group">
                    <Link to="/about" className="flex items-center">
                      En savoir plus
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-200">
                  <img 
                    src='/img/crec2.png'
                    alt="Église Jésuite" 
                    className="w-full max-w-full h-auto object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-slate-900/0"></div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-crec-gold to-amber-600 p-6 rounded-2xl shadow-xl">
                  <motion.p 
                    className="text-white font-bold"
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      delay: 0.2 
                    }}
                  >
                    <span className="block text-4xl">{new Date().getFullYear() - 2013}</span>
                    <span className="block text-sm mt-1">années d'existence</span>
                  </motion.p>
                </div>
                
                <div className="absolute -top-8 -left-8">
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                    <p className="text-slate-600 italic text-sm">
                      "L'éducation est l'arme la plus puissante pour changer le monde"
                    </p>
                    <p className="text-sm text-slate-500 mt-2 font-medium">— Nelson Mandela</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section formations - design modernisé avec cartes élégantes */}
      <section className="py-16 bg-slate-50 relative" id="formations">
        {/* Accent décoratif */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          transition={{ duration: 1 }}
          className="absolute top-0 right-0 w-full h-32 bg-gradient-to-b from-amber-100/30 to-transparent"
        />
        
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 0.05, x: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute -left-24 top-1/4 w-64 h-64 rounded-full border-[30px] border-amber-400"
          />
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 0.05, x: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute -right-32 bottom-1/3 w-80 h-80 rounded-full border-[40px] border-amber-600"
          />
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex justify-center"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-50 text-amber-700 font-medium mb-6 shadow-sm border border-amber-100">
                <span className="w-2 h-2 rounded-full bg-amber-500 mr-2 animate-pulse"></span>
                <span>Première promotion 2025-2026</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-700 via-crec-gold to-amber-500 bg-clip-text text-transparent">
                Nos Formations
              </h2>
              <p className="text-lg text-slate-600 mb-12 leading-relaxed">
                Le CREC vous propose plusieurs voies pour développer vos compétences
                dans un cadre fondé sur l'excellence académique et les valeurs humaines.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {formations.map((formation) => (
                <motion.div
                  key={formation.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: formation.id * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group h-full flex flex-col border border-slate-100"
                  whileHover={{ y: -5 }}
                >
                  <div className="relative h-60 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${formation.color} opacity-60 z-10`}></div>
                    <img 
                      src={formation.image} 
                      alt={formation.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent z-20 flex items-end">
                      <div className="p-6 text-white">
                        <h3 className="text-2xl font-bold drop-shadow-lg">{formation.title}</h3>
                        <p className="text-white/90 mt-1 drop-shadow">{formation.subtitle}</p>
                      </div>
                    </div>
                    <motion.div 
                      className="absolute top-5 right-5 bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg z-30"
                      initial={{ scale: 0.8, rotate: -10 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {formation.icon}
                    </motion.div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-slate-600 mb-8 flex-1 leading-relaxed">{formation.description}</p>
                    <Link 
                      to={formation.link}
                      className="mt-auto inline-flex items-center justify-between bg-gradient-to-r from-white to-slate-50 hover:to-slate-100 text-slate-800 font-semibold px-5 py-3 rounded-xl border border-slate-200 group-hover:border-slate-300 transition-all shadow-sm hover:shadow"
                    >
                      <span>Découvrir le programme</span>
                      <ChevronRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nouvelle section Bibliothèque complètement repensée */}
      <section className="py-14 bg-gradient-to-b from-slate-900 via-crec-darkblue to-slate-900 text-white relative overflow-hidden">
        {/* Animation de particules en forme de lettres en arrière-plan */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              <defs>
                <pattern id="booksPattern" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(5)">
                  <text x="0" y="15" fontSize="12" fill="white">A</text>
                  <text x="20" y="25" fontSize="14" fill="white">B</text>
                  <text x="40" y="10" fontSize="16" fill="white">C</text>
                  <text x="10" y="40" fontSize="10" fill="white">D</text>
                  <text x="30" y="50" fontSize="18" fill="white">E</text>
                  <text x="50" y="35" fontSize="12" fill="white">F</text>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#booksPattern)" />
            </svg>
          </div>
        </div>

        {/* Effets lumineux */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="absolute top-10 right-0 w-1/3 h-2/3 bg-gradient-to-l from-indigo-500/20 to-transparent blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-t from-crec-gold/25 to-transparent blur-3xl"
        />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Titre de la section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-12"
            >
              <div className="flex justify-center mb-6">
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-4 shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                >
                  <Library className="h-8 w-8 text-white" />
                </motion.div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white via-blue-100 to-slate-200 bg-clip-text text-transparent">
                Bibliothèque du CREC
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Un patrimoine intellectuel exceptionnel au service de la formation, de la recherche et du développement personnel
              </p>
            </motion.div>
            
            {/* Contenu principal */}
            <div className="grid md:grid-cols-5 gap-8 items-start">
              {/* Colonne principale avec image en arrière-plan */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="md:col-span-3 relative rounded-2xl overflow-hidden min-h-[450px] shadow-2xl"
              >
                <div className="absolute inset-0">
                  <img 
                    src="/img/crec2.png" 
                    alt="Bibliothèque du CREC" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/20"></div>
                </div>
                
                <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                  <div className="bg-slate-900/80 backdrop-blur-sm p-6 rounded-xl border border-slate-800">
                    <h3 className="text-2xl font-bold text-white mb-4">Un trésor de connaissances</h3>
                    <p className="text-slate-300 mb-6">
                      Notre bibliothèque abrite une collection de plus de <span className="text-crec-gold font-semibold">20 000 ouvrages</span> spécialisés, des ressources numériques et des périodiques internationaux, offrant un accès privilégié au savoir dans de nombreux domaines.
                    </p>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                      {[
                        { name: "Théologie", color: "bg-blue-600/20 border-blue-600/40", icon: "✝️" },
                        { name: "Philosophie", color: "bg-purple-600/20 border-purple-600/40", icon: "🧠" },
                        { name: "Sciences", color: "bg-green-600/20 border-green-600/40", icon: "🔬" },
                        { name: "Technologie", color: "bg-amber-600/20 border-amber-600/40", icon: "💻" },
                        { name: "Spiritualité", color: "bg-indigo-600/20 border-indigo-600/40", icon: "✨" },
                        { name: "Littérature", color: "bg-rose-600/20 border-rose-600/40", icon: "📚" }
                      ].map((category, idx) => (
                        <div 
                          key={idx} 
                          className={`flex items-center gap-2 p-2 rounded-lg ${category.color} border`}
                        >
                          <span className="text-xl">{category.icon}</span>
                          <span className="text-sm font-medium">{category.name}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-crec-gold">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                      </svg>
                      <span>
                        Couvrant les disciplines fondamentales et spécialisées pour les étudiants, chercheurs et professionnels
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Colonne de droite avec services et informations */}
              <div className="md:col-span-2 flex flex-col gap-6">
                {/* Horaires et accès */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-crec-gold/20 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-crec-gold">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">Horaires d'ouverture</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-slate-700/30">
                      <span className="font-medium text-slate-300">Lundi - Vendredi</span>
                      <span className="text-crec-gold">08:30 - 18:30</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-700/30">
                      <span className="font-medium text-slate-300">Samedi</span>
                      <span className="text-crec-gold">08:30 - 12:00</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="font-medium text-slate-300">Dimanche</span>
                      <span className="text-slate-400">Fermé</span>
                    </div>
                  </div>
                </motion.div>
                
                {/* Services offerts */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-indigo-900/40 to-slate-900/80 backdrop-blur-sm rounded-xl p-4 border border-indigo-800/30 shadow-lg"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-blue-500/20 p-1.5 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-white">Services</h3>
                  </div>
                  
                  <ul className="space-y-1.5 mb-2 text-sm">
                    {[
                      "Espaces de travail silencieux",
                      "Prêts d'ouvrages et consultation",
                      "Wi-Fi et postes informatiques",
                     
                    ].map((service, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-slate-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-1 pt-2 border-t border-slate-700/30">
                    <p className="text-xs text-slate-400 italic">
                      "Un espace d'exploration intellectuelle et de développement personnel."
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Écologie section avec design amélioré et compact */}
      <section className="py-14 bg-gradient-to-b from-white to-emerald-50 relative overflow-hidden">
        {/* Accent visuel */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="absolute -right-20 top-20 w-80 h-80 rounded-full bg-emerald-400/10 blur-3xl"
        />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ rotate: 180, scale: 0 }}
                whileInView={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-emerald-500 p-4 rounded-xl shadow-lg"
              >
                <Leaf className="h-7 w-7 text-white" />
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-emerald-800">
                Écologie Intégrale
              </h2>
              <p className="text-base text-slate-600 mx-auto max-w-2xl">
                Le CREC s'engage dans la réflexion et l'action pour la protection de notre environnement, 
                inspiré par l'encyclique Laudato Si' du Pape François.
              </p>
            </motion.div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl shadow-lg border border-emerald-100 p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-emerald-100 p-3 rounded-full flex items-center justify-center shrink-0">
                    <Leaf className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2 text-emerald-700">Développement durable</h4>
                    <p className="text-slate-600 text-sm">
                      Nous encourageons chacun à devenir acteur du changement à travers des formations 
                      et des projets collaboratifs pour un monde plus durable.
                    </p>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-emerald-100 p-3 rounded-full flex items-center justify-center shrink-0">
                    <Globe className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2 text-emerald-700">Conscience globale</h4>
                    <p className="text-slate-600 text-sm">
                      "Tout est lié, et la protection de notre vie est inséparable de la fraternité 
                      et de la justice." — Pape François
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gouvernance section avec design amélioré et compact */}
      <section className="py-14 bg-white relative overflow-hidden">
        {/* Accent visuel */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="absolute -left-20 top-20 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl"
        />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0, y: 20 }}
                whileInView={{ scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-blue-500 p-4 rounded-xl shadow-lg"
              >
                <Gavel className="h-7 w-7 text-white" />
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-800">
                Gouvernance Éthique
              </h2>
              <p className="text-base text-slate-600 mx-auto max-w-2xl">
                Le CREC développe une éthique responsable dans la gestion des organisations et forme 
                les leaders de demain capables d'allier performance et responsabilité.
              </p>
            </motion.div>
            
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg border border-blue-100 p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Intégrité", desc: "Dans toutes les décisions", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg> },
                  { label: "Responsabilité", desc: "Sociale", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg> },
                  { label: "Justice", desc: "Équité", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" /></svg> },
                  { label: "Subsidiarité", desc: "Compétences", icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg> }
                ].map((value, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center p-3"
                  >
                    <div className="bg-blue-100 p-2.5 rounded-full mb-2 text-blue-600">
                      {value.icon}
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">{value.label}</h4>
                    <p className="text-slate-500 text-xs">{value.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partenaires section avec design élégant et moderne */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        {/* Accent décoratif */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="partnersPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="#475569" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#partnersPattern)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center"
            >
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 font-medium text-sm mb-6 shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-slate-500 mr-2 animate-pulse"></span>
                <span>Collaborations</span>
              </motion.div>
              
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Nos Partenaires
              </h2>
              <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                Le CREC collabore avec des institutions de renom pour enrichir ses programmes et 
                offrir les meilleures opportunités à ses étudiants.
              </p>
            </motion.div>
            
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
              {partners.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="flex flex-col items-center group"
                  whileHover={{ y: -5 }}
                >
                  {partner.link ? (
                    <a 
                      href={partner.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex flex-col items-center transition-transform duration-300"
                      title={partner.description}
                    >
                      <div className="bg-white py-5 px-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100">
                        <img 
                          src={partner.logo} 
                          alt={partner.name} 
                          className="h-16 sm:h-20 w-auto max-w-full object-contain crec-partner-logo-img"
                        />
                      </div>
                      <span className="text-sm text-slate-600 mt-3 text-center font-medium">
                        {partner.name}
                      </span>
                    </a>
                  ) : (
                    <div className="flex flex-col items-center" title={partner.description}>
                      <div className="bg-white py-5 px-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100">
                        <img 
                          src={partner.logo} 
                          alt={partner.name} 
                          className="h-16 sm:h-20 w-auto max-w-full object-contain crec-partner-logo-img"
                        />
                      </div>
                      <span className="text-sm text-slate-600 mt-3 text-center font-medium">
                        {partner.name}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default HomePage;