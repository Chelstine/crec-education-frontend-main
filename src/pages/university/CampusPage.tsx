import { MapPin, Wifi, BookOpen, Monitor, FlaskConical } from 'lucide-react';

const facilities = [
    { icon: BookOpen, name: 'Bibliothèque', desc: "Espace d'étude et de recherche." },
    { icon: Monitor, name: 'Labo Informatique', desc: 'Équipement moderne pour la pratique.' },
    { icon: FlaskConical, name: 'Salles de TP', desc: 'Travaux pratiques et projets.' },
    { icon: Wifi, name: 'Campus Connecté', desc: 'Wi-Fi sur tout le campus.' },
];

const CampusPage = () => {
    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            {/* Hero */}
            <section className="relative pt-44 pb-32 bg-[#0F172A] overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C5A55A]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#C5A55A]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-4 mb-8">
                        <span className="h-px w-12 bg-[#C5A55A]"></span>
                        <span className="text-[#C5A55A] font-bold uppercase tracking-[0.4em] text-[11px]">Notre Campus</span>
                        <span className="h-px w-12 bg-[#C5A55A]"></span>
                    </div>
                    <h1 className="text-5xl md:text-7xl text-white font-medium tracking-tighter mb-8 italic">
                        Un cadre <span className="text-[#C5A55A]">d'Excellence</span>
                    </h1>
                    <div className="w-24 h-px bg-[#C5A55A]/30 mx-auto" />
                </div>
            </section>

            {/* Gallery - Modern Masonry-like grid */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[700px]">
                            <div className="md:col-span-8 md:row-span-2 relative overflow-hidden group">
                                <img src="/img/crec3.jpg" alt="Campus Central" className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute bottom-10 left-10 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <p className="text-[#C5A55A] font-bold uppercase tracking-widest text-xs mb-2">Bâtiment Central</p>
                                    <h4 className="text-white text-3xl font-medium tracking-tight">Espace d'études principal</h4>
                                </div>
                            </div>
                            <div className="md:col-span-4 relative overflow-hidden group">
                                <img src="/img/crec1.jpg" alt="Entrée" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                            </div>
                            <div className="md:col-span-4 relative overflow-hidden group">
                                <img src="/img/crec2.png" alt="Campus Extérieur" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Installations - Premium Detailed List */}
            <section className="py-32 bg-[#F9F7F2]">
                <div className="container mx-auto px-6 text-center">
                    <div className="mb-24">
                        <p className="text-[12px] text-[#C5A55A] font-bold uppercase tracking-[0.4em] mb-4">Infrastructures</p>
                        <h2 className="text-4xl md:text-5xl text-[#0F172A] font-medium tracking-tight italic">Nos <span className="text-[#C5A55A]">Équipements</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {facilities.map((f, i) => (
                            <div key={i} className="bg-white p-10 border border-[#C5A55A]/10 hover:border-[#C5A55A] transition-all duration-500 hover:shadow-2xl group text-left">
                                <div className="w-12 h-12 border border-[#C5A55A]/30 flex items-center justify-center mb-8 group-hover:bg-[#C5A55A] transition-colors">
                                    <f.icon className="w-5 h-5 text-[#C5A55A] group-hover:text-[#0F172A] transition-colors" />
                                </div>
                                <h4 className="text-xl text-[#0F172A] font-bold mb-3 tracking-tight">{f.name}</h4>
                                <p className="text-[#0F172A]/50 text-sm font-light leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Location */}
            <section className="py-32 bg-white relative">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto bg-[#0F172A] p-12 md:p-20 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A55A]/5 rounded-full blur-[60px]" />
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <MapPin className="w-10 h-10 text-[#C5A55A] mb-8" />
                                <h3 className="text-3xl text-white font-medium mb-6 tracking-tighter">Nous situer</h3>
                                <p className="text-white/50 text-lg leading-relaxed font-light">
                                    Maison des Pères Jésuites<br />
                                    Lot n° 2, Godomey Sud, Tranche B<br />
                                    Godomey-Salamèy, Bénin
                                </p>
                            </div>
                            <div className="h-64 border border-[#C5A55A]/20 bg-white/5 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-700">
                                {/* Placeholder for map or logo */}
                                <img src="/img/logo_istmr.png" alt="ISTMR" className="h-20 opacity-20" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );

};

export default CampusPage;
