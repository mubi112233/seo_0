/**
 * Global Theme Configuration
 * Change colors here and they will update across the entire site
 */

export interface ThemeColors {
  // Main brand colors
  primary: string;
  primaryDark: string;
  primaryLight: string;
  
  // Accent colors
  accent: string;
  accentDark: string;
  accentLight: string;
  
  // Background colors
  background: string;
  card: string;
  
  // Text colors
  foreground: string;
  muted: string;
  
  // Border colors
  border: string;
  
  // Status colors
  destructive: string;
  success: string;
  warning: string;
}

export interface ColorScheme {
  name: string;
  colors: ThemeColors;
}

// Define your color schemes here
export const colorSchemes: Record<string, ColorScheme> = {
  // Blue SEO Agency Theme (Current)
  blue: {
    name: "Blue SEO Agency",
    colors: {
      primary: "220 100% 50%",        // Bright blue
      primaryDark: "220 100% 40%",     // Darker blue
      primaryLight: "220 100% 60%",     // Lighter blue
      
      accent: "220 100% 50%",           // Blue accent
      accentDark: "220 85% 25%",        // Dark blue accent
      accentLight: "220 100% 65%",      // Light blue accent
      
      background: "0 0% 100%",          // White background
      card: "0 0% 100%",               // White cards
      
      foreground: "0 0% 0%",            // Black text
      muted: "220 13% 97%",             // Light muted
      
      border: "220 13% 86%",             // Light borders
      
      destructive: "0 84.2% 60.2%",     // Red for errors
      success: "142 76% 36%",           // Green for success
      warning: "45 93% 58%",             // Orange/yellow for warnings
    }
  },
  
  // Gold Theme (Alternative)
  gold: {
    name: "Gold Professional",
    colors: {
      primary: "45 80% 55%",           // Gold
      primaryDark: "45 80% 45%",        // Darker gold
      primaryLight: "45 80% 65%",       // Lighter gold
      
      accent: "45 90% 65%",             // Light gold accent
      accentDark: "45 70% 45%",          // Dark gold accent
      accentLight: "45 90% 75%",         // Light gold accent
      
      background: "0 0% 100%",          // White background
      card: "0 0% 100%",               // White cards
      
      foreground: "0 0% 0%",            // Black text
      muted: "220 13% 97%",             // Light muted
      
      border: "220 13% 86%",             // Light borders
      
      destructive: "0 84.2% 60.2%",     // Red for errors
      success: "142 76% 36%",           // Green for success
      warning: "45 93% 58%",             // Orange for warnings
    }
  },
  
  // Purple Theme (Alternative)
  purple: {
    name: "Purple Modern",
    colors: {
      primary: "270 100% 60%",           // Bright purple
      primaryDark: "270 100% 50%",       // Darker purple
      primaryLight: "270 100% 70%",      // Lighter purple
      
      accent: "270 100% 65%",           // Purple accent
      accentDark: "270 85% 35%",        // Dark purple accent
      accentLight: "270 100% 75%",      // Light purple accent
      
      background: "0 0% 100%",          // White background
      card: "0 0% 100%",               // White cards
      
      foreground: "0 0% 0%",            // Black text
      muted: "270 13% 97%",             // Light muted
      
      border: "270 13% 86%",             // Light borders
      
      destructive: "0 84.2% 60.2%",     // Red for errors
      success: "142 76% 36%",           // Green for success
      warning: "45 93% 58%",             // Orange for warnings
    }
  },
  
  // Green Theme (Alternative)
  green: {
    name: "Green Fresh",
    colors: {
      primary: "142 76% 36%",            // Green
      primaryDark: "142 76% 26%",         // Darker green
      primaryLight: "142 76% 46%",        // Lighter green
      
      accent: "142 86% 46%",             // Green accent
      accentDark: "142 66% 26%",         // Dark green accent
      accentLight: "142 86% 56%",         // Light green accent
      
      background: "0 0% 100%",          // White background
      card: "0 0% 100%",               // White cards
      
      foreground: "0 0% 0%",            // Black text
      muted: "142 13% 97%",             // Light muted
      
      border: "142 13% 86%",             // Light borders
      
      destructive: "0 84.2% 60.2%",     // Red for errors
      success: "142 76% 36%",           // Green for success
      warning: "45 93% 58%",             // Orange for warnings
    }
  }
};

// Current active theme - CHANGE THIS TO SWITCH THEMES
export const currentTheme = "blue"; // Options: "blue", "gold", "purple", "green"

// Get current theme colors
export const theme = colorSchemes[currentTheme].colors;

// Helper function to get HSL value for CSS variables
export const hsl = (color: string) => `hsl(${color})`;

// Helper function to get CSS variable name
export const cssVar = (name: keyof ThemeColors) => `--${name}`;

// Generate CSS variables for the current theme
export const generateCSSVariables = () => {
  const vars: Record<string, string> = {};
  
  Object.entries(theme).forEach(([key, value]) => {
    vars[`--${key}`] = value;
  });
  
  // Add derived variables
  vars['--primary-foreground'] = theme.background;
  vars['--secondary'] = theme.background;
  vars['--secondary-foreground'] = theme.foreground;
  vars['--muted-foreground'] = theme.muted;
  vars['--accent-foreground'] = theme.background;
  vars['--hover'] = theme.background;
  vars['--hover-foreground'] = theme.foreground;
  vars['--destructive-foreground'] = theme.background;
  vars['--card-foreground'] = theme.foreground;
  vars['--ring'] = theme.primary;
  vars['--input'] = theme.border;
  
  // Add theme-specific variables
  vars['--brand-blue'] = theme.accentDark;
  vars['--gold'] = theme.primary;
  vars['--gold-dark'] = theme.primaryDark;
  vars['--gold-light'] = theme.primaryLight;
  
  // Add gradients
  vars['--gradient-gold'] = `linear-gradient(135deg, ${hsl(theme.primary)} 0%, ${hsl(theme.accentDark)} 100%)`;
  vars['--gradient-dark'] = `linear-gradient(180deg, ${hsl(theme.accentDark)} 15%, ${hsl(theme.accentDark)} 20% 100%)`;
  
  // Add shadows
  vars['--shadow-gold'] = `0 10px 40px -10px ${hsl(theme.primary)} / 0.3`;
  vars['--shadow-gold-lg'] = `0 25px 80px -20px ${hsl(theme.primary)} / 0.4`;
  vars['--shadow-elegant'] = `0 20px 60px -15px ${hsl(theme.accentDark)} / 0.3`;
  vars['--shadow-brutal'] = `8px 8px 0px ${hsl(theme.primary)}`;
  
  return vars;
};

const themeConfig = {
  colorSchemes,
  currentTheme,
  hsl,
  cssVar,
  generateCSSVariables
};

export default themeConfig;
