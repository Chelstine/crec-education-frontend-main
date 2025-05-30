import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Lightbulb, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

// Define TypeScript interfaces
interface DonationOption {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  amount: number; // FCFA
}

const DonatePage = () => {
  const [donationType, setDonationType] = useState('');
  const [customAmount, setCustomAmount] = useState('');

  const donationOptions: DonationOption[] = [
    {
      id: 's1',
      title: 'Bourse complète',
      description: 'Couvre les frais de scolarité, logement et repas pour un étudiant méritant.',
      icon: GraduationCap,
      amount: 3282500, // 5,000 € * 656.50 FCFA
    },
    {
      id: 's2',
      title: 'Bourse partielle',
      description: 'Soutient les frais de scolarité d’un étudiant talentueux.',
      icon: Heart,
      amount: 1641250, // 2,500 € * 656.50 FCFA
    },
    {
      id: 'p1',
      title: 'Fonds pour l’innovation éducative',
      description: 'Finance des méthodes d’enseignement innovantes.',
      icon: Lightbulb,
      amount: 16412500, // 25,000 € * 656.50 FCFA
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-[15pt] bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section (Unchanged) */}
      <section className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        <div
          className="min-h-[400px] flex flex-col items-center justify-center text-center relative text-white p-6"
          style={{
            backgroundImage: "url('/img/donate-banner.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <motion.div
            className="max-w-3xl mx-auto bg-black/60 p-10 rounded-2xl backdrop-blur-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Soutenez la mission CREC</h1>
            <p className="text-xl md:text-2xl mb-6 leading-relaxed">
              Votre don transforme des vies en favorisant une éducation jésuite accessible à tous.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          </motion.div>
        </div>
      </section>

      {/* Pourquoi donner */}
      <section className="py-16 px-6">
        <motion.div
          className="max-w-5xl mx-auto space-y-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-amber-800">Pourquoi donner ?</h2>
          <p className="text-jesuit-darkgray text-lg leading-relaxed">
            Votre don au CREC soutient notre mission jésuite d’éducation, de justice sociale et de formation de leaders éthiques au Bénin. Il finance des bourses pour étudiants méritants, des programmes éducatifs innovants et des initiatives communautaires. 90% des dons sont directement affectés à ces programmes, 10% assurent leur gestion efficace.
          </p>
        </motion.div>
      </section>

      {/* Comment donner */}
      <section className="py-16 bg-jesuit-light">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center text-jesuit-dark"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Comment donner
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {donationOptions.map((option) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (parseInt(option.id.slice(1)) - 1) * 0.2 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm shadow-md rounded-lg hover:shadow-lg transition-all">
                  <CardContent className="p-6 flex flex-col items-center text-center h-full">
                    <option.icon className="w-12 h-12 text-[#e69500] mb-4" />
                    <h3 className="text-xl font-semibold text-jesuit-dark mb-2">{option.title}</h3>
                    <p className="text-jesuit-darkgray text-base leading-relaxed mb-4">{option.description}</p>
                    <p className="text-lg font-bold text-[#e69500]">{option.amount.toLocaleString()} FCFA</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-jesuit-dark">Dons réguliers</h3>
            <p className="text-jesuit-darkgray text-base leading-relaxed">
              Engagez-vous à long terme avec un don mensuel ou annuel. Contactez notre bureau de développement pour personnaliser votre contribution.
            </p>
            <p className="text-jesuit-darkgray text-base mt-4">
              Email: giving@crec.bj | Tél: +229 1234 5678
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center text-jesuit-dark"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Votre impact
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-jesuit-dark">Témoignage</h3>
              <Card className="bg-white/80 backdrop-blur-sm shadow-md rounded-lg">
                <CardContent className="p-6">
                  <p className="italic text-jesuit-darkgray mb-4">
                    “Grâce à une bourse CREC, j’ai pu poursuivre mes études en ingénierie, ouvrant la voie à un avenir meilleur.”
                  </p>
                  <p className="font-semibold text-jesuit-dark">- Jean K., Boursier 2023</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-jesuit-dark">Nos résultats</h3>
              <div className="grid grid-cols-1 gap-6">
                <Card className="bg-white/80 backdrop-blur-sm shadow-md rounded-lg">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#e69500] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      50+
                    </div>
                    <div>
                      <h4 className="font-semibold text-jesuit-dark">Boursiers soutenus</h4>
                      <p className="text-jesuit-darkgray">Depuis 2020</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white/80 backdrop-blur-sm shadow-md rounded-lg">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#e69500] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      85%
                    </div>
                    <div>
                      <h4 className="font-semibold text-jesuit-dark">Taux de réussite</h4>
                      <p className="text-jesuit-darkgray">Des boursiers</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Formulaire de don */}
      <section id="donation-form" className="py-16 bg-jesuit-light">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center text-jesuit-dark"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Faire un don
          </motion.h2>
          <motion.form
            className="space-y-6 bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={(e) => e.preventDefault()} // Placeholder; add backend logic
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-jesuit-dark mb-2">
                  Prénom
                </label>
                <input
                  id="firstName"
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-amber-200 rounded-md focus:ring-[#e69500] focus:border-[#e69500] transition-all"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-jesuit-dark mb-2">
                  Nom
                </label>
                <input
                  id="lastName"
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-amber-200 rounded-md focus:ring-[#e69500] focus:border-[#e69500] transition-all"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-jesuit-dark mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-4 py-2 border border-amber-200 rounded-md focus:ring-[#e69500] focus:border-[#e69500] transition-all"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-jesuit-dark mb-2">
                Téléphone (optionnel)
              </label>
              <input
                id="phone"
                type="tel"
                className="w-full px-4 py-2 border border-amber-200 rounded-md focus:ring-[#e69500] focus:border-[#e69500] transition-all"
              />
            </div>
            <div>
              <label htmlFor="donationType" className="block text-sm font-medium text-jesuit-dark mb-2">
                Destination du don
              </label>
              <select
                id="donationType"
                value={donationType}
                onChange={(e) => setDonationType(e.target.value)}
                required
                className="w-full px-4 py-2 border border-amber-200 rounded-md focus:ring-[#e69500] focus:border-[#e69500] transition-all"
              >
                <option value="">Sélectionnez une option</option>
                {donationOptions.map((option) => (
                  <option key={option.id} value={option.title}>
                    {option.title}
                  </option>
                ))}
                <option value="general">Fonds général</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-jesuit-dark mb-2">
                Montant du don (FCFA)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { amount: 6565, label: '6,565' },
                  { amount: 13130, label: '13,130' },
                  { amount: 32825, label: '32,825' },
                  { amount: 'custom', label: 'Autre' },
                ].map((option, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className="border-[#e69500] text-jesuit-dark hover:bg-[#e69500] hover:text-white transition-all"
                    onClick={() => option.amount !== 'custom' && setCustomAmount(option.amount.toString())}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
              <input
                type="number"
                id="customAmount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Entrez un montant personnalisé"
                required
                className="w-full px-4 py-2 border border-amber-200 rounded-md focus:ring-[#e69500] focus:border-[#e69500] transition-all mt-4"
              />
            </div>
            <p className="text-sm text-jesuit-darkgray">
              Paiements sécurisés via carte bancaire ou Mobile Money (MoovMoney, MTN, Celtiis).
            </p>
            <Button
              type="submit"
              className="w-full px-8 py-3 bg-[#e69500] hover:bg-[#f7b733] text-white rounded-full shadow-md hover:shadow-lg transition-all text-lg font-semibold"
            >
              Faire un don
            </Button>
          </motion.form>
        </div>
      </section>

      {/* CTA (Unchanged) */}
      <section className="py-20 bg-[#1A2526] text-gray-100">
        <div className="max-w-3xl mx-auto text-center px-6">
          <motion.h2
            className="text-4xl font-bold mb-6 text-gray-100"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Soutenez l’avenir avec CREC
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Votre générosité forme des leaders éthiques et renforce notre mission éducative au Bénin.
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
                <Link to="/donate">Faire un don</Link>
              </Button>
            </motion.div>
            <Button
              className="w-full sm:w-auto px-6 py-3 border-white text-white hover:text-jesuit-dark hover:bg-white rounded-full text-lg font-semibold"
              asChild
            >
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </motion.div>
          <motion.p
            className="text-sm text-gray-200 mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Paiements sécurisés via carte bancaire ou Mobile Money (MoovMoney, MTN, Celtiis).
          </motion.p>
        </div>
      </section>
    </div>
  );
};

export default DonatePage;