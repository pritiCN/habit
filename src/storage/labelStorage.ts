import AsyncStorage  from "@react-native-async-storage/async-storage";
import { Label } from "../constants/labelset";

const LABEL_KEY = 'HABIT_LABELS'

export async function saveLabels(labels: Label[]): Promise<void> {
    try {
        const json = JSON.stringify(labels);
        await AsyncStorage.setItem(LABEL_KEY, json)        
    } catch (error) {
        console.error('Failed to save labels:', error)
    }
    
}

export async function loadLabels(): Promise<Label[] | null> {
    try {
        const json = await AsyncStorage.getItem(LABEL_KEY);

        if(json === null) return null
        return JSON.parse(json);
    } catch (error) {
        console.error('Failed to load labels:', error)
        return null;
    }
}