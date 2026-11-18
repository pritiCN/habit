import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { HabitType } from '../../../types/habit'
import { common } from '../../../styles/common'
import { styles } from '../../../styles/HomeScreen.styles'
import { useApp } from '../../../context/appContext'
import { IconComponent } from '../../AppIcon'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../../../styles/theme'
import { useHabits } from '../../../context/HabitsContext'

const HabitItem = ({habitData}: {
    habitData: HabitType
}) => {
    const {getColor} = useApp();
    const {completeToday, isDoneCurrentHabit} = useHabits()
    const habitColor = getColor(habitData.colorId);
    const isHabitDone = isDoneCurrentHabit(new Date, habitData.completedDates ?? [])
    
    return (
        <TouchableOpacity
            style={[common.card, styles.habitCard, { backgroundColor: `${habitColor}1A`, borderColor: `${habitColor}4D` }]}
        >
            <View style={[common.buttonRow, styles.habitInfo]}>
                <IconComponent icon={habitData.iconId ?? ''} color={habitColor} />
                <Text style={[common.bodyText, { color: habitColor }]}>{habitData.name}</Text>
            </View>
            <View style={common.buttonRow}>
                <TouchableOpacity
                    style={[styles.toggleButton, isHabitDone  && styles.toggleButtonDone ]}
                    onPress={() => completeToday(habitData.id)}
                >
                    <Ionicons name="checkmark" size={16} color={isHabitDone ? colors.onPrimary : colors.textMuted} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[common.iconButton, common.iconButtonPlain]}
                    onPress={() => {}}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                    <Ionicons name="ellipsis-vertical" size={18} color={colors.textMuted} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default HabitItem