import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../types/navigation'
import { common } from '../styles/common'
import { styles } from '../styles/HomeScreen.styles'
import HabitsItems from '../components/habit/habitItems/HabitsItems'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

const HomeScreen = ({ navigation }: Props) => {  
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
      <HabitsItems />
    </SafeAreaView>
  )
}

export default HomeScreen