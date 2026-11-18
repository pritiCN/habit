export type Reminder = {
    status: boolean;
    time: string;
}

export type Frequecny = {
    type: string
    days?: string[]
    dates?: number[]
}

export type HabitType = {
    id: string;
    name: string;
    colorId: string;
    description?: string;
    iconId: string;
    completedDates?: number[]
    labelIds?: string[]
    frequency?: Frequecny
    reminder?: Reminder
    startDate?: number
};
