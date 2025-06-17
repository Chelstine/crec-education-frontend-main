import { DocumentValidationRule } from '@/types';

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface UploadResult {
  success: boolean;
  fileId?: string;
  fileName?: string;
  fileUrl?: string;
  error?: string;
  validationErrors?: string[];
}

export interface FileValidationResult {
  isValid: boolean;
  errors: string[];
}

export class FileUploadService {
  private static instance: FileUploadService;
  private uploadQueue: Map<string, AbortController> = new Map();

  public static getInstance(): FileUploadService {
    if (!FileUploadService.instance) {
      FileUploadService.instance = new FileUploadService();
    }
    return FileUploadService.instance;
  }

  /**
   * Validate a file against the specified rules
   */
  validateFile(file: File, rules: DocumentValidationRule): FileValidationResult {
    const errors: string[] = [];

    // Check file size
    const fileSizeInKB = file.size / 1024;
    if (rules.minSize !== undefined && fileSizeInKB < rules.minSize) {
      errors.push(`Le fichier est trop petit. Taille minimale: ${rules.minSize} KB`);
    }
    if (rules.maxSize !== undefined && fileSizeInKB > rules.maxSize) {
      errors.push(`Le fichier est trop volumineux. Taille maximale: ${rules.maxSize} KB`);
    }

    // Check file extension
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!rules.allowedExtensions.includes(fileExtension)) {
      errors.push(`Format de fichier non autorisé. Formats acceptés: ${rules.allowedExtensions.join(', ')}`);
    }

    // Additional validation for images
    if (rules.allowedExtensions.some(ext => ['.jpg', '.jpeg', '.png', '.gif'].includes(ext))) {
      if (!file.type.startsWith('image/')) {
        errors.push('Le fichier doit être une image valide');
      }
    }

    // Additional validation for PDFs
    if (rules.allowedExtensions.includes('.pdf')) {
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        errors.push('Le fichier doit être un PDF valide');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Upload a file with progress tracking
   */
  async uploadFile(
    file: File,
    documentType: string,
    applicationId: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<UploadResult> {
    const uploadId = `${applicationId}-${documentType}-${Date.now()}`;
    const abortController = new AbortController();
    this.uploadQueue.set(uploadId, abortController);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('documentType', documentType);
      formData.append('applicationId', applicationId);

      // Simulate file upload with progress (in real app, this would be actual API call)
      const result = await this.simulateUpload(file, formData, onProgress, abortController.signal);
      
      this.uploadQueue.delete(uploadId);
      return result;

    } catch (error) {
      this.uploadQueue.delete(uploadId);
      
      if (error instanceof Error && error.name === 'AbortError') {
        return {
          success: false,
          error: 'Upload annulé'
        };
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur lors du téléchargement'
      };
    }
  }

  /**
   * Upload multiple files
   */
  async uploadMultipleFiles(
    files: { file: File; documentType: string }[],
    applicationId: string,
    onProgress?: (documentType: string, progress: UploadProgress) => void
  ): Promise<Map<string, UploadResult>> {
    const results = new Map<string, UploadResult>();

    // Upload files in parallel
    const uploadPromises = files.map(async ({ file, documentType }) => {
      const result = await this.uploadFile(
        file,
        documentType,
        applicationId,
        onProgress ? (progress) => onProgress(documentType, progress) : undefined
      );
      results.set(documentType, result);
      return { documentType, result };
    });

    await Promise.all(uploadPromises);
    return results;
  }

  /**
   * Cancel an ongoing upload
   */
  cancelUpload(uploadId: string): boolean {
    const controller = this.uploadQueue.get(uploadId);
    if (controller) {
      controller.abort();
      this.uploadQueue.delete(uploadId);
      return true;
    }
    return false;
  }

  /**
   * Cancel all ongoing uploads
   */
  cancelAllUploads(): void {
    this.uploadQueue.forEach((controller) => {
      controller.abort();
    });
    this.uploadQueue.clear();
  }

  /**
   * Delete an uploaded file
   */
  async deleteFile(fileId: string): Promise<boolean> {
    try {
      // Simulate API call to delete file
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In real implementation, this would call the API:
      // const response = await fetch(`/api/files/${fileId}`, { method: 'DELETE' });
      // return response.ok;
      
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  }

  /**
   * Get file download URL
   */
  async getFileUrl(fileId: string): Promise<string | null> {
    try {
      // Simulate API call to get download URL
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // In real implementation:
      // const response = await fetch(`/api/files/${fileId}/url`);
      // const data = await response.json();
      // return data.url;
      
      return `https://api.crec.cm/files/${fileId}/download`;
    } catch (error) {
      console.error('Error getting file URL:', error);
      return null;
    }
  }

  /**
   * Generate file thumbnail (for images)
   */
  async generateThumbnail(file: File, maxWidth = 200, maxHeight = 200): Promise<string | null> {
    if (!file.type.startsWith('image/')) {
      return null;
    }

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            resolve(null);
            return;
          }

          // Calculate new dimensions
          let { width, height } = img;
          if (width > height) {
            if (width > maxWidth) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = (width * maxHeight) / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          // Draw resized image
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert to data URL
          resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  }

  /**
   * Extract file metadata
   */
  getFileMetadata(file: File) {
    return {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      lastModifiedDate: new Date(file.lastModified),
      extension: file.name.split('.').pop()?.toLowerCase() || '',
      sizeFormatted: this.formatFileSize(file.size)
    };
  }

  /**
   * Format file size in human readable format
   */
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Check if file type is supported
   */
  isSupportedFileType(file: File, allowedTypes: string[]): boolean {
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    return allowedTypes.includes(fileExtension);
  }

  /**
   * Simulate file upload with progress (for demo purposes)
   */
  private async simulateUpload(
    file: File,
    formData: FormData,
    onProgress?: (progress: UploadProgress) => void,
    signal?: AbortSignal
  ): Promise<UploadResult> {
    const totalSize = file.size;
    let uploadedSize = 0;

    // Simulate upload progress
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (signal?.aborted) {
          clearInterval(interval);
          reject(new Error('AbortError'));
          return;
        }

        uploadedSize += Math.min(totalSize * 0.1, totalSize - uploadedSize);
        const percentage = Math.round((uploadedSize / totalSize) * 100);

        if (onProgress) {
          onProgress({
            loaded: uploadedSize,
            total: totalSize,
            percentage
          });
        }

        if (uploadedSize >= totalSize) {
          clearInterval(interval);
          
          // Simulate successful upload
          setTimeout(() => {
            resolve({
              success: true,
              fileId: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              fileName: file.name,
              fileUrl: `https://api.crec.cm/files/download/${file.name}`
            });
          }, 500);
        }
      }, 200);
    });
  }

  /**
   * Validate file before upload
   */
  async validateAndPrepareFile(
    file: File,
    documentType: string,
    validationRules: DocumentValidationRule
  ): Promise<{ isValid: boolean; errors: string[]; preparedFile?: File }> {
    const validation = this.validateFile(file, validationRules);
    
    if (!validation.isValid) {
      return {
        isValid: false,
        errors: validation.errors
      };
    }

    // Additional preparation for specific file types
    let preparedFile = file;

    // For images, you might want to compress them
    if (file.type.startsWith('image/') && file.size > 1024 * 1024) { // > 1MB
      try {
        preparedFile = await this.compressImage(file);
      } catch (error) {
        console.warn('Failed to compress image, using original:', error);
      }
    }

    return {
      isValid: true,
      errors: [],
      preparedFile
    };
  }

  /**
   * Compress image file
   */
  private async compressImage(file: File, quality = 0.8): Promise<File> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        if (!ctx) {
          resolve(file);
          return;
        }

        // Calculate new dimensions (max 1920x1080)
        let { width, height } = img;
        const maxWidth = 1920;
        const maxHeight = 1080;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now()
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          },
          file.type,
          quality
        );
      };

      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  }

  // Méthodes spécifiques pour les médias FabLab
  async uploadProjectImage(
    file: File,
    projectId: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<UploadResult> {
    // Validation spécifique pour les images de projet
    const validation = this.validateProjectImage(file);
    if (!validation.isValid) {
      return {
        success: false,
        error: 'Fichier invalide',
        validationErrors: validation.errors
      };
    }

    const uploadId = `project-${projectId}-image-${Date.now()}`;
    const abortController = new AbortController();
    this.uploadQueue.set(uploadId, abortController);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'project-image');
      formData.append('projectId', projectId);

      const result = await this.simulateMediaUpload(file, formData, onProgress, abortController.signal);
      
      this.uploadQueue.delete(uploadId);
      return result;

    } catch (error) {
      this.uploadQueue.delete(uploadId);
      if (error instanceof Error) {
        return {
          success: false,
          error: `Erreur lors de l'upload: ${error.message}`
        };
      }
      return {
        success: false,
        error: 'Erreur inconnue lors de l\'upload'
      };
    }
  }

  async uploadProjectVideo(
    file: File,
    projectId: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<UploadResult> {
    // Validation spécifique pour les vidéos de projet
    const validation = this.validateProjectVideo(file);
    if (!validation.isValid) {
      return {
        success: false,
        error: 'Fichier invalide',
        validationErrors: validation.errors
      };
    }

    const uploadId = `project-${projectId}-video-${Date.now()}`;
    const abortController = new AbortController();
    this.uploadQueue.set(uploadId, abortController);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'project-video');
      formData.append('projectId', projectId);

      const result = await this.simulateMediaUpload(file, formData, onProgress, abortController.signal);
      
      this.uploadQueue.delete(uploadId);
      return result;

    } catch (error) {
      this.uploadQueue.delete(uploadId);
      if (error instanceof Error) {
        return {
          success: false,
          error: `Erreur lors de l'upload: ${error.message}`
        };
      }
      return {
        success: false,
        error: 'Erreur inconnue lors de l\'upload'
      };
    }
  }

  private validateProjectImage(file: File): FileValidationResult {
    const errors: string[] = [];
    
    // Vérification du type de fichier
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      errors.push('Format de fichier non supporté. Utilisez JPG, PNG ou WebP.');
    }

    // Vérification de la taille (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      errors.push('Le fichier est trop volumineux. Taille maximum: 5MB.');
    }

    // Vérification du nom de fichier
    if (file.name.length > 100) {
      errors.push('Le nom du fichier est trop long (maximum 100 caractères).');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private validateProjectVideo(file: File): FileValidationResult {
    const errors: string[] = [];
    
    // Vérification du type de fichier
    const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
    if (!allowedTypes.includes(file.type)) {
      errors.push('Format de fichier non supporté. Utilisez MP4, WebM ou MOV.');
    }

    // Vérification de la taille (50MB max)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      errors.push('Le fichier est trop volumineux. Taille maximum: 50MB.');
    }

    // Vérification du nom de fichier
    if (file.name.length > 100) {
      errors.push('Le nom du fichier est trop long (maximum 100 caractères).');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  private async simulateMediaUpload(
    file: File,
    formData: FormData,
    onProgress?: (progress: UploadProgress) => void,
    signal?: AbortSignal
  ): Promise<UploadResult> {
    return new Promise((resolve, reject) => {
      let loaded = 0;
      const total = file.size;
      const chunkSize = Math.max(1024, Math.floor(total / 100)); // Au moins 1KB par chunk

      const interval = setInterval(() => {
        if (signal?.aborted) {
          clearInterval(interval);
          reject(new Error('Upload annulé'));
          return;
        }

        loaded = Math.min(loaded + chunkSize, total);
        const percentage = Math.round((loaded / total) * 100);

        if (onProgress) {
          onProgress({ loaded, total, percentage });
        }

        if (loaded >= total) {
          clearInterval(interval);
          
          // Simuler une réponse réussie avec URL de fichier
          const timestamp = Date.now();
          const extension = file.name.split('.').pop();
          const type = formData.get('type') as string;
          const projectId = formData.get('projectId') as string;
          
          let fileUrl: string;
          if (type === 'project-image') {
            fileUrl = `/img/projects/${projectId}-${timestamp}.${extension}`;
          } else {
            fileUrl = `/videos/projects/${projectId}-${timestamp}.${extension}`;
          }

          resolve({
            success: true,
            fileId: `${type}-${timestamp}`,
            fileName: file.name,
            fileUrl: fileUrl
          });
        }
      }, 50); // Update progress every 50ms
    });
  }
}

export default FileUploadService;
