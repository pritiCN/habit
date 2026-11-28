import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { common } from '../styles/common'
import { inputStyles } from '../styles/input.styles'
import { colors } from '../styles/theme'
import { styles } from '../styles/form.styles'
import IconField from '../components/IconField'
import { ColorsSet } from '../constants/colorset'
import ColorField from '../components/ColorField'
import { IconsSet } from '../constants/iconset'
import { useLabel } from '../context/LabelContext'
import BackButton from '../components/BackButton'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'
import { LabelType } from '../types/label'
import { useApp } from '../context/appContext'


type Props = NativeStackScreenProps<RootStackParamList, 'LabelForm'>;
const LabelForm = ({navigation}: Props) => {
    const {selectedColor, setSelectedColor, selectedIcon, setSelectedIcon, closeModal, openModal} = useApp()
    const {currentLabel, updateLabel, addLabel} = useLabel();   
    const [name, setName] = useState(currentLabel?.name ?? '')
    const state = navigation.getState();
    const previousRoute = state.routes[state.index - 1];
    const previousScreen = previousRoute?.name; // e.g. 'Home'
    
    const handleSave = () => {
        const trimming = name.trim();
        if(trimming === '') return     
        
        const newLabel: LabelType = {
            id: currentLabel?.id ?? Date.now().toString(),
            name: trimming,
            colorId: selectedColor,
            iconId: selectedIcon
        }

        if (currentLabel) {
            updateLabel(newLabel)
        } else {
            addLabel(newLabel)
        }
        
        if(previousScreen === 'HabitForm') {
            closeModal();
            openModal('LabelPickerModal')
        }
        navigation.goBack();
    }

    useEffect(() => {
        setSelectedColor(currentLabel?.colorId ?? ColorsSet[0].id)
    }, [currentLabel?.colorId])

    useEffect(() => {
        setSelectedIcon(currentLabel?.iconId ?? IconsSet[0].id)
    }, [currentLabel?.iconId])
    
    return (
        <SafeAreaView style={common.screen}>
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <BackButton />
                <View style={{ backgroundColor: colors.background }}>

                    <View style={styles.header}>
                        <Text style={[common.title, styles.title]}>
                            {
                                currentLabel ? 'Update Label' : 'Create New Label'
                            }
                        </Text>
                        <Text style={[common.subtitle, styles.subtitle]}>Customize your label to organize your habits.</Text>
                    </View>

                    <View style={[common.panel, styles.fieldGroup]}>
                        <Text style={[common.label, styles.label]}>Label Name</Text>
                        <TextInput
                            style={inputStyles.input}
                            placeholderTextColor={colors.textMuted}
                            placeholder='Enter Label Name'
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <ColorField />

                    <IconField />
                    <TouchableOpacity style={common.button} onPress={handleSave}>
                        <Text style={common.buttonText}>{currentLabel ? 'Update label' : 'Save label'}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default LabelForm
