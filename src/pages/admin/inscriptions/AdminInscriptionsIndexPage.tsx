// src/pages/admin/inscriptions/AdminInscriptionsIndexPage.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  GraduationCap,
  Wrench,
  Building,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Eye
} from "lucide-react";
import inscriptionService, { RecentInscription } from '@/services/inscription-service';
import StatCard from '@/components/admin/StatCard';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const AdminInscriptionsIndexPage: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);
  const [recentInscriptions, setRecentInscriptions] = useState<RecentInscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const response = await inscriptionService.getDashboardData();
      setStats(response.data.stats);
      setRecentInscriptions(response.data.recent_inscriptions);
    } catch (error) {
      console.error('Erreur chargement données:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données des inscriptions.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'approved': return 'Approuvée';
      case 'rejected': return 'Rejetée';
      default: return status;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'fablab': return 'bg-blue-100 text-blue-800';
      case 'formations': return 'bg-purple-100 text-purple-800';
      case 'university': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'fablab': return 'FabLab';
      case 'formations': return 'Formation';
      case 'university': return 'Université';
      default: return type;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* En-tête Institutionnel Refiné */}
      <div className="glass-panel p-10 rounded-[2.5rem] relative overflow-hidden group border border-white/60 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-crec-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-crec-gold/10 transition-all duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <div className="p-6 bg-gradient-to-br from-crec-darkblue to-blue-900 rounded-[2rem] shadow-2xl border border-white/20">
            <Users className="w-10 h-10 text-crec-gold" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold admin-title mb-4 tracking-tight">
              Centre des Admissions & <br className="hidden md:block" /> Candidatures
            </h1>
            <p className="text-slate-600 font-medium max-w-2xl leading-relaxed text-sm md:text-base">
              Supervisez le flux des nouveaux talents. Authentifiez les dossiers académiques de la
              <span className="text-crec-darkblue font-bold px-1">Faculté ISTM</span>, validez les
              <span className="text-crec-darkblue font-bold px-1">Cursus Professionnels</span> et enregistrez les
              <span className="text-crec-darkblue font-bold px-1">Chercheurs du FabLab</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Guide de Gouvernance Glassmorphism */}
      <div className="glass-panel p-8 rounded-[2rem] border border-blue-200/40 bg-blue-500/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Users className="w-24 h-24 text-blue-900" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-600 rounded-lg"><Clock className="w-5 h-5 text-white" /></div>
            <h3 className="text-xl font-bold text-crec-darkblue">Protocole de Traitement des Admissions</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[
                "Vérification rigoureuse des justificatifs académiques",
                "Validation des flux financiers (Reçus de Paiement)",
                "Arbitrage des candidatures en commission",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-700 text-sm font-bold">
                  <CheckCircle className="w-4 h-4 text-emerald-500" /> {item}
                </div>
              ))}
            </div>
            <div className="bg-white/40 p-5 rounded-2xl border border-white/60">
              <p className="text-xs text-blue-900 leading-relaxed font-bold uppercase tracking-tighter">
                <span className="text-crec-gold mr-2 text-lg">!</span>
                L'approbation d'un dossier déclenche l'envoi immédiat du Protocole d'Accueil Institutionnel et des accès sécurisés aux plateformes du CREC.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Panorama des Flux (Statistiques) */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Membres FabLab", value: stats.fablab.total, icon: Wrench, color: "text-blue-600", bg: "bg-blue-500/10" },
            { title: "Dossiers Formations", value: stats.formations.total, icon: GraduationCap, color: "text-purple-600", bg: "bg-purple-500/10" },
            { title: "Candidats Faculté", value: stats.university.total, icon: Building, color: "text-amber-600", bg: "bg-amber-500/10" },
            { title: "Arbitrage en Attente", value: stats.fablab.pending + stats.formations.pending + stats.university.pending, icon: Clock, color: "text-red-600", bg: "bg-red-500/10" }
          ].map((stat, i) => (
            <div key={i} className="glass-card p-8 rounded-3xl border border-white/60 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
              <div className="relative z-10">
                <div className={`p-3 w-fit rounded-2xl ${stat.bg} mb-6`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="admin-card-label mb-1 uppercase text-[10px] tracking-[0.2em]">{stat.title}</p>
                <h3 className="text-4xl font-black text-slate-800 tracking-tighter">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Détails par Filière (Tabs) */}
      {stats && (
        <Tabs defaultValue="overview" className="space-y-8 animate-in slide-in-from-bottom-5 duration-700">
          <TabsList className="bg-crec-darkblue/5 p-1.5 rounded-2xl w-full md:w-fit overflow-hidden border border-white/40">
            <TabsTrigger value="overview" className="px-8 py-2.5 rounded-xl data-[state=active]:bg-crec-darkblue data-[state=active]:text-white data-[state=active]:shadow-lg text-sm font-bold transition-all">Panorama</TabsTrigger>
            <TabsTrigger value="fablab" className="px-8 py-2.5 rounded-xl data-[state=active]:bg-crec-darkblue data-[state=active]:text-white data-[state=active]:shadow-lg text-sm font-bold transition-all">FabLab</TabsTrigger>
            <TabsTrigger value="formations" className="px-8 py-2.5 rounded-xl data-[state=active]:bg-crec-darkblue data-[state=active]:text-white data-[state=active]:shadow-lg text-sm font-bold transition-all">Formations</TabsTrigger>
            <TabsTrigger value="university" className="px-8 py-2.5 rounded-xl data-[state=active]:bg-crec-darkblue data-[state=active]:text-white data-[state=active]:shadow-lg text-sm font-bold transition-all">Faculté</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: "Admissions Validées", total: stats.fablab.approved + stats.formations.approved + stats.university.approved, color: "text-emerald-600", bg: "bg-emerald-500/10", details: stats },
                { label: "En Commission", total: stats.fablab.pending + stats.formations.pending + stats.university.pending, color: "text-amber-600", bg: "bg-amber-500/10", details: stats },
                { label: "Dossiers Rejetés", total: stats.fablab.rejected + stats.formations.rejected + stats.university.rejected, color: "text-red-600", bg: "bg-red-500/10", details: stats }
              ].map((group, i) => (
                <div key={i} className="glass-card p-6 rounded-3xl border border-white/60">
                  <h4 className="text-sm font-bold text-slate-400 mb-4">{group.label}</h4>
                  <div className={`text-4xl font-black ${group.color} mb-6 tracking-tighter`}>{group.total}</div>
                  <div className="space-y-3 pt-4 border-t border-white/40">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                      <span>FabLab</span> <span className="text-crec-darkblue">{group.details.fablab[i === 0 ? 'approved' : i === 1 ? 'pending' : 'rejected']}</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                      <span>Formations</span> <span className="text-crec-darkblue">{group.details.formations[i === 0 ? 'approved' : i === 1 ? 'pending' : 'rejected']}</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                      <span>Faculté</span> <span className="text-crec-darkblue">{group.details.university[i === 0 ? 'approved' : i === 1 ? 'pending' : 'rejected']}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {['fablab', 'formations', 'university'].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <div className="glass-panel p-10 rounded-[2.5rem] border border-white/60">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <div className="p-5 bg-crec-darkblue rounded-[1.5rem] shadow-xl">
                      {tab === 'fablab' ? <Wrench className="w-8 h-8 text-white" /> :
                        tab === 'formations' ? <GraduationCap className="w-8 h-8 text-white" /> :
                          <Building className="w-8 h-8 text-white" />}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold admin-title uppercase tracking-tight">Statistiques {tab === 'university' ? 'Faculté' : tab.charAt(0).toUpperCase() + tab.slice(1)}</h3>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Registre des admissions sectorielles</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 flex-1 max-w-2xl">
                    {[
                      { l: "Total", v: stats[tab].total, c: "text-slate-800" },
                      { l: "Attente", v: stats[tab].pending, c: "text-amber-600" },
                      { l: "Admis", v: stats[tab].approved, c: "text-emerald-600" },
                      { l: "Refus", v: stats[tab].rejected, c: "text-red-600" }
                    ].map((s, i) => (
                      <div key={i} className="text-center">
                        <div className="text-2xl font-black tracking-tighter" style={{ color: s.c.split('-')[1] === 'slate' ? undefined : s.c.split('-')[1] }}>{s.v}</div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-10 pt-8 border-t border-white/40">
                  <Button
                    className="glass-button h-14 px-10 bg-crec-darkblue text-white"
                    onClick={() => navigate(`/admin/inscriptions/${tab}`)}
                  >
                    <Eye className="w-4 h-4 mr-3" />
                    <span className="font-bold tracking-widest text-xs uppercase">Ouvrir le Registre Détailé</span>
                  </Button>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}

      {/* Registre des Inscriptions Récentes */}
      <div className="glass-panel p-10 rounded-[2.5rem] border border-white/60 shadow-xl overflow-hidden relative">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold admin-title">Journal de Flux Récent</h3>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Les 20 dernières transmissions institutionnelles</p>
          </div>
          <TrendingUp className="w-10 h-10 text-crec-gold/20" />
        </div>

        {recentInscriptions.length === 0 ? (
          <div className="text-center py-16 text-slate-400 font-bold italic">
            Aucune transmission récente détectée dans les archives.
          </div>
        ) : (
          <div className="space-y-4">
            {recentInscriptions.map((inscription) => (
              <div key={`${inscription.type}-${inscription.id}`}
                className="glass-card p-6 rounded-2xl border border-white/40 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white/60 transition-all duration-300">
                <div className="flex-1 w-full md:w-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className={`${getTypeColor(inscription.type)} border-none px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest`}>
                      {getTypeLabel(inscription.type)}
                    </Badge>
                    <Badge className={`${getStatusColor(inscription.status)} border-none px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest`}>
                      {getStatusText(inscription.status)}
                    </Badge>
                  </div>
                  <h4 className="text-lg font-bold text-crec-darkblue">{inscription.name}</h4>
                  <p className="text-xs font-bold text-crec-gold mt-1 tracking-tight truncate max-w-sm">{inscription.email}</p>
                </div>

                <div className="flex items-center gap-8 w-full md:w-auto pt-6 md:pt-0 border-t md:border-t-0 border-white/40">
                  <div className="text-left md:text-right">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Transmission</div>
                    <div className="text-xs font-bold text-crec-darkblue flex items-center gap-2">
                      <Clock className="w-3 h-3 text-crec-gold" /> {formatDate(inscription.created_at)}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="glass-button h-10 px-6 bg-white/60 border-crec-darkblue/10"
                    onClick={() => navigate(`/admin/inscriptions/${inscription.type}`)}
                  >
                    <span className="font-bold tracking-widest text-[10px] uppercase">Rapport</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Accès Sectoriels Rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { color: "border-blue-500/20 shadow-blue-900/5", text: "text-blue-700", type: "fablab", icon: Wrench, label: "Registre FabLab", desc: "Supervision des abonnements technologiques et flux des chercheurs." },
          { color: "border-purple-500/20 shadow-purple-900/5", text: "text-purple-700", type: "formations", icon: GraduationCap, label: "Offre Professionnelle", desc: "Instruction des candidatures aux cursus certificateurs transverses." },
          { color: "border-amber-500/20 shadow-amber-900/5", text: "text-amber-700", type: "university", icon: Building, label: "Patrimoine Faculté", desc: "Arbitrage souverain des dossiers académiques pour le cycle ISTM." }
        ].map((action, i) => (
          <div key={i} className={`glass-card p-10 rounded-[2.5rem] border ${action.color} flex flex-col items-center text-center group transition-all duration-500 hover:-translate-y-2 cursor-pointer`}
            onClick={() => navigate(`/admin/inscriptions/${action.type}`)}>
            <div className="p-5 bg-crec-darkblue/5 rounded-[1.5rem] mb-8 group-hover:bg-crec-darkblue group-hover:text-white transition-all duration-500">
              <action.icon className="w-8 h-8" />
            </div>
            <h4 className={`text-xl font-bold admin-title mb-4 ${action.text}`}>{action.label}</h4>
            <p className="text-slate-500 text-xs font-medium leading-relaxed mb-8">{action.desc}</p>
            <Button className="w-full h-12 glass-button bg-crec-darkblue text-white group-hover:bg-crec-gold border-none">
              <span className="font-bold tracking-widest text-[10px] uppercase">Accéder au Département</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminInscriptionsIndexPage;