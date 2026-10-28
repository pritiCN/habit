import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StartOptions } from '../../constants/frequencyTypeSet'
import { common } from '../../styles/common'
import { colors } from '../../styles/theme'

const StartForm = ({selected, onclose, onSelect}: {
    selected: string
    onclose: ()=> void
    onSelect: (id: string) => void
}) => {
  return (
    <View style={[common.sheetOverlay, common.sheetStacked]}>
        <View style={[common.panel, common.sheet]}>
            <View style={common.sheetHandle} />

            <View style={[common.buttonRow, common.section]}>
                <Text style={[common.heading, common.rowMain]}>Start from</Text>
                <TouchableOpacity style={common.iconButton} onPress={onclose}>
                    <Ionicons name="close" size={20} color={colors.text} />
                </TouchableOpacity>
            </View>

            {
                StartOptions.map((item) => {
                    const isActive = selected === item.id
                    return(
                        <TouchableOpacity
                            key={item.id}
                            activeOpacity={0.8}
                            style={[common.optionRow, isActive && common.tileActive]}
                            onPress={() => onSelect(item.id)}
                        >
                            <Ionicons
                                name={item.icon}
                                size={26}
                                color={isActive ? colors.primary : colors.text}
                            />
                            <View style={common.rowMain}>
                                <Text style={[common.label, common.rowTitle]}>{item.name}</Text>
                                <Text style={common.subtitle}>{item.text}</Text>
                            </View>
                            <View style={[common.radio, isActive && common.radioActive]}>
                                {isActive && <View style={common.radioDot} />}
                            </View>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    </View>
  )
}

export default StartForm
