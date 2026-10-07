import React, { useState } from 'react'
import { StyleProp, Text, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native'
import { common } from '../styles/common'
import { styles } from '../styles/CreateHabitScreen.styles'
import { IconsSet } from '../constants/iconset'
import { IconComponent, iconSet } from './appIcon'
import { useHabits } from '../context/HabitsContext'
import { inputStyles } from '../styles/input.styles'
import { colors, spacing } from '../styles/theme'
import Ionicons from 'react-native-vector-icons/Ionicons'

const IconFiels = ({panalStyle, selectedIcon, onSelect, selectedColor}: {
    panalStyle?: StyleProp<ViewStyle>,
    selectedIcon?: string,
    onSelect?: (Icon: string) => void,
    selectedColor?: string
}) => {
    const [expanded, setExpanded] = useState(false);
    const {getColor} = useHabits()
    const colorCode = getColor(selectedColor || '#000');
    const [search, setSearch] = useState('')
    
    const filteredIcon = IconsSet.filter((icon) => {
        return icon.name.toLowerCase().includes(search.trim().toLowerCase())
    })    

    const displayIcon = expanded
        ? filteredIcon
        : filteredIcon.slice(0, 6)
    
    return (
        <View style={panalStyle}>
            <Text style={[common.label, styles.label]}>Choose an Icon</Text>

            <View style={[inputStyles.searchBar, { marginTop: 0, marginBottom: spacing.md }]}>
              <Ionicons name="search" size={18} color={colors.textMuted} />
              <TextInput
                style={inputStyles.searchInput}
                placeholder='Search labels...'
                placeholderTextColor={colors.textMuted}
                value={search}
                onChangeText={setSearch}
              />
            </View>
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
                                    common.iconSquare,
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
                    !expanded && filteredIcon.length > 6 &&
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

export default IconFiels