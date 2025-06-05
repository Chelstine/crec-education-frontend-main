import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  className?: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  description,
  image,
  className,
  children
}) => {
  return (
    <div className={cn(
      "bg-white rounded-lg overflow-hidden shadow-md flex flex-col h-full",
      className
    )}>
      {image && (
        <div className="relative h-48 w-full flex-shrink-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        {children}
        <h3 className="text-xl font-semibold text-crec-darkblue mb-2">{title}</h3>
        {subtitle && (
          <p className="text-crec-gold font-medium mb-2">{subtitle}</p>
        )}
        {description && (
          <p className="text-crec-darkgray flex-grow">{description}</p>
        )}
      </div>
    </div>
  );
};
