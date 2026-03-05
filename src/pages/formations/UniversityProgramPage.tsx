import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useUniversityPrograms } from '@/hooks/useUniversityPrograms';
import { Button } from '@/components/ui/button';
import {
    BookOpen,
    Award,
    Clock,
    CheckCircle2,
    ChevronLeft,
    Calendar,
    FileText
} from 'lucide-react';

const UniversityProgramPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: programs = [], isLoading: loading } = useUniversityPrograms();
    const [program, setProgram] = useState<any>(null);

    useEffect(() => {
        if (!loading) {
            if (programs.length > 0) {
                const found = programs.find((p: any) => p.id === Number(id));
                setProgram(found);
            } else if (id === 'genie-logiciel-placeholder') {
                // Fallback manual program
                setProgram({
                    name: "Génie Logiciel",
                    description: "Formation d'excellence en développement informatique...",
                    level: "LICENCE",
                    duration: "3_YEARS",
                    program_details: [
                        "Maîtriser les langages de programmation modernes",
                        "Concevoir des architectures logicielles robustes",
                        "Gérer des projets informatiques complexes"
                    ],
                    admission_requirements: [
                        "Bac scientifique ou technique",
                        "Test d'entrée"
                    ],
                    career_opportunities: [
                        "Développeur Full Stack",
                        "Ingénieur Logiciel",
                        "Chef de Projet Technique"
                    ]
                });
            }
        }
    }, [id, programs, loading]);

    const getLevelLabel = (level: string) => {
        switch (level?.toUpperCase()) {
            case 'CERTIFICATE': return 'Certificat';
            case 'DIPLOMA': return 'Diplôme';
            case 'BACHELOR': return 'Licence';
            case 'LICENCE': return 'Licence';
            case 'MASTER': return 'Master';
            case 'DOCTORATE': return 'Doctorat';
            default: return level;
        }
    };

    const getDurationLabel = (duration: string) => {
        switch (duration) {
            case '3_MONTHS': return '3 mois';
            case '6_MONTHS': return '6 mois';
            case '1_YEAR': return '1 an';
            case '2_YEARS': return '2 ans';
            case '3_YEARS': return '3 ans';
            case '4_YEARS': return '4 ans';
            case '5_YEARS': return '5 ans';
            default: return duration;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#FDFBF7]">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-crec-gold"></div>
            </div>
        );
    }

    if (!program && !loading && programs.length > 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF7]">
                <h2 className="text-2xl font-academic text-crec-darkblue mb-4">Programme introuvable</h2>
                <Button onClick={() => navigate('/formations/university')} variant="outline">Retour</Button>
            </div>
        )
    }

    // Handle the case where no programs exist yet (display manual fallback)
    const displayProgram = program || (programs.length === 0 ? {
        name: "Génie Logiciel",
        description: "Cette formation vise à former des ingénieurs capables de concevoir, développer et maintenir des systèmes logiciels complexes. Elle allie théorie fondamentale et pratique intensive.",
        level: "Licence Professionnelle",
        duration: "3 ans",
        program_details: [
            "Conception et développement d'applications web et mobiles",
            "Administration de bases de données",
            "Sécurité des systèmes d'information",
            "Gestion de projets agiles"
        ],
        admission_requirements: [
            "Baccalauréat C, D, E ou équivalent",
            "Dossier scolaire complet",
            "Entretien de motivation"
        ],
        career_opportunities: [
            "Développeur Web/Mobile",
            "Architecte Logiciel",
            "Consultant IT",
            "DevOps Engineer"
        ]
    } : null);


    return (
        <div className="min-h-screen bg-[#FDFBF7] font-academic text-slate-900 selection:bg-crec-gold/30 pt-24 pb-16">
            <div className="container mx-auto px-4">
                {/* Breadcrumb / Back */}
                <div className="mb-8">
                    <Link to="/formations/university" className="inline-flex items-center text-slate-600 hover:text-crec-gold transition-colors font-academic">
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Retour aux facultés
                    </Link>
                </div>

                {/* Header */}
                <div className="bg-white p-8 md:p-12 border border-slate-200 shadow-sm mb-12 relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="bg-crec-gold/10 text-crec-darkblue px-3 py-1 text-sm font-bold tracking-wider uppercase border border-crec-gold/20">
                                        {displayProgram.level?.includes('YEAR') ? getLevelLabel(displayProgram.level) : displayProgram.level}
                                    </span>
                                    <span className="text-slate-500 text-sm flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {displayProgram.duration?.includes('YEAR') ? getDurationLabel(displayProgram.duration) : displayProgram.duration}
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-medium text-crec-darkblue font-academic mb-4">
                                    {displayProgram.name}
                                </h1>
                            </div>
                            <div className="hidden md:block opacity-10">
                                <BookOpen className="w-32 h-32 text-crec-darkblue" />
                            </div>
                        </div>
                    </div>
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-crec-gold/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-crec-darkblue mb-6 border-b border-crec-gold/20 pb-4 font-academic">Description du Programme</h2>
                            <p className="text-lg text-slate-700 leading-relaxed font-light text-justify">
                                {displayProgram.description}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-crec-darkblue mb-6 border-b border-crec-gold/20 pb-4 font-academic">Détails et Objectifs</h2>
                            <div className="grid grid-cols-1 gap-4">
                                {displayProgram.program_details?.map((detail: string, i: number) => (
                                    <div key={i} className="flex items-start gap-3 bg-white p-4 border border-slate-100 shadow-sm">
                                        <CheckCircle2 className="w-5 h-5 text-crec-gold shrink-0 mt-0.5" />
                                        <span className="text-slate-700">{detail}</span>
                                    </div>
                                )) || (
                                        <p className="text-slate-500 italic">Détails disponibles sur demande.</p>
                                    )}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-crec-darkblue mb-6 border-b border-crec-gold/20 pb-4 font-academic">Conditions d'Admission</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {displayProgram.admission_requirements?.map((req: string, i: number) => (
                                    <div key={i} className="flex items-start gap-3 bg-white p-4 border border-slate-100 shadow-sm">
                                        <FileText className="w-5 h-5 text-crec-gold shrink-0 mt-0.5" />
                                        <span className="text-slate-700">{req}</span>
                                    </div>
                                )) || (
                                        <p className="text-slate-500 italic">Information disponible au secrétariat.</p>
                                    )}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-crec-darkblue mb-6 border-b border-crec-gold/20 pb-4 font-academic">Débouchés Professionnels</h2>
                            <div className="flex flex-wrap gap-3">
                                {displayProgram.career_opportunities?.map((opp: string, i: number) => (
                                    <span key={i} className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-medium border border-slate-200">
                                        {opp}
                                    </span>
                                )) || (
                                        <p className="text-slate-500 italic">Information indisponible.</p>
                                    )}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-crec-darkblue text-white p-8 relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-6 font-academic">Candidater à ce programme</h3>
                                <p className="text-slate-300 mb-8 text-sm leading-relaxed">
                                    Les admissions sont ouvertes pour l'année académique 2025-2026. Rejoignez l'élite.
                                </p>
                                <Link to="/formations/university/inscription">
                                    <Button className="w-full bg-crec-gold text-crec-darkblue hover:bg-white font-bold py-6 uppercase tracking-widest text-sm rounded-none">
                                        Déposer mon dossier
                                    </Button>
                                </Link>
                            </div>
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        </div>

                        <div className="bg-white p-6 border border-slate-200">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Documents Requis</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-sm text-slate-600">
                                    <FileText className="w-4 h-4 text-crec-gold" />
                                    Relevés de notes (Bac)
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-600">
                                    <FileText className="w-4 h-4 text-crec-gold" />
                                    Lettre de motivation
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-600">
                                    <FileText className="w-4 h-4 text-crec-gold" />
                                    Pièce d'identité
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UniversityProgramPage;
