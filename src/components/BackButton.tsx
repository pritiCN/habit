import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { common } from '../styles/common'
import { colors } from '../styles/theme'

// Plain "←" that goes back one screen. Use on screens with headerShown: false
const BackButton = () => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity
            style={common.backButton}
            hitSlop={12}
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
        >
            <Ionicons name="arrow-back" size={26} color={colors.text} />
        </TouchableOpacity>
    )
}

export default BackButton
