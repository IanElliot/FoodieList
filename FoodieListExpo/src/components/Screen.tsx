import React from 'react';
import { View, ViewStyle, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

interface ScreenProps {
  children: React.ReactNode;
  style?: ViewStyle;
  safeArea?: boolean;
}

export const Screen: React.FC<ScreenProps> = ({ 
  children, 
  style, 
  safeArea = true 
}) => {
  const { colors } = useTheme();

  const Container = safeArea ? SafeAreaView : View;

  return (
    <>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={colors.background.default} 
      />
      <Container 
        style={[
          styles.container, 
          { backgroundColor: colors.background.default },
          style
        ]}
      >
        {children}
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Screen;
