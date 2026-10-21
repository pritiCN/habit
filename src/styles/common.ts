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
  iconSquare: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
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
  // Full-screen dim layer that centers its child (popups, dialogs)
  backdrop: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  // Width for a centered dialog; combine with common.panel
  dialog: {
    width: '100%',
    maxWidth: 320,
  },
  // One tappable row in a menu or list
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  // Settings-style row: [icon][title/subtitle] ........ [badge][chevron]
  // Combine rowMain with buttonRow so the text side takes the free space
  rowMain: {
    flex: 1,
  },
  // Fixed width so text lines up across rows whatever the icon's width
  rowIcon: {
    width: 28,
    alignItems: 'center',
  },
  rowTitle: {
    marginBottom: 2,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    gap: spacing.xs,
  },
  badgeText: {
    fontSize: 13,
    color: colors.textMuted,
  },
  // Section heading text inside a panel/sheet
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  // Spacing around a section - put on a heading <Text>, or on a <View> wrapping heading + subtitle
  section: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  // Text color helpers - combine with label/bodyText, e.g. [common.label, common.textPrimary]
  textPrimary: {
    color: colors.primary,
  },
  textSuccess: {
    color: colors.success,
  },
  // Bottom sheet modal: sheetOverlay > [panel, sheet] > sheetHandle + content
  sheetOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    margin: spacing.md,
    maxHeight: '90%',
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginBottom: spacing.sm,
  },
});
