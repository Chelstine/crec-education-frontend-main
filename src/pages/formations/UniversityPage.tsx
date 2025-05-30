import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, FileText, Users, GraduationCap, BookOpen, Heart } from "lucide-react";
import { motion } from 'framer-motion';

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
    description: "Exploités les données pour éclairer les décisions avec Python, SQL, PowerBI et des techniques d’intelligence artificielle, dans une perspective éthique et responsable.",
    image: '/img/data-science.png',
    competences: ["Analyse de données", "Visualisation", "Statistiques appliquées", "IA de base"],
    debouches: ["Data analyst", "Business analyst", "Consultant data", "Data scientist"],
    profil: "Curieux, analytique, et attiré par les solutions basées sur les données."
  },
];

const UniversityPage = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-[15pt] bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        <div
          className="min-h-[400px] flex flex-col items-center justify-center text-center relative text-white p-6"
          style={{
            backgroundImage: "url('/img/crec-campus-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <motion.div
            className="max-w-3xl mx-auto bg-black/60 p-10 rounded-2xl backdrop-blur-md shadow-2xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">ISTMR - Institut des Sciences et Technologies Matteo Ricci</h1>
            <p className="text-xl md:text-2xl mb-6 leading-relaxed">
              Formez-vous au numérique avec une éducation jésuite d’excellence, ancrée dans la foi et le service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* À propos */}
      <section className="py-16 px-4">
        <motion.div
          className="max-w-5xl mx-auto space-y-8 text-justify"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-800 mb-8">L’ISTMR : Former des leaders pour l’Afrique</h2>
          <p className="text-jesuit-darkgray text-lg leading-relaxed">
            Fondé par la Compagnie de Jésus au Bénin, l’Institut des Sciences et Technologies Matteo Ricci (ISTMR) est un établissement d’enseignement supérieur dédié à la formation de techniciens, ingénieurs et chercheurs dans le domaine du numérique. Situé à Godomey-Salamey, l’ISTMR s’inspire du jésuite italien Matteo Ricci, qui prônait le dialogue des cultures à travers les sciences et l’amitié.
          </p>
          <p className="text-jesuit-darkgray text-lg leading-relaxed">
            L’ISTMR s’appuie sur la tradition éducative jésuite, formalisée dès 1586 dans la <em>Ratio Studiorum</em>, pour offrir une pédagogie centrée sur la <em>cura personalis</em> (attention à la personne), le <em>magis</em> (quête de l’excellence), le <em>tantum quantum</em> (discernement orienté vers la finalité), et la solidarité avec les plus vulnérables. Notre mission est de former des hommes et des femmes « pour les autres », compétents, éthiques et engagés pour le développement de l’Afrique.
          </p>
          <p className="text-jesuit-darkgray text-lg leading-relaxed">
            Sous l’égide du Centre de Recherche d’Étude et de Créativité (CREC), enregistré en 2012, l’ISTMR propose des programmes en informatique (développement de logiciels, web/mobile, science des données), avec des projets d’extension vers les télécommunications et l’électronique. Nos formations combinent rigueur académique, compétences pratiques et recherche innovante, soutenues par un corps enseignant qualifié et un réseau mondial de 195 universités jésuites.
          </p>
        </motion.div>
      </section>

      {/* Valeurs pédagogiques */}
      <section className="py-16 bg-jesuit-light">
        <div className="max-w-5xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center text-jesuit-dark"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Nos valeurs éducatives
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
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
              <Card key={i} className="bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <value.icon className="w-12 h-12 text-jesuit-gold mb-4" />
                  <h3 className="text-xl font-semibold text-jesuit-dark mb-2">{value.title}</h3>
                  <p className="text-jesuit-darkgray text-base">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filières */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center text-jesuit-dark"
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <Card className="max-w-sm hover:shadow-lg transition">
                  <CardContent className="p-6">
                    <img src={program.image} alt={program.title} className="w-full h-48 object-cover rounded-md mb-6" />
                    <h3 className="text-xl font-bold mb-4 text-jesuit-dark">{program.title}</h3>
                    <p className="text-jesuit-darkgray text-base leading-relaxed mb-4">{program.description}</p>
                    <div className="space-y-4">
                      <div>
                        <span className="font-medium text-jesuit-dark">Compétences :</span>
                        <ul className="list-disc list-inside text-jesuit-darkgray text-sm">
                          {program.competences.map((comp, j) => (
                            <li key={j}>{comp}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="font-medium text-jesuit-dark">Débouchés :</span>
                        <ul className="list-disc list-inside text-jesuit-darkgray text-sm">
                          {program.debouches.map((deb, j) => (
                            <li key={j}>{deb}</li>
                          ))}
                        </ul>
                      </div>
                      <p className="text-jesuit-darkgray text-sm"><span className="font-medium text-jesuit-dark">Profil idéal :</span> {program.profil}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Corps enseignant */}
      <section className="py-16 bg-jesuit-light">
        <div className="max-w-5xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center text-jesuit-dark"
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
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-jesuit-darkgray text-lg leading-relaxed text-justify">
              L’ISTMR s’appuie sur une équipe d’enseignants qualifiés, composée de professeurs, docteurs, ingénieurs et chercheurs, dont plusieurs sont issus du réseau jésuite mondial. Dirigé par le Père Eugène Didier Ahouanmènou Goussikindey, ancien recteur de Hekima College (Kenya) et provincial de l’Afrique de l’Ouest, notre corps enseignant allie expertise académique et engagement éthique.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "Pr. Eugène Ezin", title: "Professeur, Conseiller aux études", expertise: "Informatique et technologies" },
                { name: "Dr. Romaric Sagbo", title: "Docteur en informatique", expertise: "Développement logiciel" },
                { name: "Dr. Rathel Houndji", title: "Maître assistant", expertise: "Science des données" },
                { name: "Père Constant Bossou", title: "Doctorant en informatique", expertise: "Technologies numériques" },
              ].map((teacher, i) => (
                <Card key={i} className="bg-white/80 backdrop-blur-sm shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-jesuit-dark">{teacher.name}</h3>
                    <p className="text-jesuit-darkgray text-sm">{teacher.title}</p>
                    <p className="text-jesuit-darkgray text-sm mt-2">Expertise : {teacher.expertise}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Processus d’inscription */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center text-jesuit-dark"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Comment s’inscrire
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              { icon: FileText, title: "1. Préparer le dossier", desc: "Rassemblez les documents requis : acte de naissance, attestation du bac, relevés, etc." },
              { icon: Calendar, title: "2. Soumission", desc: "Déposez votre dossier via notre plateforme en ligne avant le 30 septembre." },
              { icon: GraduationCap, title: "3. Validation", desc: "Votre dossier est examiné par notre comité d’admission." },
              { icon: Users, title: "4. Admission", desc: "Recevez votre confirmation et accédez à votre espace étudiant." },
            ].map((card, i) => (
              <div key={i} className="text-center">
                <Card className="bg-white/80 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                  <CardContent>
                    <card.icon className="w-12 h-12 text-jesuit-gold mx-auto mb-4" />
                    <h3 className="font-bold mb-2 text-jesuit-dark">{card.title}</h3>
                    <p className="text-jesuit-darkgray text-base">{card.desc}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1A2526] text-gray-100">
        <div className="max-w-3xl mx-auto text-center px-4">
          <motion.h2
            className="text-4xl font-bold mb-6 text-gray-100"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Rejoignez l’ISTMR dès aujourd’hui
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Lancez votre carrière dans le numérique avec une formation qui combine excellence académique et valeurs humaines.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                className="w-full sm:w-auto px-8 py-3 bg-[#e69500] hover:bg-[#f7b733] text-white rounded-full shadow-md hover:shadow-lg transition-all text-lg font-semibold"
                asChild
              >
                <Link to="/formations/InscriptionUniversitaire">Déposer ma candidature</Link>
              </Button>
            </motion.div>
            <Button
              className="w-full sm:w-auto px-6 py-3 border-white text-white hover:text-jesuit-dark hover:bg-white rounded-full text-lg font-semibold"
              asChild
            >
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default UniversityPage;