import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  PencilIcon,
  TrashIcon,
  Eye,
  Image,
  Video,
  Grid,
  List,
  Star,
  Upload,
  Search,
  Filter,
  Download,
  MoreVertical,
  Calendar,
  MapPin,
  Tag,
  FileImage,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useGalleryManagement } from '@/hooks/useGallery';
import { GalleryItem, GalleryItemCreateRequest, GalleryItemUpdateRequest, GalleryFilters } from '@/types/gallery.types';

// Catégories avec configuration complète
const CATEGORIES = [
  { value: 'events', label: 'Événements', color: 'bg-blue-100 text-blue-800', icon: Calendar },
  { value: 'campus', label: 'Campus', color: 'bg-green-100 text-green-800', icon: MapPin },
  { value: 'students', label: 'Étudiants', color: 'bg-purple-100 text-purple-800', icon: Star },
  { value: 'fablab', label: 'FabLab', color: 'bg-orange-100 text-orange-800', icon: Upload },
  { value: 'formations', label: 'Formations', color: 'bg-teal-100 text-teal-800', icon: FileImage },
  { value: 'achievements', label: 'Réalisations', color: 'bg-amber-100 text-amber-800', icon: Star },
  { value: 'research', label: 'Recherche', color: 'bg-rose-100 text-rose-800', icon: Search },
  { value: 'community', label: 'Communauté', color: 'bg-indigo-100 text-indigo-800', icon: Star },
];

const AdminGalleryPage: React.FC = () => {
  // États pour les filtres et la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<GalleryFilters>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // États pour les modals
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // État du formulaire
  const [formData, setFormData] = useState<Partial<GalleryItemCreateRequest & { customCategory?: string }>>({
    title: '',
    description: '',
    category: '',
    customCategory: '',
    tags: [],
    location: '',
    capture_date: '',
    is_published: true, // Publié par défaut
    is_featured: false,
    alt_text: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Construire les filtres finaux
  const finalFilters = useMemo(() => ({
    ...filters,
    search: searchQuery.trim() || undefined,
  }), [filters, searchQuery]);

  // Hook principal pour la gestion de la galerie
  const {
    items,
    pagination,
    stats,
    isLoading,
    isLoadingStats,
    error,
    createItem,
    updateItem,
    deleteItem,
    isCreating,
    isUpdating,
    isDeleting,
  } = useGalleryManagement(currentPage, finalFilters);

  // Gestion du formulaire
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      customCategory: '',
      tags: [],
      location: '',
      capture_date: '',
      is_published: true, // Publié par défaut
      is_featured: false,
      alt_text: '',
    });
    setSelectedFile(null);
    setPreviewUrl('');
    setSelectedItem(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      // Créer une URL de prévisualisation
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Nettoyer l'ancienne URL si elle existe
      return () => URL.revokeObjectURL(url);
    }
  };

  // Actions CRUD
  const handleAdd = () => {
    resetForm();
    setIsItemDialogOpen(true);
  };

  const handleEdit = (item: GalleryItem) => {
    setSelectedItem(item);
    setFormData({
      title: item.title,
      description: item.description || '',
      category: item.category,
      tags: item.tags || [],
      location: item.location || '',
      capture_date: item.capture_date || '',
      is_published: item.is_published,
      is_featured: item.is_featured,
      alt_text: item.alt_text || '',
    });
    setPreviewUrl(item.media_url);
    setIsItemDialogOpen(true);
  };

  const handleDelete = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };

  const handleView = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsViewDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      setIsUploading(true);
      setUploadProgress(0);
      
      // Simulation de progression pour les gros fichiers
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);
      
      // Traiter la catégorie personnalisée
      let finalCategory = formData.category;
      if (formData.category === 'custom' && formData.customCategory?.trim()) {
        finalCategory = formData.customCategory.trim().toLowerCase().replace(/\s+/g, '-');
      }

      if (selectedItem) {
        // Mise à jour
        const updateData: GalleryItemUpdateRequest = {
          ...formData,
          category: finalCategory,
          media_file: selectedFile || undefined,
        };
        // Exclure customCategory des données envoyées
        delete (updateData as any).customCategory;
        await updateItem({ id: selectedItem.id, data: updateData });
      } else {
        // Création
        if (!selectedFile) {
          alert('Veuillez sélectionner un fichier');
          return;
        }
        const createData: GalleryItemCreateRequest = {
          ...formData as GalleryItemCreateRequest,
          category: finalCategory!,
          media_file: selectedFile,
        };
        // Exclure customCategory des données envoyées
        delete (createData as any).customCategory;
        await createItem(createData);
      }
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setTimeout(() => {
        setIsItemDialogOpen(false);
        resetForm();
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
      
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      setIsUploading(false);
      setUploadProgress(0);
      
      // Afficher une erreur plus spécifique
      if (selectedFile && selectedFile.size > 200 * 1024 * 1024) {
        alert('Fichier trop volumineux. Taille maximum : 200MB');
      } else {
        alert('Erreur lors de l\'upload. Vérifiez votre connexion et réessayez.');
      }
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedItem) {
      try {
        await deleteItem(selectedItem.id);
        setIsDeleteDialogOpen(false);
        setSelectedItem(null);
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  // Gestion des filtres
  const updateFilters = (key: keyof GalleryFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'all' ? undefined : value,
    }));
    setCurrentPage(1); // Reset à la première page
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery('');
    setCurrentPage(1);
  };

  // Formatage des données
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'N/A';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return null;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 mb-4">Erreur lors du chargement des données</p>
        <Button onClick={() => window.location.reload()}>Réessayer</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion de la Galerie</h1>
          <p className="text-gray-600 mt-1">
            Gérez les images et vidéos de votre galerie multimédia
          </p>
        </div>
        <Button onClick={handleAdd} className="bg-crec-gold hover:bg-crec-gold/90">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un média
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Médias</CardTitle>
            <FileImage className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoadingStats ? '...' : stats?.total_items || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.total_images || 0} images, {stats?.total_videos || 0} vidéos
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Publiés</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoadingStats ? '...' : stats?.published_items || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Visibles au public
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Vedette</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoadingStats ? '...' : stats?.featured_items || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Mis en avant
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stockage</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoadingStats ? '...' : formatFileSize(stats?.total_size)}
            </div>
            <p className="text-xs text-muted-foreground">
              Espace utilisé
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et contrôles */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Recherche */}
            <div className="flex-1 max-w-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un média..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filtres */}
            <div className="flex flex-wrap gap-2 items-center">
              <Select
                value={filters.category || 'all'}
                onValueChange={(value) => updateFilters('category', value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes catégories</SelectItem>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.media_type || 'all'}
                onValueChange={(value) => updateFilters('media_type', value)}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tout</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="video">Vidéos</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.is_published?.toString() || 'all'}
                onValueChange={(value) => updateFilters('is_published', value === 'all' ? undefined : value === 'true')}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="true">Publiés</SelectItem>
                  <SelectItem value="false">Brouillons</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.is_featured?.toString() || 'all'}
                onValueChange={(value) => updateFilters('is_featured', value === 'all' ? undefined : value === 'true')}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Vedette" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="true">En vedette</SelectItem>
                  <SelectItem value="false">Normal</SelectItem>
                </SelectContent>
              </Select>

              {/* Mode d'affichage */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 w-8 p-0"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-8 w-8 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Clear filters */}
              {(Object.keys(filters).length > 0 || searchQuery) && (
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Effacer
                </Button>
              )}
            </div>
          </div>

          {/* Résultats */}
          <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
            <span>
              {pagination?.total || 0} {(pagination?.total || 0) === 1 ? 'élément' : 'éléments'}
              {Object.keys(filters).length > 0 || searchQuery ? ' trouvé(s)' : ' au total'}
            </span>
            {pagination && pagination.total > pagination.per_page && (
              <span>
                Page {pagination.current_page} sur {pagination.last_page}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Liste des médias */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-crec-gold mx-auto mb-4"></div>
            <p>Chargement des médias...</p>
          </div>
        </div>
      ) : items.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <FileImage className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun média trouvé</h3>
            <p className="text-gray-500 mb-4">
              {Object.keys(filters).length > 0 || searchQuery 
                ? 'Aucun média ne correspond à vos critères de recherche.'
                : 'Commencez par ajouter votre premier média à la galerie.'
              }
            </p>
            {Object.keys(filters).length === 0 && !searchQuery && (
              <Button onClick={handleAdd} className="bg-crec-gold hover:bg-crec-gold/90">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un média
              </Button>
            )}
          </CardContent>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-square">
                  {item.media_type === 'image' ? (
                    <img
                      src={item.media_url}
                      alt={item.alt_text || item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/img/placeholder-gallery.jpg';
                      }}
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <img
                        src={item.thumbnail_url || '/img/video-placeholder.jpg'}
                        alt={item.alt_text || item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="bg-white/90 rounded-full p-2">
                          <Play className="h-6 w-6 text-gray-800" />
                        </div>
                      </div>
                      {item.duration && (
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                          {formatDuration(item.duration)}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {item.is_featured && (
                      <Badge className="bg-crec-gold text-white">
                        <Star className="h-3 w-3 mr-1" />
                        Vedette
                      </Badge>
                    )}
                    {!item.is_published && (
                      <Badge variant="secondary">
                        Brouillon
                      </Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="absolute top-2 right-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="bg-white/90 hover:bg-white">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleView(item)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Voir
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(item)}>
                          <PencilIcon className="h-4 w-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDelete(item)}
                          className="text-red-600"
                        >
                          <TrashIcon className="h-4 w-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold truncate mb-1">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                      {item.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    {item.category && (
                      <Badge 
                        variant="outline" 
                        className={CATEGORIES.find(c => c.value === item.category)?.color}
                      >
                        {CATEGORIES.find(c => c.value === item.category)?.label || item.category}
                      </Badge>
                    )}
                    <span className="text-xs text-gray-500">
                      {new Date(item.created_at).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        // Vue liste
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {items.map((item) => (
                <div key={item.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 flex-shrink-0">
                    {item.media_type === 'image' ? (
                      <img
                        src={item.media_url}
                        alt={item.alt_text || item.title}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <div className="relative w-full h-full">
                        <img
                          src={item.thumbnail_url || '/img/video-placeholder.jpg'}
                          alt={item.alt_text || item.title}
                          className="w-full h-full object-cover rounded"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Informations */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{item.title}</h3>
                        {item.description && (
                          <p className="text-sm text-gray-600 line-clamp-1 mt-1">
                            {item.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                          <span className="flex items-center">
                            {item.media_type === 'image' ? (
                              <Image className="h-3 w-3 mr-1" />
                            ) : (
                              <Video className="h-3 w-3 mr-1" />
                            )}
                            {item.media_type === 'image' ? 'Image' : 'Vidéo'}
                          </span>
                          {item.file_size && (
                            <span>• {formatFileSize(item.file_size)}</span>
                          )}
                          {item.dimensions && (
                            <span>• {item.dimensions}</span>
                          )}
                          {item.duration && (
                            <span>• {formatDuration(item.duration)}</span>
                          )}
                        </div>
                      </div>

                      {/* Badges et actions */}
                      <div className="flex items-center gap-2 ml-4">
                        <div className="flex flex-col gap-1">
                          {item.is_featured && (
                            <Badge className="bg-crec-gold text-white text-xs">
                              <Star className="h-3 w-3 mr-1" />
                              Vedette
                            </Badge>
                          )}
                          {!item.is_published && (
                            <Badge variant="secondary" className="text-xs">
                              Brouillon
                            </Badge>
                          )}
                          {item.category && (
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${CATEGORIES.find(c => c.value === item.category)?.color}`}
                            >
                              {CATEGORIES.find(c => c.value === item.category)?.label || item.category}
                            </Badge>
                          )}
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleView(item)}>
                              <Eye className="h-4 w-4 mr-2" />
                              Voir
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(item)}>
                              <PencilIcon className="h-4 w-4 mr-2" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDelete(item)}
                              className="text-red-600"
                            >
                              <TrashIcon className="h-4 w-4 mr-2" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {pagination && pagination.last_page > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Affichage de {pagination.from} à {pagination.to} sur {pagination.total} éléments
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Précédent
            </Button>
            <span className="text-sm">
              Page {pagination.current_page} sur {pagination.last_page}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === pagination.last_page}
            >
              Suivant
            </Button>
          </div>
        </div>
      )}

      {/* Dialog Ajout/Modification */}
      <Dialog open={isItemDialogOpen} onOpenChange={setIsItemDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedItem ? 'Modifier le média' : 'Ajouter un média'}
            </DialogTitle>
            <DialogDescription>
              Remplissez les informations du média à {selectedItem ? 'modifier' : 'ajouter'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upload et prévisualisation */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="media_file">Fichier média *</Label>
                <input
                  id="media_file"
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  title="Sélectionner un fichier média"
                  className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-crec-gold/10 file:text-crec-gold hover:file:bg-crec-gold/20 mt-1 ${
                    (!selectedFile && !selectedItem) ? 'border border-red-300 rounded-md' : ''
                  }`}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Images: JPG, PNG, GIF, WebP • Vidéos: MP4, WebM, MOV, AVI (max 200MB)
                </p>
                
                {/* Avertissement pour les gros fichiers */}
                {selectedFile && selectedFile.size > 50 * 1024 * 1024 && (
                  <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-700">
                    ⚠️ Fichier volumineux ({(selectedFile.size / (1024 * 1024)).toFixed(1)} MB) - 
                    L'upload peut prendre plusieurs minutes. Veuillez patienter après avoir cliqué sur "Ajouter".
                  </div>
                )}
              </div>

              {/* Prévisualisation */}
              {previewUrl && (
                <div className="border rounded-lg p-4 bg-gray-50">
                  <Label className="text-sm font-medium mb-2 block">Prévisualisation</Label>
                  {selectedFile?.type.startsWith('video/') || (!selectedFile && selectedItem?.media_type === 'video') ? (
                    <video
                      src={previewUrl}
                      controls
                      className="w-full max-h-64 rounded"
                    />
                  ) : (
                    <img
                      src={previewUrl}
                      alt="Prévisualisation"
                      className="w-full max-h-64 object-contain rounded"
                    />
                  )}
                </div>
              )}
            </div>

            {/* Formulaire */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Titre *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Titre du média"
                  required
                  className={!formData.title?.trim() ? 'border-red-300 focus:border-red-500' : ''}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Description du média"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="category">Catégorie *</Label>
                {/* Select HTML natif avec accessibilité complète */}
                <select
                  id="category"
                  name="category"
                  title="Sélectionner une catégorie pour le média"
                  aria-label="Sélectionner une catégorie pour le média"
                  aria-describedby="category-help"
                  value={formData.category || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  required
                >
                  <option value="">Sélectionnez une catégorie</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                  <option value="custom">✨ Créer une nouvelle catégorie</option>
                </select>
                
                {/* Champ pour catégorie personnalisée */}
                {formData.category === 'custom' && (
                  <div className="mt-2">
                    <Input
                      placeholder="Nom de la nouvelle catégorie"
                      value={formData.customCategory || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, customCategory: e.target.value }))}
                      className="w-full"
                      aria-label="Nom de la nouvelle catégorie personnalisée"
                    />
                    <p className="text-xs text-gray-500 mt-1" id="category-help">
                      Cette catégorie sera créée automatiquement
                    </p>
                  </div>
                )}
                
                {/* Debug: Affichage du nombre de catégories */}
                <div className="text-xs text-gray-500 mt-1" id="category-help">
                  {CATEGORIES.length} catégories prédéfinies disponibles
                </div>
              </div>

              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={Array.isArray(formData.tags) ? formData.tags.join(', ') : ''}
                  onChange={(e) => {
                    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
                    setFormData(prev => ({ ...prev, tags }));
                  }}
                  placeholder="tag1, tag2, tag3"
                />
                <p className="text-xs text-gray-500 mt-1">Séparez les tags par des virgules</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Lieu</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Lieu de prise"
                  />
                </div>

                <div>
                  <Label htmlFor="capture_date">Date de capture</Label>
                  <Input
                    id="capture_date"
                    type="date"
                    value={formData.capture_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, capture_date: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="alt_text">Texte alternatif</Label>
                <Input
                  id="alt_text"
                  value={formData.alt_text}
                  onChange={(e) => setFormData(prev => ({ ...prev, alt_text: e.target.value }))}
                  placeholder="Description pour l'accessibilité"
                />
                <p className="text-xs text-gray-500 mt-1">Recommandé pour l'accessibilité</p>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_published"
                    checked={formData.is_published}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_published: checked }))}
                  />
                  <Label htmlFor="is_published">Publié</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
                  />
                  <Label htmlFor="is_featured">En vedette</Label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            {/* Message d'aide pour les champs requis */}
            {(!formData.title?.trim() || 
              !formData.category || 
              (formData.category === 'custom' && !formData.customCategory?.trim()) ||
              (!selectedFile && !selectedItem)) && (
              <div className="w-full mb-4">
                <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
                  Champs requis manquants : 
                  {!formData.title?.trim() && ' Titre'}
                  {!formData.category && ' Catégorie'}
                  {formData.category === 'custom' && !formData.customCategory?.trim() && ' Nom de catégorie personnalisée'}
                  {(!selectedFile && !selectedItem) && ' Fichier média'}
                </div>
              </div>
            )}
            
            <Button variant="outline" onClick={() => setIsItemDialogOpen(false)}>
              Annuler
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={
                isCreating || 
                isUpdating || 
                isUploading ||
                !formData.title?.trim() || 
                !formData.category || 
                (formData.category === 'custom' && !formData.customCategory?.trim()) ||
                (!selectedFile && !selectedItem)
              }
              className="bg-crec-gold hover:bg-crec-gold/90"
            >
              {isCreating || isUpdating || isUploading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  {isUploading ? `Upload... ${uploadProgress}%` : selectedItem ? 'Modification...' : 'Ajout...'}
                </>
              ) : (
                selectedItem ? 'Modifier' : 'Ajouter'
              )}
            </Button>
            
            {/* Barre de progression pour les uploads */}
            {isUploading && (
              <div className="w-full mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Upload en cours...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-crec-gold h-2 rounded-full transition-all duration-300"
                    {...{ style: { width: `${uploadProgress}%` } }}
                  ></div>
                </div>
                {selectedFile && (
                  <div className="text-xs text-gray-500 mt-1">
                    Fichier: {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(1)} MB)
                  </div>
                )}
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Suppression */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer "{selectedItem?.title}" ? 
              Cette action est irréversible et supprimera définitivement le fichier du serveur.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Suppression...
                </>
              ) : (
                'Supprimer'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog Visualisation */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>{selectedItem?.title}</DialogTitle>
            {selectedItem?.description && (
              <DialogDescription>{selectedItem.description}</DialogDescription>
            )}
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-6">
              {/* Média */}
              <div className="bg-black rounded-lg flex items-center justify-center min-h-[400px]">
                {selectedItem.media_type === 'image' ? (
                  <img
                    src={selectedItem.media_url}
                    alt={selectedItem.alt_text || selectedItem.title}
                    className="max-w-full max-h-[400px] object-contain rounded"
                  />
                ) : (
                  <video
                    src={selectedItem.media_url}
                    controls
                    className="max-w-full max-h-[400px] rounded"
                    poster={selectedItem.thumbnail_url}
                  />
                )}
              </div>

              {/* Informations détaillées */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div>
                  <strong>Type:</strong> {selectedItem.media_type === 'image' ? 'Image' : 'Vidéo'}
                </div>
                <div>
                  <strong>Catégorie:</strong> {CATEGORIES.find(c => c.value === selectedItem.category)?.label || selectedItem.category}
                </div>
                <div>
                  <strong>Statut:</strong> {selectedItem.is_published ? 'Publié' : 'Brouillon'}
                </div>
                <div>
                  <strong>En vedette:</strong> {selectedItem.is_featured ? 'Oui' : 'Non'}
                </div>
                {selectedItem.location && (
                  <div>
                    <strong>Lieu:</strong> {selectedItem.location}
                  </div>
                )}
                {selectedItem.capture_date && (
                  <div>
                    <strong>Date:</strong> {new Date(selectedItem.capture_date).toLocaleDateString('fr-FR')}
                  </div>
                )}
                {selectedItem.file_size && (
                  <div>
                    <strong>Taille:</strong> {formatFileSize(selectedItem.file_size)}
                  </div>
                )}
                {selectedItem.dimensions && (
                  <div>
                    <strong>Dimensions:</strong> {selectedItem.dimensions}
                  </div>
                )}
                {selectedItem.duration && (
                  <div>
                    <strong>Durée:</strong> {formatDuration(selectedItem.duration)}
                  </div>
                )}
                <div>
                  <strong>Créé le:</strong> {new Date(selectedItem.created_at).toLocaleDateString('fr-FR')}
                </div>
                <div>
                  <strong>Modifié le:</strong> {new Date(selectedItem.updated_at).toLocaleDateString('fr-FR')}
                </div>
              </div>

              {/* Tags */}
              {selectedItem.tags && selectedItem.tags.length > 0 && (
                <div>
                  <strong>Tags:</strong>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedItem.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* URL du média */}
              <div>
                <strong>URL du média:</strong>
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    value={selectedItem.media_url}
                    readOnly
                    className="font-mono text-xs"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(selectedItem.media_url)}
                  >
                    Copier
                  </Button>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Fermer
            </Button>
            <Button onClick={() => {
              setIsViewDialogOpen(false);
              if (selectedItem) handleEdit(selectedItem);
            }}>
              <PencilIcon className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminGalleryPage;