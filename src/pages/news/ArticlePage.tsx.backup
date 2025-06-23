import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useParams } from "react-router-dom";
import { Calendar, Tag, Share2, Bookmark, ChevronLeft } from "lucide-react";

// Données factices pour l'article
const articleData = {
  id: 1,
  title: "Nouveau programme de formation en Intelligence Artificielle",
  category: "Formations",
  date: "2024-03-15",
  author: {
    name: "Dr. Jean Dupont",
    role: "Directeur des Formations",
    image: "/img/team/jean-dupont.jpg"
  },
  image: "/img/news/ai-program.jpg",
  content: `
    Le CREC est fier d'annoncer le lancement de son nouveau programme de formation en Intelligence Artificielle. Cette formation innovante répond aux besoins croissants du marché et aux aspirations des futurs professionnels du numérique.

    ## Un programme complet et pratique

    Le programme, d'une durée de 6 mois, couvre les aspects fondamentaux et avancés de l'IA :
    - Machine Learning et Deep Learning
    - Traitement du langage naturel
    - Vision par ordinateur
    - Éthique et responsabilité en IA

    Les étudiants auront accès à notre infrastructure de pointe, incluant des serveurs GPU dédiés et des espaces de travail collaboratifs.

    ## Une approche professionnalisante

    Notre formation se distingue par son approche pratique et professionnalisante :
    - Projets concrets avec des entreprises partenaires
    - Stages en entreprise
    - Accompagnement personnalisé
    - Certification reconnue par l'industrie

    ## Débouchés professionnels

    Les diplômés pourront prétendre à des postes tels que :
    - Data Scientist
    - Machine Learning Engineer
    - AI Research Engineer
    - AI Product Manager

    ## Inscriptions ouvertes

    Les inscriptions pour la prochaine session sont ouvertes. Le nombre de places est limité à 30 étudiants pour garantir un accompagnement optimal.

    Pour plus d'informations ou pour postuler, contactez notre service des InscriptionUniversitaire.
  `,
  tags: ["IA", "Formation", "Innovation"],
  relatedArticles: [
    {
      id: 2,
      title: "Inauguration du nouveau laboratoire de recherche",
      category: "Infrastructure",
      date: "2024-03-10",
      image: "/img/news/lab-inauguration.jpg"
    },
    {
      id: 3,
      title: "Partenariat avec une entreprise leader du numérique",
      category: "Partenariats",
      date: "2024-03-05",
      image: "/img/news/partnership.jpg"
    }
  ]
};

const ArticlePage = () => {
  const { id } = useParams();
  const article = articleData; // Dans une vraie application, on récupérerait l'article depuis une API

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
        <div 
          className="min-h-[300px] flex flex-col items-center justify-center text-center relative text-white p-6 news-hero-bg"
        >
          <div className="max-w-3xl mx-auto bg-black/50 p-8 rounded-lg backdrop-blur-sm">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Article</h1>
            <p className="text-xl md:text-2xl mb-8">
              Découvrez l'article en détail
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Author Info */}
              <div className="flex items-center gap-4">
                <img
                  src={article.author.image}
                  alt={article.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{article.author.name}</h3>
                  <p className="text-gray-600">{article.author.role}</p>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose max-w-none">
                {article.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('- ')) {
                    return (
                      <ul key={index} className="list-disc pl-6 my-4">
                        {paragraph.split('\n').map((item, i) => (
                          <li key={i} className="text-gray-600">
                            {item.replace('- ', '')}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={index} className="text-gray-600 my-4">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Share Buttons */}
              <div className="flex gap-4">
                <Button variant="outline" className="flex items-center">
                  <Share2 className="w-4 h-4 mr-2" />
                  Partager
                </Button>
                <Button variant="outline" className="flex items-center">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Sauvegarder
                </Button>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Related Articles */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Articles similaires</h2>
                  <div className="space-y-6">
                    {article.relatedArticles.map((related) => (
                      <div key={related.id} className="flex gap-4">
                        <div className="w-24 h-24 flex-shrink-0">
                          <img
                            src={related.image}
                            alt={related.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">{related.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2" />
                              <span>{new Date(related.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center">
                              <Tag className="w-4 h-4 mr-2" />
                              <span>{related.category}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-crec-darkblue text-white">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Restez informé</h2>
          <p className="text-xl mb-8">
            Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-2 rounded-lg text-gray-900"
            />
            <Button className="bg-crec-gold hover:bg-crec-lightgold text-white">
              S'inscrire
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;