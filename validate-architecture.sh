#!/bin/bash

# Script de validation pour l'architecture nettoyée
echo "🧹 Validation de l'architecture nettoyée..."

# Vérifier la structure des dossiers
echo "📁 Vérification de la structure des dossiers..."

# Vérifier que les nouveaux fichiers existent
REQUIRED_FILES=(
  "src/constants/admin.ts"
  "src/utils/adminUtils.ts"
  "src/hooks/useAdmin.ts"
  "src/pages/admin/index.ts"
  "src/pages/admin/inscriptions/FabLabMemberships.tsx"
  "CLEAN_ARCHITECTURE.md"
)

for file in "${REQUIRED_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file existe"
  else
    echo "❌ $file manquant"
  fi
done

# Vérifier que les anciens fichiers ont été supprimés
OLD_FILES=(
  "src/pages/admin/inscriptions/FabLabInscriptions.tsx"
)

for file in "${OLD_FILES[@]}"; do
  if [ ! -f "$file" ]; then
    echo "✅ $file supprimé"
  else
    echo "❌ $file existe encore"
  fi
done

# Vérifier les imports TypeScript
echo "🔍 Vérification des types TypeScript..."
npx tsc --noEmit --skipLibCheck

if [ $? -eq 0 ]; then
  echo "✅ Pas d'erreurs TypeScript"
else
  echo "❌ Erreurs TypeScript détectées"
fi

# Vérifier les imports manquants
echo "📦 Vérification des imports..."
npm run build --silent > /dev/null 2>&1

if [ $? -eq 0 ]; then
  echo "✅ Build réussi - pas d'imports manquants"
else
  echo "❌ Erreurs de build détectées"
fi

# Compter les lignes de code par catégorie
echo "📊 Statistiques du code..."
echo "Pages admin: $(find src/pages/admin -name "*.tsx" | wc -l) fichiers"
echo "Hooks: $(find src/hooks -name "*.ts" | wc -l) fichiers"
echo "Types: $(find src/types -name "*.ts" | wc -l) fichiers"
echo "Utilitaires: $(find src/utils -name "*.ts" | wc -l) fichiers"
echo "Constantes: $(find src/constants -name "*.ts" | wc -l) fichiers"

echo "🎉 Validation terminée!"
