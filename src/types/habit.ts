export type Habit = {
    id: string;
    name: string;
    colorId: string;
    description?: string;
    icon: string;
    completedDates: string[]
    labelids?: string[]
};
