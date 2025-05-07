import { MD3Theme, MD3Colors } from 'react-native-paper';

// Augment the react-native-paper module's theme types
declare module 'react-native-paper' {
  interface MD3Colors {
    accent: string;
    text: string;
  }

  interface MD3Theme {
    typography: {
      headlineLarge: {
        fontSize: number;
        fontWeight: 'bold';
      };
      headlineMedium: {
        fontSize: number;
        fontWeight: 'bold';
      };
      headlineSmall: {
        fontSize: number;
        fontWeight: 'bold';
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