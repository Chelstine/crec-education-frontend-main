import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
  Play 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useFabLab } from '@/contexts/FabLabContext';

const FablabPage = () => {
  // State pour le filtrage des projets
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Use context data instead of mock data
  const { 
    description, 
    getPublishedProjects, 
    getActiveMachines, 
    getActiveServices, 
    getActiveTariffs,
    getProjectsByCategory 
  } = useFabLab();

  // Get data from context
  const projects = getPublishedProjects();
  const machines = getActiveMachines();
  const services = getActiveServices();
  const tariffs = getActiveTariffs();

  // Fonction pour filtrer les projets selon la catégorie sélectionnée
  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : getProjectsByCategory(selectedFilter);

  return (
    <div className="min-h-screen flex flex-col font-sans text-[15pt] bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section - Style harmonisé */}
      <section className="relative w-full min-h-[260px] md:min-h-[320px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/img/fablab.png"
            alt="FabLab CREC"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.9) contrast(1.1)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-crec-darkblue/60 via-amber-900/20 to-black/30"></div>
        </div>
        <div className="relative z-10 flex items-center justify-center h-full text-center px-4 py-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto bg-gradient-to-br from-black/50 to-amber-900/40 p-10 rounded-xl backdrop-blur-md border border-white/10 shadow-2xl"
          >
            <div className="text-crec-gold text-sm uppercase tracking-widest mb-2">Innovation & Technologie</div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                {description.title}
              </span>
            </h1>
            <div className="w-20 h-1 bg-crec-gold mx-auto mb-6"></div>
            <p className="text-lg text-slate-100 mb-8 leading-relaxed">
              {description.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
              <Link
                to="/subscription-verification"
                className="px-6 py-3 bg-crec-gold text-white font-medium rounded-full hover:bg-amber-500 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Réserver une machine
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 border border-white/70 text-white hover:bg-white/20 rounded-full transition-all duration-300"
              >
                Nous contacter
              </Link>
            </div>
          </motion.div>
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
            className="space-y-6 text-gray-700 text-lg leading-relaxed text-justify"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p>{description.description}</p>
            <p>{description.mission}</p>
          </motion.div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-amber-900 mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Nos valeurs
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
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
              <Card key={i} className="bg-white shadow-md hover:shadow-lg transition border-t-4 border-t-amber-500">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <value.icon className="w-12 h-12 text-crec-gold mb-4" />
                  <h3 className="text-xl font-semibold text-crec-darkblue mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-base">{value.description}</p>
                </CardContent>
              </Card>
            ))}
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
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
              Projets réalisés au CREC
            </h2>
            <div className="w-20 h-1 bg-crec-gold mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez les créations innovantes de notre communauté : de l'IoT aux impressions 3D, 
              nos membres transforment leurs idées en solutions concrètes.
            </p>
          </motion.div>

          {/* Filtres par catégorie */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { key: 'all', label: 'Tous les projets', icon: Cog },
              { key: 'iot', label: 'IoT & Connecté', icon: Wifi },
              { key: '3d', label: 'Impression 3D', icon: Printer },
              { key: 'electronics', label: 'Électronique', icon: Cpu },
              { key: 'automation', label: 'Automatisation', icon: Zap }
            ].map((filter) => (
              <Button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key)}
                className={`flex items-center gap-2 transition-all duration-300 ${
                  selectedFilter === filter.key 
                    ? 'bg-amber-500 text-white shadow-lg transform scale-105 border-0' 
                    : 'bg-white text-amber-600 border border-amber-300 hover:bg-amber-500 hover:text-white hover:shadow-md'
                }`}
              >
                <filter.icon className="w-4 h-4" />
                {filter.label}
              </Button>
            ))}
          </motion.div>

          {/* Compteur de projets */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <p className="text-jesuit-darkgray">
              {filteredProjects.length} projet{filteredProjects.length > 1 ? 's' : ''} affiché{filteredProjects.length > 1 ? 's' : ''}
              {selectedFilter !== 'all' && (
                <span className="ml-2 text-jesuit-gold font-medium">
                  dans la catégorie "{
                    selectedFilter === 'iot' ? 'IoT & Connecté' :
                    selectedFilter === '3d' ? 'Impression 3D' :
                    selectedFilter === 'electronics' ? 'Électronique' :
                    'Automatisation'
                  }"
                </span>
              )}
            </p>
          </motion.div>

          {/* Grille des projets */}
          <motion.div
            key={selectedFilter}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Card className="h-full overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
                  <div className="relative overflow-hidden">
                    {/* Support vidéo/image avec indicateur */}
                    {project.videoUrl ? (
                      <div className="relative">
                        <img
                          src={project.image || "/img/placeholder-project.jpg"}
                          alt={project.title}
                          className="w-full max-w-full h-32 sm:h-48 md:h-64 object-cover rounded-t-xl group-hover:scale-110 transition-transform duration-300"
                          style={{display: 'block'}}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                      </div>
                    ) : (
                      <img
                        src={project.image || "/img/placeholder-project.jpg"}
                        alt={project.title}
                        className="w-full max-w-full h-32 sm:h-48 md:h-64 object-cover rounded-t-xl group-hover:scale-110 transition-transform duration-300"
                        style={{display: 'block'}}
                      />
                    )}
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                        project.category === 'iot' ? 'bg-blue-500' :
                        project.category === '3d' ? 'bg-purple-500' :
                        project.category === 'electronics' ? 'bg-green-500' :
                        'bg-orange-500'
                      }`}>
                        {project.category === 'iot' ? 'IoT' :
                         project.category === '3d' ? '3D' :
                         project.category === 'electronics' ? 'Électronique' :
                         'Automatisation'}
                      </span>
                    </div>
                    {/* Indicateur vidéo */}
                    {project.videoUrl && (
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-1 bg-red-500 text-white rounded-full text-xs font-medium">
                          🎥 Vidéo
                        </span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg text-jesuit-dark mb-2 line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-jesuit-darkgray mb-3 line-clamp-3">
                      {project.description}
                    </p>
                    
                    {/* Informations enrichies */}
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-xs font-semibold text-jesuit-dark uppercase tracking-wide mb-1">
                          Technologies utilisées
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {project.tags.slice(0, 4).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-jesuit-light text-jesuit-dark text-xs rounded-md font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 4 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                              +{project.tags.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Auteur */}
                      {project.author && (
                        <div className="text-xs text-gray-500">
                          <span className="font-medium">Par:</span> {project.author}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Message d'état vide */}
          {filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-md mx-auto">
                <div className="mb-4">
                  <Lightbulb className="w-16 h-16 mx-auto text-jesuit-gold opacity-50" />
                </div>
                <h3 className="text-xl font-semibold text-jesuit-dark mb-2">
                  Aucun projet trouvé
                </h3>
                <p className="text-jesuit-darkgray">
                  Aucun projet ne correspond à cette catégorie pour le moment. 
                  Revenez bientôt pour découvrir de nouvelles créations !
                </p>
              </div>
            </motion.div>
          )}
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
                key={machine.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="h-full"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 flex flex-col">
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <img
                      src={machine.image}
                      alt={machine.name}
                      className="w-full h-48 object-cover rounded-md mb-6"
                      onError={(e) => (e.currentTarget.src = '/img/placeholder-machine.jpg')}
                    />
                    <h3 className="text-xl font-bold mb-4 text-jesuit-dark">{machine.name} ({machine.code})</h3>
                    <ul className="text-jesuit-darkgray text-base leading-relaxed mb-4 list-disc list-inside flex-1">
                      {machine.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                    <p className="text-jesuit-darkgray text-sm mt-auto">
                      <span className="font-medium text-jesuit-dark">Abonnement :</span> {machine.monthlyPrice.toLocaleString()} FCFA/mois ou {machine.yearlyPrice.toLocaleString()} FCFA/an
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services et Tarifs Unifiés */}
      <section className="py-16 bg-jesuit-light">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center text-jesuit-dark"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Services et tarifs
          </motion.h2>
          
          {/* Abonnements (tariffs de type membership) */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h3 className="text-2xl font-semibold text-jesuit-dark mb-8 text-center">Abonnements FabLab</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {tariffs.filter(t => t.type === 'membership').map((tariff, index) => (
                <Card key={tariff.id} className={`bg-white shadow-lg border-2 ${
                  index === 1 ? 'border-purple-500 relative' : 
                  index === 0 ? 'border-jesuit-gold' : 'border-gray-200'
                }`}>
                  {index === 1 && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Populaire
                      </span>
                    </div>
                  )}
                  <CardContent className="p-6 text-center">
                    <Users className={`w-12 h-12 mx-auto mb-4 ${
                      index === 1 ? 'text-purple-500' : 
                      index === 0 ? 'text-jesuit-gold' : 'text-blue-500'
                    }`} />
                    <h4 className="text-xl font-bold text-jesuit-dark mb-2">{tariff.name}</h4>
                    <div className={`text-3xl font-bold mb-4 ${
                      index === 1 ? 'text-purple-500' : 
                      index === 0 ? 'text-jesuit-gold' : 'text-blue-500'
                    }`}>
                      {tariff.price === 0 ? 'Devis' : `${tariff.price.toLocaleString()} FCFA`}
                    </div>
                    <p className="text-sm text-jesuit-darkgray mb-6">{tariff.unit}</p>
                    <ul className="text-sm text-jesuit-darkgray space-y-2 mb-6 text-left">
                      {tariff.benefits.map((benefit, idx) => (
                        <li key={idx}>✓ {benefit}</li>
                      ))}
                    </ul>
                    <Link to={tariff.price === 0 ? "/contact" : "/formations/fablab/inscription"} className="block">
                      <Button className={`w-full ${
                        index === 1 ? 'bg-purple-500 hover:bg-purple-600' :
                        index === 0 ? 'bg-jesuit-gold hover:bg-jesuit-gold/90' :
                        'border-blue-500 text-blue-500 hover:bg-blue-50'
                      }`} variant={index === 2 ? 'outline' : 'default'}>
                        {tariff.price === 0 ? 'Nous contacter' : 'S\'abonner'}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Services et Formations */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-jesuit-dark mb-8 text-center">Formations et Services</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <Printer className="w-8 h-8 text-jesuit-gold mb-3" />
                    <h4 className="text-lg font-semibold text-jesuit-dark mb-2">{service.name}</h4>
                    <p className="text-jesuit-darkgray text-sm mb-4">
                      {service.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-jesuit-gold">
                        {service.price === 0 ? 'Sur devis' : `${service.price.toLocaleString()} FCFA`}
                      </span>
                      <span className="text-sm text-jesuit-darkgray">{service.duration}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Tarifs des matériaux */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="text-2xl font-semibold text-jesuit-dark mb-8 text-center">Tarifs des Matériaux</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {tariffs.filter(t => t.type === 'material').map((tariff) => (
                <Card key={tariff.id} className="bg-white shadow-md">
                  <CardContent className="p-4 text-center">
                    <h4 className="font-semibold text-jesuit-dark mb-2">{tariff.name}</h4>
                    <div className="text-xl font-bold text-jesuit-gold">{tariff.price.toLocaleString()} FCFA</div>
                    <p className="text-sm text-jesuit-darkgray">par {tariff.unit}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
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
                className="text-blue-600 hover:text-amber-500 hover:underline transition-colors"
              >
                CREC, Godomey, Bénin
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA - Style harmonisé */}
      <section className="py-16 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-black/40 to-transparent p-10 rounded-xl backdrop-blur-sm border border-white/10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Rejoignez le FabLab CREC</h2>
            <p className="text-xl mb-8 text-amber-100">
              Créez, innovez et collaborez dans un espace dédié à l'excellence et au service.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/formations/fablab/inscription" 
                className="px-8 py-3 bg-crec-gold hover:bg-amber-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                <BookOpen className="w-5 h-5" />
                S'inscrire aux formations
              </Link>
              <Link to="/subscription-verification" 
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                <Cpu className="w-5 h-5" />
                Réserver une machine
              </Link>
              <Link to="/contact" 
                className="px-8 py-3 border border-white/70 text-white hover:bg-white/20 rounded-full transition-all duration-300 flex items-center justify-center gap-2">
                <Users className="w-5 h-5" />
                Nous contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FablabPage;
