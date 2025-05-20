
import React from 'react';
import PageWrapper from '@/components/common/PageWrapper';
import SectionTitle from '@/components/common/SectionTitle';

const TestimonialsPage = () => {
  return (
    <PageWrapper 
      title="Témoignages" 
      description="Découvrez les expériences de nos étudiants et diplômés"
    >
      <div className="max-w-3xl mx-auto">
        <SectionTitle 
          title="Témoignages" 
          subtitle="Parcours et réussites de notre communauté"
        />
        
        {/* TODO: Add testimonials grid component when API is ready */}
        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <blockquote className="text-crec-darkgray mb-4">
              "Le CREC m'a offert bien plus qu'une formation académique. J'y ai trouvé 
              une communauté bienveillante et des opportunités uniques de développement personnel."
            </blockquote>
            <div className="flex items-center">
              <div>
                <p className="font-medium text-crec-darkblue">Marie Lambert</p>
                <p className="text-sm text-crec-gray">Promotion 2024 - Master en Leadership Éducatif</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <blockquote className="text-crec-darkgray mb-4">
              "La qualité de l'enseignement et l'accompagnement personnalisé m'ont permis 
              de développer mes compétences et ma vision de l'éducation."
            </blockquote>
            <div className="flex items-center">
              <div>
                <p className="font-medium text-crec-darkblue">Thomas Dubois</p>
                <p className="text-sm text-crec-gray">Promotion 2023 - Certificat en Pédagogie</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default TestimonialsPage;
