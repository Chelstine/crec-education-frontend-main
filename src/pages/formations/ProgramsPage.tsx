import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Printer, Wrench, MapPin, Clock, Lightbulb, Users, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

// Define TypeScript interface
interface Machine {
  name: string;
  code: string;
  features: string[];
  reference: string;
  monthlyPrice: number;
  yearlyPrice: number;
}

const ProgramsPage = () => {
  const machines: Machine[] = [
    {
      name: 'Creality Ender-5 S1',
      code: 'FAB IMP 01',
      features: ['250mm/s Grande Vitesse', '300°C Haute Température', 'Détection de Filaments', 'CR Touch Auto-Nivellement', '220x220x280mm'],
      reference: 'B0BQJCX9HC',
      monthlyPrice: 10000,
      yearlyPrice: 100000,
    },
    {
      name: 'Creality Ender-3',
      code: 'FAB IMP 02',
      features: ['Protection de l’Alimentation', 'Impression de Reprise', '220x220x250mm'],
      reference: 'B07BR3F9N6',
      monthlyPrice: 8000,
      yearlyPrice: 80000,
    },
    {
      name: 'Creality Ender-3',
      code: 'FAB IMP 03',
      features: ['Protection de l’Alimentation', 'Impression de Reprise', '220x220x250mm'],
      reference: 'B07BR3F9N6',
      monthlyPrice: 7200,
      yearlyPrice: 80000,
    },
    {
      name: 'Anycubic Kobra',
      code: 'FAB IMP 04',
      features: ['500mm/s Grande Vitesse', 'Pro', 'Nivellement de Auto LeviQ 2.0', '220x220x250mm'],
      reference: 'B0CDVX32X4',
      monthlyPrice: 12500,
      yearlyPrice: 120000,
    },
    {
      name: 'Latilool F50 Laser Engraver',
      code: 'FAB GRAV',
      features: ['50W Puissance', 'Protection des Yeux', '400x400mm', 'Gravure sur Bois, Métal, Verre, Acrylique'],
      reference: 'B0B6NG84VF',
      monthlyPrice: 15000,
      yearlyPrice: 150000,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-[15pt] bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        <div
          className="min-h-[400px] flex flex-col items-center justify-center text-center relative text-white p-6"
          style={{
            backgroundImage: "url('/img/fablab-crec-bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <motion.div
            className="max-w-3xl mx-auto bg-black/60 p-10 rounded-2xl backdrop-blur-md shadow-2xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">FabLab CREC</h1>
            <p className="text-xl md:text-2xl mb-6 leading-relaxed">
              Un espace jésuite d’innovation numérique pour créer, apprendre et collaborer au service du Bénin.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Button
                  className="w-full sm:w-auto px-8 py-3 bg-[#e69500] hover:bg-[#f7b733] text-white rounded-full shadow-md hover:shadow-lg transition-all text-lg font-semibold"
                  asChild
                >
                  <Link to="/souscription?redirect=reservation">Réserver une machine</Link>
                </Button>
              </motion.div>
              <Button
                className="w-full sm:w-auto px-6 py-3 border-white text-white hover:text-jesuit-dark hover:bg-white rounded-full text-lg font-semibold"
                asChild
              >
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* À propos */}
      <section className="py-16 px-4">
        <motion.div
          className="max-w-5xl mx-auto space-y-8 text-justify"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-800 mb-8">Le FabLab CREC : Un espace pour innover</h2>
          <p className="text-jesuit-darkgray text-lg leading-relaxed">
            Le FabLab du Centre de Recherche d’Étude et de Créativité (CREC) est un atelier collaboratif situé à Godomey, Bénin, inspiré par la mission jésuite de promouvoir l’excellence et le service. Ouvert à tous — étudiants, entrepreneurs, artisans — il offre un accès à des imprimantes 3D et un graveur laser pour transformer vos idées en prototypes.
          </p>
          <p className="text-jesuit-darkgray text-lg leading-relaxed">
            Guidé par la <em>cura personalis</em> et le <em>magis</em>, le FabLab propose des formations, un accès autonome supervisé, et des services assistés pour concrétiser vos projets. Notre communauté dynamique favorise le partage de savoir-faire et l’innovation sociale, en soutenant le développement local et durable.
          </p>
        </motion.div>
      </section>

      {/* Nos valeurs */}
      <section className="py-16 bg-jesuit-light">
        <div className="max-w-5xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center text-jesuit-dark"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Nos valeurs
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              {
                icon: Lightbulb,
                title: 'Innovation',
                description: 'Transformez vos idées en réalité avec des outils numériques de pointe.',
              },
              {
                icon: Users,
                title: 'Collaboration',
                description: 'Participez à une communauté jésuite unie par la créativité et le partage.',
              },
              {
                icon: BookOpen,
                title: 'Apprentissage',
                description: 'Développez vos compétences grâce à des formations pratiques et accessibles.',
              },
            ].map((value, i) => (
              <Card key={i} className="bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <value.icon className="w-12 h-12 text-jesuit-gold mb-4" />
                  <h3 className="text-xl font-semibold text-jesuit-dark mb-2">{value.title}</h3>
                  <p className="text-jesuit-darkgray text-base">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Machines */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center text-jesuit-dark"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Nos équipements
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {machines.map((machine, i) => (
              <motion.div
                key={machine.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <Card className="max-w-sm hover:shadow-lg transition">
                  <CardContent className="p-6">
                    <img
                      src={`/img/machines/${machine.code.toLowerCase()}.jpg`}
                      alt={machine.name}
                      className="w-full h-48 object-cover rounded-md mb-6"
                      onError={(e) => (e.currentTarget.src = '/img/placeholder-machine.jpg')}
                    />
                    <h3 className="text-xl font-bold mb-4 text-jesuit-dark">{machine.name} ({machine.code})</h3>
                    <ul className="text-jesuit-darkgray text-base leading-relaxed mb-4 list-disc list-inside">
                      {machine.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                    <p className="text-jesuit-darkgray text-sm">
                      <span className="font-medium text-jesuit-dark">Abonnement :</span> {machine.monthlyPrice.toLocaleString()} FCFA/mois ou {machine.yearlyPrice.toLocaleString()} FCFA/an
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services et Tarifs */}
      <section className="py-16 bg-jesuit-light">
        <div className="max-w-5xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center text-jesuit-dark"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Services et tarifs
          </motion.h2>
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-jesuit-dark flex items-center gap-2 mb-4">
                    <Wrench className="w-6 h-6 text-jesuit-gold" /> Utilisation autonome
                  </h3>
                  <ul className="text-jesuit-darkgray text-base list-disc list-inside">
                    <li>Réservation en ligne</li>
                    <li>Formation obligatoire (164,125 FCFA)</li>
                    <li>Accès supervisé (25,210 FCFA/heure)</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-jesuit-dark flex items-center gap-2 mb-4">
                    <Printer className="w-6 h-6 text-jesuit-gold" /> Service assisté
                  </h3>
                  <ul className="text-jesuit-darkgray text-base list-disc list-inside">
                    <li>Envoyez votre fichier</li>
                    <li>Devis personnalisé</li>
                    <li>Fabrication et retrait (47,268 FCFA/heure)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border border-amber-200 text-left bg-white/80 backdrop-blur-sm shadow-md rounded-lg">
                <thead className="bg-amber-50">
                  <tr>
                    <th className="p-4 font-semibold text-jesuit-dark">Machine</th>
                    <th className="p-4 font-semibold text-jesuit-dark">Mensuel</th>
                    <th className="p-4 font-semibold text-jesuit-dark">Annuel</th>
                  </tr>
                </thead>
                <tbody>
                  {machines.map((machine) => (
                    <tr key={machine.code} className="border-t border-amber-200">
                      <td className="p-4">{machine.name} ({machine.code})</td>
                      <td className="p-4 text-[#e69500] font-medium">{machine.monthlyPrice.toLocaleString()} FCFA</td>
                      <td className="p-4 text-[#e69500] font-medium">{machine.yearlyPrice.toLocaleString()} FCFA</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-jesuit-darkgray">
              Paiements via carte bancaire ou Mobile Money (MoovMoney, MTN, Celtiis).
            </p>
          </motion.div>
        </div>
      </section>

      {/* Infos pratiques */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center text-jesuit-dark"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Infos pratiques
          </motion.h2>
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center text-jesuit-darkgray">
              <Card className="bg-white/80 backdrop-blur-sm shadow-md">
                <CardContent className="p-6">
                  <Clock className="w-12 h-12 text-jesuit-gold mx-auto mb-4" />
                  <p className="text-base">Ouvert de 8h à 17h</p>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm shadow-md">
                <CardContent className="p-6">
                  <MapPin className="w-12 h-12 text-jesuit-gold mx-auto mb-4" />
                  <p className="text-base">Godomey, Bénin</p>
                </CardContent>
              </Card>
            </div>
            <iframe
              title="Localisation CREC"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26805.608272842124!2d2.305574410839845!3d6.383382500000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x102357caccf1e90d%3A0xbce64d9a20725bcc!2sCentre%20J%C3%A9suite%20De%20Recherche%20D%27Etude%20Et%20De%20Cr%C3%A9ativit%C3%A9!5e1!3m2!1sfr!2sbj!4v1748345292350!5m2!1sfr!2sbj"
              className="w-full h-64 rounded-lg border border-amber-200"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label="Carte de localisation du CREC à Godomey, Bénin"
            />
            <p className="text-center text-jesuit-darkgray">
              <a
                href="https://maps.app.goo.gl/6hS2iXvG5WjZ8KkD7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e69500] hover:underline"
              >
                CREC, Godomey, Bénin
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1A2526] text-gray-100">
        <div className="max-w-3xl mx-auto text-center px-4">
          <motion.h2
            className="text-4xl font-bold mb-6 text-gray-100"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Rejoignez le FabLab CREC
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Créez, innovez et collaborez dans un espace dédié à l’excellence et au service.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Button
          className="w-full sm:w-auto px-8 py-3 bg-[#e69500] hover:bg-[#f7b733] text-white rounded-full shadow-md hover:shadow-lg transition-all text-lg font-semibold"
          asChild
              >
          <Link to="/souscription?redirect=reservation">Réserver une machine</Link>
              </Button>
            </motion.div>
            <Button
              className="w-full sm:w-auto px-6 py-3 border-white text-white hover:text-jesuit-dark hover:bg-white rounded-full text-lg font-semibold"
              asChild
            >
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </motion.div>
        </div>
            </section>
    </div>
  );
};

export default ProgramsPage;