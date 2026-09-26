import { StyleSheet } from 'react-native';
import { spacing, colors } from './theme';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  emoji: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  habitInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  toggleButtonText: {
    fontSize: 14,
    color: colors.textMuted,
  },
  toggleButtonDone: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  toggleButtonTextDone: {
    color: colors.onPrimary,
  },
});
