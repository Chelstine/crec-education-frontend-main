import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  GraduationCap, 
  Wrench, 
  BookOpen,
  ArrowRight,
  CheckCircle,
  Clock,
  UserCheck
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';

const AdminInscriptionsIndexPage: React.FC = () => {
  const navigate = useNavigate();

  const inscriptionSections = [
    {
      id: 'istm',
      title: 'Inscriptions ISTM',
      description: 'Gérez les candidatures et admissions pour les programmes universitaires de l\'Institut Supérieur de Technologie Matteo Ricci.',
      icon: GraduationCap,
      path: '/admin/inscriptions/istm',
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
      features: [
        'Validation des dossiers académiques',
        'Gestion des programmes (Licence, Master, Doctorat)',
        'Suivi des frais d\'inscription',
        'Génération des listes d\'admission'
      ],
      stats: {
        pending: '12 en attente',
        approved: '45 approuvées',
        total: '57 total'
      }
    },
    {
      id: 'formations',
      title: 'Inscriptions Formations',
      description: 'Administrez les inscriptions aux formations professionnelles et certifiantes proposées par le CREC.',
      icon: BookOpen,
      path: '/admin/inscriptions/formations',
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600',
      features: [
        'Formations courtes et certifiantes',
        'Gestion des places disponibles',
        'Validation des prérequis',
        'Émission des certificats'
      ],
      stats: {
        pending: '8 en attente',
        approved: '32 approuvées',
        total: '40 total'
      }
    },
    {
      id: 'fablab',
      title: 'Inscriptions FabLab',
      description: 'Validez les demandes d\'accès au FabLab et gérez les abonnements des makers et créateurs.',
      icon: Wrench,
      path: '/admin/inscriptions/fablab',
      color: 'bg-orange-50 border-orange-200',
      iconColor: 'text-orange-600',
      features: [
        'Validation des reçus de paiement',
        'Génération des clés d\'accès',
        'Gestion des abonnements',
        'Suivi de l\'utilisation des machines'
      ],
      stats: {
        pending: '5 en attente',
        approved: '23 approuvées',
        total: '28 total'
      }
    }
  ];

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Gestion des Inscriptions</h1>
        </div>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Centralisez et gérez toutes les inscriptions de votre établissement. 
          Validez les candidatures, approuvez les dossiers et suivez l'évolution des inscriptions 
          pour l'ISTM, les formations professionnelles et le FabLab.
        </p>
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600 rounded-full">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-800">25</p>
                <p className="text-sm text-blue-600">En attente de validation</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-600 rounded-full">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-800">100</p>
                <p className="text-sm text-green-600">Inscriptions approuvées</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-600 rounded-full">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-800">125</p>
                <p className="text-sm text-purple-600">Total des inscriptions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sections d'inscription */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {inscriptionSections.map((section) => (
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
                  {section.stats.pending}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {section.stats.approved}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {section.stats.total}
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
                Gérer les inscriptions
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Section d'aide */}
      <Card className="bg-gradient-to-r from-slate-50 to-slate-100 border-slate-200">
        <CardContent className="p-6">
          <div className="text-center space-y-3">
            <h3 className="text-lg font-semibold text-slate-800">Besoin d'aide ?</h3>
            <p className="text-slate-600 text-sm max-w-2xl mx-auto">
              Consultez notre guide d'administration ou contactez le support technique 
              pour toute question concernant la gestion des inscriptions.
            </p>
            <div className="flex gap-3 justify-center mt-4">
              <Button variant="outline" size="sm">
                Guide d'utilisation
              </Button>
              <Button variant="outline" size="sm">
                Contacter le support
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminInscriptionsIndexPage;
