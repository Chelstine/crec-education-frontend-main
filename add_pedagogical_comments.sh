#!/bin/bash

# Script pour ajouter des commentaires pédagogiques à toutes les pages React du projet CREC
# Ce script automatise l'ajout de commentaires explicatifs pour aider à comprendre le code React

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Début de l'ajout des commentaires pédagogiques...${NC}"

# Fonction pour ajouter des commentaires à un fichier
add_comments_to_file() {
    local file_path="$1"
    local file_name=$(basename "$file_path")
    
    echo -e "${YELLOW}📝 Traitement de: $file_name${NC}"
    
    # Créer une sauvegarde
    cp "$file_path" "$file_path.backup"
    
    # Ajouter des commentaires en haut du fichier si pas déjà fait
    if ! grep -q "IMPORTS REACT ET HOOKS" "$file_path"; then
        # Créer un fichier temporaire avec les commentaires
        cat > "/tmp/comments_header.txt" << 'EOF'
/* ====== COMMENTAIRES PÉDAGOGIQUES ====== */
/*
 * Ce fichier fait partie du projet CREC (Centre de Recherche et d'Education Continue)
 * 
 * OBJECTIF PÉDAGOGIQUE :
 * - Comprendre l'architecture React moderne avec hooks
 * - Apprendre l'organisation des imports et composants
 * - Maîtriser la gestion d'état avec useState/useEffect
 * - Découvrir les patterns de développement React/TypeScript
 * 
 * STRUCTURE DU FICHIER :
 * 1. Imports (React, hooks, composants, services)
 * 2. Types TypeScript (interfaces, types)
 * 3. Composant principal avec logique métier
 * 4. Fonctions utilitaires et handlers
 * 5. Rendu JSX avec structure HTML/React
 */

EOF
        
        # Insérer les commentaires au début du fichier après la première ligne
        sed -i '1r /tmp/comments_header.txt' "$file_path"
        
        echo -e "${GREEN}✅ Commentaires ajoutés à $file_name${NC}"
    else
        echo -e "${YELLOW}⚠️  Commentaires déjà présents dans $file_name${NC}"
    fi
}

# Liste des pages à traiter
pages_to_process=(
    "src/pages/HomePage.tsx"
    "src/pages/ContactPage.tsx"
    "src/pages/DonatePage.tsx"
    "src/pages/LegalPage.tsx"
    "src/pages/NotFoundPage.tsx"
    "src/pages/PrivacyPage.tsx"
    "src/pages/about/AboutPage.tsx"
    "src/pages/about/EquipePage.tsx"
    "src/pages/about/JesuitesPage.tsx"
    "src/pages/about/SaintsPage.tsx"
    "src/pages/about/IgnacePage.tsx"
    "src/pages/formations/FormationsHubPage.tsx"
    "src/pages/formations/OpenFormationsPage.tsx"
    "src/pages/formations/FablabInscriptionPage.tsx"
    "src/pages/news/NewsPage.tsx"
    "src/pages/news/ArticlePage.tsx"
    "src/pages/news/StagesPage.tsx"
    "src/pages/admin/AdminLogin.tsx"
    "src/pages/admin/AdminSettings.tsx"
    "src/pages/admin/events/AteliersManagement.tsx"
    "src/pages/admin/events/ConferencesManagement.tsx"
    "src/pages/admin/events/EvenementsManagement.tsx"
    "src/pages/admin/formations/ISTMRManagement.tsx"
    "src/pages/admin/formations/FormationsOuvertesManagement.tsx"
    "src/pages/admin/formations/FabLabFormationsManagement.tsx"
    "src/pages/admin/inscriptions/InscriptionsFabLab.tsx"
    "src/pages/admin/inscriptions/AbonnementsFabLab.tsx"
    "src/pages/admin/reservations/ReservationsUnified.tsx"
)

# Traiter chaque page
for page in "${pages_to_process[@]}"; do
    if [ -f "$page" ]; then
        add_comments_to_file "$page"
    else
        echo -e "${RED}❌ Fichier non trouvé: $page${NC}"
    fi
done

echo -e "${GREEN}🎉 Commentaires pédagogiques ajoutés avec succès !${NC}"
echo -e "${BLUE}📚 Ces commentaires vous aideront à comprendre :${NC}"
echo -e "   • La structure et l'organisation des composants React"
echo -e "   • L'utilisation des hooks (useState, useEffect, etc.)"
echo -e "   • Les patterns de développement moderne"
echo -e "   • L'intégration TypeScript avec React"
echo -e "   • La gestion d'état et des événements"

# Nettoyer les fichiers temporaires
rm -f /tmp/comments_header.txt

echo -e "${YELLOW}💡 Astuce : Consultez les fichiers .backup si vous voulez restaurer les versions originales${NC}"
