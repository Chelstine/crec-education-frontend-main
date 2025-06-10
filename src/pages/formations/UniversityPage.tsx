import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, FileText, Users, GraduationCap, BookOpen, Heart } from 'lucide-react';

const programs = [
  {
    title: 'Développement de logiciels',
    description: "Concevez des logiciels robustes et éthiques avec des langages modernes (Java, Python), des méthodologies agiles et une approche centrée sur la résolution de problèmes sociétaux.",
    image: '/img/dev-logiciel.png',
    competences: ["Programmation avancée", "Architecture logicielle", "Gestion de projets agiles", "Cybersécurité"],
    debouches: ["Développeur logiciel", "Ingénieur logiciel", "Architecte logiciel", "Testeur QA"],
    profil: "Passionné par la logique, la structure et le travail collaboratif."
  },
  {
    title: 'Développement Web & Mobile',
    description: "Créez des applications web et mobiles innovantes et accessibles, en maîtrisant HTML, CSS, JavaScript, React, Flutter et le design d’interfaces utilisateur.",
    image: '/img/dev-web.png',
    competences: ["Design UI/UX", "Développement responsive", "Intégration d’API", "Applications mobiles"],
    debouches: ["Développeur front-end", "Développeur mobile", "Intégrateur web", "Product builder"],
    profil: "Créatif, visuel, et motivé par la concrétisation rapide d’idées."
  },
  {
    title: 'Science des données',
    description: "Exploitez les données pour éclairer les décisions avec Python, SQL, PowerBI et des techniques d’intelligence artificielle, dans une perspective éthique et responsable.",
    image: '/img/data-science.png',
    competences: ["Analyse de données", "Visualisation", "Statistiques appliquées", "IA de base"],
    debouches: ["Data analyst", "Business analyst", "Consultant data", "Data scientist"],
    profil: "Curieux, analytique, et attiré par les solutions basées sur les données."
  },
];

const UniversityPage = () => {
  const heroImages = [
    '/img/matteo-ricci/matteo1.jpeg',
    '/img/matteo-ricci/matteo2.jpeg',
    '/img/matteo-ricci/matteo3.jpeg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] md:h-[800px] overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <motion.img
              key={index}
              src={image}
              alt={`Portrait de Matteo Ricci ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
        </div>
        <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
          <motion.div
            className="bg-white/10 backdrop-blur-lg p-8 md:p-12 rounded-2xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">ISTMR</h1>
            <h2 className="text-xl md:text-2xl font-semibold text-amber-200 mb-6">
              Institut des Sciences et Technologies Matteo Ricci
            </h2>
            <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed">
              Formez-vous au numérique avec une éducation jésuite d'excellence, ancrée dans la foi, le service et l'innovation technologique au cœur de l'Afrique.
            </p>
            <div className="flex justify-center space-x-3 mb-8">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? 'bg-amber-400 scale-125' : 'bg-gray-400 hover:bg-amber-300'
                  }`}
                  aria-label={`Diapositive ${index + 1}`}
                />
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/formations/university/inscription"
                className="px-6 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-all duration-300"
              >
                S'inscrire maintenant
              </Link>
              <a
                href="#about"
                className="px-6 py-3 border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white rounded-full transition-all duration-300"
              >
                En savoir plus
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            À propos de l’ISTMR
          </motion.h2>
          <motion.div
            className="space-y-6 text-gray-600 text-lg leading-relaxed text-justify"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p>
              Fondé par la Compagnie de Jésus au Bénin, l’Institut des Sciences et Technologies Matteo Ricci (ISTMR) forme des techniciens, ingénieurs et chercheurs dans le domaine du numérique. Situé à Godomey-Salamey, l’ISTMR s’inspire de Matteo Ricci, jésuite italien prônant le dialogue des cultures à travers les sciences.
            </p>
            <p>
              Ancré dans la tradition éducative jésuite (<em>Ratio Studiorum</em>, 1586), l’ISTMR promeut la <em>cura personalis</em>, le <em>magis</em>, le <em>tantum quantum</em>, et la solidarité. Notre mission : former des leaders éthiques pour le développement de l’Afrique.
            </p>
            <p>
              Sous l’égide du Centre de Recherche d’Étude et de Créativité (CREC), l’ISTMR propose des formations en informatique, avec des projets d’extension vers les télécommunications et l’électronique, soutenus par un réseau de 195 universités jésuites.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Matteo Ricci Section */}
      <section id="matteo-ricci" className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-amber-800 mb-8"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Matteo Ricci (1552-1610)
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Pionnier du dialogue interculturel et de l’éducation scientifique
          </motion.p>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6">
                <div className="bg-white/90 p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold text-amber-800 mb-3">🌏 Dialogue Interculturel</h3>
                  <p className="text-gray-600">
                    Matteo Ricci, jésuite italien, fut le premier occidental admis dans la Cité Interdite de Pékin. Il apprit le mandarin et traduisit les classiques occidentaux, intégrant la culture chinoise.
                  </p>
                </div>
                <div className="bg-white/90 p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold text-amber-800 mb-3">🔬 Scientifique Innovant</h3>
                  <p className="text-gray-600">
                    Expert en mathématiques et astronomie, Ricci introduisit les sciences européennes en Chine, traduisant les Éléments d’Euclide et créant la première carte du monde en chinois.
                  </p>
                </div>
                <div className="bg-white/90 p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold text-amber-800 mb-3">💡 Héritage</h3>
                  <p className="text-gray-600">
                    Son approche d’« accommodation culturelle » inspire l’ISTMR à allier excellence académique et adaptation au contexte africain pour former des leaders technologiques.
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
              <div className="bg-white/90 p-8 rounded-xl shadow-md text-center">
                <div className="w-24 h-24 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-6">
                  <BookOpen className="w-12 h-12 text-amber-600" />
                </div>
                <blockquote className="text-lg italic text-amber-800 mb-4">
                  "L’amitié est la seule voie qui mène les cœurs des hommes vers la vérité"
                </blockquote>
                <p className="text-amber-700 font-medium">— Matteo Ricci</p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-amber-600">28</p>
                    <p className="text-sm text-gray-600">ans en Chine</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-amber-600">1610</p>
                    <p className="text-sm text-gray-600">décès à Pékin</p>
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
            className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12"
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
                title: "Cura Personalis",
                description: "Un accompagnement personnalisé pour développer les talents de chaque étudiant, en respectant sa singularité."
              },
              {
                icon: BookOpen,
                title: "Magis",
                description: "La quête de l’excellence, toujours viser mieux, pour un apprentissage qui inspire et transforme."
              },
              {
                icon: GraduationCap,
                title: "Tantum Quantum",
                description: "Un discernement orienté vers des choix éthiques et alignés sur des objectifs humains."
              },
              {
                icon: Users,
                title: "Solidarité",
                description: "Un engagement pour la justice et le service, en particulier envers les plus vulnérables."
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
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Nos programmes en informatique
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <img src={program.image} alt={program.title} className="w-full h-48 object-cover rounded-t-xl" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{program.title}</h3>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <div className="space-y-4">
                    <div>
                      <span className="font-medium text-gray-800">Compétences :</span>
                      <ul className="list-disc list-inside text-gray-600 text-sm">
                        {program.competences.map((comp, j) => (
                          <li key={j}>{comp}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-medium text-gray-800">Débouchés :</span>
                      <ul className="list-disc list-inside text-gray-600 text-sm">
                        {program.debouches.map((deb, j) => (
                          <li key={j}>{deb}</li>
                        ))}
                      </ul>
                    </div>
                    <p className="text-gray-600 text-sm">
                      <span className="font-medium text-gray-800">Profil idéal :</span> {program.profil}
                    </p>
                  </div>
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
            className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12"
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
            <p className="text-gray-600 text-lg leading-relaxed text-justify">
              L’ISTMR s’appuie sur une équipe d’enseignants qualifiés, composée de professeurs, docteurs, ingénieurs et chercheurs issus du réseau jésuite mondial. Dirigé par le Père Eugène Didier Ahouanmènou Goussikindey, notre corps enseignant allie expertise académique et engagement éthique.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Pr. Eugène Ezin", title: "Professeur, Conseiller aux études", expertise: "Informatique et technologies" },
                { name: "Dr. Romaric Sagbo", title: "Docteur en informatique", expertise: "Développement logiciel" },
                { name: "Dr. Rathel Houndji", title: "Maître assistant", expertise: "Science des données" },
                { name: "Père Constant Bossou", title: "Doctorant en informatique", expertise: "Technologies numériques" },
              ].map((teacher, i) => (
                <motion.div
                  key={i}
                  className="bg-white p-6 rounded-xl shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <h3 className="text-lg font-semibold text-gray-800">{teacher.name}</h3>
                  <p className="text-gray-600 text-sm">{teacher.title}</p>
                  <p className="text-gray-600 text-sm mt-2">Expertise : {teacher.expertise}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Admission Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Comment s’inscrire
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: FileText, title: "1. Préparer le dossier", desc: "Rassemblez les documents requis : acte de naissance, attestation du bac, relevés, etc." },
              { icon: Calendar, title: "2. Soumission", desc: "Déposez votre dossier via notre plateforme en ligne avant le 30 septembre." },
              { icon: GraduationCap, title: "3. Validation", desc: "Votre dossier est examiné par notre comité d’admission." },
              { icon: Users, title: "4. Admission", desc: "Recevez votre confirmation et accédez à votre espace étudiant." },
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
                <h3 className="font-semibold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gray-800 to-amber-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Rejoignez l’ISTMR dès aujourd’hui
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Lancez votre carrière dans le numérique avec une formation qui combine excellence académique et valeurs humaines.
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
              className="px-6 py-3 border border-white text-white hover:bg-white hover:text-gray-800 rounded-full transition-all duration-300"
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