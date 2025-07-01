#!/bin/bash

echo "=== Vérification des routes et pages admin ==="
echo ""

# Vérifier que toutes les pages admin existent
pages=(
  "AdminLoginPage.tsx"
  "AdminDashboardPage.tsx"
  "a-propos/AdminAboutPage.tsx"
  "inscriptions/AdminInscriptionsISTMPage.tsx"
  "inscriptions/AdminInscriptionsFormationsPage.tsx"
  "inscriptions/AdminInscriptionsFablabPage.tsx"
  "contenus/AdminContenusISTMPage.tsx"
  "contenus/AdminContenusFormationsPage.tsx"
  "contenus/AdminContenusFablabPage.tsx"
  "galerie/AdminGaleriePage.tsx"
  "reservations/AdminReservationsFablabPage.tsx"
  "reservations/AdminMachinesPrixPage.tsx"
  "bibliotheque/AdminBibliotequePage.tsx"
  "parametres/AdminParametresPage.tsx"
  "parametres/AdminPrixDatesPage.tsx"
  "parametres/AdminUtilisateursRolesPage.tsx"
)

echo "Vérification de l'existence des pages:"
for page in "${pages[@]}"; do
  if [ -f "src/pages/admin/$page" ]; then
    echo "✅ $page existe"
  else
    echo "❌ $page MANQUANT"
  fi
done

echo ""
echo "=== Vérification des composants admin ==="

components=(
  "AdminProtectedRoute.tsx"
  "InfoPanel.tsx"
)

for component in "${components[@]}"; do
  if [ -f "src/components/admin/$component" ]; then
    echo "✅ $component existe"
  else
    echo "❌ $component MANQUANT"
  fi
done

echo ""
echo "=== Vérification des layouts ==="

if [ -f "src/layouts/AdminLayout/index.tsx" ]; then
  echo "✅ AdminLayout existe"
else
  echo "❌ AdminLayout MANQUANT"
fi

echo ""
echo "=== Test terminé ==="
