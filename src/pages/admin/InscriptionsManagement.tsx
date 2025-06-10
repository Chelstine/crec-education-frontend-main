import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  User,
  Phone,
  Mail,
  AlertCircle,
  Send,
  X
} from 'lucide-react';

interface Application {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  program: string;
  category: 'university' | 'formations' | 'fablab';
  submissionDate: string;
  status: 'pending' | 'accepted' | 'rejected';
  documents: {
    name: string;
    type: string;
    status: 'pending' | 'valid' | 'invalid';
    url: string;
  }[];
  paymentReceipt?: {
    amount: number;
    status: 'pending' | 'valid' | 'invalid';
    url: string;
  };
  notes?: string;
}

const InscriptionsManagement: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [timeFilter, setTimeFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'pending' | 'accepted' | 'rejected'>('pending');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [emailContent, setEmailContent] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [loading, setLoading] = useState(true);

  // Données mockées
  useEffect(() => {
    const mockApplications: Application[] = [
      {
        id: '1',
        applicantName: 'Marie Kouassi',
        email: 'marie.kouassi@email.com',
        phone: '+229 90 12 34 56',
        program: 'Licence en Informatique',
        category: 'university',
        submissionDate: '2024-06-08',
        status: 'pending',
        documents: [
          { name: 'Acte de naissance', type: 'PDF', status: 'valid', url: '/docs/acte.pdf' },
          { name: 'Diplôme du Bac', type: 'PDF', status: 'pending', url: '/docs/bac.pdf' },
          { name: 'Photo d\'identité', type: 'JPG', status: 'valid', url: '/docs/photo.jpg' }
        ],
        paymentReceipt: {
          amount: 150000,
          status: 'valid',
          url: '/docs/receipt.jpg'
        }
      },
      {
        id: '2',
        applicantName: 'Jean Togo',
        email: 'jean.togo@email.com',
        phone: '+229 97 65 43 21',
        program: 'Formation Arduino',
        category: 'formations',
        submissionDate: '2024-06-07',
        status: 'pending',
        documents: [
          { name: 'Pièce d\'identité', type: 'PDF', status: 'valid', url: '/docs/id.pdf' }
        ],
        paymentReceipt: {
          amount: 25000,
          status: 'pending',
          url: '/docs/receipt2.jpg'
        }
      },
      {
        id: '3',
        applicantName: 'Paul Mensah',
        email: 'paul.mensah@email.com',
        phone: '+229 94 88 77 66',
        program: 'Abonnement Mensuel FabLab',
        category: 'fablab',
        submissionDate: '2024-06-06',
        status: 'accepted',
        documents: [
          { name: 'Pièce d\'identité', type: 'PDF', status: 'valid', url: '/docs/id3.pdf' }
        ],
        paymentReceipt: {
          amount: 15000,
          status: 'valid',
          url: '/docs/receipt3.jpg'
        }
      }
    ];

    setTimeout(() => {
      setApplications(mockApplications);
      setFilteredApplications(mockApplications);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtrage
  useEffect(() => {
    let filtered = applications.filter(app => {
      const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.program.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || app.category === categoryFilter;
      const matchesTab = app.status === activeTab;
      
      let matchesTime = true;
      if (timeFilter !== 'all') {
        const submissionDate = new Date(app.submissionDate);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - submissionDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (timeFilter === 'today') matchesTime = daysDiff === 0;
        else if (timeFilter === 'week') matchesTime = daysDiff <= 7;
        else if (timeFilter === 'month') matchesTime = daysDiff <= 30;
      }
      
      return matchesSearch && matchesCategory && matchesTab && matchesTime;
    });

    setFilteredApplications(filtered);
  }, [applications, searchTerm, categoryFilter, activeTab, timeFilter]);

  const handleViewApplication = (application: Application) => {
    setSelectedApplication(application);
    
    // Pré-remplir l'email selon la catégorie
    let defaultEmail = '';
    if (application.category === 'university') {
      defaultEmail = `Cher(e) ${application.applicantName},\n\nNous avons examiné votre candidature pour le programme "${application.program}".\n\n[DÉCISION À COMPLÉTER]\n\nCordialement,\nL'équipe d'admission CREC`;
    } else if (application.category === 'formations') {
      defaultEmail = `Bonjour ${application.applicantName},\n\nVotre inscription à la formation "${application.program}" a été traitée.\n\n[DÉCISION À COMPLÉTER]\n\nL'équipe formation CREC`;
    } else if (application.category === 'fablab') {
      defaultEmail = `Bonjour ${application.applicantName},\n\nVotre demande d'abonnement FabLab "${application.program}" a été examinée.\n\n[DÉCISION À COMPLÉTER]\n\nL'équipe FabLab CREC`;
    }
    
    setEmailContent(defaultEmail);
    setShowModal(true);
  };

  const handleAcceptApplication = () => {
    if (!selectedApplication) return;

    const updatedEmail = emailContent.replace('[DÉCISION À COMPLÉTER]', 
      selectedApplication.category === 'university' 
        ? 'Félicitations ! Vous êtes admis(e). Vous recevrez les détails d\'inscription sous 48h.'
        : selectedApplication.category === 'fablab'
        ? 'Votre abonnement est activé ! Récupérez votre badge à l\'accueil.'
        : 'Votre inscription est confirmée ! Détails par email sous 24h.'
    );

    // Simuler envoi email
    console.log('Email d\'acceptation envoyé:', { 
      to: selectedApplication.email, 
      content: updatedEmail 
    });

    // Mettre à jour le statut
    setApplications(prev => prev.map(app => 
      app.id === selectedApplication.id 
        ? { ...app, status: 'accepted' as const }
        : app
    ));

    setShowModal(false);
    setSelectedApplication(null);
    
    // Notification (en production, utiliser toast)
    alert(`Email d'acceptation envoyé à ${selectedApplication.applicantName}`);
  };

  const handleRejectApplication = () => {
    if (!selectedApplication || !rejectionReason.trim()) {
      alert('Veuillez indiquer un motif de refus');
      return;
    }

    const rejectionEmail = emailContent.replace('[DÉCISION À COMPLÉTER]', 
      `Nous regrettons de ne pas pouvoir donner suite favorable à votre candidature.\n\nMotif: ${rejectionReason}\n\nNous vous encourageons à postuler à nouveau après avoir pris en compte ces remarques.`
    );

    // Simuler envoi email
    console.log('Email de refus envoyé:', { 
      to: selectedApplication.email, 
      content: rejectionEmail,
      reason: rejectionReason
    });

    // Mettre à jour le statut
    setApplications(prev => prev.map(app => 
      app.id === selectedApplication.id 
        ? { ...app, status: 'rejected' as const, notes: rejectionReason }
        : app
    ));

    setShowModal(false);
    setSelectedApplication(null);
    setRejectionReason('');
    
    // Notification
    alert(`Email de refus envoyé à ${selectedApplication.applicantName}`);
  };

  const updateDocumentStatus = (docIndex: number, status: 'valid' | 'invalid') => {
    if (!selectedApplication) return;
    
    const updatedDocs = [...selectedApplication.documents];
    updatedDocs[docIndex].status = status;
    
    setSelectedApplication({
      ...selectedApplication,
      documents: updatedDocs
    });
  };

  const updatePaymentStatus = (status: 'valid' | 'invalid') => {
    if (!selectedApplication?.paymentReceipt) return;
    
    setSelectedApplication({
      ...selectedApplication,
      paymentReceipt: {
        ...selectedApplication.paymentReceipt,
        status
      }
    });
  };

  const exportApplications = () => {
    console.log('Export des candidatures:', filteredApplications);
    // En production: générer et télécharger Excel/PDF
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'university': return 'bg-blue-100 text-blue-800';
      case 'formations': return 'bg-green-100 text-green-800';
      case 'fablab': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'university': return 'Université';
      case 'formations': return 'Formations';
      case 'fablab': return 'FabLab';
      default: return category;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-crec-gold"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestion des inscriptions</h1>
          <p className="text-gray-600">Vérifiez et gérez les dossiers des candidats</p>
        </div>
        <button
          onClick={exportApplications}
          className="flex items-center space-x-2 bg-crec-gold text-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Exporter la liste</span>
        </button>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Rechercher par nom ou programme"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-crec-gold focus:border-transparent"
            />
          </div>

          {/* Filtre catégorie */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crec-gold focus:border-transparent"
          >
            <option value="all">Toutes les catégories</option>
            <option value="university">Université</option>
            <option value="formations">Formations Ouvertes</option>
            <option value="fablab">FabLab</option>
          </select>

          {/* Filtre temps */}
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crec-gold focus:border-transparent"
          >
            <option value="all">Toutes les dates</option>
            <option value="today">Aujourd'hui</option>
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
          </select>

          {/* Bouton d'aide */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center cursor-help" title="Cliquez sur 'Voir' pour examiner un dossier complet">
              <span className="text-blue-600 font-bold text-sm">?</span>
            </div>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {(['pending', 'accepted', 'rejected'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-crec-gold text-crec-gold'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'pending' && 'En attente'}
                {tab === 'accepted' && 'Acceptés'}
                {tab === 'rejected' && 'Refusés'}
                <span className="ml-2 bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-1">
                  {applications.filter(app => app.status === tab).length}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tableau des candidatures */}
        <div className="p-6">
          {filteredApplications.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Candidat
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Programme
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Catégorie
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredApplications.map((application) => (
                    <motion.tr
                      key={application.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-crec-gold rounded-full flex items-center justify-center mr-3">
                            <User className="h-5 w-5 text-black" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {application.applicantName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {application.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{application.program}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(application.category)}`}>
                          {getCategoryLabel(application.category)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(application.submissionDate).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleViewApplication(application)}
                          className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                          <span>Voir</span>
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucune candidature trouvée
              </h3>
              <p className="text-gray-600">
                Aucune candidature ne correspond à vos critères de recherche.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de vérification */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Vérification du dossier</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Informations candidat */}
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-800 mb-3">Informations du candidat</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{selectedApplication.applicantName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{selectedApplication.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{selectedApplication.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{new Date(selectedApplication.submissionDate).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="font-medium">Programme: </span>
                  <span>{selectedApplication.program}</span>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h4 className="font-semibold text-slate-800 mb-3">Documents soumis</h4>
                <p className="text-sm text-gray-600 mb-4">
                  PDF pour documents officiels, JPG/PNG pour photos (max 5 Mo)
                </p>
                <div className="space-y-3">
                  {selectedApplication.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-500">{doc.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => window.open(doc.url, '_blank')}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Voir
                        </button>
                        <button
                          onClick={() => window.open(doc.url, '_blank')}
                          className="text-gray-600 hover:text-gray-800 text-sm"
                        >
                          Télécharger
                        </button>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => updateDocumentStatus(index, 'valid')}
                            className={`px-2 py-1 text-xs rounded ${
                              doc.status === 'valid' 
                                ? 'bg-green-600 text-white' 
                                : 'bg-gray-200 text-gray-700 hover:bg-green-200'
                            }`}
                          >
                            Valide
                          </button>
                          <button
                            onClick={() => updateDocumentStatus(index, 'invalid')}
                            className={`px-2 py-1 text-xs rounded ${
                              doc.status === 'invalid' 
                                ? 'bg-red-600 text-white' 
                                : 'bg-gray-200 text-gray-700 hover:bg-red-200'
                            }`}
                          >
                            Invalide
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reçu de paiement */}
              {selectedApplication.paymentReceipt && (
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">Reçu de paiement</h4>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Montant: {selectedApplication.paymentReceipt.amount.toLocaleString()} FCFA</p>
                        <p className="text-sm text-gray-500">Reçu de paiement</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => window.open(selectedApplication.paymentReceipt!.url, '_blank')}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Voir
                      </button>
                      <button
                        onClick={() => window.open(selectedApplication.paymentReceipt!.url, '_blank')}
                        className="text-gray-600 hover:text-gray-800 text-sm"
                      >
                        Télécharger
                      </button>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => updatePaymentStatus('valid')}
                          className={`px-2 py-1 text-xs rounded ${
                            selectedApplication.paymentReceipt!.status === 'valid' 
                              ? 'bg-green-600 text-white' 
                              : 'bg-gray-200 text-gray-700 hover:bg-green-200'
                          }`}
                        >
                          Valide
                        </button>
                        <button
                          onClick={() => updatePaymentStatus('invalid')}
                          className={`px-2 py-1 text-xs rounded ${
                            selectedApplication.paymentReceipt!.status === 'invalid' 
                              ? 'bg-red-600 text-white' 
                              : 'bg-gray-200 text-gray-700 hover:bg-red-200'
                          }`}
                        >
                          Invalide
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Zone de commentaires */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes sur le dossier
                </label>
                <textarea
                  rows={3}
                  placeholder="Ex: Reçu de paiement flou, documents en ordre..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crec-gold focus:border-transparent"
                />
              </div>

              {/* Message à envoyer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message à envoyer au candidat
                </label>
                <textarea
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crec-gold focus:border-transparent"
                />
              </div>

              {/* Zone de refus */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Motif de refus (si applicable)
                </label>
                <input
                  type="text"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Ex: Document manquant, paiement insuffisant..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crec-gold focus:border-transparent"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Fermer
              </button>
              <button
                onClick={handleRejectApplication}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <XCircle className="h-4 w-4" />
                <span>Refuser</span>
              </button>
              <button
                onClick={handleAcceptApplication}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Accepter et envoyer</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default InscriptionsManagement;
