
import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';


const LangSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (lang: 'fr' | 'en') => {
    setLanguage(lang);
    setIsOpen(false);
  };

  // Fermer le menu déroulant si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="p-2 text-white hover:text-crec-gold transition"
        aria-label="Switch Language"
      >
        <Globe size={20} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md py-2 z-50">
          <button
            className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
              language === 'fr' ? 'text-crec-gold font-medium' : ''
            }`}
            onClick={() => handleLanguageChange('fr')}
          >
            Français
          </button>
          <button
            className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
              language === 'en' ? 'text-crec-gold font-medium' : ''
            }`}
            onClick={() => handleLanguageChange('en')}
          >
            English
          </button>
        </div>
      )}
    </div>
  );
};

export default LangSwitcher;
