import { Link } from 'react-router-dom';
import { useUniversityPrograms } from '@/hooks/useUniversityPrograms';
import { useEffect, useState, useRef } from 'react';
import { ArrowRight, Clock, GraduationCap, Heart, Lightbulb, ChevronRight, BookOpen } from 'lucide-react';

/* ── Typing animation hook ── */
const useTypingEffect = (texts: string[], speed = 80, pause = 2000) => {
    const [displayText, setDisplayText] = useState('');
    const [textIdx, setTextIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const current = texts[textIdx];
        let timeout: number;

        if (!isDeleting && charIdx < current.length) {
            timeout = window.setTimeout(() => setCharIdx(c => c + 1), speed);
        } else if (!isDeleting && charIdx === current.length) {
            timeout = window.setTimeout(() => setIsDeleting(true), pause);
        } else if (isDeleting && charIdx > 0) {
            timeout = window.setTimeout(() => setCharIdx(c => c - 1), speed / 2);
        } else if (isDeleting && charIdx === 0) {
            setIsDeleting(false);
            setTextIdx((i) => (i + 1) % texts.length);
        }

        setDisplayText(current.substring(0, charIdx));
        return () => clearTimeout(timeout);
    }, [charIdx, isDeleting, textIdx, texts, speed, pause]);

    return displayText;
};

/* ── Scroll reveal hook ── */
const useScrollReveal = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.15 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return { ref, isVisible };
};

/* ── Mouse follow hook ── */
const useMousePosition = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    return mousePos;
};

/* ── Animated counter ── */
const AnimCounter = ({ end, suffix = '' }: { end: number; suffix?: string }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started.current) {
                started.current = true;
                let current = 0;
                const step = Math.ceil(end / 40);
                const timer = setInterval(() => {
                    current += step;
                    if (current >= end) { setCount(end); clearInterval(timer); }
                    else setCount(current);
                }, 30);
            }
        }, { threshold: 0.5 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [end]);

    return <span ref={ref}>{count}{suffix}</span>;
};

const UniversityHomePage = () => {
    const { data: programs, isLoading } = useUniversityPrograms();
    const [statsData, setStatsData] = useState<any>(null);
    const mousePos = useMousePosition();
    const featuredPrograms = programs.filter((p: any) => p.is_featured).slice(0, 3);
    const displayPrograms = featuredPrograms.length > 0 ? featuredPrograms : programs.slice(0, 3);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/university-stats`);
                const data = await response.json();
                setStatsData(data);
            } catch (err) {
                console.error('Failed to fetch stats:', err);
            }
        };
        fetchStats();
    }, []);

    const typedText = useTypingEffect([
        'Excellence académique',
        'Valeurs ignatiennes',
        'Innovation responsable',
        'Service aux autres',
    ]);
    const typedP1 = useTypingEffect(['Fondé par la Compagnie de Jésus au Bénin, l\'Institut des Sciences et Technologies Matteo Ricci (ISTMR) forme des techniciens, ingénieurs et chercheurs dans le domaine du numérique. Situé à Godomey-Salamey, l\'ISTMR s\'inspire de Matteo Ricci, jésuite italien prônant le dialogue des cultures à travers les sciences.'], 20, 10000000);
    const typedP2 = useTypingEffect(['Ancré dans la tradition éducative jésuite (Ratio Studiorum, 1586), l\'ISTMR promeut la cura personalis, le magis, le tantum quantum, et la solidarité. Notre mission : former des leaders éthiques pour le développement de l\'Afrique.'], 20, 10000000);
    const typedP3 = useTypingEffect(['Sous l\'égide du Centre de Recherche, d\'Étude et de Créativité (CREC), l\'ISTMR propose des formations en informatique, avec des projets d\'extension vers les télécommunications et l\'électronique, soutenus par un réseau de 195 universités jésuites.'], 20, 10000000);

    const mission = useScrollReveal();
    const values = useScrollReveal();
    const progs = useScrollReveal();
    const cta = useScrollReveal();

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

    return (
        <div className="overflow-hidden">
            {/* ═══════════════════════════════════════════════════ */}
            {/* HERO — Light, airy, animated                      */}
            {/* ═══════════════════════════════════════════════════ */}
            <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FDFBF7] via-white to-[#F5F0E8]">
                {/* Decorative shapes */}
                <div className="absolute top-20 right-10 w-72 h-72 bg-[#C5A55A]/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#1B2A4A]/3 rounded-full blur-3xl" />
                <div className="absolute top-40 left-1/4 w-1 h-32 bg-gradient-to-b from-[#C5A55A]/20 to-transparent" />
                <div className="absolute bottom-40 right-1/3 w-1 h-24 bg-gradient-to-b from-[#1B2A4A]/10 to-transparent" />

                <div className="relative z-10 container mx-auto px-6 text-center pt-24">
                    {/* Logo */}
                    <div className="mb-10 animate-[fadeInDown_1s_ease-out]">
                        <img
                            src="/img/logo_istmr.png"
                            alt="ISTMR"
                            className="mx-auto w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-sm"
                        />
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-6xl lg:text-8xl text-[#0F172A] leading-[0.95] mb-8 animate-[fadeInUp_1s_ease-out_0.3s_both] font-medium tracking-tighter">
                        Institut des Sciences<br />
                        et Technologies<br />
                        <span className="text-[#B8860B]">Matteo Ricci</span>
                    </h1>

                    {/* Typing effect */}
                    <div className="h-10 flex items-center justify-center mb-8 animate-[fadeInUp_1s_ease-out_0.6s_both]">
                        <span className="text-lg md:text-xl text-[#1B2A4A]/40">
                            {typedText}
                            <span className="inline-block w-[2px] h-5 bg-[#C5A55A] ml-1 animate-pulse" />
                        </span>
                    </div>

                    {/* Motto */}
                    <p className="text-sm text-[#0F172A]/70 italic mb-12 tracking-widest animate-[fadeInUp_1s_ease-out_0.9s_both] font-medium uppercase">
                        "Former l'élite de demain dans le respect des valeurs chrétiennes et de l'excellence académique."
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[fadeInUp_1s_ease-out_1.2s_both]">
                        <Link
                            to="/istmr/programmes"
                            className="group inline-flex items-center gap-3 px-10 py-5 bg-[#0F172A] text-white text-[13px] font-bold uppercase tracking-[0.2em] hover:bg-[#B8860B] transition-all duration-700 shadow-xl shadow-slate-200"
                        >
                            Explorer le Catalogue
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </Link>
                        <Link
                            to="/istmr/admissions/postuler"
                            className="inline-flex items-center gap-2 px-8 py-4 border border-[#1B2A4A]/15 text-[#1B2A4A]/60 text-[12px] uppercase tracking-[0.15em] hover:border-[#C5A55A] hover:text-[#C5A55A] transition-all duration-500"
                        >
                            Postuler
                        </Link>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
                    <div className="w-5 h-8 border border-[#1B2A4A]/15 rounded-full flex justify-center pt-1.5">
                        <div className="w-1 h-2 bg-[#C5A55A]/40 rounded-full" />
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════ */}
            {/* HERITAGE & MISSION — Clean, centered                */}
            {/* ═══════════════════════════════════════════════════ */}
            <section className="py-28 bg-white" ref={mission.ref}>
                <div className={`container mx-auto px-6 transition-all duration-1000 ${mission.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-4 mb-8">
                            <span className="h-px w-12 bg-[#C5A55A]"></span>
                            <span className="text-[#1B2A4A] font-bold uppercase tracking-widest text-[11px]">Notre Héritage</span>
                            <span className="h-px w-12 bg-[#C5A55A]"></span>
                        </div>

                        <p className="text-xl md:text-2xl text-[#1B2A4A]/80 leading-[1.8] font-light mb-8 text-justify min-h-[120px]">
                            {typedP1}
                        </p>
                        <p className="text-xl md:text-2xl text-[#1B2A4A]/80 leading-[1.8] font-light mb-8 text-justify min-h-[120px]">
                            {typedP2}
                        </p>
                        <p className="text-xl md:text-2xl text-[#1B2A4A]/80 leading-[1.8] font-light text-justify mb-16 min-h-[120px]">
                            {typedP3}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left border-t border-[#B8860B]/20 pt-16">
                            <div className="group">
                                <h3 className="text-xl text-[#0F172A] font-medium mb-3 group-hover:text-[#B8860B] transition-colors">Dialogue Interculturel</h3>
                                <p className="text-[#1B2A4A]/70 leading-relaxed text-sm group-hover:text-[#1B2A4A] transition-colors">
                                    Matteo Ricci fut le premier occidental admis dans la Cité Interdite. Il apprit le mandarin et traduisit les classiques occidentaux, intégrant la culture chinoise.
                                </p>
                            </div>
                            <div className="group">
                                <h3 className="text-xl text-[#0F172A] font-medium mb-3 group-hover:text-[#B8860B] transition-colors">Scientifique Innovant</h3>
                                <p className="text-[#1B2A4A]/70 leading-relaxed text-sm group-hover:text-[#1B2A4A] transition-colors">
                                    Expert en mathématiques et astronomie, Ricci introduisit les sciences européennes en Chine et créa la première carte du monde en chinois.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════ */}
            {/* STATS — Animated counters                         */}
            {/* ═══════════════════════════════════════════════════ */}
            <section className="py-20 bg-white border-y border-[#C5A55A]/20">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap justify-center gap-12 md:gap-24">
                        {[
                            { num: statsData?.istm?.applications || 0, suffix: '', label: 'Candidatures reçues' },
                            { num: statsData?.istm?.total || 0, suffix: '', label: 'Filières ouvertes' },
                            { num: 12, suffix: '', label: 'Docteurs & Chercheurs' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center group min-w-[200px]">
                                <div className="text-6xl md:text-8xl text-[#0F172A] font-medium mb-4 transition-all duration-700 group-hover:text-[#B8860B] group-hover:scale-110 tracking-tighter">
                                    <AnimCounter end={stat.num} suffix={stat.suffix} />
                                </div>
                                <div className="w-12 h-[2px] bg-[#B8860B] mx-auto mb-6" />
                                <p className="text-[13px] text-[#A38A4D] font-bold uppercase tracking-[0.3em]">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════ */}
            {/* VALUES — Three flowing sections, NOT cards        */}
            {/* ═══════════════════════════════════════════════════ */}
            <section className="py-28 bg-white" ref={values.ref}>
                <div className={`container mx-auto px-6 transition-all duration-1000 ${values.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="text-center mb-24">
                        <p className="text-[14px] text-[#B8860B] font-bold uppercase tracking-[0.4em] mb-4">L'Esprit ISTMR</p>
                        <h2 className="text-4xl md:text-6xl text-[#0F172A] font-medium tracking-tighter">Ce qui nous <em className="not-italic text-[#B8860B]">distingue</em></h2>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-20">
                        {/* Value 1 */}
                        <div className="flex flex-col md:flex-row items-center gap-10 group">
                            <div className="w-20 h-20 border border-[#C5A55A]/15 flex items-center justify-center shrink-0 group-hover:bg-[#1B2A4A] group-hover:border-[#1B2A4A] transition-all duration-500">
                                <GraduationCap className="w-8 h-8 text-[#C5A55A] group-hover:text-white transition-colors duration-500" />
                            </div>
                            <div>
                                <h3 className="text-2xl text-[#1B2A4A] mb-3">Excellence Académique</h3>
                                <p className="text-[#1B2A4A]/50 leading-[1.8]">
                                    Des programmes conçus selon les standards internationaux, dispensés par un corps professoral de haut niveau.
                                    Chaque formation est pensée pour former des professionnels rigoureux et polyvalents.
                                </p>
                            </div>
                        </div>

                        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C5A55A]/15 to-transparent" />

                        {/* Value 2 */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-10 group">
                            <div className="w-20 h-20 border border-[#C5A55A]/15 flex items-center justify-center shrink-0 group-hover:bg-[#1B2A4A] group-hover:border-[#1B2A4A] transition-all duration-500">
                                <Heart className="w-8 h-8 text-[#C5A55A] group-hover:text-white transition-colors duration-500" />
                            </div>
                            <div className="md:text-right">
                                <h3 className="text-2xl text-[#1B2A4A] mb-3">Valeurs Ignatiennes</h3>
                                <p className="text-[#1B2A4A]/50 leading-[1.8]">
                                    Une formation intégrale alliant savoir, éthique et engagement social. Dans l'héritage de Saint Ignace de Loyola,
                                    nous formons des personnes pour les autres.
                                </p>
                            </div>
                        </div>

                        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C5A55A]/15 to-transparent" />

                        {/* Value 3 */}
                        <div className="flex flex-col md:flex-row items-center gap-10 group">
                            <div className="w-20 h-20 border border-[#C5A55A]/15 flex items-center justify-center shrink-0 group-hover:bg-[#1B2A4A] group-hover:border-[#1B2A4A] transition-all duration-500">
                                <Lightbulb className="w-8 h-8 text-[#C5A55A] group-hover:text-white transition-colors duration-500" />
                            </div>
                            <div>
                                <h3 className="text-2xl text-[#1B2A4A] mb-3">Innovation Responsable</h3>
                                <p className="text-[#1B2A4A]/50 leading-[1.8]">
                                    Préparer les étudiants aux défis du monde moderne grâce à des outils technologiques et une pédagogie innovante,
                                    tout en restant ancré dans des valeurs humanistes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════ */}
            {/* PROGRAMS — Minimal list, not cards                */}
            {/* ═══════════════════════════════════════════════════ */}
            <section className="py-32 bg-[#F9F7F2] relative overflow-hidden" ref={progs.ref}>
                {/* Mouse follow glow */}
                <div
                    className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-1000"
                    style={{
                        background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(184, 134, 11, 0.05), transparent 80%)`,
                        opacity: progs.isVisible ? 1 : 0
                    }}
                />

                <div className={`container mx-auto px-6 relative z-10 transition-all duration-1000 ${progs.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                        <div>
                            <p className="text-[11px] text-[#C5A55A] uppercase tracking-[0.3em] mb-3">Formations</p>
                            <h2 className="text-3xl md:text-5xl text-[#1B2A4A] font-light">Nos Programmes</h2>
                        </div>
                        <Link
                            to="/istmr/programmes"
                            className="group inline-flex items-center gap-2 text-[12px] text-[#1B2A4A]/40 uppercase tracking-[0.15em] hover:text-[#C5A55A] transition"
                        >
                            Voir tout <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-8 h-8 border-2 border-[#C5A55A]/20 border-t-[#C5A55A] rounded-full animate-spin" />
                        </div>
                    ) : displayPrograms.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {displayPrograms.map((program: any, idx: number) => (
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
                                            <span className="text-[11px] text-[#0F172A]/30 flex items-center gap-1 font-medium">
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
                                        <div className="flex items-center gap-2 text-[11px] font-bold text-[#C5A55A] uppercase tracking-wider">
                                            Explorer le cursus
                                        </div>
                                        <div className="w-10 h-10 border border-[#C5A55A]/20 flex items-center justify-center group-hover:bg-[#C5A55A] group-hover:border-[#C5A55A] transition-all duration-500">
                                            <ArrowRight className="w-4 h-4 text-[#C5A55A] group-hover:text-[#0F172A] transition-colors" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white/50 border border-dashed border-[#C5A55A]/20">
                            <BookOpen className="w-10 h-10 text-[#1B2A4A]/10 mx-auto mb-3" />
                            <p className="text-[#1B2A4A]/30 text-sm">Les programmes seront bientôt disponibles.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════ */}
            {/* CTA — Light, elegant                              */}
            {/* ═══════════════════════════════════════════════════ */}
            <section className="py-28 bg-white relative" ref={cta.ref}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#F5F0E8] via-white to-[#FDFBF7]" />
                <div className={`relative z-10 container mx-auto px-6 text-center transition-all duration-1000 ${cta.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="w-12 h-px bg-[#C5A55A] mx-auto mb-10" />
                    <h2 className="text-3xl md:text-5xl text-[#1B2A4A] font-light mb-6">
                        Rejoignez <em className="not-italic text-[#C5A55A]">l'excellence</em>
                    </h2>
                    <p className="text-[#1B2A4A]/40 text-lg mb-10 max-w-md mx-auto">
                        Les admissions sont ouvertes. Construisez votre avenir avec l'ISTMR.
                    </p>
                    <Link
                        to="/istmr/admissions/postuler"
                        className="group inline-flex items-center gap-3 px-10 py-4 bg-[#1B2A4A] text-white text-[12px] uppercase tracking-[0.15em] hover:bg-[#C5A55A] hover:text-[#1B2A4A] transition-all duration-500"
                    >
                        Déposer ma candidature
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default UniversityHomePage;
