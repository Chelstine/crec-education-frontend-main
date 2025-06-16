import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Send, 
  X, 
  User, 
  FileText, 
  Calendar,
  Check,
  AlertCircle,
  Eye
} from 'lucide-react';

interface EmailNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: {
    id: string;
    name: string;
    email: string;
    type: 'university' | 'formation' | 'fablab';
  };
  notificationType: 'acceptance' | 'rejection' | 'reminder' | 'custom';
  applicationData?: {
    programName?: string;
    applicationDate?: string;
    referenceNumber?: string;
    startDate?: string;
  };
  onSend: (emailData: EmailData) => Promise<void>;
}

interface EmailData {
  to: string;
  subject: string;
  content: string;
  type: string;
  applicationId?: string;
}

interface EmailTemplate {
  subject: string;
  content: string;
}

const EmailNotification: React.FC<EmailNotificationProps> = ({
  isOpen,
  onClose,
  recipient,
  notificationType,
  applicationData,
  onSend
}) => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Email templates based on type
  const getEmailTemplate = (): EmailTemplate => {
    const templates = {
      acceptance: {
        university: {
          subject: `Félicitations - Admission confirmée au programme ${applicationData?.programName || '[Programme]'}`,
          content: `Cher(e) ${recipient.name},

Nous avons le grand plaisir de vous informer que votre candidature pour le programme ${applicationData?.programName || '[Programme]'} a été acceptée.

Détails de votre candidature :
- Numéro de référence : ${applicationData?.referenceNumber || '[Référence]'}
- Date de candidature : ${applicationData?.applicationDate ? new Date(applicationData.applicationDate).toLocaleDateString('fr-FR') : '[Date]'}
- Date de début prévue : ${applicationData?.startDate ? new Date(applicationData.startDate).toLocaleDateString('fr-FR') : '[Date de début]'}

Prochaines étapes :
1. Vous recevrez sous 48h un email avec les détails d'inscription
2. Les frais de scolarité devront être réglés avant le début des cours
3. Une séance d'orientation aura lieu une semaine avant le début des cours

Nous sommes ravis de vous accueillir dans notre communauté étudiante et nous réjouissons de votre réussite académique.

Cordialement,
L'équipe d'admission CREC

---
Centre de Recherche et d'Excellence Créative
Email: crecjesuitesbenin@gmail.com
Téléphone: +229 01 20 22 23 03
Mobile: +229 01 67 76 15 15`
        },
        formation: {
          subject: `Inscription confirmée - Formation ${applicationData?.programName || '[Formation]'}`,
          content: `Bonjour ${recipient.name},

Votre inscription à la formation "${applicationData?.programName || '[Formation]'}" a été confirmée avec succès.

Informations importantes :
- Référence d'inscription : ${applicationData?.referenceNumber || '[Référence]'}
- Date de début : ${applicationData?.startDate ? new Date(applicationData.startDate).toLocaleDateString('fr-FR') : '[Date]'}
- Modalité : [Présentiel/Distanciel]

Documents à prévoir pour le premier jour :
- Pièce d'identité
- Confirmation d'inscription (ce email)

Vous recevrez les détails pratiques (lieu, horaires, matériel requis) par email 3 jours avant le début de la formation.

À bientôt,
L'équipe formation CREC`
        },
        fablab: {
          subject: 'Abonnement FabLab activé - Bienvenue !',
          content: `Bonjour ${recipient.name},

Votre abonnement au FabLab CREC a été activé avec succès !

Détails de votre abonnement :
- Type d'abonnement : [Type]
- Date d'activation : ${new Date().toLocaleDateString('fr-FR')}
- Validité jusqu'au : [Date de fin]

Prochaines étapes :
1. Récupérez votre badge d'accès à l'accueil (horaires : 9h-18h)
2. Participez à la session d'initiation obligatoire
3. Réservez vos créneaux via notre plateforme

Équipements disponibles :
- Imprimantes 3D
- Découpeuse laser
- Outils d'électronique
- Machines de prototypage

Bienvenue dans la communauté des makers CREC !

L'équipe FabLab`
        }
      },
      rejection: {
        university: {
          subject: `Candidature au programme ${applicationData?.programName || '[Programme]'} - Décision`,
          content: `Cher(e) ${recipient.name},

Nous vous remercions de l'intérêt que vous portez au programme ${applicationData?.programName || '[Programme]'} du CREC.

Après examen attentif de votre dossier de candidature (référence : ${applicationData?.referenceNumber || '[Référence]'}), nous regrettons de vous informer que nous ne pouvons donner suite favorable à votre candidature pour cette session.

Cette décision ne remet nullement en question vos qualités personnelles et académiques. Le nombre de places étant limité, la sélection s'avère particulièrement rigoureuse.

Nous vous encourageons vivement à :
- Candidater pour la prochaine session d'admission
- Renforcer votre dossier dans les domaines suggérés lors de l'entretien
- Participer à nos journées portes ouvertes pour mieux connaître nos programmes

Nous restons à votre disposition pour tout conseil d'orientation.

Cordialement,
L'équipe d'admission CREC`
        },
        formation: {
          subject: `Formation ${applicationData?.programName || '[Formation]'} - Candidature`,
          content: `Bonjour ${recipient.name},

Nous vous remercions de votre intérêt pour la formation "${applicationData?.programName || '[Formation]'}".

Malheureusement, nous ne pouvons retenir votre candidature pour cette session en raison :
- [Raison principale]
- [Critères non remplis]

Suggestions pour une future candidature :
- [Recommandation 1]
- [Recommandation 2]

N'hésitez pas à postuler pour nos prochaines sessions ou à consulter nos autres formations qui pourraient correspondre à votre profil.

Cordialement,
L'équipe formation CREC`
        },
        fablab: {
          subject: 'Demande d\'abonnement FabLab - Décision',
          content: `Bonjour ${recipient.name},

Nous avons examiné votre demande d'abonnement au FabLab CREC.

Nous ne pouvons malheureusement pas valider votre abonnement pour les raisons suivantes :
- [Raison spécifique]
- [Documents manquants/incorrects]

Pour une nouvelle demande :
1. Complétez les éléments manquants
2. Soumettez un nouveau dossier
3. Contactez-nous pour un entretien si nécessaire

Nous restons disponibles pour vous accompagner dans votre projet.

Cordialement,
L'équipe FabLab CREC`
        }
      },
      reminder: {
        university: {
          subject: 'Rappel - Documents manquants pour votre candidature',
          content: `Cher(e) ${recipient.name},

Nous avons bien reçu votre candidature pour le programme ${applicationData?.programName || '[Programme]'} (référence : ${applicationData?.referenceNumber || '[Référence]'}).

Cependant, votre dossier est incomplet. Documents manquants :
- [Document 1]
- [Document 2]

Délai pour compléter votre dossier : [Date limite]

Pour soumettre les documents manquants, connectez-vous à votre espace candidat ou envoyez-les par email.

Cordialement,
L'équipe admission CREC`
        },
        formation: {
          subject: 'Rappel - Finalisation de votre inscription',
          content: `Bonjour ${recipient.name},

Votre inscription à la formation "${applicationData?.programName || '[Formation]'}" nécessite une action de votre part.

Éléments en attente :
- [Action requise 1]
- [Action requise 2]

Merci de régulariser votre situation avant le [Date limite].

L'équipe formation CREC`
        },
        fablab: {
          subject: 'Rappel - Finalisation de votre abonnement FabLab',
          content: `Bonjour ${recipient.name},

Votre demande d'abonnement FabLab est en cours de traitement.

Actions requises :
- [Action 1]
- [Action 2]

Délai : [Date limite]

L'équipe FabLab CREC`
        }
      }
    };

    return templates[notificationType]?.[recipient.type] || {
      subject: 'Notification CREC',
      content: `Bonjour ${recipient.name},\n\n[Contenu du message]\n\nCordialement,\nL'équipe CREC`
    };
  };

  // Initialize with template on open
  React.useEffect(() => {
    if (isOpen && (!subject || !content)) {
      const template = getEmailTemplate();
      setSubject(template.subject);
      setContent(template.content);
    }
  }, [isOpen, notificationType, recipient.type]);

  const handleSend = async () => {
    if (!subject.trim() || !content.trim()) {
      return;
    }

    setSending(true);
    try {
      await onSend({
        to: recipient.email,
        subject: subject.trim(),
        content: content.trim(),
        type: notificationType,
        applicationId: recipient.id
      });
      onClose();
    } catch (error) {
      console.error('Failed to send email:', error);
    } finally {
      setSending(false);
    }
  };

  const getNotificationIcon = () => {
    switch (notificationType) {
      case 'acceptance': return <Check className="h-5 w-5 text-green-600" />;
      case 'rejection': return <X className="h-5 w-5 text-red-600" />;
      case 'reminder': return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      default: return <Mail className="h-5 w-5 text-blue-600" />;
    }
  };

  const getNotificationColor = () => {
    switch (notificationType) {
      case 'acceptance': return 'border-green-200 bg-green-50';
      case 'rejection': return 'border-red-200 bg-red-50';
      case 'reminder': return 'border-yellow-200 bg-yellow-50';
      default: return 'border-blue-200 bg-blue-50';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className={`p-6 border-b border-gray-200 ${getNotificationColor()}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getNotificationIcon()}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {notificationType === 'acceptance' && 'Notification d\'acceptation'}
                  {notificationType === 'rejection' && 'Notification de refus'}
                  {notificationType === 'reminder' && 'Envoi de rappel'}
                  {notificationType === 'custom' && 'Email personnalisé'}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {recipient.name}
                  </span>
                  <span className="flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    {recipient.email}
                  </span>
                  {applicationData?.referenceNumber && (
                    <span className="flex items-center">
                      <FileText className="h-4 w-4 mr-1" />
                      {applicationData.referenceNumber}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Email Editor */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destinataire
              </label>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{recipient.name}</span>
                  <span className="text-gray-500">({recipient.email})</span>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Objet
              </label>
              <input
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Objet de l'email..."
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
                >
                  <Eye className="h-4 w-4" />
                  <span>{showPreview ? 'Éditer' : 'Aperçu'}</span>
                </button>
              </div>
              
              {showPreview ? (
                <div className="w-full h-80 p-4 border border-gray-300 rounded-lg bg-gray-50 overflow-y-auto">
                  <div className="whitespace-pre-wrap text-sm text-gray-800">
                    {content}
                  </div>
                </div>
              ) : (
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={16}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Contenu de l'email..."
                />
              )}
            </div>
          </div>

          {/* Template Variables Panel */}
          <div className="w-80 border-l border-gray-200 bg-gray-50 p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Variables disponibles</h4>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-white rounded border">
                <code className="text-blue-600">{'{{candidateName}}'}</code>
                <p className="text-gray-600 text-xs mt-1">Nom du candidat</p>
              </div>
              <div className="p-2 bg-white rounded border">
                <code className="text-blue-600">{'{{programName}}'}</code>
                <p className="text-gray-600 text-xs mt-1">Nom du programme</p>
              </div>
              <div className="p-2 bg-white rounded border">
                <code className="text-blue-600">{'{{referenceNumber}}'}</code>
                <p className="text-gray-600 text-xs mt-1">Numéro de référence</p>
              </div>
              <div className="p-2 bg-white rounded border">
                <code className="text-blue-600">{'{{applicationDate}}'}</code>
                <p className="text-gray-600 text-xs mt-1">Date de candidature</p>
              </div>
              <div className="p-2 bg-white rounded border">
                <code className="text-blue-600">{'{{startDate}}'}</code>
                <p className="text-gray-600 text-xs mt-1">Date de début</p>
              </div>
            </div>

            {applicationData && (
              <div className="mt-4 pt-4 border-t border-gray-300">
                <h5 className="font-medium text-gray-900 mb-2">Données de candidature</h5>
                <div className="space-y-2 text-xs text-gray-600">
                  {applicationData.programName && (
                    <div>Programme : {applicationData.programName}</div>
                  )}
                  {applicationData.referenceNumber && (
                    <div>Référence : {applicationData.referenceNumber}</div>
                  )}
                  {applicationData.applicationDate && (
                    <div>Date : {new Date(applicationData.applicationDate).toLocaleDateString('fr-FR')}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSend}
            disabled={sending || !subject.trim() || !content.trim()}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {sending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Envoi...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Envoyer</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default EmailNotification;
