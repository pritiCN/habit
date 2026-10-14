import React from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { common } from '../styles/common'
import { colors } from '../styles/theme'
import { useLabel } from '../context/LabelContext'

const LabelActionPopup = ({closePopup, labelId, updateLabel}: {
    closePopup: ()=>void
    updateLabel: (labelId: string)=> void
    labelId: string
}) => {
    const {deleteLabel} = useLabel();

    return (
        <Pressable style={common.backdrop}
            onPress={closePopup}
        >
            <Pressable style={[common.panel, common.dialog]} onPress={() => {}}>
                <TouchableOpacity style={common.menuItem} onPress={() => updateLabel(labelId)}>
                    <Ionicons name="create-outline" size={22} color={colors.primary} />
                    <Text style={common.bodyText}>Edit</Text>
                </TouchableOpacity>

                <View style={common.divider} />

                <TouchableOpacity style={common.menuItem} onPress={() => {
                        deleteLabel(labelId)
                        closePopup()
                    }}
                >
                    <Ionicons name="trash-outline" size={22} color={colors.danger} />
                    <Text style={[common.bodyText, { color: colors.danger }]}>Delete</Text>
                </TouchableOpacity>
            </Pressable>
        </Pressable>
    )
}

export default LabelActionPopup
