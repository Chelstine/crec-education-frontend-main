import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Users, 
  Shield, 
  Plus, 
  Trash2, 
  Edit,
  Save,
  Search,
  Info,
  Mail,
  Calendar
} from 'lucide-react';
import { ADMIN_PERMISSIONS } from '@/services/permissionService';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

const AdminUtilisateursRolesPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Charger les utilisateurs depuis l'API
  React.useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        // TODO: Intégrer l'appel API réel
        // const response = await fetch('/api/admin/users');
        // const data = await response.json();
        // setUsers(data);
        
        // Initialiser avec une liste vide
        setUsers([]);
      } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [isAdding, setIsAdding] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    roles: [] as string[]
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const availableRoles = Object.keys(ADMIN_PERMISSIONS);

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === 'all' || user.roles.includes(selectedRole);
    
    return matchesSearch && matchesRole;
  });

  const handleSave = async (userId: string) => {
    try {
      // Ici, vous intégreriez l'appel API pour sauvegarder
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulation
      
      setMessage({ type: 'success', text: 'Utilisateur mis à jour avec succès!' });
      setEditingId(null);
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur lors de la mise à jour.' });
    }
  };

  const handleAdd = async () => {
    if (!newUser.firstName || !newUser.lastName || !newUser.email || newUser.roles.length === 0) {
      setMessage({ type: 'error', text: 'Veuillez remplir tous les champs obligatoires.' });
      return;
    }

    try {
      const id = Date.now().toString();
      const nouveauUser: User = {
        ...newUser,
        id,
        isActive: true,
        createdAt: new Date().toISOString().split('T')[0]
      };

      setUsers(prev => [...prev, nouveauUser]);
      setNewUser({
        firstName: '',
        lastName: '',
        email: '',
        roles: []
      });
      setIsAdding(false);
      setMessage({ type: 'success', text: 'Utilisateur ajouté avec succès!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur lors de l\'ajout.' });
    }
  };

  const handleDelete = async (id: string) => {
    // Vérifier si c'est l'admin suprême (id=1 ou rôle super_admin)
    const userToDelete = users.find(u => u.id === id);
    if (userToDelete?.roles.includes('super_admin')) {
      setMessage({ type: 'error', text: 'L\'administrateur suprême ne peut pas être supprimé!' });
      return;
    }
    
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        // TODO: Intégrer l'appel API réel
        // await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
        
        setUsers(prev => prev.filter(u => u.id !== id));
        setMessage({ type: 'success', text: 'Utilisateur supprimé avec succès!' });
      } catch (error) {
        setMessage({ type: 'error', text: 'Erreur lors de la suppression.' });
      }
    }
  };

  const handleUserChange = (id: string, field: keyof User, value: any) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, [field]: value } : user
    ));
  };

  const toggleUserRole = (userId: string, role: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      const newRoles = user.roles.includes(role)
        ? user.roles.filter(r => r !== role)
        : [...user.roles, role];
      handleUserChange(userId, 'roles', newRoles);
    }
  };

  const toggleNewUserRole = (role: string) => {
    setNewUser(prev => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role]
    }));
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-red-100 text-red-800';
      case 'content_admin': return 'bg-blue-100 text-blue-800';
      case 'inscription_admin': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Users className="h-8 w-8 mr-3 text-blue-600" />
          Gestion des Utilisateurs et Rôles
        </h1>
        <p className="text-gray-600 mt-2">
          Gérez les utilisateurs administrateurs et leurs permissions
        </p>
      </div>

      {message && (
        <Alert className={`mb-6 ${message.type === 'error' ? 'border-red-500' : 'border-green-500'}`}>
          <Info className="h-4 w-4" />
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      {/* Filtres et recherche */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Rechercher</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="search"
                  placeholder="Rechercher par nom ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="roleFilter">Filtrer par rôle</Label>
              <select
                id="roleFilter"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">Tous les rôles</option>
                {availableRoles.map(role => (
                  <option key={role} value={role}>
                    {ADMIN_PERMISSIONS[role]?.description}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={() => setIsAdding(true)}
                className="bg-green-600 hover:bg-green-700"
                disabled={isAdding}
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un utilisateur
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formulaire d'ajout */}
      {isAdding && (
        <Card className="mb-6 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-700">Nouvel utilisateur</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newFirstName">Prénom *</Label>
                <Input
                  id="newFirstName"
                  value={newUser.firstName}
                  onChange={(e) => setNewUser(prev => ({ ...prev, firstName: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newLastName">Nom *</Label>
                <Input
                  id="newLastName"
                  value={newUser.lastName}
                  onChange={(e) => setNewUser(prev => ({ ...prev, lastName: e.target.value }))}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="newEmail">Email *</Label>
                <Input
                  id="newEmail"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Rôles *</Label>
              <div className="flex flex-wrap gap-2">
                {availableRoles.map(role => (
                  <Badge
                    key={role}
                    variant={newUser.roles.includes(role) ? "default" : "outline"}
                    className={`cursor-pointer ${newUser.roles.includes(role) ? getRoleColor(role) : ''}`}
                    onClick={() => toggleNewUserRole(role)}
                  >
                    {ADMIN_PERMISSIONS[role]?.description}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsAdding(false);
                  setNewUser({ firstName: '', lastName: '', email: '', roles: [] });
                }}
              >
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Liste des utilisateurs */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
            <span className="ml-2 text-gray-500">Chargement des utilisateurs...</span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="bg-slate-100 rounded-lg p-6 text-center">
            <Users className="h-10 w-10 text-slate-400 mx-auto mb-2" />
            <h3 className="text-lg font-medium text-slate-700">Aucun utilisateur trouvé</h3>
            <p className="text-slate-500 mt-1">Utilisez le bouton ci-dessus pour ajouter des utilisateurs</p>
          </div>
        ) : (
          filteredUsers.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-blue-600" />
                    {editingId === user.id ? (
                      <div className="flex space-x-2">
                        <Input
                          value={user.firstName}
                          onChange={(e) => handleUserChange(user.id, 'firstName', e.target.value)}
                          placeholder="Prénom"
                        />
                        <Input
                          value={user.lastName}
                          onChange={(e) => handleUserChange(user.id, 'lastName', e.target.value)}
                          placeholder="Nom"
                        />
                      </div>
                    ) : (
                      `${user.firstName} ${user.lastName}`
                    )}
                  </CardTitle>
                  <CardDescription>
                    {editingId === user.id ? (
                      <Input
                        type="email"
                        value={user.email}
                        onChange={(e) => handleUserChange(user.id, 'email', e.target.value)}
                      />
                    ) : (
                      user.email
                    )}
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Badge variant={user.isActive ? "default" : "secondary"}>
                    {user.isActive ? 'Actif' : 'Inactif'}
                  </Badge>
                  {editingId === user.id ? (
                    <>
                      <Button 
                        size="sm"
                        onClick={() => handleSave(user.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingId(null)}
                      >
                        Annuler
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingId(user.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-700"
                        disabled={user.roles.includes('super_admin')}
                        title={user.roles.includes('super_admin') ? "L'administrateur suprême ne peut pas être supprimé" : "Supprimer cet utilisateur"}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Rôles</Label>
                  {editingId === user.id ? (
                    <div className="flex flex-wrap gap-2">
                      {availableRoles.map(role => (
                        <Badge
                          key={role}
                          variant={user.roles.includes(role) ? "default" : "outline"}
                          className={`cursor-pointer ${user.roles.includes(role) ? getRoleColor(role) : ''}`}
                          onClick={() => toggleUserRole(user.id, role)}
                        >
                          {ADMIN_PERMISSIONS[role]?.description}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {user.roles.map(role => (
                        <Badge key={role} className={getRoleColor(role)}>
                          {ADMIN_PERMISSIONS[role]?.description}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Créé le: {new Date(user.createdAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                  {user.lastLogin && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Dernière connexion: {new Date(user.lastLogin).toLocaleDateString('fr-FR')}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
        )}
      </div>
    </div>
  );
};

export default AdminUtilisateursRolesPage;
