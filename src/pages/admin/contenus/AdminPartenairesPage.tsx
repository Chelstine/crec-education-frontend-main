import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff, 
  ExternalLink,
  Search,
  Filter,
  Users,
  Building2,
  Globe,
  Save,
  X,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUpload } from '@/components/ui/image-upload';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAdminPartners, useCreatePartner, useUpdatePartner, useDeletePartner } from '@/hooks/usePartners';
import { Partner, CreatePartnerData } from '@/services/partnersService';

const AdminPartenairesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [formData, setFormData] = useState<Partial<CreatePartnerData>>({
    name: '',
    description: '',
    website_url: '',
    type: 'other',
    is_featured: false,
    is_active: true,
    sort_order: 0
  });

  const { toast } = useToast();

  // Hooks pour les données et mutations
  const { data: partners = [], isLoading, error } = useAdminPartners();
  const createPartnerMutation = useCreatePartner();
  const updatePartnerMutation = useUpdatePartner();
  const deletePartnerMutation = useDeletePartner();

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      website_url: '',
      type: 'other',
      is_featured: false,
      is_active: true,
      sort_order: 0
    });
  };

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      description: partner.description,
      website_url: partner.website_url,
      type: partner.type,
      is_featured: partner.is_featured,
      is_active: partner.is_active,
      sort_order: partner.sort_order,
      // Pour l'édition, on garde l'URL du logo existant pour l'affichage
      // mais logo reste undefined jusqu'à ce qu'un nouveau fichier soit sélectionné
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description) {
      toast({
        title: 'Erreur',
        description: 'Le nom et la description sont requis',
        variant: 'destructive'
      });
      return;
    }

    try {
      if (editingPartner) {
        await updatePartnerMutation.mutateAsync({ 
          id: editingPartner.id!, 
          data: formData 
        });
        toast({
          title: 'Succès',
          description: 'Partenaire mis à jour avec succès'
        });
      } else {
        await createPartnerMutation.mutateAsync(formData as CreatePartnerData);
        toast({
          title: 'Succès',
          description: 'Partenaire créé avec succès'
        });
      }
      setIsDialogOpen(false);
      setEditingPartner(null);
      resetForm();
    } catch (error) {
      toast({
        title: 'Erreur',
        description: editingPartner 
          ? 'Erreur lors de la mise à jour du partenaire'
          : 'Erreur lors de la création du partenaire',
        variant: 'destructive'
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce partenaire ?')) {
      return;
    }

    try {
      await deletePartnerMutation.mutateAsync(id);
      toast({
        title: 'Succès',
        description: 'Partenaire supprimé avec succès'
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Erreur lors de la suppression du partenaire',
        variant: 'destructive'
      });
    }
  };

  const filteredPartners = partners.filter(partner =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (partner.description && partner.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-crec-gold mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des partenaires...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Partenaires</h1>
          <p className="text-gray-600">Gérez les partenaires qui s'affichent sur la page d'accueil</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-crec-gold hover:bg-crec-gold/90"
              onClick={() => {
                setEditingPartner(null);
                resetForm();
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Partenaire
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPartner ? 'Modifier le partenaire' : 'Nouveau partenaire'}
              </DialogTitle>
              <DialogDescription>
                {editingPartner ? 'Modifiez les informations du partenaire' : 'Ajoutez un nouveau partenaire'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 pb-4">{/* Ajout de pb-4 pour padding bottom */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nom *</Label>
                  <Input
                    id="name"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Nom du partenaire"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="website_url">Lien (optionnel)</Label>
                  <Input
                    id="website_url"
                    type="url"
                    value={formData.website_url || ''}
                    onChange={(e) => setFormData({...formData, website_url: e.target.value})}
                    placeholder="https://..."
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Description du partenaire"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="type">Type de partenaire</Label>
                <Select 
                  value={formData.type || 'other'} 
                  onValueChange={(value) => setFormData({...formData, type: value as any})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic">Académique</SelectItem>
                    <SelectItem value="institutional">Institutionnel</SelectItem>
                    <SelectItem value="corporate">Entreprise</SelectItem>
                    <SelectItem value="ngo">ONG</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="logo">Logo du partenaire</Label>
                <ImageUpload
                  value={editingPartner?.logo_url || ''}
                  onChange={(file, previewUrl) => {
                    setFormData({
                      ...formData,
                      logo: file || undefined,
                    });
                  }}
                  type="partners"
                  placeholder="Sélectionnez un logo pour le partenaire"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="sort_order">Ordre d'affichage</Label>
                  <Input
                    id="sort_order"
                    type="number"
                    value={formData.sort_order || 0}
                    onChange={(e) => setFormData({...formData, sort_order: parseInt(e.target.value) || 0})}
                    placeholder="0"
                  />
                </div>
                
                <div className="flex items-center space-x-2 pt-6">
                  <Switch
                    id="is_featured"
                    checked={formData.is_featured || false}
                    onCheckedChange={(checked) => setFormData({...formData, is_featured: checked})}
                  />
                  <Label htmlFor="is_featured">En vedette</Label>
                </div>
                
                <div className="flex items-center space-x-2 pt-6">
                  <Switch
                    id="is_active"
                    checked={formData.is_active || false}
                    onCheckedChange={(checked) => setFormData({...formData, is_active: checked})}
                  />
                  <Label htmlFor="is_active">Actif</Label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  <X className="w-4 h-4 mr-2" />
                  Annuler
                </Button>
                <Button 
                  type="submit"
                  className="bg-crec-gold hover:bg-crec-gold/90"
                  disabled={createPartnerMutation.isPending || updatePartnerMutation.isPending}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingPartner ? 'Mettre à jour' : 'Créer'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Partenaires</p>
                <p className="text-2xl font-bold text-gray-900">{partners.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Actifs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {partners.filter(p => p.is_active).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Globe className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avec Lien</p>
                <p className="text-2xl font-bold text-gray-900">
                  {partners.filter(p => p.website_url).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher par nom ou description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Partners Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Partenaires</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Logo</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Lien</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Ordre</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPartners.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">Aucun partenaire trouvé</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredPartners.map((partner) => (
                  <TableRow key={partner.id}>
                    <TableCell>
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                        {partner.logo_url ? (
                          <img 
                            src={partner.logo_url} 
                            alt={partner.name}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <Building2 className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{partner.name}</TableCell>
                    <TableCell className="max-w-md">
                      <p className="truncate" title={partner.description}>
                        {partner.description}
                      </p>
                    </TableCell>
                    <TableCell>
                      {partner.website_url ? (
                        <a 
                          href={partner.website_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Visiter
                        </a>
                      ) : (
                        <span className="text-gray-400">Aucun</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={partner.is_active ? 'default' : 'secondary'}>
                        {partner.is_active ? 'Actif' : 'Inactif'}
                      </Badge>
                    </TableCell>
                    <TableCell>{partner.sort_order || 0}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(partner)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(partner.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPartenairesPage;
