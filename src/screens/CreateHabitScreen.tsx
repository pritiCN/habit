import React from 'react'
import { Text, View, SafeAreaView } from 'react-native'
import { common } from '../styles/common'
import { styles } from '../styles/CreateHabitScreen.styles'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'
import HabitForm from '../components/HabitForm'
import { useHabits } from '../context/HabitsContext'

type Props = NativeStackScreenProps<RootStackParamList, 'CreateHabit'>;

const CreateHabitScreen = ({navigation}: Props) => {
  const {addHabit} = useHabits();
  return (
    <SafeAreaView style={[common.screen, styles.container]}>
      <View style={styles.header}>
        <Text style={[common.title, styles.title]}>Create New Habit</Text>
        <Text style={[common.subtitle, styles.subtitle]}>Small step. Big changes.</Text>
      </View>

      <HabitForm onSave={(habit) => {
        addHabit(habit)
        navigation.goBack();
      }}  />
    </SafeAreaView>
  )
}

export default CreateHabitScreen