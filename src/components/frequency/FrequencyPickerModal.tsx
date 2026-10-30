import React, { useState } from 'react'
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { common } from '../../styles/common'
import { colors } from '../../styles/theme'
import { FrequencyDaysSet, FrequencyTypeSet } from '../../constants/frequencyTypeSet'
import OptionRow from '../OptionRow'

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

                        {/* <View style={common.section}>
                            <View style={[common.card, common.buttonRow]}>
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
                        </View> */}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

export default FrequencyPickerModal
