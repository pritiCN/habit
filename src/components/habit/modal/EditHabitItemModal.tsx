import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { common } from '../../../styles/common'
import { colors } from '../../../styles/theme'
import { useApp } from '../../../context/appContext'
import { useHabits } from '../../../context/HabitsContext'
import { IconComponent } from '../../AppIcon'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../types/navigation'

const EditHabitItemModal = () => {
  const { closeModal, getColor, openModal } = useApp()
  const { currentHabit } = useHabits()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  if (!currentHabit) return null

  const habitColor = getColor(currentHabit.colorId ?? '')

  return (
    <>
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
      <View style={common.menuGroup}>
        <TouchableOpacity
          style={common.menuItem}
          onPress={() => {
            closeModal()
            openModal('colorsModal')
          }}
        >
          <View style={common.rowIcon}>
            <MaterialCommunityIcons name="palette-outline" size={22} color={colors.text} />
          </View>
          <Text style={common.bodyText}>Color</Text>
        </TouchableOpacity>

        <View style={common.divider} />

        <TouchableOpacity
          style={common.menuItem}
          onPress={() => {
            closeModal()
            openModal('iconModal')
          }}
        >
          <View style={common.rowIcon}>
            <MaterialCommunityIcons name="view-grid-plus-outline" size={22} color={colors.text} />
          </View>
          <Text style={common.bodyText}>Icon</Text>
        </TouchableOpacity>

        <View style={common.divider} />

        <TouchableOpacity
          style={common.menuItem}
          onPress={() => {
            closeModal()
            navigation.navigate('EditHabit')
          }}
        >
          <View style={common.rowIcon}>
            <Ionicons name="create-outline" color={colors.text} size={24} />
          </View>
          <Text style={common.bodyText}>Edit</Text>
        </TouchableOpacity>

        <View style={common.divider} />

        <View style={common.menuItem}>
          <View style={common.rowIcon}>
            <Ionicons name="trash-outline" color={colors.danger} size={24} />
          </View>
          <Text style={[common.bodyText, common.textDanger]}>Delete</Text>
        </View>
      </View>
    </>
  )
}

export default EditHabitItemModal
