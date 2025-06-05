import React from 'react';
import { Crown } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FablabSubscription, SubscriptionUsageReport } from '@/types';

interface SubscriptionInfoProps {
  subscription: FablabSubscription;
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

  const usagePercentage = usageReport && subscription 
    ? (usageReport.currentMonth.totalHours / subscription.monthlyHourLimit) * 100
    : 0;

  const hoursLeft = usageReport && subscription 
    ? subscription.monthlyHourLimit - usageReport.currentMonth.totalHours 
    : subscription?.monthlyHourLimit || 0;

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Crown className="h-6 w-6 text-yellow-500" />
            <div>
              <CardTitle className="text-xl">
                Abonnement FabLab {subscription.type === 'yearly' ? 'Annuel' : 'Mensuel'}
              </CardTitle>
              <p className="text-gray-600">
                {usageReport ? (
                  `${hoursLeft}h restantes ce mois-ci`
                ) : (
                  'Chargement...'
                )}
              </p>
            </div>
          </div>
          <div className="text-right">
            <Badge variant="outline" className="mb-2">
              {subscription.status === 'active' ? 'Actif' : 'Inactif'}
            </Badge>
            <p className="text-sm text-gray-600">
              Expire le {new Date(subscription.endDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        {/* Usage Progress Bar */}
        {usageReport && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Utilisation mensuelle</span>
              <span>{usageReport.currentMonth.totalHours}h / {subscription.monthlyHourLimit}h</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${getProgressColor(usagePercentage)}`}
                style={{
                  width: `${Math.min(usagePercentage, 100)}%`
                }}
              />
            </div>
          </div>
        )}
      </CardHeader>
    </Card>
  );
};

export default SubscriptionInfo;
