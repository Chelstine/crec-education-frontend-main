# Guide de Migration - Nouvelle Architecture

## 🎯 Objectif
Ce guide aide à migrer les pages admin existantes vers la nouvelle architecture centralisée.

## 📋 Checklist de Migration

### 1. Avant de Commencer
- [ ] Lire `CLEAN_ARCHITECTURE.md`
- [ ] Comprendre la nouvelle structure
- [ ] Identifier les dépendances de la page à migrer

### 2. Imports à Remplacer

#### Anciens Imports Dispersés
```typescript
// ❌ Ancienne méthode
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';

// Logique de filtrage dupliquée dans chaque composant
const [searchTerm, setSearchTerm] = useState('');
const [filterStatus, setFilterStatus] = useState('all');
// ... logique de filtrage répétée
```

#### Nouveaux Imports Centralisés
```typescript
// ✅ Nouvelle méthode
import { motion } from 'framer-motion';
import { 
  getBadgeColor, 
  formatDate, 
  adminAnimations 
} from '@/utils/adminUtils';
import { 
  useFilteredData, 
  useModal, 
  useLoading 
} from '@/hooks/useAdmin';
import { 
  INSCRIPTION_STATUS, 
  FORMATIONS_OUVERTES,
  statusColors 
} from '@/constants/admin';
```

### 3. Remplacement de la Logique Commune

#### État de Chargement
```typescript
// ❌ Avant
const [loading, setLoading] = useState(true);

// ✅ Après
const { loading, startLoading, stopLoading } = useLoading();
```

#### Filtrage de Données
```typescript
// ❌ Avant
const [searchTerm, setSearchTerm] = useState('');
const [filteredData, setFilteredData] = useState([]);
// ... logique de filtrage complexe

// ✅ Après
const { 
  filteredData, 
  searchTerm, 
  setSearchTerm, 
  updateFilter 
} = useFilteredData(data, ['name', 'email', 'formation']);
```

#### Gestion des Modales
```typescript
// ❌ Avant
const [isModalOpen, setIsModalOpen] = useState(false);

// ✅ Après
const { isOpen, openModal, closeModal } = useModal();
```

### 4. Couleurs Standardisées

#### Badges de Statut
```typescript
// ❌ Avant
const getStatusColor = (status) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'approved': return 'bg-green-100 text-green-800';
    // ... répété dans chaque composant
  }
};

// ✅ Après
<Badge className={getBadgeColor(status, 'status')}>
  {status}
</Badge>
```

### 5. Animations Standardisées

```typescript
// ❌ Avant
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>

// ✅ Après
<motion.div {...adminAnimations.fadeIn}>
```

### 6. Constantes vs Valeurs Hardcodées

```typescript
// ❌ Avant
if (inscription.status === 'pending') {
  // ...
}

// ✅ Après
if (inscription.status === INSCRIPTION_STATUS.PENDING) {
  // ...
}
```

## 🔄 Exemple de Migration Complète

### Avant (Ancienne Page)
```typescript
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

const OldInscriptionsPage = () => {
  const [inscriptions, setInscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filteredInscriptions, setFilteredInscriptions] = useState([]);

  // Logique de filtrage répétée
  useEffect(() => {
    let filtered = inscriptions;
    if (searchTerm) {
      filtered = filtered.filter(/* ... */);
    }
    if (filterStatus !== 'all') {
      filtered = filtered.filter(/* ... */);
    }
    setFilteredInscriptions(filtered);
  }, [inscriptions, searchTerm, filterStatus]);

  // Couleurs hardcodées
  const getStatusBadge = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800'
    };
    return <Badge className={colors[status]}>{status}</Badge>;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ... composant */}
    </motion.div>
  );
};
```

### Après (Nouvelle Page)
```typescript
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { 
  getBadgeColor, 
  adminAnimations 
} from '@/utils/adminUtils';
import { 
  useFilteredData, 
  useLoading 
} from '@/hooks/useAdmin';
import { INSCRIPTION_STATUS } from '@/constants/admin';

const NewInscriptionsPage = () => {
  const [inscriptions, setInscriptions] = useState([]);
  const { loading, startLoading, stopLoading } = useLoading();
  const { 
    filteredData: filteredInscriptions, 
    searchTerm, 
    setSearchTerm, 
    updateFilter 
  } = useFilteredData(inscriptions, ['name', 'email']);

  // Utilisation des constantes
  const getStatusBadge = (status) => (
    <Badge className={getBadgeColor(status, 'status')}>
      {status}
    </Badge>
  );

  return (
    <motion.div {...adminAnimations.fadeIn}>
      {/* ... composant */}
    </motion.div>
  );
};
```

## 📝 Étapes de Migration

1. **Analyser la page existante**
   - Identifier la logique de filtrage
   - Repérer les couleurs hardcodées
   - Noter les constantes utilisées

2. **Remplacer les imports**
   - Ajouter les imports des nouveaux utilitaires
   - Supprimer les imports inutiles

3. **Migrer la logique d'état**
   - Remplacer par les hooks centralisés
   - Supprimer le code dupliqué

4. **Standardiser les couleurs**
   - Utiliser `getBadgeColor()`
   - Supprimer les définitions de couleurs locales

5. **Utiliser les constantes**
   - Remplacer les chaînes hardcodées
   - Importer depuis `@/constants/admin`

6. **Tester la page**
   - Vérifier que tout fonctionne
   - Valider avec `npm run build`

## 🎯 Bénéfices Après Migration

- ✅ **Moins de code** : Suppression de la logique dupliquée
- ✅ **Cohérence** : Couleurs et animations standardisées
- ✅ **Maintenabilité** : Modifications centralisées
- ✅ **Réutilisabilité** : Hooks et utilitaires partagés
- ✅ **Performance** : Logique optimisée
- ✅ **Type Safety** : Constantes typées

## 🚀 Prochaines Étapes

1. Migrer `FormationsManagement.tsx`
2. Migrer `InscriptionsManagement.tsx`
3. Migrer `SectionsManagement.tsx`
4. Migrer `FabLabManagement.tsx`
5. Supprimer les routes legacy
6. Ajouter des tests pour les nouveaux utilitaires
