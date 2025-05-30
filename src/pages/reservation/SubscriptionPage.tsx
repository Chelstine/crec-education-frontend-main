import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, CreditCard, Wallet, Mail, Phone, User, DollarSign, FileText, Printer } from 'lucide-react';
import { motion } from 'framer-motion';

// Define TypeScript interfaces
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  selectedMachine: string;
  subscriptionType: 'monthly' | 'yearly';
  paymentMethod: 'card' | 'paypal';
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
  cardName: string;
  mobileMoneyOperator: 'moovmoney' | 'mtn' | 'celtiis' | '';
  mobileMoneyPhone: string;
  termsAccepted: boolean;
  errors: Partial<Record<keyof FormData, string>>;
}

interface Machine {
  name: string;
  code: string;
  features: string[];
  reference: string;
  monthlyPrice: number;
  yearlyPrice: number;
}

interface SubscriptionPlan {
  id: 'monthly' | 'yearly';
  title: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
}

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get('redirect') || 'reservation';

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: 'Cotonou',
    country: 'Bénin',
    selectedMachine: '',
    subscriptionType: 'monthly',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    cardName: '',
    mobileMoneyOperator: '',
    mobileMoneyPhone: '',
    termsAccepted: false,
    errors: {},
  });

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
      monthlyPrice: 8000,
      yearlyPrice: 80000,
    },
    {
      name: 'Anycubic Kobra 2 Pro',
      code: 'FAB IMP 04',
      features: ['500mm/s Grande Vitesse', 'Nivellement Auto LeviQ 2.0', '220x220x250mm'],
      reference: 'B0CDVZ32X4',
      monthlyPrice: 12000,
      yearlyPrice: 120000,
    },
    {
      name: 'Graveur Laser Latilool F50',
      code: 'FAB GRAV 01',
      features: ['50W Puissance', 'Protection des Yeux', '400x400mm', 'Gravure sur Bois, Métal, Verre, Acrylique'],
      reference: 'B0B6NG84VF',
      monthlyPrice: 15000,
      yearlyPrice: 150000,
    },
  ];

  const getSubscriptionPlans = (): SubscriptionPlan[] => {
    const selectedMachine = machines.find((m) => m.code === formData.selectedMachine);
    if (!selectedMachine) return [];
    return [
      {
        id: 'monthly',
        title: 'Mensuel',
        price: `${selectedMachine.monthlyPrice.toLocaleString()} FCFA`,
        period: 'par mois',
        features: ['Accès à ' + selectedMachine.name, 'Support technique de base', 'Ateliers mensuels'],
      },
      {
        id: 'yearly',
        title: 'Annuel',
        price: `${selectedMachine.yearlyPrice.toLocaleString()} FCFA`,
        period: 'par an',
        features: ['Accès illimité à ' + selectedMachine.name, 'Support prioritaire', 'Réductions sur workshops', 'Projets exclusifs'],
        popular: true,
      },
    ];
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      errors: { ...prev.errors, [name]: null },
    }));
  };

  const validateStep = () => {
    const errors: Partial<Record<keyof FormData, string>> = {};
    if (step === 1) {
      if (!formData.firstName) errors.firstName = 'Prénom requis';
      if (!formData.lastName) errors.lastName = 'Nom requis';
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email valide requis';
      if (!formData.phone || !/^\+?\d{8,}$/.test(formData.phone)) errors.phone = 'Numéro de téléphone valide requis';
    } else if (step === 2) {
      if (!formData.selectedMachine) errors.selectedMachine = 'Veuillez sélectionner une machine';
    } else if (step === 4 && formData.paymentMethod === 'card') {
      if (!formData.cardNumber || !/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, '')))
        errors.cardNumber = 'Numéro de carte invalide (16 chiffres)';
      if (!formData.cardExpiry || !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(formData.cardExpiry))
        errors.cardExpiry = 'Date d’expiration invalide (MM/AA)';
      if (!formData.cardCVC || !/^\d{3}$/.test(formData.cardCVC)) errors.cardCVC = 'CVC invalide (3 chiffres)';
      if (!formData.cardName) errors.cardName = 'Nom sur la carte requis';
    } else if (step === 4 && formData.paymentMethod === 'paypal') {
      if (!formData.mobileMoneyOperator) errors.mobileMoneyOperator = 'Veuillez sélectionner un opérateur';
      if (!formData.mobileMoneyPhone || !/^\+?\d{8,}$/.test(formData.mobileMoneyPhone))
        errors.mobileMoneyPhone = 'Numéro de téléphone valide requis';
    }
    if (step === 5) {
      if (!formData.termsAccepted) errors.termsAccepted = 'Vous devez accepter les conditions';
    }
    return errors;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateStep();
    if (Object.keys(errors).length === 0) {
      if (step === 4 && formData.paymentMethod === 'paypal') {
        const selectedMachine = machines.find((m) => m.code === formData.selectedMachine);
        const amount = formData.subscriptionType === 'monthly'
          ? selectedMachine?.monthlyPrice
          : selectedMachine?.yearlyPrice;
        console.log(
          `Sending request to ${formData.mobileMoneyOperator} for ${amount} FCFA to ${formData.mobileMoneyPhone}`
        );
        console.log(
          `SMS sent to ${formData.mobileMoneyPhone}. Please validate the transaction with your PIN.`
        );
      }
      setStep((prev) => prev + 1);
    } else {
      setFormData((prev) => ({ ...prev, errors }));
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateStep();
    if (Object.keys(errors).length === 0) {
      console.log('Form submitted:', formData);
      navigate(`/${redirect}`);
    } else {
      setFormData((prev) => ({ ...prev, errors }));
    }
  };

  const steps = [
    { id: 1, title: 'Informations personnelles', icon: User },
    { id: 2, title: 'Choix de la machine', icon: Printer },
    { id: 3, title: 'Choix de la formule', icon: DollarSign },
    { id: 4, title: 'Paiement', icon: CreditCard },
    { id: 5, title: 'Confirmation', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white font-sans">
      {/* Hero Section */}
      <section className="relative py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/50" />
        <div
          className="relative max-w-5xl mx-auto text-center px-4"
          style={{
            backgroundImage: "url('/img/fablab-crec-bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <motion.div
            className="bg-black/60 p-8 rounded-2xl backdrop-blur-md shadow-2xl text-gray-100"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Rejoignez le FabLab CREC</h1>
            <p className="text-xl md:text-2xl leading-relaxed">
              Accédez à un espace d’innovation et de créativité, soutenu par la Compagnie de Jésus, pour transformer vos idées en réalité.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Machines Section */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-jesuit-dark mb-8 text-center">Nos équipements de pointe</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {machines.map((machine, index) => (
              <Card
                key={index}
                className="border-gray-300 bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Printer className="text-blue-600 mr-2" size={24} />
                    <h3 className="text-xl font-semibold text-jesuit-dark">{machine.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Code :</strong> {machine.code}
                  </p>
                  <ul className="text-sm text-gray-700 mb-4 space-y-1">
                    {machine.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="text-green-500 mr-2 mt-1" size={14} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-500">
                    <strong>Référence :</strong> {machine.reference}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Progress Stepper */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.id}
              className={`flex items-center p-4 rounded-lg ${step >= s.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <s.icon className="w-6 h-6 mr-2" />
              <span className="text-sm font-medium">{s.title}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <Card className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl">
          <CardContent className="p-8">
            <form onSubmit={step === 5 ? handleSubmit : handleNextStep} className="space-y-8">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-jesuit-dark mb-6">Informations personnelles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Prénom</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-600 focus:border-blue-600"
                          aria-label="Prénom"
                        />
                      </div>
                      {formData.errors.firstName && <p className="text-red-500 text-sm mt-1">{formData.errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Nom</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-600 focus:border-blue-600"
                          aria-label="Nom"
                        />
                      </div>
                      {formData.errors.lastName && <p className="text-red-500 text-sm mt-1">{formData.errors.lastName}</p>}
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-600 focus:border-blue-600"
                          aria-label="Adresse email"
                        />
                      </div>
                      {formData.errors.email && <p className="text-red-500 text-sm mt-1">{formData.errors.email}</p>}
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Téléphone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-600 focus:border-blue-600"
                          aria-label="Numéro de téléphone"
                        />
                      </div>
                      {formData.errors.phone && <p className="text-red-500 text-sm mt-1">{formData.errors.phone}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-jesuit-dark mb-6">Choisissez votre machine</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {machines.map((machine) => (
                      <Card
                        key={machine.code}
                        className={`relative border-2 ${formData.selectedMachine === machine.code ? 'border-blue-600 bg-blue-50' : 'border-gray-200'} rounded-lg p-6 cursor-pointer hover:shadow-lg transition`}
                        onClick={() => setFormData({ ...formData, selectedMachine: machine.code })}
                      >
                        <CardContent className="p-0">
                          <input
                            type="radio"
                            name="selectedMachine"
                            value={machine.code}
                            checked={formData.selectedMachine === machine.code}
                            onChange={handleChange}
                            className="hidden"
                          />
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-jesuit-dark">{machine.name}</h3>
                            <span className="text-sm text-gray-600">{machine.code}</span>
                          </div>
                          <ul className="space-y-2 text-sm text-gray-700">
                            {machine.features.map((feature, i) => (
                              <li key={i} className="flex items-center">
                                <Check className="text-green-500 mr-2" size={16} />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {formData.errors.selectedMachine && (
                    <p className="text-red-500 text-sm mt-4">{formData.errors.selectedMachine}</p>
                  )}
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-jesuit-dark mb-6">Choisissez votre formule</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {getSubscriptionPlans().map((plan) => (
                      <Card
                        key={plan.id}
                        className={`relative border-2 ${formData.subscriptionType === plan.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200'} rounded-lg p-6 cursor-pointer hover:shadow-lg transition`}
                        onClick={() => setFormData({ ...formData, subscriptionType: plan.id })}
                      >
                        {plan.popular && (
                          <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-bl-lg">Populaire</span>
                        )}
                        <CardContent className="p-0">
                          <input
                            type="radio"
                            name="subscriptionType"
                            value={plan.id}
                            checked={formData.subscriptionType === plan.id}
                            onChange={handleChange}
                            className="hidden"
                          />
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-jesuit-dark">{plan.title}</h3>
                            <span className="text-2xl font-bold text-blue-600">{plan.price}</span>
                          </div>
                          <p className="text-sm text-gray-500 mb-4">{plan.period}</p>
                          <ul className="space-y-2 text-sm text-gray-700">
                            {plan.features.map((feature, i) => (
                              <li key={i} className="flex items-center">
                                <Check className="text-green-500 mr-2" size={16} />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-jesuit-dark mb-6">Paiement</h2>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Méthode de paiement</label>
                    <div className="flex gap-4">
                      <motion.button
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: 'card', mobileMoneyOperator: '', mobileMoneyPhone: '' })}
                        className={`flex-1 p-4 rounded-lg border ${formData.paymentMethod === 'card' ? 'border-blue-600 bg-blue-50' : 'border-gray-300'} flex items-center justify-center gap-2 hover:shadow-md transition`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <CreditCard size={20} className="text-jesuit-dark" /> Carte bancaire
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: 'paypal', cardNumber: '', cardExpiry: '', cardCVC: '', cardName: '' })}
                        className={`flex-1 p-4 rounded-lg border ${formData.paymentMethod === 'paypal' ? 'border-blue-600 bg-blue-50' : 'border-gray-300'} flex items-center justify-center gap-2 hover:shadow-md transition`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Wallet size={20} className="text-jesuit-dark" /> Mobile Money
                      </motion.button>
                    </div>
                  </div>
                  {formData.paymentMethod === 'card' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Numéro de carte</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-600 focus:border-blue-600"
                          placeholder="1234 5678 9012 3456"
                          aria-label="Numéro de carte"
                        />
                        {formData.errors.cardNumber && <p className="text-red-500 text-sm mt-1">{formData.errors.cardNumber}</p>}
                      </div>
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Nom sur la carte</label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-600 focus:border-blue-600"
                          aria-label="Nom sur la carte"
                        />
                        {formData.errors.cardName && <p className="text-red-500 text-sm mt-1">{formData.errors.cardName}</p>}
                      </div>
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Date d’expiration</label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-600 focus:border-blue-600"
                          placeholder="MM/AA"
                          aria-label="Date d’expiration"
                        />
                        {formData.errors.cardExpiry && <p className="text-red-500 text-sm mt-1">{formData.errors.cardExpiry}</p>}
                      </div>
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">CVC</label>
                        <input
                          type="text"
                          name="cardCVC"
                          value={formData.cardCVC}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-600 focus:border-blue-600"
                          placeholder="123"
                          aria-label="Code CVC"
                        />
                        {formData.errors.cardCVC && <p className="text-red-500 text-sm mt-1">{formData.errors.cardCVC}</p>}
                      </div>
                    </div>
                  )}
                  {formData.paymentMethod === 'paypal' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Opérateur Mobile Money</label>
                        <select
                          name="mobileMoneyOperator"
                          value={formData.mobileMoneyOperator}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-600 focus:border-blue-600"
                          aria-label="Opérateur Mobile Money"
                        >
                          <option value="">Sélectionnez un opérateur</option>
                          <option value="moovmoney">MoovMoney</option>
                          <option value="mtn">MTN</option>
                          <option value="celtiis">Celtiis</option>
                        </select>
                        {formData.errors.mobileMoneyOperator && (
                          <p className="text-red-500 text-sm mt-1">{formData.errors.mobileMoneyOperator}</p>
                        )}
                      </div>
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Numéro de téléphone Mobile Money</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                          <input
                            type="tel"
                            name="mobileMoneyPhone"
                            value={formData.mobileMoneyPhone}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-600 focus:border-blue-600"
                            placeholder="+22912345678"
                            aria-label="Numéro de téléphone Mobile Money"
                          />
                        </div>
                        {formData.errors.mobileMoneyPhone && (
                          <p className="text-red-500 text-sm mt-1">{formData.errors.mobileMoneyPhone}</p>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        Vous recevrez un SMS de {formData.mobileMoneyOperator || 'votre opérateur'} sur ce numéro pour confirmer le paiement avec votre code PIN.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {step === 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-jesuit-dark mb-6">Confirmation</h2>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      <strong>Nom :</strong> {formData.firstName} {formData.lastName}
                    </p>
                    <p>
                      <strong>Email :</strong> {formData.email}
                    </p>
                    <p>
                      <strong>Téléphone :</strong> {formData.phone}
                    </p>
                    <p>
                      <strong>Machine :</strong>{' '}
                      {machines.find((m) => m.code === formData.selectedMachine)?.name} ({formData.selectedMachine})
                    </p>
                    <p>
                      <strong>Formule :</strong>{' '}
                      {getSubscriptionPlans().find((p) => p.id === formData.subscriptionType)?.title} (
                      {getSubscriptionPlans().find((p) => p.id === formData.subscriptionType)?.price})
                    </p>
                    <p>
                      <strong>Paiement :</strong>{' '}
                      {formData.paymentMethod === 'card' ? 'Carte bancaire' : `Mobile Money (${formData.mobileMoneyOperator}, ${formData.mobileMoneyPhone})`}
                    </p>
                  </div>
                  <div className="flex items-center mt-6">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleChange}
                      className="mr-2 rounded border-gray-300 focus:ring-blue-600"
                      id="terms"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      J’accepte les <a href="#" className="text-blue-600 hover:underline">conditions générales</a> du
                      FabLab CREC
                    </label>
                  </div>
                  {formData.errors.termsAccepted && (
                    <p className="text-red-500 text-sm mt-1">{formData.errors.termsAccepted}</p>
                  )}
                </motion.div>
              )}

              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <Button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                  >
                    Précédent
                  </Button>
                )}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Button
                    type="submit"
                    className="px-8 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-all text-lg font-semibold"
                  >
                    {step === 5 ? 'Confirmer l’inscription' : 'Suivant'}
                  </Button>
                </motion.div>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default SubscriptionPage;