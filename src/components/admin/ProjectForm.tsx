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
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

interface ProjectFormProps {
  formData: any;
  handleChange: (field: string, value: any) => void;
  isSubmitting: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ formData, handleChange, isSubmitting }) => {
  const [localFormData, setLocalFormData] = useState(formData || {
    title: '',
    description: '',
    author: '',
    category: '',
    images: [],
    files: [],
    status: 'draft'
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [projectFile, setProjectFile] = useState<File | null>(null);

  const handleLocalChange = (field: string, value: any) => {
    const updatedForm = { ...localFormData, [field]: value };
    setLocalFormData(updatedForm);
    handleChange(field, value);
  };

  const handleImageUpload = async (file: File) => {
    // Dans une implémentation réelle, vous téléchargeriez le fichier vers un serveur
    // et obtiendriez une URL à partir de la réponse
    setImageFile(file);
    const fakeUrl = URL.createObjectURL(file);
    const updatedImages = [...localFormData.images, fakeUrl];
    handleLocalChange('images', updatedImages);
    return fakeUrl;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProjectFile(file);
      const updatedFiles = [...localFormData.files, file.name];
      handleLocalChange('files', updatedFiles);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = [...localFormData.images];
    updatedImages.splice(index, 1);
    handleLocalChange('images', updatedImages);
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...localFormData.files];
    updatedFiles.splice(index, 1);
    handleLocalChange('files', updatedFiles);
  };

  return (
    <div className="space-y-6">
      {/* Titre du projet */}
      <div>
        <Label htmlFor="title">Titre du projet</Label>
        <Input
          id="title"
          value={localFormData.title}
          onChange={(e) => handleLocalChange('title', e.target.value)}
          placeholder="Ex: Boîtier Arduino Personnalisé"
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
          placeholder="Description détaillée du projet..."
          className="mt-1"
          rows={4}
          disabled={isSubmitting}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Auteur */}
        <div>
          <Label htmlFor="author">Auteur</Label>
          <Input
            id="author"
            value={localFormData.author}
            onChange={(e) => handleLocalChange('author', e.target.value)}
            placeholder="Nom de l'auteur"
            className="mt-1"
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
              <SelectItem value="iot">IoT & Connecté</SelectItem>
              <SelectItem value="3d">Impression 3D</SelectItem>
              <SelectItem value="electronics">Électronique</SelectItem>
              <SelectItem value="automation">Automatisation</SelectItem>
              <SelectItem value="lifestyle">Lifestyle</SelectItem>
              <SelectItem value="education">Éducation</SelectItem>
              <SelectItem value="other">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Images du projet */}
      <div>
        <Label className="block mb-2">Images du projet</Label>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {localFormData.images.map((image: string, index: number) => (
            <div key={index} className="relative group">
              <img 
                src={image} 
                alt={`Image ${index + 1}`} 
                className="w-24 h-24 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          
          <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
            <div className="flex items-center justify-center w-full h-full">
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => {
                  // Simuler un clic sur un input file caché
                  const fileInput = document.createElement('input');
                  fileInput.type = 'file';
                  fileInput.accept = 'image/*';
                  fileInput.onchange = async (e: any) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      await handleImageUpload(file);
                    }
                  };
                  fileInput.click();
                }}
              >
                <Plus size={20} />
              </Button>
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-500">
          Ajoutez des images pour illustrer le projet
        </p>
      </div>

      {/* Fichiers du projet */}
      <div>
        <Label className="block mb-2">Fichiers du projet</Label>
        
        <div className="space-y-2 mb-4">
          {localFormData.files.map((file: string, index: number) => (
            <div key={index} className="flex items-center justify-between p-2 border rounded-md">
              <span className="text-sm truncate max-w-[80%]">{file}</span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          
          <div>
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 flex items-center justify-center">
                <span className="flex items-center text-sm text-gray-500">
                  <Plus size={16} className="mr-2" />
                  Ajouter un fichier
                </span>
              </div>
              <input
                id="file-upload"
                type="file"
                onChange={handleFileUpload}
                className="sr-only"
                disabled={isSubmitting}
              />
            </label>
          </div>
        </div>
        <p className="text-xs text-slate-500">
          Ajoutez des fichiers STL, SVG, PDF ou autres pour le projet
        </p>
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
            <SelectItem value="published">Publié</SelectItem>
            <SelectItem value="featured">En vedette</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProjectForm;
