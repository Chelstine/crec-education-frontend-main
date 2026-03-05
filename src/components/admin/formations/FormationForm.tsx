import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageUploader } from '@/components/admin';

// Définition des catégories, niveaux et formats pour les formations
const CATEGORIES = [
  { value: 'informatique', label: 'Informatique et Programmation' },
  { value: 'langues', label: 'Langues Étrangères' },
  { value: 'communication', label: 'Communication' },
  { value: 'marketing', label: 'Marketing Digital' },
  { value: 'gestion', label: 'Gestion et Management' },
  { value: 'design', label: 'Design et Création' },
  { value: 'spiritualite', label: 'Spiritualité' },
];

const LEVELS = [
  { value: 'Débutant', label: 'Débutant' },
  { value: 'Intermédiaire', label: 'Intermédiaire' },
  { value: 'Avancé', label: 'Avancé' },
];

const FORMATS = [
  { value: 'Présentiel', label: 'Présentiel' },
  { value: 'En ligne', label: 'En ligne' },
  { value: 'Hybride', label: 'Hybride' },
];

const STATUS = [
  { value: 'active', label: 'Actif' },
  { value: 'draft', label: 'Brouillon' },
  { value: 'inactive', label: 'Inactif' },
];

interface FormationFormProps {
  formData: any;
  handleChange: (e: any) => void;
  isSubmitting: boolean;
}

const FormationForm: React.FC<FormationFormProps> = ({ 
  formData, 
  handleChange,
  isSubmitting 
}) => {
  const [activeTab, setActiveTab] = useState('general');

  // Fonction pour gérer les valeurs des select
  const handleSelectChange = (name: string, value: string) => {
    handleChange({ 
      target: { 
        name, 
        value,
        type: 'select'
      } 
    });
  };

  // Fonction pour gérer l'upload d'images
  const handleImageUpload = async (file: File): Promise<string> => {
    // Simuler un upload d'image (à remplacer par un vrai upload)
    return new Promise((resolve) => {
      setTimeout(() => {
        const fakeUrl = URL.createObjectURL(file);
        handleChange({
          target: {
            name: 'image',
            value: fakeUrl,
            type: 'image'
          }
        });
        resolve(fakeUrl);
      }, 1000);
    });
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="general">Informations générales</TabsTrigger>
        <TabsTrigger value="details">Détails</TabsTrigger>
      </TabsList>
      
      <TabsContent value="general" className="space-y-4">
        <div>
          <Label htmlFor="title">Titre de la formation*</Label>
          <Input
            id="title"
            name="title"
            value={formData.title || ''}
            onChange={handleChange}
            placeholder="Titre de la formation"
            disabled={isSubmitting}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="description">Description*</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            placeholder="Description détaillée de la formation"
            className="min-h-[100px]"
            disabled={isSubmitting}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Catégorie*</Label>
            <Select
              name="category"
              value={formData.category || ''}
              onValueChange={(value) => handleSelectChange('category', value)}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="level">Niveau*</Label>
            <Select
              name="level"
              value={formData.level || ''}
              onValueChange={(value) => handleSelectChange('level', value)}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un niveau" />
              </SelectTrigger>
              <SelectContent>
                {LEVELS.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Prix (FCFA)*</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price || ''}
              onChange={handleChange}
              placeholder="150000"
              disabled={isSubmitting}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="duration">Durée*</Label>
            <Input
              id="duration"
              name="duration"
              value={formData.duration || ''}
              onChange={handleChange}
              placeholder="Ex: 12 semaines"
              disabled={isSubmitting}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate">Date de début</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate ? new Date(formData.startDate).toISOString().split('T')[0] : ''}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <Label htmlFor="endDate">Date de fin</Label>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              value={formData.endDate ? new Date(formData.endDate).toISOString().split('T')[0] : ''}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="details" className="space-y-4">
        <div>
          <Label htmlFor="instructor">Formateur*</Label>
          <Input
            id="instructor"
            name="instructor"
            value={formData.instructor || ''}
            onChange={handleChange}
            placeholder="Nom du formateur"
            disabled={isSubmitting}
            required
          />
        </div>

        <div>
          <Label htmlFor="maxParticipants">Participants maximum</Label>
          <Input
            id="maxParticipants"
            name="maxParticipants"
            type="number"
            value={formData.maxParticipants || ''}
            onChange={handleChange}
            placeholder="20"
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <Label htmlFor="format">Format*</Label>
          <Select
            name="format"
            value={formData.format || ''}
            onValueChange={(value) => handleSelectChange('format', value)}
            disabled={isSubmitting}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un format" />
            </SelectTrigger>
            <SelectContent>
              {FORMATS.map((format) => (
                <SelectItem key={format.value} value={format.value}>
                  {format.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="schedule">Horaires</Label>
          <Input
            id="schedule"
            name="schedule"
            value={formData.schedule || ''}
            onChange={handleChange}
            placeholder="Ex: Lundi et Mercredi, 18h-20h"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <Label htmlFor="location">Lieu</Label>
          <Input
            id="location"
            name="location"
            value={formData.location || ''}
            onChange={handleChange}
            placeholder="Ex: CREC Campus Principal, Salle 204"
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <Label htmlFor="status">Statut*</Label>
          <Select
            name="status"
            value={formData.status || 'draft'}
            onValueChange={(value) => handleSelectChange('status', value)}
            disabled={isSubmitting}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un statut" />
            </SelectTrigger>
            <SelectContent>
              {STATUS.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <ImageUploader
            onImageUpload={handleImageUpload}
            currentImageUrl={formData.image || ''}
            label="Image de la formation"
            aspectRatio="16:9"
            width="100%"
            height="200px"
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default FormationForm;
