import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Book, Construction, ArrowLeft } from 'lucide-react';

const BibliothequeEnLignePage = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-[url('/img/conference.png')] bg-cover bg-center bg-no-repeat" />
        <div className="absolute inset-0 bg-gradient-to-r from-crec-darkblue/90 to-crec-darkblue/80" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
                <Book className="w-4 h-4 text-crec-gold mr-2" />
                <span className="text-sm font-medium text-white">Ressources éducatives</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Bibliothèque <br />
                <span className="text-crec-gold">en ligne</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg text-blue-50 mb-6">
                Accédez à notre collection de ressources pédagogiques et académiques.
              </motion.p>
            </motion.div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12" fill="white">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,213.35,56.44Z" />
          </svg>
        </div>
      </section>

      {/* En développement section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="bg-slate-50 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Construction className="w-12 h-12 text-crec-darkblue" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-crec-darkblue mb-4">Page en développement</h2>
              <p className="text-lg text-slate-600 mb-8">
                Notre bibliothèque en ligne est actuellement en cours de développement. 
                Elle sera bientôt disponible avec une collection complète de ressources académiques, 
                d'ouvrages de référence et de matériel pédagogique.
              </p>
              <p className="text-slate-600 mb-10">
                Nous travaillons actuellement à numériser notre collection et à mettre en place 
                un système de consultation efficace pour faciliter vos recherches.
                Merci de votre patience et de votre compréhension.
              </p>
              
              <Button asChild className="bg-crec-darkblue hover:bg-crec-darkblue/90">
                <Link to="/" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Retour à l'accueil
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <div className="p-6 border border-slate-200 rounded-lg bg-white shadow-sm">
                <h3 className="font-bold text-lg mb-3 text-crec-darkblue">Collections à venir</h3>
                <p className="text-slate-600">Ouvrages académiques, thèses, mémoires et documents de recherche.</p>
              </div>
              
              <div className="p-6 border border-slate-200 rounded-lg bg-white shadow-sm">
                <h3 className="font-bold text-lg mb-3 text-crec-darkblue">Ressources pédagogiques</h3>
                <p className="text-slate-600">Supports de cours, exercices, tutoriels et guides pratiques.</p>
              </div>
              
              <div className="p-6 border border-slate-200 rounded-lg bg-white shadow-sm">
                <h3 className="font-bold text-lg mb-3 text-crec-darkblue">Publications du CREC</h3>
                <p className="text-slate-600">Articles, revues et publications des chercheurs et étudiants.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BibliothequeEnLignePage;
