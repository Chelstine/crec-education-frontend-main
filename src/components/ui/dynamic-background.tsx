import React, { useMemo } from 'react';

interface DynamicBackgroundProps {
  imageUrl: string;
  children: React.ReactNode;
  className?: string;
  overlay?: boolean;
}

// Génère une classe CSS unique pour chaque image dynamique
function getBgClass(url: string) {
  if (!url) return '';
  const safe = btoa(url).replace(/[^a-z0-9]/gi, '').toLowerCase();
  const className = `bg-url-${safe}`;
  if (typeof window !== 'undefined' && !document.getElementById(className)) {
    const style = document.createElement('style');
    style.id = className;
    style.innerHTML = `.${className} { background-image: url('${url}'); }`;
    document.head.appendChild(style);
  }
  return className;
}

const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ 
  imageUrl, 
  children, 
  className = '',
  overlay = false 
}) => {
  const bgClass = useMemo(() => getBgClass(imageUrl), [imageUrl]);
  return (
    <div 
      className={`bg-cover bg-center ${bgClass} ${className}`}
    >
      {overlay && <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />}
      {children}
    </div>
  );
};

export default DynamicBackground;
