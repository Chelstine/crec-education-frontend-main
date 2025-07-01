import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Leaf, Gavel, Users, ExternalLink, BookOpen, Award, Heart, ChevronLeft, ChevronRight, ArrowRight, Calendar, Globe, Library } from 'lucide-react';
import SectionTitle from '@/components/common/SectionTitle';
import Banner from '@/components/common/Banner';


const HomePage = () => {
  const { t } = useLanguage();

  // Contenu statique (à remplacer par un CMS dans le futur)
  const content = {
    home_hero_title: "Centre de Recherche, d'Étude et de Créativité",
    home_hero_subtitle: "Formation, Recherche et Accompagnement pour une éducation intégrale fondée sur des valeurs chrétiennes.",
    home_hero_description: "Découvrir nos formations",
    home_formations_title: "Nos Formations",
    home_formations_subtitle: "Une éducation de qualité pour tous",
    home_formations_description: "Le CREC propose des formations universitaires et ouvertes, ainsi qu'un espace FabLab pour développer la créativité et l'innovation.",
    home_university_title: "Formations Universitaires",
    home_university_description: "Programmes académiques rigoureux alliant excellence et valeurs humaines.",
    home_open_formations_title: "Formations Ouvertes",
    home_open_formations_description: "Formations courtes et spécialisées ouvertes à tous.",
    home_fablab_title: "FabLab",
    home_fablab_description: "Espace de création et d'innovation technologique.",
    home_partners_title: "Nos Partenaires",
    home_partners_subtitle: "Ensemble pour l'excellence",
    home_stats_experience_number: "12+",
    home_stats_experience_text: "Années d'expérience"
  };

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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

      {/* Statistiques en vedette */}
      <section className="py-8 -mt-16 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-center w-12 h-12 bg-crec-gold rounded-full mb-4 mx-auto">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-crec-darkblue text-center">12+</h3>
              <p className="text-crec-darkgray text-center">Années d'expérience</p>
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-center w-12 h-12 bg-crec-gold rounded-full mb-4 mx-auto">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-crec-darkblue text-center">500+</h3>
              <p className="text-crec-darkgray text-center">Étudiants formés</p>
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-center w-12 h-12 bg-crec-gold rounded-full mb-4 mx-auto">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-crec-darkblue text-center">3+</h3>
              <p className="text-crec-darkgray text-center">Partenaires majeurs</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* À propos section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-crec-offwhite to-white"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="w-1 h-12 bg-gradient-to-b from-crec-gold to-crec-lightgold rounded-full mr-4"></div>
                <SectionTitle 
                  title="Bienvenue au CREC"
                  subtitle="Une institution engagée dans la formation intégrale de la personne."
                />
              </div>
              <div className="prose prose-lg text-crec-darkgray space-y-4">
                <p className="text-lg leading-relaxed">
                  <span className="text-2xl">✝️</span> <strong>Les Jésuites et le CREC</strong>
                </p>
                <p className="leading-relaxed">
                  Depuis sa fondation, la Compagnie de Jésus s'est engagée dans l'éducation à travers le 
                  monde avec une pédagogie rigoureuse et humaniste. Cet engagement a donné 
                  naissance à de nombreuses institutions académiques d'excellence.
                </p>
                <p className="leading-relaxed">
                  C'est dans cette tradition que le CREC (Centre de Recherche d'Étude et de Créativité) a été fondé
                  au Bénin en 2012. Il incarne la mission éducative, sociale et spirituelle des Jésuites à travers des actions concrètes :
                </p>
                <div className="grid grid-cols-1 gap-4 mt-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-crec-gold rounded-full"></div>
                    <span>🔎 <strong>Recherche & Innovation</strong></span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-crec-gold rounded-full"></div>
                    <span>🎓 <strong>Formation universitaire et ouverte, & Accompagnement</strong></span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-crec-gold rounded-full"></div>
                    <span>🌍 <strong>Gouvernance éthique & écologie intégrale</strong></span>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Button asChild variant="default" className="bg-gradient-to-r from-crec-gold to-crec-lightgold hover:from-crec-lightgold hover:to-crec-gold text-white shadow-lg">
                  <Link to="/about" className="flex items-center">
                    En savoir plus sur nous
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-crec-gold/20 to-transparent z-10"></div>
                <img 
                  src='/img/crec2.png'
                  alt="Église Jésuite" 
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-crec-gold to-crec-lightgold p-6 rounded-2xl shadow-xl">
                <div className="text-white text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-2 mx-auto">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <span className="block text-3xl font-bold">{content.home_stats_experience_number}</span>
                  <span className="block text-sm mt-1 opacity-90">{content.home_stats_experience_text}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

   {/* Formations section */}
<section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative" id="formations">
  <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50"></div>
  <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <div className="flex items-center justify-center mb-6">
        <div className="w-1 h-12 bg-gradient-to-b from-crec-gold to-crec-lightgold rounded-full mr-4"></div>
        <SectionTitle 
          title={content.home_formations_title}
          subtitle={content.home_formations_subtitle}
          align="center"
        />
      </div>
      <p className="text-crec-darkgray text-lg leading-relaxed max-w-4xl mx-auto">
        {content.home_formations_description}
      </p>
    </motion.div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {courses.map((course, index) => (
        <motion.div
          key={course.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Link 
            to={course.link}
            className="group flex flex-col h-full hover:no-underline"
          >
            <div className="relative overflow-hidden rounded-t-2xl bg-white shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-crec-gold/10 to-transparent z-10"></div>
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-xl font-bold mb-2 group-hover:text-crec-lightgold transition-colors">
                  {course.title}
                </h3>
              </div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-b-2xl shadow-lg flex-1 flex flex-col border-t-4 border-crec-gold">
              <p className="text-crec-darkgray text-base mb-6 flex-1 leading-relaxed">
                {course.description.length > 120 
                  ? course.description.substring(0, 120) + '...' 
                  : course.description}
              </p>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <span className="font-semibold text-crec-darkblue group-hover:text-crec-gold transition-colors">
                  En savoir plus
                </span>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-crec-lightgold to-crec-gold flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-md">
                  <ArrowRight className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      {/* Écologie section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-emerald-50/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-4 rounded-full shadow-lg">
                <Leaf className="h-8 w-8 text-white" />
              </div>
            </div>
            <SectionTitle 
              title="Écologie Intégrale"
              subtitle="S'engager pour la sauvegarde de notre maison commune"
              align="center"
            />
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg border border-green-100">
                <h3 className="text-2xl font-bold mb-6 text-crec-darkblue flex items-center">
                  <Globe className="h-6 w-6 mr-3 text-green-500" />
                  Une conscience écologique
                </h3>
                <div className="space-y-4 text-crec-darkgray">
                  <p className="leading-relaxed">
                    Le CREC s'engage dans la réflexion et l'action pour la protection de notre environnement.
                    Nous développons des programmes qui intègrent les principes de l'écologie intégrale,
                    inspirés par l'encyclique Laudato Si', pour former des citoyens conscients et responsables.
                  </p>
                  <p className="leading-relaxed">
                    À travers des formations, des ateliers et des projets collaboratifs,
                    nous encourageons chacun à devenir acteur du changement pour un monde plus durable et solidaire.
                  </p>
                </div>
                <div className="mt-8">
                  <Button asChild variant="default" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg">
                    <Link to="/events" className="flex items-center">
                      Suivre nos événements
                      <Calendar className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent z-10"></div>
                <img 
                  src="/img/ecologie.png"
                  alt="Écologie intégrale" 
                  className="w-full h-96 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gouvernance section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-full shadow-lg">
                <Gavel className="h-8 w-8 text-white" />
              </div>
            </div>
            <SectionTitle 
              title="Gouvernance Éthique"  
              subtitle="Une éthique responsable dans la gestion des organisations"
              align="center"
            />
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent z-10"></div>
                <img 
                  src="/img/gouvernement.png" 
                  alt="Gouvernance éthique" 
                  className="w-full h-96 object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg border border-blue-100">
                <h3 className="text-2xl font-bold mb-6 text-crec-darkblue flex items-center">
                  <Users className="h-6 w-6 mr-3 text-blue-500" />
                  Éthique et leadership
                </h3>
                <div className="space-y-4 text-crec-darkgray">
                  <p className="leading-relaxed">
                    Le CREC développe des programmes de formation sur la gouvernance éthique des organisations
                    et la participation citoyenne, essentiels pour construire une société juste et inclusive.
                  </p>
                  <p className="leading-relaxed">
                    Nous formons des leaders capables d'allier performance et responsabilité, 
                    en intégrant les dimensions économiques, sociales, environnementales et spirituelles 
                    dans leur prise de décision.
                  </p>
                </div>
                <div className="mt-8">
                  <Button asChild variant="default" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg">
                    <Link to="/events" className="flex items-center">
                      Suivre nos événements
                      <Calendar className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Actualités & Événements section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 to-red-50/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-br from-orange-400 to-red-500 p-4 rounded-full shadow-lg">
                <Calendar className="h-8 w-8 text-white" />
              </div>
            </div>
            <SectionTitle 
              title="Actualités & Événements"
              subtitle="Restez informés des dernières nouvelles et des événements à venir au CREC."
              align="center"
            />
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                  <div className="relative">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 left-4 bg-crec-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {event.date}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-crec-darkblue mb-3 group-hover:text-crec-gold transition-colors">
                      {event.title}
                    </h3>
                    <Link 
                      to={event.link}
                      className="inline-flex items-center text-crec-gold hover:text-crec-darkblue font-semibold transition-colors"
                    >
                      Lire la suite
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button asChild variant="default" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg px-8 py-3">
              <Link to="/events" className="flex items-center">
                Tous les événements
                <Calendar className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Dons & Partenaires section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-br from-purple-400 to-pink-500 p-4 rounded-full shadow-lg">
                <Heart className="h-8 w-8 text-white" />
              </div>
            </div>
            <SectionTitle 
              title="Dons & Partenaires"
              subtitle="Soutenez notre mission et découvrez ceux qui nous accompagnent"
              align="center"
            />
          </motion.div>
          
          {/* Section Dons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-12 mb-16 border border-purple-100 shadow-lg"
          >
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold text-crec-darkblue mb-6">Soutenez notre mission</h3>
              <p className="text-lg text-crec-darkgray mb-8 leading-relaxed">
                Votre soutien nous permet de développer des projets éducatifs de qualité 
                et de rendre nos formations accessibles au plus grand nombre.
              </p>
              <Button asChild variant="default" className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-10 py-4 text-lg shadow-lg">
                <Link to="/donate" className="flex items-center">
                  <Heart className="mr-3 h-5 w-5" />
                  Faire un don
                </Link>
              </Button>
            </div>
          </motion.div>
          
          {/* Section Partenaires */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold mb-6 text-crec-darkblue">Nos partenaires</h3>
            <p className="text-lg text-crec-darkgray mb-12 max-w-3xl mx-auto leading-relaxed">
              Le CREC collabore avec des institutions de renom pour enrichir ses programmes et offrir les meilleures opportunités à ses étudiants.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center h-full flex flex-col">
                  {partner.link && partner.link !== "#" ? (
                    <a 
                      href={partner.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex flex-col items-center flex-1 transition-transform duration-300 hover:scale-105"
                      title={partner.description}
                    >
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-4 w-full">
                        <img 
                          src={partner.logo} 
                          alt={partner.name} 
                          className="h-16 w-auto mx-auto object-contain"
                        />
                      </div>
                      <h4 className="text-lg font-bold text-crec-darkblue mb-2 group-hover:text-crec-gold transition-colors">
                        {partner.name}
                      </h4>
                      <p className="text-sm text-crec-darkgray flex-1 leading-relaxed">
                        {partner.description}
                      </p>
                      <div className="mt-4 flex items-center text-crec-gold group-hover:text-crec-darkblue transition-colors">
                        <span className="text-sm font-semibold">Visiter le site</span>
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </div>
                    </a>
                  ) : (
                    <div className="flex flex-col items-center flex-1" title={partner.description}>
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-4 w-full">
                        <img 
                          src={partner.logo} 
                          alt={partner.name} 
                          className="h-16 w-auto mx-auto object-contain"
                        />
                      </div>
                      <h4 className="text-lg font-bold text-crec-darkblue mb-2">
                        {partner.name}
                      </h4>
                      <p className="text-sm text-crec-darkgray flex-1 leading-relaxed">
                        {partner.description}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Statistiques partenariats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-crec-darkblue to-crec-blue rounded-3xl p-12 text-white text-center"
          >
            <h4 className="text-2xl font-bold mb-6">Ensemble, nous construisons l'avenir</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-crec-gold mb-2">12+</div>
                <div className="text-lg opacity-90">Années de collaboration</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-crec-gold mb-2">100+</div>
                <div className="text-lg opacity-90">Projets réalisés</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-crec-gold mb-2">3</div>
                <div className="text-lg opacity-90">Partenaires stratégiques</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-crec-darkblue via-crec-blue to-crec-darkblue"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: "url('/img/com.png')" }}
        ></div>
        <div className="relative z-10 py-24">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Rejoignez notre communauté éducative
              </h2>
              <p className="text-xl text-white/90 mb-10 leading-relaxed">
                Devenez acteur d'une éducation transformatrice fondée sur des valeurs.
                Ensemble, construisons un avenir meilleur pour les générations futures.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button asChild variant="default" className="bg-crec-gold hover:bg-crec-lightgold text-crec-darkblue font-semibold px-8 py-4 text-lg shadow-xl">
                  <Link to="/contact" className="flex items-center">
                    <Users className="mr-3 h-5 w-5" />
                    Nous contacter
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-crec-darkblue font-semibold px-8 py-4 text-lg">
                  <Link to="/formations" className="flex items-center">
                    <BookOpen className="mr-3 h-5 w-5" />
                    Voir nos formations
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;