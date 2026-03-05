import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Settings } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const OnlineLibraryPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Style harmonisé */}
      <section className="relative w-full overflow-hidden">
        {/* Background with parallax effect */}
        <div className="absolute inset-0 bg-[url('/img/crec3.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-crec-darkblue/80 via-crec-darkblue/60 to-crec-darkblue/90 backdrop-blur-[2px]" />

        {/* Accent elements */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1.5 }}
          className="absolute top-20 right-20 w-64 h-64 rounded-full bg-crec-gold blur-3xl"
        />

        <div className="relative z-10 flex flex-col justify-center items-center text-center min-h-[60vh] px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <BookOpen className="h-16 w-16 text-crec-gold mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Bibliothèque Numérique
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Découvrez notre collection de ressources numériques : livres, articles, 
              publications académiques et bien plus encore
            </p>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="border-2 border-dashed border-crec-gold/30 bg-white/50 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-8"
                >
                  <div className="w-24 h-24 mx-auto mb-6 bg-crec-gold/10 rounded-full flex items-center justify-center">
                    <Settings className="h-12 w-12 text-crec-gold animate-spin" style={{ animationDuration: '3s' }} />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Bientôt Disponible !
                  </h2>
                  
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                    Notre bibliothèque numérique est actuellement en cours de développement. 
                    Nous travaillons dur pour vous offrir une expérience exceptionnelle avec 
                    une vaste collection de ressources académiques et professionnelles.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="text-center p-4"
                    >
                      <BookOpen className="h-8 w-8 text-crec-gold mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">Livres Numériques</h3>
                      <p className="text-sm text-gray-600">
                        Accès à une collection complète de livres académiques et professionnels
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      className="text-center p-4"
                    >
                      <Calendar className="h-8 w-8 text-crec-gold mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">Articles & Recherches</h3>
                      <p className="text-sm text-gray-600">
                        Publications scientifiques et articles de recherche récents
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="text-center p-4"
                    >
                      <Settings className="h-8 w-8 text-crec-gold mx-auto mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">Ressources Techniques</h3>
                      <p className="text-sm text-gray-600">
                        Documentation technique et guides pratiques
                      </p>
                    </motion.div>
                  </div>

                  <div className="bg-crec-gold/10 rounded-lg p-6 border border-crec-gold/20">
                    <p className="text-crec-darkblue font-medium mb-2">
                      🚀 Lancement prévu prochainement
                    </p>
                    <p className="text-sm text-gray-600">
                      Inscrivez-vous à nos newsletters pour être notifié dès l'ouverture !
                    </p>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default OnlineLibraryPage;
