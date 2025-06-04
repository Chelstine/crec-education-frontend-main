// === INSTRUCTIONS POUR COPILOT : FINALISER LE FRONTEND POUR LES REQUÊTES API ===
//
// Copilot, je veux finaliser ce frontend pour qu’il soit prêt à envoyer des requêtes GET et POST etc vers un backend.
// Voici les tâches que tu dois vérifier ou créer automatiquement si ce n’est pas déjà fait :
// Je te demande de compléter chaque étape ou me suggérer le code nécessaire.

// 1. Crée ou vérifie un fichier .env.local avec une variable :
//    VITE_API_BASE_URL=https://votre-backend.exemple.com/api
//    (Suggère-moi le bon contenu si manquant)

// 2. Dans src/services/api.ts :
//    - Crée une instance Axios ou une fonction fetch avec cette base URL
//    - Configure les headers de base (Content-Type, Authorization si besoin)
//    - Assure-toi que l’URL provient de import.meta.env.VITE_API_BASE_URL

// 3. Vérifie que Axios (ou fetch) est bien installé (npm/yarn) et importé dans le fichier api.ts
//    - Si ce n’est pas le cas, suggère-moi la commande d’installation

// 4. Crée des fonctions pour faire des requêtes GET et POST génériques
//    - Exemple : getEvents(), createEvent(data), etc.
//    - Chaque fonction doit avoir un type TypeScript clair pour les données entrantes et sortantes

// 5. Crée les interfaces TypeScript nécessaires pour typer les réponses (dans src/types/index.ts ou ailleurs)
//    - Exemples : interface Event { id: number; title: string; ... }

// 6. Vérifie que les appels API sont bien appelés dans les hooks ou composants (comme useEffect)
//    - Si ce n’est pas le cas, propose des hooks personnalisés (ex: useEvents, useCreateEvent)

// 7. Gère les erreurs dans chaque appel API
//    - Si une erreur survient, retourne-la proprement ou affiche une notification avec un toast

// 8. Vérifie que les formulaires (comme dans ContactPage ou DonatePage) utilisent bien les fonctions POST
//    - Ajoute la validation de base (ex: champs obligatoires, format d'email)

// 9. Vérifie si un token JWT est nécessaire pour les requêtes
//    - Si oui, stocke-le dans localStorage ou cookie et ajoute-le dans les headers Authorization
//    - Crée login() et logout() avec gestion automatique du token

// 10. Crée un interceptor Axios pour ajouter automatiquement le token dans chaque requête si disponible

// 11. Vérifie la structure des pages dans src/pages/
//    - Assure-toi que les composants utilisent bien les données reçues par API
//    - Si les données sont encore mockées (mockData.ts), remplace-les par de vrais appels API

// 12. Vérifie que les erreurs API sont bien affichées dans l’interface utilisateur
//    - Utilise useToast() ou un autre système d’alerte

// 13. Assure-toi que tout fonctionne dans le mode développement (npm run dev)
//    - Vérifie que toutes les pages chargent correctement leurs données dynamiques

// 14. Propose une commande de build propre (npm run build) et vérifie vite.config.ts pour la config de production
//    - Assure-toi que les variables d’environnement seront bien injectées lors du build

// 15. Enfin, vérifie si une documentation existe (README.md, FRONTEND-BACKEND-READY.md)
//    - Sinon, propose-moi un petit résumé à ajouter sur comment connecter le frontend à l’API backend

// Merci Copilot !
