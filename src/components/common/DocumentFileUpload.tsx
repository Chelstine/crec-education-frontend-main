import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Upload,
  File,
  Image,
  FileText,
  X,
  Check,
  AlertCircle,
  Download,
  Eye,
  Trash2,
  RotateCcw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import FileUploadService, { UploadProgress, UploadResult } from '@/services/FileUploadService';
import { DocumentType, DocumentValidationRule } from '@/types';

interface FileUploadProps {
  documentType: DocumentType;
  applicationId?: string;
  maxFiles?: number;
  className?: string;
  onUploadSuccess?: (result: UploadResult) => void;
  onUploadError?: (error: string) => void;
  onFileRemove?: (fileId: string) => void;
  disabled?: boolean;
  existingFiles?: Array<{
    id: string;
    name: string;
    size: number;
    url?: string;
    status: 'uploaded' | 'pending' | 'approved' | 'rejected';
  }>;
}

interface FileUploadState {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  result?: UploadResult;
  thumbnail?: string;
  id: string;
}

const DocumentFileUpload: React.FC<FileUploadProps> = ({
  documentType,
  applicationId = 'temp',
  maxFiles = 1,
  className,
  onUploadSuccess,
  onUploadError,
  onFileRemove,
  disabled = false,
  existingFiles = []
}) => {
  const [uploadStates, setUploadStates] = useState<FileUploadState[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileUploadService = FileUploadService.getInstance();

  const totalFiles = uploadStates.length + existingFiles.length;
  const canUploadMore = totalFiles < maxFiles;

  // Handle file selection
  const handleFiles = useCallback(async (files: FileList | File[]) => {
    if (disabled) return;

    const fileArray = Array.from(files);
    const remainingSlots = maxFiles - totalFiles;
    const filesToProcess = fileArray.slice(0, remainingSlots);

    for (const file of filesToProcess) {
      const fileId = `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Validate file
      const validation = await fileUploadService.validateAndPrepareFile(
        file,
        documentType.id,
        documentType.validationRules
      );

      if (!validation.isValid) {
        onUploadError?.(validation.errors.join(', '));
        continue;
      }

      const preparedFile = validation.preparedFile || file;

      // Generate thumbnail for images
      let thumbnail: string | undefined;
      if (preparedFile.type.startsWith('image/')) {
        thumbnail = await fileUploadService.generateThumbnail(preparedFile) || undefined;
      }

      // Add to upload queue
      const newUploadState: FileUploadState = {
        file: preparedFile,
        progress: 0,
        status: 'pending',
        thumbnail,
        id: fileId
      };

      setUploadStates(prev => [...prev, newUploadState]);

      // Start upload
      startUpload(fileId, preparedFile);
    }
  }, [documentType, applicationId, maxFiles, totalFiles, disabled, onUploadError]);

  // Start file upload
  const startUpload = async (fileId: string, file: File) => {
    setUploadStates(prev =>
      prev.map(state =>
        state.id === fileId
          ? { ...state, status: 'uploading' }
          : state
      )
    );

    try {
      const result = await fileUploadService.uploadFile(
        file,
        documentType.id,
        applicationId,
        (progress: UploadProgress) => {
          setUploadStates(prev =>
            prev.map(state =>
              state.id === fileId
                ? { ...state, progress: progress.percentage }
                : state
            )
          );
        }
      );

      setUploadStates(prev =>
        prev.map(state =>
          state.id === fileId
            ? {
                ...state,
                status: result.success ? 'success' : 'error',
                result,
                progress: result.success ? 100 : state.progress
              }
            : state
        )
      );

      if (result.success) {
        onUploadSuccess?.(result);
      } else {
        onUploadError?.(result.error || 'Erreur lors du téléchargement');
      }
    } catch (error) {
      setUploadStates(prev =>
        prev.map(state =>
          state.id === fileId
            ? { ...state, status: 'error' }
            : state
        )
      );
      onUploadError?.(error instanceof Error ? error.message : 'Erreur inconnue');
    }
  };

  // Handle drag and drop
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  // Handle file input change
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  }, [handleFiles]);

  // Remove uploaded file
  const removeFile = (fileId: string, isExisting = false) => {
    if (isExisting) {
      onFileRemove?.(fileId);
    } else {
      setUploadStates(prev => prev.filter(state => state.id !== fileId));
    }
    setShowDeleteDialog(null);
  };

  // Retry failed upload
  const retryUpload = (fileId: string) => {
    const uploadState = uploadStates.find(state => state.id === fileId);
    if (uploadState) {
      startUpload(fileId, uploadState.file);
    }
  };

  // Get file icon
  const getFileIcon = (fileName: string, fileType?: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    if (fileType?.startsWith('image/') || ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) {
      return <Image className="h-5 w-5" />;
    } else if (extension === 'pdf' || fileType === 'application/pdf') {
      return <FileText className="h-5 w-5" />;
    } else {
      return <File className="h-5 w-5" />;
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    const variants = {
      uploaded: { variant: 'secondary', text: 'Téléchargé' },
      pending: { variant: 'warning', text: 'En attente' },
      approved: { variant: 'success', text: 'Approuvé' },
      rejected: { variant: 'destructive', text: 'Rejeté' },
      uploading: { variant: 'default', text: 'Envoi...' },
      success: { variant: 'success', text: 'Succès' },
      error: { variant: 'destructive', text: 'Erreur' }
    } as const;

    const config = variants[status as keyof typeof variants] || variants.uploaded;
    
    return (
      <Badge variant={config.variant as any} className="text-xs">
        {config.text}
      </Badge>
    );
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Document Type Info */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-gray-900">{documentType.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{documentType.description}</p>
          {documentType.isRequired && (
            <Badge variant="destructive" className="text-xs mt-2">
              Obligatoire
            </Badge>
          )}
        </div>
        <div className="text-right text-sm text-gray-500">
          <p>Formats: {documentType.allowedFormats.join(', ')}</p>
          <p>Taille max: {documentType.maxSizeInMB} MB</p>
        </div>
      </div>

      {/* Upload Zone */}
      {canUploadMore && !disabled && (
        <Card
          className={cn(
            'border-2 border-dashed transition-colors cursor-pointer hover:border-blue-400',
            dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300',
            'relative'
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <CardContent className="p-8 text-center">
            <Upload className={cn(
              'h-12 w-12 mx-auto mb-4',
              dragActive ? 'text-blue-500' : 'text-gray-400'
            )} />
            <p className="text-lg font-medium text-gray-900 mb-2">
              {dragActive ? 'Déposez vos fichiers ici' : 'Téléchargez vos documents'}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Glissez-déposez ou cliquez pour sélectionner des fichiers
            </p>
            <Button variant="outline" size="sm" type="button">
              Choisir des fichiers
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple={maxFiles > 1}
              accept={documentType.allowedFormats.map(format => `.${format.toLowerCase()}`).join(',')}
              onChange={handleInputChange}
              className="hidden"
            />
          </CardContent>
        </Card>
      )}

      {/* Existing Files */}
      {existingFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Fichiers existants</h4>
          {existingFiles.map((file) => (
            <Card key={file.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getFileIcon(file.name)}
                  <div>
                    <p className="font-medium text-sm">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {fileUploadService.formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(file.status)}
                  <div className="flex gap-1">
                    {file.url && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(file.url, '_blank')}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    {file.url && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = file.url!;
                          link.download = file.name;
                          link.click();
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowDeleteDialog(file.id)}
                      disabled={disabled}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Upload Progress */}
      {uploadStates.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Téléchargements en cours</h4>
          {uploadStates.map((uploadState) => (
            <Card key={uploadState.id} className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {uploadState.thumbnail ? (
                      <img
                        src={uploadState.thumbnail}
                        alt="Aperçu"
                        className="w-10 h-10 object-cover rounded"
                      />
                    ) : (
                      getFileIcon(uploadState.file.name, uploadState.file.type)
                    )}
                    <div>
                      <p className="font-medium text-sm">{uploadState.file.name}</p>
                      <p className="text-xs text-gray-500">
                        {fileUploadService.formatFileSize(uploadState.file.size)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(uploadState.status)}
                    <div className="flex gap-1">
                      {uploadState.status === 'error' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => retryUpload(uploadState.id)}
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeFile(uploadState.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                {uploadState.status === 'uploading' && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Téléchargement...</span>
                      <span>{uploadState.progress}%</span>
                    </div>
                    <Progress value={uploadState.progress} className="h-2" />
                  </div>
                )}

                {/* Success message */}
                {uploadState.status === 'success' && (
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <Check className="h-4 w-4" />
                    <span>Téléchargement réussi</span>
                  </div>
                )}

                {/* Error message */}
                {uploadState.status === 'error' && (
                  <div className="flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{uploadState.result?.error || 'Erreur de téléchargement'}</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Validation Rules Info */}
      {documentType.validationRules && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h4 className="font-medium text-blue-900 mb-2">Exigences du document</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Taille: {documentType.validationRules.minSize} - {documentType.validationRules.maxSize} KB</li>
              <li>• Formats acceptés: {documentType.validationRules.allowedExtensions.join(', ')}</li>
              {documentType.validationRules.requiresVerification && (
                <li>• Ce document nécessite une vérification manuelle</li>
              )}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog !== null} onOpenChange={() => setShowDeleteDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer le fichier</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer ce fichier ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => showDeleteDialog && removeFile(showDeleteDialog, true)}
              className="bg-red-600 hover:bg-red-700"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DocumentFileUpload;
