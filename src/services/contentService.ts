/**
 * Service de gestion du contenu éditable
 * Permet de récupérer le contenu modifié via l'admin
 */

interface ContentItem {
  id: string;
  value: string;
  lastModified?: string;
}

class ContentService {
  private storageKey = 'adminContentChanges';
  private fallbackContent: {[key: string]: string} = {};

  constructor() {
    // Contenu par défaut - fallback si rien n'est modifié
    this.fallbackContent = {
      // Homepage
      'home_hero_title': 'CREC',
      'home_hero_subtitle': 'Centre de Recherche, d\'Étude et de Créativité',
      'home_hero_description': 'Une œuvre éducative jésuite dédiée à l\'excellence académique, à l\'innovation technologique et au service de la communauté au Bénin.',
      'home_formations_title': '🎓 Nos formations',
      'home_formations_subtitle': 'Une communauté qui pense à la culture intellectuelle humaine',
      'home_formations_description': 'Le Centre de Recherche, d\'Étude et de Créativité (CREC) est une œuvre éducative jésuite basée à Godomey, engagée dans la formation d\'hommes et de femmes compétents, responsables et ouverts à l\'innovation. Le CREC propose plusieurs types de formations accessibles à différents profils, allant des programmes universitaires à des ateliers pratiques et inclusifs.',
      'home_university_title': 'Université ISTMR',
      'home_university_description': 'Nous formons une nouvelle génération de professionnels du numérique, compétents et responsables. À travers l\'ISTMR, nous proposons des formations universitaires de haut niveau en développement de logiciels, en création d\'applications web et mobiles, et en science des données — pour accompagner les mutations technologiques de notre continent.',
      'home_open_formations_title': 'Formations ouvertes',
      'home_open_formations_description': 'Nous croyons que l\'éducation ne doit exclure personne. C\'est pourquoi nous proposons des formations ouvertes à tous : cours d\'anglais, initiation à l\'informatique, et accompagnement scolaire. Que vous soyez en reconversion, sans diplôme ou simplement en quête de savoir, nous vous accompagnons avec des outils concrets et certifiants, adaptés à votre rythme et à vos besoins.',
      'home_fablab_title': 'Fablab',
      'home_fablab_description': 'Nous mettons à votre disposition des espaces d\'expérimentation concrets pour inventer, construire et apprendre autrement. Nos ateliers Fablab sont ouverts aux étudiants, passionnés et professionnels désireux de prototyper des idées, de manipuler des technologies, et d\'innover au service de leur communauté. Nos équipements sont à votre disposition pour réaliser des projets incroyables.',
      'home_partners_title': 'Nos partenaires',
      'home_partners_subtitle': 'Ils nous font confiance',
      'home_stats_experience_number': '10',
      'home_stats_experience_text': 'ans d\'excellence',
      
      // ISTMR/Université
      'istmr_hero_title': 'ISTMR',
      'istmr_hero_subtitle': 'Institut des Sciences et Technologies Matteo Ricci',
      'istmr_hero_description': 'Formez-vous au numérique avec une éducation jésuite d\'excellence, ancrée dans la foi, le service et l\'innovation technologique au cœur de l\'Afrique.',
      'istmr_about_description': 'Sous l\'égide du Centre de Recherche d\'Étude et de Créativité (CREC), l\'ISTMR propose des formations en informatique, avec des projets d\'extension vers les télécommunications et l\'électronique, soutenus par un réseau de 195 universités jésuites.',

      // Formations ouvertes
      'open_formations_hero_title': 'Nos Formations',
      'open_formations_hero_description': 'Développez vos compétences avec nos formations professionnelles adaptées à vos besoins.',
      'open_formations_intro_description': 'Le CREC propose une gamme complète de formations pour accompagner votre développement personnel et professionnel. De l\'université au FabLab, en passant par nos formations ouvertes, trouvez le parcours qui vous correspond.',

      // FabLab
      'fablab_hero_title': 'FabLab CREC',
      'fablab_hero_description': 'Un espace jésuite d\'innovation numérique pour créer, apprendre et collaborer au service du Bénin.',
      'fablab_about_description': 'Le FabLab du Centre de Recherche d\'Étude et de Créativité (CREC) est un atelier collaboratif situé à Godomey, Bénin, inspiré par la mission jésuite de promouvoir l\'excellence et le service. Ouvert à tous — étudiants, entrepreneurs, artisans — il offre un accès à des imprimantes 3D et un graveur laser pour transformer vos idées en prototypes.',
      'fablab_mission_description': 'Guidé par la cura personalis et le magis, le FabLab propose des formations, un accès autonome supervisé, et des services assistés pour concrétiser vos projets. Notre communauté dynamique favorise le partage de savoir-faire et l\'innovation sociale, en soutenant le développement local et durable.',

      // Contact
      'contact_address': 'Maison des Pères Jésuites, Godomey - Salamèy, Lot n° 2, Godomey Sud, Tranche B.',
      'contact_email': 'crecjesuitesbenin@gmail.com',
      'contact_phone': 'Fixe: +229 01 20 22 23 03',
      'contact_phone_benin': 'Mobile: +229 01 67 76 15 15, +229 01 91 50 88 88',
      'contact_hours': 'Lundi - Vendredi: 8h00 - 17h30, Samedi: 9h00 - 13h00',

      // Teachers
      'teacher_1_name': 'Dr. Marie Dubois',
      'teacher_1_specialty': 'Ingénierie logicielle et Intelligence Artificielle',
      'teacher_1_bio': 'Docteure en informatique avec plus de 15 ans d\'expérience dans l\'industrie technologique. Spécialiste en IA et développement logiciel.',
      'teacher_2_name': 'Pr. Jean Martin',
      'teacher_2_specialty': 'Fabrication numérique et Design industriel',
      'teacher_2_bio': 'Professeur en design industriel, expert en fabrication additive et prototypage rapide. Formateur certifié en technologies FabLab.',

      // Mission et valeurs
      'mission_statement': 'Former les innovateurs de demain en alliant excellence académique et approche pratique dans un environnement créatif et bienveillant.',
      'vision_statement': 'Devenir un centre de référence en éducation créative et technologique, préparant nos étudiants aux défis de demain.',
      'value_1': 'Innovation',
      'value_1_description': 'Nous encourageons la créativité et l\'esprit d\'innovation dans tous nos programmes.',
      'value_2': 'Excellence',
      'value_2_description': 'Nous visons l\'excellence dans l\'enseignement et l\'accompagnement de nos étudiants.',
      'value_3': 'Bienveillance',
      'value_3_description': 'Nous créons un environnement d\'apprentissage bienveillant et inclusif pour tous.',
    };
  }

  /**
   * Récupère la valeur d'un contenu par son ID
   * @param contentId ID du contenu à récupérer
   * @returns La valeur modifiée ou la valeur par défaut
   */
  getContent(contentId: string): string {
    try {
      const savedContent = localStorage.getItem(this.storageKey);
      if (savedContent) {
        const parsedContent = JSON.parse(savedContent);
        // Retourner le contenu modifié s'il existe, sinon le fallback
        return parsedContent[contentId] || this.fallbackContent[contentId] || '';
      }
      // Retourner le contenu par défaut
      return this.fallbackContent[contentId] || '';
    } catch (error) {
      console.warn('Erreur lors de la récupération du contenu:', error);
      return this.fallbackContent[contentId] || '';
    }
  }

  /**
   * Récupère plusieurs contenus en une fois
   * @param contentIds Liste des IDs de contenu à récupérer
   * @returns Objet avec les contenus demandés
   */
  getMultipleContent(contentIds: string[]): {[key: string]: string} {
    const result: {[key: string]: string} = {};
    contentIds.forEach(id => {
      result[id] = this.getContent(id);
    });
    return result;
  }

  /**
   * Vérifie si un contenu a été modifié par l'admin
   * @param contentId ID du contenu à vérifier
   * @returns true si le contenu a été modifié
   */
  isContentModified(contentId: string): boolean {
    try {
      const savedContent = localStorage.getItem(this.storageKey);
      if (savedContent) {
        const parsedContent = JSON.parse(savedContent);
        return parsedContent.hasOwnProperty(contentId);
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Méthode pour les administrateurs - Sauvegarder un contenu
   * @param contentId ID du contenu
   * @param value Nouvelle valeur
   */
  setContent(contentId: string, value: string): void {
    try {
      const savedContent = localStorage.getItem(this.storageKey);
      const currentContent = savedContent ? JSON.parse(savedContent) : {};
      
      currentContent[contentId] = value;
      
      localStorage.setItem(this.storageKey, JSON.stringify(currentContent));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du contenu:', error);
    }
  }

  /**
   * Méthode pour réinitialiser tout le contenu (admin uniquement)
   */
  resetAllContent(): void {
    localStorage.removeItem(this.storageKey);
  }

  /**
   * Hook React pour récupérer facilement un contenu dans les composants
   * @param contentId ID du contenu
   * @returns Valeur du contenu
   */
  useContent(contentId: string): string {
    return this.getContent(contentId);
  }
}

// Instance unique du service
const contentService = new ContentService();

// Hook React personnalisé pour une utilisation facile dans les composants
export const useContent = (contentId: string): string => {
  return contentService.getContent(contentId);
};

// Hook pour récupérer plusieurs contenus
export const useMultipleContent = (contentIds: string[]): {[key: string]: string} => {
  return contentService.getMultipleContent(contentIds);
};

export default contentService;
