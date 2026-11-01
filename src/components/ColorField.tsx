import React, { useState } from 'react'
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { ColorsSet } from '../constants/colorset'
import { common } from '../styles/common';
import { styles } from '../styles/form.styles';

const ColorField = ({panalStyle, onSelect, selectedColor, currentColor}: {
  panalStyle?: StyleProp<ViewStyle>
  onSelect?: (Color: string) => void
  selectedColor?: string
  currentColor?: string
}) => {
  const [expanded, setExpanded] = useState(false);
  const current = ColorsSet.find((c) => c.id === currentColor);
  const otherColor = ColorsSet.filter((c) => c.id !== currentColor)
  const ordered = current ? [current, ...otherColor] : ColorsSet
  // Collapsed: first row only, last slot is the "more" button
  const showMore = !expanded && ordered.length > 6
  const displayColor = showMore ? ordered.slice(0, 5) : ordered;

  return (
    <View style={panalStyle}>
      <Text style={[common.label, styles.label]}>Choose a Color</Text>
      <View style={common.gridSix}>
        {
          displayColor.map((option) => {
            const isSeleted = option.id === selectedColor
            return(
              <TouchableOpacity
                key={option.id}
                style={common.gridSixCell}
                onPress={() => onSelect?.(option.id)}
              >
                <View
                  style={[
                    common.iconSquare,
                    common.squareFill,
                    {backgroundColor: option.color},
                    isSeleted && styles.iconSelected
                  ]}></View>
              </TouchableOpacity>
            )
          })
        }
        {
            showMore &&
            (
                <TouchableOpacity
                    style={common.gridSixCell}
                    onPress={()=>setExpanded(true)}
                >
                    <View style={[common.iconSquare, common.squareFill, styles.moreButton]}>
                        <Text style={styles.moreButtonText}>•••</Text>
                    </View>
                </TouchableOpacity>
            )
        }
      </View>
    </View>
  )
}

export default ColorField