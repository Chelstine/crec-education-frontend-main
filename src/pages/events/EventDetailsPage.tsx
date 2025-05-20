
import React from 'react';
import { useParams } from 'react-router-dom';
import PageWrapper from '@/components/common/PageWrapper';
import SectionTitle from '@/components/common/SectionTitle';

const EventDetailsPage = () => {
  const { id } = useParams();
  
  // TODO: Intégrer l'appel API pour récupérer les détails de l'événement
  return (
    <PageWrapper 
      title="Détails de l'événement" 
      description="Informations détaillées sur l'événement"
    >
      <div className="max-w-3xl mx-auto">
        <SectionTitle 
          title="Détails de l'événement" 
          subtitle="Toutes les informations sur cet événement"
        />
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-crec-darkblue mb-4">
              Événement #{id}
            </h2>
            <p className="text-crec-darkgray">
              Les détails de l'événement seront chargés depuis notre base de données.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default EventDetailsPage;
