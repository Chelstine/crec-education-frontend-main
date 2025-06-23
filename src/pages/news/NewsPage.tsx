/* ====== IMPORTS REACT ET HOOKS ====== */
import React from 'react'; // Import de React pour créer des composants JSX

/* ====== COMPOSANT PRINCIPAL ====== */
// Composant fonctionnel pour la page des actualités du CREC
// Cette page affiche les news, articles et annonces de l'institution
const NewsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Section hero avec image de fond et titre principal */}
      <section className="relative w-full">
        {/* Overlay sombre pour améliorer la lisibilité du texte */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
        
        {/* Contenu centré avec image de fond et backdrop blur */}
        <div 
          className="min-h-[300px] flex flex-col items-center justify-center text-center relative text-white p-6 news-hero-bg"
        >
          <div className="max-w-3xl mx-auto bg-black/50 p-8 rounded-lg backdrop-blur-sm">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Actualités</h1>
            <p className="text-xl md:text-2xl mb-8">
              Retrouvez toutes les actualités et annonces du CREC
            </p>
          </div>
        </div>
      </section>
      
      {/* Contenu principal avec grille d'articles */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Actualités</h1>
        
        {/* Grille responsive pour les articles (1 col mobile, 2 tablette, 3 desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Exemple d'article - Template à remplir avec des données dynamiques */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Titre de l'actualité</h2>
            <p className="text-gray-600 mb-4">Date de publication</p>
            <p>Description de l'actualité...</p>
          </div>
          
          {/* TODO: Remplacer par un map() pour afficher les vraies actualités */}
          {/* {actualites.map(article => (<ArticleCard key={article.id} article={article} />))} */}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;