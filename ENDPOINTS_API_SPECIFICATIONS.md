# 🌐 ENDPOINTS API BACKEND - SPÉCIFICATIONS COMPLÈTES

**Date :** 2 juillet 2025  
**Framework Backend :** FastAPI  
**Base de données :** PostgreSQL + Prisma  

---

## 🔐 **AUTHENTIFICATION & SÉCURITÉ**

### **Authentication Endpoints**
```python
# /api/auth/
POST   /api/auth/login                 # Connexion admin
POST   /api/auth/logout                # Déconnexion
POST   /api/auth/refresh               # Renouvellement token
GET    /api/auth/me                    # Infos utilisateur courant
POST   /api/auth/change-password       # Changement mot de passe
```

**Exemple Login Request/Response :**
```json
// POST /api/auth/login
{
  "email": "admin@crec.bj",
  "password": "securepassword"
}

// Response
{
  "success": true,
  "data": {
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "token_type": "bearer",
    "expires_in": 3600,
    "user": {
      "id": "user123",
      "email": "admin@crec.bj",
      "firstName": "Admin",
      "lastName": "CREC",
      "roles": ["super_admin"],
      "permissions": ["users.create", "programs.read", ...]
    }
  }
}
```

### **User Management (Admin)**
```python
# /api/admin/users/
GET    /api/admin/users                # Liste utilisateurs
POST   /api/admin/users                # Créer utilisateur
GET    /api/admin/users/{id}           # Détails utilisateur
PUT    /api/admin/users/{id}           # Modifier utilisateur  
DELETE /api/admin/users/{id}           # Supprimer utilisateur
PUT    /api/admin/users/{id}/roles     # Modifier rôles
PUT    /api/admin/users/{id}/status    # Activer/Désactiver
```

---

## 📊 **DASHBOARD ADMIN**

```python
# /api/admin/dashboard/
GET    /api/admin/dashboard/stats      # Statistiques générales
GET    /api/admin/dashboard/activities # Activités récentes
GET    /api/admin/dashboard/charts     # Données pour graphiques
```

**Response /api/admin/dashboard/stats :**
```json
{
  "success": true,
  "data": {
    "totalUsers": 1250,
    "totalApplications": 89,
    "pendingApplications": 12,
    "activeSubscriptions": 45,
    "monthlyRevenue": 850000,
    "todayReservations": 8,
    "activePrograms": 6,
    "totalEvents": 15
  }
}
```

---

## 🎓 **PROGRAMMES UNIVERSITAIRES**

### **Programs CRUD**
```python
# /api/programs/
GET    /api/programs                   # Liste programmes
POST   /api/programs                   # Créer programme
GET    /api/programs/{id}              # Détails programme
PUT    /api/programs/{id}              # Modifier programme
DELETE /api/programs/{id}              # Supprimer programme
GET    /api/programs/public            # Liste publique (site)
```

**Program Data Structure :**
```json
{
  "id": "prog123",
  "title": "Développement Logiciel",
  "description": "Formation complète en développement...",
  "longDescription": "Description détaillée...",
  "image": "/uploads/programs/dev-logiciel.jpg",
  "competences": ["Programmation", "Architecture", "Tests"],
  "debouches": ["Développeur", "Architecte", "Tech Lead"],
  "profil": "Passionné par la logique...",
  "type": "LICENCE",
  "duree": "3 ans",
  "capacite": 30,
  "inscrits": 28,
  "fraisInscription": 450000,
  "prerequisites": ["Baccalauréat scientifique"],
  "statut": "ACTIVE",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-07-01T14:20:00Z"
}
```

### **Academic Year Management**
```python
# /api/academic-years/
GET    /api/academic-years             # Liste années académiques
POST   /api/academic-years             # Créer année
PUT    /api/academic-years/{id}        # Modifier année
DELETE /api/academic-years/{id}        # Supprimer année
PUT    /api/academic-years/{id}/activate # Activer année
```

### **University Applications**
```python
# /api/applications/university/
GET    /api/applications/university    # Liste candidatures (admin)
POST   /api/applications/university    # Soumission candidature (public)
GET    /api/applications/university/{id} # Détails candidature
PUT    /api/applications/university/{id}/status # Changer statut
DELETE /api/applications/university/{id} # Supprimer candidature
POST   /api/applications/university/{id}/documents # Upload documents
```

---

## 📚 **FORMATIONS OUVERTES**

### **Open Formations CRUD**
```python
# /api/formations/
GET    /api/formations                 # Liste formations
POST   /api/formations                 # Créer formation
GET    /api/formations/{id}            # Détails formation
PUT    /api/formations/{id}            # Modifier formation
DELETE /api/formations/{id}            # Supprimer formation
GET    /api/formations/public          # Liste publique
```

### **Formation Registrations**
```python
# /api/registrations/formations/
GET    /api/registrations/formations   # Liste inscriptions (admin)
POST   /api/registrations/formations   # Inscription (public)
PUT    /api/registrations/formations/{id}/status # Valider inscription
```

---

## 🔧 **FABLAB COMPLET**

### **FabLab Machines**
```python
# /api/fablab/machines/
GET    /api/fablab/machines            # Liste machines
POST   /api/fablab/machines            # Créer machine
PUT    /api/fablab/machines/{id}       # Modifier machine
DELETE /api/fablab/machines/{id}       # Supprimer machine
GET    /api/fablab/machines/available  # Machines disponibles
PUT    /api/fablab/machines/{id}/maintenance # Maintenance
```

### **FabLab Projects**
```python
# /api/fablab/projects/
GET    /api/fablab/projects            # Liste projets
POST   /api/fablab/projects            # Créer projet
PUT    /api/fablab/projects/{id}       # Modifier projet
DELETE /api/fablab/projects/{id}       # Supprimer projet
GET    /api/fablab/projects/public     # Projets publics
GET    /api/fablab/projects/categories # Catégories
```

### **FabLab Services**
```python
# /api/fablab/services/
GET    /api/fablab/services            # Liste services
POST   /api/fablab/services            # Créer service
PUT    /api/fablab/services/{id}       # Modifier service
DELETE /api/fablab/services/{id}       # Supprimer service
```

### **FabLab Subscriptions**
```python
# /api/fablab/subscriptions/
GET    /api/fablab/subscriptions       # Liste abonnements (admin)
POST   /api/fablab/subscriptions       # Créer abonnement (public)
GET    /api/fablab/subscriptions/{id}  # Détails abonnement
PUT    /api/fablab/subscriptions/{id}/status # Valider abonnement
POST   /api/fablab/subscriptions/verify # Vérifier clé abonnement
GET    /api/fablab/subscriptions/{id}/usage # Rapport d'usage
```

**Subscription Verification :**
```json
// POST /api/fablab/subscriptions/verify
{
  "subscriptionKey": "CREC-FAB-2024-ABC123"
}

// Response
{
  "success": true,
  "data": {
    "verified": true,
    "subscription": {
      "id": "sub123",
      "name": "Marie Kouassi",
      "type": "MONTHLY",
      "status": "ACTIVE",
      "expiresAt": "2024-08-15T23:59:59Z",
      "remainingHours": 18
    }
  }
}
```

### **FabLab Reservations**
```python
# /api/fablab/reservations/
GET    /api/fablab/reservations        # Liste réservations (admin)
POST   /api/fablab/reservations        # Créer réservation (abonné)
GET    /api/fablab/reservations/{id}   # Détails réservation
PUT    /api/fablab/reservations/{id}   # Modifier réservation
DELETE /api/fablab/reservations/{id}   # Annuler réservation
GET    /api/fablab/reservations/user/{userId} # Réservations utilisateur
GET    /api/fablab/reservations/machine/{machineId}/availability # Disponibilité
```

---

## 📅 **ÉVÉNEMENTS**

### **Events CRUD**
```python
# /api/events/
GET    /api/events                     # Liste événements
POST   /api/events                     # Créer événement
GET    /api/events/{id}                # Détails événement
PUT    /api/events/{id}                # Modifier événement
DELETE /api/events/{id}                # Supprimer événement
GET    /api/events/public              # Événements publics
GET    /api/events/upcoming            # Événements à venir
GET    /api/events/featured            # Événements mis en avant
```

---

## 📖 **BIBLIOTHÈQUE**

### **Library Resources**
```python
# /api/library/
GET    /api/library                    # Liste ressources
POST   /api/library                    # Ajouter ressource
GET    /api/library/{id}               # Détails ressource
PUT    /api/library/{id}               # Modifier ressource
DELETE /api/library/{id}               # Supprimer ressource
GET    /api/library/search             # Recherche (public)
GET    /api/library/categories         # Catégories
```

---

## 🖼️ **GALERIE & CONTENU**

### **Gallery Management**
```python
# /api/gallery/
GET    /api/gallery                    # Liste items galerie
POST   /api/gallery                    # Ajouter item
PUT    /api/gallery/{id}               # Modifier item
DELETE /api/gallery/{id}               # Supprimer item
PUT    /api/gallery/reorder            # Réorganiser ordre
```

### **About Page Content**
```python
# /api/content/about/
GET    /api/content/about              # Contenu page À propos
PUT    /api/content/about              # Modifier contenu
```

### **System Settings**
```python
# /api/settings/
GET    /api/settings                   # Paramètres système
PUT    /api/settings                   # Modifier paramètres
GET    /api/settings/{key}             # Paramètre spécifique
PUT    /api/settings/{key}             # Modifier paramètre
```

---

## 📎 **UPLOAD DE FICHIERS**

### **File Upload Endpoints**
```python
# /api/uploads/
POST   /api/uploads/image              # Upload image
POST   /api/uploads/video              # Upload vidéo
POST   /api/uploads/document           # Upload document
POST   /api/uploads/profile-picture    # Photo de profil
DELETE /api/uploads/{filename}         # Supprimer fichier
```

**Upload Response :**
```json
{
  "success": true,
  "data": {
    "filename": "program_123_image.jpg",
    "originalName": "formation-dev.jpg",
    "size": 245760,
    "mimetype": "image/jpeg",
    "url": "/uploads/images/program_123_image.jpg",
    "path": "/var/www/uploads/images/program_123_image.jpg"
  }
}
```

---

## 📧 **CONTACT & NOTIFICATIONS**

### **Contact Forms**
```python
# /api/contact/
POST   /api/contact                    # Formulaire contact (public)
GET    /api/contact/messages           # Messages reçus (admin)
PUT    /api/contact/messages/{id}/read # Marquer comme lu
```

### **Notifications**
```python
# /api/notifications/
GET    /api/notifications              # Notifications utilisateur
PUT    /api/notifications/{id}/read    # Marquer comme lue
POST   /api/notifications/send         # Envoyer notification (admin)
```

---

## 📊 **ANALYTICS & RAPPORTS**

### **Analytics Endpoints**
```python
# /api/analytics/
GET    /api/analytics/overview         # Vue d'ensemble
GET    /api/analytics/applications     # Stats candidatures
GET    /api/analytics/reservations     # Stats réservations
GET    /api/analytics/revenue          # Revenus
GET    /api/analytics/usage            # Utilisation FabLab
```

---

## 🔍 **RECHERCHE & FILTRES**

### **Search Endpoints**
```python
# /api/search/
GET    /api/search/global              # Recherche globale
GET    /api/search/programs            # Recherche programmes
GET    /api/search/events              # Recherche événements
GET    /api/search/library             # Recherche bibliothèque
```

---

## ⚙️ **PARAMÈTRES SYSTÈME**

### **System Management**
```python
# /api/system/
GET    /api/system/health              # État du système
GET    /api/system/logs                # Logs système
POST   /api/system/backup              # Sauvegarde
POST   /api/system/maintenance         # Mode maintenance
```

---

## 🔐 **MIDDLEWARE DE SÉCURITÉ**

### **Authentication Middleware**
```python
# Vérification JWT sur routes protégées
def require_auth():
    # Vérifier token JWT
    # Extraire utilisateur
    # Ajouter au contexte request

def require_admin():
    # Vérifier authentification
    # Vérifier rôle admin
    
def require_permission(permission: str):
    # Vérifier permission spécifique
    
def require_subscription():
    # Vérifier abonnement FabLab valide
```

---

## 📋 **CODES DE STATUT HTTP**

```python
# Success
200 OK                  # Succès
201 Created            # Ressource créée
204 No Content         # Suppression réussie

# Client Errors  
400 Bad Request        # Données invalides
401 Unauthorized       # Non authentifié
403 Forbidden          # Pas d'autorisation
404 Not Found          # Ressource introuvable
409 Conflict           # Conflit (email déjà utilisé)
422 Unprocessable Entity # Erreur validation

# Server Errors
500 Internal Server Error # Erreur serveur
503 Service Unavailable   # Service indisponible
```

---

## 🎯 **FORMAT DE RÉPONSE STANDARDISÉ**

```json
// Succès
{
  "success": true,
  "data": { ... },
  "message": "Opération réussie",
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}

// Erreur
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Données invalides",
    "details": {
      "email": ["Format email invalide"],
      "password": ["Minimum 8 caractères requis"]
    }
  }
}
```

---

**🚀 TOTAL : 85 ENDPOINTS DOCUMENTÉS**  
**✅ PRÊT POUR IMPLÉMENTATION FASTAPI + POSTGRESQL**
