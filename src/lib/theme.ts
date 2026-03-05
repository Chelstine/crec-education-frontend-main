// Système de thèmes personnalisables pour CREC
// Gestion des couleurs, typographie et préférences utilisateur

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
  destructive: string;
  success: string;
  warning: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  colors: {
    light: ThemeColors;
    dark: ThemeColors;
  };
  typography: {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
  };
  borderRadius: string;
  shadows: boolean;
  animations: boolean;
}

// Thème CREC par défaut
export const defaultTheme: ThemeConfig = {
  id: 'crec-default',
  name: 'CREC Classique',
  description: 'Thème officiel CREC avec les couleurs institutionnelles',
  colors: {
    light: {
      primary: '222 55% 23%', // CREC Dark Blue
      secondary: '39 97% 53%', // CREC Gold
      accent: '39 97% 53%',
      background: '0 0% 100%',
      foreground: '222 81% 16%',
      muted: '0 0% 96%',
      border: '220 13% 91%',
      destructive: '0 84.2% 60.2%',
      success: '142 76% 36%',
      warning: '38 92% 50%',
    },
    dark: {
      primary: '210 40% 98%',
      secondary: '39 97% 53%',
      accent: '39 97% 53%',
      background: '222.2 84% 4.9%',
      foreground: '210 40% 98%',
      muted: '217.2 32.6% 17.5%',
      border: '217.2 32.6% 17.5%',
      destructive: '0 62.8% 30.6%',
      success: '142 76% 36%',
      warning: '38 92% 50%',
    }
  },
  typography: {
    fontFamily: 'Cambria, serif',
    fontSize: '16pt',
    fontWeight: '400',
  },
  borderRadius: '0.5rem',
  shadows: true,
  animations: true,
};

// Thèmes alternatifs
export const modernTheme: ThemeConfig = {
  id: 'crec-modern',
  name: 'CREC Moderne',
  description: 'Version moderne avec des couleurs plus vives',
  colors: {
    light: {
      primary: '221 83% 53%', // Modern Blue
      secondary: '142 76% 36%', // Modern Green
      accent: '262 83% 58%', // Purple accent
      background: '0 0% 100%',
      foreground: '224 71.4% 4.1%',
      muted: '220 14.3% 95.9%',
      border: '220 13% 91%',
      destructive: '0 84.2% 60.2%',
      success: '142 76% 36%',
      warning: '38 92% 50%',
    },
    dark: {
      primary: '217.2 91.2% 59.8%',
      secondary: '142 76% 36%',
      accent: '262 83% 58%',
      background: '224 71.4% 4.1%',
      foreground: '210 20% 98%',
      muted: '215 27.9% 16.9%',
      border: '215 27.9% 16.9%',
      destructive: '0 62.8% 30.6%',
      success: '142 76% 36%',
      warning: '38 92% 50%',
    }
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: '14px',
    fontWeight: '400',
  },
  borderRadius: '0.75rem',
  shadows: true,
  animations: true,
};

export const classicTheme: ThemeConfig = {
  id: 'crec-classic',
  name: 'CREC Classique',
  description: 'Thème traditionnel avec une approche conservatrice',
  colors: {
    light: {
      primary: '210 40% 20%', // Dark Navy
      secondary: '35 77% 49%', // Warm Gold
      accent: '35 77% 49%',
      background: '60 9% 98%',
      foreground: '210 40% 8%',
      muted: '210 40% 96%',
      border: '214.3 31.8% 91.4%',
      destructive: '0 84.2% 60.2%',
      success: '142 76% 36%',
      warning: '38 92% 50%',
    },
    dark: {
      primary: '210 40% 90%',
      secondary: '35 77% 49%',
      accent: '35 77% 49%',
      background: '210 40% 3%',
      foreground: '210 40% 95%',
      muted: '210 40% 10%',
      border: '210 40% 15%',
      destructive: '0 62.8% 30.6%',
      success: '142 76% 36%',
      warning: '38 92% 50%',
    }
  },
  typography: {
    fontFamily: 'Georgia, serif',
    fontSize: '16px',
    fontWeight: '400',
  },
  borderRadius: '0.25rem',
  shadows: false,
  animations: false,
};

// Tous les thèmes disponibles
export const availableThemes: ThemeConfig[] = [
  defaultTheme,
  modernTheme,
  classicTheme,
];

// Gestionnaire de thèmes
export class ThemeManager {
  private currentTheme: ThemeConfig = defaultTheme;
  private isDarkMode: boolean = false;

  constructor() {
    this.loadThemeFromStorage();
    this.applyTheme();
  }

  // Changer de thème
  setTheme(themeId: string) {
    const theme = availableThemes.find(t => t.id === themeId);
    if (theme) {
      this.currentTheme = theme;
      this.saveThemeToStorage();
      this.applyTheme();
    }
  }

  // Basculer entre mode clair et sombre
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.saveThemeToStorage();
    this.applyTheme();
  }

  // Obtenir le thème actuel
  getCurrentTheme(): ThemeConfig {
    return this.currentTheme;
  }

  // Vérifier si on est en mode sombre
  getIsDarkMode(): boolean {
    return this.isDarkMode;
  }

  // Appliquer le thème au DOM
  private applyTheme() {
    const root = document.documentElement;
    const colors = this.isDarkMode ? this.currentTheme.colors.dark : this.currentTheme.colors.light;

    // Appliquer les couleurs CSS
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    // Appliquer la typographie
    root.style.setProperty('--font-family', this.currentTheme.typography.fontFamily);
    root.style.setProperty('--font-size', this.currentTheme.typography.fontSize);
    root.style.setProperty('--font-weight', this.currentTheme.typography.fontWeight);

    // Appliquer le border radius
    root.style.setProperty('--radius', this.currentTheme.borderRadius);

    // Gérer la classe dark
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Appliquer les effets visuels
    this.applyVisualEffects();
  }

  // Appliquer les effets visuels (ombres, animations)
  private applyVisualEffects() {
    const root = document.documentElement;
    
    if (!this.currentTheme.shadows) {
      root.style.setProperty('--disable-shadows', '1');
    } else {
      root.style.removeProperty('--disable-shadows');
    }

    if (!this.currentTheme.animations) {
      root.style.setProperty('--disable-animations', '1');
    } else {
      root.style.removeProperty('--disable-animations');
    }
  }

  // Sauvegarder les préférences
  private saveThemeToStorage() {
    const preferences = {
      themeId: this.currentTheme.id,
      isDarkMode: this.isDarkMode,
    };
    localStorage.setItem('crec-theme-preferences', JSON.stringify(preferences));
  }

  // Charger les préférences
  private loadThemeFromStorage() {
    try {
      const saved = localStorage.getItem('crec-theme-preferences');
      if (saved) {
        const preferences = JSON.parse(saved);
        const theme = availableThemes.find(t => t.id === preferences.themeId);
        if (theme) {
          this.currentTheme = theme;
        }
        this.isDarkMode = preferences.isDarkMode || false;
      }
    } catch (error) {
      console.warn('Erreur lors du chargement des préférences de thème:', error);
    }
  }

  // Créer un thème personnalisé
  createCustomTheme(config: Partial<ThemeConfig>): ThemeConfig {
    return {
      ...defaultTheme,
      ...config,
      id: config.id || `custom-${Date.now()}`,
      colors: {
        light: { ...defaultTheme.colors.light, ...config.colors?.light },
        dark: { ...defaultTheme.colors.dark, ...config.colors?.dark },
      },
      typography: { ...defaultTheme.typography, ...config.typography },
    };
  }

  // Exporter la configuration actuelle
  exportThemeConfig(): string {
    return JSON.stringify({
      theme: this.currentTheme,
      isDarkMode: this.isDarkMode,
    }, null, 2);
  }

  // Importer une configuration
  importThemeConfig(configJson: string): boolean {
    try {
      const config = JSON.parse(configJson);
      if (config.theme && config.theme.id) {
        this.currentTheme = config.theme;
        this.isDarkMode = config.isDarkMode || false;
        this.saveThemeToStorage();
        this.applyTheme();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur lors de l\'importation du thème:', error);
      return false;
    }
  }
}

// Instance globale du gestionnaire de thèmes
export const themeManager = new ThemeManager();

// Hook React pour utiliser le système de thèmes
export const useTheme = () => {
  return {
    currentTheme: themeManager.getCurrentTheme(),
    isDarkMode: themeManager.getIsDarkMode(),
    setTheme: (themeId: string) => themeManager.setTheme(themeId),
    toggleDarkMode: () => themeManager.toggleDarkMode(),
    availableThemes,
    exportConfig: () => themeManager.exportThemeConfig(),
    importConfig: (config: string) => themeManager.importThemeConfig(config),
  };
};