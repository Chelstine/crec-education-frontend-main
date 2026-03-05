// components/PartnersSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Loader2 } from 'lucide-react';
import { useFeaturedPartners } from '@/hooks/usePartners';

interface PartnersSectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
  maxPartners?: number;
}

const PartnersSection: React.FC<PartnersSectionProps> = ({
  className = '',
  title = 'Nos Partenaires',
  subtitle = 'Découvrez les organisations qui nous accompagnent dans notre mission éducative',
  maxPartners = 6
}) => {
  const { data: partners = [], isLoading, error } = useFeaturedPartners();

  // Limit the number of partners to display
  const displayedPartners = partners.slice(0, maxPartners);

  if (isLoading) {
    return (
      <section className={`py-16 bg-gray-50 ${className}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-crec-gold mx-auto mb-4" />
            <p className="text-gray-600">Chargement des partenaires...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`py-16 bg-gray-50 ${className}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="text-orange-500 text-4xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Erreur de chargement</h3>
            <p className="text-gray-600">Impossible de charger les partenaires pour le moment.</p>
          </div>
        </div>
      </section>
    );
  }

  if (!partners || partners.length === 0) {
    return null; // Don't render section if no partners
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      'academic': 'Académique',
      'institutional': 'Institutionnel',
      'corporate': 'Entreprise',
      'ngo': 'ONG',
      'other': 'Autre'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'academic': 'bg-blue-100 text-blue-800',
      'institutional': 'bg-green-100 text-green-800',
      'corporate': 'bg-purple-100 text-purple-800',
      'ngo': 'bg-orange-100 text-orange-800',
      'other': 'bg-gray-100 text-gray-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-crec-darkblue mb-4">
            {title}
          </h2>
          <div className="w-20 h-1 bg-crec-gold mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPartners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="h-full"
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group overflow-hidden">
                <div className="relative">
                  {partner.logo_url && (
                    <div className="h-48 bg-white flex items-center justify-center p-6">
                      <img
                        src={partner.logo_url}
                        alt={`Logo ${partner.name}`}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <Badge className={getTypeColor(partner.type)}>
                      {getTypeLabel(partner.type)}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-crec-darkblue mb-2 group-hover:text-crec-blue transition-colors">
                    {partner.name}
                  </h3>
                  
                  {partner.description && (
                    <p className="text-gray-600 mb-4 flex-1 line-clamp-3">
                      {partner.description}
                    </p>
                  )}

                  {partner.partnership_start_date && (
                    <div className="text-sm text-gray-500 mb-4">
                      Partenaire depuis {new Date(partner.partnership_start_date).getFullYear()}
                    </div>
                  )}

                  {partner.website_url && (
                    <div className="mt-auto">
                      <a
                        href={partner.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-crec-blue hover:text-crec-gold transition-colors font-medium"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visiter le site
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {partners.length > maxPartners && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-gray-600">
              Et {partners.length - maxPartners} autres partenaire{partners.length - maxPartners > 1 ? 's' : ''}...
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PartnersSection;
