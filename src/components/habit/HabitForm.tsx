import React, { useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import Toggle from '../Toggle'
import { common } from '../../styles/common'
import { inputStyles } from '../../styles/input.styles'
import { styles } from '../../styles/form.styles'
import { colors } from '../../styles/theme'
import LabelPickerModal from '../label/LabelPickerModal'
// import { Frequecny, Habit, Reminder } from '../types/habit'
import ColorField from '../ColorField'
import { ColorsSet } from '../../constants/colorset'
import IconField from '../IconField'
import { IconsSet } from '../../constants/iconset'
import { LabelProvider } from '../../context/LabelContext'
import { useHabits } from '../../context/HabitsContext'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FrequencyPickerModal from '../frequency/FrequencyPickerModal'
import StartDateModal from '../StartDateModal'
import CalenderPicker from '../frequency/CalenderPicker'
import { FrequencyDaysSet, StartOptions } from '../../constants/frequencyTypeSet'
import TimePicker from '../picker/TimePicker'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconComponent, iconSet } from '../AppIcon'
import { HabitType } from '../../types/habit'
import { useNavigation } from '@react-navigation/native'
import { useApp } from '../../context/appContext'

// const getCurrentTime = () => {
//     const now = new Date();
//     const hh = String(now.getHours()).padStart(2, '0')
//     const mm = String(now.getMinutes()).padStart(2, '0')
//     return `${hh}:${mm}`
// }

// const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// // e.g. 16 Nov 2026
// const formatDate = (ms: number) => {
//     const d = new Date(ms)
//     return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
// }

// // Title + subtitle shown in the Frequency panel
// const getFrequencySummary = (freq?: Frequecny) => {
//     switch (freq?.type) {
//         case 'daily':
//             return { title: 'Every day', subtitle: 'Repeats daily' }
//         case 'weekly': {
//             const days = FrequencyDaysSet
//                 .filter((d) => freq.days?.includes(d.id))
//                 .map((d) => d.short)
//                 .join(', ')
//             return { title: 'Selected days', subtitle: days || 'No days selected' }
//         }
//         case 'custom': {
//             const count = freq.dates?.length ?? 0
//             return { title: 'Specific dates', subtitle: `${count} ${count === 1 ? 'date' : 'dates'} selected` }
//         }
//         default:
//             return { title: 'Not set', subtitle: 'Tap to choose how often' }
//     }
// }

const HabitForm = (
    // {onSave, initialHabit, secondaryAction}: {
    //     onSave: (habit: Habit) => void;
    //     initialHabit?: Habit;
    //     secondaryAction?: { label: string; onPress: () => void };
    // }
) => {
    const navigation = useNavigation()
    const {
        currentHabit, 
        updateHabit, 
        addHabit, 
        selectedColor, 
        setSelectedColor, 
        selectedIcon, 
        setSelectedIcon
    } = useHabits();    
    const [name, setName] = useState(currentHabit?.name ?? '');
    // const [selectedIcon, setSeletedIcon] = useState(currentHabit?.iconId ?? IconsSet[0].id)
    const [description, setDescription] = useState(currentHabit?.description ?? '')
    
    // const [isLabelModalVisible, setIsLabelModalVisible] = useState(false)
    // const [isFrequencyModalVisible, setIsFrequencyModalVisible] = useState(false)
    // const [labelIds, setLabelIds] = useState<string[]>(initialHabit?.labelIds ?? []);
    // const [actionStartFrom, setActionStartForm] = useState<'start' | 'calender' | ''>('')
    // const [startFromStatus, setStartFromStatus] = useState<string>('today')
    // const [startDate, setStartDate] = useState<string | undefined>(undefined)
    // const {setCurrentHabit, toMilliSec, milliSecToSring, to12Hour, labels, getColor} = useHabits()
    // const [reminder, setReminder] = useState<Reminder>(() => (initialHabit?.reminder || {status: false, time: getCurrentTime()}))
    // const [timePickerVisibility, setTimepickerVisibility] = useState(false)
    // const [selectedFrequecny, setSelectedFrequency] = useState<Frequecny | undefined>(initialHabit?.frequency)
    
    // const startLabel = startFromStatus === 'custom' && startDate
    //     ? startDate
    //     : StartOptions.find((o) => o.id === startFromStatus)?.name

    // // Selected labels in order, skipping ids whose label was deleted
    // const selectedLabels = labelIds
    //     .map((id) => labels.find((item) => item.id === id))
    //     .filter((label): label is NonNullable<typeof label> => !!label)
    // const habitColor = getColor(selectedColor)
    // // Text colour that stays readable on top of the habit colour
    // const onHabitColor = ColorsSet.find((c) => c.id === selectedColor)?.blackColor ? '#000000' : colors.onPrimary
    // const frequencySummary = getFrequencySummary(selectedFrequecny)

    // const getStartDateMs = () => {
    //     if(startFromStatus === 'custom' && startDate) return toMilliSec(startDate)

    //     const date = new Date()
    //     date.setHours(0, 0, 0, 0)
    //     if(startFromStatus === 'tomorrow') date.setDate(date.getDate() + 1)
    //     return date.getTime()
    // }

    // // e.g. "Today, 16 Nov 2026" or "20 Nov 2026" for a picked date
    // const startText = startFromStatus === 'custom'
    //     ? (startDate ? formatDate(toMilliSec(startDate)) : startLabel)
    //     : `${startLabel}, ${formatDate(getStartDateMs())}`
    
    const handleSave = () => {
        const trimmed = name.trim();
        if(trimmed === '') return;

        const newHabit: HabitType = {
            id: currentHabit?.id ??  Date.now().toString(),
            name: trimmed,
            colorId: selectedColor,
            description: description,
            iconId: selectedIcon,
            completedDates: currentHabit?.completedDates ??  [],
            // labelIds: labelIds,
            // frequency: selectedFrequecny,
            // startDate: getStartDateMs(),
            // reminder: reminder
        }

        if(currentHabit) {
            updateHabit(newHabit)
        } else {
            addHabit(newHabit)
        }

        navigation.goBack()
    }

    useEffect(() => {
        setSelectedColor(currentHabit?.colorId ?? ColorsSet[0].id)
    },[currentHabit?.colorId])

    useEffect(() => {
        setSelectedIcon(currentHabit?.iconId ?? IconsSet[0].id)
    }, [currentHabit?.iconId])

    // const handleStartSelect = (id: string) => {
    //     setStartFromStatus(id)
    //     if(id === 'custom') {
    //         setActionStartForm('calender')
    //     } else {
    //         setActionStartForm('')
    //     }
    // }

    // const handleDateSelect = (date: string) => {
    //     setStartDate(date)
    //     setActionStartForm('')
    // }

    // const setValueofStartDate = (habit:Habit | undefined) => {
    //     if(!habit?.startDate) return

    //     setStartFromStatus('custom')
    //     setStartDate(milliSecToSring(habit.startDate))        
    // }
    
    // useEffect(() => {
    //     setCurrentHabit(initialHabit)
    //     setValueofStartDate(initialHabit)
    //     return () => setCurrentHabit(initialHabit)
    // }, [initialHabit])
    
    // console.log(name);
    return (
        <View>
            {/* Habit name (required) */}
            <View style={[common.panel, styles.fieldGroup]}>
                <View style={common.fieldHeader}>
                    <View style={common.rowIcon}>
                        <MaterialCommunityIcons name="alpha-t-box-outline" size={22} color={colors.text} />
                    </View>
                    <Text style={common.label}>Habit Name</Text>
                </View>
                <TextInput
                    style={inputStyles.input}
                    placeholderTextColor={colors.textMuted}
                    placeholder='e.g. Drink Water'
                    value={name}
                    onChangeText={setName}
                    maxLength={50}
                />
                <Text style={[inputStyles.charCount, name.length >= 50 && inputStyles.charCountLimit]}>
                    {name.length}/{50}
                </Text>
            </View>
            
            <ColorField />

            {/* Icon picker */}

            <IconField 
                // panalStyle={[common.panel, styles.iconSection]}
                // selectedIcon={selectedIcon}
                // onSelect={setSeletedIcon}
                // selectedColor={selectedColor}
                // currentIcon={initialHabit?.iconId ?? undefined}
            />

            {/* Description */}
            
            {/* <View style={[common.panel, styles.fieldGroup]}>
                <View style={common.fieldHeader}>
                    <View style={common.rowIcon}>
                        <MaterialCommunityIcons name="file-document-outline" size={22} color={colors.text} />
                    </View>
                    <Text style={common.label}>Description <Text style={common.textRegular}>(Optional)</Text></Text>
                </View>
                <TextInput
                    style={[inputStyles.input, inputStyles.textArea]}
                    placeholderTextColor={colors.textMuted}
                    placeholder='Add a short note about your habit...'
                    value={description}
                    multiline={true}
                    onChangeText={setDescription}
                    maxLength={100}
                />
                <Text style={[inputStyles.charCount, description.length >= 100 && inputStyles.charCountLimit]}>{description.length}/100</Text>
            </View> */}

            {/* Labels */}

            {/* <View style={[common.panel, styles.fieldGroup]}>
                <View style={common.fieldHeader}>
                    <View style={common.rowIcon}>
                        <MaterialCommunityIcons name="tag-outline" size={22} color={colors.text} />
                    </View>
                    <Text style={common.label}>Labels</Text>
                </View>

                <View style={common.buttonRow}>
                    <View style={[common.chipWrap, common.rowMain]}>
                        {
                            selectedLabels.length === 0 ? (
                                <Text style={common.subtitle}>Organize your habit with labels</Text>
                            ) : (
                                selectedLabels.map((label) => {
                                    const labelColor = getColor(label.colorId)
                                    return (
                                        <View key={label.id} style={[common.chip, {backgroundColor: `${labelColor}1A`}]}>
                                            <IconComponent icon={label.iconId} color={labelColor} size={16} />
                                            <Text style={[common.chipText, {color: labelColor}]}>{label.name}</Text>
                                            <TouchableOpacity
                                                hitSlop={8}
                                                onPress={() => setLabelIds(labelIds.filter((i) => i !== label.id))}
                                            >
                                                <Ionicons name="close" size={16} color={labelColor} />
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                            )
                        }
                    </View>
                    <TouchableOpacity
                        style={[common.chip, {backgroundColor: `${habitColor}1A`}]}
                        onPress={() => setIsLabelModalVisible(true)}
                    >
                        <Ionicons name="add" size={16} color={habitColor} />
                        <Text style={[common.chipText, {color: habitColor}]}>
                            {selectedLabels.length === 0 ? 'Add Labels' : 'Edit Labels'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View> */}

            {/* Frequency */}

            {/* <TouchableOpacity style={[common.panel, styles.fieldGroup]} onPress={() => setIsFrequencyModalVisible(true)}>
                <View style={common.buttonRow}>
                    <View style={[common.rowIcon, common.alignTop]}>
                        <MaterialCommunityIcons name="calendar-clock-outline" size={22} color={colors.text} />
                    </View>
                    <View style={common.rowMain}>
                        <Text style={[common.label, common.rowTitle]}>Frequency</Text>
                        <Text style={common.valueLarge}>{frequencySummary.title}</Text>
                        <Text style={common.subtitle}>{frequencySummary.subtitle}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
                </View>
            </TouchableOpacity> */}

            {/* Reminder */}

            {/* <View style={[common.panel, styles.fieldGroup]}>
                <View style={common.buttonRow}>
                    <View style={[common.rowIcon, common.alignTop]}>
                        <Ionicons name="notifications-outline" size={22} color={colors.text} />
                    </View>
                    <View style={common.rowMain}>
                        <Text style={[common.label, common.rowTitle]}>Reminder</Text>
                        <TouchableOpacity
                            style={common.valueField}
                            disabled={!reminder.status}
                            onPress={() => setTimepickerVisibility(true)}
                        >
                            {
                                reminder.status ? (() => {
                                    const t = to12Hour(reminder.time)
                                    return <Text style={common.valueText}>{`${t.hour}:${t.minute} ${t.period}`}</Text>
                                })() : (
                                    <Text style={[common.valueText, common.textRegular]}>Off</Text>
                                )
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={common.alignTop}>
                        <Toggle
                            value={reminder.status}
                            onValueChange={(value) => setReminder({...reminder, status: value})}
                            activeColor={habitColor}
                        />
                    </View>
                    <TouchableOpacity
                        hitSlop={8}
                        disabled={!reminder.status}
                        onPress={() => setTimepickerVisibility(true)}
                    >
                        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
                    </TouchableOpacity>
                </View>
            </View> */}

            {/* Start From */}

            {/* <TouchableOpacity style={[common.panel, styles.fieldGroup]} onPress={() => setActionStartForm('start')}>
                <View style={common.buttonRow}>
                    <View style={[common.rowIcon, common.alignTop]}>
                        <MaterialCommunityIcons name="calendar-month-outline" size={22} color={colors.text} />
                    </View>
                    <View style={common.rowMain}>
                        <Text style={[common.label, common.rowTitle]}>Start Date</Text>
                        <View style={common.valueField}>
                            <Text style={common.valueText}>{startText}</Text>
                        </View>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
                </View>
            </TouchableOpacity> */}

            {/* Label Modal */}
            
            {
                // isLabelModalVisible && (
                //     <LabelProvider>
                //         <LabelPickerModal 
                //             onClose={() => setIsLabelModalVisible(false)} 
                //             onDone={(ids) => {
                //                 setIsLabelModalVisible(false)
                //                 setLabelIds(ids)
                //             }} 
                //             selectedLabels = {labelIds}
                //         />
                //     </LabelProvider>
                // )
            }

            {/* Frequency */}

            {
                // isFrequencyModalVisible && (
                //     <FrequencyPickerModal 
                //         selectedFrequecny={selectedFrequecny}
                //         onClose={() => setIsFrequencyModalVisible(false)}
                //         selectedColor={habitColor}
                //         onDone={(freq) => {
                //             setSelectedFrequency(freq)
                //             setIsFrequencyModalVisible(false)
                //         }}
                //     />
                // )
            }

            {/* start from */}

            {
                // actionStartFrom === 'start' && (
                //     <StartDateModal
                //         onclose={() => setActionStartForm('')}
                //         selected={startFromStatus}
                //         onSelect={handleStartSelect}
                //     />
                // )
            }

            {/* Calender Picker */}

            {
                // actionStartFrom === 'calender' && (
                //     <CalenderPicker
                //         selected={startDate}
                //         onclose={() => setActionStartForm('')}
                //         onSelect={handleDateSelect}
                //     />
                // )
            }

            {/* Timer Picker */}

            {
                // timePickerVisibility && (
                //     <TimePicker
                //         onClose={() => setTimepickerVisibility(false)}
                //         time={reminder.time}
                //         onSelecte={(time) => {
                //             setReminder({...reminder, time})
                //             setTimepickerVisibility(false)
                //         }}
                //     />
                // )
            }
            
            <View style={common.buttonStack}>
                <TouchableOpacity
                    style={[
                        common.button, common.buttonLg, 
                        // {backgroundColor: habitColor}
                    ]}
                    onPress={handleSave}
                >
                    <Text style={[common.buttonText, common.buttonLgText, 
                        // {color: onHabitColor}
                        ]}>
                        {currentHabit ? 'Save Changes' : 'Save Habit'}
                    </Text>
                </TouchableOpacity>
                {/* {
                    secondaryAction && (
                        <TouchableOpacity style={[common.buttonDanger, common.buttonLg]} onPress={secondaryAction.onPress}>
                            <Text style={[common.buttonDangerText, common.buttonLgText]}>{secondaryAction.label}</Text>
                        </TouchableOpacity>
                    )
                } */}
            </View>
        </View>
    )
}

export default HabitForm