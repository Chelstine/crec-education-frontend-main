# Documentation Technique Frontend - CREC Education & ISTMR

Ce dépôt contient le code source du frontend officiel du **Centre de Recherche d'Études et de Créativité (CREC)** et de l'**Institut des Sciences et Technologies Matteo Ricci (ISTMR)**, incluant la plateforme de réservation avancée pour le FabLab.

## 🚀 Socle Technologique

L'architecture s'appuie sur une pile moderne garantissant performances, modularité et maintenabilité :
*   **Framework React** : React 18 avec architecture par composants fonctionnels et Hooks.
*   **Build & Bundling** : Vite (extrêmement rapide et optimisé pour ESM).
*   **Typage Statique** : TypeScript, pour une fiabilité absolue en cours de développement.
*   **Routage Dynamique** : React Router DOM v6.
*   **Gestion d'État asynchrone** : TanStack React Query (mise en cache et requêtage API efficace).
*   **Interface UI & Expérience Utilisateur** : Tailwind CSS couplé à Framer Motion pour des animations fluides.
*   **Composants Accessibles** : Primitives Radix UI et système de design sur-mesure (Unified Glassmorphism Design System - UGDS).
*   **Internationalisation (i18n)** : i18next pour un déploiement multilingue.

## 🛡️ Architecture de Sécurité (Sécurisation Avancée)

Suite à de récents audits, l'infrastructure client a été drastiquement durcie ("Hardening") :
*   **Immunité XSS sur les Sessions (Phase 2)** : Le frontend ne manipule **plus aucun** token JWT côté client (`localStorage` ou `sessionStorage`). Les identifiants de session sont gérés nativement par le navigateur via des **cookies HttpOnly** inviolables.
*   **Requêtes Sécurisées** : Configuration globale des instances d'Axios (`axios.defaults.withCredentials = true`) pour garantir le transit natif et sécurisé des sessions.
*   **Validation d'Accès Côté Serveur (Phase 4)** : Pour le FabLab, toute validation de compte (Statut Étudiant/Professionnel et droits de réservation) s'exécute **strictement sur le backend** en interrogeant la base de données. L'interface ne se fie jamais aux valeurs locales potentiellement falsifiables.

## 📦 Structure du Projet

```text
src/
├── components/       # Composants d'interface (divisés par logique métier : admin, fablab, university)
├── contexts/         # Fournisseurs de contexte (Authentification, Langue, Thème)
├── hooks/            # Hooks React personnalisés (e.g., useFablab, useUserSubscriptionStatus)
├── layouts/          # Modèles de mise en page (MainLayout, UniversityLayout, AdminLayout)
├── lib/              # Fonctions et configurations utilitaires (API Axios)
├── pages/            # Vues et routes principales
├── services/         # Couche d'abstraction pour l'API backend
├── types/            # Définitions strictes des interfaces TypeScript
└── locales/          # Dictionnaires de traduction pour l'internalisation
```

## ⚙️ Configuration de l'Environnement

L'application requiert des variables d'environnement. Un fichier `.env` doit être créé à la racine, basé sur `.env.example` :

```env
# URL de l'API Backend (Production: Render, Développement: localhost)
VITE_API_URL=http://localhost:8000/api

# URL d'accès direct au stockage public
VITE_STORAGE_URL=http://localhost:8000/storage
```

> **Note de Production** : Lors du déploiement sur Vercel, ces variables doivent être impérativement injectées dans le tableau de bord "Environment Variables".

## 🛠️ Guide de Développement Local

1.  **Installation des dépendances** :
    ```bash
    npm install
    ```
2.  **Lancement du serveur de développement interactif** :
    ```bash
    npm run dev
    ```
3.  **Compilation pour la production** :
    ```bash
    npm run build
    ```

## ☁️ Consignes de Déploiement (Vercel)

L'application est conçue pour être servie idéalement par **Vercel** ou toute infrastructure compatible Node.js/Static :
*   Le routage SPA est supporté nativement.
*   Les builds se font via la commande standard `tsc -b && vite build`.
