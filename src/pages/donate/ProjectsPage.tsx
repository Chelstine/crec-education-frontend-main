import React from 'react';
import Banner from '@/components/common/Banner';
import SectionTitle from '@/components/common/SectionTitle';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Book, Lightbulb, Users } from 'lucide-react';

const ProjectsPage = () => {
  const projects = [
    {
      id: 1,
      title: 'Innovation pédagogique',
      description: 'Développement de nouvelles méthodes d\'enseignement et d\'apprentissage.',
      icon: Lightbulb,
      budget: '25000€',
      progress: 60
    },
    {
      id: 2,
      title: 'Bibliothèque numérique',
      description: 'Création d\'une plateforme de ressources éducatives en ligne.',
      icon: Book,
      budget: '15000€',
      progress: 40
    },
    {
      id: 3,
      title: 'Programme de mentorat',
      description: 'Mise en place d\'un système de mentorat pour les étudiants.',
      icon: Users,
      budget: '20000€',
      progress: 75
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <Banner 
        title="Projets éducatifs"
        subtitle="Soutenez nos initiatives pour une éducation innovante"
        bgImages={['/img/projects-banner.jpg']}
        size="lg"
      />

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Nos projets"
            subtitle="Des initiatives pour transformer l'éducation"
            align="center"
          />
          
          <div className="max-w-4xl mx-auto mt-8 text-crec-darkgray space-y-6">
            <p>
              Le CREC développe constamment de nouveaux projets pour améliorer la qualité
              de l'éducation et répondre aux défis contemporains. Votre soutien nous permet
              de concrétiser ces initiatives innovantes.
            </p>
            <p>
              Découvrez nos projets en cours et contribuez à leur réalisation pour
              transformer l'éducation et former les leaders de demain.
            </p>
          </div>
        </div>
      </section>

      {/* Projets en cours */}
      <section className="py-16 bg-crec-offwhite">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Projets en cours"
            subtitle="Soutenez nos initiatives actuelles"
            align="center"
          />
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {projects.map((project) => (
              <Card
                key={project.id}
                title={project.title}
                description={project.description}
                className="hover:shadow-lg transition-shadow"
              >
                <project.icon className="w-12 h-12 text-crec-gold mb-4" />
                <div className="mt-4">
                  <p className="text-lg font-semibold text-crec-darkblue">
                    Budget : {project.budget}
                  </p>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-crec-gold h-2 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <p className="text-sm text-crec-darkgray mt-1">
                      Progression : {project.progress}%
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Impact de vos dons"
            subtitle="Comment votre soutien fait la différence"
            align="center"
          />
          
          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-crec-darkblue">Résultats</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-crec-gold rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    500+
                  </div>
                  <div>
                    <h4 className="font-semibold text-crec-darkblue">Étudiants impactés</h4>
                    <p className="text-crec-darkgray">Par nos projets</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-crec-gold rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    15
                  </div>
                  <div>
                    <h4 className="font-semibold text-crec-darkblue">Projets réalisés</h4>
                    <p className="text-crec-darkgray">Depuis 2020</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 text-crec-darkblue">Témoignages</h3>
              <div className="space-y-6">
                <div className="bg-crec-offwhite p-6 rounded-lg">
                  <p className="italic text-crec-darkgray mb-4">
                    "Les projets du CREC ont transformé notre façon d'apprendre et d'enseigner."
                  </p>
                  <p className="font-semibold text-crec-darkblue">- Prof. Martin D.</p>
                </div>
                <div className="bg-crec-offwhite p-6 rounded-lg">
                  <p className="italic text-crec-darkgray mb-4">
                    "Grâce aux innovations pédagogiques, j'ai pu développer des compétences essentielles pour mon avenir."
                  </p>
                  <p className="font-semibold text-crec-darkblue">- Sarah M., Étudiante</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-crec-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Soutenez nos projets</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Votre contribution permet de concrétiser des projets innovants pour l'éducation.
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

export default ProjectsPage; 