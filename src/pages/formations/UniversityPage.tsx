import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, FileText, Users, GraduationCap } from "lucide-react";

const programs = [
  {
    title: 'Développement de logiciels',
    description: "Apprenez à concevoir, structurer et développer des logiciels performants avec des langages modernes, des méthodologies agiles, et une vision éthique de la technologie.",
    image: '/img/dev-logiciel.png',
  },
  {
    title: 'Développement Web & Mobile',
    description: "Maîtrisez les technologies web et mobiles pour créer des applications élégantes, réactives et utiles à la société. HTML, CSS, JS, React, Flutter n'auront plus de secrets pour vous.",
    image: '/img/dev-web.png',
  },
  {
    title: 'Science des données',
    description: "Analysez, visualisez et exploitez les données pour en tirer du sens. Devenez un expert des outils modernes de traitement de données, de Python à PowerBI.",
    image: '/img/data-science.png',
  },
];

const UniversityPage = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-[15pt]">
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
        <div
          className="min-h-[400px] flex flex-col items-center justify-center text-center relative text-white p-6"
          style={{
            backgroundImage: "url('/img/university-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="max-w-3xl mx-auto bg-black/50 p-8 rounded-lg backdrop-blur-sm">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">ISTMR - Institut des Sciences et Technologies Matteo Ricci</h1>
            <p className="text-xl md:text-2xl mb-8">
              Formez-vous aux métiers du numérique avec une formation universitaire de qualité.
            </p>
          </div>
        </div>
      </section>

      {/* À propos */}
      <section className="py-16 bg-white text-crec-dark px-4 font-sans text-[15pt]">
        <div className="max-w-5xl mx-auto space-y-6 text-justify">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">L'ISTMR : Former pour transformer</h2>
          <p>L’Institut des Sciences et Technologies Matteo Ricci (ISTMR), fondé par la Compagnie de Jésus au Bénin, est un établissement d’enseignement supérieur réservé aux étudiants titulaires du baccalauréat, désireux d’entreprendre un cursus universitaire exigeant et engagé. Implanté à Godomey-Salamey, dans les locaux de la Maison des Pères Jésuites, l’ISTMR puise son inspiration dans la figure du jésuite italien Matteo Ricci, qui voyait dans le dialogue entre cultures et sciences une voie vers l’amitié et le progrès.</p>
          <p>L’Institut a pour mission de former des hommes et des femmes compétents, responsables et profondément humains, grâce à une pédagogie nourrie par l’humanisme chrétien, l’éthique jésuite et l’innovation scientifique et technologique. Il place l’étudiant au cœur de son approche éducative, en mettant en œuvre des valeurs fortes telles que la cura personalis (prise en compte de la personne dans sa globalité), le magis (la quête de l’excellence), le tantum quantum (le discernement orienté vers la finalité) et la solidarité au service du bien commun.</p>
          <p>Dès son ouverture, l’ISTMR propose un parcours universitaire structuré dans le domaine du numérique, avec trois filières principales : le développement de logiciels, le développement Web & Mobile, et la science des données. Ces formations professionnalisantes, ancrées dans les besoins actuels du marché, seront suivies dans les années à venir par l’ouverture de nouvelles spécialités : télécommunications, électronique, électricité, hydraulique et mécanique.</p>
          <p>L’Institut dispose d’infrastructures modernes, avec des salles de cours bien équipées, une salle informatique, une bibliothèque contenant plus de 9 000 ouvrages, un FabLab en cours de développement, ainsi qu’un projet d’amphithéâtre et d’extension de campus. Ces espaces favorisent un apprentissage actif, des travaux pratiques et un environnement propice à la recherche et à la créativité.</p>
          <p>Fortement ancré dans le réseau mondial des universités jésuites (195 établissements dans plus de 50 pays), l’ISTMR bénéficie d’une dynamique d’ouverture, de collaboration internationale et de partage de ressources académiques. Il développe également des partenariats locaux avec des institutions béninoises et africaines pour assurer une formation contextualisée et connectée aux réalités du continent.</p>
          <p>L’établissement est financé et encadré par le Centre de Recherche d’Étude et de Créativité (CREC), organe de la Compagnie de Jésus. Son modèle repose sur une gestion responsable et durable, avec un souci particulier pour les étudiants issus de familles modestes, grâce à des dispositifs de bourses et de solidarité internationale.</p>
          <p>L’ISTMR se veut plus qu’une université : c’est un projet de transformation humaine et sociale. Il prépare une nouvelle génération de leaders, d’ingénieurs et de chercheurs africains, animés par la rigueur intellectuelle, le sens de l’engagement et la passion du service.</p>
        </div>
      </section>

      {/* Filières */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-crec-dark">Nos Filières</h2>
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6 min-w-[1024px] md:min-w-full">
              {/* Dev Logiciel */}
              <Card className="min-w-[300px] max-w-sm flex-shrink-0 hover:shadow-lg">
                <CardContent className="p-4">
                  <img src={programs[0].image} alt={programs[0].title} className="w-full h-40 object-cover rounded-md mb-4" />
                  <h3 className="text-xl font-bold mb-4">{programs[0].title}</h3>
                  <p className="text-gray-700 text-base leading-relaxed text-justify">
                    Cette filière vous apprend à concevoir des logiciels robustes, sécurisés et durables : programmation (Java, Python...), bases de données, architecture logicielle, gestion agile, cybersécurité.<br /><br />
                    - <span className="font-medium">Compétences :</span> logique, structures, organisation de projet<br />
                    - <span className="font-medium">Débouchés :</span> développeur, ingénieur logiciel, testeur QA, architecte logiciel<br />
                    - <span className="font-medium">Profil :</span> aime la logique, les systèmes bien structurés et le travail collaboratif
                  </p>
                </CardContent>
              </Card>

              {/* Web & Mobile */}
              <Card className="min-w-[300px] max-w-sm flex-shrink-0 hover:shadow-lg">
                <CardContent className="p-4">
                  <img src={programs[1].image} alt={programs[1].title} className="w-full h-40 object-cover rounded-md mb-4" />
                  <h3 className="text-xl font-bold mb-4">{programs[1].title}</h3>
                  <p className="text-gray-700 text-base leading-relaxed text-justify">
                    Cette filière forme à la création de sites web modernes et d’applications mobiles interactives (HTML, CSS, JS, React, Flutter....). Elle est parfaite pour créer des interfaces intuitives et accessibles.<br /><br />
                    - <span className="font-medium">Compétences :</span> design UI/UX, responsive, API, mobile<br />
                    - <span className="font-medium">Débouchés :</span> dev front-end, mobile, intégrateur web, product builder<br />
                    - <span className="font-medium">Profil :</span> esprit visuel, créatif, aime concrétiser rapidement ses idées
                  </p>
                </CardContent>
              </Card>

              {/* Data Science */}
              <Card className="min-w-[300px] max-w-sm flex-shrink-0 hover:shadow-lg">
                <CardContent className="p-4">
                  <img src={programs[2].image} alt={programs[2].title} className="w-full h-40 object-cover rounded-md mb-4" />
                  <h3 className="text-xl font-bold mb-4">{programs[2].title}</h3>
                  <p className="text-gray-700 text-base leading-relaxed text-justify">
                    Apprenez à collecter, structurer, analyser et visualiser des données. Vous maîtriserez Python, PowerBI, SQL, IA de base et les statistiques appliquées pour orienter les décisions grâce à la donnée.<br /><br />
                    - <span className="font-medium">Compétences :</span> Python, analyse, visualisation, logique ...<br />
                    - <span className="font-medium">Débouchés :</span> data analyst, business analyst, consultant data<br />
                    - <span className="font-medium">Profil :</span> curieux, analytique, aime les chiffres et les solutions concrètes
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Processus */}
      <section className="py-16 bg-crec-light">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-crec-dark">Processus d'inscription</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: FileText, title: "1. Dossier", desc: "Préparez votre dossier de candidature" },
              { icon: Calendar, title: "2. Validation", desc: "Examen par l'administration" },
              { icon: GraduationCap, title: "3. Admission", desc: "Réception du mail d'admission" },
              { icon: Users, title: "4. Accès", desc: "Création de votre espace étudiant" }
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <step.icon className="w-12 h-12 text-crec-gold mx-auto mb-4" />
                  <h3 className="font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-crec-darkblue text-white mb-20">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4">Prêt à rejoindre l'ISTMR ?</h2>
          <p className="text-lg md:text-xl mb-8">
            Déposez votre candidature et commencez votre parcours universitaire.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button className="bg-crec-gold hover:bg-crec-lightgold text-white px-6 py-3 text-lg rounded-full" asChild>
              <Link to="/formations/admissions">Déposer ma candidature</Link>
            </Button>
            <Button className="border-white text-white hover:text-crec-darkblue hover:bg-white px-6 py-3 text-lg rounded-full" asChild>
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UniversityPage;
