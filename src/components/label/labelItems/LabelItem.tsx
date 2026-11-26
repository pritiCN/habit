import React from 'react'
import { LabelType } from '../../../types/label'
import { Text, TouchableOpacity, View } from 'react-native'
import { useApp } from '../../../context/appContext'
import { styles } from '../../../styles/LabelPickerModal.styles'
import { IconComponent } from '../../AppIcon'
import { common } from '../../../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../../../styles/theme'
import { useLabel } from '../../../context/LabelContext'

const LabelItem = ({labelData}: {
    labelData: LabelType
}) => {
    const {getColor, openModal} = useApp()
    const {setCurrentLabel} = useLabel();
    const colorCode = getColor(labelData.colorId)
    return (
        <View
            // 8-digit hex: label color at ~10% opacity for the soft tint
            style={[
                styles.chip,
                { backgroundColor: `${colorCode}1A` },
                // isSelected && styles.chipSelected,
            ]}
            // onPress={() => toggleLabel(label.id)}
            // onLongPress={() => SetActionLabel(label.id)}
            >
            <IconComponent  icon={labelData.iconId} color={colorCode}/>
            <Text style={[styles.chipText, { color: getColor(labelData.colorId, true) }]}>{labelData.name}</Text>
            {/* {isSelected && (
                <View style={styles.checkBadge}>
                <Ionicons name="checkmark" size={14} color={colors.onPrimary} />
                </View>
            )} */}
            <TouchableOpacity
                style={[common.iconButton, common.iconButtonPlain]}
                onPress={() => {
                    setCurrentLabel(labelData)
                    openModal('EditLabelModal')
                    // setSelectedColor(habitData.colorId ?? ColorsSet[0].id)
                }}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
                <Ionicons name="ellipsis-vertical" size={18} color={colors.textMuted} />
            </TouchableOpacity>
        </View>
    )
}

export default LabelItem