import React from 'react';
import Banner from '@/components/common/Banner';
import SectionTitle from '@/components/common/SectionTitle';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart, Users, Book } from 'lucide-react';

const DonatePage = () => {
  const donationOptions = [
    {
      id: 1,
      title: 'Bourse d\'études',
      description: 'Soutenez un étudiant talentueux qui n\'a pas les moyens de poursuivre ses études.',
      icon: Book,
      link: '/donate/scholarships'
    },
    {
      id: 2,
      title: 'Projets éducatifs',
      description: 'Contribuez au développement de nos programmes éducatifs et de recherche.',
      icon: Heart,
      link: '/donate/projects'
    },
    {
      id: 3,
      title: 'Infrastructure',
      description: 'Aidez-nous à améliorer nos installations et équipements pédagogiques.',
      icon: Users,
      link: '/donate/infrastructure'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <Banner 
        title="Soutenez notre mission"
        subtitle="Votre don fait la différence dans la vie de nos étudiants et dans notre mission éducative"
        bgImages={['/img/donate-banner.jpg']}
        size="lg"
      />

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Pourquoi nous soutenir ?"
            subtitle="Votre contribution est essentielle pour notre mission"
            align="center"
          />
          
          <div className="max-w-4xl mx-auto mt-8 text-crec-darkgray space-y-6">
            <p>
              Le CREC s'engage à rendre l'éducation accessible à tous, en particulier aux plus défavorisés.
              Votre soutien nous permet de :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Offrir des bourses d'études aux étudiants talentueux</li>
              <li>Développer des programmes éducatifs innovants</li>
              <li>Améliorer nos installations et équipements</li>
              <li>Former des leaders responsables pour demain</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Options de don */}
      <section className="py-16 bg-crec-offwhite">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Comment nous soutenir"
            subtitle="Plusieurs façons de contribuer à notre mission"
            align="center"
          />
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {donationOptions.map((option) => (
              <Card
                key={option.id}
                title={option.title}
                description={option.description}
                className="hover:shadow-lg transition-shadow"
              >
                <option.icon className="w-12 h-12 text-crec-gold mb-4" />
                <Button 
                  className="mt-4 bg-crec-gold hover:bg-crec-lightgold text-white"
                  asChild
                >
                  <Link to={option.link}>En savoir plus</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire de don */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Faire un don"
            subtitle="Chaque contribution compte"
            align="center"
          />
          
          <div className="max-w-2xl mx-auto mt-8">
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-crec-darkgray mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-crec-gold focus:border-crec-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-crec-darkgray mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-crec-gold focus:border-crec-gold"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-crec-darkgray mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-crec-gold focus:border-crec-gold"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-crec-darkgray mb-2">
                  Montant du don
                </label>
                <div className="grid grid-cols-4 gap-4">
                  <Button variant="outline" className="border-crec-gold text-crec-darkblue hover:bg-crec-gold hover:text-white">
                    10€
                  </Button>
                  <Button variant="outline" className="border-crec-gold text-crec-darkblue hover:bg-crec-gold hover:text-white">
                    20€
                  </Button>
                  <Button variant="outline" className="border-crec-gold text-crec-darkblue hover:bg-crec-gold hover:text-white">
                    50€
                  </Button>
                  <Button variant="outline" className="border-crec-gold text-crec-darkblue hover:bg-crec-gold hover:text-white">
                    Autre
                  </Button>
                </div>
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-crec-gold hover:bg-crec-lightgold text-white py-3"
              >
                Faire un don
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-crec-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Devenez un bienfaiteur</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Rejoignez notre cercle de bienfaiteurs et contribuez durablement à notre mission.
          </p>
          <Button 
            className="bg-crec-gold hover:bg-crec-lightgold text-white px-8 py-6 text-lg"
            asChild
          >
            <Link to="/donate/benefactor">En savoir plus</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default DonatePage; 