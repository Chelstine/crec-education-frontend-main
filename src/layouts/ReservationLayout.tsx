import { Outlet } from 'react-router-dom';
import ScrollToTopOnNavigate from '@/components/common/ScrollToTopOnNavigate';
import ScrollToTopButton from '@/components/common/ScrollToTopButton';
import SubscriberStatus from '@/components/common/SubscriberStatus';

const ReservationLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <ScrollToTopOnNavigate />
      
      {/* Header spécifique pour les réservations */}
      <header className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img src="/img/logo.png" alt="CREC Logo" className="h-10 w-auto object-contain mr-4" />
            <h1 className="text-xl font-semibold text-crec-darkblue">Espace de Réservation</h1>
          </div>
          <SubscriberStatus />
        </div>
      </header>
      
      <div className="flex-grow">
        <Outlet />
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default ReservationLayout;
