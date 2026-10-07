import AsyncStorage  from "@react-native-async-storage/async-storage";
import { Label } from "../constants/labelset";

const LABEL_KEY = 'habit_label'

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