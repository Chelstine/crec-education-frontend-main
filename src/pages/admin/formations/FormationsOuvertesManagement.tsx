import React, { useState, useEffect } from 'react';
import { AdminPageLayout, AdminTable, AdminForm, AdminFilters } from '../../../components/admin';
import { useFilteredData } from '../../../hooks/useAdmin';
import { 
  getBadgeColor, 
  exportToCSV, 
  formatDate 
} from '../../../utils/adminUtils';
import { 
  BookOpen,
  Users,
  Calendar,
  Star,
  Clock,
  Award
} from 'lucide-react';

// Types pour les formations ouvertes
interface FormationOuverte {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'debutant' | 'intermediaire' | 'avance';
  duration: number; // en heures
  startDate: string;
  endDate: string;
  schedule: string;
  instructor: string;
  capacity: number;
  enrolled: number;
  price: number;
  status: 'open' | 'closed' | 'completed' | 'cancelled';
  prerequisites: string[];
  objectives: string[];
  certification: boolean;
  mode: 'presentiel' | 'distanciel' | 'hybride';
  location?: string;
  materials: string[];
  image?: string;
  fraisInscription: number;
  createdAt: string;
  updatedAt: string;
}

const FormationsOuvertesManagement: React.FC = () => {
  const [formations, setFormations] = useState<FormationOuverte[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState<FormationOuverte | null>(null);

  const {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    clearFilters,
    filteredData
  } = useFilteredData(formations, ['title', 'category', 'instructor']);

  // Mock data pour les formations ouvertes
  const mockFormations: FormationOuverte[] = [
    {
      id: '1',
      title: 'Formation en Intelligence Artificielle et Machine Learning',
      description: 'Formation complète sur les concepts fondamentaux de l\'IA et du ML avec des projets pratiques',
      category: 'Technologie',
      level: 'intermediaire',
      duration: 60,
      startDate: '2025-02-01',
      endDate: '2025-05-30',
      schedule: 'Samedi 9h-13h',
      instructor: 'Dr. Kofi AMEGBE',
      capacity: 25,
      enrolled: 18,
      price: 250000,
      status: 'open',
      prerequisites: ['Bases en programmation', 'Mathématiques niveau Bac+2'],
      objectives: [
        'Comprendre les concepts de base de l\'IA',
        'Implémenter des algorithmes de ML',
        'Développer des projets concrets',
        'Maîtriser les outils modernes (Python, TensorFlow)'
      ],
      certification: true,
      mode: 'hybride',
      location: 'Campus CREC + Plateforme en ligne',
      materials: ['Ordinateur portable', 'Accès Internet', 'Supports de cours fournis'],
      image: '/images/formations/ia-ml.jpg',
      fraisInscription: 25000,
      createdAt: '2024-11-15',
      updatedAt: '2024-12-20'
    },
    {
      id: '2',
      title: 'Développement Web Full-Stack (React & Node.js)',
      description: 'Apprenez à créer des applications web complètes avec les technologies modernes',
      category: 'Développement Web',
      level: 'intermediaire',
      duration: 80,
      startDate: '2025-01-15',
      endDate: '2025-06-15',
      schedule: 'Mardi et Jeudi 18h-21h',
      instructor: 'M. Jean-Claude TOGNON',
      capacity: 20,
      enrolled: 15,
      price: 300000,
      status: 'open',
      prerequisites: ['HTML/CSS de base', 'JavaScript fondamental'],
      objectives: [
        'Maîtriser React et ses écosystèmes',
        'Développer des APIs avec Node.js',
        'Gérer les bases de données',
        'Déployer des applications en production'
      ],
      certification: true,
      mode: 'presentiel',
      location: 'Salle Informatique B2',
      materials: ['Ordinateur portable', 'Éditeur de code', 'Git installé'],
      fraisInscription: 20000,
      createdAt: '2024-10-20',
      updatedAt: '2024-12-18'
    },
    {
      id: '3',
      title: 'Leadership et Management Éthique',
      description: 'Formation sur les principes du leadership éthique basé sur les valeurs ignatiennes',
      category: 'Management',
      level: 'avance',
      duration: 40,
      startDate: '2025-03-01',
      endDate: '2025-04-30',
      schedule: 'Weekend intensif (2 fois/mois)',
      instructor: 'P. Pierre ADOM, SJ',
      capacity: 30,
      enrolled: 22,
      price: 180000,
      status: 'open',
      prerequisites: ['Expérience professionnelle minimum 3 ans'],
      objectives: [
        'Développer un leadership authentique',
        'Intégrer l\'éthique dans la prise de décision',
        'Gérer les équipes avec discernement',
        'Promouvoir la justice sociale en entreprise'
      ],
      certification: true,
      mode: 'presentiel',
      location: 'Salle de Conférence A',
      materials: ['Support de cours', 'Études de cas', 'Bibliographie spécialisée'],
      createdAt: '2024-12-01',
      updatedAt: '2024-12-20'
    },
    {
      id: '4',
      title: 'Data Science et Analyse de Données',
      description: 'Maîtrisez l\'analyse de données avec Python, R et les outils de visualisation',
      category: 'Data Science',
      level: 'intermediaire',
      duration: 70,
      startDate: '2025-01-20',
      endDate: '2025-05-20',
      schedule: 'Lundi et Mercredi 19h-22h',
      instructor: 'Dr. Akossiwa KOFFI',
      capacity: 22,
      enrolled: 12,
      price: 280000,
      status: 'open',
      prerequisites: ['Statistiques de base', 'Programmation (Python ou R)'],
      objectives: [
        'Manipuler et nettoyer les données',
        'Créer des visualisations efficaces',
        'Appliquer des modèles statistiques',
        'Présenter des insights business'
      ],
      certification: true,
      mode: 'hybride',
      location: 'Lab Data Science + Online',
      materials: ['Python/R installé', 'Jupyter Notebook', 'Datasets fournis'],
      createdAt: '2024-11-30',
      updatedAt: '2024-12-19'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormations(mockFormations);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Configuration des statistiques
  const stats = [
    {
      title: 'Total Formations',
      value: formations.length,
      icon: BookOpen,
      color: 'text-blue-600',
      description: '+2 ce trimestre'
    },
    {
      title: 'Apprenants Inscrits',
      value: formations.reduce((sum, formation) => sum + formation.enrolled, 0),
      icon: Users,
      color: 'text-green-600',
      description: '+25% ce mois'
    },
    {
      title: 'Formations Ouvertes',
      value: formations.filter(f => f.status === 'open').length,
      icon: Calendar,
      color: 'text-orange-600',
      description: 'Inscriptions ouvertes'
    },
    {
      title: 'Avec Certification',
      value: formations.filter(f => f.certification).length,
      icon: Award,
      color: 'text-purple-600',
      description: 'Certifiantes'
    }
  ];

  // Configuration des filtres
  const filterConfigs = [
    {
      key: 'category',
      label: 'Catégorie',
      placeholder: 'Filtrer par catégorie',
      options: [
        { value: 'Technologie', label: 'Technologie' },
        { value: 'Développement Web', label: 'Développement Web' },
        { value: 'Data Science', label: 'Data Science' },
        { value: 'Management', label: 'Management' },
        { value: 'Design', label: 'Design' },
        { value: 'Marketing', label: 'Marketing' }
      ]
    },
    {
      key: 'level',
      label: 'Niveau',
      placeholder: 'Filtrer par niveau',
      options: [
        { value: 'debutant', label: 'Débutant' },
        { value: 'intermediaire', label: 'Intermédiaire' },
        { value: 'avance', label: 'Avancé' }
      ]
    },
    {
      key: 'status',
      label: 'Statut',
      placeholder: 'Filtrer par statut',
      options: [
        { value: 'open', label: 'Ouverte' },
        { value: 'closed', label: 'Fermée' },
        { value: 'completed', label: 'Terminée' },
        { value: 'cancelled', label: 'Annulée' }
      ]
    },
    {
      key: 'mode',
      label: 'Mode',
      placeholder: 'Filtrer par mode',
      options: [
        { value: 'presentiel', label: 'Présentiel' },
        { value: 'distanciel', label: 'Distanciel' },
        { value: 'hybride', label: 'Hybride' }
      ]
    }
  ];

  // Configuration des colonnes
  const columns = [
    { key: 'title', label: 'Titre' },
    { key: 'category', label: 'Catégorie', type: 'badge' as const, badgeType: 'category' as const },
    { key: 'level', label: 'Niveau', type: 'badge' as const, badgeType: 'level' as const },
    { key: 'instructor', label: 'Formateur' },
    { 
      key: 'duration', 
      label: 'Durée', 
      render: (value: number) => `${value}h`
    },
    {
      key: 'enrolled',
      label: 'Inscrits',
      render: (value: number, item: FormationOuverte) => (
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
    { key: 'mode', label: 'Mode', type: 'badge' as const, badgeType: 'category' as const },
    { key: 'status', label: 'Statut', type: 'badge' as const, badgeType: 'status' as const },
    { key: 'actions', label: 'Actions', type: 'actions' as const }
  ];

  // Configuration du formulaire
  const formFields = [
    { name: 'title', label: 'Titre de la formation', type: 'text' as const, required: true },
    { name: 'description', label: 'Description', type: 'textarea' as const, required: true },
    { 
      name: 'category', 
      label: 'Catégorie', 
      type: 'select' as const, 
      required: true,
      options: filterConfigs[0].options
    },
    { 
      name: 'level', 
      label: 'Niveau', 
      type: 'select' as const, 
      required: true,
      options: filterConfigs[1].options
    },
    { name: 'duration', label: 'Durée (heures)', type: 'number' as const, required: true },
    { name: 'startDate', label: 'Date de début', type: 'date' as const, required: true },
    { name: 'endDate', label: 'Date de fin', type: 'date' as const, required: true },
    { name: 'schedule', label: 'Planning', type: 'text' as const, required: true },
    { name: 'instructor', label: 'Formateur', type: 'text' as const, required: true },
    { name: 'capacity', label: 'Capacité maximum', type: 'number' as const, required: true },
    { name: 'price', label: 'Prix (FCFA)', type: 'number' as const, required: true },
    { 
      name: 'mode', 
      label: 'Mode de formation', 
      type: 'select' as const, 
      required: true,
      options: filterConfigs[3].options
    },
    { name: 'location', label: 'Lieu (si présentiel)', type: 'text' as const },
    { name: 'prerequisites', label: 'Prérequis (séparés par des virgules)', type: 'textarea' as const },
    { name: 'objectives', label: 'Objectifs (séparés par des virgules)', type: 'textarea' as const },
    { name: 'materials', label: 'Matériel requis (séparé par des virgules)', type: 'textarea' as const }
  ];

  // Gestionnaires d'événements
  const handleAdd = () => {
    setSelectedFormation(null);
    setIsFormOpen(true);
  };

  const handleEdit = (formation: FormationOuverte) => {
    setSelectedFormation(formation);
    setIsFormOpen(true);
  };

  const handleDelete = (formation: FormationOuverte) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      setFormations(prev => prev.filter(f => f.id !== formation.id));
    }
  };

  const handleView = (formation: FormationOuverte) => {
    console.log('Voir formation:', formation);
  };

  const handleSubmit = (data: Record<string, any>) => {
    if (selectedFormation) {
      // Mise à jour
      setFormations(prev => 
        prev.map(f => f.id === selectedFormation.id ? { 
          ...f, 
          ...data,
          prerequisites: data.prerequisites ? data.prerequisites.split(',').map((p: string) => p.trim()) : [],
          objectives: data.objectives ? data.objectives.split(',').map((o: string) => o.trim()) : [],
          materials: data.materials ? data.materials.split(',').map((m: string) => m.trim()) : [],
          updatedAt: new Date().toISOString() 
        } : f)
      );
    } else {
      // Création
      const newFormation: FormationOuverte = {
        id: Date.now().toString(),
        title: data.title || '',
        description: data.description || '',
        category: data.category || '',
        level: data.level || 'debutant',
        duration: Number(data.duration) || 0,
        startDate: data.startDate || '',
        endDate: data.endDate || '',
        schedule: data.schedule || '',
        instructor: data.instructor || '',
        capacity: Number(data.capacity) || 0,
        enrolled: 0,
        price: Number(data.price) || 0,
        status: 'open',
        prerequisites: data.prerequisites ? data.prerequisites.split(',').map((p: string) => p.trim()) : [],
        objectives: data.objectives ? data.objectives.split(',').map((o: string) => o.trim()) : [],
        certification: true,
        mode: data.mode || 'presentiel',
        location: data.location || '',
        materials: data.materials ? data.materials.split(',').map((m: string) => m.trim()) : [],
        fraisInscription: Number(data.fraisInscription) || 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setFormations(prev => [...prev, newFormation]);
    }
    setIsFormOpen(false);
  };

  const handleExport = () => {
    const exportData = filteredData.map(formation => ({
      Titre: formation.title,
      Catégorie: formation.category,
      Niveau: formation.level,
      Formateur: formation.instructor,
      'Durée (h)': formation.duration,
      'Date début': formatDate(formation.startDate),
      'Date fin': formatDate(formation.endDate),
      Inscrits: formation.enrolled,
      Capacité: formation.capacity,
      'Prix (FCFA)': formation.price,
      Mode: formation.mode,
      Statut: formation.status
    }));
    
    exportToCSV(
      exportData, 
      'formations-ouvertes-' + new Date().toISOString().split('T')[0], 
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
    <AdminPageLayout
      title="Gestion des Formations Ouvertes"
      description="Gérez les formations ouvertes au grand public et aux professionnels"
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

      <AdminForm
        title={selectedFormation ? 'Modifier la formation' : 'Nouvelle formation'}
        description={selectedFormation ? 'Modifiez les informations de la formation' : 'Créez une nouvelle formation ouverte'}
        fields={formFields}
        data={selectedFormation || {}}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
        isLoading={loading}
      />
    </AdminPageLayout>
  );
};

export default FormationsOuvertesManagement;
