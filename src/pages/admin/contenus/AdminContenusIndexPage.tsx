import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, GraduationCap, Wrench, BookOpen, ArrowRight, Edit3, Settings, PlusCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';

const AdminContenusIndexPage: React.FC = () => {
  const navigate = useNavigate();

  // États pour les statistiques (vrai initial = null, pas de valeurs fake)
  const [stats, setStats] = useState<null | {
    istm: { programs: string; active: string; draft: string };
    formations: { programs: string; active: string; draft: string };
    fablab: { programs: string; active: string; draft: string };
    actifs: number;
    edition: number;
    total: number;
  }>(null);

  // Charger les statistiques depuis l'API
  useEffect(() => {
    const loadStats = async () => {
      try {
        // Import dynamique pour éviter les erreurs de cycle si api est importé en haut
        const api = (await import('@/services/api')).default;

        const response = await api.get('/admin/content/stats');
        const data = response.data;

        setStats({
          istm: {
            programs: `${data.istm.total || 0} programme${data.istm.total > 1 ? 's' : ''}`,
            active: `${data.istm.active || 0} actif${data.istm.active > 1 ? 's' : ''}`,
            draft: `${data.istm.draft || 0} brouillon${data.istm.draft > 1 ? 's' : ''}`,
          },
          formations: {
            programs: `${data.formations.total || 0} formation${data.formations.total > 1 ? 's' : ''}`,
            active: `${data.formations.active || 0} active${data.formations.active > 1 ? 's' : ''}`,
            draft: `${data.formations.draft || 0} en préparation`,
          },
          fablab: {
            programs: `${data.fablab.total || 0} élément${data.fablab.total > 1 ? 's' : ''}`,
            active: `${data.fablab.active || 0} disponible${data.fablab.active > 1 ? 's' : ''}`,
            draft: `${data.fablab.draft || 0} en maintenance`,
          },
          actifs: (data.istm.active || 0) + (data.formations.active || 0) + (data.fablab.active || 0),
          edition: (data.istm.draft || 0) + (data.formations.draft || 0) + (data.fablab.draft || 0),
          total: (data.istm.total || 0) + (data.formations.total || 0) + (data.fablab.total || 0),
        });
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
        setStats({
          istm: { programs: '0 programme', active: '0 actif', draft: '0 brouillon' },
          formations: { programs: '0 formation', active: '0 active', draft: '0 en préparation' },
          fablab: { programs: '0 équipement', active: '0 disponible', draft: '0 en maintenance' },
          actifs: 0, edition: 0, total: 0
        });
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
      get stats() { return stats ? stats.istm : { programs: '...', active: '...', draft: '...' }; }
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
      get stats() { return stats ? stats.formations : { programs: '...', active: '...', draft: '...' }; }
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
      get stats() { return stats ? stats.fablab : { programs: '...', active: '...', draft: '...' }; }
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* En-tête Institutionnel Refiné */}
      <div className="glass-panel p-10 rounded-[2.5rem] relative overflow-hidden group border border-white/60 shadow-2xl">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-crec-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-crec-gold/10 transition-all duration-700"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-crec-darkblue/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <div className="p-6 bg-gradient-to-br from-crec-darkblue to-blue-900 rounded-[2rem] shadow-2xl border border-white/20 transform group-hover:scale-105 transition-transform duration-500">
            <FileText className="w-10 h-10 text-crec-gold" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold admin-title mb-4 tracking-tight leading-tight">
              Patrimoine & <br className="hidden md:block" /> Contenus Académiques
            </h1>
            <p className="text-slate-600 font-medium max-w-2xl leading-relaxed text-sm md:text-base">
              Gouvernance centralisée des ressources institutionnelles. Managez avec rigueur les programmes du
              <span className="text-crec-darkblue font-bold px-1">Patrimoine ISTM</span>, les
              <span className="text-crec-darkblue font-bold px-1">Offres Certificateurs</span>
              et l'inventaire technologique du
              <span className="text-crec-darkblue font-bold px-1">FabLab</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Panorama Statistique Ultra-Refiné */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            label: "Ressources Actives",
            value: stats ? stats.actifs : '...',
            icon: PlusCircle,
            color: "from-green-500/10 to-emerald-500/5",
            iconColor: "text-emerald-600",
            border: "border-emerald-500/20"
          },
          {
            label: "En Rafinement",
            value: stats ? stats.edition : '...',
            icon: Edit3,
            color: "from-crec-gold/10 to-amber-500/5",
            iconColor: "text-crec-gold",
            border: "border-crec-gold/20"
          },
          {
            label: "Volume Patrimonial",
            value: stats ? stats.total : '...',
            icon: Settings,
            color: "from-blue-500/10 to-indigo-500/5",
            iconColor: "text-blue-600",
            border: "border-blue-500/20"
          }
        ].map((stat, i) => (
          <div key={i} className={`glass-card p-8 rounded-3xl border ${stat.border} hover:shadow-2xl transition-all duration-500 group overflow-hidden relative`}>
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <stat.icon className="w-16 h-16" />
            </div>
            <div className="relative z-10">
              <div className={`p-3 w-fit rounded-2xl bg-gradient-to-br ${stat.color} mb-6`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <p className="admin-card-label mb-1">{stat.label}</p>
              <h3 className="text-4xl font-black text-slate-800 tracking-tighter">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Sections de contenu Panorama */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {contentSections.map((section) => (
          <div
            key={section.id}
            className="glass-card flex flex-col h-full rounded-[2.5rem] border border-white/60 p-8 hover:shadow-2xl transition-all duration-500 group cursor-pointer"
            onClick={() => navigate(section.path)}
          >
            <div className="flex items-center gap-5 mb-8">
              <div className="p-4 bg-crec-darkblue/5 rounded-2xl group-hover:bg-crec-gold/10 transition-colors duration-500">
                <section.icon className={`w-8 h-8 ${section.iconColor}`} />
              </div>
              <div>
                <h3 className="text-xl font-bold admin-title">
                  {section.title}
                </h3>
                <p className="text-[10px] font-black text-crec-gold uppercase tracking-[0.2em] mt-1">
                  Département {section.id.toUpperCase()}
                </p>
              </div>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow font-medium">
              {section.description}
            </p>

            {/* Fonctionnalités Clés */}
            <div className="space-y-3 mb-8 bg-white/40 p-5 rounded-2xl border border-white/60">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Capacités de Gestion</h4>
              <ul className="space-y-2">
                {section.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="text-xs text-crec-darkblue font-bold flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-crec-gold rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Indicateurs de Performance */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="px-3 py-1.5 bg-white/60 rounded-full border border-white/80 text-[10px] font-black text-slate-600 uppercase tracking-tighter shadow-sm">
                {section.stats.programs}
              </div>
              <div className="px-3 py-1.5 bg-green-500/10 rounded-full border border-green-500/20 text-[10px] font-black text-green-700 uppercase tracking-tighter shadow-sm">
                {section.stats.active}
              </div>
            </div>

            {/* Bouton d'Action Institutionnel */}
            <Button
              className="w-full h-14 glass-button bg-crec-darkblue text-white group-hover:bg-crec-gold transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation();
                navigate(section.path);
              }}
            >
              <span className="font-bold tracking-widest text-xs uppercase">Explorer le Patrimoine</span>
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        ))}
      </div>

      {/* Actions de Gouvernance Rapides */}
      <div className="glass-panel p-10 rounded-[2.5rem] border border-white/60 shadow-xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5">
        <div className="mb-8 text-center md:text-left">
          <h3 className="text-2xl font-bold admin-title">Commandes de Gouvernance Rapides</h3>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Interventions immédiates sur le patrimoine</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Nouveau Cursus", icon: GraduationCap, path: "/admin/contenus/istm" },
            { label: "Ajouter Certification", icon: BookOpen, path: "/admin/contenus/formations" },
            { label: "Enregistrer Ressource", icon: Wrench, path: "/admin/contenus/fablab" }
          ].map((action, i) => (
            <Button
              key={i}
              variant="outline"
              className="h-24 glass-card bg-white/40 border-white/60 flex flex-col items-center justify-center gap-2 hover:bg-white/80 transition-all group rounded-2xl"
              onClick={() => navigate(action.path)}
            >
              <action.icon className="w-6 h-6 text-crec-darkblue group-hover:text-crec-gold transition-colors" />
              <span className="text-xs font-black uppercase tracking-widest text-crec-darkblue">{action.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Support Institutionnel & Assistance */}
      <div className="glass-panel p-10 rounded-[2.5rem] border border-white/60 shadow-xl bg-slate-900/5 overflow-hidden relative">
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-crec-gold/5 rounded-full blur-3xl"></div>
        <div className="text-center relative z-10">
          <h3 className="text-2xl font-bold admin-title">Assistance de l'Institution</h3>
          <p className="text-slate-500 font-medium text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
            Consultez les protocoles et guides de l'institution pour administrer avec efficacité
            le patrimoine numérique du CREC. Nos délégués sont à votre service.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button variant="outline" className="glass-button h-12 px-8 font-bold text-xs uppercase tracking-widest border-crec-darkblue/20">
              Protocoles & Guides
            </Button>
            <Button variant="outline" className="glass-button h-12 px-8 font-bold text-xs uppercase tracking-widest border-crec-darkblue/20">
              Assistance Technique
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContenusIndexPage;
