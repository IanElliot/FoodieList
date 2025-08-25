import React from 'react';
import { Text as RNText, TextStyle, TextProps as RNTextProps } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

type TextVariant = 'primary' | 'secondary' | 'inverse' | 'disabled';
type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  size?: TextSize;
  weight?: TextWeight;
  children: React.ReactNode;
}

const sizeMap: Record<TextSize, number> = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
};

const weightMap: Record<TextWeight, TextStyle['fontWeight']> = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

export const Text: React.FC<TextProps> = ({
  variant = 'primary',
  size = 'base',
  weight = 'normal',
  style,
  children,
  ...props
}) => {
  const { colors } = useTheme();

  const getTextColor = (variant: TextVariant): string => {
    switch (variant) {
      case 'primary':
        return colors.text.primary;
      case 'secondary':
        return colors.text.secondary;
      case 'inverse':
        return colors.text.inverse;
      case 'disabled':
        return colors.text.disabled;
      default:
        return colors.text.primary;
    }
  };

  const textStyle: TextStyle = {
    color: getTextColor(variant),
    fontSize: sizeMap[size],
    fontWeight: weightMap[weight],
  };

  return (
    <RNText style={[textStyle, style]} {...props}>
      {children}
    </RNText>
  );
};

export default Text;
