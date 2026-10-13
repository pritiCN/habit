import { StyleSheet } from 'react-native';
import { spacing, colors, radius } from './theme';

export const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
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
  iconEmoji: {
    fontSize: 20,
    fontFamily: 'Segoe UI Emoji, Apple Color Emoji, Noto Color Emoji, sans-serif',
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
  labelsTextGroup: {
    flex: 1,
  },
  labelsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    gap: spacing.xs,
  },
  labelsBadgeText: {
    fontSize: 13,
    color: colors.textMuted,
  },
  labelsChevron: {
    fontSize: 25,
    color: colors.textMuted,
  },
});
