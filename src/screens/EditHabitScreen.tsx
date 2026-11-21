import React from 'react'
import { Alert, Platform, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '../components/BackButton'
import { common } from '../styles/common'
import { styles } from '../styles/form.styles'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'
import HabitForm from '../components/HabitForm'
import { useHabits } from '../context/HabitsContext'

type Props = NativeStackScreenProps<RootStackParamList, 'EditHabit'>

const EditHabitScreen = ({ navigation }: Props) => {  
  // const {habitId} = route.params;
  // const {habits, updateHabit, deleteHabit} = useHabits();
  // const habit = habits.find((h) => h.id === habitId)

  // if (!habit) {
  //   return (
  //     <SafeAreaView style={[common.screen, styles.container]}>
  //       <BackButton />
  //       <Text style={common.bodyText}>Habit not found.</Text>
  //     </SafeAreaView>
  //   )
  // }

  // const handleDelete = () => {
  //   if(Platform.OS === 'web') {
  //     if ((globalThis as any).confirm(`Are you sure you want to delete "${habit.name}"?`)) {
  //       deleteHabit(habit.id)
  //       navigation.goBack();
  //     }
  //   } else {
  //     Alert.alert(
  //       'Delete Habit',
  //       `Are you sure you want to delete "${habit.name}"?`,
  //       [
  //         { text: 'Cancel', style: 'cancel'},
  //         {
  //           text: 'Delete',
  //           style: 'destructive',
  //           onPress: () => {
  //             deleteHabit(habit.id)
  //             navigation.goBack();
  //           }
  //         }
  //       ]
  //     )
  //   }
  // }
  
  return (
    <SafeAreaView style={common.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <BackButton />
        <View style={styles.header}>
          <Text style={[common.title, styles.title]}>Edit Habit</Text>
          <Text style={[common.subtitle, styles.subtitle]}>Update or remove this habit.</Text>
        </View>

        <HabitForm
          // initialHabit={habit}
          // onSave={(updated) => {
          //   updateHabit(updated)
          //   navigation.goBack();
          // }}
          // secondaryAction={{ label: 'Delete Habit', onPress: handleDelete }}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default EditHabitScreen