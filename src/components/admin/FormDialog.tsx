import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { Loader2 } from 'lucide-react';

export interface FormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  onSubmit: (data: any) => Promise<void>;
  submitLabel?: string;
  cancelLabel?: string;
  children: React.ReactNode;
  initialData?: any;
  isEdit?: boolean;
}

/**
 * Composant de boîte de dialogue pour les formulaires CRUD
 */
const FormDialog: React.FC<FormDialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  onSubmit,
  submitLabel = 'Enregistrer',
  cancelLabel = 'Annuler',
  children,
  initialData = {},
  isEdit = false,
}) => {
  const [formData, setFormData] = useState<any>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mettre à jour le formulaire quand initialData change
  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);
  
  // Gestionnaire de changement pour les champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Gérer les champs spéciaux
    if (type === 'number') {
      setFormData((prev: any) => ({
        ...prev,
        [name]: value === '' ? '' : Number(value),
      }));
    } else if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData((prev: any) => ({
        ...prev,
        [name]: checkbox.checked,
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      // Vous pourriez ajouter une notification d'erreur ici
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Props à passer aux enfants
  const childProps = {
    formData,
    handleChange,
    isSubmitting,
  };
  
  // Cloner les enfants et leur passer les props
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, childProps);
    }
    return child;
  });
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
          
          <div className="py-4">
            {childrenWithProps}
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              {cancelLabel}
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
