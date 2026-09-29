export const colors = {
  background: '#fafafa',
  surface: '#ffffff',
  primary: '#019e6b',
  onPrimary: '#ffffff',
  text: '#1a1a1a',
  textMuted: '#6b7280',
  border: '#e5e7eb',
  inputBackground: '#f3f4f6',
  danger: '#ef4444',
  success: '#22c55e',
  shadow: '#000000',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  pill: 20,
};

export const typography = {
  title: {
    fontSize: 28,
    fontWeight: 'bold' as const,
  },
  body: {
    fontSize: 16,
    fontWeight: '500' as const,
  },
  caption: {
    fontSize: 13,
    color: colors.textMuted,
  },
};
