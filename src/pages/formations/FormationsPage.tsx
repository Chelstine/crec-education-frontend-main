import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, FileText, Users, GraduationCap, BookOpen, Globe, Code } from "lucide-react";

const FormationsPage = () => {
  const formations = [
    {
      id: 1,
      title: "Langues",
      icon: <Globe className="w-12 h-12 text-crec-gold mb-4" />,
      description: "Cours d'anglais et autres langues pour tous les niveaux",
      link: "/formations/langues"
    },
    {
      id: 2,
      title: "Informatique",
      icon: <Code className="w-12 h-12 text-crec-gold mb-4" />,
      description: "Formations en développement web, bureautique et plus",
      link: "/formations/informatique"
    },
    {
      id: 3,
      title: "Tutorat",
      icon: <BookOpen className="w-12 h-12 text-crec-gold mb-4" />,
      description: "Accompagnement scolaire personnalisé",
      link: "/formations/tutorat"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
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
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-crec-dark">Nos Formations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {formations.map((formation) => (
              <Card key={formation.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  {formation.icon}
                  <h3 className="text-xl font-bold mb-4">{formation.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {formation.description}
                  </p>
                  <Button asChild variant="link" className="text-crec-gold p-0">
                    <Link to={formation.link}>En savoir plus</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-crec-light">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-crec-dark">Comment s'inscrire ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FileText className="w-12 h-12 text-crec-gold mx-auto mb-4" />
                <h3 className="font-bold mb-2">1. Inscription</h3>
                <p className="text-gray-600">Créez votre compte et remplissez le formulaire</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Calendar className="w-12 h-12 text-crec-gold mx-auto mb-4" />
                <h3 className="font-bold mb-2">2. Choix</h3>
                <p className="text-gray-600">Sélectionnez votre formation</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <GraduationCap className="w-12 h-12 text-crec-gold mx-auto mb-4" />
                <h3 className="font-bold mb-2">3. Paiement</h3>
                <p className="text-gray-600">Effectuez le paiement en ligne</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Users className="w-12 h-12 text-crec-gold mx-auto mb-4" />
                <h3 className="font-bold mb-2">4. Accès</h3>
                <p className="text-gray-600">Accédez à votre espace formation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-crec-dark text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-8">Prêt à commencer votre formation ?</h2>
          <p className="text-xl mb-8">
            Rejoignez notre communauté d'apprenants et développez vos compétences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-crec-gold hover:bg-crec-lightgold text-white px-8 py-6 text-lg"
              asChild
            >
              <Link to="/formations/admissions">S'inscrire maintenant</Link>
            </Button>
            <Button 
              variant="outline"
              className="border-white text-white hover:bg-white/20 px-8 py-6 text-lg"
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

export default FormationsPage;
