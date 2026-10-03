export type Habit = {
    id: string;
    name: string;
    colorId: string;
    description?: string;
    icon: string;
    completedDates: string[]
    labelids?: string[]
};

export const Habits: Habit[] = [
    {id: '1', colorId: '1', name: 'Drink water', icon: 'water', completedDates: []},
    {id: '2', colorId: '2', name: 'Read 10 pages', icon: 'book', completedDates: []},
    {id: '3', colorId: '3', name: 'Read 10 pagesss', icon: 'book', completedDates: []}
]