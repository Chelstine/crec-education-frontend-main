import React from 'react';
import { Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ReservationFormProps {
  selectedMachine: string;
  startHour: number | null;
  endHour: number | null;
  reservationNotes: string;
  hourlyRate: number;
  canMakeReservation: boolean;
  onStartHourChange: (hour: number) => void;
  onEndHourChange: (hour: number) => void;
  onNotesChange: (notes: string) => void;
  onReservation: () => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  selectedMachine,
  startHour,
  endHour,
  reservationNotes,
  hourlyRate,
  canMakeReservation,
  onStartHourChange,
  onEndHourChange,
  onNotesChange,
  onReservation
}) => {
  const calculateCost = (hours: number): number => {
    return hourlyRate * hours;
  };

  const duration = startHour && endHour ? endHour - startHour : 0;
  const estimatedCost = duration > 0 ? calculateCost(duration) : 0;

  if (!selectedMachine) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>Horaires disponibles</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="start-hour">Heure début</Label>
            <Select 
              value={startHour?.toString() || ''} 
              onValueChange={(value) => onStartHourChange(parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Début" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => i + 8).map(hour => (
                  <SelectItem key={hour} value={hour.toString()}>
                    {hour}:00
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="end-hour">Heure fin</Label>
            <Select 
              value={endHour?.toString() || ''} 
              onValueChange={(value) => onEndHourChange(parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Fin" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => i + 9).map(hour => (
                  <SelectItem 
                    key={hour} 
                    value={hour.toString()}
                    disabled={!startHour || hour <= startHour}
                  >
                    {hour}:00
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {startHour && endHour && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex justify-between text-sm">
              <span>Durée:</span>
              <span className="font-semibold">{duration}h</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Coût estimé:</span>
              <span className="font-semibold text-blue-600">
                {estimatedCost} FCFA
              </span>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="notes">Notes (optionnel)</Label>
          <Textarea
            id="notes"
            placeholder="Décrivez votre projet ou ajoutez des notes..."
            value={reservationNotes}
            onChange={(e) => onNotesChange(e.target.value)}
            rows={3}
          />
        </div>

        <Button 
          onClick={onReservation}
          disabled={!startHour || !endHour || !canMakeReservation}
          className="w-full"
        >
          {canMakeReservation ? 'Confirmer la réservation' : 'Heures insuffisantes'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReservationForm;
