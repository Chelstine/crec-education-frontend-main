import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  PencilIcon, 
  TrashIcon, 
  Download,
  Eye,
  Image,
  Upload,
  FolderOpen,
  Grid,
  List,
  Search,
  Filter,
  Star,
  Calendar
} from 'lucide-react';
import { 
  DataTable,
  DeleteConfirmDialog,
  FormDialog,
  InfoPanel
} from '../../../components/admin';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Textarea } from '../../../components/ui/textarea';
import { Switch } from '../../../components/ui/switch';
import { useApi } from '../../../hooks/useApi';
import { useToast } from '../../../hooks/use-toast';
import { handleApiError } from '@/services/apiServices';

// Interface pour les éléments de galerie
interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  category: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  fileSize: number;
  dimensions: {
    width: number;
    height: number;
  };
  uploadedBy: string;
  uploadedAt: string;
  updatedAt: string;
  views: number;
  downloads: number;
}

// Interface pour les catégories
interface GalleryCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageCount: number;
  featured: boolean;
  order: number;
  createdAt: string;
}

// Configuration des catégories par défaut
const DEFAULT_CATEGORIES = [
  { value: 'events', label: 'Événements', color: 'bg-blue-100 text-blue-800' },
  { value: 'campus', label: 'Campus', color: 'bg-green-100 text-green-800' },
  { value: 'students', label: 'Étudiants', color: 'bg-purple-100 text-purple-800' },
  { value: 'fablab', label: 'FabLab', color: 'bg-orange-100 text-orange-800' },
  { value: 'formations', label: 'Formations', color: 'bg-teal-100 text-teal-800' },
  { value: 'achievements', label: 'Réalisations', color: 'bg-amber-100 text-amber-800' },
  { value: 'partnerships', label: 'Partenariats', color: 'bg-rose-100 text-rose-800' }
];

const AdminGaleriePage: React.FC = () => {
  const { toast } = useToast();
  
  // État pour les éléments de galerie
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoadingItems, setIsLoadingItems] = useState(true);
  
  // État pour les catégories
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  
  // État pour les dialogues
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  
  const [currentItem, setCurrentItem] = useState<GalleryItem | null>(null);
  const [currentCategory, setCurrentCategory] = useState<GalleryCategory | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<'item' | 'category'>('item');
  
  const [activeTab, setActiveTab] = useState('gallery');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [featuredFilter, setFeaturedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Colonnes pour le tableau (mode liste)
  const itemColumns = [
    { 
      key: 'image', 
      header: 'Aperçu',
      renderCell: (item: GalleryItem) => (
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden">
            <img 
              src={item.thumbnailUrl} 
              alt={item.title}
              className="h-full w-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = '<div class="text-slate-400"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>';
              }}
            />
          </div>
          <div>
            <p className="font-medium">{item.title}</p>
            <p className="text-xs text-slate-500">{item.dimensions.width} × {item.dimensions.height} px</p>
          </div>
        </div>
      )
    },
    { 
      key: 'category', 
      header: 'Catégorie',
      renderCell: (item: GalleryItem) => {
        const categoryConfig = DEFAULT_CATEGORIES.find(c => c.value === item.category);
        return (
          <Badge variant="outline" className={categoryConfig?.color || 'bg-slate-100 text-slate-800'}>
            {categoryConfig?.label || item.category}
          </Badge>
        );
      }
    },
    { 
      key: 'tags', 
      header: 'Tags',
      renderCell: (item: GalleryItem) => (
        <div className="flex flex-wrap gap-1">
          {item.tags.slice(0, 2).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {item.tags.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{item.tags.length - 2}
            </Badge>
          )}
        </div>
      )
    },
    { 
      key: 'status', 
      header: 'Statut',
      renderCell: (item: GalleryItem) => (
        <div className="flex flex-col gap-1">
          <Badge variant={item.published ? "default" : "secondary"}>
            {item.published ? 'Publié' : 'Brouillon'}
          </Badge>
          {item.featured && (
            <Badge variant="outline" className="text-xs bg-amber-100 text-amber-800">
              <Star className="h-3 w-3 mr-1" />
              Mis en avant
            </Badge>
          )}
        </div>
      )
    },
    { 
      key: 'stats', 
      header: 'Statistiques',
      renderCell: (item: GalleryItem) => (
        <div className="text-sm text-slate-600">
          <p>{item.views} vues</p>
          <p>{item.downloads} téléchargements</p>
        </div>
      )
    },
    { 
      key: 'uploadedAt', 
      header: 'Date d\'ajout',
      renderCell: (item: GalleryItem) => (
        <span className="text-slate-600">
          {new Date(item.uploadedAt).toLocaleDateString('fr-FR')}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      renderCell: (item: GalleryItem) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleViewItem(item)}
            className="h-8 w-8 p-0"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEditItem(item)}
            className="h-8 w-8 p-0"
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDeleteItem(item)}
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  // Colonnes pour les catégories
  const categoryColumns = [
    { 
      key: 'name', 
      header: 'Catégorie',
      renderCell: (category: GalleryCategory) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
            <FolderOpen className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium">{category.name}</p>
            <p className="text-xs text-slate-500">{category.description}</p>
          </div>
        </div>
      )
    },
    { 
      key: 'imageCount', 
      header: 'Nombre d\'images',
      renderCell: (category: GalleryCategory) => (
        <Badge variant="secondary">
          {category.imageCount} image{category.imageCount !== 1 ? 's' : ''}
        </Badge>
      )
    },
    { 
      key: 'order', 
      header: 'Ordre',
      renderCell: (category: GalleryCategory) => (
        <span className="text-slate-600">{category.order}</span>
      )
    },
    { 
      key: 'featured', 
      header: 'Mise en avant',
      renderCell: (category: GalleryCategory) => (
        <Badge variant={category.featured ? "default" : "secondary"}>
          {category.featured ? 'Oui' : 'Non'}
        </Badge>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      renderCell: (category: GalleryCategory) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEditCategory(category)}
            className="h-8 w-8 p-0"
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDeleteCategory(category)}
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  // Chargement des données
  const loadGalleryItems = async () => {
    try {
      setIsLoadingItems(true);
      
      // Données simulées
      setTimeout(() => {
        const mockItems: GalleryItem[] = [
          {
            id: '1',
            title: 'Cérémonie de remise des diplômes 2024',
            description: 'Photos de la cérémonie de remise des diplômes de promotion 2024',
            imageUrl: '/img/events/graduation_2024.jpg',
            thumbnailUrl: '/img/events/graduation_2024_thumb.jpg',
            category: 'events',
            tags: ['cérémonie', 'diplômes', '2024', 'graduation'],
            featured: true,
            published: true,
            fileSize: 2048576, // 2MB
            dimensions: { width: 1920, height: 1080 },
            uploadedBy: 'Admin System',
            uploadedAt: '2024-01-15T10:30:00Z',
            updatedAt: '2024-01-15T10:30:00Z',
            views: 245,
            downloads: 12
          },
          {
            id: '2',
            title: 'Atelier FabLab - Impression 3D',
            description: 'Session de formation sur l\'impression 3D dans notre FabLab',
            imageUrl: '/img/fablab/3d_printing_workshop.jpg',
            thumbnailUrl: '/img/fablab/3d_printing_workshop_thumb.jpg',
            category: 'fablab',
            tags: ['impression 3D', 'atelier', 'formation', 'machines'],
            featured: false,
            published: true,
            fileSize: 1536000, // 1.5MB
            dimensions: { width: 1600, height: 900 },
            uploadedBy: 'Marie Laurent',
            uploadedAt: '2024-01-10T14:15:00Z',
            updatedAt: '2024-01-10T14:15:00Z',
            views: 156,
            downloads: 8
          },
          {
            id: '3',
            title: 'Vue aérienne du campus',
            description: 'Photo aérienne du campus CREC montrant les nouveaux bâtiments',
            imageUrl: '/img/campus/aerial_view.jpg',
            thumbnailUrl: '/img/campus/aerial_view_thumb.jpg',
            category: 'campus',
            tags: ['campus', 'bâtiments', 'vue aérienne', 'infrastructure'],
            featured: true,
            published: false,
            fileSize: 3145728, // 3MB
            dimensions: { width: 2560, height: 1440 },
            uploadedBy: 'Jean Dupont',
            uploadedAt: '2024-01-08T16:45:00Z',
            updatedAt: '2024-01-12T09:30:00Z',
            views: 89,
            downloads: 5
          },
          {
            id: '4',
            title: 'Projet étudiant - Robot autonome',
            description: 'Présentation du projet de robot autonome développé par nos étudiants',
            imageUrl: '/img/students/robot_project.jpg',
            thumbnailUrl: '/img/students/robot_project_thumb.jpg',
            category: 'achievements',
            tags: ['projet', 'robot', 'autonome', 'étudiants', 'innovation'],
            featured: false,
            published: true,
            fileSize: 1789000, // 1.7MB
            dimensions: { width: 1400, height: 1050 },
            uploadedBy: 'Pierre Martin',
            uploadedAt: '2024-01-05T11:20:00Z',
            updatedAt: '2024-01-05T11:20:00Z',
            views: 203,
            downloads: 15
          }
        ];
        
        let filteredItems = mockItems;
        
        // Filtrage par catégorie
        if (categoryFilter !== 'all') {
          filteredItems = filteredItems.filter(item => item.category === categoryFilter);
        }
        
        // Filtrage par statut featured
        if (featuredFilter === 'featured') {
          filteredItems = filteredItems.filter(item => item.featured);
        } else if (featuredFilter === 'not_featured') {
          filteredItems = filteredItems.filter(item => !item.featured);
        }
        
        // Filtrage par recherche
        if (searchQuery) {
          filteredItems = filteredItems.filter(item => 
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
          );
        }
        
        setGalleryItems(filteredItems);
        setIsLoadingItems(false);
      }, 800);
    } catch (error) {
      handleApiError(error);
      setIsLoadingItems(false);
    }
  };

  const loadCategories = async () => {
    try {
      setIsLoadingCategories(true);
      
      // Données simulées
      setTimeout(() => {
        const mockCategories: GalleryCategory[] = [
          {
            id: '1',
            name: 'Événements',
            slug: 'events',
            description: 'Photos des événements et cérémonies',
            imageCount: 24,
            featured: true,
            order: 1,
            createdAt: '2023-09-01T00:00:00Z'
          },
          {
            id: '2',
            name: 'Campus',
            slug: 'campus',
            description: 'Infrastructures et espaces du campus',
            imageCount: 18,
            featured: true,
            order: 2,
            createdAt: '2023-09-01T00:00:00Z'
          },
          {
            id: '3',
            name: 'FabLab',
            slug: 'fablab',
            description: 'Équipements et activités du FabLab',
            imageCount: 31,
            featured: false,
            order: 3,
            createdAt: '2023-09-01T00:00:00Z'
          },
          {
            id: '4',
            name: 'Réalisations étudiantes',
            slug: 'achievements',
            description: 'Projets et réalisations des étudiants',
            imageCount: 42,
            featured: true,
            order: 4,
            createdAt: '2023-09-01T00:00:00Z'
          }
        ];
        
        setCategories(mockCategories);
        setIsLoadingCategories(false);
      }, 600);
    } catch (error) {
      handleApiError(error);
      setIsLoadingCategories(false);
    }
  };

  useEffect(() => {
    loadGalleryItems();
    loadCategories();
  }, [categoryFilter, featuredFilter, searchQuery]);

  // Gestionnaires d'événements
  const handleAddItem = () => {
    setCurrentItem(null);
    setIsItemDialogOpen(true);
  };

  const handleEditItem = (item: GalleryItem) => {
    setCurrentItem(item);
    setIsItemDialogOpen(true);
  };

  const handleViewItem = (item: GalleryItem) => {
    setCurrentItem(item);
    setIsViewDialogOpen(true);
  };

  const handleDeleteItem = (item: GalleryItem) => {
    setCurrentItem(item);
    setDeleteTarget('item');
    setIsDeleteDialogOpen(true);
  };

  const handleEditCategory = (category: GalleryCategory) => {
    setCurrentCategory(category);
    setIsCategoryDialogOpen(true);
  };

  const handleDeleteCategory = (category: GalleryCategory) => {
    setCurrentCategory(category);
    setDeleteTarget('category');
    setIsDeleteDialogOpen(true);
  };

  const handleSaveItem = async (itemData: Partial<GalleryItem>) => {
    try {
      if (currentItem) {
        // Mise à jour
        setGalleryItems(galleryItems.map(item => 
          item.id === currentItem.id 
            ? { ...item, ...itemData, updatedAt: new Date().toISOString() }
            : item
        ));
        toast({
          title: "Image modifiée",
          description: "L'image a été modifiée avec succès."
        });
      } else {
        // Création
        const newItem: GalleryItem = {
          ...itemData as GalleryItem,
          id: Date.now().toString(),
          uploadedBy: 'Admin System',
          uploadedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          views: 0,
          downloads: 0
        };
        setGalleryItems([...galleryItems, newItem]);
        toast({
          title: "Image ajoutée",
          description: "L'image a été ajoutée avec succès."
        });
      }
      
      setIsItemDialogOpen(false);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleSaveCategory = async (categoryData: Partial<GalleryCategory>) => {
    try {
      if (currentCategory) {
        // Mise à jour
        setCategories(categories.map(cat => 
          cat.id === currentCategory.id ? { ...cat, ...categoryData } : cat
        ));
        toast({
          title: "Catégorie modifiée",
          description: "La catégorie a été modifiée avec succès."
        });
      } else {
        // Création
        const newCategory: GalleryCategory = {
          ...categoryData as GalleryCategory,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          imageCount: 0
        };
        setCategories([...categories, newCategory]);
        toast({
          title: "Catégorie créée",
          description: "La catégorie a été créée avec succès."
        });
      }
      
      setIsCategoryDialogOpen(false);
    } catch (error) {
      handleApiError(error);
    }
  };

  const confirmDelete = async () => {
    try {
      if (deleteTarget === 'item' && currentItem) {
        setGalleryItems(galleryItems.filter(item => item.id !== currentItem.id));
        toast({
          title: "Image supprimée",
          description: "L'image a été supprimée avec succès."
        });
      } else if (deleteTarget === 'category' && currentCategory) {
        setCategories(categories.filter(cat => cat.id !== currentCategory.id));
        toast({
          title: "Catégorie supprimée",
          description: "La catégorie a été supprimée avec succès."
        });
      }
      
      setIsDeleteDialogOpen(false);
    } catch (error) {
      handleApiError(error);
    }
  };

  // Formulaires
  const renderItemForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="itemTitle">Titre</Label>
        <Input
          id="itemTitle"
          defaultValue={currentItem?.title || ''}
          placeholder="Titre de l'image"
        />
      </div>
      
      <div>
        <Label htmlFor="itemDescription">Description</Label>
        <Textarea
          id="itemDescription"
          defaultValue={currentItem?.description || ''}
          placeholder="Description de l'image"
          rows={3}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="itemCategory">Catégorie</Label>
          <Select defaultValue={currentItem?.category || ''}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              {DEFAULT_CATEGORIES.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="itemTags">Tags (séparés par des virgules)</Label>
          <Input
            id="itemTags"
            defaultValue={currentItem?.tags.join(', ') || ''}
            placeholder="tag1, tag2, tag3"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="itemPublished"
            defaultChecked={currentItem?.published || false}
          />
          <Label htmlFor="itemPublished">Publié</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="itemFeatured"
            defaultChecked={currentItem?.featured || false}
          />
          <Label htmlFor="itemFeatured">Mis en avant</Label>
        </div>
      </div>
      
      <div>
        <Label htmlFor="itemImage">Image</Label>
        <div className="mt-2 border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
          <Upload className="mx-auto h-12 w-12 text-slate-400" />
          <p className="mt-2 text-sm text-slate-600">
            Cliquez pour télécharger ou glissez-déposez
          </p>
          <p className="text-xs text-slate-500">PNG, JPG, WEBP jusqu'à 10MB</p>
        </div>
      </div>
    </div>
  );

  const renderCategoryForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="categoryName">Nom de la catégorie</Label>
        <Input
          id="categoryName"
          defaultValue={currentCategory?.name || ''}
          placeholder="Nom de la catégorie"
        />
      </div>
      
      <div>
        <Label htmlFor="categorySlug">Slug (URL)</Label>
        <Input
          id="categorySlug"
          defaultValue={currentCategory?.slug || ''}
          placeholder="slug-de-la-categorie"
        />
      </div>
      
      <div>
        <Label htmlFor="categoryDescription">Description</Label>
        <Textarea
          id="categoryDescription"
          defaultValue={currentCategory?.description || ''}
          placeholder="Description de la catégorie"
          rows={3}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="categoryOrder">Ordre d'affichage</Label>
          <Input
            id="categoryOrder"
            type="number"
            defaultValue={currentCategory?.order || ''}
            placeholder="Ordre"
          />
        </div>
        <div className="flex items-center space-x-2 pt-6">
          <Switch
            id="categoryFeatured"
            defaultChecked={currentCategory?.featured || false}
          />
          <Label htmlFor="categoryFeatured">Catégorie mise en avant</Label>
        </div>
      </div>
    </div>
  );

  // Statistiques
  const stats = [
    {
      title: "Total images",
      value: galleryItems.length,
      iconComponent: Image,
      color: "bg-blue-100"
    },
    {
      title: "Images publiées",
      value: galleryItems.filter(item => item.published).length,
      iconComponent: Eye,
      color: "bg-green-100"
    },
    {
      title: "Images mises en avant",
      value: galleryItems.filter(item => item.featured).length,
      iconComponent: Star,
      color: "bg-amber-100"
    },
    {
      title: "Catégories",
      value: categories.length,
      iconComponent: FolderOpen,
      color: "bg-purple-100"
    }
  ];

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Galerie</h1>
          <p className="text-slate-500">Gérez les images et catégories de la galerie</p>
        </div>
        <Button onClick={handleAddItem}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une image
        </Button>
      </div>

      {/* Information */}
      <InfoPanel
        title="Gestion de la galerie"
        icon={Image}
        variant="info"
      >
        <p className="text-sm text-blue-800">
          Organisez et gérez toutes les images du site. Créez des catégories pour organiser 
          le contenu et mettez en avant les meilleures images.
        </p>
      </InfoPanel>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.iconComponent className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-slate-600">{stat.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Onglets */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="gallery" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            Images
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <FolderOpen className="h-4 w-4" />
            Catégories
          </TabsTrigger>
        </TabsList>

        {/* Onglet Images */}
        <TabsContent value="gallery" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div>
                  <CardTitle>Gestion des images</CardTitle>
                  <CardDescription>
                    Ajoutez, modifiez et organisez les images de la galerie
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les catégories</SelectItem>
                      {DEFAULT_CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={featuredFilter} onValueChange={setFeaturedFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Mise en avant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes</SelectItem>
                      <SelectItem value="featured">Mises en avant</SelectItem>
                      <SelectItem value="not_featured">Pas mises en avant</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="flex gap-1 border rounded-md">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="px-3"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="px-3"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {galleryItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video bg-slate-100 relative">
                        <img 
                          src={item.thumbnailUrl} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-slate-400"><svg class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z" /></svg></div>';
                          }}
                        />
                        <div className="absolute top-2 right-2 flex gap-1">
                          {item.featured && (
                            <Badge className="bg-amber-500 text-white">
                              <Star className="h-3 w-3" />
                            </Badge>
                          )}
                          {!item.published && (
                            <Badge variant="secondary">Brouillon</Badge>
                          )}
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <h3 className="font-medium text-sm line-clamp-2 mb-1">{item.title}</h3>
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                          <span>{DEFAULT_CATEGORIES.find(c => c.value === item.category)?.label}</span>
                          <span>{item.views} vues</span>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewItem(item)}
                            className="flex-1 h-7 text-xs"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Voir
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditItem(item)}
                            className="h-7 w-7 p-0"
                          >
                            <PencilIcon className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteItem(item)}
                            className="h-7 w-7 p-0 text-red-600 hover:text-red-700"
                          >
                            <TrashIcon className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <DataTable
                  columns={itemColumns}
                  data={galleryItems}
                  keyField="id"
                  isLoading={isLoadingItems}
                  searchPlaceholder="Rechercher une image..."
                  onSearch={setSearchQuery}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Catégories */}
        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Gestion des catégories</CardTitle>
                  <CardDescription>
                    Organisez les images par catégories
                  </CardDescription>
                </div>
                <Button onClick={() => setIsCategoryDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvelle catégorie
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={categoryColumns}
                data={categories}
                keyField="id"
                isLoading={isLoadingCategories}
                searchPlaceholder="Rechercher une catégorie..."
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogues */}
      <FormDialog
        isOpen={isItemDialogOpen}
        onClose={() => setIsItemDialogOpen(false)}
        onSubmit={async () => {}}
        title={currentItem ? "Modifier l'image" : "Ajouter une image"}
        description={currentItem ? "Modifiez les détails de l'image" : "Ajoutez une nouvelle image à la galerie"}
      >
        {renderItemForm()}
      </FormDialog>

      <FormDialog
        isOpen={isCategoryDialogOpen}
        onClose={() => setIsCategoryDialogOpen(false)}
        onSubmit={handleSaveCategory}
        title={currentCategory ? "Modifier la catégorie" : "Nouvelle catégorie"}
        description={currentCategory ? "Modifiez la catégorie" : "Créez une nouvelle catégorie"}
      >
        {renderCategoryForm()}
      </FormDialog>

      <FormDialog
        isOpen={isViewDialogOpen}
        onClose={() => setIsViewDialogOpen(false)}
        title="Aperçu de l'image"
        description="Détails complets de l'image"
        onSubmit={async () => { setIsViewDialogOpen(false); }} // No-op or close dialog
      >
        {currentItem && (
          <div className="space-y-4">
            <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden">
              <img 
                src={currentItem.imageUrl} 
                alt={currentItem.title}
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = currentItem.thumbnailUrl;
                }}
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">{currentItem.title}</h3>
              <p className="text-sm text-slate-600">{currentItem.description}</p>
              <div className="flex flex-wrap gap-2">
                {currentItem.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-slate-500">Dimensions</Label>
                  <p>{currentItem.dimensions.width} × {currentItem.dimensions.height} px</p>
                </div>
                <div>
                  <Label className="text-slate-500">Taille</Label>
                  <p>{(currentItem.fileSize / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <div>
                  <Label className="text-slate-500">Vues</Label>
                  <p>{currentItem.views}</p>
                </div>
                <div>
                  <Label className="text-slate-500">Téléchargements</Label>
                  <p>{currentItem.downloads}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </FormDialog>

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title={deleteTarget === 'item' ? "Supprimer l'image" : "Supprimer la catégorie"}
        description={
          deleteTarget === 'item' 
            ? `Êtes-vous sûr de vouloir supprimer l'image "${currentItem?.title}" ? Cette action est irréversible.`
            : `Êtes-vous sûr de vouloir supprimer la catégorie "${currentCategory?.name}" ? Cette action affectera toutes les images de cette catégorie.`
        }
      />
    </div>
  );
};

export default AdminGaleriePage;
