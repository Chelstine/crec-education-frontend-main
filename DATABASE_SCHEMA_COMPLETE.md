# 🗃️ SCHEMA DE BASE DE DONNÉES - CREC EDUCATION

**Date :** 2 juillet 2025  
**SGBD :** PostgreSQL  
**ORM :** Prisma  

---

## 📊 **MODÈLES PRISMA COMPLETS**

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ===== AUTHENTIFICATION & UTILISATEURS =====

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  firstName String?
  lastName  String?
  phone     String?
  avatar    String?
  
  // Statut et type d'utilisateur
  isActive          Boolean  @default(false)  // Inactif par défaut
  isFabLabUser      Boolean  @default(false)  // Utilisateur FabLab (créé après validation abonnement)
  isAdmin           Boolean  @default(false)  // Utilisateur administrateur
  mustChangePassword Boolean @default(false)  // Doit changer le mot de passe à la première connexion
  
  // Métadonnées
  lastLogin DateTime?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations avec les rôles
  userRoles UserRole[]
  
  // Relations avec les inscriptions (SEULEMENT FabLab nécessite un compte)
  fablabSubscriptions    FablabSubscription[]
  
  // Relations avec les réservations (SEULEMENT après validation abonnement)
  fablabReservations FablabReservation[]
  
  // Relations avec les contenus créés
  createdEvents    Event[] @relation("CreatedBy")
  createdProjects  FablabProject[] @relation("CreatedBy")
  createdArticles  LibraryResource[] @relation("CreatedBy")

  @@map("users")
}

model Role {
  id          String @id @default(cuid())
  name        String @unique
  displayName String
  description String?
  isActive    Boolean @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  userRoles UserRole[]
  rolePermissions RolePermission[]

  @@map("roles")
}

model Permission {
  id          String @id @default(cuid())
  name        String @unique
  displayName String
  description String?
  resource    String // ex: "programs", "fablab", "inscriptions"
  action      String // ex: "create", "read", "update", "delete"
  createdAt   DateTime @default(now())

  // Relations
  rolePermissions RolePermission[]

  @@map("permissions")
}

model UserRole {
  id     String @id @default(cuid())
  userId String
  roleId String
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  role Role @relation(fields: [roleId], references: [id], onDelete: Cascade)

  @@unique([userId, roleId])
  @@map("user_roles")
}

model RolePermission {
  id           String @id @default(cuid())
  roleId       String
  permissionId String
  
  role       Role       @relation(fields: [roleId], references: [id], onDelete: Cascade)
  permission Permission @relation(fields: [permissionId], references: [id], onDelete: Cascade)

  @@unique([roleId, permissionId])
  @@map("role_permissions")
}

// ===== SUPER ADMIN PRÉDÉFINI =====

model SuperAdmin {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String   // Mot de passe codé en dur dans l'application
  firstName    String
  lastName     String
  isActive     Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@map("super_admins")
}

// ===== PROGRAMMES UNIVERSITAIRES =====

model UniversityProgram {
  id                String   @id @default(cuid())
  title             String
  description       String
  longDescription   String?
  image             String?
  competences       String[] // Array de compétences
  debouches         String[] // Array de débouchés
  profil            String?
  type              ProgramType
  duree             String
  capacite          Int      @default(30)
  fraisInscription  Int      // En FCFA
  prerequisites     String[] // Prérequis
  statut            ContentStatus @default(ACTIVE)
  
  // Métadonnées
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  applications UniversityApplication[]

  @@map("university_programs")
}

model AcademicYear {
  id                    String   @id @default(cuid())
  year                  String   @unique // ex: "2024-2025"
  inscriptionStartDate  DateTime
  inscriptionEndDate    DateTime
  academicStartDate     DateTime
  academicEndDate       DateTime
  isActive              Boolean  @default(false)
  maxPlacesPerProgram   Int      @default(30)
  
  // Métadonnées
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  applications UniversityApplication[]

  @@map("academic_years")
}

model UniversityApplication {
  id                String   @id @default(cuid())
  
  // Informations personnelles
  firstName         String
  lastName          String
  email             String
  phone             String
  dateOfBirth       DateTime
  placeOfBirth      String
  nationality       String
  address           String
  
  // Informations académiques
  lastDiploma       String
  lastSchool        String
  graduationYear    Int
  averageGrade      Float?
  
  // Informations parents/tuteurs
  parentName        String?
  parentPhone       String?
  parentEmail       String?
  
  // Documents (URLs des fichiers uploadés)
  photoUrl          String?
  cvUrl             String?
  diplomaUrl        String?
  transcriptUrl     String?
  birthCertificateUrl String?
  paymentReceiptUrl String?
  
  // Motivation et divers
  motivation        String
  
  // Statut et métadonnées
  status            ApplicationStatus @default(PENDING)
  submittedAt       DateTime @default(now())
  reviewedAt        DateTime?
  reviewedBy        String?
  rejectionReason   String?
  
  // Relations (PAS de lien avec User - formulaire public)
  programId         String
  program           UniversityProgram @relation(fields: [programId], references: [id])
  academicYearId    String
  academicYear      AcademicYear @relation(fields: [academicYearId], references: [id])

  @@map("university_applications")
}

// ===== FORMATIONS OUVERTES =====

model OpenFormation {
  id               String   @id @default(cuid())
  title            String
  description      String
  longDescription  String?
  image            String?
  duration         String   // "3 mois", "6 semaines", etc.
  price            Int      // En FCFA
  maxParticipants  Int      @default(20)
  startDate        DateTime?
  endDate          DateTime?
  schedule         String?  // "Lundi-Vendredi 9h-12h"
  prerequisites    String?
  syllabus         String[] // Contenu du programme
  instructor       String?
  status           ContentStatus @default(ACTIVE)
  
  // Métadonnées
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  registrations FormationRegistration[]

  @@map("open_formations")
}

model FormationRegistration {
  id                String   @id @default(cuid())
  
  // Informations personnelles
  firstName         String
  lastName          String
  email             String
  phone             String
  profession        String?
  experience        String?
  motivation        String
  
  // Paiement
  paymentMethod     String?
  paymentReference  String?
  paymentReceiptUrl String?
  
  // Statut et métadonnées
  status            ApplicationStatus @default(PENDING)
  submittedAt       DateTime @default(now())
  reviewedAt        DateTime?
  
  // Relations (PAS de lien avec User - formulaire public)
  formationId    String
  formation      OpenFormation @relation(fields: [formationId], references: [id])

  @@map("formation_registrations")
}

// ===== FABLAB =====

model FablabMachine {
  id                   String   @id @default(cuid())
  name                 String
  code                 String   @unique // ex: "FAB-IMP01"
  type                 String   // "Imprimante 3D", "Découpeuse laser", etc.
  description          String
  characteristics      String[] // Caractéristiques principales
  imageUrl             String?
  hourlyRate           Int      // Tarif par heure en FCFA
  maintenanceStatus    String   @default("operational") // "operational", "maintenance", "broken"
  isActive             Boolean  @default(true)
  
  // Métadonnées
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  reservations FablabReservation[]

  @@map("fablab_machines")
}

model FablabProject {
  id           String   @id @default(cuid())
  title        String
  description  String
  category     String   // "Prototypage", "Art numérique", etc.
  difficulty   String   // "Débutant", "Intermédiaire", "Avancé"
  duration     String   // "2 heures", "1 journée", etc.
  instructions String
  materials    String[] // Matériaux nécessaires
  tools        String[] // Outils requis
  tags         String[] // Tags pour recherche
  imageUrl     String?
  videoUrl     String?
  status       ContentStatus @default(ACTIVE)
  
  // Métadonnées
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  createdBy String?
  creator   User? @relation("CreatedBy", fields: [createdBy], references: [id])

  @@map("fablab_projects")
}

model FablabService {
  id           String   @id @default(cuid())
  name         String
  category     String   // "Formation", "Prototypage", "Consultation"
  description  String
  duration     String?  // "2h", "1 journée", etc.
  price        Int      // Prix en FCFA (0 si gratuit)
  requirements String[] // Prérequis
  included     String[] // Ce qui est inclus
  status       ContentStatus @default(ACTIVE)
  
  // Métadonnées
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("fablab_services")
}

model FablabSubscription {
  id               String   @id @default(cuid())
  
  // Informations personnelles
  firstName        String
  lastName         String
  email            String
  phone            String
  profession       String?
  
  // Type d'abonnement avec limites d'heures
  subscriptionType SubscriptionType
  duration         Int      // Durée en mois
  price            Int      // Prix en FCFA
  maxHoursPerMonth Int      // Limite d'heures par mois selon le plan
  
  // Dates
  startDate        DateTime
  endDate          DateTime
  
  // Paiement
  paymentMethod    String
  paymentReference String?
  subscriptionKey  String   @unique // Clé d'accès générée
  
  // Statut
  status           SubscriptionStatus @default(PENDING)
  isActive         Boolean  @default(false)
  
  // Métadonnées
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  userId String?
  user   User? @relation(fields: [userId], references: [id])
  reservations FablabReservation[]
  usageReports FablabUsageReport[]

  @@map("fablab_subscriptions")
}

model FablabReservation {
  id              String   @id @default(cuid())
  
  // Informations de réservation
  startTime       DateTime
  endTime         DateTime
  plannedDuration Int      // Durée prévue en heures
  actualDuration  Int?     // Durée réelle en heures
  
  // Coûts
  hourlyRate      Int      // Tarif horaire au moment de la réservation
  totalCost       Int      // Coût total calculé
  
  // Détails
  purpose         String?  // Objectif de la réservation
  notes           String?
  
  // Statut
  status          ReservationStatus @default(PENDING)
  
  // Métadonnées
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  userId         String?
  user           User? @relation(fields: [userId], references: [id])
  machineId      String
  machine        FablabMachine @relation(fields: [machineId], references: [id])
  subscriptionId String?
  subscription   FablabSubscription? @relation(fields: [subscriptionId], references: [id])

  @@map("fablab_reservations")
}

// ===== SUIVI DE L'USAGE FABLAB =====

model FablabUsageReport {
  id               String   @id @default(cuid())
  subscriptionId   String
  year             Int      // 2025
  month            Int      // 1-12
  hoursUsed        Int      // Heures utilisées ce mois
  sessionsCount    Int      // Nombre de sessions ce mois
  lastReservation  DateTime?
  
  // Métadonnées
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  subscription FablabSubscription @relation(fields: [subscriptionId], references: [id])

  @@unique([subscriptionId, year, month])
  @@map("fablab_usage_reports")
}

// ===== ÉVÉNEMENTS =====

model Event {
  id              String   @id @default(cuid())
  title           String
  description     String
  longDescription String?
  eventType       EventType
  
  // Dates et lieu
  startDate       DateTime
  endDate         DateTime?
  location        String
  address         String?
  
  // Contenu
  image           String?
  gallery         String[] // URLs des images de galerie
  
  // Participants
  maxParticipants Int?
  currentParticipants Int @default(0)
  registrationRequired Boolean @default(false)
  registrationDeadline DateTime?
  
  // Organisateurs/Intervenants
  speakers        Json[] // Array d'objets {name, role, image, bio}
  schedule        Json[] // Array d'objets {time, title, description}
  
  // Publication
  isPublished     Boolean @default(false)
  isFeatured      Boolean @default(false)
  
  // Métadonnées
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  createdBy String?
  creator   User? @relation("CreatedBy", fields: [createdBy], references: [id])

  @@map("events")
}

// ===== BIBLIOTHÈQUE =====

model LibraryResource {
  id              String   @id @default(cuid())
  title           String
  author          String
  description     String
  category        String   // "Philosophie", "Sciences", "Histoire", etc.
  type            ResourceType
  
  // Publication
  publisher       String?
  publicationYear Int?
  isbn            String?
  
  // Fichiers
  coverImage      String?
  pdfUrl          String?
  downloadUrl     String?
  readOnlineUrl   String?
  
  // Disponibilité
  isAvailable     Boolean @default(true)
  isDigital       Boolean @default(false)
  
  // Métadonnées
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  createdBy String?
  creator   User? @relation("CreatedBy", fields: [createdBy], references: [id])

  @@map("library_resources")
}

// ===== GALERIE =====

model GalleryItem {
  id          String   @id @default(cuid())
  title       String
  description String?
  imageUrl    String
  category    String   // "Campus", "Événements", "Projets étudiants", etc.
  isPublished Boolean  @default(true)
  order       Int      @default(0)
  
  // Métadonnées
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("gallery_items")
}

// ===== CONTENU STATIQUE =====

model AboutPage {
  id            String   @id @default(cuid())
  heroTitle     String
  heroSubtitle  String
  heroImageUrl  String?
  mission       String
  vision        String
  values        String[] // Array de valeurs
  history       String
  sections      Json[]   // Sections dynamiques
  
  // Métadonnées
  updatedAt DateTime @updatedAt

  @@map("about_page")
}

model SystemSettings {
  id    String @id @default(cuid())
  key   String @unique
  value String
  type  String // "string", "number", "boolean", "json"
  
  // Métadonnées
  updatedAt DateTime @updatedAt

  @@map("system_settings")
}

// ===== NOTIFICATIONS & LOGS =====

model Notification {
  id        String   @id @default(cuid())
  userId    String?
  title     String
  message   String
  type      NotificationType
  isRead    Boolean  @default(false)
  data      Json?    // Données supplémentaires
  
  // Métadonnées
  createdAt DateTime @default(now())
  
  // Relations
  user User? @relation(fields: [userId], references: [id])

  @@map("notifications")
}

model AuditLog {
  id         String   @id @default(cuid())
  userId     String?
  action     String   // "CREATE", "UPDATE", "DELETE", "LOGIN", etc.
  resource   String   // "User", "Program", "Reservation", etc.
  resourceId String?
  oldData    Json?
  newData    Json?
  ipAddress  String?
  userAgent  String?
  
  // Métadonnées
  createdAt DateTime @default(now())
  
  // Relations
  user User? @relation(fields: [userId], references: [id])

  @@map("audit_logs")
}

// ===== ENUMS =====

enum ProgramType {
  LICENCE
  MASTER
  DOCTORAT
}

enum ContentStatus {
  ACTIVE
  INACTIVE
  DRAFT
}

enum ApplicationStatus {
  PENDING
  UNDER_REVIEW
  APPROVED
  REJECTED
  WAITLISTED
}

enum SubscriptionType {
  MONTHLY      // 20h/mois
  QUARTERLY    // 25h/mois
  YEARLY       // 30h/mois
  STUDENT      // 15h/mois
}

enum SubscriptionStatus {
  PENDING
  APPROVED
  ACTIVE
  EXPIRED
  CANCELLED
  SUSPENDED
}

enum ReservationStatus {
  PENDING
  CONFIRMED
  IN_PROGRESS
  COMPLETED
  CANCELLED
  NO_SHOW
}

enum EventType {
  CONFERENCE
  WORKSHOP
  SEMINAR
  OPEN_DAY
  GRADUATION
  OTHER
}

enum ResourceType {
  BOOK
  ARTICLE
  VIDEO
  AUDIO
  DOCUMENT
  RESEARCH
}

enum NotificationType {
  INFO
  WARNING
  ERROR
  SUCCESS
  REMINDER
}
```

---

## 🔄 **RELATIONS PRINCIPALES**

### **Authentification**
- `User` ←→ `UserRole` ←→ `Role` ←→ `RolePermission` ←→ `Permission`
- `SuperAdmin` (comptes prédéfinis)
- Système RBAC (Role-Based Access Control) complet

### **Inscriptions (SANS COMPTE UTILISATEUR)**
- `UniversityApplication` ← `UniversityProgram` (formulaire public)
- `FormationRegistration` ← `OpenFormation` (formulaire public)

### **FabLab (AVEC COMPTE UTILISATEUR)**
- `FablabSubscription` → création du `User` après validation par admin
- `User` → `FablabReservation` ← `FablabMachine` (accès restreint)
- `User` → `FablabProject` (créateur)

### **Contenu**
- `User` → `Event`, `LibraryResource` (créateur)
- Relations Many-to-Many avec tables de jointure

---

## 📊 **INDICES RECOMMANDÉS**

```sql
-- Indices pour performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_active ON users(is_active);
CREATE INDEX idx_applications_status ON university_applications(status);
CREATE INDEX idx_reservations_dates ON fablab_reservations(start_time, end_time);
CREATE INDEX idx_events_dates ON events(start_date, end_date);
CREATE INDEX idx_subscriptions_status ON fablab_subscriptions(status, is_active);
```

---

## 🔧 **DONNÉES INITIALES**

```typescript
// Données par défaut à insérer (STRUCTURE SEULEMENT - PAS DE MOCK DATA)
const initialRoles = [
  { name: 'super_admin', displayName: 'Super Administrateur' },
  { name: 'content_admin', displayName: 'Administrateur Contenu' },
  { name: 'inscription_admin', displayName: 'Administrateur Inscriptions' },
  { name: 'fablab_admin', displayName: 'Administrateur FabLab' }
];

// Super Admin prédéfini (mot de passe dans .env)
const superAdmin = {
  email: 'admin@crec-education.com',
  passwordHash: 'hash_from_env_variable', // À récupérer de process.env.SUPER_ADMIN_PASSWORD
  firstName: 'Admin',
  lastName: 'Principal'
};

const initialPermissions = [
  // Users (admin seulement)
  { name: 'users.create', resource: 'users', action: 'create' },
  { name: 'users.read', resource: 'users', action: 'read' },
  { name: 'users.update', resource: 'users', action: 'update' },
  { name: 'users.delete', resource: 'users', action: 'delete' },
  
  // Programs (public en lecture, admin en écriture)
  { name: 'programs.create', resource: 'programs', action: 'create' },
  { name: 'programs.update', resource: 'programs', action: 'update' },
  { name: 'programs.delete', resource: 'programs', action: 'delete' },
  
  // Formations
  { name: 'formations.create', resource: 'formations', action: 'create' },
  { name: 'formations.update', resource: 'formations', action: 'update' },
  { name: 'formations.delete', resource: 'formations', action: 'delete' },
  
  // FabLab (utilisateur validé pour réservations)
  { name: 'fablab.reserve', resource: 'fablab', action: 'reserve' },
  { name: 'fablab.manage', resource: 'fablab', action: 'manage' },
  { name: 'fablab.admin', resource: 'fablab', action: 'admin' },
  
  // Content
  { name: 'content.create', resource: 'content', action: 'create' },
  { name: 'content.update', resource: 'content', action: 'update' },
  { name: 'content.delete', resource: 'content', action: 'delete' },
];

// IMPORTANTE: Aucune donnée mockée dans le backend
// Les données de test sont uniquement dans le frontend pour le développement
```

---

**✅ Status : SCHEMA PRÊT POUR PRISMA**  
**🎯 Prochaine étape : Génération de la base de données et création des endpoints FastAPI**
