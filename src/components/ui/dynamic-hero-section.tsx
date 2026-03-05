import React, { useMemo } from 'react';

interface DynamicHeroSectionProps {
  backgroundColor?: string;
  textColor?: string;
  title: string;
  content?: string;
  className?: string;
}

// Génère une classe CSS unique pour chaque combinaison de couleurs
function getHeroClass(bgColor: string, textColor: string) {
  const colorKey = `${bgColor}-${textColor}`.replace(/[^a-z0-9]/gi, '');
  const className = `hero-${colorKey}`;
  if (typeof window !== 'undefined' && !document.getElementById(className)) {
    const style = document.createElement('style');
    style.id = className;
    style.innerHTML = `.${className} { background-color: ${bgColor}; color: ${textColor}; }`;
    document.head.appendChild(style);
  }
  return className;
}

const DynamicHeroSection: React.FC<DynamicHeroSectionProps> = ({ 
  backgroundColor = '#1e3a8a',
  textColor = '#ffffff',
  title,
  content,
  className = ''
}) => {
  const heroClass = useMemo(() => getHeroClass(backgroundColor, textColor), [backgroundColor, textColor]);
  
  return (
    <div 
      className={`h-32 rounded-lg flex items-center justify-center p-4 text-center ${heroClass} ${className}`}
    >
      <div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        {content && <p className="text-sm">{content}</p>}
      </div>
    </div>
  );
};

export default DynamicHeroSection;
