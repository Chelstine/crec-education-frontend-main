import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BannerProps {
  title: string;
  subtitle?: string;
  bgImages?: string[];
  ctaText?: string;
  ctaLink?: string;
  overlay?: boolean;
  size?: 'sm' | 'md' | 'lg';
  align?: 'left' | 'center' | 'right';
  className?: string;
  children?: React.ReactNode;
}

const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  bgImages,
  ctaText,
  ctaLink,
  overlay = true,
  size = 'md',
  align = 'center',
  className = '',
  children
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Précharger les images pour éviter les problèmes de chargement
  useEffect(() => {
    if (!bgImages || !bgImages.length) return;
    
    const preloadImages = async () => {
      const promises = bgImages.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(src);
          img.onerror = () => reject(new Error(`Impossible de charger l'image: ${src}`));
        });
      });
      
      try {
        await Promise.all(promises);
        console.log('Toutes les images du diaporama sont préchargées');
        setIsLoaded(true);
      } catch (error) {
        console.error('Erreur lors du préchargement des images:', error);
        setIsLoaded(true); // On continue malgré l'erreur
      }
    };
    
    preloadImages();
  }, [bgImages]);

  // Change l'image toutes les 5 secondes
  useEffect(() => {
    if (!bgImages || bgImages.length <= 1 || !isLoaded) return;
    
    // Nettoyer tout intervalle existant
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Créer un nouvel intervalle
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % bgImages.length;
        console.log(`Changer slide: ${prevIndex} -> ${newIndex}`);
        return newIndex;
      });
    }, 6000); // augmenté à 6 secondes pour une meilleure visibilité
    
    console.log('Intervalle de diaporama démarré');
    
    // Nettoyage à la destruction du composant
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        console.log('Intervalle de diaporama nettoyé');
      }
    };
  }, [bgImages, isLoaded]);

  const nextSlide = () => {
    if (!bgImages || bgImages.length <= 1) return;
    
    // Réinitialiser l'intervalle lors d'un clic manuel
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    
    // Redémarrer l'intervalle
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    }, 5000);
  };

  const prevSlide = () => {
    if (!bgImages || bgImages.length <= 1) return;
    
    // Réinitialiser l'intervalle lors d'un clic manuel
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    setCurrentIndex((prevIndex) => (prevIndex - 1 + bgImages.length) % bgImages.length);
    
    // Redémarrer l'intervalle
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    }, 5000);
  };

  const sizeClasses = {
    sm: 'py-12',
    md: 'py-20',
    lg: 'py-32',
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto'
  };

  const defaultBg = 'bg-crec-darkblue';

  // Style amélioré pour le vignettage qui optimise la visibilité des images
  const vignetteStyle = `
    .bg-radial-gradient {
      background: radial-gradient(circle, transparent 40%, rgba(0, 0, 0, 0.3) 100%);
    }
    
    .image-transition {
      transition: opacity 1.5s ease-in-out, transform 6s ease-out;
      will-change: opacity, transform;
    }
    
    .image-active {
      transform: scale(1.03);
    }
  `;

  return (
    <div
      className={`relative overflow-hidden ${sizeClasses[size]} ${className}`}
    >
      <style>{vignetteStyle}</style>
      {/* Background Images with enhanced smooth transition and visual quality */}
      {bgImages && bgImages.length > 0 ? (
        <div className="absolute inset-0">
          {bgImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center image-transition ${index === currentIndex ? 'image-active' : ''}`}
              style={{
                backgroundImage: `url('${image}')`,
                opacity: index === currentIndex ? 1 : 0,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                filter: 'contrast(1.05) brightness(0.95)',
              }}
              aria-hidden={index !== currentIndex}
            />
          ))}
          {/* Overlay unique pour éviter l'accumulation d'ombres et améliorer la lisibilité */}
          <div className="absolute inset-0 bg-radial-gradient pointer-events-none"></div>
        </div>
      ) : (
        <div className={`absolute inset-0 ${defaultBg}`} />
      )}

      {/* Overlay avec léger gradient pour améliorer la lisibilité */}
      {overlay && bgImages && bgImages.length > 0 && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20"></div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-3xl ${alignClasses[align]}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg md:text-xl text-white/90 mb-6">
              {subtitle}
            </p>
          )}
          {ctaText && ctaLink && (
            ctaLink.startsWith('#') ? (
              <Button asChild variant="default" className="bg-crec-gold hover:bg-crec-lightgold text-white">
                <a href={ctaLink}>{ctaText}</a>
              </Button>
            ) : (
              <Button asChild variant="default" className="bg-crec-gold hover:bg-crec-lightgold text-white">
                <Link to={ctaLink}>{ctaText}</Link>
              </Button>
            )
          )}
          {children}
        </div>
      </div>

      {/* Navigation dots - highly improved visibility and interaction */}
      {bgImages && bgImages.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 z-20">
          <div className="flex justify-center space-x-3">
            {bgImages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  // Réinitialiser l'intervalle
                  if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                  }
                  intervalRef.current = setInterval(() => {
                    setCurrentIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
                  }, 6000);
                }}
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 hover:scale-125 touch-target 
                  border-2 shadow-md ${
                  index === currentIndex 
                    ? 'bg-crec-gold border-amber-400/50 shadow-lg scale-125' 
                    : 'bg-white/70 border-white/30 hover:bg-white'
                }`}
                aria-label={`Aller à la diapositive ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Navigation arrows */}
      {bgImages && bgImages.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 hover:bg-opacity-70 p-3 rounded-full text-white transition-all duration-300 hover:scale-110 touch-target"
            aria-label="Image précédente"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 hover:bg-opacity-70 p-3 rounded-full text-white transition-all duration-300 hover:scale-110 touch-target"
            aria-label="Image suivante"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default Banner;