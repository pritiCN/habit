import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../types/navigation'
import type { Habit } from '../types/habit'
import { common } from '../styles/common'
import { styles } from '../styles/HomeScreen.styles'
import { getTodayString } from '../utils/date'
import { useHabits } from '../context/HabitsContext'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

function HabitItem({
  habit,
  onPress,
  onToggle
}: {
    habit: Habit;
    onPress: () => void;
    onToggle: () => void;
   }) {
    const today = getTodayString();
    const isDoneToday = habit.completedDates.includes(today)

  return (
    <TouchableOpacity style={common.card} onPress={onPress}>
      <View style={styles.habitInfo}>
        <Text style={styles.emoji}>{habit.emoji}</Text>
        <Text style={common.bodyText}>{habit.name}</Text>
      </View>

      <TouchableOpacity
        style={[styles.toggleButton, isDoneToday && styles.toggleButtonDone]}
        onPress={onToggle}
      >
        <Text style={[styles.toggleButtonText, isDoneToday && styles.toggleButtonTextDone]}>✓</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const HomeScreen = ({ navigation }: Props) => {
  const {habits, toggleToday} = useHabits();  

  return (
    <SafeAreaView style={common.screen}>
      <View style={styles.header}>
        <TouchableOpacity
          style={common.button}
          onPress={() => navigation.navigate('CreateHabit')}
        >
          <Text style={common.buttonText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HabitItem
            habit={item}
            onPress={() =>
              navigation.navigate('EditHabit', {
                habitId: item.id,
              })
            }
            onToggle={() => toggleToday(item.id)}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  )
}

export default HomeScreen