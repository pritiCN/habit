import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
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
import { useNavigation } from '@react-navigation/native'
import { useApp } from '../context/appContext'


type Props = NativeStackScreenProps<RootStackParamList, 'LabelForm'>;
const LabelForm = ({
    // onCancel
}: {
    // onCancel: () => void;
}) => {
    const navigation = useNavigation()
    const {selectedColor, setSelectedColor, selectedIcon, setSelectedIcon} = useApp()
    const {currentLabel, updateLabel} = useLabel();
    // const [selectedIcon, setSeletedIcon] = useState(currentLabel?.iconId ?? IconsSet[0].id)    
    const [name, setName] = useState(currentLabel?.name ?? '')
    
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
        //     addLabel({ id: Date.now().toString(), name: trimming, colorId: selectedColor, iconId: selectedIcon })
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
