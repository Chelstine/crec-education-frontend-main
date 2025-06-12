import React from 'react';
import { useParams } from 'react-router-dom';
import PageWrapper from '@/components/common/PageWrapper';
import SectionTitle from '@/components/common/SectionTitle';

const EventDetailsPage = () => {
  const { id } = useParams();
  
  // TODO: Intégrer l'appel API pour récupérer les détails de l'événement
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[220px] md:h-[280px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/img/conference.png"
            alt="Événement CREC"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
          <div className="bg-white/70 backdrop-blur-md p-3 md:p-5 rounded-2xl shadow-lg max-w-lg mx-auto my-2">
            <h1 className="text-2xl md:text-4xl font-bold text-blue-900 mb-2">Détails de l'événement</h1>
            <h2 className="text-base md:text-lg font-semibold text-amber-600 mb-1">Toutes les informations sur cet événement</h2>
          </div>
        </div>
      </section>
      {/* Contenu principal */}
      <PageWrapper 
        title="Détails de l'événement" 
        description="Informations détaillées sur l'événement"
      >
        <div className="max-w-3xl mx-auto mt-8">
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
    </div>
  );
};

export default EventDetailsPage;
