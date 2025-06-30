import React, { useState, useEffect } from 'react';
import { EditableField, InfoPanel } from '../../../components/admin';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Settings, Calendar, CreditCard, Banknote, School, BookOpen, Award } from 'lucide-react';
import { Button } from '../../../components/ui/button';

// Types pour les paramètres
interface PriceSetting {
  id: string;
  key: string;
  value: number;
  label: string;
  category: string;
  description?: string;
  lastUpdatedAt: string;
  lastUpdatedBy: string;
}

interface DateSetting {
  id: string;
  key: string;
  value: string;
  label: string;
  category: string;
  description?: string;
  lastUpdatedAt: string;
  lastUpdatedBy: string;
}

const AdminPricingSettingsPage: React.FC = () => {
  const [priceSettings, setPriceSettings] = useState<PriceSetting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  // Chargement des paramètres de prix
  const loadPriceSettings = async () => {
    try {
      setIsLoading(true);
      
      // Pour le développement, utiliser des données simulées
      setTimeout(() => {
        const mockPriceSettings: PriceSetting[] = [
          {
            id: '1',
            key: 'university_registration_fee',
            value: 25000,
            label: "Frais d'inscription universitaire",
            category: 'university',
            description: "Frais d'inscription pour les étudiants de l'université",
            lastUpdatedAt: '2023-05-15T10:30:00Z',
            lastUpdatedBy: 'Admin System'
          },
          {
            id: '2',
            key: 'university_yearly_fee',
            value: 1250000,
            label: "Frais de scolarité annuels",
            category: 'university',
            description: "Frais de scolarité annuels pour les étudiants de l'université",
            lastUpdatedAt: '2023-05-15T10:35:00Z',
            lastUpdatedBy: 'Admin System'
          },
          {
            id: '3',
            key: 'fablab_monthly_subscription',
            value: 15000,
            label: "Abonnement mensuel FabLab",
            category: 'fablab',
            description: "Prix de l'abonnement mensuel au FabLab",
            lastUpdatedAt: '2023-06-10T14:20:00Z',
            lastUpdatedBy: 'Jean Dupont'
          },
          {
            id: '4',
            key: 'fablab_yearly_subscription',
            value: 150000,
            label: "Abonnement annuel FabLab",
            category: 'fablab',
            description: "Prix de l'abonnement annuel au FabLab",
            lastUpdatedAt: '2023-06-10T14:22:00Z',
            lastUpdatedBy: 'Jean Dupont'
          },
          {
            id: '5',
            key: 'formation_web_dev_price',
            value: 250000,
            label: "Formation Développement Web",
            category: 'formations',
            description: "Prix de la formation Développement Web",
            lastUpdatedAt: '2023-07-05T09:15:00Z',
            lastUpdatedBy: 'Marie Laurent'
          },
          {
            id: '6',
            key: 'formation_data_science_price',
            value: 200000,
            label: "Formation Data Science",
            category: 'formations',
            description: "Prix de la formation Data Science",
            lastUpdatedAt: '2023-07-05T09:18:00Z',
            lastUpdatedBy: 'Marie Laurent'
          },
        ];
        
        // Filtrer par catégorie si nécessaire
        let filteredSettings = [...mockPriceSettings];
        if (activeCategory !== 'all') {
          filteredSettings = mockPriceSettings.filter(s => s.category === activeCategory);
        }
        
        setPriceSettings(filteredSettings);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error('Erreur lors du chargement des paramètres de prix:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPriceSettings();
  }, [activeCategory]);

  // Mise à jour d'un paramètre de prix
  const handleUpdatePrice = async (key: string, newValue: string) => {
    try {
      // En production, utilisez l'API réelle
      // await api.put('/settings/price', {
      //   key,
      //   value: parseFloat(newValue)
      // });
      
      // Pour le développement, simuler la modification
      console.log(`Mise à jour du prix ${key} : ${newValue}`);
      
      // Mettre à jour l'état local
      setPriceSettings(prev => 
        prev.map(setting => 
          setting.key === key 
            ? { 
                ...setting, 
                value: parseFloat(newValue),
                lastUpdatedAt: new Date().toISOString(),
                lastUpdatedBy: 'Admin (vous)'
              } 
            : setting
        )
      );
      
      return Promise.resolve();
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du prix ${key}:`, error);
      return Promise.reject(error);
    }
  };

  // Groupement des paramètres par catégorie pour un affichage plus clair
  const getSettingsByCategory = () => {
    const categories = {
      university: priceSettings.filter(s => s.category === 'university'),
      fablab: priceSettings.filter(s => s.category === 'fablab'),
      formations: priceSettings.filter(s => s.category === 'formations')
    };
    
    return categories;
  };

  const categories = getSettingsByCategory();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Paramètres de prix</h1>
        <p className="text-slate-500">Gérez les prix affichés sur le site de manière centralisée</p>
      </div>

      <InfoPanel
        title="Gestion centralisée des prix"
        icon={<Banknote className="h-5 w-5" />}
        variant="info"
      >
        <p className="text-sm text-blue-800">
          Les modifications apportées ici seront répercutées sur l'ensemble du site.
          Tous les changements sont enregistrés avec horodatage et nom d'utilisateur.
        </p>
      </InfoPanel>
      
      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList>
          <TabsTrigger value="all">Tous les prix</TabsTrigger>
          <TabsTrigger value="university">Université</TabsTrigger>
          <TabsTrigger value="formations">Formations ouvertes</TabsTrigger>
          <TabsTrigger value="fablab">FabLab</TabsTrigger>
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-crec-gold"></div>
        </div>
      ) : priceSettings.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center text-slate-500">
          <Settings className="h-16 w-16 mb-4 text-slate-300" />
          <p>Aucun paramètre de prix dans cette catégorie</p>
        </div>
      ) : activeCategory === 'all' ? (
        // Affichage par catégorie
        <div className="space-y-8">
          {/* Université */}
          {categories.university.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-medium flex items-center gap-2 text-amber-700">
                <School className="h-5 w-5" />
                Université
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.university.map((setting) => (
                  <EditableField
                    key={setting.id}
                    type="number"
                    name={setting.key}
                    label={setting.label}
                    value={setting.value.toString()}
                    onSave={(key, value) => handleUpdatePrice(key, value)}
                    className="bg-white p-4 rounded-lg shadow-sm"
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Formations ouvertes */}
          {categories.formations.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-medium flex items-center gap-2 text-blue-700">
                <BookOpen className="h-5 w-5" />
                Formations ouvertes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.formations.map((setting) => (
                  <EditableField
                    key={setting.id}
                    type="number"
                    name={setting.key}
                    label={setting.label}
                    value={setting.value.toString()}
                    onSave={(key, value) => handleUpdatePrice(key, value)}
                    className="bg-white p-4 rounded-lg shadow-sm"
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* FabLab */}
          {categories.fablab.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-medium flex items-center gap-2 text-emerald-700">
                <Award className="h-5 w-5" />
                FabLab
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.fablab.map((setting) => (
                  <EditableField
                    key={setting.id}
                    type="number"
                    name={setting.key}
                    label={setting.label}
                    value={setting.value.toString()}
                    onSave={(key, value) => handleUpdatePrice(key, value)}
                    className="bg-white p-4 rounded-lg shadow-sm"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        // Affichage simple pour une catégorie spécifique
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {priceSettings.map((setting) => (
            <EditableField
              key={setting.id}
              type="number"
              name={setting.key}
              label={setting.label}
              value={setting.value.toString()}
              onSave={(key, value) => handleUpdatePrice(key, value)}
              className="bg-white p-4 rounded-lg shadow-sm"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPricingSettingsPage;
