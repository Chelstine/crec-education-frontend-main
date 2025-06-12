import React from 'react';

const NewsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
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
      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Actualités</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Contenu à remplir ultérieurement */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Titre de l'actualité</h2>
            <p className="text-gray-600 mb-4">Date de publication</p>
            <p>Description de l'actualité...</p>
          </div>
          
          {/* Vous pouvez dupliquer cet élément pour avoir plus d'actualités */}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;