
import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  align = 'left',
  className = ''
}) => {
  const alignClass = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto'
  };

  return (
    <div className={`mb-8 md:mb-12 ${alignClass[align]} ${className}`}>
      <h2 className="text-2xl md:text-3xl font-bold text-crec-darkblue">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-crec-darkgray max-w-2xl">
          {subtitle}
        </p>
      )}
      <div className="h-1 w-16 bg-crec-gold mt-4 mb-2"></div>
    </div>
  );
};

export default SectionTitle;
