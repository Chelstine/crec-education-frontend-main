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

interface ServiceFormProps {
  formData: any;
  handleChange: (field: string, value: any) => void;
  isSubmitting: boolean;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ formData, handleChange, isSubmitting }) => {
  const [localFormData, setLocalFormData] = useState(formData || {
    name: '',
    description: '',
    category: '',
    price: 0,
    duration: '',
    features: [],
    status: 'active',
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

  // Gestion des fonctionnalités/avantages (features)
  const [featureInput, setFeatureInput] = useState("");
  
  const addFeature = () => {
    if (featureInput.trim()) {
      const updatedFeatures = [...localFormData.features, featureInput.trim()];
      handleLocalChange('features', updatedFeatures);
      setFeatureInput("");
    }
  };
  
  const removeFeature = (index: number) => {
    const updatedFeatures = [...localFormData.features];
    updatedFeatures.splice(index, 1);
    handleLocalChange('features', updatedFeatures);
  };

  return (
    <div className="space-y-6">
      {/* Image du service/abonnement */}
      <div>
        <Label htmlFor="image">Image d'illustration</Label>
        <div className="mt-1">
          <ImageUploader 
            currentImageUrl={localFormData.image || ''} 
            onImageUpload={handleImageUpload}
          />
          <p className="text-xs text-slate-500 mt-1">
            Image représentative du service ou abonnement
          </p>
        </div>
      </div>

      {/* Nom du service */}
      <div>
        <Label htmlFor="name">Nom du service</Label>
        <Input
          id="name"
          value={localFormData.name}
          onChange={(e) => handleLocalChange('name', e.target.value)}
          placeholder="Ex: Abonnement Étudiant"
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
          placeholder="Description du service ou de l'abonnement..."
          className="mt-1"
          rows={3}
          disabled={isSubmitting}
          required
        />
      </div>

      {/* Catégorie */}
      <div>
        <Label htmlFor="category">Catégorie</Label>
        <Select
          value={localFormData.category}
          onValueChange={(value) => handleLocalChange('category', value)}
          disabled={isSubmitting}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Sélectionner une catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Abonnement">Abonnement</SelectItem>
            <SelectItem value="Formation">Formation</SelectItem>
            <SelectItem value="Service">Service</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Prix */}
        <div>
          <Label htmlFor="price">Prix (FCFA)</Label>
          <Input
            id="price"
            type="number"
            value={localFormData.price}
            onChange={(e) => handleLocalChange('price', parseInt(e.target.value) || 0)}
            placeholder="Ex: 25000"
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
            placeholder="Ex: 1 mois, 2 heures, etc."
            className="mt-1"
            disabled={isSubmitting}
            required
          />
        </div>
      </div>

      {/* Caractéristiques / Avantages */}
      <div>
        <Label htmlFor="features">Caractéristiques / Avantages</Label>
        <div className="flex mt-1">
          <Input
            id="features"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            placeholder="Ex: Accès illimité aux machines"
            className="flex-1 mr-2"
            disabled={isSubmitting}
          />
          <button
            type="button"
            onClick={addFeature}
            className="px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700"
            disabled={isSubmitting || !featureInput.trim()}
          >
            Ajouter
          </button>
        </div>
        
        <div className="mt-3">
          {localFormData.features?.length > 0 ? (
            <ul className="space-y-2">
              {localFormData.features.map((feature: string, index: number) => (
                <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                  <span>{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-red-500 hover:text-red-700"
                    disabled={isSubmitting}
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 mt-2">
              Aucune caractéristique ajoutée. Utilisez le champ ci-dessus pour en ajouter.
            </p>
          )}
        </div>
      </div>

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
            <SelectItem value="active">Actif</SelectItem>
            <SelectItem value="draft">Brouillon</SelectItem>
            <SelectItem value="inactive">Inactif</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ServiceForm;
