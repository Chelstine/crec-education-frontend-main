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
import { ImageUploader } from '@/components/admin';

interface CourseFormProps {
  formData: any;
  handleChange: (field: string, value: any) => void;
  isSubmitting: boolean;
}

const CourseForm: React.FC<CourseFormProps> = ({ formData, handleChange, isSubmitting }) => {
  const [localFormData, setLocalFormData] = useState(formData || {
    title: '',
    description: '',
    credits: 0,
    level: '',
    department: '',
    professor: '',
    duration: '',
    format: '',
    status: 'draft',
    image: '',
    startDate: '',
    endDate: ''
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
      {/* Image du cours */}
      <div>
        <Label htmlFor="image">Image du cours</Label>
        <div className="mt-1">
          <ImageUploader 
            currentImageUrl={localFormData.image || ''} 
            onImageUpload={handleImageUpload}
          />
          <p className="text-xs text-slate-500 mt-1">
            Image représentative du cours (format recommandé: 16:9, min 800x450px)
          </p>
        </div>
      </div>

      {/* Titre du cours */}
      <div>
        <Label htmlFor="title">Titre du cours</Label>
        <Input
          id="title"
          value={localFormData.title}
          onChange={(e) => handleLocalChange('title', e.target.value)}
          placeholder="Ex: Introduction à la Programmation"
          className="mt-1"
          disabled={isSubmitting}
          required
        />
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={localFormData.description}
          onChange={(e) => handleLocalChange('description', e.target.value)}
          placeholder="Description détaillée du cours..."
          className="mt-1"
          rows={4}
          disabled={isSubmitting}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Niveau */}
        <div>
          <Label htmlFor="level">Niveau</Label>
          <Select
            value={localFormData.level}
            onValueChange={(value) => handleLocalChange('level', value)}
            disabled={isSubmitting}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Sélectionner un niveau" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Licence 1">Licence 1</SelectItem>
              <SelectItem value="Licence 2">Licence 2</SelectItem>
              <SelectItem value="Licence 3">Licence 3</SelectItem>
              <SelectItem value="Master 1">Master 1</SelectItem>
              <SelectItem value="Master 2">Master 2</SelectItem>
              <SelectItem value="Doctorat">Doctorat</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Département */}
        <div>
          <Label htmlFor="department">Département</Label>
          <Input
            id="department"
            value={localFormData.department}
            onChange={(e) => handleLocalChange('department', e.target.value)}
            placeholder="Ex: Informatique"
            className="mt-1"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Crédits */}
        <div>
          <Label htmlFor="credits">Crédits</Label>
          <Input
            id="credits"
            type="number"
            value={localFormData.credits}
            onChange={(e) => handleLocalChange('credits', parseInt(e.target.value) || 0)}
            placeholder="Ex: 6"
            className="mt-1"
            disabled={isSubmitting}
            required
          />
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
      </div>

      {/* Enseignant */}
      <div>
        <Label htmlFor="professor">Enseignant</Label>
        <Input
          id="professor"
          value={localFormData.professor}
          onChange={(e) => handleLocalChange('professor', e.target.value)}
          placeholder="Nom de l'enseignant"
          className="mt-1"
          disabled={isSubmitting}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Format */}
        <div>
          <Label htmlFor="format">Format</Label>
          <Select
            value={localFormData.format}
            onValueChange={(value) => handleLocalChange('format', value)}
            disabled={isSubmitting}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Sélectionner un format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Présentiel">Présentiel</SelectItem>
              <SelectItem value="Hybride">Hybride</SelectItem>
              <SelectItem value="À distance">À distance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Statut de publication */}
        <div>
          <Label htmlFor="status">Statut</Label>
          <Select
            value={localFormData.status}
            onValueChange={(value) => handleLocalChange('status', value)}
            disabled={isSubmitting}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Sélectionner un statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Brouillon</SelectItem>
              <SelectItem value="active">Actif</SelectItem>
              <SelectItem value="inactive">Inactif</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Date de début */}
        <div>
          <Label htmlFor="startDate">Date de début</Label>
          <Input
            id="startDate"
            type="date"
            value={localFormData.startDate ? new Date(localFormData.startDate).toISOString().split('T')[0] : ''}
            onChange={(e) => handleLocalChange('startDate', e.target.value)}
            className="mt-1"
            disabled={isSubmitting}
          />
        </div>

        {/* Date de fin */}
        <div>
          <Label htmlFor="endDate">Date de fin</Label>
          <Input
            id="endDate"
            type="date"
            value={localFormData.endDate ? new Date(localFormData.endDate).toISOString().split('T')[0] : ''}
            onChange={(e) => handleLocalChange('endDate', e.target.value)}
            className="mt-1"
            disabled={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseForm;
