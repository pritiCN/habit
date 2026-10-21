import React from 'react'
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { common } from '../../styles/common'
import { colors } from '../../styles/theme'

const FrequencyPickerModal = ({onClose}: {
    onClose: ()=> void
}) => {
    const insets = useSafeAreaInsets()

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
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

export default FrequencyPickerModal
