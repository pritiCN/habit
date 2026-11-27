import React from 'react'
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { ColorsSet } from '../constants/colorset'
import { common } from '../styles/common';
import { styles } from '../styles/form.styles';
import { colors } from '../styles/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useApp } from '../context/appContext';

const COLLAPSED_COUNT = 6

const ColorField = () => {
  const {openModal, selectedColor, setSelectedColor} = useApp()
  const current = ColorsSet.find((c) => c.id === selectedColor);
  const otherColor = ColorsSet.filter((c) => c.id !== selectedColor)
  const ordered = current ? [current, ...otherColor] : ColorsSet
  
  const renderSwatch = (option: typeof ColorsSet[number], sizeStyle: StyleProp<ViewStyle>) => {    
    const isSelected = option.id === selectedColor
    
    return (
      <View
        style={[
          common.iconSquare, 
          sizeStyle,
          {backgroundColor: option.color},
          isSelected && styles.iconSelected
        ]}
      >
        {isSelected && <Ionicons name="checkmark" size={22} color={colors.onPrimary} />}
      </View>
    )
  }

  return (
    <View style={[common.panel, styles.fieldGroup]}>
      <View style={common.fieldHeader}>
        <View style={common.rowIcon}>
          <MaterialCommunityIcons name="palette-outline" size={22} color={colors.text} />
        </View>
        <Text style={common.label}>Choose a Color</Text>
      </View>
      <View style={common.buttonRow}>
        <View style={[common.buttonRow, common.rowMain]}>
          {
            ordered.slice(0, COLLAPSED_COUNT).map((option) => (
              <TouchableOpacity
                key={option.id}
                style={common.squareFlex}
                onPress={() => setSelectedColor(option.id)}
              >
                {renderSwatch(option, common.squareFill)}
              </TouchableOpacity>
            ))
          }
        </View>
        <TouchableOpacity style={common.badge} onPress={() => openModal('colorsModal')}>
          <Text style={common.badgeText}>View all</Text>
          <Ionicons name="chevron-forward" size={14} color={colors.textMuted} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ColorField
