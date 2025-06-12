import React from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '@/components/common/PageWrapper';
import SectionTitle from '@/components/common/SectionTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Music, BookOpen, Calendar, Heart, Camera, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

// TypeScript interfaces
interface Club {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
}

const CampusLifePage = () => {
  const clubs: Club[] = [
    {
      id: 'c1',
      title: 'Club Technologique',
      description: 'Explorez l’innovation et le codage avec des projets pratiques.',
      icon: Users,
    },
    {
      id: 'c2',
      title: 'Club Culturel',
      description: 'Célébrez la diversité béninoise à travers la danse et la musique.',
      icon: Music,
    },
    {
      id: 'c3',
      title: 'Club de Service',
      description: 'Engagez-vous dans des projets communautaires locaux.',
      icon: Heart,
    },
  ];

  const newsItems: NewsItem[] = [
    {
      id: 'n1',
      title: 'Conférence internationale sur le développement durable',
      summary: 'Le CREC accueillera des experts mondiaux le mois prochain.',
      date: '15 juin 2025',
    },
    {
      id: 'n2',
      title: 'Festival culturel béninois',
      summary: 'Les étudiants organisent un festival multiculturel vibrant.',
      date: '20 mai 2025',
    },
    {
      id: 'n3',
      title: 'Retraite spirituelle',
      summary: 'Une journée de réflexion pour approfondir la spiritualité jésuite.',
      date: '10 mai 2025',
    },
  ];

  const events: Event[] = [
    {
      id: 'e1',
      title: 'Journée portes ouvertes',
      date: '5 juin 2025',
      description: 'Découvrez le campus et rencontrez notre communauté.',
    },
    {
      id: 'e2',
      title: 'Match de football inter-étudiants',
      date: '12 juin 2025',
      description: 'Supportez nos équipes dans une ambiance festive.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
        <div
          className="min-h-[300px] flex flex-col items-center justify-center text-center relative text-white p-6 news-hero-bg"
        >
          <div className="max-w-3xl mx-auto bg-black/50 p-8 rounded-lg backdrop-blur-sm">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Vie du Campus</h1>
            <p className="text-xl md:text-2xl mb-8">
              Découvrez la vie associative et les clubs du CREC
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <motion.section
        className="py-16 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <SectionTitle
            title="Vie sur le campus"
            subtitle="Une communauté jésuite vibrante au cœur du Bénin"
          />
          <p className="text-jesuit-darkgray text-lg leading-relaxed max-w-3xl mx-auto">
            Au CREC, la vie étudiante est guidée par les valeurs jésuites de *cura personalis* et de service. Nos étudiants s’épanouissent dans une communauté inclusive, participant à des activités culturelles, spirituelles et communautaires qui célèbrent la richesse du Bénin.
          </p>
        </div>
      </motion.section>

      {/* Activités étudiantes */}
      <motion.section
        className="py-16 bg-jesuit-light"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-jesuit-dark mb-8 text-center">Activités étudiantes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {clubs.map((club) => (
              <motion.div
                key={club.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: parseInt(club.id.slice(1)) * 0.2 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm shadow-md rounded-lg hover:shadow-lg transition-all">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <club.icon className="w-12 h-12 text-jesuit-gold mb-4" />
                    <h3 className="text-xl font-semibold text-jesuit-dark mb-2">{club.title}</h3>
                    <p className="text-jesuit-darkgray text-base">{club.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Vie spirituelle */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-jesuit-dark mb-8">Vie spirituelle</h2>
          <p className="text-jesuit-darkgray text-lg leading-relaxed mb-6">
            Enracinée dans la tradition jésuite, notre communauté offre des retraites, des messes hebdomadaires et des activités interconfessionnelles pour nourrir l’esprit et favoriser le dialogue.
          </p>
          <Button
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white rounded-full"
            asChild
          >
            <Link to="/spiritual-life">En savoir plus</Link>
          </Button>
        </div>
      </motion.section>

      {/* Événements à venir */}
      <motion.section
        className="py-16 bg-jesuit-light"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-jesuit-dark mb-8 text-center">Événements à venir</h2>
          {/* TODO: Replace with dynamic event calendar component when API is ready */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm shadow-md rounded-lg">
                  <CardContent className="p-6 flex items-start gap-4">
                    <Calendar className="w-8 h-8 text-jesuit-gold" />
                    <div>
                      <h3 className="text-lg font-semibold text-jesuit-dark">{event.title}</h3>
                      <p className="text-sm text-jesuit-darkgray mb-2">{event.date}</p>
                      <p className="text-jesuit-darkgray">{event.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Actualités du campus */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-jesuit-dark mb-8 text-center">Actualités du campus</h2>
          {/* TODO: Integrate dynamic news feed via API */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {newsItems.map((news) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm shadow-md rounded-lg hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-jesuit-dark mb-2">{news.title}</h3>
                    <p className="text-sm text-jesuit-darkgray mb-2">{news.date}</p>
                    <p className="text-jesuit-darkgray">{news.summary}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Galerie photos */}
      <motion.section
        className="py-16 bg-jesuit-light"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-jesuit-dark mb-8 text-center">Galerie photos</h2>
          {/* TODO: Implement carousel or gallery component with API images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { id: 'g1', placeholder: 'Campus festival' },
              { id: 'g2', placeholder: 'Student project' },
              { id: 'g3', placeholder: 'Community service' },
            ].map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-gray-200 h-48 flex items-center justify-center rounded-lg">
                  <Camera className="w-12 h-12 text-jesuit-darkgray" />
                  <p className="text-jesuit-darkgray">{item.placeholder}</p>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Button
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white rounded-full"
              asChild
            >
              <Link to="/gallery">Voir plus</Link>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Engagement communautaire */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-jesuit-dark mb-8">Engagement communautaire</h2>
          <p className="text-jesuit-darkgray text-lg leading-relaxed mb-6">
            Nos étudiants collaborent avec les communautés locales de Porto-Novo pour des projets de développement durable, d’éducation et de santé, incarnant l’esprit jésuite de service.
          </p>
          <Button
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white rounded-full"
            asChild
          >
            <Link to="/community">Découvrir nos projets</Link>
          </Button>
        </div>
      </motion.section>

      {/* CTA (Formatted like ProgramsPage.tsx) */}
      <section className="py-20 bg-[#1A2526] text-gray-100">
        <div className="max-w-3xl mx-auto text-center px-6">
          <motion.h2
            className="text-4xl font-bold mb-6 text-gray-100"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Rejoignez la communauté CREC
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Participez à une vie étudiante riche en culture, spiritualité et engagement au Bénin.
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
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white rounded-full shadow-md hover:shadow-lg transition-all text-lg font-semibold"
                asChild
              >
                <Link to="/clubs">Découvrir les clubs</Link>
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

export default CampusLifePage;