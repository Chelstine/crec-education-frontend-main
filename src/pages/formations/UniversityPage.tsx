import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileText, Users, GraduationCap, BookOpen, DollarSign, CheckCircle2, ChevronDown, ChevronRight } from 'lucide-react';
import { useUniversityPrograms } from '@/hooks/useUniversityPrograms';
import { PublicUniversityProgram } from '@/types/university';

const UniversityPage = () => {
  const { data: programs = [], isLoading, error } = useUniversityPrograms();
  const [expandedPrograms, setExpandedPrograms] = useState<Record<number, boolean>>({});

  const toggleProgram = (programId: number) => {
    setExpandedPrograms(prev => ({
      ...prev,
      [programId]: !prev[programId]
    }));
  };

  const getLevelLabel = (level: string) => {
    switch (level.toUpperCase()) {
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

  const formatCurrency = (amount: number, currency: string = 'FCFA') => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ` ${currency}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des programmes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Erreur de chargement</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-[url('/img/crec3.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/60 to-blue-900/90 backdrop-blur-[2px]" />
        <div className="min-h-[350px] md:min-h-[400px] flex flex-col items-center justify-center text-center relative z-10 text-white p-6 md:p-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4 inline-flex px-4 py-2 rounded-full items-center bg-white/10 backdrop-blur-md border border-white/20">
              <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2" />
              <span className="text-sm font-medium">Excellence Académique</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight">
              ISTMR
            </h1>
            <h2 className="text-xl font-medium text-blue-200 mb-3">
              Institut des Sciences et Technologies Matteo Ricci
            </h2>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8">
              "Formez-vous au numérique avec une éducation jésuite d'excellence, ancrée dans la foi, le service et l'innovation technologique au cœur de l'Afrique."
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/formations/university/inscription"
                className="px-6 py-3 bg-yellow-500 text-white font-medium rounded-full hover:bg-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                S'inscrire maintenant
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 border border-white/70 text-white hover:bg-white/20 rounded-full transition-all duration-300"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-[60px]"
            fill="#f9fafb"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,213.35,56.44Z" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-8">
            À propos de l'ISTMR
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed text-justify">
            <p>
              Fondé par la Compagnie de Jésus au Bénin, l'Institut des Sciences et
              Technologies Matteo Ricci (ISTMR) forme des techniciens, ingénieurs et
              chercheurs dans le domaine du numérique. Situé à Godomey-Salamey, l'ISTMR
              s'inspire de Matteo Ricci, jésuite italien prônant le dialogue des
              cultures à travers les sciences.
            </p>
            <p>
              Ancré dans la tradition éducative jésuite (<em>Ratio Studiorum</em>,
              1586), l'ISTMR promeut la <em>cura personalis</em>, le <em>magis</em>, le{' '}
              <em>tantum quantum</em>, et la solidarité. Notre mission : former des
              leaders éthiques pour le développement de l'Afrique.
            </p>
            <p>
              Sous l'égide du Centre de Recherche d'Étude et de Créativité (CREC),
              l'ISTMR propose des formations en informatique, avec des projets
              d'extension vers les télécommunications et l'électronique, soutenus par
              un réseau de 195 universités jésuites.
            </p>
          </div>
        </div>
      </section>

      {/* Matteo Ricci Section */}
      <section id="matteo-ricci" className="py-16 bg-gradient-to-br from-yellow-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-8">
            Matteo Ricci (1552-1610)
          </h2>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12">
            Pionnier du dialogue interculturel et de l'éducation scientifique
          </p>
          <div className="flex justify-center gap-4 mb-12">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-md">
              <img
                src="/img/matteo-ricci/matteo1.jpeg"
                alt="Portrait de Matteo Ricci"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-md">
              <img
                src="/img/matteo-ricci/matteo2.jpeg"
                alt="Matteo Ricci en Chine"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-md">
              <img
                src="/img/matteo-ricci/matteo3.jpeg"
                alt="Œuvre de Matteo Ricci"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold text-blue-900 mb-3">
                    🌏 Dialogue Interculturel
                  </h3>
                  <p className="text-gray-700">
                    Matteo Ricci, jésuite italien, fut le premier occidental admis
                    dans la Cité Interdite de Pékin. Il apprit le mandarin et
                    traduisit les classiques occidentaux, intégrant la culture
                    chinoise.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold text-blue-900 mb-3">
                    🔬 Scientifique Innovant
                  </h3>
                  <p className="text-gray-700">
                    Expert en mathématiques et astronomie, Ricci introduisit les
                    sciences européennes en Chine, traduisant les Éléments
                    d'Euclide et créant la première carte du monde en chinois.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold text-blue-900 mb-3">
                    💡 Héritage
                  </h3>
                  <p className="text-gray-700">
                    Son approche d'« accommodation culturelle » inspire l'ISTMR à
                    allier excellence académique et adaptation au contexte africain
                    pour former des leaders technologiques.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white p-8 rounded-xl shadow-md text-center">
                <div className="w-24 h-24 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                  <BookOpen className="w-12 h-12 text-blue-900" />
                </div>
                <blockquote className="text-lg italic text-blue-900 mb-4">
                  "L'amitié est la seule voie qui mène les cœurs des hommes vers la
                  vérité"
                </blockquote>
                <p className="text-blue-900 font-medium">— Matteo Ricci</p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600">28</p>
                    <p className="text-sm text-gray-700">ans en Chine</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600">1610</p>
                    <p className="text-sm text-gray-700">décès à Pékin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rentrée Scolaire Section */}
      <section className="py-16 bg-gradient-to-b from-blue-900 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Rentrée Scolaire 2025-2026
          </h2>
          <div className="flex justify-center mb-8">
            <div className="w-20 h-1 bg-yellow-500"></div>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-xl">
            <div className="text-center mb-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-500 text-white mx-auto">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="font-medium">Première promotion</span>
              </div>
            </div>
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-center mb-4">
                Préparez votre avenir numérique avec l'ISTMR
              </h3>
              <p className="text-white/90 leading-relaxed text-center mb-8">
                Notre établissement est fier d'accueillir sa première promotion d'étudiants en informatique
                pour l'année académique 2025-2026. Rejoignez cette aventure unique et devenez les
                pionniers d'une formation d'excellence au service du développement de l'Afrique.
              </p>
              
              {/* Informations dynamiques basées sur les programmes */}
              {programs.length > 0 && (
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {/* Date de début - utilise la première date trouvée */}
                  {(() => {
                    const programWithStartDate = programs.find(p => p.start_date);
                    return programWithStartDate ? (
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10 flex flex-col items-center text-center">
                        <Calendar className="w-8 h-8 text-yellow-500 mb-2" />
                        <h4 className="font-medium mb-1">Début des cours</h4>
                        <p className="text-white/80">
                          {programWithStartDate.start_date ? new Date(programWithStartDate.start_date).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          }) : 'À confirmer'}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10 flex flex-col items-center text-center">
                        <Calendar className="w-8 h-8 text-yellow-500 mb-2" />
                        <h4 className="font-medium mb-1">Début des cours</h4>
                        <p className="text-white/80">2 octobre 2025</p>
                      </div>
                    );
                  })()}
                  
                  {/* Période d'inscription - utilise la première date limite trouvée */}
                  {(() => {
                    const programWithDeadline = programs.find(p => p.registration_deadline);
                    return programWithDeadline ? (
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10 flex flex-col items-center text-center">
                        <FileText className="w-8 h-8 text-yellow-500 mb-2" />
                        <h4 className="font-medium mb-1">Date limite d'inscription</h4>
                        <p className="text-white/80">
                          {programWithDeadline.registration_deadline ? new Date(programWithDeadline.registration_deadline).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          }) : 'À confirmer'}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10 flex flex-col items-center text-center">
                        <FileText className="w-8 h-8 text-yellow-500 mb-2" />
                        <h4 className="font-medium mb-1">Période d'inscription</h4>
                        <p className="text-white/80">15 mai - 30 sept. 2025</p>
                      </div>
                    );
                  })()}
                  
                  {/* Places disponibles - somme des capacités */}
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10 flex flex-col items-center text-center">
                    <Users className="w-8 h-8 text-yellow-500 mb-2" />
                    <h4 className="font-medium mb-1">Places disponibles</h4>
                    <p className="text-white/80">
                      {programs.reduce((total, program) => total + (program.capacity || 0), 0)} au total
                    </p>
                  </div>
                </div>
              )}
              
              {/* Section statique si aucun programme */}
              {programs.length === 0 && (
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10 flex flex-col items-center text-center">
                    <Calendar className="w-8 h-8 text-yellow-500 mb-2" />
                    <h4 className="font-medium mb-1">Début des cours</h4>
                    <p className="text-white/80">2 octobre 2025</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10 flex flex-col items-center text-center">
                    <FileText className="w-8 h-8 text-yellow-500 mb-2" />
                    <h4 className="font-medium mb-1">Période d'inscription</h4>
                    <p className="text-white/80">15 mai - 30 sept. 2025</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10 flex flex-col items-center text-center">
                    <Users className="w-8 h-8 text-yellow-500 mb-2" />
                    <h4 className="font-medium mb-1">Places disponibles</h4>
                    <p className="text-white/80">30 par filière</p>
                  </div>
                </div>
              )}
              
              <div className="text-center">
                <Link
                  to="/formations/university/inscription"
                  className="inline-flex items-center px-8 py-3 bg-white text-blue-900 rounded-full hover:bg-yellow-500 hover:text-white transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Réserver ma place
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
            Nos programmes en informatique
          </h2>
          {programs.length === 0 ? (
            <div className="text-center py-12">
              <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Programmes en cours de préparation</h3>
              <p className="text-gray-500">Nos programmes seront bientôt disponibles. Revenez prochainement !</p>
            </div>
          ) : (
            programs
              .filter(program => program.is_active)
              .map((program, i) => (
                <div
                  key={program.id}
                  className="mb-12 border-b border-gray-200 pb-12 last:border-0 last:pb-0"
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Image */}
                    <div className="md:w-1/3">
                      <div className="rounded-xl overflow-hidden shadow-lg">
                        <img
                          src={program.image || "/img/dev-logiciel.png"}
                          alt={program.name}
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    </div>
                    {/* Content */}
                    <div className="md:w-2/3">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {getLevelLabel(program.level)}
                        </span>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Calendar className="w-4 h-4 text-blue-900" />
                          <span>{getDurationLabel(program.duration || '3_YEARS')}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Users className="w-4 h-4 text-blue-900" />
                          <span>Capacité: <strong>{program.capacity}</strong> étudiants</span>
                        </div>
                        {program.is_featured && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Mis en avant
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-blue-900 mb-3">
                        {program.name}
                      </h3>
                      <p className="text-gray-700 text-base mb-6 leading-relaxed">
                        {program.description}
                      </p>
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        {/* Prérequis */}
                        {program.requirements && program.requirements.length > 0 && (
                          <div className="bg-blue-50 p-5 rounded-lg shadow-sm border border-blue-100">
                            <h4 className="text-blue-900 font-semibold mb-3 flex items-center gap-2">
                              <BookOpen className="w-5 h-5 text-white bg-blue-900 p-1 rounded-full" />
                              Prérequis
                            </h4>
                            <ul className="space-y-2">
                              {program.requirements.map((req, j) => (
                                <li key={j} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-1 shrink-0" />
                                  <span className="text-gray-700 text-sm">{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {/* Débouchés */}
                        {program.career_opportunities && program.career_opportunities.length > 0 && (
                          <div className="bg-green-50 p-5 rounded-lg shadow-sm border border-green-100">
                            <h4 className="text-blue-900 font-semibold mb-3 flex items-center gap-2">
                              <GraduationCap className="w-5 h-5 text-white bg-blue-900 p-1 rounded-full" />
                              Débouchés professionnels
                            </h4>
                            <ul className="space-y-2">
                              {program.career_opportunities.map((deb, j) => (
                                <li key={j} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 shrink-0" />
                                  <span className="text-gray-700 text-sm">{deb}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-blue-900" />
                          <span className="text-blue-900 font-semibold">
                            {formatCurrency(program.tuition_fee, program.currency || 'FCFA')} / an
                          </span>
                        </div>
                        <Link
                          to="/formations/university/inscription"
                          className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-900 text-white rounded-lg hover:bg-yellow-500 transition-all duration-300 font-medium"
                        >
                          S'inscrire à cette formation
                          <FileText className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      </section>

      {/* Curriculum and Documents Requirements Section */}
      {programs.length > 0 && programs.some(p => (p.curriculum && p.curriculum.length > 0) || (p.admission_requirements && p.admission_requirements.length > 0)) && (
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
              Curriculum et exigences documentaires
            </h2>
            <div className="space-y-6">
              {programs
                .filter(program => program.is_active && ((program.curriculum && program.curriculum.length > 0) || (program.admission_requirements && program.admission_requirements.length > 0)))
                .map((program, i) => {
                  const isExpanded = expandedPrograms[program.id] || false;
                  return (
                    <div
                      key={program.id}
                      className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden"
                    >
                      {/* Header clickable */}
                      <div 
                        className="p-6 cursor-pointer hover:bg-blue-50 transition-colors duration-200"
                        onClick={() => toggleProgram(program.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center">
                              <GraduationCap className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-xl md:text-2xl font-bold text-blue-900">
                                {program.name}
                              </h3>
                              <p className="text-blue-600 font-medium">
                                {getLevelLabel(program.level)} - {getDurationLabel(program.duration || '3_YEARS')}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-blue-600">
                            <span className="text-sm font-medium hidden md:inline">
                              {isExpanded ? 'Masquer' : 'Voir le détail'}
                            </span>
                            {isExpanded ? (
                              <ChevronDown className="w-6 h-6 transition-transform duration-200" />
                            ) : (
                              <ChevronRight className="w-6 h-6 transition-transform duration-200" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Content collapsible */}
                      <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-none opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="p-6 pt-0">
                          <div className="grid md:grid-cols-2 gap-8">
                            {/* Curriculum Section */}
                            {program.curriculum && program.curriculum.length > 0 && (
                              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                                <h4 className="text-blue-900 font-bold text-lg mb-4 flex items-center gap-2">
                                  <BookOpen className="w-5 h-5 text-white bg-blue-900 p-1 rounded-full" />
                                  Programme d'études (Curriculum)
                                </h4>
                                <div className="space-y-3">
                                  {program.curriculum.map((item, j) => (
                                    <div key={j} className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm">
                                      <div className="w-6 h-6 bg-blue-900 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                                        {j + 1}
                                      </div>
                                      <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Admission Requirements Section */}
                            {program.admission_requirements && program.admission_requirements.length > 0 && (
                              <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-6 rounded-xl border border-amber-200">
                                <h4 className="text-blue-900 font-bold text-lg mb-4 flex items-center gap-2">
                                  <FileText className="w-5 h-5 text-white bg-blue-900 p-1 rounded-full" />
                                  Documents requis pour l'admission
                                </h4>
                                <div className="space-y-3">
                                  {program.admission_requirements.map((req, j) => (
                                    <div key={j} className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm">
                                      <CheckCircle2 className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                                      <span className="text-gray-700 text-sm leading-relaxed">{req}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Call to action for this specific program */}
                          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                            <p className="text-gray-600 mb-4">
                              Intéressé(e) par ce programme ? Commencez votre inscription dès maintenant.
                            </p>
                            <Link
                              to="/formations/university/inscription"
                              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-yellow-500 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                            >
                              <FileText className="w-5 h-5" />
                              M'inscrire à {program.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      )}

      {/* Faculty Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
            Notre corps enseignant
          </h2>
          <div className="space-y-6">
            <p className="text-gray-700 text-lg leading-relaxed text-justify">
              L'ISTMR s'appuie sur une équipe d'enseignants qualifiés, composée de
              professeurs, docteurs, ingénieurs et chercheurs issus du réseau jésuite
              mondial. Dirigé par le Père Eugène Didier Ahouanmènou Goussikindey, notre
              corps enseignant allie expertise académique et engagement éthique.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-blue-900">
                  Professeurs et Docteurs
                </h3>
                <p className="text-gray-700 text-sm">
                  Équipe d'enseignants-chercheurs qualifiés
                </p>
                <p className="text-gray-700 text-sm mt-2">
                  Expertise : Sciences informatiques et technologies
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-blue-900">
                  Ingénieurs et Praticiens
                </h3>
                <p className="text-gray-700 text-sm">Professionnels de l'industrie</p>
                <p className="text-gray-700 text-sm mt-2">
                  Expertise : Développement et gestion de projets
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-blue-900">
                  Chercheurs Internationaux
                </h3>
                <p className="text-gray-700 text-sm">Réseau jésuite mondial</p>
                <p className="text-gray-700 text-sm mt-2">
                  Expertise : Innovation et recherche appliquée
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Process Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Comment s'inscrire
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Suivez notre processus d'inscription simple et efficace pour rejoindre l'ISTMR et commencer votre parcours de formation.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="relative">
              <div className="absolute left-0 md:left-[50%] top-0 bottom-0 w-0.5 bg-yellow-500/20 hidden md:block"></div>
              <div className="space-y-12">
                {[
                  {
                    icon: FileText,
                    title: "Préparation du dossier d'inscription",
                    desc: "Rassemblez les documents requis : acte de naissance, attestation du baccalauréat, relevés de notes, photo d'identité, et lettre de motivation.",
                    color: 'bg-blue-100 text-blue-600 border-blue-200',
                  },
                  {
                    icon: Calendar,
                    title: 'Soumission de votre candidature',
                    desc: 'Déposez votre dossier complet via notre plateforme en ligne ou directement à notre secrétariat avant la date limite du 30 septembre 2025.',
                    color: 'bg-yellow-100 text-yellow-600 border-yellow-200',
                  },
                  {
                    icon: GraduationCap,
                    title: 'Étude de votre dossier',
                    desc: "Votre dossier est examiné par notre comité d'admission qui évalue votre parcours académique et votre motivation.",
                    color: 'bg-green-100 text-green-600 border-green-200',
                  },
                  {
                    icon: Users,
                    title: "Confirmation d'admission",
                    desc: "Recevez votre lettre d'admission et les instructions pour finaliser votre inscription et accéder à votre espace étudiant.",
                    color: 'bg-purple-100 text-purple-600 border-purple-200',
                  },
                ].map((step, i) => (
                  <div
                    key={i}
                    className={`flex ${i % 2 === 1 ? 'md:flex-row-reverse' : ''} items-center gap-6 md:gap-12`}
                  >
                    <div className="relative shrink-0">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${step.color} shadow-sm border z-10`}>
                        <step.icon className="w-8 h-8" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-blue-900 text-white flex items-center justify-center text-sm font-bold">
                        {i + 1}
                      </div>
                    </div>
                    <div className={`flex-1 p-6 rounded-xl bg-gray-50 border border-gray-100 shadow-sm ${i % 2 === 1 ? 'text-right' : ''}`}>
                      <h3 className="font-bold text-lg text-blue-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-12 pt-6 border-t border-gray-200 text-center">
              <Link
                to="/formations/university/inscription"
                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-900 text-white rounded-lg hover:bg-yellow-500 transition-all duration-300 font-medium shadow-lg"
              >
                <FileText className="w-5 h-5" />
                Commencer mon inscription maintenant
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UniversityPage;