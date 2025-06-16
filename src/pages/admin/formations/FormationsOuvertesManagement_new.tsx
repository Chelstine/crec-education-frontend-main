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
      fraisInscription: 15000,
      createdAt: '2024-12-01',
      updatedAt: '2024-12-20'
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

  // Configuration du formulaire amélioré
  const formFields = [
    // Section 1: Informations générales
    { 
      name: 'title', 
      label: 'Titre de la formation *', 
      type: 'text' as const, 
      required: true,
      placeholder: 'ex: Formation Intelligence Artificielle avancée'
    },
    { 
      name: 'description', 
      label: 'Description détaillée *', 
      type: 'textarea' as const, 
      required: true,
      placeholder: 'Décrivez le contenu, les méthodes pédagogiques et les bénéfices de cette formation...'
    },
    
    // Section 2: Classification et niveau
    { 
      name: 'category', 
      label: 'Catégorie de formation *', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: 'Technologie', label: 'Technologie & Innovation' },
        { value: 'Développement Web', label: 'Développement Web' },
        { value: 'Data Science', label: 'Data Science & Analytics' },
        { value: 'Intelligence Artificielle', label: 'Intelligence Artificielle' },
        { value: 'Cybersécurité', label: 'Cybersécurité' },
        { value: 'Gestion de Projet', label: 'Gestion de Projet' },
        { value: 'Marketing Digital', label: 'Marketing Digital' },
        { value: 'Design UX/UI', label: 'Design UX/UI' },
        { value: 'Leadership', label: 'Leadership & Management' },
        { value: 'Entrepreneuriat', label: 'Entrepreneuriat' },
        { value: 'Communication', label: 'Communication' },
        { value: 'Langues', label: 'Langues' },
        { value: 'Autre', label: 'Autre' }
      ]
    },
    { 
      name: 'level', 
      label: 'Niveau requis *', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: 'debutant', label: 'Débutant - Aucune expérience requise' },
        { value: 'intermediaire', label: 'Intermédiaire - Quelques bases nécessaires' },
        { value: 'avance', label: 'Avancé - Expérience significative requise' }
      ]
    },
    
    // Section 3: Planification et durée
    { 
      name: 'duration', 
      label: 'Durée totale (en heures) *', 
      type: 'number' as const, 
      required: true,
      placeholder: 'ex: 40'
    },
    { 
      name: 'startDate', 
      label: 'Date de début *', 
      type: 'date' as const, 
      required: true 
    },
    { 
      name: 'endDate', 
      label: 'Date de fin *', 
      type: 'date' as const, 
      required: true 
    },
    { 
      name: 'schedule', 
      label: 'Planning et horaires *', 
      type: 'text' as const, 
      required: true,
      placeholder: 'ex: Lundi et Mercredi 18h-21h, Samedi 9h-13h'
    },
    
    // Section 4: Formateur et logistique
    { 
      name: 'instructor', 
      label: 'Formateur/Instructeur *', 
      type: 'text' as const, 
      required: true,
      placeholder: 'ex: Dr. Marie KOUAKOU, Expert en IA'
    },
    { 
      name: 'capacity', 
      label: 'Nombre maximum de participants *', 
      type: 'number' as const, 
      required: true,
      placeholder: 'ex: 25'
    },
    { 
      name: 'mode', 
      label: 'Mode de formation *', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: 'presentiel', label: 'Présentiel - En personne uniquement' },
        { value: 'distanciel', label: 'Distanciel - En ligne uniquement' },
        { value: 'hybride', label: 'Hybride - Présentiel + En ligne' }
      ]
    },
    { 
      name: 'location', 
      label: 'Lieu (pour présentiel/hybride)', 
      type: 'text' as const,
      placeholder: 'ex: Campus CREC, Salle de conférence A1'
    },
    
    // Section 5: Tarification
    { 
      name: 'price', 
      label: 'Prix de la formation (FCFA) *', 
      type: 'number' as const, 
      required: true,
      placeholder: 'ex: 150000'
    },
    { 
      name: 'fraisInscription', 
      label: 'Frais d\'inscription (FCFA)', 
      type: 'number' as const,
      placeholder: 'ex: 25000'
    },
    
    // Section 6: Certification et validation
    { 
      name: 'certification', 
      label: 'Certification délivrée', 
      type: 'checkbox' as const,
      help: 'Cochez si une certification officielle est délivrée à la fin'
    },
    
    // Section 7: Contenu pédagogique
    { 
      name: 'prerequisites', 
      label: 'Prérequis et conditions d\'admission', 
      type: 'textarea' as const,
      placeholder: 'Listez les prérequis séparés par des virgules:\nex: Bases en programmation, Mathématiques niveau Bac+2, Motivation pour l\'apprentissage'
    },
    { 
      name: 'objectives', 
      label: 'Objectifs pédagogiques', 
      type: 'textarea' as const,
      placeholder: 'Listez les objectifs séparés par des virgules:\nex: Maîtriser les concepts de base, Développer des projets concrets, Obtenir une certification reconnue'
    },
    { 
      name: 'materials', 
      label: 'Matériel et ressources requises', 
      type: 'textarea' as const,
      placeholder: 'Listez le matériel séparé par des virgules:\nex: Ordinateur portable, Accès Internet stable, Logiciels spécialisés (fournis)'
    },
    
    // Section 8: Détails additionnels
    { 
      name: 'image', 
      label: 'Image de la formation (URL)', 
      type: 'text' as const,
      placeholder: 'ex: /images/formations/ia-avancee.jpg'
    }
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
    // Validation des données avant soumission
    const requiredFields = ['title', 'description', 'category', 'level', 'duration', 'startDate', 'endDate', 'schedule', 'instructor', 'capacity', 'price', 'mode'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      alert(`Veuillez remplir tous les champs obligatoires: ${missingFields.join(', ')}`);
      return;
    }

    // Validation des dates
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    if (endDate <= startDate) {
      alert('La date de fin doit être postérieure à la date de début');
      return;
    }

    // Validation de la capacité et du prix
    if (Number(data.capacity) <= 0) {
      alert('La capacité doit être supérieure à 0');
      return;
    }
    if (Number(data.price) < 0) {
      alert('Le prix ne peut pas être négatif');
      return;
    }

    if (selectedFormation) {
      // Mise à jour d'une formation existante
      setFormations(prev => 
        prev.map(f => f.id === selectedFormation.id ? { 
          ...f, 
          ...data,
          duration: Number(data.duration),
          capacity: Number(data.capacity),
          price: Number(data.price),
          fraisInscription: Number(data.fraisInscription) || 0,
          certification: Boolean(data.certification),
          prerequisites: data.prerequisites ? 
            data.prerequisites.split(',').map((p: string) => p.trim()).filter((p: string) => p.length > 0) : [],
          objectives: data.objectives ? 
            data.objectives.split(',').map((o: string) => o.trim()).filter((o: string) => o.length > 0) : [],
          materials: data.materials ? 
            data.materials.split(',').map((m: string) => m.trim()).filter((m: string) => m.length > 0) : [],
          updatedAt: new Date().toISOString() 
        } : f)
      );
    } else {
      // Création d'une nouvelle formation
      const newFormation: FormationOuverte = {
        id: Date.now().toString(),
        title: data.title,
        description: data.description,
        category: data.category,
        level: data.level,
        duration: Number(data.duration),
        startDate: data.startDate,
        endDate: data.endDate,
        schedule: data.schedule,
        instructor: data.instructor,
        capacity: Number(data.capacity),
        enrolled: 0, // Nouvelle formation, pas encore d'inscrits
        price: Number(data.price),
        status: 'open', // Nouvelle formation ouverte par défaut
        prerequisites: data.prerequisites ? 
          data.prerequisites.split(',').map((p: string) => p.trim()).filter((p: string) => p.length > 0) : [],
        objectives: data.objectives ? 
          data.objectives.split(',').map((o: string) => o.trim()).filter((o: string) => o.length > 0) : [],
        certification: Boolean(data.certification),
        mode: data.mode,
        location: data.location || '',
        materials: data.materials ? 
          data.materials.split(',').map((m: string) => m.trim()).filter((m: string) => m.length > 0) : [],
        image: data.image || '',
        fraisInscription: Number(data.fraisInscription) || 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setFormations(prev => [...prev, newFormation]);
    }
    
    setIsFormOpen(false);
    setSelectedFormation(null);
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
    <div className="responsive-container">
      <AdminPageLayout
        title="Gestion des Formations Ouvertes"
        description="Gérez les formations ouvertes au grand public et aux professionnels"
        stats={stats}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAdd={handleAdd}
        onExport={handleExport}
        filters={
          <div className="responsive-filters-wrapper">
            <AdminFilters
              filters={filterConfigs}
              activeFilters={filters}
              onFilterChange={updateFilter}
              onClearFilters={clearFilters}
            />
          </div>
        }
      >
        <div className="responsive-table-wrapper">
          <AdminTable
            columns={columns}
            data={filteredData}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        </div>

        {isFormOpen && (
          <div className="responsive-form-overlay">
            <AdminForm
              title={selectedFormation ? 'Modifier la formation' : 'Nouvelle formation ouverte'}
              description={selectedFormation ? 'Modifiez les informations de la formation' : 'Créez une nouvelle formation accessible au public'}
              fields={formFields}
              data={selectedFormation || {}}
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

export default FormationsOuvertesManagement;
