import React from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FablabReservation } from '@/types';

interface ReservationsListProps {
  reservations: FablabReservation[];
  onCancelReservation: (reservationId: string) => void;
}

const ReservationsList: React.FC<ReservationsListProps> = ({
  reservations,
  onCancelReservation
}) => {
  if (reservations.length === 0) {
    return null;
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmé';
      case 'pending': return 'En attente';
      case 'cancelled': return 'Annulé';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span>Mes réservations</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reservations.map(reservation => (
            <div key={reservation.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <h4 className="font-semibold">{reservation.machineName}</h4>
                <p className="text-sm text-gray-600">
                  {new Date(reservation.startTime).toLocaleDateString()} • {' '}
                  {new Date(reservation.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {' '}
                  {new Date(reservation.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
                <p className="text-xs text-gray-500">{reservation.notes}</p>
              </div>
              <div className="text-right">
                <Badge className={getStatusColor(reservation.status)}>
                  {getStatusLabel(reservation.status)}
                </Badge>
                <p className="text-sm font-semibold mt-1">{reservation.totalCost} FCFA</p>
                {reservation.status === 'confirmed' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onCancelReservation(reservation.id)}
                    className="mt-2"
                  >
                    Annuler
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReservationsList;
