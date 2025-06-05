import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  AlertTriangle,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import {
  useFablabMachines,
  useMachineHourlyRates,
  useFablabSubscriptions,
  useUserReservations,
  useSubscriptionUsage,
  useAvailableSlots,
  useCreateFablabReservation,
  useCancelReservation
} from '@/hooks/useApi';
import {
  FablabMachine,
  FablabSubscription,
  FablabReservation,
  SubscriptionUsageReport,
  MachineHourlyRate,
  TimeSlot
} from '@/types';
import MachineSelection from '@/components/reservation/MachineSelection';
import ReservationCalendar from '@/components/reservation/ReservationCalendar';
import ReservationForm from '@/components/reservation/ReservationForm';
import ReservationsList from '@/components/reservation/ReservationsList';
import SubscriptionInfo from '@/components/reservation/SubscriptionInfo';
import UsageWarningComponent from '@/components/reservation/UsageWarning';

interface UsageWarning {
  type: 'warning' | 'danger' | 'blocked';
  message: string;
  hoursLeft: number;
}

const ReservationPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Check if redirected from subscription
  const fromSubscription = location.state?.fromSubscription;
  const subscriptionMessage = location.state?.message;
  const planName = location.state?.planName;
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMachine, setSelectedMachine] = useState<string>('');
  const [startHour, setStartHour] = useState<number | null>(null);
  const [endHour, setEndHour] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [reservationNotes, setReservationNotes] = useState<string>('');
  const [usageWarning, setUsageWarning] = useState<UsageWarning | null>(null);
  // API Hooks
  const { data: machinesResponse, isLoading: machinesLoading } = useFablabMachines();
  const { data: hourlyRatesResponse, isLoading: ratesLoading } = useMachineHourlyRates();
  const { data: subscriptionsResponse, isLoading: subscriptionsLoading } = useFablabSubscriptions();
  
  // Extract data from API responses
  let machines = machinesResponse?.data || [];
  let hourlyRates = hourlyRatesResponse?.data || [];
  const subscriptions = subscriptionsResponse?.data || [];
  
  // Mock data for development/demo when API is not available
  if (machines.length === 0) {
    machines = [
      {
        id: 'machine-001',
        name: 'Imprimante 3D Ender 3',
        description: 'Imprimante 3D FDM de qualité pour prototypage rapide',
        category: 'impression',
        skillLevel: 'beginner',
        status: 'available',
        features: ['220x220x250mm', 'Protection alimentation', 'Impression de reprise'],
        imageUrl: '/img/machines/creality-ender3.jpg'
      },
      {
        id: 'machine-002',
        name: 'Graveur Laser F50',
        description: 'Graveur laser haute précision pour bois, métal et acrylique',
        category: 'gravure',
        skillLevel: 'intermediate',
        status: 'available',
        features: ['50W Puissance', '400x400mm', 'Protection yeux', 'Multi-matériaux'],
        imageUrl: '/img/machines/latilool-f50.jpg'
      },
      {
        id: 'machine-003',
        name: 'Imprimante 3D Ender-5 S1',
        description: 'Imprimante 3D haute vitesse avec auto-nivellement',
        category: 'impression',
        skillLevel: 'intermediate',
        status: 'maintenance',
        features: ['250mm/s vitesse', '300°C température', 'CR Touch auto-nivellement'],
        imageUrl: '/img/machines/creality-ender5-s1.jpg'
      },
      {
        id: 'machine-004',
        name: 'Kit Arduino et composants',
        description: 'Station complète pour projets électroniques et IoT',
        category: 'electronique',
        skillLevel: 'beginner',
        status: 'available',
        features: ['Arduino Uno', 'Capteurs variés', 'Breadboards', 'Composants'],
        imageUrl: '/img/placeholder-machine.jpg'
      }
    ];
  }
  
  if (hourlyRates.length === 0) {
    hourlyRates = [
      {
        machineId: 'machine-001',
        machineName: 'Imprimante 3D Ender 3',
        hourlyRate: 2500,
        currency: 'FCFA',
        category: 'impression3d'
      },
      {
        machineId: 'machine-002',
        machineName: 'Graveur Laser F50',
        hourlyRate: 5000,
        currency: 'FCFA',
        category: 'gravure_laser'
      },
      {
        machineId: 'machine-003',
        machineName: 'Imprimante 3D Ender-5 S1',
        hourlyRate: 3500,
        currency: 'FCFA',
        category: 'impression3d'
      },
      {
        machineId: 'machine-004',
        machineName: 'Kit Arduino et composants',
        hourlyRate: 1500,
        currency: 'FCFA',
        category: 'electronique'
      }
    ];
  }
  
  // Check for test user subscription from localStorage
  const [testUserSubscription, setTestUserSubscription] = useState<FablabSubscription | null>(null);
  
  useEffect(() => {
    const subscriberInfo = localStorage.getItem('subscriberInfo');
    if (subscriberInfo) {
      try {
        const parsed = JSON.parse(subscriberInfo);
        if (parsed.verified && parsed.name === 'Marie Kouassi') {
          // Create a mock subscription object for the test user
          const mockSubscription: FablabSubscription = {
            id: 'test-subscription-001',
            userId: 'test-user-001',
            userName: parsed.name,
            email: 'marie.kouassi@crec.com',
            phone: '+229 67 89 12 34',
            type: parsed.plan as 'monthly' | 'yearly',
            status: 'active',
            startDate: new Date().toISOString(),
            endDate: parsed.expiresAt,
            createdAt: new Date().toISOString(),
            subscriptionKey: parsed.key,
            totalHoursUsed: parsed.usageCount || 12,
            monthlyHourLimit: parsed.usageLimit || 40,
            currentMonthHours: parsed.usageCount || 12,
            isBlocked: false
          };
          setTestUserSubscription(mockSubscription);
        }
      } catch (error) {
        console.error('Error parsing subscriber info:', error);
      }
    }
  }, []);
  
  // Get current subscription (prioritize test user, then API data)
  const currentSubscription = testUserSubscription || subscriptions.find((sub: FablabSubscription) => sub.status === 'active');
  
  // API hooks that depend on current subscription
  const { data: reservationsResponse, isLoading: reservationsLoading } = useUserReservations(currentSubscription?.id || '');
  const { data: usageReportResponse, isLoading: usageLoading } = useSubscriptionUsage(currentSubscription?.id || '');
  
  // Extract reservation and usage data
  let reservations = reservationsResponse?.data || [];
  
  // Add mock reservations for test user
  if (testUserSubscription && reservations.length === 0) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    reservations = [
      {
        id: 'test-reservation-001',
        subscriptionId: testUserSubscription.id,
        machineId: 'machine-001',
        machineName: 'Imprimante 3D Ender 3',
        userId: 'test-user-001',
        userName: 'Marie Kouassi',
        startTime: new Date(tomorrow.setHours(10, 0, 0, 0)).toISOString(),
        endTime: new Date(tomorrow.setHours(12, 0, 0, 0)).toISOString(),
        plannedDuration: 2,
        hourlyRate: 2500,
        totalCost: 5000,
        status: 'confirmed',
        notes: 'Impression de prototype éducatif',
        createdAt: new Date().toISOString()
      },
      {
        id: 'test-reservation-002',
        subscriptionId: testUserSubscription.id,
        machineId: 'machine-002',
        machineName: 'Graveur Laser F50',
        userId: 'test-user-001',
        userName: 'Marie Kouassi',
        startTime: new Date(nextWeek.setHours(14, 0, 0, 0)).toISOString(),
        endTime: new Date(nextWeek.setHours(16, 0, 0, 0)).toISOString(),
        plannedDuration: 2,
        hourlyRate: 5000,
        totalCost: 10000,
        status: 'confirmed',
        notes: 'Gravure de porte-clés personnalisés pour les étudiants',
        createdAt: new Date().toISOString()
      }
    ];
  }
  
  let usageReport = usageReportResponse?.data;
  
  // Create mock usage report for test user
  if (testUserSubscription && !usageReport) {
    usageReport = {
      subscriptionId: testUserSubscription.id,
      currentMonth: {
        totalHours: testUserSubscription.currentMonthHours,
        sessionsCount: 5,
        lastSession: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // Il y a 2 jours
      },
      previousMonth: {
        totalHours: 18,
        sessionsCount: 8
      },
      yearToDate: {
        totalHours: testUserSubscription.totalHoursUsed,
        sessionsCount: 25
      }
    };
  }
  
  // Available slots for selected machine and date
  const { data: availableSlotsResponse } = useAvailableSlots(
    selectedMachine || '', 
    selectedMachine ? selectedDate.toISOString().split('T')[0] : ''
  );
  const availableSlots = availableSlotsResponse?.data || [];
  
  const createReservationMutation = useCreateFablabReservation();
  const cancelReservationMutation = useCancelReservation();
  
  // Check if user has active subscription
  const hasActiveSubscription = !!currentSubscription;

  // Affichage du message de bienvenue après souscription
  useEffect(() => {
    if (fromSubscription && subscriptionMessage) {
      toast({
        title: "Bienvenue au FabLab CREC!",
        description: subscriptionMessage || `Votre abonnement ${planName || ''} a été enregistré avec succès.`,
        duration: 8000,
      });
    }
  }, [fromSubscription, subscriptionMessage, planName, toast]);

  // Calculate usage warnings
  useEffect(() => {
    if (!usageReport || !currentSubscription) return;

    const reportData = usageReport as SubscriptionUsageReport;
    const hoursUsed = reportData.currentMonth.totalHours;
    const hourLimit = currentSubscription.monthlyHourLimit;
    const hoursLeft = hourLimit - hoursUsed;
    const usagePercentage = (hoursUsed / hourLimit) * 100;

    if (currentSubscription.isBlocked) {
      setUsageWarning({
        type: 'blocked',
        message: 'Votre compte est bloqué pour dépassement d\'heures. Contactez le support.',
        hoursLeft: 0
      });
    } else if (usagePercentage >= 90) {
      setUsageWarning({
        type: 'danger',
        message: `Attention: Il vous reste seulement ${hoursLeft}h ce mois-ci.`,
        hoursLeft
      });
    } else if (usagePercentage >= 75) {
      setUsageWarning({
        type: 'warning',
        message: `Vous avez utilisé ${usagePercentage.toFixed(0)}% de vos heures mensuelles.`,
        hoursLeft
      });
    } else {
      setUsageWarning(null);
    }
  }, [usageReport, currentSubscription]);

  // Helper functions
  const getMachineHourlyRate = (machineId: string): number => {
    const rate = hourlyRates.find(r => r.machineId === machineId);
    return rate?.hourlyRate || 0;
  };

  const calculateCost = (machineId: string, hours: number): number => {
    const hourlyRate = getMachineHourlyRate(machineId);
    return hourlyRate * hours;
  };

  const canMakeReservation = (): boolean => {
    if (!hasActiveSubscription) return false;
    if (currentSubscription?.isBlocked) return false;
    if (!usageReport) return false;
    
    const reportData = usageReport as SubscriptionUsageReport;
    const requestedHours = endHour && startHour ? endHour - startHour : 0;
    const hoursLeft = currentSubscription.monthlyHourLimit - reportData.currentMonth.totalHours;
    
    return hoursLeft >= requestedHours;
  };

  // Event handlers
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setStartHour(null);
    setEndHour(null);
  };

  const handleMachineSelect = (machineId: string) => {
    setSelectedMachine(machineId);
    setStartHour(null);
    setEndHour(null);
  };

  const handleReservation = async () => {
    if (!startHour || !endHour || !selectedMachine || !canMakeReservation() || !currentSubscription) return;

    const hours = endHour - startHour;
    const totalCost = calculateCost(selectedMachine, hours);

    try {
      await createReservationMutation.mutateAsync({
        subscriptionId: currentSubscription.id,
        machineId: selectedMachine,
        startTime: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), startHour).toISOString(),
        endTime: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), endHour).toISOString(),
        notes: reservationNotes || `Réservation de ${hours}h - ${totalCost} FCFA`
      });

      // Reset form
      setStartHour(null);
      setEndHour(null);
      setReservationNotes('');
      
      toast({
        title: "Réservation confirmée",
        description: "Votre réservation a été confirmée avec succès!",
      });
    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la réservation. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const handleCancelReservation = async (reservationId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) return;

    try {
      await cancelReservationMutation.mutateAsync(reservationId);
      toast({
        title: "Réservation annulée",
        description: "Votre réservation a été annulée avec succès.",
      });
    } catch (error) {
      console.error('Erreur lors de l\'annulation:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de l'annulation. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const holidays: string[] = ['2025-01-01', '2025-05-01', '2025-12-25'];

  // Redirect to subscription page if no active subscription
  if (!subscriptionsLoading && !hasActiveSubscription) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardHeader className="text-center">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <CardTitle>Abonnement requis</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Vous devez avoir un abonnement FabLab actif pour effectuer des réservations.
            </p>
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/subscription')}
                className="w-full"
              >
                S'abonner maintenant
              </Button>
              
              <div className="flex items-center gap-2 justify-center my-3">
                <div className="h-px bg-gray-300 flex-1"></div>
                <span className="text-xs text-gray-500">OU</span>
                <div className="h-px bg-gray-300 flex-1"></div>
              </div>
              
              <Button 
                onClick={() => navigate('/subscription-verification')}
                variant="outline"
                className="w-full"
              >
                J'ai déjà un abonnement
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (machinesLoading || ratesLoading || subscriptionsLoading || usageLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-4">Réservation FabLab</h1>
            <p className="text-xl text-blue-100">
              Réservez vos machines et équipements en quelques clics
            </p>
          </motion.div>
        </div>
      </div>

      {/* Welcome Message for Redirected Users */}
      {fromSubscription && (
        <div className="container mx-auto px-4 -mt-3 relative z-10 mb-4">
          <Alert className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold">Bienvenue dans le FabLab !</span>
                  <p className="text-sm mt-1">{subscriptionMessage}</p>
                  {planName && (
                    <Badge variant="secondary" className="mt-2 text-xs">
                      Plan: {planName}
                    </Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(location.pathname, { replace: true })}
                  className="text-green-600 hover:text-green-800"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* User Subscription Info */}
      <div className="container mx-auto px-4 -mt-6 relative z-10">
        {currentSubscription && (
          <SubscriptionInfo 
            subscription={currentSubscription}
            usageReport={usageReport}
          />
        )}

        {/* Usage Warning */}
        {usageWarning && (
          <UsageWarningComponent 
            usageWarning={usageWarning}
            onRenewSubscription={() => navigate('/subscription')}
          />
        )}
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Equipment Selection */}
          <div className="lg:col-span-2">
            <MachineSelection
              machines={machines}
              selectedCategory={selectedCategory}
              selectedMachine={selectedMachine}
              hourlyRates={hourlyRates}
              onCategoryChange={setSelectedCategory}
              onMachineSelect={handleMachineSelect}
            />
          </div>

          {/* Calendar and Booking */}
          <div className="space-y-6">
            <ReservationCalendar
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
              holidays={holidays}
            />

            <ReservationForm
              selectedMachine={selectedMachine}
              startHour={startHour}
              endHour={endHour}
              reservationNotes={reservationNotes}
              hourlyRate={getMachineHourlyRate(selectedMachine)}
              canMakeReservation={canMakeReservation()}
              onStartHourChange={setStartHour}
              onEndHourChange={setEndHour}
              onNotesChange={setReservationNotes}
              onReservation={handleReservation}
            />
          </div>
        </div>

        {/* Current Reservations */}
        <ReservationsList
          reservations={reservations as FablabReservation[]}
          onCancelReservation={handleCancelReservation}
        />
      </div>
    </div>
  );
};

export default ReservationPage;
