import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Key, 
  Users, 
  Filter,
  AlertTriangle,
  CheckCircle,
  Loader2,
  X
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import authService from '@/services/auth-service';
import { BackendUser, AdminRole, CreateAdminRequest, UpdateAdminRequest } from '@/types';

const AdminUtilisateursRolesPage: React.FC = () => {
  const { user, hasRole } = useAuth();
  const [admins, setAdmins] = useState<BackendUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // États pour les filtres et recherche
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<AdminRole | 'all'>('all');
  
  // États pour les modals/formulaires
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<BackendUser | null>(null);
  const [showPasswordReset, setShowPasswordReset] = useState<BackendUser | null>(null);

  // Formulaires
  const [newAdmin, setNewAdmin] = useState<CreateAdminRequest>({
    nom: '',
    prenom: '',
    email: '',
    role: 'admin_contenu' // Valeur par défaut
  });

  const [editForm, setEditForm] = useState<UpdateAdminRequest>({
    nom: '',
    prenom: '',
    email: '',
    role: 'admin_contenu'
  });

  // Vérifier les permissions
  if (!hasRole(['super_admin'])) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            Accès refusé. Cette page est réservée aux Super Administrateurs.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Charger les admins
  const loadAdmins = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.getAdmins();
      
      // ✅ CORRECTION ERREURS LIGNE 81-82 - Vérification stricte du type de response
      if (Array.isArray(response)) {
        setAdmins(response);
      } else if (response && typeof response === 'object' && 'data' in response) {
        // Vérification que data existe et est un tableau
        const responseWithData = response as { data?: BackendUser[] };
        if (Array.isArray(responseWithData.data)) {
          setAdmins(responseWithData.data);
        } else {
          console.warn('response.data n\'est pas un tableau:', responseWithData.data);
          setAdmins([]);
        }
      } else {
        console.warn('Format de réponse inattendu:', response);
        setAdmins([]);
      }
    } catch (err: any) {
      setError(err.message || 'Erreur lors du chargement des administrateurs');
      setAdmins([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  // Auto-clear des messages
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // Créer un admin
  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setActionLoading(-1); // -1 pour création
      const createdAdmin = await authService.createAdmin(newAdmin);
      
      // Gérer la réponse selon le format avec vérifications strictes
      if (createdAdmin && typeof createdAdmin === 'object') {
        const adminToAdd = 'data' in createdAdmin ? 
          (createdAdmin as { data: BackendUser }).data : 
          createdAdmin as BackendUser;
        setAdmins(prev => [...prev, adminToAdd]);
      }
      
      setSuccess('Administrateur créé avec succès !');
      setShowCreateForm(false);
      setNewAdmin({ nom: '', prenom: '', email: '', role: 'admin_contenu' });
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la création');
    } finally {
      setActionLoading(null);
    }
  };

  // Modifier un admin
  const handleEditAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAdmin) return;

    try {
      setActionLoading(Number(editingAdmin.id));
      const updatedAdmin = await authService.updateAdmin(Number(editingAdmin.id), editForm);
      
      const adminToUpdate = 'data' in updatedAdmin ? 
        (updatedAdmin as { data: BackendUser }).data : 
        updatedAdmin as BackendUser;
      
      setAdmins(prev => prev.map(admin => 
        admin.id === editingAdmin.id ? adminToUpdate : admin
      ));
      
      setSuccess('Administrateur modifié avec succès !');
      setEditingAdmin(null);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la modification');
    } finally {
      setActionLoading(null);
    }
  };

  // Supprimer un admin
  const handleDeleteAdmin = async (adminToDelete: BackendUser) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer ${adminToDelete.prenom} ${adminToDelete.nom} ?`)) {
      return;
    }

    // Empêcher la suppression du Super Admin ou de soi-même
    if (adminToDelete.role === 'super_admin') {
      setError('Impossible de supprimer le Super Administrateur');
      return;
    }

    if (Number(adminToDelete.id) === Number(user?.id)) {
      setError('Vous ne pouvez pas supprimer votre propre compte');
      return;
    }

    try {
      setActionLoading(Number(adminToDelete.id));
      await authService.deleteAdmin(Number(adminToDelete.id));
      setAdmins(prev => prev.filter(admin => admin.id !== adminToDelete.id));
      setSuccess('Administrateur supprimé avec succès !');
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la suppression');
    } finally {
      setActionLoading(null);
    }
  };

  // Réinitialiser le mot de passe
  const handleResetPassword = async (adminToReset: BackendUser) => {
    if (!confirm(`Réinitialiser le mot de passe de ${adminToReset.prenom} ${adminToReset.nom} ?`)) {
      return;
    }

    try {
      setActionLoading(Number(adminToReset.id));
      const result = await authService.resetAdminPassword(Number(adminToReset.id));
      setShowPasswordReset(adminToReset);
      setSuccess(`Mot de passe réinitialisé. Nouveau mot de passe temporaire : ${result.temporary_password}`);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la réinitialisation');
    } finally {
      setActionLoading(null);
    }
  };

  // Ouvrir le formulaire d'édition
  const openEditForm = (admin: BackendUser) => {
    setEditingAdmin(admin);
    setEditForm({
      nom: admin.nom,
      prenom: admin.prenom,
      email: admin.email,
      role: admin.role === 'super_admin' ? 'admin_contenu' : admin.role as 'admin_contenu' | 'admin_inscription'
    });
  };

  // Fonctions utilitaires
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
      case 'super_admin': return 'Super Admin';
      case 'admin_contenu': return 'Admin Contenu';
      case 'admin_inscription': return 'Admin Inscription';
      default: return 'Utilisateur';
    }
  };

  const roleDescriptions: { [key in AdminRole]: string } = {
    super_admin: 'Super Admin - Tous les droits',
    admin_contenu: 'Admin Contenus - Gestion du site',
    admin_inscription: 'Admin Inscriptions - Validation des inscriptions',
  };

  // Filtrage des admins
  const filteredAdmins = admins.filter(admin => {
    const matchesSearch = 
      admin.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.nom_complet?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || admin.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  // Statistiques
  const stats = {
    total: admins.length,
    super_admin: admins.filter(a => a.role === 'super_admin').length,
    admin_contenu: admins.filter(a => a.role === 'admin_contenu').length,
    admin_inscription: admins.filter(a => a.role === 'admin_inscription').length,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Administrateurs</h1>
          <p className="text-gray-600 mt-2">Créer, modifier et gérer les comptes administrateurs</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nouvel Admin
        </Button>
      </div>

      {/* Messages */}
      {success && (
        <Alert className="mb-6 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Admins</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Super Admins</p>
                <p className="text-2xl font-bold text-red-600">{stats.super_admin}</p>
              </div>
              <Badge variant="destructive" className="text-xs">SA</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Admin Contenu</p>
                <p className="text-2xl font-bold text-blue-600">{stats.admin_contenu}</p>
              </div>
              <Badge variant="default" className="text-xs">AC</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Admin Inscription</p>
                <p className="text-2xl font-bold text-purple-600">{stats.admin_inscription}</p>
              </div>
              <Badge variant="secondary" className="text-xs">AI</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et Recherche */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par nom, prénom ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="sm:w-48">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as AdminRole | 'all')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-crec-gold"
                aria-label="Filtrer par rôle d'utilisateur"
                title="Filtrer par rôle d'utilisateur"
              >
                <option value="all">Tous les rôles</option>
                <option value="super_admin">Super Admin</option>
                <option value="admin_contenu">Admin Contenu</option>
                <option value="admin_inscription">Admin Inscription</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des Admins */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Administrateurs ({filteredAdmins.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-crec-gold" />
            </div>
          ) : filteredAdmins.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Aucun administrateur trouvé
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Nom</th>
                    <th className="text-left p-3">Email</th>
                    <th className="text-left p-3">Rôle</th>
                    <th className="text-left p-3">Créé le</th>
                    <th className="text-right p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAdmins.map((admin) => (
                    <tr key={admin.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div>
                          <div className="font-medium">
                            {admin.prenom} {admin.nom}
                            {Number(admin.id) === Number(user?.id) && (
                              <Badge variant="outline" className="ml-2 text-xs">Vous</Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">{admin.nom_complet}</div>
                        </div>
                      </td>
                      <td className="p-3">{admin.email}</td>
                      <td className="p-3">
                        <Badge variant={getRoleBadgeVariant(admin.role)}>
                          {getRoleDisplayName(admin.role)}
                        </Badge>
                      </td>
                      <td className="p-3 text-sm text-gray-500">
                        {new Date(admin.created_at).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2 justify-end">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditForm(admin)}
                            disabled={actionLoading === Number(admin.id)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleResetPassword(admin)}
                            disabled={actionLoading === Number(admin.id)}
                          >
                            {actionLoading === Number(admin.id) ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Key className="w-4 h-4" />
                            )}
                          </Button>
                          
                          {admin.role !== 'super_admin' && Number(admin.id) !== Number(user?.id) && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteAdmin(admin)}
                              disabled={actionLoading === Number(admin.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal Création */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Nouvel Administrateur</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCreateForm(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateAdmin} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="prenom">Prénom</Label>
                    <Input
                      id="prenom"
                      value={newAdmin.prenom}
                      onChange={(e) => setNewAdmin(prev => ({ ...prev, prenom: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="nom">Nom</Label>
                    <Input
                      id="nom"
                      value={newAdmin.nom}
                      onChange={(e) => setNewAdmin(prev => ({ ...prev, nom: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newAdmin.email}
                    onChange={(e) => setNewAdmin(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="role">Rôle</Label>
                  <select
                    id="role"
                    value={newAdmin.role}
                    onChange={(e) => setNewAdmin(prev => ({ 
                      ...prev, 
                      role: e.target.value as 'admin_contenu' | 'admin_inscription'
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-crec-gold"
                    aria-label="Sélectionner le rôle de l'administrateur"
                    title="Sélectionner le rôle de l'administrateur"
                    required
                  >
                    <option value="admin_contenu">Admin Contenu</option>
                    <option value="admin_inscription">Admin Inscription</option>
                  </select>
                  {/* ✅ CORRECTION ERREUR LIGNE 637 - Vérification que newAdmin.role existe */}
                  <p className="text-xs text-gray-500 mt-1">
                    {newAdmin.role && roleDescriptions[newAdmin.role as AdminRole]}
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    type="submit" 
                    disabled={actionLoading === -1}
                    className="flex-1"
                  >
                    {actionLoading === -1 ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Création...
                      </>
                    ) : (
                      'Créer l\'admin'
                    )}
                  </Button>
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal Édition */}
      {editingAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Modifier {editingAdmin.prenom} {editingAdmin.nom}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingAdmin(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEditAdmin} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-prenom">Prénom</Label>
                    <Input
                      id="edit-prenom"
                      value={editForm.prenom}
                      onChange={(e) => setEditForm(prev => ({ ...prev, prenom: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-nom">Nom</Label>
                    <Input
                      id="edit-nom"
                      value={editForm.nom}
                      onChange={(e) => setEditForm(prev => ({ ...prev, nom: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>

                {editingAdmin.role !== 'super_admin' && (
                  <div>
                    <Label htmlFor="edit-role">Rôle</Label>
                    <select
                      id="edit-role"
                      value={editForm.role}
                      onChange={(e) => setEditForm(prev => ({ 
                        ...prev, 
                        role: e.target.value as 'admin_contenu' | 'admin_inscription'
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-crec-gold"
                      aria-label="Modifier le rôle de l'administrateur"
                      title="Modifier le rôle de l'administrateur"
                      required
                    >
                      <option value="admin_contenu">Admin Contenu</option>
                      <option value="admin_inscription">Admin Inscription</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      {editForm.role && roleDescriptions[editForm.role as AdminRole]}
                    </p>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button 
                    type="submit" 
                    disabled={actionLoading === Number(editingAdmin.id)}
                    className="flex-1"
                  >
                    {actionLoading === Number(editingAdmin.id) ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Modification...
                      </>
                    ) : (
                      'Modifier'
                    )}
                  </Button>
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setEditingAdmin(null)}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminUtilisateursRolesPage;