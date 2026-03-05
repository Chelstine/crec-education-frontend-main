import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUniversityPrograms } from '@/hooks/useUniversityPrograms';
import { Clock, ArrowRight, BookOpen, ChevronRight } from 'lucide-react';

const ProgramsPage = () => {
    const { data: programs, isLoading } = useUniversityPrograms();
    const [filter, setFilter] = useState<string>('ALL');

    const getLevelLabel = (level: string) => {
        switch (level?.toUpperCase()) {
            case 'CERTIFICATE': return 'Certificat'; case 'DIPLOMA': return 'Diplôme';
            case 'BACHELOR': case 'LICENCE': return 'Licence'; case 'MASTER': return 'Master';
            case 'DOCTORATE': case 'DOCTORAT': return 'Doctorat'; default: return level;
        }
    };
    const getDurationLabel = (duration: string) => {
        switch (duration) {
            case '3_MONTHS': return '3 mois'; case '6_MONTHS': return '6 mois';
            case '1_YEAR': return '1 an'; case '2_YEARS': return '2 ans';
            case '3_YEARS': return '3 ans'; case '4_YEARS': return '4 ans';
            case '5_YEARS': return '5 ans'; default: return duration;
        }
    };

    const levels = ['ALL', ...new Set(programs.map((p: any) => p.level))];
    const filtered = filter === 'ALL' ? programs : programs.filter((p: any) => p.level === filter);

    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            {/* Hero */}
            <section className="relative pt-44 pb-32 bg-[#0F172A] overflow-hidden">
                {/* Decorative background elements matching the landing page */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C5A55A]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#C5A55A]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-4 mb-8">
                        <span className="h-px w-12 bg-[#C5A55A]"></span>
                        <span className="text-[#C5A55A] font-bold uppercase tracking-[0.4em] text-[11px]">Excellence Académique</span>
                        <span className="h-px w-12 bg-[#C5A55A]"></span>
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-medium tracking-tighter mb-8 italic">
                        Nos <span className="text-[#C5A55A]">Programmes</span>
                    </h1>
                    <p className="text-white/50 text-xl max-w-2xl mx-auto font-light leading-relaxed">
                        Découvrez nos filières d'excellence conçues pour former les leaders technologiques de demain.
                    </p>
                </div>
            </section>

            {/* Filter + Grid */}
            <section className="py-24 -mt-12 relative z-20">
                <div className="container mx-auto px-6">
                    {/* Filters - More refined buttons */}
                    <div className="flex flex-wrap justify-center gap-3 mb-20">
                        {levels.map((level: string) => (
                            <button
                                key={level}
                                onClick={() => setFilter(level)}
                                className={`px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 border rounded-none ${filter === level
                                        ? 'bg-[#C5A55A] border-[#C5A55A] text-[#0F172A] shadow-xl shadow-[#C5A55A]/20'
                                        : 'bg-white border-[#C5A55A]/20 text-[#0F172A]/40 hover:border-[#C5A55A] hover:text-[#0F172A]'
                                    }`}
                            >
                                {level === 'ALL' ? 'Tous les niveaux' : getLevelLabel(level)}
                            </button>
                        ))}
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center py-32">
                            <div className="w-12 h-12 border-2 border-[#C5A55A]/20 border-t-[#C5A55A] rounded-full animate-spin" />
                        </div>
                    ) : filtered.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filtered.map((program: any, idx: number) => (
                                <Link
                                    key={program.id}
                                    to={`/istmr/programmes/${program.id}`}
                                    className="group relative bg-white border border-[#C5A55A]/10 p-10 hover:border-[#C5A55A] transition-all duration-700 hover:shadow-[0_30px_60px_-15px_rgba(27,42,74,0.1)] flex flex-col h-full"
                                >
                                    {/* Card index flair */}
                                    <div className="absolute top-0 right-0 p-8 text-4xl font-serif text-[#C5A55A]/10 group-hover:text-[#C5A55A]/20 transition-colors">
                                        0{idx + 1}
                                    </div>

                                    <div className="mb-8">
                                        <div className="flex items-center gap-3 mb-6">
                                            <span className="px-3 py-1 bg-[#0F172A]/5 text-[#C5A55A] text-[10px] font-bold uppercase tracking-widest border border-[#C5A55A]/20">
                                                {getLevelLabel(program.level)}
                                            </span>
                                            <span className="text-[11px] text-[#0F172A]/30 flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5" /> {getDurationLabel(program.duration)}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl md:text-3xl text-[#0F172A] font-medium tracking-tight mb-4 group-hover:text-[#C5A55A] transition-colors duration-500 leading-tight">
                                            {program.name}
                                        </h3>
                                        <div className="w-8 h-px bg-[#C5A55A] group-hover:w-16 transition-all duration-500 mb-6" />
                                        <p className="text-[#0F172A]/50 text-sm leading-relaxed font-light line-clamp-3">
                                            {program.description || "Une formation d'excellence axée sur la pratique et l'innovation technologique."}
                                        </p>
                                    </div>

                                    <div className="mt-auto pt-8 flex items-center justify-between border-t border-[#C5A55A]/5">
                                        <div>
                                            {program.tuition_fee && (
                                                <p className="text-[12px] text-[#0F172A]/40 font-medium">
                                                    <span className="text-[#C5A55A] font-bold">{Number(program.tuition_fee).toLocaleString()}</span> {program.currency || 'FCFA'} / an
                                                </p>
                                            )}
                                        </div>
                                        <div className="w-10 h-10 border border-[#C5A55A]/20 flex items-center justify-center group-hover:bg-[#C5A55A] group-hover:border-[#C5A55A] transition-all duration-500">
                                            <ArrowRight className="w-4 h-4 text-[#C5A55A] group-hover:text-[#0F172A] transition-colors" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-32 bg-white border border-dashed border-[#C5A55A]/20">
                            <BookOpen className="w-16 h-16 text-[#C5A55A]/20 mx-auto mb-6" />
                            <p className="text-[#0F172A]/40 text-lg font-light">Aucun programme ne correspond à votre sélection.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA matching other pages */}
            <section className="py-28 bg-[#FDFBF7] border-t border-[#C5A55A]/10">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-5xl text-[#0F172A] font-light mb-8 italic">
                        Prêt à rejoindre <span className="text-[#C5A55A]">l'excellence</span> ?
                    </h2>
                    <Link
                        to="/istmr/admissions/postuler"
                        className="inline-flex items-center gap-4 px-12 py-5 bg-[#0F172A] text-white text-[13px] font-bold uppercase tracking-[0.2em] hover:bg-[#C5A55A] hover:text-[#0F172A] transition-all duration-700 shadow-2xl shadow-black/10"
                    >
                        Déposer ma candidature
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    );

};

export default ProgramsPage;
