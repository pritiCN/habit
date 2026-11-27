import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../types/navigation'
import { common } from '../styles/common'
import { styles } from '../styles/HomeScreen.styles'
import { useHabits } from '../context/HabitsContext'
import HabitsItems from '../components/habit/HabitsItems'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

const Home = ({ navigation }: Props) => {  
  const {setCurrentHabit} = useHabits();
  return (
    <SafeAreaView style={common.screen}>      
      <View style={styles.header}>
        <TouchableOpacity
          style={common.button}
          onPress={() => {
            setCurrentHabit(undefined)
            navigation.navigate('HabitForm')
          }}
        >
          <Text style={common.buttonText}>+ Add</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={common.button}
          onPress={() => {
            navigation.navigate('Label')
          }}
        >
          <Text style={common.buttonText}>Label</Text>
        </TouchableOpacity>
      </View>
      <HabitsItems />
    </SafeAreaView>
  )
}

export default Home