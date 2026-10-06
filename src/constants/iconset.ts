import type { iconSet } from '../components/appIcon'

// Derived from the libraries registered in appIcon.tsx, so adding one there updates this type
export type IconLibrary = keyof typeof iconSet

export type Icon = {
    id: string
    name: string;
    set: IconLibrary;
}

export const IconsSet: Icon[] = [
    {id: 'aircraft', name: 'aircraft', set: 'Entypo' },
    {id: 'bar_chart', name: 'bar-chart', set: 'Ionicons' },
    {id: 'book', name: 'book', set: 'Ionicons' },
    {id: 'brain', name: 'brain', set: 'FontAwesome5' },
    {id: 'business', name: 'business', set: 'Ionicons' },
    {id: 'calendar', name: 'calendar', set: 'FontAwesome' },
    {id: 'cup', name: 'cup', set: 'SimpleLineIcons' },
    {id: 'directions_run', name: 'directions-run', set: 'MaterialIcons' },
    {id: 'dumbbell', name: 'dumbbell', set: 'MaterialCommunityIcons' },
    {id: 'finance', name: 'finance', set: 'MaterialCommunityIcons' },
    {id: 'flower_tulip', name: 'flower-tulip', set: 'MaterialCommunityIcons' },
    {id: 'game_controller', name: 'game-controller', set: 'Ionicons' },
    {id: 'graduation_cap', name: 'graduation-cap', set: 'FontAwesome' },
    {id: 'heart', name: 'heart', set: 'Ionicons' },
    {id: 'label_important', name: 'label-important', set: 'MaterialIcons' },
    {id: 'leaf', name: 'leaf', set: 'Ionicons' },
    {id: 'moon_sharp', name: 'moon-sharp', set: 'Ionicons' },
    {id: 'phonelink_erase', name: 'phonelink-erase', set: 'MaterialIcons' },
    {id: 'sports_gymnastics', name: 'sports-gymnastics', set: 'MaterialIcons' },
    {id: 'star', name: 'star', set: 'Ionicons' },
    {id: 'sunny', name: 'sunny', set: 'Ionicons' },
    {id: 'target', name: 'target', set: 'Feather' },
    {id: 'user', name: 'user', set: 'FontAwesome' },
    {id: 'users', name: 'users', set: 'FontAwesome' },
    {id: 'water', name: 'water', set: 'Ionicons' },
    {id: 'work', name: 'work', set: 'MaterialIcons' },
];