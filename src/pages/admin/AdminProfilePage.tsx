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
  const getRoleBadgeVariant = (role: AdminRole): "default" | "secondary" | "destructive" | "outline" => {
    switch (role) {
      case 'super_admin': return 'destructive';
      case 'admin_contenu': return 'default';
      case 'admin_inscription': return 'secondary';
      default: return 'outline';
    }
  };

  const getRoleDisplayName = (role: AdminRole): string => {
    switch (role) {
      case 'super_admin': return 'Super Administrateur';
      case 'admin_contenu': return 'Administrateur Contenu';
      case 'admin_inscription': return 'Administrateur Inscription';
      default: return 'Utilisateur';
    }
  };

  const getInitials = (user: BackendUser): string => {
    const firstInitial = user.prenom?.charAt(0)?.toUpperCase() || 'U';
    const lastInitial = user.nom?.charAt(0)?.toUpperCase() || 'A';
    return `${firstInitial}${lastInitial}`;
  };

  return (
    <div className="text-center mb-10">
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-gradient-to-br from-crec-gold/20 to-crec-gold/10 rounded-full flex items-center justify-center shadow-md">
          <span className="text-2xl font-semibold text-crec-gold">
            {getInitials(user)}
          </span>
        </div>
      </div>
      <h1 className="text-4xl font-semibold text-gray-900 tracking-tight mt-4">
        {user.prenom} {user.nom}
      </h1>
      <div className="flex justify-center items-center gap-3 mt-3">
        <Badge 
          variant={getRoleBadgeVariant(user.role)} 
          className="text-sm py-1 px-4"
        >
          {getRoleDisplayName(user.role)}
        </Badge>
        {mustChangePassword && user.must_change_password && (
          <Badge variant="outline" className="text-orange-600 border-orange-600 animate-pulse">
            <AlertTriangle className="w-4 h-4 mr-1" />
            Changement requis
          </Badge>
        )}
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleProfileSubmit}
      className="space-y-6"
    >
      <div>
        <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1.5">
          Prénom
        </label>
        <Input
          id="prenom"
          type="text"
          value={profileData.prenom}
          onChange={(e) => setProfileData(prev => ({ ...prev, prenom: e.target.value }))}
          placeholder="Votre prénom"
          required
          className="transition-all duration-200 focus:ring-2 focus:ring-crec-gold"
        />
      </div>
      <div>
        <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1.5">
          Nom
        </label>
        <Input
          id="nom"
          type="text"
          value={profileData.nom}
          onChange={(e) => setProfileData(prev => ({ ...prev, nom: e.target.value }))}
          placeholder="Votre nom"
          required
          className="transition-all duration-200 focus:ring-2 focus:ring-crec-gold"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={profileData.email}
          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
          placeholder="votre.email@crec.com"
          required
          className="transition-all duration-200 focus:ring-2 focus:ring-crec-gold"
        />
      </div>
      {error && (
        <Alert className="border-red-300 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}
      <div className="flex gap-3 pt-2">
        <Button 
          type="submit" 
          disabled={loading}
          className="flex-1 bg-crec-gold hover:bg-crec-gold/90 transition-colors duration-200"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Sauvegarde...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder
            </>
          )}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setEditMode(false)}
          disabled={loading}
          className="flex-1 hover:bg-gray-100 transition-colors duration-200"
        >
          <X className="w-4 h-4 mr-2" />
          Annuler
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      onSubmit={handlePasswordSubmit}
      className="space-y-6"
    >
      <div>
        <label htmlFor="current_password" className="block text-sm font-medium text-gray-700 mb-1.5">
          Mot de passe actuel
        </label>
        <Input
          id="current_password"
          type="password"
          value={passwordData.current_password}
          onChange={(e) => setPasswordData(prev => ({ ...prev, current_password: e.target.value }))}
          placeholder="Votre mot de passe actuel"
          required
          className="transition-all duration-200 focus:ring-2 focus:ring-crec-gold"
        />
      </div>
      <div>
        <label htmlFor="new_password" className="block text-sm font-medium text-gray-700 mb-1.5">
          Nouveau mot de passe
        </label>
        <Input
          id="new_password"
          type="password"
          value={passwordData.new_password}
          onChange={(e) => setPasswordData(prev => ({ ...prev, new_password: e.target.value }))}
          placeholder="Min. 8 caractères"
          required
          minLength={8}
          className="transition-all duration-200 focus:ring-2 focus:ring-crec-gold"
        />
      </div>
      <div>
        <label htmlFor="new_password_confirmation" className="block text-sm font-medium text-gray-700 mb-1.5">
          Confirmer le nouveau mot de passe
        </label>
        <Input
          id="new_password_confirmation"
          type="password"
          value={passwordData.new_password_confirmation}
          onChange={(e) => setPasswordData(prev => ({ ...prev, new_password_confirmation: e.target.value }))}
          placeholder="Confirmer le mot de passe"
          required
          minLength={8}
          className="transition-all duration-200 focus:ring-2 focus:ring-crec-gold"
        />
      </div>
      {passwordError && (
        <Alert className="border-red-300 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{passwordError}</AlertDescription>
        </Alert>
      )}
      <div className="flex gap-3 pt-2">
        <Button 
          type="submit" 
          disabled={loading}
          className="flex-1 bg-crec-gold hover:bg-crec-gold/90 transition-colors duration-200"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Modification...
            </>
          ) : (
            'Modifier le mot de passe'
          )}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => {
            setShowPasswordForm(false);
            setPasswordData({
              current_password: '',
              new_password: '',
              new_password_confirmation: ''
            });
          }}
          disabled={mustChangePassword || loading}
          className="flex-1 hover:bg-gray-100 transition-colors duration-200"
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
      setSuccessMsg('Profil mis à jour avec succès !');
      setEditMode(false);
      
    } catch (error: any) {
      setProfileError(error.message || 'Erreur lors de la mise à jour du profil');
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    clearError();

    if (passwordData.new_password.length < 8) {
      setPasswordError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    if (passwordData.new_password !== passwordData.new_password_confirmation) {
      setPasswordError('Les mots de passe ne correspondent pas');
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
      
      setSuccessMsg('Mot de passe modifié avec succès !');
      setShowPasswordForm(false);
      setPasswordData({
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
      });
      setActiveTab('info');
    } catch (error: any) {
      setErrorMsg(error.message || 'Erreur lors du changement de mot de passe');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return 'Non disponible';
    try {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Date invalide';
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-crec-gold" />
      </div>
    );
  }

  // Check if we're in development mode (remove ID display in production)
  const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <ProfileHeader user={user} mustChangePassword={mustChangePassword} />

      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <Alert className="border-green-300 bg-green-50 shadow-sm">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">{successMsg}</AlertDescription>
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

      <Tabs defaultValue="info" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-100 rounded-lg p-1">
          <TabsTrigger 
            value="info" 
            className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition-all"
          >
            Informations
          </TabsTrigger>
          <TabsTrigger 
            value="security" 
            className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition-all"
          >
            Sécurité
          </TabsTrigger>
          <TabsTrigger 
            value="permissions" 
            className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition-all"
          >
            Permissions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-xl">
                <UserIcon className="w-5 h-5 text-crec-gold" />
                Informations
              </CardTitle>
              {!editMode && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditMode(true)}
                  className="gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Modifier
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {!editMode ? (
                  <motion.div
                    key="profile-display"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p className="flex items-center gap-2 mt-1 text-gray-900">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {user.email}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Prénom</label>
                      <p className="mt-1 text-gray-900">{user.prenom}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Nom</label>
                      <p className="mt-1 text-gray-900">{user.nom}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Nom complet</label>
                      <p className="mt-1 text-gray-900">{user.nom_complet}</p>
                    </div>
                    
                    {/* ID masqué en production */}
                    {isDevelopment && (
                      <div className="pt-4 border-t border-gray-100">
                        <label className="text-xs font-medium text-gray-400">ID Utilisateur (dev only)</label>
                        <p className="font-mono text-xs mt-1 text-gray-600">{String(user.id)}</p>
                      </div>
                    )}
                    
                    <div className="pt-2">
                      <label className="text-sm font-medium text-gray-500">Date de création</label>
                      <p className="flex items-center gap-2 mt-1 text-sm text-gray-900">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {formatDate(user.created_at)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Dernière connexion</label>
                      <p className="flex items-center gap-2 mt-1 text-sm text-gray-900">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {formatDate(user.last_login || null)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Dernier changement de mot de passe</label>
                      <p className="flex items-center gap-2 mt-1 text-sm text-gray-900">
                        <Key className="w-4 h-4 text-gray-400" />
                        {formatDate(user.password_changed_at || null)}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="profile-edit"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProfileEditForm
                      profileData={profileData}
                      setProfileData={setProfileData}
                      handleProfileSubmit={handleProfileSubmit}
                      setEditMode={setEditMode}
                      loading={profileLoading}
                      error={profileError}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Key className="w-5 h-5 text-crec-gold" />
                Sécurité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {!showPasswordForm ? (
                  <motion.div
                    key="password-button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {mustChangePassword 
                        ? "Vous devez changer votre mot de passe pour continuer." 
                        : "Modifiez votre mot de passe pour renforcer la sécurité de votre compte."
                      }
                    </p>
                    <Button 
                      onClick={() => setShowPasswordForm(true)}
                      variant={mustChangePassword ? "destructive" : "default"}
                      className="w-full bg-crec-gold hover:bg-crec-gold/90 transition-colors duration-200"
                    >
                      {mustChangePassword ? 'Changer le mot de passe (Obligatoire)' : 'Changer le mot de passe'}
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="password-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <PasswordForm
                      passwordData={passwordData}
                      setPasswordData={setPasswordData}
                      handlePasswordSubmit={handlePasswordSubmit}
                      setShowPasswordForm={setShowPasswordForm}
                      passwordError={passwordError}
                      loading={loading}
                      mustChangePassword={mustChangePassword}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions">
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Shield className="w-5 h-5 text-crec-gold" />
                Permissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                {user.role === 'super_admin' && (
                  <>
                    <p className="text-green-600 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Gestion complète des administrateurs
                    </p>
                    <p className="text-green-600 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Accès à tous les contenus
                    </p>
                    <p className="text-green-600 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Gestion des inscriptions
                    </p>
                    <p className="text-green-600 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Configuration système
                    </p>
                  </>
                )}
                {user.role === 'admin_contenu' && (
                  <>
                    <p className="text-blue-600 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Gestion des formations
                    </p>
                    <p className="text-blue-600 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Gestion des programmes ISTM
                    </p>
                    <p className="text-blue-600 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Gestion FabLab
                    </p>
                    <p className="text-blue-600 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Gestion de la galerie
                    </p>
                    <p className="text-blue-600 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Gestion de la bibliothèque
                    </p>
                    <p className="text-blue-600 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Gestion des réservations
                    </p>
                    <p className="text-gray-500 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> Création d'administrateurs (interdite)
                    </p>
                  </>
                )}
                {user.role === 'admin_inscription' && (
                  <>
                    <p className="text-purple-600 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Validation inscriptions ISTM
                    </p>
                    <p className="text-purple-600 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Validation inscriptions FabLab
                    </p>
                    <p className="text-purple-600 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Validation inscriptions formations
                    </p>
                    <p className="text-gray-500 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> Gestion du contenu (interdite)
                    </p>
                    <p className="text-gray-500 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> Création d'administrateurs (interdite)
                    </p>
                  </>
                )}
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Informations sur les rôles</h4>
                <div className="text-xs text-gray-600 space-y-1">
                  <p><strong>Super Admin:</strong> Accès complet à toutes les fonctionnalités</p>
                  <p><strong>Admin Contenu:</strong> Gestion des contenus et ressources</p>
                  <p><strong>Admin Inscription:</strong> Validation des inscriptions uniquement</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminProfilePage;