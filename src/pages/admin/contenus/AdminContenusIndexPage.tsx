import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  GraduationCap, 
  Wrench, 
  BookOpen,
  ArrowRight,
  Edit3,
  Settings,
  PlusCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';

const AdminContenusIndexPage: React.FC = () => {
  const navigate = useNavigate();

  // États pour les statistiques
  const [stats, setStats] = useState({
    istm: { programs: '0 programme', active: '0 actif', draft: '0 brouillon' },
    formations: { programs: '0 formation', active: '0 active', draft: '0 en préparation' },
    fablab: { programs: '0 équipement', active: '0 disponible', draft: '0 en maintenance' }
  });

  // Charger les statistiques depuis l'API
  useEffect(() => {
    const loadStats = async () => {
      try {
        // TODO: Remplacer par les vrais appels API
        // const response = await fetch('/api/admin/contenus/stats');
        // const data = await response.json();
        // setStats(data);
        
        // Pour l'instant, garder les statistiques à zéro
        setStats({
          istm: { programs: '0 programme', active: '0 actif', draft: '0 brouillon' },
          formations: { programs: '0 formation', active: '0 active', draft: '0 en préparation' },
          fablab: { programs: '0 équipement', active: '0 disponible', draft: '0 en maintenance' }
        });
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
      }
    };

    loadStats();
  }, []);

  const contentSections = [
    {
      id: 'istm',
      title: 'Contenus ISTM',
      description: 'Gérez les programmes universitaires, filières et cursus de l\'Institut Supérieur de Technologie Matteo Ricci.',
      icon: GraduationCap,
      path: '/admin/contenus/istm',
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
      features: [
        'Création de programmes (Licence, Master, Doctorat)',
        'Gestion des compétences et débouchés',
        'Configuration des frais d\'inscription',
        'Paramétrage de la rentrée scolaire'
      ],
      stats: stats.istm
    },
    {
      id: 'formations',
      title: 'Contenus Formations',
      description: 'Administrez le catalogue des formations professionnelles et certifiantes proposées par le CREC.',
      icon: BookOpen,
      path: '/admin/contenus/formations',
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600',
      features: [
        'Catalogue de formations courtes',
        'Gestion des formateurs et experts',
        'Configuration des prérequis',
        'Planning et calendrier des sessions'
      ],
      stats: stats.formations
    },
    {
      id: 'fablab',
      title: 'Contenus FabLab',
      description: 'Configurez les équipements, machines et services disponibles dans votre espace de fabrication numérique.',
      icon: Wrench,
      path: '/admin/contenus/fablab',
      color: 'bg-orange-50 border-orange-200',
      iconColor: 'text-orange-600',
      features: [
        'Inventaire des machines et équipements',
        'Configuration des créneaux de réservation',
        'Gestion des tarifs et abonnements',
        'Documentation et tutoriels'
      ],
      stats: stats.fablab
    }
  ];

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-green-100 rounded-full">
            <FileText className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Gestion des Contenus</h1>
        </div>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Créez, modifiez et organisez tous les contenus de votre établissement. 
          Gérez les programmes académiques, les formations professionnelles et 
          les équipements du FabLab depuis une interface centralisée.
        </p>
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-600 rounded-full">
                <PlusCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                {/* <p className="text-2xl font-bold text-green-800">35</p> */}
                <p className="text-sm text-green-600">Contenus actifs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600 rounded-full">
                <Edit3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-800">7</p>
                <p className="text-sm text-blue-600">En cours d'édition</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-600 rounded-full">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-800">42</p>
                <p className="text-sm text-purple-600">Total des éléments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sections de contenu */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {contentSections.map((section) => (
          <Card 
            key={section.id} 
            className={`${section.color} hover:shadow-lg transition-all duration-300 group cursor-pointer`}
            onClick={() => navigate(section.path)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 bg-white rounded-lg shadow-sm`}>
                  <section.icon className={`w-6 h-6 ${section.iconColor}`} />
                </div>
                <CardTitle className="text-lg font-semibold text-slate-800">
                  {section.title}
                </CardTitle>
              </div>
              <CardDescription className="text-slate-600 leading-relaxed">
                {section.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Fonctionnalités */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-slate-700">Fonctionnalités :</h4>
                <ul className="space-y-1">
                  {section.features.map((feature, index) => (
                    <li key={index} className="text-xs text-slate-600 flex items-center gap-2">
                      <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Statistiques */}
              <div className="flex flex-wrap gap-2 pt-2">
                <Badge variant="secondary" className="text-xs">
                  {section.stats.programs}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {section.stats.active}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {section.stats.draft}
                </Badge>
              </div>

              {/* Bouton d'action */}
              <Button 
                className="w-full mt-4 group-hover:bg-slate-700 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(section.path);
                }}
              >
                Gérer les contenus
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Actions rapides */}
      <Card className="bg-gradient-to-r from-indigo-50 to-indigo-100 border-indigo-200">
        <CardHeader>
          <CardTitle className="text-center text-indigo-800">Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="p-4 h-auto flex-col gap-2 border-indigo-200 hover:bg-indigo-50"
              onClick={() => navigate('/admin/contenus/istm')}
            >
              <GraduationCap className="w-5 h-5 text-indigo-600" />
              <span className="text-sm">Nouveau programme ISTM</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="p-4 h-auto flex-col gap-2 border-indigo-200 hover:bg-indigo-50"
              onClick={() => navigate('/admin/contenus/formations')}
            >
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span className="text-sm">Nouvelle formation</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="p-4 h-auto flex-col gap-2 border-indigo-200 hover:bg-indigo-50"
              onClick={() => navigate('/admin/contenus/fablab')}
            >
              <Wrench className="w-5 h-5 text-indigo-600" />
              <span className="text-sm">Ajouter équipement</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Section d'aide */}
      <Card className="bg-gradient-to-r from-slate-50 to-slate-100 border-slate-200">
        <CardContent className="p-6">
          <div className="text-center space-y-3">
            <h3 className="text-lg font-semibold text-slate-800">Besoin d'aide ?</h3>
            <p className="text-slate-600 text-sm max-w-2xl mx-auto">
              Consultez notre documentation pour apprendre à créer et gérer efficacement 
              vos contenus académiques et administratifs.
            </p>
            <div className="flex gap-3 justify-center mt-4">
              <Button variant="outline" size="sm">
                Documentation
              </Button>
              <Button variant="outline" size="sm">
                Tutoriels vidéo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminContenusIndexPage;
