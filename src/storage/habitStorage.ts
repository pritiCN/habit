import AsyncStorage  from "@react-native-async-storage/async-storage";
import { Habit } from "../types/habit";

const HABITS_KEY = 'HABITS'
export async function saveHabits(habits:Habit[]): Promise<void> {
    try {
        const json = JSON.stringify(habits)
        await AsyncStorage.setItem(HABITS_KEY, json)
    } catch (error) {
        console.error('Failed to save habits: ', error)
    }
}

export async function loadHabits(): Promise<Habit[] | null> {
    try {
        const json = await AsyncStorage.getItem(HABITS_KEY);
        if (json == null) return null;

        const parsed: Habit[] = JSON.parse(json)
        return parsed.map((habit) => ({
            ...habit,
            completedDates: habit.completedDates ?? [],
        }))
    } catch (error) {
        console.error('Failed to load habits:', error)
        return null;
    }
}