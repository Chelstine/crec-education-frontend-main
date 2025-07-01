import React, { useState, useEffect } from 'react';
import { DataTable, DeleteConfirmDialog, FormDialog } from '@/components/admin';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ImageUploader } from '@/components/admin';
import { Book, FileText, PencilIcon, TrashIcon, Plus, Download, Eye, BookOpen, Video } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Types pour les ressources de la bibliothèque
interface LibraryResource {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  type: 'book' | 'article' | 'video' | 'audio' | 'document';
  url?: string;
  fileSize?: string;
  coverImage?: string;
  downloadCount: number;
  status: 'active' | 'draft' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

const AdminLibraryPage: React.FC = () => {
  // États pour l'UI
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResources, setTotalResources] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  // États pour les données
  const [resources, setResources] = useState<LibraryResource[]>([]);
  
  // États pour les boîtes de dialogue
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  // État pour l'élément sélectionné
  const [selectedResource, setSelectedResource] = useState<LibraryResource | null>(null);
  
  // Toast pour les notifications
  const { toast } = useToast();

  // Mock data for resources
  const mockResources: LibraryResource[] = [
    {
      id: "lib-001",
      title: "Introduction à la spiritualité ignatienne",
      author: "P. James Martin SJ",
      description: "Un guide complet sur les principes de base de la spiritualité ignatienne et son application dans la vie quotidienne.",
      category: "spirituality",
      type: "book",
      url: "https://example.com/books/ignatian-spirituality.pdf",
      fileSize: "4.2 MB",
      coverImage: "/img/books/ignatian-spirituality.jpg",
      downloadCount: 325,
      status: "active",
      createdAt: "2023-03-15T10:30:00.000Z",
      updatedAt: "2023-03-15T10:30:00.000Z"
    },
    {
      id: "lib-002",
      title: "Les bases de la programmation Python",
      author: "Dr. Marie Dumont",
      description: "Un article détaillé sur les concepts fondamentaux de la programmation Python pour les débutants.",
      category: "technology",
      type: "article",
      url: "https://example.com/articles/python-basics.html",
      coverImage: "/img/articles/python.jpg",
      downloadCount: 768,
      status: "active",
      createdAt: "2023-05-22T14:45:00.000Z",
      updatedAt: "2023-06-10T09:15:00.000Z"
    },
    {
      id: "lib-003",
      title: "Cours complet d'anglais des affaires",
      author: "Prof. Sarah Johnson",
      description: "Une série de vidéos pédagogiques couvrant l'anglais des affaires, de débutant à avancé.",
      category: "language",
      type: "video",
      url: "https://example.com/videos/business-english/",
      fileSize: "1.2 GB",
      coverImage: "/img/videos/business-english.jpg",
      downloadCount: 492,
      status: "active",
      createdAt: "2023-02-08T08:20:00.000Z",
      updatedAt: "2023-04-12T11:30:00.000Z"
    },
    {
      id: "lib-004",
      title: "L'innovation en Afrique de l'Ouest",
      author: "Dr. Koffi Annan",
      description: "Document de recherche sur les tendances d'innovation en Afrique de l'Ouest et leur impact économique.",
      category: "research",
      type: "document",
      url: "https://example.com/documents/west-africa-innovation.pdf",
      fileSize: "2.8 MB",
      coverImage: "/img/documents/africa-innovation.jpg",
      downloadCount: 213,
      status: "draft",
      createdAt: "2023-06-30T15:10:00.000Z",
      updatedAt: "2023-06-30T15:10:00.000Z"
    }
  ];

  // Définition des colonnes pour le tableau de ressources
  const resourceColumns = [
    {
      key: "title",
      header: "Titre et Auteur",
      renderCell: (resource: LibraryResource) => (
        <div className="flex flex-col">
          <div className="flex items-center">
            {resource.type === 'book' && <Book className="h-4 w-4 mr-2 text-slate-400" />}
            {resource.type === 'article' && <FileText className="h-4 w-4 mr-2 text-slate-400" />}
            {resource.type === 'video' && <Video className="h-4 w-4 mr-2 text-slate-400" />}
            {resource.type === 'document' && <FileText className="h-4 w-4 mr-2 text-slate-400" />}
            <span className="font-medium">{resource.title}</span>
          </div>
          <span className="text-xs text-slate-500 mt-1">par {resource.author}</span>
        </div>
      )
    },
    {
      key: "category",
      header: "Catégorie",
      renderCell: (resource: LibraryResource) => {
        const categories = {
          spirituality: { label: 'Spiritualité', color: 'bg-purple-100 text-purple-800' },
          technology: { label: 'Technologie', color: 'bg-blue-100 text-blue-800' },
          language: { label: 'Langues', color: 'bg-green-100 text-green-800' },
          research: { label: 'Recherche', color: 'bg-amber-100 text-amber-800' },
          management: { label: 'Management', color: 'bg-indigo-100 text-indigo-800' }
        };

        const { label, color } = categories[resource.category as keyof typeof categories] || 
          { label: resource.category, color: 'bg-gray-100 text-gray-800' };

        return (
          <Badge className={color}>{label}</Badge>
        );
      }
    },
    {
      key: "type",
      header: "Type",
      renderCell: (resource: LibraryResource) => {
        const types = {
          book: { label: 'Livre', color: 'bg-teal-100 text-teal-800' },
          article: { label: 'Article', color: 'bg-sky-100 text-sky-800' },
          video: { label: 'Vidéo', color: 'bg-red-100 text-red-800' },
          audio: { label: 'Audio', color: 'bg-orange-100 text-orange-800' },
          document: { label: 'Document', color: 'bg-violet-100 text-violet-800' }
        };

        const { label, color } = types[resource.type] || { label: resource.type, color: 'bg-gray-100 text-gray-800' };

        return (
          <Badge className={color}>{label}</Badge>
        );
      }
    },
    {
      key: "stats",
      header: "Statistiques",
      renderCell: (resource: LibraryResource) => (
        <div className="flex items-center">
          <Download className="h-4 w-4 mr-1 text-slate-400" />
          <span>{resource.downloadCount} téléchargements</span>
        </div>
      )
    },
    {
      key: "status",
      header: "Statut",
      renderCell: (resource: LibraryResource) => {
        const statusConfig = {
          active: { color: 'bg-green-100 text-green-800', label: 'Publié' },
          draft: { color: 'bg-amber-100 text-amber-800', label: 'Brouillon' },
          inactive: { color: 'bg-slate-100 text-slate-800', label: 'Inactif' },
        };

        const { color, label } = statusConfig[resource.status];

        return (
          <Badge className={color}>{label}</Badge>
        );
      }
    },
    {
      key: "actions",
      header: "Actions",
      renderCell: (resource: LibraryResource) => (
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => handleViewResource(resource.url || '#')}
          >
            <Eye className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => handleEditResource(resource.id)}
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => handleDeleteResource(resource.id)}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  // Catégories de ressources
  const resourceCategories = [
    { value: 'spirituality', label: 'Spiritualité' },
    { value: 'technology', label: 'Technologie' },
    { value: 'language', label: 'Langues' },
    { value: 'research', label: 'Recherche' },
    { value: 'management', label: 'Management' }
  ];

  // Types de ressources
  const resourceTypes = [
    { value: 'book', label: 'Livre' },
    { value: 'article', label: 'Article' },
    { value: 'video', label: 'Vidéo' },
    { value: 'audio', label: 'Audio' },
    { value: 'document', label: 'Document' }
  ];

  // Voir la ressource (ouvrir dans un nouvel onglet)
  const handleViewResource = (url: string) => {
    window.open(url, '_blank');
  };

  // Modifier une ressource
  const handleEditResource = (id: string) => {
    const resource = resources.find(r => r.id === id);
    if (resource) {
      setSelectedResource(resource);
      setShowEditDialog(true);
    }
  };

  // Supprimer une ressource
  const handleDeleteResource = (id: string) => {
    const resource = resources.find(r => r.id === id);
    if (resource) {
      setSelectedResource(resource);
      setShowDeleteDialog(true);
    }
  };

  // Confirmer la suppression
  const handleConfirmDelete = async () => {
    if (!selectedResource) return Promise.resolve();
    
    try {
      // Simulation de suppression - à remplacer par un appel API
      setResources(resources.filter(r => r.id !== selectedResource.id));
      
      toast({
        title: "Ressource supprimée",
        description: "La ressource a été supprimée avec succès de la bibliothèque.",
      });
      
      setShowDeleteDialog(false);
      setSelectedResource(null);
      
      return Promise.resolve();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression.",
        variant: "destructive",
      });
      return Promise.reject(error);
    }
  };

  // Soumission du formulaire d'ajout
  const handleAddResource = async (formData: any) => {
    try {
      // Simuler l'ajout - à remplacer par un appel API
      const newResource: LibraryResource = {
        id: `lib-${Date.now().toString().slice(-6)}`,
        title: formData.title,
        author: formData.author,
        description: formData.description,
        category: formData.category,
        type: formData.type,
        url: formData.url,
        fileSize: formData.fileSize,
        coverImage: formData.coverImage || undefined,
        downloadCount: 0,
        status: formData.status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setResources([...resources, newResource]);
      
      toast({
        title: "Ressource ajoutée",
        description: "La nouvelle ressource a été ajoutée à la bibliothèque.",
      });
      
      setShowAddDialog(false);
      
      return Promise.resolve();
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout de la ressource.",
        variant: "destructive",
      });
      return Promise.reject(error);
    }
  };

  // Soumission du formulaire d'édition
  const handleUpdateResource = async (formData: any) => {
    if (!selectedResource) return Promise.resolve();
    
    try {
      // Simuler la mise à jour - à remplacer par un appel API
      const updatedResources = resources.map(r => {
        if (r.id === selectedResource.id) {
          return {
            ...r,
            title: formData.title,
            author: formData.author,
            description: formData.description,
            category: formData.category,
            type: formData.type,
            url: formData.url,
            fileSize: formData.fileSize,
            coverImage: formData.coverImage || r.coverImage,
            status: formData.status,
            updatedAt: new Date().toISOString()
          };
        }
        return r;
      });
      
      setResources(updatedResources);
      
      toast({
        title: "Ressource mise à jour",
        description: "La ressource a été mise à jour avec succès.",
      });
      
      setShowEditDialog(false);
      setSelectedResource(null);
      
      return Promise.resolve();
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour.",
        variant: "destructive",
      });
      return Promise.reject(error);
    }
  };

  // Chargement simulé des données
  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      let filteredResources = [...mockResources];
      
      // Filtrage par recherche
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredResources = filteredResources.filter(r =>
          r.title.toLowerCase().includes(query) ||
          r.author.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query)
        );
      }
      
      // Filtrage par catégorie
      if (selectedCategory) {
        filteredResources = filteredResources.filter(r => r.category === selectedCategory);
      }
      
      // Filtrage par type
      if (selectedType) {
        filteredResources = filteredResources.filter(r => r.type === selectedType);
      }
      
      setResources(filteredResources);
      setTotalResources(filteredResources.length);
      setIsLoading(false);
    }, 500);
  }, [searchQuery, selectedCategory, selectedType]);

  // Formulaire de ressource
  const ResourceForm = ({ formData, setFormData }: any) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Titre</Label>
          <Input 
            id="title" 
            value={formData?.title || ''} 
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="author">Auteur</Label>
          <Input 
            id="author" 
            value={formData?.author || ''} 
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          rows={4}
          value={formData?.description || ''} 
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Catégorie</Label>
          <Select 
            value={formData?.category || ''} 
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Sélectionnez une catégorie" />
            </SelectTrigger>
            <SelectContent>
              {resourceCategories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="type">Type</Label>
          <Select 
            value={formData?.type || ''} 
            onValueChange={(value) => setFormData({ ...formData, type: value })}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Sélectionnez un type" />
            </SelectTrigger>
            <SelectContent>
              {resourceTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="url">URL / Lien</Label>
          <Input 
            id="url" 
            value={formData?.url || ''} 
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="fileSize">Taille du fichier (optionnel)</Label>
          <Input 
            id="fileSize" 
            value={formData?.fileSize || ''} 
            onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="status">Statut</Label>
        <Select 
          value={formData?.status || 'draft'} 
          onValueChange={(value) => setFormData({ ...formData, status: value })}
        >
          <SelectTrigger id="status">
            <SelectValue placeholder="Sélectionnez le statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Publié</SelectItem>
            <SelectItem value="draft">Brouillon</SelectItem>
            <SelectItem value="inactive">Inactif</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label>Image de couverture</Label>
        <ImageUploader 
          currentImageUrl={formData?.coverImage || ''}
          onImageUpload={async (file) => {
            // Simuler l'upload d'image et retourner une URL
            return new Promise(resolve => {
              setTimeout(() => {
                const fakeUrl = URL.createObjectURL(file);
                setFormData({ ...formData, coverImage: fakeUrl });
                resolve(fakeUrl);
              }, 500);
            });
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Bibliothèque en ligne</h1>
          <p className="text-muted-foreground">
            Gérez les ressources de la bibliothèque en ligne du CREC
          </p>
        </div>
        
        <Button onClick={() => setShowAddDialog(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Ajouter une ressource
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Toutes les ressources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={resourceColumns}
            data={resources}
            keyField="id"
            searchPlaceholder="Rechercher une ressource..."
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
      
      {/* Dialog de confirmation de suppression */}
      <DeleteConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        title="Supprimer cette ressource ?"
        description={`Êtes-vous sûr de vouloir supprimer "${selectedResource?.title}" ? Cette action est définitive et ne peut pas être annulée.`}
      />
      
      {/* Boîte de dialogue pour l'ajout d'une ressource */}
      <FormDialog
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        title="Ajouter une nouvelle ressource"
        description="Remplissez le formulaire pour ajouter une ressource à la bibliothèque."
        onSubmit={handleAddResource}
        submitLabel="Ajouter"
        isEdit={false}
        initialData={{
          title: '',
          author: '',
          description: '',
          category: '',
          type: 'document',
          url: '',
          fileSize: '',
          status: 'draft'
        }}
      >
        <ResourceForm 
          formData={showAddDialog ? {
            title: '',
            author: '',
            description: '',
            category: '',
            type: 'document',
            url: '',
            fileSize: '',
            status: 'draft'
          } : {}} 
          setFormData={(data) => setSelectedResource(data)} 
        />
      </FormDialog>
      
      {/* Boîte de dialogue pour l'édition d'une ressource */}
      <FormDialog
        isOpen={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        title="Modifier la ressource"
        description="Modifiez les détails de la ressource."
        onSubmit={handleUpdateResource}
        submitLabel="Enregistrer"
        isEdit={true}
        initialData={selectedResource}
      >
        <ResourceForm 
          formData={selectedResource || {}} 
          setFormData={(data) => setSelectedResource(data)} 
        />
      </FormDialog>
    </div>
  );
};

export default AdminLibraryPage;
