import React from 'react';
import { motion } from 'framer-motion';

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="relative w-full overflow-hidden mb-16">
          {/* Background */}
          <div className="absolute inset-0 bg-[url('/img/crec3.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-crec-darkblue/80 via-crec-darkblue/60 to-crec-darkblue/90" />
          
          {/* Content */}
          <div className="min-h-[250px] flex flex-col items-center justify-center text-center relative z-10 text-white p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                Galerie Photos
              </h1>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                Découvrez le CREC en images
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Gallery Content - Empty for now */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Notre collection d'images</h2>
              <p className="text-gray-600">
                Notre galerie sera bientôt disponible avec des photos des événements, 
                des installations et de la vie au CREC.
              </p>
            </div>
            
            {/* Placeholder for future gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center">
                <p className="text-slate-400">Image à venir</p>
              </div>
              <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center">
                <p className="text-slate-400">Image à venir</p>
              </div>
              <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center">
                <p className="text-slate-400">Image à venir</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GalleryPage;
