import React, { useState } from 'react'
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { common } from '../styles/common'
import { styles } from '../styles/CreateHabitScreen.styles'
import { IconsSet } from '../constants/iconset'
import { IconComponent } from './appIcon'

const IconFiels = ({panalStyle, selectedIcon, onSelect}: {
    panalStyle: StyleProp<ViewStyle>,
    selectedIcon: string,
    onSelect: (Icon: string) => void
}) => {
    const [expanded, setExpanded] = useState(false);
    const displayIcon = expanded
        ? IconsSet
        : IconsSet.slice(0, 6)
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
                                onPress={() => onSelect(option.id)}
                            >
                                <View style={[
                                    common.iconCircle,
                                    isSelect && styles.iconSelected
                                ]}>
                                    <IconComponent 
                                        icon={option.id}
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