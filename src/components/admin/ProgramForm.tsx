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

interface ProgramFormProps {
  formData: any;
  handleChange: (field: string, value: any) => void;
  isSubmitting: boolean;
}

const ProgramForm: React.FC<ProgramFormProps> = ({ formData, handleChange, isSubmitting }) => {
  const [localFormData, setLocalFormData] = useState(formData || {
    name: '',
    description: '',
    level: '',
    duration: '',
    headOfProgram: '',
    courses: [],
    status: 'draft',
    image: ''
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
      {/* Image du programme */}
      <div>
        <Label htmlFor="image">Image du programme</Label>
        <div className="mt-1">
          <ImageUploader 
            currentImageUrl={localFormData.image || ''} 
            onImageUpload={handleImageUpload}
          />
          <p className="text-xs text-slate-500 mt-1">
            Image représentative du programme (format recommandé: 16:9, min 1200x675px)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Nom du programme */}
        <div>
          <Label htmlFor="name">Nom du programme</Label>
          <Input
            id="name"
            value={localFormData.name}
            onChange={(e) => handleLocalChange('name', e.target.value)}
            placeholder="Ex: Licence en Informatique"
            className="mt-1 w-full"
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
            placeholder="Description détaillée du programme..."
            className="mt-1 w-full"
            rows={3}
            disabled={isSubmitting}
            required
          />
        </div>
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
              <SelectItem value="Licence">Licence</SelectItem>
              <SelectItem value="Master">Master</SelectItem>
              <SelectItem value="Doctorat">Doctorat</SelectItem>
              <SelectItem value="Certificat">Certificat</SelectItem>
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
            placeholder="Ex: 3 ans"
            className="mt-1"
            disabled={isSubmitting}
            required
          />
        </div>
      </div>

      {/* Responsable */}
      <div>
        <Label htmlFor="headOfProgram">Responsable du programme</Label>
        <Input
          id="headOfProgram"
          value={localFormData.headOfProgram}
          onChange={(e) => handleLocalChange('headOfProgram', e.target.value)}
          placeholder="Nom du responsable"
          className="mt-1"
          disabled={isSubmitting}
        />
      </div>

      {/* Statut de publication */}
      <div>
        <Label htmlFor="status">Statut de publication</Label>
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
  );
};

export default ProgramForm;
