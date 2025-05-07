import * as React from 'react';
import { Button as PaperButton, ActivityIndicator } from 'react-native-paper';
import { StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../../theme/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'error';
export type ButtonMode = 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';

export interface ButtonProps {
  /**
   * Button text content
   */
  title: string;
  /**
   * Function to call when button is pressed
   */
  onPress: () => void;
  /**
   * Button variant that determines the color
   * @default 'primary'
   */
  variant?: ButtonVariant;
  /**
   * Button appearance mode
   * @default 'contained'
   */
  mode?: ButtonMode;
  /**
   * Whether to show a loading indicator
   * @default false
   */
  loading?: boolean;
  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Icon to display on the left of the button text
   */
  icon?: string;
  /**
   * Additional styles for the button
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Additional styles for the button text
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Whether the button should take the full width
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Size of the button
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
}

/**
 * A customizable button component that wraps react-native-paper's Button
 * with consistent styling and additional features.
 */
const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  mode = 'contained',
  loading = false,
  disabled = false,
  icon,
  style,
  labelStyle,
  fullWidth = false,
  size = 'medium',
}) => {
  // Map variant to theme colors
  const getButtonColor = () => {
    switch (variant) {
      case 'secondary':
        return theme.colors.secondary;
      case 'success':
        return theme.colors.success;
      case 'warning':
        return theme.colors.warning;
      case 'info':
        return theme.colors.info;
      case 'error':
        return theme.colors.error;
      case 'primary':
      default:
        return theme.colors.primary;
    }
  };

  // Get font size based on button size
  const getFontSize = () => {
    switch (size) {
      case 'small':
        return theme.typography.bodySmall.fontSize;
      case 'large':
        return theme.typography.bodyLarge.fontSize;
      case 'medium':
      default:
        return theme.typography.bodyMedium.fontSize;
    }
  };

  // Get padding based on button size
  const getPadding = () => {
    switch (size) {
      case 'small':
        return theme.spacing.small;
      case 'large':
        return theme.spacing.large;
      case 'medium':
      default:
        return theme.spacing.medium;
    }
  };

  return (
    <PaperButton
      mode={mode}
      onPress={onPress}
      buttonColor={getButtonColor()}
      textColor="white"
      labelStyle={[
        { fontSize: getFontSize() },
        labelStyle,
      ]}
      style={[
        styles.button,
        { paddingVertical: getPadding() / 2 },
        fullWidth && styles.fullWidth,
        style,
      ]}
      icon={icon}
      disabled={disabled}
      loading={loading}
    >
      {title}
    </PaperButton>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 8,
    borderRadius: 8,
  },
  fullWidth: {
    width: '100%',
  },
});

export default Button;