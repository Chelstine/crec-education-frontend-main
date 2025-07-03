import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Search,
  FileText,
  Download,
  BookMarked,
  Clock,
  Filter,
  BookOpenCheck,
  LibraryBig,
  Tag
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LibraryResource } from "@/types";
import { useLibraryResources } from "@/hooks/useApi";

// Composant pour afficher une ressource individuelle
interface ResourceCardProps {
  resource: LibraryResource;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const getResourceIcon = (type: string) => {
    switch(type) {
      case 'BOOK':
        return <BookOpen className="w-5 h-5" />;
      case 'ARTICLE':
        return <FileText className="w-5 h-5" />;
      case 'DOCUMENT':
        return <FileText className="w-5 h-5" />;
      case 'VIDEO':
        return <BookMarked className="w-5 h-5" />;
      case 'AUDIO':
        return <BookMarked className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 h-full">
      <div className="relative">
        <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg flex items-center justify-center">
          {getResourceIcon(resource.type)}
        </div>
        {resource.isDigital && (
          <Badge className="absolute top-2 right-2 bg-green-500 text-white">
            Numérique
          </Badge>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg line-clamp-2 flex-1">
            {resource.title}
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            {resource.type}
          </Badge>
        </div>
        <CardDescription className="text-sm text-gray-600">
          Par {resource.author}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-4">
        <p className="text-sm text-gray-700 line-clamp-3 mb-4">
          {resource.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>{resource.category}</span>
          {resource.publicationYear && <span>{resource.publicationYear}</span>}
        </div>
        
        {resource.publisher && (
          <div className="text-xs text-gray-500">
            Éditeur: {resource.publisher}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="flex gap-2 w-full">
          {resource.readOnlineUrl && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => window.open(resource.readOnlineUrl, '_blank')}
            >
              <BookOpen className="w-4 h-4 mr-1" />
              Lire
            </Button>
          )}
          {resource.downloadUrl && (
            <Button 
              variant="default" 
              size="sm" 
              className="flex-1"
              onClick={() => {
                const link = document.createElement('a');
                link.href = resource.downloadUrl!;
                link.download = resource.title;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download className="w-4 h-4 mr-1" />
              Télécharger
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

const OnlineLibraryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  
  // Utiliser le hook pour récupérer les ressources
  const { data: resources = [], isLoading, error } = useLibraryResources();
  
  // Catégories disponibles
  const categories = [
    'all',
    'INFORMATIQUE',
    'THEOLOGIE',
    'DEVELOPPEMENT',
    'EDUCATION',
    'SCIENCES',
    'LANGUES'
  ];
  
  // Types de ressources disponibles
  const resourceTypes = [
    'all',
    'BOOK',
    'ARTICLE',
    'DOCUMENT',
    'VIDEO',
    'AUDIO',
    'RESEARCH'
  ];
  
  // Filtrer les ressources
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType && resource.isAvailable;
  });
  
  // Séparer les ressources numériques des autres
  const digitalResources = filteredResources.filter(resource => resource.isDigital);
  const physicalResources = filteredResources.filter(resource => !resource.isDigital);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des ressources...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Erreur lors du chargement des ressources.</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <LibraryBig className="h-10 w-10 text-crec-gold mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">Bibliothèque en ligne</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Accédez à notre collection de ressources numériques, incluant des livres, articles et documents pour enrichir votre apprentissage.
          </p>
        </div>

        <Tabs defaultValue="browse" className="mb-8">
          <div className="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="browse" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Parcourir
              </TabsTrigger>
              <TabsTrigger value="collections" className="flex items-center gap-2">
                <BookMarked className="h-4 w-4" />
                Collections
              </TabsTrigger>
              <TabsTrigger value="recent" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Récents
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="browse">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Rechercher par titre, auteur ou mot-clé..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[180px]">
                      <div className="flex items-center gap-2">
                        <Tag size={16} />
                        <SelectValue placeholder="Catégorie" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category === 'all' ? 'Toutes les catégories' : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-[150px]">
                      <div className="flex items-center gap-2">
                        <Filter size={16} />
                        <SelectValue placeholder="Type" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {resourceTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {type === 'all' ? 'Tous les types' : type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Résultats de la recherche */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">
                {filteredResources.length} ressource{filteredResources.length > 1 ? 's' : ''} trouvée{filteredResources.length > 1 ? 's' : ''}
              </h2>
              
              {/* Ressources numériques */}
              {digitalResources.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <BookOpenCheck className="h-5 w-5 text-green-600" />
                    Ressources numériques
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {digitalResources.map(resource => (
                      <ResourceCard key={resource.id} resource={resource} />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Ressources physiques */}
              {physicalResources.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Ressources physiques</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {physicalResources.map(resource => (
                      <ResourceCard key={resource.id} resource={resource} />
                    ))}
                  </div>
                </div>
              )}
              
              {filteredResources.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Aucune ressource trouvée pour votre recherche.</p>
                  <p className="text-gray-400 text-sm mt-2">Essayez avec des termes différents ou modifiez les filtres.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="collections">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.filter(cat => cat !== 'all').map(category => (
                <Card key={category} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookMarked className="h-5 w-5 text-crec-gold" />
                      {category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      {resources.filter(r => r.category === category).length} ressource{resources.filter(r => r.category === category).length > 1 ? 's' : ''}
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setSelectedCategory(category);
                        // Changer vers l'onglet browse
                        const browseTab = document.querySelector('[value="browse"]') as HTMLElement;
                        browseTab?.click();
                      }}
                    >
                      Parcourir
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 6)
                .map(resource => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OnlineLibraryPage;
