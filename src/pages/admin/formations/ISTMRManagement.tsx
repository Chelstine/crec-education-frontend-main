import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  User,
  GraduationCap,
  BookOpen,
  Star,
  Users,
  DollarSign,
  FileText,
  Save,
  Info,
  Calendar,
  MapPin,
  Clock,
  UserPlus,
  UserMinus,
  AlertTriangle
} from 'lucide-react';

interface Filiere {
  id: string;
  title: string;
  description: string;
  image: string;
  competences: string[];
  debouches: string[];
  profil: string;
  type: 'licence' | 'master' | 'specialisation';
  duree: string;
  inscrits: number;
  fraisInscription: number;
  statut: 'active' | 'inactive';
}

interface SectionAbout {
  content: string;
  lastModified: string;
  modifiedBy: string;
}

interface InfosRentree {
  id: string;
  active: boolean;
  title: string;
  content: string;
  dateDebut: string;
  dateFin: string;
  lieu: string;
  position: 'avant' | 'apres';
  priority: number;
  contacts: string[];
  lastModified: string;
}

const ISTMRManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('filieres');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingAbout, setEditingAbout] = useState(false);
  const [editingRentree, setEditingRentree] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingFiliere, setEditingFiliere] = useState<Filiere | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [studentAdjustments, setStudentAdjustments] = useState<{[key: string]: number}>({});
  const [newFiliere, setNewFiliere] = useState<Partial<Filiere>>({
    title: '',
    description: '',
    image: '/img/dev-logiciel.png',
    competences: [],
    debouches: [],
    profil: '',
    type: 'licence',
    duree: '3 ans',
    inscrits: 0,
    fraisInscription: 450000,
    statut: 'active'
  });

  // Données des filières
  const [filieres, setFilieres] = useState<Filiere[]>([
    {
      id: 'F001',
      title: 'Développement de logiciels',
      description: 'Concevez des logiciels robustes et éthiques avec des langages modernes (Java, Python), des méthodologies agiles et une approche centrée sur la résolution de problèmes sociétaux.',
      image: '/img/dev-logiciel.png',
      competences: ['Programmation avancée', 'Architecture logicielle', 'Gestion de projets agiles', 'Cybersécurité'],
      debouches: ['Développeur logiciel', 'Ingénieur logiciel', 'Architecte logiciel', 'Testeur QA'],
      profil: 'Passionné par la logique, la structure et le travail collaboratif.',
      type: 'licence',
      duree: '3 ans',
      inscrits: 28,
      fraisInscription: 450000,
      statut: 'active'
    },
    {
      id: 'F002',
      title: 'Développement Web & Mobile',
      description: 'Créez des applications web et mobiles innovantes et accessibles, en maîtrisant HTML, CSS, JavaScript, React, Flutter et le design d\'interfaces utilisateur.',
      image: '/img/dev-web.png',
      competences: ['Design UI/UX', 'Développement responsive', 'Intégration d\'API', 'Applications mobiles'],
      debouches: ['Développeur front-end', 'Développeur mobile', 'Intégrateur web', 'Product builder'],
      profil: 'Créatif, visuel, et motivé par la concrétisation rapide d\'idées.',
      type: 'licence',
      duree: '3 ans',
      inscrits: 23,
      fraisInscription: 450000,
      statut: 'active'
    },
    {
      id: 'F003',
      title: 'Science des données',
      description: 'Exploitez les données pour éclairer les décisions avec Python, SQL, PowerBI et des techniques d\'intelligence artificielle, dans une perspective éthique et responsable.',
      image: '/img/data-science.png',
      competences: ['Analyse de données', 'Visualisation', 'Statistiques appliquées', 'IA de base'],
      debouches: ['Data analyst', 'Business analyst', 'Consultant data', 'Data scientist'],
      profil: 'Curieux, analytique, et attiré par les solutions basées sur les données.',
      type: 'licence',
      duree: '3 ans',
      inscrits: 18,
      fraisInscription: 480000,
      statut: 'active'
    }
  ]);

  // Section À propos
  const [sectionAbout, setSectionAbout] = useState<SectionAbout>({
    content: `Fondé par la Compagnie de Jésus au Bénin, l'Institut des Sciences et Technologies Matteo Ricci (ISTMR) forme des techniciens, ingénieurs et chercheurs dans le domaine du numérique. Situé à Godomey-Salamey, l'ISTMR s'inspire de Matteo Ricci, jésuite italien prônant le dialogue des cultures à travers les sciences.

Ancré dans la tradition éducative jésuite (Ratio Studiorum, 1586), l'ISTMR promeut la cura personalis, le magis, le tantum quantum, et la solidarité. Notre mission : former des leaders éthiques pour le développement de l'Afrique.

Sous l'égide du Centre de Recherche d'Étude et de Créativité (CREC), l'ISTMR propose des formations en informatique, avec des projets d'extension vers les télécommunications et l'électronique, soutenus par un réseau de 195 universités jésuites.`,
    lastModified: '2024-01-15',
    modifiedBy: 'Admin CREC'
  });

  // Infos Rentrée
  const [infosRentree, setInfosRentree] = useState<InfosRentree>({
    id: 'R001',
    active: true,
    title: 'Rentrée Académique 2024-2025',
    content: `📅 **Dates importantes :**
- **Inscriptions** : Du 1er juillet au 31 août 2024
- **Rentrée officielle** : Lundi 2 septembre 2024
- **Début des cours** : Mercredi 4 septembre 2024

🎒 **Préparation :**
- Finaliser le dossier d'inscription
- Effectuer le paiement des frais
- Retirer la carte étudiant

📍 **Cérémonie d'accueil** : Amphi Matteo Ricci à 8h00`,
    dateDebut: '2024-09-02',
    dateFin: '2024-09-04',
    lieu: 'Campus ISTMR - Godomey-Salamey',
    position: 'avant',
    priority: 1,
    contacts: ['admission@istmr.edu.bj', '+229 21 30 15 84'],
    lastModified: '2024-01-20'
  });

  const [tempAbout, setTempAbout] = useState(sectionAbout.content);
  const [tempRentree, setTempRentree] = useState(infosRentree);

  const filteredFilieres = filieres.filter(filiere =>
    filiere.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    filiere.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'licence': return 'bg-blue-100 text-blue-800';
      case 'master': return 'bg-purple-100 text-purple-800';
      case 'specialisation': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSaveAbout = () => {
    setSectionAbout({
      content: tempAbout,
      lastModified: new Date().toISOString().split('T')[0],
      modifiedBy: 'Admin CREC'
    });
    setEditingAbout(false);
  };

  const handleSaveRentree = () => {
    setInfosRentree({
      ...tempRentree,
      lastModified: new Date().toISOString().split('T')[0]
    });
    setEditingRentree(false);
  };

  const handleDeleteFiliere = (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDeleteFiliere = () => {
    if (deleteConfirmId) {
      setFilieres(filieres.filter(f => f.id !== deleteConfirmId));
      setDeleteConfirmId(null);
    }
  };

  const cancelDeleteFiliere = () => {
    setDeleteConfirmId(null);
  };

  const handleEditFiliere = (filiere: Filiere) => {
    setEditingFiliere(filiere);
    setNewFiliere({
      title: filiere.title,
      description: filiere.description,
      image: filiere.image,
      competences: filiere.competences,
      debouches: filiere.debouches,
      profil: filiere.profil,
      type: filiere.type,
      duree: filiere.duree,
      inscrits: filiere.inscrits,
      fraisInscription: filiere.fraisInscription,
      statut: filiere.statut
    });
    setShowEditModal(true);
  };

  const handleSaveEditFiliere = () => {
    if (!editingFiliere || !newFiliere.title || !newFiliere.description || !newFiliere.profil || !newFiliere.duree) {
      alert('Veuillez remplir tous les champs obligatoires (titre, description, profil idéal, durée)');
      return;
    }

    const updatedFiliere: Filiere = {
      ...editingFiliere,
      title: newFiliere.title!,
      description: newFiliere.description!,
      image: newFiliere.image || '/img/formation-default.png',
      competences: newFiliere.competences || [],
      debouches: newFiliere.debouches || [],
      profil: newFiliere.profil!,
      type: (newFiliere.type as 'licence' | 'master' | 'specialisation') || 'licence',
      duree: newFiliere.duree!,
      inscrits: newFiliere.inscrits || 0,
      fraisInscription: newFiliere.fraisInscription || 450000,
      statut: (newFiliere.statut as 'active' | 'inactive') || 'active'
    };

    setFilieres(filieres.map(f => f.id === editingFiliere.id ? updatedFiliere : f));
    setShowEditModal(false);
    setEditingFiliere(null);
    setNewFiliere({
      title: '',
      description: '',
      image: '/img/dev-logiciel.png',
      competences: [],
      debouches: [],
      profil: '',
      type: 'licence',
      duree: '3 ans',
      inscrits: 0,
      fraisInscription: 450000,
      statut: 'active'
    });
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingFiliere(null);
    setNewFiliere({
      title: '',
      description: '',
      image: '/img/dev-logiciel.png',
      competences: [],
      debouches: [],
      profil: '',
      type: 'licence',
      duree: '3 ans',
      inscrits: 0,
      fraisInscription: 450000,
      statut: 'active'
    });
  };

  const handleToggleRentree = () => {
    setInfosRentree({
      ...infosRentree,
      active: !infosRentree.active
    });
  };

  const handleAddFiliere = () => {
    setShowAddModal(true);
  };

  const handleSaveNewFiliere = () => {
    if (!newFiliere.title || !newFiliere.description || !newFiliere.profil || !newFiliere.duree) {
      alert('Veuillez remplir tous les champs obligatoires (titre, description, profil idéal, durée)');
      return;
    }

    const id = `F${String(filieres.length + 1).padStart(3, '0')}`;
    const filiereToAdd: Filiere = {
      id,
      title: newFiliere.title!,
      description: newFiliere.description!,
      image: newFiliere.image || '/img/formation-default.png',
      competences: newFiliere.competences || [],
      debouches: newFiliere.debouches || [],
      profil: newFiliere.profil!,
      type: (newFiliere.type as 'licence' | 'master' | 'specialisation') || 'licence',
      duree: newFiliere.duree!,
      inscrits: 0,
      fraisInscription: newFiliere.fraisInscription || 450000,
      statut: (newFiliere.statut as 'active' | 'inactive') || 'active'
    };

    setFilieres([...filieres, filiereToAdd]);
    setShowAddModal(false);
    setNewFiliere({
      title: '',
      description: '',
      image: '/img/dev-logiciel.png',
      competences: [],
      debouches: [],
      profil: '',
      type: 'licence',
      duree: '3 ans',
      inscrits: 0,
      fraisInscription: 450000,
      statut: 'active'
    });
  };

  const handleCancelAdd = () => {
    setShowAddModal(false);
    setNewFiliere({
      title: '',
      description: '',
      image: '/img/dev-logiciel.png',
      competences: [],
      debouches: [],
      profil: '',
      type: 'licence',
      duree: '3 ans',
      inscrits: 0,
      fraisInscription: 450000,
      statut: 'active'
    });
  };

  // Nouvelles fonctions pour la gestion des étudiants
  const handleStudentIncrement = (filiereId: string) => {
    setFilieres(filieres.map(f => 
      f.id === filiereId 
        ? { ...f, inscrits: f.inscrits + 1 }
        : f
    ));
  };

  const handleStudentDecrement = (filiereId: string) => {
    setFilieres(filieres.map(f => 
      f.id === filiereId 
        ? { ...f, inscrits: Math.max(0, f.inscrits - 1) }
        : f
    ));
  };

  const handleStudentAdjustment = (filiereId: string, newCount: number) => {
    if (newCount >= 0) {
      setFilieres(filieres.map(f => 
        f.id === filiereId 
          ? { ...f, inscrits: newCount }
          : f
      ));
    }
  };

  const handleStudentAdjustmentInput = (filiereId: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setStudentAdjustments({ ...studentAdjustments, [filiereId]: numValue });
  };

  const applyStudentAdjustment = (filiereId: string) => {
    const adjustment = studentAdjustments[filiereId];
    if (adjustment !== undefined && adjustment >= 0) {
      handleStudentAdjustment(filiereId, adjustment);
      setStudentAdjustments({ ...studentAdjustments, [filiereId]: undefined });
    }
  };

  // Simulation d'auto-increment lors d'acceptation de candidature
  const simulateApplicationAccepted = (filiereId: string) => {
    handleStudentIncrement(filiereId);
    // Dans un vrai système, ceci serait déclenché par l'acceptation d'une candidature
  };

  const stats = {
    totalFilieres: filieres.length,
    licences: filieres.filter(f => f.type === 'licence').length,
    masters: filieres.filter(f => f.type === 'master').length,
    specialisations: filieres.filter(f => f.type === 'specialisation').length,
    inscritsTotal: filieres.reduce((sum, f) => sum + f.inscrits, 0)
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion ISTMR</h1>
          <p className="text-gray-600 mt-1">Gestion du contenu de la page Université</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Filières</p>
                <p className="text-2xl font-bold">{stats.totalFilieres}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Licences</p>
                <p className="text-2xl font-bold text-blue-600">{stats.licences}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Masters</p>
                <p className="text-2xl font-bold text-purple-600">{stats.masters}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Spécialisations</p>
                <p className="text-2xl font-bold text-green-600">{stats.specialisations}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Étudiants</p>
                <p className="text-2xl font-bold text-orange-600">{stats.inscritsTotal}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Formations actives</p>
                <p className="text-2xl font-bold text-purple-600">{filieres.filter(f => f.statut === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Onglets */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="filieres" className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            Filières ({stats.totalFilieres})
          </TabsTrigger>
          <TabsTrigger value="about" className="flex items-center gap-2">
            <Info className="w-4 h-4" />
            Section À propos
          </TabsTrigger>
          <TabsTrigger value="rentree" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Infos Rentrée
            {infosRentree.active && <span className="w-2 h-2 bg-green-500 rounded-full"></span>}
          </TabsTrigger>
        </TabsList>

        {/* Onglet Filières */}
        <TabsContent value="filieres" className="space-y-4">
          {/* Filtres et recherche */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Rechercher par nom ou description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button className="flex items-center gap-2" onClick={handleAddFiliere}>
                  <Plus className="w-4 h-4" />
                  Nouvelle filière
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Liste des filières */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Filières ISTMR ({filteredFilieres.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredFilieres.map((filiere) => (
                  <div key={filiere.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{filiere.title}</h3>
                          <Badge className={getTypeColor(filiere.type)}>
                            {filiere.type}
                          </Badge>
                          <Badge className={getStatusColor(filiere.statut)}>
                            {filiere.statut}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-3 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {filiere.duree}
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>{filiere.inscrits} étudiants inscrits</span>
                            <div className="flex items-center gap-1 ml-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => handleStudentDecrement(filiere.id)}
                                className="h-6 w-6 p-0"
                              >
                                <UserMinus className="w-3 h-3" />
                              </Button>
                              <Input
                                type="number"
                                min="0"
                                value={studentAdjustments[filiere.id] ?? filiere.inscrits}
                                onChange={(e) => handleStudentAdjustmentInput(filiere.id, e.target.value)}
                                className="h-6 w-16 text-xs text-center"
                              />
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => applyStudentAdjustment(filiere.id)}
                                className="h-6 w-6 p-0"
                              >
                                <Save className="w-3 h-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => handleStudentIncrement(filiere.id)}
                                className="h-6 w-6 p-0"
                              >
                                <UserPlus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-3">{filiere.description}</p>
                        
                        <div className="space-y-2">
                          <div>
                            <span className="font-medium text-gray-800">Compétences : </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {filiere.competences.map((comp, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {comp}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <span className="font-medium text-gray-800">Débouchés : </span>
                            <span className="text-gray-600 text-sm">
                              {filiere.debouches.join(', ')}
                            </span>
                          </div>
                          
                          <div>
                            <span className="font-medium text-gray-800">Profil idéal : </span>
                            <span className="text-gray-600 text-sm">{filiere.profil}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-2"
                          onClick={() => handleEditFiliere(filiere)}
                        >
                          <Edit className="w-4 h-4" />
                          Modifier
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          className="flex items-center gap-2"
                          onClick={() => handleDeleteFiliere(filiere.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Section À propos */}
        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Section "À propos de l'ISTMR"
                </div>
                {!editingAbout && (
                  <Button onClick={() => setEditingAbout(true)} className="flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    Modifier
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {editingAbout ? (
                <div className="space-y-4">
                  <Textarea
                    value={tempAbout}
                    onChange={(e) => setTempAbout(e.target.value)}
                    rows={15}
                    className="w-full"
                    placeholder="Contenu de la section À propos..."
                  />
                  <div className="flex gap-3">
                    <Button onClick={handleSaveAbout} className="flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      Enregistrer
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setTempAbout(sectionAbout.content);
                        setEditingAbout(false);
                      }}
                    >
                      Annuler
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap text-gray-700 font-sans">
                      {sectionAbout.content}
                    </pre>
                  </div>
                  <div className="text-sm text-gray-500">
                    Dernière modification : {sectionAbout.lastModified} par {sectionAbout.modifiedBy}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Infos Rentrée */}
        <TabsContent value="rentree" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Informations Rentrée
                  {infosRentree.active && (
                    <Badge className="bg-green-100 text-green-800">Actif</Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant={infosRentree.active ? "destructive" : "default"}
                    onClick={handleToggleRentree}
                    size="sm"
                  >
                    {infosRentree.active ? 'Désactiver' : 'Activer'}
                  </Button>
                  {!editingRentree && (
                    <Button onClick={() => setEditingRentree(true)} className="flex items-center gap-2">
                      <Edit className="w-4 h-4" />
                      Modifier
                    </Button>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {editingRentree ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Titre
                      </label>
                      <Input
                        value={tempRentree.title}
                        onChange={(e) => setTempRentree({...tempRentree, title: e.target.value})}
                        placeholder="Titre de la section..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Position
                      </label>
                      <select
                        value={tempRentree.position}
                        onChange={(e) => setTempRentree({...tempRentree, position: e.target.value as 'avant' | 'apres'})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="avant">Avant les filières</option>
                        <option value="apres">Après les filières</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date début
                      </label>
                      <Input
                        type="date"
                        value={tempRentree.dateDebut}
                        onChange={(e) => setTempRentree({...tempRentree, dateDebut: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date fin
                      </label>
                      <Input
                        type="date"
                        value={tempRentree.dateFin}
                        onChange={(e) => setTempRentree({...tempRentree, dateFin: e.target.value})}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Lieu
                      </label>
                      <Input
                        value={tempRentree.lieu}
                        onChange={(e) => setTempRentree({...tempRentree, lieu: e.target.value})}
                        placeholder="Lieu de la rentrée..."
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contenu
                    </label>
                    <Textarea
                      value={tempRentree.content}
                      onChange={(e) => setTempRentree({...tempRentree, content: e.target.value})}
                      rows={10}
                      className="w-full"
                      placeholder="Contenu des informations de rentrée..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contacts (un par ligne)
                    </label>
                    <Textarea
                      value={tempRentree.contacts.join('\n')}
                      onChange={(e) => setTempRentree({...tempRentree, contacts: e.target.value.split('\n').filter(c => c.trim())})}
                      rows={3}
                      className="w-full"
                      placeholder="email@example.com&#10;+229 XX XX XX XX"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={handleSaveRentree} className="flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      Enregistrer
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setTempRentree(infosRentree);
                        setEditingRentree(false);
                      }}
                    >
                      Annuler
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>{new Date(infosRentree.dateDebut).toLocaleDateString('fr-FR')} - {new Date(infosRentree.dateFin).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{infosRentree.lieu}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-gray-500" />
                      <span>Position: {infosRentree.position} les filières</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-3">{infosRentree.title}</h3>
                    <pre className="whitespace-pre-wrap text-gray-700 font-sans mb-4">
                      {infosRentree.content}
                    </pre>
                    
                    {infosRentree.contacts.length > 0 && (
                      <div>
                        <span className="font-medium text-gray-800">Contacts :</span>
                        <ul className="mt-1">
                          {infosRentree.contacts.map((contact, index) => (
                            <li key={index} className="text-gray-600 text-sm">• {contact}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    Dernière modification : {infosRentree.lastModified}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal d'ajout de filière */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Nouvelle Filière</h2>
              <Button variant="outline" onClick={handleCancelAdd}>✕</Button>
            </div>

            <div className="space-y-6">
              {/* Informations de base - tous les champs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titre <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={newFiliere.title || ''}
                    onChange={(e) => setNewFiliere({...newFiliere, title: e.target.value})}
                    placeholder="Ex: Développement de logiciels"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={newFiliere.type}
                    onChange={(e) => setNewFiliere({...newFiliere, type: e.target.value as 'licence' | 'master' | 'specialisation'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="licence">Licence</option>
                    <option value="master">Master</option>
                    <option value="specialisation">Spécialisation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Durée <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={newFiliere.duree || ''}
                    onChange={(e) => setNewFiliere({...newFiliere, duree: e.target.value})}
                    placeholder="3 ans"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Frais d'inscription (FCFA)
                  </label>
                  <Input
                    type="number"
                    value={newFiliere.fraisInscription || ''}
                    onChange={(e) => setNewFiliere({...newFiliere, fraisInscription: parseInt(e.target.value) || 0})}
                    placeholder="450000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image
                  </label>
                  <Input
                    value={newFiliere.image || ''}
                    onChange={(e) => setNewFiliere({...newFiliere, image: e.target.value})}
                    placeholder="/img/dev-logiciel.png"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <Textarea
                  value={newFiliere.description || ''}
                  onChange={(e) => setNewFiliere({...newFiliere, description: e.target.value})}
                  rows={4}
                  placeholder="Ex: Concevez des logiciels robustes et éthiques avec des langages modernes (Java, Python), des méthodologies agiles et une approche centrée sur la résolution de problèmes sociétaux."
                />
              </div>

              {/* Profil idéal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profil idéal <span className="text-red-500">*</span>
                </label>
                <Textarea
                  value={newFiliere.profil || ''}
                  onChange={(e) => setNewFiliere({...newFiliere, profil: e.target.value})}
                  rows={2}
                  placeholder="Ex: Passionné par la logique, la structure et le travail collaboratif."
                />
              </div>

              {/* Compétences */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Compétences (une par ligne)
                </label>
                <Textarea
                  value={newFiliere.competences?.join('\n') || ''}
                  onChange={(e) => setNewFiliere({...newFiliere, competences: e.target.value.split('\n').filter(c => c.trim())})}
                  rows={4}
                  placeholder="Programmation avancée&#10;Architecture logicielle&#10;Gestion de projets"
                />
              </div>

              {/* Débouchés */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Débouchés (un par ligne)
                </label>
                <Textarea
                  value={newFiliere.debouches?.join('\n') || ''}
                  onChange={(e) => setNewFiliere({...newFiliere, debouches: e.target.value.split('\n').filter(d => d.trim())})}
                  rows={4}
                  placeholder="Développeur logiciel&#10;Ingénieur logiciel&#10;Architecte logiciel"
                />
              </div>

              {/* Boutons d'action */}
              <div className="flex gap-3 pt-4 border-t">
                <Button onClick={handleSaveNewFiliere} className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Enregistrer
                </Button>
                <Button variant="outline" onClick={handleCancelAdd}>
                  Annuler
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal d'édition de filière */}
      {showEditModal && editingFiliere && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Modifier la Filière</h2>
              <Button variant="outline" onClick={handleCancelEdit}>✕</Button>
            </div>

            <div className="space-y-6">
              {/* Informations de base - tous les champs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titre <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={newFiliere.title || ''}
                    onChange={(e) => setNewFiliere({...newFiliere, title: e.target.value})}
                    placeholder="Ex: Développement de logiciels"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={newFiliere.type}
                    onChange={(e) => setNewFiliere({...newFiliere, type: e.target.value as 'licence' | 'master' | 'specialisation'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="licence">Licence</option>
                    <option value="master">Master</option>
                    <option value="specialisation">Spécialisation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Durée <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={newFiliere.duree || ''}
                    onChange={(e) => setNewFiliere({...newFiliere, duree: e.target.value})}
                    placeholder="3 ans"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Frais d'inscription (FCFA)
                  </label>
                  <Input
                    type="number"
                    value={newFiliere.fraisInscription || ''}
                    onChange={(e) => setNewFiliere({...newFiliere, fraisInscription: parseInt(e.target.value) || 0})}
                    placeholder="450000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Statut
                  </label>
                  <select
                    value={newFiliere.statut}
                    onChange={(e) => setNewFiliere({...newFiliere, statut: e.target.value as 'active' | 'inactive'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <Textarea
                  value={newFiliere.description || ''}
                  onChange={(e) => setNewFiliere({...newFiliere, description: e.target.value})}
                  rows={4}
                  placeholder="Description détaillée de la filière..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profil idéal <span className="text-red-500">*</span>
                </label>
                <Textarea
                  value={newFiliere.profil || ''}
                  onChange={(e) => setNewFiliere({...newFiliere, profil: e.target.value})}
                  rows={2}
                  placeholder="Profil recherché pour cette filière..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Compétences (une par ligne)
                </label>
                <Textarea
                  value={(newFiliere.competences || []).join('\n')}
                  onChange={(e) => setNewFiliere({...newFiliere, competences: e.target.value.split('\n').filter(c => c.trim())})}
                  rows={4}
                  placeholder="Programmation avancée&#10;Architecture logicielle&#10;Gestion de projets agiles"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Débouchés (un par ligne)
                </label>
                <Textarea
                  value={(newFiliere.debouches || []).join('\n')}
                  onChange={(e) => setNewFiliere({...newFiliere, debouches: e.target.value.split('\n').filter(d => d.trim())})}
                  rows={4}
                  placeholder="Développeur logiciel&#10;Ingénieur logiciel&#10;Architecte logiciel"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button onClick={handleSaveEditFiliere} className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Enregistrer les modifications
                </Button>
                <Button variant="outline" onClick={handleCancelEdit}>
                  Annuler
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dialogue de confirmation de suppression */}
      <AlertDialog open={deleteConfirmId !== null} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Confirmer la suppression
            </AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cette filière ? Cette action est irréversible et supprimera toutes les données associées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDeleteFiliere}>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteFiliere} className="bg-red-600 hover:bg-red-700">
              Supprimer définitivement
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ISTMRManagement;
