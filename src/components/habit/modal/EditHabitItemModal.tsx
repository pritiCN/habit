import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { common } from '../../../styles/common'
import { colors } from '../../../styles/theme'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useApp } from '../../../context/appContext'
import { useHabits } from '../../../context/HabitsContext'
import { IconComponent } from '../../AppIcon'

const EditHabitItemModal = () => {
  const { closeModal, getColor } = useApp()
  const { currentHabit } = useHabits()

  if (!currentHabit) return null

  const habitColor = getColor(currentHabit.colorId)

  return (
    <View style={common.buttonRow}>
      <View style={[common.iconSquare, { backgroundColor: `${habitColor}1A` }]}>
        <IconComponent icon={currentHabit.iconId ?? ''} color={habitColor} />
      </View>
      <View style={common.rowMain}>
        <Text style={common.heading} numberOfLines={1}>{currentHabit.name}</Text>
      </View>
      <TouchableOpacity style={common.iconButton} onPress={closeModal}>
        <Ionicons name="close" size={20} color={colors.text} />
      </TouchableOpacity>
    </View>
  )
}

export default EditHabitItemModal
