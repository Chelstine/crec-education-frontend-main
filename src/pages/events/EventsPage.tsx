import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Filter, Eye } from "lucide-react";
import { useEvents, useUpcomingEvents, usePastEvents } from "@/hooks/useEvents";
import { Event, formatEventDate, formatEventTime } from "@/types/events";

const EventsPage = () => {
  const [showPastEvents, setShowPastEvents] = useState(false);
  
  const { data: allEvents = [], isLoading, error } = useEvents();
  const { data: upcomingEvents = [] } = useUpcomingEvents();
  const { data: pastEvents = [] } = usePastEvents();

  // Composant pour afficher un événement
  const EventCard = ({ event }: { event: Event }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full" // Hauteur complète pour uniformiser
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        {event.image_url && (
          <div className="h-48 overflow-hidden flex-shrink-0">
            <img 
              src={event.image_url} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        {/* Si pas d'image, ajouter un placeholder de même hauteur */}
        {!event.image_url && (
          <div className="h-48 bg-gradient-to-br from-crec-darkblue/10 to-crec-gold/10 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-16 h-16 text-crec-gold/30" />
          </div>
        )}
        <CardContent className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-crec-darkblue mb-2 min-h-[3.5rem] line-clamp-2">
            {event.title}
          </h3>
          <p className="text-gray-600 mb-4 flex-1 line-clamp-3 min-h-[4.5rem]">
            {event.description}
          </p>
          
          <div className="space-y-2 text-sm text-gray-500 mt-auto">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-crec-gold flex-shrink-0" />
              <span>{formatEventDate(event)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-crec-gold flex-shrink-0" />
              <span>{formatEventTime(event)}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-crec-gold flex-shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-crec-gold mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des événements...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erreur lors du chargement des événements</p>
          <Button onClick={() => window.location.reload()}>Réessayer</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Style harmonisé */}
      <section className="relative w-full overflow-hidden">
        {/* Background with parallax effect */}
        <div className="absolute inset-0 bg-[url('/img/crec3.jpg')] bg-cover bg-center" />
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
                animate={{
                  scale: [1, 1.05, 1],
                  transition: { 
                    repeat: Infinity,
                    repeatType: "reverse", 
                    duration: 1.5
                  }
                }}
                className="w-2 h-2 rounded-full bg-crec-gold mr-2" 
              />
              <span className="text-sm font-medium">Agenda CREC</span>
            </motion.div>

            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight">
              Événements
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8">
              Découvrez nos événements éducatifs, conférences et activités culturelles
            </p>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px]" fill="#f9fafb">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,213.35,56.44Z" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Filter Controls */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-lg shadow-md p-1">
            <Button
              variant={!showPastEvents ? "default" : "ghost"}
              onClick={() => setShowPastEvents(false)}
              className="mr-1"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Événements à venir ({upcomingEvents.length})
            </Button>
            <Button
              variant={showPastEvents ? "default" : "ghost"}
              onClick={() => setShowPastEvents(true)}
            >
              <Eye className="w-4 h-4 mr-2" />
              Événements passés ({pastEvents.length})
            </Button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {!showPastEvents ? (
            // Événements à venir
            upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Aucun événement à venir
                </h3>
                <p className="text-gray-500">
                  Restez connectés pour découvrir nos prochains événements !
                </p>
              </div>
            )
          ) : (
            // Événements passés
            pastEvents.length > 0 ? (
              pastEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Eye className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Aucun événement passé
                </h3>
                <p className="text-gray-500">
                  L'historique de nos événements apparaîtra ici.
                </p>
              </div>
            )
          )}
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <h2 className="text-3xl font-bold text-crec-darkblue mb-4">
            Vous souhaitez être informé de nos événements ?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contactez-nous pour recevoir nos invitations et ne manquer aucun de nos événements éducatifs et culturels.
          </p>
          <Button 
            size="lg" 
            className="bg-crec-gold hover:bg-crec-gold/90 text-crec-darkblue font-semibold"
            onClick={() => window.location.href = '/contact'}
          >
            Nous contacter
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default EventsPage;
