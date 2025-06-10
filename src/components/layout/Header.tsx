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
      <div className="container mx-auto flex items-center py-4 px-6">
        {/* Logo section - 20% of width */}
        <div className="w-1/5">
          <Link to="/" className="block">
            <img src="/img/logo.png" alt="CREC Logo" className="h-14 w-auto object-contain" />
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

        {/* Right section (icons and button) - 20% of width */}
        <div className="flex items-center justify-end w-1/5 gap-3">
          <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="hover:text-crec-gold">
            <Search size={20} className="text-crec-darkblue" />
          </button>
          <ThemeToggle />
          <LangSwitcher />
          
          <Button asChild variant="default" className="bg-crec-gold hover:bg-crec-lightgold text-white hidden lg:flex">
            <Link to="/donate">{t('nav.donate')}</Link>
          </Button>
          
          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />} 
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

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <div className="container mx-auto py-4">
            <nav className="flex flex-col gap-2">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 text-crec-darkblue hover:bg-gray-100">
                {t('nav.home')}
              </Link>

              {Object.entries(submenuItems).map(([key, items]) => (
                <div key={key} className="border-b border-gray-100">
                  <button
                    onClick={() => toggleDropdown(key)}
                    className="w-full px-4 py-2 flex justify-between items-center text-crec-darkblue"
                  >
                    {t(`nav.${key}`)}
                    {openDropdown === key ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {openDropdown === key && (
                    <div className="pl-6">
                      {items.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="block py-2 text-crec-blue hover:text-crec-gold"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Remove direct Témoignages link from mobile nav */}
              {/* <Link to="/testimonials" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 text-crec-darkblue hover:bg-gray-100">Témoignages</Link> */}

              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 text-crec-darkblue hover:bg-gray-100">
                {t('nav.contact')}
              </Link>

              <Link to="/donate" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 bg-crec-gold text-white text-center">
                {t('nav.donate')}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;