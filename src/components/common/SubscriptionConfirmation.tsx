import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  CheckCircle, 
  Clock, 
  Mail, 
  ArrowRight, 
  Calendar,
  Key,
  Sparkles
} from 'lucide-react';

interface SubscriptionConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  subscriptionType: 'fablab' | 'formation';
  planName?: string;
  userEmail?: string;
}

const SubscriptionConfirmation: React.FC<SubscriptionConfirmationProps> = ({
  isOpen,
  onClose,
  subscriptionType,
  planName = 'FabLab',
  userEmail = ''
}) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [autoRedirect, setAutoRedirect] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    if (isOpen && autoRedirect && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0 && autoRedirect) {
      handleRedirect();
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen, countdown, autoRedirect]);

  const handleRedirect = () => {
    onClose();
    if (subscriptionType === 'fablab') {
      navigate('/reservation', { 
        state: { 
          fromSubscription: true,
          planName,
          message: 'Votre abonnement FabLab est en cours de validation. Vous recevrez votre clé d\'accès par email une fois approuvé.'
        }
      });
    } else {
      navigate('/');
    }
  };

  const handleManualRedirect = () => {
    setAutoRedirect(false);
    handleRedirect();
  };

  const handleStayHere = () => {
    setAutoRedirect(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <DialogTitle className="text-xl font-bold text-green-600">
            Inscription réussie !
          </DialogTitle>
          <DialogDescription className="text-center space-y-2">
            <p>Votre inscription <strong>{planName}</strong> a été soumise avec succès.</p>
          </DialogDescription>
        </DialogHeader>

        <CardContent className="p-0 space-y-4">
          {/* Étapes de validation */}
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Validation en cours</h4>
                  <p className="text-sm text-gray-600">
                    Notre équipe examine votre demande
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Notification par email</h4>
                  <p className="text-sm text-gray-600">
                    Vous recevrez un email à <span className="font-medium">{userEmail}</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {subscriptionType === 'fablab' && (
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Key className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">Clé d'accès FabLab</h4>
                    <p className="text-sm text-gray-600">
                      Votre clé d'accès sera générée après validation
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Section de redirection */}
          {subscriptionType === 'fablab' && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h4 className="font-semibold text-blue-800">Prochaine étape</h4>
              </div>
              <p className="text-sm text-blue-700 mb-3">
                Explorez nos machines et réservez vos créneaux dès maintenant !
              </p>
              
              {autoRedirect && (
                <div className="flex items-center gap-2 text-sm text-blue-600 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>Redirection automatique dans {countdown}s...</span>
                </div>
              )}
            </div>
          )}

          {/* Boutons d'action */}
          <div className="flex gap-2 pt-2">
            {subscriptionType === 'fablab' && (
              <Button 
                onClick={handleManualRedirect}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Aller aux réservations
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={handleStayHere}
              className="flex-1"
            >
              Rester ici
            </Button>
          </div>

          {/* Badge de statut */}
          <div className="text-center pt-2">
            <Badge variant="secondary" className="text-xs">
              <Clock className="w-3 h-3 mr-1" />
              Validation sous 24-48h
            </Badge>
          </div>
        </CardContent>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionConfirmation;
