import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './src/screens/Home';
import type { RootStackParamList } from './src/types/navigation';
import { HabitsProvider } from './src/context/HabitsContext';
import { AppProvider } from './src/context/appContext';
import HabitModals from './src/components/habit/modal/HabitModals';
import { LabelProvider } from './src/context/LabelContext';
import HabitForm from './src/screens/HabitForm';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <HabitsProvider>
          <LabelProvider>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                {/* These screens draw their own back arrow (components/BackButton) */}
                <Stack.Screen name='HabitForm' component={HabitForm} options={{headerShown: false}} />
              </Stack.Navigator>
              {/* Inside NavigationContainer so modals can use useNavigation() */}
              <HabitModals />
            </NavigationContainer>
          </LabelProvider>
        </HabitsProvider>
      </AppProvider>
    </SafeAreaProvider>
  );
}