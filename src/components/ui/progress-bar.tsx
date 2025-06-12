import React, { useMemo } from 'react';

interface ProgressBarProps {
  percentage: number;
  className?: string;
  barClassName?: string;
}

// Génère une classe CSS unique pour chaque pourcentage
function getProgressClass(percentage: number) {
  const safePercentage = Math.max(0, Math.min(100, percentage));
  const className = `w-${Math.round(safePercentage)}p`;
  if (typeof window !== 'undefined' && !document.getElementById(className)) {
    const style = document.createElement('style');
    style.id = className;
    style.innerHTML = `.${className} { width: ${safePercentage}%; }`;
    document.head.appendChild(style);
  }
  return className;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  percentage, 
  className = '', 
  barClassName = 'bg-blue-600' 
}) => {
  const progressClass = useMemo(() => getProgressClass(percentage), [percentage]);
  
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div 
        className={`h-2 rounded-full transition-all duration-300 ${progressClass} ${barClassName}`}
      />
    </div>
  );
};

export default ProgressBar;
