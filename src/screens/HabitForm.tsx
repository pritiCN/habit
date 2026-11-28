import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { common } from '../styles/common';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/form.styles';
import BackButton from '../components/BackButton';
import { useHabits } from '../context/HabitsContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../styles/theme';
import { inputStyles } from '../styles/input.styles';
import ColorField from '../components/ColorField';
import IconField from '../components/IconField';
import { HabitType } from '../types/habit';
import { ColorsSet } from '../constants/colorset';
import { IconsSet } from '../constants/iconset';
import { useApp } from '../context/appContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = NativeStackScreenProps<RootStackParamList, 'HabitForm'>;

const HabitForm = ({navigation}: Props) => {
    const {selectedColor, setSelectedColor, selectedIcon, setSelectedIcon, getColor, openModal, modalState} = useApp()
    const {currentHabit, updateHabit, addHabit} = useHabits();
    const hasHabit = currentHabit !== undefined 
    const [name, setName] = useState(currentHabit?.name ?? '');
    const [description, setDescription] = useState(currentHabit?.description ?? '')
    const habitColor = getColor(selectedColor)
        // console.log(route);
        
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
    
    return (
        <SafeAreaView style={common.screen}>
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <BackButton />
                <View style={styles.header}>
                    <Text style={[common.title, styles.title]}>{hasHabit ? 'Edit' : 'Create New'} Habit</Text>
                    <Text style={[common.subtitle, styles.subtitle]}>{hasHabit ? 'Update or remove this habit.' : 'Small step. Big changes.'} </Text>
                </View>

                <>
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

                    <IconField />
                    
                    {/* Description */}
                                
                    <View style={[common.panel, styles.fieldGroup]}>
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
                    </View>
                    
                    {/* Labels */}

                    <View style={[common.panel, styles.fieldGroup]}>
                        <View style={common.fieldHeader}>
                            <View style={common.rowIcon}>
                                <MaterialCommunityIcons name="tag-outline" size={22} color={colors.text} />
                            </View>
                            <Text style={common.label}>Labels</Text>
                        </View>

                        <View style={common.buttonRow}>
                            <View style={[common.chipWrap, common.rowMain]}>
                                {/* {
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
                                } */}
                            </View>
                            <TouchableOpacity
                                style={[
                                    common.chip, 
                                    {backgroundColor: `${habitColor}1A`}
                                ]}
                                onPress={() => openModal('LabelPickerModal')}
                            >
                                <Ionicons name="add" size={16} color={habitColor} />
                                <Text style={[common.chipText, {color: habitColor}]}>
                                    Add Labels
                                    {/* {selectedLabels.length === 0 ? 'Add Labels' : 'Edit Labels'} */}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
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
                </>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HabitForm