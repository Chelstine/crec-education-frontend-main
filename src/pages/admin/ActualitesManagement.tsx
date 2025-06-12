import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  FileText,
  Calendar,
  Users,
  TrendingUp,
  Star,
  Image,
  Video,
  ExternalLink,
  MessageSquare,
  Heart,
  Share
} from 'lucide-react';

// Types pour les actualités
interface Actualite {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  type: 'article' | 'news' | 'announcement' | 'event' | 'press';
  author: string;
  publishDate: string;
  lastModified: string;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  tags: string[];
  readCount: number;
  likes: number;
  comments: number;
  image?: string;
  imageCaption?: string;
  videoUrl?: string;
  externalLink?: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  createdAt: string;
  updatedAt: string;
}

const ActualitesManagement: React.FC = () => {
  const [actualites, setActualites] = useState<Actualite[]>([]);
  const [filteredActualites, setFilteredActualites] = useState<Actualite[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Mock data pour les actualités
  const mockActualites: Actualite[] = [
    {
      id: '1',
      title: 'CREC accueille la Conférence Internationale sur la Théologie Africaine',
      excerpt: 'Du 15 au 17 mars 2025, le CREC organise une conférence majeure réunissant des théologiens de toute l\'Afrique pour explorer les défis contemporains de la théologie africaine.',
      content: 'Le Centre de Recherche et d\'Éducation CREC s\'apprête à accueillir...',
      category: 'Événements',
      type: 'news',
      author: 'Équipe Communication CREC',
      publishDate: '2024-12-20',
      lastModified: '2024-12-20',
      status: 'published',
      featured: true,
      tags: ['théologie', 'conférence', 'Afrique', 'recherche'],
      readCount: 1250,
      likes: 89,
      comments: 23,
      image: '/images/news/conference-theologie-africaine.jpg',
      imageCaption: 'Préparatifs de la conférence internationale',
      seo: {
        metaTitle: 'Conférence Internationale Théologie Africaine - CREC 2025',
        metaDescription: 'Découvrez la conférence internationale sur la théologie africaine organisée par le CREC du 15 au 17 mars 2025.',
        keywords: ['théologie africaine', 'conférence', 'CREC', 'recherche', 'Afrique']
      },
      createdAt: '2024-12-15',
      updatedAt: '2024-12-20'
    },
    {
      id: '2',
      title: 'Lancement du nouveau programme FabLab pour les jeunes entrepreneurs',
      excerpt: 'Le CREC inaugure son programme FabLab spécialement conçu pour accompagner les jeunes dans leurs projets entrepreneuriaux innovants.',
      content: 'Dans le cadre de sa mission de formation et d\'accompagnement...',
      category: 'Formation',
      type: 'announcement',
      author: 'Dr. Kokou ADJANON',
      publishDate: '2024-12-18',
      lastModified: '2024-12-19',
      status: 'published',
      featured: true,
      tags: ['fablab', 'entrepreneuriat', 'innovation', 'jeunes'],
      readCount: 890,
      likes: 67,
      comments: 15,
      image: '/images/news/fablab-entrepreneurs.jpg',
      imageCaption: 'Atelier FabLab en action',
      videoUrl: 'https://youtube.com/watch?v=fablab-demo',
      seo: {
        metaTitle: 'Programme FabLab Entrepreneurs - CREC Innovation',
        metaDescription: 'Nouveau programme FabLab du CREC pour accompagner les jeunes entrepreneurs dans leurs projets innovants.',
        keywords: ['fablab', 'entrepreneuriat', 'CREC', 'innovation', 'formation']
      },
      createdAt: '2024-12-10',
      updatedAt: '2024-12-19'
    },
    {
      id: '3',
      title: 'Succès de la Journée Culturelle Ignatienne 2024',
      excerpt: 'Plus de 500 participants ont célébré la richesse culturelle de la famille ignatienne lors de cette journée exceptionnelle.',
      content: 'La Journée Culturelle Ignatienne 2024 a été un franc succès...',
      category: 'Vie du Campus',
      type: 'article',
      author: 'Équipe Pastorale CREC',
      publishDate: '2024-12-01',
      lastModified: '2024-12-01',
      status: 'published',
      featured: false,
      tags: ['culture', 'ignatien', 'célébration', 'communauté'],
      readCount: 654,
      likes: 98,
      comments: 31,
      image: '/images/news/journee-culturelle-2024.jpg',
      imageCaption: 'Spectacle lors de la journée culturelle',
      seo: {
        metaTitle: 'Journée Culturelle Ignatienne 2024 - CREC Communauté',
        metaDescription: 'Retour sur le succès de la Journée Culturelle Ignatienne 2024 au CREC avec plus de 500 participants.',
        keywords: ['culture ignatienne', 'CREC', 'célébration', 'communauté', 'spiritualité']
      },
      createdAt: '2024-11-25',
      updatedAt: '2024-12-01'
    },
    {
      id: '4',
      title: 'Nouvelles bourses d\'excellence pour l\'année académique 2025-2026',
      excerpt: 'Le CREC annonce l\'ouverture de nouvelles bourses d\'excellence destinées aux étudiants méritants pour la prochaine année académique.',
      content: 'Dans le cadre de sa politique d\'accessibilité à l\'éducation...',
      category: 'Bourses',
      type: 'announcement',
      author: 'Service Académique CREC',
      publishDate: '2024-11-28',
      lastModified: '2024-12-15',
      status: 'published',
      featured: true,
      tags: ['bourses', 'excellence', 'étudiants', 'académique'],
      readCount: 2156,
      likes: 142,
      comments: 78,
      image: '/images/news/bourses-excellence.jpg',
      imageCaption: 'Cérémonie de remise des bourses 2024',
      externalLink: 'https://crec.edu.tg/bourses-2025',
      seo: {
        metaTitle: 'Bourses d\'Excellence CREC 2025-2026 - Candidatures Ouvertes',
        metaDescription: 'Découvrez les nouvelles bourses d\'excellence du CREC pour l\'année académique 2025-2026. Candidatures ouvertes.',
        keywords: ['bourses', 'excellence', 'CREC', 'étudiants', 'formation', 'mérite']
      },
      createdAt: '2024-11-20',
      updatedAt: '2024-12-15'
    },
    {
      id: '5',
      title: 'Projet de recherche en cours : Impact de la théologie sur le développement local',
      excerpt: 'Une équipe de chercheurs du CREC mène une étude approfondie sur l\'impact de la théologie dans les projets de développement communautaire.',
      content: 'Brouillon de l\'article sur le projet de recherche...',
      category: 'Recherche',
      type: 'article',
      author: 'P. Mathias AGBOTON, SJ',
      publishDate: '',
      lastModified: '2024-12-19',
      status: 'draft',
      featured: false,
      tags: ['recherche', 'développement', 'théologie', 'communauté'],
      readCount: 0,
      likes: 0,
      comments: 0,
      seo: {
        metaTitle: 'Recherche Théologie et Développement - CREC',
        metaDescription: 'Projet de recherche du CREC sur l\'impact de la théologie dans le développement local.',
        keywords: ['recherche', 'théologie', 'développement', 'CREC', 'communauté']
      },
      createdAt: '2024-12-10',
      updatedAt: '2024-12-19'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setActualites(mockActualites);
      setFilteredActualites(mockActualites);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filtrage
  useEffect(() => {
    let filtered = actualites;

    if (searchTerm) {
      filtered = filtered.filter(actualite =>
        actualite.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        actualite.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        actualite.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        actualite.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(actualite => actualite.category === filterCategory);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(actualite => actualite.status === filterStatus);
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(actualite => actualite.type === filterType);
    }

    setFilteredActualites(filtered);
  }, [actualites, searchTerm, filterCategory, filterStatus, filterType]);

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      article: { color: 'bg-blue-100 text-blue-800', label: 'Article' },
      news: { color: 'bg-green-100 text-green-800', label: 'Actualité' },
      announcement: { color: 'bg-purple-100 text-purple-800', label: 'Annonce' },
      event: { color: 'bg-yellow-100 text-yellow-800', label: 'Événement' },
      press: { color: 'bg-red-100 text-red-800', label: 'Presse' }
    };
    const config = typeConfig[type as keyof typeof typeConfig];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { color: 'bg-gray-100 text-gray-800', label: 'Brouillon' },
      published: { color: 'bg-green-100 text-green-800', label: 'Publié' },
      archived: { color: 'bg-orange-100 text-orange-800', label: 'Archivé' }
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  // Obtenir les catégories uniques
  const categories = [...new Set(actualites.map(a => a.category))];

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
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FileText className="h-8 w-8 text-crec-gold" />
            Gestion des Actualités
          </h1>
          <p className="text-gray-600 mt-1">Créez et gérez vos articles et actualités</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-crec-gold hover:bg-crec-lightgold">
              <Plus className="mr-2 h-4 w-4" />
              Nouvel Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Créer un nouvel article</DialogTitle>
              <DialogDescription>
                Rédigez un nouvel article ou actualité
              </DialogDescription>
            </DialogHeader>
            {/* Formulaire sera ajouté ici */}
            <div className="text-center py-8 text-gray-500">
              Éditeur d'articles en cours de développement...
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Annuler
              </Button>
              <Button className="bg-crec-gold hover:bg-crec-lightgold">
                Créer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">{actualites.length}</div>
              <p className="text-xs text-blue-600">
                {actualites.filter(a => a.status === 'published').length} publiés
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lectures Totales</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">
                {actualites.reduce((total, a) => total + a.readCount, 0).toLocaleString()}
              </div>
              <p className="text-xs text-green-600">
                Vues au total
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement</CardTitle>
              <Heart className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">
                {actualites.reduce((total, a) => total + a.likes + a.comments, 0)}
              </div>
              <p className="text-xs text-purple-600">
                Likes + Commentaires
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Brouillons</CardTitle>
              <Edit className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-700">
                {actualites.filter(a => a.status === 'draft').length}
              </div>
              <p className="text-xs text-orange-600">
                En attente de publication
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filtres et recherche */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Filtres et Recherche</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher par titre, contenu, auteur ou tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-4">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="news">Actualité</SelectItem>
                    <SelectItem value="announcement">Annonce</SelectItem>
                    <SelectItem value="event">Événement</SelectItem>
                    <SelectItem value="press">Presse</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="draft">Brouillon</SelectItem>
                    <SelectItem value="published">Publié</SelectItem>
                    <SelectItem value="archived">Archivé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Liste des actualités */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Articles et Actualités ({filteredActualites.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Article</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Auteur</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredActualites.map((actualite) => (
                    <TableRow key={actualite.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{actualite.title}</div>
                          <div className="text-sm text-gray-500 line-clamp-2">{actualite.excerpt}</div>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span className="bg-gray-100 px-2 py-1 rounded">{actualite.category}</span>
                            {actualite.featured && (
                              <Star className="inline w-3 h-3 text-yellow-500" />
                            )}
                            {actualite.image && (
                              <Image className="inline w-3 h-3" />
                            )}
                            {actualite.videoUrl && (
                              <Video className="inline w-3 h-3" />
                            )}
                            {actualite.externalLink && (
                              <ExternalLink className="inline w-3 h-3" />
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getTypeBadge(actualite.type)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(actualite.status)}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{actualite.author}</div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {actualite.readCount}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {actualite.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {actualite.comments}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {actualite.status === 'published' && actualite.publishDate ? (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(actualite.publishDate).toLocaleDateString('fr-FR')}
                            </div>
                          ) : (
                            <div className="text-gray-500">Non publié</div>
                          )}
                          <div className="text-xs text-gray-400">
                            Modifié: {new Date(actualite.lastModified).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredActualites.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Aucun article trouvé avec ces critères.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ActualitesManagement;
