import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { common } from '../styles/common'
import { inputStyles } from '../styles/input.styles'
import { colors } from '../styles/theme'
import { styles } from '../styles/form.styles'
import IconField from './IconField'
import { ColorsSet } from '../constants/colorset'
import ColorField from './ColorField'
import { IconsSet } from '../constants/iconset'
import { Label } from '../types/label'
import { useLabel } from '../context/LabelContext'

const LabelForm = ({onCancel}: {
    onCancel: () => void;
}) => {
    const {addLabel, editingLabel, clearEditingLabel, updateLabel} = useLabel();
    const [selectedColor, setSelectedColor] = useState(editingLabel?.colorId ?? ColorsSet[0].id)
    const [selectedIcon, setSeletedIcon] = useState(editingLabel?.icon ?? IconsSet[0].id)    
    const [name, setName] = useState(editingLabel?.name ?? '')
    
    const handleSave = () => {
        const trimming = name.trim();
        if(trimming === '') return        

        if (editingLabel) {
            updateLabel({ ...editingLabel, name: trimming, colorId: selectedColor, icon: selectedIcon })
        } else {
            addLabel({ id: Date.now().toString(), name: trimming, colorId: selectedColor, icon: selectedIcon })
        }
        handleCancel()
    }

    const handleCancel = () => {
        onCancel()
        clearEditingLabel()
    }
    return (
        <View style={{ backgroundColor: colors.background }}>
            <View style={[common.buttonRow, { justifyContent: 'space-between' }]}>
                <TouchableOpacity onPress={handleCancel} hitSlop={10}>
                    <Ionicons name="arrow-back" size={24} color={colors.primary} />
                </TouchableOpacity>
            </View>

            <View style={styles.header}>
            <Text style={[common.title, styles.title]}>
                {
                    editingLabel ? 'Update Label' : 'Create New Label'
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

            <ColorField
                panalStyle={styles.fieldGroup}
                selectedColor={selectedColor}
                onSelect={setSelectedColor}
            />

            <IconField 
                panalStyle={[common.panel, styles.iconSection]}
                selectedIcon={selectedIcon}
                onSelect={setSeletedIcon}
                selectedColor={selectedColor}
            />
            <TouchableOpacity style={common.button} onPress={handleSave}>
                <Text style={common.buttonText}>{editingLabel ? 'Update label' : 'Save label'}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LabelForm
