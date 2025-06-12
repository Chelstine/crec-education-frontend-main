// Barrel exports pour les composants admin - Centralisé pour éviter les imports dispersés

// Layouts
export { default as AdminLayout } from '@/layouts/AdminLayout';

// Pages principales
export { default as AdminDashboard } from '@/pages/admin/AdminDashboard';
export { default as AdminLogin } from '@/pages/admin/AdminLogin';
export { default as AdminSettings } from '@/pages/admin/AdminSettings';

// Gestion des formations
export { default as FormationsManagement } from '@/pages/admin/FormationsManagement';
export { default as FormationDetail } from '@/pages/admin/FormationDetail';
export { default as ISTMRManagement } from '@/pages/admin/formations/ISTMRManagement';
export { default as FabLabFormationsManagement } from '@/pages/admin/formations/FabLabFormationsManagement';
export { default as FormationsOuvertesManagement } from '@/pages/admin/formations/FormationsOuvertesManagement';

// Gestion des inscriptions
export { default as InscriptionsManagement } from '@/pages/admin/InscriptionsManagement';
export { default as InscriptionsISTMR } from '@/pages/admin/inscriptions/InscriptionsISTMR';
export { default as InscriptionsFabLab } from '@/pages/admin/inscriptions/InscriptionsFabLab';
export { default as FabLabMemberships } from '@/pages/admin/inscriptions/FabLabMemberships';
export { default as InscriptionsFormationsOuvertes } from '@/pages/admin/inscriptions/InscriptionsFormationsOuvertes';

// Gestion des contenus
export { default as EvenementsManagement } from '@/pages/admin/EvenementsManagement';
export { default as ActualitesManagement } from '@/pages/admin/ActualitesManagement';
export { default as PageManagement } from '@/pages/admin/PageManagement';

// Gestion FabLab (legacy - à revoir)
export { default as FabLabManagement } from '@/pages/admin/FabLabManagement';
export { default as SectionsManagement } from '@/pages/admin/SectionsManagement';
