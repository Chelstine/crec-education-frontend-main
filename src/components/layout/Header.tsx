import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronUp, Home } from 'lucide-react';
import LangSwitcher from '@/components/common/LangSwitcher';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fonction modifiée pour gérer les dropdowns - maintenant ils restent ouverts tant que la souris est dessus
  const handleMouseEnter = (name: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setOpenDropdown(name);
  };
  
  const handleMouseLeave = (name: string) => {
    dropdownTimeoutRef.current = setTimeout(() => {
      if (openDropdown === name) {
        setOpenDropdown(null);
      }
    }, 300); // Délai réduit car on garde le menu ouvert tant que la souris est dessus
  };

  // Nettoie le timeout quand le composant est démonté
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  // Menu principal avec dropdowns - optimisé et modernisé selon les nouvelles exigences
  const navLinks = [
    { name: 'Accueil', path: '/', icon: <Home className="h-4 w-4" /> },
    { 
      name: 'À propos', 
      path: '/about',
      dropdown: [
        { name: 'Qui sommes-nous', path: '/about' },
        { name: 'Histoire Jésuite', path: '/about/jesuites' },
        { name: 'Notre équipe', path: '/about/equipe' },
      ],
    },
    { 
      name: 'Formations', 
      path: '/formations/university',
      dropdown: [
        { name: 'ISTMR', path: '/formations/university' },
        { name: 'Formations ouvertes', path: '/formations/ouvertes' },
        { name: 'FABLAB', path: '/formations/fablab' },
        { name: 'Réservation FABLAB', path: '/reservation' },
      ],
    },
    { 
      name: 'Événements', 
      path: '/events',
      dropdown: [
        { name: 'Calendrier', path: '/calendar' },
        { name: 'Conférences', path: '/events' },
      ],
    },
    { name: 'Contact', path: '/contact' },
    { name: 'Donate', path: '/donate', donate: true },
  ];

  // Type pour les liens de navigation
  type NavLinkType = {
    name: string;
    path?: string;
    dropdown?: { name: string; path: string }[];
    donate?: boolean;
    icon?: React.ReactNode;
  };

  return (
    <header className="sticky top-0 w-full z-50 bg-crec-darkblue shadow-lg font-['Calibri'] text-[14pt]">
      <div className="container mx-auto flex items-center py-2 md:py-4 px-4 md:px-6">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="block">
            <img src="/img/logo.png" alt="CREC Logo" className="h-10 md:h-14 w-auto max-w-full object-contain" style={{display: 'block'}} />
          </Link>
        </div>
        {/* Desktop nav */}
        <nav className="hidden lg:flex flex-1 justify-center items-center gap-2">
          {navLinks.map((item: NavLinkType, idx) =>
            item.dropdown ? (
              <div key={item.name} className="relative group">
                <button
                  className="text-white hover:text-crec-gold px-4 py-2 flex items-center gap-1 font-semibold"
                  onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={() => handleMouseLeave(item.name)}
                >
                  {item.name} <ChevronDown size={16} />
                </button>
                <div
                  className={`absolute left-0 top-full mt-2 bg-white shadow-lg rounded-md min-w-[180px] z-50 ${openDropdown === item.name ? 'block' : 'hidden'}`}
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={() => handleMouseLeave(item.name)}
                >
                  {item.dropdown.map((sub) => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      className="block px-4 py-2 text-[13pt] text-crec-darkblue hover:bg-crec-gold hover:text-white rounded-md"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : item.donate ? (
              <Link
                key={item.name}
                to="/donate"
                className="ml-2 px-5 py-2 rounded-md bg-gradient-to-r from-amber-500 to-crec-gold text-white font-bold hover:from-amber-600 hover:to-crec-gold transition shadow-md hover:shadow-lg shadow-amber-500/20"
              >
                {item.name}
              </Link>
            ) : (
              <Link
                key={item.name}
                to={item.path || '#'}
                className="text-white hover:text-crec-gold px-4 py-2 font-semibold flex items-center gap-1"
              >
                {item.icon && item.icon} {item.name}
              </Link>
            )
          )}
        </nav>
        {/* Lang icon & mobile menu btn */}
        <div className="flex items-center gap-2 ml-auto">
          <LangSwitcher />
          <button
            className="lg:hidden p-2 hover:bg-crec-gold rounded-md transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isMenuOpen ? <X size={28} className="text-white" /> : <Menu size={28} className="text-white" />}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-crec-darkblue text-white shadow-lg border-t">
          <div className="container mx-auto py-2">
            <nav className="flex flex-col">
              {navLinks.map((item: NavLinkType, idx) =>
                item.dropdown ? (
                  <div key={item.name} className="border-b border-crec-gold">
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                      className="w-full px-4 py-3 flex justify-between items-center font-semibold"
                    >
                      <span>{item.name}</span>
                      {openDropdown === item.name ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {openDropdown === item.name && (
                      <div className="bg-crec-darkblue">
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            className="block px-8 py-2 text-[13pt] text-crec-gold hover:bg-crec-gold hover:text-white rounded-md"
                            onClick={() => { setIsMenuOpen(false); setOpenDropdown(null); }}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : item.donate ? (
                  <Link
                    key={item.name}
                    to="/donate"
                    className="block w-full py-3 bg-gradient-to-r from-amber-500 to-crec-gold text-white text-center rounded-md font-bold my-2 shadow-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path || '#'}
                    className="px-4 py-3 font-semibold border-b border-crec-gold hover:text-crec-gold flex items-center gap-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon && item.icon} {item.name}
                  </Link>
                )
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;