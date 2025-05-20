import React from 'react';
import Banner from '@/components/common/Banner';
import SectionTitle from '@/components/common/SectionTitle';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart, Star, Users } from 'lucide-react';

const BenefactorPage = () => {
  const benefactorLevels = [
    {
      id: 1,
      title: 'Bienfaiteur Bronze',
      description: 'Pour les dons annuels de 1000€ à 4999€',
      icon: Heart,
      benefits: [
        'Reconnaissance sur notre site web',
        'Invitation aux événements annuels',
        'Newsletter trimestrielle'
      ]
    },
    {
      id: 2,
      title: 'Bienfaiteur Argent',
      description: 'Pour les dons annuels de 5000€ à 9999€',
      icon: Star,
      benefits: [
        'Tous les avantages Bronze',
        'Visite guidée du campus',
        'Rencontre avec les étudiants',
        'Rapport d\'impact personnalisé'
      ]
    },
    {
      id: 3,
      title: 'Bienfaiteur Or',
      description: 'Pour les dons annuels de 10000€ et plus',
      icon: Users,
      benefits: [
        'Tous les avantages Argent',
        'Nom sur une salle ou un espace',
        'Accès aux événements VIP',
        'Rencontre avec le directeur'
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <Banner 
        title="Devenez bienfaiteur"
        subtitle="Rejoignez notre cercle de bienfaiteurs et contribuez durablement à notre mission"
        bgImages={['/img/benefactor-banner.jpg']}
        size="lg"
      />

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Notre cercle de bienfaiteurs"
            subtitle="Un engagement durable pour l'éducation"
            align="center"
          />
          
          <div className="max-w-4xl mx-auto mt-8 text-crec-darkgray space-y-6">
            <p>
              Nos bienfaiteurs sont des partenaires essentiels dans notre mission éducative.
              Leur soutien régulier nous permet de planifier et développer des projets 
              ambitieux pour l'éducation des jeunes.
            </p>
            <p>
              En rejoignant notre cercle de bienfaiteurs, vous bénéficiez d'avantages exclusifs
              et vous contribuez de manière significative à la formation des leaders de demain.
            </p>
          </div>
        </div>
      </section>

      {/* Niveaux de bienfaiteurs */}
      <section className="py-16 bg-crec-offwhite">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Niveaux de bienfaiteurs"
            subtitle="Choisissez le niveau qui vous convient"
            align="center"
          />
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {benefactorLevels.map((level) => (
              <Card
                key={level.id}
                title={level.title}
                description={level.description}
                className="hover:shadow-lg transition-shadow"
              >
                <level.icon className="w-12 h-12 text-crec-gold mb-4" />
                <ul className="mt-4 space-y-2">
                  {level.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 text-crec-darkgray">
                      <span className="text-crec-gold">•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages fiscaux */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Avantages fiscaux"
            subtitle="Votre don vous permet de bénéficier d'avantages fiscaux"
            align="center"
          />
          
          <div className="max-w-3xl mx-auto mt-8">
            <div className="bg-crec-offwhite p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-crec-darkblue">Réduction fiscale</h3>
              <p className="text-crec-darkgray mb-6">
                Votre don est éligible à une réduction fiscale de 66% du montant versé,
                dans la limite de 20% de votre revenu imposable.
              </p>
              <div className="bg-white p-6 rounded-lg border border-crec-gold">
                <h4 className="font-semibold mb-2 text-crec-darkblue">Exemple :</h4>
                <p className="text-crec-darkgray">
                  Un don de 1000€ vous coûte réellement 340€ après réduction fiscale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-crec-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Rejoignez notre cercle</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Devenez bienfaiteur et contribuez à la formation des leaders de demain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-crec-gold hover:bg-crec-lightgold text-white px-8 py-6 text-lg"
              asChild
            >
              <Link to="/donate">Faire un don</Link>
            </Button>
            <Button 
              variant="outline"
              className="border-white text-white hover:bg-white/20 px-8 py-6 text-lg"
              asChild
            >
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BenefactorPage; 