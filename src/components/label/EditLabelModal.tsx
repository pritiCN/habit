import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { common } from '../../styles/common'
import { useLabel } from '../../context/LabelContext'
import { useApp } from '../../context/appContext'
import { IconComponent } from '../AppIcon'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../styles/theme'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types/navigation'

const EditLabelModal = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const {currentLabel} = useLabel();
    const {getColor, closeModal, openModal} = useApp()
    const colorCode = getColor(currentLabel?.colorId ?? '')
    return (
        <>        
            <View style={common.buttonRow}>
                <View style={[common.iconSquare, { backgroundColor: `${colorCode}1A` }]}>
                    <IconComponent icon={currentLabel?.iconId ?? ''} color={getColor(currentLabel?.colorId ?? '', true)} />
                </View>
                <View style={common.rowMain}>
                    <Text style={common.heading} numberOfLines={1}>{currentLabel?.name}</Text>
                </View>
                <TouchableOpacity style={common.iconButton} onPress={closeModal}>
                    <Ionicons name="close" size={20} color={colors.text} />
                </TouchableOpacity>
            </View>
            <View style={common.menuGroup}>
                    <TouchableOpacity
                      style={common.menuItem}
                      onPress={() => {
                        closeModal()
                        openModal('colorsModal')
                      }}
                    >
                      <View style={common.rowIcon}>
                        <MaterialCommunityIcons name="palette-outline" size={22} color={colors.text} />
                      </View>
                      <Text style={common.bodyText}>Color</Text>
                    </TouchableOpacity>
            
                    <View style={common.divider} />
            
                    <TouchableOpacity
                      style={common.menuItem}
                      onPress={() => {
                        closeModal()
                        openModal('iconModal')
                      }}
                    >
                      <View style={common.rowIcon}>
                        <MaterialCommunityIcons name="view-grid-plus-outline" size={22} color={colors.text} />
                      </View>
                      <Text style={common.bodyText}>Icon</Text>
                    </TouchableOpacity>
            
                    <View style={common.divider} />

                <TouchableOpacity
                style={common.menuItem}
                onPress={() => {
                    closeModal()
                    navigation.navigate('LabelForm')
                }}
                >
                    <View style={common.rowIcon}>
                        <Ionicons name="create-outline" color={colors.text} size={24} />
                    </View>
                    <Text style={common.bodyText}>Edit</Text>
                </TouchableOpacity>

                <View style={common.divider} />

                <TouchableOpacity style={common.menuItem}
                onPress={() => {
                    // deleteHabit(currentHabit.id)
                    // closeModal()
                }}
                >
                    <View style={common.rowIcon}>
                        <Ionicons name="trash-outline" color={colors.danger} size={24} />
                    </View>
                    <Text style={[common.bodyText, common.textDanger]}>Delete</Text>
                </TouchableOpacity> 
            </View>
        </>
    )
}

export default EditLabelModal