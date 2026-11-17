import React, { useEffect, useRef } from 'react'
import { Animated, Pressable } from 'react-native'
import { common } from '../styles/common'
import { colors } from '../styles/theme'

// trackWidth - thumbWidth - (trackPadding * 2) = 44 - 20 - 6
const THUMB_TRAVEL = 18

// Same look on iOS and Android: coloured pill with a white round thumb
const Toggle = ({value, onValueChange, activeColor = colors.primary}: {
    value: boolean
    onValueChange: (value: boolean) => void
    activeColor?: string
}) => {
    const anim = useRef(new Animated.Value(value ? 1 : 0)).current

    useEffect(() => {
        Animated.timing(anim, {
            toValue: value ? 1 : 0,
            duration: 180,
            useNativeDriver: false, // backgroundColor can't use the native driver
        }).start()
    }, [value])

    const translateX = anim.interpolate({ inputRange: [0, 1], outputRange: [0, THUMB_TRAVEL] })
    const backgroundColor = anim.interpolate({ inputRange: [0, 1], outputRange: [colors.border, activeColor] })

    return (
        <Pressable
            hitSlop={8}
            onPress={() => onValueChange(!value)}
            accessibilityRole="switch"
            accessibilityState={{ checked: value }}
        >
            <Animated.View style={[common.toggleTrack, { backgroundColor }]}>
                <Animated.View style={[common.toggleThumb, { transform: [{ translateX }] }]} />
            </Animated.View>
        </Pressable>
    )
}

export default Toggle
