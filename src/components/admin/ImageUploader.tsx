import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { XCircle, Upload, ImageIcon, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ImageUploaderProps {
  onImageUpload: (file: File) => Promise<string>;
  currentImageUrl?: string;
  label?: string;
  className?: string;
  allowedTypes?: string[];
  maxSizeMB?: number;
  aspectRatio?: string;
  width?: string;
  height?: string;
}

/**
 * Composant d'upload d'images pour les formulaires
 */
const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  currentImageUrl = '',
  label = 'Image',
  className,
  allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  maxSizeMB = 2,
  aspectRatio = '1:1',
  width = '150px',
  height = '150px',
}) => {
  const [previewUrl, setPreviewUrl] = useState<string>(currentImageUrl);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Conversion du ratio d'aspect en style CSS
  const getRatioStyle = () => {
    if (aspectRatio === 'auto') return {};
    
    const [width, height] = aspectRatio.split(':').map(Number);
    return {
      aspectRatio: `${width} / ${height}`,
    };
  };

  // Gestionnaire de changement de fichier
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation du type de fichier
    if (!allowedTypes.includes(file.type)) {
      setError(`Type de fichier non pris en charge. Types autorisés : ${allowedTypes.join(', ')}`);
      return;
    }

    // Validation de la taille du fichier
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      setError(`Fichier trop volumineux. Taille maximale : ${maxSizeMB}MB`);
      return;
    }

    try {
      setIsUploading(true);
      setError(null);
      
      // Créer une URL de prévisualisation locale
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      
      // Télécharger l'image et récupérer l'URL
      const uploadedUrl = await onImageUpload(file);
      setPreviewUrl(uploadedUrl); // Mettre à jour avec l'URL réelle si nécessaire

      return () => URL.revokeObjectURL(objectUrl);
    } catch (err) {
      console.error('Erreur lors du téléchargement de l\'image:', err);
      setError('Erreur lors du téléchargement de l\'image');
    } finally {
      setIsUploading(false);
    }
  };

  // Supprimer l'image
  const handleRemoveImage = () => {
    setPreviewUrl('');
    setError(null);
    // Vous pourriez appeler une fonction ici pour supprimer l'image du serveur
  };

  return (
    <div className={className}>
      <Label className="mb-2 block">{label}</Label>
      
      <div className="flex flex-col items-center">
        {/* Prévisualisation de l'image */}
        {previewUrl ? (
          <div className="relative" style={{ width, height }}>
            <img 
              src={previewUrl} 
              alt="Aperçu" 
              className={cn(
                "rounded-md object-cover border border-slate-200",
                isUploading ? "opacity-50" : ""
              )}
              style={{ 
                width, 
                height, 
                ...getRatioStyle() 
              }}
            />
            
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-800/20 rounded-md">
                <Loader2 className="h-8 w-8 animate-spin text-white" />
              </div>
            )}
            
            {!isUploading && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 bg-white rounded-full text-red-500 hover:text-red-700 focus:outline-none"
              >
                <XCircle className="h-6 w-6" />
                <span className="sr-only">Supprimer l'image</span>
              </button>
            )}
          </div>
        ) : (
          <div 
            className={cn(
              "flex flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 transition-colors",
              isUploading ? "opacity-50" : ""
            )}
            style={{ width, height }}
          >
            {isUploading ? (
              <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            ) : (
              <>
                <ImageIcon className="h-10 w-10 text-slate-400 mb-2" />
                <p className="text-xs text-slate-500 text-center">
                  {`${allowedTypes.join(', ')}`}
                  <br />
                  Max: {maxSizeMB}MB
                </p>
              </>
            )}
          </div>
        )}
        
        {/* Messages d'erreur */}
        {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
        
        {/* Bouton d'upload */}
        <div className="mt-4">
          <input 
            id="image-upload" 
            type="file" 
            accept={allowedTypes.join(',')}
            onChange={handleFileChange}
            className="sr-only"
            disabled={isUploading}
          />
          <Label 
            htmlFor="image-upload"
            className={cn(
              "cursor-pointer inline-flex items-center justify-center gap-2 rounded-md bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-950",
              isUploading && "opacity-50 cursor-not-allowed"
            )}
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Téléchargement...
              </>
            ) : previewUrl ? (
              <>
                <Upload className="h-4 w-4" />
                Changer l'image
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Télécharger une image
              </>
            )}
          </Label>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
