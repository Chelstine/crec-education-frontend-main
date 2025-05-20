
import React from 'react';
import PageWrapper from '@/components/common/PageWrapper';
import SectionTitle from '@/components/common/SectionTitle';

const CampusLifePage = () => {
  return (
    <PageWrapper 
      title="Vie sur le campus" 
      description="Découvrez la vie étudiante au CREC"
    >
      <div className="max-w-3xl mx-auto">
        <SectionTitle 
          title="Vie sur le campus" 
          subtitle="Une communauté vivante et engagée"
        />
        
        {/* TODO: Add campus news feed component when API is ready */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-crec-darkblue mb-3">
              Actualités du campus
            </h3>
            <p className="text-crec-darkgray mb-4">
              Découvrez les derniers événements, activités et nouvelles de notre communauté.
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-crec-blue pl-4">
                <h4 className="font-medium">Conférence internationale</h4>
                <p className="text-sm text-crec-darkgray">
                  Le CREC accueillera le mois prochain des experts internationaux...
                </p>
              </div>
              <div className="border-l-4 border-crec-gold pl-4">
                <h4 className="font-medium">Festival culturel</h4>
                <p className="text-sm text-crec-darkgray">
                  Les étudiants organisent un festival multiculturel...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default CampusLifePage;
