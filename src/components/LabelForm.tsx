import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { common } from '../styles/common'
import { inputStyles } from '../styles/input.styles'
import { colors } from '../styles/theme'
import { styles } from '../styles/CreateHabitScreen.styles'
import IconFiels from './IconFiels'
import { ColorsSet } from '../constants/colorset'
import ColorField from './ColorField'
import { IconsSet } from '../constants/iconset'

const LabelForm = ({onCancel}: {
    onCancel: () => void;
    // onDone: () => void;
}) => {
    const [name, setName] = useState('')
    const [selectedColor, setSelectedColor] = useState(ColorsSet[0].id)
    const [selectedIcon, setSeletedIcon] = useState(IconsSet[0].id)
    console.log(selectedIcon);
    
    const handleSave = () => {
        
    }
    return (
        <View style={{ backgroundColor: colors.background }}>
            <View style={[common.buttonRow, { justifyContent: 'space-between' }]}>
                <TouchableOpacity onPress={onCancel} hitSlop={10}>
                    <Ionicons name="arrow-back" size={24} color={colors.primary} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={[common.label, { color: colors.success }]}>Done</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.header}>
            <Text style={[common.title, styles.title]}>Create New Label</Text>
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

            <IconFiels 
                panalStyle={[common.panel, styles.iconSection]}
                selectedIcon={selectedIcon}
                onSelect={setSeletedIcon}
                selectedColor={selectedColor}
            />
            <TouchableOpacity style={common.button} onPress={handleSave}>
                <Text style={common.buttonText}>Save label</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LabelForm
