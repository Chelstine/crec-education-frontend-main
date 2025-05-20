import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useParams } from "react-router-dom";
import { Calendar, MapPin, Clock, Users, Share2, Bookmark } from "lucide-react";

// Données factices pour l'événement
const eventData = {
  id: 1,
  title: "Journée Portes Ouvertes",
  date: "2024-04-15",
  time: "10:00 - 17:00",
  location: "Campus Principal",
  description: "Découvrez nos formations et rencontrez nos équipes pédagogiques",
  longDescription: `
    Nous vous invitons à notre Journée Portes Ouvertes annuelle ! C'est l'occasion parfaite pour :
    - Découvrir nos différentes formations
    - Rencontrer nos enseignants et étudiants
    - Visiter nos installations modernes
    - Participer à des ateliers pratiques
    - Obtenir des conseils sur l'orientation
  `,
  image: "/img/events/open-day.jpg",
  gallery: [
    "/img/events/gallery/1.jpg",
    "/img/events/gallery/2.jpg",
    "/img/events/gallery/3.jpg",
    "/img/events/gallery/4.jpg",
    "/img/events/gallery/5.jpg",
    "/img/events/gallery/6.jpg"
  ],
  speakers: [
    {
      name: "Dr. Jean Dupont",
      role: "Directeur des Formations",
      image: "/img/team/jean-dupont.jpg"
    },
    {
      name: "Marie Martin",
      role: "Responsable Admissions",
      image: "/img/team/marie-martin.jpg"
    }
  ],
  schedule: [
    {
      time: "10:00 - 11:00",
      title: "Accueil et présentation",
      description: "Introduction au CREC et présentation des formations"
    },
    {
      time: "11:00 - 12:30",
      title: "Visite des installations",
      description: "Découverte des salles de cours, laboratoires et espaces communs"
    },
    {
      time: "12:30 - 14:00",
      title: "Pause déjeuner",
      description: "Buffet offert aux participants"
    },
    {
      time: "14:00 - 16:00",
      title: "Ateliers pratiques",
      description: "Participation à des mini-cours et démonstrations"
    },
    {
      time: "16:00 - 17:00",
      title: "Questions/Réponses",
      description: "Échange avec les enseignants et les étudiants"
    }
  ]
};

const EventDetailPage = () => {
  const { id } = useParams();
  const event = eventData; // Dans une vraie application, on récupérerait l'événement depuis une API

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
        <div 
          className="min-h-[400px] flex flex-col items-center justify-center text-center relative text-white p-6"
          style={{
            backgroundImage: `url(${event.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="max-w-3xl mx-auto bg-black/50 p-8 rounded-lg backdrop-blur-sm">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>
            <div className="flex flex-wrap justify-center gap-4 text-lg">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">À propos de l'événement</h2>
                  <div className="prose max-w-none">
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="whitespace-pre-line text-gray-600">
                      {event.longDescription}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Schedule */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Programme de la journée</h2>
                  <div className="space-y-4">
                    {event.schedule.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="w-32 flex-shrink-0 text-sm text-gray-500">
                          {item.time}
                        </div>
                        <div>
                          <h3 className="font-semibold">{item.title}</h3>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Gallery */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Galerie photos</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {event.gallery.map((image, index) => (
                      <div key={index} className="aspect-square relative">
                        <img
                          src={image}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Registration */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Participer</h2>
                  <div className="space-y-4">
                    <Button className="w-full bg-crec-gold hover:bg-crec-lightgold text-white">
                      S'inscrire à l'événement
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Share2 className="w-4 h-4 mr-2" />
                        Partager
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Bookmark className="w-4 h-4 mr-2" />
                        Sauvegarder
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Speakers */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Intervenants</h2>
                  <div className="space-y-4">
                    {event.speakers.map((speaker, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <img
                          src={speaker.image}
                          alt={speaker.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold">{speaker.name}</h3>
                          <p className="text-gray-600">{speaker.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Lieu</h2>
                  <div className="aspect-video bg-gray-200 rounded-lg">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615509614!3d48.85837007928757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1647874586708!5m2!1sfr!2sfr"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <p className="mt-4 text-gray-600">
                    {event.location}<br />
                    Accès en transports en commun : Métro ligne 1, station "Champs-Élysées"
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-crec-darkblue text-white">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Vous ne pouvez pas participer ?</h2>
          <p className="text-xl mb-8">
            Découvrez nos autres événements à venir
          </p>
          <Button asChild className="bg-crec-gold hover:bg-crec-lightgold text-white">
            <Link to="/events">
              Voir tous les événements
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default EventDetailPage; 