import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, FileText, Users, GraduationCap, BookOpen, Globe, Code } from "lucide-react";

const OpenFormationsPage = () => {
  const formations = [
    {
      id: 1,
      title: "Formations Universitaires",
      icon: <GraduationCap className="w-12 h-12 text-amber-500 mb-4" />,
      description: "Programmes universitaires en développement logiciel, web et data science",
      link: "/formations/university"
    },
    {
      id: 2,
      title: "Formations Ouvertes",
      icon: <BookOpen className="w-12 h-12 text-amber-500 mb-4" />,
      description: "Formations continues en langues, informatique et accompagnement scolaire",
      link: "/formations/open"
    },
    {
      id: 3,
      title: "FabLab",
      icon: <Code className="w-12 h-12 text-crec-gold mb-4" />,
      description: "Ateliers de fabrication numérique et impression 3D",
      link: "/formations/fablab"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
        <div 
          className="min-h-[400px] flex flex-col items-center justify-center text-center relative text-white p-6"
          style={{
            backgroundImage: "url('/img/formations-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
          role="banner"
        >
          <div className="max-w-3xl mx-auto bg-black/50 p-8 rounded-lg backdrop-blur-sm">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Formations Continues</h1>
            <p className="text-xl md:text-2xl mb-8">
              Développez vos compétences avec nos formations professionnelles adaptées à vos besoins.
            </p>
          </div>
        </div>
      </section>

      {/* Formations List */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center text-crec-dark">Nos Formations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {formations.map((formation) => (
              <Card 
                key={formation.id} 
                className="group hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 hover:scale-102 border-0 shadow-lg bg-white/80 backdrop-blur-sm"
                role="region"
                aria-labelledby={`formation-title-${formation.id}`}
              >
                <CardContent className="p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="transform group-hover:scale-110 transition-transform duration-300">
                      {formation.icon}
                    </div>
                    <h3 id={`formation-title-${formation.id}`} className="text-xl font-bold mb-4 text-gray-800 group-hover:text-amber-700 transition-colors duration-300">
                      {formation.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {formation.description}
                    </p>
                    <Button asChild className="text-amber-600 hover:text-amber-700 font-semibold transition-colors p-0">
                      <Link to={formation.link} aria-label={`En savoir plus sur ${formation.title}`}>En savoir plus →</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-crec-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center text-crec-dark">Comment s'inscrire ?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: FileText, title: "1. Inscription", desc: "Créez votre compte et remplissez le formulaire" },
              { icon: Calendar, title: "2. Choix", desc: "Sélectionnez votre formation" },
              { icon: GraduationCap, title: "3. Paiement", desc: "Effectuez le paiement en ligne" },
              { icon: Users, title: "4. Accès", desc: "Accédez à votre espace formation" }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <step.icon className="w-12 h-12 text-crec-gold mx-auto mb-4" />
                  <h3 className="font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold mb-4">Prêt à commencer votre formation ?</h2>
          <p className="text-gray-700 mb-6">
            Rejoignez notre communauté d'apprenants et développez vos compétences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-amber-500 hover:bg-amber-600 text-white rounded-full px-8 py-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
              asChild
            >
              <Link to="/formations/open" aria-label="S'inscrire maintenant">S'inscrire maintenant</Link>
            </Button>
            <Button 
              className="bg-white border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white rounded-full px-8 py-3 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg font-semibold"
              asChild
            >
              <Link to="/contact" aria-label="Nous contacter">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OpenFormationsPage;