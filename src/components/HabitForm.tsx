import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { common } from '../styles/common'
import { styles } from '../styles/CreateHabitScreen.styles'
import { colors } from '../styles/theme'
import { iconOptions } from '../constants/icons'
import LabelPickerModal from './LabelPickerModal'
import { Habit } from '../constants/habit'

const HabitForm = ({onSave, initialHabit, secondaryAction}: {
        onSave: (habit: Habit) => void;
        initialHabit?: Habit;
        secondaryAction?: { label: string; onPress: () => void };
    }) => {
    const [name, setName] = useState(initialHabit?.name ?? '');
    const [description, setDescription] = useState(initialHabit?.description ?? '')
    const [selectedEmoji, setSeletedEmoji] = useState(initialHabit?.icon ?? iconOptions[0].icon)
    const [expanded, setExpanded] = useState(false);
    const [isLabelModalVisible, setIsLabelModalVisible] = useState(false)
    const [labelIds, setLabelIds] = useState<string[]>(initialHabit?.labelids ?? [])
    
    const displayIcon = expanded
        ? iconOptions
        : iconOptions.slice(0, 6)
    
    const handleSave = () => {
        const trimmed = name.trim();
        if(trimmed === '') return;

        const newHabit: Habit = {
            id: initialHabit?.id ??  Date.now().toString(),
            name: trimmed,
            description: description,
            icon: selectedEmoji,
            completedDates: initialHabit?.completedDates ??  [],
            labelids: labelIds
        }

        onSave(newHabit)
    }

    return (
        <View>
            <View style={[common.panel, styles.fieldGroup]}>
                <Text style={[common.label, styles.label]}>Habit Name</Text>
                <TextInput
                    style={common.input}
                    placeholderTextColor={colors.textMuted}
                    placeholder='e.g. Drink Water'
                    value={name}
                    onChangeText={setName}
                />
            </View>

            <View style={styles.iconSection}>
                <Text style={[common.label, styles.label]}>Choose an Icon</Text>
                <View style={styles.iconRow}>
                    {
                        displayIcon.map((option) => {
                            const isSelected = option.emoji === selectedEmoji;
                            return(
                                <TouchableOpacity 
                                    key={option.emoji}
                                    style={[
                                        common.iconCircle,
                                        { backgroundColor: option.color },
                                        isSelected && styles.iconSelected,
                                    ]}

                                    onPress={() =>setSeletedEmoji(option.emoji)}
                                >
                                    <Text style={styles.iconEmoji}>{option.emoji}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                    {
                        !expanded &&
                        (
                            <TouchableOpacity
                                style={[common.iconCircle, styles.moreButton]}
                                onPress={()=>setExpanded(true)}
                            >
                                <Text style={styles.moreButtonText}>•••</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </View>
            
            <View style={[common.panel, styles.fieldGroup]}>
                <Text style={[common.label, styles.label]}>Description (Optional)</Text>
                <TextInput
                    style={[common.input, { minHeight: 80, textAlignVertical: 'top' }]}
                    placeholderTextColor={colors.textMuted}
                    placeholder='Add a short note about your habit...'
                    value={description}
                    multiline={true}
                    onChangeText={setDescription}
                    maxLength={100}
                />
                <Text style={styles.charCount}>{description.length}/100</Text>
            </View>

            <TouchableOpacity style={[common.panel, styles.fieldGroup]} onPress={() => setIsLabelModalVisible(true)}>
                <View style={common.buttonRow}>
                    <View style={[common.buttonRow, styles.labelsTextGroup]}>
                        <Text style={styles.iconEmoji}>🔖</Text>
                        <View>
                            <Text style={[common.label, styles.label]}>Add Labels</Text>
                            <Text style={[common.subtitle, styles.subtitle]}>Organize your habit with labels</Text>
                        </View>
                    </View>
                    <View style={common.buttonRow}>
                        <View style={styles.labelsBadge}>
                            <Text style={styles.labelsBadgeText}>{labelIds.length} Labels</Text>
                        </View>
                        <Text style={styles.labelsChevron}>›</Text>
                    </View>
                </View>
            </TouchableOpacity>
            
            {
                isLabelModalVisible && <LabelPickerModal 
                    onClose={() => setIsLabelModalVisible(false)} 
                    onDone={(ids) => {
                        setIsLabelModalVisible(false)
                        setLabelIds(ids)
                    }} 
                    selectedLabels = {labelIds}
                />
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