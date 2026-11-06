import React, { useEffect, useRef, useState } from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { common } from '../../styles/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../../styles/theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const useRepeatPress = (action: () => void, delay = 400, interval = 80) => {
    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)
    const repeat = useRef<ReturnType<typeof setInterval> | null>(null)

    const stop = () => {
        if (timeout.current) clearTimeout(timeout.current)
        if (repeat.current) clearInterval(repeat.current)
        timeout.current = null
        repeat.current = null
    }

    const start = () => {
        action()
        timeout.current = setTimeout(() => {
            repeat.current = setInterval(action, interval)
        }, delay)
    }

    useEffect(() => stop, [])

    return { onPressIn: start, onPressOut: stop }
}

const TimePicker = ({onClose, time, onSelecte}: {
    onClose: () => void
    time: string
    onSelecte: (time: string) => void
}) => {
    const insets = useSafeAreaInsets()
    const [h, m] = time.split(':').map(Number)    
    const [hour, setHour] = useState(h % 12 || 12)
    const [minute, setMinute] = useState(m)
    const [period, setPeriod] = useState<'AM' | 'PM'>(h >= 12 ? 'PM' : 'AM')
    
    const changeHours = (step: number) => setHour((hour + step + 11) % 12 + 1)
    const changeMinutes = (step: number) => setMinute(prev => (prev + step + 60) % 60)
    const minuteUp = useRepeatPress(() => changeMinutes(1))
    const minuteDown = useRepeatPress(() => changeMinutes(-1))

    const handleDone = () => {
        let hour24 = hour
        if(period === 'PM') hour24 = hour + 12
        onSelecte(`${hour24}:${minute}`)        
    }
  
  return (
    <Modal animationType="slide" transparent={true} onRequestClose={onClose}>
        <View style={[common.sheetOverlay, { paddingBottom: insets.bottom, paddingTop: insets.top }]}>
            <View style={[common.panel, common.sheet]}>
                <View style={common.sheetHandle} />

                <View style={[common.buttonRow, common.section]}>
                    <View style={common.rowMain}>
                        <Text style={[common.heading, common.rowTitle]}>Reminder time</Text>
                        <Text style={common.subtitle}>When should we remind you?</Text>
                    </View>
                    <TouchableOpacity style={common.iconButton} onPress={onClose}>
                        <Ionicons name="close" size={20} color={colors.text} />
                    </TouchableOpacity>
                </View>

                <View style={[common.centerRow, common.section]}>
                    {/* Hour */}
                    <View style={common.stepperColumn}>
                        <TouchableOpacity style={common.stepperButton} onPress={() => changeHours(1)}>
                            <Ionicons name="chevron-up" size={20} color={colors.text} />
                        </TouchableOpacity>
                        <Text style={common.bigValue}>{String(hour).padStart(2, '0')}</Text>
                        <TouchableOpacity style={common.stepperButton} onPress={() => changeHours(-1)}>
                            <Ionicons name="chevron-down" size={20} color={colors.text} />
                        </TouchableOpacity>
                    </View>

                    <Text style={common.bigValue}>:</Text>
                    {/* Minute */}
                    <View style={common.stepperColumn}>
                        <TouchableOpacity style={common.stepperButton} {...minuteUp}>
                            <Ionicons name="chevron-up" size={20} color={colors.text} />
                        </TouchableOpacity>
                        <Text style={common.bigValue}>{String(minute).padStart(2, '0')}</Text>
                        <TouchableOpacity style={common.stepperButton} {...minuteDown}>
                            <Ionicons name="chevron-down" size={20} color={colors.text} />
                        </TouchableOpacity>
                    </View>

                    {/* AM / PM */}
                    <View style={common.stepperColumn}>
                        {(['AM', 'PM'] as const).map((p) => (
                            <TouchableOpacity
                                key={p}
                                style={[common.stepperValue, period === p && common.tileActive]}
                                onPress={() => setPeriod(p)}
                            >
                                <Text style={[common.label, period === p && common.textPrimary]}>{p}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <TouchableOpacity style={common.button} onPress={handleDone}>
                    <Text style={common.buttonText}>Done</Text>
                </TouchableOpacity>
            </View>
        </View>


    </Modal>
  )
}

export default TimePicker