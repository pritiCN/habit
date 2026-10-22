import { FrequencyDays, FrequencyType } from "../types/frequencyType";

export const FrequencyTypeSet: FrequencyType[] = [
    {id: 'daily', name: 'Daily', text: 'Every day', icon: 'calendar-outline'},
    {id: 'weekly', name: 'Weekly', text: 'Selected days', icon: 'calendar-outline'},
    {id: 'custom', name: 'Custom', text: 'Specific pattern', icon: 'calendar-number-outline'},
    {id: 'flexible', name: 'Flexible', text: 'Set a target per week', icon: 'sync-outline'}
]

export const FrequencyDaysSet: FrequencyDays[] = [
    {id: 'mon', short: 'Mon', long: 'Monday'},
    {id: 'tue', short: 'Tue', long: 'Tuesday'},
    {id: 'wed', short: 'Wed', long: 'Wednesday'},
    {id: 'thu', short: 'Thu', long: 'Thursday'},
    {id: 'fri', short: 'Fri', long: 'Friday'},
    {id: 'sat', short: 'Sat', long: 'Saturday'},
    {id: 'sun', short: 'Sun', long: 'Sunday'}
]