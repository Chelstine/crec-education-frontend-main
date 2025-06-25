'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  BookOpen, 
  Users, 
  Award, 
  Heart, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Leaf, 
  Gavel, 
  Library,
  Globe,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Composant Hero avec diaporama fonctionnel
const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const images = [
    '/img/crec1.jpg',
    '/img/crec2.png', 
    '/img/crec3.jpg'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Diaporama */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${image})` }}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Contrôles du diaporama */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Indicateurs */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Contenu Hero */}
      <div className="relative z-10 flex items-center justify-center h-full text-white text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Centre de Recherche, d'Étude et de Créativité
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed">
            Formation, Recherche et Accompagnement pour une éducation intégrale fondée sur des valeurs chrétiennes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              <Link href="#formations">
                Découvrir nos formations
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
              <Link href="/about">
                En savoir plus
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Section Description CREC */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="w-1 h-12 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full mr-4"></div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Bienvenue au CREC</h2>
                  <p className="text-lg text-gray-600">Une institution engagée dans la formation intégrale de la personne.</p>
                </div>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p className="text-lg leading-relaxed">
                  <span className="text-2xl">✝️</span> <strong>Les Jésuites et le CREC</strong>
                </p>
                <p className="leading-relaxed">
                  Depuis sa fondation, la Compagnie de Jésus s'est engagée dans l'éducation à travers le 
                  monde avec une pédagogie rigoureuse et humaniste. Cet engagement a donné 
                  naissance à de nombreuses institutions académiques d'excellence.
                </p>
                <p className="leading-relaxed">
                  C'est dans cette tradition que le CREC (Centre de Recherche d'Étude et de Créativité) a été fondé
                  au Bénin en 2012. Il incarne la mission éducative, sociale et spirituelle des Jésuites à travers des actions concrètes :
                </p>
                <div className="grid grid-cols-1 gap-4 mt-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>🔎 <strong>Recherche & Innovation</strong></span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>🎓 <strong>Formation universitaire et ouverte, & Accompagnement</strong></span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>🌍 <strong>Gouvernance éthique & écologie intégrale</strong></span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button asChild className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg">
                  <Link href="/about">
                    En savoir plus sur nous
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div 
                  className="w-full h-96 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('/img/crec2.png')" }}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-yellow-500 to-orange-500 p-6 rounded-2xl shadow-xl">
                <div className="text-white text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-2 mx-auto">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <span className="block text-3xl font-bold">12+</span>
                  <span className="block text-sm mt-1 opacity-90">Années d'expérience</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Formations */}
      <section id="formations" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Formations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos trois catégories de formations conçues pour répondre aux besoins diversifiés de notre communauté éducative.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Formations Universitaires",
                description: "ISTMR - Institut des Sciences et Technologies Matteo Ricci. Formations en développement logiciel, web/mobile et data science.",
                image: "/img/crec3.jpg",
                link: "/formations/university",
                icon: <Award className="h-8 w-8" />
              },
              {
                title: "Formations Ouvertes",
                description: "Formations accessibles à tous : langues, informatique, entrepreneuriat et accompagnement scolaire.",
                image: "/img/formation.png",
                link: "/formations/ouvertes",
                icon: <Users className="h-8 w-8" />
              },
              {
                title: "FabLab",
                description: "Espace d'innovation et de créativité avec impression 3D, électronique et projets collaboratifs.",
                image: "/img/fablab.png",
                link: "/formations/fablab",
                icon: <BookOpen className="h-8 w-8" />
              }
            ].map((formation, index) => (
              <motion.div
                key={formation.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={formation.link} className="block group">
                  <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="relative">
                      <div 
                        className="h-48 bg-cover bg-center bg-no-repeat group-hover:scale-105 transition-transform duration-300"
                        style={{ backgroundImage: `url(${formation.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 right-4 bg-yellow-500 text-white p-2 rounded-full">
                        {formation.icon}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="group-hover:text-yellow-600 transition-colors">
                        {formation.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{formation.description}</p>
                      <div className="flex items-center text-yellow-600 font-semibold">
                        <span>En savoir plus</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Bibliothèque */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div 
                  className="w-full h-96 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('/img/crec1.jpg')" }}
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-blue-400 to-indigo-500 p-4 rounded-full shadow-lg mr-4">
                  <Library className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Bibliothèque du CREC</h2>
                  <p className="text-lg text-gray-600">Ouverte à tous, une panoplie de livres pour enrichir vos connaissances</p>
                </div>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">
                  Notre bibliothèque constitue un véritable trésor de connaissances accessible à toute la communauté. 
                  Elle abrite une collection diversifiée d'ouvrages couvrant tous les domaines du savoir.
                </p>
                <p className="leading-relaxed">
                  Que vous soyez étudiant, chercheur, ou simplement passionné de lecture, notre espace de documentation 
                  vous offre un environnement propice à l'étude et à la découverte intellectuelle.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">1000+</div>
                    <div className="text-sm text-gray-600">Ouvrages disponibles</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">50+</div>
                    <div className="text-sm text-gray-600">Places de lecture</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button asChild className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg">
                  <Link href="/bibliotheque">
                    Découvrir la bibliothèque
                    <Library className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Écologie */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-4 rounded-full shadow-lg mr-4">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Écologie Intégrale</h2>
                  <p className="text-lg text-gray-600">Le CREC est pleinement investi dans l'écologie</p>
                </div>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">
                  L'engagement écologique du CREC s'inscrit dans la vision de l'écologie intégrale promue par 
                  l'encyclique Laudato Si'. Nous développons des programmes qui sensibilisent à la protection 
                  de notre maison commune.
                </p>
                <p className="leading-relaxed">
                  À travers des formations, des ateliers pratiques et des projets concrets, nous encourageons 
                  chacun à adopter des comportements responsables et à devenir acteur du changement pour un 
                  monde plus durable et solidaire.
                </p>
                
                <div className="grid grid-cols-1 gap-3 mt-6">
                  <div className="flex items-center space-x-3">
                    <Leaf className="h-5 w-5 text-green-500" />
                    <span>Sensibilisation environnementale</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Leaf className="h-5 w-5 text-green-500" />
                    <span>Projets de développement durable</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Leaf className="h-5 w-5 text-green-500" />
                    <span>Éducation à la citoyenneté écologique</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button asChild className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg">
                  <Link href="/ecologie">
                    Nos initiatives écologiques
                    <Leaf className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div 
                  className="w-full h-96 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('/img/ecologie.png')" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Gouvernance */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div 
                  className="w-full h-96 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('/img/gouvernement.png')" }}
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-purple-400 to-indigo-500 p-4 rounded-full shadow-lg mr-4">
                  <Gavel className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Gouvernance Éthique</h2>
                  <p className="text-lg text-gray-600">Leadership responsable et participation citoyenne</p>
                </div>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">
                  Le CREC développe des programmes de formation sur la gouvernance éthique des organisations 
                  et la participation citoyenne, essentiels pour construire une société juste et inclusive.
                </p>
                <p className="leading-relaxed">
                  Nous formons des leaders capables d'allier performance et responsabilité, en intégrant 
                  les dimensions économiques, sociales, environnementales et spirituelles dans leur prise de décision.
                </p>
                
                <div className="grid grid-cols-1 gap-3 mt-6">
                  <div className="flex items-center space-x-3">
                    <Gavel className="h-5 w-5 text-purple-500" />
                    <span>Formation au leadership éthique</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Gavel className="h-5 w-5 text-purple-500" />
                    <span>Gouvernance participative</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Gavel className="h-5 w-5 text-purple-500" />
                    <span>Responsabilité sociale et citoyenne</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button asChild className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg">
                  <Link href="/gouvernance">
                    Découvrir nos programmes
                    <Gavel className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Partenaires */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Partenaires</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Le CREC collabore avec des institutions de renom pour enrichir ses programmes et offrir les meilleures opportunités.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "IFRI",
                logo: "/img/ifri-logo.png",
                description: "Institut de Formation et de Recherche en Informatique",
                website: "https://ifri-uac.bj/"
              },
              {
                name: "PJAO",
                logo: "/img/pjao.png", 
                description: "Province Jésuite de l'Afrique de l'Ouest",
                website: "https://pjao.org/"
              },
              {
                name: "FAO",
                logo: "/img/fao.png",
                description: "Organisation des Nations Unies pour l'alimentation et l'agriculture",
                website: "https://www.fao.org/"
              }
            ].map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 text-center">
                  <CardHeader>
                    <div className="bg-gray-100 rounded-xl p-6 mb-4">
                      <div 
                        className="h-16 bg-contain bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${partner.logo})` }}
                      />
                    </div>
                    <CardTitle className="text-xl">{partner.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{partner.description}</p>
                    <Button asChild variant="outline" className="w-full">
                      <a href={partner.website} target="_blank" rel="noopener noreferrer">
                        Visiter le site
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
