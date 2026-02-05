import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Printer, 
  Wrench, 
  MapPin, 
  Clock, 
  Lightbulb, 
  Users, 
  BookOpen, 
  Cpu, 
  Zap, 
  Cog, 
  Wifi, 
  CalendarDays,
  PhoneCall,
  Mail,
  ExternalLink,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Star,
  Award,
  Box,
  Hammer,
  Scissors,
  ImageIcon,
  Euro,
  Loader2,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  useFablabMachines, 
  useFablabPublishedProjects, 
  useFablabActiveSubscriptions,
  useFablabActiveTrainings,
  useFablabActiveServices
} from '@/hooks/useFablab';

const FablabPage = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Hooks pour récupérer les données
  const { data: machines = [], isLoading: machinesLoading, error: machinesError } = useFablabMachines();
  const { data: projects = [], isLoading: projectsLoading, error: projectsError } = useFablabPublishedProjects();
  const { data: subscriptions = [], isLoading: subscriptionsLoading } = useFablabActiveSubscriptions();
  const { data: trainings = [], isLoading: trainingsLoading } = useFablabActiveTrainings();
  const { data: services = [], isLoading: servicesLoading } = useFablabActiveServices();

  const isLoading = machinesLoading || projectsLoading || subscriptionsLoading || trainingsLoading || servicesLoading;
  const error = machinesError || projectsError;

  // Fonction pour filtrer les projets selon la catégorie sélectionnée
  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category.toLowerCase() === selectedFilter);

  // Fonction pour obtenir l'icône de statut
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'maintenance':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'unavailable':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Cog className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available':
        return 'Disponible';
      case 'maintenance':
        return 'Maintenance';
      case 'unavailable':
        return 'Indisponible';
      default:
        return 'Inconnu';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant':
        return 'bg-green-100 text-green-800';
      case 'Intermédiaire':
        return 'bg-yellow-100 text-yellow-800';
      case 'Avancé':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPrice = (price: number) => {
    if (price === 0) return 'Gratuit';
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-crec-gold mx-auto mb-4" />
          <p className="text-gray-600">Chargement du FabLab...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Erreur de chargement</h2>
          <p className="text-gray-600">Impossible de charger les données du FabLab.</p>
        </div>
      </div>
    );
  }

  // Animation variants
  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: { 
      repeat: Infinity,
      repeatType: "reverse" as const, 
      duration: 1.5
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-[15pt] bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        {/* Background with parallax effect */}
        <div className="absolute inset-0 bg-[url('/img/fablab.jpeg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-crec-darkblue/80 via-crec-darkblue/60 to-crec-darkblue/90 backdrop-blur-[2px]" />
        
        {/* Accent elements */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1.5 }}
          className="absolute top-20 right-20 w-64 h-64 rounded-full bg-crec-gold blur-3xl"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-blue-500 blur-3xl"
        />
        
        {/* Content */}
        <div className="min-h-[350px] md:min-h-[400px] flex flex-col items-center justify-center text-center relative z-10 text-white p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-4 inline-flex px-4 py-2 rounded-full items-center bg-white/10 backdrop-blur-md border border-white/20"
            >
              <motion.div 
                animate={pulseAnimation}
                className="w-2 h-2 rounded-full bg-crec-gold mr-2" 
              />
              <span className="text-sm font-medium">Innovation & Technologie</span>
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight">
              FabLab CREC
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Laboratoire de Fabrication Numérique
            </p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center mt-8 gap-4"
            >
              <Link to="/subscription-verification">
                <Button size="lg" className="bg-crec-gold hover:bg-crec-gold/90 text-crec-darkblue">
                  Réserver une machine
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white/30 bg-white/10 hover:bg-white/20 text-white">
                  Nous contacter
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px]" fill="#ffffff">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,213.35,56.44Z" />
          </svg>
        </div>
      </section>

      {/* À propos */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-amber-900 mb-8"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Le FabLab CREC : Un espace pour innover
          </motion.h2>
          <motion.div
            className="space-y-6 text-gray-700 text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p>Notre FabLab (Laboratoire de Fabrication Numérique) est un espace ouvert d'innovation et de créativité où étudiants, entrepreneurs et makers peuvent concrétiser leurs idées grâce aux technologies de fabrication numérique.</p>
            <p>Notre mission est de démocratiser l'accès aux outils de fabrication numérique et de former la nouvelle génération de créateurs et innovateurs africains.</p>
            
            {/* Valeurs intégrées dans la description */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <Lightbulb className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-crec-darkblue">Innovation</h3>
                </div>
                <p className="text-gray-600">Transformez vos idées en réalité avec des outils numériques de pointe.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-crec-darkblue">Collaboration</h3>
                </div>
                <p className="text-gray-600">Participez à une communauté jésuite unie par la créativité et le partage.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <BookOpen className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-crec-darkblue">Apprentissage</h3>
                </div>
                <p className="text-gray-600">Développez vos compétences grâce à des formations pratiques et accessibles.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projets réalisés */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-crec-darkblue">
              Projets réalisés au CREC
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez les créations innovantes réalisées par nos étudiants et partenaires dans notre FabLab. 
              Chaque projet illustre la diversité des possibilités offertes par nos équipements de pointe.
            </p>
          </motion.div>

          {/* Filtre de catégories */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
                { key: 'all', label: 'Tous les projets', icon: Cog },
                { key: 'impression-3d', label: 'Impression 3D', icon: Box },
                { key: 'electronique', label: 'Électronique', icon: Zap },
                { key: 'menuiserie', label: 'Menuiserie', icon: Hammer },
                { key: 'textile', label: 'Textile', icon: Scissors }
              ].map((category) => (
                <Button
                  key={category.key}
                  variant={selectedCategory === category.key ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`flex items-center space-x-2 ${
                    selectedCategory === category.key 
                      ? 'bg-crec-blue hover:bg-crec-blue/90' 
                      : 'hover:bg-crec-lightblue'
                  }`}
                >
                  <category.icon className="h-4 w-4" />
                  <span>{category.label}</span>
                </Button>
              ))}
          </motion.div>

          {/* Grille des projets */}
          {filteredProjects && filteredProjects.length > 0 ? (
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="h-full bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="relative overflow-hidden">
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                          <ImageIcon className="h-16 w-16 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-crec-blue text-white">
                          {project.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-semibold text-crec-darkblue mb-2 group-hover:text-crec-blue transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-3">
                            {project.description}
                          </p>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-400" />
                            <span>{project.difficulty}</span>
                          </div>
                          {project.estimated_cost && (
                            <div className="flex items-center">
                              <Euro className="h-4 w-4 mr-1" />
                              <span>{project.estimated_cost}€</span>
                            </div>
                          )}
                        </div>

                        {project.duration && (
                          <div className="text-sm text-gray-500">
                            <Clock className="h-4 w-4 inline mr-1" />
                            <span>Durée: {project.duration}</span>
                          </div>
                        )}

                        {project.tags && Array.isArray(project.tags) && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {project.tags.slice(0, 3).map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="max-w-md mx-auto">
                <Cog className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Aucun projet disponible
                </h3>
                <p className="text-gray-500">
                  {selectedCategory === 'all' 
                    ? 'Aucun projet n\'est actuellement disponible. Revenez bientôt !' 
                    : `Aucun projet trouvé pour la catégorie "${selectedCategory}".`}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Équipements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-6 text-center text-amber-900"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Nos équipements
          </motion.h2>
          <motion.p
            className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Découvrez notre parc de machines numériques disponibles pour vos projets innovants. Notre équipe est disponible pour vous former et vous accompagner dans leur utilisation.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {machines?.map((machine, index) => (
              <motion.div
                key={machine.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group">
                  <div className="relative overflow-hidden">
                    <img
                      src={machine.image_url || "/img/placeholder-machine.jpg"}
                      alt={machine.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/img/placeholder-machine.jpg";
                      }}
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-blue-500/80 text-white backdrop-blur-sm">
                        {machine.type}
                      </Badge>
                    </div>
                    <div className="absolute top-3 left-3">
                      {getStatusIcon(machine.status)}
                    </div>
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-crec-darkblue">{machine.name}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{machine.code}</p>
                    <p className="text-gray-600 text-base mb-4 flex-1">
                      {machine.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Statut:</span>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(machine.status)}
                          <span className="text-sm">{getStatusLabel(machine.status)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Tarif:</span>
                        <span className="font-bold text-crec-gold">{formatPrice(machine.hourly_rate)}/h</span>
                      </div>

                      {machine.features && Array.isArray(machine.features) && machine.features.length > 0 && (
                        <div>
                          <h4 className="font-medium text-crec-darkblue mb-2">Caractéristiques principales :</h4>
                          <ul className="text-gray-600 text-sm leading-relaxed list-disc list-inside">
                            {machine.features.slice(0, 4).map((feature, idx) => (
                              <li key={idx}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {(!machines || machines.length === 0) && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-md mx-auto">
                <div className="mb-4">
                  <Cpu className="w-16 h-16 mx-auto text-crec-gold opacity-50" />
                </div>
                <h3 className="text-xl font-semibold text-crec-darkblue mb-2">
                  Aucune machine disponible
                </h3>
                <p className="text-gray-600">
                  Les équipements seront bientôt disponibles. Revenez prochainement !
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Abonnements */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-6 text-center text-crec-darkblue"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Abonnements FabLab
          </motion.h2>
          <motion.p
            className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Choisissez une formule adaptée à vos besoins pour profiter pleinement des équipements et de l'expertise de notre FabLab.
          </motion.p>
          
          {subscriptions && subscriptions.length > 0 ? (
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {subscriptions.map((subscription, index) => (
                <Card key={subscription.id} className={`bg-white shadow-lg border-2 h-full flex flex-col ${
                  subscription.type === 'PREMIUM' ? 'border-purple-500 relative' : 
                  subscription.type === 'PROFESSIONAL' ? 'border-crec-gold' : 
                  'border-gray-200'
                }`}>
                  {subscription.type === 'PREMIUM' && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Populaire
                      </span>
                    </div>
                  )}
                  <CardContent className="p-6 text-center flex flex-col h-full">
                    <h4 className="text-xl font-bold text-crec-darkblue mb-4">{subscription.name}</h4>
                    <div className="text-3xl font-bold text-crec-darkblue mb-4">
                      {formatPrice(subscription.price)}
                      {subscription.price > 0 && <span className="text-lg font-normal text-gray-600">/mois</span>}
                    </div>
                    <p className="text-gray-600 mb-6 flex-grow">{subscription.description}</p>
                    
                    <div className="space-y-3 mb-6 text-left flex-grow">
                      {subscription.features && Array.isArray(subscription.features) && subscription.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Durée: {subscription.duration_months} mois</span>
                        <span>Accès machines: {subscription.machine_access.length}</span>
                      </div>
                    </div>

                    <Button className="w-full bg-crec-blue hover:bg-crec-blue/90 mt-auto">
                      S'abonner
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="max-w-md mx-auto">
                <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Aucun abonnement disponible
                </h3>
                <p className="text-gray-500">
                  Les formules d'abonnement seront bientôt disponibles. Revenez prochainement !
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Formations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-6 text-center text-crec-darkblue"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Formations FabLab
          </motion.h2>
          <motion.p
            className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Développez vos compétences techniques grâce à nos formations pratiques animées par des experts.
          </motion.p>
          
          {trainings && trainings.length > 0 ? (
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {trainings.map((training, index) => (
                <Card key={training.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative overflow-hidden">
                    {training.image_url ? (
                      <img
                        src={training.image_url}
                        alt={training.name}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-crec-blue to-crec-darkblue flex items-center justify-center">
                        <BookOpen className="h-16 w-16 text-white opacity-50" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-crec-blue text-white">
                        {training.difficulty_level}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-crec-darkblue mb-2">{training.name}</h3>
                    <p className="text-gray-600 mb-4">{training.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Durée: {training.duration_hours}h</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-2" />
                        <span>Places: {training.max_participants}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <DollarSign className="h-4 w-4 mr-2" />
                        <span className="font-semibold text-crec-gold">{formatPrice(training.price)}</span>
                      </div>
                    </div>

                    <Button className="w-full bg-crec-blue hover:bg-crec-blue/90">
                      S'inscrire
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="max-w-md mx-auto">
                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Aucune formation disponible
                </h3>
                <p className="text-gray-500">
                  Les formations seront bientôt disponibles. Revenez prochainement !
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-6 text-center text-crec-darkblue"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Services FabLab
          </motion.h2>
          <motion.p
            className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Découvrez nos services personnalisés pour accompagner vos projets de fabrication numérique.
          </motion.p>
          
          {services && services.length > 0 ? (
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {services.map((service, index) => (
                <Card key={service.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative overflow-hidden">
                    {service.image_url ? (
                      <img
                        src={service.image_url}
                        alt={service.name}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-crec-gold to-amber-600 flex items-center justify-center">
                        <Wrench className="h-16 w-16 text-white opacity-50" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-crec-darkblue mb-2">{service.name}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Tarif:</span>
                        <span className="font-semibold text-crec-gold">{formatPrice(service.price)}</span>
                      </div>
                      {service.duration_estimated && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Durée:</span>
                          <span className="text-sm">{service.duration_estimated}</span>
                        </div>
                      )}
                    </div>

                    <Button className="w-full bg-crec-gold hover:bg-crec-gold/90 text-crec-darkblue">
                      Demander un devis
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="max-w-md mx-auto">
                <Wrench className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Aucun service disponible
                </h3>
                <p className="text-gray-500">
                  Les services seront bientôt disponibles. Revenez prochainement !
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Section Contact FabLab */}
      <section className="py-16 bg-crec-lightblue">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold text-crec-darkblue mb-4">
              Prêt à commencer votre aventure FabLab ?
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Rejoignez notre communauté de créateurs et innovateurs. Que vous soyez débutant ou expert, 
              notre FabLab vous offre l'environnement parfait pour donner vie à vos projets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild className="bg-crec-blue hover:bg-crec-blue/90">
                <Link to="/contact" className="flex items-center">
                  <PhoneCall className="h-4 w-4 mr-2" />
                  Nous contacter
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/formations" className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Voir toutes les formations
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FablabPage;