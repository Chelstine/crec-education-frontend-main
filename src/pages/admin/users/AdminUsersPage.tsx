import React, { useState, useEffect } from 'react';
import { User } from '../../../types';
import { Plus, PencilIcon, TrashIcon, Shield, AlertTriangle } from 'lucide-react';
import { 
  DataTable,
  DeleteConfirmDialog,
  FormDialog,
  InfoPanel
} from '../../../components/admin';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';

// Types d'utilisateurs et leurs étiquettes
const USER_ROLES = [
  { value: 'super_admin', label: 'Super Admin', color: 'bg-red-100 text-red-800 border-red-300' },
  { value: 'admin', label: 'Administrateur', color: 'bg-blue-100 text-blue-800 border-blue-300' },
];

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  
  // État pour les dialogues
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Colonnes pour le tableau
  const columns = [
    { 
      key: 'firstName', 
      header: 'Prénom',
      renderCell: (user: User) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-medium">
            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
          </div>
          <div>
            <p className="font-medium">{user.firstName}</p>
            <p className="text-xs text-slate-500">Inscrit le {new Date(user.createdAt).toLocaleDateString('fr-FR')}</p>
          </div>
        </div>
      )
    },
    { 
      key: 'lastName', 
      header: 'Nom'
    },
    { 
      key: 'email', 
      header: 'Email',
      renderCell: (user: User) => <span className="text-slate-600">{user.email}</span>
    },
    { 
      key: 'roles', 
      header: 'Rôle',
      renderCell: (user: User) => (
        <div>
          {user.roles.map((role) => {
            const roleConfig = USER_ROLES.find(r => r.value === role) || 
                               { label: role, color: 'bg-slate-100 text-slate-800 border-slate-300' };
            return (
              <Badge 
                key={role} 
                variant="outline"
                className={roleConfig.color}
              >
                {roleConfig.label}
              </Badge>
            );
          })}
        </div>
      )
    },
  ];

  // Chargement des utilisateurs
  const loadUsers = async () => {
    try {
      setIsLoading(true);
      // En production, utilisez l'API réelle
      // const response = await api.get('/users', {
      //   params: {
      //     page: currentPage,
      //     limit: pageSize,
      //     search: searchQuery
      //   }
      // });
      
      // Pour le développement, utiliser des données simulées
      setTimeout(() => {
        const mockUsers: User[] = [
          {
            id: '1',
            firstName: 'Admin',
            lastName: 'System',
            email: 'admin@crec.bj',
            roles: ['super_admin'],
            createdAt: '2023-01-01T00:00:00Z'
          },
          {
            id: '2',
            firstName: 'Jean',
            lastName: 'Dupont',
            email: 'jean.dupont@crec.bj',
            roles: ['admin'],
            createdAt: '2023-06-15T00:00:00Z'
          },
          {
            id: '3',
            firstName: 'Marie',
            lastName: 'Laurent',
            email: 'marie.laurent@crec.bj',
            roles: ['admin'],
            createdAt: '2023-08-22T00:00:00Z'
          },
        ];
        
        setUsers(mockUsers);
        setTotalUsers(mockUsers.length);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [currentPage, searchQuery]);

  // Gestion des actions CRUD
  const handleAddUser = async (userData: Partial<User>) => {
    try {
      // En production, utilisez l'API réelle
      // await api.post('/users', userData);
      
      // Pour le développement, simuler l'ajout
      console.log('Ajout d\'utilisateur:', userData);
      
      // Recharger la liste
      await loadUsers();
      
      return Promise.resolve();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
      return Promise.reject(error);
    }
  };

  const handleEditUser = async (userData: Partial<User>) => {
    if (!currentUser) return;
    
    try {
      // En production, utilisez l'API réelle
      // await api.put(`/users/${currentUser.id}`, userData);
      
      // Pour le développement, simuler la modification
      console.log('Modification d\'utilisateur:', userData);
      
      // Recharger la liste
      await loadUsers();
      
      return Promise.resolve();
    } catch (error) {
      console.error('Erreur lors de la modification de l\'utilisateur:', error);
      return Promise.reject(error);
    }
  };

  const handleDeleteUser = async () => {
    if (!currentUser) return;
    
    try {
      // En production, utilisez l'API réelle
      // await api.delete(`/users/${currentUser.id}`);
      
      // Pour le développement, simuler la suppression
      console.log('Suppression d\'utilisateur:', currentUser.id);
      
      // Recharger la liste
      await loadUsers();
      
      return Promise.resolve();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      return Promise.reject(error);
    }
  };

  // Formulaire d'utilisateur
  const UserForm = ({ formData, handleChange }: any) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">Prénom</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName || ''}
            onChange={handleChange}
            placeholder="Prénom"
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Nom</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName || ''}
            onChange={handleChange}
            placeholder="Nom"
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email || ''}
          onChange={handleChange}
          placeholder="email@crec.bj"
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Mot de passe {formData.id ? '(laisser vide pour ne pas modifier)' : ''}</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password || ''}
          onChange={handleChange}
          placeholder="••••••••"
          required={!formData.id}
        />
      </div>
      <div>
        <Label htmlFor="role">Rôle</Label>
        <Select 
          name="role" 
          value={formData.roles?.[0] || ''} 
          onValueChange={(value) => handleChange({ target: { name: 'roles', value: [value] } })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un rôle" />
          </SelectTrigger>
          <SelectContent>
            {USER_ROLES.map((role) => (
              <SelectItem key={role.value} value={role.value}>
                {role.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Gestion des utilisateurs</h1>
          <p className="text-slate-500">Gérez les comptes administrateurs et leurs permissions</p>
        </div>
      </div>

      <InfoPanel
        title="Gestion des rôles et permissions"
        icon={<Shield className="h-5 w-5" />}
        variant="info"
      >
        <p className="text-sm text-blue-800">
          Le rôle <strong>Super Admin</strong> a accès à toutes les fonctionnalités, y compris la gestion des utilisateurs.
          Le rôle <strong>Admin</strong> peut gérer le contenu du site mais pas les autres utilisateurs.
        </p>
      </InfoPanel>
      
      <DataTable
        columns={columns}
        data={users}
        keyField="id"
        isLoading={isLoading}
        totalItems={totalUsers}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onSearch={(query) => {
          setSearchQuery(query);
          setCurrentPage(1);
        }}
        searchPlaceholder="Rechercher un utilisateur..."
        title="Utilisateurs"
        onAdd={() => setIsAddDialogOpen(true)}
        onEdit={(user) => {
          setCurrentUser(user);
          setIsEditDialogOpen(true);
        }}
        onDelete={(user) => {
          setCurrentUser(user);
          setIsDeleteDialogOpen(true);
        }}
        renderActions={(user) => (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setCurrentUser(user);
                setIsEditDialogOpen(true);
              }}
            >
              <PencilIcon className="h-4 w-4" />
              <span className="sr-only">Modifier</span>
            </Button>
            {user.roles.includes('super_admin') && user.id === '1' ? (
              <Button
                variant="ghost"
                size="sm"
                disabled
                title="L'utilisateur super admin principal ne peut pas être supprimé"
              >
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span className="sr-only">Ne peut pas être supprimé</span>
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setCurrentUser(user);
                  setIsDeleteDialogOpen(true);
                }}
                className="text-red-600 hover:text-red-700 hover:bg-red-100"
              >
                <TrashIcon className="h-4 w-4" />
                <span className="sr-only">Supprimer</span>
              </Button>
            )}
          </div>
        )}
      />

      {/* Dialogue d'ajout d'utilisateur */}
      <FormDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        title="Ajouter un utilisateur"
        description="Créer un nouveau compte administrateur"
        onSubmit={handleAddUser}
        submitLabel="Créer l'utilisateur"
      >
        <UserForm />
      </FormDialog>

      {/* Dialogue de modification d'utilisateur */}
      <FormDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        title="Modifier un utilisateur"
        description="Modifier les informations et permissions"
        onSubmit={handleEditUser}
        submitLabel="Enregistrer les modifications"
        initialData={currentUser || {}}
        isEdit
      >
        <UserForm />
      </FormDialog>

      {/* Dialogue de confirmation de suppression */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteUser}
        title="Supprimer l'utilisateur"
        description="Cette action est irréversible. L'utilisateur n'aura plus accès à l'administration."
        itemName={currentUser?.email}
      />
    </div>
  );
};

export default AdminUsersPage;
