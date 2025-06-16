import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Mail, Phone, User, CreditCard, Clock, Shield, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ProgressBar from '@/components/ui/progress-bar';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subscriptionType: 'monthly' | 'yearly';
  termsAccepted: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  termsAccepted?: string;
}

interface SubscriptionPlan {
  id: 'monthly' | 'yearly';
  title: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  savings?: string;
}

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get('redirect') || 'reservation';

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subscriptionType: 'monthly',
    termsAccepted: false,
  });

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});

  // Remonter automatiquement en haut de la page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Plans d'abonnement avec prix FCFA
  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'monthly',
      title: 'Abonnement Mensuel',
      price: '25 000 FCFA',
      period: 'par mois',
      features: [
        'Accès illimité au FabLab',
        '20h d\'utilisation par mois',
        'Toutes les machines disponibles',
        'Support technique',
        'Ateliers de formation inclus',
        'Consommables de base fournis'
      ],
    },
    {
      id: 'yearly',
      title: 'Abonnement Annuel',
      price: '250 000 FCFA',
      period: 'par an',
      savings: 'Économisez 50 000 FCFA',
      features: [
        'Accès illimité au FabLab',
        '40h d\'utilisation par mois',
        'Toutes les machines disponibles',
        'Support technique prioritaire',
        'Tous les ateliers de formation inclus',
        'Consommables avancés fournis',
        'Projets personnels prioritaires',
        '2 mois gratuits (économie de 50 000 FCFA)'
      ],
      popular: true,
    },
  ];

  // Informations de paiement pour le Bénin
  const paymentInfo = {
    mobile: [
      {
        operator: 'Orange Money',
        number: '+229 01 67 76 15 15',
        code: '#150*4*9#',
        name: 'CREC BENIN'
      },
      {
        operator: 'MTN MoMo',
        number: '+229 01 91 50 88 88',
        code: '*126#',
        name: 'CREC BENIN'
      }
    ],
    banks: [
      {
        bank: 'Bank of Africa (BOA)',
        account: '10000 00001 123456789 15',
        name: 'CENTRE DE RECHERCHE D\'ETUDE ET DE CREATIVITE',
        swift: 'AFRIBJDX'
      },
      {
        bank: 'Ecobank Bénin',
        account: '05290000123456',
        name: 'CENTRE DE RECHERCHE D\'ETUDE ET DE CREATIVITE',
        swift: 'ECOCBJDX'
      }
    ]
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Effacer l'erreur correspondante
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateStep1 = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Prénom requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Nom requis';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email valide requis';
    }
    if (!formData.phone.trim() || !/^\+?[0-9\s-]{8,}$/.test(formData.phone)) {
      newErrors.phone = 'Numéro de téléphone valide requis';
    }
    return newErrors;
  };

  const validateStep3 = () => {
    const newErrors: FormErrors = {};
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'Vous devez accepter les conditions d\'utilisation';
    }
    return newErrors;
  };

  const handleNext = () => {
    let validationErrors = {};
    
    if (step === 1) {
      validationErrors = validateStep1();
    } else if (step === 3) {
      validationErrors = validateStep3();
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStep(prev => prev + 1);
  };

  const handleSubmit = () => {
    const validationErrors = validateStep3();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Simulation de l'envoi des données
    console.log('Abonnement soumis:', formData);
    
    // Redirection vers la page de réservation ou autre
    navigate(`/${redirect}?subscribed=true`);
  };

  const selectedPlan = subscriptionPlans.find(plan => plan.id === formData.subscriptionType);
  const amount = formData.subscriptionType === 'monthly' ? '25 000' : '250 000';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      {/* En-tête avec progression */}
      <section className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Abonnement FabLab CREC</h1>
            <div className="text-sm text-gray-600">Étape {step} sur 3</div>
          </div>
          
          {/* Barre de progression */}
          <ProgressBar 
            percentage={(step / 3) * 100} 
            barClassName="bg-gradient-to-r from-blue-500 to-amber-500 transition-all duration-500 ease-out"
          />
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Étape 1: Informations personnelles */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-xl">
              <CardHeader className="text-center pb-6">
                <User className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-2xl text-gray-800">Vos informations</CardTitle>
                <p className="text-gray-600">Veuillez remplir vos informations personnelles</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-gray-400" size={18} />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Votre prénom"
                      />
                    </div>
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-gray-400" size={18} />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Votre nom"
                      />
                    </div>
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="votre@email.com"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="+229 XX XX XX XX"
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Étape 2: Choix du plan */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <CreditCard className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Choisissez votre formule</h2>
              <p className="text-gray-600">Sélectionnez l'abonnement qui vous convient</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {subscriptionPlans.map((plan) => (
                <motion.div
                  key={plan.id}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Card
                    className={`relative cursor-pointer transition-all duration-300 ${
                      formData.subscriptionType === plan.id
                        ? 'ring-2 ring-blue-500 bg-blue-50 shadow-xl'
                        : 'hover:shadow-lg'
                    } ${plan.popular ? 'border-amber-400 border-2' : ''}`}
                    onClick={() => setFormData({ ...formData, subscriptionType: plan.id })}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold px-4 py-1 rounded-full flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          Recommandé
                        </span>
                      </div>
                    )}
                    
                    <CardContent className="p-8">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.title}</h3>
                        <div className="text-3xl font-bold text-blue-600 mb-1">{plan.price}</div>
                        <p className="text-gray-600">{plan.period}</p>
                        {plan.savings && (
                          <p className="text-green-600 font-semibold text-sm mt-2">{plan.savings}</p>
                        )}
                      </div>

                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id={`plan-${plan.id}`}
                          name="subscriptionType"
                          value={plan.id}
                          checked={formData.subscriptionType === plan.id}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600"
                          aria-describedby={`plan-${plan.id}-description`}
                        />
                        <label htmlFor={`plan-${plan.id}`} className="text-sm font-medium text-gray-700">
                          Choisir ce plan
                        </label>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Étape 3: Informations de paiement et confirmation */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Informations de paiement</h2>
              <p className="text-gray-600">Effectuez votre paiement via nos comptes officiels</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Résumé de commande */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Résumé de votre abonnement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-800">{selectedPlan?.title}</h4>
                      <p className="text-sm text-gray-600">{selectedPlan?.period}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-blue-600">{selectedPlan?.price}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h5 className="font-semibold text-gray-800 mb-2">Vos informations :</h5>
                    <p className="text-sm text-gray-600">{formData.firstName} {formData.lastName}</p>
                    <p className="text-sm text-gray-600">{formData.email}</p>
                    <p className="text-sm text-gray-600">{formData.phone}</p>
                  </div>

                  <div className="flex items-center gap-2 mt-6">
                    <input
                      type="checkbox"
                      id="termsAccepted"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300"
                      aria-describedby="terms-description"
                    />
                    <label htmlFor="termsAccepted" className="text-sm text-gray-700">
                      J'accepte les{' '}
                      <a href="#" className="text-blue-600 hover:underline">
                        conditions générales d'utilisation
                      </a>{' '}
                      du FabLab CREC
                    </label>
                  </div>
                  {errors.termsAccepted && (
                    <p className="text-red-500 text-sm">{errors.termsAccepted}</p>
                  )}
                </CardContent>
              </Card>

              {/* Informations de paiement */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Effectuer le paiement</CardTitle>
                  <p className="text-sm text-gray-600">
                    Montant à payer : <span className="font-bold text-blue-600">{amount} FCFA</span>
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Mobile Money */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Phone className="w-5 h-5 text-orange-500" />
                      Mobile Money
                    </h4>
                    <div className="space-y-3">
                      {paymentInfo.mobile.map((provider, index) => (
                        <div key={index} className="p-4 border rounded-lg bg-orange-50">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-orange-800">{provider.operator}</span>
                            <span className="text-sm text-orange-600">{provider.code}</span>
                          </div>
                          <p className="text-sm text-gray-700">
                            <strong>Numéro :</strong> {provider.number}
                          </p>
                          <p className="text-sm text-gray-700">
                            <strong>Nom :</strong> {provider.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Virements bancaires */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-blue-500" />
                      Virement bancaire
                    </h4>
                    <div className="space-y-3">
                      {paymentInfo.banks.map((bank, index) => (
                        <div key={index} className="p-4 border rounded-lg bg-blue-50">
                          <div className="font-medium text-blue-800 mb-2">{bank.bank}</div>
                          <p className="text-sm text-gray-700">
                            <strong>Compte :</strong> {bank.account}
                          </p>
                          <p className="text-sm text-gray-700">
                            <strong>Nom :</strong> {bank.name}
                          </p>
                          <p className="text-sm text-gray-700">
                            <strong>Code SWIFT :</strong> {bank.swift}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg">
                    <p className="text-sm text-amber-800">
                      <strong>Important :</strong> Après avoir effectué le paiement, veuillez conserver votre reçu. 
                      Nous vous contacterons sous 24h pour confirmer votre abonnement.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Boutons de navigation */}
        <div className="flex justify-between items-center mt-8">
          {step > 1 && (
            <Button
              onClick={() => setStep(prev => prev - 1)}
              variant="outline"
              className="px-6 py-3 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Retour
            </Button>
          )}
          
          <div className="ml-auto">
            {step < 3 ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleNext}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-amber-600 hover:from-blue-700 hover:to-amber-700 text-white font-semibold shadow-lg"
                >
                  Continuer
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold shadow-lg"
                >
                  Confirmer l'abonnement
                  <Check className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
