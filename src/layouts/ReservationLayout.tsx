import { Outlet } from 'react-router-dom';
import ScrollToTopOnNavigate from '@/components/common/ScrollToTopOnNavigate';
import ScrollToTopButton from '@/components/common/ScrollToTopButton';
import { usePageMetadata } from '@/hooks/usePageMetadata';

const ReservationLayout = () => {
  // Update metadata for Reservation
  usePageMetadata('/img/logo.png', 'Réservations - CREC Education');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <ScrollToTopOnNavigate />

      <div className="flex-grow">
        <Outlet />
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default ReservationLayout;
