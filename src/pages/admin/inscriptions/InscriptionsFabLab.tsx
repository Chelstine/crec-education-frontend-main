import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CheckCircle, 
  XCircle,
  Clock,
  AlertTriangle,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  Wrench,
  Building2,
  GraduationCap
} from 'lucide-react';

interface FabLabInscription {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  ville: string;
  type: 'abonnement' | 'formation' | 'atelier';
  formule: string;
  dateInscription: string;
  statut: 'en_attente' | 'validee' | 'refusee' | 'incomplete';
  montantPaye: number;
  modePaiement: string;
  age: number;
  profession: string;
  niveauTechnique: 'debutant' | 'intermediaire' | 'avance';
  centresInteret: string[];
  commentaires?: string;
}

const InscriptionsFabLab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Mock data pour les inscriptions FabLab
  const [inscriptions] = useState<FabLabInscription[]>([
    {
      id: 'FAB001',
      nom: 'Martin',
      prenom: 'Alexandre',
      email: 'alexandre.martin@email.com',
      telephone: '06 12 34 56 78',
      ville: 'Lyon',
      type: 'abonnement',
      formule: 'Abonnement Maker - 3 mois',
      dateInscription: '2024-01-15',
      statut: 'validee',
      montantPaye: 150,
      modePaiement: 'CB',
      age: 28,
      profession: 'Ingénieur',
      niveauTechnique: 'intermediaire',
      centresInteret: ['Impression 3D', 'Électronique', 'Robotique']
    },
    {
      id: 'FAB002',
      nom: 'Dubois',
      prenom: 'Sarah',
      email: 'sarah.dubois@email.com',
      telephone: '07 23 45 67 89',
      ville: 'Villeurbanne',
      type: 'formation',
      formule: 'Formation Arduino Avancé',
      dateInscription: '2024-01-20',
      statut: 'en_attente',
      montantPaye: 80,
      modePaiement: 'Virement',
      age: 35,
      profession: 'Designer',
      niveauTechnique: 'avance',
      centresInteret: ['Arduino', 'IoT', 'Programmation']
    },
    {
      id: 'FAB003',
      nom: 'Leroy',
      prenom: 'Thomas',
      email: 'thomas.leroy@email.com',
      telephone: '06 34 56 78 90',
      ville: 'Lyon',
      type: 'atelier',
      formule: 'Atelier Découverte - Impression 3D',
      dateInscription: '2024-01-18',
      statut: 'incomplete',
      montantPaye: 0,
      modePaiement: '',
      age: 22,
      profession: 'Étudiant',
      niveauTechnique: 'debutant',
      centresInteret: ['Impression 3D', 'Design'],
      commentaires: 'Documents manquants'
    },
    {
      id: 'FAB004',
      nom: 'Garcia',
      prenom: 'Maria',
      email: 'maria.garcia@email.com',
      telephone: '07 45 67 89 01',
      ville: 'Bron',
      type: 'abonnement',
      formule: 'Abonnement Pro - 6 mois',
      dateInscription: '2024-01-22',
      statut: 'validee',
      montantPaye: 280,
      modePaiement: 'CB',
      age: 42,
      profession: 'Architecte',
      niveauTechnique: 'avance',
      centresInteret: ['Découpe laser', 'Prototypage', 'CAO']
    },
    {
      id: 'FAB005',
      nom: 'Petit',
      prenom: 'Julien',
      email: 'julien.petit@email.com',
      telephone: '06 56 78 90 12',
      ville: 'Lyon',
      type: 'formation',
      formule: 'Formation Fusion 360',
      dateInscription: '2024-01-25',
      statut: 'refusee',
      montantPaye: 0,
      modePaiement: '',
      age: 19,
      profession: 'Étudiant',
      niveauTechnique: 'debutant',
      centresInteret: ['CAO', 'Design industriel'],
      commentaires: 'Âge minimum requis non atteint'
    }
  ]);

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'validee': return 'bg-green-100 text-green-800';
      case 'en_attente': return 'bg-yellow-100 text-yellow-800';
      case 'refusee': return 'bg-red-100 text-red-800';
      case 'incomplete': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'validee': return <CheckCircle className="w-4 h-4" />;
      case 'en_attente': return <Clock className="w-4 h-4" />;
      case 'refusee': return <XCircle className="w-4 h-4" />;
      case 'incomplete': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'abonnement': return 'bg-blue-100 text-blue-800';
      case 'formation': return 'bg-purple-100 text-purple-800';
      case 'atelier': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInscriptions = inscriptions.filter(inscription => {
    const matchesSearch = `${inscription.nom} ${inscription.prenom} ${inscription.email} ${inscription.formule}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inscription.statut === statusFilter;
    const matchesType = typeFilter === 'all' || inscription.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    total: inscriptions.length,
    validees: inscriptions.filter(i => i.statut === 'validee').length,
    enAttente: inscriptions.filter(i => i.statut === 'en_attente').length,
    incompletes: inscriptions.filter(i => i.statut === 'incomplete').length,
    refusees: inscriptions.filter(i => i.statut === 'refusee').length,
    revenueTotal: inscriptions
      .filter(i => i.statut === 'validee')
      .reduce((sum, i) => sum + i.montantPaye, 0)
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inscriptions FabLab</h1>
          <p className="text-gray-600 mt-1">Gestion des inscriptions aux abonnements, formations et ateliers</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exporter
          </Button>
          <Button className="flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            Nouvelle inscription
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Validées</p>
                <p className="text-2xl font-bold text-green-600">{stats.validees}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">En attente</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.enAttente}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Incomplètes</p>
                <p className="text-2xl font-bold text-orange-600">{stats.incompletes}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Refusées</p>
                <p className="text-2xl font-bold text-red-600">{stats.refusees}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Revenus</p>
                <p className="text-2xl font-bold text-purple-600">{stats.revenueTotal}€</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher par nom, email ou formation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">Tous les statuts</option>
                <option value="en_attente">En attente</option>
                <option value="validee">Validées</option>
                <option value="incomplete">Incomplètes</option>
                <option value="refusee">Refusées</option>
              </select>
              
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">Tous les types</option>
                <option value="abonnement">Abonnements</option>
                <option value="formation">Formations</option>
                <option value="atelier">Ateliers</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des inscriptions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="w-5 h-5" />
            Inscriptions FabLab ({filteredInscriptions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredInscriptions.map((inscription) => (
              <div key={inscription.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">
                            {inscription.prenom} {inscription.nom}
                          </h3>
                          <Badge className={getStatusColor(inscription.statut)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(inscription.statut)}
                              {inscription.statut.replace('_', ' ')}
                            </div>
                          </Badge>
                          <Badge className={getTypeColor(inscription.type)}>
                            {inscription.type}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {inscription.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {inscription.telephone}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {inscription.ville}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(inscription.dateInscription).toLocaleDateString('fr-FR')}
                          </div>
                          <div className="flex items-center gap-2">
                            <GraduationCap className="w-4 h-4" />
                            Niveau: {inscription.niveauTechnique}
                          </div>
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4" />
                            {inscription.profession} ({inscription.age} ans)
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <p className="font-medium text-gray-900">{inscription.formule}</p>
                          {inscription.montantPaye > 0 && (
                            <p className="text-sm text-gray-600">
                              Montant payé: {inscription.montantPaye}€ ({inscription.modePaiement})
                            </p>
                          )}
                          {inscription.centresInteret.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {inscription.centresInteret.map((centre, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {centre}
                                </Badge>
                              ))}
                            </div>
                          )}
                          {inscription.commentaires && (
                            <p className="text-sm text-orange-600 mt-2 italic">
                              Note: {inscription.commentaires}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Voir détail
                    </Button>
                    
                    {inscription.statut === 'en_attente' && (
                      <>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Valider
                        </Button>
                        <Button variant="destructive" size="sm">
                          <XCircle className="w-4 h-4 mr-1" />
                          Refuser
                        </Button>
                      </>
                    )}
                    
                    {inscription.statut === 'incomplete' && (
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Relancer
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InscriptionsFabLab;
