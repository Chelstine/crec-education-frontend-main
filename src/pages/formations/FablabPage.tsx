import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Printer, Wrench, MapPin, Clock, Lightbulb, Users, BookOpen, Cpu, Zap, Cog, Wifi, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProjetFabLab, EquipementFabLab } from '@/types';
import { mockProjetsFabLab, mockEquipementsFabLab } from '@/services/mockData';

// Define TypeScript interface for machines (compatibility)
interface Machine {
  name: string;
  code: string;
  features: string[];
  reference: string;
  monthlyPrice: number;
  yearlyPrice: number;
  image: string;
}

const FablabPage = () => {
  // State pour le filtrage des projets
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Utiliser les données mockées centralisées
  const projects = mockProjetsFabLab;
  const equipements = mockEquipementsFabLab;

  // Fonction pour filtrer les projets selon la catégorie sélectionnée
  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedFilter);

  const machines: Machine[] = [
    {
      name: 'Creality Ender-5 S1',
      code: 'FAB IMP 01',
      features: ['250mm/s Grande Vitesse', '300°C Haute Température', 'Détection de Filaments', 'CR Touch Auto-Nivellement', '220x220x280mm'],
      reference: 'B0BQJCX9HC',
      monthlyPrice: 10000,
      yearlyPrice: 100000,
      image: '/img/machines/creality-ender5-s1.jpg',
    },
    {
      name: 'Creality Ender-3',
      code: 'FAB IMP 02',
      features: ['Protection de l’Alimentation', 'Impression de Reprise', '220x220x250mm'],
      reference: 'B07BR3F9N6',
      monthlyPrice: 8000,
      yearlyPrice: 80000,
      image: '/img/machines/creality-ender3.jpg',
    },
    {
      name: 'Creality Ender-3',
      code: 'FAB IMP 03',
      features: ['Protection de l’Alimentation', 'Impression de Reprise', '220x220x250mm'],
      reference: 'B07BR3F9N6',
      monthlyPrice: 7200,
      yearlyPrice: 80000,
      image: '/img/machines/creality-ender3.jpg',
    },
    {
      name: 'Anycubic Kobra',
      code: 'FAB IMP 04',
      features: ['500mm/s Grande Vitesse', 'Pro', 'Nivellement de Auto LeviQ 2.0', '220x220x250mm'],
      reference: 'B0CDVX32X4',
      monthlyPrice: 12500,
      yearlyPrice: 120000,
      image: '/img/machines/anycubic-kobra.jpg',
    },
    {
      name: 'Latilool F50 Laser Engraver',
      code: 'FAB GRAV',
      features: ['50W Puissance', 'Protection des Yeux', '400x400mm', 'Gravure sur Bois, Métal, Verre, Acrylique'],
      reference: 'B0B6NG84VF',
      monthlyPrice: 15000,
      yearlyPrice: 150000,
      image: '/img/machines/latilool-f50.jpg',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-[15pt] bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        <div
          className="min-h-[400px] flex flex-col items-center justify-center text-center relative text-white p-6 fablab-hero-bg"
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
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white rounded-full shadow-md hover:shadow-lg transition-all text-lg font-semibold"
                  asChild
                >
                  <Link to="/subscription-verification">Réserver une machine</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Button
                  className="w-full sm:w-auto px-6 py-3 border-2 border-white text-white hover:text-amber-600 hover:bg-white rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                  asChild
                >
                  <Link to="/contact">Nous contacter</Link>
                </Button>
              </motion.div>
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

      {/* Projets réalisés */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-jesuit-dark mb-4">
              Projets réalisés au CREC
            </h2>
            <p className="text-lg text-jesuit-darkgray max-w-3xl mx-auto">
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
                className={`flex items-center gap-2 transition-all duration-300 border-2 ${
                  selectedFilter === filter.key 
                    ? 'bg-amber-500 text-white border-amber-500 shadow-lg transform scale-105' 
                    : 'bg-white text-amber-600 border-amber-400 hover:bg-amber-500 hover:text-white hover:border-amber-500 hover:shadow-md hover:scale-102'
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
                    {project.type === 'video' || project.mediaType === 'video' ? (
                      <div className="relative">
                        <img
                          src={project.fichierUrl || project.mediaUrl || "/img/placeholder-project.jpg"}
                          alt={project.titre}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                      </div>
                    ) : (
                      <img
                        src={project.fichierUrl || project.mediaUrl || "/img/placeholder-project.jpg"}
                        alt={project.titre}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
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
                    {(project.type === 'video' || project.mediaType === 'video') && (
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-1 bg-red-500 text-white rounded-full text-xs font-medium">
                          🎥 Vidéo
                        </span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg text-jesuit-dark mb-2 line-clamp-2">
                      {project.titre}
                    </h3>
                    <p className="text-sm text-jesuit-darkgray mb-3 line-clamp-3">
                      {project.description}
                    </p>
                    
                    {/* Informations enrichies */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>👁 {project.views}</span>
                        <span>❤️ {project.likes}</span>
                        <span>⏱ {project.dureeRealisation}</span>
                        {project.cout && (
                          <span className="font-medium text-jesuit-gold">
                            {project.cout.toLocaleString()} F
                          </span>
                        )}
                      </div>
                      
                      <div>
                        <h4 className="text-xs font-semibold text-jesuit-dark uppercase tracking-wide mb-1">
                          Technologies utilisées
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 4).map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-jesuit-light text-jesuit-dark text-xs rounded-md font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Auteur */}
                      <div className="text-xs text-gray-500">
                        <span className="font-medium">Par:</span> {project.auteur || project.author}
                      </div>
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
                key={machine.code}
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
          
          {/* Abonnements */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h3 className="text-2xl font-semibold text-jesuit-dark mb-8 text-center">Abonnements FabLab</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white shadow-lg border-2 border-jesuit-gold">
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-jesuit-gold mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-jesuit-dark mb-2">Étudiant</h4>
                  <div className="text-3xl font-bold text-jesuit-gold mb-4">15,000 FCFA</div>
                  <p className="text-sm text-jesuit-darkgray mb-6">par mois</p>
                  <ul className="text-sm text-jesuit-darkgray space-y-2 mb-6 text-left">
                    <li>✓ Accès illimité aux machines</li>
                    <li>✓ Formations de base incluses</li>
                    <li>✓ Support technique</li>
                    <li>✓ Stockage de projets</li>
                  </ul>
                  <Link to="/formations/fablab/inscription" className="block">
                    <Button className="w-full bg-jesuit-gold hover:bg-jesuit-gold/90">
                      S'abonner
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg border-2 border-purple-500 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Populaire
                  </span>
                </div>
                <CardContent className="p-6 text-center">
                  <Lightbulb className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-jesuit-dark mb-2">Professionnel</h4>
                  <div className="text-3xl font-bold text-purple-500 mb-4">25,000 FCFA</div>
                  <p className="text-sm text-jesuit-darkgray mb-6">par mois</p>
                  <ul className="text-sm text-jesuit-darkgray space-y-2 mb-6 text-left">
                    <li>✓ Tout de l'abonnement Étudiant</li>
                    <li>✓ Accès prioritaire aux machines</li>
                    <li>✓ Formations avancées incluses</li>
                    <li>✓ Projets commerciaux autorisés</li>
                    <li>✓ Support technique prioritaire</li>
                  </ul>
                  <Link to="/formations/fablab/inscription" className="block">
                    <Button className="w-full bg-purple-500 hover:bg-purple-600">
                      S'abonner
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardContent className="p-6 text-center">
                  <Cog className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-jesuit-dark mb-2">Sur mesure</h4>
                  <div className="text-3xl font-bold text-blue-500 mb-4">Devis</div>
                  <p className="text-sm text-jesuit-darkgray mb-6">personnalisé</p>
                  <ul className="text-sm text-jesuit-darkgray space-y-2 mb-6 text-left">
                    <li>✓ Formation sur mesure</li>
                    <li>✓ Accompagnement projet</li>
                    <li>✓ Tarifs préférentiels</li>
                    <li>✓ Support dédié</li>
                  </ul>
                  <Link to="/contact" className="block">
                    <Button variant="outline" className="w-full border-blue-500 text-blue-500 hover:bg-blue-50">
                      Nous contacter
                    </Button>
                  </Link>
                </CardContent>
              </Card>
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
              <Card className="bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <Printer className="w-8 h-8 text-jesuit-gold mb-3" />
                  <h4 className="text-lg font-semibold text-jesuit-dark mb-2">Formation Impression 3D</h4>
                  <p className="text-jesuit-darkgray text-sm mb-4">
                    Apprenez les bases de l'impression 3D et la conception pour la fabrication additive
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-jesuit-gold">25,000 FCFA</span>
                    <span className="text-sm text-jesuit-darkgray">4h</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <Cpu className="w-8 h-8 text-jesuit-gold mb-3" />
                  <h4 className="text-lg font-semibold text-jesuit-dark mb-2">Arduino & IoT</h4>
                  <p className="text-jesuit-darkgray text-sm mb-4">
                    Découvrez l'électronique et programmez vos premiers objets connectés
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-jesuit-gold">30,000 FCFA</span>
                    <span className="text-sm text-jesuit-darkgray">6h</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <Wrench className="w-8 h-8 text-jesuit-gold mb-3" />
                  <h4 className="text-lg font-semibold text-jesuit-dark mb-2">Prototypage Rapide</h4>
                  <p className="text-jesuit-darkgray text-sm mb-4">
                    Service complet de prototypage pour vos projets innovants
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-jesuit-gold">Sur devis</span>
                    <span className="text-sm text-jesuit-darkgray">1-5j</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <Lightbulb className="w-8 h-8 text-jesuit-gold mb-3" />
                  <h4 className="text-lg font-semibold text-jesuit-dark mb-2">Consultation Projet</h4>
                  <p className="text-jesuit-darkgray text-sm mb-4">
                    Conseil personnalisé pour votre projet de fabrication numérique
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-jesuit-gold">15,000 FCFA</span>
                    <span className="text-sm text-jesuit-darkgray">1h</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <Users className="w-8 h-8 text-jesuit-gold mb-3" />
                  <h4 className="text-lg font-semibold text-jesuit-dark mb-2">Utilisation Supervisée</h4>
                  <p className="text-jesuit-darkgray text-sm mb-4">
                    Accès aux machines avec supervision pour les non-abonnés
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-jesuit-gold">5,000 FCFA</span>
                    <span className="text-sm text-jesuit-darkgray">/heure</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <Cog className="w-8 h-8 text-jesuit-gold mb-3" />
                  <h4 className="text-lg font-semibold text-jesuit-dark mb-2">Service Assisté</h4>
                  <p className="text-jesuit-darkgray text-sm mb-4">
                    Nous réalisons votre projet selon vos spécifications
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-jesuit-gold">15,000 FCFA</span>
                    <span className="text-sm text-jesuit-darkgray">/heure</span>
                  </div>
                </CardContent>
              </Card>
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
              <Card className="bg-white shadow-md">
                <CardContent className="p-4 text-center">
                  <h4 className="font-semibold text-jesuit-dark mb-2">Filament PLA</h4>
                  <div className="text-xl font-bold text-jesuit-gold">500 FCFA</div>
                  <p className="text-sm text-jesuit-darkgray">par gramme</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-md">
                <CardContent className="p-4 text-center">
                  <h4 className="font-semibold text-jesuit-dark mb-2">Filament ABS</h4>
                  <div className="text-xl font-bold text-jesuit-gold">600 FCFA</div>
                  <p className="text-sm text-jesuit-darkgray">par gramme</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-md">
                <CardContent className="p-4 text-center">
                  <h4 className="font-semibold text-jesuit-dark mb-2">Plaque Acrylique</h4>
                  <div className="text-xl font-bold text-jesuit-gold">2,000 FCFA</div>
                  <p className="text-sm text-jesuit-darkgray">par dm²</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-md">
                <CardContent className="p-4 text-center">
                  <h4 className="font-semibold text-jesuit-dark mb-2">Contreplaqué</h4>
                  <div className="text-xl font-bold text-jesuit-gold">1,500 FCFA</div>
                  <p className="text-sm text-jesuit-darkgray">par dm²</p>
                </CardContent>
              </Card>
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
                className="w-full sm:w-auto px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all text-lg font-semibold"
                asChild
              >
                <Link to="/formations/fablab/inscription">S'inscrire aux formations</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Button
                className="w-full sm:w-auto px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all text-lg font-semibold"
                asChild
              >
                <Link to="/subscription-verification">Réserver une machine</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Button
                className="w-full sm:w-auto px-6 py-3 border-2 border-white text-white hover:text-amber-600 hover:bg-white rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                asChild
              >
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
            </section>
    </div>
  );
};

export default FablabPage;