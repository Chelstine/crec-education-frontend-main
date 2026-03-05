import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';

const steps = [
    { num: '01', title: 'Vérifier les conditions', desc: 'Consultez les prérequis du programme choisi.' },
    { num: '02', title: 'Préparer le dossier', desc: 'Rassemblez les documents requis pour la candidature.' },
    { num: '03', title: 'Soumettre la candidature', desc: 'Remplissez le formulaire en ligne avec vos informations.' },
    { num: '04', title: 'Examen du dossier', desc: "Le comité d'admission étudie votre candidature." },
    { num: '05', title: 'Résultat & Inscription', desc: 'Recevez la réponse et finalisez votre inscription.' },
];

const documents = [
    'Copie du diplôme de Baccalauréat ou équivalent',
    'Relevés de notes des 3 dernières années',
    "Pièce d'identité ou passeport en cours de validité",
    'Lettre de motivation manuscrite',
    "Deux photos d'identité récentes",
    'Certificat de naissance',
];

const AdmissionsPage = () => {
    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            {/* Hero */}
            <section className="relative pt-44 pb-32 bg-[#0F172A] overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C5A55A]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#C5A55A]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-4 mb-8">
                        <span className="h-px w-12 bg-[#C5A55A]"></span>
                        <span className="text-[#C5A55A] font-bold uppercase tracking-[0.4em] text-[11px]">Inscriptions</span>
                        <span className="h-px w-12 bg-[#C5A55A]"></span>
                    </div>
                    <h1 className="text-5xl md:text-7xl text-white font-medium tracking-tighter mb-8 italic">
                        Rejoignez <span className="text-[#C5A55A]">l'ISTMR</span>
                    </h1>
                    <div className="w-24 h-px bg-[#C5A55A]/30 mx-auto" />
                </div>
            </section>

            {/* Process */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24">
                        <p className="text-[12px] text-[#C5A55A] font-bold uppercase tracking-[0.4em] mb-4">Processus</p>
                        <h2 className="text-4xl md:text-5xl text-[#0F172A] font-medium tracking-tight">Comment <span className="text-[#C5A55A] italic">postuler</span></h2>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            {steps.map((step, i) => (
                                <div key={step.num} className="group relative">
                                    <div className="flex flex-col items-center md:items-start p-8 bg-[#F9F7F2] border border-[#C5A55A]/10 hover:border-[#C5A55A] transition-all duration-500 h-full group-hover:-translate-y-2">
                                        <div className="text-4xl font-serif text-[#C5A55A]/20 mb-6 group-hover:text-[#C5A55A] transition-colors">{step.num}</div>
                                        <h4 className="text-lg text-[#0F172A] font-bold mb-3 tracking-tight leading-tight">{step.title}</h4>
                                        <p className="text-[#0F172A]/40 text-sm font-light leading-relaxed">{step.desc}</p>
                                    </div>
                                    {i < steps.length - 1 && (
                                        <div className="hidden md:block absolute top-1/2 -right-2 translate-y-[-50%] z-20">
                                            <ArrowRight className="w-4 h-4 text-[#C5A55A]/30" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Documents */}
            <section className="py-32 bg-[#0F172A] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A55A]/5 rounded-full blur-[80px]" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <p className="text-[12px] text-[#C5A55A] font-bold uppercase tracking-[0.4em] mb-6">Dossier de candidature</p>
                            <h2 className="text-4xl md:text-5xl text-white font-medium tracking-tighter mb-8 leading-tight">
                                Documents <span className="text-[#C5A55A] italic">Requis</span> pour l'Inscription
                            </h2>
                            <p className="text-white/40 text-lg font-light leading-relaxed mb-10">
                                Assurez-vous de disposer de tous les documents numérisés en format PDF avant de commencer votre candidature en ligne.
                            </p>
                            <div className="p-8 border border-[#C5A55A]/20 bg-white/5 backdrop-blur-sm">
                                <p className="text-[#C5A55A] text-sm font-bold uppercase tracking-widest mb-4">Note importante</p>
                                <p className="text-white/60 text-sm font-light leading-relaxed">
                                    Tout dossier incomplet ne sera pas examiné par la commission d'admission. L'admission définitive est soumise à la vérification des originaux.
                                </p>
                            </div>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-10 md:p-16">
                            <ul className="space-y-6">
                                {documents.map((doc, i) => (
                                    <li key={i} className="flex items-start gap-4 group">
                                        <div className="w-6 h-6 rounded-none border border-[#C5A55A]/30 flex items-center justify-center shrink-0 mt-1 transition-colors group-hover:bg-[#C5A55A]">
                                            <FileText className="w-3 h-3 text-[#C5A55A] group-hover:text-[#0F172A]" />
                                        </div>
                                        <span className="text-white/70 group-hover:text-white transition-colors font-light tracking-wide">{doc}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 bg-[#FDFBF7]">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-6xl text-[#0F172A] font-light mb-10 italic">
                        C'est le moment de <span className="text-[#C5A55A]">briller</span>
                    </h2>
                    <Link
                        to="/istmr/admissions/postuler"
                        className="inline-flex items-center gap-6 px-16 py-6 bg-[#0F172A] text-white text-[14px] font-bold uppercase tracking-[0.3em] hover:bg-[#C5A55A] hover:text-[#0F172A] transition-all duration-700 shadow-2xl shadow-black/20 group"
                    >
                        Commencer ma candidature
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </section>
        </div>
    );

};

export default AdmissionsPage;
