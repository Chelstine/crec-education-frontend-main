import React from 'react';
import { cn } from '../../lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { InfoIcon } from 'lucide-react';

interface InfoPanelProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode | React.ElementType;
  variant?: 'default' | 'info' | 'warning' | 'success' | 'error';
  children?: React.ReactNode;
  className?: string;
}

/**
 * Composant de panneau d'information réutilisable
 * Utilisé pour afficher des informations, des conseils ou des avertissements
 */
const InfoPanel: React.FC<InfoPanelProps> = ({
  title,
  description,
  icon = <InfoIcon className="h-5 w-5" />,
  variant = 'default',
  children,
  className,
}) => {
  // Classes en fonction de la variante
  const variantClasses = {
    default: 'bg-slate-50 border-slate-200',
    info: 'bg-blue-50 border-blue-200 text-blue-900',
    warning: 'bg-amber-50 border-amber-200 text-amber-900',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    error: 'bg-red-50 border-red-200 text-red-900',
  };

  // Classes pour l'icône en fonction de la variante
  const iconClasses = {
    default: 'text-slate-600',
    info: 'text-blue-600',
    warning: 'text-amber-600',
    success: 'text-emerald-600',
    error: 'text-red-600',
  };

  return (
    <Card className={cn(variantClasses[variant], 'shadow-sm', className)}>
      {(title || description) && (
        <CardHeader className="pb-2">
          {title && (
            <CardTitle className="flex items-center gap-2 text-base">
              {icon && (
                <span className={iconClasses[variant]}>
                  {React.isValidElement(icon) 
                    ? icon 
                    : typeof icon === 'function'
                      ? React.createElement(icon as React.ElementType, { className: 'h-5 w-5' })
                      : null
                  }
                </span>
              )}
              {title}
            </CardTitle>
          )}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      {children && <CardContent>{children}</CardContent>}
    </Card>
  );
};

export default InfoPanel;
