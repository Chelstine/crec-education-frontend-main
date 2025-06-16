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
  Wrench,
  BookOpen
} from 'lucide-react';

// Types pour les ateliers
interface Atelier {
  id: string;
  title: string;
  description: string;
  instructor: string;
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
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // en heures
  materials: string[];
  prerequisites: string[];
  objectives: string[];
  createdAt: string;
  updatedAt: string;
}

const AteliersManagement: React.FC = () => {
  const [ateliers, setAteliers] = useState<Atelier[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedAtelier, setSelectedAtelier] = useState<Atelier | null>(null);

  const {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    clearFilters,
    filteredData
  } = useFilteredData(ateliers, ['title', 'instructor', 'category', 'location']);

  // Mock data
  const mockAteliers: Atelier[] = [
    {
      id: '1',
      title: 'Atelier de Formation : Innovation Pédagogique',
      description: 'Formation pratique sur les nouvelles méthodes pédagogiques et l\'intégration du numérique dans l\'enseignement.',
      instructor: 'Dr. Kokou ADJANON',
      category: 'Formation',
      startDate: '2025-02-20',
      endDate: '2025-02-21',
      startTime: '08:30',
      endTime: '16:30',
      location: 'Salle de Formation B1',
      capacity: 30,
      registered: 28,
      price: 75000,
      status: 'upcoming',
      difficulty: 'intermediate',
      duration: 16,
      materials: ['Ordinateur portable', 'Support de cours', 'Accès internet'],
      prerequisites: ['Expérience en enseignement', 'Bases en informatique'],
      objectives: [
        'Maîtriser les outils numériques pédagogiques',
        'Développer des méthodes d\'enseignement innovantes',
        'Créer du contenu interactif',
        'Évaluer l\'efficacité pédagogique'
      ],
      createdAt: '2024-11-15',
      updatedAt: '2024-12-18'
    },
    {
      id: '2',
      title: 'Atelier Arduino et IoT',
      description: 'Initiation pratique à l\'Internet des Objets avec Arduino pour créer des projets connectés.',
      instructor: 'Ing. Pierre KODJO',
      category: 'Technologie',
      startDate: '2025-03-10',
      endDate: '2025-03-12',
      startTime: '09:00',
      endTime: '17:00',
      location: 'FabLab CREC',
      capacity: 15,
      registered: 12,
      price: 120000,
      status: 'upcoming',
      difficulty: 'beginner',
      duration: 24,
      materials: ['Kit Arduino', 'Capteurs', 'Breadboard', 'Câbles'],
      prerequisites: ['Aucun'],
      objectives: [
        'Comprendre les bases de l\'IoT',
        'Programmer avec Arduino',
        'Réaliser des projets pratiques',
        'Connecter des objets'
      ],
      createdAt: '2024-12-01',
      updatedAt: '2024-12-15'
    },
    {
      id: '3',
      title: 'Atelier Écriture Créative et Spiritualité',
      description: 'Exploration de la créativité littéraire dans une perspective spirituelle ignatienne.',
      instructor: 'P. Marie-Joseph EKONG, SJ',
      category: 'Spiritualité',
      startDate: '2025-04-05',
      endDate: '2025-04-06',
      startTime: '14:00',
      endTime: '18:00',
      location: 'Bibliothèque CREC',
      capacity: 20,
      registered: 15,
      price: 40000,
      status: 'upcoming',
      difficulty: 'beginner',
      duration: 8,
      materials: ['Carnet', 'Stylo', 'Textes fournis'],
      prerequisites: ['Goût pour l\'écriture'],
      objectives: [
        'Développer sa créativité littéraire',
        'Intégrer la dimension spirituelle',
        'Partager ses écrits',
        'Découvrir l\'écriture méditative'
      ],
      createdAt: '2024-11-30',
      updatedAt: '2024-12-10'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAteliers(mockAteliers);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Configuration des statistiques
  const stats = [
    {
      title: 'Total Ateliers',
      value: ateliers.length,
      icon: Wrench,
      color: 'text-blue-600',
      description: 'Cette année'
    },
    {
      title: 'Participants Inscrits',
      value: ateliers.reduce((sum, atelier) => sum + atelier.registered, 0),
      icon: Users,
      color: 'text-green-600',
      description: 'Au total'
    },
    {
      title: 'À Venir',
      value: ateliers.filter(a => a.status === 'upcoming').length,
      icon: Clock,
      color: 'text-orange-600',
      description: 'Prochainement'
    },
    {
      title: 'Heures de Formation',
      value: ateliers.reduce((sum, atelier) => sum + atelier.duration, 0),
      icon: BookOpen,
      color: 'text-purple-600',
      description: 'Total'
    }
  ];

  // Configuration des filtres
  const filterConfigs = [
    {
      key: 'category',
      label: 'Catégorie',
      placeholder: 'Filtrer par catégorie',
      options: [
        { value: 'Formation', label: 'Formation' },
        { value: 'Technologie', label: 'Technologie' },
        { value: 'Spiritualité', label: 'Spiritualité' },
        { value: 'Créativité', label: 'Créativité' }
      ]
    },
    {
      key: 'difficulty',
      label: 'Niveau',
      placeholder: 'Filtrer par niveau',
      options: [
        { value: 'beginner', label: 'Débutant' },
        { value: 'intermediate', label: 'Intermédiaire' },
        { value: 'advanced', label: 'Avancé' }
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
    { key: 'title', label: 'Atelier' },
    { key: 'instructor', label: 'Formateur' },
    { key: 'category', label: 'Catégorie', type: 'badge' as const, badgeType: 'category' as const },
    { key: 'difficulty', label: 'Niveau', type: 'badge' as const, badgeType: 'level' as const },
    { 
      key: 'startDate', 
      label: 'Date', 
      render: (value: string, item: Atelier) => (
        <div>
          <div className="font-medium">{formatDate(value)}</div>
          <div className="text-sm text-muted-foreground">
            {item.duration}h - {item.startTime}
          </div>
        </div>
      )
    },
    {
      key: 'registered',
      label: 'Participants',
      render: (value: number, item: Atelier) => (
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
      render: (value: number) => `${value.toLocaleString()} FCFA`
    },
    { key: 'status', label: 'Statut', type: 'badge' as const, badgeType: 'status' as const },
    { key: 'actions', label: 'Actions', type: 'actions' as const }
  ];

  // Configuration du formulaire
  const formFields = [
    { name: 'title', label: 'Titre de l\'atelier', type: 'text' as const, required: true },
    { name: 'description', label: 'Description', type: 'textarea' as const, required: true },
    { name: 'instructor', label: 'Formateur', type: 'text' as const, required: true },
    { 
      name: 'category', 
      label: 'Catégorie', 
      type: 'select' as const, 
      required: true,
      options: filterConfigs[0].options
    },
    { 
      name: 'difficulty', 
      label: 'Niveau de difficulté', 
      type: 'select' as const, 
      required: true,
      options: filterConfigs[1].options
    },
    { name: 'startDate', label: 'Date de début', type: 'date' as const, required: true },
    { name: 'endDate', label: 'Date de fin', type: 'date' as const, required: true },
    { name: 'startTime', label: 'Heure de début', type: 'time' as const, required: true },
    { name: 'endTime', label: 'Heure de fin', type: 'time' as const, required: true },
    { name: 'location', label: 'Lieu', type: 'text' as const, required: true },
    { name: 'capacity', label: 'Capacité', type: 'number' as const, required: true },
    { name: 'price', label: 'Prix (FCFA)', type: 'number' as const, required: true },
    { name: 'duration', label: 'Durée (heures)', type: 'number' as const, required: true },
    { name: 'materials', label: 'Matériel requis (séparé par des virgules)', type: 'textarea' as const },
    { name: 'prerequisites', label: 'Prérequis (séparés par des virgules)', type: 'textarea' as const },
    { name: 'objectives', label: 'Objectifs (séparés par des virgules)', type: 'textarea' as const }
  ];

  // Gestionnaires d'événements
  const handleAdd = () => {
    setSelectedAtelier(null);
    setIsFormOpen(true);
  };

  const handleEdit = (atelier: Atelier) => {
    setSelectedAtelier(atelier);
    setIsFormOpen(true);
  };

  const handleDelete = (atelier: Atelier) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet atelier ?')) {
      setAteliers(prev => prev.filter(a => a.id !== atelier.id));
    }
  };

  const handleView = (atelier: Atelier) => {
    console.log('Voir atelier:', atelier);
  };

  const handleSubmit = (data: Record<string, any>) => {
    if (selectedAtelier) {
      // Mise à jour
      setAteliers(prev => 
        prev.map(a => a.id === selectedAtelier.id ? { 
          ...a, 
          ...data,
          materials: data.materials ? data.materials.split(',').map((m: string) => m.trim()) : [],
          prerequisites: data.prerequisites ? data.prerequisites.split(',').map((p: string) => p.trim()) : [],
          objectives: data.objectives ? data.objectives.split(',').map((o: string) => o.trim()) : [],
          updatedAt: new Date().toISOString() 
        } : a)
      );
    } else {
      // Création
      const newAtelier: Atelier = {
        id: Date.now().toString(),
        title: data.title || '',
        description: data.description || '',
        instructor: data.instructor || '',
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
        difficulty: data.difficulty || 'beginner',
        duration: Number(data.duration) || 0,
        materials: data.materials ? data.materials.split(',').map((m: string) => m.trim()) : [],
        prerequisites: data.prerequisites ? data.prerequisites.split(',').map((p: string) => p.trim()) : [],
        objectives: data.objectives ? data.objectives.split(',').map((o: string) => o.trim()) : [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setAteliers(prev => [...prev, newAtelier]);
    }
    setIsFormOpen(false);
  };

  const handleExport = () => {
    const exportData = filteredData.map(atelier => ({
      Titre: atelier.title,
      Formateur: atelier.instructor,
      Catégorie: atelier.category,
      Niveau: atelier.difficulty,
      'Date début': formatDate(atelier.startDate),
      'Date fin': formatDate(atelier.endDate),
      'Durée (h)': atelier.duration,
      Lieu: atelier.location,
      Inscrits: atelier.registered,
      Capacité: atelier.capacity,
      'Prix (FCFA)': atelier.price,
      Statut: atelier.status
    }));
    
    exportToCSV(
      exportData, 
      'ateliers-' + new Date().toISOString().split('T')[0], 
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
    <div className="responsive-container">
      <AdminPageLayout
        title="Gestion des Ateliers"
        description="Organisez et gérez les ateliers de formation pratique"
        stats={stats}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAdd={handleAdd}
        onExport={handleExport}
        filters={
          <AdminFilters
            filters={filterConfigs}
            activeFilters={filters}
            onFilterChange={updateFilter}
            onClearFilters={clearFilters}
          />
        }
      >
        <AdminTable
          columns={columns}
          data={filteredData}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />

        {isFormOpen && (
          <div className="responsive-form-overlay">
            <AdminForm
              title={selectedAtelier ? 'Modifier l\'atelier' : 'Nouvel atelier'}
              description={selectedAtelier ? 'Modifiez les informations de l\'atelier' : 'Créez un nouvel atelier'}
              fields={formFields}
              data={selectedAtelier || {}}
              isOpen={isFormOpen}
              onClose={() => setIsFormOpen(false)}
              onSubmit={handleSubmit}
              isLoading={loading}
            />
          </div>
        )}
      </AdminPageLayout>
    </div>
  );
};

export default AteliersManagement;
