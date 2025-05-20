import React from 'react';
import Banner from '@/components/common/Banner';
import SectionTitle from '@/components/common/SectionTitle';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { GraduationCap, Users, Heart } from 'lucide-react';

const ScholarshipsPage = () => {
  const scholarshipTypes = [
    {
      id: 1,
      title: 'Bourse complète',
      description: 'Couvre les frais de scolarité, le logement et les repas pour un étudiant talentueux.',
      icon: GraduationCap,
      amount: '5000€/an'
    },
    {
      id: 2,
      title: 'Bourse partielle',
      description: 'Aide financière pour couvrir une partie des frais de scolarité.',
      icon: Heart,
      amount: '2500€/an'
    },
    {
      id: 3,
      title: 'Bourse d\'excellence',
      description: 'Récompense les meilleurs étudiants pour leur excellence académique.',
      icon: Users,
      amount: '3000€/an'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <Banner 
        title="Bourses d'études"
        subtitle="Soutenez l'éducation des talents de demain"
        bgImages={['/img/scholarships-banner.jpg']}
        size="lg"
      />

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Nos programmes de bourses"
            subtitle="Donnez une chance aux talents de demain"
            align="center"
          />
          
          <div className="max-w-4xl mx-auto mt-8 text-crec-darkgray space-y-6">
            <p>
              Le CREC s'engage à rendre l'éducation accessible aux étudiants talentueux, 
              indépendamment de leurs moyens financiers. Nos programmes de bourses permettent 
              à des jeunes prometteurs de poursuivre leurs études et de réaliser leur potentiel.
            </p>
            <p>
              En soutenant nos programmes de bourses, vous contribuez directement à la formation 
              des leaders de demain et à la construction d'une société plus juste et plus équitable.
            </p>
          </div>
        </div>
      </section>

      {/* Types de bourses */}
      <section className="py-16 bg-crec-offwhite">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Types de bourses"
            subtitle="Plusieurs options pour soutenir nos étudiants"
            align="center"
          />
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {scholarshipTypes.map((scholarship) => (
              <Card
                key={scholarship.id}
                title={scholarship.title}
                description={scholarship.description}
                className="hover:shadow-lg transition-shadow"
              >
                <scholarship.icon className="w-12 h-12 text-crec-gold mb-4" />
                <p className="text-xl font-bold text-crec-gold mt-4">
                  {scholarship.amount}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Votre impact"
            subtitle="Comment votre soutien fait la différence"
            align="center"
          />
          
          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-crec-darkblue">Témoignages</h3>
              <div className="space-y-8">
                <div className="bg-crec-offwhite p-6 rounded-lg">
                  <p className="italic text-crec-darkgray mb-4">
                    "Grâce à la bourse du CREC, j'ai pu poursuivre mes études et réaliser mon rêve de devenir ingénieur. Cette opportunité a changé ma vie."
                  </p>
                  <p className="font-semibold text-crec-darkblue">- Jean K., Boursier 2023</p>
                </div>
                <div className="bg-crec-offwhite p-6 rounded-lg">
                  <p className="italic text-crec-darkgray mb-4">
                    "Le soutien financier m'a permis de me concentrer sur mes études sans me soucier des frais de scolarité. Je suis reconnaissant pour cette chance."
                  </p>
                  <p className="font-semibold text-crec-darkblue">- Marie L., Boursière 2022</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 text-crec-darkblue">Chiffres clés</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-crec-gold rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    50+
                  </div>
                  <div>
                    <h4 className="font-semibold text-crec-darkblue">Étudiants soutenus</h4>
                    <p className="text-crec-darkgray">Depuis 2020</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-crec-gold rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    85%
                  </div>
                  <div>
                    <h4 className="font-semibold text-crec-darkblue">Taux de réussite</h4>
                    <p className="text-crec-darkgray">Des boursiers</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-crec-gold rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    100%
                  </div>
                  <div>
                    <h4 className="font-semibold text-crec-darkblue">Engagement</h4>
                    <p className="text-crec-darkgray">Pour l'excellence académique</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-crec-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Soutenez un étudiant</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Votre don peut changer la vie d'un étudiant talentueux. Contribuez dès aujourd'hui à notre programme de bourses.
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

export default ScholarshipsPage; 