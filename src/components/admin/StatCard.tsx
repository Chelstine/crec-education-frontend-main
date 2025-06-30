import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { TrendingUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

/**
 * Carte de statistique réutilisable pour le tableau de bord admin
 */
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  trend = 'neutral',
  description,
  icon,
  className = '',
}) => {
  // Déterminer les classes de couleur en fonction de la tendance
  const trendColorClass = 
    trend === 'up' 
      ? 'text-emerald-600' 
      : trend === 'down' 
        ? 'text-red-600' 
        : 'text-slate-600';

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
          {icon && <span className="shrink-0">{icon}</span>}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold">{value}</p>
          {change && (
            <div className={`flex items-center text-xs ${trendColorClass}`}>
              {trend === 'up' ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : trend === 'down' ? (
                <TrendingUp className="w-3 h-3 mr-1 transform rotate-180" />
              ) : null}
              {change}
            </div>
          )}
        </div>
        {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
      </CardContent>
    </Card>
  );
};

export default StatCard;
