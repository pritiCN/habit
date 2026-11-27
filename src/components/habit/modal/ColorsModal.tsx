import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { common } from '../../../styles/common'
import { ColorsSet } from '../../../constants/colorset'
import { useApp } from '../../../context/appContext'
import { styles } from '../../../styles/form.styles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../../../styles/theme'
import { useHabits } from '../../../context/HabitsContext'

const ColorsModal = () => {
    const {closeModal, modalState, selectedColor, setSelectedColor} = useApp()
    const {currentHabit, updateHabit, setCurrentHabit} = useHabits();
    
    const handleSelect = (colorId: string) => {
        setSelectedColor(colorId)
        if(modalState.prev && currentHabit)
        {
            const updated = {...currentHabit, colorId}
            updateHabit(updated)
            setCurrentHabit(updated)
        }
        closeModal()
    }
    return (
        <>
            <View style={common.buttonRow}>
                <View style={common.rowMain}>
                    <Text style={common.heading} numberOfLines={1}>Choose a Color</Text>
                </View>
                <TouchableOpacity style={common.iconButton} onPress={closeModal}>
                    <Ionicons name="close" size={20} color={colors.text} />
                </TouchableOpacity>
            </View>
            
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
        </>
    )
}

export default ColorsModal