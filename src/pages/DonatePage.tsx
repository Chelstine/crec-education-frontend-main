import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

// Icons
import { 
  Heart, 
  GraduationCap, 
  Building2, 
  CheckCircle2,
  ArrowRight,
  Handshake,
  Sparkles
} from 'lucide-react';

// Common Components
import SectionTitle from '@/components/common/SectionTitle';

const DonatePage = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Types of partnership
  const partnershipTypes = [
    {
      id: 1,
      title: 'Partenaires Académiques',
      description: 'Collaboration avec des institutions d\'enseignement pour enrichir nos programmes et favoriser les échanges académiques',
      icon: GraduationCap,
      color: 'bg-blue-50 text-blue-600',
      borderColor: 'border-blue-200'
    },
    {
      id: 2,
      title: 'Partenaires Financiers',
      description: 'Soutien financier pour développer nos infrastructures, offrir des bourses et élargir l\'accès à l\'éducation',
      icon: Heart,
      color: 'bg-rose-50 text-rose-500',
      borderColor: 'border-rose-200'
    },
    {
      id: 3,
      title: 'Partenaires Technologiques',
      description: 'Dons d\'équipements, transfert de compétences et opportunités de stages pour nos étudiants',
      icon: Sparkles,
      color: 'bg-amber-50 text-amber-500',
      borderColor: 'border-amber-200'
    },
    {
      id: 4,
      title: 'Partenaires Communautaires',
      description: 'Collaboration avec des organisations locales pour créer un impact social positif et ancrer nos actions dans la communauté',
      icon: Handshake,
      color: 'bg-green-50 text-green-600',
      borderColor: 'border-green-200'
    }
  ];



  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner - Partnership Focus */}
      <section className="relative w-full overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-[url('/img/crec3.jpg')] bg-cover bg-center bg-no-repeat" />
        <div className="absolute inset-0 bg-gradient-to-r from-crec-darkblue/90 to-crec-darkblue/80" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
                <Building2 className="w-4 h-4 text-crec-gold mr-2" />
                <span className="text-sm font-medium text-white">Devenez partenaire du CREC</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Ensemble, construisons <br />
                <span className="text-crec-gold">l'avenir de l'Afrique</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg text-blue-50 mb-6">
                Rejoignez-nous dans notre mission de former la prochaine génération de leaders.
              </motion.p>
              
              <motion.div variants={fadeInUp}>
                <Button size="lg" asChild className="bg-crec-gold hover:bg-crec-gold/90 text-crec-darkblue">
                  <a href="#contact-partenariat">Devenir partenaire</a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12" fill="white">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,213.35,56.44Z" />
          </svg>
        </div>
      </section>



      {/* Partnership Types Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <Badge variant="outline" className="px-3.5 py-1.5 mb-4 border-crec-gold/40 bg-crec-gold/5 text-crec-gold">
                Types de partenariats
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-crec-darkblue">
                Comment pouvez-vous contribuer?
              </h2>
              <p className="text-base text-slate-600 max-w-2xl mx-auto">
                Le CREC accueille différentes formes de partenariats, chacune contribuant à notre mission éducative.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {partnershipTypes.map((type) => (
                <motion.div
                  key={type.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="h-full"
                >
                  <Card className={`h-full border-2 ${type.borderColor} shadow-lg`}>
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className={`${type.color} w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto`}>
                        <type.icon className="w-8 h-8" />
                      </div>
                      
                      <h3 className="text-xl font-bold mb-4 text-crec-darkblue text-center">{type.title}</h3>
                      <p className="text-slate-600 mb-6 text-center flex-grow">{type.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div id="contact-partenariat" className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="text-center mb-6">
                <Building2 className="w-10 h-10 text-crec-gold mx-auto mb-3" />
                <h3 className="text-xl font-bold mb-3 text-crec-darkblue">Devenir partenaire du CREC</h3>
                <p className="text-slate-600 max-w-2xl mx-auto text-sm">
                  Notre équipe est prête à discuter des possibilités de partenariat adaptées à votre organisation.
                </p>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-lg mb-4 max-w-3xl mx-auto">
                <h4 className="font-bold text-crec-darkblue mb-3 text-base text-center">Avantages du partenariat</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-crec-gold mr-2 mt-0.5 shrink-0" />
                        <span>Visibilité sur nos supports</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-crec-gold mr-2 mt-0.5 shrink-0" />
                        <span>Événements exclusifs</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-crec-gold mr-2 mt-0.5 shrink-0" />
                        <span>Recrutement privilégié</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-crec-gold mr-2 mt-0.5 shrink-0" />
                        <span>Accès aux infrastructures</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-crec-gold mr-2 mt-0.5 shrink-0" />
                        <span>Impact local direct</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-crec-gold mr-2 mt-0.5 shrink-0" />
                        <span>Rapport d'impact annuel</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Link to="/contact">
                  <Button size="lg" className="bg-crec-darkblue hover:bg-crec-darkblue/90 text-white py-6 px-8">
                    Contactez-nous pour devenir partenaire <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default DonatePage;