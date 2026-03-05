import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { Suspense } from 'react';
import UniversityLayout from '@/layouts/UniversityLayout';

const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-screen bg-[#FDFBF7]">
        <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C5A55A]"></div>
            <p className="text-sm text-slate-400 tracking-widest uppercase">Chargement...</p>
        </div>
    </div>
);

const withSuspense = (Component: React.LazyExoticComponent<React.ComponentType<any>>) => (
    <Suspense fallback={<LoadingSpinner />}>
        <Component />
    </Suspense>
);

// Lazy load all ISTMR pages
const UniversityHomePage = lazy(() => import('@/pages/university/UniversityHomePage'));
const ProgramsPage = lazy(() => import('@/pages/university/ProgramsPage'));
const ProgramDetailPage = lazy(() => import('@/pages/university/ProgramDetailPage'));
const AdmissionsPage = lazy(() => import('@/pages/university/AdmissionsPage'));
const ApplyPage = lazy(() => import('@/pages/university/ApplyPage'));
const CampusPage = lazy(() => import('@/pages/university/CampusPage'));
const AboutPage = lazy(() => import('@/pages/university/AboutPage'));
const UniversityContactPage = lazy(() => import('@/pages/university/UniversityContactPage'));

const universityRoutes: RouteObject[] = [
    {
        path: '/istmr',
        element: <UniversityLayout />,
        children: [
            {
                index: true,
                element: withSuspense(UniversityHomePage),
            },
            {
                path: 'programmes',
                element: withSuspense(ProgramsPage),
            },
            {
                path: 'programmes/:id',
                element: withSuspense(ProgramDetailPage),
            },
            {
                path: 'admissions',
                element: withSuspense(AdmissionsPage),
            },
            {
                path: 'admissions/postuler',
                element: withSuspense(ApplyPage),
            },
            {
                path: 'campus',
                element: withSuspense(CampusPage),
            },
            {
                path: 'a-propos',
                element: withSuspense(AboutPage),
            },
            {
                path: 'contact',
                element: withSuspense(UniversityContactPage),
            },
        ],
    },
];

export default universityRoutes;
