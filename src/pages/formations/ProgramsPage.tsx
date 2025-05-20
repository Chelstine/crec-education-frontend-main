import React from 'react';
import PageWrapper from '@/components/common/PageWrapper';
import SectionTitle from '@/components/common/SectionTitle';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FaClock, FaRulerCombined, FaCogs, FaInfoCircle } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";

const ProgramsPage = () => {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: 'url(/images/fablab-atelier.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Le FabLab du CREC</h1>
          <p className="text-md md:text-lg mb-4 max-w-2xl">
            Un espace d’innovation numérique et de fabrication partagée ouvert à tous.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link to="/reservation">
              <Button className="bg-[#FCA311] hover:bg-[#fcb930] text-white rounded-full px-5 py-2">
                Réserver une machine
              </Button>
            </Link>
            <Link to="/projets">
              <Button className="bg-transparent border-2 border-[#FCA311] text-[#FCA311] hover:bg-[#FCA311] hover:text-white rounded-full px-5 py-2 transition">
                Participer à un projet
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Description détaillée du FabLab */}
      <section className="py-12 px-4 md:px-16 bg-white text-gray-800">
        <SectionTitle title="Un espace d’apprentissage, de créativité et d’innovation" />
        <div className="max-w-5xl mx-auto text-lg leading-relaxed space-y-6">
          <p>
            Le FabLab du CREC est un atelier collaboratif ouvert au public, où vous pouvez concevoir et fabriquer des objets
            à l’aide d’outils numériques professionnels. Que vous soyez étudiant, artisan, entrepreneur ou simplement curieux,
            notre FabLab vous offre un environnement propice à la découverte, à l’expérimentation et au prototypage.
          </p>
          <p>
            Vous y trouverez des équipements de pointe, une communauté bienveillante et des ressources pour apprendre à utiliser
            les machines en toute autonomie. Des formations sont proposées pour vous initier à la découpe laser, à l’impression 3D
            ou encore à la modélisation numérique.
          </p>
          <p>
            Le FabLab vise à encourager l’innovation sociale et technologique à travers la fabrication locale, le partage de
            savoir-faire et la participation à des projets collectifs.
          </p>
        </div>
      </section>

      {/* Services offerts */}
      <section className="py-12 px-4 md:px-16 bg-gray-50">
        <SectionTitle title="Nos services" />
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Découpe en autonomie</h3>
              <ul className="space-y-1 text-gray-700 list-disc pl-4">
                <li>Réservation en ligne via le portail</li>
                <li>Formation initiale obligatoire</li>
                <li>Accès à la découpe laser / 3D sous supervision</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Prestation de découpe</h3>
              <ul className="space-y-1 text-gray-700 list-disc pl-4">
                <li>Fichier envoyé par le client</li>
                <li>Devis selon matériau & temps machine</li>
                <li>Fabrication et retrait au CREC</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Liste des équipements disponibles */}
      <section className="py-12 px-4 md:px-16 bg-white">
        <SectionTitle title="Outils et machines disponibles au FabLab" />
        <div className="grid md:grid-cols-2 gap-8 text-gray-800">
          <div>
            <h4 className="text-lg font-semibold mb-2">Découpe et gravure :</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Découpeuse laser CO2 FL1390 - 150W</li>
              <li>Gravure bois, cuir, acrylique, carton, etc.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Fabrication & design :</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Imprimantes 3D FDM (PLA, PETG)</li>
              <li>PC avec logiciels de CAO (Fusion 360, Illustrator)</li>
              <li>Postes de montage et travail manuel</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Tarification */}
      <section className="py-12 px-4 md:px-16 bg-gray-50">
        <SectionTitle title="Tarifs transparents" />
        <div className="grid md:grid-cols-2 gap-6">
          <table className="w-full border text-left bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 font-semibold">Autonomie</th>
                <th className="p-2 font-semibold">Tarifs TTC</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">Formation machine</td>
                <td className="p-2 text-[#FCA311] font-medium">250 €</td>
              </tr>
              <tr>
                <td className="p-2">1h découpe autonome</td>
                <td className="p-2 text-[#FCA311] font-medium">38,4 €</td>
              </tr>
            </tbody>
          </table>

          <table className="w-full border text-left bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 font-semibold">Prestation</th>
                <th className="p-2 font-semibold">Tarifs TTC</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">Découpe assistée (1h)</td>
                <td className="p-2 text-blue-700 font-medium">72 €</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Informations pratiques */}
      <section className="py-12 px-4 md:px-16 bg-white">
        <SectionTitle title="Infos utiles pour venir" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-gray-700">
          <div>
            <FaClock className="text-3xl mx-auto mb-2" />
            <p>Ouvert de 8h à 17h</p>
          </div>
          <div>
            <FaRulerCombined className="text-3xl mx-auto mb-2" />
            <p>Zone de travail : 130 × 90 cm</p>
          </div>
          <div>
            <FaCogs className="text-3xl mx-auto mb-2" />
            <p>Modèle laser : FL1390 / 150W</p>
          </div>
          <div>
            <FaInfoCircle className="text-3xl mx-auto mb-2" />
            <p>Prestations sur devis</p>
          </div>
        </div>
        <div className="mt-8">
          <iframe
            title="Localisation CREC"
            src="https://www.google.com/maps/embed?pb=..." // Remplacer avec ton lien Google Maps
            className="w-full h-64 rounded-lg border"
            loading="lazy"
          ></iframe>
          <p className="mt-2 text-center text-gray-600">CREC, Godomey, Bénin</p>
        </div>
      </section>

      {/* Appel à l’action final */}
      <section className="bg-gray-50 py-12 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Prêt à créer avec nous ?</h2>
        <p className="text-gray-700 mb-6">Réservez une machine ou rejoignez un projet en cours au FabLab.</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link to="/reservation">
            <Button className="bg-[#FCA311] hover:bg-[#fcb930] text-white rounded-full px-6 py-2">
              Réserver un créneau
            </Button>
          </Link>
          <Link to="/projets">
            <Button className="bg-white border-2 border-[#FCA311] text-[#FCA311] hover:bg-[#FCA311] hover:text-white rounded-full px-6 py-2 transition">
              Participer à un projet
            </Button>
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
};

export default ProgramsPage;
