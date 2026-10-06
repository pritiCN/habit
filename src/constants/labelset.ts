export type Label = {
    id: string;
    name: string;
    colorId: string;
    icon: string;
}

export const Labels: Label[] = [
    {id: 'Health', name: 'Health', colorId: '6', icon: 'heart'},
    {id: 'Fitness', name: 'Fitness', colorId: '2', icon: 'dumbbell'},
    {id: 'Productivity', name: 'Productivity', colorId: '3', icon: 'bar_chart'},
    {id: 'Personal', name: 'Personal', colorId: '14', icon: 'user'},
    {id: 'Mindfulness', name: 'Mindfulness', colorId: '9', icon: 'leaf'},
    {id: 'Learning', name: 'Learning', colorId: '3', icon: 'graduation_cap'},
    {id: 'Work', name: 'Work', colorId: '6', icon: 'work'},
    {id: 'Finance', name: 'Finance', colorId: '13', icon: 'finance'},
    {id: 'Sleep', name: 'Sleep', colorId: '3', icon: 'moon_sharp'},
    {id: 'SelfCare', name: 'Self Care', colorId: '16', icon: 'flower_tulip'},
    {id: 'Family', name: 'Family', colorId: '3', icon: 'users'},
    {id: 'Important', name: 'Important', colorId: '2', icon: 'label_important'},
    {id: 'MorningRouting', name: 'Morning Routing', colorId: '14', icon: 'sunny'},
    {id: 'EveningRouting', name: 'Evening Routing', colorId: '3', icon: 'moon_sharp'},
    {id: 'Weekend', name: 'Weekend', colorId: '2', icon: 'calendar'},
    {id: 'Travel', name: 'Travel', colorId: '6', icon: 'aircraft'},
    {id: 'Hobby', name: 'Hobby', colorId: '9', icon: 'game_controller'},
] 