import { Icon, icons } from "./iconset";

export type Label = {
    id: string;
    name: string;
    color: string;
    icon: Icon;
}

export const Labels: Label[] = [
    {id: '1', name: 'Health', color: '#0029f6', icon: icons.heart},
    {id: '2', name: 'Fitness', color: '#ea0b5b', icon: icons.sports_gymnastics},
    {id: '3', name: 'Productivity', color: '#e82203', icon: icons.bar_chart},
    {id: '4', name: 'Work', color: '#0029f6', icon: icons.work},
    {id: '5', name: 'Finance', color: '#fc6306', icon: icons.business},
] 