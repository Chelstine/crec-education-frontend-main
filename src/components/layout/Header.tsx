import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import LangSwitcher from '@/components/common/LangSwitcher';
import ThemeToggle from '@/components/common/ThemeToggle';

const Header = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  // Référence pour suivre les timeouts de fermeture des menus
  const timeoutRef = useRef(null);
  // Référence pour les menus déroulants
  const dropdownRefs = useRef({});

  const submenuItems = {
    about: [
      { name: 'Qui sommes-nous', path: '/about' },
      { name: 'Les Jésuites', path: '/about/jesuites' },
      { name: 'Ignace de Loyola', path: '/about/ignace' },
      { name: 'Saints et Bienheureux', path: '/about/saints' },
      { name: 'La Famille ignatienne', path: '/about/famille-ignatienne' },
      { name: 'Le provincial et son équipe', path: '/about/equipe' },
      { name: 'Nos communautés', path: '/about/communautes' }
    ],
    formations: [
      { name: 'ISTMR', path: '/formations/university' },
      { name: 'Formations ouvertes', path: '/formations/ouvertes' },
      { name: 'FABLAB', path: '/formations/fablab' },
      { name: 'Réservation', path: '/subscription-verification' },
    ],
    events: [
      { name: 'Calendrier', path: '/events/calendar' },
      { name: 'Conférences', path: '/events' },
    ],
    news: [
      { name: 'Vie de Campus', path: '/news/campus-life' },
      { name: 'Articles', path: '/news' },
      { name: 'Stages & Emplois', path: '/news/stages' },
    ],
  };

  // Nettoyer les timeouts lors du démontage du composant
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (key) => {
    // Annuler tout timeout de fermeture en cours
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpenDropdown(key);
  };

  const handleMouseLeave = () => {
    // Définir un délai avant la fermeture pour donner le temps de naviguer vers le sous-menu
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 300); // 300ms de délai avant fermeture
  };

  const toggleDropdown = (key) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  return (
    <header className="sticky top-0 w-full z-50 bg-white shadow-md" style={{ fontFamily: 'Cambria, serif', fontSize: '14pt' }}>
      <div className="container mx-auto flex items-center py-2 md:py-4 px-4 md:px-6">
        {/* Logo section - responsive width */}
        <div className="flex-shrink-0 lg:w-1/5">
          <Link to="/" className="block">
            <img src="/img/logo.png" alt="CREC Logo" className="h-10 md:h-14 w-auto object-contain" />
          </Link>
        </div>

        {/* Desktop navigation - 60% of width */}
        <nav className="hidden lg:flex w-3/5 justify-between items-center">
          <Link to="/" className="text-crec-darkblue hover:text-crec-gold px-2">
            {t('nav.home')}
          </Link>

          {Object.entries(submenuItems).map(([key, items]) => (
            <div 
              key={key} 
              className="relative px-2"
              onMouseEnter={() => handleMouseEnter(key)}
              onMouseLeave={handleMouseLeave}
              ref={el => dropdownRefs.current[key] = el}
            >
              <button className="text-crec-darkblue hover:text-crec-gold flex items-center gap-1">
                {t(`nav.${key}`)} <ChevronDown size={16} />
              </button>
              <ul 
                className={`absolute left-0 top-full mt-2 bg-white shadow-md border rounded-md min-w-[200px] z-50 ${
                  openDropdown === key ? 'block' : 'hidden'
                }`}
                onMouseEnter={() => {
                  if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                  }
                  setOpenDropdown(key);
                }}
                onMouseLeave={handleMouseLeave}
              >
                {items.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="block px-4 py-2 hover:bg-crec-offwhite hover:text-crec-gold">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Remove direct Témoignages link from desktop nav */}
          {/* <Link to="/testimonials" className="text-crec-darkblue hover:text-crec-gold px-2">Témoignages</Link> */}

          <Link to="/contact" className="text-crec-darkblue hover:text-crec-gold px-2">
            {t('nav.contact')}
          </Link>
        </nav>

        {/* Right section (icons and button) - responsive layout */}
        <div className="flex items-center justify-end flex-1 lg:w-1/5 gap-2 md:gap-3">
          {/* Search button - hidden on small screens */}
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)} 
            className="hover:text-crec-gold hidden sm:block"
          >
            <Search size={20} className="text-crec-darkblue" />
          </button>
          
          {/* Theme and Language toggles - hidden on extra small screens */}
          <div className="hidden sm:flex items-center gap-2">
            <ThemeToggle />
            <LangSwitcher />
          </div>
          
          {/* Donate button - only on large screens */}
          <Button asChild variant="default" className="bg-crec-gold hover:bg-crec-lightgold text-white hidden lg:flex">
            <Link to="/donate">{t('nav.donate')}</Link>
          </Button>
          
          {/* Mobile menu button with improved styling */}
          <button 
            className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isMenuOpen ? <X size={24} className="text-crec-darkblue" /> : <Menu size={24} className="text-crec-darkblue" />} 
          </button>
        </div>
      </div>

      {/* Search */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md p-4 z-50">
          <div className="container mx-auto">
            <div className="flex items-center border border-gray-300 rounded-md">
              <input
                type="text"
                placeholder={t('common.search') + '...'}
                className="w-full p-2 focus:outline-none"
                autoFocus
              />
              <button className="p-2 bg-crec-gold text-white rounded-r-md">
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu with improved styling */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg border-t">
          <div className="container mx-auto py-2">
            {/* Mobile-only search */}
            <div className="px-4 py-3 border-b border-gray-100 sm:hidden">
              <div className="flex items-center border border-gray-300 rounded-md">
                <input
                  type="text"
                  placeholder={t('common.search') + '...'}
                  className="w-full p-2 focus:outline-none text-sm"
                />
                <button className="p-2 bg-crec-gold text-white rounded-r-md">
                  <Search size={16} />
                </button>
              </div>
            </div>

            <nav className="flex flex-col">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)} 
                className="px-4 py-3 text-crec-darkblue hover:bg-gray-50 transition-colors border-b border-gray-100"
              >
                {t('nav.home')}
              </Link>

              {Object.entries(submenuItems).map(([key, items]) => (
                <div key={key} className="border-b border-gray-100">
                  <button
                    onClick={() => toggleDropdown(key)}
                    className="w-full px-4 py-3 flex justify-between items-center text-crec-darkblue hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium">{t(`nav.${key}`)}</span>
                    {openDropdown === key ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {openDropdown === key && (
                    <div className="bg-gray-50">
                      {items.map((item, index) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`block px-6 py-2 text-sm text-crec-blue hover:text-crec-gold hover:bg-white transition-colors ${
                            index !== items.length - 1 ? 'border-b border-gray-200' : ''
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <Link 
                to="/contact" 
                onClick={() => setIsMenuOpen(false)} 
                className="px-4 py-3 text-crec-darkblue hover:bg-gray-50 transition-colors border-b border-gray-100"
              >
                {t('nav.contact')}
              </Link>

              {/* Mobile utilities section */}
              <div className="px-4 py-3 border-b border-gray-100 sm:hidden">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Préférences</span>
                  <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <LangSwitcher />
                  </div>
                </div>
              </div>

              {/* Donate button in mobile menu */}
              <div className="p-4">
                <Link 
                  to="/donate" 
                  onClick={() => setIsMenuOpen(false)} 
                  className="block w-full py-3 bg-crec-gold text-white text-center rounded-md hover:bg-crec-lightgold transition-colors font-medium"
                >
                  {t('nav.donate')}
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;