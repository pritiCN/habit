import React from 'react'
import { Text, View } from 'react-native'
import { useHabits } from '../../context/HabitsContext'
import HabitItem from './HabitItem';

const HabitsItems = () => {
  const {storedHabits} = useHabits();
  
  return (
    <View>
      {
        storedHabits.map((habit) => {
          return(
            <HabitItem
              key={habit.id}
              habitData={habit}
            />
          )
        })
      }
    </View>
  )
}

export default HabitsItems