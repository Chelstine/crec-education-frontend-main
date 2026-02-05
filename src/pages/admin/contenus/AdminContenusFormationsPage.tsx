import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAdminFormations } from '@/hooks/useFormations';
import { Formation } from '@/types/formations';
import { toast } from 'sonner';
import { Loader2, Plus, Edit, Trash2, GraduationCap, Users, Clock, DollarSign, Eye, EyeOff, X } from 'lucide-react';

const AdminContenusFormationsPage: React.FC = () => {
  const { data: formations, isLoading, createFormation, updateFormation, deleteFormation } = useAdminFormations();
  
  const [showForm, setShowForm] = useState(false);
  const [editingFormation, setEditingFormation] = useState<Formation | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<Formation>({
    name: '',
    description: '',
    long_description: '',
    duration: '',
    schedule: '',
    prerequisites: '',
    start_date: '',
    end_date: '',
    category_id: 1,
    requirements: [],
    levels: [],
    syllabus: [],
    price: 0,
    duration_hours: 0,
    max_participants: 0,
    is_active: true,
    requires_payment: false,
    sort_order: 0,
  });

  // Gestion des requirements, levels et syllabus
  const [newRequirement, setNewRequirement] = useState('');
  const [newLevel, setNewLevel] = useState('');
  const [newSyllabusItem, setNewSyllabusItem] = useState('');

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      long_description: '',
      duration: '',
      schedule: '',
      prerequisites: '',
      start_date: '',
      end_date: '',
      category_id: 1,
      requirements: [],
      levels: [],
      syllabus: [],
      price: 0,
      duration_hours: 0,
      max_participants: 0,
      is_active: true,
      requires_payment: false,
      sort_order: 0,
    });
    setEditingFormation(null);
    setNewRequirement('');
    setNewLevel('');
    setNewSyllabusItem('');
  };

  const handleOpenForm = (formation?: Formation) => {
    if (formation) {
      setFormData({
        ...formation,
        requirements: formation.requirements || [],
        levels: formation.levels || [],
        syllabus: formation.syllabus || [],
        long_description: formation.long_description || '',
        duration: formation.duration || '',
        schedule: formation.schedule || '',
        prerequisites: formation.prerequisites || '',
        start_date: formation.start_date || '',
        end_date: formation.end_date || '',
      });
      setEditingFormation(formation);
    } else {
      resetForm();
    }
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    resetForm();
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...(prev.requirements || []), newRequirement.trim()]
      }));
      setNewRequirement('');
    }
  };

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements?.filter((_, i) => i !== index) || []
    }));
  };

  const addLevel = () => {
    if (newLevel.trim()) {
      setFormData(prev => ({
        ...prev,
        levels: [...(prev.levels || []), newLevel.trim()]
      }));
      setNewLevel('');
    }
  };

  const removeLevel = (index: number) => {
    setFormData(prev => ({
      ...prev,
      levels: prev.levels?.filter((_, i) => i !== index) || []
    }));
  };

  const addSyllabusItem = () => {
    if (newSyllabusItem.trim()) {
      setFormData(prev => ({
        ...prev,
        syllabus: [...(prev.syllabus || []), newSyllabusItem.trim()]
      }));
      setNewSyllabusItem('');
    }
  };

  const removeSyllabusItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      syllabus: prev.syllabus?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Le nom de la formation est obligatoire');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Créer un FormData pour l'envoi
      const submitFormData = new FormData();
      
      // Ajouter tous les champs
      submitFormData.append('name', formData.name);
      submitFormData.append('description', formData.description || '');
      submitFormData.append('long_description', formData.long_description || '');
      submitFormData.append('duration', formData.duration || '');
      submitFormData.append('schedule', formData.schedule || '');
      submitFormData.append('prerequisites', formData.prerequisites || '');
      submitFormData.append('start_date', formData.start_date || '');
      submitFormData.append('end_date', formData.end_date || '');
      submitFormData.append('category_id', formData.category_id?.toString() || '1');
      submitFormData.append('price', formData.price?.toString() || '0');
      submitFormData.append('duration_hours', formData.duration_hours?.toString() || '0');
      submitFormData.append('max_participants', formData.max_participants?.toString() || '0');
      submitFormData.append('is_active', formData.is_active ? '1' : '0');
      submitFormData.append('requires_payment', formData.requires_payment ? '1' : '0');
      submitFormData.append('sort_order', formData.sort_order?.toString() || '0');
      
      // Ajouter les champs JSON
      submitFormData.append('requirements', JSON.stringify(formData.requirements || []));
      submitFormData.append('levels', JSON.stringify(formData.levels || []));
      submitFormData.append('syllabus', JSON.stringify(formData.syllabus || []));

      if (editingFormation && editingFormation.id) {
        await updateFormation.mutateAsync({ 
          id: editingFormation.id, 
          formationData: submitFormData 
        });
      } else {
        await createFormation.mutateAsync(submitFormData);
      }
      
      handleCloseForm();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (formation: Formation) => {
    if (!formation.id) return;
    
    if (!confirm(`Êtes-vous sûr de vouloir supprimer la formation "${formation.name}" ?`)) {
      return;
    }

    try {
      await deleteFormation.mutateAsync(formation.id);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const formatPrice = (price?: number) => {
    if (!price) return 'Gratuit';
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDuration = (hours?: number) => {
    if (!hours) return 'Non définie';
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return remainingHours > 0 ? `${days}j ${remainingHours}h` : `${days}j`;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Chargement des formations...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-blue-600" />
            Gestion des Formations
          </h1>
          <p className="text-gray-600">Gérez les formations et programmes éducatifs</p>
        </div>
        <Button onClick={() => handleOpenForm()} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nouvelle Formation
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold">{formations?.length || 0}</p>
              </div>
              <GraduationCap className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Actives</p>
                <p className="text-2xl font-bold text-green-600">
                  {formations?.filter(f => f.is_active).length || 0}
                </p>
              </div>
              <Eye className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Payantes</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {formations?.filter(f => f.requires_payment).length || 0}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Participants Max</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formations?.reduce((sum, f) => sum + (f.max_participants || 0), 0) || 0}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Formations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Formations ({formations?.length || 0})</CardTitle>
          <CardDescription>
            Gérez vos formations, leurs détails et leur disponibilité
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Formation</TableHead>
                  <TableHead>Détails</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Durée</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formations?.map((formation) => (
                  <TableRow key={formation.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{formation.name}</div>
                        {formation.description && (
                          <div className="text-sm text-gray-600 line-clamp-2">
                            {formation.description}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {formation.levels && formation.levels.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {formation.levels.slice(0, 2).map((level, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {level}
                              </Badge>
                            ))}
                            {formation.levels.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{formation.levels.length - 2}
                              </Badge>
                            )}
                          </div>
                        )}
                        {formation.requirements && formation.requirements.length > 0 && (
                          <div className="text-xs text-gray-500">
                            {formation.requirements.length} prérequis
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        <span className={formation.requires_payment ? 'font-medium' : 'text-green-600'}>
                          {formatPrice(formation.price)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatDuration(formation.duration_hours)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{formation.max_participants || 'Illimité'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={formation.is_active ? 'default' : 'secondary'}
                        className={formation.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                      >
                        {formation.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenForm(formation)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(formation)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {(!formations || formations.length === 0) && (
              <div className="text-center py-8">
                <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune formation</h3>
                <p className="text-gray-500 mb-4">Commencez par créer votre première formation.</p>
                <Button onClick={() => handleOpenForm()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Créer une formation
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingFormation ? 'Modifier la formation' : 'Nouvelle formation'}
            </DialogTitle>
            <DialogDescription>
              {editingFormation 
                ? 'Modifiez les informations de la formation.' 
                : 'Créez une nouvelle formation pour votre catalogue.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations de base */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="name">Nom de la formation *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Développement Web avec React"
                  required
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="description">Description courte</Label>
                <Textarea
                  id="description"
                  value={formData.description || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brève description de la formation..."
                  rows={2}
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="long_description">Description détaillée</Label>
                <Textarea
                  id="long_description"
                  value={formData.long_description || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, long_description: e.target.value }))}
                  placeholder="Description complète et détaillée de la formation..."
                  rows={4}
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="prerequisites">Prérequis</Label>
                <Textarea
                  id="prerequisites"
                  value={formData.prerequisites || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, prerequisites: e.target.value }))}
                  placeholder="Prérequis nécessaires pour suivre cette formation..."
                  rows={2}
                />
              </div>
            </div>

            {/* Détails de la formation */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="duration_hours">Durée (heures)</Label>
                <Input
                  id="duration_hours"
                  type="number"
                  value={formData.duration_hours || 0}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    duration_hours: parseInt(e.target.value) || 0 
                  }))}
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="max_participants">Participants max</Label>
                <Input
                  id="max_participants"
                  type="number"
                  value={formData.max_participants || 0}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    max_participants: parseInt(e.target.value) || 0 
                  }))}
                  min="0"
                  placeholder="0 = illimité"
                />
              </div>

              <div>
                <Label htmlFor="price">Prix (FCFA)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price || 0}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    price: parseInt(e.target.value) || 0 
                  }))}
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="sort_order">Ordre d'affichage</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={formData.sort_order || 0}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    sort_order: parseInt(e.target.value) || 0 
                  }))}
                />
              </div>

              <div>
                <Label htmlFor="duration">Durée (texte)</Label>
                <Input
                  id="duration"
                  value={formData.duration || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="Ex: 3 mois, 6 semaines..."
                />
              </div>

              <div>
                <Label htmlFor="schedule">Horaire</Label>
                <Input
                  id="schedule"
                  value={formData.schedule || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, schedule: e.target.value }))}
                  placeholder="Ex: Mardi et Jeudi, 18h-20h"
                />
              </div>

              <div>
                <Label htmlFor="start_date">Date de début</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date?.split('T')[0] || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="end_date">Date de fin</Label>
                <Input
                  id="end_date"
                  type="date"
                  value={formData.end_date?.split('T')[0] || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                />
              </div>
            </div>

            {/* Switches */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active || false}
                  onCheckedChange={(checked) => setFormData(prev => ({ 
                    ...prev, 
                    is_active: checked 
                  }))}
                />
                <Label htmlFor="is_active">Formation active</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="requires_payment"
                  checked={formData.requires_payment || false}
                  onCheckedChange={(checked) => setFormData(prev => ({ 
                    ...prev, 
                    requires_payment: checked 
                  }))}
                />
                <Label htmlFor="requires_payment">Payante</Label>
              </div>
            </div>

            {/* Prérequis */}
            <div>
              <Label>Prérequis</Label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newRequirement}
                    onChange={(e) => setNewRequirement(e.target.value)}
                    placeholder="Ajouter un prérequis"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                  />
                  <Button type="button" onClick={addRequirement} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.requirements && formData.requirements.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.requirements.map((req, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {req}
                        <button
                          type="button"
                          onClick={() => removeRequirement(index)}
                          className="ml-1 hover:text-red-600"
                          title="Supprimer ce prérequis"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Niveaux */}
            <div>
              <Label>Niveaux</Label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value)}
                    placeholder="Ajouter un niveau"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLevel())}
                  />
                  <Button type="button" onClick={addLevel} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.levels && formData.levels.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.levels.map((level, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {level}
                        <button
                          type="button"
                          onClick={() => removeLevel(index)}
                          className="ml-1 hover:text-red-600"
                          title="Supprimer ce niveau"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Programme/Syllabus */}
            <div>
              <Label>Programme de formation</Label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newSyllabusItem}
                    onChange={(e) => setNewSyllabusItem(e.target.value)}
                    placeholder="Ajouter un module du programme"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSyllabusItem())}
                  />
                  <Button type="button" onClick={addSyllabusItem} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.syllabus && formData.syllabus.length > 0 && (
                  <div className="space-y-1">
                    {formData.syllabus.map((item, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm">{item}</span>
                        <button
                          type="button"
                          onClick={() => removeSyllabusItem(index)}
                          className="ml-2 hover:text-red-600"
                          title="Supprimer ce module"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseForm}
                disabled={isSubmitting}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {editingFormation ? 'Modification...' : 'Création...'}
                  </>
                ) : (
                  editingFormation ? 'Modifier' : 'Créer'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminContenusFormationsPage;