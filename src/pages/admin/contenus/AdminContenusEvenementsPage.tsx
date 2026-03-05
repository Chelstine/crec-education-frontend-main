import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Calendar, 
  MapPin, 
  Clock,
  Search,
  Eye,
  EyeOff,
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
import { useToast } from '@/hooks/use-toast';
import { useAdminEvents, useCreateEvent, useUpdateEvent, useDeleteEvent } from '@/hooks/useEvents';
import { Event, CreateEventData, formatEventDate, formatEventTime } from '@/types/events';

const AdminContenusEvenementsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<Partial<CreateEventData>>({
    title: '',
    description: '',
    event_date: '',
    event_time: '',
    location: '',
    is_active: true
  });

  const { toast } = useToast();

  // Hooks pour les données et mutations
  const { data: events = [], isLoading, error } = useAdminEvents();
  const createEventMutation = useCreateEvent();
  const updateEventMutation = useUpdateEvent();
  const deleteEventMutation = useDeleteEvent();

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      event_date: '',
      event_time: '',
      location: '',
      is_active: true
    });
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    
    // Convertir la date ISO8601 en format YYYY-MM-DD pour l'input
    const eventDate = event.event_date.includes('T') 
      ? event.event_date.split('T')[0] 
      : event.event_date;
    
    setFormData({
      title: event.title,
      description: event.description,
      event_date: eventDate,
      event_time: event.event_time,
      location: event.location,
      is_active: event.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.event_date || !formData.event_time || !formData.location) {
      toast({
        title: 'Erreur',
        description: 'Tous les champs sont requis',
        variant: 'destructive'
      });
      return;
    }

    try {
      if (editingEvent) {
        // Pour la mise à jour, on envoie seulement les champs modifiés
        const updateData = { ...formData };
        // S'assurer que is_active est défini
        if (updateData.is_active === undefined) {
          updateData.is_active = true;
        }
        
        await updateEventMutation.mutateAsync({ 
          id: editingEvent.id!, 
          data: updateData
        });
        toast({
          title: 'Succès',
          description: 'Événement mis à jour avec succès'
        });
      } else {
        // Pour la création, on s'assure que tous les champs requis sont présents
        const createData: CreateEventData = {
          title: formData.title!,
          description: formData.description!,
          event_date: formData.event_date!,
          event_time: formData.event_time!,
          location: formData.location!,
          is_active: formData.is_active ?? true,
          image: formData.image
        };
        
        await createEventMutation.mutateAsync(createData);
        toast({
          title: 'Succès',
          description: 'Événement créé avec succès'
        });
      }
      setIsDialogOpen(false);
      setEditingEvent(null);
      resetForm();
    } catch (error: any) {
      console.error('Erreur lors de la soumission:', error);
      toast({
        title: 'Erreur',
        description: error?.response?.data?.message || (editingEvent 
          ? 'Erreur lors de la mise à jour de l\'événement'
          : 'Erreur lors de la création de l\'événement'),
        variant: 'destructive'
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      return;
    }

    try {
      await deleteEventMutation.mutateAsync(id);
      toast({
        title: 'Succès',
        description: 'Événement supprimé avec succès'
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Erreur lors de la suppression de l\'événement',
        variant: 'destructive'
      });
    }
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (event.location && event.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Séparer les événements futurs et passés
  const upcomingEvents = filteredEvents.filter(event => {
    const eventDateTime = new Date(`${event.event_date} ${event.event_time}`);
    return eventDateTime > new Date();
  });

  const pastEvents = filteredEvents.filter(event => {
    const eventDateTime = new Date(`${event.event_date} ${event.event_time}`);
    return eventDateTime <= new Date();
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-crec-gold mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des événements...</p>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Événements</h1>
          <p className="text-gray-600">Gérez les événements qui s'affichent sur la page événements</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-crec-gold hover:bg-crec-gold/90"
              onClick={() => {
                setEditingEvent(null);
                resetForm();
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouvel Événement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingEvent ? 'Modifier l\'événement' : 'Nouvel événement'}
              </DialogTitle>
              <DialogDescription>
                {editingEvent ? 'Modifiez les informations de l\'événement' : 'Ajoutez un nouvel événement'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 pb-4">
              <div>
                <Label htmlFor="title">Titre *</Label>
                <Input
                  id="title"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Titre de l'événement"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Description de l'événement"
                  rows={4}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="event_date">Date *</Label>
                  <Input
                    id="event_date"
                    type="date"
                    value={formData.event_date || ''}
                    onChange={(e) => setFormData({...formData, event_date: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="event_time">Heure *</Label>
                  <Input
                    id="event_time"
                    type="time"
                    value={formData.event_time || ''}
                    onChange={(e) => setFormData({...formData, event_time: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="location">Emplacement *</Label>
                <Input
                  id="location"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="Lieu de l'événement"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="image">Photo de l'événement</Label>
                <ImageUpload
                  value={editingEvent?.image_url || ''}
                  onChange={(file, previewUrl) => {
                    setFormData({
                      ...formData,
                      image: file || undefined,
                    });
                  }}
                  type="events"
                  placeholder="Sélectionnez une photo pour l'événement"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active || false}
                  onCheckedChange={(checked) => setFormData({...formData, is_active: checked})}
                />
                <Label htmlFor="is_active">Événement actif</Label>
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
                  disabled={createEventMutation.isPending || updateEventMutation.isPending}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingEvent ? 'Mettre à jour' : 'Créer'}
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
              <Calendar className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Événements</p>
                <p className="text-2xl font-bold text-gray-900">{events.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">À venir</p>
                <p className="text-2xl font-bold text-gray-900">{upcomingEvents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Passés</p>
                <p className="text-2xl font-bold text-gray-900">{pastEvents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher par titre, description ou lieu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des Événements</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Photo</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead>Date & Heure</TableHead>
                <TableHead>Lieu</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">Aucun événement trouvé</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                        {event.image_url ? (
                          <img 
                            src={event.image_url} 
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Calendar className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-gray-500 truncate max-w-xs" title={event.description}>
                          {event.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-medium">{formatEventDate(event)}</p>
                        <p className="text-gray-500">{formatEventTime(event)}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                        <span>{event.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge variant={event.is_active ? 'default' : 'secondary'}>
                          {event.is_active ? 'Actif' : 'Inactif'}
                        </Badge>
                        <br />
                        <Badge variant={
                          new Date(`${event.event_date} ${event.event_time}`) > new Date() 
                            ? 'default' 
                            : 'outline'
                        }>
                          {new Date(`${event.event_date} ${event.event_time}`) > new Date() 
                            ? 'À venir' 
                            : 'Passé'
                          }
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(event)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(event.id!)}
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

export default AdminContenusEvenementsPage;
