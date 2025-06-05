import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Printer, Wrench, MapPin, Clock, Lightbulb, Users, BookOpen, Cpu, Zap, Cog, Wifi } from 'lucide-react';
import { motion } from 'framer-motion';

// Define TypeScript interface
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

  // Interface pour les projets réalisés
  interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    category: 'iot' | '3d' | 'electronics' | 'automation';
  }

  const projects: Project[] = [
    {
      id: 1,
      title: "Système d'arrosage automatique Arduino",
      description: "Système intelligent d'arrosage des plantes utilisant des capteurs d'humidité du sol et une pompe contrôlée par Arduino.",
      image: "/img/projects/arduino-watering.jpg",
      technologies: ["Arduino", "Capteurs d'humidité", "Pompe", "Relais"],
      category: "automation"
    },
    {
      id: 2,
      title: "Station météo ESP32",
      description: "Station météorologique connectée mesurant température, humidité et pression atmosphérique avec affichage en temps réel.",
      image: "/img/projects/esp32-weather.jpg",
      technologies: ["ESP32", "DHT22", "BMP280", "WiFi", "Web Server"],
      category: "iot"
    },
    {
      id: 3,
      title: "Système de présence RFID",
      description: "Système automatisé de gestion des présences utilisant des cartes RFID et une base de données en temps réel.",
      image: "/img/projects/attendance-system.jpg",
      technologies: ["RFID", "Arduino", "LCD", "Base de données", "Buzzer"],
      category: "electronics"
    },
    {
      id: 4,
      title: "Robot éducatif programmable",
      description: "Robot mobile programmable pour l'apprentissage de la robotique avec détection d'obstacles et contrôle à distance.",
      image: "/img/projects/educational-robot.jpg",
      technologies: ["Arduino", "Moteurs", "Capteurs ultrason", "Bluetooth"],
      category: "electronics"
    },
    {
      id: 5,
      title: "Prothèse de main imprimée 3D",
      description: "Prothèse de main fonctionnelle imprimée en 3D avec mécanisme de préhension assistée par servomoteurs.",
      image: "/img/projects/prosthetic-hand.jpg",
      technologies: ["Impression 3D", "Servomoteurs", "Arduino", "Capteurs de pression"],
      category: "3d"
    },
    {
      id: 6,
      title: "Lampe IoT intelligente",
      description: "Lampe connectée contrôlable via smartphone avec ajustement automatique de l'intensité selon l'heure.",
      image: "/img/projects/iot-lamp.jpg",
      technologies: ["ESP32", "LED RGB", "Photorésistance", "Application mobile"],
      category: "iot"
    },
    {
      id: 7,
      title: "Système de sécurité Raspberry Pi",
      description: "Système de surveillance avec détection de mouvement, capture vidéo et notifications push.",
      image: "/img/projects/raspberry-security.jpg",
      technologies: ["Raspberry Pi", "Caméra", "PIR", "Python", "Notifications"],
      category: "electronics"
    },
    {
      id: 8,
      title: "Maquette d'ascenseur automatisé",
      description: "Modèle réduit d'ascenseur avec système de contrôle d'étages et sécurités intégrées.",
      image: "/img/projects/elevator-model.jpg",
      technologies: ["Arduino", "Moteur pas-à-pas", "Capteurs de position", "LCD"],
      category: "automation"
    },
    {
      id: 9,
      title: "Maison connectée intelligente",
      description: "Système domotique complet avec contrôle de l'éclairage, température et sécurité via smartphone.",
      image: "/img/projects/smart-home.jpg",
      technologies: ["ESP32", "Relais", "Capteurs", "WiFi", "Application mobile"],
      category: "iot"
    },
    {
      id: 10,
      title: "Installation artistique interactive",
      description: "Œuvre d'art numérique réagissant aux mouvements des visiteurs avec effets lumineux et sonores.",
      image: "/img/projects/interactive-art.jpg",
      technologies: ["Arduino", "Capteurs de mouvement", "LED", "Haut-parleurs"],
      category: "electronics"
    },
    {
      id: 11,
      title: "Porte-clés personnalisés gravés",
      description: "Collection de porte-clés en bois gravés au laser avec des motifs personnalisés pour les étudiants.",
      image: "/img/projects/wooden-keychains.jpg",
      technologies: ["Gravure laser", "Bois", "Design vectoriel"],
      category: "3d"
    }
  ];

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
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
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
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg text-jesuit-dark mb-2 line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-jesuit-darkgray mb-3 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-jesuit-dark uppercase tracking-wide">
                        Technologies utilisées
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-jesuit-light text-jesuit-dark text-xs rounded-md font-medium"
                          >
                            {tech}
                          </span>
                        ))}
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