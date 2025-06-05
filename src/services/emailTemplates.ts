/**
 * Email Templates Configuration
 * Templates pour les emails automatiques du système CREC
 */

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  htmlTemplate: string;
  textTemplate: string;
  variables: string[];
}

export interface EmailConfig {
  smtpHost: string;
  smtpPort: number;
  smtpSecure: boolean;
  smtpUser: string;
  smtpPassword: string;
  fromEmail: string;
  fromName: string;
}

// Templates d'emails
export const emailTemplates: { [key: string]: EmailTemplate } = {
  fablabAccessKey: {
    id: 'fablab_access_key',
    name: 'FabLab - Clé d\'accès',
    subject: '🔑 Votre clé d\'accès FabLab CREC est prête !',
    htmlTemplate: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .key-box { background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); border: 2px solid #22c55e; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
          .key-code { font-family: 'Courier New', monospace; font-size: 24px; font-weight: bold; color: #16a34a; letter-spacing: 2px; }
          .info-box { background: #f8fafc; border-left: 4px solid #3b82f6; padding: 16px; margin: 20px 0; }
          .footer { background: #f8fafc; padding: 20px; text-align: center; color: #64748b; font-size: 14px; }
          .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Félicitations {{userName}} !</h1>
            <p>Votre abonnement FabLab a été validé</p>
          </div>
          
          <div class="content">
            <h2>Votre clé d'accès est prête !</h2>
            <p>Votre abonnement <strong>{{planName}}</strong> a été approuvé par notre équipe.</p>
            
            <div class="key-box">
              <h3>🔑 Votre clé d'accès FabLab</h3>
              <div class="key-code">{{accessKey}}</div>
              <p><small>Gardez cette clé précieusement, vous en aurez besoin pour accéder au FabLab</small></p>
            </div>
            
            <div class="info-box">
              <h4>📋 Détails de votre abonnement :</h4>
              <ul>
                <li><strong>Plan :</strong> {{planName}}</li>
                <li><strong>Heures mensuelles :</strong> {{monthlyHours}}h</li>
                <li><strong>Accès prioritaire :</strong> {{priorityAccess}}</li>
                <li><strong>Valide jusqu'au :</strong> {{expiryDate}}</li>
              </ul>
            </div>
            
            <h3>🚀 Prochaines étapes :</h3>
            <ol>
              <li>Présentez-vous au FabLab avec votre clé d'accès</li>
              <li>Participez à la session d'orientation (obligatoire)</li>
              <li>Commencez à réserver vos créneaux en ligne</li>
            </ol>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="{{reservationUrl}}" class="button">Réserver maintenant</a>
            </div>
          </div>
          
          <div class="footer">
            <p><strong>CREC Education</strong></p>
            <p>Centre de Recherche et d'Éducation Créative</p>
            <p>Email: info@crec-education.org | Tél: +237 XXX XXX XXX</p>
          </div>
        </div>
      </body>
      </html>
    `,
    textTemplate: `
      Félicitations {{userName}} !
      
      Votre abonnement FabLab a été validé.
      
      VOTRE CLÉ D'ACCÈS : {{accessKey}}
      
      Détails de votre abonnement :
      - Plan : {{planName}}
      - Heures mensuelles : {{monthlyHours}}h
      - Accès prioritaire : {{priorityAccess}}
      - Valide jusqu'au : {{expiryDate}}
      
      Prochaines étapes :
      1. Présentez-vous au FabLab avec votre clé d'accès
      2. Participez à la session d'orientation (obligatoire)
      3. Commencez à réserver vos créneaux en ligne
      
      Réservez maintenant : {{reservationUrl}}
      
      CREC Education
      Centre de Recherche et d'Éducation Créative
      Email: info@crec-education.org
    `,
    variables: ['userName', 'planName', 'accessKey', 'monthlyHours', 'priorityAccess', 'expiryDate', 'reservationUrl']
  },
  
  subscriptionPending: {
    id: 'subscription_pending',
    name: 'Abonnement - En attente',
    subject: '⏳ Votre demande d\'abonnement FabLab est en cours de traitement',
    htmlTemplate: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .status-box { background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>⏳ Demande reçue !</h1>
            <p>Bonjour {{userName}}</p>
          </div>
          
          <div class="content">
            <h2>Votre demande d'abonnement est en cours de traitement</h2>
            
            <div class="status-box">
              <h3>📋 Statut : En attente de validation</h3>
              <p>Notre équipe examine votre demande d'abonnement <strong>{{planName}}</strong></p>
            </div>
            
            <p>⏰ <strong>Délai de traitement :</strong> 24-48 heures ouvrables</p>
            <p>📧 Vous recevrez un email de confirmation avec votre clé d'accès une fois votre demande approuvée.</p>
            
            <h3>💡 En attendant :</h3>
            <ul>
              <li>Consultez notre FAQ FabLab</li>
              <li>Découvrez nos projets et machines</li>
              <li>Planifiez vos premiers projets</li>
            </ul>
          </div>
        </div>
      </body>
      </html>
    `,
    textTemplate: `
      Demande reçue !
      
      Bonjour {{userName}},
      
      Votre demande d'abonnement {{planName}} est en cours de traitement.
      
      Statut : En attente de validation
      Délai de traitement : 24-48 heures ouvrables
      
      Vous recevrez un email avec votre clé d'accès une fois votre demande approuvée.
      
      CREC Education
    `,
    variables: ['userName', 'planName']
  },
  
  subscriptionRejected: {
    id: 'subscription_rejected',
    name: 'Abonnement - Refusé',
    subject: '❌ Votre demande d\'abonnement FabLab nécessite des corrections',
    htmlTemplate: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .reason-box { background: #fef2f2; border: 2px solid #ef4444; border-radius: 8px; padding: 20px; margin: 20px 0; }
          .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>⚠️ Action requise</h1>
            <p>Bonjour {{userName}}</p>
          </div>
          
          <div class="content">
            <h2>Votre demande d'abonnement nécessite des corrections</h2>
            
            <div class="reason-box">
              <h3>🔍 Raison du refus :</h3>
              <p>{{rejectionReason}}</p>
            </div>
            
            <h3>🛠️ Actions à effectuer :</h3>
            <ul>
              <li>Corrigez les éléments mentionnés ci-dessus</li>
              <li>Soumettez une nouvelle demande</li>
              <li>Contactez-nous si vous avez des questions</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="{{reapplyUrl}}" class="button">Soumettre une nouvelle demande</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    textTemplate: `
      Action requise
      
      Bonjour {{userName}},
      
      Votre demande d'abonnement FabLab nécessite des corrections.
      
      Raison du refus : {{rejectionReason}}
      
      Actions à effectuer :
      - Corrigez les éléments mentionnés
      - Soumettez une nouvelle demande
      - Contactez-nous si vous avez des questions
      
      Soumettre une nouvelle demande : {{reapplyUrl}}
      
      CREC Education
    `,
    variables: ['userName', 'rejectionReason', 'reapplyUrl']
  }
};

// Configuration email par défaut (à surcharger par les variables d'environnement)
export const defaultEmailConfig: EmailConfig = {
  smtpHost: process.env.SMTP_HOST || 'smtp.gmail.com',
  smtpPort: parseInt(process.env.SMTP_PORT || '587'),
  smtpSecure: process.env.SMTP_SECURE === 'true',
  smtpUser: process.env.SMTP_USER || '',
  smtpPassword: process.env.SMTP_PASSWORD || '',
  fromEmail: process.env.FROM_EMAIL || 'noreply@crec-education.org',
  fromName: process.env.FROM_NAME || 'CREC Education'
};

/**
 * Remplace les variables dans un template d'email
 */
export const replaceEmailVariables = (
  template: string, 
  variables: { [key: string]: string }
): string => {
  let result = template;
  
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, value);
  });
  
  return result;
};

/**
 * Génère les données d'email pour l'envoi d'une clé d'accès FabLab
 */
export const generateFablabAccessKeyEmail = (data: {
  userName: string;
  userEmail: string;
  planName: string;
  accessKey: string;
  monthlyHours: number;
  priorityAccess: boolean;
  expiryDate: string;
  reservationUrl: string;
}) => {
  const template = emailTemplates.fablabAccessKey;
  const variables = {
    userName: data.userName,
    planName: data.planName,
    accessKey: data.accessKey,
    monthlyHours: data.monthlyHours.toString(),
    priorityAccess: data.priorityAccess ? 'Oui' : 'Non',
    expiryDate: data.expiryDate,
    reservationUrl: data.reservationUrl
  };
  
  return {
    to: data.userEmail,
    subject: template.subject,
    html: replaceEmailVariables(template.htmlTemplate, variables),
    text: replaceEmailVariables(template.textTemplate, variables)
  };
};

export default {
  emailTemplates,
  defaultEmailConfig,
  replaceEmailVariables,
  generateFablabAccessKeyEmail
};
