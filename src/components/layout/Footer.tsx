
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail , Linkedin} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-crec-darkblue text-white py-10 relative overflow-hidden">
      {/* Motif décoratif en arrière-plan */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footerPattern" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 0,15 L 30,15 M 15,0 L 15,30" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footerPattern)" />
        </svg>
      </div>
      
      {/* Accent lumineux subtil */}
      <div className="absolute bottom-0 left-0 w-1/4 h-32 rounded-full bg-crec-gold/10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-6 pb-6 border-b border-slate-700/30">
          {/* Logo et tagline */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-2 flex items-center">
              <span className="text-crec-gold mr-1">CREC</span>
              <span className="text-sm font-light"> | Éducation</span>
            </h3>
            <p className="text-xs text-slate-300 max-w-xs text-center md:text-left">
              Centre de Recherche, d'Étude et de Créativité - {currentYear}
            </p>
          </div>
          
          {/* Liens rapides */}
          <div className="hidden md:block">
            <ul className="flex flex-wrap justify-center gap-4 text-sm">
              <li><Link to="/about" className="text-slate-300 hover:text-white transition">{t('nav.about')}</Link></li>
              <li><Link to="/formations/university" className="text-slate-300 hover:text-white transition">{t('nav.formations')}</Link></li>
              <li><Link to="/events" className="text-slate-300 hover:text-white transition">Événements</Link></li>
              <li><Link to="/donate" className="text-slate-300 hover:text-white transition">{t('nav.donate')}</Link></li>
            </ul>
          </div>
          
          {/* Adresse */}
          <div className="flex flex-col items-center md:items-start text-sm">
            <p className="text-slate-300 flex items-center gap-1.5 mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-crec-gold">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Maison des Pères Jésuites, Godomey - Salamèy</span>
            </p>
            <p className="text-slate-300 flex items-center gap-1.5 mb-1 ml-5">
              <span>Lot n° 2, Godomey Sud, Tranche B</span>
            </p>
            <p className="text-slate-300 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-crec-gold">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>+229 01 20 22 23 03</span>
            </p>
          </div>
          
          {/* Contact */}
          <div className="flex flex-col items-center md:items-end">
            <a href="mailto:crecjesuitesbenin@gmail.com" className="text-crec-gold hover:text-white transition-colors flex items-center gap-1.5 mb-2 font-medium">
              <Mail size={16} className="inline" />
              <span>crecjesuitesbenin@gmail.com</span>
            </a>
            
            {/* Réseaux sociaux */}
            <div className="flex space-x-3 mt-2">
              <a href="#" className="bg-crec-blue/30 hover:bg-crec-gold p-2 rounded-full transition-colors" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="bg-crec-blue/30 hover:bg-crec-gold p-2 rounded-full transition-colors" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="#" className="bg-crec-blue/30 hover:bg-crec-gold p-2 rounded-full transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="text-center text-xs text-slate-400">
          <p>© {currentYear} CREC - Tous droits réservés</p>
          <p className="mt-1 text-slate-500">
            <span className="mx-1 hover:text-slate-300 transition-colors">Politique de confidentialité</span> | 
            <span className="mx-1 hover:text-slate-300 transition-colors">Mentions légales</span> | 
            <span className="mx-1 hover:text-slate-300 transition-colors">Accessibilité</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
