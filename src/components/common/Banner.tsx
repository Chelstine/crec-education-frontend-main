import React, { useState, useEffect } from 'react';
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

  // Change l'image toutes les 5 secondes
  useEffect(() => {
    if (!bgImages || bgImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    }, 5000); // toutes les 5 secondes

    return () => clearInterval(interval);
  }, [bgImages]);

  const nextSlide = () => {
    if (!bgImages || bgImages.length <= 1) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
  };

  const prevSlide = () => {
    if (!bgImages || bgImages.length <= 1) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + bgImages.length) % bgImages.length);
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

  return (
    <div
      className={`relative overflow-hidden ${sizeClasses[size]} ${className}`}
    >
      {/* Background Images with smooth transition */}
      {bgImages && bgImages.length > 0 ? (
        <>
          {bgImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${image})`,
              }}
            />
          ))}
        </>
      ) : (
        <div className={`absolute inset-0 ${defaultBg}`} />
      )}

      {/* Overlay */}
      {overlay && bgImages && bgImages.length > 0 && (
        <div className="absolute inset-0 bg-crec-darkblue bg-opacity-60"></div>
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

      {/* Navigation dots */}
      {bgImages && bgImages.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 z-20">
          <div className="flex justify-center space-x-3">
            {bgImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-125 touch-target ${
                  index === currentIndex 
                    ? 'bg-crec-gold shadow-lg' 
                    : 'bg-white bg-opacity-60 hover:bg-opacity-80'
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