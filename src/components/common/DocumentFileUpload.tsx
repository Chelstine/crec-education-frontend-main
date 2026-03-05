// src/components/common/DocumentFileUpload.tsx
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X } from "lucide-react";

interface DocumentFileUploadProps {
  onFileChange: (file: File | null) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  description?: string;
  disabled?: boolean;
}

export const DocumentFileUpload: React.FC<DocumentFileUploadProps> = ({
  onFileChange,
  accept = { '*': ['*'] },
  maxSize = 5 * 1024 * 1024,
  description,
  disabled = false
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setError('');

    if (file) {
      if (file.size > maxSize) {
        setError(`Le fichier dépasse la taille maximale de ${Math.round(maxSize / 1024 / 1024)}MB`);
        return;
      }
      setSelectedFile(file);
      onFileChange(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    onFileChange(null);
    setError('');
  };

  return (
    <div className="space-y-2">
      {!selectedFile ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Cliquez pour télécharger un fichier
              </span>
              <Input
                id="file-upload"
                type="file"
                className="sr-only"
                onChange={handleFileSelect}
                accept={Object.keys(accept).join(',')}
                disabled={disabled}
              />
            </label>
            {description && (
              <p className="mt-1 text-xs text-gray-500">{description}</p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
          <div className="flex items-center space-x-3">
            <FileText className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm font-medium">{selectedFile.name}</p>
              <p className="text-xs text-gray-500">
                {Math.round(selectedFile.size / 1024)} KB
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={removeFile}
            disabled={disabled}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};