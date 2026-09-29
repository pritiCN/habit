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
  habitInfo: {
    flex: 1,
    gap: spacing.md,
  },
  habitCard: {
    borderWidth: 1,
    elevation: 0,
    shadowOpacity: 0,
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
  toggleButtonDone: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
});
