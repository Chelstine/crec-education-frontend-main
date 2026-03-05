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

interface MachineFormProps {
  formData: any;
  handleChange: (field: string, value: any) => void;
  isSubmitting: boolean;
}

const MachineForm: React.FC<MachineFormProps> = ({ formData, handleChange, isSubmitting }) => {
  const [localFormData, setLocalFormData] = useState(formData || {
    name: '',
    type: '',
    description: '',
    status: 'available',
    image: '',
    specifications: '',
    requiresTraining: false,
    trainingPrice: 0,
    usagePrice: 0,
    materialPrice: 0,
    availableSlots: []
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
      {/* Image de la machine */}
      <div>
        <Label htmlFor="image">Photo de la machine</Label>
        <div className="mt-1">
          <ImageUploader 
            currentImageUrl={localFormData.image || ''} 
            onImageUpload={handleImageUpload}
          />
          <p className="text-xs text-slate-500 mt-1">
            Photo de la machine (format recommandé: carré ou 4:3)
          </p>
        </div>
      </div>

      {/* Nom de la machine */}
      <div>
        <Label htmlFor="name">Nom de la machine</Label>
        <Input
          id="name"
          value={localFormData.name}
          onChange={(e) => handleLocalChange('name', e.target.value)}
          placeholder="Ex: Creality Ender 3 Pro"
          className="mt-1"
          disabled={isSubmitting}
          required
        />
      </div>

      {/* Type de machine */}
      <div>
        <Label htmlFor="type">Type de machine</Label>
        <Select
          value={localFormData.type}
          onValueChange={(value) => handleLocalChange('type', value)}
          disabled={isSubmitting}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Sélectionner un type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="printer3d">Imprimante 3D</SelectItem>
            <SelectItem value="cutter">Découpeuse</SelectItem>
            <SelectItem value="cnc">CNC</SelectItem>
            <SelectItem value="laser">Laser</SelectItem>
            <SelectItem value="electronics">Électronique</SelectItem>
            <SelectItem value="other">Autre</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={localFormData.description}
          onChange={(e) => handleLocalChange('description', e.target.value)}
          placeholder="Description de la machine..."
          className="mt-1"
          rows={3}
          disabled={isSubmitting}
          required
        />
      </div>

      {/* Spécifications techniques */}
      <div>
        <Label htmlFor="specifications">Spécifications techniques</Label>
        <Textarea
          id="specifications"
          value={localFormData.specifications}
          onChange={(e) => handleLocalChange('specifications', e.target.value)}
          placeholder="Caractéristiques techniques de la machine..."
          className="mt-1"
          rows={3}
          disabled={isSubmitting}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Prix d'utilisation */}
        <div>
          <Label htmlFor="usagePrice">Prix d'utilisation (FCFA/h)</Label>
          <Input
            id="usagePrice"
            type="number"
            value={localFormData.usagePrice}
            onChange={(e) => handleLocalChange('usagePrice', parseInt(e.target.value) || 0)}
            placeholder="Ex: 5000"
            className="mt-1"
            disabled={isSubmitting}
            required
          />
        </div>

        {/* Prix des matériaux (optionnel) */}
        <div>
          <Label htmlFor="materialPrice">Prix des matériaux (FCFA)</Label>
          <Input
            id="materialPrice"
            type="number"
            value={localFormData.materialPrice || ''}
            onChange={(e) => handleLocalChange('materialPrice', parseInt(e.target.value) || 0)}
            placeholder="Ex: 3000"
            className="mt-1"
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Formation requise */}
      <div className="flex items-center space-x-2">
        <Switch
          id="requiresTraining"
          checked={localFormData.requiresTraining}
          onCheckedChange={(checked) => handleLocalChange('requiresTraining', checked)}
          disabled={isSubmitting}
        />
        <Label htmlFor="requiresTraining" className="cursor-pointer">Formation requise pour utilisation</Label>
      </div>

      {/* Prix de la formation (conditionnel) */}
      {localFormData.requiresTraining && (
        <div>
          <Label htmlFor="trainingPrice">Prix de la formation (FCFA)</Label>
          <Input
            id="trainingPrice"
            type="number"
            value={localFormData.trainingPrice || ''}
            onChange={(e) => handleLocalChange('trainingPrice', parseInt(e.target.value) || 0)}
            placeholder="Ex: 15000"
            className="mt-1"
            disabled={isSubmitting}
          />
        </div>
      )}

      {/* Statut */}
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
            <SelectItem value="available">Disponible</SelectItem>
            <SelectItem value="maintenance">En maintenance</SelectItem>
            <SelectItem value="busy">Occupée</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default MachineForm;
