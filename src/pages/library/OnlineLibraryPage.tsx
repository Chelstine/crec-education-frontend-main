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
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Search,
  FileText,
  Download,
  BookMarked,
  Bookmark,
  Clock,
  Filter,
  ChevronDown,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Resource {
  id: string;
  title: string;
  author: string;
  type: 'book' | 'article' | 'document';
  categories: string[];
  description: string;
  coverUrl: string;
  downloadUrl: string;
  dateAdded: string;
  language: string;
  format: string;
  pages?: number;
  featured?: boolean;
}

const OnlineLibraryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  
  // Données de ressources fictives pour la bibliothèque
  const resources: Resource[] = [
    {
      id: '1',
      title: "Intelligence artificielle et éthique",
      author: "Prof. Marie Dupont",
      type: 'book',
      categories: ['informatique', 'éthique'],
      description: "Une exploration des défis éthiques posés par le développement de l'intelligence artificielle dans notre société moderne.",
      coverUrl: "/img/books/ai-ethics.jpg",
      downloadUrl: "#",
      dateAdded: "2024-03-15",
      language: "Français",
      format: "PDF",
      pages: 248,
      featured: true
    },
    {
      id: '2',
      title: "Éducation et technologies numériques",
      author: "Dr. Jean Kouassi",
      type: 'book',
      categories: ['éducation', 'technologie'],
      description: "Comment les technologies numériques transforment l'enseignement et l'apprentissage en Afrique.",
      coverUrl: "/img/books/education-tech.jpg",
      downloadUrl: "#",
      dateAdded: "2024-02-20",
      language: "Français",
      format: "PDF",
      pages: 186
    },
    {
      id: '3',
      title: "Introduction à la programmation Python",
      author: "Alice Koffi",
      type: 'book',
      categories: ['informatique', 'programmation'],
      description: "Un guide pour débutants pour apprendre à programmer en Python, avec des exemples pratiques et des exercices.",
      coverUrl: "/img/books/python-intro.jpg",
      downloadUrl: "#",
      dateAdded: "2024-01-10",
      language: "Français",
      format: "PDF",
      pages: 320
    },
    {
      id: '4',
      title: "Les fondements de l'entrepreneuriat social",
      author: "Pierre Mensah",
      type: 'book',
      categories: ['business', 'social'],
      description: "Un ouvrage complet sur les principes et pratiques de l'entrepreneuriat social en Afrique de l'Ouest.",
      coverUrl: "/img/books/social-entrepreneurship.jpg",
      downloadUrl: "#",
      dateAdded: "2023-11-05",
      language: "Français",
      format: "PDF",
      pages: 275
    },
    {
      id: '5',
      title: "Analyse de données avec R",
      author: "Dr. Samuel Osei",
      type: 'article',
      categories: ['informatique', 'statistiques'],
      description: "Un article détaillé sur l'utilisation du langage R pour l'analyse statistique et la visualisation de données.",
      coverUrl: "/img/books/data-analysis.jpg",
      downloadUrl: "#",
      dateAdded: "2023-09-18",
      language: "Anglais",
      format: "PDF",
      pages: 42
    },
    {
      id: '6',
      title: "Conception et impression 3D pour débutants",
      author: "Kofi Mensah",
      type: 'document',
      categories: ['fablab', 'technologie'],
      description: "Guide pratique pour comprendre les bases de la modélisation 3D et l'utilisation d'imprimantes 3D.",
      coverUrl: "/img/books/3d-printing.jpg",
      downloadUrl: "#",
      dateAdded: "2023-08-22",
      language: "Français",
      format: "PDF",
      pages: 65
    },
    {
      id: '7',
      title: "L'histoire des jésuites en Afrique de l'Ouest",
      author: "Père François Adihou",
      type: 'book',
      categories: ['histoire', 'religion'],
      description: "Une chronique détaillée de l'établissement et du développement des missions jésuites en Afrique occidentale.",
      coverUrl: "/img/books/jesuits-history.jpg",
      downloadUrl: "#",
      dateAdded: "2023-07-14",
      language: "Français",
      format: "PDF",
      pages: 412,
      featured: true
    },
    {
      id: '8',
      title: "Développement durable et énergie renouvelable",
      author: "Dr. Aminata Diallo",
      type: 'book',
      categories: ['environnement', 'technologie'],
      description: "Exploration des solutions énergétiques durables pour le développement en Afrique subsaharienne.",
      coverUrl: "/img/books/renewable-energy.jpg",
      downloadUrl: "#",
      dateAdded: "2023-05-30",
      language: "Français",
      format: "PDF",
      pages: 298
    }
  ];

  // Extraction des catégories uniques
  const categories = ['all', ...Array.from(new Set(resources.flatMap(r => r.categories)))];
  
  // Types de ressources
  const resourceTypes = [
    { value: 'all', label: 'Tous les types' },
    { value: 'book', label: 'Livres' },
    { value: 'article', label: 'Articles' },
    { value: 'document', label: 'Documents' }
  ];

  // Filtrer les ressources
  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchTerm === '' || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = selectedCategory === 'all' || 
      resource.categories.includes(selectedCategory);
      
    const matchesType = selectedType === 'all' || 
      resource.type === selectedType;
      
    return matchesSearch && matchesCategory && matchesType;
  });
  
  // Séparer les ressources en vedette
  const featuredResources = filteredResources.filter(r => r.featured);
  const regularResources = filteredResources.filter(r => !r.featured);

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
                          {category === 'all' ? 'Toutes les catégories' : category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-[180px]">
                      <div className="flex items-center gap-2">
                        <FileText size={16} />
                        <SelectValue placeholder="Type" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {resourceTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Ressources en vedette */}
            {featuredResources.length > 0 && (
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpenCheck className="text-crec-gold" size={24} />
                  <h2 className="text-2xl font-bold">En vedette</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredResources.map(resource => (
                    <Card key={resource.id} className="overflow-hidden flex flex-col md:flex-row">
                      <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-4">
                        <div className="relative w-32 h-48 mx-auto">
                          <div 
                            className="absolute inset-0 shadow-md" 
                            style={{ 
                              backgroundImage: `url(${resource.coverUrl})`, 
                              backgroundSize: 'cover',
                              backgroundPosition: 'center'
                            }}
                          ></div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{resource.title}</CardTitle>
                              <CardDescription className="mt-1">{resource.author}</CardDescription>
                            </div>
                            <Badge variant={
                              resource.type === 'book' ? 'default' :
                              resource.type === 'article' ? 'secondary' : 'outline'
                            }>
                              {resource.type === 'book' ? 'Livre' : 
                               resource.type === 'article' ? 'Article' : 'Document'}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 line-clamp-3 mb-4">{resource.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {resource.categories.map(category => (
                              <Badge key={category} variant="outline" className="bg-crec-light text-crec-dark border-crec-light">
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                          <div className="text-sm text-gray-500">
                            <span>{resource.language}</span>
                            <span className="mx-2">•</span>
                            <span>{resource.format}</span>
                            {resource.pages && (
                              <>
                                <span className="mx-2">•</span>
                                <span>{resource.pages} pages</span>
                              </>
                            )}
                          </div>
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <Download size={16} />
                            Télécharger
                          </Button>
                        </CardFooter>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {/* Toutes les ressources */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BookMarked className="text-crec-gold" size={24} />
                  <h2 className="text-2xl font-bold">Ressources</h2>
                </div>
                <div className="text-sm text-gray-500">
                  {filteredResources.length} ressource(s) trouvée(s)
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {regularResources.length > 0 ? regularResources.map(resource => (
                  <Card key={resource.id} className="overflow-hidden flex flex-col h-full">
                    <div className="h-48 bg-gray-100 flex items-center justify-center">
                      <div className="relative w-32 h-40 shadow-md">
                        <div 
                          className="absolute inset-0" 
                          style={{ 
                            backgroundImage: `url(${resource.coverUrl})`, 
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        ></div>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Bookmark size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ajouter aux favoris</DropdownMenuItem>
                            <DropdownMenuItem>Partager</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription>{resource.author}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex gap-2 mb-2">
                        <Badge variant={
                          resource.type === 'book' ? 'default' :
                          resource.type === 'article' ? 'secondary' : 'outline'
                        }>
                          {resource.type === 'book' ? 'Livre' : 
                           resource.type === 'article' ? 'Article' : 'Document'}
                        </Badge>
                        <Badge variant="outline" className="bg-crec-light text-crec-dark border-crec-light">
                          {resource.categories[0].charAt(0).toUpperCase() + resource.categories[0].slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-3">{resource.description}</p>
                    </CardContent>
                    <CardFooter className="mt-auto pt-4">
                      <Button variant="default" className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Télécharger
                      </Button>
                    </CardFooter>
                  </Card>
                )) : (
                  <div className="col-span-full text-center py-12">
                    <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">Aucune ressource trouvée</h3>
                    <p className="text-gray-500 mt-2">Essayez de modifier vos critères de recherche</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="collections">
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <BookMarked className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Collections disponibles prochainement</h3>
              <p className="text-gray-500 mt-2 max-w-md mx-auto">
                Cette fonctionnalité sera disponible dans une prochaine mise à jour. 
                Vous pourrez organiser vos ressources par thèmes et domaines d'intérêt.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="recent">
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <Clock className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Historique de consultation</h3>
              <p className="text-gray-500 mt-2 max-w-md mx-auto">
                Cette fonctionnalité sera disponible dans une prochaine mise à jour. 
                Vous pourrez retrouver ici les ressources que vous avez récemment consultées.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OnlineLibraryPage;
