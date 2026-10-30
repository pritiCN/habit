import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { common } from '../styles/common'
import { colors } from '../styles/theme'

const OptionRow = ({icon, name, text, isActive, onPress}: {
    icon: string
    name: string
    text: string
    isActive: boolean
    onPress: () => void
}) => {
  return (
    <TouchableOpacity
        activeOpacity={0.8}
        style={[common.optionRow, isActive && common.tileActive]}
        onPress={onPress}
    >
        <Ionicons
            name={icon}
            size={26}
            color={isActive ? colors.primary : colors.text}
        />
        <View style={common.rowMain}>
            <Text style={[common.label, common.rowTitle]}>{name}</Text>
            <Text style={common.subtitle}>{text}</Text>
        </View>
        <View style={[common.radio, isActive && common.radioActive]}>
            {isActive && <View style={common.radioDot} />}
        </View>
    </TouchableOpacity>
  )
}

export default OptionRow
