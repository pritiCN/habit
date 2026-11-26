import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { common } from '../../../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors, spacing } from '../../../styles/theme'
import { useApp } from '../../../context/appContext'
import { inputStyles } from '../../../styles/input.styles'
import { IconsSet } from '../../../constants/iconset'
import { useHabits } from '../../../context/HabitsContext'
import { IconComponent } from '../../AppIcon'
import { styles } from '../../../styles/form.styles'

const IconsModal = () => {
  const {closeModal, getColor, modalState} = useApp();
  const {selectedColor, setSelectedIcon, selectedIcon, currentHabit, setCurrentHabit, updateHabit} = useHabits()
  const colorCode = getColor(selectedColor || '#000');
  const [search, setSearch] = useState('')

  const filteredIcon = IconsSet.filter((icon) => {
    return icon.name.toLowerCase().includes(search.trim().toLowerCase());
  })
  
  const handleSave = (iconId: string) => {
    setSelectedIcon(iconId)
    if(currentHabit && modalState.prev) {
      const updated = {...currentHabit, iconId}
      updateHabit(updated)
      setCurrentHabit(updated)
    }
    closeModal()
  }

  return (
    <>
      <View style={common.buttonRow}>
          <View style={common.rowMain}>
              <Text style={common.heading} numberOfLines={1}>Choose an Icon</Text>
          </View>
          <TouchableOpacity style={common.iconButton} onPress={closeModal}>
              <Ionicons name="close" size={20} color={colors.text} />
          </TouchableOpacity>
      </View>

      <View style={[inputStyles.searchBar, inputStyles.searchBarInField, { marginTop: spacing.md }]}>
          <Ionicons name="search" size={18} color={colors.textMuted} />
          <TextInput
              style={inputStyles.searchInput}
              placeholder='Search icons...'
              placeholderTextColor={colors.textMuted}
              value={search}
              onChangeText={setSearch}
          />
      </View>
      <View style={common.gridSix}>
        {
          filteredIcon.map((icon) => {
            const isSelected = icon.id === selectedIcon
            return(
              <TouchableOpacity
                  key={icon.id}
                  style={common.gridSixCell}
                  onPress={() => handleSave(icon.id)}
              >
                  <View style={[
                      common.iconSquare,
                      common.squareFill,
                      {backgroundColor: `${colorCode}1A`},
                      isSelected && [styles.iconSelected, {borderColor: colorCode}],
                  ]}>
                    <IconComponent
                      icon={icon.id}
                      color={colorCode}
                    />
                  </View>
              </TouchableOpacity>
            )
          })
        }
      </View>
    </>
  )
}

export default IconsModal