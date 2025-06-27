import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, FileText, Users, GraduationCap, BookOpen, Heart, Clock, DollarSign, CheckCircle2 } from 'lucide-react';
import { useMultipleContent } from '@/services/contentService';

const programs = [
	{
		id: '1',
		title: 'Développement de logiciels',
		description:
			"Concevez des logiciels robustes et éthiques avec des langages modernes (Java, Python), des méthodologies agiles et une approche centrée sur la résolution de problèmes sociétaux.",
		image: '/img/dev-logiciel.png',
		competences: [
			'Programmation avancée',
			'Architecture logicielle',
			'Gestion de projets agiles',
			'Cybersécurité',
		],
		debouches: [
			'Développeur logiciel',
			'Ingénieur logiciel',
			'Architecte logiciel',
			'Testeur QA',
		],
		profil: 'Passionné par la logique, la structure et le travail collaboratif.',
		type: 'licence',
		duree: '3 ans',
		inscrits: 28,
		fraisInscription: 450000,
		statut: 'active',
	},
	{
		id: '2',
		title: 'Développement Web & Mobile',
		description:
			"Créez des applications web et mobiles innovantes et accessibles, en maîtrisant HTML, CSS, JavaScript, React, Flutter et le design d'interfaces utilisateur.",
		image: '/img/dev-web.png',
		competences: [
			"Design UI/UX",
			"Développement responsive",
			"Intégration d'API",
			"Applications mobiles",
		],
		debouches: [
			'Développeur front-end',
			'Développeur mobile',
			'Intégrateur web',
			'Product builder',
		],
		profil: "Créatif, visuel, et motivé par la concrétisation rapide d'idées.",
		type: 'licence',
		duree: '3 ans',
		inscrits: 23,
		fraisInscription: 450000,
		statut: 'active',
	},
	{
		id: '3',
		title: 'Science des données',
		description:
			"Exploitez les données pour éclairer les décisions avec Python, SQL, PowerBI et des techniques d'intelligence artificielle, dans une perspective éthique et responsable.",
		image: '/img/data-science.png',
		competences: [
			'Analyse de données',
			'Visualisation',
			'Statistiques appliquées',
			'IA de base',
		],
		debouches: [
			'Data analyst',
			'Business analyst',
			'Consultant data',
			'Data scientist',
		],
		profil: 'Curieux, analytique, et attiré par les solutions basées sur les données.',
		type: 'licence',
		duree: '3 ans',
		inscrits: 18,
		fraisInscription: 480000,
		statut: 'active',
	},
];

const UniversityPage = () => {
	const content = useMultipleContent([
		'istmr_hero_title',
		'istmr_hero_subtitle',
		'istmr_hero_description',
		'istmr_about_description',
	]);

	const getTypeColor = (type: string) => {
		switch (type) {
			case 'licence':
				return 'bg-amber-100 text-amber-800';
			case 'master':
				return 'bg-blue-100 text-blue-800';
			case 'specialisation':
				return 'bg-green-100 text-green-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
	};

	return (
		<div className="min-h-screen flex flex-col font-sans bg-gray-50">
			{/* Hero Section - Style harmonisé */}
			<section className="relative w-full overflow-hidden">
				{/* Background with parallax effect */}
				<div className="absolute inset-0 bg-[url('/img/crec3.jpg')] bg-cover bg-center" />
				<div className="absolute inset-0 bg-gradient-to-r from-crec-darkblue/80 via-crec-darkblue/60 to-crec-darkblue/90 backdrop-blur-[2px]" />
				
				{/* Accent elements */}
				<motion.div 
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.15 }}
					transition={{ duration: 1.5 }}
					className="absolute top-20 right-20 w-64 h-64 rounded-full bg-crec-gold blur-3xl"
				/>
				<motion.div 
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.1 }}
					transition={{ duration: 1.5, delay: 0.3 }}
					className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-blue-500 blur-3xl"
				/>
				
				{/* Content */}
				<div className="min-h-[350px] md:min-h-[400px] flex flex-col items-center justify-center text-center relative z-10 text-white p-6 md:p-10">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="max-w-4xl mx-auto"
					>
						<motion.div 
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.8 }}
							className="mb-4 inline-flex px-4 py-2 rounded-full items-center bg-white/10 backdrop-blur-md border border-white/20"
						>
							<motion.div 
								animate={{
									scale: [1, 1.05, 1],
									transition: { 
										repeat: Infinity,
										repeatType: "reverse", 
										duration: 1.5
									}
								}}
								className="w-2 h-2 rounded-full bg-crec-gold mr-2" 
							/>
							<span className="text-sm font-medium">Excellence Académique</span>
						</motion.div>
						
						<h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight">
							{content.istmr_hero_title || 'ISTMR'}
						</h1>
						<h2 className="text-xl font-medium text-blue-200 mb-3">
							{content.istmr_hero_subtitle ||
								'Institut des Sciences et Technologies Matteo Ricci'}
						</h2>
						<p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8">
							{content.istmr_hero_description ||
								"Formez-vous au numérique avec une éducation jésuite d'excellence, ancrée dans la foi, le service et l'innovation technologique au cœur de l'Afrique."}
						</p>
						
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link
								to="/formations/university/inscription"
								className="px-6 py-3 bg-crec-gold text-white font-medium rounded-full hover:bg-amber-500 transition-all duration-300 shadow-lg hover:shadow-xl"
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
					</motion.div>
				</div>
				
				{/* Wave divider */}
				<div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px]" fill="#f9fafb">
						<path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,213.35,56.44Z" />
					</svg>
				</div>
			</section>

			{/* About Section */}
			<section id="about" className="py-16 bg-gray-50">
				<div className="max-w-6xl mx-auto px-4">
					<motion.h2
						className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-8"
						initial={{ opacity: 0, y: -20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						À propos de l'ISTMR
					</motion.h2>
					<motion.div
						className="space-y-6 text-gray-700 text-lg leading-relaxed text-justify"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
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
					</motion.div>
				</div>
			</section>

			{/* Matteo Ricci Section */}
			<section
				id="matteo-ricci"
				className="py-16 bg-gradient-to-br from-amber-50 to-blue-50"
			>
				<div className="max-w-6xl mx-auto px-4">
					<motion.h2
						className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-8"
						initial={{ opacity: 0, y: -20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						Matteo Ricci (1552-1610)
					</motion.h2>
					<motion.p
						className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						Pionnier du dialogue interculturel et de l'éducation scientifique
					</motion.p>

					{/* Photos de Matteo Ricci */}
					<motion.div
						className="flex justify-center gap-4 mb-12"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
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
					</motion.div>

					<div className="grid md:grid-cols-2 gap-12">
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8 }}
						>
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
						</motion.div>
						<motion.div
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8 }}
						>
							<div className="bg-white p-8 rounded-xl shadow-md text-center">
								<div className="w-24 h-24 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-6">
									<BookOpen className="w-12 h-12 text-white" />
								</div>
								<blockquote className="text-lg italic text-blue-900 mb-4">
									"L'amitié est la seule voie qui mène les cœurs des hommes vers la
									vérité"
								</blockquote>
								<p className="text-blue-900 font-medium">— Matteo Ricci</p>
								<div className="grid grid-cols-2 gap-4 mt-6">
									<div className="bg-amber-50 p-4 rounded-lg">
										<p className="text-2xl font-bold text-amber-600">28</p>
										<p className="text-sm text-gray-700">ans en Chine</p>
									</div>
									<div className="bg-amber-50 p-4 rounded-lg">
										<p className="text-2xl font-bold text-amber-600">1610</p>
										<p className="text-sm text-gray-700">décès à Pékin</p>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Rentrée Scolaire Section */}
			<section className="py-16 bg-gradient-to-b from-crec-darkblue to-blue-900 text-white">
				<div className="max-w-6xl mx-auto px-4">
					<motion.h2
						className="text-3xl md:text-4xl font-bold text-center mb-8"
						initial={{ opacity: 0, y: -20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						Rentrée Scolaire 2025-2026
					</motion.h2>
					
					<div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-xl">
						<motion.div 
							className="grid md:grid-cols-2 gap-8 items-center"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8 }}
						>
							<div className="space-y-6">
								<div className="inline-flex items-center px-4 py-2 rounded-full bg-crec-gold text-white">
									<Calendar className="w-4 h-4 mr-2 text-white" />
									<span className="font-medium">Première promotion</span>
								</div>
								
								<h3 className="text-2xl font-bold">Préparez votre avenir numérique avec l'ISTMR</h3>
								
								<p className="text-white/80 leading-relaxed">
									Notre établissement est fier d'accueillir sa première promotion d'étudiants en informatique 
									pour l'année académique 2025-2026. Rejoignez cette aventure unique et devenez les 
									pionniers d'une formation d'excellence au service du développement de l'Afrique.
								</p>
								
								<div className="space-y-3 pt-2">
									<div className="flex items-start gap-2">
										<CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
										<p className="text-white/90">Début des cours: <span className="font-medium">2 octobre 2025</span></p>
									</div>
									<div className="flex items-start gap-2">
										<CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
										<p className="text-white/90">Période d'inscription: <span className="font-medium">15 mai - 30 septembre 2025</span></p>
									</div>
									<div className="flex items-start gap-2">
										<CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
										<p className="text-white/90">Places limitées: <span className="font-medium">30 étudiants par filière</span></p>
									</div>
								</div>
								
								<Link
									to="/formations/university/inscription"
									className="inline-flex items-center mt-4 px-6 py-3 bg-white text-crec-darkblue rounded-full hover:bg-crec-gold hover:text-white transition-all duration-300 font-medium"
								>
									Réserver ma place
									<FileText className="w-4 h-4 ml-2" />
								</Link>
							</div>
							
							<div className="rounded-xl overflow-hidden shadow-xl border-4 border-white/30 hidden md:block">
								<img 
									src="/img/informatique.png" 
									alt="Étudiants en informatique"
									className="w-full h-auto object-cover"
								/>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Programs Section - Redesigned */}
			<section className="py-16 bg-white">
				<div className="max-w-6xl mx-auto px-4">
					<motion.h2
						className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12"
						initial={{ opacity: 0, y: -20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						Nos programmes en informatique
					</motion.h2>
					
					{programs.map((program, i) => (
						<motion.div
							key={program.id}
							className="mb-12 border-b border-gray-200 pb-12 last:border-0 last:pb-0"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: i * 0.2 }}
						>
							<div className="flex flex-col md:flex-row gap-8">
								{/* Image */}
								<div className="md:w-1/3">
									<div className="rounded-xl overflow-hidden shadow-lg">
										<img
											src={program.image}
											alt={program.title}
											className="w-full h-64 object-cover"
										/>
									</div>
								</div>
								
								{/* Content */}
								<div className="md:w-2/3">
									<div className="flex items-center gap-3 mb-2">
										<span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(program.type)}`}>
											{program.type === 'licence' ? 'Licence' : 'Master'}
										</span>
										<div className="flex items-center gap-1 text-sm text-gray-600">
											<Clock className="w-4 h-4 text-crec-darkblue" />
											<span>{program.duree}</span>
										</div>
										<div className="flex items-center gap-1 text-sm text-gray-600">
											<Users className="w-4 h-4 text-crec-darkblue" />
											<span>Capacité: <strong>30</strong> étudiants</span>
										</div>
									</div>
									
									<h3 className="text-2xl font-bold text-crec-darkblue mb-3">
										{program.title}
									</h3>
									
									<p className="text-gray-700 text-base mb-6 leading-relaxed">
										{program.description}
									</p>
									
									<div className="grid md:grid-cols-2 gap-6 mb-6">
										{/* Prérequis */}
										<div className="bg-blue-50 p-5 rounded-lg shadow-sm border border-blue-100">
											<h4 className="text-crec-darkblue font-semibold mb-3 flex items-center gap-2">
												<BookOpen className="w-5 h-5 text-white bg-crec-darkblue p-1 rounded-full" />
												Prérequis
											</h4>
											<ul className="space-y-2">
												<li className="flex items-start gap-2">
													<CheckCircle2 className="w-4 h-4 text-blue-600 mt-1 shrink-0" />
													<span className="text-gray-700 text-sm">Baccalauréat scientifique ou technique</span>
												</li>
												<li className="flex items-start gap-2">
													<CheckCircle2 className="w-4 h-4 text-blue-600 mt-1 shrink-0" />
													<span className="text-gray-700 text-sm">Bon niveau en mathématiques et logique</span>
												</li>
												<li className="flex items-start gap-2">
													<CheckCircle2 className="w-4 h-4 text-blue-600 mt-1 shrink-0" />
													<span className="text-gray-700 text-sm">Intérêt pour les technologies numériques</span>
												</li>
											</ul>
										</div>
										
										{/* Débouchés */}
										<div className="bg-green-50 p-5 rounded-lg shadow-sm border border-green-100">
											<h4 className="text-crec-darkblue font-semibold mb-3 flex items-center gap-2">
												<GraduationCap className="w-5 h-5 text-white bg-crec-darkblue p-1 rounded-full" />
												Débouchés professionnels
											</h4>
											<ul className="space-y-2">
												{program.debouches.map((deb, j) => (
													<li key={j} className="flex items-start gap-2">
														<CheckCircle2 className="w-4 h-4 text-green-600 mt-1 shrink-0" />
														<span className="text-gray-700 text-sm">{deb}</span>
													</li>
												))}
											</ul>
										</div>
									</div>
									
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<DollarSign className="w-5 h-5 text-crec-darkblue" />
											<span className="text-crec-darkblue font-semibold">
												{formatCurrency(program.fraisInscription)} / an
											</span>
										</div>
										<Link
											to="/formations/university/inscription"
											className="inline-flex items-center gap-2 px-6 py-2.5 bg-crec-darkblue text-white rounded-lg hover:bg-crec-gold transition-all duration-300 font-medium"
										>
											S'inscrire à cette formation
											<FileText className="w-4 h-4" />
										</Link>
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</section>

			{/* Faculty Section */}
			<section className="py-16 bg-gray-50">
				<div className="max-w-6xl mx-auto px-4">
					<motion.h2
						className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12"
						initial={{ opacity: 0, y: -20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						Notre corps enseignant
					</motion.h2>
					<motion.div
						className="space-y-6"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
						<p className="text-gray-700 text-lg leading-relaxed text-justify">
							L'ISTMR s'appuie sur une équipe d'enseignants qualifiés, composée de
							professeurs, docteurs, ingénieurs et chercheurs issus du réseau jésuite
							mondial. Dirigé par le Père Eugène Didier Ahouanmènou Goussikindey, notre
							corps enseignant allie expertise académique et engagement éthique.
						</p>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							<motion.div
								className="bg-white p-6 rounded-xl shadow-md"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6 }}
							>
								<h3 className="text-lg font-semibold text-blue-900">
									Professeurs et Docteurs
								</h3>
								<p className="text-gray-700 text-sm">
									Équipe d'enseignants-chercheurs qualifiés
								</p>
								<p className="text-gray-700 text-sm mt-2">
									Expertise : Sciences informatiques et technologies
								</p>
							</motion.div>
							<motion.div
								className="bg-white p-6 rounded-xl shadow-md"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: 0.1 }}
							>
								<h3 className="text-lg font-semibold text-blue-900">
									Ingénieurs et Praticiens
								</h3>
								<p className="text-gray-700 text-sm">Professionnels de l'industrie</p>
								<p className="text-gray-700 text-sm mt-2">
									Expertise : Développement et gestion de projets
								</p>
							</motion.div>
							<motion.div
								className="bg-white p-6 rounded-xl shadow-md"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: 0.2 }}
							>
								<h3 className="text-lg font-semibold text-blue-900">
									Chercheurs Internationaux
								</h3>
								<p className="text-gray-700 text-sm">Réseau jésuite mondial</p>
								<p className="text-gray-700 text-sm mt-2">
									Expertise : Innovation et recherche appliquée
								</p>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Admission Process Section - Redesigned */}
			<section className="py-16 bg-gradient-to-b from-gray-50 to-white">
				<div className="max-w-6xl mx-auto px-4">
					<motion.div
						className="text-center mb-12"
						initial={{ opacity: 0, y: -20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<h2 className="text-3xl md:text-4xl font-bold text-crec-darkblue mb-4">
							Comment s'inscrire
						</h2>
						<p className="text-gray-600 max-w-2xl mx-auto">
							Suivez notre processus d'inscription simple et efficace pour rejoindre l'ISTMR et commencer votre parcours de formation.
						</p>
					</motion.div>
					
					<div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
						<div className="relative">
							{/* Timeline line */}
							<div className="absolute left-0 md:left-[50%] top-0 bottom-0 w-0.5 bg-crec-gold/20 hidden md:block"></div>
							
							{/* Steps */}
							<div className="space-y-12">
								{[
									{
										icon: FileText,
										title: 'Préparation du dossier d\'inscription',
										desc: "Rassemblez les documents requis : acte de naissance, attestation du baccalauréat, relevés de notes, photo d'identité, et lettre de motivation.",
										color: "bg-blue-100 text-blue-600 border-blue-200"
									},
									{
										icon: Calendar,
										title: 'Soumission de votre candidature',
										desc: "Déposez votre dossier complet via notre plateforme en ligne ou directement à notre secrétariat avant la date limite du 30 septembre 2025.",
										color: "bg-amber-100 text-amber-600 border-amber-200"
									},
									{
										icon: GraduationCap,
										title: 'Étude de votre dossier',
										desc: "Votre dossier est examiné par notre comité d'admission qui évalue votre parcours académique et votre motivation.",
										color: "bg-green-100 text-green-600 border-green-200"
									},
									{
										icon: Users,
										title: 'Confirmation d\'admission',
										desc: "Recevez votre lettre d'admission et les instructions pour finaliser votre inscription et accéder à votre espace étudiant.",
										color: "bg-purple-100 text-purple-600 border-purple-200"
									},
								].map((step, i) => (
									<motion.div
										key={i}
										className={`flex ${i % 2 === 1 ? 'md:flex-row-reverse' : ''} items-center gap-6 md:gap-12`}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.6, delay: i * 0.1 }}
									>
										{/* Number and icon */}
										<div className="relative shrink-0">
											<div className={`w-16 h-16 rounded-full flex items-center justify-center ${step.color} shadow-sm border z-10`}>
												<step.icon className="w-8 h-8" />
											</div>
											<div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-crec-darkblue text-white flex items-center justify-center text-sm font-bold">
												{i+1}
											</div>
										</div>
										
										{/* Content */}
										<div className={`flex-1 p-6 rounded-xl bg-gray-50 border border-gray-100 shadow-sm ${i % 2 === 1 ? 'text-right' : ''}`}>
											<h3 className="font-bold text-lg text-crec-darkblue mb-2">
												{step.title}
											</h3>
											<p className="text-gray-600">
												{step.desc}
											</p>
										</div>
									</motion.div>
								))}
							</div>
						</div>
						
						<div className="mt-12 pt-6 border-t border-gray-200 text-center">
							<Link
								to="/formations/university/inscription"
								className="inline-flex items-center gap-2 px-8 py-3 bg-crec-darkblue text-white rounded-lg hover:bg-crec-gold transition-all duration-300 font-medium shadow-lg"
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