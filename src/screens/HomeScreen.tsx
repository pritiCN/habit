import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../types/navigation'
import { common } from '../styles/common'
import { styles } from '../styles/HomeScreen.styles'
import { colors } from '../styles/theme'
import { getTodayString } from '../utils/date'
import { useHabits } from '../context/HabitsContext'
import { Habit } from '../constants/habit'
import { IconComponent } from '../components/appIcon'

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
    <TouchableOpacity
      // 8-digit hex: habit color at ~10% (background) and ~30% (border) opacity
      style={[common.card, styles.habitCard, { backgroundColor: `${habit.color}1A`, borderColor: `${habit.color}4D` }]}
      onPress={onPress}
    >
      <View style={[common.buttonRow, styles.habitInfo]}>
        <IconComponent icon={habit.icon} color={habit.color} />
        <Text style={[common.bodyText, { color: habit.color }]}>{habit.name}</Text>
      </View>

      <TouchableOpacity
        style={[styles.toggleButton, isDoneToday && styles.toggleButtonDone]}
        onPress={onToggle}
      >
        <IconComponent
          icon={'checkmark'}
          size={16}
          color={isDoneToday ? colors.onPrimary : colors.textMuted}
        />
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