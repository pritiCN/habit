import React, { useMemo, useState } from 'react'
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { common } from '../../styles/common'
import { colors } from '../../styles/theme'
import { FrequencyDaysSet, FrequencyTypeSet } from '../../constants/frequencyTypeSet'
import OptionRow from '../OptionRow'
import { Calendar, DateData } from 'react-native-calendars'
import { Frequecny } from '../../types/habit'

const FrequencyPickerModal = ({onClose, onDone, selectedFrequecny}: {
    onClose: ()=> void
    onDone: (frequecny: Frequecny) => void
    selectedFrequecny?: Frequecny
}) => {    
    const insets = useSafeAreaInsets()
    const [selectedType, setSelectedType] = useState<string>(selectedFrequecny?.type || 'daily')
    const [selectedDays, setSelectedDays] = useState<string[]>(selectedFrequecny?.days || [])
    const [onSelectedDates, setOnSelectedDates] = useState<number[]>(selectedFrequecny?.dates || [])

    const handleDaysSelection = (day: DateData) => {
        setOnSelectedDates((prev) => 
            prev.includes(day.timestamp) 
                ? prev.filter((d) => d !== day.timestamp)
                : [...prev, day.timestamp]
        )
    }

    // Convert the array into the shape <Calendar> expects
    const markedDates = useMemo(
        () =>
            onSelectedDates.reduce<Record<string, { selected: boolean }>>((acc, ms) => {
                const key = new Date(ms).toISOString().split('T')[0]
                acc[key] = { selected: true }
                return acc
            }, {}),
        [onSelectedDates]
    )

    const handleDone = () => {
        if(selectedType === 'weekly') return onDone({type: selectedType, days: selectedDays})
        if(selectedType === 'custom') return onDone({type: selectedType, dates: [...onSelectedDates].sort((a, b) => a - b)})
        onDone({type: selectedType})
    }



    return (
        <Modal
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={[common.sheetOverlay, { paddingBottom: insets.bottom, paddingTop: insets.top }]}>
                <View style={[common.panel, common.sheet]}>
                    <View style={common.sheetHandle} />
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={common.buttonRow}>
                            <TouchableOpacity onPress={onClose}>
                                <Ionicons name="arrow-back" size={22} color={colors.text} />
                            </TouchableOpacity>
                            <Text style={[common.label, common.headerTitle]}>Frequency</Text>
                            <TouchableOpacity onPress={handleDone}>
                                <Text style={[common.label, common.textSuccess]}>Done</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={common.section}>
                            <Text style={[common.heading, common.rowTitle]}>Set Frequency</Text>
                            <Text style={common.subtitle}>How often do you want to do this habit?</Text>
                        </View>

                        <View>
                            {
                                FrequencyTypeSet.map((item) => (
                                    <OptionRow
                                        key={item.id}
                                        icon={item.icon}
                                        name={item.name}
                                        text={item.text}
                                        isActive={selectedType === item.id}
                                        onPress={() => setSelectedType(item.id)}
                                    />
                                ))
                            }
                        </View>
                        {
                            selectedType === 'weekly' && (                                
                                <>
                                    <Text style={[common.heading, common.section]}>Select Days</Text>
                                    <View style={common.circleRow}>
                                        {
                                            FrequencyDaysSet.map((item) => {
                                                const isActive = selectedDays.includes(item.id)
                                                return (
                                                    <TouchableOpacity
                                                        key={item.id}
                                                        activeOpacity={0.8}
                                                        onPress={() => 
                                                            setSelectedDays((prev) => 
                                                                prev.includes(item.id)
                                                                    ? prev.filter((d) => d !== item.id)
                                                                    : [...prev, item.id] 
                                                            )
                                                        }
                                                        style={[common.circle, isActive && common.circleActive]}
                                                    >
                                                        <Text style={[common.label, isActive && common.textOnPrimary]}>{item.short}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </View>
                                </>
                            )
                        }

                        {
                            selectedType === 'custom' && (
                                <Calendar
                                    onDayPress={handleDaysSelection}
                                    minDate={new Date().toISOString().split('T')[0]} 
                                    renderArrow={(direction) => (
                                        <Ionicons
                                            name={direction === 'left' ? 'chevron-back' : 'chevron-forward'}
                                            size={20}
                                            color={colors.text}
                                        />
                                    )}
                                    markedDates={markedDates}
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
                            )
                        }
                        
                        <TouchableOpacity style={common.button} onPress={handleDone}>
                            <Text style={common.buttonText}>Done</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

export default FrequencyPickerModal
