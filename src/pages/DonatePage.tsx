/* ====== IMPORTS REACT ET HOOKS ====== */
import React from 'react'; // Import de React pour créer des composants JSX

/* ====== IMPORTS COMPOSANTS UI ====== */
import { Button } from '@/components/ui/button'; // Composant Button stylisé réutilisable
import { Card } from '@/components/common/Card'; // Composant Card personnalisé du projet

/* ====== IMPORTS NAVIGATION ====== */
import { Link } from 'react-router-dom'; // Composant Link pour la navigation interne

/* ====== IMPORTS ICÔNES ====== */
import { Heart, Users, GraduationCap, Leaf, Building2 } from 'lucide-react';
// - Heart : icône cœur pour les dons
// - Users : icône groupe d'utilisateurs  
// - GraduationCap : icône chapeau de diplômé pour l'éducation
// - Leaf : icône feuille pour l'écologie/développement durable
// - Building2 : icône bâtiment pour l'institution

/* ====== IMPORTS COMPOSANTS COMMUNS ====== */
import Banner from '@/components/common/Banner'; // Composant Banner pour les en-têtes de page
import SectionTitle from '@/components/common/SectionTitle'; // Composant pour les titres de section

const DonatePage = () => {
  const donationOptions = [
    {
      id: 1,
      title: 'Don unique',
      description: 'Faites un don ponctuel pour soutenir nos projets éducatifs',
      amount: '50€',
      icon: Heart
    },
    {
      id: 2,
      title: 'Don mensuel',
      description: 'Soutenez-nous régulièrement pour un impact durable',
      amount: '20€/mois',
      icon: Users
    },
    {
      id: 3,
      title: 'Don annuel',
      description: 'Engagez-vous sur le long terme pour nos programmes',
      amount: '200€/an',
      icon: Building2
    }
  ];

  const impactAreas = [
    {
      id: 1,
      title: 'Formation',
      description: 'Soutenez nos programmes éducatifs et nos bourses d\'études',
      icon: GraduationCap,
      image: '/img/formation.png'
    },
    {
      id: 2,
      title: 'Écologie',
      description: 'Contribuez à nos projets de développement durable',
      icon: Leaf,
      image: '/img/ecologie.png'
    },
    {
      id: 3,
      title: 'Innovation',
      description: 'Participez au développement de nos espaces créatifs',
      icon: Building2,
      image: '/img/fablab.png'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <Banner 
        title="Soutenez notre mission"
        subtitle="Votre don fait la différence dans la vie de nos étudiants et dans notre engagement pour une éducation de qualité."
        bgImages={['/img/don.png']}
        ctaText="Faire un don"
        ctaLink="#donate"
        size="lg"
      />

      {/* Pourquoi donner section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Pourquoi nous soutenir ?"
            subtitle="Votre contribution est essentielle pour notre mission éducative"
            align="center"
          />
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {donationOptions.map((option) => (
              <Card
                key={option.id}
                title={option.title}
                description={option.description}
                className="text-center"
              >
                <div className="flex flex-col items-center">
                  <option.icon className="w-12 h-12 text-crec-gold mb-4" />
                  <p className="text-2xl font-bold text-crec-darkblue mb-4">{option.amount}</p>
                  <Button asChild className="bg-crec-gold hover:bg-crec-lightgold text-white">
                    <Link to={`/donate/${option.id}`}>Choisir cette option</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact section */}
      <section className="py-16 bg-crec-offwhite">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="L'impact de votre don"
            subtitle="Découvrez comment votre contribution fait la différence"
            align="center"
          />
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {impactAreas.map((area) => (
              <Card
                key={area.id}
                title={area.title}
                description={area.description}
                image={area.image}
                className="hover:shadow-lg transition-shadow"
              >
                <area.icon className="w-12 h-12 text-crec-gold mb-4" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comment donner section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Comment faire un don ?"
            subtitle="Plusieurs façons de nous soutenir"
            align="center"
          />
          
          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <div>
              <h3 className="text-xl font-bold mb-4 text-crec-darkblue">Don en ligne</h3>
              <p className="mb-6 text-crec-darkgray">
                Faites un don sécurisé en ligne via notre plateforme de paiement.
                Nous acceptons les cartes bancaires et les virements.
              </p>
              <Button asChild className="bg-crec-gold hover:bg-crec-lightgold text-white">
                <Link to="/donate/online">Faire un don en ligne</Link>
              </Button>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 text-crec-darkblue">Autres moyens de don</h3>
              <ul className="space-y-4 text-crec-darkgray">
                <li>• Virement bancaire</li>
                <li>• Chèque</li>
                <li>• Don en nature</li>
                <li>• Legs et donations</li>
              </ul>
              <Button asChild variant="outline" className="mt-6 border-crec-gold text-crec-darkblue hover:bg-crec-gold hover:text-white">
                <Link to="/donate/other">En savoir plus</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-crec-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Prêt à nous soutenir ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Votre don contribue à former une nouvelle génération de leaders compétents et responsables.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-crec-gold hover:bg-crec-lightgold text-white px-8 py-6 text-lg"
              asChild
            >
              <Link to="/donate/online">Faire un don maintenant</Link>
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

export default DonatePage; 