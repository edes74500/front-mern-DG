/** @type {import('tailwindcss').Config} */
// Exportation de la configuration Tailwind CSS
export default {
  // Spécifie les fichiers où Tailwind CSS doit rechercher les classes utilisées
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // Étend les styles par défaut de Tailwind CSS
  theme: {
    extend: {
      // Ajout de nouvelles couleurs personnalisées
      colors: {
        // Couleurs spécifiques pour le projet
        "tech-blue": "#007AFF", // Bleu personnalisé
        "tech-purple": "#5856D6", // Violet personnalisé
        "tech-pink": "#FF2D55", // Rose personnalisé
        "tech-green": "#34C759", // Vert personnalisé
        "tech-grey": "#8E8E93", // Gris personnalisé

        // Couleurs dynamiques basées sur les variables CSS
        border: "hsl(var(--border))", // Bordures
        input: "hsl(var(--input))", // Champs de formulaire
        ring: "hsl(var(--ring))", // Anneaux (focus, hover)
        background: "hsl(var(--background))", // Couleur de fond générale
        foreground: "hsl(var(--foreground))", // Couleur de texte par défaut

        // Couleurs primaires
        primary: {
          DEFAULT: "hsl(var(--primary))", // Couleur primaire principale
          foreground: "hsl(var(--primary-foreground))", // Texte sur fond primaire
        },

        // Couleurs secondaires
        secondary: {
          DEFAULT: "hsl(var(--secondary))", // Couleur secondaire principale
          foreground: "hsl(var(--secondary-foreground))", // Texte sur fond secondaire
        },

        // Couleurs destructives (pour les erreurs ou avertissements)
        destructive: {
          DEFAULT: "hsl(var(--destructive))", // Couleur destructrice principale
          foreground: "hsl(var(--destructive-foreground))", // Texte sur fond destructif
        },

        // Couleurs neutres ou atténuées
        muted: {
          DEFAULT: "hsl(var(--muted))", // Couleur neutre principale
          foreground: "hsl(var(--muted-foreground))", // Texte sur fond neutre
        },

        // Couleurs d'accentuation
        accent: {
          DEFAULT: "hsl(var(--accent))", // Couleur d'accent principale
          foreground: "hsl(var(--accent-foreground))", // Texte sur fond d'accent
        },

        // Couleurs pour les popovers (menus ou fenêtres contextuelles)
        popover: {
          DEFAULT: "hsl(var(--popover))", // Couleur de fond des popovers
          foreground: "hsl(var(--popover-foreground))", // Texte sur popover
        },

        // Couleurs pour les cartes ou panneaux
        card: {
          DEFAULT: "hsl(var(--card))", // Couleur de fond des cartes
          foreground: "hsl(var(--card-foreground))", // Texte sur cartes
        },
      },

      // Ajout de nouvelles tailles pour les bordures arrondies
      borderRadius: {
        lg: "var(--radius)", // Bordure arrondie large (personnalisable via une variable CSS)
        md: "calc(var(--radius) - 2px)", // Bordure moyenne
        sm: "calc(var(--radius) - 4px)", // Bordure petite
      },
    },
  },
  // Plugins supplémentaires (aucun n'est activé pour le moment)
  plugins: [],
};
