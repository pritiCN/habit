import React, { useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { common } from '../styles/common'
import { inputStyles } from '../styles/input.styles'
import { styles } from '../styles/form.styles'
import { colors } from '../styles/theme'
import LabelPickerModal from './label/LabelPickerModal'
import { Habit } from '../types/habit'
import ColorField from './ColorField'
import { ColorsSet } from '../constants/colorset'
import IconField from './IconField'
import { IconsSet } from '../constants/iconset'
import { LabelProvider } from '../context/LabelContext'
import { useHabits } from '../context/HabitsContext'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FrequencyPickerModal from './frequency/FrequencyPickerModal'
import StartForm from './StartDateModal'
import StartDateModal from './StartDateModal'
import CalenderPicker from './frequency/CalenderPicker'
import { StartOptions } from '../constants/frequencyTypeSet'

const HabitForm = ({onSave, initialHabit, secondaryAction}: {
        onSave: (habit: Habit) => void;
        initialHabit?: Habit;
        secondaryAction?: { label: string; onPress: () => void };
    }) => {
    const [name, setName] = useState(initialHabit?.name ?? '');
    const [description, setDescription] = useState(initialHabit?.description ?? '')
    const [selectedIcon, setSeletedIcon] = useState(initialHabit?.iconId ?? IconsSet[0].id)
    const [selectedColor, setSelectedColor] = useState(initialHabit?.colorId ?? ColorsSet[0].id)
    const [isLabelModalVisible, setIsLabelModalVisible] = useState(false)
    const [isFrequencyModalVisible, setIsFrequencyModalVisible] = useState(false)
    const [labelIds, setLabelIds] = useState<string[]>(initialHabit?.labelIds ?? []);
    const [actionStartFrom, setActionStartForm] = useState<'start' | 'calender' | ''>('')
    const [startFromStatus, setStartFromStatus] = useState<string>('today')
    const [startDate, setStartDate] = useState<string | undefined>(undefined)
    const {setCurrentHabit, toMilliSec, milliSecToSring} = useHabits()

    const startLabel = startFromStatus === 'custom' && startDate
        ? startDate
        : StartOptions.find((o) => o.id === startFromStatus)?.name

    const getStartDateMs = () => {
        if(startFromStatus === 'custom' && startDate) return toMilliSec(startDate)

        const date = new Date()
        date.setHours(0, 0, 0, 0)
        if(startFromStatus === 'tomorrow') date.setDate(date.getDate() + 1)
        return date.getTime()
    }
    
    const handleSave = () => {
        const trimmed = name.trim();
        if(trimmed === '') return;

        const newHabit: Habit = {
            id: initialHabit?.id ??  Date.now().toString(),
            name: trimmed,
            colorId: selectedColor,
            description: description,
            iconId: selectedIcon,
            completedDates: initialHabit?.completedDates ??  [],
            labelIds: labelIds,
            startDate: getStartDateMs()
        }

        onSave(newHabit)
    }

    const handleStartSelect = (id: string) => {
        setStartFromStatus(id)
        if(id === 'custom') {
            setActionStartForm('calender')
        } else {
            setActionStartForm('')
        }
    }

    const handleDateSelect = (date: string) => {
        setStartDate(date)
        setActionStartForm('')
    }

    const setValueofStartDate = (habit:Habit | undefined) => {
        if(!habit?.startDate) return

        setStartFromStatus('custom')
        setStartDate(milliSecToSring(habit.startDate))        
    }
    
    useEffect(() => {
        setCurrentHabit(initialHabit)
        setValueofStartDate(initialHabit)
        return () => setCurrentHabit(initialHabit)
    }, [initialHabit])
    
    return (
        <View>
            {/* Habit name (required) */}
            <View style={[common.panel, styles.fieldGroup]}>
                <Text style={[common.label, styles.label]}>Habit Name</Text>
                <TextInput
                    style={inputStyles.input}
                    placeholderTextColor={colors.textMuted}
                    placeholder='e.g. Drink Water'
                    value={name}
                    onChangeText={setName}
                />
            </View>

            {/* Color picker */}
            <ColorField
                panalStyle={[common.panel, styles.fieldGroup]}
                selectedColor={selectedColor}
                currentColor={initialHabit?.colorId ?? undefined}
                onSelect={setSelectedColor}
            />

            {/* Icon picker */}

            <IconField 
                panalStyle={[common.panel, styles.iconSection]}
                selectedIcon={selectedIcon}
                onSelect={setSeletedIcon}
                selectedColor={selectedColor}
                currentIcon={initialHabit?.iconId ?? undefined}
            />

            {/* Description */}
            
            <View style={[common.panel, styles.fieldGroup]}>
                <Text style={[common.label, styles.label]}>Description (Optional)</Text>
                <TextInput
                    style={[inputStyles.input, inputStyles.textArea]}
                    placeholderTextColor={colors.textMuted}
                    placeholder='Add a short note about your habit...'
                    value={description}
                    multiline={true}
                    onChangeText={setDescription}
                    maxLength={100}
                />
                <Text style={styles.charCount}>{description.length}/100</Text>
            </View>

            {/* Labels */}

            <TouchableOpacity style={[common.panel, styles.fieldGroup]} onPress={() => setIsLabelModalVisible(true)}>
                <View style={common.buttonRow}>
                    <View style={[common.buttonRow, common.rowMain]}>
                        <View style={common.rowIcon}>
                            <FontAwesome name="tag" size={22} color={colors.text} />
                        </View>
                        <View>
                            <Text style={[common.label, common.rowTitle]}>Labels</Text>
                            <Text style={common.subtitle}>Organize your habit with labels</Text>
                        </View>
                    </View>
                    <View style={common.buttonRow}>
                        <View style={common.badge}>
                            <Text style={common.badgeText}>{labelIds.length} Labels</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
                    </View>
                </View>
            </TouchableOpacity>

            {/* Frequency */}

            <TouchableOpacity style={[common.panel, styles.fieldGroup]} onPress={() => setIsFrequencyModalVisible(true)}>
                <View style={common.buttonRow}>
                    <View style={[common.buttonRow, common.rowMain]}>
                        <View style={common.rowIcon}>
                            <FontAwesome name="calendar" size={22} color={colors.text} />
                        </View>
                        <View>
                            <Text style={[common.label, common.rowTitle]}>Frequency</Text>
                            <Text style={common.subtitle}>How often to repeat this habit</Text>
                        </View>
                    </View>
                    <View style={common.buttonRow}>
                        <View style={common.badge}>
                            <Text style={common.badgeText}>Not Set</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
                    </View>
                </View>
            </TouchableOpacity>

            {/* Start From */}

            <TouchableOpacity style={[common.panel, styles.fieldGroup]} onPress={() => setActionStartForm('start')}>
                <View style={common.buttonRow}>
                    <View style={[common.buttonRow, common.rowMain]}>
                        <View style={common.rowIcon}>
                            <Ionicons name="calendar-outline" size={22} color={colors.text} />
                        </View>
                        <View>
                            <Text style={[common.label, common.rowTitle]}>Start Date</Text>
                            <Text style={common.subtitle}>How often to repeat this habit</Text>
                        </View>
                    </View>
                    <View style={common.buttonRow}>
                        <View style={common.badge}>
                            <Text style={common.badgeText}>{startLabel}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
                    </View>
                </View>
            </TouchableOpacity>

            {/* Label Modal */}
            
            {
                isLabelModalVisible && (
                    <LabelProvider>
                        <LabelPickerModal 
                            onClose={() => setIsLabelModalVisible(false)} 
                            onDone={(ids) => {
                                setIsLabelModalVisible(false)
                                setLabelIds(ids)
                            }} 
                            selectedLabels = {labelIds}
                        />
                    </LabelProvider>
                )
            }

            {/* Frequency */}

            {
                isFrequencyModalVisible && (
                    <FrequencyPickerModal 
                        onClose={() => setIsFrequencyModalVisible(false)}
                    />
                )
            }

            {/* start from */}

            {
                actionStartFrom === 'start' && (
                    <StartDateModal
                        onclose={() => setActionStartForm('')}
                        selected={startFromStatus}
                        onSelect={handleStartSelect}
                    />
                )
            }

            {
                actionStartFrom === 'calender' && (
                    <CalenderPicker
                        selected={startDate}
                        onclose={() => setActionStartForm('')}
                        onSelect={handleDateSelect}
                    />
                )
            }
            
            {
                secondaryAction ? (
                    <View style={common.buttonRow}>
                        <TouchableOpacity style={[common.button, styles.primaryInRow]} onPress={handleSave}>
                            <Text style={common.buttonText}>{initialHabit ? 'Save Change' : 'Save Habit'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={common.buttonDanger} onPress={secondaryAction.onPress}>
                            <Text style={common.buttonDangerText}>{secondaryAction.label}</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity style={common.button} onPress={handleSave}>
                        <Text style={common.buttonText}>{initialHabit ? 'Save Change' : 'Save Habit'}</Text>
                    </TouchableOpacity>
                )
            }
        </View>
    )
}

export default HabitForm