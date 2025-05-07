import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return <PaperProvider theme={theme}>{children}</PaperProvider>;
};