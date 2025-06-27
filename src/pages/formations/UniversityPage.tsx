import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, FileText, Users, GraduationCap, BookOpen, Heart, Clock, DollarSign } from 'lucide-react';
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
									<BookOpen className="w-12 h-12 text-amber-600" />
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

			{/* Values Section */}
			<section className="py-16 bg-gray-100">
				<div className="max-w-6xl mx-auto px-4">
					<motion.h2
						className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12"
						initial={{ opacity: 0, y: -20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						Nos valeurs éducatives
					</motion.h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{[
							{
								icon: Heart,
								title: 'Cura Personalis',
								description:
									"Un accompagnement personnalisé pour développer les talents de chaque étudiant, en respectant sa singularité.",
							},
							{
								icon: BookOpen,
								title: 'Magis',
								description:
									"La quête de l'excellence, toujours viser mieux, pour un apprentissage qui inspire et transforme.",
							},
							{
								icon: GraduationCap,
								title: 'Tantum Quantum',
								description:
									"Un discernement orienté vers des choix éthiques et alignés sur des objectifs humains.",
							},
							{
								icon: Users,
								title: 'Solidarité',
								description:
									"Un engagement pour la justice et le service, en particulier envers les plus vulnérables.",
							},
						].map((value, i) => (
							<motion.div
								key={i}
								className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: i * 0.1 }}
							>
								<value.icon className="w-12 h-12 text-amber-500 mx-auto mb-4" />
								<h3 className="text-xl font-semibold text-blue-900 mb-2">
									{value.title}
								</h3>
								<p className="text-gray-700">{value.description}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Programs Section - Revamped */}
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
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{programs.map((program, i) => (
							<motion.div
								key={program.id}
								className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: i * 0.2 }}
							>
								<img
									src={program.image}
									alt={program.title}
									className="w-full h-48 object-cover"
								/>
								<div className="p-5">
									<div className="flex items-center justify-between mb-3">
										<h3 className="text-xl font-bold text-blue-900">
											{program.title}
										</h3>
										<span
											className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
												program.type
											)}`}
										>
											{program.type.charAt(0).toUpperCase() +
												program.type.slice(1)}
										</span>
									</div>
									<p className="text-gray-700 text-sm mb-4 line-clamp-3">
										{program.description}
									</p>
									<div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
										<div className="flex items-center gap-1">
											<Clock className="w-4 h-4 text-amber-600" />
											<span>{program.duree}</span>
										</div>
										<div className="flex items-center gap-1">
											<Users className="w-4 h-4 text-amber-600" />
											<span>{program.inscrits} étudiants inscrits</span>
										</div>
									</div>
									<div className="flex items-center gap-2 mb-4">
										<DollarSign className="w-4 h-4 text-green-600" />
										<span className="text-green-600 font-semibold text-sm">
											{formatCurrency(program.fraisInscription)}
										</span>
										<span className="text-gray-600 text-xs">/ an</span>
									</div>
									<div className="space-y-3">
										<div>
											<h4 className="text-sm font-semibold text-blue-900 flex items-center gap-1">
												<BookOpen className="w-4 h-4 text-amber-600" />
												Compétences
											</h4>
											<div className="flex flex-wrap gap-1 mt-1">
												{program.competences.map((comp, j) => (
													<span
														key={j}
														className="px-2 py-1 bg-blue-50 text-blue-800 rounded-full text-xs"
													>
														{comp}
													</span>
												))}
											</div>
										</div>
										<div>
											<h4 className="text-sm font-semibold text-blue-900 flex items-center gap-1">
												<GraduationCap className="w-4 h-4 text-amber-600" />
												Débouchés
											</h4>
											<div className="flex flex-wrap gap-1 mt-1">
												{program.debouches.map((deb, j) => (
													<span
														key={j}
														className="px-2 py-1 bg-green-50 text-green-800 rounded-full text-xs"
													>
														{deb}
													</span>
												))}
											</div>
										</div>
										<div className="bg-amber-50 p-3 rounded-lg">
											<h4 className="text-sm font-semibold text-blue-900 flex items-center gap-1">
												<Heart className="w-4 h-4 text-amber-600" />
												Profil idéal
											</h4>
											<p className="text-blue-900 text-xs italic mt-1">
												{program.profil}
											</p>
										</div>
									</div>
									<Link
										to="/formations/university/inscription"
										className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-all duration-300 text-sm"
									>
										<FileText className="w-4 h-4" />
										S'inscrire
									</Link>
								</div>
							</motion.div>
						))}
					</div>
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

			{/* Admission Process Section */}
			<section className="py-16 bg-white">
				<div className="max-w-6xl mx-auto px-4">
					<motion.h2
						className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12"
						initial={{ opacity: 0, y: -20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						Comment s'inscrire
					</motion.h2>
					<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
						{[
							{
								icon: FileText,
								title: '1. Préparer le dossier',
								desc: "Rassemblez les documents requis : acte de naissance, attestation du bac, relevés, etc.",
							},
							{
								icon: Calendar,
								title: '2. Soumission',
								desc: "Déposez votre dossier via notre plateforme en ligne avant le 30 septembre.",
							},
							{
								icon: GraduationCap,
								title: '3. Validation',
								desc: "Votre dossier est examiné par notre comité d'admission.",
							},
							{
								icon: Users,
								title: '4. Admission',
								desc: "Recevez votre confirmation et accédez à votre espace étudiant.",
							},
						].map((step, i) => (
							<motion.div
								key={i}
								className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: i * 0.1 }}
							>
								<step.icon className="w-12 h-12 text-amber-500 mx-auto mb-4" />
								<h3 className="font-semibold text-blue-900 mb-2">
									{step.title}
								</h3>
								<p className="text-gray-700">{step.desc}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 bg-gradient-to-r from-blue-900 to-amber-900 text-white">
				<div className="max-w-4xl mx-auto text-center px-4">
					<motion.h2
						className="text-3xl md:text-4xl font-bold mb-6"
						initial={{ opacity: 0, y: -20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						Rejoignez l'ISTMR dès aujourd'hui
					</motion.h2>
					<motion.p
						className="text-lg md:text-xl mb-8 leading-relaxed"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						Lancez votre carrière dans le numérique avec une formation qui combine
						excellence académique et valeurs humaines.
					</motion.p>
					<motion.div
						className="flex flex-col sm:flex-row justify-center gap-4"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<Link
							to="/formations/university/inscription"
							className="px-6 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-all duration-300"
						>
							Déposer ma candidature
						</Link>
						<Link
							to="/contact"
							className="px-6 py-3 border border-white text-white hover:bg-white hover:text-blue-900 rounded-full transition-all duration-300"
						>
							Nous contacter
						</Link>
					</motion.div>
				</div>
			</section>
		</div>
	);
};

export default UniversityPage;