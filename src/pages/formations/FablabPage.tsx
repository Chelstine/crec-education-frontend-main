import React, { useState, useEffect } from 'react';
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
  Play,
  CalendarDays,
  PhoneCall,
  Mail,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useFabLab } from '@/context/FabLabContext';

const FablabPage = () => {
  // State pour le filtrage des projets
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [machineImages, setMachineImages] = useState<string[]>([]);

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
  const tariffs = getActiveTariffs().filter(tariff => tariff.type !== 'material');
  
  // Cette partie n'est plus nécessaire car nous ajoutons les machines directement dans le JSX
  useEffect(() => {
    // Aucune action nécessaire, les machines sont codées en dur
  }, []);

  // Fonction pour filtrer les projets selon la catégorie sélectionnée
  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : getProjectsByCategory(selectedFilter);

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
      {/* Hero Section - Style ContactPage */}
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
              {description.title}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              {description.subtitle}
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
            <p>{description.description}</p>
            <p>{description.mission}</p>
            
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
              { key: 'automation', label: 'Automatisation', icon: Zap },
              { key: 'other', label: 'Autres', icon: Wrench }
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
                        project.category === 'automation' ? 'bg-orange-500' :
                        'bg-gray-600'
                      }`}>
                        {project.category === 'iot' ? 'IoT' :
                         project.category === '3d' ? '3D' :
                         project.category === 'electronics' ? 'Électronique' :
                         project.category === 'automation' ? 'Automatisation' :
                         'Autre'}
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
            className="text-3xl font-bold mb-6 text-center text-jesuit-dark"
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
            {/* Machine 1: Creality Ender FAB-IMP01 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="h-full"
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group">                  <div className="relative overflow-hidden">
                    <img
                      src="/img/machines/creality  ender fab-imp01.jpeg"
                      alt="Creality Ender"
                      className="w-full h-64 object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/80 text-white backdrop-blur-sm">
                      Impression 3D
                    </span>
                  </div>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-3 text-jesuit-dark">Creality Ender 3</h3>
                  <p className="text-sm text-gray-500 mb-2">FAB-IMP01</p>
                  <p className="text-jesuit-darkgray text-base mb-4">
                    Imprimante 3D fiable pour débutants et projets de précision moyenne.
                  </p>
                  <div className="mt-auto">
                    <h4 className="font-medium text-jesuit-dark mb-2">Caractéristiques principales :</h4>
                    <ul className="text-jesuit-darkgray text-sm leading-relaxed list-disc list-inside">
                      <li>Volume d'impression: 220x220x250mm</li>
                      <li>Précision: ±0.1mm</li>
                      <li>Vitesse max: 150mm/s</li>
                      <li>Matériaux: PLA, ABS, PETG</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Machine 2: Creality Ender FAB-IMP02 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="h-full"
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group">                  <div className="relative overflow-hidden">
                    <img
                      src="/img/machines/creality  ender fab-imp02.jpeg"
                      alt="Creality Ender"
                      className="w-full h-64 object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/80 text-white backdrop-blur-sm">
                      Impression 3D
                    </span>
                  </div>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-3 text-jesuit-dark">Creality Ender 5</h3>
                  <p className="text-sm text-gray-500 mb-2">FAB-IMP02</p>
                  <p className="text-jesuit-darkgray text-base mb-4">
                    Imprimante 3D avancée pour productions de qualité et durables.
                  </p>
                  <div className="mt-auto">
                    <h4 className="font-medium text-jesuit-dark mb-2">Caractéristiques principales :</h4>
                    <ul className="text-jesuit-darkgray text-sm leading-relaxed list-disc list-inside">
                      <li>Volume d'impression: 220x220x300mm</li>
                      <li>Structure cubique stable</li>
                      <li>Double axe Z</li>
                      <li>Auto-nivellement</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Machine 3: Creality Ender FAB-IMP03 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-full"
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group">                  <div className="relative overflow-hidden">
                    <img
                      src="/img/machines/creality  ender fab-imp03.jpeg"
                      alt="Creality Ender"
                      className="w-full h-64 object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/80 text-white backdrop-blur-sm">
                      Impression 3D
                    </span>
                  </div>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-3 text-jesuit-dark">Creality Ender S1</h3>
                  <p className="text-sm text-gray-500 mb-2">FAB-IMP03</p>
                  <p className="text-jesuit-darkgray text-base mb-4">
                    Imprimante 3D haute performance avec double extrusion et contrôle avancé.
                  </p>
                  <div className="mt-auto">
                    <h4 className="font-medium text-jesuit-dark mb-2">Caractéristiques principales :</h4>
                    <ul className="text-jesuit-darkgray text-sm leading-relaxed list-disc list-inside">
                      <li>Volume d'impression: 220x220x280mm</li>
                      <li>Extrudeuse à entraînement direct</li>
                      <li>CR Touch (nivellement automatique)</li>
                      <li>Plateau chauffant PEI à démontage rapide</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Machine 4: ANYCUBIC Cobra 2 Pro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-full"
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group">                  <div className="relative overflow-hidden">
                    <img
                      src="/img/machines/ANYCUBIC cobra 2 pro.jpeg"
                      alt="ANYCUBIC Cobra 2 Pro"
                      className="w-full h-64 object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/80 text-white backdrop-blur-sm">
                      Impression 3D
                    </span>
                  </div>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-3 text-jesuit-dark">ANYCUBIC Cobra 2 Pro</h3>
                  <p className="text-sm text-gray-500 mb-2">FAB-IMP04</p>
                  <p className="text-jesuit-darkgray text-base mb-4">
                    Imprimante 3D ultra-rapide pour la production professionnelle et projets avancés.
                  </p>
                  <div className="mt-auto">
                    <h4 className="font-medium text-jesuit-dark mb-2">Caractéristiques principales :</h4>
                    <ul className="text-jesuit-darkgray text-sm leading-relaxed list-disc list-inside">
                      <li>Vitesse d'impression jusqu'à 300mm/s</li>
                      <li>Cadre en métal intégral et stable</li>
                      <li>Écran tactile intelligent</li>
                      <li>Reprise d'impression après coupure</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Machine 5: Découpe Laser */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="h-full"
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group">                  <div className="relative overflow-hidden">
                    <img
                      src="/img/machines/decoupe laser.jpeg"
                      alt="Machine de Découpe Laser"
                      className="w-full h-64 object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/80 text-white backdrop-blur-sm">
                      Découpe Laser
                    </span>
                  </div>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-3 text-jesuit-dark">Ortur Laser Master 2</h3>
                  <p className="text-sm text-gray-500 mb-2">FAB-LASER01</p>
                  <p className="text-jesuit-darkgray text-base mb-4">
                    Machine de découpe et gravure laser pour bois, acrylique, cuir et autres matériaux.
                  </p>
                  <div className="mt-auto">
                    <h4 className="font-medium text-jesuit-dark mb-2">Caractéristiques principales :</h4>
                    <ul className="text-jesuit-darkgray text-sm leading-relaxed list-disc list-inside">
                      <li>Zone de travail: 400 x 430mm</li>
                      <li>Précision de positionnement: 0.01mm</li>
                      <li>Compatible avec LightBurn</li>
                      <li>Puissance: 20W</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Machine 6: Impression sur Tissu */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="h-full"
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group">                  <div className="relative overflow-hidden">
                    <img
                      src="/img/machines/impression sur tissu .jpeg"
                      alt="Machine d'Impression sur Tissu"
                      className="w-full h-64 object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/80 text-white backdrop-blur-sm">
                      Impression Textile
                    </span>
                  </div>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-3 text-jesuit-dark">Epson SureColor F570</h3>
                  <p className="text-sm text-gray-500 mb-2">FAB-TEXT01</p>
                  <p className="text-jesuit-darkgray text-base mb-4">
                    Imprimante à sublimation pour impression haute qualité sur textiles et objets.
                  </p>
                  <div className="mt-auto">
                    <h4 className="font-medium text-jesuit-dark mb-2">Caractéristiques principales :</h4>
                    <ul className="text-jesuit-darkgray text-sm leading-relaxed list-disc list-inside">
                      <li>Largeur d'impression: 60cm</li>
                      <li>Résolution: jusqu'à 2400 x 1200 DPI</li>
                      <li>Encres à sublimation UltraChrome DS</li>
                      <li>Compatible avec de nombreux textiles</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services et Tarifs Unifiés */}
      <section className="py-16 bg-jesuit-light">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-6 text-center text-jesuit-dark"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Services et tarifs
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
          
          {/* Abonnements (tariffs de type membership) */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h3 className="text-2xl font-semibold text-jesuit-dark mb-8 text-center">Abonnements FabLab</h3>
            <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
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
            className="mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-jesuit-dark mb-8 text-center">Formations et Services</h3>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.filter(service => service.category === 'Formation' || service.category === 'Service').map((service, index) => (
                <Card key={service.id} className="bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    {service.category === 'Formation' ? 
                      <BookOpen className="w-8 h-8 text-jesuit-gold mb-3" /> : 
                      <Wrench className="w-8 h-8 text-jesuit-gold mb-3" />}
                    <div className="inline-flex px-2 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-medium mb-3">
                      {service.category}
                    </div>
                    <h4 className="text-lg font-semibold text-jesuit-dark mb-2">{service.name}</h4>
                    <p className="text-jesuit-darkgray text-sm mb-4">
                      {service.description}
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-lg font-bold text-jesuit-gold">
                        {service.price === 0 ? 'Sur devis' : `${service.price.toLocaleString()} FCFA`}
                      </span>
                      <span className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-600">{service.duration}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/contact">
                <Button variant="outline" className="border-amber-500 text-amber-700 hover:bg-amber-50">
                  Demander plus d'informations sur nos services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Infos pratiques - Version réduite */}
      <section className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-8 text-center text-jesuit-dark"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Infos pratiques
          </motion.h2>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Informations essentielles à gauche */}
            <motion.div
              className="md:w-1/2 flex flex-col gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <div>
                    <h3 className="font-semibold text-jesuit-dark">Horaires</h3>
                    <p className="text-sm text-gray-600">Lun-Ven: 8h-17h | Sam: 9h-13h (sur RDV)</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-jesuit-dark">Adresse</h3>
                    <p className="text-sm text-gray-600">CREC - Godomey, Bénin</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <PhoneCall className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-jesuit-dark">Contact</h3>
                    <p className="text-sm text-gray-600">+229 96 05 33 22 | contact@crecbenin.org</p>
                  </div>
                </div>
              </div>
              
              <Link to="/subscription-verification" className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-amber-200 transition-all">
                <div className="flex items-center gap-3">
                  <CalendarDays className="w-5 h-5 text-purple-600" />
                  <div>
                    <h3 className="font-semibold text-jesuit-dark">Réserver une machine</h3>
                    <p className="text-sm text-gray-600">En ligne ou par téléphone</p>
                  </div>
                </div>
              </Link>
            </motion.div>
            
            {/* Carte à droite (plus petite) */}
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <iframe
                title="Localisation CREC"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26805.608272842124!2d2.305574410839845!3d6.383382500000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x102357caccf1e90d%3A0xbce64d9a20725bcc!2sCentre%20J%C3%A9suite%20De%20Recherche%20D%27Etude%20Et%20De%20Cr%C3%A9ativit%C3%A9!5e1!3m2!1sfr!2sbj!4v1748345292350!5m2!1sfr!2sbj"
                className="w-full h-[250px] rounded-lg border border-gray-200 shadow-sm"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="mt-2 text-center">
                <a
                  href="https://maps.app.goo.gl/6hS2iXvG5WjZ8KkD7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm inline-flex items-center text-blue-600 hover:text-amber-500"
                >
                  <MapPin className="w-3 h-3 mr-1" /> Google Maps
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA - Style minimaliste */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-crec-darkblue"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Prêt à donner vie à vos idées ?
            </motion.h2>
            
            <motion.p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Le FabLab CREC est ouvert à tous ceux qui souhaitent explorer leur créativité et transformer leurs concepts en prototypes concrets dans un environnement collaboratif et innovant.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link to="/contact">
                <Button variant="outline" className="min-w-[200px] border-crec-darkblue text-crec-darkblue hover:bg-crec-darkblue hover:text-white group transition-all duration-300">
                  <Mail className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Nous contacter
                </Button>
              </Link>
              <Link to="/subscription-verification">
                <Button className="min-w-[200px] bg-crec-gold hover:bg-amber-500 text-white group transition-all duration-300">
                  <CalendarDays className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Réserver maintenant
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FablabPage;
