import React from 'react';
import PageWrapper from '@/components/common/PageWrapper';
import SectionTitle from '@/components/common/SectionTitle';
import { Calendar } from '@/components/ui/calendar';

const CalendarPage = () => {
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
