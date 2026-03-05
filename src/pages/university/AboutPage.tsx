import { Link } from 'react-router-dom';
import { Cross, BookOpen, Globe, Heart, GraduationCap, ArrowRight } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            {/* Hero */}
            <section className="relative pt-44 pb-32 bg-[#0F172A] overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C5A55A]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#C5A55A]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-4 mb-8">
                        <span className="h-px w-12 bg-[#C5A55A]"></span>
                        <span className="text-[#C5A55A] font-bold uppercase tracking-[0.4em] text-[11px]">Héritage & Vision</span>
                        <span className="h-px w-12 bg-[#C5A55A]"></span>
                    </div>
                    <h1 className="text-5xl md:text-7xl text-white font-medium tracking-tighter mb-8 italic">
                        Notre <span className="text-[#C5A55A]">Histoire</span>
                    </h1>
                    <div className="w-24 h-px bg-[#C5A55A]/30 mx-auto" />
                </div>
            </section>

            {/* Matteo Ricci */}
            <section className="py-32 bg-white relative">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto">
                        <div className="relative group">
                            <div className="absolute -inset-4 border border-[#C5A55A]/20 transition-transform duration-500 group-hover:scale-105" />
                            <img
                                src="/img/matteo-ricci/matteo1.jpeg"
                                alt="Matteo Ricci"
                                className="relative w-full aspect-[3/4] object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute bottom-6 right-6 bg-[#C5A55A] p-6 text-[#0F172A]">
                                <p className="text-xs font-bold uppercase tracking-widest">Pionnier du Dialogue</p>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div>
                                <p className="text-[12px] text-[#C5A55A] font-bold uppercase tracking-[0.3em] mb-4">Notre Patron</p>
                                <h2 className="text-4xl md:text-5xl text-[#0F172A] font-medium tracking-tight mb-8 leading-tight">
                                    Matteo Ricci <span className="text-[#C5A55A] italic block mt-2 text-2xl font-light">(1552–1610)</span>
                                </h2>
                            </div>
                            <div className="space-y-6 text-[#0F172A]/60 leading-relaxed text-lg font-light">
                                <p>
                                    Matteo Ricci, prêtre jésuite italien, est l'un des pionniers du dialogue interculturel
                                    entre l'Occident et la Chine. Mathématicien, cartographe et humaniste, il a su allier
                                    excellence intellectuelle et ouverture au monde.
                                </p>
                                <p>
                                    Son exemple incarne les valeurs que l'ISTMR transmet à ses étudiants : la rigueur
                                    scientifique, le respect des cultures, et l'engagement au service de la société.
                                </p>
                            </div>
                            <div className="pt-8 border-t border-[#C5A55A]/20">
                                <blockquote className="text-2xl text-[#0F172A] italic font-serif leading-relaxed">
                                    "Se faire tout à tous pour les gagner tous au Christ."
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values - Refined Cards */}
            <section className="py-32 bg-[#F9F7F2]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24">
                        <p className="text-[12px] text-[#C5A55A] font-bold uppercase tracking-[0.4em] mb-4">Tradition</p>
                        <h2 className="text-4xl md:text-6xl text-[#0F172A] font-medium tracking-tighter italic">L'Éducation <span className="text-[#C5A55A]">Jésuite</span></h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {[
                            { icon: BookOpen, title: 'Cura Personalis', desc: 'Le soin de la personne dans sa totalité — intellectuelle, spirituelle et humaine. Chaque étudiant est unique.' },
                            { icon: GraduationCap, title: 'Magis', desc: 'La quête du « plus » — toujours viser plus haut dans l\'excellence académique et le service aux autres.' },
                            { icon: Heart, title: 'Hommes et femmes pour les autres', desc: 'Former des leaders qui mettent leurs compétences au service de la communauté.' },
                            { icon: Globe, title: 'Citoyens du monde', desc: 'Préparer les étudiants à contribuer à un monde plus juste, en valorisant la diversité culturelle.' },
                        ].map((v, i) => (
                            <div key={i} className="bg-white border border-[#C5A55A]/10 p-10 hover:border-[#C5A55A] transition-all duration-500 hover:shadow-xl group">
                                <div className="w-14 h-14 bg-[#0F172A]/5 flex items-center justify-center mb-8 group-hover:bg-[#C5A55A] transition-colors duration-500">
                                    <v.icon className="w-6 h-6 text-[#C5A55A] group-hover:text-[#0F172A] transition-colors" />
                                </div>
                                <h4 className="text-2xl text-[#0F172A] font-medium mb-4">{v.title}</h4>
                                <p className="text-[#0F172A]/50 leading-relaxed font-light">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CREC Affiliation */}
            <section className="py-24 bg-white border-t border-[#C5A55A]/10">
                <div className="container mx-auto px-6 text-center max-w-3xl">
                    <div className="flex items-center justify-center gap-6 mb-10">
                        <img src="/img/logo.png" alt="CREC" className="h-12 object-contain grayscale opacity-50" />
                        <div className="w-px h-8 bg-[#C5A55A]/30" />
                        <img src="/img/logo_istmr.png" alt="ISTMR" className="h-14 object-contain" />
                    </div>
                    <p className="text-xl text-[#0F172A]/40 leading-relaxed font-light mb-10">
                        L'ISTMR est une œuvre apostolique du <strong className="text-[#0F172A] font-medium">CREC</strong> (Centre de Recherche, d'Étude et de Créativité),
                        pilotée par la Compagnie de Jésus au Bénin.
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-3 text-[12px] font-bold text-[#C5A55A] uppercase tracking-[0.2em] border-b border-[#C5A55A]/30 pb-1 hover:text-[#0F172A] hover:border-[#0F172A] transition-all"
                    >
                        Visiter le site du CREC <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </div>
    );

};

export default AboutPage;
