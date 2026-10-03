import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { common } from '../styles/common'
import { styles } from '../styles/CreateHabitScreen.styles'
import { colors } from '../styles/theme'
import LabelPickerModal from './LabelPickerModal'
import { Habit } from '../constants/habit'
import ColorField from './ColorField'
import { ColorsSet } from '../constants/colorset'
import IconFiels from './IconFiels'
import { IconsSet } from '../constants/iconset'

const HabitForm = ({onSave, initialHabit, secondaryAction}: {
        onSave: (habit: Habit) => void;
        initialHabit?: Habit;
        secondaryAction?: { label: string; onPress: () => void };
    }) => {
    const [name, setName] = useState(initialHabit?.name ?? '');
    const [description, setDescription] = useState(initialHabit?.description ?? '')
    const [selectedIcon, setSeletedIcon] = useState(initialHabit?.icon ?? IconsSet[0].id)
    const [selectedColor, setSelectedColor] = useState(initialHabit?.colorId ?? ColorsSet[0].id)
    const [isLabelModalVisible, setIsLabelModalVisible] = useState(false)
    const [labelIds, setLabelIds] = useState<string[]>(initialHabit?.labelids ?? []);
    
    const handleSave = () => {
        const trimmed = name.trim();
        if(trimmed === '') return;

        const newHabit: Habit = {
            id: initialHabit?.id ??  Date.now().toString(),
            name: trimmed,
            colorId: selectedColor,
            description: description,
            icon: selectedIcon,
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
            
            <ColorField 
                panalStyle={[common.panel, styles.fieldGroup]}
                selectedColor={selectedColor}
                onSelect={setSelectedColor}
            />

            <IconFiels 
                panalStyle={styles.iconSection}
                selectedIcon={selectedIcon}
                onSelect={setSeletedIcon}
            />
            
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