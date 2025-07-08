import React from 'react';
import { Crown, GraduationCap, Briefcase, Clock, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FablabSubscription, SubscriptionUsageReport } from '@/types';

interface SubscriptionInfoProps {
  subscription: FablabSubscription | any; // Utiliser any pour supporter à la fois les données de test et l'API
  usageReport?: SubscriptionUsageReport;
}

const SubscriptionInfo: React.FC<SubscriptionInfoProps> = ({
  subscription,
  usageReport
}) => {
  const getProgressColor = (usagePercentage: number) => {
    if (usagePercentage > 90) return 'bg-red-500';
    if (usagePercentage > 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Déterminer la limite d'heures selon le type d'abonnement
  // Pour l'API, utiliser maxHoursPerMonth. Pour les données de test, utiliser le type
  // Déterminer si c'est un abonnement étudiant en vérifiant différentes propriétés possibles
  const isStudentSubscription = 
    subscription.subscriptionType === 'STUDENT' || 
    subscription.type === 'student' || 
    subscription.type === 'monthly';
  
  // Utiliser maxHoursPerMonth s'il existe, sinon se baser sur le type d'abonnement
  const hourLimit = subscription.maxHoursPerMonth || (isStudentSubscription ? 15 : 20);
  
  const usageHours = usageReport?.currentMonth?.totalHours || 0;
  const usagePercentage = (usageHours / hourLimit) * 100;
  const hoursLeft = hourLimit - usageHours;

  // Avantages spécifiques par type d'abonnement
  const benefits = {
    student: [
      'Accès illimité aux machines (15h/mois)',
      'Formations de base incluses',
      'Support technique',
      'Stockage de projets'
    ],
    professional: [
      'Accès illimité aux machines (20h/mois)',
      'Accès prioritaire aux créneaux',
      'Formations avancées incluses',
      'Projets commerciaux autorisés',
      'Support technique prioritaire'
    ]
  };

  const subscriptionBenefits = isStudentSubscription ? benefits.student : benefits.professional;
  
  // Déterminer si l'abonnement est actif
  const isActive = 
    subscription.status === 'approved' || 
    subscription.status === 'APPROVED' || 
    subscription.status === 'ACTIVE' ||
    subscription.isActive === true;

  // Récupérer le nom d'utilisateur (format différent entre API et données de test)
  const userName = subscription.userName || 
    (subscription.firstName && subscription.lastName 
      ? `${subscription.firstName} ${subscription.lastName}`
      : 'Utilisateur');
  
  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-md border border-gray-100">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {isStudentSubscription ? (
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-blue-600" />
              </div>
            ) : (
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-purple-600" />
              </div>
            )}
            <div>
              <CardTitle className="text-xl">
                Abonnement {isStudentSubscription ? 'Étudiant' : 'Professionnel'}
              </CardTitle>
              <div className="flex items-center mt-1 text-gray-600 text-sm">
                <Clock className="h-4 w-4 mr-1 text-gray-500" />
                <span className="font-medium">{hoursLeft}h</span> 
                <span className="mx-1">restantes sur</span>
                <span className="font-medium">{hourLimit}h</span>
                <span className="ml-1">ce mois-ci</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <Badge 
              variant="outline" 
              className={`mb-2 ${
                isActive ? 
                  'bg-green-50 text-green-700 border-green-200' : 
                  'bg-gray-50 text-gray-700 border-gray-200'
              }`}
            >
              {isActive ? 'Actif' : 'Inactif'}
            </Badge>
            <p className="text-sm text-gray-600">
              Expire le {new Date(subscription.endDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        {/* Usage Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Utilisation mensuelle</span>
            <span>{usageHours}h / {hourLimit}h</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all ${getProgressColor(usagePercentage)}`}
              style={{
                width: `${Math.min(usagePercentage, 100)}%`
              }}
            />
          </div>
        </div>
      </CardHeader>
      
      {/* Avantages de l'abonnement */}
      <CardContent className="pt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {subscriptionBenefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <CheckCircle className={`h-4 w-4 flex-shrink-0 ${
                isStudentSubscription ? 'text-blue-500' : 'text-purple-500'
              }`} />
              <span className="text-gray-700">{benefit}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionInfo;
