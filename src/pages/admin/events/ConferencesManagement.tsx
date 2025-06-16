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
  Clock,
  MapPin,
  Star,
  Award
} from 'lucide-react';

// Types pour les conférences
interface Conference {
  id: string;
  title: string;
  description: string;
  speaker: string;
  category: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: string;
  capacity: number;
  registered: number;
  price: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  featured: boolean;
  topics: string[];
  targetAudience: string[];
  createdAt: string;
  updatedAt: string;
}

const ConferencesManagement: React.FC = () => {
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedConference, setSelectedConference] = useState<Conference | null>(null);

  const {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    clearFilters,
    filteredData
  } = useFilteredData(conferences, ['title', 'speaker', 'category', 'location']);

  // Mock data
  const mockConferences: Conference[] = [
    {
      id: '1',
      title: 'Conférence Internationale sur la Théologie Africaine',
      description: 'Grande conférence réunissant des théologiens africains et internationaux pour explorer les défis contemporains de la théologie en Afrique.',
      speaker: 'P. Jean-Baptiste KOUAKOU, SJ',
      category: 'Académique',
      startDate: '2025-03-15',
      endDate: '2025-03-17',
      startTime: '09:00',
      endTime: '17:00',
      location: 'Auditorium CREC',
      capacity: 200,
      registered: 145,
      price: 50000,
      status: 'upcoming',
      featured: true,
      topics: ['Théologie Africaine', 'Inculturation', 'Dialogue interreligieux'],
      targetAudience: ['Théologiens', 'Étudiants', 'Chercheurs'],
      createdAt: '2024-12-01',
      updatedAt: '2024-12-20'
    },
    {
      id: '2',
      title: 'Conférence sur l\'Écologie Intégrale',
      description: 'Réflexion sur l\'encyclique Laudato Si\' et ses implications pour l\'Afrique.',
      speaker: 'P. Pierre ADOM, SJ',
      category: 'Environnement',
      startDate: '2025-04-22',
      endDate: '2025-04-22',
      startTime: '14:00',
      endTime: '17:00',
      location: 'Salle de Conférence A',
      capacity: 150,
      registered: 89,
      price: 0,
      status: 'upcoming',
      featured: false,
      topics: ['Écologie', 'Développement durable', 'Justice sociale'],
      targetAudience: ['Grand public', 'Étudiants', 'ONG'],
      createdAt: '2024-11-20',
      updatedAt: '2024-12-15'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setConferences(mockConferences);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Configuration des statistiques
  const stats = [
    {
      title: 'Total Conférences',
      value: conferences.length,
      icon: Calendar,
      color: 'text-blue-600',
      description: 'Cette année'
    },
    {
      title: 'Participants Inscrits',
      value: conferences.reduce((sum, conf) => sum + conf.registered, 0),
      icon: Users,
      color: 'text-green-600',
      description: 'Au total'
    },
    {
      title: 'À Venir',
      value: conferences.filter(c => c.status === 'upcoming').length,
      icon: Clock,
      color: 'text-orange-600',
      description: 'Prochainement'
    },
    {
      title: 'Conférences Vedettes',
      value: conferences.filter(c => c.featured).length,
      icon: Star,
      color: 'text-purple-600',
      description: 'En vedette'
    }
  ];

  // Configuration des filtres
  const filterConfigs = [
    {
      key: 'category',
      label: 'Catégorie',
      placeholder: 'Filtrer par catégorie',
      options: [
        { value: 'Académique', label: 'Académique' },
        { value: 'Environnement', label: 'Environnement' },
        { value: 'Social', label: 'Social' },
        { value: 'Spirituel', label: 'Spirituel' }
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
    }
  ];

  // Configuration des colonnes
  const columns = [
    { key: 'title', label: 'Conférence' },
    { key: 'speaker', label: 'Conférencier' },
    { key: 'category', label: 'Catégorie', type: 'badge' as const, badgeType: 'category' as const },
    { 
      key: 'startDate', 
      label: 'Date', 
      render: (value: string, item: Conference) => (
        <div>
          <div className="font-medium">{formatDate(value)}</div>
          <div className="text-sm text-muted-foreground">
            {item.startTime} - {item.endTime}
          </div>
        </div>
      )
    },
    {
      key: 'registered',
      label: 'Participants',
      render: (value: number, item: Conference) => (
        <div>
          <div className="font-medium">{value}/{item.capacity}</div>
          <div className="text-sm text-muted-foreground">
            {Math.round((value / item.capacity) * 100)}% rempli
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

  // Configuration du formulaire
  const formFields = [
    { name: 'title', label: 'Titre de la conférence', type: 'text' as const, required: true },
    { name: 'description', label: 'Description', type: 'textarea' as const, required: true },
    { name: 'speaker', label: 'Conférencier principal', type: 'text' as const, required: true },
    { 
      name: 'category', 
      label: 'Catégorie', 
      type: 'select' as const, 
      required: true,
      options: filterConfigs[0].options
    },
    { name: 'startDate', label: 'Date de début', type: 'date' as const, required: true },
    { name: 'endDate', label: 'Date de fin', type: 'date' as const, required: true },
    { name: 'startTime', label: 'Heure de début', type: 'time' as const, required: true },
    { name: 'endTime', label: 'Heure de fin', type: 'time' as const, required: true },
    { name: 'location', label: 'Lieu', type: 'text' as const, required: true },
    { name: 'capacity', label: 'Capacité', type: 'number' as const, required: true },
    { name: 'price', label: 'Prix (FCFA)', type: 'number' as const },
    { name: 'topics', label: 'Sujets abordés (séparés par des virgules)', type: 'textarea' as const },
    { name: 'targetAudience', label: 'Public cible (séparé par des virgules)', type: 'textarea' as const }
  ];

  // Gestionnaires d'événements
  const handleAdd = () => {
    setSelectedConference(null);
    setIsFormOpen(true);
  };

  const handleEdit = (conference: Conference) => {
    setSelectedConference(conference);
    setIsFormOpen(true);
  };

  const handleDelete = (conference: Conference) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette conférence ?')) {
      setConferences(prev => prev.filter(c => c.id !== conference.id));
    }
  };

  const handleView = (conference: Conference) => {
    console.log('Voir conférence:', conference);
  };

  const handleSubmit = (data: Record<string, any>) => {
    if (selectedConference) {
      // Mise à jour
      setConferences(prev => 
        prev.map(c => c.id === selectedConference.id ? { 
          ...c, 
          ...data,
          topics: data.topics ? data.topics.split(',').map((t: string) => t.trim()) : [],
          targetAudience: data.targetAudience ? data.targetAudience.split(',').map((a: string) => a.trim()) : [],
          updatedAt: new Date().toISOString() 
        } : c)
      );
    } else {
      // Création
      const newConference: Conference = {
        id: Date.now().toString(),
        title: data.title || '',
        description: data.description || '',
        speaker: data.speaker || '',
        category: data.category || '',
        startDate: data.startDate || '',
        endDate: data.endDate || '',
        startTime: data.startTime || '',
        endTime: data.endTime || '',
        location: data.location || '',
        capacity: Number(data.capacity) || 0,
        registered: 0,
        price: Number(data.price) || 0,
        status: 'upcoming',
        featured: false,
        topics: data.topics ? data.topics.split(',').map((t: string) => t.trim()) : [],
        targetAudience: data.targetAudience ? data.targetAudience.split(',').map((a: string) => a.trim()) : [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setConferences(prev => [...prev, newConference]);
    }
    setIsFormOpen(false);
  };

  const handleExport = () => {
    const exportData = filteredData.map(conference => ({
      Titre: conference.title,
      Conférencier: conference.speaker,
      Catégorie: conference.category,
      'Date début': formatDate(conference.startDate),
      'Date fin': formatDate(conference.endDate),
      Lieu: conference.location,
      Inscrits: conference.registered,
      Capacité: conference.capacity,
      'Prix (FCFA)': conference.price,
      Statut: conference.status
    }));
    
    exportToCSV(
      exportData, 
      'conferences-' + new Date().toISOString().split('T')[0], 
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
    <div className="responsive-container responsive-p-4">
      <AdminPageLayout
        title="Gestion des Conférences"
        description="Organisez et gérez les conférences et colloques"
        stats={stats}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAdd={handleAdd}
        onExport={handleExport}
        filters={
          <div className="w-full md:w-auto responsive-p-2 md:responsive-p-0">
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
          <div className="min-w-[600px] responsive-text-sm">
            <AdminTable
              columns={columns}
              data={filteredData}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          </div>
        </div>

        {/* Formulaire pour conférences */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 responsive-p-2 md:responsive-p-0">
            <div className="w-full responsive-max-w-2xl responsive-text-sm">
              <AdminForm
                title={selectedConference ? 'Modifier la conférence' : 'Nouvelle conférence'}
                description={selectedConference ? 'Modifiez les informations de la conférence' : 'Créez une nouvelle conférence'}
                fields={formFields}
                data={selectedConference || {}}
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

export default ConferencesManagement;
