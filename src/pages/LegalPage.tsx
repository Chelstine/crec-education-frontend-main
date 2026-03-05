import React from 'react';
import PageWrapper from '@/components/common/PageWrapper';
import SectionTitle from '@/components/common/SectionTitle';

/**
 * Page des mentions légales du CREC
 * Toutes les informations légales et de contact officielles du site
 * Mise à jour : juin 2025
 */
const LegalPage = () => {
  return (
    <PageWrapper title="Mentions légales" description="Informations légales concernant le site web du CREC">
      <div className="max-w-3xl mx-auto">
        <SectionTitle title="Mentions légales" />
        <div className="prose prose-lg">
          {/* Éditeur du site */}
          <h2 className="text-xl font-semibold text-crec-darkblue">Éditeur du site</h2>
          <p>
            CREC (Centre de Recherche, d'Étude et de Créativité)<br />
            Maison des Pères Jésuites, Godomey - Salamèy, Lot n° 2, Godomey Sud, Tranche B<br />
            Téléphone : <a href="tel:+2290120222303" className="text-crec-blue hover:text-crec-gold">+229 01 20 22 23 03</a><br />
            Email : <a href="mailto:crecjesuitesbenin@gmail.com" className="text-crec-blue hover:text-crec-gold">crecjesuitesbenin@gmail.com</a>
          </p>

          {/* Directeur de la publication */}
          <h2 className="text-xl font-semibold text-crec-darkblue mt-8">Directeur de la publication</h2>
          <p>
            Pr. Responsable CREC Bénin
          </p>

          {/* Hébergement */}
          <h2 className="text-xl font-semibold text-crec-darkblue mt-8">Hébergement</h2>
          <p>
            Ce site est hébergé par Vercel Inc.<br />
            440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
          </p>

          {/* Conception et développement */}
          <h2 className="text-xl font-semibold text-crec-darkblue mt-8">Conception et développement</h2>
          <p>
            Ce site a été conçu et développé par l'équipe CREC Bénin.<br />
            Pour toute suggestion technique, contactez-nous à l'adresse ci-dessus.
          </p>

          {/* Propriété intellectuelle */}
          <h2 className="text-xl font-semibold text-crec-darkblue mt-8">Propriété intellectuelle</h2>
          <p>
            L'ensemble des éléments constituant ce site (textes, graphismes, logiciels, photographies, images, vidéos, sons, logos, marques, etc.) sont la propriété exclusive du CREC ou font l'objet d'une autorisation d'utilisation. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable du CREC.
          </p>

          {/* Données personnelles */}
          <h2 className="text-xl font-semibold text-crec-darkblue mt-8">Données personnelles</h2>
          <p>
            Les informations concernant la collecte et le traitement des données personnelles sont détaillées dans notre <a href="/privacy" className="text-crec-blue hover:text-crec-gold">Politique de confidentialité</a>.<br />
            Conformément à la loi, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour toute demande, contactez-nous à l'adresse indiquée ci-dessus.
          </p>

          {/* Liens hypertextes */}
          <h2 className="text-xl font-semibold text-crec-darkblue mt-8">Liens hypertextes</h2>
          <p>
            La création de liens hypertextes vers le site du CREC est soumise à l'autorisation préalable du directeur de la publication. Les liens hypertextes établis en direction d'autres sites à partir du site du CREC ne sauraient, en aucun cas, engager la responsabilité du CREC.
          </p>

          {/* Modification des mentions légales */}
          <h2 className="text-xl font-semibold text-crec-darkblue mt-8">Modification des mentions légales</h2>
          <p>
            Le CREC se réserve le droit de modifier les présentes mentions légales à tout moment. L'utilisateur est invité à les consulter régulièrement.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default LegalPage;
