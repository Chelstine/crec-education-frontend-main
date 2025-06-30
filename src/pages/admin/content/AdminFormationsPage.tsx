import React, { useState, useEffect } from 'react';
import { 
  DataTable,
  DeleteConfirmDialog,
  FormDialog,
  InfoPanel,
  ImageUploader
} from '../../../components/admin';
import { Badge } from '../../../components/ui/badge';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Info, BookOpen, Upload, PencilIcon, TrashIcon } from 'lucide-react';

// Type de formation
interface Formation {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  price: number;
  schedule?: string;
  format: string;
  niveau: string;
  requirements?: string;
  status: 'active' | 'draft' | 'inactive';
  image?: string;
  createdAt: string;
  updatedAt: string;
}

// Catégories de formations
const FORMATION_CATEGORIES = [
  { value: 'informatique', label: 'Informatique' },
  { value: 'langues', label: 'Langues' },
  { value: 'management', label: 'Management' },
  { value: 'communication', label: 'Communication' },
  { value: 'data_science', label: 'Data Science' },
  { value: 'design', label: 'Design' },
];

// Niveaux de formations
const FORMATION_LEVELS = [
  { value: 'debutant', label: 'Débutant' },
  { value: 'intermediaire', label: 'Intermédiaire' },
  { value: 'avance', label: 'Avancé' },
  { value: 'expert', label: 'Expert' },
];

// Formats de formations
const FORMATION_FORMATS = [
  { value: 'presentiel', label: 'Présentiel' },
  { value: 'distanciel', label: 'Distanciel' },
  { value: 'hybride', label: 'Hybride' },
];

// Statuts de formations
const FORMATION_STATUS = [
  { value: 'active', label: 'Actif', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  { value: 'draft', label: 'Brouillon', color: 'bg-amber-100 text-amber-800 border-amber-300' },
  { value: 'inactive', label: 'Inactif', color: 'bg-slate-100 text-slate-800 border-slate-300' },
];

const AdminFormationsPage: React.FC = () => {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalFormations, setTotalFormations] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // État pour les dialogues
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentFormation, setCurrentFormation] = useState<Formation | null>(null);

  // Colonnes pour le tableau
  const columns = [
    { 
      key: 'title', 
      header: 'Titre',
      renderCell: (formation: Formation) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-md bg-slate-100 flex items-center justify-center text-slate-600 overflow-hidden">
            {formation.image ? (
              <img 
                src={formation.image} 
                alt={formation.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <BookOpen className="h-5 w-5" />
            )}
          </div>
          <div>
            <p className="font-medium">{formation.title}</p>
            <p className="text-xs text-slate-500 truncate max-w-[200px]">{formation.description}</p>
          </div>
        </div>
      )
    },
    { 
      key: 'category', 
      header: 'Catégorie',
      renderCell: (formation: Formation) => {
        const category = FORMATION_CATEGORIES.find(c => c.value === formation.category);
        return <span>{category?.label || formation.category}</span>;
      }
    },
    { 
      key: 'price', 
      header: 'Prix',
      renderCell: (formation: Formation) => (
        <span className="font-medium">{formation.price.toLocaleString('fr-FR')} FCFA</span>
      )
    },
    { 
      key: 'duration', 
      header: 'Durée',
      renderCell: (formation: Formation) => <span>{formation.duration}</span>
    },
    { 
      key: 'status', 
      header: 'Statut',
      renderCell: (formation: Formation) => {
        const status = FORMATION_STATUS.find(s => s.value === formation.status) || 
          { label: formation.status, color: 'bg-slate-100 text-slate-800 border-slate-300' };
        
        return (
          <Badge 
            variant="outline"
            className={status.color}
          >
            {status.label}
          </Badge>
        );
      }
    },
  ];

  // Chargement des formations
  const loadFormations = async () => {
    try {
      setIsLoading(true);
      
      // Pour le développement, utiliser des données simulées
      setTimeout(() => {
        const mockFormations: Formation[] = [
          {
            id: '1',
            title: 'Développement Web Full Stack',
            description: 'Apprenez à créer des applications web complètes avec les technologies modernes (HTML, CSS, JavaScript, React, Node.js).',
            category: 'informatique',
            duration: '12 semaines',
            price: 250000,
            schedule: 'Lundi et Mercredi, 18h-20h',
            format: 'hybride',
            niveau: 'intermediaire',
            requirements: 'Connaissances de base en programmation',
            status: 'active',
            image: '/img/dev-web.png',
            createdAt: '2023-01-15T00:00:00Z',
            updatedAt: '2023-05-10T00:00:00Z'
          },
          {
            id: '2',
            title: 'Data Science et Analyse de Données',
            description: 'Maîtrisez les techniques d\'analyse de données et les algorithmes de machine learning pour extraire de la valeur de vos données.',
            category: 'data_science',
            duration: '8 semaines',
            price: 200000,
            schedule: 'Samedi, 9h-13h',
            format: 'presentiel',
            niveau: 'avance',
            requirements: 'Connaissances en mathématiques et statistiques',
            status: 'active',
            image: '/img/data-science.png',
            createdAt: '2023-02-20T00:00:00Z',
            updatedAt: '2023-06-05T00:00:00Z'
          },
          {
            id: '3',
            title: 'Communication Digitale',
            description: 'Développez votre stratégie de communication sur les réseaux sociaux et les plateformes numériques.',
            category: 'communication',
            duration: '4 semaines',
            price: 150000,
            schedule: 'Mardi et Jeudi, 17h-19h',
            format: 'distanciel',
            niveau: 'debutant',
            status: 'draft',
            image: '/img/com.png',
            createdAt: '2023-03-10T00:00:00Z',
            updatedAt: '2023-07-01T00:00:00Z'
          },
        ];
        
        // Filtrer par statut si nécessaire
        let filteredFormations = [...mockFormations];
        if (activeTab !== 'all') {
          filteredFormations = mockFormations.filter(f => f.status === activeTab);
        }
        
        // Filtrer par recherche si nécessaire
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filteredFormations = filteredFormations.filter(f => 
            f.title.toLowerCase().includes(query) || 
            f.description.toLowerCase().includes(query)
          );
        }
        
        setFormations(filteredFormations);
        setTotalFormations(filteredFormations.length);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error('Erreur lors du chargement des formations:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFormations();
  }, [currentPage, searchQuery, activeTab]);

  // Gestion des actions CRUD
  const handleAddFormation = async (formationData: Partial<Formation>) => {
    try {
      // Pour le développement, simuler l'ajout
      console.log('Ajout de formation:', formationData);
      
      // Recharger la liste
      await loadFormations();
      
      return Promise.resolve();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la formation:', error);
      return Promise.reject(error);
    }
  };

  const handleEditFormation = async (formationData: Partial<Formation>) => {
    if (!currentFormation) return;
    
    try {
      // Pour le développement, simuler la modification
      console.log('Modification de formation:', formationData);
      
      // Recharger la liste
      await loadFormations();
      
      return Promise.resolve();
    } catch (error) {
      console.error('Erreur lors de la modification de la formation:', error);
      return Promise.reject(error);
    }
  };

  const handleDeleteFormation = async () => {
    if (!currentFormation) return;
    
    try {
      // Pour le développement, simuler la suppression
      console.log('Suppression de formation:', currentFormation.id);
      
      // Recharger la liste
      await loadFormations();
      
      return Promise.resolve();
    } catch (error) {
      console.error('Erreur lors de la suppression de la formation:', error);
      return Promise.reject(error);
    }
  };

  // Simuler l'upload d'image
  const handleImageUpload = async (file: File) => {
    // Simuler un délai d'upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // En production, vous téléchargeriez l'image vers votre serveur ou un service de stockage
    console.log('Image téléchargée:', file.name);
    
    // Retourner une URL simulée
    return Promise.resolve('/img/formation.png');
  };

  // Formulaire de formation
  const FormationForm = ({ formData, handleChange }: any) => {
    // État local pour la gestion des onglets du formulaire
    const [formTab, setFormTab] = useState('general');
    
    return (
      <div>
        <Tabs value={formTab} onValueChange={setFormTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="general">Informations générales</TabsTrigger>
            <TabsTrigger value="details">Détails</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="space-y-4">
            <div>
              <Label htmlFor="title">Titre de la formation*</Label>
              <Input
                id="title"
                name="title"
                value={formData.title || ''}
                onChange={handleChange}
                placeholder="Titre de la formation"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description*</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                placeholder="Description détaillée de la formation"
                className="min-h-[100px]"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Catégorie*</Label>
                <Select 
                  name="category" 
                  value={formData.category || ''} 
                  onValueChange={(value) => handleChange({ target: { name: 'category', value } })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {FORMATION_CATEGORIES.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="niveau">Niveau*</Label>
                <Select 
                  name="niveau" 
                  value={formData.niveau || ''} 
                  onValueChange={(value) => handleChange({ target: { name: 'niveau', value } })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    {FORMATION_LEVELS.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Prix (FCFA)*</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price || ''}
                  onChange={handleChange}
                  placeholder="150000"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="duration">Durée*</Label>
                <Input
                  id="duration"
                  name="duration"
                  value={formData.duration || ''}
                  onChange={handleChange}
                  placeholder="Ex: 12 semaines"
                  required
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-4">
            <div>
              <Label htmlFor="format">Format*</Label>
              <Select 
                name="format" 
                value={formData.format || ''} 
                onValueChange={(value) => handleChange({ target: { name: 'format', value } })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un format" />
                </SelectTrigger>
                <SelectContent>
                  {FORMATION_FORMATS.map((format) => (
                    <SelectItem key={format.value} value={format.value}>
                      {format.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="schedule">Horaires</Label>
              <Input
                id="schedule"
                name="schedule"
                value={formData.schedule || ''}
                onChange={handleChange}
                placeholder="Ex: Lundi et Mercredi, 18h-20h"
              />
            </div>
            
            <div>
              <Label htmlFor="requirements">Prérequis</Label>
              <Textarea
                id="requirements"
                name="requirements"
                value={formData.requirements || ''}
                onChange={handleChange}
                placeholder="Connaissances ou compétences requises"
              />
            </div>
            
            <div>
              <Label htmlFor="status">Statut*</Label>
              <Select 
                name="status" 
                value={formData.status || 'draft'} 
                onValueChange={(value) => handleChange({ target: { name: 'status', value } })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  {FORMATION_STATUS.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <ImageUploader
                onImageUpload={handleImageUpload}
                currentImageUrl={formData.image || ''}
                label="Image de la formation"
                aspectRatio="16:9"
                width="100%"
                height="200px"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Formations Ouvertes</h1>
          <p className="text-slate-500">Gérez les formations accessibles au public</p>
        </div>
      </div>

      <InfoPanel
        title="Gestion des formations"
        icon={<Info className="h-5 w-5" />}
        variant="info"
      >
        <p className="text-sm text-blue-800">
          Les formations avec le statut <strong>Actif</strong> sont visibles sur le site public.
          Les <strong>Brouillons</strong> sont sauvegardés mais non publiés.
        </p>
      </InfoPanel>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="active">Actives</TabsTrigger>
          <TabsTrigger value="draft">Brouillons</TabsTrigger>
          <TabsTrigger value="inactive">Inactives</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <DataTable
        columns={columns}
        data={formations}
        keyField="id"
        isLoading={isLoading}
        totalItems={totalFormations}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onSearch={(query) => {
          setSearchQuery(query);
          setCurrentPage(1);
        }}
        searchPlaceholder="Rechercher une formation..."
        title="Formations"
        onAdd={() => setIsAddDialogOpen(true)}
        renderActions={(formation) => (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCurrentFormation(formation);
                setIsEditDialogOpen(true);
              }}
              className="text-slate-600 hover:text-slate-900 p-1"
            >
              <PencilIcon className="h-4 w-4" />
              <span className="sr-only">Modifier</span>
            </button>
            <button
              onClick={() => {
                setCurrentFormation(formation);
                setIsDeleteDialogOpen(true);
              }}
              className="text-red-600 hover:text-red-700 p-1"
            >
              <TrashIcon className="h-4 w-4" />
              <span className="sr-only">Supprimer</span>
            </button>
          </div>
        )}
      />

      {/* Dialogue d'ajout de formation */}
      <FormDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        title="Ajouter une formation"
        description="Créer une nouvelle formation ouverte"
        onSubmit={handleAddFormation}
        submitLabel="Créer la formation"
        initialData={{ status: 'draft' }}
      >
        <FormationForm />
      </FormDialog>

      {/* Dialogue de modification de formation */}
      <FormDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        title="Modifier une formation"
        description="Modifier les détails de la formation"
        onSubmit={handleEditFormation}
        submitLabel="Enregistrer les modifications"
        initialData={currentFormation || {}}
        isEdit
      >
        <FormationForm />
      </FormDialog>

      {/* Dialogue de confirmation de suppression */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteFormation}
        title="Supprimer la formation"
        description="Cette action est irréversible. La formation sera définitivement supprimée."
        itemName={currentFormation?.title}
      />
    </div>
  );
};

export default AdminFormationsPage;
