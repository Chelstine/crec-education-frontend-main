// Service pour la gestion et la synchronisation des filières ISTMR
import React from 'react';

export interface Filiere {
  id: string;
  title: string;
  description: string;
  image: string;
  competences: string[];
  debouches: string[];
  profil: string;
  type: 'licence' | 'master' | 'specialisation';
  duree: string;
  inscrits: number;
  fraisInscription: number;
  statut: 'active' | 'inactive';
}

export interface StudentCountUpdate {
  filiereId: string;
  inscrits: number;
  timestamp: string;
  source: 'admin' | 'auto' | 'manual';
}

class FiliereService {
  private filieres: Filiere[] = [
    {
      id: 'F001',
      title: 'Développement de logiciels',
      description: 'Concevez des logiciels robustes et éthiques avec des langages modernes (Java, Python), des méthodologies agiles et une approche centrée sur la résolution de problèmes sociétaux.',
      image: '/img/dev-logiciel.png',
      competences: ['Programmation avancée', 'Architecture logicielle', 'Gestion de projets agiles', 'Cybersécurité'],
      debouches: ['Développeur logiciel', 'Ingénieur logiciel', 'Architecte logiciel', 'Testeur QA'],
      profil: 'Passionné par la logique, la structure et le travail collaboratif.',
      type: 'licence',
      duree: '3 ans',
      inscrits: 28,
      fraisInscription: 450000,
      statut: 'active'
    },
    {
      id: 'F002',
      title: 'Développement Web & Mobile',
      description: 'Créez des applications web et mobiles innovantes et accessibles, en maîtrisant HTML, CSS, JavaScript, React, Flutter et le design d\'interfaces utilisateur.',
      image: '/img/dev-web.png',
      competences: ['Design UI/UX', 'Développement responsive', 'Intégration d\'API', 'Applications mobiles'],
      debouches: ['Développeur front-end', 'Développeur mobile', 'Intégrateur web', 'Product builder'],
      profil: 'Créatif, visuel, et motivé par la concrétisation rapide d\'idées.',
      type: 'licence',
      duree: '3 ans',
      inscrits: 23,
      fraisInscription: 450000,
      statut: 'active'
    },
    {
      id: 'F003',
      title: 'Science des données',
      description: 'Exploitez les données pour éclairer les décisions avec Python, SQL, PowerBI et des techniques d\'intelligence artificielle, dans une perspective éthique et responsable.',
      image: '/img/data-science.png',
      competences: ['Analyse de données', 'Visualisation', 'Statistiques appliquées', 'IA de base'],
      debouches: ['Data analyst', 'Business analyst', 'Consultant data', 'Data scientist'],
      profil: 'Curieux, analytique, et attiré par les solutions basées sur les données.',
      type: 'licence',
      duree: '3 ans',
      inscrits: 18,
      fraisInscription: 480000,
      statut: 'active'
    }
  ];

  private listeners: Array<(filieres: Filiere[]) => void> = [];

  // Récupérer toutes les filières
  getFilieres(): Filiere[] {
    return this.filieres.filter(f => f.statut === 'active');
  }

  // Récupérer une filière par ID
  getFiliereById(id: string): Filiere | undefined {
    return this.filieres.find(f => f.id === id);
  }

  // Mettre à jour une filière
  updateFiliere(id: string, updates: Partial<Filiere>): boolean {
    const index = this.filieres.findIndex(f => f.id === id);
    if (index !== -1) {
      this.filieres[index] = { ...this.filieres[index], ...updates };
      this.notifyListeners();
      return true;
    }
    return false;
  }

  // Mettre à jour le nombre d'étudiants inscrits
  updateStudentCount(filiereId: string, inscrits: number, source: 'admin' | 'auto' | 'manual' = 'manual'): boolean {
    const update: StudentCountUpdate = {
      filiereId,
      inscrits,
      timestamp: new Date().toISOString(),
      source
    };

    const success = this.updateFiliere(filiereId, { inscrits });
    
    if (success) {
      // Log de l'action pour audit
      console.log(`Student count updated for ${filiereId}: ${inscrits} (source: ${source})`);
      
      // Dans un vrai système, ici on enverrait la mise à jour au backend
      this.persistToBackend(update);
    }
    
    return success;
  }

  // Incrémenter le nombre d'étudiants (auto-increment lors d'acceptation de candidature)
  incrementStudentCount(filiereId: string): boolean {
    const filiere = this.getFiliereById(filiereId);
    if (filiere) {
      return this.updateStudentCount(filiereId, filiere.inscrits + 1, 'auto');
    }
    return false;
  }

  // Décrémenter le nombre d'étudiants
  decrementStudentCount(filiereId: string): boolean {
    const filiere = this.getFiliereById(filiereId);
    if (filiere) {
      const newCount = Math.max(0, filiere.inscrits - 1);
      return this.updateStudentCount(filiereId, newCount, 'manual');
    }
    return false;
  }

  // Ajouter une nouvelle filière
  addFiliere(filiere: Omit<Filiere, 'id'>): Filiere {
    const id = `F${String(this.filieres.length + 1).padStart(3, '0')}`;
    const newFiliere: Filiere = {
      id,
      ...filiere,
      inscrits: 0 // Les nouvelles filières commencent avec 0 inscrits
    };

    this.filieres.push(newFiliere);
    this.notifyListeners();
    return newFiliere;
  }

  // Supprimer une filière
  deleteFiliere(id: string): boolean {
    const index = this.filieres.findIndex(f => f.id === id);
    if (index !== -1) {
      this.filieres.splice(index, 1);
      this.notifyListeners();
      return true;
    }
    return false;
  }

  // S'abonner aux changements (pour la synchronisation en temps réel)
  subscribe(callback: (filieres: Filiere[]) => void): () => void {
    this.listeners.push(callback);
    
    // Retourner une fonction de désabonnement
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index !== -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Notifier tous les listeners
  private notifyListeners(): void {
    this.listeners.forEach(callback => callback([...this.filieres]));
  }

  // Simuler la persistance en backend
  private async persistToBackend(update: StudentCountUpdate): Promise<void> {
    // Dans un vrai système, ici on ferait un appel API
    // Pour la démo, on simule juste un délai
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('Data persisted to backend:', update);
        resolve();
      }, 100);
    });
  }

  // Simuler la réception de mises à jour du backend (WebSocket/SSE)
  simulateBackendUpdate(filiereId: string, inscrits: number): void {
    this.updateStudentCount(filiereId, inscrits, 'auto');
  }

  // Obtenir les statistiques globales
  getStats() {
    const activeFilieres = this.getFilieres();
    return {
      totalFilieres: activeFilieres.length,
      licences: activeFilieres.filter(f => f.type === 'licence').length,
      masters: activeFilieres.filter(f => f.type === 'master').length,
      specialisations: activeFilieres.filter(f => f.type === 'specialisation').length,
      inscritsTotal: activeFilieres.reduce((sum, f) => sum + f.inscrits, 0),
      formationsActives: activeFilieres.length
    };
  }
}

// Instance singleton
export const filiereService = new FiliereService();

// Hook React pour utiliser le service
export function useFilieres() {
  const [filieres, setFilieres] = React.useState<Filiere[]>(() => filiereService.getFilieres());

  React.useEffect(() => {
    // S'abonner aux changements
    const unsubscribe = filiereService.subscribe((updatedFilieres) => {
      setFilieres(updatedFilieres.filter(f => f.statut === 'active'));
    });

    // Nettoyer l'abonnement
    return unsubscribe;
  }, []);

  return {
    filieres,
    incrementStudent: (id: string) => filiereService.incrementStudentCount(id),
    decrementStudent: (id: string) => filiereService.decrementStudentCount(id),
    updateStudentCount: (id: string, count: number) => filiereService.updateStudentCount(id, count),
    getStats: () => filiereService.getStats()
  };
}

export default filiereService;
