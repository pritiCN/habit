import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { common } from '../styles/common'
import { styles } from '../styles/form.styles'
import { IconsSet } from '../constants/iconset'
import { IconComponent } from './AppIcon'
import { useHabits } from '../context/HabitsContext'
import { colors } from '../styles/theme'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useApp } from '../context/appContext'

const COLLAPSED_COUNT = 6

const IconField = () => {
    const {selectedIcon, selectedColor, setSelectedIcon} = useHabits();
    const {getColor, openModal} = useApp()
    const colorCode = getColor(selectedColor || '#000');

    const current = IconsSet.find((i) => i.id === selectedIcon);    
    const otherIcon = IconsSet.filter((i) => i.id !== selectedIcon);
    const ordered = current ? [current, ...otherIcon] : otherIcon

    const renderIcon = (option: typeof IconsSet[number]) => {
        const isSelected = selectedIcon === option.id
        return (
            <TouchableOpacity
                key={option.id}
                style={common.squareFlex}
                onPress={() => setSelectedIcon(option.id)}
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
        <View style={[common.panel, styles.fieldGroup]}>
            <View style={common.fieldHeader}>
                <View style={common.rowIcon}>
                    <MaterialCommunityIcons name="view-grid-plus-outline" size={22} color={colors.text} />
                </View>
                <Text style={common.label}>Choose an Icon</Text>
            </View>
            
            <View style={common.buttonRow}>
                <View style={[common.buttonRow, common.rowMain]}>
                    {ordered.slice(0, COLLAPSED_COUNT).map(renderIcon)}
                </View>
                <TouchableOpacity style={common.badge} 
                    onPress={() => openModal('iconModal')}
                    >
                    <Text style={common.badgeText}>View all</Text>
                    <Ionicons name="chevron-forward" size={14} color={colors.textMuted} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default IconField
