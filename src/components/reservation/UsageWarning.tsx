import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface UsageWarning {
  type: 'warning' | 'danger' | 'blocked';
  message: string;
  hoursLeft: number;
}

interface UsageWarningProps {
  usageWarning: UsageWarning;
  onRenewSubscription: () => void;
}

const UsageWarningComponent: React.FC<UsageWarningProps> = ({
  usageWarning,
  onRenewSubscription
}) => {
  const getUsageWarningColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'danger': return 'bg-red-50 border-red-200 text-red-800';
      case 'blocked': return 'bg-red-100 border-red-300 text-red-900';
      default: return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <Alert className={`mt-4 ${getUsageWarningColor(usageWarning.type)}`}>
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        {usageWarning.message}
        {usageWarning.type === 'blocked' && (
          <div className="mt-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onRenewSubscription}
            >
              Renouveler l'abonnement
            </Button>
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default UsageWarningComponent;
