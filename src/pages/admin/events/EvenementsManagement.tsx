import React, { useState, useEffect } from 'react';
import { AdminPageLayout, AdminTable, AdminForm, AdminFilters } from '../../../components/admin';
import { useFilteredData } from '../../../hooks/useAdmin';
import { 
  getBadgeColor, 
  exportToCSV, 
  formatDate 
} from '../../../utils/adminUtils';
import { 
  Calendar,
  Users,
  MapPin,
  Clock,
  Star,
  Eye
} from 'lucide-react';

// Types pour les événements
interface Evenement {
  id: string;
  title: string;
  description: string;
  category: 'conference' | 'atelier' | 'seminaire' | 'formation' | 'autre';
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: string;
  capacity: number;
  registered: number;
  speakers: string[];
  price: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  isPublic: boolean;
  image?: string;
  requirements?: string[];
  createdAt: string;
  updatedAt: string;
}

const EvenementsManagement: React.FC = () => {
  const [events, setEvents] = useState<Evenement[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Evenement | null>(null);

  const {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    clearFilters,
    filteredData
  } = useFilteredData(events, ['title', 'category', 'location', 'speakers']);

  // Mock data pour les événements
  const mockEvents: Evenement[] = [
    {
      id: '1',
      title: 'Conférence Intelligence Artificielle et Éthique',
      description: 'Exploration des enjeux éthiques de l\'IA dans l\'enseignement supérieur',
      category: 'conference',
      startDate: '2025-02-15',
      endDate: '2025-02-15',
      startTime: '14:00',
      endTime: '17:00',
      location: 'Amphithéâtre Principal CREC',
      capacity: 200,
      registered: 145,
      speakers: ['Dr. Marie KOUAKOU', 'Prof. Jean ADOM'],
      price: 0,
      status: 'upcoming',
      isPublic: true,
      requirements: ['Inscription obligatoire'],
      createdAt: '2024-12-15',
      updatedAt: '2024-12-20'
    },
    {
      id: '2',
      title: 'Atelier Impression 3D Avancée',
      description: 'Formation pratique aux techniques avancées d\'impression 3D',
      category: 'atelier',
      startDate: '2025-01-28',
      endDate: '2025-01-28',
      startTime: '09:00',
      endTime: '16:00',
      location: 'FabLab CREC',
      capacity: 15,
      registered: 12,
      speakers: ['M. Tech FABLAB'],
      price: 25000,
      status: 'upcoming',
      isPublic: true,
      requirements: ['Connaissance de base en 3D', 'Apporter un ordinateur portable'],
      createdAt: '2024-12-10',
      updatedAt: '2024-12-18'
    },
    {
      id: '3',
      title: 'Séminaire Leadership Ignatien',
      description: 'Formation au leadership selon la spiritualité ignatienne',
      category: 'seminaire',
      startDate: '2025-03-10',
      endDate: '2025-03-12',
      startTime: '08:30',
      endTime: '17:00',
      location: 'Centre de Retraite CREC',
      capacity: 30,
      registered: 18,
      speakers: ['P. Pierre ADOM, SJ', 'Sr. Marie KOFFI'],
      price: 75000,
      status: 'upcoming',
      isPublic: false,
      requirements: ['Réservé aux étudiants et staff CREC'],
      createdAt: '2024-11-20',
      updatedAt: '2024-12-15'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setEvents(mockEvents);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Statistiques des événements
  const eventStats = [
    {
      title: 'Total Événements',
      value: events.length,
      icon: Calendar,
      color: 'text-blue-600',
      description: 'Cette année'
    },
    {
      title: 'À venir',
      value: events.filter(e => e.status === 'upcoming').length,
      icon: Clock,
      color: 'text-orange-600',
      description: 'Prochainement'
    },
    {
      title: 'Participants Inscrits',
      value: events.reduce((sum, e) => sum + e.registered, 0),
      icon: Users,
      color: 'text-green-600',
      description: 'Total'
    },
    {
      title: 'Taux de Remplissage',
      value: Math.round((events.reduce((sum, e) => sum + e.registered, 0) / events.reduce((sum, e) => sum + e.capacity, 0)) * 100) || 0,
      icon: Star,
      color: 'text-purple-600',
      description: '%',
      format: 'percentage'
    }
  ];

  // Configuration des filtres
  const filterConfigs = [
    {
      key: 'category',
      label: 'Catégorie',
      placeholder: 'Filtrer par catégorie',
      options: [
        { value: 'conference', label: 'Conférence' },
        { value: 'atelier', label: 'Atelier' },
        { value: 'seminaire', label: 'Séminaire' },
        { value: 'formation', label: 'Formation' },
        { value: 'autre', label: 'Autre' }
      ]
    },
    {
      key: 'status',
      label: 'Statut',
      placeholder: 'Filtrer par statut',
      options: [
        { value: 'upcoming', label: 'À venir' },
        { value: 'ongoing', label: 'En cours' },
        { value: 'completed', label: 'Terminé' },
        { value: 'cancelled', label: 'Annulé' }
      ]
    },
    {
      key: 'isPublic',
      label: 'Visibilité',
      placeholder: 'Filtrer par visibilité',
      options: [
        { value: 'true', label: 'Public' },
        { value: 'false', label: 'Privé' }
      ]
    }
  ];

  // Configuration des colonnes
  const columns = [
    { key: 'title', label: 'Titre' },
    { key: 'category', label: 'Catégorie', type: 'badge' as const, badgeType: 'category' as const },
    {
      key: 'startDate',
      label: 'Date',
      render: (value: string, item: Evenement) => (
        <div>
          <div className="font-medium">{formatDate(value)}</div>
          <div className="text-sm text-muted-foreground">
            {item.startTime} - {item.endTime}
          </div>
        </div>
      )
    },
    { key: 'location', label: 'Lieu' },
    {
      key: 'registered',
      label: 'Participants',
      render: (value: number, item: Evenement) => (
        <div className="text-center">
          <div className="font-medium">{value}/{item.capacity}</div>
          <div className="text-xs text-muted-foreground">
            {Math.round((value / item.capacity) * 100)}%
          </div>
        </div>
      )
    },
    { 
      key: 'price', 
      label: 'Prix', 
      render: (value: number) => value === 0 ? 'Gratuit' : `${value.toLocaleString()} FCFA`
    },
    { key: 'status', label: 'Statut', type: 'badge' as const, badgeType: 'status' as const },
    { key: 'actions', label: 'Actions', type: 'actions' as const }
  ];

  // Gestionnaires d'événements
  const handleAddEvent = () => {
    setSelectedEvent(null);
    setIsFormOpen(true);
  };

  const handleEditEvent = (event: Evenement) => {
    setSelectedEvent(event);
    setIsFormOpen(true);
  };

  const handleDeleteEvent = (event: Evenement) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      setEvents(prev => prev.filter(e => e.id !== event.id));
    }
  };

  const handleViewEvent = (event: Evenement) => {
    console.log('Voir événement:', event);
  };

  const handleSubmit = (data: Record<string, any>) => {
    if (selectedEvent) {
      // Mise à jour
      setEvents(prev => 
        prev.map(e => e.id === selectedEvent.id ? { 
          ...e, 
          ...data,
          speakers: data.speakers ? data.speakers.split(',').map((s: string) => s.trim()) : [],
          requirements: data.requirements ? data.requirements.split(',').map((r: string) => r.trim()) : [],
          updatedAt: new Date().toISOString() 
        } : e)
      );
    } else {
      // Création
      const newEvent: Evenement = {
        id: Date.now().toString(),
        title: data.title || '',
        description: data.description || '',
        category: data.category || 'autre',
        startDate: data.startDate || '',
        endDate: data.endDate || '',
        startTime: data.startTime || '',
        endTime: data.endTime || '',
        location: data.location || '',
        capacity: Number(data.capacity) || 0,
        registered: 0,
        speakers: data.speakers ? data.speakers.split(',').map((s: string) => s.trim()) : [],
        price: Number(data.price) || 0,
        status: 'upcoming',
        isPublic: Boolean(data.isPublic),
        requirements: data.requirements ? data.requirements.split(',').map((r: string) => r.trim()) : [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setEvents(prev => [...prev, newEvent]);
    }
    setIsFormOpen(false);
  };

  const handleExport = () => {
    const exportData = filteredData.map(event => ({
      'Titre': event.title,
      'Catégorie': event.category,
      'Date début': formatDate(event.startDate),
      'Date fin': formatDate(event.endDate),
      'Heure début': event.startTime,
      'Heure fin': event.endTime,
      'Lieu': event.location,
      'Capacité': event.capacity,
      'Inscrits': event.registered,
      'Intervenants': event.speakers.join(', '),
      'Prix (FCFA)': event.price,
      'Statut': event.status,
      'Public': event.isPublic ? 'Oui' : 'Non'
    }));
    
    exportToCSV(
      exportData, 
      'evenements-' + new Date().toISOString().split('T')[0], 
      Object.keys(exportData[0] || {})
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="px-1 sm:px-2 md:px-4 lg:px-8 w-full">
      <AdminPageLayout
        title="Gestion des Événements"
        description="Créez et gérez les conférences, ateliers, séminaires et formations"
        stats={eventStats}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAdd={handleAddEvent}
        onExport={handleExport}
        filters={
          <div className="w-full md:w-auto px-2 md:px-0">
            <AdminFilters
              filters={filterConfigs}
              activeFilters={filters}
              onFilterChange={updateFilter}
              onClearFilters={clearFilters}
            />
          </div>
        }
      >
        <div className="w-full overflow-x-auto rounded-md bg-white dark:bg-gray-900 shadow-sm">
          <div className="min-w-[600px] text-xs md:text-sm">
            <AdminTable
              columns={columns}
              data={filteredData}
              onEdit={handleEditEvent}
              onDelete={handleDeleteEvent}
              onView={handleViewEvent}
            />
          </div>
        </div>

        {/* Formulaire pour événements */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2 md:px-0">
            <div className="w-full max-w-2xl text-xs md:text-sm">
              <AdminForm
                title={selectedEvent ? "Modifier l'événement" : "Nouvel événement"}
                description="Saisissez les informations de l'événement"
                fields={[
                  { name: 'title', label: 'Titre', type: 'text', required: true },
                  { name: 'description', label: 'Description', type: 'textarea', required: true },
                  { 
                    name: 'category', 
                    label: 'Catégorie', 
                    type: 'select', 
                    required: true,
                    options: [
                      { value: 'conference', label: 'Conférence' },
                      { value: 'atelier', label: 'Atelier' },
                      { value: 'seminaire', label: 'Séminaire' },
                      { value: 'formation', label: 'Formation' },
                      { value: 'autre', label: 'Autre' }
                    ]
                  },
                  { name: 'startDate', label: 'Date de début', type: 'date', required: true },
                  { name: 'endDate', label: 'Date de fin', type: 'date', required: true },
                  { name: 'startTime', label: 'Heure de début', type: 'time', required: true },
                  { name: 'endTime', label: 'Heure de fin', type: 'time', required: true },
                  { name: 'location', label: 'Lieu', type: 'text', required: true },
                  { name: 'capacity', label: 'Capacité', type: 'number', required: true },
                  { name: 'speakers', label: 'Intervenants (séparés par des virgules)', type: 'text' },
                  { name: 'price', label: 'Prix (FCFA)', type: 'number' },
                  { name: 'requirements', label: 'Prérequis (séparés par des virgules)', type: 'textarea' },
                  { name: 'isPublic', label: 'Événement public', type: 'checkbox' }
                ]}
                data={selectedEvent || {}}
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={handleSubmit}
                isLoading={loading}
              />
            </div>
          </div>
        )}
      </AdminPageLayout>
    </div>
  );
};

export default EvenementsManagement;
