import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { common } from '../../../styles/common'
import { ColorsSet } from '../../../constants/colorset'
import { useApp } from '../../../context/appContext'
import { styles } from '../../../styles/form.styles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../../../styles/theme'

const ColorsModal = () => {
    const {selectedColor, setSelectedColor, closeModal} = useApp()

  const handleSelect = (colorId: string) => {
    setSelectedColor(colorId)
    closeModal()
  }
  return (
    <View>
        <Text style={common.heading}>Choose a Color</Text>
        
        <View style={common.gridSix}>
            {ColorsSet.map((option) => {
            const isSelected = option.id === selectedColor
            return (
                <TouchableOpacity
                key={option.id}
                style={common.gridSixCell}
                onPress={() => handleSelect(option.id)}
                >
                <View
                    style={[
                    common.iconSquare,
                    common.squareFill,
                    { backgroundColor: option.color },
                    isSelected && styles.iconSelected,
                    ]}
                >
                    {isSelected && <Ionicons name="checkmark" size={22} color={colors.onPrimary} />}
                </View>
                </TouchableOpacity>
            )
            })}
        </View>
    </View>
  )
}

export default ColorsModal