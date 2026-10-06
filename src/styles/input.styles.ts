import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from './theme';

// All text-input related styles live here
export const inputStyles = StyleSheet.create({
  input: {
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.inputBackground,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
    backgroundColor: colors.inputBackground,
  },
  searchInput: {
    flex: 1,
    paddingVertical: spacing.sm,
    fontSize: 16,
    color: colors.text,
  },
});
