import React, { useState } from 'react';
import { 
  DataTable,
  DeleteConfirmDialog,
  FormDialog,
  InfoPanel,
  ImageUploader
} from '@/components/admin';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  PencilIcon, 
  TrashIcon, 
  Plus,
  Megaphone,
  CalendarDays,
  Ticket
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Types pour les événements
interface Event {
  id: string;
  title: string;
  description: string;
  category: 'conference' | 'workshop' | 'seminar' | 'cultural' | 'spiritual' | 'other';
  speaker?: string;
  location: string;
  startDate: string;
  endDate: string;
  maxParticipants?: number;
  currentParticipants: number;
  price: number | null;
  status: 'upcoming' | 'ongoing' | 'past' | 'cancelled';
  registrationRequired: boolean;
  image?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

const AdminEventsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('upcoming');
  const [showAddEventDialog, setShowAddEventDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // Mock data for events
  const mockEvents: Event[] = [
    {
      id: "event-1",
      title: "Conférence: L'Éthique dans l'IA",
      description: "Une conférence sur les enjeux éthiques de l'intelligence artificielle dans notre société moderne.",
      category: "conference" as const,
      speaker: "Dr. François Dupont",
      location: "Auditorium Principal",
      startDate: "2025-07-15T18:00:00.000Z",
      endDate: "2025-07-15T20:00:00.000Z",
      maxParticipants: 150,
      currentParticipants: 42,
      price: null,
      status: "upcoming" as const,
      registrationRequired: true,
      image: "/img/events/ai-ethics.jpg",
      featured: true,
      createdAt: "2025-05-10T09:30:00.000Z",
      updatedAt: "2025-06-01T14:15:00.000Z"
    },
    {
      id: "event-2",
      title: "Atelier de Méditation",
      description: "Un atelier pratique sur les techniques de méditation et de pleine conscience.",
      category: "spiritual" as const,
      speaker: "Sœur Marie-Claude",
      location: "Salle de Prière",
      startDate: "2025-08-05T16:00:00.000Z",
      endDate: "2025-08-05T17:30:00.000Z",
      maxParticipants: 30,
      currentParticipants: 15,
      price: 5000,
      status: "upcoming" as const,
      registrationRequired: true,
      image: "/img/events/meditation.jpg",
      featured: false,
      createdAt: "2025-05-20T10:45:00.000Z",
      updatedAt: "2025-06-15T11:30:00.000Z"
    },
    {
      id: "event-3",
      title: "Présentation de la Nouvelle Encyclique",
      description: "Présentation et discussion sur la nouvelle encyclique du Pape François.",
      category: "spiritual" as const,
      speaker: "Père Jean-Marc",
      location: "Chapelle du Centre",
      startDate: "2025-06-10T17:00:00.000Z",
      endDate: "2025-06-10T18:30:00.000Z",
      maxParticipants: 85, // was null, now a number for type safety
      currentParticipants: 85,
      price: null,
      status: "past" as const,
      registrationRequired: false,
      image: "/img/events/encyclique.jpg",
      featured: true,
      createdAt: "2025-04-05T08:20:00.000Z",
      updatedAt: "2025-06-11T09:00:00.000Z"
    }
  ];

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Columns for events table
  const eventColumns = [
    {
      key: "title",
      header: "Événement",
      renderCell: (event: Event) => {
        const getIcon = (category: Event["category"]) => {
          switch(category) {
            case 'conference': return <Megaphone className="w-4 h-4 mr-2 text-blue-500" />;
            case 'workshop': return <Users className="w-4 h-4 mr-2 text-green-500" />;
            case 'spiritual': return <Calendar className="w-4 h-4 mr-2 text-purple-500" />;
            default: return <CalendarDays className="w-4 h-4 mr-2 text-slate-500" />;
          }
        };
        return (
          <div className="flex flex-col">
            <div className="flex items-center">
              {getIcon(event.category)}
              <span className="font-medium">{event.title}</span>
            </div>
            {event.speaker && (
              <span className="text-xs text-slate-500 mt-1 ml-6">
                Par: {event.speaker}
              </span>
            )}
          </div>
        );
      }
    },
    {
      key: "startDate",
      header: "Date",
      renderCell: (event: Event) => (
        <div className="flex flex-col">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-slate-400" />
            <span>{formatDate(event.startDate)}</span>
          </div>
          <span className="text-xs text-slate-500 mt-1 ml-6">
            {new Date(event.startDate).toLocaleDateString('fr-FR', { weekday: 'long' })}
          </span>
        </div>
      )
    },
    {
      key: "location",
      header: "Lieu",
      renderCell: (event: Event) => (
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-2 text-slate-400" />
          <span>{event.location}</span>
        </div>
      )
    },
    {
      key: "currentParticipants",
      header: "Participants",
      renderCell: (event: Event) => (
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-2 text-slate-400" />
          <span>{event.currentParticipants}{event.maxParticipants ? `/${event.maxParticipants}` : ''}</span>
        </div>
      )
    },
    {
      key: "price",
      header: "Prix",
      renderCell: (event: Event) => (
        <div className="flex items-center">
          <Ticket className="w-4 h-4 mr-2 text-slate-400" />
          <span>{event.price ? `${event.price.toLocaleString('fr-FR')} FCFA` : 'Gratuit'}</span>
        </div>
      )
    },
    {
      key: "status",
      header: "Statut",
      renderCell: (event: Event) => {
        const status = event.status;
        return (
          <Badge className={
            status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
            status === 'ongoing' ? 'bg-green-100 text-green-800' :
            status === 'past' ? 'bg-slate-100 text-slate-800' :
            'bg-red-100 text-red-800'
          }>
            {status === 'upcoming' ? 'À venir' :
             status === 'ongoing' ? 'En cours' :
             status === 'past' ? 'Terminé' : 'Annulé'}
          </Badge>
        );
      }
    },
    {
      key: "actions",
      header: "Actions",
      renderCell: (event: Event) => (
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => console.log("Edit event", event.id)}
          >
            <PencilIcon className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => {
              setSelectedItemId(event.id);
              setShowDeleteDialog(true);
            }}
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  // Filter events by status
  const upcomingEvents = mockEvents.filter(event => event.status === 'upcoming');
  const pastEvents = mockEvents.filter(event => event.status === 'past' || event.status === 'cancelled');
  const featuredEvents = mockEvents.filter(event => event.featured);

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestion des Événements</h1>
          <p className="text-muted-foreground">
            Gérez les conférences, ateliers, séminaires et autres événements du centre
          </p>
        </div>
        
        <div className="flex items-center">
          <Button onClick={() => setShowAddEventDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nouvel Événement
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <h3 className="text-lg font-medium">Gestion des événements</h3>
        </CardHeader>
        <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
          <CardHeader className="pb-3 pt-0">
            <TabsList>
              <TabsTrigger value="upcoming">
                <Calendar className="mr-2 h-4 w-4" />
                À venir ({upcomingEvents.length})
              </TabsTrigger>
              <TabsTrigger value="past">
                <Clock className="mr-2 h-4 w-4" />
                Passés ({pastEvents.length})
              </TabsTrigger>
              <TabsTrigger value="featured">
                <Megaphone className="mr-2 h-4 w-4" />
                En vedette ({featuredEvents.length})
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent>
            <TabsContent value="upcoming">
              <DataTable 
                columns={eventColumns} 
                data={upcomingEvents} 
                keyField="id"
                searchPlaceholder="Rechercher un événement..." 
              />
            </TabsContent>
            <TabsContent value="past">
              <DataTable 
                columns={eventColumns} 
                data={pastEvents} 
                keyField="id"
                searchPlaceholder="Rechercher un événement..." 
              />
            </TabsContent>
            <TabsContent value="featured">
              <DataTable 
                columns={eventColumns} 
                data={featuredEvents} 
                keyField="id"
                searchPlaceholder="Rechercher un événement en vedette..." 
              />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>

      {/* Dialog de confirmation de suppression */}
      <DeleteConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={async () => {
          console.log(`Delete event ${selectedItemId}`);
          setShowDeleteDialog(false);
          setSelectedItemId(null);
        }}
        title={`Supprimer cet événement ?`}
        description="Cette action est définitive et ne peut pas être annulée."
      />

      {/* Autres dialogues (formulaires d'ajout) seraient ajoutés ici */}
    </div>
  );
};

export default AdminEventsPage;
