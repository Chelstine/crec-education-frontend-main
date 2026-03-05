import React, { useEffect } from 'react';
import { useUniversityPrograms } from '@/hooks/useUniversityPrograms';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Award,
  Users,
  Clock,
  Phone,
  Mail,
  Quote
} from 'lucide-react';
import { Link } from 'react-router-dom';

const UniversityPage = () => {
  const { data: programs = [], isLoading: loading, error } = useUniversityPrograms();

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FDFBF7]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-crec-gold"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-academic text-slate-900 selection:bg-crec-gold/30">
      {/* 1. HERO SECTION: "The Gate of Knowledge" */}
      <section className="relative min-h-screen flex flex-col items-center pt-28 pb-20 overflow-hidden">
        {/* Parallax Background with Dark Overlay */}
        <div
          className="absolute inset-0 z-0 bg-fixed bg-cover bg-center"
          style={{ backgroundImage: "url('/img/crec3.jpg')" }}
        >
          <div className="absolute inset-0 bg-crec-darkblue/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center flex-grow flex flex-col justify-center">
          <div className="animate-in fade-in zoom-in duration-1000">
            {/* ISTMR Logo - Central and Imposing */}
            <div className="mx-auto mb-8 w-56 h-56 md:w-80 md:h-80 flex items-center justify-center">
              <img
                src="/img/istmr_logo_transparent.png"
                alt="Sceau de l'ISTMR"
                className="w-full h-full object-contain drop-shadow-2xl filter brightness-110"
              />
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Refined typography weight - less "coarse" */}
              <h2 className="text-crec-gold uppercase tracking-[0.2em] text-sm md:text-base font-medium mb-2 font-academic">
                Excellence • Tradition • Foi
              </h2>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium text-white leading-tight drop-shadow-lg font-academic">
                Institut des Sciences et Technologies <br /> Matteo Ricci
              </h1>
              <div className="w-24 h-1 bg-crec-gold mx-auto my-8"></div>
              <p className="text-xl md:text-2xl text-slate-200 font-normal italic max-w-2xl mx-auto leading-relaxed">
                "Former l'élite de demain dans le respect des valeurs chrétiennes et de l'excellence académique."
              </p>
            </div>

            <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-crec-gold hover:bg-crec-gold/90 text-crec-darkblue font-medium px-8 py-6 text-lg rounded-none border border-crec-gold shadow-lg uppercase tracking-wider font-academic"
              >
                Candidater pour 2024
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-white text-white hover:bg-white hover:text-crec-darkblue font-medium px-8 py-6 text-lg rounded-none uppercase tracking-wider transition-all font-academic"
              >
                Découvrir nos Facultés
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. IDENTITY & LEGACY: "The Book of History" */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Triptych / Image */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-crec-gold/30 z-0"></div>
              <div className="relative z-10 shadow-2xl">
                <img
                  src="/img/matteo-ricci/matteo1.jpeg"
                  alt="Père Matteo Ricci"
                  className="w-full h-auto object-cover sepia-[0.1]"
                />
                <div className="absolute bottom-0 left-0 w-full bg-crec-darkblue/90 p-6 text-white text-center">
                  <p className="font-academic italic text-lg">"L'amitié est le plus grand trésor."</p>
                  <p className="text-crec-gold text-sm font-bold mt-1 uppercase tracking-widest font-academic">Père Matteo Ricci</p>
                </div>
              </div>
            </div>

            {/* Right: The Narrative */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-4">
                <span className="h-px w-12 bg-crec-gold"></span>
                <span className="text-crec-darkblue font-bold uppercase tracking-widest text-sm font-academic">Notre Héritage</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-medium text-crec-darkblue mb-6 leading-tight font-academic">
                L'Université ISTM-R<br />
                <span className="text-crec-gold italic">Matteo Ricci</span>
              </h2>

              <div className="prose prose-lg text-slate-700 font-light leading-loose text-justify font-academic">
                <p>
                  <span className="float-left text-7xl font-bold text-crec-gold mr-4 mt-[-10px] font-academic">F</span>
                  ondé par la Compagnie de Jésus au Bénin, l'Institut des Sciences et Technologies Matteo Ricci (ISTMR) forme des techniciens, ingénieurs et chercheurs dans le domaine du numérique. Situé à Godomey-Salamey, l'ISTMR s'inspire de Matteo Ricci, jésuite italien prônant le dialogue des cultures à travers les sciences.
                </p>
                <p>
                  Ancré dans la tradition éducative jésuite (<em>Ratio Studiorum</em>, 1586), l'ISTMR promeut la <em>cura personalis</em>, le <em>magis</em>, le <em>tantum quantum</em>, et la solidarité. Notre mission : former des leaders éthiques pour le développement de l'Afrique.
                </p>
                <p>
                  Sous l'égide du Centre de Recherche d'Étude et de Créativité (CREC), l'ISTMR propose des formations en informatique, avec des projets d'extension vers les télécommunications et l'électronique, soutenus par un réseau de 195 universités jésuites.
                </p>

                <h3 className="text-2xl font-bold text-crec-darkblue mt-8 mb-4 font-academic">L'Héritage de Matteo Ricci</h3>
                <ul className="list-none space-y-4">
                  <li className="pl-6 border-l-2 border-crec-gold/30">
                    <strong className="text-crec-darkblue block font-academic text-lg">Dialogue Interculturel</strong>
                    Matteo Ricci fut le premier occidental admis dans la Cité Interdite. Il apprit le mandarin et traduisit les classiques occidentaux, intégrant la culture chinoise.
                  </li>
                  <li className="pl-6 border-l-2 border-crec-gold/30">
                    <strong className="text-crec-darkblue block font-academic text-lg">Scientifique Innovant</strong>
                    Expert en mathématiques et astronomie, Ricci introduisit les sciences européennes en Chine et créa la première carte du monde en chinois.
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-8 mt-8 border-t border-slate-200 pt-8">
                <div>
                  <h4 className="text-4xl font-bold text-crec-gold mb-1 font-academic">15+</h4>
                  <p className="text-crec-darkblue text-sm uppercase font-bold tracking-wider font-academic">Années d'Excellence</p>
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-crec-gold mb-1 font-academic">100%</h4>
                  <p className="text-crec-darkblue text-sm uppercase font-bold tracking-wider font-academic">Taux d'Insertion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ACADEMIC PROGRAMS: "The Faculties" - Card Stock Style */}
      <section className="py-24 bg-[#F2F0E9] border-y border-crec-gold/20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-crec-gold font-bold uppercase tracking-[0.2em] mb-3 text-sm font-academic">Nos Filières d'Excellence</h2>
            <h3 className="text-4xl md:text-5xl font-medium text-crec-darkblue mb-6 font-academic">Les Facultés Académiques</h3>
            <p className="text-slate-600 italic text-lg font-academic">
              "Un cursus rigoureux conçu pour l'élite intellectuelle et morale de la nation."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.length > 0 ? (
              programs.map((program, index) => (
                <div
                  key={index}
                  className="group bg-white p-8 border border-slate-200 hover:border-crec-gold transition-all duration-500 shadow-sm hover:shadow-2xl relative overflow-hidden"
                >
                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <img src="/img/istmr_logo_transparent.png" className="w-24 h-24 grayscale" alt="watermark" />
                  </div>

                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-[#FDFBF7] border border-crec-gold/30 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                      {index % 3 === 0 ? <BookOpen className="w-8 h-8 text-crec-darkblue" /> :
                        index % 3 === 1 ? <Users className="w-8 h-8 text-crec-darkblue" /> :
                          <Award className="w-8 h-8 text-crec-darkblue" />}
                    </div>

                    <h4 className="text-2xl font-bold text-crec-darkblue mb-3 font-academic group-hover:text-crec-gold transition-colors">
                      {program.name}
                    </h4>

                    <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed text-sm border-b border-slate-100 pb-6 font-academic">
                      {program.description || "Un programme d'excellence dédié à la formation approfondie des étudiants, alliant théorie rigoureuse et pratique professionnelle."}
                    </p>

                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center gap-3 text-sm text-slate-700">
                        <Clock className="w-4 h-4 text-crec-gold" />
                        <span className="font-semibold font-academic">{getDurationLabel(program.duration)}</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm text-slate-700">
                        <Award className="w-4 h-4 text-crec-gold" />
                        <span className="font-semibold font-academic">{getLevelLabel(program.level)}</span>
                      </li>
                    </ul>

                    <Link to={`/formations/university/${program.id}`}>
                      <Button className="w-full bg-crec-darkblue text-white hover:bg-crec-gold hover:text-crec-darkblue transition-colors rounded-none uppercase tracking-widest text-xs font-bold py-3 font-academic">
                        Consulter le Programme
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="group bg-white p-8 border border-slate-200 hover:border-crec-gold transition-all duration-500 shadow-sm hover:shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <img src="/img/istmr_logo_transparent.png" className="w-24 h-24 grayscale" alt="watermark" />
                </div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-[#FDFBF7] border border-crec-gold/30 rounded-full flex items-center justify-center mb-6">
                    <BookOpen className="w-8 h-8 text-crec-darkblue" />
                  </div>
                  <h4 className="text-2xl font-bold text-crec-darkblue mb-3 font-academic">Génie Logiciel</h4>
                  <p className="text-slate-600 mb-6 text-sm border-b border-slate-100 pb-6 leading-relaxed font-academic">
                    Formation d'excellence en développement informatique, concevez les solutions logicielles de demain.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-sm text-slate-700">
                      <Clock className="w-4 h-4 text-crec-gold" />
                      <span className="font-semibold font-academic">3 Ans (Licence)</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-700">
                      <Award className="w-4 h-4 text-crec-gold" />
                      <span className="font-semibold font-academic">Diplôme d'État</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-slate-100 text-crec-darkblue hover:bg-crec-gold hover:text-white transition-colors uppercase tracking-widest font-semibold font-academic pointer-events-none opacity-50">
                    Détails Indisponibles
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. ADMISSION PROCESS */}
      <section className="py-24 bg-crec-darkblue text-white relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-crec-gold font-bold uppercase tracking-[0.2em] mb-4 text-sm font-academic">Procédure d'Admission</h2>
              <h3 className="text-4xl md:text-6xl font-medium text-white mb-8 font-academic">
                Rejoindre le<br />Cercle de l'ISTM
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed mb-12 max-w-md font-academic">
                L'admission à l'ISTMR est sélective. Elle est basée sur le mérite académique, la motivation personnelle et l'adhésion aux valeurs de l'institution.
              </p>
              <Link to="/formations/university/inscription">
                <Button className="bg-crec-gold text-crec-darkblue hover:bg-white px-8 py-4 text-lg font-bold rounded-none uppercase tracking-widest shadow-lg font-academic">
                  Télécharger le Dossier
                </Button>
              </Link>
            </div>

            <div className="space-y-12">
              {[
                { title: "Dépôt de Candidature", desc: "Soumission du dossier scolaire complet et de la lettre de motivation.", num: "I" },
                { title: "Étude de Dossier", desc: "Analyse rigoureuse des performances académiques par le jury.", num: "II" },
                { title: "Entretien Individuel", desc: "Rencontre avec la direction pour évaluer la motivation et le projet.", num: "III" },
                { title: "Inscription Définitive", desc: "Validation finale et intégration à la promotion.", num: "IV" }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-16 h-16 bg-white/10 border border-white/20 flex items-center justify-center text-3xl font-bold text-crec-gold group-hover:bg-crec-gold group-hover:text-crec-darkblue transition-all duration-500 font-academic">
                    {step.num}
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-2 font-academic">{step.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-crec-gold/30 pl-4 font-academic">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION - Elegant Footer */}
      <section className="py-20 bg-white border-t-8 border-crec-gold text-center">
        <div className="container mx-auto px-4">
          <Quote className="w-12 h-12 text-crec-gold/30 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-medium text-crec-darkblue mb-6 font-academic">
            "L'éducation ne consiste pas à remplir un seau,<br />mais à allumer un feu."
          </h2>
          <p className="text-slate-500 italic mb-8 font-academic">- William Butler Yeats</p>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <a href="mailto:admission@istmr-crec.org" className="flex items-center gap-3 px-6 py-3 bg-slate-50 border border-slate-200 text-crec-darkblue font-bold hover:border-crec-gold transition-colors font-academic">
              <Mail className="w-5 h-5 text-crec-gold" />
              admission@istmr-crec.org
            </a>
            <a href="tel:+22900000000" className="flex items-center gap-3 px-6 py-3 bg-slate-50 border border-slate-200 text-crec-darkblue font-bold hover:border-crec-gold transition-colors font-academic">
              <Phone className="w-5 h-5 text-crec-gold" />
              +229 00 00 00 00
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UniversityPage;