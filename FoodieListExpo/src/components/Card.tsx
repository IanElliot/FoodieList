import React from 'react';
import { View, ViewStyle, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  elevated?: boolean;
  padding?: number;
}

export const Card: React.FC<CardProps> = ({
  children,
  elevated = true,
  padding = 16,
  style,
  ...props
}) => {
  const { colors } = useTheme();

  const cardStyle: ViewStyle = {
    backgroundColor: colors.background.surface,
    borderColor: colors.border.default,
    borderWidth: 1,
    borderRadius: 12,
    padding,
    ...(elevated && {
      shadowColor: colors.shadow.medium,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 4,
      elevation: 3, // Android shadow
    }),
  };

  return (
    <View style={[cardStyle, style]} {...props}>
      {children}
    </View>
  );
};

export default Card;
