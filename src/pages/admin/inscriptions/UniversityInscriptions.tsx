import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import ApplicationDetailView from '@/components/admin/ApplicationDetailView';
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
  GraduationCap,
  User,
  Phone,
  Mail
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface UniversityApplication {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  program: string;
  submissionDate: string;
  status: 'pending' | 'accepted' | 'rejected';
  documents: {
    type: string;
    status: 'pending' | 'verified' | 'rejected';
  }[];
  paymentAmount: number;
  paymentStatus: 'pending' | 'verified' | 'rejected';
}

const UniversityInscriptions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [programFilter, setProgramFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [showDetailView, setShowDetailView] = useState(false);

  // Données mockées
  const applications: UniversityApplication[] = [
    {
      id: '1',
      applicantName: 'Marie Kouassi',
      email: 'marie.kouassi@email.com',
      phone: '+229 90 12 34 56',
      program: 'Licence en Informatique',
      submissionDate: '2024-06-08',
      status: 'pending',
      documents: [
        { type: 'Baccalauréat', status: 'verified' },
        { type: 'Relevé de notes', status: 'pending' },
        { type: 'Photo d\'identité', status: 'verified' }
      ],
      paymentAmount: 150000,
      paymentStatus: 'verified'
    },
    {
      id: '2',
      applicantName: 'Jean Togo',
      email: 'jean.togo@email.com',
      phone: '+229 97 65 43 21',
      program: 'Master en Gestion de Projet',
      submissionDate: '2024-06-07',
      status: 'accepted',
      documents: [
        { type: 'Licence', status: 'verified' },
        { type: 'CV', status: 'verified' },
        { type: 'Lettre de motivation', status: 'verified' }
      ],
      paymentAmount: 200000,
      paymentStatus: 'verified'
    },
    {
      id: '3',
      applicantName: 'Paul Mensah',
      email: 'paul.mensah@email.com',
      phone: '+229 94 11 22 33',
      program: 'Licence en Informatique',
      submissionDate: '2024-06-06',
      status: 'rejected',
      documents: [
        { type: 'Baccalauréat', status: 'rejected' },
        { type: 'Relevé de notes', status: 'pending' }
      ],
      paymentAmount: 150000,
      paymentStatus: 'pending'
    }
  ];

  const programs = [
    'Licence en Informatique',
    'Master en Gestion de Projet',
    'Licence en Développement Web'
  ];

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesProgram = programFilter === 'all' || app.program === programFilter;
    
    return matchesSearch && matchesStatus && matchesProgram;
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

  const getDocumentStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const exportData = () => {
    // Logique d'export (CSV/Excel)
    const data = filteredApplications.map(app => ({
      Nom: app.applicantName,
      Email: app.email,
      Programme: app.program,
      Statut: getStatusText(app.status),
      Date: app.submissionDate
    }));
    
    console.log('Export data:', data);
    // TODO: Implémenter l'export réel
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
              <GraduationCap className="w-8 h-8 text-blue-500" />
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher par nom ou email..."
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

            <Select value={programFilter} onValueChange={setProgramFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Programme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les programmes</SelectItem>
                {programs.map(program => (
                  <SelectItem key={program} value={program}>{program}</SelectItem>
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
            Candidatures universitaires ({filteredApplications.length})
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
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {application.applicantName}
                        </h3>
                        <p className="text-gray-600">{application.program}</p>
                      </div>
                      <Badge className={getStatusColor(application.status)}>
                        {getStatusText(application.status)}
                      </Badge>
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

                    {/* Documents et paiement */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Documents soumis</h4>
                        <div className="space-y-1">
                          {application.documents.map((doc, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              {getDocumentStatusIcon(doc.status)}
                              <span className="text-sm text-gray-600">{doc.type}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Paiement</h4>
                        <div className="flex items-center space-x-2">
                          <Euro className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium">{application.paymentAmount.toLocaleString()} FCFA</span>
                          <Badge className={getStatusColor(application.paymentStatus)}>
                            {application.paymentStatus === 'verified' ? 'Vérifié' : 
                             application.paymentStatus === 'pending' ? 'En attente' : 'Rejeté'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2 ml-4">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        // Convert application to detailed format
                        const detailedApp = {
                          id: application.id,
                          referenceNumber: `UNIV-${application.id.padStart(4, '0')}`,
                          applicantName: application.applicantName,
                          email: application.email,
                          phone: application.phone,
                          dateOfBirth: '1995-06-15', // Mock data
                          address: '123 Rue de l\'Université, Cotonou, Bénin', // Mock data
                          nationality: 'Béninoise', // Mock data
                          programName: application.program,
                          status: application.status,
                          submittedAt: application.submissionDate,
                          lastModified: application.submissionDate,
                          paymentStatus: application.paymentStatus === 'verified' ? 'completed' : 'pending',
                          documents: application.documents.map((doc, index) => ({
                            id: `doc-${index}`,
                            name: doc.type,
                            type: 'pdf' as const,
                            url: `/documents/${doc.type.toLowerCase().replace(/\s+/g, '-')}.pdf`,
                            size: 1024 * 512, // 512KB mock
                            uploadedAt: application.submissionDate,
                            status: doc.status === 'verified' ? 'approved' as const : 
                                   doc.status === 'rejected' ? 'rejected' as const : 'pending' as const
                          })),
                          motivation: 'Je suis très motivé(e) à rejoindre ce programme car il correspond parfaitement à mes aspirations professionnelles...', // Mock data
                          type: 'university' as const
                        };
                        setSelectedApplication(detailedApp);
                        setShowDetailView(true);
                      }}
                    >
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
                  Aucune candidature trouvée
                </h3>
                <p className="text-gray-600">
                  Aucune candidature ne correspond à vos critères de recherche.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Application Detail View */}
      {selectedApplication && (
        <ApplicationDetailView
          application={selectedApplication}
          isOpen={showDetailView}
          onClose={() => {
            setShowDetailView(false);
            setSelectedApplication(null);
          }}
          onStatusChange={(applicationId, newStatus, notes) => {
            console.log('Status change:', applicationId, newStatus, notes);
            // TODO: Implement status change logic
            setShowDetailView(false);
          }}
          onDocumentStatusChange={(documentId, status, notes) => {
            console.log('Document status change:', documentId, status, notes);
            // TODO: Implement document status change logic
          }}
        />
      )}
    </div>
  );
};

export default UniversityInscriptions;
