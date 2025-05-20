import React from 'react';

const NewsPage: React.FC = () => {
  return (
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
  );
};

export default NewsPage;