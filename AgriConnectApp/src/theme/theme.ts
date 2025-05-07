import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4CAF50', // Green 500
    accent: '#8BC34A', // Light Green 500
    background: '#F7F7F7',
    surface: '#FFFFFF',
    text: '#212121', // Grey 900
    onSurface: '#212121', // Grey 900
    error: '#F44336', // Red 500
    // Additional custom colors
    warning: '#FF9800', // Orange 500
    info: '#2196F3', // Blue 500
    success: '#4CAF50', // Green 500 (same as primary)
    secondary: '#8BC34A', // Light Green 500 (same as accent)
  },
  fonts: {
    ...DefaultTheme.fonts,
    // Define custom font styles if needed, or adjust existing ones
  },
  typography: {
    // Custom text styles for readability, larger for low-literacy users
    headlineLarge: {
      fontSize: 30,
      fontWeight: 'bold',
    },
    headlineMedium: {
      fontSize: 26,
      fontWeight: 'bold',
    },
    headlineSmall: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    bodyLarge: {
      fontSize: 18,
      lineHeight: 24,
    },
    bodyMedium: {
      fontSize: 16,
      lineHeight: 22,
    },
    bodySmall: {
      fontSize: 14,
      lineHeight: 20,
    },
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
    xLarge: 32,
  },
  // Add other theme properties as needed
};

// Extend the DefaultTheme type to include our custom properties
declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      warning: string;
      info: string;
      success: string;
      secondary: string;
    }
    
    interface Theme {
      typography: {
        headlineLarge: {
          fontSize: number;
          fontWeight: string;
        };
        headlineMedium: {
          fontSize: number;
          fontWeight: string;
        };
        headlineSmall: {
          fontSize: number;
          fontWeight: string;
        };
        bodyLarge: {
          fontSize: number;
          lineHeight: number;
        };
        bodyMedium: {
          fontSize: number;
          lineHeight: number;
        };
        bodySmall: {
          fontSize: number;
          lineHeight: number;
        };
      };
      spacing: {
        small: number;
        medium: number;
        large: number;
        xLarge: number;
      };
    }
  }
}