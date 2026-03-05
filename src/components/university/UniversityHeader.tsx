import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { name: 'Accueil', path: '/istmr' },
    { name: 'À propos', path: '/istmr/a-propos' },
    { name: 'Programmes', path: '/istmr/programmes' },
    { name: 'Admissions', path: '/istmr/admissions' },
    { name: 'Campus', path: '/istmr/campus' },
    { name: 'Contact', path: '/istmr/contact' },
];

const UniversityHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path: string) => {
        if (path === '/istmr') return location.pathname === '/istmr';
        return location.pathname.startsWith(path);
    };

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${isScrolled
            ? 'bg-[#0F172A] shadow-lg border-[#C5A55A]/30 py-3'
            : 'bg-[#0F172A]/95 backdrop-blur-md border-[#C5A55A]/20 py-4'
            }`}>
            <div className="container mx-auto flex items-center px-6">
                {/* Logos */}
                <div className="flex items-center gap-3 flex-shrink-0 group">
                    <Link to="/" title="Retour au site du CREC">
                        <img src="/img/logo.png" alt="CREC" className="h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
                    </Link>
                    <div className="w-px h-6 bg-[#C5A55A]/30"></div>
                    <Link to="/istmr" title="Accueil ISTMR">
                        <img src="/img/logo_istmr.png" alt="ISTMR" className="h-10 w-auto object-contain" />
                    </Link>
                </div>

                {/* Desktop nav */}
                <nav className="hidden lg:flex flex-1 justify-center items-center gap-1">
                    {navLinks.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`relative px-4 py-2 text-[13px] font-medium tracking-wide transition-all duration-300 ${isActive(item.path)
                                ? 'text-[#C5A55A]'
                                : 'text-white/60 hover:text-[#C5A55A]'
                                }`}
                        >
                            {item.name}
                            {isActive(item.path) && (
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-[#C5A55A] rounded-full shadow-[0_0_8px_rgba(197,165,90,0.5)]" />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* CTA */}
                <div className="flex items-center gap-3 ml-auto">
                    <Link
                        to="/istmr/admissions/postuler"
                        className="hidden md:inline-block px-7 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 bg-[#C5A55A] text-[#0F172A] hover:bg-white hover:text-[#0F172A] shadow-lg shadow-black/20"
                    >
                        Postuler
                    </Link>
                    <button
                        className="lg:hidden p-2 text-white hover:text-[#C5A55A] transition"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-[#0F172A] border-t border-white/5 animate-[fadeIn_0.3s_ease-out]">
                    <nav className="container mx-auto py-6 px-6 flex flex-col gap-2">
                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={`px-4 py-4 rounded-lg text-sm font-medium tracking-wide transition-all ${isActive(item.path)
                                    ? 'bg-[#C5A55A]/10 text-[#C5A55A] border border-[#C5A55A]/20'
                                    : 'text-white/60 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default UniversityHeader;
