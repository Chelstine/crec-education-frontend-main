// ApplyPage.tsx — Wrapper that reuses the existing InscriptionUniversitairePage
// This allows the ISTMR module to have its own route while reusing the existing form logic

import { lazy, Suspense } from 'react';

const InscriptionUniversitairePage = lazy(
    () => import('@/pages/formations/InscriptionUniversitairePage')
);

const ApplyPage = () => {
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C5A55A]"></div>
                </div>
            }
        >
            <InscriptionUniversitairePage />
        </Suspense>
    );
};

export default ApplyPage;
