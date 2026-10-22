import React, { useState } from 'react'
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { common } from '../../styles/common'
import { colors } from '../../styles/theme'
import { FrequencyDaysSet, FrequencyTypeSet } from '../../constants/frequencyTypeSet'

const FrequencyPickerModal = ({onClose}: {
    onClose: ()=> void
}) => {
    const insets = useSafeAreaInsets()
    const [selectedType, setSelectedType] = useState<string>('daily')
    const [selectedDays, setSelectedDays] = useState<string[]>([])
    const [selectWeedRepeat, setSelectWeekRepeat] = useState<number>(1)
    
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
                            <TouchableOpacity onPress={onClose}>
                                <Text style={[common.label, common.textSuccess]}>Done</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={common.section}>
                            <Text style={[common.heading, common.rowTitle]}>Set Frequency</Text>
                            <Text style={common.subtitle}>How often do you want to do this habit?</Text>
                        </View>

                        <View style={common.grid}>
                            {
                                FrequencyTypeSet.map((item) => {
                                    const isActive = selectedType === item.id
                                    return (
                                        <TouchableOpacity
                                            key={item.id}
                                            activeOpacity={0.8}
                                            onPress={() => setSelectedType(item.id)}
                                            style={[common.gridHalf, common.tile, isActive && common.tileActive]}
                                        >
                                            <Ionicons
                                                name={item.icon}
                                                size={28}
                                                color={isActive ? colors.primary : colors.text}
                                            />
                                            <Text style={common.heading}>{item.name}</Text>
                                            <Text style={[common.subtitle, common.textCenter]}>{item.text}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>

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

                        <View style={[common.buttonRow, common.section]}>
                            <View style={common.rowIcon}>
                                <Ionicons name="repeat-outline" size={22} color={colors.text} />
                            </View>
                            <Text style={[common.bodyText, common.rowMain]}>Repeat every</Text>

                            <TouchableOpacity 
                                activeOpacity={0.8} 
                                style={common.stepperButton}
                                onPress={() => setSelectWeekRepeat(
                                    (selectWeedRepeat === 1) ? selectWeedRepeat : selectWeedRepeat - 1
                                )}
                            >
                                <Ionicons name="remove" size={20} color={colors.text} />
                            </TouchableOpacity>
                            <View style={common.stepperValue}>
                                <Text style={common.label}>{selectWeedRepeat}</Text>
                            </View>
                            <TouchableOpacity 
                                activeOpacity={0.8} 
                                style={common.stepperButton}
                                onPress={() => setSelectWeekRepeat(
                                    (selectWeedRepeat === 4) ? selectWeedRepeat : selectWeedRepeat + 1
                                )}
                            >
                                <Ionicons name="add" size={20} color={colors.text} />
                            </TouchableOpacity>

                            <Text style={common.subtitle}>week</Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

export default FrequencyPickerModal
