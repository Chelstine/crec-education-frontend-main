import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { Separator } from '@/components/ui/separator';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  ArrowLeft,
  Users,
  Calendar,
  DollarSign,
  Star,
  MapPin,
  Clock,
  BookOpen,
  FileText,
  Settings,
  UserCheck,
  Target,
  Award,
  MessageSquare,
  Image,
  Video,
  Download,
  Mail,
  Phone,
  GraduationCap,
  Building,
  Globe,
  Heart,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

// Types
interface Formation {
  id: string;
  title: string;
  description: string;
  type: 'university' | 'professional' | 'short';
  category: string;
  duration: string;
  price: number;
  capacity: number;
  enrolled: number;
  startDate: string;
  endDate: string;
  location: string;
  instructor: string;
  status: 'active' | 'inactive' | 'completed' | 'planned';
  level: 'beginner' | 'intermediate' | 'advanced';
  language: 'french' | 'english';
  prerequisites?: string;
  objectives: string[];
  modules: string[];
  image?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'overdue';
  notes?: string;
}

interface Section {
  id: string;
  title: string;
  type: 'text' | 'hero' | 'list' | 'quote' | 'image' | 'video' | 'link' | 'code';
  content: any;
  order: number;
  visible: boolean;
}

interface Payment {
  id: string;
  participantId: string;
  participantName: string;
  amount: number;
  date: string;
  method: 'cash' | 'bank_transfer' | 'mobile_money' | 'check';
  status: 'completed' | 'pending' | 'failed';
  reference?: string;
}

const FormationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [formation, setFormation] = useState<Formation | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  // États pour les formulaires
  const [editedFormation, setEditedFormation] = useState<Formation | null>(null);
  const [newParticipant, setNewParticipant] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [isAddParticipantOpen, setIsAddParticipantOpen] = useState(false);

  // Mock data pour commencer
  useEffect(() => {
    const loadFormationData = () => {
      // Simulation d'une formation
      const mockFormation: Formation = {
        id: id || '1',
        title: 'Développement Web Full Stack',
        description: 'Formation complète en développement web moderne avec React, Node.js et MongoDB. Cette formation intensive vous permettra de maîtriser les technologies web les plus demandées sur le marché.',
        type: 'professional',
        category: 'Informatique',
        duration: '6 mois',
        price: 850000,
        capacity: 25,
        enrolled: 18,
        startDate: '2025-02-15',
        endDate: '2025-08-15',
        location: 'CREC Campus - Salle Informatique A1',
        instructor: 'Dr. Kokou ADJANON',
        status: 'active',
        level: 'intermediate',
        language: 'french',
        prerequisites: 'Connaissances de base en programmation, familiarité avec HTML/CSS',
        objectives: [
          'Maîtriser React.js et ses concepts avancés',
          'Développer des API REST avec Node.js',
          'Gérer des bases de données avec MongoDB',
          'Déployer des applications web complètes',
          'Appliquer les bonnes pratiques de développement'
        ],
        modules: [
          'Introduction au développement web moderne',
          'HTML5, CSS3 et JavaScript ES6+',
          'React.js - Composants et Hooks',
          'Node.js et Express.js',
          'Bases de données MongoDB',
          'Authentification et sécurité',
          'Déploiement et DevOps',
          'Projet final'
        ],
        image: '/images/formations/web-fullstack.jpg',
        featured: true,
        createdAt: '2024-12-01',
        updatedAt: '2024-12-20'
      };

      const mockParticipants: Participant[] = [
        {
          id: '1',
          name: 'Amélie KOUASSI',
          email: 'amelie.kouassi@email.com',
          phone: '+228 90 12 34 56',
          registrationDate: '2024-12-01',
          status: 'confirmed',
          paymentStatus: 'paid',
          notes: 'Très motivée, background en design'
        },
        {
          id: '2',
          name: 'Jean-Baptiste AGBO',
          email: 'jb.agbo@email.com',
          phone: '+228 91 23 45 67',
          registrationDate: '2024-12-03',
          status: 'confirmed',
          paymentStatus: 'pending',
          notes: 'Étudiant en informatique'
        },
        {
          id: '3',
          name: 'Marie ABLODÉ',
          email: 'marie.ablode@email.com',
          phone: '+228 92 34 56 78',
          registrationDate: '2024-12-05',
          status: 'pending',
          paymentStatus: 'pending',
          notes: 'Reconversion professionnelle'
        }
      ];

      const mockSections: Section[] = [
        {
          id: '1',
          title: 'Présentation de la formation',
          type: 'hero',
          content: {
            title: 'Devenez Développeur Full Stack',
            subtitle: 'Maîtrisez les technologies web les plus demandées',
            backgroundImage: '/images/hero-web-dev.jpg'
          },
          order: 1,
          visible: true
        },
        {
          id: '2',
          title: 'Objectifs pédagogiques',
          type: 'list',
          content: {
            items: [
              'Développer des applications web complètes',
              'Maîtriser React.js et l\'écosystème moderne',
              'Créer des APIs robustes avec Node.js',
              'Gérer efficacement les bases de données'
            ]
          },
          order: 2,
          visible: true
        }
      ];

      const mockPayments: Payment[] = [
        {
          id: '1',
          participantId: '1',
          participantName: 'Amélie KOUASSI',
          amount: 850000,
          date: '2024-12-01',
          method: 'bank_transfer',
          status: 'completed',
          reference: 'TRF-2024-001'
        },
        {
          id: '2',
          participantId: '2',
          participantName: 'Jean-Baptiste AGBO',
          amount: 425000,
          date: '2024-12-03',
          method: 'mobile_money',
          status: 'pending',
          reference: 'MM-2024-002'
        }
      ];

      setFormation(mockFormation);
      setEditedFormation(mockFormation);
      setParticipants(mockParticipants);
      setSections(mockSections);
      setPayments(mockPayments);
      setLoading(false);
    };

    loadFormationData();
  }, [id]);

  // Fonctions de gestion
  const handleSaveFormation = () => {
    if (editedFormation) {
      setFormation({ ...editedFormation, updatedAt: new Date().toISOString() });
      setIsEditing(false);
    }
  };

  const handleAddParticipant = () => {
    const participant: Participant = {
      id: Date.now().toString(),
      ...newParticipant,
      registrationDate: new Date().toISOString(),
      status: 'pending',
      paymentStatus: 'pending'
    };
    
    setParticipants([...participants, participant]);
    setNewParticipant({ name: '', email: '', phone: '', notes: '' });
    setIsAddParticipantOpen(false);
    
    if (formation) {
      setFormation({ ...formation, enrolled: formation.enrolled + 1 });
      setEditedFormation({ ...formation, enrolled: formation.enrolled + 1 });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Active' },
      inactive: { color: 'bg-gray-100 text-gray-800', label: 'Inactive' },
      completed: { color: 'bg-blue-100 text-blue-800', label: 'Terminée' },
      planned: { color: 'bg-yellow-100 text-yellow-800', label: 'Planifiée' }
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig = {
      paid: { color: 'bg-green-100 text-green-800', label: 'Payé' },
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'En attente' },
      overdue: { color: 'bg-red-100 text-red-800', label: 'En retard' }
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!formation) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Formation non trouvée</h1>
          <Button asChild>
            <Link to="/admin/formations">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux formations
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* En-tête avec navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link to="/admin/formations">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{formation.title}</h1>
            <p className="text-gray-600 mt-1">Gestion complète de la formation</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Annuler
              </Button>
              <Button onClick={handleSaveFormation} className="bg-crec-gold hover:bg-crec-lightgold">
                <Save className="mr-2 h-4 w-4" />
                Sauvegarder
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </Button>
          )}
        </div>
      </motion.div>

      {/* Onglets principaux */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="participants" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Participants
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Contenu
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Paiements
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Ressources
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Paramètres
            </TabsTrigger>
          </TabsList>

          {/* Onglet Vue d'ensemble */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Statistiques rapides */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Participants</CardTitle>
                    <Users className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-700">
                      {formation.enrolled}/{formation.capacity}
                    </div>
                    <p className="text-xs text-blue-600">
                      {Math.round((formation.enrolled / formation.capacity) * 100)}% de remplissage
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Revenus</CardTitle>
                    <DollarSign className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-700">
                      {(payments.reduce((sum, p) => p.status === 'completed' ? sum + p.amount : sum, 0) / 1000000).toFixed(1)}M
                    </div>
                    <p className="text-xs text-green-600">
                      FCFA encaissés
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Progression</CardTitle>
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-700">
                      {formation.status === 'completed' ? '100%' : 
                       formation.status === 'active' ? '45%' : '0%'}
                    </div>
                    <p className="text-xs text-purple-600">
                      du programme
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Informations détaillées */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Informations de la formation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing && editedFormation ? (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="title">Titre</Label>
                          <Input
                            id="title"
                            value={editedFormation.title}
                            onChange={(e) => setEditedFormation({
                              ...editedFormation,
                              title: e.target.value
                            })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={editedFormation.description}
                            onChange={(e) => setEditedFormation({
                              ...editedFormation,
                              description: e.target.value
                            })}
                            rows={4}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="price">Prix (FCFA)</Label>
                            <Input
                              id="price"
                              type="number"
                              value={editedFormation.price}
                              onChange={(e) => setEditedFormation({
                                ...editedFormation,
                                price: parseInt(e.target.value) || 0
                              })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="capacity">Capacité</Label>
                            <Input
                              id="capacity"
                              type="number"
                              value={editedFormation.capacity}
                              onChange={(e) => setEditedFormation({
                                ...editedFormation,
                                capacity: parseInt(e.target.value) || 0
                              })}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600">Statut:</span>
                          {getStatusBadge(formation.status)}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600">Type:</span>
                          <Badge variant="outline">{formation.type}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600">Catégorie:</span>
                          <span className="text-sm">{formation.category}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600">Durée:</span>
                          <span className="text-sm">{formation.duration}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600">Prix:</span>
                          <span className="text-sm font-medium">{formation.price.toLocaleString()} FCFA</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600">Lieu:</span>
                          <span className="text-sm">{formation.location}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600">Instructeur:</span>
                          <span className="text-sm">{formation.instructor}</span>
                        </div>
                        <Separator />
                        <div>
                          <span className="text-sm font-medium text-gray-600 block mb-2">Description:</span>
                          <p className="text-sm text-gray-700">{formation.description}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Planning et objectifs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Début:</span>
                        <span className="text-sm">{new Date(formation.startDate).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Fin:</span>
                        <span className="text-sm">{new Date(formation.endDate).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Niveau:</span>
                        <Badge variant="outline">{formation.level}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Langue:</span>
                        <span className="text-sm capitalize">{formation.language}</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <span className="text-sm font-medium text-gray-600 block mb-2">Prérequis:</span>
                      <p className="text-sm text-gray-700">{formation.prerequisites}</p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <span className="text-sm font-medium text-gray-600 block mb-3">Objectifs:</span>
                      <ul className="space-y-2">
                        {formation.objectives.map((objective, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {objective}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Onglet Participants */}
          <TabsContent value="participants" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Gestion des participants ({participants.length})
                  </CardTitle>
                  <Dialog open={isAddParticipantOpen} onOpenChange={setIsAddParticipantOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-crec-gold hover:bg-crec-lightgold">
                        <Plus className="mr-2 h-4 w-4" />
                        Ajouter un participant
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Ajouter un nouveau participant</DialogTitle>
                        <DialogDescription>
                          Ajoutez un participant à cette formation
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Nom complet</Label>
                          <Input
                            id="name"
                            value={newParticipant.name}
                            onChange={(e) => setNewParticipant({
                              ...newParticipant,
                              name: e.target.value
                            })}
                            placeholder="Ex: Jean DUPONT"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={newParticipant.email}
                            onChange={(e) => setNewParticipant({
                              ...newParticipant,
                              email: e.target.value
                            })}
                            placeholder="ex@email.com"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Téléphone</Label>
                          <Input
                            id="phone"
                            value={newParticipant.phone}
                            onChange={(e) => setNewParticipant({
                              ...newParticipant,
                              phone: e.target.value
                            })}
                            placeholder="+228 90 12 34 56"
                          />
                        </div>
                        <div>
                          <Label htmlFor="notes">Notes (optionnel)</Label>
                          <Textarea
                            id="notes"
                            value={newParticipant.notes}
                            onChange={(e) => setNewParticipant({
                              ...newParticipant,
                              notes: e.target.value
                            })}
                            placeholder="Informations supplémentaires..."
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddParticipantOpen(false)}>
                          Annuler
                        </Button>
                        <Button onClick={handleAddParticipant} className="bg-crec-gold hover:bg-crec-lightgold">
                          Ajouter
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Participant</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Inscription</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Paiement</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {participants.map((participant) => (
                        <TableRow key={participant.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{participant.name}</div>
                              {participant.notes && (
                                <div className="text-sm text-gray-500 mt-1">{participant.notes}</div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1 text-sm">
                                <Mail className="h-3 w-3" />
                                {participant.email}
                              </div>
                              <div className="flex items-center gap-1 text-sm">
                                <Phone className="h-3 w-3" />
                                {participant.phone}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {new Date(participant.registrationDate).toLocaleDateString('fr-FR')}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={
                              participant.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                              participant.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {participant.status === 'confirmed' ? 'Confirmé' :
                               participant.status === 'pending' ? 'En attente' : 'Annulé'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {getPaymentStatusBadge(participant.paymentStatus)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Onglet Contenu */}
          <TabsContent value="content" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Contenu de la formation
                  </CardTitle>
                  <Button asChild variant="outline">
                    <Link to={`/admin/sections?formationId=${formation.id}`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Gérer le contenu
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3">Modules du programme:</h4>
                      <div className="grid gap-2">
                        {formation.modules.map((module, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-8 h-8 bg-crec-gold text-white rounded-full flex items-center justify-center text-sm font-semibold">
                              {index + 1}
                            </div>
                            <span className="text-sm">{module}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-semibold mb-3">Sections de la page:</h4>
                      <div className="space-y-2">
                        {sections.map((section) => (
                          <div key={section.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <Badge variant="outline">{section.type}</Badge>
                              <span className="text-sm font-medium">{section.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={section.visible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                {section.visible ? 'Visible' : 'Masqué'}
                              </Badge>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Onglet Paiements */}
          <TabsContent value="payments" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Gestion des paiements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Participant</TableHead>
                        <TableHead>Montant</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Méthode</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Référence</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>
                            <div className="font-medium">{payment.participantName}</div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{payment.amount.toLocaleString()} FCFA</div>
                          </TableCell>
                          <TableCell>
                            {new Date(payment.date).toLocaleDateString('fr-FR')}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {payment.method === 'bank_transfer' ? 'Virement' :
                               payment.method === 'mobile_money' ? 'Mobile Money' :
                               payment.method === 'cash' ? 'Espèces' : 'Chèque'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={
                              payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                              payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {payment.status === 'completed' ? 'Complété' :
                               payment.status === 'pending' ? 'En attente' : 'Échoué'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {payment.reference}
                            </code>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Onglet Ressources */}
          <TabsContent value="resources" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Ressources et documents
                  </CardTitle>
                  <Button className="bg-crec-gold hover:bg-crec-lightgold">
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter une ressource
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <Download className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Aucune ressource n'a encore été ajoutée.</p>
                    <p className="text-sm">Ajoutez des documents, vidéos, ou liens utiles pour cette formation.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Onglet Paramètres */}
          <TabsContent value="settings" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Paramètres avancés
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">Actions de formation</h4>
                      <div className="flex flex-wrap gap-3">
                        <Button variant="outline">
                          <UserCheck className="mr-2 h-4 w-4" />
                          Confirmer tous les participants
                        </Button>
                        <Button variant="outline">
                          <Mail className="mr-2 h-4 w-4" />
                          Envoyer rappel de paiement
                        </Button>
                        <Button variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Exporter la liste
                        </Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-semibold mb-3 text-red-600">Zone de danger</h4>
                      <div className="space-y-3">
                        <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Supprimer cette formation
                        </Button>
                        <p className="text-sm text-gray-500">
                          Cette action est irréversible. Tous les participants et données associées seront supprimés.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default FormationDetail;
