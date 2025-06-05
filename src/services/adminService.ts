import { 
  mockFilieres,
  mockInscriptionsIST,
  mockFormationsOuvertes,
  mockInscriptionsFormationsOuvertes,
  mockProjetsFabLab,
  mockEquipementsFabLab,
  mockAbonnementsFabLab,
  mockReservationsFabLab,
  mockEvenements,
  mockPublicationsVieCampus,
  mockOffresEmploi,
  mockMessagesContact,
  mockDons,
  mockEmailTemplates
} from './mockData';

import { 
  Filiere, 
  InscriptionIST, 
  FormationOuverte, 
  InscriptionFormationOuverte,
  ProjetFabLab,
  EquipementFabLab,
  AbonnementFabLab,
  ReservationFabLab,
  Evenement,
  PublicationVieCampus,
  OffreEmploi,
  MessageContact,
  Don,
  EmailTemplate
} from '@/types/admin';

// Simulation de délai pour les appels API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Service d'authentification admin (simulé)
export const adminAuthService = {
  async login(username: string, password: string): Promise<boolean> {
    await delay(500);
    // Simulation d'authentification simple
    return username === 'admin' && password === 'admin123';
  },

  async logout(): Promise<void> {
    await delay(200);
    localStorage.removeItem('adminToken');
  },

  isAuthenticated(): boolean {
    return localStorage.getItem('adminToken') === 'authenticated';
  },

  setAuthenticated(): void {
    localStorage.setItem('adminToken', 'authenticated');
  }
};

// Services CRUD pour les filières
export const filiereService = {
  async getAll(): Promise<Filiere[]> {
    await delay(300);
    return [...mockFilieres];
  },

  async getById(id: string): Promise<Filiere | null> {
    await delay(200);
    return mockFilieres.find(f => f.id === id) || null;
  },

  async create(filiere: Omit<Filiere, 'id' | 'createdAt' | 'updatedAt'>): Promise<Filiere> {
    await delay(400);
    const newFiliere: Filiere = {
      ...filiere,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockFilieres.push(newFiliere);
    return newFiliere;
  },

  async update(id: string, updates: Partial<Filiere>): Promise<Filiere | null> {
    await delay(400);
    const index = mockFilieres.findIndex(f => f.id === id);
    if (index === -1) return null;
    
    mockFilieres[index] = {
      ...mockFilieres[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return mockFilieres[index];
  },

  async delete(id: string): Promise<boolean> {
    await delay(300);
    const index = mockFilieres.findIndex(f => f.id === id);
    if (index === -1) return false;
    
    mockFilieres.splice(index, 1);
    return true;
  }
};

// Services pour les inscriptions ISTMR
export const inscriptionISTService = {
  async getAll(): Promise<InscriptionIST[]> {
    await delay(300);
    return [...mockInscriptionsIST];
  },

  async updateStatus(id: string, status: 'accepted' | 'rejected'): Promise<boolean> {
    await delay(400);
    const inscription = mockInscriptionsIST.find(i => i.id === id);
    if (!inscription) return false;
    
    inscription.status = status;
    return true;
  },

  async sendEmail(inscriptionId: string, emailType: 'acceptance' | 'rejection', customContent?: string): Promise<boolean> {
    await delay(500);
    // Simulation d'envoi d'email
    console.log(`Email ${emailType} envoyé pour l'inscription ${inscriptionId}`);
    return true;
  }
};

// Services pour les formations ouvertes
export const formationOuverteService = {
  async getAll(): Promise<FormationOuverte[]> {
    await delay(300);
    return [...mockFormationsOuvertes];
  },

  async create(formation: Omit<FormationOuverte, 'id' | 'createdAt' | 'updatedAt'>): Promise<FormationOuverte> {
    await delay(400);
    const newFormation: FormationOuverte = {
      ...formation,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockFormationsOuvertes.push(newFormation);
    return newFormation;
  },

  async update(id: string, updates: Partial<FormationOuverte>): Promise<FormationOuverte | null> {
    await delay(400);
    const index = mockFormationsOuvertes.findIndex(f => f.id === id);
    if (index === -1) return null;
    
    mockFormationsOuvertes[index] = {
      ...mockFormationsOuvertes[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return mockFormationsOuvertes[index];
  },

  async delete(id: string): Promise<boolean> {
    await delay(300);
    const index = mockFormationsOuvertes.findIndex(f => f.id === id);
    if (index === -1) return false;
    
    mockFormationsOuvertes.splice(index, 1);
    return true;
  }
};

// Services pour les inscriptions formations ouvertes
export const inscriptionFormationOuverteService = {
  async getAll(): Promise<InscriptionFormationOuverte[]> {
    await delay(300);
    return [...mockInscriptionsFormationsOuvertes];
  },

  async updateStatus(id: string, status: 'validated' | 'rejected'): Promise<boolean> {
    await delay(400);
    const inscription = mockInscriptionsFormationsOuvertes.find(i => i.id === id);
    if (!inscription) return false;
    
    inscription.status = status;
    return true;
  }
};

// Services pour les projets FabLab
export const projetFabLabService = {
  async getAll(): Promise<ProjetFabLab[]> {
    await delay(300);
    return [...mockProjetsFabLab];
  },

  async create(projet: Omit<ProjetFabLab, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProjetFabLab> {
    await delay(400);
    const newProjet: ProjetFabLab = {
      ...projet,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockProjetsFabLab.push(newProjet);
    return newProjet;
  },

  async update(id: string, updates: Partial<ProjetFabLab>): Promise<ProjetFabLab | null> {
    await delay(400);
    const index = mockProjetsFabLab.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    mockProjetsFabLab[index] = {
      ...mockProjetsFabLab[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return mockProjetsFabLab[index];
  },

  async delete(id: string): Promise<boolean> {
    await delay(300);
    const index = mockProjetsFabLab.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    mockProjetsFabLab.splice(index, 1);
    return true;
  }
};

// Services pour les équipements FabLab
export const equipementFabLabService = {
  async getAll(): Promise<EquipementFabLab[]> {
    await delay(300);
    return [...mockEquipementsFabLab];
  },

  async create(equipement: Omit<EquipementFabLab, 'id' | 'createdAt' | 'updatedAt'>): Promise<EquipementFabLab> {
    await delay(400);
    const newEquipement: EquipementFabLab = {
      ...equipement,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockEquipementsFabLab.push(newEquipement);
    return newEquipement;
  },

  async update(id: string, updates: Partial<EquipementFabLab>): Promise<EquipementFabLab | null> {
    await delay(400);
    const index = mockEquipementsFabLab.findIndex(e => e.id === id);
    if (index === -1) return null;
    
    mockEquipementsFabLab[index] = {
      ...mockEquipementsFabLab[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return mockEquipementsFabLab[index];
  },

  async delete(id: string): Promise<boolean> {
    await delay(300);
    const index = mockEquipementsFabLab.findIndex(e => e.id === id);
    if (index === -1) return false;
    
    mockEquipementsFabLab.splice(index, 1);
    return true;
  }
};

// Services pour les abonnements FabLab
export const abonnementFabLabService = {
  async getAll(): Promise<AbonnementFabLab[]> {
    await delay(300);
    return [...mockAbonnementsFabLab];
  },

  async updateStatus(id: string, status: 'validated' | 'rejected'): Promise<boolean> {
    await delay(400);
    const abonnement = mockAbonnementsFabLab.find(a => a.id === id);
    if (!abonnement) return false;
    
    abonnement.status = status;
    if (status === 'validated' && !abonnement.cleAbonnement) {
      abonnement.cleAbonnement = `FAB-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`;
    }
    return true;
  },

  async sendSubscriptionKey(id: string): Promise<string | null> {
    await delay(500);
    const abonnement = mockAbonnementsFabLab.find(a => a.id === id);
    if (!abonnement || !abonnement.cleAbonnement) return null;
    
    // Simulation d'envoi d'email avec clé
    console.log(`Clé d'abonnement envoyée: ${abonnement.cleAbonnement}`);
    return abonnement.cleAbonnement;
  }
};

// Services pour les réservations FabLab
export const reservationFabLabService = {
  async getAll(): Promise<ReservationFabLab[]> {
    await delay(300);
    return [...mockReservationsFabLab];
  },

  async delete(id: string): Promise<boolean> {
    await delay(300);
    const index = mockReservationsFabLab.findIndex(r => r.id === id);
    if (index === -1) return false;
    
    mockReservationsFabLab.splice(index, 1);
    return true;
  },

  async updateStatus(id: string, status: 'active' | 'completed' | 'cancelled'): Promise<boolean> {
    await delay(400);
    const reservation = mockReservationsFabLab.find(r => r.id === id);
    if (!reservation) return false;
    
    reservation.status = status;
    return true;
  }
};

// Services pour les événements
export const evenementService = {
  async getAll(): Promise<Evenement[]> {
    await delay(300);
    return [...mockEvenements];
  },

  async create(evenement: Omit<Evenement, 'id' | 'createdAt' | 'updatedAt'>): Promise<Evenement> {
    await delay(400);
    const newEvenement: Evenement = {
      ...evenement,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockEvenements.push(newEvenement);
    return newEvenement;
  },

  async update(id: string, updates: Partial<Evenement>): Promise<Evenement | null> {
    await delay(400);
    const index = mockEvenements.findIndex(e => e.id === id);
    if (index === -1) return null;
    
    mockEvenements[index] = {
      ...mockEvenements[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return mockEvenements[index];
  },

  async delete(id: string): Promise<boolean> {
    await delay(300);
    const index = mockEvenements.findIndex(e => e.id === id);
    if (index === -1) return false;
    
    mockEvenements.splice(index, 1);
    return true;
  }
};

// Services pour les publications vie de campus
export const publicationVieCampusService = {
  async getAll(): Promise<PublicationVieCampus[]> {
    await delay(300);
    return [...mockPublicationsVieCampus];
  },

  async create(publication: Omit<PublicationVieCampus, 'id' | 'createdAt' | 'updatedAt'>): Promise<PublicationVieCampus> {
    await delay(400);
    const newPublication: PublicationVieCampus = {
      ...publication,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockPublicationsVieCampus.push(newPublication);
    return newPublication;
  },

  async update(id: string, updates: Partial<PublicationVieCampus>): Promise<PublicationVieCampus | null> {
    await delay(400);
    const index = mockPublicationsVieCampus.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    mockPublicationsVieCampus[index] = {
      ...mockPublicationsVieCampus[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return mockPublicationsVieCampus[index];
  },

  async delete(id: string): Promise<boolean> {
    await delay(300);
    const index = mockPublicationsVieCampus.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    mockPublicationsVieCampus.splice(index, 1);
    return true;
  }
};

// Services pour les offres d'emploi
export const offreEmploiService = {
  async getAll(): Promise<OffreEmploi[]> {
    await delay(300);
    return [...mockOffresEmploi];
  },

  async create(offre: Omit<OffreEmploi, 'id' | 'createdAt' | 'updatedAt'>): Promise<OffreEmploi> {
    await delay(400);
    const newOffre: OffreEmploi = {
      ...offre,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockOffresEmploi.push(newOffre);
    return newOffre;
  },

  async update(id: string, updates: Partial<OffreEmploi>): Promise<OffreEmploi | null> {
    await delay(400);
    const index = mockOffresEmploi.findIndex(o => o.id === id);
    if (index === -1) return null;
    
    mockOffresEmploi[index] = {
      ...mockOffresEmploi[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return mockOffresEmploi[index];
  },

  async delete(id: string): Promise<boolean> {
    await delay(300);
    const index = mockOffresEmploi.findIndex(o => o.id === id);
    if (index === -1) return false;
    
    mockOffresEmploi.splice(index, 1);
    return true;
  }
};

// Services pour les messages de contact
export const messageContactService = {
  async getAll(): Promise<MessageContact[]> {
    await delay(300);
    return [...mockMessagesContact];
  },

  async updateStatus(id: string, status: 'read' | 'replied'): Promise<boolean> {
    await delay(400);
    const message = mockMessagesContact.find(m => m.id === id);
    if (!message) return false;
    
    message.status = status;
    return true;
  },

  async delete(id: string): Promise<boolean> {
    await delay(300);
    const index = mockMessagesContact.findIndex(m => m.id === id);
    if (index === -1) return false;
    
    mockMessagesContact.splice(index, 1);
    return true;
  },

  async sendReply(id: string, replyContent: string): Promise<boolean> {
    await delay(500);
    // Simulation d'envoi de réponse
    console.log(`Réponse envoyée pour le message ${id}: ${replyContent}`);
    await this.updateStatus(id, 'replied');
    return true;
  }
};

// Services pour les dons
export const donService = {
  async getAll(): Promise<Don[]> {
    await delay(300);
    return [...mockDons];
  },

  async updateStatus(id: string, status: 'validated' | 'rejected'): Promise<boolean> {
    await delay(400);
    const don = mockDons.find(d => d.id === id);
    if (!don) return false;
    
    don.status = status;
    return true;
  }
};
