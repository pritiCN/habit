import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { RootStackParamList } from '../types/navigation'
import LabelItems from '../components/label/LabelItems'
import { common } from '../styles/common'
import { styles } from '../styles/form.styles'

type Props = NativeStackScreenProps<RootStackParamList, 'Label'>

const Label = () => {
  return (
    <SafeAreaView style={common.screen}>
        <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
        >
            <LabelItems />
        </ScrollView>
    </SafeAreaView>
  )
}

export default Label