import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { inputStyles } from '../../styles/input.styles'
import { colors } from '../../styles/theme'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { common } from '../../styles/common'
import { styles } from '../../styles/LabelPickerModal.styles'
import { useLabel } from '../../context/LabelContext'
import LabelItem from './LabelItem'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types/navigation'

const LabelItems = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const [search, setSearch] = useState('')
    const {storedLabel, setCurrentLabel} = useLabel()
    
    const filteredLabels = storedLabel.filter((item) => {
        return item.name.toLowerCase().includes(search.trim().toLowerCase())
    })
    return (
        <View>
            <Text style={[common.heading, common.section]}>All Labels</Text>
            <View style={inputStyles.searchBar}>
                <Ionicons name="search" size={18} color={colors.textMuted} />
                <TextInput
                    style={inputStyles.searchInput}
                    placeholder='Search labels...'
                    placeholderTextColor={colors.textMuted}
                    value={search}
                    onChangeText={setSearch}
                />
            </View>
            <View style={styles.chipGrid}>
            {
                filteredLabels.map((label) => {
                    return(
                        <LabelItem
                            key={label.id}
                            labelData={label}
                        />
                    )
                })
            }
            {
                filteredLabels.length === 0 && (
                <Text style={{ color: colors.textMuted }}>No labels found</Text>
                )
            }
            </View>

            <TouchableOpacity 
                style={styles.createButton} 
                onPress={() => {
                    setCurrentLabel(undefined)
                    navigation.navigate('LabelForm')
                }}                    
            >
            <Ionicons name="add" size={22} color={colors.primary} />
            <Text style={styles.createButtonText}>Create New Label</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LabelItems