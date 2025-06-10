import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  FileText, 
  Download, 
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Send,
  MessageSquare,
  AlertTriangle,
  Star,
  Flag
} from 'lucide-react';
import DocumentViewer from './DocumentViewer';
import EmailNotification from './EmailNotification';

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'doc';
  url: string;
  size: number;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
}

interface Application {
  id: string;
  referenceNumber: string;
  applicantName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  nationality: string;
  programName: string;
  status: 'pending' | 'under_review' | 'accepted' | 'rejected' | 'waitlist';
  submittedAt: string;
  lastModified: string;
  paymentStatus: 'pending' | 'partial' | 'completed';
  documents: Document[];
  motivation?: string;
  experience?: string;
  priorities?: string[];
  notes?: string;
  score?: number;
  reviewedBy?: string;
  reviewDate?: string;
  type: 'university' | 'formation' | 'fablab';
}

interface ApplicationDetailViewProps {
  application: Application;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (applicationId: string, newStatus: string, notes?: string) => void;
  onDocumentStatusChange: (documentId: string, status: 'approved' | 'rejected', notes?: string) => void;
}

const ApplicationDetailView: React.FC<ApplicationDetailViewProps> = ({
  application,
  isOpen,
  onClose,
  onStatusChange,
  onDocumentStatusChange
}) => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailType, setEmailType] = useState<'acceptance' | 'rejection' | 'reminder'>('acceptance');
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'timeline'>('overview');
  const [notes, setNotes] = useState(application.notes || '');
  const [score, setScore] = useState(application.score || 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'under_review': return 'text-blue-600 bg-blue-100';
      case 'waitlist': return 'text-orange-600 bg-orange-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'partial': return 'text-yellow-600 bg-yellow-100';
      case 'pending': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDocumentStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const handleSendEmail = async (emailData: any) => {
    console.log('Sending email:', emailData);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowEmailModal(false);
  };

  const handleStatusUpdate = (newStatus: string) => {
    onStatusChange(application.id, newStatus, notes);
  };

  const calculateDocumentCompletionPercentage = () => {
    if (application.documents.length === 0) return 0;
    const reviewedDocs = application.documents.filter(doc => doc.status !== 'pending').length;
    return Math.round((reviewedDocs / application.documents.length) * 100);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg max-w-6xl w-full h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-slate-50 to-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{application.applicantName}</h2>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <FileText className="h-4 w-4 mr-1" />
                    {application.referenceNumber}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(application.submittedAt).toLocaleDateString('fr-FR')}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                    {application.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Score */}
              {score > 0 && (
                <div className="flex items-center space-x-2 px-3 py-2 bg-white rounded-lg border">
                  <Star className={`h-4 w-4 ${getScoreColor(score)}`} />
                  <span className={`font-medium ${getScoreColor(score)}`}>{score}/100</span>
                </div>
              )}
              
              {/* Quick Actions */}
              <button
                onClick={() => {
                  setEmailType('acceptance');
                  setShowEmailModal(true);
                }}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                title="Envoyer acceptation"
              >
                <CheckCircle className="h-5 w-5" />
              </button>
              <button
                onClick={() => {
                  setEmailType('rejection');
                  setShowEmailModal(true);
                }}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                title="Envoyer refus"
              >
                <XCircle className="h-5 w-5" />
              </button>
              <button
                onClick={() => {
                  setEmailType('reminder');
                  setShowEmailModal(true);
                }}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                title="Envoyer rappel"
              >
                <Send className="h-5 w-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Vue d\'ensemble', icon: User },
              { id: 'documents', label: 'Documents', icon: FileText },
              { id: 'timeline', label: 'Historique', icon: Clock }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
                {tab.id === 'documents' && (
                  <span className="bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-1">
                    {application.documents.length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Personal Information */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Informations personnelles</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{application.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Téléphone</p>
                        <p className="font-medium">{application.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Date de naissance</p>
                        <p className="font-medium">{new Date(application.dateOfBirth).toLocaleDateString('fr-FR')}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Flag className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Nationalité</p>
                        <p className="font-medium">{application.nationality}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 col-span-2">
                      <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Adresse</p>
                        <p className="font-medium">{application.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Application Details */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Détails de la candidature</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Programme</p>
                      <p className="font-medium text-lg">{application.programName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Statut de paiement</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(application.paymentStatus)}`}>
                        {application.paymentStatus === 'completed' && 'Payé'}
                        {application.paymentStatus === 'partial' && 'Partiel'}
                        {application.paymentStatus === 'pending' && 'En attente'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Motivation & Experience */}
                {(application.motivation || application.experience) && (
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Motivation et expérience</h3>
                    {application.motivation && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Lettre de motivation</h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-700 whitespace-pre-wrap">{application.motivation}</p>
                        </div>
                      </div>
                    )}
                    {application.experience && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Expérience</h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-700 whitespace-pre-wrap">{application.experience}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Priorities */}
                {application.priorities && application.priorities.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Priorités/Intérêts</h3>
                    <div className="flex flex-wrap gap-2">
                      {application.priorities.map((priority, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {priority}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-4">
                {/* Documents Progress */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Progression de la vérification</h3>
                    <span className="text-sm text-gray-600">
                      {calculateDocumentCompletionPercentage()}% complété
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${calculateDocumentCompletionPercentage()}%` }}
                    />
                  </div>
                </div>

                {/* Documents List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {application.documents.map((document) => (
                    <motion.div
                      key={document.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {getDocumentStatusIcon(document.status)}
                          <div>
                            <h4 className="font-medium text-gray-900">{document.name}</h4>
                            <p className="text-sm text-gray-500">
                              {(document.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedDocument(document)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            title="Voir le document"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <a
                            href={document.url}
                            download
                            className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                            title="Télécharger"
                          >
                            <Download className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(document.status)}`}>
                          {document.status === 'approved' && 'Approuvé'}
                          {document.status === 'rejected' && 'Rejeté'}
                          {document.status === 'pending' && 'En attente'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(document.uploadedAt).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      
                      {document.notes && (
                        <div className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-600">
                          {document.notes}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'timeline' && (
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Historique des actions</h3>
                  <div className="space-y-4">
                    {/* Mock timeline events */}
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <FileText className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Candidature soumise</p>
                        <p className="text-sm text-gray-600">{new Date(application.submittedAt).toLocaleString('fr-FR')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Clock className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium">Dossier en cours de révision</p>
                        <p className="text-sm text-gray-600">Il y a 2 jours</p>
                      </div>
                    </div>
                    
                    {application.reviewDate && (
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Dossier évalué</p>
                          <p className="text-sm text-gray-600">{new Date(application.reviewDate).toLocaleString('fr-FR')}</p>
                          {application.reviewedBy && (
                            <p className="text-sm text-gray-500">Par {application.reviewedBy}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Actions */}
          <div className="w-80 border-l border-gray-200 bg-gray-50 p-6 space-y-6">
            {/* Quick Status Update */}
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold mb-3">Actions rapides</h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleStatusUpdate('accepted')}
                  className="p-2 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
                >
                  <CheckCircle className="h-4 w-4 mx-auto mb-1" />
                  Accepter
                </button>
                <button
                  onClick={() => handleStatusUpdate('rejected')}
                  className="p-2 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                >
                  <XCircle className="h-4 w-4 mx-auto mb-1" />
                  Rejeter
                </button>
                <button
                  onClick={() => handleStatusUpdate('under_review')}
                  className="p-2 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                >
                  <Eye className="h-4 w-4 mx-auto mb-1" />
                  Révision
                </button>
                <button
                  onClick={() => handleStatusUpdate('waitlist')}
                  className="p-2 bg-orange-100 text-orange-700 rounded text-sm hover:bg-orange-200"
                >
                  <Clock className="h-4 w-4 mx-auto mb-1" />
                  Liste d'attente
                </button>
              </div>
            </div>

            {/* Score */}
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold mb-3">Évaluation</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Score (0-100)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={score}
                    onChange={(e) => setScore(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold mb-3">Notes internes</h4>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={6}
                placeholder="Ajouter des notes sur cette candidature..."
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Document Viewer Modal */}
      {selectedDocument && (
        <DocumentViewer
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
          onStatusChange={onDocumentStatusChange}
        />
      )}

      {/* Email Notification Modal */}
      {showEmailModal && (
        <EmailNotification
          isOpen={showEmailModal}
          onClose={() => setShowEmailModal(false)}
          recipient={{
            id: application.id,
            name: application.applicantName,
            email: application.email,
            type: application.type
          }}
          notificationType={emailType}
          applicationData={{
            programName: application.programName,
            applicationDate: application.submittedAt,
            referenceNumber: application.referenceNumber
          }}
          onSend={handleSendEmail}
        />
      )}
    </div>
  );
};

export default ApplicationDetailView;
