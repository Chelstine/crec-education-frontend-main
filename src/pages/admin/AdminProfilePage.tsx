import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  User as UserIcon,
  Mail,
  Shield,
  Calendar,
  Key,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Edit,
  Save,
  X
} from 'lucide-react';
import { BackendUser, AdminRole } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

interface PasswordFormData {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

interface ProfileFormData {
  nom: string;
  prenom: string;
  email: string;
}

const ProfileHeader: React.FC<{ user: BackendUser; mustChangePassword: boolean }> = ({ user, mustChangePassword }) => {
  const getRoleDisplayName = (role: AdminRole): string => {
    switch (role) {
      case 'super_admin': return 'Super Administrateur';
      case 'admin_contenu': return 'Délégué aux Contenus';
      case 'admin_inscription': return 'Officier des Admissions';
      default: return 'Membre de l\'Institution';
    }
  };

  const getInitials = (user: BackendUser): string => {
    const firstInitial = user.prenom?.charAt(0)?.toUpperCase() || 'U';
    const lastInitial = user.nom?.charAt(0)?.toUpperCase() || 'A';
    return `${firstInitial}${lastInitial}`;
  };

  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return 'Alpha-0.0';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="glass-panel p-8 rounded-[2rem] border border-white/60 shadow-xl overflow-hidden relative group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-crec-gold/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-crec-gold/20 transition-all duration-700"></div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-24 h-24 bg-gradient-to-br from-crec-darkblue to-blue-900 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/40 mb-6">
          <span className="text-3xl font-bold text-crec-gold tracking-widest">
            {getInitials(user)}
          </span>
        </div>

        <h2 className="text-2xl font-bold admin-title mb-1 text-center">
          {user.prenom} {user.nom}
        </h2>

        <p className="text-crec-darkblue/60 text-xs font-bold uppercase tracking-[0.2em] mb-6">
          {getRoleDisplayName(user.role)}
        </p>

        <div className="w-full space-y-3 pt-6 border-t border-white/30">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-bold uppercase tracking-tighter">Statut</span>
            <Badge className="bg-green-500/10 text-green-600 border-green-500/20 px-3 py-0.5 rounded-full text-[10px] font-bold">ACTIF</Badge>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-bold uppercase tracking-tighter">Membre depuis</span>
            <span className="text-crec-darkblue font-bold tracking-tight">{formatDate(user.created_at)}</span>
          </div>
          {mustChangePassword && (
            <div className="mt-4 p-3 bg-red-500/10 rounded-xl border border-red-500/20">
              <p className="text-[10px] text-red-600 font-black flex items-center gap-2">
                <AlertTriangle className="w-3 h-3" /> SÉCURITÉ REQUISE
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileEditForm: React.FC<{
  profileData: ProfileFormData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileFormData>>;
  handleProfileSubmit: (e: React.FormEvent) => void;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  error: string | null;
}> = ({
  profileData,
  setProfileData,
  handleProfileSubmit,
  setEditMode,
  loading,
  error
}) => {
    return (
      <motion.form
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        onSubmit={handleProfileSubmit}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="admin-card-label ml-1">Prénom</label>
            <Input
              value={profileData.prenom}
              onChange={(e) => setProfileData(prev => ({ ...prev, prenom: e.target.value }))}
              className="glass-input"
              required
            />
          </div>
          <div>
            <label className="admin-card-label ml-1">Nom</label>
            <Input
              value={profileData.nom}
              onChange={(e) => setProfileData(prev => ({ ...prev, nom: e.target.value }))}
              className="glass-input"
              required
            />
          </div>
        </div>
        <div>
          <label className="admin-card-label ml-1">Adresse Email Institutionnelle</label>
          <Input
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
            className="glass-input"
            required
          />
        </div>

        {error && (
          <Alert className="bg-red-500/10 border-red-500/20 text-red-600 rounded-xl">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="font-bold text-xs">{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            disabled={loading}
            className="flex-1 glass-button bg-crec-gold text-white border-crec-gold/20"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <> <Save className="w-4 h-4 mr-2" /> Enregistrer </>}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setEditMode(false)}
            className="flex-1 glass-button"
          >
            <X className="w-4 h-4 mr-2" /> Annuler
          </Button>
        </div>
      </motion.form>
    );
  };

const PasswordForm: React.FC<{
  passwordData: PasswordFormData;
  setPasswordData: React.Dispatch<React.SetStateAction<PasswordFormData>>;
  handlePasswordSubmit: (e: React.FormEvent) => void;
  setShowPasswordForm: React.Dispatch<React.SetStateAction<boolean>>;
  passwordError: string | null;
  loading: boolean;
  mustChangePassword: boolean;
}> = ({
  passwordData,
  setPasswordData,
  handlePasswordSubmit,
  setShowPasswordForm,
  passwordError,
  loading,
  mustChangePassword,
}) => {
  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      onSubmit={handlePasswordSubmit}
      className="space-y-6"
    >
      <div className="bg-amber-500/5 p-4 rounded-2xl border border-amber-500/10 mb-6">
        <p className="text-xs text-amber-700 font-medium leading-relaxed">
          <Shield className="w-3 h-3 inline mr-2 text-amber-500" />
          Votre nouveau mot de passe doit comporter au moins 8 caractères, incluant des lettres et des chiffres pour une sécurité optimale.
        </p>
      </div>

      <div>
        <label className="admin-card-label ml-1">Mot de passe actuel</label>
        <Input
          type="password"
          value={passwordData.current_password}
          onChange={(e) => setPasswordData(prev => ({ ...prev, current_password: e.target.value }))}
          className="glass-input"
          required
        />
      </div>
      <div>
        <label className="admin-card-label ml-1">Nouveau mot de passe</label>
        <Input
          type="password"
          value={passwordData.new_password}
          onChange={(e) => setPasswordData(prev => ({ ...prev, new_password: e.target.value }))}
          className="glass-input"
          required
        />
      </div>
      <div>
        <label className="admin-card-label ml-1">Confirmation du nouveau mot de passe</label>
        <Input
          type="password"
          value={passwordData.new_password_confirmation}
          onChange={(e) => setPasswordData(prev => ({ ...prev, new_password_confirmation: e.target.value }))}
          className="glass-input"
          required
        />
      </div>

      {passwordError && (
        <Alert className="bg-red-500/10 border-red-500/20 text-red-600 rounded-xl">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="font-bold text-xs">{passwordError}</AlertDescription>
        </Alert>
      )}

      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          disabled={loading}
          className="flex-1 glass-button bg-crec-darkblue text-white"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Mettre à jour le secret"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowPasswordForm(false)}
          disabled={mustChangePassword || loading}
          className="flex-1 glass-button"
        >
          Annuler
        </Button>
      </div>
    </motion.form>
  );
};

const AdminProfilePage: React.FC = () => {
  const { user, changePassword, mustChangePassword, clearError, getCurrentUser, updateProfile } = useAuth();

  // États pour l'édition du profil
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState<ProfileFormData>({
    nom: user?.nom || '',
    prenom: user?.prenom || '',
    email: user?.email || ''
  });

  // États pour le changement de mot de passe
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState<PasswordFormData>({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  });

  // États généraux
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('info');

  // Mettre à jour les données du profil quand l'utilisateur change
  useEffect(() => {
    if (user) {
      setProfileData({
        nom: user.nom || '',
        prenom: user.prenom || '',
        email: user.email || ''
      });
    }
  }, [user]);

  useEffect(() => {
    if (mustChangePassword) {
      setShowPasswordForm(true);
      setActiveTab('security');
    }
  }, [mustChangePassword]);

  useEffect(() => {
    if (successMsg || errorMsg) {
      const timer = setTimeout(() => {
        setSuccessMsg(null);
        setErrorMsg(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMsg, errorMsg]);

  useEffect(() => {
    if (passwordError) {
      const timer = setTimeout(() => setPasswordError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [passwordError]);

  useEffect(() => {
    if (profileError) {
      const timer = setTimeout(() => setProfileError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [profileError]);

  // Gestion de la soumission du profil
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError(null);

    try {
      setProfileLoading(true);

      // Appel à l'API pour mettre à jour le profil
      await updateProfile(profileData);

      await getCurrentUser(); // Récupérer les données mises à jour
      setSuccessMsg('Votre identité a été mise à jour avec succès.');
      setEditMode(false);

    } catch (error: any) {
      setProfileError(error.message || 'Échec de la mise à jour de l\'identité.');
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    clearError();

    if (passwordData.new_password.length < 8) {
      setPasswordError('Le secret doit comporter au moins 8 caractères.');
      return;
    }

    if (passwordData.new_password !== passwordData.new_password_confirmation) {
      setPasswordError('Les secrets ne correspondent pas.');
      return;
    }

    try {
      setLoading(true);
      await changePassword(
        passwordData.current_password,
        passwordData.new_password,
        passwordData.new_password_confirmation
      );

      await getCurrentUser();

      setSuccessMsg('Le secret de sécurité a été renouvelé.');
      setShowPasswordForm(false);
      setPasswordData({
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
      });
      setActiveTab('info');
    } catch (error: any) {
      setErrorMsg(error.message || 'Échec de la mise à jour de sécurité.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return 'Alpha-0.0';
    try {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Donnée inconsistante';
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-12 h-12 animate-spin text-crec-gold" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
      <AnimatePresence>
        {successMsg && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <Alert className="bg-green-500/10 border-green-500/20 text-green-700 rounded-2xl shadow-lg shadow-green-900/5">
              <CheckCircle className="h-5 w-5" />
              <AlertDescription className="font-bold">{successMsg}</AlertDescription>
            </Alert>
          </motion.div>
        )}
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <Alert className="border-red-300 bg-red-50 shadow-sm">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{errorMsg}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar: Profile Summary */}
        <div className="lg:col-span-4 sticky top-24">
          <ProfileHeader user={user} mustChangePassword={mustChangePassword} />
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-8">
          <div className="glass-panel p-8 rounded-[2rem] border border-white/60 shadow-xl min-h-[600px]">
            <Tabs defaultValue="info" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-crec-darkblue/5 p-1.5 rounded-2xl mb-10 w-full md:w-auto overflow-hidden border border-white/40">
                <TabsTrigger value="info" className="px-8 py-2.5 rounded-xl data-[state=active]:bg-crec-darkblue data-[state=active]:text-white data-[state=active]:shadow-lg text-sm font-bold transition-all">
                  Identité
                </TabsTrigger>
                <TabsTrigger value="security" className="px-8 py-2.5 rounded-xl data-[state=active]:bg-crec-darkblue data-[state=active]:text-white data-[state=active]:shadow-lg text-sm font-bold transition-all">
                  Sécurité
                </TabsTrigger>
                <TabsTrigger value="permissions" className="px-8 py-2.5 rounded-xl data-[state=active]:bg-crec-darkblue data-[state=active]:text-white data-[state=active]:shadow-lg text-sm font-bold transition-all">
                  Habilitations
                </TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="mt-0 focus-visible:outline-none">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold admin-title">Détails de l'Identité</h3>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Informations authentifiées</p>
                  </div>
                  {!editMode && (
                    <Button variant="outline" size="sm" onClick={() => setEditMode(true)} className="glass-button px-6">
                      <Edit className="w-4 h-4 mr-2" /> Édition
                    </Button>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {!editMode ? (
                    <motion.div key="display" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <label className="admin-card-label">Adresse Email</label>
                          <p className="flex items-center gap-3 mt-2 text-crec-darkblue font-bold">
                            <Mail className="w-4 h-4 text-crec-gold" /> {user.email}
                          </p>
                        </div>
                        <div>
                          <label className="admin-card-label">Identifiant Unique</label>
                          <p className="mt-2 font-mono text-xs text-slate-500 bg-white/40 p-2 rounded-lg border border-white/60">
                            ID: {String(user.id)}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/40">
                        <div>
                          <label className="admin-card-label">Surnom / Prénom</label>
                          <p className="mt-2 text-slate-800 font-medium text-lg">{user.prenom}</p>
                        </div>
                        <div>
                          <label className="admin-card-label">Nom de Famille</label>
                          <p className="mt-2 text-slate-800 font-medium text-lg">{user.nom}</p>
                        </div>
                      </div>

                      <div className="space-y-4 pt-6 border-t border-white/40">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-crec-gold/10 rounded-xl"><Calendar className="w-5 h-5 text-crec-gold" /></div>
                          <div>
                            <label className="admin-card-label text-[10px]">Dernière connexion enregistrée</label>
                            <p className="text-sm font-bold text-crec-darkblue">{formatDate(user.last_login || null)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-crec-darkblue/5 rounded-xl"><Key className="w-5 h-5 text-crec-darkblue" /></div>
                          <div>
                            <label className="admin-card-label text-[10px]">Dernier hachage de sécurité</label>
                            <p className="text-sm font-bold text-slate-600">{formatDate(user.password_changed_at || null)}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <ProfileEditForm
                      profileData={profileData}
                      setProfileData={setProfileData}
                      handleProfileSubmit={handleProfileSubmit}
                      setEditMode={setEditMode}
                      loading={profileLoading}
                      error={profileError}
                    />
                  )}
                </AnimatePresence>
              </TabsContent>

              <TabsContent value="security" className="mt-0 focus-visible:outline-none">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold admin-title">Gouvernance & Sécurité</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Protocole de protection du compte</p>
                </div>

                <AnimatePresence mode="wait">
                  {!showPasswordForm ? (
                    <motion.div key="security-view" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      <div className="glass-card p-6 rounded-2xl border-crec-gold/20 bg-crec-gold/5">
                        <p className="text-crec-darkblue/80 text-sm leading-relaxed font-medium">
                          {mustChangePassword
                            ? "Votre compte nécessite une intervention immédiate sur le secret de sécurité pour préserver l'intégrité de l'institution."
                            : "Il est préconisé de renouveler vos secrets de sécurité de manière périodique afin de garantir un niveau de protection optimal."
                          }
                        </p>
                      </div>
                      <Button
                        onClick={() => setShowPasswordForm(true)}
                        className={`w-full h-14 text-lg font-bold rounded-2xl shadow-xl transition-all ${mustChangePassword ? "bg-red-600 hover:bg-red-700 animate-pulse" : "bg-crec-darkblue hover:bg-slate-900"}`}
                      >
                        {mustChangePassword ? 'RENFORCER LA SÉCURITÉ MAINTENANT' : 'RENOUVELER LE SECRET DE SÉCURITÉ'}
                      </Button>
                    </motion.div>
                  ) : (
                    <PasswordForm
                      passwordData={passwordData}
                      setPasswordData={setPasswordData}
                      handlePasswordSubmit={handlePasswordSubmit}
                      setShowPasswordForm={setShowPasswordForm}
                      passwordError={passwordError}
                      loading={loading}
                      mustChangePassword={mustChangePassword}
                    />
                  )}
                </AnimatePresence>
              </TabsContent>

              <TabsContent value="permissions" className="mt-0 focus-visible:outline-none">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold admin-title">Habilitations Institutionnelles</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Portée de vos privilèges administratifs</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.role === 'super_admin' ? (
                    ['Souveraineté Totale', 'Gouvernance des Membres', 'Arbitrage des Admissions', 'Gestion du Patrimoine'].map((p, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-green-500/5 rounded-2xl border border-green-500/10">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-bold text-crec-darkblue">{p}</span>
                      </div>
                    ))
                  ) : user.role === 'admin_contenu' ? (
                    ['Patrimoine ISTM', 'Offre Certificateur', 'Ressources Laboratoire', 'Rayonnement Événementiel'].map((p, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-crec-gold/5 rounded-2xl border border-crec-gold/10">
                        <CheckCircle className="w-5 h-5 text-crec-gold" />
                        <span className="text-sm font-bold text-crec-darkblue">{p}</span>
                      </div>
                    ))
                  ) : (
                    ['Flux des Admissions', 'Dossiers Candidats', 'Registres Académiques'].map((p, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10">
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-bold text-crec-darkblue">{p}</span>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-12 p-6 glass-card rounded-2xl border-white/60 bg-white/30">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-5 h-5 text-crec-darkblue" />
                    <h4 className="font-bold text-crec-darkblue">Note de Gouvernance</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-bold uppercase tracking-tighter">
                    Vos privilèges sont définis par le Cabinet du CREC. Pour toute extension de rôle ou demande d'habilitation supplémentaire, veuillez contacter le Super Administrateur.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;