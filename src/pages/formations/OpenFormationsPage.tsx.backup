import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Calendar, 
  FileText, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Globe, 
  Computer, 
  HeartHandshake, 
  Award,
  Clock,
  MapPin,
  CheckCircle,
  Star
} from "lucide-react";

const OpenFormationsPage = () => {
  const formations = [
    {
      id: 1,
      title: "Formations en Langues",
      icon: <Globe className="w-8 h-8 text-crec-gold" />,
      description: "Maîtrisez l'anglais et le français avec nos cours adaptés à tous les niveaux",
      features: [
        "Cours d'anglais général et professionnel",
        "Préparation aux tests TOEFL, IELTS, TCF",
        "Français pour étrangers (FLE)",
        "Conversation et prononciation"
      ],
      duration: "3-6 mois",
      level: "Débutant à Avancé",
      price: "À partir de 15,000 FCFA",
      certificate: true
    },
    {
      id: 2,
      title: "Informatique de Base",
      icon: <Computer className="w-8 h-8 text-crec-gold" />,
      description: "Initiez-vous à l'informatique et aux outils numériques essentiels",
      features: [
        "Utilisation de l'ordinateur (Windows, Mac)",
        "Bureautique (Word, Excel, PowerPoint)",
        "Navigation internet et email",
        "Réseaux sociaux et sécurité numérique"
      ],
      duration: "2-4 mois",
      level: "Débutant",
      price: "À partir de 20,000 FCFA",
      certificate: true
    },
    {
      id: 3,
      title: "Accompagnement Scolaire",
      icon: <HeartHandshake className="w-8 h-8 text-crec-gold" />,
      description: "Soutien scolaire personnalisé pour tous les niveaux",
      features: [
        "Cours de soutien toutes matières",
        "Préparation aux examens officiels",
        "Méthodologie et techniques d'étude",
        "Encadrement personnalisé"
      ],
      duration: "Toute l'année",
      level: "Primaire à Universitaire",
      price: "À partir de 10,000 FCFA",
      certificate: false
    },
    {
      id: 4,
      title: "Entrepreneuriat",
      icon: <GraduationCap className="w-8 h-8 text-crec-gold" />,
      description: "Développez vos compétences entrepreneuriales et créez votre entreprise",
      features: [
        "Élaboration de business plan",
        "Gestion financière et comptabilité",
        "Marketing et communication",
        "Accompagnement post-formation"
      ],
      duration: "4-6 mois",
      level: "Tous niveaux",
      price: "À partir de 25,000 FCFA",
      certificate: true
    }
  ];

  const testimonials = [
    {
      name: "Marie Kouassi",
      formation: "Anglais TOEFL",
      comment: "Grâce au CREC, j'ai obtenu mon score TOEFL et je peux maintenant étudier au Canada !",
      score: "Score TOEFL: 98/120"
    },
    {
      name: "Jean Baptiste",
      formation: "Informatique",
      comment: "À 55 ans, je pensais qu'il était trop tard. Maintenant je maîtrise Excel et j'aide ma famille.",
      score: "Certification obtenue"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
        <div className="min-h-[500px] flex flex-col items-center justify-center text-center relative text-white p-6 bg-open-formations">
          <motion.div 
            className="max-w-4xl mx-auto bg-black/60 p-10 rounded-2xl backdrop-blur-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Formations Ouvertes</h1>
            <p className="text-xl md:text-2xl mb-6 leading-relaxed">
              Des formations accessibles à tous pour développer vos compétences et améliorer votre vie professionnelle
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Badge variant="secondary" className="text-lg py-2 px-4">
                <Award className="w-4 h-4 mr-2" />
                Certifications reconnues
              </Badge>
              <Badge variant="secondary" className="text-lg py-2 px-4">
                <Clock className="w-4 h-4 mr-2" />
                Horaires flexibles
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-crec-dark mb-6">Pourquoi choisir nos formations ?</h2>
            <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
              Au CREC, nous croyons que l'éducation doit être accessible à tous. Nos formations ouvertes s'adressent 
              aux personnes de tous niveaux d'études qui souhaitent acquérir de nouvelles compétences ou se perfectionner.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <HeartHandshake className="w-12 h-12 text-crec-gold" />,
                title: "Accessible à tous",
                description: "Peu importe votre niveau d'études, nos formations sont conçues pour vous accompagner"
              },
              {
                icon: <Star className="w-12 h-12 text-crec-gold" />,
                title: "Qualité reconnue",
                description: "Formateurs expérimentés et méthodes pédagogiques éprouvées"
              },
              {
                icon: <Award className="w-12 h-12 text-crec-gold" />,
                title: "Certifications",
                description: "Obtenez des certificats reconnus pour valoriser vos compétences"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-crec-dark mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Formations disponibles */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-crec-dark mb-4">Nos Formations</h2>
            <p className="text-lg text-gray-600">Découvrez notre catalogue de formations adaptées à vos besoins</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {formations.map((formation, index) => (
              <motion.div
                key={formation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      {formation.icon}
                      <div>
                        <CardTitle className="text-xl text-crec-dark">{formation.title}</CardTitle>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="outline">{formation.level}</Badge>
                          <Badge variant="outline">{formation.duration}</Badge>
                          {formation.certificate && (
                            <Badge className="bg-crec-gold hover:bg-crec-gold/90">
                              <Award className="w-3 h-3 mr-1" />
                              Certificat
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{formation.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-crec-dark mb-2">Programme :</h4>
                        <ul className="space-y-1">
                          {formation.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <span className="text-lg font-bold text-crec-gold">{formation.price}</span>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MapPin className="w-4 h-4" />
                          CREC Cotonou
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-crec-dark mb-4">Témoignages</h2>
            <p className="text-lg text-gray-600">Découvrez les réussites de nos apprenants</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-crec-dark">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.formation}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {testimonial.score}
                  </Badge>
                </div>
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
              Rejoignez des centaines d'apprenants qui ont déjà transformé leur avenir avec nos formations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-crec-gold hover:bg-crec-gold/90 text-black">
                <Link to="/formations/ouvertes/inscription">
                  <BookOpen className="w-5 h-5 mr-2" />
                  S'inscrire maintenant
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-crec-dark">
                <Link to="/contact">
                  <Users className="w-5 h-5 mr-2" />
                  Nous contacter
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

export default OpenFormationsPage;
