import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const UniversityFooter = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#1B2A4A] border-t-4 border-[#C5A55A]">
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Identity */}
                    <div>
                        <div className="flex items-center gap-4 mb-6 bg-white/10 p-4 rounded-lg border border-white/20 w-fit">
                            <Link to="/" title="Site du CREC">
                                <img src="/img/logo.png" alt="CREC" className="h-8 w-auto object-contain hover:opacity-80 transition-opacity" />
                            </Link>
                            <div className="w-px h-6 bg-[#C5A55A]/30" />
                            <Link to="/istmr" title="Accueil ISTMR">
                                <img src="/img/logo_istmr.png" alt="ISTMR" className="h-10 w-auto object-contain hover:opacity-80 transition-opacity" />
                            </Link>
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed mb-4">
                            Institut des Sciences et Technologies Matteo Ricci.
                        </p>
                        <p className="text-sm text-[#C5A55A] font-light italic">« Luceat Lux Vestra »</p>
                    </div>

                    {/* Nav */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A55A] mb-6">Navigation</h4>
                        <ul className="space-y-3">
                            {['Accueil', 'À propos', 'Programmes', 'Admissions', 'Campus', 'Contact'].map((name) => (
                                <li key={name}>
                                    <Link to={`/istmr/${name === 'Accueil' ? '' : name === 'À propos' ? 'a-propos' : name.toLowerCase()}`} className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                                        <span className="w-1 h-1 bg-[#C5A55A] opacity-0 group-hover:opacity-100 transition-opacity" /> {name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A55A] mb-6">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm text-white/60">
                                <MapPin className="w-4 h-4 text-[#C5A55A] shrink-0 mt-0.5" /> Godomey-Salamèy, Bénin
                            </li>
                            <li className="flex items-center gap-3 text-sm text-white/60">
                                <Phone className="w-4 h-4 text-[#C5A55A]" /> +229 01 20 22 23 03
                            </li>
                            <li className="flex items-center gap-3 text-sm text-white/60">
                                <Mail className="w-4 h-4 text-[#C5A55A]" />
                                <a href="mailto:crecjesuitesbenin@gmail.com" className="hover:text-white transition">crecjesuitesbenin@gmail.com</a>
                            </li>
                        </ul>
                    </div>

                    {/* Affiliation */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A55A] mb-6">Affiliation</h4>
                        <div className="bg-white/5 p-4 border border-white/10 rounded-sm">
                            <p className="text-sm text-white/80 mb-3 font-light leading-relaxed">
                                Établissement du CREC, Compagnie de Jésus au Bénin.
                            </p>
                            <Link to="/" className="inline-flex items-center gap-2 text-[11px] font-bold text-[#C5A55A] hover:text-white uppercase tracking-widest transition">
                                Site du CREC →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10 bg-black/20">
                <div className="container mx-auto px-6 py-6 text-center">
                    <p className="text-xs tracking-wider text-white/40 font-light">© {currentYear} ISTMR — Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
};

export default UniversityFooter;
