import AsyncStorage  from "@react-native-async-storage/async-storage";
import { LabelType } from "../types/label";

const LABEL_KEY = 'HABIT_LABELS'

export async function saveLabels(labels: LabelType[]): Promise<void> {
    try {
        const json = JSON.stringify(labels);
        await AsyncStorage.setItem(LABEL_KEY, json)        
    } catch (error) {
        console.error('Failed to save labels:', error)
    }
    
}

export async function loadLabels(): Promise<LabelType[] | null> {
    try {
        const json = await AsyncStorage.getItem(LABEL_KEY);

        if(json === null) return null
        return JSON.parse(json);
    } catch (error) {
        console.error('Failed to load labels:', error)
        return null;
    }
}