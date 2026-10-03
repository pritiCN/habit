export type IconLibrary = 'Ionicons' | 'MaterialIcons' | 'FontAwesome5' | 'Feather' | 'SimpleLineIcons'

export type Icon = {
    id: string
    name: string;
    set: IconLibrary;
}

export const IconsSet: Icon[] = [
    {id: 'bar_chart', name: 'bar-chart', set: 'Ionicons' },
    {id: 'book',name: 'book', set: 'Ionicons' },
    {id: 'brain',name: 'brain', set: 'FontAwesome5' },
    {id: 'business',name: 'business', set: 'Ionicons' },
    {id: 'checkmark',name: 'checkmark', set: 'Ionicons' },
    {id: 'cup',name: 'cup', set: 'SimpleLineIcons' },
    {id: 'directions_run',name: 'directions-run', set: 'MaterialIcons' },
    {id: 'heart',name: 'heart', set: 'Ionicons' },
    {id: 'leaf',name: 'leaf', set: 'Ionicons' },
    {id: 'phonelink_erase',name: 'phonelink-erase', set: 'MaterialIcons' },
    {id: 'sports_gymnastics',name: 'sports-gymnastics', set: 'MaterialIcons' },
    {id: 'star',name: 'star', set: 'Ionicons' },
    {id: 'target',name: 'target', set: 'Feather' },
    {id: 'water',name: 'water', set: 'Ionicons' },
    {id: 'work',name: 'work', set: 'MaterialIcons' },
];

export const IconExceptionList: string[] =  [
    'checkmark'
];