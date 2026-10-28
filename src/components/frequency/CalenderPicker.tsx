import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { common } from '../../styles/common'
import { colors } from '../../styles/theme'

const CalenderPicker = ({selected, onclose, onSelect}: {
    selected?: string
    onclose: ()=> void
    onSelect: (date: string) => void
}) => {
  return (
    <View style={[common.sheetOverlay, common.sheetStacked]}>
        <View style={[common.panel, common.sheet]}>
            <View style={common.sheetHandle} />

            <View style={[common.buttonRow, common.section]}>
                <View style={common.rowMain}>
                    <Text style={[common.heading, common.rowTitle]}>Choose a date</Text>
                    <Text style={common.subtitle}>Select the date you want to start this habit.</Text>
                </View>
                <TouchableOpacity style={common.iconButton} onPress={onclose}>
                    <Ionicons name="close" size={20} color={colors.text} />
                </TouchableOpacity>
            </View>

            <Calendar
                minDate={new Date().toISOString().split('T')[0]}
                onDayPress={(day) => onSelect(day.dateString)}
                markedDates={selected ? { [selected]: { selected: true } } : {}}
                renderArrow={(direction) => (
                    <Ionicons
                        name={direction === 'left' ? 'chevron-back' : 'chevron-forward'}
                        size={20}
                        color={colors.text}
                    />
                )}
                theme={{
                    calendarBackground: colors.surface,
                    monthTextColor: colors.text,
                    textMonthFontWeight: '700',
                    textSectionTitleColor: colors.textMuted,
                    dayTextColor: colors.text,
                    textDisabledColor: colors.border,
                    todayTextColor: colors.primary,
                    selectedDayBackgroundColor: colors.primary,
                    selectedDayTextColor: colors.onPrimary,
                }}
            />
        </View>
    </View>
  )
}

export default CalenderPicker
