import React, { useState } from 'react'
import { StyleProp, Text, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native'
import { common } from '../styles/common'
import { styles } from '../styles/form.styles'
import { IconsSet } from '../constants/iconset'
import { IconComponent } from './AppIcon'
import { useHabits } from '../context/HabitsContext'
import { inputStyles } from '../styles/input.styles'
import { colors } from '../styles/theme'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const COLLAPSED_COUNT = 6

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
    // Collapsed: one row of icons + "View all" pill
    const showMore = !expanded && ordered.length > COLLAPSED_COUNT

    const renderIcon = (option: typeof IconsSet[number]) => {
        const isSelected = selectedIcon === option.id
        return (
            <TouchableOpacity
                key={option.id}
                style={showMore ? common.squareFlex : common.gridSixCell}
                onPress={() => onSelect?.(option.id)}
            >
                <View style={[
                    common.iconSquare,
                    common.squareFill,
                    {backgroundColor: `${colorCode}1A`},
                    isSelected && [styles.iconSelected, {borderColor: colorCode}],
                ]}>
                    <IconComponent
                        icon={option.id}
                        color={colorCode}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={panalStyle}>
            <View style={common.fieldHeader}>
                <View style={common.rowIcon}>
                    <MaterialCommunityIcons name="view-grid-plus-outline" size={22} color={colors.text} />
                </View>
                <Text style={common.label}>Choose an Icon</Text>
            </View>

            <View style={[inputStyles.searchBar, inputStyles.searchBarInField]}>
                <Ionicons name="search" size={18} color={colors.textMuted} />
                <TextInput
                    style={inputStyles.searchInput}
                    placeholder='Search icons...'
                    placeholderTextColor={colors.textMuted}
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            {
                showMore ? (
                    <View style={common.buttonRow}>
                        <View style={[common.buttonRow, common.rowMain]}>
                            {ordered.slice(0, COLLAPSED_COUNT).map(renderIcon)}
                        </View>
                        <TouchableOpacity style={common.badge} onPress={() => setExpanded(true)}>
                            <Text style={common.badgeText}>View all</Text>
                            <Ionicons name="chevron-forward" size={14} color={colors.textMuted} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={common.gridSix}>
                        {ordered.map(renderIcon)}
                    </View>
                )
            }
        </View>
    )
}

export default IconField
