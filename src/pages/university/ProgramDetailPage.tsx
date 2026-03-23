import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useUniversityPrograms } from '@/hooks/useUniversityPrograms';
import { BookOpen, Clock, CheckCircle2, ChevronLeft, FileText, Users, Calendar, Coins, ArrowRight } from 'lucide-react';

const ProgramDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: programs, isLoading } = useUniversityPrograms();
    const [program, setProgram] = useState<any>(null);

    useEffect(() => {
        if (!isLoading && programs.length > 0) {
            const found = programs.find((p: any) => p.id === Number(id));
            setProgram(found || null);
        }
    }, [id, programs, isLoading]);

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

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] bg-[#FDFBF7]">
                <div className="w-8 h-8 border-2 border-[#C5A55A]/20 border-t-[#C5A55A] rounded-full animate-spin" />
            </div>
        );
    }
    if (!program) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#FDFBF7] pt-24">
                <BookOpen className="w-12 h-12 text-[#1B2A4A]/10 mb-4" />
                <h2 className="text-2xl text-[#1B2A4A] mb-6">Programme introuvable</h2>
                <button onClick={() => navigate('/istmr/programmes')} className="px-6 py-3 bg-[#1B2A4A] text-white text-[11px] uppercase tracking-[0.15em] hover:bg-[#C5A55A] transition-all">
                    Retour aux programmes
                </button>
            </div>
        );
    }

    return (
        <div>
            {/* Hero */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-[#FDFBF7] via-white to-[#F5F0E8] relative">
                <div className="absolute top-32 right-20 w-64 h-64 bg-[#C5A55A]/5 rounded-full blur-3xl" />
                <div className="relative z-10 container mx-auto px-6">
                    <Link to="/istmr/programmes" className="inline-flex items-center text-[#1B2A4A]/30 hover:text-[#C5A55A] transition mb-8 text-sm">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Tous les programmes
                    </Link>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] text-[#C5A55A] uppercase tracking-[0.15em]">{getLevelLabel(program.level)}</span>
                        <span className="w-1 h-1 rounded-full bg-[#C5A55A]/30" />
                        <span className="text-[10px] text-[#1B2A4A]/30 flex items-center gap-1"><Clock className="w-3 h-3" /> {getDurationLabel(program.duration)}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl text-[#1B2A4A] font-light">{program.name}</h1>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 max-w-6xl mx-auto">
                        {/* Main content */}
                        <div className="lg:col-span-2 space-y-16">
                            {/* Description */}
                            <div>
                                <h2 className="text-xl text-[#1B2A4A] mb-5 flex items-center gap-3">
                                    <div className="w-8 h-px bg-[#C5A55A]" /> Description
                                </h2>
                                <p className="text-[#1B2A4A]/60 leading-[1.9] text-justify">{program.description}</p>
                            </div>

                            {/* Program Details */}
                            {program.program_details?.length > 0 && (
                                <div>
                                    <h2 className="text-xl text-[#1B2A4A] mb-5 flex items-center gap-3">
                                        <div className="w-8 h-px bg-[#C5A55A]" /> Détails du Programme
                                    </h2>
                                    <ul className="space-y-3">
                                        {program.program_details.map((d: string, i: number) => (
                                            <li key={i} className="flex items-start gap-3 text-[#1B2A4A]/60 text-sm">
                                                <CheckCircle2 className="w-4 h-4 text-[#C5A55A] shrink-0 mt-1" />
                                                <span className="leading-relaxed">{d}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Curriculum */}
                            {program.curriculum?.length > 0 && (
                                <div>
                                    <h2 className="text-xl text-[#1B2A4A] mb-5 flex items-center gap-3">
                                        <div className="w-8 h-px bg-[#C5A55A]" /> Programme d'Études
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {program.curriculum.map((c: string, i: number) => (
                                            <div key={i} className="flex items-start gap-3 py-3 text-[#1B2A4A]/60 text-sm border-b border-[#C5A55A]/5">
                                                <BookOpen className="w-4 h-4 text-[#C5A55A] shrink-0 mt-0.5" />
                                                <span>{c}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Admission Requirements */}
                            {program.admission_requirements?.length > 0 && (
                                <div>
                                    <h2 className="text-xl text-[#1B2A4A] mb-5 flex items-center gap-3">
                                        <div className="w-8 h-px bg-[#C5A55A]" /> Conditions d'Admission
                                    </h2>
                                    <ul className="space-y-3">
                                        {program.admission_requirements.map((r: string, i: number) => (
                                            <li key={i} className="flex items-start gap-3 text-[#1B2A4A]/60 text-sm">
                                                <FileText className="w-4 h-4 text-[#C5A55A] shrink-0 mt-0.5" />
                                                <span>{r}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Career Opportunities */}
                            {program.career_opportunities?.length > 0 && (
                                <div>
                                    <h2 className="text-xl text-[#1B2A4A] mb-5 flex items-center gap-3">
                                        <div className="w-8 h-px bg-[#C5A55A]" /> Débouchés
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {program.career_opportunities.map((o: string, i: number) => (
                                            <span key={i} className="text-sm text-[#1B2A4A]/50 px-4 py-2 border border-[#C5A55A]/10 hover:border-[#C5A55A]/30 transition-colors">
                                                {o}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-[#FDFBF7] p-7 border border-[#C5A55A]/10">
                                <h3 className="text-[10px] uppercase tracking-[0.15em] text-[#C5A55A] mb-5">Informations</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3 text-sm text-[#1B2A4A]/50">
                                        <Clock className="w-4 h-4 text-[#C5A55A]" /> Durée : <strong className="text-[#1B2A4A]">{getDurationLabel(program.duration)}</strong>
                                    </li>
                                    {program.capacity && (
                                        <li className="flex items-center gap-3 text-sm text-[#1B2A4A]/50">
                                            <Users className="w-4 h-4 text-[#C5A55A]" /> Places : <strong className="text-[#1B2A4A]">{program.capacity}</strong>
                                        </li>
                                    )}
                                    {program.tuition_fee && (
                                        <li className="flex items-center gap-3 text-sm text-[#1B2A4A]/50">
                                            <Coins className="w-4 h-4 text-[#C5A55A]" /> Frais : <strong className="text-[#1B2A4A]">{Number(program.tuition_fee).toLocaleString()} {program.currency || 'FCFA'}/an</strong>
                                        </li>
                                    )}
                                    {program.registration_deadline && (
                                        <li className="flex items-center gap-3 text-sm text-[#1B2A4A]/50">
                                            <Calendar className="w-4 h-4 text-[#C5A55A]" /> Limite : <strong className="text-[#1B2A4A]">{new Date(program.registration_deadline).toLocaleDateString('fr-FR')}</strong>
                                        </li>
                                    )}
                                </ul>
                            </div>

                            <Link
                                to="/istmr/admissions/postuler"
                                className="group flex items-center justify-center gap-2 w-full py-4 bg-[#1B2A4A] text-white text-[11px] uppercase tracking-[0.15em] hover:bg-[#C5A55A] hover:text-[#1B2A4A] transition-all duration-500"
                            >
                                Candidater <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProgramDetailPage;
