import { StyleSheet } from 'react-native';
import { colors, spacing, radius, typography } from './theme';

export const common = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  panel: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    elevation: 1,
    shadowColor: colors.shadow,
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.onPrimary,
    fontWeight: '600',
  },
  buttonDanger: {
    borderWidth: 1,
    borderColor: colors.danger,
    backgroundColor: 'transparent',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDangerText: {
    color: colors.danger,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  headerTitle: {
    flex: 1, // fill the space between the two sides
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.inputBackground,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  bodyText: {
    ...typography.body,
    color: colors.text,
  },
  subtitle: {
    ...typography.caption,
  },
});
