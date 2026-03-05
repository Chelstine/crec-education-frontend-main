import { Outlet } from 'react-router-dom';
import UniversityHeader from '@/components/university/UniversityHeader';
import UniversityFooter from '@/components/university/UniversityFooter';
import ScrollToTopOnNavigate from '@/components/common/ScrollToTopOnNavigate';
import ScrollToTopButton from '@/components/common/ScrollToTopButton';
import { usePageMetadata } from '@/hooks/usePageMetadata';

const UniversityLayout = () => {
    // Update metadata for ISTMR
    usePageMetadata('/img/logo_istmr.png', 'ISTMR - Institut des Sciences et Technologies Matteo Ricci');

    return (
        <div className="flex flex-col min-h-screen bg-[#FDFBF7]" style={{ fontFamily: "'Times New Roman', Georgia, 'Garamond', serif" }}>
            <UniversityHeader />
            <ScrollToTopOnNavigate />
            <div className="flex-grow">
                <Outlet />
            </div>
            <UniversityFooter />
            <ScrollToTopButton />
        </div>
    );
};

export default UniversityLayout;
