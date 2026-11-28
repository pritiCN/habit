import React from 'react'
import { LabelType } from '../../types/label'
import { Text, TouchableOpacity, View } from 'react-native'
import { useApp } from '../../context/appContext'
import { styles } from '../../styles/LabelPickerModal.styles'
import { IconComponent } from '../AppIcon'
import { common } from '../../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../../styles/theme'
import { useLabel } from '../../context/LabelContext'
import { ColorsSet } from '../../constants/colorset'
import { IconsSet } from '../../constants/iconset'

const LabelItem = ({labelData}: {
    labelData: LabelType
}) => {
    const {getColor, openModal, setSelectedColor, setSelectedIcon, modalState, selectedLabel, setSelectedLabel} = useApp()
    const {setCurrentLabel} = useLabel();
    const colorCode = getColor(labelData.colorId)
    
    const toggleSelect = (id: string) => {
        setSelectedLabel(
            selectedLabel.includes(id)
                ? selectedLabel.filter((i) => i !== id)
                : [...selectedLabel, id]
        )
    }
    const isSelected = selectedLabel.includes(labelData.id)
    
    return (
        <TouchableOpacity
            // 8-digit hex: label color at ~10% opacity for the soft tint
            style={[
                styles.chip,
                { backgroundColor: `${colorCode}1A` },
                isSelected && styles.chipSelected,
            ]}
            onPress={() => toggleSelect(labelData.id)}
            // onLongPress={() => SetActionLabel(label.id)}
            >
            <IconComponent  icon={labelData.iconId} color={colorCode}/>
            <Text style={[styles.chipText, { color: getColor(labelData.colorId, true) }]}>{labelData.name}</Text>
            {
                modalState.currentModal === "LabelPickerModal" && isSelected && (
                    <View style={styles.checkBadge}>
                        <Ionicons name="checkmark" size={14} color={colors.onPrimary} />
                    </View>
                )
            }
            {/* {isSelected && (
            )} */}
            {
                modalState.currentModal !== "LabelPickerModal" && (
                    <TouchableOpacity
                        style={[common.iconButton, common.iconButtonPlain]}
                        onPress={() => {
                            setCurrentLabel(labelData)
                            setSelectedColor(labelData.colorId ?? ColorsSet[0].id)
                            setSelectedIcon(labelData.iconId ?? IconsSet[0].id)
                            openModal('EditLabelModal')
                        }}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                        <Ionicons name="ellipsis-vertical" size={18} color={colors.textMuted} />
                    </TouchableOpacity>
                )
            }
        </TouchableOpacity>
    )
}

export default LabelItem