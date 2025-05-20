
# CREC - Centre de Recherche, d'Étude et de Créativité

Interface frontend pour le site web du CREC, une institution éducative catholique.

## À propos du projet

Ce projet est l'interface utilisateur du site web du CREC, une institution d'enseignement supérieur qui propose des formations dans divers domaines en s'appuyant sur des valeurs éducatives et spirituelles. Le design est élégant et sobre, utilisant principalement des tons de bleu foncé, doré et blanc.

## Technologies utilisées

- React
- TypeScript
- Tailwind CSS
- React Router
- Shadcn/UI (composants)
- Vite (build tool)

## Structure du projet

```
src/
├── components/           # Composants réutilisables
│   ├── common/           # Composants génériques (Card, Banner, etc.)
│   ├── layout/           # Composants de mise en page (Header, Footer)
│   └── ui/               # Composants UI de base (boutons, inputs, etc.)
├── context/              # Contextes React (LanguageContext)
├── layouts/              # Layouts de page (MainLayout)
├── pages/                # Pages du site
│   ├── about/            # Pages À propos
│   ├── admin/            # Pages Administration
│   ├── contact/          # Pages Contact
│   ├── donate/           # Pages Dons
│   ├── events/           # Pages Événements
│   ├── formations/       # Pages Formations
│   ├── news/             # Pages Actualités
│   ├── resources/        # Pages Ressources
│   ├── student/          # Pages Étudiants
│   └── teacher/          # Pages Enseignants
├── App.tsx               # Composant principal
├── index.css             # Styles globaux
├── main.tsx              # Point d'entrée
└── routes.tsx            # Configuration des routes
```

## Fonctionnalités

- Design responsive
- Prise en charge multilingue (FR/EN)
- Navigation intuitive
- Interface utilisateur moderne et élégante
- Composants réutilisables

## Installation

1. Clonez ce dépôt
2. Installez les dépendances : `npm install`
3. Lancez le serveur de développement : `npm run dev`

## Développement

### Structure des pages

Le site comprend plusieurs sections principales :

- **À propos** : Mission, équipe, partenaires
- **Formations** : Cours, programmes, université, admission, citoyenneté
- **Événements** : Liste d'événements, détails, calendrier
- **Actualités** : Articles, vie campus, témoignages
- **Espace étudiant** : Connexion, tableau de bord, inscriptions, documents
- **Espace enseignant** : Connexion, gestion des cours, ressources
- **Dons** : Page de dons, information sur les bourses
- **Contact** : Formulaire de contact
- **Ressources** : PDF, galerie, documents officiels
- **Administration** : Gestion du contenu, des utilisateurs, statistiques

### Multilingue

Le projet utilise un contexte React (`LanguageContext`) pour gérer la traduction. Les traductions sont stockées dans des objets JavaScript dans le fichier `LanguageContext.tsx`.

## TODO

- Implémenter toutes les pages selon l'arborescence définie
- Améliorer la gestion des traductions avec plus de contenu
- Ajouter les fonctionnalités de recherche
- Intégrer des formulaires interactifs
- Préparer les points d'entrée pour le backend

## Notes

Ce projet est uniquement frontend. Les intégrations backend (API, authentification, etc.) devront être ajoutées ultérieurement.
