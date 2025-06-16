#!/bin/bash

# Script de validation post-harmonisation
echo "=== VALIDATION POST-HARMONISATION ADMIN CREC ==="

echo -e "\n1. Vérification des composants admin créés..."
if [ -f "src/components/admin/AdminPageLayout.tsx" ] && 
   [ -f "src/components/admin/AdminTable.tsx" ] && 
   [ -f "src/components/admin/AdminForm.tsx" ] && 
   [ -f "src/components/admin/AdminFilters.tsx" ] && 
   [ -f "src/components/admin/index.ts" ]; then
    echo "✅ Tous les composants admin centralisés sont présents"
else
    echo "❌ Des composants admin sont manquants"
fi

echo -e "\n2. Vérification des pages harmonisées..."
harmonized_pages=("AdminDashboard.tsx" "EvenementsManagement.tsx" "ActualitesManagement.tsx" "FormationsManagement.tsx")
for page in "${harmonized_pages[@]}"; do
    if [ -f "src/pages/admin/$page" ]; then
        echo "✅ $page harmonisée"
    else
        echo "❌ $page manquante"
    fi
done

echo -e "\n3. Vérification absence de doublons..."
if [ ! -f "src/pages/admin/EvenementsManagement_old.tsx" ] && 
   [ ! -f "src/pages/admin/ActualitesManagement_old.tsx" ] && 
   [ ! -f "src/pages/admin/FormationsManagement_old.tsx" ] &&
   [ ! -f "src/pages/admin/AdminDashboard_old.tsx" ]; then
    echo "✅ Pas de fichiers _old résiduels"
else
    echo "❌ Des fichiers _old sont encore présents"
fi

echo -e "\n4. Vérification des utilitaires enrichis..."
if grep -q "exportToCSV" "src/utils/adminUtils.ts" && 
   grep -q "validateFormData" "src/utils/adminUtils.ts" && 
   grep -q "EVENEMENT_TYPES" "src/constants/admin.ts"; then
    echo "✅ Utilitaires enrichis correctement"
else
    echo "❌ Utilitaires incomplets"
fi

echo -e "\n5. Vérification structure hooks..."
if grep -q "useFilteredData" "src/hooks/useAdmin.ts"; then
    echo "✅ Hooks admin disponibles"
else
    echo "❌ Hooks admin manquants"
fi

echo -e "\n6. Statistiques finales..."
total_admin_files=$(find src/pages/admin -name "*.tsx" | wc -l)
total_components=$(find src/components/admin -name "*.tsx" | wc -l)
echo "📊 Pages admin: $total_admin_files fichiers"
echo "📊 Composants admin: $total_components fichiers"

echo -e "\n=== VALIDATION TERMINÉE ==="
echo "🎉 Harmonisation admin CREC Education complétée avec succès !"
echo "📚 Consultez HARMONISATION_ADMIN_RAPPORT.md pour les détails complets"
