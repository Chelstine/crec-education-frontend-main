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

  // Contenu éditable par catégorie - Données de base
  const editableContent: {[key: string]: EditableContent[]} = {
    formations: [
      {
        id: 'university_title',
        label: 'Titre du programme universitaire',
        value: 'Formation Universitaire en Ingénierie',
        type: 'text',
        category: 'formations',
        description: 'Le titre principal affiché pour le programme universitaire',
        maxLength: 100
      },
      {
        id: 'university_description',
        label: 'Description du programme universitaire',
        value: 'Une formation complète en ingénierie avec une approche pratique et innovante. Préparez-vous aux défis technologiques de demain.',
        type: 'textarea',
        category: 'formations',
        description: 'Description détaillée du programme universitaire'
      },
      {
        id: 'university_duration',
        label: 'Durée de la formation universitaire',
        value: '3 ans',
        type: 'text',
        category: 'formations',
        description: 'Durée totale du programme'
      },
      {
        id: 'open_formations_title',
        label: 'Titre des formations ouvertes',
        value: 'Formations Ouvertes au Public',
        type: 'text',
        category: 'formations',
        description: 'Titre pour les formations courtes ouvertes à tous'
      },
      {
        id: 'open_formations_description',
        label: 'Description des formations ouvertes',
        value: 'Découvrez nos formations courtes et spécialisées, adaptées à tous les niveaux et disponibles tout au long de l\'année.',
        type: 'textarea',
        category: 'formations',
        description: 'Description générale des formations ouvertes'
      },
      {
        id: 'fablab_title',
        label: 'Titre du FabLab',
        value: 'FabLab CREC - Espace d\'Innovation',
        type: 'text',
        category: 'formations',
        description: 'Titre principal du FabLab'
      },
      {
        id: 'fablab_description',
        label: 'Description du FabLab',
        value: 'Un espace équipé des dernières technologies pour donner vie à vos projets créatifs et innovants. Imprimantes 3D, découpe laser, électronique et plus encore.',
        type: 'textarea',
        category: 'formations',
        description: 'Description complète du FabLab et de ses équipements'
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
