/* ====== IMPORTS REACT ET HOOKS ====== */
import React from 'react'; // Import de React pour créer des composants JSX

/* ====== IMPORTS COMPOSANTS COMMUNS ====== */
import PageWrapper from '@/components/common/PageWrapper'; // Wrapper de page avec layout standardisé
import SectionTitle from '@/components/common/SectionTitle'; // Composant pour les titres de section

/* ====== IMPORTS COMPOSANTS UI ====== */
import { Calendar } from '@/components/ui/calendar'; // Composant calendrier interactif

/* ====== COMPOSANT PRINCIPAL ====== */
// Composant fonctionnel pour la page calendrier des événements
// Affiche un calendrier interactif avec les événements du CREC
const CalendarPage = () => {
  // État local pour gérer la date sélectionnée dans le calendrier
  // useState avec type Date | undefined pour permettre aucune sélection
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <PageWrapper 
      title="Calendrier" 
      description="Calendrier des événements du CREC"
    >
      <div className="max-w-3xl mx-auto">
        <SectionTitle 
          title="Calendrier des événements" 
          subtitle="Consultez les dates importantes à venir"
        />
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
          
          {/* TODO: Intégrer les événements depuis l'API */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-crec-darkblue mb-4">
              Événements du mois
            </h3>
            <p className="text-crec-darkgray">
              Le calendrier sera bientôt synchronisé avec notre base de données d'événements.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default CalendarPage;
