

import React from 'react';
import PageWrapper from '@/components/common/PageWrapper';
import SectionTitle from '@/components/common/SectionTitle';

const LegalPage = () => {
  return (
    <PageWrapper title="Mentions légales" description="Informations légales concernant le site web du CREC">
      <div className="max-w-3xl mx-auto">
        <SectionTitle title="Mentions légales" />
        
        <div className="prose prose-lg">
          <h2 className="text-xl font-semibold text-crec-darkblue">Éditeur du site</h2>
          <p>
            CREC (Centre de Recherche, d'Étude et de Créativité)<br />
            123 Avenue de l'Éducation<br />
            75001 Paris, France<br />
            Téléphone : +33 (0)1 23 45 67 89<br />
            Email : contact@crec-education.org
          </p>
        
          <h2 className="text-xl font-semibold text-crec-darkblue mt-8">Directeur de la publication</h2>
          <p>
            Pr. Marc Dupont, Président du CREC
          </p>
          
          <h2 className="text-xl font-semibold text-crec-darkblue mt-8">Hébergement</h2>
          <p>
            Ce site est hébergé par Exemple Hébergement SAS<br />
            1 Rue du Serveur<br />
            34000 Montpellier<br />
            France
          </p>
          
          <h2 className="text-xl font-semibold text-crec-darkblue mt-8">Conception et développement</h2>
          <p>
            Ce site a été conçu et développé par l'équipe du Crec .
          </p>
          
          <h2 className="text-xl font-semibold text-crec-darkblue mt-8">Propriété intellectuelle</h2>
          <p>
            L'ensemble des éléments constituant ce site (textes, graphismes, logiciels, photographies, 
            images, vidéos, sons, logos, marques, etc.) sont la propriété exclusive du CREC ou font 
            l'objet d'une autorisation d'utilisation. Toute représentation totale ou partielle de ce site, 
            par quelque procédé que ce soit, sans l'autorisation expresse du CREC, est interdite et 
            constituerait une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la 
            propriété intellectuelle.
          </p>
          
          <h2 className="text-xl font-semibold text-crec-darkblue mt-8">Données personnelles</h2>
          <p>
            Les informations concernant la collecte et le traitement des données personnelles 
            sont détaillées dans notre <a href="/privacy" className="text-crec-blue hover:text-crec-gold">
            Politique de confidentialité</a>.
          </p>
          
          <h2 className="text-xl font-semibold text-crec-darkblue mt-8">Liens hypertextes</h2>
          <p>
            La création de liens hypertextes vers le site du CREC est soumise à l'autorisation préalable 
            du directeur de la publication. Les liens hypertextes établis en direction d'autres sites à 
            partir du site du CREC ne sauraient, en aucun cas, engager la responsabilité du CREC.
          </p>
          
          <h2 className="text-xl font-semibold text-crec-darkblue mt-8">Modification des mentions légales</h2>
          <p>
            Le CREC se réserve le droit de modifier les présentes mentions légales à tout moment. 
            L'utilisateur est invité à les consulter régulièrement.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default LegalPage;
