import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types for FabLab data structures
export interface FabLabDescription {
  title: string;
  subtitle: string;
  description: string;
  mission: string;
  lastUpdated: string;
  updatedBy: string;
}

export interface FabLabProject {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  videoUrl?: string;
  tags: string[];
  author?: string;
  featured: boolean;
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
  // Legacy fields for compatibility
  titre?: string;
  fichierUrl?: string;
  mediaUrl?: string;
  mediaType?: string;
  type?: string;
  technologies?: string[];
  auteur?: string;
}

export interface FabLabMachine {
  id: string;
  name: string;
  code: string;
  category: string;
  features: string[];
  reference: string;
  monthlyPrice: number;
  yearlyPrice: number;
  image: string;
  description: string;
  specifications: string[];
  status: 'available' | 'maintenance' | 'broken' | 'reserved';
  location: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FabLabService {
  id: string;
  name: string;
  description: string;
  category: string;
  duration: string;
  price: number;
  includes: string[];
  requirements: string[];
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface FabLabTariff {
  id: string;
  name: string;
  type: 'membership' | 'hourly' | 'project' | 'material';
  description: string;
  price: number;
  unit: string;
  duration?: string;
  benefits: string[];
  restrictions: string[];
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

// Context interface
interface FabLabContextType {
  // Data
  description: FabLabDescription;
  projects: FabLabProject[];
  machines: FabLabMachine[];
  services: FabLabService[];
  tariffs: FabLabTariff[];
  
  // Actions
  updateDescription: (description: FabLabDescription) => void;
  addProject: (project: FabLabProject) => void;
  updateProject: (id: string, project: Partial<FabLabProject>) => void;
  deleteProject: (id: string) => void;
  addMachine: (machine: FabLabMachine) => void;
  updateMachine: (id: string, machine: Partial<FabLabMachine>) => void;
  deleteMachine: (id: string) => void;
  addService: (service: FabLabService) => void;
  updateService: (id: string, service: Partial<FabLabService>) => void;
  deleteService: (id: string) => void;
  addTariff: (tariff: FabLabTariff) => void;
  updateTariff: (id: string, tariff: Partial<FabLabTariff>) => void;
  deleteTariff: (id: string) => void;
  
  // Utility functions
  getPublishedProjects: () => FabLabProject[];
  getActiveMachines: () => FabLabMachine[];
  getActiveServices: () => FabLabService[];
  getActiveTariffs: () => FabLabTariff[];
  getProjectsByCategory: (category: string) => FabLabProject[];
}

// Create context
const FabLabContext = createContext<FabLabContextType | undefined>(undefined);

// Hook to use context
export const useFabLab = () => {
  const context = useContext(FabLabContext);
  if (context === undefined) {
    throw new Error('useFabLab must be used within a FabLabProvider');
  }
  return context;
};

// Default data
const defaultDescription: FabLabDescription = {
  title: 'FabLab CREC',
  subtitle: 'Un espace jésuite d\'innovation numérique pour créer, apprendre et collaborer au service du Bénin.',
  description: 'Le FabLab du Centre de Recherche d\'Étude et de Créativité (CREC) est un atelier collaboratif situé à Godomey, Bénin, inspiré par la mission jésuite de promouvoir l\'excellence et le service. Ouvert à tous — étudiants, entrepreneurs, artisans — il offre un accès à des imprimantes 3D et un graveur laser pour transformer vos idées en prototypes.',
  mission: 'Guidé par la cura personalis et le magis, le FabLab propose des formations, un accès autonome supervisé, et des services assistés pour concrétiser vos projets. Notre communauté dynamique favorise le partage de savoir-faire et l\'innovation sociale, en soutenant le développement local et durable.',
  lastUpdated: new Date().toISOString(),
  updatedBy: 'Admin'
};

const defaultMachines: FabLabMachine[] = [
  {
    id: '1',
    name: 'Creality Ender-5 S1',
    code: 'FAB IMP 01',
    category: 'Impression 3D',
    features: ['250mm/s Grande Vitesse', '300°C Haute Température', 'Détection de Filaments', 'CR Touch Auto-Nivellement', '220x220x280mm'],
    reference: 'B0BQJCX9HC',
    monthlyPrice: 10000,
    yearlyPrice: 100000,
    image: '/img/machines/creality-ender5-s1.jpg',
    description: 'Imprimante 3D haute vitesse avec auto-nivellement',
    specifications: ['Volume d\'impression: 220x220x280mm', 'Vitesse max: 250mm/s', 'Température buse: 300°C'],
    status: 'available',
    location: 'Zone Impression 3D',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Creality Ender-3',
    code: 'FAB IMP 02',
    category: 'Impression 3D',
    features: ['Protection de l\'Alimentation', 'Impression de Reprise', '220x220x250mm'],
    reference: 'B07BR3F9N6',
    monthlyPrice: 8000,
    yearlyPrice: 80000,
    image: '/img/machines/creality-ender3.jpg',
    description: 'Imprimante 3D fiable pour débutants',
    specifications: ['Volume d\'impression: 220x220x250mm', 'Précision: ±0.1mm'],
    status: 'available',
    location: 'Zone Impression 3D',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Latilool F50 Laser Engraver',
    code: 'FAB GRAV',
    category: 'Gravure Laser',
    features: ['50W Puissance', 'Protection des Yeux', '400x400mm', 'Gravure sur Bois, Métal, Verre, Acrylique'],
    reference: 'B0B6NG84VF',
    monthlyPrice: 15000,
    yearlyPrice: 150000,
    image: '/img/machines/latilool-f50.jpg',
    description: 'Graveur laser polyvalent pour tous matériaux',
    specifications: ['Zone de travail: 400x400mm', 'Puissance: 50W', 'Matériaux: Bois, Métal, Verre, Acrylique'],
    status: 'available',
    location: 'Zone Gravure',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const defaultServices: FabLabService[] = [
  {
    id: '1',
    name: 'Formation Impression 3D',
    description: 'Apprenez les bases de l\'impression 3D et la conception pour la fabrication additive',
    category: 'Formation',
    duration: '4h',
    price: 25000,
    includes: ['Initiation aux logiciels', 'Pratique sur machines', 'Matériaux fournis'],
    requirements: ['Aucun prérequis'],
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Arduino & IoT',
    description: 'Découvrez l\'électronique et programmez vos premiers objets connectés',
    category: 'Formation',
    duration: '6h',
    price: 30000,
    includes: ['Kit Arduino fourni', 'Composants électroniques', 'Projet pratique'],
    requirements: ['Bases en informatique'],
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Prototypage Rapide',
    description: 'Service complet de prototypage pour vos projets innovants',
    category: 'Service',
    duration: '1-5j',
    price: 0, // Sur devis
    includes: ['Consultation', 'Conception', 'Fabrication', 'Tests'],
    requirements: ['Cahier des charges détaillé'],
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const defaultTariffs: FabLabTariff[] = [
  {
    id: '1',
    name: 'Étudiant',
    type: 'membership',
    description: 'Abonnement mensuel pour étudiants',
    price: 15000,
    unit: 'mois',
    duration: '1 mois',
    benefits: ['15 Forfaits accordés pour la réservation', 'Formations de base incluses', 'Support technique'],
    restrictions: ['Réservé aux étudiants avec carte'],
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Professionnel',
    type: 'membership',
    description: 'Abonnement mensuel pour professionnels',
    price: 25000,
    unit: 'mois',
    duration: '1 mois',
    benefits: ['20 Forfaits accordés pour la réservation', 'Accès prioritaire aux machines', 'Support technique incluse', 'Formation accompagnée incluse' ],
    restrictions: [],
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Filament PLA',
    type: 'material',
    description: 'Filament PLA pour impression 3D',
    price: 500,
    unit: 'gramme',
    benefits: ['Matériau écologique', 'Facile à imprimer'],
    restrictions: ['Température max 60°C'],
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Utilisation Supervisée',
    type: 'hourly',
    description: 'Accès aux machines avec supervision pour les non-abonnés',
    price: 5000,
    unit: 'heure',
    benefits: ['Supervision incluse', 'Formation rapide'],
    restrictions: ['Réservation obligatoire'],
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Provider component
interface FabLabProviderProps {
  children: ReactNode;
}

export const FabLabProvider: React.FC<FabLabProviderProps> = ({ children }) => {
  const [description, setDescription] = useState<FabLabDescription>(defaultDescription);
  const [projects, setProjects] = useState<FabLabProject[]>([]);
  const [machines, setMachines] = useState<FabLabMachine[]>(defaultMachines);
  const [services, setServices] = useState<FabLabService[]>(defaultServices);
  const [tariffs, setTariffs] = useState<FabLabTariff[]>(defaultTariffs);

  // Réinitialise le localStorage à chaque chargement pour forcer les valeurs par défaut
  useEffect(() => {
    localStorage.removeItem('fablab-description');
    localStorage.removeItem('fablab-projects');
    localStorage.removeItem('fablab-machines');
    localStorage.removeItem('fablab-services');
    localStorage.removeItem('fablab-tariffs');
    // Les states utiliseront les valeurs par défaut
  }, []);

  // Save data to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('fablab-description', JSON.stringify(description));
  }, [description]);

  useEffect(() => {
    localStorage.setItem('fablab-projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('fablab-machines', JSON.stringify(machines));
  }, [machines]);

  useEffect(() => {
    localStorage.setItem('fablab-services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('fablab-tariffs', JSON.stringify(tariffs));
  }, [tariffs]);

  // Action functions
  const updateDescription = (newDescription: FabLabDescription) => {
    setDescription({ ...newDescription, lastUpdated: new Date().toISOString() });
  };

  const addProject = (project: FabLabProject) => {
    setProjects(prev => [...prev, project]);
  };

  const updateProject = (id: string, updates: Partial<FabLabProject>) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, ...updates, updatedAt: new Date().toISOString() } : project
    ));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const addMachine = (machine: FabLabMachine) => {
    setMachines(prev => [...prev, machine]);
  };

  const updateMachine = (id: string, updates: Partial<FabLabMachine>) => {
    setMachines(prev => prev.map(machine => 
      machine.id === id ? { ...machine, ...updates, updatedAt: new Date().toISOString() } : machine
    ));
  };

  const deleteMachine = (id: string) => {
    setMachines(prev => prev.filter(machine => machine.id !== id));
  };

  const addService = (service: FabLabService) => {
    setServices(prev => [...prev, service]);
  };

  const updateService = (id: string, updates: Partial<FabLabService>) => {
    setServices(prev => prev.map(service => 
      service.id === id ? { ...service, ...updates, updatedAt: new Date().toISOString() } : service
    ));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(service => service.id !== id));
  };

  const addTariff = (tariff: FabLabTariff) => {
    setTariffs(prev => [...prev, tariff]);
  };

  const updateTariff = (id: string, updates: Partial<FabLabTariff>) => {
    setTariffs(prev => prev.map(tariff => 
      tariff.id === id ? { ...tariff, ...updates, updatedAt: new Date().toISOString() } : tariff
    ));
  };

  const deleteTariff = (id: string) => {
    setTariffs(prev => prev.filter(tariff => tariff.id !== id));
  };

  // Utility functions
  const getPublishedProjects = () => {
    return projects.filter(project => project.status === 'published');
  };

  const getActiveMachines = () => {
    return machines.filter(machine => machine.status === 'available' || machine.status === 'reserved');
  };

  const getActiveServices = () => {
    return services.filter(service => service.status === 'active');
  };

  const getActiveTariffs = () => {
    return tariffs.filter(tariff => tariff.status === 'active');
  };

  const getProjectsByCategory = (category: string) => {
    return getPublishedProjects().filter(project => project.category === category);
  };

  const contextValue: FabLabContextType = {
    // Data
    description,
    projects,
    machines,
    services,
    tariffs,
    
    // Actions
    updateDescription,
    addProject,
    updateProject,
    deleteProject,
    addMachine,
    updateMachine,
    deleteMachine,
    addService,
    updateService,
    deleteService,
    addTariff,
    updateTariff,
    deleteTariff,
    
    // Utilities
    getPublishedProjects,
    getActiveMachines,
    getActiveServices,
    getActiveTariffs,
    getProjectsByCategory,
  };

  return (
    <FabLabContext.Provider value={contextValue}>
      {children}
    </FabLabContext.Provider>
  );
};
