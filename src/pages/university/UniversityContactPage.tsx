import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const contacts = [
    { icon: MapPin, title: 'Adresse', text: 'Maison des Pères Jésuites, Godomey-Salamèy, Bénin' },
    { icon: Phone, title: 'Téléphone', text: '+229 01 20 22 23 03' },
    { icon: Mail, title: 'Email', text: 'crecjesuitesbenin@gmail.com', href: 'mailto:crecjesuitesbenin@gmail.com' },
    { icon: Clock, title: 'Horaires', text: 'Lun–Ven: 8h–17h · Sam: 8h–12h' },
];

const UniversityContactPage = () => {
    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            {/* Hero */}
            <section className="relative pt-44 pb-32 bg-[#0F172A] overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C5A55A]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#C5A55A]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-4 mb-8">
                        <span className="h-px w-12 bg-[#C5A55A]"></span>
                        <span className="text-[#C5A55A] font-bold uppercase tracking-[0.4em] text-[11px]">Communication</span>
                        <span className="h-px w-12 bg-[#C5A55A]"></span>
                    </div>
                    <h1 className="text-5xl md:text-7xl text-white font-medium tracking-tighter mb-8 italic">
                        Parlons de votre <span className="text-[#C5A55A]">Avenir</span>
                    </h1>
                    <div className="w-24 h-px bg-[#C5A55A]/30 mx-auto" />
                </div>
            </section>

            {/* Contact Content */}
            <section className="py-32 bg-white relative">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
                        {/* Info Column */}
                        <div className="lg:col-span-5 space-y-12">
                            <div>
                                <h2 className="text-4xl text-[#0F172A] font-medium tracking-tight mb-8">Coordonnées</h2>
                                <p className="text-[#0F172A]/50 text-lg font-light leading-relaxed mb-12">
                                    Une question ? Nos conseillers sont à votre disposition pour vous orienter dans votre parcours académique.
                                </p>
                            </div>

                            <div className="space-y-8">
                                {contacts.map((c, i) => (
                                    <div key={i} className="flex items-start gap-6 group">
                                        <div className="w-12 h-12 border border-[#C5A55A]/20 flex items-center justify-center shrink-0 group-hover:bg-[#C5A55A] transition-all duration-500">
                                            <c.icon className="w-5 h-5 text-[#C5A55A] group-hover:text-[#0F172A] transition-colors" />
                                        </div>
                                        <div>
                                            <h4 className="text-[11px] text-[#C5A55A] font-bold uppercase tracking-[0.2em] mb-2">{c.title}</h4>
                                            {c.href ? (
                                                <a href={c.href} className="text-xl text-[#0F172A] font-light hover:text-[#C5A55A] transition-colors">{c.text}</a>
                                            ) : (
                                                <p className="text-xl text-[#0F172A] font-light">{c.text}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-10 bg-[#F9F7F2] border border-[#C5A55A]/10 mt-16">
                                <h4 className="text-lg font-bold text-[#0F172A] mb-4">Secrétariat Académique</h4>
                                <p className="text-sm text-[#0F172A]/50 leading-relaxed font-light">
                                    Pour les demandes administratives et les dossiers d'inscription, le secrétariat est ouvert sans rendez-vous.
                                </p>
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className="lg:col-span-7 bg-[#0F172A] p-10 md:p-16 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A55A]/5 rounded-full blur-[60px]" />

                            <form className="relative z-10 space-y-8" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-[#C5A55A] font-bold uppercase tracking-[0.3em]">Nom Complet</label>
                                        <input
                                            type="text"
                                            placeholder="Jean Dupont"
                                            className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-[#C5A55A] outline-none transition-all placeholder:text-white/20 font-light"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-[#C5A55A] font-bold uppercase tracking-[0.3em]">Email</label>
                                        <input
                                            type="email"
                                            placeholder="jean@example.com"
                                            className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-[#C5A55A] outline-none transition-all placeholder:text-white/20 font-light"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-[#C5A55A] font-bold uppercase tracking-[0.3em]">Sujet</label>
                                    <select className="w-full bg-white/5 border border-white/10 p-4 text-white/60 focus:border-[#C5A55A] outline-none transition-all font-light appearance-none">
                                        <option value="">Sélectionnez un sujet</option>
                                        <option value="admissions">Information Inscriptions</option>
                                        <option value="programs">Question sur une filière</option>
                                        <option value="partnership">Partenariat</option>
                                        <option value="other">Autre demande</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-[#C5A55A] font-bold uppercase tracking-[0.3em]">Message</label>
                                    <textarea
                                        rows={5}
                                        placeholder="Comment pouvons-nous vous aider ?"
                                        className="w-full bg-white/5 border border-white/10 p-4 text-white focus:border-[#C5A55A] outline-none transition-all placeholder:text-white/20 font-light resize-none"
                                    ></textarea>
                                </div>
                                <button className="w-full py-5 bg-[#C5A55A] text-[#0F172A] font-bold uppercase tracking-[0.4em] text-xs hover:bg-white transition-all duration-500 shadow-xl shadow-black/20">
                                    Envoyer le message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UniversityContactPage;
