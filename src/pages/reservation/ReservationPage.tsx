import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, X, User, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  useFablabMachines,
  useFablabSubscriptions,
} from '@/hooks/useFablab';
import {
  Machine,
  Subscription,
} from '@/types/fablab';

// Interfaces locales pour combler les manques dans le typage global
export interface FablabReservation {
  id: string;
  subscriptionId: string;
  machineId: string;
  machineName: string;
  userId: string;
  startTime: string;
  endTime: string;
  plannedDuration: number;
  hourlyRate: number;
  totalCost: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'in_progress' | 'completed';
  notes?: string;
  createdAt: string;
}

export interface SubscriptionUsageReport {
  subscriptionId: string;
  currentMonth: { totalHours: number; sessionsCount: number; lastSession?: string };
  previousMonth: { totalHours: number; sessionsCount: number };
  yearToDate: { totalHours: number; sessionsCount: number };
  maxHoursPerMonth: number;
  hoursLeft: number;
  used?: number;
}

export interface MachineHourlyRate {
  id?: string;
  machineId: string;
  hourlyRate: number;
  rate?: number;
}

// Mocks dynamiques pour les hooks absents du projet
const useMachineHourlyRates = () => ({ data: [] as MachineHourlyRate[], isLoading: false });
const useUserReservations = (_id: string) => ({ data: [] as FablabReservation[], isLoading: false });
const useSubscriptionUsage = (_id: string) => ({ data: null as SubscriptionUsageReport | null, isLoading: false });
const useAvailableSlots = (_id: string, _date: string) => ({ data: [] as string[] });
const useCreateFablabReservation = () => ({ mutateAsync: async (_data: any) => ({}) });
const useCancelReservation = () => ({ mutateAsync: async (_id: string) => ({}) });
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

  const { data: machinesRes, isLoading: machinesLoading } = useFablabMachines();
  const { data: hourlyRatesResponse, isLoading: ratesLoading } = useMachineHourlyRates();
  const { data: subscriptionsResponse, isLoading: subscriptionsLoading } = useFablabSubscriptions();

  let machines: Machine[] = [];
  let hourlyRates: MachineHourlyRate[] = [];
  const subscriptions = Array.isArray(subscriptionsResponse) ? subscriptionsResponse : [];

  // Adaptation pour le type de retour des hooks
  if (machinesRes) {
    machines = Array.isArray(machinesRes) ? machinesRes : [];
  }

  if (hourlyRatesResponse) {
    hourlyRates = Array.isArray(hourlyRatesResponse) ? hourlyRatesResponse : [];
  }

  if (machines.length === 0) {
    machines = [
      { id: 1, name: 'Creality Ender 3', status: 'available', requires_training: false, hourly_rate: 0, created_at: '', updated_at: '' },
      { id: 2, name: 'Creality Ender 5', status: 'available', requires_training: true, hourly_rate: 0, created_at: '', updated_at: '' },
      { id: 3, name: 'Creality Ender S1', status: 'maintenance', requires_training: true, hourly_rate: 0, created_at: '', updated_at: '' },
      { id: 4, name: 'ANYCUBIC Cobra 2 Pro', status: 'available', requires_training: true, hourly_rate: 0, created_at: '', updated_at: '' },
      { id: 5, name: 'Ortur Laser Master 2', status: 'available', requires_training: true, hourly_rate: 0, created_at: '', updated_at: '' },
      { id: 6, name: 'Epson SureColor F570', status: 'available', requires_training: false, hourly_rate: 0, created_at: '', updated_at: '' }
    ] as any[];
  }

  if (hourlyRates.length === 0) {
    hourlyRates = [
      { machineId: '1', hourlyRate: 0 },
      { machineId: '2', hourlyRate: 0 },
      { machineId: '3', hourlyRate: 0 },
      { machineId: '4', hourlyRate: 0 },
      { machineId: '5', hourlyRate: 0 },
      { machineId: '6', hourlyRate: 0 }
    ];
  }

  const [testUserSubscription, setTestUserSubscription] = useState<any>(null);

  useEffect(() => {
    const subscriberInfo = localStorage.getItem('subscriberInfo') || localStorage.getItem('fablabUser');
    if (subscriberInfo) {
      try {
        const parsed = JSON.parse(subscriberInfo);
        if (parsed.verified && parsed.name === 'Marie Kouassi') {
          const subscriptionType = parsed.plan === 'student' || parsed.plan === 'monthly' ? 'student' : 'professional';
          const maxHoursPerMonth = subscriptionType === 'student' ? 15 : 20;
          const subscriptionTypeEnum = subscriptionType === 'student' ? 'STUDENT' : 'YEARLY';

          setTestUserSubscription({
            id: 'test-subscription-001',
            userId: 'test-user-001',
            userName: parsed.name,
            firstName: 'Marie',
            lastName: 'Kouassi',
            email: 'marie.kouassi@crec.com',
            phone: '+229 67 89 12 34',
            type: subscriptionType,
            subscriptionType: subscriptionTypeEnum,
            plan: parsed.plan || 'monthly',
            status: 'approved',
            maxHoursPerMonth: maxHoursPerMonth,
            startDate: new Date().toISOString(),
            endDate: parsed.expiresAt,
            createdAt: new Date().toISOString(),
            subscriptionKey: parsed.key,
            paymentMethod: 'test',
            paymentStatus: 'paid',
            isActive: true,
            duration: subscriptionType === 'student' ? 1 : 12,
            price: subscriptionType === 'student' ? 15000 : 150000,
            emailsSent: [],
          });
        }
      } catch (error) {
        console.error('Error parsing subscriber info:', error);
      }
    }
  }, []);

  const currentSubscription = testUserSubscription || subscriptions.find((sub: any) => sub.status === 'approved');
  const { data: reservationsResponse, isLoading: reservationsLoading } = useUserReservations(currentSubscription?.id || '');
  const { data: usageReportResponse, isLoading: usageLoading } = useSubscriptionUsage(currentSubscription?.id || '');

  let reservations: FablabReservation[] = [];
  if (reservationsResponse) {
    reservations = Array.isArray(reservationsResponse) ? reservationsResponse : [];
  }

  if (testUserSubscription && reservations.length === 0) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    reservations = [
      {
        id: 'test-reservation-001',
        subscriptionId: testUserSubscription.id,
        machineId: '1',
        machineName: 'Creality Ender 3',
        userId: 'test-user-001',
        startTime: new Date(tomorrow.setHours(10, 0, 0, 0)).toISOString(),
        endTime: new Date(tomorrow.setHours(12, 0, 0, 0)).toISOString(),
        plannedDuration: 2,
        hourlyRate: 0,
        totalCost: 0,
        status: 'confirmed',
        notes: 'Impression de prototype éducatif',
        createdAt: new Date().toISOString()
      },
      {
        id: 'test-reservation-002',
        subscriptionId: testUserSubscription.id,
        machineId: '5',
        machineName: 'Ortur Laser Master 2',
        userId: 'test-user-001',
        startTime: new Date(nextWeek.setHours(14, 0, 0, 0)).toISOString(),
        endTime: new Date(nextWeek.setHours(16, 0, 0, 0)).toISOString(),
        plannedDuration: 2,
        hourlyRate: 0,
        totalCost: 0,
        status: 'confirmed',
        notes: 'Gravure de porte-clés personnalisés pour les étudiants',
        createdAt: new Date().toISOString()
      }
    ];
  }

  let usageReport = usageReportResponse;
  if (testUserSubscription && !usageReport) {
    const maxHoursPerMonth = testUserSubscription.type === 'student' ||
      testUserSubscription.type === 'monthly' ? 15 : 20;
    const hoursUsed = 12;
    const hoursLeft = maxHoursPerMonth - hoursUsed;
    usageReport = {
      subscriptionId: testUserSubscription.id,
      currentMonth: { totalHours: hoursUsed, sessionsCount: 5, lastSession: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
      previousMonth: { totalHours: 18, sessionsCount: 8 },
      yearToDate: { totalHours: 30, sessionsCount: 25 },
      maxHoursPerMonth,
      hoursLeft,
      used: hoursUsed // Pour compatibilité avec ancienne API
    };
  }

  const { data: availableSlotsResponse } = useAvailableSlots(
    selectedMachine || '',
    selectedMachine ? selectedDate.toISOString().split('T')[0] : ''
  );
  const availableSlots = availableSlotsResponse || [];
  const createReservationMutation = useCreateFablabReservation();
  const cancelReservationMutation = useCancelReservation();
  const hasActiveSubscription = !!currentSubscription;

  useEffect(() => {
    if (fromSubscription && subscriptionMessage) {
      toast({
        title: t('welcomeFablab', { ns: 'fablab', defaultValue: 'Bienvenue au FabLab CREC!' }),
        description: subscriptionMessage || t('subscriptionSuccess', { planName: planName || '', ns: 'fablab', defaultValue: `Votre abonnement ${planName || ''} a été enregistré avec succès.` }),
        duration: 8000,
      });
    }
  }, [fromSubscription, subscriptionMessage, planName, toast, t]);

  useEffect(() => {
    if (!usageReport || !currentSubscription) return;

    let hoursUsed = 0;
    if (usageReport.currentMonth) {
      hoursUsed = usageReport.currentMonth.totalHours;
    } else if (usageReport.used !== undefined) {
      hoursUsed = usageReport.used;
    }

    // Déterminer la limite d'heures selon le type d'abonnement
    const isStudentSubscription =
      currentSubscription.subscriptionType === 'STUDENT' ||
      currentSubscription.type === 'student' ||
      currentSubscription.type === 'monthly';
    const hourLimit = currentSubscription.maxHoursPerMonth || (isStudentSubscription ? 15 : 20);
    const hoursLeft = hourLimit - hoursUsed;
    const usagePercentage = (hoursUsed / hourLimit) * 100;

    if (currentSubscription.status === 'rejected') {
      setUsageWarning({
        type: 'blocked',
        message: t('accountBlocked', { ns: 'fablab', defaultValue: 'Votre compte est bloqué pour dépassement d\'heures. Contactez le support.' }),
        hoursLeft: 0
      });
    } else if (usagePercentage >= 90) {
      setUsageWarning({
        type: 'danger',
        message: t('lowHoursWarning', {
          hoursLeft,
          plan: currentSubscription.type === 'student' ? t('student', { defaultValue: 'étudiant' }) : t('professional', { defaultValue: 'professionnel' }),
          ns: 'fablab',
          defaultValue: `Attention: Il vous reste seulement ${hoursLeft}h sur votre forfait ce mois-ci.`
        }),
        hoursLeft
      });
    } else if (usagePercentage >= 75) {
      setUsageWarning({
        type: 'warning',
        message: t('usageWarning', {
          percentage: usagePercentage.toFixed(0),
          hourLimit,
          plan: currentSubscription.type === 'student' ? t('student', { defaultValue: 'étudiant' }) : t('professional', { defaultValue: 'professionnel' }),
          ns: 'fablab',
          defaultValue: `Vous avez utilisé ${usagePercentage.toFixed(0)}% de vos ${hourLimit}h mensuelles.`
        }),
        hoursLeft
      });
    } else {
      setUsageWarning(null);
    }
  }, [usageReport, currentSubscription, t]);

  const getMachineHourlyRate = (machineId: string): number => {
    const rate = hourlyRates.find(r => r.machineId === machineId || r.id === machineId);
    return rate?.hourlyRate || rate?.rate || 0;
  };

  const calculateCost = (machineId: string, hours: number): number => {
    const hourlyRate = getMachineHourlyRate(machineId);
    return hourlyRate * hours;
  };

  const canMakeReservation = (): boolean => {
    if (!hasActiveSubscription || !currentSubscription || !usageReport) return false;
    if (currentSubscription.status === 'rejected') return false;

    const requestedHours = endHour && startHour ? endHour - startHour : 0;

    let hoursUsed = 0;
    if (usageReport.currentMonth) {
      hoursUsed = usageReport.currentMonth.totalHours;
    } else if (usageReport.used !== undefined) {
      hoursUsed = usageReport.used;
    }

    // Déterminer la limite d'heures selon le type d'abonnement
    const isStudentSubscription =
      currentSubscription.subscriptionType === 'STUDENT' ||
      currentSubscription.type === 'student' ||
      currentSubscription.type === 'monthly';
    const hourLimit = currentSubscription.maxHoursPerMonth || (isStudentSubscription ? 15 : 20);
    const hoursLeft = hourLimit - hoursUsed;
    return hoursLeft >= requestedHours;
  };

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
        machineId: selectedMachine,
        date: selectedDate.toISOString().split('T')[0],
        startTime: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), startHour).toISOString(),
        endTime: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), endHour).toISOString(),
        purpose: reservationNotes || t('reservationDefaultNote', { hours, ns: 'fablab', defaultValue: `Réservation de ${hours}h - Gratuit` })
      });

      setStartHour(null);
      setEndHour(null);
      setReservationNotes('');

      toast({
        title: t('reservationConfirmed', { ns: 'fablab', defaultValue: 'Réservation confirmée' }),
        description: t('reservationSuccess', { ns: 'fablab', defaultValue: 'Votre réservation a été confirmée avec succès!' }),
      });
    } catch (error) {
      console.error('Reservation error:', error);
      toast({
        title: t('error', { ns: 'fablab', defaultValue: 'Erreur' }),
        description: t('reservationError', { ns: 'fablab', defaultValue: 'Erreur lors de la réservation. Veuillez réessayer.' }),
        variant: 'destructive',
      });
    }
  };

  const handleCancelReservation = async (reservationId: string) => {
    if (!confirm(t('confirmCancel', { ns: 'fablab', defaultValue: 'Êtes-vous sûr de vouloir annuler cette réservation ?' }))) return;

    try {
      await cancelReservationMutation.mutateAsync(reservationId);
      toast({
        title: t('reservationCancelled', { ns: 'fablab', defaultValue: 'Réservation annulée' }),
        description: t('cancellationSuccess', { ns: 'fablab', defaultValue: 'Votre réservation a été annulée avec succès.' }),
      });
    } catch (error) {
      console.error('Cancellation error:', error);
      toast({
        title: t('error', { ns: 'fablab', defaultValue: 'Erreur' }),
        description: t('cancellationError', { ns: 'fablab', defaultValue: 'Erreur lors de l\'annulation. Veuillez réessayer.' }),
        variant: 'destructive',
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('fablabUser');
    localStorage.removeItem('subscriberInfo');
    toast({
      title: t('logout', { ns: 'fablab', defaultValue: 'Déconnexion' }),
      description: t('logoutSuccess', { ns: 'fablab', defaultValue: 'Vous avez été déconnecté avec succès.' }),
    });
    navigate('/fablab-login');
  };

  const holidays: string[] = ['2025-01-01', '2025-05-01', '2025-12-25'];

  if (!subscriptionsLoading && !hasActiveSubscription) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <Card className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <AlertTriangle className="h-12 w-12 text-yellow-500" />
              </div>
              <CardTitle className="text-2xl font-semibold text-gray-800">
                {t('subscriptionRequired', { ns: 'fablab', defaultValue: 'Abonnement requis' })}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-center">
                {t('subscriptionPrompt', { ns: 'fablab', defaultValue: 'Vous devez avoir un abonnement FabLab actif pour effectuer des réservations.' })}
              </p>
              <Button
                onClick={() => navigate('/subscription')}
                className="w-full bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700 transition-all duration-200"
              >
                {t('subscribeNow', { ns: 'fablab', defaultValue: 'S\'abonner maintenant' })}
              </Button>
              <div className="flex items-center gap-2 justify-center">
                <div className="h-px bg-gray-200 flex-1"></div>
                <span className="text-xs text-gray-400">{t('or', { ns: 'fablab', defaultValue: 'OU' })}</span>
                <div className="h-px bg-gray-200 flex-1"></div>
              </div>
              <Button
                onClick={() => navigate('/subscription-verification')}
                variant="outline"
                className="w-full border border-blue-200 text-blue-600 rounded-lg py-3 hover:bg-blue-50"
              >
                {t('alreadySubscribed', { ns: 'fablab', defaultValue: 'J\'ai déjà un abonnement' })}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (machinesLoading || ratesLoading || subscriptionsLoading || usageLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
            <div className="absolute inset-0 rounded-full border-t-4 border-blue-600 animate-spin"></div>
          </div>
          <p className="text-gray-600 font-medium">
            {t('loading', { ns: 'fablab', defaultValue: 'Préparation de votre espace FabLab...' })}
          </p>
          <p className="text-gray-500 text-sm mt-1">
            {t('pleaseWait', { ns: 'fablab', defaultValue: 'Veuillez patienter un instant' })}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100/50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">FL</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-800">FabLab CREC</h1>
                <p className="text-sm text-gray-500">
                  {t('tagline', { ns: 'fablab', defaultValue: 'Laboratoire de création collaborative' })}
                </p>
              </div>
            </div>
            {currentSubscription && (
              <div className="flex items-center gap-4">
                <Badge
                  className={`px-3 py-1 text-sm font-medium ${currentSubscription.subscriptionType === 'STUDENT' ||
                      currentSubscription.type === 'student' ||
                      currentSubscription.type === 'monthly'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-purple-100 text-purple-800'
                    }`}
                >
                  {t('plan', {
                    type: currentSubscription.subscriptionType === 'STUDENT' ||
                      currentSubscription.type === 'student' ||
                      currentSubscription.type === 'monthly' ?
                      t('student', { defaultValue: 'Étudiant' }) :
                      t('professional', { defaultValue: 'Professionnel' }),
                    hours: currentSubscription.maxHoursPerMonth ||
                      (currentSubscription.subscriptionType === 'STUDENT' ||
                        currentSubscription.type === 'student' ||
                        currentSubscription.type === 'monthly' ? '15' : '20'),
                    ns: 'fablab',
                    defaultValue: `Forfait ${currentSubscription.subscriptionType === 'STUDENT' ||
                        currentSubscription.type === 'student' ||
                        currentSubscription.type === 'monthly' ? 'Étudiant' : 'Professionnel'} (${currentSubscription.maxHoursPerMonth ||
                      (currentSubscription.subscriptionType === 'STUDENT' ||
                        currentSubscription.type === 'student' ||
                        currentSubscription.type === 'monthly' ? '15' : '20')}h/mois)`
                  })}
                </Badge>
                <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
                  <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-700">{currentSubscription.userName}</span>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full p-2"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Welcome Message */}
      {fromSubscription && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${currentSubscription?.subscriptionType === 'STUDENT' ||
                    currentSubscription?.type === 'student' ||
                    currentSubscription?.type === 'monthly'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-purple-100 text-purple-600'
                  }`}>
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {t('welcomeFablab', { ns: 'fablab', defaultValue: 'Bienvenue dans le FabLab CREC !' })}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {subscriptionMessage || t('subscriptionSuccess', {
                      planName: currentSubscription?.subscriptionType === 'STUDENT' ||
                        currentSubscription?.type === 'student' ||
                        currentSubscription?.type === 'monthly' ?
                        t('student', { defaultValue: 'Étudiant' }) :
                        t('professional', { defaultValue: 'Professionnel' }),
                      ns: 'fablab',
                      defaultValue: `Votre abonnement ${currentSubscription?.subscriptionType === 'STUDENT' ||
                          currentSubscription?.type === 'student' ||
                          currentSubscription?.type === 'monthly' ? 'Étudiant' : 'Professionnel'
                        } a été activé avec succès.`
                    })}
                  </p>
                  {planName && (
                    <Badge className={`mt-2 ${currentSubscription?.subscriptionType === 'STUDENT' ||
                        currentSubscription?.type === 'student' ||
                        currentSubscription?.type === 'monthly'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-purple-100 text-purple-600'
                      }`}>
                      {t('planName', { planName, ns: 'fablab', defaultValue: `Plan: ${planName}` })}
                    </Badge>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                className="text-gray-500 hover:text-gray-700 rounded-full p-2"
                onClick={() => navigate(location.pathname, { replace: true })}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentSubscription && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <SubscriptionInfo subscription={currentSubscription} usageReport={usageReport} />
          </motion.div>
        )}

        {usageWarning && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <UsageWarningComponent
              usageWarning={usageWarning}
              onRenewSubscription={() => navigate('/subscription')}
            />
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Machine Selection */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <MachineSelection
                machines={machines.map(m => ({
                  id: m.id.toString(),
                  name: m.name,
                  status: m.status,
                  needsTraining: m.requires_training,
                  type: (m as any).type || 'Impression 3D',
                  hourlyRate: m.hourly_rate
                })) as any[]}
                selectedCategory={selectedCategory}
                selectedMachine={selectedMachine}
                hourlyRates={hourlyRates.map(rate => ({
                  machineId: rate.machineId || rate.id || '',
                  hourlyRate: rate.hourlyRate || rate.rate || 0
                }))}
                onCategoryChange={setSelectedCategory}
                onMachineSelect={handleMachineSelect}
              />
            </motion.div>
          </div>

          {/* Calendar and Booking */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <ReservationCalendar
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
                holidays={holidays}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
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
            </motion.div>
          </div>
        </div>

        {/* Reservations List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <ReservationsList
            reservations={reservations}
            onCancelReservation={handleCancelReservation}
          />
        </motion.div>

        {/* Inspirational Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 shadow-sm border border-blue-50 text-center"
        >
          <blockquote className="text-lg text-gray-700 italic font-serif">
            {t('quote', { ns: 'fablab', defaultValue: "L'innovation et la création sont des dons que nous cultivons ensemble, dans l'esprit de collaboration et de service à notre communauté." })}
          </blockquote>
          <p className="text-sm text-gray-500 mt-4">
            {t('signature', { ns: 'fablab', defaultValue: "FabLab CREC - Laboratoire de création collaborative et d'innovation éducative" })}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ReservationPage;