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
      className={`relative ${sizeClasses[size]} ${className}`}
      style={{
        backgroundImage: bgImages && bgImages.length > 0
          ? `url(${bgImages[currentIndex]})`
          : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: bgImages ? undefined : defaultBg,
        transition: 'background-image 0.5s ease-in-out'
      }}
    >
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
            <Button asChild variant="default" className="bg-crec-gold hover:bg-crec-lightgold text-white">
              <Link to={ctaLink}>{ctaText}</Link>
            </Button>
          )}
          {children}
        </div>
      </div>

      {/* Navigation dots */}
      {bgImages && bgImages.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 z-10">
          <div className="flex justify-center space-x-2">
            {bgImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-crec-gold' : 'bg-white bg-opacity-50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
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
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 p-2 rounded-full text-white"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 p-2 rounded-full text-white"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default Banner;