/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

const brandPrimary = '#1a0d8d';
const brandSecondary = '#00d4ff';
const brandAccent = '#A67B5B';
const brandSurface = '#0b1a45';
const brandSurfaceLight = '#12286b';
const brandSurfaceLighter = '#1a317d';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    primary: brandPrimary,
    secondary: brandSecondary,
    accent: brandAccent,
    surface: brandSurface,
    surfaceLight: brandSurfaceLight,
    surfaceLighter: brandSurfaceLighter,
    textOnPrimary: '#FFF',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primary: '#0c2e6f',
    secondary: brandSecondary,
    accent: brandAccent,
    surface: brandSurface,
    surfaceLight: brandSurfaceLight,
    surfaceLighter: brandSurfaceLighter,
    textOnPrimary: '#FFF',
  },
};
