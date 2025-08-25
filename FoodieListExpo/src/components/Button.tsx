import React from 'react';
import { 
  TouchableOpacity, 
  ViewStyle, 
  StyleSheet, 
  TouchableOpacityProps,
  ActivityIndicator 
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Text';

type ButtonVariant = 'primary' | 'accent' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  style,
  children,
  ...props
}) => {
  const { colors } = useTheme();

  const getButtonStyle = (variant: ButtonVariant): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 8,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: colors.primary.default,
          borderColor: colors.primary.default,
        };
      case 'accent':
        return {
          ...baseStyle,
          backgroundColor: colors.accent.default,
          borderColor: colors.accent.default,
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderColor: colors.primary.default,
        };
      default:
        return baseStyle;
    }
  };

  const getSizeStyle = (size: ButtonSize): ViewStyle => {
    switch (size) {
      case 'sm':
        return { paddingHorizontal: 12, paddingVertical: 6, minHeight: 32 };
      case 'md':
        return { paddingHorizontal: 16, paddingVertical: 10, minHeight: 40 };
      case 'lg':
        return { paddingHorizontal: 20, paddingVertical: 14, minHeight: 48 };
      default:
        return { paddingHorizontal: 16, paddingVertical: 10, minHeight: 40 };
    }
  };

  const getTextVariant = (variant: ButtonVariant): 'primary' | 'inverse' => {
    switch (variant) {
      case 'primary':
        return 'inverse';
      case 'accent':
        return 'primary';
      case 'ghost':
        return 'primary';
      default:
        return 'primary';
    }
  };

  const getTextColor = (variant: ButtonVariant): string => {
    switch (variant) {
      case 'primary':
        return colors.text.inverse;
      case 'accent':
        return colors.text.primary;
      case 'ghost':
        return colors.primary.default;
      default:
        return colors.text.primary;
    }
  };

  const buttonStyle = [
    getButtonStyle(variant),
    getSizeStyle(size),
    disabled && styles.disabled,
    style,
  ];

  const textColor = getTextColor(variant);
  const textWeight = size === 'lg' ? 'semibold' : 'medium';

  return (
    <TouchableOpacity
      style={buttonStyle}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={textColor} 
          style={styles.loader}
        />
      ) : null}
      <Text 
        weight={textWeight}
        style={[{ color: textColor }, loading && styles.hiddenText]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
  loader: {
    marginRight: 8,
  },
  hiddenText: {
    opacity: 0,
  },
});

export default Button;
