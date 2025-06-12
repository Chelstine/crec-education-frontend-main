import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Calendar, FileText, Users, GraduationCap, BookOpen, Code, ArrowRight } from "lucide-react";

const FormationsHubPage = () => {
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
      <section className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
        <div 
          className="min-h-[400px] flex flex-col items-center justify-center text-center relative text-white p-6 bg-formations-hub"
          role="banner"
        >
          <motion.div 
            className="max-w-3xl mx-auto bg-black/50 p-8 rounded-lg backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos Formations</h1>
            <p className="text-xl md:text-2xl mb-8">
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
