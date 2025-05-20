
import React from 'react';
import PageWrapper from '@/components/common/PageWrapper';
import SectionTitle from '@/components/common/SectionTitle';
import { useLanguage } from '@/context/LanguageContext';

const ContactPage = () => {
  const { t } = useLanguage();

  return (
    <PageWrapper 
      title="Contact" 
      description="Contactez le CREC pour toute information ou demande"
    >
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Formulaire de contact */}
        <div>
          <SectionTitle 
            title="Nous contacter" 
            subtitle="Envoyez-nous un message et nous vous répondrons dans les plus brefs délais"
          />
          
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-crec-darkgray mb-1">
                  Prénom
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-crec-gold focus:border-crec-gold"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-crec-darkgray mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-crec-gold focus:border-crec-gold"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-crec-darkgray mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-crec-gold focus:border-crec-gold"
                required
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-crec-darkgray mb-1">
                Sujet
              </label>
              <select
                id="subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-crec-gold focus:border-crec-gold"
                required
              >
                <option value="">Sélectionnez un sujet</option>
                <option value="information">Demande d'informations</option>
                <option value="admission">Admission et inscriptions</option>
                <option value="partnership">Proposition de partenariat</option>
                <option value="other">Autre</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-crec-darkgray mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-crec-gold focus:border-crec-gold"
                required
              ></textarea>
            </div>
            
            <div className="flex items-start">
              <input
                id="privacy"
                type="checkbox"
                className="mt-1 h-4 w-4 text-crec-gold border-gray-300 rounded focus:ring-crec-gold"
                required
              />
              <label htmlFor="privacy" className="ml-2 text-sm text-crec-darkgray">
                J'accepte que mes données soient traitées conformément à la {' '}
                <a href="/privacy" className="text-crec-blue hover:text-crec-gold underline">
                  politique de confidentialité
                </a>
              </label>
            </div>
            
            <div>
              <button
                type="submit"
                className="px-6 py-3 bg-crec-darkblue text-white rounded-md hover:bg-crec-blue transition"
              >
                {t('common.submit')}
              </button>
            </div>
          </form>
        </div>
        
        {/* Informations de contact */}
        <div>
          <SectionTitle title="Informations de contact" />
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-medium text-crec-darkblue mb-2">Adresse</h3>
              <p className="text-crec-darkgray">
                CREC - Centre de Recherche, d'Étude et de Créativité<br />
                123 Avenue de l'Éducation<br />
                75001 Paris<br />
                France
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-crec-darkblue mb-2">Contact</h3>
              <p className="text-crec-darkgray">
                Email: contact@crec-education.org<br />
                Téléphone: +33 (0)1 23 45 67 89<br />
                Fax: +33 (0)1 23 45 67 90
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-crec-darkblue mb-2">Horaires d'ouverture</h3>
              <p className="text-crec-darkgray">
                Lundi - Vendredi: 9h00 - 17h00<br />
                Samedi: 9h00 - 12h00<br />
                Dimanche: Fermé
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-crec-darkblue mb-2">Accès</h3>
              <p className="text-crec-darkgray mb-4">
                Métro: Ligne 4, station Saint-Michel<br />
                RER: Ligne B, station Saint-Michel Notre-Dame<br />
                Bus: Lignes 21, 27, 38, 85, 96, arrêt Saint-Michel
              </p>
              
              <div className="h-64 bg-gray-200 rounded-lg">
                {/* TODO: Intégrer Google Maps */}
                <div className="w-full h-full flex items-center justify-center text-crec-darkgray">
                  Carte Google Maps à intégrer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ContactPage;
