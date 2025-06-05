import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReservationCalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  holidays?: string[];
}

const ReservationCalendar: React.FC<ReservationCalendarProps> = ({
  selectedDate,
  onDateChange,
  holidays = []
}) => {
  const tileDisabled = ({ date }: { date: Date }) => {
    const isSunday = date.getDay() === 0;
    const isHoliday = holidays.includes(date.toISOString().split('T')[0]);
    const isPast = date < new Date();
    return isSunday || isHoliday || isPast;
  };

  const handleDateChange = (value: any) => {
    if (value instanceof Date) {
      onDateChange(value);
    }
  };

  return (
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
        <p className="text-xs text-gray-500 mt-2">
          Les dimanches et jours fériés sont fermés
        </p>
      </CardContent>
    </Card>
  );
};

export default ReservationCalendar;
