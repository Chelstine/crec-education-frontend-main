# 📚 Guide Pédagogique Complet - Projet CREC
## Comprendre et Apprendre React/TypeScript à travers le Code

---

## 🎯 Objectif de ce Guide

Ce guide vous accompagne dans l'apprentissage du développement React moderne à travers l'analyse du code du projet CREC. Chaque concept est expliqué de manière pédagogique avec des exemples concrets tirés du projet.

---

## 📖 Table des Matières

1. [Concepts React Fondamentaux](#concepts-react-fondamentaux)
2. [Structure des Imports](#structure-des-imports)
3. [Types TypeScript](#types-typescript)
4. [Hooks React](#hooks-react)
5. [Gestion d'État](#gestion-detat)
6. [Composants et Props](#composants-et-props)
7. [Événements et Interactions](#evenements-et-interactions)
8. [Navigation avec React Router](#navigation-avec-react-router)
9. [Animations avec Framer Motion](#animations-avec-framer-motion)
10. [Patterns et Bonnes Pratiques](#patterns-et-bonnes-pratiques)

---

## 🚀 Concepts React Fondamentaux

### Qu'est-ce qu'un Composant React ?

```tsx
// Exemple tiré de HomePage.tsx
const HomePage = () => {
  // Logique du composant (hooks, fonctions)
  const { t } = useLanguage();
  
  // Rendu JSX
  return (
    <div className="min-h-screen">
      <h1>Bienvenue au CREC</h1>
    </div>
  );
};
```

**Explication :**
- Un composant React est une fonction qui retourne du JSX
- JSX = JavaScript XML (syntaxe qui ressemble à HTML mais dans JavaScript)
- Les composants sont réutilisables et modulaires

### Pourquoi utiliser des Composants ?

1. **Réutilisabilité** : Créer une fois, utiliser partout
2. **Maintenabilité** : Chaque composant a une responsabilité précise
3. **Testabilité** : Plus facile de tester des petites unités
4. **Lisibilité** : Code organisé et compréhensible

---

## 📦 Structure des Imports

### Organisation Recommandée (utilisée dans le projet)

```tsx
/* ====== IMPORTS REACT ET HOOKS ====== */
import React, { useState, useEffect } from 'react';

/* ====== IMPORTS NAVIGATION ====== */
import { Link, useNavigate } from 'react-router-dom';

/* ====== IMPORTS COMPOSANTS UI ====== */
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

/* ====== IMPORTS ICÔNES ====== */
import { Search, Filter, Eye } from 'lucide-react';

/* ====== IMPORTS SERVICES ====== */
import { useContactSubmission } from '@/hooks/useApi';
```

**Pourquoi cette organisation ?**
- Facilite la lecture et maintenance
- Permet de voir rapidement les dépendances
- Évite les conflits de noms
- Améliore les performances de bundling

### Types d'Imports Expliqués

```tsx
// Import par défaut
import React from 'react';

// Import nommé (destructuring)
import { useState, useEffect } from 'react';

// Import avec alias
import { Card as UICard } from '@/components/ui/card';

// Import de tout avec alias
import * as Icons from 'lucide-react';
```

---

## 🏷️ Types TypeScript

### Pourquoi TypeScript ?

TypeScript ajoute le typage statique à JavaScript, ce qui permet :
- Détecter les erreurs avant l'exécution
- Améliorer l'autocomplétion dans l'éditeur
- Documenter le code automatiquement
- Faciliter la refactorisation

### Interfaces (vues dans InscriptionsISTMR.tsx)

```tsx
// Définition d'une interface
interface Inscription {
  id: string;                    // Type string obligatoire
  candidateName: string;         
  email: string;
  status: 'pending' | 'approved' | 'rejected';  // Union type
  documents: {                   // Objet imbriqué
    cv: { 
      submitted: boolean;        // Type boolean
      url?: string;             // Propriété optionnelle (?)
    };
  };
}

// Utilisation de l'interface
const [inscriptions, setInscriptions] = useState<Inscription[]>([]);
```

**Concepts clés :**
- `interface` : définit la structure d'un objet
- `?` : propriété optionnelle
- `|` : union type (plusieurs valeurs possibles)
- `[]` : tableau du type spécifié

### Types Utilitaires

```tsx
// Type pour les clés d'un objet
type InscriptionKeys = keyof Inscription; // 'id' | 'candidateName' | 'email' | ...

// Type partiel (toutes les propriétés deviennent optionnelles)
type PartialInscription = Partial<Inscription>;

// Type requis (enlève tous les optionnels)
type RequiredInscription = Required<Inscription>;
```

---

## 🔗 Hooks React

### useState - Gestion d'État Local

```tsx
// Exemple de ContactPage.tsx
const [formData, setFormData] = useState<ContactForm>({
  name: "",
  email: "",
  subject: "",
  message: ""
});

// Mise à jour de l'état
const handleInputChange = (field: keyof ContactForm, value: string) => {
  setFormData(prev => ({ ...prev, [field]: value }));
};
```

**Explication :**
- `useState` retourne un tuple : [valeur, fonction de mise à jour]
- La fonction de mise à jour peut recevoir une nouvelle valeur ou une fonction
- `prev => ({ ...prev, [field]: value })` : spread operator pour préserver les autres propriétés

### useEffect - Effets de Bord

```tsx
// Exemple d'EventsUnified.tsx
useEffect(() => {
  // Code qui s'exécute après le rendu
  setTimeout(() => {
    setEvents(mockData);
    setIsLoading(false);
  }, 1000);
}, []); // Tableau de dépendances vide = exécution une seule fois

// Effet avec dépendances
useEffect(() => {
  // Se ré-exécute quand searchTerm change
  const filtered = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredEvents(filtered);
}, [searchTerm, events]); // Dépendances
```

**Cas d'usage courants :**
- Appels API au chargement
- Abonnements/désabonnements
- Nettoyage de timers
- Mise à jour du titre de la page

### Hooks Personnalisés

```tsx
// Exemple de useLanguage dans LanguageContext
const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
```

---

## 🎛️ Gestion d'État

### État Local vs État Global

```tsx
// ÉTAT LOCAL (useState)
const [searchTerm, setSearchTerm] = useState('');

// ÉTAT GLOBAL (Context)
const { events, addEvent } = useFabLab();
```

### Context API (FabLabContext.tsx)

```tsx
// Création du Context
const FabLabContext = createContext<FabLabContextType | undefined>(undefined);

// Provider
export const FabLabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  
  const addProject = (project: Project) => {
    setProjects(prev => [...prev, project]);
  };
  
  return (
    <FabLabContext.Provider value={{ projects, addProject }}>
      {children}
    </FabLabContext.Provider>
  );
};
```

---

## 🧩 Composants et Props

### Composants Fonctionnels

```tsx
// Composant simple
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const config = statusConfig[status] || statusConfig.pending;
  
  return (
    <Badge className={config.color}>
      {config.label}
    </Badge>
  );
};

// Utilisation
<StatusBadge status="approved" />
```

### Props et Destructuring

```tsx
// Interface pour les props
interface CardProps {
  title: string;
  description: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

// Composant avec destructuring des props
const CustomCard: React.FC<CardProps> = ({ 
  title, 
  description, 
  onClick, 
  children 
}) => {
  return (
    <Card onClick={onClick}>
      <h3>{title}</h3>
      <p>{description}</p>
      {children}
    </Card>
  );
};
```

### Composition vs Héritage

React favorise la composition :

```tsx
// COMPOSITION (recommandé)
const Modal = ({ children }) => (
  <div className="modal">
    {children}
  </div>
);

const ConfirmModal = () => (
  <Modal>
    <h2>Confirmation</h2>
    <Button>Confirmer</Button>
  </Modal>
);
```

---

## ⚡ Événements et Interactions

### Gestion des Événements

```tsx
// Événement de formulaire
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault(); // Empêche le comportement par défaut
  
  // Validation
  if (!formData.name) {
    return;
  }
  
  // Traitement
  await submitForm(formData);
};

// Événement de clic
const handleClick = (id: string) => {
  setSelectedId(id);
  setModalOpen(true);
};

// Événement de changement
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearchTerm(e.target.value);
};
```

### Event Handlers Patterns

```tsx
// Pattern avec closure
const handleEdit = (id: string) => () => {
  editItem(id);
};

// Utilisation
{items.map(item => (
  <Button key={item.id} onClick={handleEdit(item.id)}>
    Éditer
  </Button>
))}
```

---

## 🧭 Navigation avec React Router

### Configuration des Routes

```tsx
// routes.tsx
import { Routes, Route } from 'react-router-dom';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/admin/*" element={<AdminLayout />}>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="inscriptions" element={<InscriptionsISTMR />} />
    </Route>
  </Routes>
);
```

### Navigation Programmatique

```tsx
import { useNavigate, Link } from 'react-router-dom';

const MyComponent = () => {
  const navigate = useNavigate();
  
  // Navigation avec JavaScript
  const handleSuccess = () => {
    navigate('/admin/dashboard');
  };
  
  // Navigation déclarative
  return (
    <div>
      <Link to="/formations">Formations</Link>
      <Button onClick={handleSuccess}>Continuer</Button>
    </div>
  );
};
```

---

## 🎨 Animations avec Framer Motion

### Animations de Base

```tsx
import { motion } from 'framer-motion';

// Animation d'apparition
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Contenu animé
</motion.div>

// Animation de liste
<AnimatePresence>
  {items.map(item => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {item.name}
    </motion.div>
  ))}
</AnimatePresence>
```

---

## 🏗️ Patterns et Bonnes Pratiques

### 1. Composition de Composants

```tsx
// Container/Presenter Pattern
const InscriptionsContainer = () => {
  const [inscriptions, setInscriptions] = useState([]);
  // Logique métier
  
  return <InscriptionsPresenter inscriptions={inscriptions} />;
};

const InscriptionsPresenter = ({ inscriptions }) => {
  // Uniquement du rendu
  return <div>{/* JSX */}</div>;
};
```

### 2. Custom Hooks

```tsx
// Logique réutilisable
const useApi = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [url]);
  
  return { data, loading };
};
```

### 3. Conditional Rendering

```tsx
// Rendu conditionnel
{isLoading ? (
  <Spinner />
) : (
  <Content data={data} />
)}

// Rendu conditionnel avec &&
{error && <ErrorMessage error={error} />}

// Valeur par défaut
{data?.items?.length || 0} éléments
```

### 4. Gestion d'Erreurs

```tsx
const MyComponent = () => {
  const [error, setError] = useState<string | null>(null);
  
  const handleAction = async () => {
    try {
      await riskyOperation();
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };
  
  return (
    <div>
      {error && <Alert variant="destructive">{error}</Alert>}
      <Button onClick={handleAction}>Action</Button>
    </div>
  );
};
```

---

## 📝 Résumé des Concepts Clés

### Ce que vous avez appris :

1. **Structure React** : Composants, JSX, props
2. **TypeScript** : Typage statique, interfaces, types
3. **Hooks** : useState, useEffect, hooks personnalisés
4. **Gestion d'état** : Local vs global, Context API
5. **Événements** : Handlers, preventDefault, patterns
6. **Navigation** : React Router, routes, navigation programmatique
7. **Animations** : Framer Motion, transitions
8. **Bonnes pratiques** : Composition, separation of concerns

### Prochaines étapes :

1. Pratiquer en modifiant le code existant
2. Créer de nouveaux composants
3. Ajouter des fonctionnalités
4. Explorer React Query pour la gestion d'état serveur
5. Apprendre les tests avec Jest et React Testing Library

---

## 🎯 Exercices Pratiques

### Niveau Débutant :
1. Modifier le texte d'une page existante
2. Changer les couleurs d'un composant
3. Ajouter une nouvelle icône

### Niveau Intermédiaire :
1. Créer un nouveau composant Badge
2. Ajouter un filtre à une liste existante
3. Implémenter une modale simple

### Niveau Avancé :
1. Créer un hook personnalisé pour l'API
2. Implémenter un formulaire avec validation
3. Ajouter des animations complexes

---

*Ce guide évoluera avec votre apprentissage. N'hésitez pas à l'enrichir avec vos découvertes !*
