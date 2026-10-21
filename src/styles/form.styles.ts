import { StyleSheet } from 'react-native';
import { spacing, colors } from './theme';

export const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    paddingBottom: spacing.lg * 2,
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    marginBottom: spacing.xs,
  },
  subtitle: {
    marginBottom: 0,
  },
  fieldGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    marginBottom: spacing.sm,
  },
  iconSection: {
    marginBottom: spacing.lg,
  },
  iconRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  iconSelected: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  moreButton: {
    backgroundColor: colors.inputBackground,
  },
  moreButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textMuted,
  },
  deleteButton: {
    marginTop: spacing.sm,
  },
  primaryInRow: {
    flex: 1,
  },
  charCount: {
    alignSelf: 'flex-end',
    marginTop: spacing.xs,
    fontSize: 12,
    color: colors.textMuted,
  },
});
