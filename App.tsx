import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import CreateHabitScreen from './src/screens/CreateHabitScreen';
import type { RootStackParamList } from './src/types/navigation';
import EditHabitScreen from './src/screens/EditHabitScreen';
import { HabitsProvider } from './src/context/HabitsContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <HabitsProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name='CreateHabit' component={CreateHabitScreen} options={{ title: '' }} />
            <Stack.Screen name='EditHabit' component={EditHabitScreen} options={{ title: '' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </HabitsProvider>
    </SafeAreaProvider>
  );
}