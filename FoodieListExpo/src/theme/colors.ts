export const lightTheme = {
  // Background
  background: {
    default: '#FDFBF7', // Warm Off-White
    surface: '#FFFFFF', // Pure White
    elevated: '#FFFFFF', // Pure White for cards/modals
  },
  
  // Border & Divider
  border: {
    default: '#E5E5E5', // Light Gray
    focus: '#1B5E20', // Primary for focused states
  },
  
  // Text
  text: {
    primary: '#1A1A1A', // Almost Black
    secondary: '#666666', // Neutral Gray
    inverse: '#FFFFFF', // White text on dark backgrounds
    disabled: '#A0A0A0', // Lighter gray for disabled states
  },
  
  // Primary (Emerald Green)
  primary: {
    default: '#1B5E20',
    hover: '#174F1B',
    light: '#4CAF50', // Lighter shade for subtle elements
    dark: '#0D2F10', // Darker shade for emphasis
  },
  
  // Accent (Lime Green)
  accent: {
    default: '#AEEA00',
    hover: '#9CD200',
    light: '#C6FF00', // Lighter lime
    dark: '#827717', // Darker lime for text
  },
  
  // Status Colors
  status: {
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
  },
  
  // Shadows
  shadow: {
    light: 'rgba(0, 0, 0, 0.08)',
    medium: 'rgba(0, 0, 0, 0.12)',
    dark: 'rgba(0, 0, 0, 0.16)',
  },
};

export type ThemeColors = typeof lightTheme;
export default lightTheme;
