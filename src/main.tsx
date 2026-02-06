import { createRoot } from 'react-dom/client'
import { lazy, Suspense } from 'react'

const Page = lazy(() => import('./pages/profile/UserProfilePage'))

createRoot(document.getElementById("root")!).render(
    <Suspense fallback={<div>Loading...</div>}>
        <Page />
    </Suspense>
);
