import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Calendar from 'react-calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Clock, 
  User, 
  Zap, 
  Calendar as CalendarIcon, 
  CheckCircle,
  AlertCircle,
  Crown,
  Star,
  Timer,
  Printer,
  Settings,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';
import 'react-calendar/dist/Calendar.css';
import '../../customCalendar.css';

interface Reservation {
  id: string;
  equipmentId: string;
  equipmentName: string;
  startTime: Date;
  endTime: Date;
  userId: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  userType: 'premium' | 'basic' | 'student';
}

interface Equipment {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: 'impression' | 'gravure' | 'decoupe' | 'electronique';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  hourlyRate: number;
  status: 'available' | 'maintenance' | 'occupied';
  features: string[];
}

interface UserSubscription {
  type: 'premium' | 'basic' | 'student';
  hoursRemaining: number;
  monthlyLimit: number;
  priorityBooking: boolean;
  advancedBookingDays: number;
}

const ReservationPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedEquipment, setSelectedEquipment] = useState<string>('');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [startHour, setStartHour] = useState<number | null>(null);
  const [endHour, setEndHour] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isReservationDialogOpen, setIsReservationDialogOpen] = useState(false);

  // Mock user subscription data
  const userSubscription: UserSubscription = {
    type: 'premium',
    hoursRemaining: 15,
    monthlyLimit: 20,
    priorityBooking: true,
    advancedBookingDays: 14
  };

  const holidays: string[] = ['2025-01-01', '2025-05-01', '2025-12-25'];

  const equipmentList: Equipment[] = [
    {
      id: 'FAB-IMP-01',
      name: 'Creality Ender-5 S1',
      description: 'Imprimante 3D haute vitesse - 250mm/s, 300°C, Détection filaments',
      imageUrl: '/images/ender5.jpg',
      category: 'impression',
      difficulty: 'intermediate',
      hourlyRate: 8,
      status: 'available',
      features: ['Auto-leveling', 'Détection filament', 'Impression reprise', '220x220x280mm']
    },
    {
      id: 'FAB-IMP-02',
      name: 'Creality Ender-3',
      description: 'Imprimante 3D standard - Protection alimentation, Impression reprise',
      imageUrl: '/images/ender3.jpg',
      category: 'impression',
      difficulty: 'beginner',
      hourlyRate: 5,
      status: 'available',
      features: ['Protection alimentation', 'Impression reprise', '220x220x250mm']
    },
    {
      id: 'FAB-IMP-03',
      name: 'Anycubic Kobra 2 Pro',
      description: 'Imprimante 3D rapide - 500mm/s, Nivellement Auto LeviQ 2.0',
      imageUrl: '/images/kobra2.jpg',
      category: 'impression',
      difficulty: 'intermediate',
      hourlyRate: 10,
      status: 'maintenance',
      features: ['500mm/s', 'Auto-leveling LeviQ 2.0', '220x220x250mm', 'Écran tactile']
    },
    {
      id: 'FAB-GRAV-01',
      name: 'Graveur Laser Latilool F50',
      description: 'Graveur laser 50W - Gravure haute précision multi-matériaux',
      imageUrl: '/images/latilool.jpg',
      category: 'gravure',
      difficulty: 'advanced',
      hourlyRate: 15,
      status: 'available',
      features: ['50W', '400x400mm', 'Multi-matériaux', 'Haute précision']
    },
    {
      id: 'FAB-CNC-01',
      name: 'CNC Router 3018',
      description: 'Fraiseuse CNC - Usinage bois, plastique, métaux tendres',
      imageUrl: '/images/cnc3018.jpg',
      category: 'decoupe',
      difficulty: 'advanced',
      hourlyRate: 12,
      status: 'available',
      features: ['300x180x45mm', 'Multi-matériaux', 'Contrôle GRBL', 'Précision 0.1mm']
    },
    {
      id: 'FAB-ELEC-01',
      name: 'Station de Soudage Weller',
      description: 'Station soudage électronique - Contrôle température, accessoires',
      imageUrl: '/images/weller.jpg',
      category: 'electronique',
      difficulty: 'intermediate',
      hourlyRate: 6,
      status: 'available',
      features: ['Contrôle température', 'Multiple pointes', 'Station aspirante', 'ESD safe']
    }
  ];

  // Mock existing reservations
  const existingReservations: Reservation[] = [
    {
      id: 'res1',
      equipmentId: 'FAB-IMP-01',
      equipmentName: 'Creality Ender-5 S1',
      startTime: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 10, 0),
      endTime: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 12, 0),
      userId: 'user2',
      status: 'confirmed',
      userType: 'premium'
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'impression': return <Printer className="h-4 w-4" />;
      case 'gravure': return <Zap className="h-4 w-4" />;
      case 'decoupe': return <Settings className="h-4 w-4" />;
      case 'electronique': return <Settings className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'occupied': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredEquipment = selectedCategory === 'all' 
    ? equipmentList 
    : equipmentList.filter(eq => eq.category === selectedCategory);

  const calculateCost = (equipment: Equipment, hours: number) => {
    const baseRate = equipment.hourlyRate;
    const discount = userSubscription.type === 'premium' ? 0.8 : 
                    userSubscription.type === 'student' ? 0.9 : 1;
    return Math.round(baseRate * hours * discount);
  };

  const isTimeSlotAvailable = (equipmentId: string, startHour: number, endHour: number) => {
    const proposedStart = new Date(selectedDate);
    proposedStart.setHours(startHour, 0, 0, 0);
    const proposedEnd = new Date(selectedDate);
    proposedEnd.setHours(endHour, 0, 0, 0);

    return !existingReservations.some(reservation =>
      reservation.equipmentId === equipmentId &&
      reservation.status !== 'cancelled' &&
      (
        (proposedStart >= reservation.startTime && proposedStart < reservation.endTime) ||
        (proposedEnd > reservation.startTime && proposedEnd <= reservation.endTime) ||
        (proposedStart <= reservation.startTime && proposedEnd >= reservation.endTime)
      )
    );
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setStartHour(null);
    setEndHour(null);
  };

  const handleEquipmentSelect = (equipmentId: string) => {
    setSelectedEquipment(equipmentId);
    setStartHour(null);
    setEndHour(null);
  };

  const handleReservation = () => {
    if (startHour === null || endHour === null || !selectedEquipment || endHour <= startHour) return;

    const startTime = new Date(selectedDate);
    startTime.setHours(startHour, 0, 0, 0);
    const endTime = new Date(selectedDate);
    endTime.setHours(endHour, 0, 0, 0);

    const overlapping = reservations.some(r =>
      r.equipmentId === selectedEquipment &&
      r.startTime < endTime &&
      r.endTime > startTime
    );

    if (overlapping) {
      alert("Ce créneau est déjà réservé.");
      return;
    }

    const newReservation: Reservation = {
      id: Math.random().toString(36).substring(2, 9),
      equipmentId: selectedEquipment,
      equipmentName: equipmentList.find(e => e.id === selectedEquipment)?.name || '',
      startTime,
      endTime,
      userId: 'current-user-id',
      status: 'confirmed',
      userType: userSubscription.type
    };

    setReservations([...reservations, newReservation]);
    setStartHour(null);
    setEndHour(null);
  };

  const tileDisabled = ({ date }: { date: Date }) => {
    const isSunday = date.getDay() === 0;
    const isHoliday = holidays.includes(date.toISOString().split('T')[0]);
    return isSunday || isHoliday;
  };

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

      {/* User Subscription Info */}
      <div className="container mx-auto px-4 -mt-6 relative z-10">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Crown className="h-6 w-6 text-yellow-500" />
                <div>
                  <CardTitle className="text-xl">
                    Abonnement {userSubscription.type.charAt(0).toUpperCase() + userSubscription.type.slice(1)}
                  </CardTitle>
                  <p className="text-gray-600">
                    {userSubscription.hoursRemaining}h restantes ce mois-ci
                  </p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="mb-2">
                  {userSubscription.priorityBooking ? 'Réservation prioritaire' : 'Standard'}
                </Badge>
                <p className="text-sm text-gray-600">
                  Réservation jusqu'à {userSubscription.advancedBookingDays} jours à l'avance
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Equipment Selection */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Sélection d'équipement</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <Button
                    variant={selectedCategory === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('all')}
                  >
                    Toutes
                  </Button>
                  <Button
                    variant={selectedCategory === 'impression' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('impression')}
                    className="flex items-center space-x-1"
                  >
                    <Printer className="h-4 w-4" />
                    <span>Impression 3D</span>
                  </Button>
                  <Button
                    variant={selectedCategory === 'gravure' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('gravure')}
                    className="flex items-center space-x-1"
                  >
                    <Zap className="h-4 w-4" />
                    <span>Gravure</span>
                  </Button>
                  <Button
                    variant={selectedCategory === 'decoupe' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('decoupe')}
                  >
                    Découpe
                  </Button>
                  <Button
                    variant={selectedCategory === 'electronique' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('electronique')}
                  >
                    Électronique
                  </Button>
                </div>

                {/* Equipment Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredEquipment.map(equipment => (
                    <motion.div
                      key={equipment.id}
                      whileHover={{ scale: 1.02 }}
                      className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedEquipment === equipment.id
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                      } ${equipment.status !== 'available' ? 'opacity-60' : ''}`}
                      onClick={() => equipment.status === 'available' && handleEquipmentSelect(equipment.id)}
                    >
                      {/* Status Badge */}
                      <div className="absolute top-2 right-2">
                        <Badge className={getStatusColor(equipment.status)}>
                          {equipment.status === 'available' ? 'Disponible' : 
                           equipment.status === 'maintenance' ? 'Maintenance' : 'Occupé'}
                        </Badge>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${getCategoryIcon(equipment.category).props.className ? 'bg-blue-100' : 'bg-gray-100'}`}>
                          {getCategoryIcon(equipment.category)}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{equipment.name}</h3>
                          <p className="text-sm text-gray-600 mb-3">{equipment.description}</p>
                          
                          <div className="flex items-center justify-between mb-3">
                            <Badge className={getDifficultyColor(equipment.difficulty)}>
                              {equipment.difficulty === 'beginner' ? 'Débutant' :
                               equipment.difficulty === 'intermediate' ? 'Intermédiaire' : 'Avancé'}
                            </Badge>
                            <div className="flex items-center space-x-1 text-green-600">
                              <span className="font-semibold">{equipment.hourlyRate}€</span>
                              <span className="text-xs">/heure</span>
                            </div>
                          </div>

                          <div className="space-y-1">
                            {equipment.features.slice(0, 2).map((feature, index) => (
                              <div key={index} className="flex items-center space-x-1 text-xs text-gray-500">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calendar and Booking */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5" />
                  <span>Sélection de date</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDate}
                  tileDisabled={tileDisabled}
                  className="w-full"
                />
              </CardContent>
            </Card>

            {selectedEquipment && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Horaires</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Début</label>
                      <select
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        value={startHour ?? ''}
                        onChange={e => setStartHour(parseInt(e.target.value))}
                      >
                        <option value="">--:--</option>
                        {Array.from({ length: 10 }, (_, i) => i + 8).map(hour => (
                          <option key={hour} value={hour}>{`${hour}:00`}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Fin</label>
                      <select
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        value={endHour ?? ''}
                        onChange={e => setEndHour(parseInt(e.target.value))}
                      >
                        <option value="">--:--</option>
                        {Array.from({ length: 10 }, (_, i) => i + 9).map(hour => (
                          <option key={hour} value={hour}>{`${hour}:00`}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {startHour !== null && endHour !== null && endHour > startHour && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Durée:</span>
                          <span className="font-medium">{endHour - startHour}h</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Coût estimé:</span>
                          <span className="font-medium text-green-600">
                            {calculateCost(equipmentList.find(e => e.id === selectedEquipment)!, endHour - startHour)}€
                          </span>
                        </div>
                        {userSubscription.type !== 'basic' && (
                          <div className="text-xs text-blue-600">
                            Remise {userSubscription.type} appliquée
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <Dialog open={isReservationDialogOpen} onOpenChange={setIsReservationDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full"
                        disabled={startHour === null || endHour === null || endHour <= startHour}
                        onClick={() => setIsReservationDialogOpen(true)}
                      >
                        Réserver
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirmer la réservation</DialogTitle>
                        <DialogDescription>
                          Vérifiez les détails de votre réservation avant de confirmer.
                        </DialogDescription>
                      </DialogHeader>
                      
                      {startHour !== null && endHour !== null && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Machine:</span>
                              <p className="font-medium">
                                {equipmentList.find(e => e.id === selectedEquipment)?.name}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-600">Date:</span>
                              <p className="font-medium">{selectedDate.toLocaleDateString()}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Horaire:</span>
                              <p className="font-medium">{startHour}:00 - {endHour}:00</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Coût total:</span>
                              <p className="font-medium text-green-600">
                                {calculateCost(equipmentList.find(e => e.id === selectedEquipment)!, endHour - startHour)}€
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsReservationDialogOpen(false)}>
                          Annuler
                        </Button>
                        <Button onClick={() => {
                          handleReservation();
                          setIsReservationDialogOpen(false);
                        }}>
                          Confirmer la réservation
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Current Reservations */}
        {reservations.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Mes réservations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reservations.map(reservation => (
                  <motion.div
                    key={reservation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border rounded-lg p-4 bg-white shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{reservation.equipmentName}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center space-x-1">
                            <CalendarIcon className="h-4 w-4" />
                            <span>{reservation.startTime.toLocaleDateString()}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>
                              {reservation.startTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})} - 
                              {reservation.endTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge 
                          className={
                            reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }
                        >
                          {reservation.status === 'confirmed' ? 'Confirmé' : 
                           reservation.status === 'pending' ? 'En attente' : reservation.status}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setReservations(reservations.filter(r => r.id !== reservation.id));
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ReservationPage;
