import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  Eye, 
  Edit3, 
  Globe, 
  Image, 
  Type, 
  Users,
  GraduationCap,
  Wrench,
  DollarSign,
  Star,
  Award,
  Target,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface EditableContent {
  id: string;
  label: string;
  value: string;
  type: 'text' | 'textarea' | 'image' | 'number';
  category: string;
  description: string;
  maxLength?: number;
}

interface ContentCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  description: string;
}

const PageManagementNew: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('formations');
  const [saving, setSaving] = useState(false);
  const [savedContent, setSavedContent] = useState<{[key: string]: string}>({});

  // Catégories de contenu modifiables
  const categories: ContentCategory[] = [
    {
      id: 'formations',
      name: 'Formations',
      icon: GraduationCap,
      color: 'bg-blue-500',
      description: 'Modifier les informations sur les programmes de formation'
    },
    {
      id: 'homepage',
      name: 'Page d\'accueil',
      icon: Globe,
      color: 'bg-indigo-500',
      description: 'Modifier le contenu de la page d\'accueil'
    },
    {
      id: 'contact',
      name: 'Contact',
      icon: Type,
      color: 'bg-teal-500',
      description: 'Mettre à jour les informations de contact'
    },
    {
      id: 'teachers',
      name: 'Enseignants',
      icon: Users,
      color: 'bg-green-500',
      description: 'Gérer les profils et informations des enseignants'
    },
    {
      id: 'pricing',
      name: 'Tarifs',
      icon: DollarSign,
      color: 'bg-yellow-500',
      description: 'Mettre à jour les prix des formations et services'
    },
    {
      id: 'machines',
      name: 'Machines FabLab',
      icon: Wrench,
      color: 'bg-purple-500',
      description: 'Modifier les descriptions et spécifications des machines'
    },
    {
      id: 'values',
      name: 'Valeurs & Mission',
      icon: Heart,
      color: 'bg-red-500',
      description: 'Éditer la mission, vision et valeurs de l\'institution'
    }
  ];

  // Contenu éditable par catégorie - Données complètes du site
  const editableContent: {[key: string]: EditableContent[]} = {
    formations: [
      // Université ISTMR
      {
        id: 'istmr_hero_title',
        label: 'Titre principal ISTMR',
        value: 'ISTMR',
        type: 'text',
        category: 'formations',
        description: 'Nom affiché en grand dans le hero de la page université',
        maxLength: 50
      },
      {
        id: 'istmr_hero_subtitle',
        label: 'Sous-titre ISTMR',
        value: 'Institut des Sciences et Technologies Matteo Ricci',
        type: 'text',
        category: 'formations',
        description: 'Sous-titre explicatif sous le logo ISTMR',
        maxLength: 100
      },
      {
        id: 'istmr_hero_description',
        label: 'Description hero ISTMR',
        value: 'Formez-vous au numérique avec une éducation jésuite d\'excellence, ancrée dans la foi, le service et l\'innovation technologique au cœur de l\'Afrique.',
        type: 'textarea',
        category: 'formations',
        description: 'Texte de présentation dans le hero de la page université'
      },
      {
        id: 'istmr_about_description',
        label: 'Description à propos ISTMR',
        value: 'Sous l\'égide du Centre de Recherche d\'Étude et de Créativité (CREC), l\'ISTMR propose des formations en informatique, avec des projets d\'extension vers les télécommunications et l\'électronique, soutenus par un réseau de 195 universités jésuites.',
        type: 'textarea',
        category: 'formations',
        description: 'Description détaillée dans la section "À propos"'
      },
      // Formations ouvertes
      {
        id: 'open_formations_hero_title',
        label: 'Titre hero formations ouvertes',
        value: 'Nos Formations',
        type: 'text',
        category: 'formations',
        description: 'Titre principal du hero des formations ouvertes',
        maxLength: 50
      },
      {
        id: 'open_formations_hero_description',
        label: 'Description hero formations ouvertes',
        value: 'Développez vos compétences avec nos formations professionnelles adaptées à vos besoins.',
        type: 'textarea',
        category: 'formations',
        description: 'Description dans le hero des formations ouvertes'
      },
      {
        id: 'open_formations_intro_description',
        label: 'Introduction formations ouvertes',
        value: 'Le CREC propose une gamme complète de formations pour accompagner votre développement personnel et professionnel. De l\'université au FabLab, en passant par nos formations ouvertes, trouvez le parcours qui vous correspond.',
        type: 'textarea',
        category: 'formations',
        description: 'Texte d\'introduction sous le hero'
      },
      // FabLab
      {
        id: 'fablab_hero_title',
        label: 'Titre hero FabLab',
        value: 'FabLab CREC',
        type: 'text',
        category: 'formations',
        description: 'Titre principal du hero FabLab',
        maxLength: 50
      },
      {
        id: 'fablab_hero_description',
        label: 'Description hero FabLab',
        value: 'Un espace jésuite d\'innovation numérique pour créer, apprendre et collaborer au service du Bénin.',
        type: 'textarea',
        category: 'formations',
        description: 'Description dans le hero du FabLab'
      },
      {
        id: 'fablab_about_description',
        label: 'Description à propos FabLab',
        value: 'Le FabLab du Centre de Recherche d\'Étude et de Créativité (CREC) est un atelier collaboratif situé à Godomey, Bénin, inspiré par la mission jésuite de promouvoir l\'excellence et le service. Ouvert à tous — étudiants, entrepreneurs, artisans — il offre un accès à des imprimantes 3D et un graveur laser pour transformer vos idées en prototypes.',
        type: 'textarea',
        category: 'formations',
        description: 'Description complète du FabLab'
      },
      {
        id: 'fablab_mission_description',
        label: 'Mission FabLab',
        value: 'Guidé par la cura personalis et le magis, le FabLab propose des formations, un accès autonome supervisé, et des services assistés pour concrétiser vos projets. Notre communauté dynamique favorise le partage de savoir-faire et l\'innovation sociale, en soutenant le développement local et durable.',
        type: 'textarea',
        category: 'formations',
        description: 'Mission et valeurs du FabLab'
      }
    ],
    homepage: [
      // Section Hero
      {
        id: 'home_hero_title',
        label: 'Titre principal homepage',
        value: 'CREC',
        type: 'text',
        category: 'homepage',
        description: 'Titre principal affiché sur la homepage',
        maxLength: 50
      },
      {
        id: 'home_hero_subtitle',
        label: 'Sous-titre homepage',
        value: 'Centre de Recherche, d\'Étude et de Créativité',
        type: 'text',
        category: 'homepage',
        description: 'Sous-titre explicatif de l\'organisation',
        maxLength: 100
      },
      {
        id: 'home_hero_description',
        label: 'Description hero homepage',
        value: 'Une œuvre éducative jésuite dédiée à l\'excellence académique, à l\'innovation technologique et au service de la communauté au Bénin.',
        type: 'textarea',
        category: 'homepage',
        description: 'Description principale dans le hero de la homepage'
      },
      // Section formations
      {
        id: 'home_formations_title',
        label: 'Titre section formations',
        value: '🎓 Nos formations',
        type: 'text',
        category: 'homepage',
        description: 'Titre de la section formations sur la homepage',
        maxLength: 80
      },
      {
        id: 'home_formations_subtitle',
        label: 'Sous-titre section formations',
        value: 'Une communauté qui pense à la culture intellectuelle humaine',
        type: 'text',
        category: 'homepage',
        description: 'Sous-titre de la section formations',
        maxLength: 100
      },
      {
        id: 'home_formations_description',
        label: 'Description section formations',
        value: 'Le Centre de Recherche, d\'Étude et de Créativité (CREC) est une œuvre éducative jésuite basée à Godomey, engagée dans la formation d\'hommes et de femmes compétents, responsables et ouverts à l\'innovation. Le CREC propose plusieurs types de formations accessibles à différents profils, allant des programmes universitaires à des ateliers pratiques et inclusifs.',
        type: 'textarea',
        category: 'homepage',
        description: 'Description complète de la section formations'
      },
      // Formation Université 
      {
        id: 'home_university_title',
        label: 'Titre formation université',
        value: 'Université ISTMR',
        type: 'text',
        category: 'homepage',
        description: 'Titre de la carte formation université',
        maxLength: 50
      },
      {
        id: 'home_university_description',
        label: 'Description formation université',
        value: 'Nous formons une nouvelle génération de professionnels du numérique, compétents et responsables. À travers l\'ISTMR, nous proposons des formations universitaires de haut niveau en développement de logiciels, en création d\'applications web et mobiles, et en science des données — pour accompagner les mutations technologiques de notre continent.',
        type: 'textarea',
        category: 'homepage',
        description: 'Description de la formation universitaire sur la homepage'
      },
      // Formation Formations ouvertes
      {
        id: 'home_open_formations_title',
        label: 'Titre formations ouvertes',
        value: 'Formations ouvertes',
        type: 'text',
        category: 'homepage',
        description: 'Titre de la carte formations ouvertes',
        maxLength: 50
      },
      {
        id: 'home_open_formations_description',
        label: 'Description formations ouvertes',
        value: 'Nous croyons que l\'éducation ne doit exclure personne. C\'est pourquoi nous proposons des formations ouvertes à tous : cours d\'anglais, initiation à l\'informatique, et accompagnement scolaire. Que vous soyez en reconversion, sans diplôme ou simplement en quête de savoir, nous vous accompagnons avec des outils concrets et certifiants, adaptés à votre rythme et à vos besoins.',
        type: 'textarea',
        category: 'homepage',
        description: 'Description des formations ouvertes sur la homepage'
      },
      // Formation FabLab
      {
        id: 'home_fablab_title',
        label: 'Titre FabLab',
        value: 'Fablab',
        type: 'text',
        category: 'homepage',
        description: 'Titre de la carte FabLab',
        maxLength: 50
      },
      {
        id: 'home_fablab_description',
        label: 'Description FabLab',
        value: 'Nous mettons à votre disposition des espaces d\'expérimentation concrets pour inventer, construire et apprendre autrement. Nos ateliers Fablab sont ouverts aux étudiants, passionnés et professionnels désireux de prototyper des idées, de manipuler des technologies, et d\'innover au service de leur communauté. Nos équipements sont à votre disposition pour réaliser des projets incroyables.',
        type: 'textarea',
        category: 'homepage',
        description: 'Description du FabLab sur la homepage'
      },
      // Section partenaires
      {
        id: 'home_partners_title',
        label: 'Titre section partenaires',
        value: 'Nos partenaires',
        type: 'text',
        category: 'homepage',
        description: 'Titre de la section partenaires',
        maxLength: 50
      },
      {
        id: 'home_partners_subtitle',
        label: 'Sous-titre partenaires',
        value: 'Ils nous font confiance',
        type: 'text',
        category: 'homepage',
        description: 'Sous-titre de la section partenaires',
        maxLength: 50
      },
      // Statistiques
      {
        id: 'home_stats_experience_number',
        label: 'Années d\'expérience',
        value: '10',
        type: 'number',
        category: 'homepage',
        description: 'Nombre d\'années d\'expérience affiché'
      },
      {
        id: 'home_stats_experience_text',
        label: 'Texte années d\'expérience',
        value: 'ans d\'excellence',
        type: 'text',
        category: 'homepage',
        description: 'Texte accompagnant le nombre d\'années',
        maxLength: 30
      }
    ],
    contact: [
      // Informations de contact
      {
        id: 'contact_address',
        label: 'Adresse complète',
        value: 'Godomey-Salamey, Maison des Pères Jésuites, Lot N°2 du lotissement de Godomey Sud, tranche B. - B.P. 307 Godomey',
        type: 'textarea',
        category: 'contact',
        description: 'Adresse physique complète de l\'organisation'
      },
      {
        id: 'contact_email',
        label: 'Email principal',
        value: 'contact@crec-education.org',
        type: 'text',
        category: 'contact',
        description: 'Adresse email principale de contact',
        maxLength: 100
      },
      {
        id: 'contact_phone',
        label: 'Téléphone principal',
        value: '+33 (0)1 23 45 67 89',
        type: 'text',
        category: 'contact',
        description: 'Numéro de téléphone principal',
        maxLength: 30
      },
      {
        id: 'contact_phone_benin',
        label: 'Téléphone Bénin',
        value: '+229 XX XX XX XX',
        type: 'text',
        category: 'contact',
        description: 'Numéro de téléphone local au Bénin',
        maxLength: 30
      },
      {
        id: 'contact_hours',
        label: 'Horaires d\'ouverture',
        value: 'Lundi - Vendredi: 8h00 - 17h00',
        type: 'text',
        category: 'contact',
        description: 'Horaires d\'ouverture du centre',
        maxLength: 100
      }
    ],
    teachers: [
      {
        id: 'teacher_1_name',
        label: 'Nom du premier enseignant vedette',
        value: 'Dr. Marie Dubois',
        type: 'text',
        category: 'teachers',
        description: 'Nom complet de l\'enseignant principal à mettre en avant'
      },
      {
        id: 'teacher_1_specialty',
        label: 'Spécialité du premier enseignant',
        value: 'Ingénierie logicielle et Intelligence Artificielle',
        type: 'text',
        category: 'teachers',
        description: 'Domaine d\'expertise principal'
      },
      {
        id: 'teacher_1_bio',
        label: 'Biographie du premier enseignant',
        value: 'Docteure en informatique avec plus de 15 ans d\'expérience dans l\'industrie technologique. Spécialiste en IA et développement logiciel.',
        type: 'textarea',
        category: 'teachers',
        description: 'Courte biographie professionnelle'
      },
      {
        id: 'teacher_2_name',
        label: 'Nom du deuxième enseignant vedette',
        value: 'Pr. Jean Martin',
        type: 'text',
        category: 'teachers',
        description: 'Nom complet du second enseignant à mettre en avant'
      },
      {
        id: 'teacher_2_specialty',
        label: 'Spécialité du deuxième enseignant',
        value: 'Fabrication numérique et Design industriel',
        type: 'text',
        category: 'teachers',
        description: 'Domaine d\'expertise principal'
      },
      {
        id: 'teacher_2_bio',
        label: 'Biographie du deuxième enseignant',
        value: 'Professeur en design industriel, expert en fabrication additive et prototypage rapide. Formateur certifié en technologies FabLab.',
        type: 'textarea',
        category: 'teachers',
        description: 'Courte biographie professionnelle'
      }
    ],
    pricing: [
      {
        id: 'university_price',
        label: 'Prix de la formation universitaire (€)',
        value: '8500',
        type: 'number',
        category: 'pricing',
        description: 'Frais de scolarité annuels pour le programme universitaire'
      },
      {
        id: 'university_payment_info',
        label: 'Informations de paiement universitaire',
        value: 'Paiement possible en 3 fois sans frais. Bourses disponibles selon critères sociaux.',
        type: 'textarea',
        category: 'pricing',
        description: 'Détails sur les modalités de paiement et aides financières'
      },
      {
        id: 'open_formation_price_range',
        label: 'Gamme de prix formations ouvertes',
        value: '150€ - 800€',
        type: 'text',
        category: 'pricing',
        description: 'Fourchette de prix pour les formations courtes'
      },
      {
        id: 'fablab_subscription_monthly',
        label: 'Abonnement FabLab mensuel (€)',
        value: '45',
        type: 'number',
        category: 'pricing',
        description: 'Prix de l\'abonnement mensuel au FabLab'
      },
      {
        id: 'fablab_subscription_annual',
        label: 'Abonnement FabLab annuel (€)',
        value: '450',
        type: 'number',
        category: 'pricing',
        description: 'Prix de l\'abonnement annuel au FabLab (avec réduction)'
      },
      {
        id: 'fablab_hourly_rate',
        label: 'Tarif horaire FabLab visiteur (€)',
        value: '12',
        type: 'number',
        category: 'pricing',
        description: 'Prix par heure pour les utilisateurs non-abonnés'
      }
    ],
    machines: [
      {
        id: 'machine_1_name',
        label: 'Nom de la première machine',
        value: 'Imprimante 3D Ultimaker S5',
        type: 'text',
        category: 'machines',
        description: 'Nom et modèle de l\'équipement principal'
      },
      {
        id: 'machine_1_description',
        label: 'Description de la première machine',
        value: 'Imprimante 3D professionnelle avec un volume d\'impression de 330x240x300mm. Idéale pour les prototypes de haute qualité.',
        type: 'textarea',
        category: 'machines',
        description: 'Caractéristiques et utilisation de la machine'
      },
      {
        id: 'machine_2_name',
        label: 'Nom de la deuxième machine',
        value: 'Découpeuse Laser Epilog Zing 24',
        type: 'text',
        category: 'machines',
        description: 'Nom et modèle du second équipement'
      },
      {
        id: 'machine_2_description',
        label: 'Description de la deuxième machine',
        value: 'Découpeuse laser CO2 avec surface de travail 610x305mm. Parfaite pour découper et graver bois, acrylique, textile.',
        type: 'textarea',
        category: 'machines',
        description: 'Spécifications et matériaux compatibles'
      },
      {
        id: 'machine_3_name',
        label: 'Nom de la troisième machine',
        value: 'Station d\'électronique complète',
        type: 'text',
        category: 'machines',
        description: 'Nom du troisième équipement'
      },
      {
        id: 'machine_3_description',
        label: 'Description de la troisième machine',
        value: 'Poste de travail équipé avec oscilloscope, générateur de fonction, alimentation variable et fer à souder professionnel.',
        type: 'textarea',
        category: 'machines',
        description: 'Détails de l\'équipement électronique'
      }
    ],
    values: [
      {
        id: 'mission_statement',
        label: 'Mission de l\'institution',
        value: 'Former les innovateurs de demain en alliant excellence académique et approche pratique dans un environnement créatif et bienveillant.',
        type: 'textarea',
        category: 'values',
        description: 'Mission principale de l\'établissement'
      },
      {
        id: 'vision_statement',
        label: 'Vision d\'avenir',
        value: 'Devenir un centre de référence en éducation créative et technologique, préparant nos étudiants aux défis de demain.',
        type: 'textarea',
        category: 'values',
        description: 'Vision à long terme de l\'institution'
      },
      {
        id: 'value_1',
        label: 'Première valeur',
        value: 'Innovation',
        type: 'text',
        category: 'values',
        description: 'Première valeur fondamentale'
      },
      {
        id: 'value_1_description',
        label: 'Description de la première valeur',
        value: 'Nous encourageons la créativité et l\'esprit d\'innovation dans tous nos programmes.',
        type: 'textarea',
        category: 'values',
        description: 'Explication de cette valeur'
      },
      {
        id: 'value_2',
        label: 'Deuxième valeur',
        value: 'Excellence',
        type: 'text',
        category: 'values',
        description: 'Deuxième valeur fondamentale'
      },
      {
        id: 'value_2_description',
        label: 'Description de la deuxième valeur',
        value: 'Nous visons l\'excellence dans l\'enseignement et l\'accompagnement de nos étudiants.',
        type: 'textarea',
        category: 'values',
        description: 'Explication de cette valeur'
      },
      {
        id: 'value_3',
        label: 'Troisième valeur',
        value: 'Bienveillance',
        type: 'text',
        category: 'values',
        description: 'Troisième valeur fondamentale'
      },
      {
        id: 'value_3_description',
        label: 'Description de la troisième valeur',
        value: 'Nous créons un environnement d\'apprentissage bienveillant et inclusif pour tous.',
        type: 'textarea',
        category: 'values',
        description: 'Explication de cette valeur'
      }
    ]
  };

  // Charger le contenu sauvegardé
  useEffect(() => {
    const saved = localStorage.getItem('adminContentChanges');
    if (saved) {
      setSavedContent(JSON.parse(saved));
    }
  }, []);

  // Sauvegarder les modifications
  const handleSave = async () => {
    setSaving(true);
    
    // Simuler l'appel API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    localStorage.setItem('adminContentChanges', JSON.stringify(savedContent));
    setSaving(false);
    
    // Notification de succès (pourrait être une toast)
    alert('Modifications sauvegardées avec succès !');
  };

  // Mettre à jour le contenu
  const updateContent = (id: string, value: string) => {
    setSavedContent(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Obtenir la valeur actuelle (sauvegardée ou par défaut)
  const getCurrentValue = (item: EditableContent) => {
    return savedContent[item.id] || item.value;
  };

  const currentCategory = categories.find(cat => cat.id === selectedCategory);
  const currentContent = editableContent[selectedCategory] || [];

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-lg shadow-sm border border-crec-gold"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              <Edit3 className="inline w-6 h-6 mr-2 text-crec-gold" />
              Gestion du Contenu
            </h1>
            <p className="text-gray-600">
              Modifiez facilement le contenu important de votre site web. 
              Les changements apparaîtront immédiatement sur le site après sauvegarde.
            </p>
          </div>
          <Button
            onClick={handleSave}
            disabled={saving || Object.keys(savedContent).length === 0}
            className="bg-crec-gold hover:bg-crec-lightgold text-black font-medium px-6 py-2"
          >
            {saving ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 mr-2"
                >
                  ⟳
                </motion.div>
                Sauvegarde...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Sauvegarder les modifications
              </>
            )}
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Menu des catégories */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Types de Contenu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isActive = selectedCategory === category.id;
                  
                  return (
                    <motion.button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full p-4 rounded-lg border-2 transition-all ${
                        isActive
                          ? 'border-crec-gold bg-crec-gold/10 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${category.color} text-white`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className={`font-medium ${isActive ? 'text-crec-gold' : 'text-gray-900'}`}>
                            {category.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contenu éditable */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                {currentCategory && (
                  <>
                    <div className={`p-2 rounded-lg ${currentCategory.color} text-white`}>
                      <currentCategory.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{currentCategory.name}</CardTitle>
                      <p className="text-gray-600 text-sm mt-1">{currentCategory.description}</p>
                    </div>
                  </>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {currentContent.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 p-4 rounded-lg border"
                  >
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-900 mb-1">
                        {item.label}
                      </label>
                      <p className="text-xs text-gray-600">{item.description}</p>
                    </div>
                    
                    {item.type === 'textarea' ? (
                      <textarea
                        value={getCurrentValue(item)}
                        onChange={(e) => updateContent(item.id, e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crec-gold focus:border-transparent resize-none"
                        rows={4}
                        maxLength={item.maxLength}
                        placeholder={`Modifier ${item.label.toLowerCase()}...`}
                      />
                    ) : item.type === 'number' ? (
                      <input
                        type="number"
                        value={getCurrentValue(item)}
                        onChange={(e) => updateContent(item.id, e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crec-gold focus:border-transparent"
                        min="0"
                        step="0.01"
                      />
                    ) : (
                      <input
                        type="text"
                        value={getCurrentValue(item)}
                        onChange={(e) => updateContent(item.id, e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crec-gold focus:border-transparent"
                        maxLength={item.maxLength}
                        placeholder={`Modifier ${item.label.toLowerCase()}...`}
                      />
                    )}
                    
                    {item.maxLength && (
                      <div className="mt-1 text-xs text-gray-500 text-right">
                        {getCurrentValue(item).length}/{item.maxLength} caractères
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Aide rapide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-500 text-white rounded-lg">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">💡 Conseils d'utilisation</h3>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• Modifiez uniquement le contenu, la mise en page reste inchangée</li>
                  <li>• Vos modifications apparaîtront sur le site après sauvegarde</li>
                  <li>• Respectez les limites de caractères pour un affichage optimal</li>
                  <li>• N'hésitez pas à prévisualiser vos changements avant de sauvegarder</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PageManagementNew;
