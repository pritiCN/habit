import React from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StartOptions } from '../constants/frequencyTypeSet'
import { common } from '../styles/common'
import { colors } from '../styles/theme'
import OptionRow from './OptionRow'

const StartDateModal = ({onclose, selected, onSelect}: {
    onclose: ()=> void
    selected: string
    onSelect: (id:string) => void
}) => {
  const insets = useSafeAreaInsets()
  return (
    <Modal
        animationType="slide"
        transparent={true}
        onRequestClose={onclose}
    >
        <View style={[common.sheetOverlay, { paddingBottom: insets.bottom, paddingTop: insets.top }]}>
            <View style={[common.panel, common.sheet]}>
                <View style={common.sheetHandle} />

                <View style={[common.buttonRow, common.section]}>
                    <View style={common.rowMain}>
                        <Text style={[common.heading, common.rowTitle]}>Start from</Text>
                        <Text style={common.subtitle}>When do you want to begin this habit?</Text>
                    </View>
                    <TouchableOpacity style={common.iconButton} onPress={onclose}>
                        <Ionicons name="close" size={20} color={colors.text} />
                    </TouchableOpacity>
                </View>

                {
                    StartOptions.map((item) => (
                        <OptionRow
                            key={item.id}
                            icon={item.icon}
                            name={item.name}
                            text={item.text}
                            isActive={selected === item.id}
                            onPress={() => onSelect(item.id)}
                        />
                    ))
                }
            </View>
        </View>
    </Modal>
  )
}

export default StartDateModal
