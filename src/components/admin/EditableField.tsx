import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Check, X, Edit, Loader2 } from 'lucide-react';

interface EditableFieldProps {
  type: 'text' | 'textarea' | 'number' | 'email';
  value: string;
  label: string;
  name: string;
  onSave: (name: string, value: string) => Promise<void>;
  placeholder?: string;
  className?: string;
}

/**
 * Champ éditable pour les interfaces CRUD
 * Permet d'éditer un champ directement dans la vue
 */
const EditableField: React.FC<EditableFieldProps> = ({
  type,
  value: initialValue,
  label,
  name,
  onSave,
  placeholder,
  className = '',
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [isSaving, setIsSaving] = useState(false);
  
  // Fonction pour démarrer l'édition
  const handleEdit = () => {
    setValue(initialValue);
    setIsEditing(true);
  };
  
  // Fonction pour annuler l'édition
  const handleCancel = () => {
    setValue(initialValue);
    setIsEditing(false);
  };
  
  // Fonction pour enregistrer les modifications
  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave(name, value);
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      // Ici vous pourriez ajouter une notification d'erreur
    } finally {
      setIsSaving(false);
    }
  };
  
  // Affichage en mode lecture
  if (!isEditing) {
    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-slate-700">{label}</label>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleEdit}
            className="h-7 px-2 text-slate-600"
          >
            <Edit className="h-3.5 w-3.5 mr-1" />
            Modifier
          </Button>
        </div>
        <div className="bg-slate-50 rounded-md px-3 py-2 text-slate-800">
          {type === 'textarea' ? (
            <div className="whitespace-pre-wrap">{initialValue || placeholder}</div>
          ) : (
            <div>{initialValue || placeholder}</div>
          )}
        </div>
      </div>
    );
  }
  
  // Affichage en mode édition
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleCancel}
            className="h-7 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            disabled={isSaving}
          >
            <X className="h-3.5 w-3.5 mr-1" />
            Annuler
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleSave}
            className="h-7 px-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" />
            ) : (
              <Check className="h-3.5 w-3.5 mr-1" />
            )}
            Enregistrer
          </Button>
        </div>
      </div>
      
      {type === 'textarea' ? (
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="min-h-[100px]"
          disabled={isSaving}
        />
      ) : (
        <Input
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          disabled={isSaving}
        />
      )}
    </div>
  );
};

export default EditableField;
