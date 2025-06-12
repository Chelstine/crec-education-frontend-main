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
  BookOpen,
  Building2,
  GraduationCap,
  Star
} from 'lucide-react';

interface FormationOuverteInscription {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  ville: string;
  entreprise?: string;
  poste?: string;
  formation: string;
  session: string;
  dateInscription: string;
  statut: 'en_attente' | 'validee' | 'refusee' | 'incomplete';
  montantPaye: number;
  modePaiement: string;
  financement: 'personnel' | 'entreprise' | 'cpf' | 'pole_emploi';
  niveauExperience: 'debutant' | 'intermediaire' | 'avance';
  motivations: string;
  objectifsProfessionnels: string;
  besoinsSpecifiques?: string;
  commentaires?: string;
}

const InscriptionsFormationsOuvertes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [financementFilter, setFinancementFilter] = useState<string>('all');

  // Mock data pour les inscriptions Formations Ouvertes
  const [inscriptions] = useState<FormationOuverteInscription[]>([
    {
      id: 'FO001',
      nom: 'Rousseau',
      prenom: 'Marine',
      email: 'marine.rousseau@email.com',
      telephone: '06 12 34 56 78',
      ville: 'Lyon',
      entreprise: 'TechCorp',
      poste: 'Chef de projet',
      formation: 'Gestion de projet agile',
      session: 'Mars 2024 - Session 1',
      dateInscription: '2024-01-15',
      statut: 'validee',
      montantPaye: 1200,
      modePaiement: 'Virement entreprise',
      financement: 'entreprise',
      niveauExperience: 'intermediaire',
      motivations: 'Améliorer mes compétences en gestion agile pour mieux manager mon équipe',
      objectifsProfessionnels: 'Obtenir la certification Scrum Master et évoluer vers un poste de directeur technique'
    },
    {
      id: 'FO002',
      nom: 'Bernard',
      prenom: 'Paul',
      email: 'paul.bernard@email.com',
      telephone: '07 23 45 67 89',
      ville: 'Villeurbanne',
      formation: 'Leadership et management',
      session: 'Avril 2024 - Session 2',
      dateInscription: '2024-01-20',
      statut: 'en_attente',
      montantPaye: 0,
      modePaiement: '',
      financement: 'cpf',
      niveauExperience: 'avance',
      motivations: 'Développer mes compétences de leadership pour diriger une équipe plus importante',
      objectifsProfessionnels: 'Accéder à un poste de direction générale dans les 3 prochaines années',
      besoinsSpecifiques: 'Formation adaptée au secteur de la santé'
    },
    {
      id: 'FO003',
      nom: 'Moreau',
      prenom: 'Sophie',
      email: 'sophie.moreau@email.com',
      telephone: '06 34 56 78 90',
      ville: 'Bron',
      entreprise: 'Freelance',
      poste: 'Consultante',
      formation: 'Communication digitale',
      session: 'Mai 2024 - Session 1',
      dateInscription: '2024-01-18',
      statut: 'incomplete',
      montantPaye: 0,
      modePaiement: '',
      financement: 'personnel',
      niveauExperience: 'debutant',
      motivations: 'Me reconvertir dans le marketing digital',
      objectifsProfessionnels: 'Créer ma propre agence de communication digitale',
      commentaires: 'Dossier CPF en cours de validation'
    },
    {
      id: 'FO004',
      nom: 'Lefebvre',
      prenom: 'Antoine',
      email: 'antoine.lefebvre@email.com',
      telephone: '07 45 67 89 01',
      ville: 'Lyon',
      entreprise: 'Pôle Emploi',
      formation: 'Développement personnel',
      session: 'Juin 2024 - Session 3',
      dateInscription: '2024-01-22',
      statut: 'validee',
      montantPaye: 800,
      modePaiement: 'Financement Pôle Emploi',
      financement: 'pole_emploi',
      niveauExperience: 'debutant',
      motivations: 'Retrouver confiance en moi après une période de chômage',
      objectifsProfessionnels: 'Réussir ma reconversion professionnelle dans le secteur associatif'
    },
    {
      id: 'FO005',
      nom: 'Girard',
      prenom: 'Camille',
      email: 'camille.girard@email.com',
      telephone: '06 56 78 90 12',
      ville: 'Caluire',
      entreprise: 'StartupTech',
      poste: 'Développeuse',
      formation: 'Gestion de projet agile',
      session: 'Mars 2024 - Session 1',
      dateInscription: '2024-01-25',
      statut: 'refusee',
      montantPaye: 0,
      modePaiement: '',
      financement: 'personnel',
      niveauExperience: 'avance',
      motivations: 'Compléter mes compétences techniques par des compétences managériales',
      objectifsProfessionnels: 'Évoluer vers un poste de lead développeur',
      commentaires: 'Session complète, proposer une autre date'
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

  const getFinancementColor = (financement: string) => {
    switch (financement) {
      case 'entreprise': return 'bg-blue-100 text-blue-800';
      case 'cpf': return 'bg-green-100 text-green-800';
      case 'pole_emploi': return 'bg-purple-100 text-purple-800';
      case 'personnel': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInscriptions = inscriptions.filter(inscription => {
    const matchesSearch = `${inscription.nom} ${inscription.prenom} ${inscription.email} ${inscription.formation}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inscription.statut === statusFilter;
    const matchesFinancement = financementFilter === 'all' || inscription.financement === financementFilter;
    
    return matchesSearch && matchesStatus && matchesFinancement;
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
          <h1 className="text-3xl font-bold text-gray-900">Inscriptions Formations Ouvertes</h1>
          <p className="text-gray-600 mt-1">Gestion des inscriptions aux formations professionnelles et certifiantes</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exporter
          </Button>
          <Button className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
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
                value={financementFilter}
                onChange={(e) => setFinancementFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">Tous les financements</option>
                <option value="entreprise">Entreprise</option>
                <option value="cpf">CPF</option>
                <option value="pole_emploi">Pôle Emploi</option>
                <option value="personnel">Personnel</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des inscriptions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Inscriptions Formations Ouvertes ({filteredInscriptions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredInscriptions.map((inscription) => (
              <div key={inscription.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
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
                          <Badge className={getFinancementColor(inscription.financement)}>
                            {inscription.financement.replace('_', ' ')}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-600 mb-3">
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
                            <Star className="w-4 h-4" />
                            Niveau: {inscription.niveauExperience}
                          </div>
                          {inscription.entreprise && (
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4" />
                              {inscription.entreprise} {inscription.poste && `- ${inscription.poste}`}
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <div>
                            <p className="font-medium text-gray-900">{inscription.formation}</p>
                            <p className="text-sm text-gray-600">{inscription.session}</p>
                            {inscription.montantPaye > 0 && (
                              <p className="text-sm text-gray-600">
                                Montant payé: {inscription.montantPaye}€ ({inscription.modePaiement})
                              </p>
                            )}
                          </div>
                          
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-gray-700 mb-1">Motivations:</p>
                            <p className="text-sm text-gray-600">{inscription.motivations}</p>
                          </div>
                          
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-blue-700 mb-1">Objectifs professionnels:</p>
                            <p className="text-sm text-blue-600">{inscription.objectifsProfessionnels}</p>
                          </div>
                          
                          {inscription.besoinsSpecifiques && (
                            <div className="bg-orange-50 p-3 rounded-lg">
                              <p className="text-sm font-medium text-orange-700 mb-1">Besoins spécifiques:</p>
                              <p className="text-sm text-orange-600">{inscription.besoinsSpecifiques}</p>
                            </div>
                          )}
                          
                          {inscription.commentaires && (
                            <p className="text-sm text-orange-600 italic">
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

export default InscriptionsFormationsOuvertes;
