import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  Download,
  FileText,
  Calendar,
  Euro,
  BookOpen,
  User,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FormationApplication {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  formation: string;
  category: string;
  submissionDate: string;
  status: 'pending' | 'accepted' | 'rejected';
  paymentAmount: number;
  paymentStatus: 'pending' | 'verified' | 'rejected';
  motivation: string;
  experience: string;
}

const FormationsInscriptions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Données mockées
  const applications: FormationApplication[] = [
    {
      id: '1',
      applicantName: 'Sophie Kone',
      email: 'sophie.kone@email.com',
      phone: '+229 90 11 22 33',
      formation: 'Formation Arduino - Niveau Débutant',
      category: 'Électronique',
      submissionDate: '2024-06-09',
      status: 'pending',
      paymentAmount: 75000,
      paymentStatus: 'verified',
      motivation: 'Je souhaite apprendre l\'électronique pour créer des projets IoT',
      experience: 'Débutant complet en électronique'
    },
    {
      id: '2',
      applicantName: 'David Asante',
      email: 'david.asante@email.com',
      phone: '+229 97 44 55 66',
      formation: 'Développement Web Moderne',
      category: 'Informatique',
      submissionDate: '2024-06-08',
      status: 'accepted',
      paymentAmount: 120000,
      paymentStatus: 'verified',
      motivation: 'Reconversion professionnelle vers le développement web',
      experience: 'Bases en HTML/CSS, souhaite apprendre React'
    },
    {
      id: '3',
      applicantName: 'Fatou Diallo',
      email: 'fatou.diallo@email.com',
      phone: '+229 94 77 88 99',
      formation: 'Design Graphique et Communication',
      category: 'Design',
      submissionDate: '2024-06-07',
      status: 'pending',
      paymentAmount: 90000,
      paymentStatus: 'pending',
      motivation: 'Améliorer mes compétences en design pour mon entreprise',
      experience: 'Utilise Canva, souhaite maîtriser Photoshop et Illustrator'
    },
    {
      id: '4',
      applicantName: 'Emmanuel Togo',
      email: 'emmanuel.togo@email.com',
      phone: '+229 91 33 44 55',
      formation: 'Impression 3D et Prototypage',
      category: 'Fabrication',
      submissionDate: '2024-06-06',
      status: 'rejected',
      paymentAmount: 85000,
      paymentStatus: 'rejected',
      motivation: 'Créer des prototypes pour mon startup',
      experience: 'Aucune expérience en impression 3D'
    }
  ];

  const categories = ['Électronique', 'Informatique', 'Design', 'Fabrication'];

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.formation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || app.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'accepted': return 'Acceptée';
      case 'rejected': return 'Refusée';
      default: return status;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Électronique': return 'bg-blue-100 text-blue-800';
      case 'Informatique': return 'bg-purple-100 text-purple-800';
      case 'Design': return 'bg-pink-100 text-pink-800';
      case 'Fabrication': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const exportData = () => {
    const data = filteredApplications.map(app => ({
      Nom: app.applicantName,
      Email: app.email,
      Formation: app.formation,
      Catégorie: app.category,
      Statut: getStatusText(app.status),
      Date: app.submissionDate
    }));
    
    console.log('Export data:', data);
    alert('Export en cours de développement');
  };

  return (
    <div className="space-y-6">
      {/* Header avec statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En attente</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {applications.filter(app => app.status === 'pending').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Acceptées</p>
                <p className="text-2xl font-bold text-green-600">
                  {applications.filter(app => app.status === 'accepted').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Refusées</p>
                <p className="text-2xl font-bold text-red-600">
                  {applications.filter(app => app.status === 'rejected').length}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-slate-900">
                  {applications.length}
                </p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filtres et recherche
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher par nom, email ou formation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="accepted">Acceptées</SelectItem>
                <SelectItem value="rejected">Refusées</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button onClick={exportData} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Liste des candidatures */}
      <Card>
        <CardHeader>
          <CardTitle>
            Inscriptions formations ouvertes ({filteredApplications.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredApplications.map((application) => (
              <motion.div
                key={application.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Informations principales */}
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900">
                          {application.applicantName}
                        </h3>
                        <p className="text-gray-600 font-medium">{application.formation}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getCategoryColor(application.category)}>
                            {application.category}
                          </Badge>
                          <Badge className={getStatusColor(application.status)}>
                            {getStatusText(application.status)}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Informations de contact */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{application.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{application.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {new Date(application.submissionDate).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>

                    {/* Motivation et expérience */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">💭 Motivation</h4>
                        <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                          "{application.motivation}"
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">🎯 Expérience</h4>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                          {application.experience}
                        </p>
                      </div>
                    </div>

                    {/* Paiement */}
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Euro className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium">{application.paymentAmount.toLocaleString()} FCFA</span>
                        <Badge className={getStatusColor(application.paymentStatus)}>
                          {application.paymentStatus === 'verified' ? 'Paiement vérifié' : 
                           application.paymentStatus === 'pending' ? 'Paiement en attente' : 'Paiement rejeté'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2 ml-4">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Voir le dossier
                    </Button>
                    {application.status === 'pending' && (
                      <>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Accepter
                        </Button>
                        <Button size="sm" variant="destructive">
                          <XCircle className="w-4 h-4 mr-2" />
                          Refuser
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredApplications.length === 0 && (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aucune inscription trouvée
                </h3>
                <p className="text-gray-600">
                  Aucune inscription ne correspond à vos critères de recherche.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormationsInscriptions;
