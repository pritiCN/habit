import { Icon, icons } from "./iconset";


export type Habit = {
    id: string;
    name: string;
    color: string;
    description?: string;
    icon: Icon;
    completedDates: string[]
    labelids?: string[]
};

export const Habits: Habit[] = [
    {id: '1', color: '#073df7', name: 'Drink water', icon: icons.water, completedDates: []},
    {id: '2', color: '#4f00e9', name: 'Read 10 pages', icon: icons.book, completedDates: []},
    {id: '3', color: '#ad85fc', name: 'Read 10 pagesss', icon: icons.book, completedDates: []}
]