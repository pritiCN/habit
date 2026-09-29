export type IconSet = 'Ionicons' | 'MaterialIcons' | 'FontAwesome5' | 'Feather' | 'SimpleLineIcons'

export type Icon = {
    name: string;
    set: IconSet;
}

export const icons = {
    bar_chart: {name: 'bar-chart', set: 'Ionicons' },
    book: {name: 'book', set: 'Ionicons' },
    brain: {name: 'brain', set: 'FontAwesome5' },
    business: {name: 'business', set: 'Ionicons' },
    cup: {name: 'cup', set: 'SimpleLineIcons' },
    directions_run: {name: 'directions-run', set: 'MaterialIcons' },
    heart:  {name: 'heart', set: 'Ionicons' },
    leaf:  {name: 'leaf', set: 'Ionicons' },
    phonelink_erase: {name: 'phonelink-erase', set: 'MaterialIcons' },
    sports_gymnastics: {name: 'sports-gymnastics', set: 'MaterialIcons' },
    star: {name: 'star', set: 'Ionicons' },
    target: {name: 'target', set: 'Feather' },
    water: {name: 'water', set: 'Ionicons' },
    work: {name: 'work', set: 'MaterialIcons' },
} satisfies Record<string, Icon>;