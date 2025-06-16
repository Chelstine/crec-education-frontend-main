import { EmailTemplate, EmailConfiguration, NotificationSettings } from "@/types/admin";
import { UniversityApplication, UniversityProgram } from "@/types";

export class EmailService {
  private static instance: EmailService;
  private emailConfiguration: EmailConfiguration = {
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    smtpUser: process.env.NEXT_PUBLIC_SMTP_USER || "noreply@crecbenin.org",
    smtpPassword: process.env.NEXT_PUBLIC_SMTP_PASSWORD || "",
    fromName: "CREC Education",
    fromEmail: "noreply@crecbenin.org"
  };

  private notificationSettings: NotificationSettings = {
    enableApplicationConfirmation: true,
    enableStatusUpdates: true,
    enablePaymentConfirmation: true,
    enablePaymentNotifications: true,
    enableReminderEmails: true,
    enableBulkEmails: true,
    emailFrequencyLimit: 5,
    emailCooldownHours: 1,
    staffNotificationEmail: "crecjscontact@gmail.com",
    ccEmails: ["crecjesuitesbenin@gmail.com"],
    bccEmails: []
  };

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  // Email Templates
  private templates: Record<string, EmailTemplate> = {
    application_received: {
      id: "app_received",
      name: "Candidature reçue",
      subject: "Confirmation de réception de votre candidature - CREC",
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Candidature reçue - CREC</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1e40af, #7c3aed); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none; }
            .button { display: inline-block; background: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
            .info-box { background: #eff6ff; border: 1px solid #bfdbfe; padding: 15px; border-radius: 6px; margin: 15px 0; }
            .status-badge { background: #10b981; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>CREC - Centre de Recherche et d'Éducation Catholique</h1>
              <p>Votre candidature a été reçue avec succès</p>
            </div>
            
            <div class="content">
              <h2>Bonjour {{firstName}} {{lastName}},</h2>
              
              <p>Nous avons bien reçu votre candidature pour le programme <strong>{{programTitle}}</strong>.</p>
              
              <div class="info-box">
                <h3>Détails de votre candidature :</h3>
                <ul>
                  <li><strong>Numéro de candidature :</strong> {{applicationNumber}}</li>
                  <li><strong>Programme :</strong> {{programTitle}}</li>
                  <li><strong>Date de soumission :</strong> {{submissionDate}}</li>
                  <li><strong>Statut :</strong> <span class="status-badge">{{status}}</span></li>
                </ul>
              </div>
              
              <h3>Prochaines étapes :</h3>
              <ol>
                <li>Votre dossier sera examiné par notre commission d'admission dans un délai de <strong>5 jours ouvrables</strong></li>
                <li>Vous recevrez un email de mise à jour sur le statut de votre candidature</li>
                <li>Si votre candidature est acceptée, vous recevrez les instructions pour finaliser votre inscription</li>
              </ol>
              
              <div class="info-box">
                <h3>Information importante :</h3>
                <p>Assurez-vous que votre paiement des frais d'inscription ({{inscriptionFee}} FCFA) est bien effectué. 
                La référence de paiement fournie : <strong>{{paymentReference}}</strong></p>
              </div>
              
              <p>                Si vous avez des questions, n'hésitez pas à nous contacter à l'adresse 
              <a href="mailto:crecjesuitesbenin@gmail.com">crecjesuitesbenin@gmail.com</a> ou au +229 01 20 22 23 03.</p>
              
              <p>Nous vous remercions pour votre intérêt pour le CREC et vous souhaitons bonne chance pour la suite du processus.</p>
              
              <p>Cordialement,<br>
              L'équipe des admissions<br>
              CREC - Centre de Recherche et d'Éducation Catholique</p>
            </div>
            
            <div class="footer">
              <p><small>Cet email a été envoyé automatiquement. Merci de ne pas y répondre directement.</small></p>
              <p><small>CREC - Godomey, Bénin | www.crec.edu | crecjesuitesbenin@gmail.com</small></p>
            </div>
          </div>
        </body>
        </html>
      `,
      textContent: `
        Bonjour {{firstName}} {{lastName}},
        
        Nous avons bien reçu votre candidature pour le programme {{programTitle}}.
        
        Détails de votre candidature :
        - Numéro de candidature : {{applicationNumber}}
        - Programme : {{programTitle}}
        - Date de soumission : {{submissionDate}}
        - Statut : {{status}}
        
        Prochaines étapes :
        1. Votre dossier sera examiné par notre commission d'admission dans un délai de 5 jours ouvrables
        2. Vous recevrez un email de mise à jour sur le statut de votre candidature
        3. Si votre candidature est acceptée, vous recevrez les instructions pour finaliser votre inscription
        
        Information importante :
        Assurez-vous que votre paiement des frais d'inscription ({{inscriptionFee}} FCFA) est bien effectué. 
        La référence de paiement fournie : {{paymentReference}}
        
        Si vous avez des questions, contactez-nous à crecjesuitesbenin@gmail.com ou au +229 01 20 22 23 03.
        
        Cordialement,
        L'équipe des admissions
        CREC - Centre de Recherche et d'Éducation Catholique
      `,
      isActive: true,
      category: "application"
    },

    application_accepted: {
      id: "app_accepted",
      name: "Candidature acceptée",
      subject: "🎉 Félicitations ! Votre candidature a été acceptée - CREC",
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Candidature acceptée - CREC</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none; }
            .button { display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
            .success-box { background: #ecfdf5; border: 1px solid #10b981; padding: 15px; border-radius: 6px; margin: 15px 0; }
            .status-badge { background: #10b981; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
            .checklist { background: #eff6ff; border-left: 4px solid #1e40af; padding: 15px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Félicitations !</h1>
              <p>Votre candidature a été acceptée</p>
            </div>
            
            <div class="content">
              <h2>Bonjour {{firstName}} {{lastName}},</h2>
              
              <div class="success-box">
                <h3>Excellente nouvelle !</h3>
                <p>Nous avons le plaisir de vous informer que votre candidature pour le programme 
                <strong>{{programTitle}}</strong> a été <span class="status-badge">ACCEPTÉE</span>.</p>
              </div>
              
              <p>Après examen de votre dossier, notre commission d'admission a été impressionnée par votre profil 
              et vos motivations. Nous sommes ravis de vous accueillir au sein de la communauté CREC.</p>
              
              <h3>Prochaines étapes pour finaliser votre inscription :</h3>
              
              <div class="checklist">
                <h4>À faire dans les 7 jours :</h4>
                <ol>
                  <li><strong>Confirmer votre acceptation</strong> en cliquant sur le lien ci-dessous</li>
                  <li><strong>Effectuer le paiement</strong> des frais de scolarité ({{tuitionFee}} FCFA pour la première année)</li>
                  <li><strong>Compléter votre dossier</strong> avec les documents complémentaires si nécessaire</li>
                  <li><strong>Participer à la séance d'orientation</strong> le {{orientationDate}}</li>
                </ol>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="{{confirmationLink}}" class="button">Confirmer mon inscription</a>
              </div>
              
              <h3>Informations importantes :</h3>
              <ul>
                <li><strong>Date de début :</strong> {{startDate}}</li>
                <li><strong>Durée :</strong> {{duration}}</li>
                <li><strong>Campus :</strong> CREC Cotonou</li>
                <li><strong>Frais de scolarité annuels :</strong> {{tuitionFee}} FCFA</li>
              </ul>
              
              <p>Nous organisons une séance d'orientation pour tous les nouveaux étudiants le <strong>{{orientationDate}}</strong>. 
              Cette séance vous permettra de rencontrer vos futurs camarades et de découvrir le campus.</p>
              
              <p>Pour toute question, notre équipe est à votre disposition :</p>
              <ul>
                <li>Email : <a href="mailto:crecjesuitesbenin@gmail.com">crecjesuitesbenin@gmail.com</a></li>
                <li>Téléphone : +229 01 20 22 23 03</li>
                <li>Mobile : +229 01 67 76 15 15</li>
                <li>Mobile : +229 01 91 50 88 88</li>
              </ul>
              
              <p>Nous avons hâte de vous accueillir et de vous accompagner dans cette nouvelle aventure académique !</p>
              
              <p>Cordialement,<br>
              L'équipe des admissions<br>
              CREC - Centre de Recherche et d'Éducation Catholique</p>
            </div>
            
            <div class="footer">
              <p><small>Félicitations encore pour cette réussite !</small></p>
              <p><small>CREC - Godomey, Bénin | www.crec.edu | crecjesuitesbenin@gmail.com</small></p>
            </div>
          </div>
        </body>
        </html>
      `,
      textContent: `
        Félicitations {{firstName}} {{lastName}} !
        
        Nous avons le plaisir de vous informer que votre candidature pour le programme {{programTitle}} a été ACCEPTÉE.
        
        Prochaines étapes pour finaliser votre inscription :
        
        À faire dans les 7 jours :
        1. Confirmer votre acceptation via le lien : {{confirmationLink}}
        2. Effectuer le paiement des frais de scolarité ({{tuitionFee}} FCFA)
        3. Compléter votre dossier si nécessaire
        4. Participer à la séance d'orientation le {{orientationDate}}
        
        Informations importantes :
        - Date de début : {{startDate}}
        - Durée : {{duration}}
        - Campus : CREC Cotonou
        - Frais de scolarité annuels : {{tuitionFee}} FCFA
        
        Pour toute question :
        - Email : crecjesuitesbenin@gmail.com
        - Téléphone : +229 01 20 22 23 03
        - Mobile : +229 01 67 76 15 15
        - Mobile : +229 01 91 50 88 88
        
        Nous avons hâte de vous accueillir !
        
        Cordialement,
        L'équipe des admissions
        CREC - Centre de Recherche et d'Éducation Catholique
      `,
      isActive: true,
      category: "acceptance"
    },

    application_rejected: {
      id: "app_rejected",
      name: "Candidature non retenue",
      subject: "Mise à jour de votre candidature - CREC",
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Mise à jour candidature - CREC</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #64748b, #475569); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none; }
            .info-box { background: #fef3c7; border: 1px solid #fbbf24; padding: 15px; border-radius: 6px; margin: 15px 0; }
            .button { display: inline-block; background: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>CREC - Centre de Recherche et d'Éducation Catholique</h1>
              <p>Mise à jour de votre candidature</p>
            </div>
            
            <div class="content">
              <h2>Bonjour {{firstName}} {{lastName}},</h2>
              
              <p>Nous vous remercions sincèrement pour l'intérêt que vous avez porté au programme 
              <strong>{{programTitle}}</strong> du CREC.</p>
              
              <p>Après un examen attentif de votre dossier par notre commission d'admission, 
              nous regrettons de vous informer que nous ne pouvons pas donner suite favorable 
              à votre candidature pour cette session.</p>
              
              <div class="info-box">
                <h3>Cette décision ne reflète en rien :</h3>
                <ul>
                  <li>Votre potentiel académique</li>
                  <li>Vos qualifications personnelles</li>
                  <li>Votre motivation pour les études</li>
                </ul>
                <p>Elle résulte principalement du nombre limité de places disponibles et du niveau très élevé de la concurrence.</p>
              </div>
              
              <h3>Possibilités pour l'avenir :</h3>
              <ul>
                <li><strong>Nouvelle candidature :</strong> Vous pouvez postuler à nouveau lors de la prochaine session d'admission</li>
                <li><strong>Autres programmes :</strong> Explorez nos autres formations qui pourraient correspondre à votre profil</li>
                <li><strong>Préparation :</strong> Nous pouvons vous orienter pour renforcer votre dossier</li>
              </ul>
              
              <p>Si vous souhaitez des conseils pour améliorer votre candidature ou des informations sur nos autres programmes, 
              notre équipe d'orientation est à votre disposition.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="{{counselingLink}}" class="button">Demander un conseil d'orientation</a>
              </div>
              
              <p>Nous vous encourageons vivement à persévérer dans vos projets éducatifs et restons convaincus 
              que vous trouverez la voie qui vous permettra de réaliser vos aspirations.</p>
              
              <p>Nous vous souhaitons plein succès dans vos démarches futures.</p>
              
              <p>Cordialement,<br>
              L'équipe des admissions<br>
              CREC - Centre de Recherche et d'Éducation Catholique</p>
            </div>
            
            <div class="footer">
              <p><small>Pour toute question : crecjesuitesbenin@gmail.com | +229 01 20 22 23 03</small></p>
              <p><small>CREC - Godomey, Bénin | www.crec.edu | crecjesuitesbenin@gmail.com</small></p>
            </div>
          </div>
        </body>
        </html>
      `,
      textContent: `
        Bonjour {{firstName}} {{lastName}},
        
        Nous vous remercions pour l'intérêt porté au programme {{programTitle}} du CREC.
        
        Après examen de votre dossier, nous regrettons de ne pas pouvoir donner suite favorable à votre candidature pour cette session.
        
        Cette décision résulte du nombre limité de places et du niveau élevé de la concurrence, et ne reflète pas votre potentiel.
        
        Possibilités pour l'avenir :
        - Nouvelle candidature lors de la prochaine session
        - Exploration d'autres programmes
        - Conseils pour renforcer votre dossier
        
        Notre équipe d'orientation reste à votre disposition : {{counselingLink}}
        
        Nous vous encourageons à persévérer et vous souhaitons plein succès.
        
        Cordialement,
        L'équipe des admissions
        CREC - Centre de Recherche et d'Éducation Catholique
        
        Contact : crecjesuitesbenin@gmail.com | +229 01 20 22 23 03
      `,
      isActive: true,
      category: "rejection"
    },

    payment_reminder: {
      id: "payment_reminder",
      name: "Rappel de paiement",
      subject: "Rappel : Finalisation de votre inscription - CREC",
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Rappel paiement - CREC</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none; }
            .warning-box { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 6px; margin: 15px 0; }
            .button { display: inline-block; background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
            .payment-info { background: #eff6ff; border: 1px solid #3b82f6; padding: 15px; border-radius: 6px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>⏰ Rappel Important</h1>
              <p>Finalisation de votre inscription</p>
            </div>
            
            <div class="content">
              <h2>Bonjour {{firstName}} {{lastName}},</h2>
              
              <p>Nous espérons que vous allez bien. Nous vous rappelons que votre candidature pour le programme 
              <strong>{{programTitle}}</strong> a été acceptée, mais votre inscription n'est pas encore finalisée.</p>
              
              <div class="warning-box">
                <h3>⚠️ Action requise</h3>
                <p>Pour sécuriser votre place dans le programme, vous devez effectuer le paiement des frais de scolarité 
                avant le <strong>{{paymentDeadline}}</strong>.</p>
              </div>
              
              <div class="payment-info">
                <h3>Informations de paiement :</h3>
                <ul>
                  <li><strong>Montant :</strong> {{amount}} FCFA</li>
                  <li><strong>Date limite :</strong> {{paymentDeadline}}</li>
                  <li><strong>Référence :</strong> {{paymentReference}}</li>
                </ul>
              </div>
              
              <h3>Méthodes de paiement disponibles :</h3>
              <ul>
                <li><strong>Orange Money :</strong> +229 01 67 76 15 15 (CREC-OM-001)</li>
                <li><strong>MTN MoMo :</strong> +229 01 91 50 88 88 (CREC-MTN-001)</li>
                <li><strong>Virement bancaire :</strong> Voir détails dans votre espace étudiant</li>
              </ul>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="{{paymentLink}}" class="button">Effectuer le paiement</a>
              </div>
              
              <p><strong>Important :</strong> Si le paiement n'est pas effectué avant la date limite, 
              votre place pourra être attribuée à un autre candidat.</p>
              
              <p>Si vous rencontrez des difficultés ou avez besoin d'un étalement de paiement, 
              contactez-nous rapidement à <a href="mailto:crecjesuitesbenin@gmail.com">crecjesuitesbenin@gmail.com</a> 
              ou au +229 01 20 22 23 03.</p>
              
              <p>Nous avons hâte de vous accueillir au CREC !</p>
              
              <p>Cordialement,<br>
              L'équipe des admissions<br>
              CREC - Centre de Recherche et d'Éducation Catholique</p>
            </div>
            
            <div class="footer">
              <p><small>Cet email de rappel vous a été envoyé automatiquement.</small></p>
              <p><small>CREC - Godomey, Bénin | www.crec.edu | crecjesuitesbenin@gmail.com</small></p>
            </div>
          </div>
        </body>
        </html>
      `,
      textContent: `
        Bonjour {{firstName}} {{lastName}},
        
        Rappel important : Votre candidature pour le programme {{programTitle}} a été acceptée, 
        mais votre inscription n'est pas encore finalisée.
        
        ACTION REQUISE :
        Effectuez le paiement des frais de scolarité avant le {{paymentDeadline}}.
        
        Informations de paiement :
        - Montant : {{amount}} FCFA
        - Date limite : {{paymentDeadline}}
        - Référence : {{paymentReference}}
        
        Méthodes de paiement :
        - Orange Money : +229 01 67 76 15 15 (CREC-OM-001)
        - MTN MoMo : +229 01 91 50 88 88 (CREC-MTN-001)
        - Virement bancaire : Voir votre espace étudiant
        
        Lien de paiement : {{paymentLink}}
        
        IMPORTANT : Sans paiement avant la date limite, votre place pourra être attribuée à un autre candidant.
        
        Pour difficultés ou étalement : crecjesuitesbenin@gmail.com | +229 01 20 22 23 03
        
        Cordialement,
        L'équipe des admissions
        CREC - Centre de Recherche et d'Éducation Catholique
      `,
      isActive: true,
      category: "payment"
    }
  };

  // Send application confirmation email
  public async sendApplicationConfirmation(
    application: UniversityApplication,
    program: UniversityProgram
  ): Promise<boolean> {
    try {
      const template = this.templates.application_received;
      const applicationNumber = `CREC-${new Date().getFullYear()}-${application.id?.slice(-6)}`;
      
      const variables = {
        firstName: application.applicantName.split(' ')[0] || application.applicantName,
        lastName: application.applicantName.split(' ').slice(1).join(' ') || '',
        programTitle: program.title || program.name,
        applicationNumber,
        submissionDate: new Date(application.applicationDate).toLocaleDateString('fr-FR'),
        status: "Reçue",
        inscriptionFee: this.formatCurrency(program.inscriptionFee),
        paymentReference: application.paymentReference || "N/A"
      };

      const emailContent = this.replaceVariables(template.htmlContent, variables);
      const emailText = this.replaceVariables(template.textContent, variables);

      return await this.sendEmail({
        to: application.applicantEmail,
        subject: template.subject,
        html: emailContent,
        text: emailText,
        category: template.category
      });
    } catch (error) {
      console.error("Error sending application confirmation:", error);
      return false;
    }
  }

  // Send application status update
  public async sendStatusUpdate(
    application: UniversityApplication,
    program: UniversityProgram,
    newStatus: UniversityApplication['status']
  ): Promise<boolean> {
    try {
      let template: EmailTemplate;
      
      if (newStatus === 'accepted') {
        template = this.templates.application_accepted;
      } else if (newStatus === 'rejected') {
        template = this.templates.application_rejected;
      } else {
        return false; // No template for other statuses
      }

      const variables = {
        firstName: application.applicantName.split(' ')[0] || application.applicantName,
        lastName: application.applicantName.split(' ').slice(1).join(' ') || '',
        programTitle: program.title || program.name,
        duration: program.duration,
        startDate: new Date(program.startDate).toLocaleDateString('fr-FR'),
        tuitionFee: this.formatCurrency(program.tuitionFee),
        orientationDate: this.getOrientationDate(program.startDate),
        confirmationLink: `${process.env.NEXT_PUBLIC_APP_URL}/confirmation/${application.id}`,
        counselingLink: `${process.env.NEXT_PUBLIC_APP_URL}/orientation`
      };

      const emailContent = this.replaceVariables(template.htmlContent, variables);
      const emailText = this.replaceVariables(template.textContent, variables);

      return await this.sendEmail({
        to: application.applicantEmail,
        subject: template.subject,
        html: emailContent,
        text: emailText,
        category: template.category
      });
    } catch (error) {
      console.error("Error sending status update:", error);
      return false;
    }
  }

  // Send payment reminder
  public async sendPaymentReminder(
    application: UniversityApplication,
    program: UniversityProgram
  ): Promise<boolean> {
    try {
      const template = this.templates.payment_reminder;
      const paymentDeadline = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
      
      const variables = {
        firstName: application.applicantName.split(' ')[0] || application.applicantName,
        lastName: application.applicantName.split(' ').slice(1).join(' ') || '',
        programTitle: program.title || program.name,
        amount: this.formatCurrency(program.tuitionFee),
        paymentDeadline: paymentDeadline.toLocaleDateString('fr-FR'),
        paymentReference: `PAY-${application.id?.slice(-8)}`,
        paymentLink: `${process.env.NEXT_PUBLIC_APP_URL}/payment/${application.id}`
      };

      const emailContent = this.replaceVariables(template.htmlContent, variables);
      const emailText = this.replaceVariables(template.textContent, variables);

      return await this.sendEmail({
        to: application.applicantEmail,
        subject: template.subject,
        html: emailContent,
        text: emailText,
        category: template.category
      });
    } catch (error) {
      console.error("Error sending payment reminder:", error);
      return false;
    }
  }

  // Send bulk email
  public async sendBulkEmail(
    recipients: string[],
    subject: string,
    content: string,
    isHtml: boolean = true
  ): Promise<number> {
    let successCount = 0;
    
    for (const recipient of recipients) {
      try {
        const success = await this.sendEmail({
          to: recipient,
          subject,
          [isHtml ? 'html' : 'text']: content,
          category: 'bulk'
        });
        
        if (success) successCount++;
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Error sending bulk email to ${recipient}:`, error);
      }
    }
    
    return successCount;
  }

  // Core email sending function
  private async sendEmail(emailData: {
    to: string;
    subject: string;
    html?: string;
    text?: string;
    category?: string;
    cc?: string[];
    bcc?: string[];
  }): Promise<boolean> {
    try {
      // In a real application, this would use a service like SendGrid, Nodemailer, etc.
      console.log("Sending email:", {
        from: `${this.emailConfiguration.fromName} <${this.emailConfiguration.fromEmail}>`,
        to: emailData.to,
        subject: emailData.subject,
        category: emailData.category,
        timestamp: new Date().toISOString()
      });

      // Simulate email sending delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Log email for debugging (in production, you'd use proper logging)
      this.logEmail(emailData);

      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  }

  // Helper function to replace variables in templates
  private replaceVariables(content: string, variables: Record<string, string>): string {
    let result = content;
    
    Object.keys(variables).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      result = result.replace(regex, variables[key]);
    });
    
    return result;
  }

  // Helper function to format currency
  private formatCurrency(amount: number): string {
    return new Intl.NumberFormat('fr-FR').format(amount);
  }

  // Helper function to get orientation date
  private getOrientationDate(startDate: string): string {
    const start = new Date(startDate);
    const orientation = new Date(start.getTime() - 7 * 24 * 60 * 60 * 1000); // 1 week before
    return orientation.toLocaleDateString('fr-FR');
  }

  // Log email for audit purposes
  private logEmail(emailData: any): void {
    // In production, this would write to a proper logging system
    console.log("Email Log:", {
      timestamp: new Date().toISOString(),
      to: emailData.to,
      subject: emailData.subject,
      category: emailData.category,
      success: true
    });
  }

  // Get email templates
  public getTemplates(): Record<string, EmailTemplate> {
    return this.templates;
  }

  // Update email configuration
  public updateConfiguration(config: Partial<EmailConfiguration>): void {
    this.emailConfiguration = { ...this.emailConfiguration, ...config };
  }

  // Update notification settings
  public updateNotificationSettings(settings: Partial<NotificationSettings>): void {
    this.notificationSettings = { ...this.notificationSettings, ...settings };
  }
}

export default EmailService;
