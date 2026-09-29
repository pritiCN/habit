import { Icon, icons } from "./iconset";


export type Habit = {
    id: string;
    name: string;
    description?: string;
    icon: Icon;
    completedDates: string[]
    labelids?: string[]
};

export const Habits: Habit[] = [
    {id: '1', name: 'Drink water', icon: icons.water, completedDates: []},
    {id: '2', name: 'Read 10 pages', icon: icons.book, completedDates: []},
    {id: '2', name: 'Read 10 pages', icon: icons.book, completedDates: []}
]