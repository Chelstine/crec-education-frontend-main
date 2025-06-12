import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  GripVertical,
  Image,
  Video,
  FileText,
  Link2,
  List,
  Quote,
  Code,
  Save
} from 'lucide-react';

// Types pour les sections
interface Section {
  id: string;
  title: string;
  type: 'text' | 'image' | 'video' | 'link' | 'list' | 'quote' | 'code' | 'hero';
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  linkUrl?: string;
  linkText?: string;
  backgroundColor?: string;
  textColor?: string;
  order: number;
  visible: boolean;
  formationId?: string;
  createdAt: string;
  updatedAt: string;
}

interface SectionFormData {
  title: string;
  type: 'text' | 'image' | 'video' | 'link' | 'list' | 'quote' | 'code' | 'hero';
  content: string;
  imageUrl: string;
  videoUrl: string;
  linkUrl: string;
  linkText: string;
  backgroundColor: string;
  textColor: string;
  visible: boolean;
  formationId: string;
}

const SectionsManagement: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [formations, setFormations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFormation, setSelectedFormation] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  
  const [formData, setFormData] = useState<SectionFormData>({
    title: '',
    type: 'text',
    content: '',
    imageUrl: '',
    videoUrl: '',
    linkUrl: '',
    linkText: '',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    visible: true,
    formationId: ''
  });

  // Mock data pour les formations
  const mockFormations = [
    { id: '1', title: 'Développement Web Full Stack' },
    { id: '2', title: 'Data Science et Intelligence Artificielle' },
    { id: '3', title: 'ISTMR - Licence en Théologie' },
    { id: '4', title: 'Formation Arduino et IoT' }
  ];

  // Mock data pour les sections
  const mockSections: Section[] = [
    {
      id: '1',
      title: 'Présentation de la formation',
      type: 'hero',
      content: 'Découvrez notre formation complète en développement web moderne. Apprenez les technologies les plus demandées du marché.',
      backgroundColor: '#1e3a8a',
      textColor: '#ffffff',
      order: 1,
      visible: true,
      formationId: '1',
      createdAt: '2024-12-01',
      updatedAt: '2024-12-01'
    },
    {
      id: '2',
      title: 'Prérequis techniques',
      type: 'list',
      content: 'Connaissances de base en HTML/CSS\nNotions de JavaScript\nUtilisation d\'un éditeur de code\nCompréhension de Git',
      order: 2,
      visible: true,
      formationId: '1',
      createdAt: '2024-12-01',
      updatedAt: '2024-12-01'
    },
    {
      id: '3',
      title: 'Outils et technologies',
      type: 'image',
      content: 'Stack technologique moderne',
      imageUrl: '/img/dev-web.png',
      order: 3,
      visible: true,
      formationId: '1',
      createdAt: '2024-12-01',
      updatedAt: '2024-12-01'
    },
    {
      id: '4',
      title: 'Témoignage d\'un ancien',
      type: 'quote',
      content: 'Cette formation m\'a permis de décrocher un emploi de développeur full-stack dans une entreprise tech à Cotonou. Les projets pratiques sont excellents !',
      order: 4,
      visible: true,
      formationId: '1',
      createdAt: '2024-12-01',
      updatedAt: '2024-12-01'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormations(mockFormations);
      setSections(mockSections);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredSections = selectedFormation === 'all' 
    ? sections 
    : sections.filter(section => section.formationId === selectedFormation);

  const handleCreateSection = async () => {
    try {
      const newSection: Section = {
        id: Date.now().toString(),
        ...formData,
        order: sections.length + 1,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };

      setSections([...sections, newSection]);
      setIsCreateDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    }
  };

  const handleEditSection = async () => {
    if (!selectedSection) return;

    try {
      const updatedSection: Section = {
        ...selectedSection,
        ...formData,
        updatedAt: new Date().toISOString().split('T')[0]
      };

      setSections(sections.map(section => 
        section.id === selectedSection.id ? updatedSection : section
      ));
      setIsEditDialogOpen(false);
      setSelectedSection(null);
      resetForm();
    } catch (error) {
      console.error('Erreur lors de la modification:', error);
    }
  };

  const handleDeleteSection = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette section ?')) {
      try {
        setSections(sections.filter(section => section.id !== id));
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(filteredSections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedSections = items.map((item, index) => ({
      ...item,
      order: index + 1
    }));

    setSections(prevSections => {
      return prevSections.map(section => {
        const updated = updatedSections.find(s => s.id === section.id);
        return updated || section;
      });
    });
  };

  const openEditDialog = (section: Section) => {
    setSelectedSection(section);
    setFormData({
      title: section.title,
      type: section.type,
      content: section.content,
      imageUrl: section.imageUrl || '',
      videoUrl: section.videoUrl || '',
      linkUrl: section.linkUrl || '',
      linkText: section.linkText || '',
      backgroundColor: section.backgroundColor || '#ffffff',
      textColor: section.textColor || '#000000',
      visible: section.visible,
      formationId: section.formationId || ''
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      type: 'text',
      content: '',
      imageUrl: '',
      videoUrl: '',
      linkUrl: '',
      linkText: '',
      backgroundColor: '#ffffff',
      textColor: '#000000',
      visible: true,
      formationId: selectedFormation === 'all' ? '' : selectedFormation
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hero': return <Image className="w-4 h-4" />;
      case 'text': return <FileText className="w-4 h-4" />;
      case 'list': return <List className="w-4 h-4" />;
      case 'quote': return <Quote className="w-4 h-4" />;
      case 'image': return <Image className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'link': return <Link2 className="w-4 h-4" />;
      case 'code': return <Code className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const renderSectionPreview = (section: Section) => {
    switch (section.type) {
      case 'hero':
        // Génère une classe CSS unique pour chaque combinaison de couleurs
        const bgColor = section.backgroundColor || '#1e3a8a';
        const textColor = section.textColor || '#ffffff';
        const colorKey = `${bgColor}-${textColor}`.replace(/[^a-z0-9]/gi, '');
        const heroClassName = `hero-preview-${colorKey}`;
        
        // Ajoute le style CSS si pas déjà présent
        if (typeof window !== 'undefined' && !document.getElementById(heroClassName)) {
          const style = document.createElement('style');
          style.id = heroClassName;
          style.innerHTML = `.${heroClassName} { background-color: ${bgColor}; color: ${textColor}; }`;
          document.head.appendChild(style);
        }
        
        return (
          <div 
            className={`h-32 rounded-lg flex items-center justify-center p-4 text-center ${heroClassName}`}
          >
            <div>
              <h2 className="text-xl font-bold mb-2">{section.title}</h2>
              <p className="text-sm">{section.content}</p>
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">{section.title}</h3>
            <p className="text-sm text-gray-700 line-clamp-3">{section.content}</p>
          </div>
        );

      case 'list':
        return (
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">{section.title}</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              {section.content.split('\n').slice(0, 3).map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
              {section.content.split('\n').length > 3 && (
                <li className="text-gray-500">...</li>
              )}
            </ul>
          </div>
        );

      case 'quote':
        return (
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">{section.title}</h3>
            <blockquote className="border-l-4 border-crec-gold pl-3 text-sm italic">
              "{section.content.substring(0, 100)}..."
            </blockquote>
          </div>
        );

      case 'image':
        return (
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">{section.title}</h3>
            <div className="w-full h-24 bg-gray-200 rounded flex items-center justify-center">
              <Image className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{section.content}</p>
          </div>
        );

      case 'video':
        return (
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">{section.title}</h3>
            <div className="w-full h-24 bg-gray-200 rounded flex items-center justify-center">
              <Video className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{section.content}</p>
          </div>
        );

      case 'link':
        return (
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">{section.title}</h3>
            <div className="flex items-center text-blue-600 text-sm">
              <Link2 className="w-4 h-4 mr-2" />
              {section.linkText || 'Lien externe'}
            </div>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{section.content}</p>
          </div>
        );

      case 'code':
        return (
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">{section.title}</h3>
            <div className="bg-gray-900 text-green-400 p-2 rounded text-xs font-mono">
              <Code className="w-4 h-4 inline mr-2" />
              Code snippet...
            </div>
          </div>
        );

      default:
        return (
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">{section.title}</h3>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Sections</h1>
          <p className="text-gray-600 mt-1">Créez et organisez le contenu de vos pages</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            {previewMode ? 'Mode Édition' : 'Mode Aperçu'}
          </Button>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-crec-gold hover:bg-crec-lightgold"
                onClick={resetForm}
              >
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle Section
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Créer une nouvelle section</DialogTitle>
                <DialogDescription>
                  Ajoutez du contenu interactif à vos pages de formation
                </DialogDescription>
              </DialogHeader>
              
              <SectionForm formData={formData} setFormData={setFormData} formations={formations} />
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleCreateSection} className="bg-crec-gold hover:bg-crec-lightgold">
                  <Save className="mr-2 h-4 w-4" />
                  Créer la section
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* Filtres */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filtres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1 max-w-xs">
                <Label htmlFor="formation-filter">Formation</Label>
                <Select value={selectedFormation} onValueChange={setSelectedFormation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les formations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les formations</SelectItem>
                    {formations.map((formation) => (
                      <SelectItem key={formation.id} value={formation.id}>
                        {formation.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="text-sm text-gray-600">
                {filteredSections.length} section(s) trouvée(s)
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Liste des sections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GripVertical className="h-5 w-5" />
              Sections 
              {selectedFormation !== 'all' && formations.find(f => f.id === selectedFormation) && (
                <Badge variant="outline" className="ml-2">
                  {formations.find(f => f.id === selectedFormation)?.title}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredSections.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Aucune section trouvée.</p>
                <p className="text-sm">Créez votre première section pour commencer.</p>
              </div>
            ) : (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="sections">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4"
                    >
                      {filteredSections
                        .sort((a, b) => a.order - b.order)
                        .map((section, index) => (
                          <Draggable
                            key={section.id}
                            draggableId={section.id}
                            index={index}
                            isDragDisabled={previewMode}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={`bg-white border rounded-lg shadow-sm transition-shadow ${
                                  snapshot.isDragging ? 'shadow-lg' : 'hover:shadow-md'
                                } ${!section.visible ? 'opacity-50' : ''}`}
                              >
                                <div className="p-4">
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                      {!previewMode && (
                                        <div
                                          {...provided.dragHandleProps}
                                          className="cursor-grab hover:cursor-grabbing"
                                        >
                                          <GripVertical className="h-5 w-5 text-gray-400" />
                                        </div>
                                      )}
                                      
                                      <div className="flex items-center gap-2">
                                        <Badge className="flex items-center gap-1">
                                          {getTypeIcon(section.type)}
                                          {section.type}
                                        </Badge>
                                        <span className="font-medium">{section.title}</span>
                                      </div>
                                      
                                      {!section.visible && (
                                        <Badge variant="secondary" className="text-xs">
                                          Masqué
                                        </Badge>
                                      )}
                                    </div>
                                    
                                    {!previewMode && (
                                      <div className="flex items-center gap-2">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => openEditDialog(section)}
                                        >
                                          <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => handleDeleteSection(section.id)}
                                          className="text-red-600 hover:text-red-700"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                  
                                  {/* Aperçu de la section */}
                                  <div className="mt-3">
                                    {renderSectionPreview(section)}
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Dialog d'édition */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier la section</DialogTitle>
            <DialogDescription>
              Modifiez le contenu de votre section
            </DialogDescription>
          </DialogHeader>
          
          <SectionForm formData={formData} setFormData={setFormData} formations={formations} />
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleEditSection} className="bg-crec-gold hover:bg-crec-lightgold">
              <Save className="mr-2 h-4 w-4" />
              Sauvegarder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Composant du formulaire de section
const SectionForm: React.FC<{
  formData: SectionFormData;
  setFormData: React.Dispatch<React.SetStateAction<SectionFormData>>;
  formations: any[];
}> = ({ formData, setFormData, formations }) => {
  return (
    <div className="space-y-6">
      {/* Informations de base */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Titre de la section *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Ex: Présentation de la formation"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="type">Type de contenu *</Label>
            <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hero">Hero/Bannière</SelectItem>
                <SelectItem value="text">Texte</SelectItem>
                <SelectItem value="list">Liste</SelectItem>
                <SelectItem value="quote">Citation</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="video">Vidéo</SelectItem>
                <SelectItem value="link">Lien</SelectItem>
                <SelectItem value="code">Code</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="formation">Formation associée</Label>
            <Select value={formData.formationId} onValueChange={(value) => setFormData({ ...formData, formationId: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une formation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Aucune formation</SelectItem>
                {formations.map((formation) => (
                  <SelectItem key={formation.id} value={formation.id}>
                    {formation.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div>
        <Label htmlFor="content">Contenu *</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder={
            formData.type === 'list' 
              ? "Élément 1\nÉlément 2\nÉlément 3"
              : formData.type === 'code'
              ? "console.log('Hello World');"
              : "Contenu de la section..."
          }
          rows={formData.type === 'hero' ? 3 : formData.type === 'code' ? 8 : 5}
        />
      </div>

      {/* Champs spécifiques selon le type */}
      {formData.type === 'image' && (
        <div>
          <Label htmlFor="imageUrl">URL de l'image</Label>
          <Input
            id="imageUrl"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />
        </div>
      )}

      {formData.type === 'video' && (
        <div>
          <Label htmlFor="videoUrl">URL de la vidéo</Label>
          <Input
            id="videoUrl"
            value={formData.videoUrl}
            onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
            placeholder="https://youtube.com/watch?v=..."
          />
        </div>
      )}

      {formData.type === 'link' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="linkUrl">URL du lien</Label>
            <Input
              id="linkUrl"
              value={formData.linkUrl}
              onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
              placeholder="https://example.com"
            />
          </div>
          <div>
            <Label htmlFor="linkText">Texte du lien</Label>
            <Input
              id="linkText"
              value={formData.linkText}
              onChange={(e) => setFormData({ ...formData, linkText: e.target.value })}
              placeholder="Cliquez ici"
            />
          </div>
        </div>
      )}

      {formData.type === 'hero' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="backgroundColor">Couleur de fond</Label>
            <Input
              id="backgroundColor"
              type="color"
              value={formData.backgroundColor}
              onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="textColor">Couleur du texte</Label>
            <Input
              id="textColor"
              type="color"
              value={formData.textColor}
              onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
            />
          </div>
        </div>
      )}

      {/* Visibilité */}
      <div className="flex items-center space-x-2">
        <input
          id="visible"
          type="checkbox"
          checked={formData.visible}
          onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
          className="rounded border-gray-300"
          title="Visibilité de la section"
          aria-label="Rendre cette section visible"
        />
        <Label htmlFor="visible">Section visible</Label>
      </div>
    </div>
  );
};

export default SectionsManagement;
