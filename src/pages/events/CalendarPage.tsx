/* ====== IMPORTS REACT ET HOOKS ====== */
import React from 'react'; // Import de React pour créer des composants JSX

/* ====== IMPORTS COMPOSANTS COMMUNS ====== */
import SectionTitle from '@/components/common/SectionTitle'; // Composant pour les titres de section

/* ====== IMPORTS COMPOSANTS UI ====== */
import { Calendar as CalendarComponent } from '@/components/ui/calendar'; // Composant calendrier interactif
import { Calendar as CalendarIcon } from 'lucide-react'; // Icon du calendrier
import { motion } from 'framer-motion'; // Animations

/* ====== COMPOSANT PRINCIPAL ====== */
// Composant fonctionnel pour la page calendrier des événements
// Affiche un calendrier interactif avec les événements du CREC
const CalendarPage = () => {
  // État local pour gérer la date sélectionnée dans le calendrier
  // useState avec type Date | undefined pour permettre aucune sélection
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: { 
      repeat: Infinity,
      repeatType: "reverse" as const, 
      duration: 1.5
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section - Style ContactPage */}
      <section className="relative w-full overflow-hidden">
        {/* Background with parallax effect */}
        <div className="absolute inset-0 bg-[url('/img/conference.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-crec-darkblue/80 via-crec-darkblue/60 to-crec-darkblue/90 backdrop-blur-[2px]" />
        
        {/* Accent elements */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1.5 }}
          className="absolute top-20 right-20 w-64 h-64 rounded-full bg-crec-gold blur-3xl"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-blue-500 blur-3xl"
        />
        
        {/* Content */}
        <div className="min-h-[350px] md:min-h-[400px] flex flex-col items-center justify-center text-center relative z-10 text-white p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-4 inline-flex px-4 py-2 rounded-full items-center bg-white/10 backdrop-blur-md border border-white/20"
            >
              <motion.div 
                animate={pulseAnimation}
                className="w-2 h-2 rounded-full bg-crec-gold mr-2" 
              />
              <span className="text-sm font-medium">Planifiez votre participation</span>
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight">
              Calendrier des Événements
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Consultez les dates importantes à venir et organisez votre agenda
            </p>
          </motion.div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px]" fill="#ffffff">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,213.35,56.44Z" />
          </svg>
        </div>
      </section>
      
      {/* Calendar Content */}
      <section className="py-16 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <SectionTitle 
              title="Calendrier interactif"
              subtitle="Consultez et explorez nos événements"
            />
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-crec-darkblue mb-4 flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5 text-crec-gold" />
                  Événements du mois
                </h3>
                <p className="text-crec-darkgray">
                  Le calendrier sera bientôt synchronisé avec notre base de données d'événements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CalendarPage;
