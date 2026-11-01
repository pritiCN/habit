import React, { useState } from 'react'
import { StyleProp, Text, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native'
import { common } from '../styles/common'
import { styles } from '../styles/form.styles'
import { IconsSet } from '../constants/iconset'
import { IconComponent } from './AppIcon'
import { useHabits } from '../context/HabitsContext'
import { inputStyles } from '../styles/input.styles'
import { colors, spacing } from '../styles/theme'
import Ionicons from 'react-native-vector-icons/Ionicons'

const IconField = ({panalStyle, selectedIcon, onSelect, selectedColor, currentIcon}: {
    panalStyle?: StyleProp<ViewStyle>,
    selectedIcon?: string,
    onSelect?: (Icon: string) => void,
    selectedColor?: string,
    currentIcon?: string
}) => {
    const [expanded, setExpanded] = useState(false);
    const {getColor} = useHabits()
    const colorCode = getColor(selectedColor || '#000');
    const [search, setSearch] = useState('')
    
    const filteredIcon = IconsSet.filter((icon) => {
        return icon.name.toLowerCase().includes(search.trim().toLowerCase())
    })    

    const current = filteredIcon.find((i) => i.id === currentIcon);
    const otherIcon = filteredIcon.filter((i) => i.id !== currentIcon);
    const ordered = current ? [current, ...otherIcon] : otherIcon   
    // Collapsed: first row only, last slot is the "more" button
    const showMore = !expanded && ordered.length > 6
    const displayIcon = showMore ? ordered.slice(0, 5) : ordered
    
    return (
        <View style={panalStyle}>
            <Text style={[common.label, styles.label]}>Choose an Icon</Text>

            <View style={[inputStyles.searchBar, { marginTop: 0, marginBottom: spacing.md }]}>
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
                    displayIcon.map((option) => {
                        const isSelect = selectedIcon === option.id
                        return(
                            <TouchableOpacity
                                key={option.id}
                                style={common.gridSixCell}
                                onPress={() => onSelect?.(option.id)}
                            >
                                <View style={[
                                    common.iconSquare,
                                    common.squareFill,
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

export default IconField