import React, { useState } from 'react'
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { common } from '../styles/common'
import { styles } from '../styles/CreateHabitScreen.styles'
import { IconExceptionList, IconsSet } from '../constants/iconset'
import { IconComponent } from './appIcon'
import { useHabits } from '../context/HabitsContext'

const IconFiels = ({panalStyle, selectedIcon, onSelect, selectedColor}: {
    panalStyle?: StyleProp<ViewStyle>,
    selectedIcon?: string,
    onSelect?: (Icon: string) => void,
    selectedColor?: string
}) => {
    const [expanded, setExpanded] = useState(false);
    const newIconset = IconsSet.filter((item) => IconExceptionList.includes(item.id) === false);
    const {getColor} = useHabits()
    const colorCode = getColor(selectedColor || '#000');
    
    const displayIcon = expanded
        ? newIconset
        : newIconset.slice(0, 6)
    
    return (
        <View style={panalStyle}>
            <Text style={[common.label, styles.label]}>Choose an Icon</Text>
            <View style={styles.iconRow}>
                {
                    displayIcon.map((option) => {      
                        const isSelect = selectedIcon === option.id   
                        return(
                            <TouchableOpacity
                                key={option.id}
                                onPress={() => onSelect?.(option.id)}
                            >
                                <View style={[
                                    common.iconCircle,
                                    isSelect && styles.iconSelected,
                                    {backgroundColor: `${colorCode}1A`, borderColor: `${colorCode}4D`}
                                ]}>
                                    <IconComponent 
                                        icon={option.id}
                                        color={colorCode}
                                    />
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
                {
                    !expanded &&
                    (
                        <TouchableOpacity
                            style={[common.iconCircle, styles.moreButton]}
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

export default IconFiels