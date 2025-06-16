
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail , Linkedin} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-crec-darkblue text-white">
      {/* Section principale */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo et contact */}
          <div>
            <div className="font-serif text-2xl font-bold mb-4">
              CREC<span className="text-crec-gold">.</span>
            </div>
            <p className="mt-4 text-sm text-gray-300">
              Centre de Recherche, d'Étude et de Créativité
            </p>
            <p className="mt-4 text-sm text-gray-300">
              Maison des Pères Jésuites<br />
              Godomey - Salamèy<br />
              Lot n° 2, Godomey Sud,<br />
              Tranche B.
            </p>
            <div className="mt-4 text-sm text-gray-300">
              <p>crecjesuitesbenin@gmail.com</p>
              <p>crecjscontact@gmail.com</p>
              <p>jesuites-benin@gmail.com</p>
              <p>Fixe: +229 01 20 22 23 03</p>
              <p>Mobile: +229 01 67 76 15 15</p>
              <p>Mobile: +229 01 91 50 88 88</p>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-crec-gold">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition">{t('nav.about')}</Link></li>
              <li><Link to="/formations" className="text-gray-300 hover:text-white transition">{t('nav.formations')}</Link></li>
              <li><Link to="/events" className="text-gray-300 hover:text-white transition">Actualités & Événements</Link></li>
              <li><Link to="/news" className="text-gray-300 hover:text-white transition">Actualités</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition">{t('nav.contact')}</Link></li>
              <li><Link to="/donate" className="text-gray-300 hover:text-white transition">{t('nav.donate')}</Link></li>
            </ul>
          </div>

          {/* Newsletter et réseaux sociaux */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-crec-gold">Newsletter</h3>
            <form className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder={t('common.emailAddress')}
                  className="px-3 py-2 bg-crec-blue text-white placeholder-gray-400 flex-grow rounded-l focus:outline-none"
                />
                <button type="submit" className="bg-crec-gold hover:bg-crec-lightgold px-4 py-2 rounded-r transition">
                  OK
                </button>
              </div>
            </form>
            
            <h3 className="text-lg font-medium mb-2 text-crec-gold">Suivez-nous</h3>
            <div className="flex space-x-3">
              <a href="#" className="bg-crec-blue hover:bg-crec-lightblue p-2 rounded transition" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="bg-crec-blue hover:bg-crec-lightblue p-2 rounded transition" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="bg-crec-blue hover:bg-crec-lightblue p-2 rounded transition" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="bg-crec-blue hover:bg-crec-lightblue p-2 rounded transition" aria-label="Youtube">
                <Youtube size={18} />
              </a>
              <a href="#" className="bg-crec-blue hover:bg-crec-lightblue p-2 rounded transition" aria-label="Youtube">
                <Linkedin size={18} />
              </a>
              <a href="mailto:crecjesuitesbenin@gmail.com" className="bg-crec-blue hover:bg-crec-lightblue p-2 rounded transition" aria-label="Email">
                <Mail size={18} />
              </a>
              
            </div>
          </div>
        </div>
      </div>

      {/* Copyright et mentions légales */}
      <div className="border-t border-crec-blue py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div>
            © {currentYear} CREC - {t('footer.rights')}
          </div>
          <div className="mt-2 md:mt-0 flex gap-4">
            <Link to="/legal" className="hover:text-white transition">{t('footer.legal')}</Link>
            <Link to="/privacy" className="hover:text-white transition">{t('footer.privacy')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
