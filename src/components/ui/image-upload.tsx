import React, { useRef, useState } from 'react';
import { Upload, X, Image, Loader2 } from 'lucide-react';
import { Button } from './button';
import { toast } from 'sonner';

interface ImageUploadProps {
  value?: string;
  onChange: (file: File | null, previewUrl?: string, uploadedUrl?: string) => void;
  accept?: string;
  maxSize?: number; // en MB
  className?: string;
  placeholder?: string;
  type: 'formations' | 'events' | 'gallery' | 'university' | 'fablab' | 'partners' | 'library';
  altText?: string;
  caption?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  accept = "image/*",
  maxSize = 5,
  className = "",
  placeholder = "Cliquez pour sélectionner une image",
  type,
  altText,
  caption
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(value || null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (file: File) => {
    // Vérifier la taille du fichier
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`La taille du fichier ne doit pas dépasser ${maxSize}MB`);
      return;
    }

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      toast.error('Veuillez sélectionner un fichier image valide');
      return;
    }

    // Créer une URL de prévisualisation
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    
    // Notifier le parent du changement de fichier
    onChange(file, previewUrl);
    
    toast.success('Image sélectionnée avec succès');
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept={accept}
        className="hidden"
        aria-label="Sélectionner une image"
      />
      
      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Prévisualisation"
            className="w-full h-48 object-cover rounded-lg border"
          />
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
              <span className="ml-2 text-white">Upload en cours...</span>
            </div>
          )}
          {!isUploading && (
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleClick}
                  disabled={isUploading}
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Changer
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleRemove}
                  disabled={isUploading}
                >
                  <X className="h-4 w-4 mr-1" />
                  Supprimer
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragging 
              ? 'border-crec-gold bg-crec-gold/10' 
              : 'border-gray-300 hover:border-crec-gold hover:bg-gray-50'
            }
          `}
        >
          <Image className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-sm text-gray-600 mb-2">{placeholder}</p>
          <p className="text-xs text-gray-400">
            Glissez-déposez une image ici ou cliquez pour parcourir
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Formats acceptés: JPG, PNG, GIF (max {maxSize}MB)
          </p>
        </div>
      )}
    </div>
  );
};
