/* ====== IMPORTS COMPOSANTS UI ====== */
import { Button } from "@/components/ui/button"; // Composant Button stylisé réutilisable
import { Card, CardContent } from "@/components/ui/card"; // Composants Card pour les cartes d'affichage

/* ====== IMPORTS NAVIGATION ====== */
import { Link } from "react-router-dom"; // Composant Link pour la navigation interne

/* ====== IMPORTS ANIMATIONS ====== */
import { motion } from "framer-motion"; // Bibliothèque d'animations pour React

/* ====== IMPORTS ICÔNES ====== */
import { 
  Calendar,      // Icône calendrier
  FileText,      // Icône document/fichier texte
  Users,         // Icône groupe d'utilisateurs
  GraduationCap, // Icône chapeau de diplômé pour formations universitaires
  BookOpen,      // Icône livre ouvert pour formations ouvertes
  Code,          // Icône code pour FabLab/programmation
  ArrowRight     // Icône flèche droite pour navigation
} from "lucide-react";

/* ====== COMPOSANT PRINCIPAL ====== */
// Composant fonctionnel pour la page hub des formations
// Cette page présente les trois types de formations disponibles au CREC
const FormationsHubPage = () => {
  // Données statiques des formations (en production, cela viendrait d'une API)
  const formations = [
    {
      id: 1,
      title: "Formations Universitaires",
      icon: <GraduationCap className="w-12 h-12 text-crec-gold mb-4" />,
      description: "Programmes universitaires en développement logiciel, web et data science",
      features: ["Licence professionnelle", "Master spécialisé", "Diplômes reconnus"],
      link: "/formations/university"
    },
    {
      id: 2,
      title: "Formations Ouvertes",
      icon: <BookOpen className="w-12 h-12 text-crec-gold mb-4" />,
      description: "Formations continues en langues, informatique et accompagnement scolaire",
      features: ["Tous niveaux", "Horaires flexibles", "Certifications"],
      link: "/formations/ouvertes"
    },
    {
      id: 3,
      title: "FabLab",
      icon: <Code className="w-12 h-12 text-crec-gold mb-4" />,
      description: "Ateliers de fabrication numérique et impression 3D",
      features: ["Impression 3D", "Arduino/IoT", "Réservation équipements"],
      link: "/formations/fablab"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        {/* Background with parallax effect */}
        <div className="absolute inset-0 bg-[url('/img/formation.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-crec-darkblue/80 via-crec-darkblue/60 to-crec-darkblue/90 backdrop-blur-[2px]" />
        
        {/* Accent elements */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1.5 }}
          className="absolute top-20 right-20 w-64 h-64 rounded-full bg-crec-gold blur-3xl"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-blue-500 blur-3xl"
        />
        
        {/* Content */}
        <div className="min-h-[350px] md:min-h-[400px] flex flex-col items-center justify-center text-center relative z-10 text-white p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-4 inline-flex px-4 py-2 rounded-full items-center bg-white/10 backdrop-blur-md border border-white/20"
            >
              <motion.div 
                animate={{
                  scale: [1, 1.05, 1],
                  transition: { 
                    repeat: Infinity,
                    repeatType: "reverse", 
                    duration: 1.5
                  }
                }}
                className="w-2 h-2 rounded-full bg-crec-gold mr-2" 
              />
              <span className="text-sm font-medium">Centre de Formation</span>
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight">
              Nos Formations
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8">
              Développez vos compétences avec nos formations professionnelles adaptées à vos besoins.
            </p>
            
            <Button asChild size="lg" className="bg-crec-gold hover:bg-crec-gold/90 text-black">
              <Link to="#formations">
                <BookOpen className="w-5 h-5 mr-2" />
                Découvrir nos formations
              </Link>
            </Button>
          </motion.div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px]" fill="#ffffff">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,213.35,56.44Z" />
          </svg>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-crec-dark mb-6">Excellence académique et formation pratique</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Le CREC propose une gamme complète de formations pour accompagner votre développement personnel et professionnel. 
              De l'université au FabLab, en passant par nos formations ouvertes, trouvez le parcours qui vous correspond.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Formations Cards */}
      <section id="formations" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-crec-dark mb-4">Choisissez votre parcours</h2>
            <p className="text-lg text-gray-600">Trois domaines de formation pour répondre à tous vos besoins</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {formations.map((formation, index) => (
              <motion.div
                key={formation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col">
                  <CardContent className="p-8 text-center flex flex-col h-full">
                    <div>
                      {formation.icon}
                      <h3 className="text-2xl font-bold text-crec-dark mb-4">{formation.title}</h3>
                      <p className="text-gray-600 mb-6 min-h-[80px]">{formation.description}</p>
                    </div>
                    
                    <div className="space-y-2 mb-8 flex-grow">
                      {formation.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center justify-center gap-2 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-crec-gold rounded-full"></div>
                          {feature}
                        </div>
                      ))}
                    </div>

                    <Button asChild className="w-full bg-crec-gold hover:bg-crec-gold/90 text-black group-hover:scale-105 transition-transform mt-auto">
                      <Link to={formation.link}>
                        Découvrir
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-crec-light">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { number: "500+", label: "Étudiants formés", icon: <Users className="w-8 h-8 text-crec-gold mx-auto mb-2" /> },
              { number: "15+", label: "Formations disponibles", icon: <BookOpen className="w-8 h-8 text-crec-gold mx-auto mb-2" /> },
              { number: "95%", label: "Taux de satisfaction", icon: <GraduationCap className="w-8 h-8 text-crec-gold mx-auto mb-2" /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {stat.icon}
                <div className="text-3xl font-bold text-crec-dark mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-crec-dark text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Prêt à commencer votre formation ?</h2>
            <p className="text-xl mb-8 text-gray-300">
              Contactez-nous pour plus d'informations ou pour vous inscrire à nos formations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-crec-gold hover:bg-crec-gold/90 text-black">
                <Link to="/contact">
                  <FileText className="w-5 h-5 mr-2" />
                  Nous contacter
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-crec-dark">
                <Link to="/about">
                  <Users className="w-5 h-5 mr-2" />
                  En savoir plus sur le CREC
                </Link>
              </Button>
            </div>
            <p className="text-sm text-gray-400 mt-6">
              <Calendar className="w-4 h-4 inline mr-2" />
              Inscriptions ouvertes toute l'année
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FormationsHubPage;
