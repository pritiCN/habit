import React, { useState } from 'react'
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { ColorsSet } from '../constants/colorset'
import { common } from '../styles/common';
import { styles } from '../styles/form.styles';
import { useHabits } from '../context/HabitsContext';

const ColorField = ({panalStyle, onSelect, selectedColor}: {
  panalStyle?: StyleProp<ViewStyle>
  onSelect?: (Color: string) => void
  selectedColor?: string
}) => {
  const [expanded, setExpanded] = useState(false);
  const {currentHabit} = useHabits()
  const current = ColorsSet.find((c) => c.id === currentHabit?.colorId);
  const otherColor = ColorsSet.filter((c) => c.id !== currentHabit?.colorId)
  const ordered = current ? [current, ...otherColor] : ColorsSet
  const displayColor = expanded ? ordered : ordered.slice(0, 6);
  
  return (
    <View style={panalStyle}>
      <Text style={[common.label, styles.label]}>Choose a Color</Text>
      <View style={styles.iconRow}>
        {
          displayColor.map((option) => {
            const isSeleted = option.id === selectedColor
            return(
              <TouchableOpacity
                key={option.id}
                onPress={() => onSelect?.(option.id)}
              >
                <View 
                  style={[
                    common.iconSquare,
                    {backgroundColor: option.color},
                    isSeleted && styles.iconSelected
                  ]}></View>
              </TouchableOpacity>
            )
          })
        }
        {
            !expanded &&
            (
                <TouchableOpacity
                    style={[common.iconSquare, styles.moreButton]}
                    onPress={()=>setExpanded(true)}
                >
                    <Text style={styles.moreButtonText}>•••</Text>
                </TouchableOpacity>
            )
        }
      </View>
    </View>
  )
}

export default ColorField