import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../customCalendar.css';

interface Reservation {
  id: string;
  equipmentId: string;
  equipmentName: string;
  startTime: Date;
  endTime: Date;
  userId: string;
}

interface Equipment {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

const ReservationPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedEquipment, setSelectedEquipment] = useState<string>('');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [startHour, setStartHour] = useState<number | null>(null);
  const [endHour, setEndHour] = useState<number | null>(null);

  const holidays: string[] = ['2025-01-01', '2025-05-01', '2025-12-25'];

  const equipmentList: Equipment[] = [
    {
      id: 'FAB-IMP-01',
      name: 'Creality imprimante 3D Ender-5 S1 — FAB IMP 01',
      description: '250mm/s, 300°C, Détection filaments, CR Touch, 220x220x280mm',
      imageUrl: '/images/ender5.jpg'
    },
    {
      id: 'FAB-IMP-02',
      name: 'Creality imprimante 3D Ender-3 — FAB IMP 02',
      description: 'Protection alim., Impression reprise, 220x220x250mm',
      imageUrl: '/images/ender3.jpg'
    },
    {
      id: 'FAB-IMP-03',
      name: 'Creality imprimante 3D Ender-3 — FAB IMP 03',
      description: 'Protection alim., Impression reprise, 220x220x250mm',
      imageUrl: '/images/ender3.jpg'
    },
    {
      id: 'FAB-IMP-04',
      name: 'Anycubic Kobra 2 Pro — FAB IMP 04',
      description: '500mm/s, Nivellement Auto LeviQ 2.0, 220x220x250mm',
      imageUrl: '/images/kobra2.jpg'
    },
    {
      id: 'FAB-GRAV-01',
      name: 'Graveur Laser Latilool F50 — FAB GRAV 01',
      description: '50W, 400x400mm, Gravure haute précision sur bois, métal, verre, acrylique',
      imageUrl: '/images/latilool.jpg'
    }
  ];

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
      userId: 'current-user-id'
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('Réservation de machines')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Sélectionnez une machine</h2>
          <div className="space-y-4">
            {equipmentList.map(equipment => (
              <div
                key={equipment.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors shadow-sm ${
                  selectedEquipment === equipment.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleEquipmentSelect(equipment.id)}
              >
                <h3 className="font-medium text-lg text-gray-800">{equipment.name}</h3>
                <p className="text-sm text-gray-600">{equipment.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Sélectionnez une date</h2>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileDisabled={tileDisabled}
            className="w-full"
          />

          {selectedEquipment && (
            <div className="mt-6">
              <h3 className="font-medium mb-2">Choisissez les heures de début et de fin</h3>
              <div className="flex justify-center gap-4 items-center mb-4">
                <select
                  className="border rounded px-4 py-2 w-40 text-center shadow-sm"
                  value={startHour ?? ''}
                  onChange={e => setStartHour(parseInt(e.target.value))}
                >
                  <option value="">Heure de début</option>
                  {Array.from({ length: 10 }, (_, i) => i + 8).map(hour => (
                    <option key={hour} value={hour}>{`${hour}:00`}</option>
                  ))}
                </select>
                <span className="text-gray-600">à</span>
                <select
                  className="border rounded px-4 py-2 w-40 text-center shadow-sm"
                  value={endHour ?? ''}
                  onChange={e => setEndHour(parseInt(e.target.value))}
                >
                  <option value="">Heure de fin</option>
                  {Array.from({ length: 10 }, (_, i) => i + 9).map(hour => (
                    <option key={hour} value={hour}>{`${hour}:00`}</option>
                  ))}
                </select>
              </div>
              <div className="text-center">
                <button
                  onClick={handleReservation}
                  disabled={startHour === null || endHour === null || endHour <= startHour}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 shadow-md"
                >
                  Réserver de {startHour ?? '--'}:00 à {endHour ?? '--'}:00
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {reservations.length > 0 && (
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Réservations en cours</h2>
          <div className="space-y-4">
            {reservations.map(reservation => (
              <div key={reservation.id} className="border rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-800">{reservation.equipmentName}</h3>
                    <p className="text-sm text-gray-600">
                      {reservation.startTime.toLocaleDateString()} — {reservation.startTime.toLocaleTimeString()} à{' '}
                      {reservation.endTime.toLocaleTimeString()}
                    </p>
                  </div>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => {
                      setReservations(reservations.filter(r => r.id !== reservation.id));
                    }}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationPage;
