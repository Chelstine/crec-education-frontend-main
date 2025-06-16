// Barrel exports pour les composants admin - Structure claire et organisée

// Pages principales admin
export { default as AdminDashboard } from './AdminDashboard';
export { default as AdminLogin } from './AdminLogin';
export { default as AdminSettings } from './AdminSettings';
export { default as EvenementsManagement } from './EvenementsManagement';
export { default as FabLabManagement } from './FabLabManagement';

// Gestion des formations
export * from './formations';

// Gestion des inscriptions
export * from './inscriptions';

// Gestion des événements
export * from './events';

// Gestion des actualités et stages
export * from './news';

// Gestion des réservations
export * from './reservations';
