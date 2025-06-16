import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'date' | 'file' | 'time' | 'checkbox';
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

interface AdminFormProps {
  title: string;
  description?: string;
  fields: FormField[];
  data: Record<string, any>;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Record<string, any>) => void;
  isLoading?: boolean;
  submitLabel?: string;
  customContent?: React.ReactNode;
}

export const AdminForm: React.FC<AdminFormProps> = ({
  title,
  description,
  fields,
  data,
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  submitLabel = 'Enregistrer',
  customContent,
}) => {
  const [formData, setFormData] = React.useState(data);

  React.useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const renderField = (field: FormField) => {
    const value = formData[field.name] || '';

    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            required={field.required}
            className="responsive-input min-h-[80px] md:min-h-[100px]"
          />
        );
      
      case 'select':
        return (
          <Select
            value={value}
            onValueChange={(value) => handleChange(field.name, value)}
          >
            <SelectTrigger className="responsive-input">
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent className="responsive-max-h-60 overflow-auto">
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'date':
        return (
          <Input
            type="date"
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            required={field.required}
            className="responsive-input"
          />
        );
      
      case 'file':
        return (
          <Input
            type="file"
            onChange={(e) => handleChange(field.name, e.target.files?.[0])}
            required={field.required}
            className="responsive-input"
          />
        );
      
      case 'time':
        return (
          <Input
            type="time"
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            required={field.required}
            className="responsive-input"
          />
        );
      
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={field.name}
              checked={value || false}
              onChange={(e) => handleChange(field.name, e.target.checked)}
              className="responsive-checkbox"
            />
            <label htmlFor={field.name} className="responsive-text-body peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {field.label}
            </label>
          </div>
        );
      
      default:
        return (
          <Input
            type={field.type}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            required={field.required}
            min={field.validation?.min}
            max={field.validation?.max}
            pattern={field.validation?.pattern}
            className="responsive-input"
          />
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="responsive-max-w-2xl responsive-max-h-80vh overflow-y-auto responsive-p-4">
        <DialogHeader className="responsive-pb-4">
          <DialogTitle className="responsive-title text-lg md:text-xl">{title}</DialogTitle>
          {description && (
            <DialogDescription className="responsive-text-body">{description}</DialogDescription>
          )}
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="responsive-space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="responsive-space-y-2">
              {field.type !== 'checkbox' && (
                <Label htmlFor={field.name} className="responsive-label">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
              )}
              <div className="w-full">
                {renderField(field)}
              </div>
            </div>
          ))}
          
          {customContent && (
            <div className="responsive-mt-4 responsive-pt-4 border-t">
              {customContent}
            </div>
          )}
          
          <DialogFooter className="responsive-flex-col sm:responsive-flex-row responsive-gap-2 responsive-pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="responsive-btn w-full sm:w-auto">
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading} className="responsive-btn-primary w-full sm:w-auto">
              {isLoading ? 'Enregistrement...' : submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
