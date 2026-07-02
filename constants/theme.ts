import { Platform } from 'react-native';

// Belgrade Quest brand boje 
export const BQ = {
  darkGreen: '#074047',
  green: '#1C8585',
  black: '#15292E',
  orange: '#AB6C40',
  grey: '#D9DCD6',
  white: '#FFFFFF',
  whiteMuted: 'rgba(255,255,255,0.6)',
  overlay: 'rgba(7, 64, 71, 0.85)',
};

// Zadržavamo Colors strukturu jer je koriste ThemedView/ThemedText/tabs
const tintColor = '#1C8585';

export const Colors = {
  light: {
    text: BQ.white,
    background: BQ.black,
    tint: tintColor,
    icon: BQ.grey,
    tabIconDefault: BQ.grey,
    tabIconSelected: BQ.green,
  },
  dark: {
    text: BQ.white,
    background: BQ.black,
    tint: tintColor,
    icon: BQ.grey,
    tabIconDefault: BQ.grey,
    tabIconSelected: BQ.green,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
});