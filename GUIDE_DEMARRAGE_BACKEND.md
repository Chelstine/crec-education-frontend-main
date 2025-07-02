# 🎯 GUIDE DE DÉMARRAGE BACKEND - CREC EDUCATION

**Date :** 2 juillet 2025  
**Frontend Status :** ✅ 100% PRÊT  
**Backend à développer :** FastAPI + PostgreSQL + Prisma

---

## 📋 **RÉCAPITULATIF COMPLET**

### ✅ **CE QUI EST PRÊT CÔTÉ FRONTEND**

#### **🔐 Authentification & Sécurité**
- Système RBAC complet (Rôles + Permissions)
- Protection des routes admin avec `ProtectedRoute`
- Gestion des tokens JWT (prêt à recevoir du backend)
- Vérification d'abonnement FabLab
- Middleware de sécurité pour tous les appels API

#### **📱 Pages & Interface**
- **43 pages** créées et fonctionnelles
- **16 pages admin** avec CRUD complet
- **Interface responsive** sur tous les appareils
- **Composants UI** cohérents avec shadcn/ui
- **Animations** et transitions fluides

#### **🔌 Intégration API**
- **28 hooks useApi** prêts à consommer les endpoints
- **Services frontend** structurés par domaine
- **Gestion d'erreurs** centralisée
- **États de chargement** pour toutes les opérations
- **Types TypeScript** parfaitement définis

#### **📊 Fonctionnalités Métier**
- **Gestion programmes universitaires** complète
- **Système FabLab** avec réservations et abonnements
- **Inscriptions** pour tous types de formations
- **Événements** avec calendrier et détails
- **Bibliothèque numérique** avec recherche
- **Galerie photos** avec gestion admin
- **Dashboard admin** avec statistiques

---

## 🏗️ **STRUCTURE BACKEND À CRÉER**

### **1. Structure de Projet FastAPI**
```
crec-backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # Point d'entrée FastAPI
│   ├── config.py               # Configuration (DB, JWT, etc.)
│   ├── database.py             # Connexion Prisma
│   ├── auth/
│   │   ├── __init__.py
│   │   ├── dependencies.py     # Middlewares auth
│   │   ├── jwt.py             # Gestion JWT
│   │   └── permissions.py      # Vérification permissions
│   ├── models/                 # Modèles Pydantic
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── program.py
│   │   ├── fablab.py
│   │   └── ...
│   ├── routes/                 # Endpoints API
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── programs.py
│   │   ├── fablab.py
│   │   ├── admin.py
│   │   └── ...
│   ├── services/               # Logique métier
│   │   ├── __init__.py
│   │   ├── auth_service.py
│   │   ├── program_service.py
│   │   ├── fablab_service.py
│   │   └── ...
│   └── utils/
│       ├── __init__.py
│       ├── email.py
│       ├── file_upload.py
│       └── helpers.py
├── prisma/
│   ├── schema.prisma           # Schéma DB complet (fourni)
│   └── migrations/
├── uploads/                    # Fichiers uploadés
├── tests/
├── requirements.txt
├── .env.example
├── Dockerfile
└── README.md
```

### **2. Installation et Configuration**
```bash
# 1. Création de l'environnement
mkdir crec-backend
cd crec-backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows

# 2. Installation des dépendances
pip install fastapi uvicorn prisma python-multipart
pip install python-jose[cryptography] passlib[bcrypt]
pip install python-dotenv pydantic[email]

# 3. Initialisation Prisma
prisma init

# 4. Configuration base de données
# Copier le schema.prisma fourni
# Configurer DATABASE_URL dans .env
# Exécuter les migrations
prisma generate
prisma db push
```

### **3. Variables d'Environnement**
```env
# .env
DATABASE_URL="postgresql://user:password@localhost:5432/crec_db"
SECRET_KEY="your-super-secret-jwt-key-here"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=60
UPLOAD_DIR="./uploads"
MAX_FILE_SIZE=10485760  # 10MB
ALLOWED_FILE_TYPES="jpg,jpeg,png,pdf,mp4,mov"
```

---

## 🚀 **ÉTAPES DE DÉVELOPPEMENT PRIORITAIRES**

### **Phase 1 : Base (1-2 semaines)**
```python
# 1. Configuration FastAPI de base
# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="CREC Education API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Authentification JWT
# auth/jwt.py - Création et vérification tokens

# 3. Modèles Pydantic de base
# models/user.py, models/auth.py

# 4. Premiers endpoints
# routes/auth.py - login, logout, me
# routes/health.py - santé API
```

**Endpoints Phase 1 :**
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`
- `GET /api/health`

### **Phase 2 : CRUD Programmes (1-2 semaines)**
```python
# 1. Modèles programmes universitaires
# models/program.py

# 2. Services métier
# services/program_service.py

# 3. Endpoints programmes
# routes/programs.py

# 4. Protection admin
# auth/dependencies.py - require_admin()
```

**Endpoints Phase 2 :**
- `GET /api/programs` (public)
- `POST /api/programs` (admin)
- `PUT /api/programs/{id}` (admin)
- `DELETE /api/programs/{id}` (admin)
- `POST /api/applications/university` (public)
- `GET /api/applications/university` (admin)

### **Phase 3 : FabLab Complet (2-3 semaines)**
```python
# 1. Modèles FabLab
# models/fablab.py - machines, projets, abonnements

# 2. Services FabLab
# services/fablab_service.py

# 3. Endpoints FabLab
# routes/fablab.py

# 4. Système d'abonnements
# services/subscription_service.py
```

**Endpoints Phase 3 :**
- Machines, projets, services, abonnements
- Réservations avec vérification disponibilité
- Validation abonnements
- Rapports d'usage

### **Phase 4 : Upload & Fonctionnalités Avancées (1-2 semaines)**
```python
# 1. Upload de fichiers
# utils/file_upload.py

# 2. Événements et bibliothèque
# routes/events.py, routes/library.py

# 3. Dashboard admin
# routes/admin.py - statistiques

# 4. Notifications email
# utils/email.py
```

### **Phase 5 : Optimisations & Production (1 semaine)**
```python
# 1. Cache Redis
# 2. Logging complet
# 3. Tests automatisés
# 4. Documentation Swagger
# 5. Déploiement
```

---

## 📊 **DONNÉES DE TEST À CRÉER**

### **Utilisateurs Admin**
```python
# À insérer via script d'initialisation
admin_users = [
    {
        "email": "superadmin@crec.bj",
        "password": "hashed_password",
        "firstName": "Super",
        "lastName": "Admin",
        "roles": ["super_admin"]
    },
    {
        "email": "content@crec.bj", 
        "password": "hashed_password",
        "firstName": "Content",
        "lastName": "Admin",
        "roles": ["content_admin"]
    }
]
```

### **Programmes Universitaires**
```python
# Programmes initiaux
programs = [
    {
        "title": "Développement Logiciel",
        "description": "Formation complète en développement...",
        "type": "LICENCE",
        "duree": "3 ans",
        "fraisInscription": 450000,
        "capacite": 30
    },
    # ... autres programmes
]
```

### **Machines FabLab**
```python
# Machines initiales
machines = [
    {
        "name": "Creality Ender 3 V2",
        "code": "FAB-IMP01",
        "type": "Imprimante 3D",
        "hourlyRate": 3000,
        "characteristics": ["Volume 220×220×250mm", "Précision 0.1mm"]
    },
    # ... autres machines
]
```

---

## 🔗 **POINTS D'INTÉGRATION FRONTEND**

### **URLs à Configurer**
```typescript
// Frontend - services/api.ts
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.crec-sj.org'
  : 'http://localhost:8000';

// Headers par défaut
const defaultHeaders = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
};
```

### **Hooks useApi à Connecter**
```typescript
// Déjà prêts côté frontend
export const usePrograms = () => useQuery(['programs'], () => api.get('/programs'));
export const useCreateProgram = () => useMutation(data => api.post('/programs', data));
export const useFablabMachines = () => useQuery(['machines'], () => api.get('/fablab/machines'));
// ... 28 hooks au total
```

---

## 🎯 **OBJECTIFS & TIMELINE**

### **Semaine 1-2 : Fondations**
- ✅ Setup FastAPI + PostgreSQL
- ✅ Authentification JWT fonctionnelle
- ✅ Premiers endpoints de test
- ✅ CORS configuré pour frontend

### **Semaine 3-4 : Programmes Universitaires**
- ✅ CRUD programmes complet
- ✅ Gestion candidatures
- ✅ Upload documents
- ✅ Validation admin

### **Semaine 5-7 : FabLab**
- ✅ Gestion machines et projets
- ✅ Système d'abonnements
- ✅ Réservations en temps réel
- ✅ Rapports d'usage

### **Semaine 8-9 : Complétion**
- ✅ Événements et bibliothèque
- ✅ Dashboard admin complet
- ✅ Upload fichiers robuste
- ✅ Tests et optimisations

### **Semaine 10 : Production**
- ✅ Déploiement serveur
- ✅ Tests d'intégration finale
- ✅ Documentation complète
- ✅ Formation équipe

---

## 📞 **SUPPORT & CONTACT**

### **Documentation Fournie**
1. `ARCHITECTURE_AUTHENTIFICATION_BACKEND.md` - Sécurité complète
2. `DATABASE_SCHEMA_COMPLETE.md` - Schéma Prisma complet
3. `ENDPOINTS_API_SPECIFICATIONS.md` - 85 endpoints documentés
4. `SECURITE_VALIDATION_COMPLETE.md` - Validation sécurité frontend

### **Code Frontend**
- **Hooks useApi** : `/src/hooks/useApi.ts`
- **Services** : `/src/services/apiServices.ts`
- **Types** : `/src/types/index.ts`
- **Routes protégées** : `/src/components/common/ProtectedRoute.tsx`

---

## 🚀 **COMMANDE DE DÉMARRAGE**

```bash
# 1. Frontend (déjà prêt)
cd crec-education-frontend-main
npm run dev  # Port 3000

# 2. Backend (à créer)
cd crec-backend
uvicorn app.main:app --reload --port 8000

# 3. Base de données
# PostgreSQL sur port 5432
# Prisma Studio : npx prisma studio
```

---

**🎯 OBJECTIF FINAL : SITE CREC ÉDUCATION COMPLET ET FONCTIONNEL**

✅ **Frontend** : 100% terminé  
🔄 **Backend** : Prêt à être développé  
🎯 **Livraison** : Dans 10 semaines maximum  

**Bonne chance pour le développement backend ! 🚀**
