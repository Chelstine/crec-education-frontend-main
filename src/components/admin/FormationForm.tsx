import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ImageUploader } from '@/components/admin';

interface FormationFormProps {
  formData: any;
  handleChange: (field: string, value: any) => void;
  isSubmitting: boolean;
}

const FormationForm: React.FC<FormationFormProps> = ({ formData, handleChange, isSubmitting }) => {
  const [localFormData, setLocalFormData] = useState(formData || {
    title: '',
    description: '',
    long_description: '',
    prerequisites: '',
    syllabus: '',
    category: '',
    duration: '',
    price: 0,
    instructor: '',
    maxParticipants: 15,
    schedule: '',
    location: '',
    format: 'Présentiel',
    level: 'Débutant',
    status: 'draft',
    image: '',
    start_date: '',
    end_date: ''
  });

  const handleLocalChange = (field: string, value: any) => {
    const updatedForm = { ...localFormData, [field]: value };
    setLocalFormData(updatedForm);
    handleChange(field, value);
  };

  const handleImageUpload = async (file: File) => {
    // Dans une implémentation réelle, vous téléchargeriez le fichier vers un serveur
    // et obtiendriez une URL à partir de la réponse
    const fakeUrl = URL.createObjectURL(file);
    handleLocalChange('image', fakeUrl);
    return fakeUrl; // Retourne l'URL pour l'aperçu
  };

  return (
    <div className="space-y-6">
      {/* Image de la formation */}
      <div>
        <Label htmlFor="image">Image de la formation</Label>
        <div className="mt-1">
          <ImageUploader 
            currentImageUrl={localFormData.image || ''} 
            onImageUpload={handleImageUpload}
          />
          <p className="text-xs text-slate-500 mt-1">
            Image représentative de la formation (format recommandé: 16:9, min 1200x675px)
          </p>
        </div>
      </div>

      {/* Titre de la formation */}
      <div>
        <Label htmlFor="title">Titre de la formation</Label>
        <Input
          id="title"
          value={localFormData.title}
          onChange={(e) => handleLocalChange('title', e.target.value)}
          placeholder="Ex: Anglais Professionnel"
          className="mt-1"
          disabled={isSubmitting}
          required
        />
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">Description courte</Label>
        <Textarea
          id="description"
          value={localFormData.description}
          onChange={(e) => handleLocalChange('description', e.target.value)}
          placeholder="Brève description de la formation..."
          className="mt-1"
          rows={3}
          disabled={isSubmitting}
          required
        />
      </div>

      {/* Description longue */}
      <div>
        <Label htmlFor="long_description">Description détaillée</Label>
        <Textarea
          id="long_description"
          value={localFormData.long_description || ''}
          onChange={(e) => handleLocalChange('long_description', e.target.value)}
          placeholder="Description détaillée et complète de la formation..."
          className="mt-1"
          rows={6}
          disabled={isSubmitting}
        />
      </div>

      {/* Prérequis */}
      <div>
        <Label htmlFor="prerequisites">Prérequis</Label>
        <Textarea
          id="prerequisites"
          value={localFormData.prerequisites || ''}
          onChange={(e) => handleLocalChange('prerequisites', e.target.value)}
          placeholder="Prérequis nécessaires pour cette formation..."
          className="mt-1"
          rows={3}
          disabled={isSubmitting}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Catégorie */}
        <div>
          <Label htmlFor="category">Catégorie</Label>
          <Select
            value={localFormData.category}
            onValueChange={(value) => handleLocalChange('category', value)}
            disabled={isSubmitting}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Sélectionnez une catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="langues">Langues</SelectItem>
              <SelectItem value="informatique">Informatique</SelectItem>
              <SelectItem value="business">Business & Management</SelectItem>
              <SelectItem value="artisanat">Artisanat & Design</SelectItem>
              <SelectItem value="communication">Communication</SelectItem>
              <SelectItem value="developpement-personnel">Développement personnel</SelectItem>
              <SelectItem value="autre">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Durée */}
        <div>
          <Label htmlFor="duration">Durée</Label>
          <Input
            id="duration"
            value={localFormData.duration}
            onChange={(e) => handleLocalChange('duration', e.target.value)}
            placeholder="Ex: 60 heures"
            className="mt-1"
            disabled={isSubmitting}
            required
          />
        </div>

        {/* Prix */}
        <div>
          <Label htmlFor="price">Prix (FCFA)</Label>
          <Input
            id="price"
            type="number"
            value={localFormData.price}
            onChange={(e) => handleLocalChange('price', Number(e.target.value))}
            placeholder="Ex: 150000"
            className="mt-1"
            disabled={isSubmitting}
            required
          />
        </div>

        {/* Formateur */}
        <div>
          <Label htmlFor="instructor">Formateur</Label>
          <Input
            id="instructor"
            value={localFormData.instructor}
            onChange={(e) => handleLocalChange('instructor', e.target.value)}
            placeholder="Ex: Mme. Sarah Johnson"
            className="mt-1"
            disabled={isSubmitting}
            required
          />
        </div>

        {/* Nombre max de participants */}
        <div>
          <Label htmlFor="maxParticipants">Nombre maximum de participants</Label>
          <Input
            id="maxParticipants"
            type="number"
            value={localFormData.maxParticipants}
            onChange={(e) => handleLocalChange('maxParticipants', Number(e.target.value))}
            className="mt-1"
            disabled={isSubmitting}
            required
          />
        </div>

        {/* Format */}
        <div>
          <Label htmlFor="format">Format</Label>
          <Select
            value={localFormData.format}
            onValueChange={(value) => handleLocalChange('format', value)}
            disabled={isSubmitting}
          >
            <SelectTrigger id="format">
              <SelectValue placeholder="Sélectionnez un format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Présentiel">Présentiel</SelectItem>
              <SelectItem value="En ligne">En ligne</SelectItem>
              <SelectItem value="Hybride">Hybride</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Niveau */}
        <div>
          <Label htmlFor="level">Niveau</Label>
          <Select
            value={localFormData.level}
            onValueChange={(value) => handleLocalChange('level', value)}
            disabled={isSubmitting}
          >
            <SelectTrigger id="level">
              <SelectValue placeholder="Sélectionnez un niveau" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Débutant">Débutant</SelectItem>
              <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
              <SelectItem value="Avancé">Avancé</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Horaire */}
        <div>
          <Label htmlFor="schedule">Horaire</Label>
          <Input
            id="schedule"
            value={localFormData.schedule}
            onChange={(e) => handleLocalChange('schedule', e.target.value)}
            placeholder="Ex: Mardi et Jeudi, 18h-20h"
            className="mt-1"
            disabled={isSubmitting}
          />
        </div>

        {/* Lieu */}
        <div>
          <Label htmlFor="location">Lieu</Label>
          <Input
            id="location"
            value={localFormData.location}
            onChange={(e) => handleLocalChange('location', e.target.value)}
            placeholder="Ex: CREC Campus Principal, Salle 204"
            className="mt-1"
            disabled={isSubmitting}
          />
        </div>

        {/* Date de début */}
        <div>
          <Label htmlFor="start_date">Date de début</Label>
          <Input
            id="start_date"
            type="date"
            value={localFormData.start_date?.split('T')[0] || ''}
            onChange={(e) => handleLocalChange('start_date', e.target.value)}
            className="mt-1"
            disabled={isSubmitting}
          />
        </div>

        {/* Date de fin */}
        <div>
          <Label htmlFor="end_date">Date de fin</Label>
          <Input
            id="end_date"
            type="date"
            value={localFormData.end_date?.split('T')[0] || ''}
            onChange={(e) => handleLocalChange('end_date', e.target.value)}
            className="mt-1"
            disabled={isSubmitting}
          />
        </div>

        {/* Statut */}
        <div>
          <Label htmlFor="status">Statut</Label>
          <Select
            value={localFormData.status}
            onValueChange={(value) => handleLocalChange('status', value)}
            disabled={isSubmitting}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Sélectionnez un statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Actif</SelectItem>
              <SelectItem value="draft">Brouillon</SelectItem>
              <SelectItem value="inactive">Inactif</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Programme/Syllabus */}
      <div>
        <Label htmlFor="syllabus">Programme de formation</Label>
        <Textarea
          id="syllabus"
          value={localFormData.syllabus || ''}
          onChange={(e) => handleLocalChange('syllabus', e.target.value)}
          placeholder="Programme détaillé de la formation (une ligne par module/chapitre)..."
          className="mt-1"
          rows={8}
          disabled={isSubmitting}
        />
        <p className="text-xs text-gray-500 mt-1">
          Entrez chaque module/chapitre sur une nouvelle ligne. Ces éléments seront affichés comme une liste à puces.
        </p>
      </div>
    </div>
  );
};

export default FormationForm;
