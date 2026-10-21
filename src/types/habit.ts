export type Habit = {
    id: string;
    name: string;
    colorId: string;
    description?: string;
    iconId: string;
    completedDates: string[]
    labelIds?: string[]
};
