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
import { 
  Card,
  CardContent
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface CertificateFormProps {
  formData: any;
  handleChange: (field: string, value: any) => void;
  isSubmitting: boolean;
  availableFormations?: any[];
}

const CertificateForm: React.FC<CertificateFormProps> = ({ formData, handleChange, isSubmitting, availableFormations = [] }) => {
  const [localFormData, setLocalFormData] = useState(formData || {
    title: '',
    description: '',
    formations: [],
    price: 0,
    duration: '',
    status: 'draft',
    image: ''
  });

  const [selectedFormation, setSelectedFormation] = useState('');

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

  const addFormation = () => {
    if (!selectedFormation || localFormData.formations.includes(selectedFormation)) return;
    const updatedFormations = [...localFormData.formations, selectedFormation];
    handleLocalChange('formations', updatedFormations);
    setSelectedFormation('');
  };

  const removeFormation = (formationId: string) => {
    const updatedFormations = localFormData.formations.filter((id: string) => id !== formationId);
    handleLocalChange('formations', updatedFormations);
  };

  const getFormationById = (id: string) => {
    return availableFormations.find(formation => formation.id === id) || { title: 'Formation inconnue' };
  };

  return (
    <div className="space-y-6">
      {/* Image du certificat */}
      <div>
        <Label htmlFor="image">Image du certificat</Label>
        <div className="mt-1">
          <ImageUploader 
            currentImageUrl={localFormData.image || ''} 
            onImageUpload={handleImageUpload}
          />
          <p className="text-xs text-slate-500 mt-1">
            Image représentative du certificat (format recommandé: 16:9, min 1200x675px)
          </p>
        </div>
      </div>

      {/* Titre du certificat */}
      <div>
        <Label htmlFor="title">Titre du certificat</Label>
        <Input
          id="title"
          value={localFormData.title}
          onChange={(e) => handleLocalChange('title', e.target.value)}
          placeholder="Ex: Certificat en Communication Professionnelle"
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
          placeholder="Description détaillée du certificat..."
          className="mt-1"
          rows={4}
          disabled={isSubmitting}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Prix */}
        <div>
          <Label htmlFor="price">Prix (FCFA)</Label>
          <Input
            id="price"
            type="number"
            value={localFormData.price}
            onChange={(e) => handleLocalChange('price', Number(e.target.value))}
            placeholder="Ex: 300000"
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
            placeholder="Ex: 3 mois"
            className="mt-1"
            disabled={isSubmitting}
            required
          />
        </div>

        {/* Statut */}
        <div className="md:col-span-2">
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
      
      {/* Formations associées */}
      <div>
        <Label htmlFor="formations">Formations associées</Label>
        <div className="mt-1 flex space-x-2">
          <Select
            value={selectedFormation}
            onValueChange={(value) => setSelectedFormation(value)}
            disabled={isSubmitting}
          >
            <SelectTrigger id="formation-select" className="flex-1">
              <SelectValue placeholder="Sélectionnez une formation" />
            </SelectTrigger>
            <SelectContent>
              {availableFormations.map((formation) => (
                <SelectItem key={formation.id} value={formation.id}>
                  {formation.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button 
            type="button" 
            onClick={addFormation}
            disabled={isSubmitting || !selectedFormation}
          >
            Ajouter
          </Button>
        </div>
        
        {/* Liste des formations associées */}
        <div className="mt-4 space-y-2">
          {localFormData.formations.length === 0 ? (
            <p className="text-sm text-slate-500">Aucune formation associée à ce certificat.</p>
          ) : (
            localFormData.formations.map((formationId: string) => {
              const formation = getFormationById(formationId);
              return (
                <Card key={formationId} className="overflow-hidden">
                  <CardContent className="p-3 flex justify-between items-center">
                    <span>{formation.title}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeFormation(formationId)}
                      disabled={isSubmitting}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificateForm;
