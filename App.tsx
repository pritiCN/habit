import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import CreateHabitScreen from './src/screens/CreateHabitScreen';
import type { RootStackParamList } from './src/types/navigation';
import EditHabitScreen from './src/screens/EditHabitScreen';
import { HabitsProvider } from './src/context/HabitsContext';
import { AppProvider } from './src/context/appContext';
import HabitModals from './src/components/habit/modal/HabitModals';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <HabitsProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} />
              {/* These screens draw their own back arrow (components/BackButton) */}
              <Stack.Screen name='CreateHabit' component={CreateHabitScreen} options={{ headerShown: false }} />
              <Stack.Screen name='EditHabit' component={EditHabitScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
            {/* Inside NavigationContainer so modals can use useNavigation() */}
            <HabitModals />
          </NavigationContainer>
        </HabitsProvider>
      </AppProvider>
    </SafeAreaProvider>
  );
}