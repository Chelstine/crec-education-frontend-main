
import React from 'react';
import PageWrapper from '@/components/common/PageWrapper';
import SectionTitle from '@/components/common/SectionTitle';

const PrivacyPage = () => {
  return (
    <PageWrapper title="Politique de confidentialité" description="Informations sur la protection de vos données personnelles">
      <div className="max-w-3xl mx-auto">
        <SectionTitle title="Politique de confidentialité" />
        
        <div className="prose prose-lg">
          <p className="text-lg mb-6">
            Le CREC (Centre de Recherche, d'Étude et de Créativité) s'engage à protéger la vie privée des utilisateurs de son site internet. 
            Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos données personnelles.
          </p>
          
          <h2 className="text-xl font-semibold text-crec-darkblue">Collecte des données personnelles</h2>
          <p>
            Nous collectons les données personnelles que vous nous fournissez volontairement lors de :
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>La création d'un compte sur notre site</li>
            <li>L'inscription à nos formations</li>
            <li>L'abonnement à notre newsletter</li>
            <li>L'utilisation du formulaire de contact</li>
            <li>La participation à nos enquêtes ou sondages</li>
            <li>La réalisation d'un don</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-crec-darkblue mt-8">Types de données collectées</h2>
          <p>
            Les données personnelles que nous collectons peuvent inclure :
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Numéro de téléphone</li>
            <li>Adresse postale</li>
            <li>Date de naissance</li>
            <li>Informations académiques et professionnelles (pour les candidatures)</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-crec-darkblue mt-8">Utilisation des données</h2>
          <p>
            Nous utilisons vos données personnelles pour :
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Gérer votre compte et vous fournir les services demandés</li>
            <li>Traiter vos inscriptions aux formations et événements</li>
            <li>Vous envoyer des informations sur nos activités (avec votre consentement)</li>
            <li>Répondre à vos demandes et questions</li>
            <li>Améliorer nos services et notre site web</li>
            <li>Respecter nos obligations légales et réglementaires</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-crec-darkblue mt-8">Conservation des données</h2>
          <p>
            Nous conservons vos données personnelles aussi longtemps que nécessaire pour réaliser les finalités 
            pour lesquelles elles ont été collectées, sauf si une durée de conservation plus longue est requise 
            ou permise par la loi.
          </p>
          
          <h2 className="text-xl font-semibold text-crec-darkblue mt-8">Vos droits</h2>
          <p>
            Conformément à la réglementation applicable, notamment le Règlement Général sur la Protection des Données 
            (RGPD), vous disposez des droits suivants concernant vos données personnelles :
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Droit d'accès</li>
            <li>Droit de rectification</li>
            <li>Droit à l'effacement (droit à l'oubli)</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité des données</li>
            <li>Droit d'opposition</li>
            <li>Droit de retirer votre consentement à tout moment</li>
          </ul>
          
          <p>
            Pour exercer ces droits ou pour toute question relative à la protection de vos données personnelles, 
            vous pouvez nous contacter à l'adresse suivante : dpo@crec-education.org.
          </p>
          
          <h2 className="text-xl font-semibold text-crec-darkblue mt-8">Cookies</h2>
          <p>
            Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez paramétrer 
            votre navigateur pour refuser les cookies ou être alerté lorsque des cookies sont envoyés sur votre 
            appareil.
          </p>
          
          <h2 className="text-xl font-semibold text-crec-darkblue mt-8">Sécurité des données</h2>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos 
            données personnelles contre la perte, l'accès non autorisé, la divulgation, l'altération ou la destruction.
          </p>
          
          <h2 className="text-xl font-semibold text-crec-darkblue mt-8">Modification de la politique</h2>
          <p>
            Nous pouvons modifier cette politique de confidentialité à tout moment. Toute modification sera 
            publiée sur cette page avec une date de mise à jour. Nous vous encourageons à consulter régulièrement 
            cette politique pour rester informé de nos pratiques en matière de protection des données.
          </p>
          
          <p className="mt-8 text-crec-darkblue font-medium">
            Dernière mise à jour : Avril 2025
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default PrivacyPage;
