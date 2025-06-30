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
import { ImageUploader } from '@/components/admin';
import { Check, ChevronsUpDown } from "lucide-react"
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils";

const STATUS = [
  { value: 'active', label: 'Actif' },
  { value: 'draft', label: 'Brouillon' },
  { value: 'inactive', label: 'Inactif' },
];

interface CertificateFormProps {
  formData: any;
  handleChange: (e: any) => void;
  isSubmitting: boolean;
  availableFormations: Array<{ id: string; title: string }>;
}

const CertificateForm: React.FC<CertificateFormProps> = ({ 
  formData, 
  handleChange,
  isSubmitting,
  availableFormations = [] 
}) => {
  const [open, setOpen] = useState(false);
  
  // Fonction pour gérer les valeurs des select standards
  const handleSelectChange = (name: string, value: string) => {
    handleChange({ 
      target: { 
        name, 
        value,
        type: 'select'
      } 
    });
  };

  // Fonction pour gérer la sélection multiple des formations
  const handleFormationsChange = (formationId: string) => {
    // Clone le tableau actuel des formations ou initialise un tableau vide
    const currentFormations = [...(formData.formations || [])];
    
    // Recherche si la formation est déjà sélectionnée
    const index = currentFormations.indexOf(formationId);
    
    // Si déjà sélectionnée, la retirer, sinon l'ajouter
    if (index >= 0) {
      currentFormations.splice(index, 1);
    } else {
      currentFormations.push(formationId);
    }
    
    // Mettre à jour le formData avec la nouvelle liste
    handleChange({
      target: {
        name: 'formations',
        value: currentFormations,
        type: 'array'
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
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Titre de la certification*</Label>
        <Input
          id="title"
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
          placeholder="Titre de la certification"
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
          placeholder="Description détaillée de la certification"
          className="min-h-[100px]"
          disabled={isSubmitting}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="formations" className="mb-1 block">Formations associées*</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              disabled={isSubmitting}
              className="w-full justify-between"
            >
              {formData.formations?.length 
                ? `${formData.formations.length} formation(s) sélectionnée(s)`
                : "Sélectionner les formations"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Rechercher une formation..." />
              <CommandEmpty>Aucune formation trouvée.</CommandEmpty>
              <CommandGroup>
                <ScrollArea className="h-72">
                  {availableFormations.map((formation) => (
                    <CommandItem
                      key={formation.id}
                      value={formation.id}
                      onSelect={() => handleFormationsChange(formation.id)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          formData.formations?.includes(formation.id) 
                            ? "opacity-100" 
                            : "opacity-0"
                        )}
                      />
                      {formation.title}
                    </CommandItem>
                  ))}
                </ScrollArea>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        
        {/* Afficher les formations sélectionnées */}
        {formData.formations?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.formations.map(id => {
              const formation = availableFormations.find(f => f.id === id);
              return (
                <Badge key={id} variant="secondary" className="cursor-pointer" onClick={() => handleFormationsChange(id)}>
                  {formation ? formation.title : id}
                </Badge>
              );
            })}
          </div>
        )}
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
            placeholder="250000"
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
            placeholder="Ex: 6 mois"
            disabled={isSubmitting}
            required
          />
        </div>
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
          label="Image de la certification"
          aspectRatio="16:9"
          width="100%"
          height="200px"
        />
      </div>
    </div>
  );
};

export default CertificateForm;
