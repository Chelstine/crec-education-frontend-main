# Copilot Instructions pour CREC Education Platform

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## 🎯 Contexte du Projet

Ce projet est la plateforme éducative du **CREC** (Centre de Recherche, d'Étude et de Créativité), une institution jésuite au Bénin fondée en 2012.

## 🛠 Stack Technique

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS + Shadcn/ui
- **Backend**: Next.js API routes + Prisma + PostgreSQL
- **Authentification**: NextAuth.js
- **Upload**: Cloudinary
- **Base de données**: PostgreSQL avec Prisma ORM

## 📋 Structure des Pages

1. **Page d'accueil** avec Hero, Description CREC, Formations, Bibliothèque, Écologie, Gouvernance, Partenaires
2. **Formations** : Universitaires, Ouvertes, FabLab
3. **À propos** : Histoire, Valeurs jésuites, Équipe
4. **Actualités & Événements**
5. **Contact & Dons**
6. **Admin Panel** pour gestion de contenu

## 🎨 Design Guidelines

- **Couleurs principales** : Bleu marine (#14213D), Or (#FCA311), Blanc cassé (#F5F5F5)
- **Typographie** : Professionnelle et lisible
- **Responsive design** obligatoire
- **Animations** avec Framer Motion
- **Accessibilité** WCAG 2.1 AA

## 🔐 Fonctionnalités Clés

- Gestion de contenu dynamique (CMS)
- Système d'inscription aux formations
- Réservation de machines FabLab
- Gestion d'événements
- Newsletter et notifications
- Système de paiement pour formations
- Upload de documents et médias

## 💡 Bonnes Pratiques

- Utiliser les composants Shadcn/ui
- Types TypeScript stricts
- Validation des données avec Zod
- Gestion d'erreurs robuste
- SEO optimisé
- Performance optimisée (Core Web Vitals)
- Code documenté et testé

## 🌍 Contexte Éducatif

Le CREC propose :
- **Formations universitaires** : Développement logiciel, Web/Mobile, Data Science
- **Formations ouvertes** : Langues, Informatique, Entrepreneuriat
- **FabLab** : Impression 3D, Électronique, Projets innovants
- **Valeurs jésuites** : Cura Personalis, Magis, Service des plus pauvres

## 📝 Instructions Spécifiques

- Toujours utiliser TypeScript avec des types stricts
- Privilégier les Server Components Next.js 14
- Utiliser Prisma pour les interactions BDD
- Implémenter la logique métier côté serveur
- Respecter l'architecture App Router de Next.js
- Créer des API routes RESTful et sécurisées
